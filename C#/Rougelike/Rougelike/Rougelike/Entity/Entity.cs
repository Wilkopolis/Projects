using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Graphics;

namespace Rougelike
{
    public abstract class Entity : IEquatable<Entity>
    {
        public string Name;
        public int HashID;
        public Vector2I Position;
        public Vector2I Origin;
        public Texture2D Sprite;

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
        
        public bool Equals(Entity other)
        {
            return HashID == other.HashID;
        }
    }
}
