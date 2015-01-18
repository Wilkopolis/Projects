using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.Xna.Framework;

namespace Rougelike
{
    public class Description : Button, IEquatable<Description>
    {
        public Vector2 Bounds;
        public Vector2 Offset;
        public Entity Source;
        public int Length;
        public bool Drag;
        public bool Delete;
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
            Position = button.Position - new Vector2(250, 24);
        }

        public Description(ShopButton button)
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
            Position = button.Position - new Vector2(250, 24);
        }

        public bool Equals(Description other)
        {
            return Source.HashID == other.Source.HashID;
        }
    }
}
