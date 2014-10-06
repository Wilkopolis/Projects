using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.Xna.Framework;

namespace Rougelike.Util
{
    public class Clickable
    {
        public bool WasPressed;
        public bool Selected;
        public string Description;
        public Vector2 Position = Vector2.Zero;
        public Vector2 Origin;
    }
}
