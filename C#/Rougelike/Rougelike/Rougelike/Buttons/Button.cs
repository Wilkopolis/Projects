using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Input;
using Microsoft.Xna.Framework.Graphics;

namespace Rougelike
{
    public class ItemButton : Button
    {
        public Item Item;
        public ItemType Type;
    }

    public class Button
    {
        public bool Visable = true;
        public bool WasPressed;
        public bool WasClicked;
        public bool WasRightClicked;
        public bool Selected;
        public Keys Hotkey;
        public Vector2 Position;
        public Vector2 Origin;
        public Texture2D Sprite;
        public string Action;
        public string Description;

        public Button()
        {
        }

        public Button(Texture2D sprite, Vector2 position, String action)
        {
            Sprite = sprite;
            Position = position;
            Origin = new Vector2(Sprite.Width / 2, Sprite.Height / 2);
            Action = action;
        }

        public Button(Vector2 position, String action)
        {
            Position = position;
            Origin = Vector2.Zero;
            Action = action;
        }

        public Button(String action, Keys hotkey)
        {
            Position = Vector2.Zero;
            Origin = Vector2.Zero;
            Action = action;
            Visable = false;
            Hotkey = hotkey;
        }

        public Button(Texture2D sprite, Vector2 position, String action, Keys hotkey)
        {
            Sprite = sprite;
            Position = position;
            Origin = new Vector2(Sprite.Width / 2, Sprite.Height / 2);
            Action = action;
            Hotkey = hotkey;
        }

        public Button(Texture2D sprite, Vector2 position, String action, bool visable)
        {
            Sprite = sprite;
            Position = position;
            Origin = new Vector2(Sprite.Width / 2, Sprite.Height / 2);
            Action = action;
            Visable = visable;
        }

        public Button(Vector2 position, String action, Keys hotkey)
        {
            Position = position;
            Origin = Vector2.Zero;
            Action = action;
            Hotkey = hotkey;
        }
    }
}
