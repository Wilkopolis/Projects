using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.Xna.Framework.Graphics;
using Microsoft.Xna.Framework;

namespace Rougelike
{

    public partial class Rougelike
    {
        SpriteFont SegeoUiMono;
        SpriteFont Calibri;
        SpriteFont Cousine12;
        SpriteFont Cousine16;
        SpriteFont Cousine22;
        SpriteFont Cousine72;
        SpriteFont CenturyGothic;
        Color softgray = new Color(87, 77, 77);
        Color whiteorange = new Color(255, 245, 210);
        Color brightwhite = new Color(255, 249, 247);
        Color lightblue = new Color(52, 159, 216);
        Color orange = new Color(196, 102, 39);
        Vector2I fieldOffset = new Vector2I(34, 34);

        void Draw(Texture2D texture, Vector2 position, Vector2 origin)
        {
            if (texture != null)
                SpriteBatch.Draw(texture, OffsetVector + position, null, Color.White, 0, origin, 1, SpriteEffects.None, 0);
        }
        
        void Draw(Texture2D texture, Vector2 position)
        {
            if (texture != null)
                SpriteBatch.Draw(texture, OffsetVector + position, Color.White);
        }

        void Draw(Tile tile, Vector2 position)
        {
            SpriteBatch.Draw(tile.Sprite, OffsetVector + position, Color.White);
        }

        void Draw(Entity entity)
        {
            SpriteBatch.Draw(entity.Sprite, OffsetVector + fieldOffset + entity.Position * 66, Color.White);
        }

        void Draw(EnemyButton button)
        {
            if (button.Visable)
            {
                SpriteBatch.Draw(button.Sprite, OffsetVector + button.Position, null, Color.White, 0, button.Origin, 1, SpriteEffects.None, 0);
                SpriteBatch.Draw(button.Enemy.Sprite, OffsetVector + button.Position - new Vector2(35, 6), null, Color.White, 0, button.Origin, .65f, SpriteEffects.None, 0);
                SpriteBatch.DrawString(Calibri, button.Enemy.Name, OffsetVector + button.Position + new Vector2(58, -22), Color.White);
            }
        }

        void Draw(InventoryButton button)
        {
            if (button.Item != null)
            {
                Draw(button.Item.Sprite, button.Position, button.Origin);
                if (button.Item is Stackable && ((Stackable)button.Item).StackSize > 1)
                {
                    SpriteBatch.DrawString(SegeoUiMono, ((Stackable)button.Item).StackSize.ToString(), OffsetVector + button.Position, Color.White);
                }
            }
        }

        void Draw(ItemButton button)
        {
            Draw(ShopButtonBack, button.Position, button.Origin);
            if (button.Item != null)
            {
                Draw(button.Item.Sprite, button.Position, button.Origin);
            }
        }

        void Draw(SkillButton button)
        {
            if (button.Visable)
                SpriteBatch.Draw(button.Sprite, OffsetVector + button.Position, null, Color.White, 0, button.Origin, 1, SpriteEffects.None, 0);
            else
                SpriteBatch.Draw(button.Sprite, OffsetVector + button.Position, null, Color.White * .5f, 0, button.Origin, 1, SpriteEffects.None, 0);
        }

        void Draw(TemplateButton button)
        {
            if (button.Visable)
            {
                Draw((Button)button);
                for (int j = 0; j < 15; j++)
                {
                    for (int k = 0; k < 10; k++)
                    {
                        if (button.Template.Tiles[j, k].Solid)
                            Draw(MiniSolid, button.Position + new Vector2(4 + MiniSolid.Width * j, 4 + MiniSolid.Height * k), button.Origin);
                        else
                        {
                            if (button.Template.Tiles[j, k].Door)
                                Draw(MiniDoor, button.Position + new Vector2(4 + MiniDoor.Width * j, 4 + MiniDoor.Height * k), button.Origin);
                            else
                                Draw(MiniEmpty, button.Position + new Vector2(4 + MiniEmpty.Width * j, 4 + MiniEmpty.Height * k), button.Origin);
                        }
                    }
                }
                if (button.Template.Difficulty != 0 && button.Template.Payout != null)
                    Draw(MiniPrize, button.Position + new Vector2(4 + MiniEmpty.Width * button.Template.Payout.X, 4 + MiniEmpty.Height * button.Template.Payout.Y), button.Origin);
                foreach (Entity entity in button.Template.Entities)
                {
                    if (entity is Item)
                    {
                        Draw(MiniItem, button.Position + new Vector2(4 + MiniItem.Width * entity.Position.X, 4 + MiniItem.Height * entity.Position.Y), button.Origin);
                    }
                    else if (entity is Enemy)
                    {
                        Draw(MiniEnemy, button.Position + new Vector2(4 + MiniEnemy.Width * entity.Position.X, 4 + MiniEnemy.Height * entity.Position.Y), button.Origin);
                    }
                }
                SpriteBatch.DrawString(Calibri, "Difficulty: " + button.Template.Difficulty.ToString(), OffsetVector + button.Position + new Vector2(-35, -22), Color.White);
                SpriteBatch.DrawString(Calibri, button.Template.Name, OffsetVector + button.Position + new Vector2(60, -22), Color.White);
            }
        }

        void Draw(Texture2D texture)
        {
            if (texture != null)
                SpriteBatch.Draw(texture, OffsetVector, Color.White);
        }

        void Draw(Button button)
        {
            if (button.Sprite != null && button.Visable)
                SpriteBatch.Draw(button.Sprite, button.Position + OffsetVector, null, Color.White, 0, button.Origin, 1, SpriteEffects.None, 0);
        }

        void Draw(EnchantmentButton button)
        {
            Draw((Button)button);
            SpriteBatch.DrawString(Cousine16, button.Enchantment.ToString(), OffsetVector + button.Position + new Vector2(-38, -10), Color.White);
            SpriteBatch.DrawString(Cousine12, button.Cost.ToString(), OffsetVector + button.Position + new Vector2(-75, -6), Color.White);
        }

        void Draw(Description descriptor)
        {
            int currrentheight = 0;
            //draw description box
            for (int j = 0; j < descriptor.Length; j++)
            {
                SpriteBatch.Draw(DesciptionBack, OffsetVector + descriptor.Position + new Vector2(0, 24 * j), null, Color.White, 0, Vector2.Zero, 1, SpriteEffects.None, 0);
            }

            //draw catagory
            if (descriptor.Source is Weapon)
            {
                SpriteBatch.DrawString(Calibri, "Weapon", OffsetVector + descriptor.Position + new Vector2(4, 4), softgray);
            }
            else if (descriptor.Source is Armor)
                SpriteBatch.DrawString(Calibri, "Armor", OffsetVector + descriptor.Position + new Vector2(4, 4), softgray);
            else if (descriptor.Source is Creature)
                SpriteBatch.DrawString(Calibri, "Creature", OffsetVector + descriptor.Position + new Vector2(4, 4), softgray);
            else if (descriptor.Source is Stackable)
                SpriteBatch.DrawString(Calibri, "Consumable", OffsetVector + descriptor.Position + new Vector2(4, 4), softgray);

            //draw exit button
            SpriteBatch.Draw(DesciptionExit, OffsetVector + descriptor.Position + new Vector2(210, 2), null, Color.White, 0, Vector2.Zero, 1, SpriteEffects.None, 0);

            currrentheight -= 24;
            //draw name
            for (int j = 0; j < descriptor.Name.Length; j++)
            {
                if (descriptor.Name[j] != "")
                    currrentheight += 24;
                SpriteBatch.DrawString(Cousine22, descriptor.Name[j], OffsetVector + descriptor.Position + new Vector2(4, 26 + currrentheight), whiteorange);
            }

            //draw backdrop
            SpriteBatch.Draw(DescriptionSourceBackdrop, OffsetVector + descriptor.Position + new Vector2(160, currrentheight + 60), null, Color.White, 0, Vector2.Zero, 1, SpriteEffects.None, 0);

            //draw portrait
            Draw(descriptor.Source.Sprite, descriptor.Position + new Vector2(160, currrentheight + 60));

            //draw class
            SpriteBatch.DrawString(Calibri, descriptor.Source.GetClass(), OffsetVector + descriptor.Position + new Vector2(4, currrentheight + 58), softgray);

            if (descriptor.Source is Weapon)
            {
                //draw weapon cost
                SpriteBatch.DrawString(Calibri, ((Weapon)descriptor.Source).Cost.ToString() + " AP", OffsetVector + descriptor.Position + new Vector2(4, currrentheight + 84), lightblue);
                //draw weapon dmg
                SpriteBatch.DrawString(CenturyGothic, ((Weapon)descriptor.Source).Damage.ToString() + " Dmg", OffsetVector + descriptor.Position + new Vector2(4, currrentheight + 92), brightwhite);
            }
            else if (descriptor.Source is HealthPotion)
            {
                //draw heal amount
                SpriteBatch.DrawString(CenturyGothic, ((HealthPotion)descriptor.Source).GetHP().ToString() + " HP", OffsetVector + descriptor.Position + new Vector2(4, currrentheight + 92), brightwhite);
            }
            else if (descriptor.Source is Enemy) 
            {
                SpriteBatch.DrawString(Calibri, "MaxHP: " + ((Enemy)descriptor.Source).MaxHP.ToString(), OffsetVector + descriptor.Position + new Vector2(4, currrentheight + 92), softgray);
                SpriteBatch.DrawString(Calibri, "Damage: " + ((Enemy)descriptor.Source).Damage.ToString(), OffsetVector + descriptor.Position + new Vector2(4, currrentheight + 112), softgray);                  
            }

            //draw mods
            for (int j = 0; j < descriptor.Mods.Length; j++)
            {
                currrentheight += 24;
                SpriteBatch.DrawString(Cousine16, descriptor.Mods[j], OffsetVector + descriptor.Position + new Vector2(10, 110 + currrentheight), orange);
            }
        }

        void DrawLetterbox()
        {
            if (Widescreen)
            {
                Draw(Letterbox);
                Draw(Letterbox, new Vector2(0, 720));
            }
        }

        void DrawEditorRoom()
        {
            for (int i = 0; i < 15; i++)
            {
                for (int j = 0; j < 10; j++)
                {
                    Draw(CurrentTemplate.Tiles[i, j], new Vector2(i , j) * 66 + new Vector2(34, 34));
                }
            }
            if (CurrentTemplate.Payout != null && CurrentTemplate.Difficulty != 0)
                Draw(Payout, OffsetVector + CurrentTemplate.Payout * 66 + new Vector2(34, 34));
            foreach (Entity entity in CurrentTemplate.Entities)
            {
                Draw(entity);
            }

            SpriteBatch.DrawString(SegeoUiMono, CurrentTemplate.Difficulty.ToString(), OffsetVector + new Vector2(1220, 466), Color.White);
        }

        void DrawGameRoom()
        {
            for (int i = 0; i < 15; i++)
            {
                for (int j = 0; j < 10; j++)
                {
                    Draw(Save.GetRoom().Tiles[i, j], new Vector2(34, 34) + new Vector2(i * 66, j * 66));
                }
            }
            foreach (Entity entity in Save.GetRoom().Entities)
            {
                Draw(entity);
                if (entity is Fighter)
                {
                    Fighter fighter = entity as Fighter;
                    if (fighter.HP != fighter.MaxHP)
                    {
                        Draw(CreatureHealthBarOutline, new Vector2I(34, 34) + fighter.Position * 66);
                        SpriteBatch.Draw(CreatureHealthBarFill, OffsetVector + new Vector2(34, 34) + fighter.Position * 66, new Rectangle(0, 0, (int)Math.Ceiling(CreatureHealthBarFill.Width * (fighter.HP / (double)fighter.MaxHP)), CreatureHealthBarFill.Height), Color.White, 0, Vector2.Zero, 1, SpriteEffects.None, 0);
                    }
                }
            }
        }

        void DrawCurrentEnemy()
        {
            Draw(EnemyBackground, new Vector2(1045, 500));
            if (CurrentEnemy != null)
            {
                Draw(CurrentEnemy.Sprite, new Vector2(1070, 545));
                SpriteBatch.DrawString(SegeoUiMono, "Name: " + CurrentEnemy.Name, OffsetVector + new Vector2(1060, 510), Color.White);
                SpriteBatch.DrawString(SegeoUiMono, "Max HP: " + CurrentEnemy.HP.ToString(), OffsetVector + new Vector2(1150, 543), Color.White);
                SpriteBatch.DrawString(SegeoUiMono, "Damage: " + CurrentEnemy.Damage.ToString(), OffsetVector + new Vector2(1150, 583), Color.White);
            }
        }

        void DrawUI()
        {
            SpriteBatch.DrawString(SegeoUiMono, "HP: ", OffsetVector + new Vector2(8, 1), Color.White);
            SpriteBatch.DrawString(SegeoUiMono, Save.Kevin.HP.ToString() + "/" + Save.Kevin.MaxHP.ToString(), new Vector2(42, 1), brightwhite);
            SpriteBatch.Draw(HealthBarUI, OffsetVector + new Vector2(102, 7), new Rectangle(0, 0, (int)Math.Ceiling(HealthBarUI.Width * (Save.Kevin.HP / (double)Save.Kevin.MaxHP)),
                        HealthBarUI.Height), Color.White, 0, Vector2.Zero, 1, SpriteEffects.None, 0);
            SpriteBatch.Draw(UIOutline, OffsetVector + new Vector2(102, 7), null, Color.White, 0, Vector2.Zero, 1, SpriteEffects.None, 0);
            // SpriteBatch.DrawString(SegeoUiMono, "AP: ", OffsetVector + new Vector2(250, 1), Color.White);
            // SpriteBatch.DrawString(SegeoUiMono, Save.Kevin.AP.ToString() + "/" + Save.Kevin.MaxAP.ToString(), new Vector2(284, 1), brightwhite);
            // SpriteBatch.Draw(APBarUI, OffsetVector + new Vector2(346, 7), new Rectangle(0, 0, (int)Math.Ceiling(APBarUI.Width * (Save.Kevin.AP / (double)Save.Kevin.MaxAP)),
            //             APBarUI.Height), Color.White, 0, Vector2.Zero, 1, SpriteEffects.None, 0);
            // SpriteBatch.Draw(UIOutline, OffsetVector + new Vector2(346, 7), null, Color.White, 0, Vector2.Zero, 1, SpriteEffects.None, 0);
            SpriteBatch.DrawString(SegeoUiMono, "Wealth:" + Save.Kevin.Wealth.ToString() + "(+" + Save.Kevin.WealthPerTurn.ToString() + ")", OffsetVector + new Vector2(495, 1), brightwhite);
            SpriteBatch.DrawString(SegeoUiMono, "Power:" + Save.Kevin.Power.ToString() + "(+" + Save.Kevin.PowerPerTurn.ToString() + ")", OffsetVector + new Vector2(670, 1), brightwhite);
            if (Save.Kevin.Class == Class.MASTERMIND)
                SpriteBatch.DrawString(SegeoUiMono, "XP:" + Save.Kevin.Experience.ToString() + "(+" + Save.Kevin.ExperiencePerTurn.ToString() + ")", OffsetVector + new Vector2(850, 1), whiteorange);
            else
                SpriteBatch.DrawString(SegeoUiMono, "XP:" + Save.Kevin.Experience.ToString(), OffsetVector + new Vector2(850, 1), whiteorange);
        }

        void DrawMiniMap()
        {
            // Get center offset Vector
            int imin = (int)Save.GetFloor().Position.X;
            int imax = (int)Save.GetFloor().Position.X;
            int jmin = (int)Save.GetFloor().Position.Y;
            int jmax = (int)Save.GetFloor().Position.Y;
            for (int i = 0; i < Save.GetFloor().Max.X; i++)
            {
                for (int j = 0; j < Save.GetFloor().Max.Y; j++)
                {
                    if (Save.GetFloor().Rooms[i, j].Exists)
                    {
                        if (i < imin)
                            imin = i;
                        if (i > imax)
                            imax = i;
                        if (j < jmin)
                            jmin = j;
                        if (j > jmax)
                            jmax = j;
                    }
                }
            }

            Vector2 offset = new Vector2((imax - imin) * 23, (jmax - jmin) * 23);
            Vector2 diff = new Vector2(1150, 588) - offset / 2;

            SpriteBatch.DrawString(SegeoUiMono, "Depth: " + Save.Depth.ToString(), OffsetVector + new Vector2(1056, 470), brightwhite);
            for (int i = imin; i < Save.GetFloor().Max.X; i++)
            {
                for (int j = jmin; j < Save.GetFloor().Max.Y; j++)
                {
                    Room room = Save.GetFloor().Rooms[i, j];
                    if (room.Exists)
                    {
                        if (room == Save.GetRoom())
                            SpriteBatch.Draw(CurrentMiniRoom, OffsetVector + diff + new Vector2((i - imin) * 23, (j - jmin) * 23), null, Color.White, 0, Vector2.Zero, 1, SpriteEffects.None, 0);
                        else
                        {
                            if (room.Known)
                                Draw(VisitedMiniRoom, diff + new Vector2((i - imin) * 23, (j - jmin) * 23));
                            else
                                Draw(UnVisitedMiniRoom, diff + new Vector2((i - imin) * 23, (j - jmin) * 23));
                            if (room.HasEnemy() && room.Visited)
                            {
                                Draw(MiniEnemy, diff + new Vector2((i - imin) * 23 + 2, (j - jmin) * 23 + 6));
                            }
                            if (room.HasHealth() && room.Visited)
                            {
                                Draw(MiniDoor, diff + new Vector2((i - imin) * 23 + 2, (j - jmin) * 23 + 10));
                            }
                            if (room.HasItem() && room.Visited)
                            {
                                Draw(MiniPrize, diff + new Vector2((i - imin) * 23 + 2, (j - jmin) * 23 + 14));
                            }
                            if (room.HasStairs && room.Visited)
                            {
                                Draw(MiniSolid, diff + new Vector2((i - imin) * 23 + 6, (j - jmin) * 23 + 6));
                            }
                        }
                        if (room.HasSouthDoor())
                        {
                            SpriteBatch.Draw(MiniDoorHorizontal, OffsetVector + diff + new Vector2((i - imin) * 23 + 4, (j - jmin) * 23 + 19), null, Color.White, 0, Vector2.Zero, 1, SpriteEffects.None, 0);
                        }
                        if (room.HasWestDoor())
                        {
                            SpriteBatch.Draw(MiniDoorVertrical, OffsetVector + diff + new Vector2((i - imin) * 23 - 4, (j - jmin) * 23 + 4), null, Color.White, 0, Vector2.Zero, 1, SpriteEffects.None, 0);
                        }
                    }
                }
            }
        }

        void DrawDescriptions()
        {
            foreach (Description descriptor in DescriptionList)
            {
                Draw(descriptor);
            }
            if (HoverDescription != null)
                Draw(HoverDescription);
        }

        void DrawSaved()
        {
            Draw(SavedBackground, new Vector2(372, 185));
            SpriteBatch.DrawString(Cousine72, "Saved", OffsetVector + new Vector2(400, 200), Color.White);
        }
    }
}
