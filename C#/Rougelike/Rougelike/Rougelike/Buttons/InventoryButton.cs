using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.Xna.Framework;

namespace Rougelike
{
    public class InventoryButton : Button
    {
        public Item Item;
        public ItemType Slot;

        public InventoryButton(Item Item)
        {
            this.Item = Item;
            Sprite = Item.Sprite;
            Origin = new Vector2(25.5f, 25.5f);
            Slot = ItemType.INVENTORY;
        }

        public InventoryButton()
        {
            Origin = new Vector2(25.5f, 25.5f);
            Slot = ItemType.INVENTORY;
        }
    }
}
