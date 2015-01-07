using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.Xna.Framework.Graphics;
using Microsoft.Xna.Framework;

namespace Rougelike
{
    public enum Effect {THORNS = -1, STYLISH = 1, SHARP = 2, LIGHT = 3, LONG = 4, SPLINTER = 5, DOUBLING = 6, ONEHANDED = 101, SWORD = 102};
    public enum ItemType { HEAD, CHEST, LEGS, BOOTS, BELT, WEILD, NECK, RINGL, RINGR, CONSUMABLE, INVENTORY };

    public class Item : Entity, IEquatable<Item>
    {
        public Texture2D Sprite;

        public Dictionary<Effect, int> Mods = new Dictionary<Effect, int>();
        public ItemType Type;

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

        public Item Copy(int NewHash)
        {
            Item Result = new Item();
            Result.Name = Name;
            Result.Sprite = Sprite;
            Result.Position = Position;
            Result.Origin = Origin;
            Result.Type = Type;
            Result.HashID = NewHash;
            return Result;
        }

        public Item Copy(int NewHash, Vector2 position)
        {
            Item Result = new Item();
            Result.Name = Name;
            Result.Sprite = Sprite;
            Result.Position = position;
            Result.Origin = Origin;
            Result.Type = Type;
            Result.HashID = NewHash;
            return Result;
        }

        public Item Copy(Vector2 position)
        {
            Item Result = new Item();
            Result.Name = Name;
            Result.Sprite = Sprite;
            Result.Position = position;
            Result.Origin = Origin;
            Result.Type = Type;
            Result.HashID = HashID;
            return Result;
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
                if ((int)E < 100)
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
        
        public static string ModToString(Effect E)
        {
            switch (E)
            {
                case Effect.LIGHT:
                    return "Light";
                case Effect.LONG:
                    return "Long";
                case Effect.SHARP:
                    return "Sharp";
                case Effect.SPLINTER:
                    return "Splinter";
                case Effect.STYLISH:
                    return "Stylish";
                case Effect.THORNS:
                    return "Thorns";
                case Effect.DOUBLING:
                    return "Doubling";
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
    }
}
