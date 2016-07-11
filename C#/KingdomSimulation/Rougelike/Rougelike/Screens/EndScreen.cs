using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Input;
using Microsoft.Xna.Framework.Graphics;

namespace Rougelike
{
    public partial class Rougelike
    {
        Texture2D endBackground;

        void InitializeEndScreen() 
        {
            endBackground = Content.Load<Texture2D>("textures/end/background");
        }

        void DrawEndScreen()
        {
            spriteBatch.Draw(endBackground, Vector2.Zero, Color.White);
        }
    }
}
