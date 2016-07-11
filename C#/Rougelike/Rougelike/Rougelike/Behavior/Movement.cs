using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Rougelike
{
    partial class Rougelike
    {
        Movement GetNextMove(Enemy enemy)
        {
            LinkedList<Movement> movements = new LinkedList<Movement>();

            Save.GetRoom().UpdateTilesForEnemy();
            //Save.GetRoom().UpdateTiles();
            //if (DebugAStar(enemy.Position, Save.Kevin.Position, 1, movements))
            //    return movements.ElementAt(0);
            //return null;

            AStar(enemy.Position, Save.Kevin.Position, 1, movements);
            Movement flatMove = movements.ElementAt(0);
            // Update path for enemies in our way

            int flatvalue = movements.Count;
            foreach (Movement movement in movements)
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

            // Update path for going around enemies

            movements = new LinkedList<Movement>();

            Save.GetRoom().UpdateTiles();

            AStar(enemy.Position, Save.Kevin.Position, 1, movements);

            int tallvalue = movements.Count;
            if (flatvalue < tallvalue || tallvalue == 0)
                return flatMove;
            else
                return movements.ElementAt(0);
        }

        void Take(Enemy enemy, Movement movement)
        {
            if (!Save.GetRoom().Tiles[movement.X, movement.Y].Solid)
            {
                Save.GetRoom().Tiles[(int)enemy.Position.X, (int)enemy.Position.Y].Solid = false;
                enemy.Position = movement.GetVector();
                Save.GetRoom().Tiles[(int)enemy.Position.X, (int)enemy.Position.Y].Solid = true;
            }
        }

        //void UpdatePlayerOptions()
        //{
        //    GameButtons.RemoveAll(item => item is Attack || item is Movement);
        //    Save.GetRoom().UpdateTiles();
        //    if (Save.GetRoom().IsClear())
        //    {
        //        for (int i = 0; i < 15; i++)
        //        {
        //            for (int j = 0; j < 10; j++)
        //            {
        //                if (!Save.GetRoom().Tiles[i, j].Solid)
        //                    GameButtons.Add(new Movement(MovementSprite, i, j));
        //            }
        //        }
        //        Save.Kevin.AP = Save.Kevin.MaxAP;
        //    }
        //    else
        //        GetPlayerMovementOptions();

        //    GetPlayerAttackOptions();
        //}

        //void GetPlayerMovementOptions()
        //{
        //    List<Movement> openset = new List<Movement>();
        //    openset.Add(new Movement(MovementSprite, (int)Save.Kevin.Position.X, (int)Save.Kevin.Position.Y, 0));

        //    int duration = Save.Kevin.AP;
        //    int initialduration = Save.Kevin.AP;
        //    int cost = 0;
        //    while (duration >= mod)
        //    {
        //        // How much a movement costs in AP
        //        cost = initialduration - duration + mod;
        //        int count = openset.Count();
        //        for (int i = 0; i < count; i++)
        //        {
        //            Movement movement = openset.ElementAt(i);
        //            if (movement.Y > 0)
        //            {
        //                if (!Save.GetRoom().Tiles[movement.X, movement.Y - 1].Solid)
        //                {
        //                    Movement next = new Movement(MovementSprite, movement.X, movement.Y - 1, cost);
        //                    if (!(openset.Contains(next)))
        //                    {
        //                        openset.Add(next);
        //                    }
        //                }
        //            }
        //            if (movement.X > 0)
        //            {
        //                if (!Save.GetRoom().Tiles[movement.X - 1, movement.Y].Solid)
        //                {
        //                    Movement next = new Movement(MovementSprite, movement.X - 1, movement.Y, cost);
        //                    if (!(openset.Contains(next)))
        //                    {
        //                        openset.Add(next);
        //                    }
        //                }
        //            }
        //            if (movement.X < 14)
        //            {
        //                if (!Save.GetRoom().Tiles[movement.X + 1, movement.Y].Solid)
        //                {
        //                    Movement next = new Movement(MovementSprite, movement.X + 1, movement.Y, cost);
        //                    if (!(openset.Contains(next)))
        //                    {
        //                        openset.Add(next);
        //                    }
        //                }
        //            }
        //            if (movement.Y < 9)
        //            {
        //                if (!Save.GetRoom().Tiles[movement.X, movement.Y + 1].Solid)
        //                {
        //                    Movement next = new Movement(MovementSprite, movement.X, movement.Y + 1, cost);
        //                    if (!(openset.Contains(next)))
        //                    {
        //                        openset.Add(next);
        //                    }
        //                }
        //            }
        //        }
        //        duration -= mod;
        //    }
        //    openset.Remove(new Movement(MovementSprite, (int)Save.Kevin.Position.X, (int)Save.Kevin.Position.Y, 0));
        //    foreach (Movement move in openset)
        //    {
        //        GameButtons.Add(move);
        //    }
        //}

        //AStarNode current;
        //bool firstRun = true;
        //HashSet<AStarNode> aaa = new HashSet<AStarNode>(), bbb = new HashSet<AStarNode>();
        //Texture2D aa, bb;

        //bool DebugAStar(Vector2I source, Vector2I destination, int distance, LinkedList<Movement> movements)
        //{
        //    //HashSet<AStarNode> triedNodes = new HashSet<AStarNode>();
        //    //HashSet<AStarNode> allNodes = new HashSet<AStarNode>();
        //    if (firstRun)
        //    {
        //        firstRun = false;
        //        current = new AStarNode((int)source.X, (int)source.Y, destination);

        //        aaa.Add(current);
        //    }

        //    //while (aaa.Count() != 0)
        //    {

        //        //if (continuea)
        //        //{

        //        current = GetBestNode(aaa);

        //        if (Math.Abs(destination.X - current.X) + Math.Abs(destination.Y - current.Y) == distance)
        //        {
        //            // We ended because we got close enough
        //            if (Math.Abs(destination.X - current.X) + Math.Abs(destination.Y - current.Y) == distance)
        //            {
        //                while (current.previous != null)
        //                {
        //                    movements.AddFirst(new Movement(MovementSprite, (int)current.X, (int)current.Y, mod));
        //                    current = current.previous;
        //                }
        //            }
        //            // We ended because we exhausted all options and we didnt get close enough
        //            else
        //            {
        //                AStar(source, destination, ++distance, movements);
        //            }
        //            return true;
        //        }

        //        aaa.Remove(current);
        //        bbb.Add(current);

        //        if (current.Y - 1 >= 0)
        //        {
        //            AStarNode next = new AStarNode(current.X, current.Y - 1, destination, current);
        //            if (!Save.GetRoom().Tiles[current.X, current.Y - 1].Solid && !ContainsNode(next, bbb) && !ContainsNode(next, aaa))
        //            {
        //                AddOrUpdate(next, aaa);
        //            }
        //        }
                
        //        if (current.X - 1 >= 0)
        //        {
        //            AStarNode next = new AStarNode(current.X - 1, current.Y, destination, current);
        //            if (!Save.GetRoom().Tiles[current.X - 1, current.Y].Solid && !ContainsNode(next, bbb) && !ContainsNode(next, aaa))
        //            {
        //                AddOrUpdate(next, aaa);
        //            }
        //        }


        //        if (current.X + 1 < 15)
        //        {
        //            AStarNode next = new AStarNode(current.X + 1, current.Y, destination, current);
        //            if (!Save.GetRoom().Tiles[current.X + 1, current.Y].Solid && !ContainsNode(next, bbb) && !ContainsNode(next, aaa))
        //            {
        //                AddOrUpdate(next, aaa);
        //            }
        //        }


        //        if (current.Y + 1 < 10)
        //        {
        //            AStarNode next = new AStarNode(current.X, current.Y + 1, destination, current);
        //            if (!Save.GetRoom().Tiles[current.X, current.Y + 1].Solid && !ContainsNode(next, bbb) && !ContainsNode(next, aaa))
        //            {
        //                AddOrUpdate(next, aaa);
        //            }
        //        }
        //        //continuea = false;
        //        //return false;
        //        //}
        //    }
        //    return false;

        //    // After pathing

        //    // We ended because we got close enough
        //    //if (Math.Abs(destination.X - current.X) + Math.Abs(destination.Y - current.Y) == distance)
        //    //{
        //    //    while (current.previous != null)
        //    //    {
        //    //        movements.AddFirst(new Movement(MovementSprite, (int)current.X, (int)current.Y, mod));
        //    //        current = current.previous;
        //    //    }
        //    //}
        //    //// We ended because we exhausted all options and we didnt get close enough
        //    //else
        //    //{
        //    //    AStar(source, destination, ++distance, movements);
        //    //}
        //}

        /*  WHEN
         *  When an Enemy needs to know where to go
         *  
         *  WHAT
         *  Fills an enemy with a linked list of movements toward
         *  the player
         */
        void AStar(Vector2I source, Vector2I destination, int distance, LinkedList<Movement> movements)
        {
            HashSet<AStarNode> triedNodes = new HashSet<AStarNode>();
            HashSet<AStarNode> allNodes = new HashSet<AStarNode>();

            AStarNode current = new AStarNode((int)source.X, (int)source.Y, destination);

            allNodesall.Add(current);

            while (allNodes.Count() != 0)
            {
                current = GetBestNode(allNodes);

                if (Math.Abs(destination.X - current.X) + Math.Abs(destination.Y - current.Y) == distance)
                {
                    break;
                }

                allNodes.Remove(current);
                triedNodes.Add(current);
                
                if (current.Y - 1 >= 0)
                {
                    AStarNode next = new AStarNode(current.X, current.Y - 1, destination, current);
                    if (!Save.GetRoom().Tiles[current.X, current.Y - 1].Solid && !ContainsNode(next, triedNodes))
                    {
                        AddOrUpdate(next, allNodes);
                    }
                }
                
                if (current.X - 1 >= 0)
                {
                    AStarNode next = new AStarNode(current.X - 1, current.Y, destination, current);
                    if (!Save.GetRoom().Tiles[current.X - 1, current.Y].Solid && !ContainsNode(next, triedNodes))
                    {
                        AddOrUpdate(next, allNodes);
                    }
                }
                
                if (current.X + 1 < 15)
                {
                    AStarNode next = new AStarNode(current.X + 1, current.Y, destination, current);
                    if (!Save.GetRoom().Tiles[current.X + 1, current.Y].Solid && !ContainsNode(next, triedNodes))
                    {
                        AddOrUpdate(next, allNodes);    
                    }
                }

                if (current.Y + 1 < 10)
                {
                    AStarNode next = new AStarNode(current.X, current.Y + 1, destination, current);
                    if (!Save.GetRoom().Tiles[current.X, current.Y + 1].Solid && !ContainsNode(next, triedNodes))
                    {
                        AddOrUpdate(next, allNodes);
                    }
                }
            }

            // After pathing

            // We ended because we got close enough
            if (Math.Abs(destination.X - current.X) + Math.Abs(destination.Y - current.Y) == distance)
            {
                while (current.previous != null)
                {
                    movements.AddFirst(new Movement(MovementSprite, (int)current.X, (int)current.Y, mod));
                    current = current.previous;
                }
            }
            // We ended because we exhausted all options and we didnt get close enough
            else
            {
                AStar(source, destination, ++distance, movements);
            }
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

        bool AddOrUpdate(AStarNode node, HashSet<AStarNode> nodes)
        {
            foreach (AStarNode n in nodes) {
                if (n.X == node.X && n.Y == node.Y) {
                    if (n.gScore > node.gScore) {
                        n.previous = node.previous;
                        n.gScore = node.gScore;
                        n.fScore = node.fScore;
                        return true;
                    }
                }
            }
            nodes.Add(node);
            return false;
        }

        bool ContainsNode(AStarNode node, HashSet<AStarNode> nodes)
        {
            foreach (AStarNode n in nodes)
            {
                if (n.X == node.X && n.Y == node.Y)
                {
                    return true;
                }
            }
            return false;
        }

        AStarNode GetBestNode(HashSet<AStarNode> list)
        {
            if (list.Count() == 0)
                return null;

            AStarNode result = list.ElementAt(0);

            foreach (AStarNode node in list)
            {
                if (node.fScore <= result.fScore)
                {
                    result = node;
                }
            }

            return result;
        }
    }

    class AStarNode : IEquatable<AStarNode>
    {
        public int X;
        public int Y;
        public int fScore;
        public int gScore = 0;

        public AStarNode previous;

        public AStarNode(int x, int y, Vector2I destination, AStarNode parent)
        {
            X = x;
            Y = y;
            previous = parent;
            gScore = previous.gScore + 1;
            fScore = CalculteFScore(destination);
        }

        public AStarNode(int x, int y, Vector2I destination)
        {
            X = x;
            Y = y;
            fScore = CalculteFScore(destination);
        }

        public bool Equals(AStarNode o)
        {
            return X.Equals(o.X) && Y.Equals(o.Y);
        }

        int CalculteFScore(Vector2I destination)
        {
            int hScore = (Math.Abs(destination.X - X) + Math.Abs(destination.Y - Y));
            return gScore + hScore;
        }
    }
}
