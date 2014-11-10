using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.Xna.Framework;

namespace Rougelike.Types
{
    public class Equipment
    {
        public InvButton[] Items;
        public enum Slot {NECK = 0, HEAD = 1, BELT = 2, RIGHT = 3, CHEST = 4, LEFT = 5, RINGR = 6, LEGS = 7, RINGL = 8, BOOTS = 9 };

        public Equipment()
        {
            Items = new InvButton[26];
            for (int i = 0; i < 26; i++)
            {
                Items[i] = new InvButton();
            }
            //Neck
            Items[0].Position = new Vector2(1094, 39);
            Items[0].Slot = Item.ItemType.NECK;
            //Head
            Items[1].Position = new Vector2(1153, 33);
            Items[1].Slot = Item.ItemType.HEAD;
            //Belt
            Items[2].Position = new Vector2(1213, 39);
            Items[2].Slot = Item.ItemType.BELT;
            //Right
            Items[3].Position = new Vector2(1094, 99);
            Items[3].Slot = Item.ItemType.WEILD;
            //Chest
            Items[4].Position = new Vector2(1153, 93);
            Items[4].Slot = Item.ItemType.CHEST;
            //Left
            Items[5].Position = new Vector2(1213, 99);
            Items[5].Slot = Item.ItemType.WEILD;
            //RingR
            Items[6].Position = new Vector2(1213, 159);
            Items[6].Slot = Item.ItemType.RINGR;
            //Legs
            Items[7].Position = new Vector2(1153, 153);
            Items[7].Slot = Item.ItemType.LEGS;
            //RingL
            Items[8].Position = new Vector2(1094, 159);
            Items[8].Slot = Item.ItemType.RINGL;
            //Boots
            Items[9].Position = new Vector2(1153, 214);
            Items[9].Slot = Item.ItemType.BOOTS;
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

        /*  WHEN
         *  We right clicked on an InvButton
         *  
         *  RETURN
         *  true if we use up a consumable stack (remove description)
         *  false otherwise
         */ 
        public bool RightClick(InvButton ClickedButton, Player Kevin)
        {
            if (ClickedButton.Item != null)
            {
                // IF ITS A CONSUMABLE
                if (ClickedButton.Item.Type == Item.ItemType.CONSUMABLE)
                {
                    ((HealthPotion)ClickedButton.Item).Use(Kevin);
                    if (((Potion)ClickedButton.Item).StackSize <= 0)
                    {
                        return true;
                    }
                }
                //// IF ITS IN MY LOADOUT
                //foreach (InvButton Button in GetLoadout())
                //{
                //    if (Button == ClickedButton)
                //    {
                //        AddToInventory(Button.Item);
                //        Button.Item = null;
                //        return true;
                //    }
                //}
                ////IF ITS IN MY INVENTORY
                //foreach (InvButton Button in GetLoadout())
                //{                    
                //    if (Button.Slot == ClickedButton.Item.Type)
                //    {
                //        if (ClickedButton.Item.Type == Item.ItemType.WEILD)
                //        {
                //            if (GetRight() != null && GetLeft() == null)
                //            {
                //                Items[(int)Slot.LEFT].Item = ClickedButton.Item;
                //                ClickedButton.Item = null;
                //                return true;
                //            }
                //        }
                //        Item tamp = Button.Item;
                //        Button.Item = ClickedButton.Item;
                //        ClickedButton.Item = tamp;
                //        return true;
                //    }
                //}
            }
            return false;
        }

        public InvButton[] GetWorn()
        {
            InvButton[] Result = new InvButton[4];
            Result[0] = Items[1];
            Result[1] = Items[4];
            Result[2] = Items[7];
            Result[3] = Items[9];
            return Result;
        }

        public InvButton[] GetLoadout()
        {
            InvButton[] Result = new InvButton[10];
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
            if (Item.Type == Item.ItemType.CONSUMABLE)
            {
                for (int i = 10; i < 26; i++)
                {
                    if (Items[i].Item != null)
                    {
                        if (Items[i].Item.Name == Item.Name)
                        {
                            ((Potion)Items[i].Item).StackSize++;
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

        public LinkedList<Weapon> GetWeapons()
        {
            LinkedList<Weapon> Result = new LinkedList<Weapon>();
            if (GetLeft() is Weapon)
                Result.AddLast((Weapon)GetLeft());
            if (GetRight() is Weapon)
                Result.AddLast((Weapon)GetRight());
            return Result;
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

        public Dictionary<Item.Effect, int> GetOffensiveEffects()
        {
            Dictionary<Item.Effect, int> results = new Dictionary<Item.Effect, int>();
            foreach (InvButton I in Items)
            {
                if (I.Item != null)
                {
                    foreach (Item.Effect E in I.Item.Mods.Keys)
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

        public Dictionary<Item.Effect, int> GetDefensiveEffects()
        {
            Dictionary<Item.Effect, int> results = new Dictionary<Item.Effect, int>();
            foreach (InvButton I in Items)
            {
                if (I.Item != null)
                {
                    foreach (Item.Effect E in I.Item.Mods.Keys)
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

        public Dictionary<Item.Effect, int> GetEffects()
        {
            Dictionary<Item.Effect, int> results = new Dictionary<Item.Effect, int>();
            foreach (InvButton I in Items)
            {
                if (I.Item != null)
                {
                    foreach (Item.Effect E in I.Item.Mods.Keys)
                    {
                        results.Add(E, I.Item.Mods[E]);
                    }
                }
            }
            return results;
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

        public float GetDamage(float Style)
        {
            float Damage = 0;

            LinkedList<Weapon> Weapons = GetWeapons();
            foreach (Weapon W in Weapons)
            {
                Damage += W.Damage;
            }

            if (Weapons.Count > 1)
                Damage = (int)Math.Ceiling(Damage * 1.2);

            // Apply style modifier
            Damage *= Style;

            return Damage;
        }
    }
}