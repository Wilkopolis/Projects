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
    public class Player
    {
        public Texture2D image;

        public float rotation;
        public Vector2 origin;
        public Vector2 position;
        public Vector2 velocity;
        public Vector2 acceleration;

        public bool accepttrack;
        public Surface ridingon;
        public Surface wastouching;

        public bool dead = false;
        public Vector2 gravesite;

        public Player(Texture2D i, Vector2 o, Vector2 v)
        {
            image = i;
            origin = o;
            velocity = v;
        }

        public void collisioncheck(Surface[] tracks, Vector2 offset, float speed)
        {
            ridingon = null;
            foreach (Surface track in tracks)
            {
                if (track != null)
                {
                    if (track.player)
                    {
                        if (track.position.X + offset.X < 210 && track.position.X + offset.X + track.image.Width > 190)
                        {
                            if (track.position.Y + offset.Y == 450 || (track.position.Y + offset.Y > 450 && track.position.Y + offset.Y + velocity.Y < 450))
                            {
                                ridingon = track;
                                rotation = track.rotation;
                            }
                            if (track.position.X + offset.X < 210 && track.position.X + offset.X + track.image.Width > 190)
                            {
                                if (track.alpha != 0)
                                    track.tick = true;
                            }
                        }
                    }
                }
            }
        }

        public void checkdead(Enemy[] goons, Vector2 offset)
        {
            if (offset.Y < -2000)
                dead = true;
            foreach (Enemy goon in goons)
            {
                if (goon != null)
                    if (goon.position.Y + offset.Y > 420)
                    {
                        if (goon.position.Y + offset.Y < 470)
                        {
                            if (goon.position.X + offset.X >= 170)
                            {
                                if (goon.position.X + offset.X <= 225)
                                    dead = true;
                        }
                    }
                }
            }
        }

        public int checkpoint(Level stage, Vector2 offset)
        {
            for (int i = 0; i < stage.Checkpoints.Length; i++)
            {
                Checkpoint check = stage.Checkpoints[i];
                if (check.position.Y + offset.Y > 412)
                {
                    if (check.position.Y + offset.Y < 470)
                    {
                        if (check.position.X + offset.X >= 170)
                        {
                            if (check.position.X + offset.X <= 225)
                            {
                                check.save = stage.deepcopy();
                                check.image = check.on;
                                return i;
                            }
                        }
                    }
                }
            }
            return -1;
        }

        public bool checkfuel(Level stage, Vector2 offset)
        {
            for (int i = 0; i < stage.Fuels.Length; i++)
            {
                Fuel fuel = stage.Fuels[i];
                if (fuel != null)
                {
                    if (fuel.position.Y + offset.Y > 412)
                    {
                        if (fuel.position.Y + offset.Y < 470)
                        {
                            if (fuel.position.X + offset.X >= 170)
                            {
                                if (fuel.position.X + offset.X <= 225)
                                {
                                    stage.Fuels[i] = null;
                                    return true;
                                }
                            }
                        }
                    }
                }
            }
            return false;
        }
    }
}
