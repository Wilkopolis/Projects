using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Graphics;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace BoneStorm
{
    static class Sprites
    {
        // Text
        public static Texture2D Three;
        public static Texture2D Two;
        public static Texture2D One;
        public static Texture2D Go;
        public static Texture2D Pause;
        public static Texture2D Victory;

        // Platform
        public static Texture2D Platform;

        // Pickups
        public static Texture2D Bone;

        // Projectiles
        public static Texture2D Doot;

        public static Texture2D[] DootDoot;
        public static int[] DootDootSchedule = new int[] { 1, 1, 1, 1, 1, 1, 0 };
        
        public static Texture2D[] Walker;
        public static int[] WalkerSchedule = new int[] { 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 7, 7, 7, 7, 7, 8, 8, 8, 8, 8, 9, 9, 9, 9, 9, 10, 10, 10, 10, 10, 11, 11, 11, 11, 11, 12, 12, 12, 12, 12, 13, 13, 13, 13, 13, 14, 14, 14, 14, 14, 15, 15, 15, 15, 15, 16, 16, 16, 16, 16, 17, 17, 17, 17, 17, 18, 18, 18, 18, 18, 19, 19, 19, 19, 19, 20, 20, 20, 20, 20, 21, 21, 21, 21, 21, 22, 22, 22, 22, 22, 23, 23, 23, 23, 23, 24, 24, 24, 24, 24 };

        public static Texture2D[] Fast;
        public static int[] FastSchedule = new int[] { 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 7, 7, 7, 7, 7, 8, 8, 8, 8, 8, 9, 9, 9, 9, 9, 10, 10, 10, 10, 10, 11, 11, 11, 11, 11, 12, 12, 12, 12, 12, 13, 13, 13, 13, 13, 14, 14, 14, 14, 14, 15, 15, 15, 15, 15, 16, 16, 16, 16, 16, 17, 17, 17, 17, 17, 18, 18, 18, 18, 18, 19, 19, 19, 19, 19, 20, 20, 20, 20, 20, 21, 21, 21, 21, 21, 22, 22, 22, 22, 22 };

        public static Texture2D[] Sword1;
        public static int[] Sword1Schedule = new int[] { 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 7, 7, 7, 7, 7, 8, 8, 8, 8, 8, 9, 9, 9, 9, 9, 10, 10, 10, 10, 10, 11, 11, 11, 11, 11, 12, 12, 12, 12, 12, 13, 13, 13, 13, 13, 14, 14, 14, 14, 14 };

        public static Texture2D[] Sword2;
        public static int[] Sword2Schedule = new int[] { 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 7, 7, 7, 7, 7, 8, 8, 8, 8, 8, 9, 9, 9, 9, 9, 10, 10, 10, 10, 10, 11, 11, 11, 11, 11, 12, 12, 12, 12, 12, 13, 13, 13, 13, 13, 14, 14, 14, 14, 14, 15, 15, 15, 15, 15, 16, 16, 16, 16, 16, 17, 17, 17, 17, 17, 18, 18, 18, 18, 18, 19, 19, 19, 19, 19, 20, 20, 20, 20, 20, 21, 21, 21, 21, 21, 22, 22, 22, 22, 22, 23, 23, 23, 23, 23, 24, 24, 24, 24, 24, 25, 25, 25, 25, 25, 26, 26, 26, 26, 26, 27, 27, 27, 27, 27, 28, 28, 28, 28, 28, 29, 29, 29, 29, 29, 30, 30, 30, 30, 30, 31, 31, 31, 31, 31, 32, 32, 32, 32, 32, 33, 33, 33, 33, 33, 34, 34, 34, 34, 34, 35, 35, 35, 35, 35, 36, 36, 36, 36, 36, 37, 37, 37, 37, 37, 38, 38, 38, 38, 38, 39, 39, 39, 39, 39 };

        // Background
        public static Texture2D Background;
    }

    partial class BoneStormClient
    {
        const double AspectRatio = ((double)9/(double)16);

        // DrawEntities
        //
        // functions
        //  - draw health bars
        //  - draw all skeletons
        //  - draw player
        //  - draw boss
        //  - draw projectiles
        //
        // returns
        //  
        void DrawEntities()
        {
            // draw enemies
            foreach (Skeleton s in Enemies)
            {
                if (s.FacingLeft)
                    spriteBatch.Draw(s.Frames[s.Frame], s.Pos, null, Color.White, 0, s.Origin, 1, SpriteEffects.FlipHorizontally, 0);
                else
                    spriteBatch.Draw(s.Frames[s.Frame], s.Pos, null, Color.White, 0, s.Origin, 1, SpriteEffects.None, 0);

                if (s.HP < s.MaxHP)
                {
                    // draw hp back bar
                   spriteBatch.Draw(pixel, s.HPBackRectangle, null, Color.Black * .5f, 0, Vector2.Zero, SpriteEffects.None, 0);
                    // draw hp bar
                    spriteBatch.Draw(pixel, s.HPRectangle, null, Color.Red, 0, Vector2.Zero, SpriteEffects.None, 1);
                }
            }

            // draw projectiles
            foreach (Doot p in Projectiles)
            {
                if (p.FacingLeft)
                    spriteBatch.Draw(p.Sprite, p.Pos, null, Color.White, p.Rotation, p.Origin, 1, SpriteEffects.FlipHorizontally, 0);
                else
                    spriteBatch.Draw(p.Sprite, p.Pos, null, Color.White, p.Rotation, p.Origin, 1, SpriteEffects.None, 0);
            }

            // draw hp back bar
            //spriteBatch.Draw(pixel, boss.HPBackRectangle, null, Color.Black * .5f, 0, Vector2.Zero, SpriteEffects.None, 0);
            // draw hp bar
            spriteBatch.Draw(pixel, boss.HPRectangle, null, Color.OrangeRed * .9f, 0, Vector2.Zero, SpriteEffects.None, 1);

            // draw big boss
            if (boss != null && boss.Active)
            {
                if (boss.FacingLeft)
                    spriteBatch.Draw(boss.Frames[boss.Frame], boss.Pos, null, Color.White, boss.Rotation, boss.Origin, 1, SpriteEffects.FlipHorizontally, 0);
                else
                    spriteBatch.Draw(boss.Frames[boss.Frame], boss.Pos, null, Color.White, boss.Rotation, boss.Origin, 1, SpriteEffects.None, 0);
                //spriteBatch.Draw(pixel, rect1, null, Color.White * .5f, 0, Vector2.Zero, SpriteEffects.None, 0);
                //spriteBatch.Draw(pixel, rect2, null, Color.Red * .5f, 0, Vector2.Zero, SpriteEffects.None, 1);
            }

            // draw tracers
            foreach (Tracer s in Tracers)
            {
                DrawLine(spriteBatch, s.Segment, Color.DarkGray * s.Opacity);
            }

            // draw pickups
            foreach (PickUp p in PickUps)
            {
                spriteBatch.Draw(p.Sprite, p.Pos, null, Color.White, 0, p.Origin, 1, SpriteEffects.None, 0);
            }

            // draw platforms
            foreach (Platform p in Platforms)
            {
                if (p.Sprite != null)
                    spriteBatch.Draw(p.Sprite, p.Pos, null, Color.White * p.Opacity, 0, p.Origin, 1, SpriteEffects.None, 0);
            }

            // draw player
            spriteBatch.Draw(player.Sprite, player.Pos, null, Color.White, 0, player.Origin, 1, SpriteEffects.None, 0);
            if (player != null  && player.HP < player.MaxHP)
            {
                // draw hp back bar
                spriteBatch.Draw(pixel, player.HPBackRectangle, null, Color.Black * .5f, 0, Vector2.Zero, SpriteEffects.None, 0);
                // draw hp bar
                spriteBatch.Draw(pixel, player.HPRectangle, null, Color.Red, 0, Vector2.Zero, SpriteEffects.None, 1);
            }

            foreach (SpriteText s in Text)
            {
                spriteBatch.Draw(s.Sprite, s.Pos, null, Color.White * s.Opacity, 0, s.Origin, s.Scale, SpriteEffects.None, 0);
            }

            DrawLine(spriteBatch, Line1, Color.LimeGreen);
            DrawLine(spriteBatch, Line2, Color.Orange);
            DrawLine(spriteBatch, Line3, Color.Yellow);
            DrawLine(spriteBatch, Line4, Color.Yellow);

            // draw cursor
            spriteBatch.Draw(Cursor.SpriteSheet, Cursor.Pos, Cursor.Rectangle, Color.White, Cursor.Rotation, Cursor.Origin, 1,SpriteEffects.None, 0);     
        }

        void DrawLine(SpriteBatch sb, Segment line, Color color)
        {
            Vector2 edge = line.end - line.start;
            // calculate angle to rotate line
            float angle =
                (float)Math.Atan2(edge.Y, edge.X);

            sb.Draw(pixel,
                new Rectangle(// rectangle defines shape of line and position of start of line
                    (int)line.start.X,
                    (int)line.start.Y,
                    (int)edge.Length(), //sb will strech the texture to fill this rectangle
                    1), //width of line, change this to make thicker line
                null,
                color, //colour of line
                angle,     //angle of line (calulated above)
                new Vector2(0, 0), // point in line about which to rotate
                SpriteEffects.None,
                0);

        }
    }
}
