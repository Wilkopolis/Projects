using System;

namespace Game
{
	public class Rekt
	{
		public float X;
		public float Y;
		public float Width;
		public float Height;

		public Rekt (float x, float y, float width, float height)
		{
			X = x;
			Y = y;
			Width = width;
			Height = height;
		}

		public bool Intersect (Rekt other)
		{
			return ((other.X >= X && other.X <= X + Width) || (other.X + other.Width >= X && other.X + other.Width <= X + Width)) && ((other.Y >= Y && other.Y <= Y + Height) || (other.Y + other.Height <= Y + Height && other.Y + other.Height >= Y));
		}

		public Rekt Copy()
		{
			return new Rekt (X, Y, Width, Height);
		}
	}
}
