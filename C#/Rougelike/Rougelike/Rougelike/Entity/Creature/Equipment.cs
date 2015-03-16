using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.Xna.Framework;

namespace Rougelike
{
    public enum Slot { NECK = 0, HEAD = 1, BELT = 2, RIGHT = 3, CHEST = 4, LEFT = 5, RINGR = 6, LEGS = 7, RINGL = 8, BOOTS = 9 };

    public class Equipment
    {
        public InventoryButton[] Items;

        public Equipment()
        {
            Items = new InventoryButton[26];
            for (int i = 0; i < 26; i++)
            {
                Items[i] = new InventoryButton();
            }
            //Neck
            Items[0].Position = new Vector2(1094, 39);
            Items[0].Type = ItemType.NECK;
            //Head
            Items[1].Position = new Vector2(1153, 33);
            Items[1].Type = ItemType.HEAD;
            //Belt
            Items[2].Position = new Vector2(1213, 39);
            Items[2].Type = ItemType.BELT;
            //Right
            Items[3].Position = new Vector2(1094, 99);
            Items[3].Type = ItemType.WEILD;
            //Chest
            Items[4].Position = new Vector2(1153, 93);
            Items[4].Type = ItemType.CHEST;
            //Left
            Items[5].Position = new Vector2(1213, 99);
            Items[5].Type = ItemType.WEILD;
            //RingR
            Items[6].Position = new Vector2(1213, 159);
            Items[6].Type = ItemType.RINGR;
            //Legs
            Items[7].Position = new Vector2(1153, 153);
            Items[7].Type = ItemType.LEGS;
            //RingL
            Items[8].Position = new Vector2(1094, 159);
            Items[8].Type = ItemType.RINGL;
            //Boots
            Items[9].Position = new Vector2(1153, 214);
            Items[9].Type = ItemType.BOOTS;
            //Inventory 0,0
            Items[10].Position = new Vector2(1076, 286);
            Items[11].Position = new Vector2(1127, 286);
            Items[12].Position = new Vector2(1178, 286);
            Items[13].Position = new Vector2(1229, 286);
            Items[14].Position = new Vector2(1076, 337);
            Items[15].Position = new Vector2(1127, 337);
            Items[16].Position = new Vector2(1178, 337);
            Items[17].Position = new Vector2(1229, 337);
            Items[18].Position = new Vector2(1076, 388);
            Items[19].Position = new Vector2(1127, 388);
            Items[20].Position = new Vector2(1178, 388);
            Items[21].Position = new Vector2(1229, 388);
            Items[22].Position = new Vector2(1076, 439);
            Items[23].Position = new Vector2(1127, 439);
            Items[24].Position = new Vector2(1178, 439);
            //Inventory 4,4
            Items[25].Position = new Vector2(1229, 439);
        }

        public InventoryButton[] GetWorn()
        {
            InventoryButton[] Result = new InventoryButton[4];
            Result[0] = Items[1];
            Result[1] = Items[4];
            Result[2] = Items[7];
            Result[3] = Items[9];
            return Result;
        }

        public InventoryButton[] GetLoadout()
        {
            InventoryButton[] Result = new InventoryButton[10];
            for (int i = 0; i < 10; i++)
            {
                Result[i] = Items[i];
            }
            return Result;
        }

        public int GetInventoryCount()
        {
            int count = 0;
            for (int i = 10; i < 26; i++)
            {
                if (Items[i].Item != null)
                {
                    count++;
                }
            }
            return count;
        }

        public bool AddToInventory(Item Item)
        {
            if (Item.Type == ItemType.CONSUMABLE)
            {
                for (int i = 10; i < 26; i++)
                {
                    if (Items[i].Item != null)
                    {
                        if (Items[i].Item.Name == Item.Name)
                        {
                            ((Stackable)Items[i].Item).StackSize++;
                            return true;
                        }
                    }
                }
            }
            for (int i = 10; i < 26; i++)
            {
                if (Items[i].Item == null)
                {
                    Items[i].Item = Item;
                    return true;
                }
            }
            return false;
        }

        public Item GetLeft()
        {
            return Items[(int)Slot.LEFT].Item;
        }

        public Item GetRight()
        {
            return Items[(int)Slot.RIGHT].Item;
        }

        public void SetLeft(Item item)
        {
            Items[(int)Slot.LEFT].Item = item;
        }

        public void SetRight(Item item)
        {
            Items[(int)Slot.RIGHT].Item = item;
        }

        public Dictionary<Effect, int> GetOffensiveEffects()
        {
            Dictionary<Effect, int> results = new Dictionary<Effect, int>();
            foreach (InventoryButton I in Items)
            {
                if (I.Item != null)
                {
                    foreach (Effect E in I.Item.Mods.Keys)
                    {
                        if ((int)E > 0 && I.Item.Mods[E] < 100)
                        {
                            if (results.ContainsKey(E))
                                results[E]++;
                            else
                                results.Add(E, I.Item.Mods[E]);
                        }
                    }
                }
            }
            return results;
        }
        
        public Dictionary<Effect, int> GetDefensiveEffects()
        {
            Dictionary<Effect, int> results = new Dictionary<Effect, int>();
            foreach (InventoryButton I in Items)
            {
                if (I.Item != null)
                {
                    foreach (Effect E in I.Item.Mods.Keys)
                    {
                        if ((int)E < 0)
                        {
                            if (results.ContainsKey(E))
                                results[E]++;
                            else
                                results.Add(E, I.Item.Mods[E]);
                        }
                    }
                }
            }
            return results;
        }

        public Dictionary<Effect, int> GetEffects()
        {
            Dictionary<Effect, int> results = new Dictionary<Effect, int>();
            foreach (InventoryButton I in Items)
            {
                if (I.Item != null)
                {
                    foreach (Effect E in I.Item.Mods.Keys)
                    {
                        if (results.ContainsKey(E))
                            results[E]++;
                        else
                            results.Add(E, I.Item.Mods[E]);
                    }
                }
            }
            return results;
        }

        public List<Weapon> GetWeapons()
        {
            List<Weapon> Result = new List<Weapon>();
            if (GetLeft() is Weapon)
                Result.Add((Weapon)GetLeft());
            if (GetRight() is Weapon)
                Result.Add((Weapon)GetRight());
            return Result;
        }

        public int GetAttackCost()
        {
            int APCost = 0;

            foreach (Weapon W in GetWeapons())
            {
                APCost += W.Cost;
            }

            return APCost;
        }

        public int GetDamage()
        {
            int Damage = 0;

            foreach (Weapon W in GetWeapons())
            {
                Damage += W.Damage;
            }
            
            return Damage;
        }
    }
}