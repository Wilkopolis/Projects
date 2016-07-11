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
        public Faction Side = Faction.NERD;
    }

    public abstract class Fighter : Creature
    {
        public int HP = 1;
        public int MaxHP = 1;
        public Nature Brains = Nature.SMART;
        public bool HasMoved;

        public abstract int GetDamage(Random seed);
        public abstract int GetAttackCost();
        public abstract Dictionary<Effect, int> GetOffensiveEffects();
        public abstract Dictionary<Effect, int> GetDefensiveEffects();

        public void ApplyEndTurnEffects()
        {

        }
    }
}
 