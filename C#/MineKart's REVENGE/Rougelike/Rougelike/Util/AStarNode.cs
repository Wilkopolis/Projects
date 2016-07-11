using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Rougelike.Util
{
    class AStarNode
    {
        public double X;
        public double Y;
        public double fscore;
        public double hscore;
        public double gscore;

        public AStarNode previous;
    }
}
