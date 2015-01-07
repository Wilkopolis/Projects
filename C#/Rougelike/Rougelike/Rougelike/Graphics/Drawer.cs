﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.Xna.Framework.Graphics;
using Microsoft.Xna.Framework;

namespace Rougelike
{
    public enum Texture
    {
        EMPTY = 0, ROCK = 1, ENEMY1 = 2, PLAYER = 3, DOOR = 4, MOVEMENT = 5, HEALTHVIAL = 6, HEALTHBARFILL = 8, HEALTHBAROUTLINE = 9, STAIRS = 14, ENEMY2 = 26,
        ENEMY3 = 29, ENEMY4 = 31, ENEMYBACKDROP = 34, CURRENTROOM = 35, MEGADOOR = 36, MEGADOORH = 37, MEGAROOM = 38, GOLDENEMPTY = 42, MERCHANT = 43, ENCHANTER = 43, ALCHEMIST = 44
    };

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

        void Draw(Texture2D texture, Vector2 position, Vector2 origin)
        {
            if (texture != null)
                SpriteBatch.Draw(texture, OffsetVector + position, null, Color.White, 0, origin, 1, SpriteEffects.None, 0);
        }

        void Draw(int assetindex, Vector2 position, Vector2 origin)
        {
            SpriteBatch.Draw(Assets[assetindex], OffsetVector + position, null, Color.White, 0, origin, 1, SpriteEffects.None, 0);
        }

        void Draw(Texture2D texture, Vector2 position)
        {
            if (texture != null)
                SpriteBatch.Draw(texture, OffsetVector + position, Color.White);
        }

        void Draw(EnemyButton button)
        {
            if (button.Visable)
            {
                SpriteBatch.Draw(button.Sprite, OffsetVector + button.Position, null, Color.White, 0, button.Origin, 1, SpriteEffects.None, 0);
                SpriteBatch.Draw(Assets[button.Enemy.AssetIndex], OffsetVector + button.Position - new Vector2(35, 6), null, Color.White, 0, button.Origin, .65f, SpriteEffects.None, 0);
                SpriteBatch.DrawString(Calibri, button.Enemy.Name, OffsetVector + button.Position + new Vector2(58, -22), Color.White);
            }
        }

        void Draw(InventoryButton button)
        {
            if (button.Item != null)
            {
                Draw(button.Item.Sprite, button.Position, button.Origin);
                if (button.Item is Potion)
                {
                    SpriteBatch.DrawString(SegeoUiMono, ((Potion)button.Item).StackSize.ToString(), OffsetVector + button.Position, Color.White);
                }
            }
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
                        if (button.Template.Tiles[j, k].AssetIndex == 1)
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
                foreach (Entity e in button.Template.Entities)
                {
                    if (e.GetClass() == "Item")
                    {
                        Draw(MiniItem, button.Position + new Vector2(4 + MiniItem.Width * e.Position.X, 4 + MiniItem.Height * e.Position.Y), button.Origin);
                    }
                    else if (e.GetClass() == "Enemy")
                    {
                        Draw(MiniEnemy, button.Position + new Vector2(4 + MiniEnemy.Width * e.Position.X, 4 + MiniEnemy.Height * e.Position.Y), button.Origin);
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
            if (button.Sprite != null)
                SpriteBatch.Draw(button.Sprite, button.Position + OffsetVector, null, Color.White, 0, button.Origin, 1, SpriteEffects.None, 0);
        }

        void Draw(Movement button)
        {
                SpriteBatch.Draw(Assets[button.AssetIndex], button.Position + OffsetVector, null, Color.White, 0, button.Origin, 1, SpriteEffects.None, 0);
        }

        void Draw(int assetindex, Vector2 position)
        {
            SpriteBatch.Draw(Assets[assetindex], OffsetVector + position, Color.White);
        }

        void Draw(Texture assetindex, Vector2 position)
        {
            SpriteBatch.Draw(Assets[(int)assetindex], OffsetVector + position, Color.White);
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
                    Draw(CurrentTemplate.Tiles[i, j].AssetIndex, new Vector2(34, 34) + new Vector2(i * 66, j * 66));
                    if (CurrentTemplate.Tiles[i, j].Door)
                    {
                        Draw(Texture.DOOR, new Vector2(34, 34) + new Vector2(i * 66, j * 66));
                    }
                    else if (CurrentTemplate.Tiles[i, j].Steps != Stairs.NONE)
                    {
                        Draw(Texture.STAIRS, new Vector2(34, 34) + new Vector2(i * 66, j * 66));
                    }
                }
            }
            foreach (Entity entity in CurrentTemplate.Entities)
            {
                if (entity is Creature)
                {
                    Creature creature = (Creature)entity;
                    Draw(creature.AssetIndex, new Vector2(34, 34) + entity.Position * 66);
                }
                else
                {
                    Draw(((Item)entity).Sprite, new Vector2(34, 34) + entity.Position * 66);
                }
            }

            SpriteBatch.DrawString(SegeoUiMono, CurrentTemplate.Difficulty.ToString(), OffsetVector + new Vector2(1220, 466), Color.White);
        }

        void DrawGameRoom()
        {
            for (int i = 0; i < 15; i++)
            {
                for (int j = 0; j < 10; j++)
                {
                    Draw(Save.GetRoom().Tiles[i, j].AssetIndex, new Vector2(34, 34) + new Vector2(i * 66, j * 66));
                    if (Save.GetRoom().Tiles[i, j].Door)
                    {
                        Draw(Texture.DOOR, new Vector2(34, 34) + new Vector2(i * 66, j * 66));
                    }
                    else if (Save.GetRoom().Tiles[i, j].Steps != Stairs.NONE)
                    {
                        Draw(Texture.STAIRS, new Vector2(34, 34) + new Vector2(i * 66, j * 66));
                    }
                }
            }
            foreach (Entity entity in Save.GetRoom().Entities)
            {
                if (entity is Creature)
                {
                    Creature creature = (Creature)entity;
                    Draw(creature.AssetIndex, new Vector2(34, 34) + entity.Position * 66);
                    if (creature.HP != creature.MaxHP)
                    {
                        Draw(Texture.HEALTHBAROUTLINE, new Vector2(34, 34) + entity.Position * 66);
                        SpriteBatch.Draw(Assets[(int)Texture.HEALTHBARFILL], OffsetVector + new Vector2(34, 34) + entity.Position * 66, new Rectangle(0, 0, (int)Math.Ceiling(Assets[8].Width * (creature.HP / (double)creature.MaxHP)),
                        Assets[(int)Texture.HEALTHBARFILL].Height), Color.White, 0, Vector2.Zero, 1, SpriteEffects.None, 0);
                    }
                }
                else
                {
                    Draw(((Item)entity).Sprite, new Vector2(34, 34) + entity.Position * 66);
                }
            }
        }

        void DrawCurrentEnemy()
        {
            Draw(Texture.ENEMYBACKDROP, new Vector2(1045, 500));
            if (CurrentEnemy != null)
            {
                Draw(CurrentEnemy.AssetIndex, new Vector2(1070, 545));
                SpriteBatch.DrawString(SegeoUiMono, "Name: " + CurrentEnemy.Name, OffsetVector + new Vector2(1060, 510), Color.White);
                SpriteBatch.DrawString(SegeoUiMono, "Max HP: " + CurrentEnemy.HP.ToString(), OffsetVector + new Vector2(1150, 543), Color.White);
                SpriteBatch.DrawString(SegeoUiMono, "Max AP: " + CurrentEnemy.AP.ToString(), OffsetVector + new Vector2(1150, 563), Color.White);
                SpriteBatch.DrawString(SegeoUiMono, "Damage: " + CurrentEnemy.Damage.ToString(), OffsetVector + new Vector2(1150, 583), Color.White);
            }
        }

        void DrawUI()
        {
            SpriteBatch.DrawString(SegeoUiMono, "HP: ", OffsetVector + new Vector2(23, 1), Color.White);
            SpriteBatch.DrawString(SegeoUiMono, Save.Kevin.HP.ToString() + "/" + Save.Kevin.MaxHP.ToString(), new Vector2(64, 1), Color.White);
            SpriteBatch.Draw(Assets[15], OffsetVector + new Vector2(146, 7), new Rectangle(0, 0, (int)Math.Ceiling(Assets[15].Width * (Save.Kevin.HP / (double)Save.Kevin.MaxHP)),
                        Assets[15].Height), Color.White, 0, Vector2.Zero, 1, SpriteEffects.None, 0);
            SpriteBatch.Draw(Assets[16], OffsetVector + new Vector2(146, 7), null, Color.White, 0, Vector2.Zero, 1, SpriteEffects.None, 0);
            SpriteBatch.DrawString(SegeoUiMono, "AP: ", OffsetVector + new Vector2(300, 1), Color.White);
            SpriteBatch.DrawString(SegeoUiMono, Save.Kevin.AP.ToString() + "/" + Save.Kevin.MaxAP.ToString(), new Vector2(334, 1), Color.White);
            SpriteBatch.Draw(Assets[17], OffsetVector + new Vector2(417, 7), new Rectangle(0, 0, (int)Math.Ceiling(Assets[17].Width * (Save.Kevin.AP / (double)Save.Kevin.MaxAP)),
                        Assets[17].Height), Color.White, 0, Vector2.Zero, 1, SpriteEffects.None, 0);
            SpriteBatch.Draw(Assets[16], OffsetVector + new Vector2(417, 7), null, Color.White, 0, Vector2.Zero, 1, SpriteEffects.None, 0);
            int wpt = Save.Kevin.MyWealthPerTurn();
            int ppt = Save.Kevin.MyPowerPerTurn();
            for (int i = 0; i < Save.GetFloor().Max.X; i++)
            {
                for (int j = 0; j < Save.GetFloor().Max.Y; j++)
                {
                    if (Save.GetFloor().Rooms[i, j].Worked || Save.GetFloor().Rooms[i, j].PermaWorked)
                    {
                        wpt += Save.GetFloor().Rooms[i, j].Wealth;
                        ppt += Save.GetFloor().Rooms[i, j].Power;
                    }
                }
            }
            SpriteBatch.DrawString(SegeoUiMono, "Wealth: " + Save.Kevin.Wealth.ToString() + "(+" + wpt.ToString() + ")", OffsetVector + new Vector2(600, 1), Color.White);
            SpriteBatch.DrawString(SegeoUiMono, "Power: " + Save.Kevin.Power.ToString() + "(+" + ppt.ToString() + ")", OffsetVector + new Vector2(770, 1), Color.White);
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

            SpriteBatch.DrawString(SegeoUiMono, "Depth: " + Save.Depth.ToString(), OffsetVector + new Vector2(1056, 470), Color.White);
            for (int i = imin; i < Save.GetFloor().Max.X; i++)
            {
                for (int j = jmin; j < Save.GetFloor().Max.Y; j++)
                {
                    Room room = Save.GetFloor().Rooms[i, j];
                    if (room.Exists)
                    {
                        if (room == Save.GetRoom())
                            SpriteBatch.Draw(Assets[21], OffsetVector + diff + new Vector2((i - imin) * 23, (j - jmin) * 23), null, Color.White, 0, Vector2.Zero, 1, SpriteEffects.None, 0);
                        else
                        {
                            if (room.Visible)
                                SpriteBatch.Draw(Assets[18], OffsetVector + diff + new Vector2((i - imin) * 23, (j - jmin) * 23), null, Color.White, 0, Vector2.Zero, 1, SpriteEffects.None, 0);
                            else
                                SpriteBatch.Draw(Assets[41], OffsetVector + diff + new Vector2((i - imin) * 23, (j - jmin) * 23), null, Color.White, 0, Vector2.Zero, 1, SpriteEffects.None, 0);
                            if (room.HasEnemy() && room.Visible)
                            {
                                SpriteBatch.Draw(Assets[22], OffsetVector + diff + new Vector2((i - imin) * 23 + 2, (j - jmin) * 23 + 6), null, Color.White, 0, Vector2.Zero, 1, SpriteEffects.None, 0);
                            }
                            if (room.HasHealth() && room.Visible)
                            {
                                SpriteBatch.Draw(Assets[23], OffsetVector + diff + new Vector2((i - imin) * 23 + 2, (j - jmin) * 23 + 10), null, Color.White, 0, Vector2.Zero, 1, SpriteEffects.None, 0);
                            }
                            if (room.HasItem() && room.Visible)
                            {
                                SpriteBatch.Draw(Assets[24], OffsetVector + diff + new Vector2((i - imin) * 23 + 2, (j - jmin) * 23 + 14), null, Color.White, 0, Vector2.Zero, 1, SpriteEffects.None, 0);
                            }
                            if (room.HasStairs && room.Visible)
                            {
                                SpriteBatch.Draw(Assets[30], OffsetVector + diff + new Vector2((i - imin) * 23 + 6, (j - jmin) * 23 + 6), null, Color.White, 0, Vector2.Zero, 1, SpriteEffects.None, 0);
                            }
                        }
                        if (room.HasSouthDoor())
                        {
                            SpriteBatch.Draw(Assets[20], OffsetVector + diff + new Vector2((i - imin) * 23 + 4, (j - jmin) * 23 + 19), null, Color.White, 0, Vector2.Zero, 1, SpriteEffects.None, 0);
                        }
                        if (room.HasWestDoor())
                        {
                            SpriteBatch.Draw(Assets[19], OffsetVector + diff + new Vector2((i - imin) * 23 - 4, (j - jmin) * 23 + 4), null, Color.White, 0, Vector2.Zero, 1, SpriteEffects.None, 0);
                        }
                    }
                }
            }
        }

        void DrawDescriptions()
        {
            if (DescriptionList.Count > 0)
            {
                for (int i = DescriptionList.Count() - 1; i >= 0; i--)
                {
                    Description D = DescriptionList.ElementAt(i);

                    int currrentheight = 0;
                    //draw description box
                    for (int j = 0; j < D.Length; j++)
                    {
                        SpriteBatch.Draw(Assets[25], OffsetVector + D.Position + new Vector2(0, 24 * j), null, Color.White, 0, Vector2.Zero, 1, SpriteEffects.None, 0);
                    }

                    //draw catagory
                    if (D.Source is Weapon)
                    {
                        SpriteBatch.DrawString(Calibri, "Weapon", OffsetVector + D.Position + new Vector2(4, 4), softgray);
                    }
                    else if (D.Source is Armor)
                        SpriteBatch.DrawString(Calibri, "Armor", OffsetVector + D.Position + new Vector2(4, 4), softgray);
                    else if (D.Source is Creature)
                        SpriteBatch.DrawString(Calibri, "Creature", OffsetVector + D.Position + new Vector2(4, 4), softgray);
                    else if (D.Source is Potion)
                        SpriteBatch.DrawString(Calibri, "Consumable", OffsetVector + D.Position + new Vector2(4, 4), softgray);

                    //draw exit button
                    SpriteBatch.Draw(Assets[28], OffsetVector + D.Position + new Vector2(210, 2), null, Color.White, 0, Vector2.Zero, 1, SpriteEffects.None, 0);

                    currrentheight -= 24;
                    //draw name
                    for (int j = 0; j < D.Name.Length; j++)
                    {
                        if (D.Name[j] != "")
                            currrentheight += 24;
                        SpriteBatch.DrawString(Cousine22, D.Name[j], OffsetVector + D.Position + new Vector2(4, 26 + currrentheight), whiteorange);
                    }

                    //draw backdrop
                    SpriteBatch.Draw(Assets[27], OffsetVector + D.Position + new Vector2(160, currrentheight + 60), null, Color.White, 0, Vector2.Zero, 1, SpriteEffects.None, 0);

                    //draw portrait
                    if (D.Source is Creature)
                    {
                        SpriteBatch.Draw(Assets[((Creature)D.Source).AssetIndex], OffsetVector + D.Position + new Vector2(160, currrentheight + 60), null, Color.White, 0, Vector2.Zero, 1, SpriteEffects.None, 0);
                    }
                    else
                    {
                        SpriteBatch.Draw(((Item)D.Source).Sprite, OffsetVector + D.Position + new Vector2(160, currrentheight + 60), null, Color.White, 0, Vector2.Zero, 1, SpriteEffects.None, 0);
                    }

                    //draw class
                    SpriteBatch.DrawString(Calibri, D.Source.GetClass(), OffsetVector + D.Position + new Vector2(4, currrentheight + 58), softgray);

                    if (D.Source is Weapon)
                    {
                        //draw weapon cost
                        SpriteBatch.DrawString(Calibri, ((Weapon)D.Source).Cost.ToString() + " AP", OffsetVector + D.Position + new Vector2(4, currrentheight + 84), lightblue);
                        //draw weapon dmg
                        SpriteBatch.DrawString(CenturyGothic, ((Weapon)D.Source).Damage.ToString() + " Dmg", OffsetVector + D.Position + new Vector2(4, currrentheight + 92), brightwhite);
                    }
                    else if (D.Source is HealthPotion)
                    {
                        //draw heal amount
                        SpriteBatch.DrawString(CenturyGothic, ((HealthPotion)D.Source).GetHP().ToString() + " HP", OffsetVector + D.Position + new Vector2(4, currrentheight + 92), brightwhite);
                    }
                    //draw mods
                    for (int j = 0; j < D.Mods.Length; j++)
                    {
                        currrentheight += 24;
                        SpriteBatch.DrawString(Cousine16, D.Mods[j], OffsetVector + D.Position + new Vector2(10, 110 + currrentheight), orange);
                    }
                }
            }
        }

        void DrawSaved()
        {
            Draw(SavedBackground, new Vector2(372, 185));
            SpriteBatch.DrawString(Cousine72, "Saved", OffsetVector + new Vector2(400, 200), Color.White);
        }

        void Draw4X()
        {
            Draw(MegaMapBackground, new Vector2(41, 41));

            DrawMegaMap();

            foreach (Button button in MegaMapButtons)
            {
                Draw(button);
                SpriteBatch.DrawString(Cousine12, button.Action, button.Position + OffsetVector - new Vector2(43, 8), Color.White);
            }
            SpriteBatch.DrawString(Cousine16, Save.Kevin.Name, OffsetVector + new Vector2(50, 45), Color.White);
            SpriteBatch.DrawString(Cousine16, "The " + Save.Kevin.Class.ToString(), OffsetVector + new Vector2(50, 70), Color.White);
        }

        void DrawMegaMap()
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

            Vector2 offset = new Vector2((imax - imin) * 58, (jmax - jmin) * 58);
            Vector2 diff = new Vector2(524, 364) - offset / 2;

            for (int i = 0; i < Save.GetFloor().Max.X; i++)
            {
                for (int j = 0; j < Save.GetFloor().Max.Y; j++)
                {
                    if (Save.GetFloor().Rooms[i, j].Exists)
                    {
                        if (Save.GetFloor().Rooms[i, j].Worked || Save.GetFloor().Rooms[i, j].PermaWorked)
                            SpriteBatch.Draw(Assets[(int)Texture.CURRENTROOM], OffsetVector + diff + new Vector2((i - imin) * 58, (j - jmin) * 58), null, Color.White, 0, Vector2.Zero, 1, SpriteEffects.None, 0);
                        else
                        {
                            SpriteBatch.Draw(Assets[(int)Texture.MEGAROOM], OffsetVector + diff + new Vector2((i - imin) * 58, (j - jmin) * 58), null, Color.White, 0, Vector2.Zero, 1, SpriteEffects.None, 0);
                        }
                        if (Save.GetFloor().Rooms[i, j].HasSouthDoor())
                        {
                            SpriteBatch.Draw(Assets[(int)Texture.MEGADOOR], OffsetVector + diff + new Vector2((i - imin) * 58 + 13, (j - jmin) * 58 + 50), null, Color.White, 0, Vector2.Zero, 1, SpriteEffects.None, 0);
                        }
                        if (Save.GetFloor().Rooms[i, j].HasWestDoor())
                        {
                            SpriteBatch.Draw(Assets[(int)Texture.MEGADOORH], OffsetVector + diff + new Vector2((i - imin) * 58 - 8, (j - jmin) * 58 + 13), null, Color.White, 0, Vector2.Zero, 1, SpriteEffects.None, 0);
                        }
                        if (Save.GetFloor().Rooms[i, j].Visible)
                        {
                            SpriteBatch.DrawString(Cousine12, "P:" + Save.GetFloor().Rooms[i, j].Power.ToString(), OffsetVector + diff + new Vector2((i - imin) * 58 + 11, (j - jmin) * 58 + 8), Color.Black);
                            SpriteBatch.DrawString(Cousine12, "W:" + Save.GetFloor().Rooms[i, j].Wealth.ToString(), OffsetVector + diff + new Vector2((i - imin) * 58 + 11, (j - jmin) * 58 + 26), Color.Black);
                        }
                    }
                }
                SpriteBatch.Draw(Assets[40], OffsetVector + diff + new Vector2((Save.GetFloor().Position.X - imin) * 58 - 2, (Save.GetFloor().Position.Y - jmin) * 58 - 2), null, Color.White, 0, Vector2.Zero, 1, SpriteEffects.None, 0);
            }
        }
    }
}
