using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Graphics;
using Microsoft.Xna.Framework.Input;

namespace MOBA.util
{
    public class Button : Clickable
    {
        public Texture2D texture;
		public bool clicked;
		private bool laststate;
        public Keys hotkey;

		public Button(Texture2D t, Vector2 p, Vector2 o)
        {
			texture = t;
			position = p;
			origin = o;
        }

		public static void Update(MouseState mouse, LinkedList<Button> buttonlist)
		{
			foreach (Button b in buttonlist) {
				if (mouse.X >= b.position.X - b.origin.X && mouse.X <= b.position.X + b.origin.X) {
					if (mouse.Y >= b.position.Y - b.origin.Y && mouse.Y <= b.position.Y + b.origin.Y) {

					}
				}
			}
		}
    }
}
