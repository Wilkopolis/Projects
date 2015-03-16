using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.Xna.Framework.Graphics;
using Microsoft.Xna.Framework;

namespace Rougelike
{
    public enum ItemType { HEAD, CHEST, LEGS, BOOTS, BELT, WEILD, NECK, RINGL, RINGR, CONSUMABLE, INVENTORY, SHOP };

    public class Stackable : Item
    {
        public int StackSize = 1;
    }

    public abstract class Item : Entity, IEquatable<Item>
    {
        public Dictionary<Effect, int> Mods = new Dictionary<Effect, int>();
        public ItemType Type;

        public int Value;

        public Item(Vector2 position)
        {
            Position = position;
        }

        public Item(Texture2D sprite)
        {
            Sprite = sprite;
        }

        public Item()
        {
            Name = "default";
        }

        public bool Equals(Item other)
        {
            return HashID == other.HashID;
        }

        public override string[] GetModStrings()
        {
            LinkedList<string> mods = new LinkedList<string>();
            foreach(Effect E in Mods.Keys)
            {
                if ((int)E < 200)
                    mods.AddLast(ModToString(E) + " " + StrengthToString(Mods[E]));
            }

            string[] result = {"","","",""};
            int i = 0;
            foreach (string mod in mods)
            {
                if (result[i].Length + mod.Length > 20)
                    i++;
                result[i] += mod + ", "; 
            }
            if (result[i] != "")
                result[i] = result[i].Substring(0,result[i].Length-2);

            return result;
        }

        public List<Effect> GetEquipEffects()
        {
            List<Effect> result = new List<Effect>();
            foreach (Effect effect in Mods.Keys)
            {
                if ((int)effect > 200)
                {
                    result.Add(effect);
                }
            }
            return result;
        }

        public void EnterMod(Effect E)
        {
            if (Mods.ContainsKey(E))
            {
                Mods[E]++;
            }
            else
            {
                Mods.Add(E, 1); 
            }
        }
        
        public static string ModToString(Effect E)
        {
            switch (E)
            {
                case Effect.SPLINTER:
                    return "Splinter";
                case Effect.THORNS:
                    return "Thorns";
                case Effect.DOUBLING:
                    return "Doubling";
                case Effect.ABSORB:
                    return "Absorb";
                case Effect.BEEFUP:
                    return "BeefUp";
                default:
                    return "";
            }
        }

        public static string StrengthToString(int S)
        {
            switch (S)
            {
                case 1:
                    return "I";
                case 2:
                    return "II";
                case 3:
                    return "III";
                case 4:
                    return "IV";
                case 5:
                    return "V";
                case 6:
                    return "VI";
                default:
                    return "";
            }
        }

        public override string GetClass()
        {
            return "Item";
        }

        public string SlotToString()
        {
            switch (Type)
            {
                case ItemType.BELT:
                    return "Head";
                case ItemType.BOOTS:
                    return "Boots";
                case ItemType.CHEST:
                    return "Chest";
                case ItemType.CONSUMABLE:
                    return "Consumable";
                case ItemType.HEAD:
                    return "Head";
                case ItemType.INVENTORY:
                    return "Inventory";
                case ItemType.LEGS:
                    return "Legs";
                case ItemType.NECK:
                    return "Neck";
                case ItemType.RINGL:
                    return "Ring";
                case ItemType.RINGR:
                    return "Ring";
                case ItemType.WEILD:
                    return "";
                default:
                    return "";
            }
        }

        public bool Is(ItemType type)
        {
            return type == Type || type == ItemType.INVENTORY;
        }
    }
}
