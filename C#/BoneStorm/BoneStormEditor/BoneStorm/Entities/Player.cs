using Microsoft.Xna.Framework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace BoneStorm
{
    enum Buffs { DPS };

    class Effect
    {
        public Buffs Type;

        // sometimes in shots, sometimes in frames
        public int Duration;
        public int FrameCount;
        public int ShootCount;
        public bool Marked = false;

        public Effect(Buffs type, int duration)
        {
            this.Type = type;
            this.Duration = duration;
            this.ShootCount = 0;
            this.FrameCount = 0;
        }
    }

    class Player : Character
    {
        const int BaseAttackSpeed = 20;
        const int DPSAttackSpeed = 2;

        //public Moving Moving;

        const int jumpFrameMax = 7;
        int jumpFrameCount = 0;
        int jumpCount = 2;

        public bool CanShoot;
        int cooldownFrames = 0;
        int shootCooldown = 10;

        int specialCooldownFrames = 0;
        public int specialCooldown = 20;
        public int specialCost = 1;
        public int boneCount = 0;

        float SPEED_JUMP = -10f;
        //float SPEED_HOR_ACC = 1f;

        List<Effect> Effects = new List<Effect>();

        public Player(Vector2 gravity)
        {
            Width = 16;
            Height = 24;
            Pos = new Vector2(400, 480);
            Origin = new Vector2(8, 12);
            Max = new Vector2(5, 15);
            Acc = gravity;
            HPRectangle = new Rectangle((int)Math.Round(Pos.X + Width / 2 - hpWidth / 2), (int)Math.Round(Pos.Y) - hpOffsetY, hpWidth, hpHeight);
            HPBackRectangle = new Rectangle((int)Math.Round(Pos.X + Width / 2 - hpWidth / 2), (int)Math.Round(Pos.Y) - hpOffsetY, hpWidth, hpHeight);
        }

        public void Update(List<Platform> platforms, List<Rectangle> killZones, List<PickUp> pickUps)
        {
            jumpFrameCount++;
            specialCooldownFrames++;
            
            CheckBuffs();

            if (!CanShoot)
            {
                cooldownFrames++;
                if (cooldownFrames > shootCooldown)
                    CanShoot = true;
            }

            //switch (Moving)
            //{
            //    case Moving.NONE:
            //        if (Vel.X > 0)
            //        {
            //            Acc.X = -SPEED_HOR_ACC;
            //            Vel.X += Acc.X;
            //            if (Vel.X < 0)
            //            {
            //                Vel.X = 0;
            //            }
            //        }
            //        else if (Vel.X < 0)
            //        {
            //            Acc.X = SPEED_HOR_ACC;
            //            Vel.X += Acc.X;
            //            if (Vel.X > 0)
            //            {
            //                Vel.X = 0;
            //            }
            //        }
            //        Vel.Y += Acc.Y;
            //        break;

            //    case Moving.LEFT:
            //        Acc.X = -SPEED_HOR_ACC;
            //        Vel += Acc;
            //        break;

            //    case Moving.RIGHT:
            //        Acc.X = SPEED_HOR_ACC;
            //        Vel += Acc;
            //        break;
            //}

            ClampVelocity();

            var myRight = Pos.X + Origin.X;
            var myLeft = Pos.X - Origin.X;
            var myTop = Pos.Y - Origin.Y;
            var myBottom = Pos.Y + Origin.Y;
            var thisBottom = Pos.Y + Origin.Y;
            var nextBottom = thisBottom + Vel.Y;

            var grounded = false;
            foreach (var r in platforms)
            {
                var rLeft = r.Pos.X - r.Origin.X;
                var rRight = r.Pos.X + r.Origin.X;
                var rTop = r.Pos.Y - r.Origin.Y;
                if ((myRight >= rLeft && myLeft <= rRight) && (thisBottom <= rTop && nextBottom > rTop))
                {
                    Vel.Y = 0;
                    Pos.Y = rTop - Origin.Y;
                    jumpCount = 2;
                    grounded = true;
                }
            }
            Pos.X += Vel.X;
            if (!grounded)
                Pos.Y += Vel.Y;


            foreach (var r in killZones)
            {

                if ((myRight >= r.Left && myLeft <= r.Right) && (myTop <= r.Bottom && myBottom >= r.Top))
                {
                    //rip
                    HP = 0;
                }
            }

            foreach (var p in pickUps)
            {
                var otRight = p.Pos.X + p.Origin.X;
                var otLeft = p.Pos.X - p.Origin.X;
                var otTop = p.Pos.Y - p.Origin.Y;
                var otBottom = p.Pos.Y + p.Origin.Y;

                if ((myRight >= otLeft && myLeft <= otRight) && (myTop <= otBottom && myBottom >= otTop))
                {
                    p.Marked = true;
                    boneCount++;
                }
            }

            HPBackRectangle.X = (int)Math.Round(Pos.X - Origin.X - hpOffsetX);
            HPBackRectangle.Y = (int)Math.Round(Pos.Y - Origin.Y - hpOffsetY);
            HPRectangle.X = (int)Math.Round(Pos.X - Origin.X - hpOffsetX);
            HPRectangle.Y = (int)Math.Round(Pos.Y - Origin.Y - hpOffsetY);
            HPRectangle.Width = (int)Math.Round(hpWidth * (float)HP / (float)MaxHP);
        }

        void CheckBuffs()
        {
            // buffs ending
            foreach (Effect e in Effects)
            {
                e.FrameCount++;

                if (e.ShootCount >= e.Duration)
                {
                    switch (e.Type)
                    {
                        case Buffs.DPS:
                            shootCooldown = BaseAttackSpeed;
                            e.Marked = true;
                            break;
                    }
                }
                // ifs for frame count buffs
            }
            Effects.RemoveAll(e => e.Marked);
        }

        public void Jump()
        {
            Acc.Y = 0;

            if (jumpCount > 0)
            {
                Vel.Y = SPEED_JUMP;
                jumpCount--;
            }

            jumpFrameCount = 0;
        }

        public bool JumpLimitReached()
        {
            if (jumpFrameCount > jumpFrameMax)
            {
                jumpFrameCount = 0;
                return true;
            }
            return false;
        }        
    }
}
