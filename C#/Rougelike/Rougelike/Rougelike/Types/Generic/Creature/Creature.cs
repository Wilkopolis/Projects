using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.Xna.Framework;
using Rougelike.Util;
using Rougelike.Types;

namespace Rougelike.Types
{
    public partial class Creature : Entity
    {
        public enum Faction { COOLGUY, NERD, SOVIET}

        public LinkedList<Movement> Movements;
        public LinkedList<Attack> Attacks;
        public int HP;
        public int AP;
        public int MaxAP;
        public int MaxHP;
        public Faction Side;
        public int Texture;
        public string Nature;
        public Equipment Equipment;
        public float Style;
        public bool Dead;

        // How much I want the tilemovement to cost in AP
        // This is here for ease of change
        private static int mod = 20;

        public Creature Copy()
        {
            Creature Result = new Creature();
            Result.HP = HP;
            Result.MaxHP = MaxHP;
            Result.AP = AP;
            Result.MaxAP = MaxAP;
            Result.Name = Name;
            Result.Nature = Nature;
            Result.Origin = Origin;
            Result.Position = Position;
            Result.Texture = Texture;
            Result.Side = Side;
            Result.Equipment = Equipment;
            return Result;
        }

        public void EndTurn()
        {
            AP = MaxAP;
            Style *= .8f;
            if (Style < 1)
                Style = 1;
        }

        public void PickUp(Item item)
        {
            Equipment.AddToInventory(item);
        }

        public static bool Attack(Creature attacker, Creature victim, Room room)
        {
            // Calculate Damage
            float damage = attacker.Equipment.GetDamage(attacker.Style);

            // If we have enough AP
            if (attacker.AP >= attacker.Equipment.GetAttackCost())
            {
                attacker.AP -= attacker.Equipment.GetAttackCost();
                
                // Apply Attacker Effects
                Dictionary<Item.Effect, int> mods = attacker.Equipment.GetOffensiveEffects();
                foreach (Item.Effect E in mods.Keys)
                {
                    ApplyEffects(attacker, victim, room, E, mods[E], damage);
                }

                // Apply Defensive Effects
                mods = victim.Equipment.GetDefensiveEffects();
                foreach (Item.Effect E in mods.Keys)
                {
                    ApplyEffects(attacker, victim, room, E, mods[E], damage);
                }

                // Apply Damage
                return Deal(attacker, victim, room, damage);
            }
            return false;
        }

        private static void GetMovementOptions(Creature mover, Room room)
        {            
            mover.Movements.AddLast(new Movement((int)mover.Position.X, (int)mover.Position.Y, 0));

            int duration = mover.AP;
            int initialduration = mover.AP;
            int cost = 0;
            while (duration >= mod)
            {
                // How much a movement costs in AP
                cost = initialduration - duration + mod;  
                int count = mover.Movements.Count();
                for (int i = 0; i < count; i++)
                {
                    Movement movement = mover.Movements.ElementAt(i);
                    if (movement.Y > 0)
                    {
                        if (!room.Tiles[movement.X, movement.Y - 1].Solid)
                        {
                            Movement next = new Movement(movement.X, movement.Y - 1, cost);
                            if (!(mover.Movements.Contains(next)))
                            {
                                mover.Movements.AddLast(next);
                            }
                        }
                    }
                    if (movement.X > 0)
                    {
                        if (!room.Tiles[movement.X - 1, movement.Y].Solid)
                        {
                            Movement next = new Movement(movement.X - 1, movement.Y, cost);
                            if (!(mover.Movements.Contains(next)))
                            {
                                mover.Movements.AddLast(next);
                            }
                        }
                    }
                    if (movement.X < 14)
                    {
                        if (!room.Tiles[movement.X + 1, movement.Y].Solid)
                        {
                            Movement next = new Movement(movement.X + 1, movement.Y, cost);
                            if (!(mover.Movements.Contains(next)))
                            {
                                mover.Movements.AddLast(next);
                            }
                        }
                    }
                    if (movement.Y < 9)
                    {
                        if (!room.Tiles[movement.X, movement.Y + 1].Solid)
                        {
                            Movement next = new Movement(movement.X, movement.Y + 1, cost);
                            if (!(mover.Movements.Contains(next)))
                            {
                                mover.Movements.AddLast(next);
                            }
                        }
                    }
                }
                duration-=mod;
            }
            if (!(mover is Enemy))
                mover.Movements.RemoveFirst();
        }

        private static void GetAttackOptions(Creature attacker, Room room)
        {
            attacker.Attacks = new LinkedList<Attack>();
            foreach (Entity entity in room.EntityList)
            {
                // if creature
                if (entity is Creature)
                {
                    // if different faction
                    if (((Creature)entity).Side != attacker.Side)
                    {
                        if (Math.Abs(entity.Position.X - attacker.Position.X) + Math.Abs(entity.Position.Y - attacker.Position.Y) == 1)
                        {
                            attacker.Attacks.AddLast(new Attack((Creature)entity));
                        }
                    }
                }
            }
        }

        public static bool DoTurn(Creature mover, Room room, Player kevin)
        {
            mover.Movements = new LinkedList<Movement>();

            // Calc Moves
            if (room.HasEnemy())
            {
                if (mover.Nature == "dumb")
                {
                    GetMovementOptions(mover, room);
                }
                else
                {
                    AStarHorseshit((Enemy)mover, kevin, room, 1);
                }
            }
            else
            {
                for (int i = 0; i < 10; i++)
                {
                    for (int j = 0; j < 15; j++)
                    {
                        if (!room.Tiles[j, i].Solid)
                            kevin.Movements.AddLast(new Movement(j, i, 0));
                    }
                }
                kevin.AP = kevin.MaxAP;
            }

            // Do Movements
            if(!(mover is Player))
            {
                if (mover.Nature == "smart")
                {
                    while (mover.AP > 0 && mover.Movements.Count != 0)
                    {
                        room.Tiles[(int)mover.Position.X, (int)mover.Position.Y].Solid = false;
                        mover.Position = mover.Movements.First.Value.GetVector();
                        room.Tiles[(int)mover.Position.X, (int)mover.Position.Y].Solid = true;
                        mover.AP = mover.AP - mover.Movements.First.Value.Cost;
                        mover.Movements.Remove(mover.Movements.First);
                    }
                }
                else
                {
                    int distance;
                    do
                    {
                        distance = (int)(Math.Abs(kevin.Position.X - mover.Position.X) + Math.Abs(kevin.Position.Y - mover.Position.Y));
                        Movement result = ChooseBest(mover, kevin);
                        // this tile is now unobstructed
                        room.Tiles[(int)mover.Position.X, (int)mover.Position.Y].Solid = false;
                        mover.Position = new Vector2(result.X, result.Y);
                        mover.AP = mover.AP - result.Cost;
                        // the new one now is
                        room.Tiles[(int)mover.Position.X, (int)mover.Position.Y].Solid = true;
                        GetMovementOptions(mover, room);
                    }
                    while (distance != (int)(Math.Abs(kevin.Position.X - (mover.Position.X)) + Math.Abs(kevin.Position.Y - (mover.Position.Y))) && mover.AP > 0);
                }
            }

            //Get Attack Options
            Creature.GetAttackOptions(mover, room);

            if (mover is Player)
            {
                if (((Player)mover).Attacks.Count >= 1)
                {
                    ((Player)mover).Selection = 0;
                }
                else
                    ((Player)mover).Selection = -1;
            }
            else
            {
                if (Math.Abs(kevin.Position.X - mover.Position.X) + Math.Abs(kevin.Position.Y - (mover.Position.Y)) == 1)
                {
                    while (mover.AP > mover.Equipment.GetAttackCost())
                    {
                        if (Attack(mover, kevin, room))
                            return true;
                    }
                }
            }
            return false;
        }

        private static Movement ChooseBest(Creature mover, Player kevin)
        {
            Movement result = new Movement((int)mover.Position.X, (int)mover.Position.Y, 0);
            int heurisitc = (int)(Math.Abs(kevin.Position.X - mover.Position.X) + Math.Abs(kevin.Position.Y - (mover.Position.Y)));
            int temp = 0;
            foreach (Movement movement in mover.Movements)
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

        public override string[] GetModStrings()
        {
            Dictionary<Item.Effect, int> Mods = Equipment.GetEffects();

            LinkedList<string> mods = new LinkedList<string>();
            foreach (Item.Effect E in Mods.Keys)
            {
                if ((int)E < 100)
                    mods.AddLast(Item.ModToString(E) + " " + Item.StrengthToString(Mods[E]));
            }

            string[] result = {"","","",""};
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

        public override string GetClass()
        {
            if (Side == Faction.NERD)
            {
                return "Nerd";
            }
            else
            {
                return "Cool Guy";
            }
        }
    }
}
