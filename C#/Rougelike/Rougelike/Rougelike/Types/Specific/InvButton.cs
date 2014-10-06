using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Rougelike.Util;
using Microsoft.Xna.Framework;

namespace Rougelike.Types
{
    public class InvButton : Button
    {
        public Item Item;
        public Item.ItemType Slot;

        public InvButton(Item Item)
        {
            this.Item = Item;
            Sprite = Item.Sprite;
            Origin = new Vector2(25.5f, 25.5f);
            Slot = Item.ItemType.INVENTORY;
        }

        public InvButton()
        {
            Origin = new Vector2(25.5f, 25.5f);
            Slot = Item.ItemType.INVENTORY;
        }
    }
}
