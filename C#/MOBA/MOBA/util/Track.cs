using System;
using Microsoft.Xna.Framework;

namespace Game
{
	public class Track
	{
		public int Length;
		public Rekt Hitbox;

		public Track (int l, Rekt h)
		{
			Length = l;
			Hitbox = h;
		}

		public void Detect(Entity e)
		{
			if ((e.Hitbox.Y + e.Offset.Y + e.Hitbox.Height <= Hitbox.Y && e.Hitbox.Y + e.Offset.Y + e.Velocity.Y + e.Hitbox.Height >= Hitbox.Y)
				&& (e.Hitbox.X + e.Offset.X + e.Hitbox.Width > Hitbox.X && e.Hitbox.X + e.Offset.X < Hitbox.X + Hitbox.Width)) {
				e.Hitbox.Y = Hitbox.Y - e.Hitbox.Height - e.Offset.Y;
				e.Velocity.Y = 0;
				e.Accelera.Y = 0;
			} else 
				e.Accelera = new Vector2 (0, .02f);
		}
	}
}

