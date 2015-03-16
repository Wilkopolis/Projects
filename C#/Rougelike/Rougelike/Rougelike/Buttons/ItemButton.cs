using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Graphics;

namespace Rougelike
{
    public class ItemButton : Button
    {
        public Item Item;
        public ItemType Type;

        public ItemButton()
        {
        }

        public ItemButton(Vector2 position)
        {
            Position = position;
            Origin = new Vector2(25.5f, 25.5f);
        }
    }

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

    public class EnchantmentButton : Button
    {
        public Effect Enchantment;
        public int Cost;

        public EnchantmentButton(Texture2D sprite, Vector2 position, Effect enchantment, int cost)
        {
            Sprite = sprite;
            Position = position;
            Origin = new Vector2(Sprite.Width / 2, Sprite.Height / 2);
            Cost = cost;
            Enchantment = enchantment;
        }
    }
}
