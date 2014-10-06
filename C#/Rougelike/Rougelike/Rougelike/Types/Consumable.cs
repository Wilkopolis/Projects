using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Rougelike.Types
{
    interface Consumable
    {
        void Use(Creature c);
    }
}
