using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Rougelike.Types
{
    partial class Creature
    {
        private static bool Deal(Creature attacker, Creature victim, Room room, float damage)
        {
            victim.HP -= (int)Math.Round(damage);

            if (victim.HP <= 0)
            {
                if (victim is Enemy)
                {
                    room.Remove(victim);
                    room.UpdateTiles();
                    return true;
                }
            }
            return false;
        }

        /*
         *  Applies offensive and defensive effects
         */ 
        private static void ApplyEffects(Creature attacker, Creature victim, Room room, Item.Effect effect, int strength, float damage)
        {
            if (effect == Item.Effect.SPLINTER)
            {
                switch (strength)
                {
                    /*
                     * Splinter should do a piercing attack with 1/4 of your damage to adjacent enemies
                     */
                    case 1:
                        SplinterI(attacker, victim, room, damage);
                        break;
                    case 2:
                        SplinterII(attacker, victim, room, damage);
                        break;
                    case 3:
                        break;
                    case 4:
                        break;
                    case 5:
                        break;
                }
            }
            else if (effect == Item.Effect.THORNS)
            {
                switch (strength)
                {
                    /*
                     * Splinter should do a piercing attack with 1/4 of your damage to adjacent enemies
                     */
                    case 1:
                        ThornsI(attacker, victim, room, damage);
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
            else if (effect == Item.Effect.DOUBLING)
            {
                switch (strength)
                {
                    /*
                     * Splinter should do a piercing attack with 1/4 of your damage to adjacent enemies
                     */
                    case 1:
                        DoublingI(attacker, victim, room, damage);
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

        private static void SplinterI(Creature attacker, Creature victim, Room room, float damage)
        {
            LinkedList<Creature> adjacent = room.GetAdjacentCreatures(victim);
            foreach (Creature C in adjacent)
            {
                if (C != attacker)
                {
                    Deal(attacker, C, room, (float)damage / 4);
                }
            }
        }

        private static void SplinterII(Creature attacker, Creature victim, Room room, float damage)
        {
            LinkedList<Creature> adjacent = room.GetAdjacentCreatures(victim);
            foreach (Creature C in adjacent)
            {
                if (C != attacker)
                {
                    Deal(attacker, C, room, (float)damage);
                }
            }
        }

        private static void ThornsI(Creature attacker, Creature victim, Room room, float damage)
        {
            Deal(victim, attacker, room, damage);
        }

        private static void DoublingI(Creature attacker, Creature victim, Room room, float damage)
        {
            Deal(attacker, victim, room, damage * 2);
        }
    }
}
