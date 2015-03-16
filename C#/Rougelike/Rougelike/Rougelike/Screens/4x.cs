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
        Texture2D MegaDoorVertical;
        Texture2D MegaDoorHorizontal;
        Texture2D MegaRoom;
        Texture2D PoweredRoom;
        Texture2D CurrentRoom;

        bool GoldRoomChosen;

        List<Button> MegaMapButtons;

        void Initialize4XButtons(Class playerclass)
        {
            MegaMapButtons = new List<Button>();
            GoldRoomSelected = Content.Load<Texture2D>("textures/game/4x/selected");
            GoldRoomUnselected = Content.Load<Texture2D>("textures/game/4x/unselected");
            MegaDoorVertical = Content.Load<Texture2D>("textures/game/4x/megadoorvertical");
            MegaDoorHorizontal = Content.Load<Texture2D>("textures/game/4x/megadoorhorizontal");
            MegaRoom = Content.Load<Texture2D>("textures/game/4x/megaroom");
            PoweredRoom = Content.Load<Texture2D>("textures/game/4x/poweredroom");
            CurrentRoom = Content.Load<Texture2D>("textures/game/4x/currentroom");

            CommonBackground = Content.Load<Texture2D>("textures/game/4x/4xback");

            Button merchant = new Button(GoldRoomUnselected, new Vector2(200, 300), "merchant");
            MegaMapButtons.Add(merchant);

            Button enchanter = new Button(GoldRoomUnselected, new Vector2(200, 350), "enchanter");
            MegaMapButtons.Add(enchanter);

            Button alchemist = new Button(GoldRoomUnselected, new Vector2(200, 400), "alchemist");
            MegaMapButtons.Add(alchemist);

            Button medic = new Button(GoldRoomUnselected, new Vector2(200, 450), "medic");
            MegaMapButtons.Add(medic);

            Button gambler = new Button(GoldRoomUnselected, new Vector2(200, 500), "gambler");
            MegaMapButtons.Add(gambler);

            if (playerclass == Class.PHARMACIST)
            {
                Button pharmacist = new Button(GoldRoomUnselected, new Vector2(200, 550), "pharmacist");
                MegaMapButtons.Add(pharmacist);
            }
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
            if (GoldRoomChosen)
                MegaMapButtons.RemoveAll(button => button.Sprite == GoldRoomUnselected);
        }

        void Handle4XButton(Button button)
        {
            switch (button.Action)
            {
                case "enchanter":
                    if (!GoldRoomChosen)
                    {
                        button.Sprite = GoldRoomSelected;
                        Save.GetGoldRoom().AddToRoom(Enchanter.Copy(HashID++));
                        EnchanterButtons = GenerateEnchantments();
                        UpdateOptions = true;
                        GoldRoomChosen = true;
                    }
                    break;

                case "merchant":
                    if (!GoldRoomChosen)
                    {
                        button.Sprite = GoldRoomSelected;
                        ShopInventory = GenerateShopInventory();
                        Save.GetGoldRoom().AddToRoom(Merchant.Copy(HashID++));
                        UpdateOptions = true;
                        GoldRoomChosen = true;
                    }
                    break;

                case "alchemist":
                    if (!GoldRoomChosen)
                    {
                        button.Sprite = GoldRoomSelected;
                        Save.GetGoldRoom().AddToRoom(Alchemist.Copy(HashID++));
                        UpdateOptions = true;
                        GoldRoomChosen = true;
                    }
                    break;

                case "medic":
                    if (!GoldRoomChosen)
                    {
                        button.Sprite = GoldRoomSelected;
                        Save.GetGoldRoom().AddToRoom(Medic.Copy(HashID++));
                        UpdateOptions = true;
                        GoldRoomChosen = true;
                    }
                    break;

                case "gambler":
                    if (!GoldRoomChosen)
                    {
                        button.Sprite = GoldRoomSelected;
                        Save.GetGoldRoom().AddToRoom(Gambler.Copy(HashID++));
                        UpdateOptions = true;
                        GoldRoomChosen = true;
                    }
                    break;

                case "pharmacist":
                    if (!GoldRoomChosen)
                    {
                        button.Sprite = GoldRoomSelected;
                        Save.GetGoldRoom().AddToRoom(Pharmacist.Copy(HashID++));
                        UpdateOptions = true;
                        GoldRoomChosen = true;
                    }
                    break;

                case "room":
                    if (!((RoomButton)button).Room.Worked && Save.Kevin.Power >= ((RoomButton)button).Room.Cost)
                    {
                        ((RoomButton)button).Room.Worked = true;
                        ((RoomButton)button).Room.Visited = true;
                        Save.Kevin.Power -= ((RoomButton)button).Room.Cost;
                        Save.Kevin.PowerPerTurn += ((RoomButton)button).Room.Power;
                        Save.Kevin.WealthPerTurn += ((RoomButton)button).Room.Wealth;
                        Save.Kevin.ExperiencePerTurn++;
                        button.Sprite = PoweredRoom;
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
                    RoomButton roombutton = button as RoomButton;
                    if (roombutton.Room.Visited)
                    {
                        SpriteBatch.DrawString(Cousine12, "P:" + roombutton.Room.Power.ToString(), button.Position - new Vector2(14, 17), Color.Black);
                        SpriteBatch.DrawString(Cousine12, "W:" + roombutton.Room.Wealth.ToString(), button.Position - new Vector2(14, -1), Color.Black);
                    }
                    if (roombutton.Room == Save.GetRoom())
                    {
                        Draw(CurrentRoom, button.Position - new Vector2(27, 27));
                    }
                }
            }

            SpriteBatch.DrawString(Cousine16, Save.Kevin.Name, OffsetVector + new Vector2(50, 45), Color.White);
            SpriteBatch.DrawString(Cousine16, "The " + Save.Kevin.Class.ToString(), OffsetVector + new Vector2(50, 70), Color.White);
        }

        void Do4XTurn()
        {
            Save.Kevin.Wealth += Save.Kevin.WealthPerTurn;
            Save.Kevin.Power += Save.Kevin.PowerPerTurn;
            if (Save.Kevin.Class == Class.MASTERMIND)
                Save.Kevin.Experience += Save.Kevin.ExperiencePerTurn;
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
                            MegaMapButtons.Add(new RoomButton(PoweredRoom, diff + new Vector2((i - imin) * 58, (j - jmin) * 58), Save.GetFloor().Rooms[i, j]));
                        }
                        else
                        {
                            MegaMapButtons.Add(new RoomButton(MegaRoom, diff + new Vector2((i - imin) * 58, (j - jmin) * 58), Save.GetFloor().Rooms[i, j]));
                        }
                        if (Save.GetFloor().Rooms[i, j].HasSouthDoor())
                        {
                            MegaMapButtons.Add(new Button(MegaDoorHorizontal, diff + new Vector2((i - imin) * 58 + 13, (j - jmin) * 58 + 50) - new Vector2(14, 21), "door"));
                        }
                        if (Save.GetFloor().Rooms[i, j].HasWestDoor())
                        {
                            MegaMapButtons.Add(new Button(MegaDoorVertical, diff + new Vector2((i - imin) * 58 - 8, (j - jmin) * 58 + 13) - new Vector2(21, 14), "door"));
                        }
                    }
                }
            }
        }
    }
}
