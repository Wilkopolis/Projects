using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.Xna.Framework;

namespace Rougelike
{
    public class Vector2I
    {
        public int X;
        public int Y;

        public Vector2I()
        {
            X = 0;
            Y = 0;
        }

        public Vector2I(int x, int y)
        {
            X = x;
            Y = y;
        }

        public static Vector2 operator +(Vector2I a, Vector2I b)
        {
            Vector2 result = new Vector2();
            result.X = a.X + b.X;
            result.Y = a.Y + b.Y;
            return result;
        }

        public static Vector2 operator +(Vector2 a, Vector2I b)
        {
            Vector2 result = new Vector2();
            result.X = a.X + b.X;
            result.Y = a.Y + b.Y;
            return result;
        }

        public static Vector2 operator +(Vector2I a, Vector2 b)
        {
            Vector2 result = new Vector2();
            result.X = a.X + b.X;
            result.Y = a.Y + b.Y;
            return result;
        }

        public static Vector2I operator -(Vector2I a, Vector2I b)
        {
            Vector2I result = new Vector2I();
            result.X = a.X + b.X;
            result.Y = a.Y + b.Y;
            return result;
        }

        public static bool operator ==(Vector2I a, Vector2I b)
        {
            return a.X == b.X && a.Y == b.Y;
        }

        public static bool operator !=(Vector2I a, Vector2I b)
        {
            return !(a.X == b.X && a.Y == b.Y);
        }

        public static bool operator ==(Vector2I a, Vector2 b)
        {
            return a.X == b.X && a.Y == b.Y;
        }

        public static bool operator !=(Vector2I a, Vector2 b)
        {
            return !(a.X == b.X && a.Y == b.Y);
        }

        public static bool operator ==(Vector2 a, Vector2I b)
        {
            return a.X == b.X && a.Y == b.Y;
        }

        public static bool operator !=(Vector2 a, Vector2I b)
        {
            return !(a.X == b.X && a.Y == b.Y);
        }

        public static Vector2I operator *(Vector2I a, int b)
        {
            Vector2I result = new Vector2I();
            result.X = a.X * b;
            result.Y = a.Y * b;
            return result;
        }

        public override bool Equals(Object obj)
        {
            Vector2I other = obj as Vector2I;
            if (other == null)
                return false;
            else
                return X == other.X && Y == other.Y;
        }

        public override int GetHashCode()
        {
            return X + Y;
        }
    }
}
