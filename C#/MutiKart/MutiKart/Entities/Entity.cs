using System;
using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Graphics;

namespace MutiKart
{
	public class Entity
	{
		public Rekt Hitbox;
		public Texture2D Sprite;
		public Vector2 Origin;
        public Vector2 Offset;
        public Vector2 Velocity;
        public Vector2 Accelera;
        public bool Grounded;
        public bool pGrounded;
        public float Rotation;
        public float rotStep;
        public float rotGoal;
		public bool HasWon;

		public Entity ()
		{
		}
	}
}

