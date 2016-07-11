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
        Vector2 yearLocation = new Vector2(100, 100);

        void DrawUI()
        {            
            spriteBatch.DrawString(Cousine22, save.year.ToString(), yearLocation, Color.AntiqueWhite);
        }
    }
}
