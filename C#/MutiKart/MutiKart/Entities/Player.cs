using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Graphics;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace MutiKart.Entities
{
    public class Player : DynamicEntity
    {
        public bool doJump;

        public void Jump()
        {
            Velocity.Y = -12F;
        }

        public Player(Rekt h, Vector2 v, Texture2D[] f, Vector2 o, int c, Vector2 e, float r)
		{
			Hitbox = h;
			Velocity = v;
			Frames = f;
			count = c;
			Sprite = Frames [bounce];
			Origin = o;
			Offset = e;
            Rotation = r;
		}

        public Player Copy()
		{
            return new Player(Hitbox.Copy(), new Vector2(Velocity.X, Velocity.Y), new Texture2D[] { Frames[0], Frames[1] }, Origin, count, Offset, Rotation);
		}
    }
}
