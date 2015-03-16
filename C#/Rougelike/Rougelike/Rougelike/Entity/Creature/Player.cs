using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.Xna.Framework.Graphics;
using Microsoft.Xna.Framework;

namespace Rougelike
{
    public class Player : Fighter
    {
        public int Selection;
        public Equipment Equipment;
        public List<Skill> Skills;
        public List<Effect> Buffs;

        public int Power;
        public int Wealth;
        public int Experience;

        public int WealthPerTurn = 1;
        public int PowerPerTurn = 1;

        //Mayor
        public int ExperiencePerTurn;

        public Class Class;

        public Player(Texture2D sprite, int hashid, Class playerclass)
        {
            Name = "You";
            Sprite = sprite;
            Origin = new Vector2(40, 40);
            HP = 6;
            MaxHP = 8;
            AP = 5;
            MaxAP = 5;
            Side = Faction.COOLGUY;
            Brains = Nature.DUMB;
            HashID = hashid;
            Class = playerclass;
            if (Class == Class.MASTERMIND)
                ExperiencePerTurn = 1;
            Equipment = new Equipment();
            Skills = new List<Skill>();
            Buffs = new List<Effect>();
        }

        public void PickUp(Item item)
        {
            if (item is Coin)
                Wealth += ((Coin)item).Value;
            else
                Equipment.AddToInventory(item);
        }

        public Dictionary<Effect, int> GetEffects()
        {
            Dictionary<Effect, int> results = Equipment.GetEffects();
            foreach (Effect e in Buffs)
            {
                if (results.ContainsKey(e))
                    results[e]++;
                else
                    results.Add(e, 1);
            }
            return results;
        }

        override public Dictionary<Effect, int> GetOffensiveEffects()
        {
            return Equipment.GetOffensiveEffects();
        }

        override public Dictionary<Effect, int> GetDefensiveEffects()
        {
            return Equipment.GetDefensiveEffects();
        }

        override public int GetDamage(Random seed)
        {
            int damage = Equipment.GetDamage();
            Dictionary<Effect, int> effects = GetEffects();
            if (effects.ContainsKey(Effect.DMGUP))
                damage += effects[Effect.DMGUP];
            if (effects.ContainsKey(Effect.DMGDOWN))
                damage -= effects[Effect.DMGDOWN];
            if (effects.ContainsKey(Effect.CRITUP))
                if (seed.Next(effects[Effect.CRITUP], 5) == 4)
                    damage *= 2;
            return damage;
        }

        override public int GetAttackCost()
        {
            return Equipment.GetAttackCost();
        }

        override public string GetClass()
        {
            return Class.ToString();
        }

        override public string[] GetModStrings()
        {
            Dictionary<Effect, int> Mods = GetEffects();
            LinkedList<string> mods = new LinkedList<string>();

            foreach (Effect E in Mods.Keys)
            {
                if ((int)E < 200)
                    mods.AddLast(Item.ModToString(E) + " " + Item.StrengthToString(Mods[E]));
            } 
            string[] result = { "", "", "", "" };
            int i = 0;
            foreach (string mod in mods)
            {
                if (result[i].Length + mod.Length > 20)
                    i++;
                result[i] += mod + ", ";
            }
            if (i != 0)
                result[i] = result[i].Substring(0, result[i].Length - 1);

            return result;
        }

        public bool InventoryFull()
        {
            for (int i = 10; i < 26; i++)
            {
                if (Equipment.Items[i].Item == null)
                {
                    return false;
                }
            }
            return true;
        }
    }
}
