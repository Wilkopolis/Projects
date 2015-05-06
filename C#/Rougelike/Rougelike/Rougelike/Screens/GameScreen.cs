using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Input;
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
        Description HoverDescription;
        List<Button> GameButtons;

        Texture2D CreatureHealthBarOutline;
        Texture2D CreatureHealthBarFill;
        Texture2D PlayerSprite;
        Texture2D MovementSprite;
        Texture2D DesciptionBack;
        Texture2D DesciptionExit;
        Texture2D DescriptionSourceBackdrop;
        Texture2D HealthBarUI;
        Texture2D APBarUI;
        Texture2D UIOutline;
        Texture2D CurrentMiniRoom;
        Texture2D VisitedMiniRoom;
        Texture2D UnVisitedMiniRoom;
        Texture2D MiniDoorVertrical;
        Texture2D MiniDoorHorizontal;

        bool GameInitialized;

        void InitializeGame(Class playerclass)
        {
            if (!GameInitialized)
            {
                DescriptionList = new List<Description>();
                GameButtons = new List<Button>();

                GameBackground = Content.Load<Texture2D>("textures/game/background");
                CreatureHealthBarFill = Content.Load<Texture2D>("textures/game/ui/creaturehealthbar");
                CreatureHealthBarOutline = Content.Load<Texture2D>("textures/game/ui/creaturehealthbaroutline");
                PlayerSprite = Content.Load<Texture2D>("textures/game/creatures/player");
                MovementSprite = Content.Load<Texture2D>("textures/game/ui/movement");
                DesciptionBack = Content.Load<Texture2D>("textures/game/descriptor/back");
                DesciptionExit = Content.Load<Texture2D>("textures/game/descriptor/exit");
                DescriptionSourceBackdrop = Content.Load<Texture2D>("textures/game/descriptor/backdrop");
                HealthBarUI = Content.Load<Texture2D>("textures/game/ui/healthbar");
                UIOutline = Content.Load<Texture2D>("textures/game/ui/healthbaroutline");
                APBarUI = Content.Load<Texture2D>("textures/game/ui/apbar");
                CurrentMiniRoom = Content.Load<Texture2D>("textures/game/minimap/currentminiroom");
                VisitedMiniRoom = Content.Load<Texture2D>("textures/game/minimap/visited");
                UnVisitedMiniRoom = Content.Load<Texture2D>("textures/game/minimap/unvisited");
                MiniItem = Content.Load<Texture2D>("textures/editor/template/item");
                MiniDoor = Content.Load<Texture2D>("textures/editor/template/door");
                MiniSolid = Content.Load<Texture2D>("textures/editor/template/solid");
                MiniEnemy = Content.Load<Texture2D>("textures/editor/template/enemy");
                MiniPrize = Content.Load<Texture2D>("textures/editor/template/prize");
                MiniDoorVertrical = Content.Load<Texture2D>("textures/game/minimap/minidoor");
                MiniDoorHorizontal = Content.Load<Texture2D>("textures/game/minimap/minidoorh");

                Button endturn = new Button("endturn", Keys.Space);
                GameButtons.Add(endturn);

                Button enter = new Button("interact", Keys.D);
                GameButtons.Add(enter);

                Button breaky = new Button("break", Keys.P);
                GameButtons.Add(breaky);

                Button quit = new Button("quit", Keys.F10);
                GameButtons.Add(quit);

                InitializeGenerator(playerclass);
                Initialize4XButtons(playerclass);
                InitializeSkillButtons(playerclass);
                InitializeNPCButtons();
                GameInitialized = true;
            }

            NewGame(playerclass);

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
                                if (TemporaryItem.Type == TemporaryItemButton.Type)
                                    ApplyEquipEffects(TemporaryItem, false);
                                return true;
                            }
                        }
                    }
                }
            }
            if (Trading)
            {
                foreach (ShopButton button in ShopInventory)
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
            else if (InteractingWithNPC())
            {
                if (ItemHolder.Item != null)
                {
                    Vector2 offset = MouseOver(ItemHolder);
                    if (offset != Vector2.Zero)
                    {
                        if (Click())
                            ItemHolder.WasClicked = true;
                        if (Hold() && ItemHolder.WasClicked)
                        {
                            if (TemporaryItem == null)
                            {
                                ItemDraggingOffsetVector = offset;
                                TemporaryItem = Dupe(ItemHolder.Item);
                                TemporaryItemButton = ItemHolder;
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
                                            ((Stackable)button.Item).StackSize++;
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
                                    if (!(TemporaryItemButton is ShopButton))
                                    {
                                        Item switcherino = button.Item;
                                        TemporaryItemButton.Item = switcherino;
                                    }
                                }
                                else
                                {
                                    Save.Kevin.PickUp(button.Item);
                                }
                                button.Item = TemporaryItem;
                                TemporaryItem = null;
                                TemporaryItemButton = null;
                                ApplyEquipEffects(button.Item, true);
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
                    else if (InteractingWithNPC() && MouseOver(ItemHolder) != Vector2.Zero)
                    {
                        ItemHolder.Item = TemporaryItem;
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

        bool CheckMouseHover()
        {
            foreach (InventoryButton button in Save.Kevin.Equipment.Items)
            {
                if (button.Item != null && MouseOver(button) != Vector2.Zero)
                {
                    if (HoverDescription == null)
                    {
                        HoverDescription = new Description(button);
                    }
                    return true;
                }
            }
            if (InteractingWithNPC())
            {
                if (Trading)
                {
                    foreach (ShopButton button in ShopInventory)
                    {
                        if (button.Item != null && MouseOver(button) != Vector2.Zero)
                        {
                            if (HoverDescription == null)
                            {
                                HoverDescription = new Description(button);
                            }
                            return true;
                        }
                    }
                }
                else
                {
                    if (ItemHolder.Item != null && MouseOver(ItemHolder) != Vector2.Zero)
                    {
                        if (HoverDescription == null)
                        {
                            HoverDescription = new Description(ItemHolder);
                        }
                        return true;
                    }
                }
            }
            HoverDescription = null;
            return false;
        }

        void HandleGameInput(Button button)
        {
            Room CurrentRoom = Save.GetRoom();
            if (button is Attack && DescriptionList.Count == 0 && !MegaMapMode && !InteractingWithNPC())
                UpdateOptions = DoAttack((Attack)button);
            else if (button is Movement && DescriptionList.Count == 0 && !MegaMapMode && !InteractingWithNPC())
                UpdateOptions = DoMovement((Movement)button);
            else
            {
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
                                Interact(GetAdjacentNPC());
                            }
                            PickUp();
                        }
                        break;

                    case "endturn":
                        if (!MegaMapMode)
                        {
                            EndTurn();
                        }
                        break;

                    case "quit":
                        Quit();
                        break;

                    case "break":
                        //Pause to debug
                        break;

                    case "4x":
                        if (!InteractingWithNPC())
                            MegaMapMode = !MegaMapMode;
                        break;
                }
            }
        }

        bool RightClick(InventoryButton button)
        {
            // IF ITS A CONSUMABLE
            if (button.Item is Consumable)
            {
                ((Consumable)button.Item).Use(Save.Kevin);
                if (((Stackable)button.Item).StackSize <= 0)
                {
                    button.Item = null;
                }
            }
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

            if (InteractingWithNPC())
                DrawNPCScreen();

            DrawDescriptions();
        }

        void HandleRightClick()
        {
            Description descriptor = null;
            if (!InteractingWithNPC() && !MegaMapMode)
            {
                foreach (Entity entity in Save.GetRoom().Entities)
                {
                    if (MouseOver(entity))
                    {
                        descriptor = new Description(entity);
                    }
                }
            }
            else if (InteractingWithNPC())
            {
                if (ItemHolder.Item != null && MouseOver(ItemHolder) != Vector2.Zero)
                {
                    descriptor = new Description(ItemHolder.Item);
                }
            }
            foreach (InventoryButton button in Save.Kevin.Equipment.Items)
            {
                if (button.Item != null && MouseOver(button) != Vector2.Zero)
                {
                    if ((button.Item is Consumable))
                        RightClick(button);
                    else
                        descriptor = new Description(button);
                }
            }
            //Add or remove description
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
                Save.GetFloor().Position.X -= 1;
                if (!Save.GetRoom().Visited)
                    newroom = true;
                Save.GetRoom().Visited = true;
                for (int i = 1; i < 8; i++)
                {
                    if (Save.GetRoom().Tiles[14, i].Door)
                    {
                        Save.Kevin.Position = new Vector2I(14, i);
                    }
                }
            }
            else if (Save.Kevin.Position.X == 14)
            {
                Save.GetFloor().Position.X += 1;
                if (!Save.GetRoom().Visited)
                    newroom = true;
                Save.GetRoom().Visited = true;
                for (int i = 1; i < 8; i++)
                {
                    if (Save.GetRoom().Tiles[0, i].Door)
                    {
                        Save.Kevin.Position = new Vector2I(0, i);
                    }
                }
            }
            else if (Save.Kevin.Position.Y == 0)
            {
                Save.GetFloor().Position.Y -= 1;
                if (!Save.GetRoom().Visited)
                    newroom = true;
                Save.GetRoom().Visited = true;
                for (int i = 1; i < 13; i++)
                {
                    if (Save.GetRoom().Tiles[i, 9].Door)
                    {
                        Save.Kevin.Position = new Vector2I(i, 9);
                    }
                }
            }
            else if (Save.Kevin.Position.Y == 9)
            {
                Save.GetFloor().Position.Y += 1;
                for (int i = 1; i < 13; i++)
                {
                    if (Save.GetRoom().Tiles[i, 0].Door)
                    {
                        Save.Kevin.Position = new Vector2I(i, 0);
                    }
                }
            }
            if (!Save.GetRoom().Visited)
                newroom = true;
            Save.GetRoom().Visited = true;
            Save.GetRoom().Known = true;
            Save.GetRoom().AddToRoom(Save.Kevin);
            UpdateOptions = true;
            if (newroom)
                Do4XTurn();
        }

        void ChangeFloors()
        {
            Save.GetRoom().Remove(Save.Kevin);
            Save.GoDown();
            Save.GetRoom().Visited = true;
            Save.GetRoom().Known = true;
            for (int i = 0; i < 15; i++)
            {
                for (int j = 0; j < 10; j++)
                {
                    if (Save.GetRoom().Tiles[i, j].Steps == Stairs.UP)
                    {
                        Save.Kevin.Position = new Vector2I(i, j);
                    }
                }
            }
            Save.GetRoom().AddToRoom(Save.Kevin);
            Save.GetRoom().PermaWorked = true;
            Save.GetRoom().Worked = true;
            ChangedFloors = true;
            UpdateOptions = true;
            GoldRoomChosen = false;
            Do4XTurn();
        }

        void EndTurn()
        {
            DoEnemyTurns();
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

        bool OnDoor()
        {
            return Save.GetRoom().Tiles[Save.Kevin.Position.X, Save.Kevin.Position.Y].Door;
        }

        bool OnStairs()
        {
            return Save.GetRoom().Tiles[Save.Kevin.Position.X, Save.Kevin.Position.Y].Steps == Stairs.DOWN;
        }

        void PickUp()
        {
            foreach (Item item in Save.GetRoom().Entities.FindAll(item => item is Item))
            {
                if (Save.Kevin.Equipment.GetInventoryCount() < 12)
                {
                    Save.Kevin.PickUp(item);
                    Save.GetRoom().Remove(item);
                    Save.GetRoom().UpdateTiles();
                    UpdatePlayerOptions();
                }
            }
        }

        void Interact(NPC npc)
        {
            switch (npc.Type)
            {
                case NPCType.ENCHANTER:
                    Enchanting = !Enchanting;
                    break;

                case NPCType.MERCHANT:
                    Trading = !Trading;
                    break;

                case NPCType.ALCHEMIST:
                    Alcheming = !Alcheming;
                    break;

                case NPCType.MEDIC:
                    if (Save.Kevin.Wealth >= 1)
                    {
                        Save.Kevin.Wealth--;
                        Save.Kevin.HP++;
                        if (Save.Kevin.HP >= Save.Kevin.MaxHP)
                            Save.Kevin.HP = Save.Kevin.MaxHP;
                        npc.Uses--;
                        if (npc.Uses <= 0)
                            Save.GetRoom().Entities.Remove(npc);
                    }
                    break;

                case NPCType.GAMBLER:
                    if (Save.Kevin.Wealth >= 1)
                    {
                        Save.Kevin.Wealth--;
                        Gamble();
                        npc.Uses--;
                        if (npc.Uses <= 0)
                            Save.GetRoom().Entities.Remove(npc);
                    }
                    break;

                case NPCType.PHARMACIST:
                    if (!Save.Kevin.InventoryFull() && Save.Kevin.Wealth >= 1)
                    {
                        Save.Kevin.Wealth--;
                        Save.Kevin.PickUp(MasterPill.Copy(HashID++, Random, PlayerHasSkill("prescription"), PlayerHasSkill("fda")));
                        npc.Uses--;
                        if (npc.Uses <= 0)
                            Save.GetRoom().Entities.Remove(npc);
                    }
                    break;
            }
        }

        bool InteractingWithNPC()
        {
            return Trading || Alcheming || Enchanting;
        }

        void Sell(Item item)
        {
            Save.Kevin.Wealth += item.Value;
        }

        Item Dupe(Item original)
        {
            if (original is Weapon)
                return ((Weapon)original).Copy(HashID++);
            else if (original is Armor)
                return ((Armor)original).Copy(HashID++);
            else if (original is Armor)
                return ((Armor)original).Copy(HashID++);
            else if (original is HealthPotion)
                return ((HealthPotion)original).Copy(HashID++);
            else if (original is Pill)                
                return ((Pill)original).Copy(HashID++, Random, PlayerHasSkill("prescription"), PlayerHasSkill("fda"));
            return null;
        }

        void UsePill(Pill pill)
        {
            pill.Use(Save.Kevin);
            switch (pill.Drug)
            {
                case DrugEffect.Uppers:
                    Save.Kevin.MaxAP++;
                    Save.Kevin.AP++;
                    break;

                //Prescription
                case DrugEffect.Uppers2:
                    Save.Kevin.MaxAP += 2;
                    Save.Kevin.AP = Save.Kevin.MaxAP;
                    break;

                case DrugEffect.Painkiller1:
                    Save.Kevin.Buffs.Add(Effect.ABSORB);
                    break;

                //Prescription
                case DrugEffect.Painkiller2:
                    Save.Kevin.Buffs.Add(Effect.ABSORB);
                    Save.Kevin.Buffs.Add(Effect.REGEN);
                    break;

                case DrugEffect.Steroids:
                    Save.Kevin.Buffs.Add(Effect.DMGUP);
                    break;

                //Prescription
                case DrugEffect.Steroids2:
                    Save.Kevin.Buffs.Add(Effect.DMGUP);
                    Save.Kevin.Buffs.Add(Effect.CRITUP);
                    break;

                case DrugEffect.Vitamins1:
                    Save.Kevin.MaxHP++;
                    Save.Kevin.HP++;
                    break;

                //Prescription
                case DrugEffect.Vitamins2:
                    Save.Kevin.MaxHP += 2;
                    Save.Kevin.HP = Save.Kevin.MaxHP;
                    break;

                //Prescription
                case DrugEffect.Vitamins3:
                    Save.Kevin.MaxHP += 2;
                    Save.Kevin.HP++;
                    Save.Kevin.MaxAP++;
                    break;

                case DrugEffect.Expired1:
                    Save.Kevin.HP--;
                    break;

                //Prescription
                case DrugEffect.Expired2:
                    Save.Kevin.Buffs.Add(Effect.DMGDOWN);
                    break;

                //Prescription
                case DrugEffect.Expired3:
                    Save.Kevin.MaxHP--;
                    Save.Kevin.HP = Save.Kevin.MaxHP;
                    break;

                //Prescription
                case DrugEffect.Knowledge:
                    foreach (Room room in Save.GetFloor().Rooms)
                    {

                    }
                    break;

                case DrugEffect.Bad1:
                    Save.Kevin.Wealth -= 5;
                    if (Save.Kevin.Wealth < 0)
                        Save.Kevin.Wealth = 0;
                    break;

                //case DrugEffect.Bad1:
                //    Save.Kevin.Wealth -= 5;
                //    if (Save.Kevin.Wealth < 0)
                //        Save.Kevin.Wealth = 0;
                //    break;
            }
        }
    }
}
