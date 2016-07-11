using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Graphics;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace BoneStorm
{
    partial class Simulator
    {
        public static Texture2D pixel;
        //static Rectangle rect1;
        //static Rectangle rect2;
        public static Segment Line1;
        public static Segment Line2;
        public static Segment Line3;
        public static Segment Line4;
        
        public static void SpawnDoot(int direction)
        {
            Doot doot;

            if (direction == 0)
                doot = new Doot(Sprites.Doot, boss.Pos, !boss.FacingLeft);
            else
                doot = new Doot(Sprites.Doot, direction);

            Projectiles.Add(doot);
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
    }
}
