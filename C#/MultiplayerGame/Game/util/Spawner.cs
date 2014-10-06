using System;
using Microsoft.Xna.Framework.Graphics;

namespace Game
{
	public class Spawner : Entity
	{
		private Entity output;
		private 

		public Spawner (Rekt h, Texture2D s,  Entity e)
		{
			Hitbox = h;
			output = e;
			Sprite = s;
		}

		public Entity Spawn() 
		{
			if (output.GetType () == typeof(StaticEntity)) {
				return ((StaticEntity)output).Copy ();
			} else {
				return ((DynamicEntity)output).Copy ();
			}
		}
	}
}

