using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.Xna.Framework.Graphics;
using Microsoft.Xna.Framework;

namespace Rougelike
{
    public class Player : Creature
    {
        public int Selection;
        public Equipment Equipment;

        public int Power;
        public int Wealth;

        public Class Class;

        public Player()
        {
            Name = "You";
            AssetIndex = (int)Texture.PLAYER;
            Origin = new Vector2(40, 40);
            HP = 4;
            MaxHP = 6;
            AP = 5;
            MaxAP = 5;
            Side = Faction.COOLGUY;
            Brains = Nature.DUMB;
            Equipment = new Equipment();
        }

        public void PickUp(Item item)
        {
            Equipment.AddToInventory(item);
        }

        public void UpdateSelected(Vector2 tile)
        {
            for (int k = 0; k < Attacks.Count; k++)
            {
                Attack option = Attacks.ElementAt(k);
                if (option.Target.Position == tile)
                {
                    Selection = k;
                }
            }
        }

        public Dictionary<Effect, int> GetEffects()
        {
            return Equipment.GetEffects();
        }

        public Dictionary<Effect, int> GetDefensiveEffects()
        {
            return Equipment.GetDefensiveEffects();
        }

        public Dictionary<Effect, int> GetOffensiveEffects()
        {
            return Equipment.GetOffensiveEffects();
        }

        public float GetDamage()
        {
            return Equipment.GetDamage();
        }

        public override string[] GetModStrings()
        {
            Dictionary<Effect, int> Mods = Equipment.GetEffects();

            LinkedList<string> mods = new LinkedList<string>();
            foreach (Effect E in Mods.Keys)
            {
                if ((int)E < 100)
                    mods.AddLast(Item.ModToString(E) + " " + Item.StrengthToString(Mods[E]));
            }

            string[] result = { "", "", "", "" };
            int i = 0;
            foreach (string mod in mods)
            {
                if (result[i].Length + mod.Length > 20)
                    i++;
                result[i] += mod + ", ";
            }
            if (i != 0)
                result[i] = result[i].Substring(0, result[i].Length - 1);

            return result;
        }

        public void UpdateOptions(Room room, List<Button> buttons)
        {
            buttons.RemoveAll(item => item is Attack || item is Movement);
            if (room.IsClear())
            {
                for (int i = 0; i < 10; i++)
                {
                    for (int j = 0; j < 15; j++)
                    {
                        if (!room.Tiles[j, i].Solid)
                            buttons.Add(new Movement(i, j));
                    }
                }
                AP = MaxAP;
            }
            else
                GetMovementOptions(room, buttons);

            GetAttackOptions(room, buttons);
        }

        private void GetMovementOptions(Room room, List<Button> buttons)
        {
            List<Movement> openset = new List<Movement>();
            openset.Add(new Movement((int)Position.X, (int)Position.Y, 0));

            int duration = AP;
            int initialduration = AP;
            int cost = 0;
            while (duration >= mod)
            {
                // How much a movement costs in AP
                cost = initialduration - duration + mod;
                int count = openset.Count();
                for (int i = 0; i < count; i++)
                {
                    Movement movement = openset.ElementAt(i);
                    if (movement.Y > 0)
                    {
                        if (!room.Tiles[movement.X, movement.Y - 1].Solid)
                        {
                            Movement next = new Movement(movement.X, movement.Y - 1, cost);
                            if (!(openset.Contains(next)))
                            {
                                openset.Add(next);
                            }
                        }
                    }
                    if (movement.X > 0)
                    {
                        if (!room.Tiles[movement.X - 1, movement.Y].Solid)
                        {
                            Movement next = new Movement(movement.X - 1, movement.Y, cost);
                            if (!(openset.Contains(next)))
                            {
                                openset.Add(next);
                            }
                        }
                    }
                    if (movement.X < 14)
                    {
                        if (!room.Tiles[movement.X + 1, movement.Y].Solid)
                        {
                            Movement next = new Movement(movement.X + 1, movement.Y, cost);
                            if (!(openset.Contains(next)))
                            {
                                openset.Add(next);
                            }
                        }
                    }
                    if (movement.Y < 9)
                    {
                        if (!room.Tiles[movement.X, movement.Y + 1].Solid)
                        {
                            Movement next = new Movement(movement.X, movement.Y + 1, cost);
                            if (!(openset.Contains(next)))
                            {
                                openset.Add(next);
                            }
                        }
                    }
                }
                duration -= mod;
            }
            openset.Remove(new Movement((int)Position.X, (int)Position.Y, 0));
            foreach (Movement move in openset)
            {
                buttons.Add(move);
            }
        }

        private void GetAttackOptions(Room room, List<Button> buttons)
        {
            foreach (Entity entity in room.Entities)
            {
                // if creature
                if (entity is Enemy)
                {
                    // if different faction
                    if (((Enemy)entity).Side != Side)
                    {
                        if (Math.Abs(entity.Position.X - Position.X) + Math.Abs(entity.Position.Y - Position.Y) == 1)
                        {
                            buttons.Add(new Attack((Enemy)entity));
                        }
                    }
                }
            }
        }

        public int MyWealthPerTurn()
        {
            return 0;
        }

        public int MyPowerPerTurn()
        {
            return 0;
        }

        /*  WHEN
         *  We right clicked on an InventoryButton
         *  
         *  RETURN
         *  true if we use up a consumable stack (remove description)
         *  false otherwise
         */
        public bool RightClick(InventoryButton ClickedButton)
        {
            // IF ITS A CONSUMABLE
            if (ClickedButton.Item.Type == ItemType.CONSUMABLE)
            {
                ((HealthPotion)ClickedButton.Item).Use(this);
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
            return false;
        }
    }
}
