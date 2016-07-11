using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.Xna.Framework.Graphics;

namespace Rougelike
{
    public class Armor : Item
    {
        public Armor (Texture2D sprite, int worth, ItemType type, string name, int hashid, Effect[] effects)
        {
            Sprite = sprite;
            Value = worth;
            Type = type;
            Name = name;
            Hash = hashid;
            foreach (Effect effect in effects)
            {
                EnterMod(effect);
            }
        }

        public Armor()
        {
        }
            
        public Armor Copy(int NewHash)
        {
            Armor Result = new Armor();
            Result.Name = Name;
            Result.Sprite = Sprite;
            Result.Position = Position;
            Result.Origin = Origin;
            Result.Type = Type;
            Result.Hash = NewHash;
            Result.Value = Value;
            Result.Mods = Mods;
            return Result;
        }

        public override string GetClass()
        {
            return SlotToString();
        }
    }
}
