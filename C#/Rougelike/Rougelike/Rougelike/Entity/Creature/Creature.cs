using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.Xna.Framework;

namespace Rougelike
{
    public partial class Creature : Entity
    {
        public enum Faction { COOLGUY, NERD, SOVIET };
        public enum Nature { SMART, DUMB };

        public LinkedList<Movement> Movements;
        public LinkedList<Attack> Attacks;
        public int HP;
        public int AP;
        public int MaxAP;
        public int MaxHP;
        public Faction Side;
        public Nature Brains;
        public bool Dead;

        // How much I want the tilemovement to cost in AP
        // This is here for ease of change
        protected static int mod = 1;

        public Creature Copy()
        {
            Creature Result = new Creature();
            Result.HP = HP;
            Result.MaxHP = MaxHP;
            Result.AP = AP;
            Result.MaxAP = MaxAP;
            Result.Name = Name;
            Result.Brains = Brains;
            Result.Origin = Origin;
            Result.Position = Position;
            Result.AssetIndex = AssetIndex;
            Result.Side = Side;
            return Result;
        }

        public void EndTurn()
        {
            AP = MaxAP;
        }

        public static bool Attack(Enemy attacker, Player victim, Room room)
        {
            // Calculate Damage
            float damage = attacker.GetDamage();

            // If we have enough AP
            if (attacker.AP >= attacker.GetAttackCost())
            {
                attacker.AP -= attacker.GetAttackCost();

                // Apply Attacker Effects
                Dictionary<Effect, int> mods = attacker.GetOffensiveEffects();
                foreach (Effect E in mods.Keys)
                {
                    ApplyEffects(attacker, victim, room, E, mods[E], damage);
                }

                // Apply Defensive Effects
                mods = victim.GetDefensiveEffects();
                foreach (Effect E in mods.Keys)
                {
                    ApplyEffects(attacker, victim, room, E, mods[E], damage);
                }

                // Apply Damage
                return Deal(attacker, victim, room, damage);
            }
            return false;
        }

        public static bool Attack(Player attacker, Enemy victim, Room room)
        {
            // Calculate Damage
            float damage = attacker.GetDamage();

            // If we have enough AP
            if (attacker.AP >= attacker.Equipment.GetAttackCost())
            {
                attacker.AP -= attacker.Equipment.GetAttackCost();

                // Apply Attacker Effects
                Dictionary<Effect, int> mods = attacker.GetOffensiveEffects();
                foreach (Effect E in mods.Keys)
                {
                    ApplyEffects(attacker, victim, room, E, mods[E], damage);
                }

                // Apply Defensive Effects
                mods = victim.GetDefensiveEffects();
                foreach (Effect E in mods.Keys)
                {
                    ApplyEffects(attacker, victim, room, E, mods[E], damage);
                }

                // Apply Damage
                return Deal(attacker, victim, room, damage);
            }
            return false;
        }

        public override string[] GetModStrings()
        {
            return new string[] { "" };
        }

        public override string GetClass()
        {
            return "Creature";
        }
    }
}
 