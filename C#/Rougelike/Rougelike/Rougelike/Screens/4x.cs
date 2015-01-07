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
        Texture2D MegaMapBackground;
        Texture2D GoldRoomSelected;
        Texture2D GoldRoomUnselected;

        bool Lock;

        List<Button> MegaMapButtons = new List<Button>();

        void Initialize4XButtons()
        {
            GoldRoomSelected = Content.Load<Texture2D>("textures/game/4x/selected");
            GoldRoomUnselected = Content.Load<Texture2D>("textures/game/4x/unselected");

            MegaMapBackground = Content.Load<Texture2D>("textures/game/4x/4xback");

            Button merchant = new Button(GoldRoomUnselected, new Vector2(200, 300), "merchant");
            MegaMapButtons.Add(merchant);

            Button enchanter = new Button(GoldRoomUnselected, new Vector2(200, 360), "enchanter");
            MegaMapButtons.Add(enchanter);

            Button alchemist = new Button(GoldRoomUnselected, new Vector2(200, 420), "alchemist");
            MegaMapButtons.Add(alchemist);
        }

        void Handle4XButton(Button button)
        {
            switch (button.Action)
            {
                case "enchanter":
                    if (!Lock)
                    {
                        button.Sprite = GoldRoomSelected;
                        Save.GetGoldRoom().AddToRoom(new NPC(NPCType.ENCHANTER));
                        Lock = true;
                    }
                    break;

                case "merchant":
                    if (!Lock)
                    {
                        button.Sprite = GoldRoomSelected;
                        Save.GetGoldRoom().AddToRoom(new NPC(NPCType.MERCHANT));
                        Lock = true;
                    }
                    break;

                case "alchemist":
                    if (!Lock)
                    {
                        button.Sprite = GoldRoomSelected;
                        Save.GetGoldRoom().AddToRoom(new NPC(NPCType.ALCHEMIST));
                        Lock = true;
                    }
                    break;
            }
        }

        private void Do4XTurn()
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
    }
}
