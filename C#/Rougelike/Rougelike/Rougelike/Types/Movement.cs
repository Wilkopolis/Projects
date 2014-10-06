using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Rougelike.Util;
using Microsoft.Xna.Framework;

namespace Rougelike.Types
{
    public class Movement : Button, IEquatable<Movement>
    {
        public int X;
        public int Y;
        public int Cost;

        public Movement(int X, int Y, int Cost)
        {
            this.X = X;
            this.Y = Y;
            this.Cost = Cost;
            Origin = new Vector2(34, 34);
            Description = " ";
        }

        public bool Equals(Movement other)
        {
            if (this.X == other.X && this.Y == other.Y)
            {
                return true;
            }
            return false;
        }

        public override string ToString()
        {
            return "(" + X + ", " + Y + ")";
        }

        public Vector2 GetVector()
        {
            return new Vector2(X, Y);
        }
    }
}
