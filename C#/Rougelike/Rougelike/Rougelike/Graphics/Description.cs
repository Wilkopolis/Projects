using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.Xna.Framework;

namespace Rougelike
{
    public class Description
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

        public Description(Entity entity)
        {
            Source = entity;
            Mods = entity.GetModStrings();
            Name = entity.GetNameStrings();
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
            if (entity.Position.X > 2)
            {
                Position.X = entity.Position.X * 64 + Length * 24;
            }
            else
            {
                Position.X = entity.Position.X * 64 + 64;
            }
            if (entity.Position.Y > 3)
            {
                Position.Y = entity.Position.Y * 64 - Length * 24;
            }
            else
            {
                Position.Y = entity.Position.Y * 64 + 64;
            }
        }

        public Description(InventoryButton button)
        {
            Source = button.Item;
            Mods = button.Item.GetModStrings();
            Name = button.Item.GetNameStrings();
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
            Position = button.Item.Position - new Vector2(250, 24);
        }

        public static Description Contains(List<Description> List, Description D)
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
