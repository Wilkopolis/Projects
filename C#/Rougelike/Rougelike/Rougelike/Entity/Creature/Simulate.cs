using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.Xna.Framework;

namespace Rougelike
{

    /*
     *  This is all stuff for creatures moving and attacking 
     */
    partial class Rougelike
    {
        // How much I want the tilemovement to cost in AP
        // This is here for ease of change
        int mod = 1;

        bool Deal(Fighter victim, float damage)
        {
            victim.HP -= (int)Math.Round(damage);

            if (victim.HP <= 0)
            {
                if (victim is Enemy)
                {
                    Save.GetRoom().Remove(victim);
                    Save.GetRoom().UpdateTiles();
                    return true;
                }
            }
            return false;
        }

        bool Attack(Fighter attacker, Fighter victim)
        {
            // Calculate Damage
            float damage = attacker.GetDamage();

            // If we have enough AP
            if (attacker.AP >= attacker.GetAttackCost())
            {
                attacker.AP -= attacker.GetAttackCost();

                // Apply Attacker Effects
                Dictionary<Effect, int> mods = attacker.GetOffensiveEffects();

                foreach (Effect E in mods.Keys)
                {
                    ApplyEffects(attacker, victim, E, mods[E], damage);
                }

                // Apply Defensive Effects
                mods = victim.GetDefensiveEffects();
                foreach (Effect E in mods.Keys)
                {
                    ApplyEffects(attacker, victim, E, mods[E], damage);
                }

                // Apply Damage
                return Deal(victim, damage);
            }
            return false;
        }

        void DoTurn(Enemy star)
        {
            // Calc Moves
            star.Movements = new LinkedList<Movement>();
            if (star.Brains == Nature.DUMB)
            {
                GetEnemyMovementOptions(star);
            }
            else
            {
                AStarHorseshit(star, 1);
            }

            // Do Movements
            if (star.Brains == Nature.SMART)
            {
                while (star.AP > 0 && star.Movements.Count != 0)
                {
                    star.Position = star.Movements.First.Value.GetVector();
                    star.AP = star.AP - star.Movements.First.Value.Cost;
                    Save.GetRoom().Tiles[(int)star.Position.X, (int)star.Position.Y].Solid = true;
                    star.Movements.Remove(star.Movements.First);
                }
            }
            else
            {
                int distance;
                do
                {
                    distance = (int)(Math.Abs(Save.Kevin.Position.X - star.Position.X) + Math.Abs(Save.Kevin.Position.Y - star.Position.Y));
                    Movement result = ChooseBest(star);
                    star.Position = new Vector2(result.X, result.Y);
                    star.AP = star.AP - result.Cost;
                    Save.GetRoom().Tiles[(int)star.Position.X, (int)star.Position.Y].Solid = true;
                    GetEnemyMovementOptions(star);
                }
                while (distance != (int)(Math.Abs(Save.Kevin.Position.X - (star.Position.X)) + Math.Abs(Save.Kevin.Position.Y - (star.Position.Y))) && star.AP > 0);
            }

            //Get Attack Options
            GetEnemyAttackOptions(star);
            if (Math.Abs(Save.Kevin.Position.X - star.Position.X) + Math.Abs(Save.Kevin.Position.Y - (star.Position.Y)) == 1)
            {
                while (star.AP >= star.GetAttackCost() && star.HP >= 0)
                {
                    Attack(star, Save.Kevin);
                }
            }
            if (star.HP <= 0)
            {
                Save.Kevin.Experience += star.XP;
            }
            Save.GetRoom().UpdateTiles();
            star.ApplyEndTurnEffects();
        }

        bool DoAttack(Attack attack)
        {
            if (Attack(Save.Kevin, attack.Target))
            {
                if (Save.GetRoom().IsClear())
                {
                    Save.GetRoom().AddToRoom(GenerateRoomPrize());
                }
                Save.Kevin.Experience++;
            }
            return true;
        }

        bool DoMovement(Movement movement)
        {
            if (Save.Kevin.AP >= movement.Cost)
            {
                Save.Kevin.Position = new Vector2(movement.X, movement.Y);
                Save.Kevin.AP = Save.Kevin.AP - movement.Cost;
                Save.GetRoom().UpdateTiles();
                return true;
            }
            return false;
        }

        public void GetEnemyMovementOptions(Enemy mover)
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
                        if (!Save.GetRoom().Tiles[movement.X, movement.Y - 1].Solid)
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
                        if (!Save.GetRoom().Tiles[movement.X - 1, movement.Y].Solid)
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
                        if (!Save.GetRoom().Tiles[movement.X + 1, movement.Y].Solid)
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
                        if (!Save.GetRoom().Tiles[movement.X, movement.Y + 1].Solid)
                        {
                            Movement next = new Movement(movement.X, movement.Y + 1, cost);
                            if (!(mover.Movements.Contains(next)))
                            {
                                mover.Movements.AddLast(next);
                            }
                        }
                    }
                }
                duration -= mod;
            }
        }

        void GetEnemyAttackOptions(Enemy attacker)
        {
            attacker.Attacks = new List<Attack>();
            foreach (Entity entity in Save.GetRoom().Entities)
            {
                // if creature
                if (entity is Enemy)
                {
                    // if different faction
                    if (((Enemy)entity).Side != attacker.Side)
                    {
                        if (Math.Abs(entity.Position.X - attacker.Position.X) + Math.Abs(entity.Position.Y - attacker.Position.Y) == 1)
                        {
                            attacker.Attacks.Add(new Attack((Enemy)entity));
                        }
                    }
                }
            }
        }

        void UpdatePlayerOptions()
        {
            Save.GetRoom().Entities.RemoveAll(entity => entity is Enemy && ((Enemy)entity).HP <= 0);
            GameButtons.RemoveAll(item => item is Attack || item is Movement);
            if (Save.GetRoom().IsClear())
            {
                for (int i = 0; i < 15; i++)
                {
                    for (int j = 0; j < 10; j++)
                    {
                        if (!Save.GetRoom().Tiles[i, j].Solid)
                            GameButtons.Add(new Movement(i, j));
                    }
                }
                Save.Kevin.AP = Save.Kevin.MaxAP;
            }
            else
                GetPlayerMovementOptions();

            GetPlayerAttackOptions();
        }

        void GetPlayerMovementOptions()
        {
            List<Movement> openset = new List<Movement>();
            openset.Add(new Movement((int)Save.Kevin.Position.X, (int)Save.Kevin.Position.Y, 0));

            int duration = Save.Kevin.AP;
            int initialduration = Save.Kevin.AP;
            int cost = 0;
            while (duration >= mod)
            {
                // How much a movement costs in AP
                cost = initialduration - duration + mod;
                int count = openset.Count();
                for (int i = 0; i < count; i++)
                {
                    Movement movement = openset.ElementAt(i);
                    if (movement.Y > 0)
                    {
                        if (!Save.GetRoom().Tiles[movement.X, movement.Y - 1].Solid)
                        {
                            Movement next = new Movement(movement.X, movement.Y - 1, cost);
                            if (!(openset.Contains(next)))
                            {
                                openset.Add(next);
                            }
                        }
                    }
                    if (movement.X > 0)
                    {
                        if (!Save.GetRoom().Tiles[movement.X - 1, movement.Y].Solid)
                        {
                            Movement next = new Movement(movement.X - 1, movement.Y, cost);
                            if (!(openset.Contains(next)))
                            {
                                openset.Add(next);
                            }
                        }
                    }
                    if (movement.X < 14)
                    {
                        if (!Save.GetRoom().Tiles[movement.X + 1, movement.Y].Solid)
                        {
                            Movement next = new Movement(movement.X + 1, movement.Y, cost);
                            if (!(openset.Contains(next)))
                            {
                                openset.Add(next);
                            }
                        }
                    }
                    if (movement.Y < 9)
                    {
                        if (!Save.GetRoom().Tiles[movement.X, movement.Y + 1].Solid)
                        {
                            Movement next = new Movement(movement.X, movement.Y + 1, cost);
                            if (!(openset.Contains(next)))
                            {
                                openset.Add(next);
                            }
                        }
                    }
                }
                duration -= mod;
            }
            openset.Remove(new Movement((int)Save.Kevin.Position.X, (int)Save.Kevin.Position.Y, 0));
            foreach (Movement move in openset)
            {
                GameButtons.Add(move);
            }
        }

        void GetPlayerAttackOptions()
        {
            foreach (Entity entity in Save.GetRoom().Entities)
            {
                // if creature
                if (entity is Enemy)
                {
                    // if different faction
                    if (((Enemy)entity).Side != Save.Kevin.Side)
                    {
                        if (Math.Abs(entity.Position.X - Save.Kevin.Position.X) + Math.Abs(entity.Position.Y - Save.Kevin.Position.Y) == 1)
                        {
                            GameButtons.Add(new Attack((Enemy)entity));
                        }
                    }
                }
            }
        }
        
        Movement ChooseBest(Enemy star)
        {
            Movement result = new Movement((int)star.Position.X, (int)star.Position.Y, 0);
            int heurisitc = (int)(Math.Abs(Save.Kevin.Position.X - star.Position.X) + Math.Abs(Save.Kevin.Position.Y - star.Position.Y));
            int temp = 0;
            foreach (Movement movement in star.Movements)
            {
                temp = (int)(Math.Abs(Save.Kevin.Position.X - movement.X) + Math.Abs(Save.Kevin.Position.Y - movement.Y));
                if (temp < heurisitc)
                {
                    heurisitc = temp;
                    result = movement;
                }
                temp = 0;
            }
            return result;
        }

        void AStarHorseshit(Enemy mover, int Distance)
        {
            LinkedList<AStarNode> closedset = new LinkedList<AStarNode>();
            LinkedList<AStarNode> openset = new LinkedList<AStarNode>();

            AStarNode current = new AStarNode();
            current.X = (int)mover.Position.X;
            current.Y = (int)mover.Position.Y;
            current.fscore = (int)CalcFScore(current, Save.Kevin);

            openset.AddLast(current);

            while (openset.Count() != 0)
            {
                current = FindLowestFScore(openset, Save.Kevin);
                if (Math.Abs(Save.Kevin.Position.X - current.X) + Math.Abs(Save.Kevin.Position.Y - current.Y) == Distance)
                {
                    break;
                }
                openset.Remove(current);
                closedset.AddLast(current);
                foreach (AStarNode a in closedset)
                {
                    if (a.Y - 1 >= 0)
                    {
                        if (!Save.GetRoom().Tiles[a.X, a.Y - 1].Solid)
                        {
                            AStarNode next = new AStarNode();
                            next.X = a.X;
                            next.Y = a.Y - 1;
                            next.previous = a;
                            next.fscore = CalcFScore(next, Save.Kevin);
                            if (!closedset.Contains(next))
                            {
                                if (!openset.Contains(next))
                                    openset.AddLast(next);
                            }
                        }
                    }
                    if (a.X - 1 >= 0)
                    {
                        if (!Save.GetRoom().Tiles[a.X - 1, a.Y].Solid)
                        {
                            AStarNode next = new AStarNode();
                            next.X = a.X - 1;
                            next.Y = a.Y;
                            next.previous = a;
                            next.fscore = CalcFScore(next, Save.Kevin);
                            if (!closedset.Contains(next))
                            {
                                if (!openset.Contains(next))
                                    openset.AddLast(next);
                            }
                        }
                    }
                    if (a.X + 1 < 15)
                    {
                        if (!Save.GetRoom().Tiles[a.X + 1, a.Y].Solid)
                        {
                            AStarNode next = new AStarNode();
                            next.X = a.X + 1;
                            next.Y = a.Y;
                            next.previous = a;
                            next.fscore = CalcFScore(next, Save.Kevin);
                            if (!closedset.Contains(next))
                            {
                                if (!openset.Contains(next))
                                    openset.AddLast(next);
                            }
                        }
                    }
                    if (a.Y + 1 < 10)
                    {
                        if (!Save.GetRoom().Tiles[a.X, a.Y + 1].Solid)
                        {
                            AStarNode next = new AStarNode();
                            next.X = a.X;
                            next.Y = a.Y + 1;
                            next.previous = a;
                            next.fscore = CalcFScore(next, Save.Kevin);
                            if (!closedset.Contains(next))
                            {
                                if (!openset.Contains(next))
                                    openset.AddLast(next);
                            }
                        }
                    }
                }
            }
            if (Math.Abs(Save.Kevin.Position.X - current.X) + Math.Abs(Save.Kevin.Position.Y - current.Y) == Distance)
            {
                while (current.previous != null)
                {
                    mover.Movements.AddFirst(new Movement((int)current.X, (int)current.Y, mod));
                    current = current.previous;
                }
            }
            else
            {
                AStarHorseshit(mover, ++Distance);
            }
        }

        AStarNode FindLowestFScore(LinkedList<AStarNode> list, Player kevin)
        {
            AStarNode result = list.ElementAt(0);
            result.fscore = CalcFScore(result, kevin);
            foreach (AStarNode node in list)
            {
                node.fscore = CalcFScore(node, kevin);
                if (node.fscore <= result.fscore)
                {
                    result = node;
                }
            }
            return result;
        }

        int CalcFScore(AStarNode node, Player kevin)
        {
            //Calc hscore
            int up = (int)(Math.Abs(kevin.Position.X - node.X) + Math.Abs((kevin.Position.Y - 1) - node.Y));
            int down = (int)(Math.Abs(kevin.Position.X - node.X) + Math.Abs((kevin.Position.Y + 1) - node.Y));
            int left = (int)(Math.Abs((kevin.Position.X - 1) - node.X) + Math.Abs(kevin.Position.Y - node.Y));
            int right = (int)(Math.Abs((kevin.Position.X + 1) - node.X) + Math.Abs(kevin.Position.Y - node.Y));

            if (up <= down && up <= left && up <= right)
                node.hscore = up;
            else if (down <= up && down <= left && down <= right)
                node.hscore = down;
            else if (left <= up && left <= down && left <= right)
                node.hscore = left;
            else if (right <= up && right <= down && right <= left)
                node.hscore = right;

            //Calc gscore
            int count = 0;
            AStarNode current = node;
            while (current.previous != null)
            {
                count++;
                current = current.previous;
            }
            node.gscore = count;
            return node.gscore + node.hscore;
        }        
    }

    class AStarNode : IEquatable<AStarNode>
    {
        public int X;
        public int Y;
        public int fscore;
        public int hscore;
        public int gscore;

        public AStarNode previous;

        public bool Equals(AStarNode other)
        {
            return other.X == X && other.Y == Y;
        }
    }
}
