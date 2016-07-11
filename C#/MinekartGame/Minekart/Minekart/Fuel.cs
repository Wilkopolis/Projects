using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.Xna.Framework.Graphics;
using Microsoft.Xna.Framework;

namespace Minekart
{
    public class Fuel
    {
        public Texture2D image;
        public Vector2 origin = new Vector2 (16, 8);
        public Vector2 position;
        public Vector2 velocity = Vector2.Zero;
        public Vector2 acceleration = new Vector2(0, -.05f);

        public Fuel(Texture2D i, Vector2 p)
        {
            image = i;
            position = p;
        }

        public Fuel deepcopy()
        {
            Texture2D i = image;
            Vector2 o = new Vector2 (origin.X, origin.Y);
            Vector2 p = new Vector2 (position.X, position.Y);
            Vector2 v = new Vector2 (velocity.X, velocity.Y);
            Vector2 a = new Vector2(acceleration.X, acceleration.Y);
            Fuel copy = new Fuel(i, p);
            copy.velocity = v;
            copy.acceleration = a;
            return copy;
        }
    }
}
