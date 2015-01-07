using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Rougelike
{
    public partial class Enemy
    {
        private void AStarHorseshit(Player kevin, Room Room, int Distance)
        {
            LinkedList<AStarNode> closedset = new LinkedList<AStarNode>();
            LinkedList<AStarNode> openset = new LinkedList<AStarNode>();

            AStarNode current = new AStarNode();
            current.X = (int)Position.X;
            current.Y = (int)Position.Y;
            current.fscore = (int)CalcFScore(current, kevin);

            openset.AddLast(current);

            while (openset.Count() != 0)
            {
                current = FindLowestFScore(openset, kevin);
                if (Math.Abs(kevin.Position.X - current.X) + Math.Abs(kevin.Position.Y - current.Y) == Distance)
                {
                    break;
                }
                openset.Remove(current);
                closedset.AddLast(current);
                foreach (AStarNode a in closedset)
                {
                    if (a.Y - 1 >= 0)
                    {
                        if (!Room.Tiles[a.X, a.Y - 1].Solid)
                        {
                            AStarNode next = new AStarNode();
                            next.X = a.X;
                            next.Y = a.Y - 1;
                            next.previous = a;
                            next.fscore = CalcFScore(next, kevin);
                            if (!closedset.Contains(next))
                            {
                                if (!openset.Contains(next))
                                    openset.AddLast(next);
                            }
                        }
                    }
                    if (a.X - 1 >= 0)
                    {
                        if (!Room.Tiles[a.X - 1, a.Y].Solid)
                        {
                            AStarNode next = new AStarNode();
                            next.X = a.X - 1;
                            next.Y = a.Y;
                            next.previous = a;
                            next.fscore = CalcFScore(next, kevin);
                            if (!closedset.Contains(next))
                            {
                                if (!openset.Contains(next))
                                    openset.AddLast(next);
                            }
                        }
                    }
                    if (a.X + 1 < 15)
                    {
                        if (!Room.Tiles[a.X + 1, a.Y].Solid)
                        {
                            AStarNode next = new AStarNode();
                            next.X = a.X + 1;
                            next.Y = a.Y;
                            next.previous = a;
                            next.fscore = CalcFScore(next, kevin);
                            if (!closedset.Contains(next))
                            {
                                if (!openset.Contains(next))
                                    openset.AddLast(next);
                            }
                        }
                    }
                    if (a.Y + 1 < 10)
                    {
                        if (!Room.Tiles[a.X, a.Y + 1].Solid)
                        {
                            AStarNode next = new AStarNode();
                            next.X = a.X;
                            next.Y = a.Y + 1;
                            next.previous = a;
                            next.fscore = CalcFScore(next, kevin);
                            if (!closedset.Contains(next))
                            {
                                if (!openset.Contains(next))
                                    openset.AddLast(next);
                            }
                        }
                    }
                }
            }
            if (Math.Abs(kevin.Position.X - current.X) + Math.Abs(kevin.Position.Y - current.Y) == Distance)
            {
                while (current.previous != null)
                {
                    Movements.AddFirst(new Movement((int)current.X, (int)current.Y, mod));
                    current = current.previous;
                }
            }
            else
            {
                AStarHorseshit(kevin, Room, ++Distance);
            }
        }

        private AStarNode FindLowestFScore(LinkedList<AStarNode> list, Player kevin)
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

        private int CalcFScore(AStarNode node, Player kevin)
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
}
