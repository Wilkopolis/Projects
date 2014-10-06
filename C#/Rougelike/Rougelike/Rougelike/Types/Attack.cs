using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Rougelike.Util;
using Microsoft.Xna.Framework;

namespace Rougelike.Types
{
    public class Attack : Button
    {
        public Creature Target;

        public Attack(Creature target)
        {
            this.Target = target;
        }
    }
}
