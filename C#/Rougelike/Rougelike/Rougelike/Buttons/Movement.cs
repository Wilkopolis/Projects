using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.Xna.Framework;

namespace Rougelike
{
    public class Movement : Button, IEquatable<Movement>
    {
        public int X;
        public int Y;
        public int Cost;
        public int AssetIndex = (int)Texture.MOVEMENT;

        public Movement(int x, int y)
        {
            X = x;
            Y = y;
            Cost = 0;
            Position = new Vector2(x * 66, y * 66) + new Vector2(66, 66);
            Origin = new Vector2(32, 32);
            Description = " ";
        }

        public Movement(int x, int y, int cost)
        {
            X = x;
            Y = y;
            Cost = cost;
            Position = new Vector2(x * 66, y * 66) + new Vector2(66, 66);
            Origin = new Vector2(32, 32);
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
