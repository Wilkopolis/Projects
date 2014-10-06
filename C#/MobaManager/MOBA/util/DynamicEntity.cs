using System;
using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Graphics;

namespace Game
{
	public class DynamicEntity : Entity
	{
		public Texture2D[] Frames;
		public int index = 0;
		public int cyclecount = 0;
		public int count;

		public DynamicEntity (Rekt h, Vector2 v, Texture2D[] f, Vector2 o,  int c, Vector2 e)
		{
			Hitbox = h;
			Velocity = v;
			Frames = f;
			count = c;
			Sprite = Frames [index];
			Origin = o;
			Offset = e;
		}

		public void Cycle ()
		{
			cyclecount++;
			if (cyclecount >= count) {
				index = (++index % Frames.Length);
				Sprite = Frames [index];
				cyclecount = 0;
			}
		}

		public DynamicEntity Copy()
		{
			return new DynamicEntity (Hitbox.Copy (), new Vector2 (Velocity.X, Velocity.Y), Frames, Origin, count, Offset);
		}
	}
}