using System;

namespace MutiKart
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
			return !(X + Width < other.X || other.X + other.Width < X || Y + Height < other.Y || other.Y + other.Height < Y);
		}

		public Rekt Copy()
		{
			return new Rekt (X, Y, Width, Height);
		}
	}
}
