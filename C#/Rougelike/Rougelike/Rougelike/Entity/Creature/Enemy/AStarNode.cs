using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Rougelike
{
    class AStarNode: IEquatable<AStarNode>
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
