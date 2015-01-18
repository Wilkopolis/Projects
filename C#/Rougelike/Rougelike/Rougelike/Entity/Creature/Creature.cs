using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.Xna.Framework;

namespace Rougelike
{
    public enum Faction { COOLGUY, NERD, SOVIET };
    public enum Nature { SMART, DUMB };

    public abstract class Creature : Entity
    {
        public Faction Side;
    }

    public abstract class Fighter : Creature
    {
        public int HP;
        public int AP;
        public int MaxAP;
        public int MaxHP;
        public Nature Brains;
        public bool Dead;

        public abstract int GetDamage();
        public abstract int GetAttackCost();
        public abstract Dictionary<Effect, int> GetOffensiveEffects();
        public abstract Dictionary<Effect, int> GetDefensiveEffects();

        public void ApplyEndTurnEffects()
        {
            AP = MaxAP;
        }
    }
}
 