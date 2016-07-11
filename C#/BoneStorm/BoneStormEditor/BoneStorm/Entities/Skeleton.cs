using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Graphics;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace BoneStorm
{
    public class Skeleton : Character
    {
        public Skeleton(Texture2D[] frames, int[] frameSchedule)
        {
            Frames = frames;
            FrameSchedule = frameSchedule;
            Width = frames[0].Width;
            Height = frames[0].Height;
            Origin = new Vector2(Width / 2, Height / 2);
            HPRectangle = new Rectangle((int)Math.Round(Pos.X + Width / 2 - hpWidth / 2), (int)Math.Round(Pos.Y) - hpOffsetY, hpWidth, hpHeight);
            HPBackRectangle = new Rectangle((int)Math.Round(Pos.X + Width / 2 - hpWidth / 2), (int)Math.Round(Pos.Y) - hpOffsetY, hpWidth, hpHeight);
        }

        public void Animate()
        {
            FrameIndex = (FrameIndex + 1) % FrameSchedule.Length;
            Frame = FrameSchedule[FrameIndex];
        }

        public void Update(List<Platform> stage, List<Rectangle> killZones)
        {
            Vel += Acc;
            ClampVelocity();

            var myRight = Pos.X + Origin.X;
            var myLeft = Pos.X - Origin.X;
            var thisBottom = Pos.Y + Origin.Y;
            var nextBottom = thisBottom + Vel.Y;
            var myTop = Pos.Y;
            var myBottom = (Pos.Y + Origin.Y) + Height / 2;

            foreach (var r in stage)
            {
                var rLeft = r.Pos.X - r.Origin.X;
                var rRight = r.Pos.X + r.Origin.X;
                var rTop = r.Pos.Y - r.Origin.Y;

                if ((myRight >= rLeft && myLeft <= rRight) && (thisBottom <= rTop && nextBottom > rTop))
                {
                    Vel.Y = 0;
                    Pos.Y = rTop - Origin.Y;
                }
                else
                    Pos.Y += Vel.Y;

                Pos.X += Vel.X;
            }

            foreach (var r in killZones)
            {
                if ((myRight >= r.Left && myLeft <= r.Right) && (myTop <= r.Bottom && myBottom >= r.Top))
                {
                    HP = 0;
                }
            }

            HPBackRectangle.X = (int)Math.Round(Pos.X - Origin.X - hpOffsetX);
            HPBackRectangle.Y = (int)Math.Round(Pos.Y - Origin.Y - hpOffsetY);
            HPRectangle.X = (int)Math.Round(Pos.X - Origin.X - hpOffsetX);
            HPRectangle.Y = (int)Math.Round(Pos.Y - Origin.Y - hpOffsetY);
            HPRectangle.Width = (int)Math.Round(hpWidth * (float)HP / (float)MaxHP);

            Animate();
        }        
    }

    public class DootDoot : Skeleton
    {
        public bool Active = false;
        public float Rotation = 0;
        // used for eliptical movement
        int FrameCount = 0;
        public int FrameMax = -1;
        int DootFrameCount = 0;
        int DootFrame = -1;
        int DootType = 0;
        int FramePeriod = 180;
        const int xScale = 500;
        const int yScale = 100;
        
        Vector2 BasePos = new Vector2(640, 150);
        float LEFT_ONE_ROT = 0;
        Vector2 LEFT_ONE = new Vector2(80, 80);
        float LEFT_TWO_ROT = -.4f;
        Vector2 LEFT_TWO = new Vector2(80, 280);
        float LEFT_THREE_ROT = -.8f;
        Vector2 LEFT_THREE = new Vector2(80, 480);
        float LEFT_FOUR_ROT = -1.2f;
        Vector2 LEFT_FOUR = new Vector2(80, 680);
        float RIGHT_ONE_ROT = 0;
        Vector2 RIGHT_ONE = new Vector2(1120, 80);
        float RIGHT_TWO_ROT = .4f;
        Vector2 RIGHT_TWO = new Vector2(1120, 280);
        float RIGHT_THREE_ROT = .8f;
        Vector2 RIGHT_THREE = new Vector2(1120, 480);
        float RIGHT_FOUR_ROT = 1.2f;
        Vector2 RIGHT_FOUR = new Vector2(1120, 680);

        public DootDoot(Texture2D[] frames, int[] frameSchedule) : base(frames, frameSchedule)
        {
            HP = 1000;
            MaxHP = 1000;
            FacingLeft = true;
            hpWidth = 1270;
            HPRectangle = new Rectangle(5, 5, hpWidth, 20);
            HPBackRectangle = new Rectangle(0, 0, 1280, 30);
        }

        public void Appear(int framePeriod)
        {
            FramePeriod = framePeriod;
            Active = true;
            FrameCount = 0;
        }

        public void Disappear()
        {
            Active = false;
        }

        public void Doot(int param1)
        {
            DootFrame = 2;
            // draw and interact with it
            Active = true;
            // reset the animation
            FrameIndex = 0;

            // reset the doot spawning frame
            DootFrameCount = 0;
            // so we know where to spawn projectile
            DootType = param1;

            // frame to set Active false if temporal dooting
            FrameMax = 20;
            switch (param1)
            {
                // spawn doot while we are floating around
                case 0:
                    Rotation = 0;
                    FrameMax = -1;
                    break;
                case 11:
                    Pos = LEFT_ONE;
                    Rotation = LEFT_ONE_ROT;
                    FacingLeft = false;
                    FramePeriod = -1;
                    FrameCount = 0;
                    break;
                case 12:
                    Pos = LEFT_TWO;
                    Rotation = LEFT_TWO_ROT;
                    FacingLeft = false;
                    FramePeriod = -1;
                    FrameCount = 0;
                    break;
                case 13:
                    Pos = LEFT_THREE;
                    Rotation = LEFT_THREE_ROT;
                    FacingLeft = false;
                    FramePeriod = -1;
                    FrameCount = 0;
                    break;
                case 14:
                    Pos = LEFT_FOUR;
                    Rotation = LEFT_FOUR_ROT;
                    FacingLeft = false;
                    FramePeriod = -1;
                    FrameCount = 0;
                    break;
                case 21:
                    Pos = RIGHT_ONE;
                    Rotation = RIGHT_ONE_ROT;
                    FacingLeft = true;
                    FramePeriod = -1;
                    FrameCount = 0;
                    break;
                case 22:
                    Pos = RIGHT_TWO;
                    Rotation = RIGHT_TWO_ROT;
                    FacingLeft = true;
                    FramePeriod = -1;
                    FrameCount = 0;
                    break;
                case 23:
                    Pos = RIGHT_THREE;
                    Rotation = RIGHT_THREE_ROT;
                    FacingLeft = true;
                    FramePeriod = -1;
                    FrameCount = 0;
                    break;
                case 24:
                    Pos = RIGHT_FOUR;
                    Rotation = RIGHT_FOUR_ROT;
                    FacingLeft = true;
                    FramePeriod = -1;
                    FrameCount = 0;
                    break;
            }
        }

        new void Animate()
        {
            if (FrameIndex < FrameSchedule.Length)
                Frame = FrameSchedule[FrameIndex];
            FrameIndex++;

            // end our doot animation
            if (FrameCount == FrameMax)
                Active = false;

            // spawn the projectile
            if (DootFrameCount == DootFrame)
                Simulator.SpawnDoot(DootType);

            DootFrameCount++;
            FrameCount++;
        }

        public void Update()
        {
            if (FrameMax < 0)
            {
                Pos.X = BasePos.X + xScale * (float)Math.Cos(Math.PI * 2 * ((float)FrameCount / (float)FramePeriod));
                Pos.Y = BasePos.Y + yScale * (float)Math.Sin(Math.PI * 4 * ((float)FrameCount / (float)FramePeriod));

                if (FrameCount + 20 == FramePeriod / 2 || FrameCount + 20 == FramePeriod)
                    FacingLeft = !FacingLeft;

                FrameCount = FrameCount % FramePeriod;
            }

            Animate();
        }

        public void UpdateHPBar()
        {
            HPRectangle.Width = (int)Math.Round(hpWidth * (float)HP / (float)MaxHP);
        }

        //public Vector2 getTrumpetPos()
        //{
        //    return Pos + new Vector2(TrumpetOffset.X * (float)Math.Cos(Rotation) - TrumpetOffset.Y * (float)Math.Sin(Rotation), TrumpetOffset.X * (float)Math.Sin(Rotation) + TrumpetOffset.Y * (float)Math.Cos(Rotation));
        //}
    }
}
