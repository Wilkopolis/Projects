using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Graphics;

namespace Rougelike.Types
{
    public abstract class Entity
    {
        protected enum TEXTURE { EMPTY = 0, ROCK = 1, ENEMY = 2, PLAYER = 3, ROCKWEAPON = 4, DAGGER = 5, HEALTHVIAL = 6 };
        public string Name;
        public Vector2 Position;
        public Vector2 Origin;

        public abstract string[] GetModStrings();
        public abstract string GetClass();

        public string[] GetNameStrings()
        {
            string[] name = Name.Split(' ');
            string[] result = { "", "", "", "" };
            int i = 0;
            foreach (string line in name)
            {
                if (result[i].Length + line.Length > 13)
                    i++;
                result[i] += line + " ";
            }

            return result;
        }
    }
}
