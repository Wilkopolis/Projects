using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Rougelike.Types
{
    public class Armor : Item
    {
        new public Armor Copy(int NewHash)
        {
            Armor Result = new Armor();
            Result.Name = Name;
            Result.Sprite = Sprite;
            Result.Position = Position;
            Result.Origin = Origin;
            Result.Type = Type;
            Result.HashID = NewHash;
            Result.Mods = Mods;
            return Result;
        }

        public override string GetClass()
        {
            return SlotToString();
        }
    }
}
