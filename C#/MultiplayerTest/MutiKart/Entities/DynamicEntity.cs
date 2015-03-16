using System;
using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Graphics;

namespace MutiKart
{
	public class DynamicEntity : Entity
	{
		public Texture2D[] Frames;
		public int bounce = 0;
		public int cyclecount = 0;
		public int count;
        
		public void Cycle ()
		{
			cyclecount++;
			if (cyclecount >= count) {
				bounce = (++bounce % Frames.Length);
				Sprite = Frames [bounce];
				cyclecount = 0;
			}
		}
	}
}