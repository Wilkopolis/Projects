using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.Xna.Framework.Graphics;

namespace Rougelike
{
    public class Tile
    {
        public Stairs Steps;
        public int AssetIndex;
        public bool Solid;
        public bool TrueSolid;
        public bool Door;
        public bool WasClicked;
        public bool WasRClicked;

        public Tile(bool TrueSolid)
        {
            AssetIndex = 0;
            if (TrueSolid)
            {
                AssetIndex = 1;
            }
            Solid = TrueSolid;
            this.TrueSolid = TrueSolid;
            Door = false;
            Steps = Stairs.NONE;
        }

        public Tile Copy()
        {
            Tile Result = new Tile(TrueSolid);
            Result.AssetIndex = AssetIndex;
            Result.Door = Door;
            Result.Steps = Steps;      
            return Result;
        }

        public void Reset()
        {
            Solid = TrueSolid;
        }
    }
}
