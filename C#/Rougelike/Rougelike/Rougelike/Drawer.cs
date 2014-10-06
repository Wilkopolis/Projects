using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.Xna.Framework.Graphics;
using Microsoft.Xna.Framework;
using Rougelike.Types;

namespace Rougelike
{
    public partial class Rougelike
    {
        private void DrawTiles()
        {
            for (int i = 0; i < 15; i++)
            {
                for (int j = 0; j < 10; j++)
                {
                    SpriteBatch.Draw(Assets[Save.GetRoom().Tiles[i, j].Texture], MenuHandler.OffsetVector + new Vector2(34, 34) + new Vector2(i * 66, j * 66), null, Color.White, 0, Vector2.Zero, 1, SpriteEffects.None, 0);
                    if (Save.GetRoom().Tiles[i, j].Door)
                    {
                        SpriteBatch.Draw(Assets[4], MenuHandler.OffsetVector + new Vector2(34, 34) + new Vector2(i * 66, j * 66), null, Color.White, 0, Vector2.Zero, 1, SpriteEffects.None, 0);
                    }
                    if (Save.GetRoom().Tiles[i, j].Steps != Tile.Stairs.NONE)
                    {
                        SpriteBatch.Draw(Assets[14], MenuHandler.OffsetVector + new Vector2(34, 34) + new Vector2(i * 66, j * 66), null, Color.White, 0, Vector2.Zero, 1, SpriteEffects.None, 0);
                    }
                    if (MenuHandler.IsMouseOverT(ScaledMousePos, i, j))
                    {
                        if (Save.Kevin.Attacks != null)
                        {
                            if (Save.Kevin.Selection >= 0)
                            {
                                Save.Kevin.UpdateSelected(new Vector2(i, j));
                            }
                        }
                    }
                }
            }
        }

        private void DrawEntities()
        {
            foreach (Entity entity in Save.GetRoom().EntityList)
            {
                if (entity is Creature)
                {
                    SpriteBatch.Draw(Assets[((Creature)entity).Texture], MenuHandler.OffsetVector + new Vector2(34, 34) + entity.Position * 66, null, Color.White, 0, Vector2.Zero, 1, SpriteEffects.None, 0);
                    if (((Creature)entity).HP != ((Creature)entity).MaxHP)
                    {
                        SpriteBatch.Draw(Assets[9], MenuHandler.OffsetVector + new Vector2(34, 34) + entity.Position * 66, null, Color.White, 0, Vector2.Zero, 1, SpriteEffects.None, 0);
                        SpriteBatch.Draw(Assets[8], MenuHandler.OffsetVector + new Vector2(34, 34) + entity.Position * 66, new Rectangle(0, 0, (int)Math.Ceiling(Assets[8].Width * (((Creature)entity).HP / (double)((Creature)entity).MaxHP)),
                        Assets[8].Height), Color.White, 0, Vector2.Zero, 1, SpriteEffects.None, 0);
                    }
                }
                else
                {
                    SpriteBatch.Draw(((Item)entity).Sprite, MenuHandler.OffsetVector + new Vector2(34, 34) + entity.Position * 66, null, Color.White, 0, Vector2.Zero, 1, SpriteEffects.None, 0);
                }
            }
        }

        private void DrawMovements()
        {
            if (Save.Kevin.Movements != null)
            {
                foreach (Movement option in Save.Kevin.Movements)
                {
                    SpriteBatch.Draw(Assets[5], MenuHandler.OffsetVector + new Vector2(34, 34) + option.GetVector() * 66, null, Color.White, 0, Vector2.Zero, 1, SpriteEffects.None, 0);
                }
            }
        }

        private void DrawAttacks()
        {
            if (Save.Kevin.Attacks != null)
            {
                if (Save.Kevin.Selection >= 0)
                {
                    // attackcursor
                    SpriteBatch.Draw(Assets[6], MenuHandler.OffsetVector + new Vector2(34, 34) + Save.Kevin.Attacks.ElementAt(Save.Kevin.Selection).Target.Position * 66, null, Color.White, 0, Vector2.Zero, 1, SpriteEffects.None, 0);
                }
            }
        }

        private void DrawInventory()
        {
            foreach (InvButton b in Save.Kevin.Equipment.Items)
            {
                if (b.Item != null)
                {
                    SpriteBatch.Draw(b.Item.Sprite, MenuHandler.OffsetVector + b.Position, null, Color.White, 0, b.Origin, .75F, SpriteEffects.None, 0);
                    if (b.Item is Potion)
                    {
                        SpriteBatch.DrawString(SegeoUiMono, ((Potion)b.Item).StackSize.ToString(), MenuHandler.OffsetVector + b.Position, Color.White);
                    }
                }
            }
        }

        private void DrawUI()
        {
            SpriteBatch.DrawString(SegeoUiMono, "HP: ", MenuHandler.OffsetVector + new Vector2(23, 1), Color.White);
            SpriteBatch.DrawString(SegeoUiMono, Save.Kevin.HP.ToString() + "/" + Save.Kevin.MaxHP.ToString(), new Vector2(64, 1), Color.White);
            SpriteBatch.Draw(Assets[15], MenuHandler.OffsetVector + new Vector2(146, 7), new Rectangle(0, 0, (int)Math.Ceiling(Assets[15].Width * (Save.Kevin.HP / (double)Save.Kevin.MaxHP)),
                        Assets[15].Height), Color.White, 0, Vector2.Zero, 1, SpriteEffects.None, 0);
            SpriteBatch.Draw(Assets[16], MenuHandler.OffsetVector + new Vector2(146, 7), null, Color.White, 0, Vector2.Zero, 1, SpriteEffects.None, 0);
            SpriteBatch.DrawString(SegeoUiMono, "AP: ", MenuHandler.OffsetVector + new Vector2(300, 1), Color.White);
            SpriteBatch.DrawString(SegeoUiMono, Save.Kevin.AP.ToString() + "/" + Save.Kevin.MaxAP.ToString(), new Vector2(334, 1), Color.White);
            SpriteBatch.Draw(Assets[17], MenuHandler.OffsetVector + new Vector2(417, 7), new Rectangle(0, 0, (int)Math.Ceiling(Assets[17].Width * (Save.Kevin.AP / (double)Save.Kevin.MaxAP)),
                        Assets[17].Height), Color.White, 0, Vector2.Zero, 1, SpriteEffects.None, 0);
            SpriteBatch.Draw(Assets[16], MenuHandler.OffsetVector + new Vector2(417, 7), null, Color.White, 0, Vector2.Zero, 1, SpriteEffects.None, 0);
            SpriteBatch.DrawString(SegeoUiMono, "Style: x" + Save.Kevin.Style.ToString(), MenuHandler.OffsetVector + new Vector2(600, 1), Color.White);
        }

        private void DrawMiniMap()
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
			        if (Save.GetFloor().Rooms[i,j].Visible)
                    {
				        if (i < imin)
					        imin  = i;
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
            Vector2 diff = new Vector2(1150, 582) - offset / 2;

            //SpriteBatch.DrawString(SegeoUiMono, "mins: " + new Vector2(imin, jmin).ToString(), MenuHandler.OffsetVector + new Vector2(20, 20), Color.Wheat);
            //SpriteBatch.DrawString(SegeoUiMono, "offset: " + offset.ToString(), MenuHandler.OffsetVector + new Vector2(20, 40), Color.Wheat);
            //SpriteBatch.DrawString(SegeoUiMono, "maxs: " + new Vector2(imax, jmax).ToString(), MenuHandler.OffsetVector + new Vector2(20, 60), Color.Wheat);

            SpriteBatch.DrawString(SegeoUiMono, "Depth: " + Save.Depth.ToString(), MenuHandler.OffsetVector + new Vector2(1056, 470), Color.White);
            for (int i = imin; i < Save.GetFloor().Max.X; i++)
            {
                for (int j = jmin; j < Save.GetFloor().Max.Y; j++)
                {
                    if (Save.GetFloor().Rooms[i, j].Visible)
                    {
                        if (Save.GetFloor().Rooms[i, j] == Save.GetRoom())
                            SpriteBatch.Draw(Assets[21], MenuHandler.OffsetVector + diff + new Vector2((i - imin) * 23, (j - jmin) * 23), null, Color.White, 0, Vector2.Zero, 1, SpriteEffects.None, 0);
                        else
                        {
                            SpriteBatch.Draw(Assets[18], MenuHandler.OffsetVector + diff + new Vector2((i - imin) * 23, (j - jmin) * 23), null, Color.White, 0, Vector2.Zero, 1, SpriteEffects.None, 0);
                            if (Save.GetFloor().Rooms[i, j].HasEnemy())
                            {
                                SpriteBatch.Draw(Assets[22], MenuHandler.OffsetVector + diff + new Vector2((i - imin) * 23 + 2, (j - jmin) * 23 + 6), null, Color.White, 0, Vector2.Zero, 1, SpriteEffects.None, 0);
                            }
                            if (Save.GetFloor().Rooms[i, j].HasHealth())
                            {
                                SpriteBatch.Draw(Assets[23], MenuHandler.OffsetVector + diff + new Vector2((i - imin) * 23 + 2, (j - jmin) * 23 + 10), null, Color.White, 0, Vector2.Zero, 1, SpriteEffects.None, 0);
                            }
                            if (Save.GetFloor().Rooms[i, j].HasItem())
                            {
                                SpriteBatch.Draw(Assets[24], MenuHandler.OffsetVector + diff + new Vector2((i - imin) * 23 + 2, (j - jmin) * 23 + 14), null, Color.White, 0, Vector2.Zero, 1, SpriteEffects.None, 0);
                            }
                            if (Save.GetFloor().Rooms[i, j].HasStairs())
                            {
                                SpriteBatch.Draw(Assets[30], MenuHandler.OffsetVector + diff + new Vector2((i - imin) * 23 + 6, (j - jmin) * 23 + 6), null, Color.White, 0, Vector2.Zero, 1, SpriteEffects.None, 0);
                            }
                        }
                        if (Save.GetFloor().Rooms[i, j].HasEastDoor())
                        {
                            SpriteBatch.Draw(Assets[19], MenuHandler.OffsetVector + diff + new Vector2((i - imin) * 23 + 19, (j - jmin) * 23 + 4), null, Color.White, 0, Vector2.Zero, 1, SpriteEffects.None, 0);
                        }
                        if (Save.GetFloor().Rooms[i, j].HasNorthDoor())
                        {
                            SpriteBatch.Draw(Assets[20], MenuHandler.OffsetVector + diff + new Vector2((i - imin) * 23 + 4, (j - jmin) * 23 - 4), null, Color.White, 0, Vector2.Zero, 1, SpriteEffects.None, 0);
                        }
                        if (Save.GetFloor().Rooms[i, j].HasSouthDoor())
                        {
                            SpriteBatch.Draw(Assets[20], MenuHandler.OffsetVector + diff + new Vector2((i - imin) * 23 + 4, (j - jmin) * 23 + 19), null, Color.White, 0, Vector2.Zero, 1, SpriteEffects.None, 0);
                        }
                        if (Save.GetFloor().Rooms[i, j].HasWestDoor())
                        {
                            SpriteBatch.Draw(Assets[19], MenuHandler.OffsetVector + diff + new Vector2((i - imin) * 23 - 4, (j - jmin) * 23 + 4), null, Color.White, 0, Vector2.Zero, 1, SpriteEffects.None, 0);
                        }
                    }
                }
            }
        }

        private void DrawDescriptions()
        {
            if (MenuHandler.DescriptionList.Count > 0)
            {
                for (int i = MenuHandler.DescriptionList.Count() - 1; i >= 0; i--)
                {
                    Description D = MenuHandler.DescriptionList.ElementAt(i);

                    int currrentheight = 0;
                    //draw description box
                    for (int j = 0; j < D.Length; j++)
                    {
                        SpriteBatch.Draw(Assets[25], MenuHandler.OffsetVector + D.Position + new Vector2(0, 24 * j), null, Color.White, 0, Vector2.Zero, 1, SpriteEffects.None, 0);
                    }

                    //draw catagory
                    if (D.Source is Weapon)
                    {
                        SpriteBatch.DrawString(Calibri, "Weapon", MenuHandler.OffsetVector + D.Position + new Vector2(4, 4), softgray);
                    }
                    else if (D.Source is Armor)
                        SpriteBatch.DrawString(Calibri, "Armor", MenuHandler.OffsetVector + D.Position + new Vector2(4, 4), softgray);
                    else if (D.Source is Creature)
                        SpriteBatch.DrawString(Calibri, "Creature", MenuHandler.OffsetVector + D.Position + new Vector2(4, 4), softgray);
                    else if (D.Source is Potion)
                        SpriteBatch.DrawString(Calibri, "Consumable", MenuHandler.OffsetVector + D.Position + new Vector2(4, 4), softgray);

                    //draw exit button
                    SpriteBatch.Draw(Assets[28], MenuHandler.OffsetVector + D.Position + new Vector2(210, 2), null, Color.White, 0, Vector2.Zero, 1, SpriteEffects.None, 0);

                    currrentheight -= 24;
                    //draw name
                    for (int j = 0; j < D.Name.Length; j++)
                    {
                        if (D.Name[j] != "")
                            currrentheight += 24;
                        SpriteBatch.DrawString(Cousine22, D.Name[j], MenuHandler.OffsetVector + D.Position + new Vector2(4, 26 + currrentheight), whiteorange);
                    }

                    //draw backdrop
                    SpriteBatch.Draw(Assets[27], MenuHandler.OffsetVector + D.Position + new Vector2(160, currrentheight + 60), null, Color.White, 0, Vector2.Zero, 1, SpriteEffects.None, 0);

                    //draw portrait
                    if (D.Source is Creature)
                    {
                        SpriteBatch.Draw(Assets[((Creature)D.Source).Texture], MenuHandler.OffsetVector + D.Position + new Vector2(160, currrentheight + 60), null, Color.White, 0, Vector2.Zero, 1, SpriteEffects.None, 0);
                    }
                    else
                    {
                        SpriteBatch.Draw(((Item)D.Source).Sprite, MenuHandler.OffsetVector + D.Position + new Vector2(160, currrentheight + 60), null, Color.White, 0, Vector2.Zero, 1, SpriteEffects.None, 0);
                    }

                    //draw class
                    SpriteBatch.DrawString(Calibri, D.Source.GetClass(), MenuHandler.OffsetVector + D.Position + new Vector2(4, currrentheight + 58), softgray);

                    if (D.Source is Weapon)
                    {
                        //draw weapon cost
                        SpriteBatch.DrawString(Calibri, ((Weapon)D.Source).Cost.ToString() + " AP", MenuHandler.OffsetVector + D.Position + new Vector2(4, currrentheight + 84), lightblue);
                        //draw weapon dmg
                        SpriteBatch.DrawString(CenturyGothic, ((Weapon)D.Source).Damage.ToString() + " Dmg", MenuHandler.OffsetVector + D.Position + new Vector2(4, currrentheight + 92), brightwhite);
                    }
                    else if (D.Source is HealthPotion)
                    {
                        //draw heal amount
                        SpriteBatch.DrawString(CenturyGothic, ((HealthPotion)D.Source).GetHP().ToString() + " HP", MenuHandler.OffsetVector + D.Position + new Vector2(4, currrentheight + 92), brightwhite);
                    }
                    //draw mods
                    for (int j = 0; j < D.Mods.Length; j++)
                    {
                        currrentheight += 24;
                        SpriteBatch.DrawString(Cousine16, D.Mods[j], MenuHandler.OffsetVector + D.Position + new Vector2(10, 110 + currrentheight), orange);
                    }
                }
            }
        }
    }
}
