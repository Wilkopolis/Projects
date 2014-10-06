using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.Xna.Framework;

namespace Game.Util
{
    public class VectorComparer : IComparer<Vector2>
    {
        public int Compare(Vector2 x, Vector2 y)
        {
            if (x.X == y.X)
            {
                if (x.Y > y.Y)
                    return 1;
                else if (x.Y < y.Y)
                    return -1;
                else
                    return 0;
            }
            else if (x.X > y.X)
                return 1;
            else
                return -1;
        }
    }
}
