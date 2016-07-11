using Microsoft.Xna.Framework.Graphics;
using System.Collections.Generic;
using System;
using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Content;

namespace ProperRoguelike
{
    enum Position { RELATIVE, ABSOLUTE };

    class Sprite
    {
        public Vector2 Pos;
        public Texture2D Texture;

        public Sprite(Texture2D t, int r, int g, int b, int a, Vector2 p)
        {
            Texture = t;
            Color c = new Color(r, g, b, a);
            Color[] data = new Color[t.Width * t.Height];
            for (int i = 0; i < data.Length; ++i) data[i] = c;
            Texture.SetData(data);
            Pos = p;
        }

        public Sprite(Texture2D t, Vector2 p)
        {
            Texture = t;
            Pos = p;
        }
    }

    abstract class Element : System.Windows.Forms.Form
    {
        //public bool Visible;
        //public int Width;
        //public int Height;
        public Vector2 Position;
        public List<Texture2D> Shapes;

        public abstract void Draw(SpriteBatch spritebatch, SpriteFont font);
    }

    class Title : Element
    {
        public override void Draw(SpriteBatch spritebatch, SpriteFont font)
        {
        }
    }


    class Button : Element
    {
        public override void Draw(SpriteBatch spritebatch, SpriteFont font)
        {

        }
    }
}