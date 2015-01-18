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

        public int Power;
        public int Wealth;
        public int Experience;

        public Class Class;

        public Player(int hashid)
        {
            Name = "You";
            AssetIndex = (int)Texture.PLAYER;
            Origin = new Vector2(40, 40);
            HP = 4;
            MaxHP = 6;
            AP = 5;
            MaxAP = 5;
            Side = Faction.COOLGUY;
            Brains = Nature.DUMB;
            HashID = hashid;
            Equipment = new Equipment();
            Skills = new List<Skill>();
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
            return Equipment.GetEffects();
        }

        override public Dictionary<Effect, int> GetOffensiveEffects()
        {
            return Equipment.GetOffensiveEffects();
        }

        override public Dictionary<Effect, int> GetDefensiveEffects()
        {
            return Equipment.GetDefensiveEffects();
        }

        override public int GetDamage()
        {
            return Equipment.GetDamage();
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
            Dictionary<Effect, int> Mods = Equipment.GetEffects();

            LinkedList<string> mods = new LinkedList<string>();
            foreach (Effect E in Mods.Keys)
            {
                if ((int)E < 100)
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

        public int MyWealthPerTurn()
        {
            return 0;
        }

        public int MyPowerPerTurn()
        {
            return 0;
        }
    }
}
