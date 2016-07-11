using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Rougelike
{
    partial class Rougelike
    {
        bool DoAttack(Attack attack)
        {
            Attack(Save.Kevin, attack.Target);

            // for every enemy that died
            foreach (Enemy e in Save.GetRoom().Entities.FindAll(entity => entity is Enemy && ((Enemy)entity).HP <= 0))
            {
                if (Save.Kevin.Class != Class.MASTERMIND)
                    Save.Kevin.Experience++;
            }

            // if all enemies are dead
            if (Save.GetRoom().Entities.FindAll(entity => entity is Enemy && ((Enemy)entity).HP > 0).Count == 0)
            {
                Save.GetRoom().AddToRoom(GeneratePrize());
            }

            return true;
        }

        bool DoAttack(Enemy target)
        {
            Attack(Save.Kevin, target);

            // for every enemy that died
            foreach (Enemy e in Save.GetRoom().Entities.FindAll(entity => entity is Enemy && ((Enemy)entity).HP <= 0))
            {
                if (Save.Kevin.Class != Class.MASTERMIND)
                    Save.Kevin.Experience++;
            }

            // if all enemies are dead
            if (Save.GetRoom().Entities.FindAll(entity => entity is Enemy && ((Enemy)entity).HP > 0).Count == 0)
            {
                Save.GetRoom().AddToRoom(GeneratePrize());
            }

            return true;
        }

        bool Deal(Fighter victim, float damage)
        {
            victim.HP -= (int)Math.Round(damage);

            if (victim.HP <= 0)
            {
                return true;
            }
            return false;
        }

        void Attack(Fighter attacker, Fighter victim)
        {
            // Calculate Damage
            float damage = attacker.GetDamage(Random);

            // Apply Damage
            Deal(victim, damage);

            // Apply Attacker Effects
            Dictionary<Effect, int> mods = attacker.GetOffensiveEffects();
            foreach (Effect E in mods.Keys)
            {
                ApplyEffect(attacker, victim, E, mods[E], damage);
            }

            // Apply Defensive Effects
            mods = victim.GetDefensiveEffects();
            foreach (Effect E in mods.Keys)
            {
                ApplyEffect(attacker, victim, E, mods[E], damage);
            }
        }

        void GetPlayerAttackOptions()
        {
            foreach (Enemy enemy in Save.GetRoom().Entities.FindAll(entity => entity is Enemy))
            {
                if (enemy.Side != Save.Kevin.Side)
                {
                    if (Math.Abs(enemy.Position.X - Save.Kevin.Position.X) + Math.Abs(enemy.Position.Y - Save.Kevin.Position.Y) == 1)
                    {
                        GameButtons.Add(new Attack(enemy));
                    }
                }
            }
        }
    }
}
