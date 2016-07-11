using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Graphics;
using System.Collections.Generic;

namespace ProperRoguelike
{
    class Menu : Element
    {
        public string Title;

        List<Sprite> Body;
        List<Element> Elements;

        public Menu(string t = "none", int x = 0, int y = 0, int w = 100, int h = 100, List<Sprite> b = null, List<Element> e = null)
        {
            Title = t;
            Position = new Vector2(x, y);
            Width = w;
            Height = h;
            Body = b;
            Elements = e;
            Visible = false;
        }

        public override void Draw(SpriteBatch spritebatch, SpriteFont font)
        {
            foreach(Sprite sprite in Body)
            {
                Vector2 pos = Position + sprite.Pos;
                spritebatch.Draw(sprite.Texture, pos, Microsoft.Xna.Framework.Color.White);
            }


        }
    }
}
