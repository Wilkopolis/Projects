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
        NPC Trader;

        Texture2D ShopButtonBack;

        Button Scrapper;

        void InitializeShopButtons()
        {
            ShopButtonBack = Content.Load<Texture2D>("textures/game/npc/itemback");

            Scrapper = new Button(Content.Load<Texture2D>("textures/game/npc/scrapper"), new Vector2(500, 500), "scrap");
        }

        void CheckTraderButtons()
        {
            foreach (ShopButton button in Trader.Inventory)
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

        NPC GetAdjacentNPC()
        {
            foreach (Entity entity in Save.GetRoom().Entities)
            {
                if (entity is NPC)
                {
                    if (Save.Kevin.Position.X > 0)
                    {
                        if (entity.Position == Save.Kevin.Position - new Vector2(1, 0))
                            return (NPC)entity;
                    }
                    if (Save.Kevin.Position.X < 14)
                    {
                        if (entity.Position == Save.Kevin.Position + new Vector2(1, 0))
                            return (NPC)entity;
                    }
                    if (Save.Kevin.Position.Y > 0)
                    {
                        if (entity.Position == Save.Kevin.Position - new Vector2(0, 1))
                            return (NPC)entity;
                    }
                    if (Save.Kevin.Position.Y < 9)
                    {
                        if (entity.Position == Save.Kevin.Position + new Vector2(0, 1))
                            return (NPC)entity;
                    }
                }
            }
            return null;
        }

        void DrawTradeWindow()
        {
            Draw(CommonBackground, new Vector2(41, 41));
            SpriteBatch.DrawString(Cousine22, "Trading", OffsetVector + new Vector2(50, 48), Color.White);
            SpriteBatch.DrawString(CenturyGothic, "For Sale", OffsetVector + new Vector2(300, 200), Color.White);
            foreach (ShopButton button in Trader.Inventory)
            {
                Draw(ShopButtonBack, button.Position, button.Origin);
                if (button.Item != null)
                {
                    Draw(button);
                    SpriteBatch.DrawString(SegeoUiMono, button.Stock.ToString(), OffsetVector + button.Position + new Vector2(25, -30), Color.White);
                    SpriteBatch.DrawString(Cousine12, button.Cost.ToString(), OffsetVector + button.Position + new Vector2(0, 50), Color.White);
                }
            }
            Draw(Scrapper);
            SpriteBatch.DrawString(CenturyGothic, "Recycle", OffsetVector + new Vector2(300, 400), Color.White);
        }
    }
}
