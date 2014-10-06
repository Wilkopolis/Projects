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
    public class Enemy
    {
        public Texture2D image;
        public Surface ridingon;
        public float rotation;
        public Vector2 origin;
        public Vector2 position;
        public Vector2 velocity;
        public Vector2 acceleration;
        public float ignoreme = -1;

        public Enemy(Texture2D i, Vector2 o, Vector2 p, Vector2 v)
        {
            image = i;
            origin = o;
            position = p;
            velocity = v;
        }

        public void collisioncheck(Surface[] tracks)
        {
            ridingon = null;
            foreach (Surface track in tracks)
            {
                if (track.position.X < position.X && track.position.X + track.image.Width + 10 > position.X)
                {
                    if (!track.player)
                    {
                        if (ignoreme != -1)
                        {
                            if (track.position.X != ignoreme)
                                track.tick = true;
                        }
                        else
                            track.tick = true;
                    }
                    if (track.enemy)
                    {
                        if (track.position.Y == position.Y || (track.position.Y < position.Y && track.position.Y >= position.Y - 15))
                        {
                            if (ignoreme != -1)
                            {
                                if (track.position.X != ignoreme)
                                {
                                    ridingon = track;
                                    rotation = track.rotation;
                                }
                            }
                            else
                            {
                                ridingon = track;
                                rotation = track.rotation;
                            }
                        }
                    }
                }
            }
        }

        public bool checkdead()
        {
            if (position.Y > 1300 || position.X < -100)
                return true;
            return false;
        }

        public Enemy deepcopy()
        {
            Vector2 temppos = new Vector2(position.X, position.Y);
            Vector2 tempo = new Vector2(origin.X, origin.Y);

            Surface tempridingon = null;
            if (ridingon != null)
                tempridingon = new Surface(ridingon.image, new Vector2(ridingon.origin.X, ridingon.origin.Y),
                                           new Vector2(ridingon.position.X, ridingon.position.Y));

            Vector2 tempvelocity = new Vector2(velocity.X, velocity.Y);
            Enemy tempEnemy = new Enemy(image, tempo, temppos, tempvelocity);
            tempEnemy.rotation = rotation;
            tempEnemy.acceleration = new Vector2(acceleration.X, acceleration.Y);
            tempEnemy.ridingon = tempridingon;
            tempEnemy.ignoreme = ignoreme;

            return new Enemy(image, tempo, temppos, tempvelocity);
        }
    }
}
