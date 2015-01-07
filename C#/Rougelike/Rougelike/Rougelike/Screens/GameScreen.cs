using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.Xna.Framework.Input;
using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Graphics;

namespace Rougelike
{
    public partial class Rougelike
    {
        InventoryButton TemporaryInventoryButton;
        Texture2D GameBackground;
        Item TemporaryItem;
        bool ItemDragging;
        bool MegaMapMode;
        bool UpdateOptions;
        bool ChangedFloor;
        List<Description> DescriptionList = new List<Description>();
        List<Button> GameButtons = new List<Button>();

        void InitializeGame()
        {
            GameBackground = Content.Load<Texture2D>("textures/game/background");

            Button endturn = new Button("endturn", Keys.Space);
            GameButtons.Add(endturn);

            Button pickup = new Button("pickup", Keys.S);
            GameButtons.Add(pickup);

            Button enter = new Button("interact", Keys.D);
            GameButtons.Add(enter);

            Button breaky = new Button("break", Keys.P);
            GameButtons.Add(breaky);

            Button quit = new Button("quit", Keys.F10);
            GameButtons.Add(quit);

            Button megamap = new Button("4x", Keys.Tab);
            GameButtons.Add(megamap);

            Initialize4XButtons();

            NewGame(Class.MASTERMIND);

            GameState = State.GAME;
        }

        void CheckGameInput()
        {
            foreach(Button button in GameButtons)
            {
                // Keyboard
                if (Pressed(button.Hotkey))
                {
                    button.WasPressed = true;
                }
                else if (Released(button.Hotkey))
                {
                    if (button.WasPressed)
                    {
                        HandleGameInput(button);
                    }
                    button.WasPressed = false;
                }

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
                            HandleGameInput(button);
                        }
                        button.WasClicked = false;
                    }

                    if (RightReleased())
                    {
                        Examine();
                    }
                }
            }

            if (UpdateOptions)
            {
                Save.Kevin.UpdateOptions(Save.GetRoom(), GameButtons);
                UpdateOptions = false;
            }

            if (ChangedFloor)
            {
                BuildMegaMap();
                ChangedFloor = false;
            }
        }

        void HandleGameInput(Button button)
        {
            Room CurrentRoom = Save.GetRoom();
            if (button is Attack)
                UpdateOptions = Attack((Attack)button);
            else if (button is Movement)
                UpdateOptions =  Move((Movement)button);
            switch (button.Action)
            {
                case "interact":
                    if (!MegaMapMode)
                    {
                        if (OnDoor() && CurrentRoom.IsClear())
                        {
                            ChangeRooms();
                        }
                        else if (OnStairs() && CurrentRoom.IsClear())
                        {
                            ChangeFloors();
                        }
                        else if (NextToNPC())
                        {
                            //Interact with NPC
                        }
                    }
                    break;

                case "pickup":
                    if (!MegaMapMode)
                    {
                        PickUp();
                    }
                    break;

                case "endturn":
                    if (!MegaMapMode)
                    {
                        Save.GetRoom().UpdateTiles();
                        for (int i = 0; i < Save.GetRoom().Entities.Count; i++)
                        {
                            Entity entity = Save.GetRoom().Entities.ElementAt(i);
                            if (entity is Enemy)
                            {
                                ((Enemy)entity).DoTurn(Save.GetRoom(), Save.Kevin);
                                ((Creature)entity).EndTurn();
                            }
                        }
                        if (Save.Kevin.HP <= 0)
                        {
                            GameOver();
                        }
                        else
                        {
                            Save.Kevin.EndTurn();
                            UpdateOptions = true;
                        }
                    }
                    break;

                case "quit":
                    Quit();
                    break;

                case "break":
                    //Pause to debug
                    break;

                case "4x":
                    MegaMapMode = !MegaMapMode;
                    foreach (Button b in GameButtons)
                    {
                        if (b.Action == "room")
                            ((RoomButton)b).Visable = !((RoomButton)b).Visable;
                    }
                    break;

                case "room":
                    break;
            }
        }

        void DrawGameScreen()
        {
            Draw(GameBackground);

            DrawGameRoom();
           
            foreach (Button button in GameButtons)
            {
                if (button is Movement)
                    Draw((Movement)button);
                else
                    Draw(button);
            }

            foreach (InventoryButton button in Save.Kevin.Equipment.Items)
            {
                Draw(button);
            }

            DrawUI();

            DrawMiniMap();

            DrawDescriptions();

            if (MegaMapMode)
            {
                Draw4X();
            }
        }

        bool Move(Movement movement)
        {
            if (!MegaMapMode)
            {
                if (Save.Kevin.AP >= movement.Cost)
                {
                    Save.Kevin.Position = new Vector2(movement.X, movement.Y);
                    Save.Kevin.AP = Save.Kevin.AP - movement.Cost;
                    Save.GetRoom().UpdateTiles();
                    return true;
                }
            }
            return false;
        }

        bool Attack(Attack attack)
        {
            if (!MegaMapMode)
            {
                Creature.Attack(Save.Kevin, attack.Target, Save.GetRoom());
                return true;
            }
            return false;
        }

        void Examine()
        {
            Description descriptor = null;
            foreach (Entity entity in Save.GetRoom().Entities)
            {
                if (MouseOver(entity))
                {
                    descriptor = new Description(entity);
                }
            }
            foreach (InventoryButton button in Save.Kevin.Equipment.Items)
            {
                if (button.Item != null && MouseOver(button))
                {
                    if (!(button.Item is Consumable))
                        descriptor = new Description(button);
                    else
                        Save.Kevin.RightClick(button);
                }
            }
            if (descriptor != null)
            {
                if (DescriptionList.Contains(descriptor))
                {
                    DescriptionList.Remove(descriptor);
                }
                else
                    DescriptionList.Add(descriptor);
            }
        }

        void ChangeRooms()
        {
            bool newroom = false;
            Save.GetRoom().Remove(Save.Kevin);
            if (Save.Kevin.Position.X == 0)
            {
                Save.GetFloor().Position += new Vector2(-1, 0);
                if (!Save.GetRoom().Visible)
                    newroom = true;
                Save.GetRoom().Visible = true;
                for (int i = 1; i < 8; i++)
                {
                    if (Save.GetRoom().Tiles[14, i].Door)
                    {
                        Save.Kevin.Position = new Vector2(14, i);
                    }
                }
            }
            else if ((int)Save.Kevin.Position.X == 14)
            {
                Save.GetFloor().Position += new Vector2(1, 0);
                if (!Save.GetRoom().Visible)
                    newroom = true;
                Save.GetRoom().Visible = true;
                for (int i = 1; i < 8; i++)
                {
                    if (Save.GetRoom().Tiles[0, i].Door)
                    {
                        Save.Kevin.Position = new Vector2(0, i);
                    }
                }
            }
            else if ((int)Save.Kevin.Position.Y == 0)
            {
                Save.GetFloor().Position += new Vector2(0, -1);
                if (!Save.GetRoom().Visible)
                    newroom = true;
                Save.GetRoom().Visible = true;
                for (int i = 1; i < 13; i++)
                {
                    if (Save.GetRoom().Tiles[i, 9].Door)
                    {
                        Save.Kevin.Position = new Vector2(i, 9);
                    }
                }
            }
            else if ((int)Save.Kevin.Position.Y == 9)
            {
                Save.GetFloor().Position += new Vector2(0, 1);
                if (!Save.GetRoom().Visible)
                    newroom = true;
                Save.GetRoom().Visible = true;
                for (int i = 1; i < 13; i++)
                {
                    if (Save.GetRoom().Tiles[i, 0].Door)
                    {
                        Save.Kevin.Position = new Vector2(i, 0);
                    }
                }
            }
            Save.GetRoom().AddToRoom(Save.Kevin);
            if (newroom)
                Do4XTurn();
        }

        void ChangeFloors()
        {
            //if (Save.GetRoom().Tiles[(int)Save.Kevin.Position.X, (int)Save.Kevin.Position.Y].Steps == Stairs.UP)
            //{
            //    Save.GetRoom().Remove(Save.Kevin);
            //    Save.GoUp();
            //    Save.GetRoom().Visible = true;
            //    for (int i = 0; i < 15; i++)
            //    {
            //        for (int j = 0; j < 10; j++)
            //        {
            //            if (Save.GetRoom().Tiles[i, j].Steps == Stairs.DOWN)
            //            {
            //                Save.Kevin.Position = new Vector2(i, j);
            //            }
            //        }
            //    }
            //    Save.GetRoom().AddToRoom(Save.Kevin);
            //}
            //else
            if (Save.GetRoom().Tiles[(int)Save.Kevin.Position.X, (int)Save.Kevin.Position.Y].Steps == Stairs.DOWN)
            {
                Save.GetRoom().Remove(Save.Kevin);
                Save.GoDown();
                Save.GetRoom().Visible = true;
                for (int i = 0; i < 15; i++)
                {
                    for (int j = 0; j < 10; j++)
                    {
                        if (Save.GetRoom().Tiles[i, j].Steps == Stairs.UP)
                        {
                            Save.Kevin.Position = new Vector2(i, j);
                        }
                    }
                }
                Save.GetRoom().AddToRoom(Save.Kevin);
                Save.GetRoom().PermaWorked = true;
            }
            UpdateOptions = true;
            ChangedFloor = true;
        }

        void BuildMegaMap()
        {
            GameButtons.RemoveAll(item => item is Movement);
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
                        GameButtons.Add(new RoomButton(Save.GetFloor().Rooms[i, j], diff + new Vector2((i - imin) * 58, (j - jmin) * 58)));
                    }
                }
            }

        }

        bool OnDoor()
        {
            return Save.GetRoom().Tiles[(int)Save.Kevin.Position.X, (int)Save.Kevin.Position.Y].Door;
        }

        bool OnStairs()
        {
            return Save.GetRoom().Tiles[(int)Save.Kevin.Position.X, (int)Save.Kevin.Position.Y].Steps != Stairs.NONE;
        }

        bool NextToNPC()
        {
            return false;
        }

        void PickUp()
        {
            Item result = Save.GetRoom().GetAdjacent(Save.Kevin.Position);
            if (Save.Kevin.Equipment.GetInventoryCount() < 12 && result != null)
            {
                Save.Kevin.PickUp(result);
                Save.GetRoom().Remove(result);
                Save.GetRoom().UpdateTiles();
                Save.Kevin.UpdateOptions(Save.GetRoom(), GameButtons);
            }
        }
    }
}
