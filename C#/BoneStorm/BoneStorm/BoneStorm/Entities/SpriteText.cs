using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Graphics;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;

namespace BoneStorm
{
    class SpriteText : Entity
    {
        Vector2 SCREEN_POS = new Vector2(640, 240);
        Vector2 VEL_SLOW_FALL = new Vector2(0, 1f);
        const float OpacityStep = .01f;
        
        // public float Opacity = 1;
        
        bool Animated;
        // int frameCount;

        // willy's code
        float frameCount = 0;
        public float Scale = 2;
        public float Opacity = 0;

        int staticStartFrame = -1;
        int fadingStartFrame = -1;

        // for moving text
        Vector2 basePos;
        const int yScale = 30;
        const int framePeriod = 280;

        public SpriteText(Texture2D sprite, int staticFrame, int fadeFrame, bool animated)
        {
            this.Sprite = sprite;
            this.Pos = SCREEN_POS;
            this.Vel = VEL_SLOW_FALL;
            this.Origin = new Vector2(sprite.Width / 2, sprite.Height / 2);
            this.staticStartFrame = staticFrame;
            this.fadingStartFrame = fadeFrame;
            this.Animated = animated;
            if (animated)
                this.basePos = SCREEN_POS;
        }

        public void Move(GameTime gameTime)
        {
            if (Animated)
            {
                this.Pos = basePos + new Vector2(0, yScale * (float)Math.Sin(Math.PI * 4 * ((float)frameCount / (float)framePeriod)));
            }            
            else
            {
                frameCount += (float)gameTime.ElapsedGameTime.TotalSeconds;

                if (frameCount < .25)
                {
                    Opacity = (Math.Min(1, Opacity + (float)(gameTime.ElapsedGameTime.TotalSeconds * 4)));
                    Scale = (Math.Max(1, Scale - (float)(gameTime.ElapsedGameTime.TotalSeconds * 4)));
                }
                else if (frameCount > .9)
                    Opacity -= (float)(gameTime.ElapsedGameTime.TotalSeconds * 10);
            }
        }
    }
}
