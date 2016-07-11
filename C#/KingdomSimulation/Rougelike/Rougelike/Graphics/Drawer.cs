using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.Xna.Framework.Graphics;
using Microsoft.Xna.Framework;

namespace Rougelike
{

    public partial class Rougelike
    {
        SpriteFont SegeoUiMono;
        SpriteFont Calibri;
        SpriteFont Cousine12;
        SpriteFont Cousine16;
        SpriteFont Cousine22;
        SpriteFont Cousine72;
        SpriteFont CenturyGothic;
        Color softgray = new Color(87, 77, 77);
        Color whiteorange = new Color(255, 245, 210);
        Color brightwhite = new Color(255, 249, 247);
        Color lightblue = new Color(52, 159, 216);
        Color orange = new Color(196, 102, 39);
        Vector2I fieldOffset = new Vector2I(34, 34);

        void Draw(Texture2D texture, Vector2 position, Vector2 origin)
        {
            if (texture != null)
                spriteBatch.Draw(texture, offsetVector + position, null, Color.White, 0, origin, 1, SpriteEffects.None, 0);
        }
        
        void Draw(Texture2D texture, Vector2 position)
        {
            if (texture != null)
                spriteBatch.Draw(texture, offsetVector + position, Color.White);
        }
                    
        void Draw(Texture2D texture)
        {
            if (texture != null)
                spriteBatch.Draw(texture, offsetVector, Color.White);
        }

        void Draw(Button button)
        {
            if (button.Sprite != null && button.Visable)
                spriteBatch.Draw(button.Sprite, button.Position + offsetVector, null, Color.White, 0, button.Origin, 1, SpriteEffects.None, 0);
        }

        void DrawLetterbox()
        {
            if (widescreen)
            {
                Draw(letterbox);
                Draw(letterbox, new Vector2(0, 720));
            }
        }   
    }
}
