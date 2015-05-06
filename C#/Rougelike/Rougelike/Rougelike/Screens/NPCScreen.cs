using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Graphics;

namespace Rougelike
{
    partial class Rougelike
    {
        bool Trading;
        List<ShopButton> ShopInventory;
        Texture2D ShopButtonBack;
        Button Scrapper;

        bool Enchanting;
        List<EnchantmentButton> EnchanterButtons;
        Texture2D EnchantmentButtonBack;

        bool Alcheming;
        Button ScrambleButton;

        ItemButton ItemHolder;

        void InitializeNPCButtons()
        {
            ShopButtonBack = Content.Load<Texture2D>("textures/game/npc/itemback");
            EnchantmentButtonBack = Content.Load<Texture2D>("textures/game/npc/enchanter/enchantmentbutton");
            ItemHolder = new ItemButton(new Vector2(500, 350));
            Scrapper = new Button(Content.Load<Texture2D>("textures/game/npc/merchant/scrapper"), new Vector2(500, 500), "scrap");
            ScrambleButton = new Button(Content.Load<Texture2D>("textures/game/npc/alchemist/scramble"), new Vector2(524, 500), "scramble");
        }

        void CheckNPCButtons()
        {
            if (Trading)
            {
                foreach (ShopButton button in ShopInventory)
                {
                    // Mouse
                    if (MouseOver(button, new Vector2(32, 32)))
                    {
                        if (RightClick())
                        {
                            button.WasRightClicked = true;
                        }
                        else if (RightReleased())
                        {
                            if (button.WasRightClicked)
                            {
                                if (button.Item != null)
                                {
                                    Description newdescription = new Description(button);
                                    if (DescriptionList.Contains(newdescription))
                                        DescriptionList.Remove(newdescription);
                                    else
                                        DescriptionList.Add(new Description(button));
                                }
                            }
                            button.WasRightClicked = false;
                        }
                    }
                }
            }
            else if (Alcheming)
            {
                if (MouseOver(ScrambleButton))
                {
                    if (Click())
                        ScrambleButton.WasClicked = true;
                    else if (Released())
                    {
                        if (ScrambleButton.WasClicked)
                        {
                            if (Save.Kevin.Wealth >= 10)
                            {
                                Save.Kevin.Wealth -= 10;
                                Scramble(ItemHolder);
                            }
                        }
                        ScrambleButton.WasClicked = false;
                    }
                }
            }
            else if (Enchanting)
            {
                foreach (EnchantmentButton button in EnchanterButtons)
                {
                    if (MouseOver(button))
                    {
                        if (Click())
                            button.WasClicked = true;
                        else if (Released())
                        {
                            if (button.WasClicked && ItemHolder.Item != null)
                            {
                                if (Save.Kevin.Wealth >= button.Cost)
                                {
                                    Save.Kevin.Wealth -= button.Cost;
                                    button.WasPressed = true;
                                    Enchant(button);
                                }
                            }
                            button.WasClicked = false;
                        }
                    }
                }
                EnchanterButtons.RemoveAll(button => button.WasPressed);
            }
        }

        NPC GetAdjacentNPC()
        {
            foreach (Entity entity in Save.GetRoom().Entities)
            {
                if (entity is NPC)
                {
                    if (Save.Kevin.Position.X > 0)
                    {
                        if (entity.Position == Save.Kevin.Position - new Vector2I(1, 0))
                            return (NPC)entity;
                    }
                    if (Save.Kevin.Position.X < 14)
                    {
                        if (entity.Position == Save.Kevin.Position + new Vector2I(1, 0))
                            return (NPC)entity;
                    }
                    if (Save.Kevin.Position.Y > 0)
                    {
                        if (entity.Position == Save.Kevin.Position - new Vector2I(0, 1))
                            return (NPC)entity;
                    }
                    if (Save.Kevin.Position.Y < 9)
                    {
                        if (entity.Position == Save.Kevin.Position + new Vector2I(0, 1))
                            return (NPC)entity;
                    }
                }
            }
            return null;
        }

        void Gamble()
        {
            int rand = Random.Next(0, 100);
            if (rand < 80)
            {
                // You lose
            }
            else if (rand < 85)
            {
                Save.Kevin.PickUp(GenerateItem());
            }
            else if (rand < 99)
            {
                Save.Kevin.PickUp(GeneratePrize());
            }
            else if (rand < 100)
            {
                Save.Kevin.Wealth += 100;
            }
        }

        void Enchant(EnchantmentButton button)
        {
            ItemHolder.Item.EnterMod(button.Enchantment);
        }

        void Scramble(ItemButton itembutton)
        {
            itembutton.Item = GenerateItem();
        }

        void DrawNPCScreen()
        {
            Draw(CommonBackground, new Vector2(41, 41));
            if (Trading)
                DrawTradeWindow();
            else if (Enchanting)
                DrawEnchanterWindow();
            else if (Alcheming)
                DrawAlchemyWindow();
        }

        void DrawTradeWindow()
        {
            SpriteBatch.DrawString(Cousine22, "Trading", OffsetVector + new Vector2(50, 48), Color.White);
            SpriteBatch.DrawString(CenturyGothic, "For Sale", OffsetVector + new Vector2(300, 200), Color.White);
            foreach (ShopButton button in ShopInventory)
            {
                Draw(button);
                if (button.Stock > 1)
                    SpriteBatch.DrawString(SegeoUiMono, button.Stock.ToString(), OffsetVector + button.Position + new Vector2(25, -30), Color.White);
                SpriteBatch.DrawString(Cousine12, button.Cost.ToString(), OffsetVector + button.Position + new Vector2(0, 50), Color.White);
            }
            Draw(Scrapper);
            SpriteBatch.DrawString(CenturyGothic, "Recycle", OffsetVector + new Vector2(300, 400), Color.White);
        }

        void DrawEnchanterWindow()
        {
            Draw(ItemHolder);
            foreach (EnchantmentButton button in EnchanterButtons)
            {
                Draw(button);
            }
        }

        void DrawAlchemyWindow()
        {
            Draw(ItemHolder);
            Draw(ScrambleButton);
        }
    }
}
