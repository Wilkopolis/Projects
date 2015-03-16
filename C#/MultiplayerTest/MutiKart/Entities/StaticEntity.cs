using System;
using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Graphics;

namespace MutiKart
{
	public class StaticEntity : Entity
	{
		public StaticEntity (Rekt h, Vector2 v, Texture2D s, Vector2 o, Vector2 e, float r)
		{
			Hitbox = h;
			Velocity = v;
			Sprite = s;
			Origin = o;
			Offset = e;
            Rotation = r;
		}

		public StaticEntity Copy()
		{
			return new StaticEntity (Hitbox.Copy (), new Vector2 (Velocity.X, Velocity.Y), Sprite, Origin, Offset, Rotation);
		}
	}
}

