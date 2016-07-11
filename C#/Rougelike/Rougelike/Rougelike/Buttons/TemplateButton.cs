using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.Xna.Framework.Graphics;
using Microsoft.Xna.Framework;

namespace Rougelike
{
    public class TemplateButton : Button, IComparable<TemplateButton>
    {
        public RoomTemplate Template;

        public TemplateButton(Texture2D sprite, String name, Tile[,] tiles, int difficulty)
        {
            Template = new RoomTemplate(tiles, name, difficulty);
            Sprite = sprite;
            Origin = new Vector2(Sprite.Width / 2, Sprite.Height / 2);
            Action = "room";
            Visable = false;
        }

        public int CompareTo(TemplateButton o)
        {
            if (o == null)
                return 0;
            return Template.Difficulty.CompareTo(o.Template.Difficulty);
        }
    }
}
