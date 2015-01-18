using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.Xna.Framework;

namespace Rougelike
{
    public class ShopButton : ItemButton
    {
        public int Cost;
        public int Stock;

        public ShopButton(Item item, int stock)
        {
            Item = item;
            Cost = item.Value;
            Stock = stock;
            Sprite = Item.Sprite;
            Type = ItemType.SHOP;
            Origin = new Vector2(25.5f, 25.5f);
        }
    }
}
