using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.Xna.Framework.Graphics;

namespace Rougelike
{
    public class Weapon : Item
    {
        public int Damage;
        public int Cost;

        public Weapon()
        {
        }

        public Weapon(Texture2D sprite, int damage, int cost, int worth, ItemType type, string name, int hashid, Effect[] effects)
        {
            Sprite = sprite;
            Damage = damage;
            Cost = cost;
            Value = worth;
            Type = type;
            Name = name;
            HashID = hashid;
            foreach (Effect effect in effects)
            {
                EnterMod(effect);
            }
        }

        public Weapon Copy(int NewHash)
        {
            Weapon Result = new Weapon();
            Result.Name = Name;
            Result.Sprite = Sprite;
            Result.Position = Position;
            Result.Origin = Origin;
            Result.Type = Type;
            Result.Damage = Damage;
            Result.Cost = Cost;
            Result.HashID = NewHash;
            Result.Value = Value;
            Result.Mods = Mods;
            return Result;
        }

        public bool IsLight()
        {
            return Mods.ContainsKey(Effect.LIGHT);
        }

        public bool IsOneHanded()
        {
            return Mods.ContainsKey(Effect.ONEHANDED);
        }

        public bool IsSword()
        {
            return Mods.ContainsKey(Effect.SWORD);
        }

        public override string GetClass()
        {
            string result = "";
            if (IsOneHanded())
                result += "1H ";
            if (IsSword())
                result += "Sword";
            else
                result += "Unknown";
            return result;
        }
    }
}
