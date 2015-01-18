using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.Xna.Framework.Graphics;
using Microsoft.Xna.Framework;

namespace Rougelike
{
    public class EnemyButton : Button
    {
        public Enemy Enemy;

        public EnemyButton(Texture2D sprite, String name)
        {
            Sprite = sprite;
            Origin = new Vector2(Sprite.Width / 2, Sprite.Height / 2);
            Enemy = new Enemy(name);
            Action = "enemy";
            Visable = false;
        }
    }
}
