using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.Xna.Framework.Graphics;
using Microsoft.Xna.Framework;

namespace Rougelike
{
    public class EnemyButton : Button, IComparable<EnemyButton>
    {
        public Enemy Enemy;

        public EnemyButton(Texture2D sprite, Texture2D enemysprite, String name)
        {
            Sprite = sprite;
            Origin = new Vector2(Sprite.Width / 2, Sprite.Height / 2);
            Enemy = new Enemy(enemysprite, name);
            Action = "enemy";
            Visable = false;
        }

        public int CompareTo(EnemyButton o)
        {
            if (o == null)
                return 1;
            else
                return Convert.ToInt32(Enemy.Name.Split('.')[0]).CompareTo(Convert.ToInt32(o.Enemy.Name.Split('.')[0]));
        }
    }
}
