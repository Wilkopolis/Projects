using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Graphics;
using Microsoft.Xna.Framework.Input;

namespace Rougelike.Util
{
    public class Button : Clickable
    {
        public Texture2D Sprite;
        public string Attribute;
        public Keys Hotkey;

        public Button()
        {
            Position = Vector2.Zero;
            Origin = Vector2.Zero;
            Description = " ";
        }
    }
}
