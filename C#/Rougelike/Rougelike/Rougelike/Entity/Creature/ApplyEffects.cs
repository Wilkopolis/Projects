using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Rougelike
{
    public enum Effect { REGEN = -3, ABSORB = -2, THORNS = -1, DMGUP = 1, DMGDOWN = 2, SPLINTER = 3, DOUBLING = 4, CRITUP = 5, BEEFUP = 101, ONEHANDED = 201, SWORD = 202 };

    partial class Rougelike
    {
        /*
         *  Applies offensive and defensive effects
         */
        void ApplyEffect(Fighter attacker, Fighter victim, Effect effect, int strength, float damage)
        {
            switch (effect)
            {
                case Effect.ABSORB:
                    switch (strength)
                    {
                        /*
                         *  Absorb makes you take less damage
                         */
                        case 1:
                            AbsorbI(attacker, victim, damage);
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
                    break;

                case Effect.THORNS:
                    switch (strength)
                    {
                        /*
                         *  Thorns does retributal damage to the attacker
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
                    break;
                case Effect.SPLINTER:
                    switch (strength)
                    {
                        /*
                         *  Splinter does a piercing attack with 1/4 of your damage to adjacent enemies
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
                    break;

                case Effect.DOUBLING:
                    switch (strength)
                    {
                        /*
                         *  Double Damage
                         */
                        case 1:
                            DoublingI(attacker, victim, damage);
                            break;
                        case 2:
                            DoublingII(attacker, victim, damage);
                            break;
                        case 3:
                            break;
                        case 4:
                            break;
                        case 5:
                            break;
                    }
                    break;
            }
        }

        void ApplyEquipEffects(Item item, bool equiping)
        {
            foreach (Effect effect in item.GetEquipEffects())
            {                
                switch (effect)
                {
                    case Effect.BEEFUP:
                        if (equiping)
                            Save.Kevin.MaxHP += 10;
                        else
                        {
                            Save.Kevin.MaxHP -= 10;
                            if (Save.Kevin.HP > Save.Kevin.MaxHP)
                                Save.Kevin.HP = Save.Kevin.MaxHP;
                        }
                        break;
                }
            }
        }

        void AbsorbI(Fighter attacker, Fighter victim, float damage)
        {
            victim.HP++;
            if (victim.HP >= victim.MaxHP)
            {
                victim.HP = victim.MaxHP;
            }
        }

        void ThornsI(Fighter attacker, Fighter victim, float damage)
        {
            Deal(attacker, 1);
        }
            
        void SplinterI(Fighter attacker, Fighter victim, float damage)
        {
            List<Fighter> adjacent = Save.GetRoom().GetAdjacentCreatures(victim);
            foreach (Fighter C in adjacent)
            {
                if (C != attacker)
                {
                    Deal(C, 1);
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
                    Deal(C, 2);
                }
            }
        }

        void DoublingI(Fighter attacker, Fighter victim, float damage)
        {
            Deal(victim, 1);
        }

        void DoublingII(Fighter attacker, Fighter victim, float damage)
        {
            Deal(victim, 2);
        }
    }
}
