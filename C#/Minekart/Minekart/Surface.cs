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

    public class Surface
    {
        public Texture2D image;
        public Vector2 origin;
        public Vector2 position;
        public Vector2 velocity = Vector2.Zero;
        public Vector2 acceleration = Vector2.Zero;        
        public float rotation = 0;
        public float omega = 0;
        public float alpha = 0;
        public float max = 5;
        public bool tick;
        public bool player = true;
        public bool enemy = true;

        public Surface(Texture2D i, Vector2 o, Vector2 p)
        {
            image = i;
            origin = o;
            position = p;
        }

        public void checkoffstage(Vector2 offset)
        {

        }

        public Surface deepcopy()
        {
            Vector2 tempo = new Vector2(origin.X, origin.Y);
            Vector2 tempos = new Vector2(position.X, position.Y);
            Surface temptrack = new Surface(image, tempo, tempos);
            temptrack.rotation = rotation;
            temptrack.tick = tick;
            temptrack.velocity = new Vector2(velocity.X, velocity.Y);
            temptrack.acceleration = new Vector2(acceleration.X, acceleration.Y);
            temptrack.rotation = rotation;
            temptrack.omega = omega;
            temptrack.max = max;
            temptrack.alpha = alpha;
            temptrack.player = player;
            temptrack.enemy = enemy;
            return temptrack;
        }
    }
}
