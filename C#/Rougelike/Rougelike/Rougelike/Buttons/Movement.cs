using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Graphics;

namespace Rougelike
{
    public class Movement : Button, IEquatable<Movement>
    {
        public int X;
        public int Y;
        public int Cost;        

        public Movement(Texture2D sprite, int x, int y)
        {
            Sprite = sprite;
            X = x;
            Y = y;
            Cost = 0;
            Position = new Vector2(x * 66, y * 66) + new Vector2(66, 66);
            Origin = new Vector2(32, 32);
            Description = " ";
        }

        public Movement(Texture2D sprite, int x, int y, int cost)
        {
            Sprite = sprite;
            X = x;
            Y = y;
            Cost = cost;
            Position = new Vector2(x * 66, y * 66) + new Vector2(66, 66);
            Origin = new Vector2(32, 32);
            Description = " ";
        }

        public bool Equals(Movement other)
        {
            return this.X == other.X && this.Y == other.Y;
        }

        public override string ToString()
        {
            return "(" + X + ", " + Y + ")";
        }

        public Vector2I GetVector()
        {
            return new Vector2I(X, Y);
        }
    }
}
