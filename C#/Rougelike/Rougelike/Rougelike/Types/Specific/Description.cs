using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.Xna.Framework;

namespace Rougelike.Types
{
    class Description
    {
        public Vector2 Position;
        public Vector2 Bounds;
        public Vector2 MouseSnap;
        public Vector2 PosSnap;
        public Entity Source;
        public int Length;
        public bool Drag;
        public string[] Mods;
        public string[] Name;

        public Description(Entity E, bool inventory, Vector2 position)
        {
            Source = E;
            Mods = Source.GetModStrings();
            Name = Source.GetNameStrings();
            Length = 5;
            foreach (string line in Mods)
            {
                if (line != "")
                    ++Length;
            }
            foreach (string line in Name)
            {
                if (line != "")
                    ++Length;
            }
            Bounds = new Vector2(230, Length * 24);
            if (!inventory)
            {
                if (E.Position.X > 2)
                {
                    Position.X = position.X * 64 + Length * 24;
                }
                else
                {
                    Position.X = position.X * 64 + 64;
                }
                if (E.Position.Y > 3)
                {
                    Position.Y = position.Y * 64 - Length * 24;
                }
                else
                {
                    Position.Y = position.Y * 64 + 64;
                }
            }
            else
            {
                Position = position - new Vector2(250, 24);
            }
        }

        public static Description Contains(LinkedList<Description> List, Description D)
        {
            foreach (Description O in List)
            {
                if (D.Source.Name == O.Source.Name && D.Source.Position == O.Source.Position && D.Source.Origin == O.Source.Origin)
                {
                    return O;
                }
            }
            return null;
        }
    }
}
