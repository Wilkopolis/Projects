using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Audio;
using Microsoft.Xna.Framework.Content;
using Microsoft.Xna.Framework.GamerServices;
using Microsoft.Xna.Framework.Graphics;
using Microsoft.Xna.Framework.Input;
using Microsoft.Xna.Framework.Media;


namespace Minekart
{
    public class Checkpoint
    {
        public Texture2D off;
        public Texture2D on;
        public Texture2D image;
        public Vector2 origin;
        public Vector2 position;
        public Level save;

        public Checkpoint (Texture2D f, Texture2D n, Vector2 o, Vector2 p)
        {
            off = f;
            on = n;
            origin = o;
            position = p;
            image = off;
        }

        public void checkoffstage(Vector2 offset)
        {

        }
    }
}
