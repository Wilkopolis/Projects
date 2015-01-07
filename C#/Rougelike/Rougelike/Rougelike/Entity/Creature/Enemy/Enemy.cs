using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.Xna.Framework.Graphics;
using Microsoft.Xna.Framework;

namespace Rougelike
{
    public partial class Enemy : Creature
    {
        public LinkedList<Effect> Effects = new LinkedList<Effect>();
        public int Damage;
        public int Cost = 1;

        public Enemy()
        {
        }

        public Enemy(Vector2 position)
        {
            Position = position;
        }

        public Enemy(String name)
        {
            Name = name;
            Position = Vector2.Zero;
            Damage = 1;
            HP = 1;
            MaxHP = 1;
            AP = 1;
            MaxAP = 1;


        }

        new public Enemy Copy()
        {
            Enemy Result = new Enemy();
            Result.HP = HP;
            Result.MaxHP = MaxHP;
            Result.AP = AP;
            Result.MaxAP = MaxAP;
            Result.Name = Name;
            Result.Brains = Brains;
            Result.Origin = Origin;
            Result.Position = Position;
            Result.AssetIndex = AssetIndex;
            Result.Side = Side;
            Result.Damage = Damage;
            Result.Cost = Cost;
            Result.HashID = HashID;
            return Result;
        }

        public Enemy Copy(Vector2 Position)
        {
            Enemy Result = new Enemy();
            Result.HP = HP;
            Result.MaxHP = MaxHP;
            Result.AP = AP;
            Result.MaxAP = MaxAP;
            Result.Name = Name;
            Result.Brains = Brains;
            Result.Origin = Origin;
            Result.Position = Position;
            Result.AssetIndex = AssetIndex;
            Result.Damage = Damage;
            Result.Cost = Cost;
            Result.Side = Side;
            Result.HashID = HashID;
            return Result;
        }

        public float GetDamage()
        {
            return Damage;
        }

        public Dictionary<Effect, int> GetDefensiveEffects()
        {
            Dictionary<Effect, int> results = new Dictionary<Effect, int>();
            foreach (Effect E in Effects)
            {
                if ((int)E < 0)
                {
                    if (results.ContainsKey(E))
                        results[E]++;
                    else
                        results.Add(E, 1);
                }
            }
            return results;
        }

        public Dictionary<Effect, int> GetOffensiveEffects()
        {
            Dictionary<Effect, int> results = new Dictionary<Effect, int>();
            foreach (Effect E in Effects)
            {
                if ((int)E > 0 && (int)E < 100)
                {
                    if (results.ContainsKey(E))
                        results[E]++;
                    else
                        results.Add(E, 1);
                }
            }
            return results;
        }

        public int GetAttackCost()
        {
            return Cost;
        }

        public override string[] GetModStrings()
        {
            Dictionary<Effect, int> Mods = GetEffects();

            LinkedList<string> mods = new LinkedList<string>();
            foreach (Effect E in Mods.Keys)
            {
                if ((int)E < 100)
                    mods.AddLast(Item.ModToString(E) + " " + Item.StrengthToString(Mods[E]));
            }

            string[] result = { "", "", "", "" };
            int i = 0;
            foreach (string mod in mods)
            {
                if (result[i].Length + mod.Length > 20)
                    i++;
                result[i] += mod + ", ";
            }
            if (i != 0)
                result[i] = result[i].Substring(0, result[i].Length - 1);

            return result;
        }

        private Dictionary<Effect, int> GetEffects()
        {
            Dictionary<Effect, int> results = new Dictionary<Effect, int>();
            foreach (Effect E in Effects)
            {
                if (results.ContainsKey(E))
                    results[E]++;
                else
                    results.Add(E, 1);
            }
            return results;
        }

        public bool DoTurn(Room room, Player player)
        {
            Movements = new LinkedList<Movement>();

            // Calc Moves
            if (Brains == Nature.DUMB)
            {
                GetMovementOptions(room);
            }
            else
            {
                AStarHorseshit(player, room, 1);
            }

            // Do Movements
            if (Brains == Nature.SMART)
            {
                while (AP > 0 && Movements.Count != 0)
                {
                    Position = Movements.First.Value.GetVector();
                    AP = AP - Movements.First.Value.Cost;
                    room.Tiles[(int)Position.X, (int)Position.Y].Solid = true;
                    Movements.Remove(Movements.First);
                }
            }
            else
            {
                int distance;
                do
                {
                    distance = (int)(Math.Abs(player.Position.X - Position.X) + Math.Abs(player.Position.Y - Position.Y));
                    Movement result = ChooseBest(player);
                    Position = new Vector2(result.X, result.Y);
                    AP = AP - result.Cost;
                    room.Tiles[(int)Position.X, (int)Position.Y].Solid = true;
                    GetMovementOptions(room);
                }
                while (distance != (int)(Math.Abs(player.Position.X - (Position.X)) + Math.Abs(player.Position.Y - (Position.Y))) && AP > 0);
            }

            //Get Attack Options
            GetAttackOptions(room);
            if (Math.Abs(player.Position.X - Position.X) + Math.Abs(player.Position.Y - (Position.Y)) == 1)
            {
                while (AP > GetAttackCost())
                {
                    if (Attack(this, player, room))
                        return true;
                }
            }
            return false;
        }

        private void GetMovementOptions(Room room)
        {
            Movements.AddLast(new Movement((int)Position.X, (int)Position.Y, 0));

            int duration = AP;
            int initialduration = AP;
            int cost = 0;
            while (duration >= mod)
            {
                // How much a movement costs in AP
                cost = initialduration - duration + mod;
                int count = Movements.Count();
                for (int i = 0; i < count; i++)
                {
                    Movement movement = Movements.ElementAt(i);
                    if (movement.Y > 0)
                    {
                        if (!room.Tiles[movement.X, movement.Y - 1].Solid)
                        {
                            Movement next = new Movement(movement.X, movement.Y - 1, cost);
                            if (!(Movements.Contains(next)))
                            {
                                Movements.AddLast(next);
                            }
                        }
                    }
                    if (movement.X > 0)
                    {
                        if (!room.Tiles[movement.X - 1, movement.Y].Solid)
                        {
                            Movement next = new Movement(movement.X - 1, movement.Y, cost);
                            if (!(Movements.Contains(next)))
                            {
                                Movements.AddLast(next);
                            }
                        }
                    }
                    if (movement.X < 14)
                    {
                        if (!room.Tiles[movement.X + 1, movement.Y].Solid)
                        {
                            Movement next = new Movement(movement.X + 1, movement.Y, cost);
                            if (!(Movements.Contains(next)))
                            {
                                Movements.AddLast(next);
                            }
                        }
                    }
                    if (movement.Y < 9)
                    {
                        if (!room.Tiles[movement.X, movement.Y + 1].Solid)
                        {
                            Movement next = new Movement(movement.X, movement.Y + 1, cost);
                            if (!(Movements.Contains(next)))
                            {
                                Movements.AddLast(next);
                            }
                        }
                    }
                }
                duration -= mod;
            }
        }

        private void GetAttackOptions(Room room)
        {
            Attacks = new LinkedList<Attack>();
            foreach (Entity entity in room.Entities)
            {
                // if creature
                if (entity is Enemy)
                {
                    // if different faction
                    if (((Enemy)entity).Side != Side)
                    {
                        if (Math.Abs(entity.Position.X - Position.X) + Math.Abs(entity.Position.Y - Position.Y) == 1)
                        {
                            Attacks.AddLast(new Attack((Enemy)entity));
                        }
                    }
                }
            }
        }

        private Movement ChooseBest(Player kevin)
        {
            Movement result = new Movement((int)Position.X, (int)Position.Y, 0);
            int heurisitc = (int)(Math.Abs(kevin.Position.X - Position.X) + Math.Abs(kevin.Position.Y - (Position.Y)));
            int temp = 0;
            foreach (Movement movement in Movements)
            {
                temp = (int)(Math.Abs(kevin.Position.X - (movement.X)) + Math.Abs(kevin.Position.Y - (movement.Y)));
                if (temp < heurisitc)
                {
                    heurisitc = temp;
                    result = movement;
                }
                temp = 0;
            }
            return result;
        }

        public override string GetClass()
        {
            return "Enemy";
        }


    }
}
