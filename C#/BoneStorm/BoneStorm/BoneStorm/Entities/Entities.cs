using System;
using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Graphics;
using System.Collections.Generic;

namespace BoneStorm
{
    static class Cursor
    {
        public static Texture2D SpriteSheet;
        public static int SpriteIndex = 0;
        public static Rectangle Rectangle;
        public static float Rotation = 0;
        static float rotStep = .005f;
        public static Vector2 Pos;
        public static Vector2 Origin = new Vector2(32, 32);

        public static void Animate()
        {
            Rotation = Rotation + rotStep % ((float)Math.PI * 2);
        }
    }

    class PickUp : Entity
    {
        const int FramePeriod = 200;

        public bool Marked = false;

        int yScale = 10;
        int FrameCount = 0;
        Vector2 BasePos;

        public PickUp(Texture2D sprite, Vector2 basepos)
        {
            Sprite = sprite;
            Origin = new Vector2(sprite.Width / 2, sprite.Height / 2);
            Pos.X = basepos.X;
            BasePos.Y = basepos.Y + 20;
        }

        public void Update()
        {
            FrameCount++;
            Pos.Y = BasePos.Y + yScale * (float)Math.Sin(Math.PI * 4 * ((float)FrameCount / (float)FramePeriod));
        }
    }

    class Bone : PickUp
    {
        public Bone(Texture2D sprite, Vector2 basepos) : base(sprite, basepos)
        {

        }
    }

    class Tracer : Entity
    {
        public Vector2 VEC_DRIFT = new Vector2(0, .4f);

        public Segment Segment;
        public float Opacity = 1;
        float opacityStep = -.02f;

        public Tracer(Segment s)
        {
            this.Segment = s;
        }

        public void Update()
        {
            Segment.start += VEC_DRIFT;
            Segment.end += VEC_DRIFT;

            Animate();
        }

        public void Animate()
        {
            Opacity += opacityStep;
        }
    }

    public struct Segment
    {
        public Vector2 start;
        public Vector2 end;

        public Segment(Vector2 p1, Vector2 p2)
        {
            this.start = p1;
            this.end = p2;
        }
    }

    abstract class Entity
    {
        public Vector2 Pos = new Vector2();
        public Vector2 Vel = new Vector2();
        public Vector2 Acc = new Vector2();
        public Vector2 Max = new Vector2();
        public Vector2 Origin = new Vector2();

        public string hash;
        public bool FacingLeft = false;
        public int Width;
        public int Height;

        public Texture2D Sprite;
    }

    abstract class Character : Entity
    {
        protected int hpWidth = 40;
        protected int hpHeight = 6;
        protected int hpOffsetX = 4;
        protected int hpOffsetY = 10;

        public int HP = 100;
        public int MaxHP = 100;
        public Rectangle HPBackRectangle;
        public Rectangle HPRectangle;
        
        public Texture2D[] Frames;
        public int[] FrameSchedule;
        public int FrameIndex;
        public int Frame;

        protected void ClampVelocity()
        {
            if (Vel.X < 0)
            {
                Vel.X = Math.Max(-Max.X, Vel.X);
            }
            else
            {
                Vel.X = Math.Min(Max.X, Vel.X);
            }

            if (Vel.Y < 0)
            {
                Vel.Y = Math.Max(-Max.Y, Vel.Y);
            }
            else
            {
                Vel.Y = Math.Min(Max.Y, Vel.Y);
            }
        }     
    }
}
