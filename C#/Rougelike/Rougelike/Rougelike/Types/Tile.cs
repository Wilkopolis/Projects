using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.Xna.Framework.Graphics;

namespace Rougelike.Types
{
    public class Tile
    {
        public enum Stairs { UP, DOWN, NONE };
        public Stairs Steps;
        public int Texture;
        public bool Solid;
        public bool TrueSolid;
        public bool Door;

        public Tile(bool TrueSolid)
        {
            if (TrueSolid)
            {
                Texture = 1;
            }
            else
            {
                Texture = 0;
            }
            Solid = TrueSolid;
            this.TrueSolid = TrueSolid;
            Door = false;
            Steps = Stairs.NONE;
        }

        public Tile Copy()
        {
            Tile Result = new Tile(TrueSolid);
            Result.Texture = Texture;
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
