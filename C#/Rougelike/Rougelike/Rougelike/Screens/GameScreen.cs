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
        Item TemporaryItem;
        ItemButton TemporaryItemButton;
        Texture2D GameBackground;
        bool MegaMapMode;
        bool UpdateOptions;
        bool ChangedFloors = true;
        List<Description> DescriptionList;
        List<Button> GameButtons;

        void InitializeGame()
        {
            DescriptionList = new List<Description>();
            GameButtons = new List<Button>();

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
            
            Initialize4XButtons();
            InitializeShopButtons();
            InitializeSkillButtons();

            NewGame(Class.MASTERMIND);

            GameState = State.GAME;
        }

        void CheckGameInput()
        {
            foreach (Button button in GameButtons)
            {
                // Keyboard
                if (Pressed(button.Hotkey) && DescriptionList.Count == 0)
                {
                    button.WasPressed = true;
                }
                else if (Released(button.Hotkey))
                {
                    if (button.WasPressed)
                    {
                        HandleGameInput(button);
                        break;
                    }
                    button.WasPressed = false;
                }

                // Mouse
                if (MouseOver(button))
                {
                    if (Click() && DescriptionList.Count == 0)
                    {
                        button.WasClicked = true;
                    }
                    else if (Released())
                    {
                        if (button.WasClicked)
                        {
                            HandleGameInput(button);
                            break;
                        }
                        button.WasClicked = false;
                    }
                }
            }

            if (RightReleased())
                HandleRightClick();

            if (MegaMapMode)
            {
                CheckMegaMapButtons();
                CheckSkillButtons();
            }

            if (Trading)
                CheckTraderButtons();
            else
                CheckActiveSkills();

            CheckItemDragging();

            CheckDescriptions();

            if (UpdateOptions)
            {
                UpdatePlayerOptions();
                UpdateOptions = false;
            }

            if (ChangedFloors)
            {
                if (Save.Depth == 1)
                {
                    Button megamap = new Button("4x", Keys.Tab);
                    GameButtons.Add(megamap);
                }
                BuildMegaMap();
                ChangedFloors = false;
            }
        }

        void CheckDescriptions()
        {
            foreach (Description description in DescriptionList)
            {
                Vector2 offset = MouseOver(description);
                if (offset != Vector2.Zero && Click())
                {
                    description.Drag = true;
                    description.Offset = ScaledMousePosition - description.Position;
                }
                if (Hold() && description.Drag)
                {
                    description.Position = ScaledMousePosition - description.Offset;
                }
                if (Released())
                {
                    description.Drag = false;
                    if (MouseOverExitButton(description))
                    {
                        description.Delete = true;
                    }
                }
            }
            DescriptionList.RemoveAll(item => item.Delete);
        }

        bool CheckItemDragging()
        {
            foreach (InventoryButton button in Save.Kevin.Equipment.Items)
            {
                if (button.Item != null)
                {
                    Vector2 offset = MouseOver(button);
                    if (offset != Vector2.Zero)
                    {
                        if (Click())
                            button.WasClicked = true;
                        if (Hold() && button.WasClicked)
                        {
                            if (TemporaryItem == null)
                            {
                                ItemDraggingOffsetVector = offset;
                                TemporaryItem = button.Item;
                                TemporaryItemButton = button;
                                button.Item = null;
                                return true;
                            }
                        }
                    }
                }
            }
            if (Trader != null)
            {
                foreach (ShopButton button in Trader.Inventory)
                {
                    if (button.Item != null)
                    {
                        Vector2 offset = MouseOver(button);
                        if (offset != Vector2.Zero)
                        {
                            if (Click())
                                button.WasClicked = true;
                            if (Hold() && button.WasClicked)
                            {
                                if (TemporaryItem == null)
                                {
                                    if (Save.Kevin.Wealth >= button.Cost)
                                    {
                                        ItemDraggingOffsetVector = offset;
                                        if (button.Item is Armor)
                                            TemporaryItem = ((Armor)button.Item).Copy(HashID++);
                                        else if (button.Item is Weapon)
                                            TemporaryItem = ((Weapon)button.Item).Copy(HashID++);
                                        else if (button.Item is HealthPotion)
                                            TemporaryItem = ((HealthPotion)button.Item).Copy(HashID++);
                                        TemporaryItemButton = button;

                                        Save.Kevin.Wealth -= button.Cost;
                                        button.Stock--;
                                        if (button.Stock <= 0)
                                            button.Item = null;
                                        return true;
                                    }
                                }
                            }
                        }
                    }
                }
            }

            if (Released())
            {
                if (TemporaryItem != null)
                {
                    foreach (InventoryButton button in Save.Kevin.Equipment.Items)
                    {
                        button.WasClicked = false;
                        if (MouseOver(button) != Vector2.Zero)
                        {
                            if (button.Type == ItemType.INVENTORY)
                            {
                                if (button.Item == null)
                                {
                                    if (TemporaryItemButton is ShopButton)
                                    {
                                        button.Item = Dupe(TemporaryItem);
                                        TemporaryItem = null;
                                        TemporaryItemButton = null;
                                    }
                                    else
                                    {
                                        button.Item = TemporaryItem;
                                        TemporaryItem = null;
                                        TemporaryItemButton = null;
                                    }
                                    return true;
                                }
                                else if (button.Item.Type == TemporaryItem.Type)
                                {
                                    if (button.Item is HealthPotion && TemporaryItem is HealthPotion)
                                    {
                                        if (button.Item.Name == TemporaryItem.Name)
                                        {
                                            ((Potion)button.Item).StackSize++;
                                            TemporaryItem = null;
                                            TemporaryItemButton = null;
                                        }
                                    }
                                    else
                                    {
                                        if (TemporaryItemButton is ShopButton)
                                        {
                                            Save.Kevin.PickUp(Dupe(button.Item));
                                            TemporaryItem = null;
                                            TemporaryItemButton = null;
                                        }
                                        else
                                        {
                                            Item switcherino = button.Item;
                                            button.Item = TemporaryItem;
                                            TemporaryItemButton.Item = switcherino;
                                            TemporaryItem = null;
                                            TemporaryItemButton = null;
                                        }
                                    }
                                    return true;
                                }
                                else
                                    return false;
                            }
                            else if (button.Type == TemporaryItem.Type)
                            {
                                if (button.Item == null)
                                {
                                    if (TemporaryItemButton is ShopButton)
                                    {
                                        button.Item = TemporaryItem;
                                        TemporaryItem = null;
                                        TemporaryItemButton = null;
                                    }
                                    else
                                    {
                                        Item switcherino = button.Item;
                                        button.Item = TemporaryItem;
                                        TemporaryItemButton.Item = switcherino;
                                        TemporaryItem = null;
                                        TemporaryItemButton = null;
                                    }
                                }
                                else
                                {
                                    Save.Kevin.PickUp(button.Item);
                                    button.Item = TemporaryItem;
                                    TemporaryItem = null;
                                    TemporaryItemButton = null;
                                }
                                return true;
                            }
                        }
                    }
                    if (Trading && MouseOver(Scrapper))
                    {
                        Save.Kevin.Wealth += TemporaryItem.Value;
                        TemporaryItem = null;
                        TemporaryItemButton = null;
                        return true;
                    }
                    if (TemporaryItemButton is ShopButton)
                    {
                        ((ShopButton)TemporaryItemButton).Stock++;
                        Save.Kevin.Wealth += ((ShopButton)TemporaryItemButton).Cost;
                    }
                    TemporaryItemButton.Item = TemporaryItem;
                    TemporaryItem = null;
                    TemporaryItemButton = null;
                    return true;
                }
            }
            return false;
        }

        void HandleGameInput(Button button)
        {
            Room CurrentRoom = Save.GetRoom();
            if (button is Attack && DescriptionList.Count == 0 && !MegaMapMode)
                UpdateOptions = DoAttack((Attack)button);
            else if (button is Movement && DescriptionList.Count == 0 && !MegaMapMode)
                UpdateOptions = DoMovement((Movement)button);
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
                        else if (GetAdjacentNPC() != null)
                        {
                            //Interact with NPC
                            Interact(GetAdjacentNPC());
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
                        foreach (Entity entity in Save.GetRoom().Entities)
                        {
                            if (entity is Enemy)
                            {                                
                                Enemy enemy = entity as Enemy;
                                DoTurn(enemy);
                            }
                        }
                        if (Save.Kevin.HP <= 0)
                        {
                            GameOver();
                        }
                        else
                        {
                            Save.Kevin.ApplyEndTurnEffects();
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
                    if (!Trading)
                        MegaMapMode = !MegaMapMode;
                    break;
            }
        }

        /*  WHEN
         *  We right clicked on an InventoryButton
         *  
         *  RETURN
         *  true if we use up a consumable stack (remove description)
         *  false otherwise
         */
        bool RightClick(InventoryButton button)
        {
            // IF ITS A CONSUMABLE
            if (button.Item is Consumable)
            {
                ((HealthPotion)button.Item).Use(Save.Kevin);
                if (((Potion)button.Item).StackSize <= 0)
                {
                    button.Item = null;
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

            if (MegaMapMode)
            {
                DrawMegaMap();
                DrawSkills();
            }

            if (Trading)
                DrawTradeWindow();

            DrawDescriptions();

        }

        void HandleRightClick()
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
                if (button.Item != null && MouseOver(button) != Vector2.Zero)
                {
                    //if (!Trading)
                    {
                        //if ((button.Item is Consumable))
                        //{
                        //    Sell(button.Item);
                        //    ((Potion)(button.Item)).StackSize--;
                        //    if (((Potion)(button.Item)).StackSize == 0)
                        //    {
                        //        button.Item = null;
                        //    }
                        //}
                        //else
                        //{
                        //    Sell(button.Item);
                        //    button.Item = null;
                        //}
                    //}
                    //else
                    //{
                        if ((button.Item is Consumable))
                            RightClick(button);
                        else
                            descriptor = new Description(button);
                    }
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
            UpdateOptions = true;
            if (newroom)
                Do4XTurn();
        }

        void ChangeFloors()
        {
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
                Save.GetRoom().Worked = true;
            }
            ChangedFloors = true;
            UpdateOptions = true;
        }

        bool OnDoor()
        {
            return Save.GetRoom().Tiles[(int)Save.Kevin.Position.X, (int)Save.Kevin.Position.Y].Door;
        }

        bool OnStairs()
        {
            return Save.GetRoom().Tiles[(int)Save.Kevin.Position.X, (int)Save.Kevin.Position.Y].Steps != Stairs.NONE;
        }

        void PickUp()
        {
            Item result = Save.GetRoom().GetAdjacent(Save.Kevin.Position);
            if (Save.Kevin.Equipment.GetInventoryCount() < 12 && result != null)
            {
                Save.Kevin.PickUp(result);
                Save.GetRoom().Remove(result);
                Save.GetRoom().UpdateTiles();
                UpdatePlayerOptions();
            }
        }

        void Interact(NPC npc)
        {
            switch (npc.Type)
            {
                case NPCType.ENCHANTER:
                    break;

                case NPCType.MERCHANT:
                    Trading = !Trading;
                    if (Trader == null)
                        Trader = npc;
                    else
                        Trader = null;
                    break;

                case NPCType.ALCHEMIST:
                    break;
            }
        }

        void Sell(Item item)
        {
            Save.Kevin.Wealth += item.Value;
        }

        Item Dupe(Item original)
        {
            //if (original is Creature)
            //{
            //    if (original is Enemy)
            //        return ((Enemy)original).Copy(HashID++);
            //    else if (original is NPC)
            //        return ((NPC)original).Copy(HashID++);
            //}
            //else if (original is Item)
            //{
            if (original is Weapon)
                return ((Weapon)original).Copy(HashID++);
            else if (original is Armor)
                return ((Armor)original).Copy(HashID++);
            else if (original is Armor)
                return ((Armor)original).Copy(HashID++);
            else if (original is Potion)
            {
                if (original is HealthPotion)
                    return ((HealthPotion)original).Copy(HashID++);
            }
            //}
            return null;
        }
    }
}
