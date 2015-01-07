using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.Xna.Framework;

namespace Rougelike
{
    public class Attack : Button
    {
        public Enemy Target;

        public Attack(Enemy target)
        {
            this.Target = target;
            Position = new Vector2(target.Position.X * 66, target.Position.Y * 66) + new Vector2(64, 64);
            Origin = new Vector2(32, 32);
        }
    }
}
