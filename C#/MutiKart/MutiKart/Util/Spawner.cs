using System;
using Microsoft.Xna.Framework.Graphics;

namespace MutiKart
{
	public class Spawner : Entity
	{
		private Entity output;

		public Spawner (Rekt h, Texture2D s,  Entity e)
		{
			Hitbox = h;
			output = e;
			Sprite = s;
		}

		public Entity Spawn() 
		{
            return output;
            //if (output.GetType () == typeof(StaticEntity)) {
            //    return ((Kart)output).Copy ();
            //} else {
            //    return ((DynamicEntity)output).Copy ();
            //}
		}
	}
}

