using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Graphics;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace BoneStorm
{
    partial class BoneStormClient
    {
        // Game Entities
        static List<Character> Enemies = new List<Character>();
        static List<Doot> Projectiles = new List<Doot>();
        static List<SpriteText> Text = new List<SpriteText>();
        static List<Tracer> Tracers = new List<Tracer>();
        static List<PickUp> PickUps = new List<PickUp>();
        static List<Platform> Stage = new List<Platform>();
        static List<Rectangle> KillZones = new List<Rectangle>();
        static List<Platform> Platforms = new List<Platform>();
        static Player player;
        static DootDoot boss;
        public static bool gameStarted = false;

        Texture2D pixel;
        //static Rectangle rect1;
        //static Rectangle rect2;
        public static Segment Line1;
        public static Segment Line2;
        public static Segment Line3;
        public static Segment Line4;

        // reset to new game
        void Reset()
        {
            // reset all input jump, shoot, etc.
            // reset 
            // start game
        }

        void StartGame()
        {
            // do countdown 3 2 1 GO
            startTime = DateTime.Now;
            // replace 1 with count of players in game
            LoadEvents(1);

            waveOutDevice.Play();

            gameStarted = true;
        }

        public static void SpawnDoot(int direction)
        {
            Doot doot;

            if (direction == 0)
                doot = new Doot(Sprites.Doot, boss.Pos, !boss.FacingLeft);
            else
                doot = new Doot(Sprites.Doot, direction);

            Projectiles.Add(doot);
        }

        public static bool Shoot()
        {
            var d = Cursor.Pos - player.Pos;
            float sRight, pRight, sLeft, pLeft, sTop, pTop, sBottom, pBottom, bTop, bLeft, bRight, bBottom;
            pRight = player.Pos.X + player.Origin.X;
            pLeft = player.Pos.X - player.Origin.X;
            pTop = player.Pos.Y - player.Origin.Y;
            pBottom = player.Pos.Y + player.Origin.Y;
            foreach (Skeleton s in Enemies)
            {
                sRight = s.Pos.X + s.Origin.X;
                sLeft = s.Pos.X - s.Origin.X;
                sTop = s.Pos.Y - s.Origin.Y;
                sBottom = s.Pos.Y + s.Origin.Y;

                if ((sRight >= pLeft && sLeft <= pRight) && (sTop <= pBottom && sBottom >= pTop))
                {
                    s.HP -= 10;
                    return true;
                }

                foreach (Segment r in s.GetSides(player))
                {
                    Vector2? result = lineSegmentIntersection(player.Pos, Cursor.Pos, r.start, r.end);
                    if (result != null)
                    {
                        s.HP -= 10;
                        Tracers.Add(new Tracer(new Segment(player.Pos, (Vector2)result)));
                        return true;
                    }
                }
            }

            if (!boss.Active)
            {
                Tracers.Add(new Tracer(new Segment(player.Pos, new Vector2(1470 * d.X, 1470 * d.Y))));
                return false;
            }

            bRight = boss.Pos.X + boss.Origin.X;
            bLeft = boss.Pos.X - boss.Origin.X;
            bTop = boss.Pos.Y - boss.Origin.Y;
            bBottom = boss.Pos.Y + boss.Origin.Y;
            if ((bRight >= pLeft && bLeft <= pRight) && (bTop <= pBottom && bBottom >= pTop))
            {
                boss.HP -= 10;
                CheckVictory();
                return false;
            }
            
            foreach (Segment r in boss.GetSides(player))
            {
                Vector2? result = lineSegmentIntersection(player.Pos, Cursor.Pos, r.start, r.end);
                if (result != null)
                {
                    boss.HP -= 10;
                    Tracers.Add(new Tracer(new Segment(player.Pos, (Vector2)result)));
                    CheckVictory();
                    return false;
                }
            }

            Tracers.Add(new Tracer(new Segment(player.Pos, new Vector2(1470 * d.X, 1470 * d.Y))));
            return false;
        }

        public static Vector2? lineSegmentIntersection(Vector2 r0, Vector2 r1, Vector2 a, Vector2 b)
        {
            Vector2 s1, s2;
            s1 = r1 - r0;
            s2 = b - a;

            float s, t;
            s = (-s1.Y * (r0.X - a.X) + s1.X * (r0.Y - a.Y)) / (-s2.X * s1.Y + s1.X * s2.Y);
            t = (s2.X * (r0.Y - a.Y) - s2.Y * (r0.X - a.X)) / (-s2.X * s1.Y + s1.X * s2.Y);

            if (s >= 0 && s <= 1 && t >= 0 && t <= 1)
            {
                // Collision detected
                // Return the point of intersection
                return new Vector2(r0.X + (t * s1.X), r0.Y + (t * s1.Y));
            }

            return null; // No collision
        }

        public static void CheckDead()
        {
            int i = 0;
            while (i < Enemies.Count)
            {
                var s = Enemies.ElementAt(i);
                if (s.HP <= 0)
                {
                    SpawnBone(s.Pos);
                    Enemies.RemoveAt(i);
                }
                else
                    i++;
            }
        }

        static void CheckVictory()
        {
            if (boss.HP <= 0)
            {
                gameStarted = false;
                boss.Active = false;
                Text.Add(new SpriteText(Sprites.Victory, -1, -1, true));
            }
        }

        static void SpawnBone(Vector2 pos)
        {
            PickUps.Add(new PickUp(Sprites.Bone, pos));
        }

        public static void ApplySpecial(Special type)
        {
            switch (type)
            {
                case Special.PLATFORM:
                    Platforms.Add(new Platform(Cursor.Pos, Sprites.Platform));
                    break;
            }
        }
    }
}
