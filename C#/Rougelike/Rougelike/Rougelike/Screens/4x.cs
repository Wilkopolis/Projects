using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Graphics;
using Microsoft.Xna.Framework.Input;

namespace Rougelike
{
    partial class Rougelike
    {
        Texture2D CommonBackground;
        Texture2D GoldRoomSelected;
        Texture2D GoldRoomUnselected;

        bool GoldRoomChosen;

        List<Button> MegaMapButtons;

        void Initialize4XButtons()
        {
            MegaMapButtons = new List<Button>();
            GoldRoomSelected = Content.Load<Texture2D>("textures/game/4x/selected");
            GoldRoomUnselected = Content.Load<Texture2D>("textures/game/4x/unselected");

            CommonBackground = Content.Load<Texture2D>("textures/game/4x/4xback");

            Button merchant = new Button(GoldRoomUnselected, new Vector2(200, 300), "merchant");
            MegaMapButtons.Add(merchant);

            //Button enchanter = new Button(GoldRoomUnselected, new Vector2(200, 360), "enchanter");
            //MegaMapButtons.Add(enchanter);

            //Button alchemist = new Button(GoldRoomUnselected, new Vector2(200, 420), "alchemist");
            //MegaMapButtons.Add(alchemist);
        }

        void CheckMegaMapButtons()
        {
            foreach (Button button in MegaMapButtons)
            {
                // Mouse
                if (MouseOver(button))
                {
                    if (Click())
                    {
                        button.WasClicked = true;
                    }
                    else if (Released())
                    {
                        if (button.WasClicked)
                        {
                            Handle4XButton(button);
                        }
                        button.WasClicked = false;
                    }
                }
            }
        }

        void Handle4XButton(Button button)
        {
            switch (button.Action)
            {
                case "enchanter":
                    if (!GoldRoomChosen)
                    {
                        button.Sprite = GoldRoomSelected;
                        Save.GetGoldRoom().AddToRoom(new NPC(NPCType.ENCHANTER));
                        UpdateOptions = true;
                        GoldRoomChosen = true;
                    }
                    break;

                case "merchant":
                    if (!GoldRoomChosen)
                    {
                        button.Sprite = GoldRoomSelected;
                        NPC merchant = new NPC(NPCType.MERCHANT);
                        merchant.Inventory = GenerateShopInventory();
                        Save.GetGoldRoom().AddToRoom(merchant);
                        UpdateOptions = true;
                        GoldRoomChosen = true;
                    }
                    break;

                case "alchemist":
                    if (!GoldRoomChosen)
                    {
                        button.Sprite = GoldRoomSelected;
                        Save.GetGoldRoom().AddToRoom(new NPC(NPCType.ALCHEMIST));
                        UpdateOptions = true;
                        GoldRoomChosen = true;
                    }
                    break;

                case "room":
                    if (!((RoomButton)button).Room.Worked && Save.Kevin.Power >= ((RoomButton)button).Room.Cost)
                    {
                        ((RoomButton)button).Room.Worked = true;
                        Save.Kevin.Power -= ((RoomButton)button).Room.Cost;
                        button.Sprite = Assets[(int)Texture.POWEREDROOM];
                    }
                    break;

                case "door":
                    // Congrats
                    break;
            }
        }

        void DrawMegaMap()
        {
            Draw(CommonBackground, new Vector2(41, 41));

            foreach (Button button in MegaMapButtons)
            {
                Draw(button);
                if (button.Action != "room" && button.Action != "door")
                    SpriteBatch.DrawString(Cousine12, button.Action, button.Position + OffsetVector - new Vector2(43, 8), Color.White);
                else if (button is RoomButton)
                {
                    if (((RoomButton)button).Room.Visible)
                    {
                        SpriteBatch.DrawString(Cousine12, "P:" + ((RoomButton)button).Room.Power.ToString(), button.Position - new Vector2(14, 17), Color.Black);
                        SpriteBatch.DrawString(Cousine12, "W:" + ((RoomButton)button).Room.Wealth.ToString(), button.Position - new Vector2(14, -1), Color.Black);
                    }
                    if (((RoomButton)button).Room == Save.GetRoom())
                    {
                        Draw(40, button.Position - new Vector2(27, 27));
                    }
                }
            }

            SpriteBatch.DrawString(Cousine16, Save.Kevin.Name, OffsetVector + new Vector2(50, 45), Color.White);
            SpriteBatch.DrawString(Cousine16, "The " + Save.Kevin.Class.ToString(), OffsetVector + new Vector2(50, 70), Color.White);
        }

        //void DrawMegaMap()
        //{
        //    // Get center offset Vector
        //    int imin = (int)Save.GetFloor().Position.X;
        //    int imax = (int)Save.GetFloor().Position.X;
        //    int jmin = (int)Save.GetFloor().Position.Y;
        //    int jmax = (int)Save.GetFloor().Position.Y;
        //    for (int i = 0; i < Save.GetFloor().Max.X; i++)
        //    {
        //        for (int j = 0; j < Save.GetFloor().Max.Y; j++)
        //        {
        //            if (Save.GetFloor().Rooms[i, j].Exists)
        //            {
        //                if (i < imin)
        //                    imin = i;
        //                if (i > imax)
        //                    imax = i;
        //                if (j < jmin)
        //                    jmin = j;
        //                if (j > jmax)
        //                    jmax = j;
        //            }
        //        }
        //    }

        //    Vector2 offset = new Vector2((imax - imin) * 58, (jmax - jmin) * 58);
        //    Vector2 diff = new Vector2(524, 364) - offset / 2;

        //    for (int i = 0; i < Save.GetFloor().Max.X; i++)
        //    {
        //        for (int j = 0; j < Save.GetFloor().Max.Y; j++)
        //        {
        //            if (Save.GetFloor().Rooms[i, j].Exists)
        //            {
        //                if (Save.GetFloor().Rooms[i, j].Worked || Save.GetFloor().Rooms[i, j].PermaWorked)
        //                    SpriteBatch.Draw(Assets[(int)Texture.CURRENTROOM], OffsetVector + diff + new Vector2((i - imin) * 58, (j - jmin) * 58), null, Color.White, 0, Vector2.Zero, 1, SpriteEffects.None, 0);
        //                else
        //                {
        //                    SpriteBatch.Draw(Assets[(int)Texture.MEGAROOM], OffsetVector + diff + new Vector2((i - imin) * 58, (j - jmin) * 58), null, Color.White, 0, Vector2.Zero, 1, SpriteEffects.None, 0);
        //                }
        //                if (Save.GetFloor().Rooms[i, j].HasSouthDoor())
        //                {
        //                    SpriteBatch.Draw(Assets[(int)Texture.MEGADOOR], OffsetVector + diff + new Vector2((i - imin) * 58 + 13, (j - jmin) * 58 + 50), null, Color.White, 0, Vector2.Zero, 1, SpriteEffects.None, 0);
        //                }
        //                if (Save.GetFloor().Rooms[i, j].HasWestDoor())
        //                {
        //                    SpriteBatch.Draw(Assets[(int)Texture.MEGADOORH], OffsetVector + diff + new Vector2((i - imin) * 58 - 8, (j - jmin) * 58 + 13), null, Color.White, 0, Vector2.Zero, 1, SpriteEffects.None, 0);
        //                }
        //                if (Save.GetFloor().Rooms[i, j].Visible)
        //                {
        //                    SpriteBatch.DrawString(Cousine12, "P:" + Save.GetFloor().Rooms[i, j].Power.ToString(), OffsetVector + diff + new Vector2((i - imin) * 58 + 11, (j - jmin) * 58 + 8), Color.Black);
        //                    SpriteBatch.DrawString(Cousine12, "W:" + Save.GetFloor().Rooms[i, j].Wealth.ToString(), OffsetVector + diff + new Vector2((i - imin) * 58 + 11, (j - jmin) * 58 + 26), Color.Black);
        //                }
        //            }
        //        }
        //    }
        //    SpriteBatch.Draw(Assets[40], OffsetVector + diff + new Vector2((Save.GetFloor().Position.X - imin) * 58 - 2, (Save.GetFloor().Position.Y - jmin) * 58 - 2), null, Color.White, 0, Vector2.Zero, 1, SpriteEffects.None, 0);
        //}

        void Do4XTurn()
        {
            for (int i = 0; i < Save.GetFloor().Max.X; i++)
            {
                for (int j = 0; j < Save.GetFloor().Max.Y; j++)
                {
                    if (Save.GetFloor().Rooms[i, j].Worked || Save.GetFloor().Rooms[i, j].PermaWorked)
                    {
                        Save.Kevin.Wealth += Save.GetFloor().Rooms[i, j].Wealth;
                        Save.Kevin.Power += Save.GetFloor().Rooms[i, j].Power;
                    }
                }
            }
            Save.Kevin.Wealth += Save.Kevin.MyWealthPerTurn();
            Save.Kevin.Power += Save.Kevin.MyPowerPerTurn();
        }

        void BuildMegaMap()
        {
            MegaMapButtons.RemoveAll(item => item.Action == "room" || item.Action == "door");
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
                        if (Save.GetFloor().Rooms[i, j].Worked)
                        {
                            MegaMapButtons.Add(new RoomButton(Assets[(int)Texture.POWEREDROOM], diff + new Vector2((i - imin) * 58, (j - jmin) * 58), Save.GetFloor().Rooms[i, j]));
                        }
                        else
                        {
                            MegaMapButtons.Add(new RoomButton(Assets[(int)Texture.MEGAROOM], diff + new Vector2((i - imin) * 58, (j - jmin) * 58), Save.GetFloor().Rooms[i, j]));
                        }
                        if (Save.GetFloor().Rooms[i, j].HasSouthDoor())
                        {
                            MegaMapButtons.Add(new Button(Assets[(int)Texture.MEGADOOR], diff + new Vector2((i - imin) * 58 + 13, (j - jmin) * 58 + 50) - new Vector2(14, 21), "door"));
                        }
                        if (Save.GetFloor().Rooms[i, j].HasWestDoor())
                        {
                            MegaMapButtons.Add(new Button(Assets[(int)Texture.MEGADOORH], diff + new Vector2((i - imin) * 58 - 8, (j - jmin) * 58 + 13) - new Vector2(21, 14), "door"));
                        }
                    }
                }
            }
        }
    }
}
