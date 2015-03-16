using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.Xna.Framework.Graphics;

namespace Rougelike
{
    public enum Stairs { NONE, DOWN, UP };

    public class Tile
    {
        public Stairs Steps;
        public Texture2D Sprite;
        public bool Solid;
        public bool TrueSolid;
        public bool Door;
        public bool WasClicked;
        public bool WasRClicked;

        public Tile(Texture2D sprite, bool truesolid)
        {
            Sprite = sprite;
            Solid = truesolid;
            TrueSolid = truesolid;
            Door = false;
            Steps = Stairs.NONE;
        }

        public Tile Copy()
        {
            Tile Result = new Tile(Sprite, TrueSolid);
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
