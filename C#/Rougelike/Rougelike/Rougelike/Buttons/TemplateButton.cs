using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.Xna.Framework.Graphics;
using Microsoft.Xna.Framework;

namespace Rougelike
{
    public class TemplateButton : Button
    {
        public RoomTemplate Template;

        public TemplateButton(Texture2D sprite, String name, int difficulty)
        {
            Template = new RoomTemplate(name, difficulty);
            Sprite = sprite;
            Origin = new Vector2(Sprite.Width / 2, Sprite.Height / 2);
            Action = "room";
            Visable = false;
        }
    }
}
