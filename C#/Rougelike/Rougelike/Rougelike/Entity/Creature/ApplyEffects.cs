using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Rougelike
{
    partial class Rougelike
    {
        /*
         *  Applies offensive and defensive effects
         */
        void ApplyEffects(Fighter attacker, Fighter victim, Effect effect, int strength, float damage)
        {
            if (effect == Effect.SPLINTER)
            {
                switch (strength)
                {
                    /*
                     * Splinter should do a piercing attack with 1/4 of your damage to adjacent enemies
                     */
                    case 1:
                        SplinterI(attacker, victim, damage);
                        break;
                    case 2:
                        SplinterII(attacker, victim, damage);
                        break;
                    case 3:
                        break;
                    case 4:
                        break;
                    case 5:
                        break;
                }
            }
            else if (effect == Effect.THORNS)
            {
                switch (strength)
                {
                    /*
                     * Splinter should do a piercing attack with 1/4 of your damage to adjacent enemies
                     */
                    case 1:
                        ThornsI(attacker, victim, damage);
                        break;
                    case 2:
                        break;
                    case 3:
                        break;
                    case 4:
                        break;
                    case 5:
                        break;
                }
            }
            else if (effect == Effect.DOUBLING)
            {
                switch (strength)
                {
                    /*
                     * Splinter should do a piercing attack with 1/4 of your damage to adjacent enemies
                     */
                    case 1:
                        DoublingI(attacker, victim, damage);
                        break;
                    case 2:
                        break;
                    case 3:
                        break;
                    case 4:
                        break;
                    case 5:
                        break;
                }
            }
        }

        void SplinterI(Fighter attacker, Fighter victim, float damage)
        {
            List<Fighter> adjacent = Save.GetRoom().GetAdjacentCreatures(victim);
            foreach (Fighter C in adjacent)
            {
                if (C != attacker)
                {
                    Deal(C, (float)damage / 2);
                }
            }
        }

        void SplinterII(Fighter attacker, Fighter victim, float damage)
        {
            List<Fighter> adjacent = Save.GetRoom().GetAdjacentCreatures(victim);
            foreach (Fighter C in adjacent)
            {
                if (C != attacker)
                {
                    Deal(C, (float)damage);
                }
            }
        }

        void ThornsI(Fighter attacker, Fighter victim, float damage)
        {
            Deal(victim, damage);
        }

        void DoublingI(Fighter attacker, Fighter victim, float damage)
        {
            Deal(victim, damage * 2);
        }

    }
}
