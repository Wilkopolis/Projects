using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Graphics;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace BoneStorm
{
    public class Platform
    {
        public Vector2 Pos;
        public Vector2 Origin;
        public Texture2D Sprite;

        int frameCount = 0;
        int fadeFrame = 600;
        public float Opacity = 1;
        float opacityStep = .01f;

        public Platform(Vector2 pos, Texture2D sprite)
        {
            Pos = pos;
            Sprite = sprite;
            Origin = new Vector2(sprite.Width / 2, sprite.Height / 2);
        }

        public Platform(Rectangle rect)
        {
            Origin = new Vector2(rect.Width / 2, rect.Height / 2);
            Pos = new Vector2(rect.X + Origin.X, rect.Y + Origin.Y);
        }

        public void Update()
        {
            if (Sprite != null)
            {
                frameCount++;
                if (frameCount >= fadeFrame)
                {
                    Opacity -= opacityStep;
                }
            }
        }
    }

}
