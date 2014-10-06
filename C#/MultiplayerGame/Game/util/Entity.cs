using System;
using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Graphics;

namespace Game
{
	public class Entity
	{
		public Rekt Hitbox;
		public Vector2 Velocity;
		public Vector2 Accelera;
		public Texture2D Sprite;
		public Vector2 Origin;
		public Vector2 Offset;
		public bool Jump;
		public bool Grounded;
		public bool HasWon;

		public Entity ()
		{
		}
	}
}

