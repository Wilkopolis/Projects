using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Graphics;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace BoneStorm
{
    public class Projectile : Entity
    {
        public float Rotation = 0;
        public bool Marked = false;
    }

    public class Doot : Projectile
    {
        static Vector2 VEC_DOOT_OFFSET = new Vector2(86, 80);
        static Vector2 VEC_DOOT_VEL = new Vector2(-3, 3);
        static Vector2 VEC_DOOT_ACC = new Vector2(-.5f, .5f);

        public Doot(Texture2D sprite, Vector2 pos, bool facingLeft)
        {
            Sprite = sprite;
            Width = sprite.Width;
            Height = sprite.Height;
            Origin = new Vector2(Width/2, Height/2);

            Pos = pos;

            // set position
            Pos.Y += VEC_DOOT_OFFSET.Y;
            if (facingLeft)
                Pos.X += VEC_DOOT_OFFSET.X;
            else
                Pos.X -= VEC_DOOT_OFFSET.X;

            // set velocity
            Vel = VEC_DOOT_VEL;
            if (facingLeft)
                Vel.X = -VEC_DOOT_VEL.X;
            Acc = VEC_DOOT_ACC;
            if (facingLeft)
                Acc.X = -VEC_DOOT_ACC.X;

            Rotation = .8f;
            if (!facingLeft)
                Rotation = -.8f;

            FacingLeft = !facingLeft;
        }
        
        float LEFT_ONE_ROT = .81f;
        Vector2 LEFT_ONE = new Vector2(160, 160);
        float LEFT_TWO_ROT = .5f;
        Vector2 LEFT_TWO = new Vector2(175, 330);
        float LEFT_THREE_ROT = 0;
        Vector2 LEFT_THREE = new Vector2(175, 480);
        float LEFT_FOUR_ROT = -.4f;
        Vector2 LEFT_FOUR = new Vector2(170, 640);
        float RIGHT_ONE_ROT = -.81f;
        Vector2 RIGHT_ONE = new Vector2(1040, 160);
        float RIGHT_TWO_ROT = -.6f;
        Vector2 RIGHT_TWO = new Vector2(1025, 330);
        float RIGHT_THREE_ROT = 0;
        Vector2 RIGHT_THREE = new Vector2(1025, 480);
        float RIGHT_FOUR_ROT = .4f;
        Vector2 RIGHT_FOUR = new Vector2(1030, 640);

        public Doot(Texture2D sprite, int direction)
        {
            Sprite = sprite;
            Width = sprite.Width;
            Height = sprite.Height;
            Origin = new Vector2(Width/2, Height/2);

            switch (direction)
            {
                case 11:
                    Pos = LEFT_ONE;
                    Rotation = LEFT_ONE_ROT;
                    Vel = new Vector2(3, 3);
                    Acc = new Vector2(.5f, .5f);
                    break;
                case 12:
                    Pos = LEFT_TWO;
                    Rotation = LEFT_TWO_ROT;
                    Vel = new Vector2(3, 1.3f);
                    Acc = new Vector2(.5f, .2167f);
                    break;
                case 13:
                    Pos = LEFT_THREE;
                    Rotation = LEFT_THREE_ROT;
                    Vel = new Vector2(3, 0);
                    Acc = new Vector2(.5f, 0);
                    break;
                case 14:
                    Pos = LEFT_FOUR;
                    Rotation = LEFT_FOUR_ROT;
                    Vel = new Vector2(3, -1.3f);
                    Acc = new Vector2(.5f, -.2167f);
                    break;
                case 21:
                    FacingLeft = true;
                    Pos = RIGHT_ONE;
                    Rotation = RIGHT_ONE_ROT;
                    Vel = new Vector2(-3, 3);
                    Acc = new Vector2(-.5f, .5f);
                    break;
                case 22:
                    FacingLeft = true;
                    Pos = RIGHT_TWO;
                    Rotation = RIGHT_TWO_ROT;
                    Vel = new Vector2(-3, 1.3f);
                    Acc = new Vector2(-.5f, .2167f);
                    break;
                case 23:
                    FacingLeft = true;
                    Pos = RIGHT_THREE;
                    Rotation = RIGHT_THREE_ROT;
                    Vel = new Vector2(-3, 0);
                    Acc = new Vector2(-.5f, 0);
                    break;
                case 24:
                    FacingLeft = true;
                    Pos = RIGHT_FOUR;
                    Rotation = RIGHT_FOUR_ROT;
                    Vel = new Vector2(-3, -1.3f);
                    Acc = new Vector2(-.5f, -.2167f);
                    break;
            }    
        }

        public void Update(List<Rectangle> killZones)
        {
            Vel += Acc;
            Pos += Vel;

            foreach (var r in killZones)
            {
                var myRight = Pos.X + Origin.X;
                var myLeft = Pos.X - Origin.X;
                var myTop = Pos.Y - Origin.X;
                var myBottom = Pos.Y + Origin.Y;

                if ((myRight >= r.Left && myLeft <= r.Right) && (myTop <= r.Bottom && myBottom >= r.Top))
                {
                    this.Marked = true;
                }
            }
        }
    }

    //class Bone : Projectile
    //{
    //    public Bone() : base
    //    {

    //    }

    //}
}
