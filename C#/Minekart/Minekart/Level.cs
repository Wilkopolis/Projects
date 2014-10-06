using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Graphics;

namespace Minekart
{
    public class Level
    {
        public Scene[] Backgrounds;
        public Scene[] Foregrounds;
        public Enemy[] Enemies;
        public Checkpoint[] Checkpoints;
        public int mostrecent = 0;
        public Surface[] Tracks;
        public Fuel[] Fuels;

        public Level(Scene[] b, Scene[] F, Enemy[] e, Checkpoint[] c, Surface[] s, Fuel[] f)
        {
            Backgrounds = b;
            Foregrounds = F;
            Enemies = e;
            Checkpoints = c;
            Tracks = s;
            Fuels = f;
        }

        public Level deepcopy()
        {
            Enemy[] Enemiescopy = new Enemy[Enemies.Length];
            // Make a clone army
            for (int i = 0; i < Enemies.Length; i++)
            {
                // Pick the current enemy to clone
                Enemy goon = Enemies[i];
                if (goon != null)
                {
                    Enemiescopy[i] = goon.deepcopy();
                }
                else
                    Enemiescopy[i] = null;
            }
            Checkpoint[] Checkpointscopy = new Checkpoint[Checkpoints.Length];
            for (int i = 0; i < Checkpoints.Length; i++)
            {
                Checkpoint c = Checkpoints[i];
                if (c != null)
                {
                    Vector2 tempo = new Vector2(c.origin.X, c.origin.Y);
                    Vector2 tempos = new Vector2(c.position.X, c.position.Y);
                    Checkpoint tempcheck = new Checkpoint(c.off, c.on, tempo, tempos);
                    Checkpointscopy[i] = tempcheck;
                }
                else
                {
                    Checkpointscopy[i] = null;
                }
            }
            Surface[] Trackscopy = new Surface[Tracks.Length];
            for (int i = 0; i < Tracks.Length; i++)
            {
                Surface t = Tracks[i];
                if (t != null)
                {
                    Trackscopy[i] = t.deepcopy();
                }
                else
                {
                    Trackscopy[i] = null;
                }
            }
            Scene[] Backgroundscopy = new Scene[Backgrounds.Length];
            for (int i = 0; i < Backgrounds.Length; i++)
            {
                Scene s = Backgrounds[i];
                if (s != null)
                {
                    Backgroundscopy[i] = new Scene(Backgrounds[i].image, new Vector2(s.position.X, s.position.Y));
                }
                else
                {
                    Backgroundscopy[i] = null;
                }
            }
            Scene[] Foregroundscopy = new Scene[Foregrounds.Length];
            for (int i = 0; i < Foregrounds.Length; i++)
            {
                Scene s = Foregrounds[i];
                if (s != null)
                {
                    Foregroundscopy[i] = new Scene(Foregrounds[i].image, new Vector2(s.position.X, s.position.Y));
                }
                else
                {
                    Foregroundscopy[i] = null;
                }
            }
            Fuel[] Fuelscopy = new Fuel[Fuels.Length];
            for (int i = 0; i < Foregrounds.Length; i++)
            {
                Fuel f = Fuels[i];
                if (f != null)
                {
                    Fuelscopy[i] = f.deepcopy();
                }
                else
                {
                    Fuelscopy[i] = null;
                }
            }

            Level copy = new Level(Backgroundscopy, Foregroundscopy, Enemiescopy, Checkpointscopy, Trackscopy, Fuelscopy);
            copy.mostrecent = mostrecent;

            return copy;
        }
    }
}
