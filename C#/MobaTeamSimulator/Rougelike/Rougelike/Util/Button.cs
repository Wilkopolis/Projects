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
        public int texture;
        public string attribute;
        public Keys hotkey;

        public Button()
        {
            position = Vector2.Zero;
            origin = Vector2.Zero;
            description = " ";
        }
    }
}
