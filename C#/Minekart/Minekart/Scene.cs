using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Graphics;

namespace Minekart
{
    public class Scene
    {
        public Texture2D image;
        public Vector2 position;
        public bool show;

        public Scene(Texture2D i, Vector2 p)
        {
            image = i;
            position = p;
        }

        public void backgroundcheck(Vector2 offset)
        {
            if (position.X + offset.X + image.Width < 0 || position.X + offset.X > 800
                || position.Y + offset.Y > 600 || position.Y + offset.Y + image.Height < 0)
                show = false;
            show = true;
        }
    }
}
