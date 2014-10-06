using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.Xna.Framework.Graphics;

namespace Rougelike.Types
{
    public class Potion : Item
    {
        public int StackSize = 1;

        new public Potion Copy(int NewHash)
        {
            Potion Result = new Potion();
            Result.Name = Name;
            Result.Sprite = Sprite;
            Result.Position = Position;
            Result.Origin = Origin;
            Result.Type = Type;
            Result.StackSize = StackSize;
            Result.HashID = NewHash;
            return Result;
        }
    }
}
