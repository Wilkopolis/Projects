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

        bool DoAttack(Attack attack)
        {
            if (Attack(Save.Kevin, attack.Target))
            {
                if (Save.Kevin.Class != Class.MASTERMIND)
                    Save.Kevin.Experience++;
                if (Save.GetRoom().Entities.FindAll(entity => entity is Enemy && ((Enemy)entity).HP > 0).Count == 0)
                {
                    Save.GetRoom().AddToRoom(GeneratePrize());
                }
            }
            return true;
        }

        bool Deal(Fighter victim, float damage)
        {
            victim.HP -= (int)Math.Round(damage);

            if (victim.HP <= 0)
            {
                return true;
            }
            return false;
        }

        bool Attack(Fighter attacker, Fighter victim)
        {
            // Calculate Damage
            float damage = attacker.GetDamage(Random);

            // If we have enough AP
            if (attacker.AP >= attacker.GetAttackCost())
            {
                attacker.AP -= attacker.GetAttackCost();

                // Apply Damage
                Deal(victim, damage);

                // Apply Attacker Effects
                Dictionary<Effect, int> mods = attacker.GetOffensiveEffects();
                foreach (Effect E in mods.Keys)
                {
                    ApplyEffect(attacker, victim, E, mods[E], damage);
                }

                // Apply Defensive Effects
                mods = victim.GetDefensiveEffects();
                foreach (Effect E in mods.Keys)
                {
                    ApplyEffect(attacker, victim, E, mods[E], damage);
                }
            }
            return victim.HP <= 0;
        }

        void DoEnemyTurns()
        {
            while (APLeft())
            {
                foreach (Enemy enemy in Save.GetRoom().Entities.FindAll(entity => entity is Enemy))
                {
                    if (AreAdjacent(enemy, Save.Kevin))
                    {
                        if (!FindAnotherSpot(enemy))
                            Fight(enemy);
                    }
                    else
                    {
                        Movement move = GetNextMove(enemy);
                        Enemy inmyway = SpotIsClear(move);
                        if (inmyway == null)
                        {
                            Take(enemy, move);
                            enemy.WaitingOn = null;
                        }
                        else
                        {
                            if (enemy.WaitingOn == inmyway && inmyway.AP == 0)
                                enemy.AP = 0;
                            else
                                enemy.WaitingOn = inmyway;
                        }
                    }
                }
            }
            foreach (Enemy enemy in Save.GetRoom().Entities.FindAll(entity => entity is Enemy))
            {
                enemy.ApplyEndTurnEffects();
            }
            Save.GetRoom().UpdateTiles();
        }

        bool FindAnotherSpot(Enemy me)
        {
            foreach (Enemy enemy in Save.GetRoom().Entities.FindAll(entity => entity is Enemy))
            {
                if (enemy.WaitingOn == me)
                {
                    int left = 100, right = 100, up = 100, down = 100;
                    if (Save.Kevin.Position.X > 0)
                    {
                        if (!Save.GetRoom().Tiles[(int)Save.Kevin.Position.X - 1, (int)Save.Kevin.Position.Y].Solid)
                        {
                            left = (int)(Math.Abs(Save.Kevin.Position.X - 1 - me.Position.X) + Math.Abs(Save.Kevin.Position.Y - me.Position.Y));
                        }
                    }
                    if (Save.Kevin.Position.Y > 0)
                    {
                        if (!Save.GetRoom().Tiles[(int)Save.Kevin.Position.X, (int)Save.Kevin.Position.Y - 1].Solid)
                        {
                            up = (int)(Math.Abs(Save.Kevin.Position.X - me.Position.X) + Math.Abs(Save.Kevin.Position.Y - 1 - me.Position.Y));
                        }
                    }
                    if (Save.Kevin.Position.X < 14)
                    {
                        if (!Save.GetRoom().Tiles[(int)Save.Kevin.Position.X + 1, (int)Save.Kevin.Position.Y].Solid)
                        {
                            right = (int)(Math.Abs(Save.Kevin.Position.X + 1 - me.Position.X) + Math.Abs(Save.Kevin.Position.Y - me.Position.Y));
                        }
                    }
                    if (Save.Kevin.Position.Y < 9)
                    {
                        if (!Save.GetRoom().Tiles[(int)Save.Kevin.Position.X, (int)Save.Kevin.Position.Y + 1].Solid)
                        {
                            down = (int)(Math.Abs(Save.Kevin.Position.X - me.Position.X) + Math.Abs(Save.Kevin.Position.Y + 1 - me.Position.Y));
                        }
                    }
                    if (up != 0 && up < down && up < left && up < right)
                    {
                        AStarHorseshit(me, 1, Save.Kevin.Position - new Vector2(0, 1));
                    }
                    else if (left != 0 && left < down && left < up && left < right)
                    {
                        AStarHorseshit(me, 1, Save.Kevin.Position - new Vector2(1, 0));
                    }
                    else if (right != 0 && right < down && right < up && right < left)
                    {
                        AStarHorseshit(me, 1, Save.Kevin.Position + new Vector2(1, 0));
                    }
                    else if (down != 0 && down < right && down < up && down < left)
                    {
                        AStarHorseshit(me, 1, Save.Kevin.Position + new Vector2(0, 1));
                    }
                     if (me.Movements.Count > 0)
                    {
                        Enemy inmyway = SpotIsClear(me.Movements.First.Value);
                        if (inmyway == null)
                            Take(enemy, me.Movements.First.Value);
                    }
                }
            }
            return false;
        }

        void Fight(Enemy enemy)
        {
            while (enemy.AP >= enemy.GetAttackCost() && enemy.HP >= 0)
            {
                Attack(enemy, Save.Kevin);
            }
        }

        Movement GetNextMove(Enemy enemy)
        {
            enemy.Movements = new LinkedList<Movement>();
            Save.GetRoom().UpdateTilesForEnemy();
            AStarHorseshit(enemy, 1, Save.Kevin.Position);
            LinkedList<Movement> flatmovements = new LinkedList<Movement>(enemy.Movements);
            int flatvalue = enemy.Movements.Count;
            foreach (Movement movement in enemy.Movements)
            {
                foreach (Entity entity in Save.GetRoom().Entities)
                {
                    if (entity is Enemy)
                    {
                        if (movement.GetVector() == entity.Position)
                        {
                            flatvalue += 4;
                        }
                    }
                }
            }
            enemy.Movements = new LinkedList<Movement>();
            Save.GetRoom().UpdateTiles();
            AStarHorseshit(enemy, 1, Save.Kevin.Position);
            int tallvalue = enemy.Movements.Count;
            if (flatvalue < tallvalue || tallvalue == 0)
                return flatmovements.First.Value;
            else
                return enemy.Movements.First.Value;
        }

        void Take(Enemy enemy, Movement movement)
        {
            Save.GetRoom().Tiles[(int)enemy.Position.X, (int)enemy.Position.Y].Solid = false;
            enemy.Position = movement.GetVector();
            enemy.AP--;
            Save.GetRoom().Tiles[(int)enemy.Position.X, (int)enemy.Position.Y].Solid = true;
        }

        bool APLeft()
        {
            foreach (Enemy enemy in Save.GetRoom().Entities.FindAll(entity => entity is Enemy))
            {
                if (enemy.AP > 0)
                    return true;
            }
            return false;
        }

        Enemy SpotIsClear(Movement movement)
        {
            foreach (Enemy enemy in Save.GetRoom().Entities.FindAll(entity => entity is Enemy))
            {
                if (enemy.Position == movement.GetVector())
                {
                    return enemy;
                }
            }
            return null;
        }

        bool AreAdjacent(Entity one, Entity two)
        {
            return Math.Abs(one.Position.X - two.Position.X) + Math.Abs(one.Position.Y - two.Position.Y) == 1;
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
            mover.Movements.AddLast(new Movement(MovementSprite, (int)mover.Position.X, (int)mover.Position.Y, 0));

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
                            Movement next = new Movement(MovementSprite, movement.X, movement.Y - 1, cost);
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
                            Movement next = new Movement(MovementSprite, movement.X - 1, movement.Y, cost);
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
                            Movement next = new Movement(MovementSprite, movement.X + 1, movement.Y, cost);
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
                            Movement next = new Movement(MovementSprite, movement.X, movement.Y + 1, cost);
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

        void UpdatePlayerOptions()
        {
            GameButtons.RemoveAll(item => item is Attack || item is Movement);
            Save.GetRoom().UpdateTiles();
            if (Save.GetRoom().IsClear())
            {
                for (int i = 0; i < 15; i++)
                {
                    for (int j = 0; j < 10; j++)
                    {
                        if (!Save.GetRoom().Tiles[i, j].Solid)
                            GameButtons.Add(new Movement(MovementSprite, i, j));
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
            openset.Add(new Movement(MovementSprite, (int)Save.Kevin.Position.X, (int)Save.Kevin.Position.Y, 0));

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
                            Movement next = new Movement(MovementSprite, movement.X, movement.Y - 1, cost);
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
                            Movement next = new Movement(MovementSprite, movement.X - 1, movement.Y, cost);
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
                            Movement next = new Movement(MovementSprite, movement.X + 1, movement.Y, cost);
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
                            Movement next = new Movement(MovementSprite, movement.X, movement.Y + 1, cost);
                            if (!(openset.Contains(next)))
                            {
                                openset.Add(next);
                            }
                        }
                    }
                }
                duration -= mod;
            }
            openset.Remove(new Movement(MovementSprite, (int)Save.Kevin.Position.X, (int)Save.Kevin.Position.Y, 0));
            foreach (Movement move in openset)
            {
                GameButtons.Add(move);
            }
        }

        void GetPlayerAttackOptions()
        {
            foreach (Enemy enemy in Save.GetRoom().Entities.FindAll(entity => entity is Enemy))
            {
                if (enemy.Side != Save.Kevin.Side)
                {
                    if (Math.Abs(enemy.Position.X - Save.Kevin.Position.X) + Math.Abs(enemy.Position.Y - Save.Kevin.Position.Y) == 1)
                    {
                        GameButtons.Add(new Attack(enemy));
                    }
                }
            }
        }

        Movement ChooseBest(Enemy star)
        {
            Movement result = new Movement(MovementSprite, (int)star.Position.X, (int)star.Position.Y, 0);
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

        /*  WHEN
         *  When an Enemy needs to know where to go
         *  
         *  WHAT
         *  Fills an enemy with a linked list of movements toward
         *  the player
         */
        void AStarHorseshit(Enemy mover, int Distance, Vector2 destination)
        {
            LinkedList<AStarNode> closedset = new LinkedList<AStarNode>();
            LinkedList<AStarNode> openset = new LinkedList<AStarNode>();

            AStarNode current = new AStarNode(mover.Position.X, mover.Position.Y);
            current.FScore = CalcFScore(current);

            openset.AddLast(current);

            while (openset.Count() != 0)
            {
                current = FindLowestFScore(openset);
                if (Math.Abs(destination.X - current.X) + Math.Abs(destination.Y - current.Y) == Distance)
                {
                    break;
                }
                openset.Remove(current);
                closedset.AddLast(current);
                foreach (AStarNode node in closedset)
                {
                    if (node.Y - 1 >= 0)
                    {
                        if (!Save.GetRoom().Tiles[node.X, node.Y - 1].Solid)
                        {
                            AStarNode next = new AStarNode(node.X, node.Y - 1, node);
                            next.FScore = CalcFScore(next);
                            if (!closedset.Contains(next))
                            {
                                if (!openset.Contains(next))
                                    openset.AddLast(next);
                            }
                        }
                    }
                    if (node.X - 1 >= 0)
                    {
                        if (!Save.GetRoom().Tiles[node.X - 1, node.Y].Solid)
                        {
                            AStarNode next = new AStarNode(node.X - 1, node.Y, node);
                            next.FScore = CalcFScore(next);
                            if (!closedset.Contains(next))
                            {
                                if (!openset.Contains(next))
                                    openset.AddLast(next);
                            }
                        }
                    }
                    if (node.X + 1 < 15)
                    {
                        if (!Save.GetRoom().Tiles[node.X + 1, node.Y].Solid)
                        {
                            AStarNode next = new AStarNode(node.X + 1, node.Y, node);
                            next.FScore = CalcFScore(next);
                            if (!closedset.Contains(next))
                            {
                                if (!openset.Contains(next))
                                    openset.AddLast(next);
                            }
                        }
                    }
                    if (node.Y + 1 < 10)
                    {
                        if (!Save.GetRoom().Tiles[node.X, node.Y + 1].Solid)
                        {
                            AStarNode next = new AStarNode(node.X, node.Y + 1, node);
                            next.FScore = CalcFScore(next);
                            if (!closedset.Contains(next))
                            {
                                if (!openset.Contains(next))
                                    openset.AddLast(next);
                            }
                        }
                    }
                }
            }

            if (Math.Abs(destination.X - current.X) + Math.Abs(destination.Y - current.Y) == Distance)
            {
                while (current.Previous != null)
                {
                    mover.Movements.AddFirst(new Movement(MovementSprite, (int)current.X, (int)current.Y, mod));
                    current = current.Previous;
                }
            }
            else
            {
                AStarHorseshit(mover, ++Distance, destination);
            }
        }

        AStarNode FindLowestFScore(LinkedList<AStarNode> list)
        {
            AStarNode result = list.ElementAt(0);
            //result.FScore = CalcFScore(result);
            foreach (AStarNode node in list)
            {
                //node.FScore = CalcFScore(node);
                if (node.FScore <= result.FScore)
                {
                    result = node;
                }
            }
            return result;
        }

        int CalcFScore(AStarNode node)
        {
            //Calc hscore
            //int up = (int)(Math.Abs(Save.Kevin.Position.X - node.X) + Math.Abs((Save.Kevin.Position.Y - 1) - node.Y));
            //int down = (int)(Math.Abs(Save.Kevin.Position.X - node.X) + Math.Abs((Save.Kevin.Position.Y + 1) - node.Y));
            //int left = (int)(Math.Abs((Save.Kevin.Position.X - 1) - node.X) + Math.Abs(Save.Kevin.Position.Y - node.Y));
            //int right = (int)(Math.Abs((Save.Kevin.Position.X + 1) - node.X) + Math.Abs(Save.Kevin.Position.Y - node.Y));

            //if (up <= down && up <= left && up <= right)
            //    node.HScore = up;
            //else if (down <= up && down <= left && down <= right)
            //    node.HScore = down;
            //else if (left <= up && left <= down && left <= right)
            //    node.HScore = left;
            //else if (right <= up && right <= down && right <= left)
            //    node.HScore = right;

            node.HScore = (int)(Math.Abs(Save.Kevin.Position.X - node.X) + Math.Abs(Save.Kevin.Position.Y - node.Y));

            //Calc gscore
            int count = 0;
            AStarNode current = node;
            while (current.Previous != null)
            {
                count++;
                current = current.Previous;
            }
            node.GScore = count;
            return node.GScore + node.HScore;
        }
    }

    class AStarNode : IEquatable<AStarNode>
    {
        public int X;
        public int Y;
        public int FScore;
        public int HScore;
        public int GScore;

        public AStarNode Previous;

        public AStarNode(float x, float y, AStarNode previous)
        {
            X = (int)x;
            Y = (int)y;
            Previous = previous;
        }

        public AStarNode(float x, float y)
        {
            X = (int)x;
            Y = (int)y;
        }

        public bool Equals(AStarNode other)
        {
            return other.X == X && other.Y == Y;
        }
    }
}
