using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Graphics;
using System;

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

        // Simulator Cursor
        public static Texture2D SimulatorCursor;
    }

    partial class BoneStormEditor
    {
        const double AspectRatio = ((double)9/(double)16);

        SpriteFont SegeoUiMono;

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
            foreach (Skeleton s in Simulator.Enemies)
            {
                if (s.FacingLeft)
                    spriteBatch.Draw(s.Frames[s.Frame], s.Pos, null, Color.White, 0, s.Origin, 1, SpriteEffects.FlipHorizontally, 0);
                else
                    spriteBatch.Draw(s.Frames[s.Frame], s.Pos, null, Color.White, 0, s.Origin, 1, SpriteEffects.None, 0);

                if (s.HP < s.MaxHP)
                {
                    // draw hp back bar
                   spriteBatch.Draw(Simulator.pixel, s.HPBackRectangle, null, Color.Black * .5f, 0, Vector2.Zero, SpriteEffects.None, 0);
                    // draw hp bar
                    spriteBatch.Draw(Simulator.pixel, s.HPRectangle, null, Color.Red, 0, Vector2.Zero, SpriteEffects.None, 1);
                }
            }

            // draw projectiles
            foreach (Doot p in Simulator.Projectiles)
            {
                if (p.FacingLeft)
                    spriteBatch.Draw(p.Sprite, p.Pos, null, Color.White, p.Rotation, p.Origin, 1, SpriteEffects.FlipHorizontally, 0);
                else
                    spriteBatch.Draw(p.Sprite, p.Pos, null, Color.White, p.Rotation, p.Origin, 1, SpriteEffects.None, 0);
            }

            // draw big boss
            var boss = Simulator.boss;
            if (boss != null && boss.Active)
            {
                if (boss.FacingLeft)
                    spriteBatch.Draw(boss.Frames[boss.Frame], boss.Pos, null, Color.White, boss.Rotation, boss.Origin, 1, SpriteEffects.FlipHorizontally, 0);
                else
                    spriteBatch.Draw(boss.Frames[boss.Frame], boss.Pos, null, Color.White, boss.Rotation, boss.Origin, 1, SpriteEffects.None, 0);
            }
            
            foreach (SpriteText s in Simulator.Text)
            {
                spriteBatch.Draw(s.Sprite, s.Pos, null, Color.White * s.Opacity, 0, s.Origin, s.Scale, SpriteEffects.None, 0);
            }

            //DrawLine(spriteBatch, Line1, Color.LimeGreen);
            //DrawLine(spriteBatch, Line2, Color.Orange);
            //DrawLine(spriteBatch, Line3, Color.Yellow);
            //DrawLine(spriteBatch, Line4, Color.Yellow);

            DrawEditor();

            // draw cursor
            spriteBatch.Draw(Cursor.SpriteSheet, Cursor.Pos, Cursor.Rectangle, Color.White, Cursor.Rotation, Cursor.Origin, 1,SpriteEffects.None, 0);     
        }
        
        Color darkdarkgray = new Color(new Vector3(.05f, .04f, .04f));
        const int CELLS_START_X = 82;
        const int CELLS_START_Y = 745;
        const int CELLS_WIDTH = 1176;

        void DrawEditor()
        {
            // Draw Dynamic
            DrawEventCells();
            // Draw Play Head

            DrawCellGrid();

            // Draw frames
            DrawFrameTicks();

            // Draw Start Head
            spriteBatch.Draw(Sprites.SimulatorCursor, new Vector2(CELLS_START_X - 2, CELLS_START_Y - 2), Color.White);
        }

        void DrawEventCells()
        {
            Event[,] Events = Simulator.GetViewWindowEvents();
            for (int i = 0; i < 49; i++)
            {
                for (int j = 0; j < 6; j++)
                {
                    DrawEventCell(Events[i,j], i, j);
                }
            }
        }

        void DrawEventCell(Event e, int i, int j)
        {
            Color color;
            switch (e.Param1)
            {
                default:
                    color = Color.White * 0;
                    break;

                case 1:
                    color = new Color(.4f,.1f,.7f);
                    break;

                case 2:
                    color = new Color(.11f, .26f, .1f);
                    break;

                case 3:
                    color = new Color(.26f, .26f, .1f);
                    break;

                case 4:
                    color = Color.DarkGoldenrod;
                    break;

                case 5:
                    color = Color.Blue;
                    break;

                case 6:
                    color = Color.Red;
                    break;

                case 7:
                    color = Color.RosyBrown;
                    break;

                case 8:
                    color = Color.PaleVioletRed;
                    break;

            }
            spriteBatch.Draw(Simulator.pixel, new Rectangle(CELLS_START_X + i * 24, CELLS_START_Y + j * 24, 24, 24), color);
        }

        void DrawFrameTicks()
        {
            for (int i = 0; i < 49; i++)
            {
                spriteBatch.DrawString(SegeoUiMono, (Simulator.CurrentStartFrame + i).ToString(), new Vector2(CELLS_START_X + 12 + i * 24, CELLS_START_Y - 28), Color.White, 1, Vector2.Zero, 1, SpriteEffects.None, 0);
            }
        }

        void DrawCellGrid()
        {
            for(int i = 0; i < 8; i++)
            {
                DrawLine(spriteBatch, new Segment(new Vector2(CELLS_START_X, CELLS_START_Y + i * 24), new Vector2(CELLS_START_X + CELLS_WIDTH, CELLS_START_Y + i * 24)), darkdarkgray);
                for (int j = 0; j < 57; j++)
                {
                    DrawLine(spriteBatch, new Segment(new Vector2(CELLS_START_X + j * 24, CELLS_START_Y), new Vector2(CELLS_START_X + j * 24, CELLS_START_Y + 169)), darkdarkgray);
                }
            }
        }

        void DrawLine(SpriteBatch sb, Segment line, Color color)
        {
            Vector2 edge = line.end - line.start;
            // calculate angle to rotate line
            float angle =
                (float)Math.Atan2(edge.Y, edge.X);

            sb.Draw(Simulator.pixel,
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
