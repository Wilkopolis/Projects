using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Graphics;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace BoneStorm
{
    public static partial class Simulator
    {
        public static bool Playing = false;

        // Game Entities
        public static List<Character> Enemies = new List<Character>();
        public static List<Doot> Projectiles = new List<Doot>();
        public static List<SpriteText> Text = new List<SpriteText>();
        public static List<Platform> Stage = new List<Platform>();
        public static List<Rectangle> KillZones = new List<Rectangle>();
        public static DootDoot boss;

        public static Vector2 HoverCell;
        public static int CurrentStartFrame = 0;
        public static Event[,] Cells = new Event[16320, 8];

        public static void Initialize(GraphicsDevice graph)
        {
            Stage = new List<Platform>() { new Platform(new Rectangle(240, 510, 800, 9)) };
            KillZones = new List<Rectangle>() { new Rectangle(-200, -200, 1480, 100), new Rectangle(-200, -200, 100, 1020), new Rectangle(1380, -200, 100, 1020), new Rectangle(-200, 920, 1480, 100) };

            pixel = new Texture2D(graph, 1, 1);
            pixel.SetData<Color>(new Color[] { Color.White });

            for (int i = 0; i < 16320; i++)
            {
                for (int j = 0; j < 8; j++)
                {
                    Cells[i, j] = new Event(j);
                }
            }
        }

        public static Event[,] GetViewWindowEvents()
        {
            Event[,] Result = new Event[49, 6];

            for (int i = 0; i < 49; i++)
            {
                for (int j = 0; j < 6; j++)
                {
                    Result[i, j] = Cells[CurrentStartFrame + i, j];
                }
            }

            return Result;
        }

        public static void Play()
        {
            startTime = DateTime.Now;
            Playing = true;
        }

        public static void StepFrame(GameTime gameTime)
        {
            CheckEvents();

            foreach (Skeleton s in Enemies)
            {
                s.Update(Stage, KillZones);
            }

            foreach (Doot p in Projectiles)
            {
                p.Update(KillZones);
            }
            Projectiles.RemoveAll(p => p.Marked);

            if (boss != null && boss.Active)
            {
                boss.Update();
            }

            foreach (SpriteText s in Text)
            {
                s.Move(gameTime);
            }
            Text.RemoveAll(s => s.Opacity <= 0);
        }
    }
}
