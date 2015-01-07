using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.Xna.Framework;

namespace Rougelike
{
    public class Clickable
    {
        public bool WasPressed;
        public bool WasClicked;
        public bool WasRightClicked;
        public bool Selected;
        public string Description;
        public Vector2 Position;
        public Vector2 Origin;
    }
}
