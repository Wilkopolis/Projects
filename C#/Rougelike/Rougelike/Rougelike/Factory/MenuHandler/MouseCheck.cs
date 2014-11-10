using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Rougelike.Util;
using Microsoft.Xna.Framework.Input;
using Rougelike.Types;
using Microsoft.Xna.Framework;

namespace Rougelike.Factory
{
    partial class MenuHandler
    {
        public Button CheckButtons(Rougelike game, MouseState thismouse, MouseState lastmouse, Vector2 mousepos, System.Windows.Forms.Form form)
        {
            Button result = null;

            // Check all the buttons by their Hotkeys
            KeyboardState keyboard = Keyboard.GetState();
            foreach (Button b in GetButtonList(game.GameState))
            {
                if (keyboard.IsKeyDown(b.Hotkey) && lastkeyboard.IsKeyUp(b.Hotkey))
                {
                    b.WasPressed = true;
                }
                else if (keyboard.IsKeyUp(b.Hotkey) && lastkeyboard.IsKeyDown(b.Hotkey))
                {
                    if (b.WasPressed)
                    {
                        HandleButton(game, b);
                    }
                    b.WasPressed = false;
                }
            }
            lastkeyboard = keyboard;

            // Mouse interactions with buttons
            foreach (Button b in GetButtonList(game.GameState))
            {
                if (IsMouseOverB(mousepos, b))
                {
                    result = b;
                    // First Click
                    if (thismouse.LeftButton == ButtonState.Pressed && lastmouse.LeftButton == ButtonState.Released)
                    {
                        b.WasPressed = true;
                    }
                    // Mouse release
                    if (thismouse.LeftButton == ButtonState.Released)
                    {
                        if (b.WasPressed)
                        {
                            HandleButton(game, b);
                        }
                        b.WasPressed = false;
                    }
                }
            }

            // Window Dragging
            if (thismouse.LeftButton == ButtonState.Pressed && lastmouse.LeftButton == ButtonState.Pressed && settings[(int)Settings.BORDERLESS] == "true")
            {
                if (dragging)
                {
                    form.Location = new System.Drawing.Point((int)(windowpos.X + System.Windows.Forms.Control.MousePosition.X - mousesnap.X), (int)(windowpos.Y + System.Windows.Forms.Control.MousePosition.Y - mousesnap.Y));
                }
            }
            else
            {
                dragging = false;
            }
            if (!dragging)
            {
                if (mousepos.Y <= 30 * scale)
                {
                    if (thismouse.LeftButton == ButtonState.Pressed && lastmouse.LeftButton == ButtonState.Released)
                    {
                        windowpos.X = game.Window.ClientBounds.Left;
                        windowpos.Y = game.Window.ClientBounds.Top;
                        mousesnap.X = System.Windows.Forms.Control.MousePosition.X;
                        mousesnap.Y = System.Windows.Forms.Control.MousePosition.Y;
                        dragging = true;
                    }
                }
            }

            if (game.GameState == Rougelike.State.GAME)
            {
                //MOUSE RELEASE
                if (thismouse.LeftButton == ButtonState.Released && lastmouse.LeftButton == ButtonState.Pressed)
                {
                    // Inventory release
                    #region
                    if (itemdragging)
                    {
                        itemdragging = false;
                        bool SuccessfulRelease = false;
                        Cursor = tempcursor;
                        foreach (InvButton b in game.Save.Kevin.Equipment.Items)
                        {
                            if (IsMouseOverB(mousepos, b))
                            {
                                result = b;
                                if (b.Slot == tempitem.Type || b.Slot == Item.ItemType.INVENTORY)
                                {
                                    tempinvbutton.Item = b.Item;
                                    b.Item = tempitem;
                                    // Set cursor back
                                    SuccessfulRelease = true;
                                }
                            }
                        }
                        if (!SuccessfulRelease)
                        {
                            tempinvbutton.Item = tempitem;
                        }
                    }
                    #endregion
                    // Description release
                    #region
                    foreach (Description D in DescriptionList)
                    {
                        if (D.Drag)
                        {
                            D.Drag = false;
                            return result;
                        }
                    }
                    #endregion
                }

                //MOUSE CLICK
                if (thismouse.LeftButton == ButtonState.Pressed && lastmouse.LeftButton == ButtonState.Released)
                {
                    // Inventory grab
                    #region
                    foreach (InvButton b in game.Save.Kevin.Equipment.Items)
                    {
                        if (IsMouseOverB(mousepos, b))
                        {
                            result = b;
                            if (b.Item != null)
                            {
                                // Remove any description
                                DescriptionList.Remove(Description.Contains(DescriptionList, new Description(b.Item, true, b.Position)));

                                itemdragging = true;
                                tempinvbutton = b;
                                tempitem = b.Item;

                                // Set the cursor
                                tempcursor = Cursor;
                                Cursor = b.Item.Sprite;
                                b.Item = null;
                            }
                        }
                    }
                    #endregion

                    // Description Exit Button
                    #region
                    Description remove = null;
                    // Mouse interactions with descriptions
                    foreach (Description D in DescriptionList)
                    {
                        if (IsMouseOverD(mousepos, D) && !D.Drag)
                        {
                            if (IsMouseOverDE(mousepos, D))
                            {
                                remove = D;
                            }
                            else
                            {
                                D.Drag = true;
                                D.MouseSnap = mousepos;
                                D.PosSnap = D.Position;
                                return result;
                            }
                        }
                    }
                    if (remove != null)
                    {
                        DescriptionList.Remove(remove);
                        return result;
                    }
                    #endregion

                    Move(mousepos, game.Save.Kevin, game.Save.GetRoom());
                    Attack(mousepos, game.Save.Kevin, game.Save.GetRoom());
                }

                //MOUSE HOLD DOWN
                if (thismouse.LeftButton == ButtonState.Pressed && lastmouse.LeftButton == ButtonState.Pressed)
                {
                    foreach (Description D in DescriptionList)
                    {
                        if (D.Drag)
                        {
                            D.Position = D.PosSnap + (mousepos - D.MouseSnap);
                            if (D.Position.X < 0)
                                D.Position.X = 0;
                            if (D.Position.Y < 0)
                                D.Position.Y = 0;
                            if (D.Position.X > 1280 - D.Bounds.X)
                                D.Position.X = 1280 - D.Bounds.X;
                            if (D.Position.Y > 720 - D.Bounds.Y)
                                D.Position.Y = 720 - D.Bounds.Y;
                        }
                    }
                }

                // RIGHT CLICK
                if (thismouse.RightButton == ButtonState.Released && lastmouse.RightButton == ButtonState.Pressed)
                {
                    Examine(game, mousepos);
                }

                // HOVER
                foreach (InvButton B in game.Save.Kevin.Equipment.Items)
                {
                    if (B.Item != null)
                    {
                        Description D = new Description(B.Item, true, B.Position);
                        Description copy = Description.Contains(DescriptionList, D);
                        if (IsMouseOverB(mousepos, B))
                        {
                            if (copy == null)
                            {
                                DescriptionList.AddLast(D);
                            }
                        }
                        else
                            DescriptionList.Remove(copy);
                    }
                }
            }

            return result;
        }


        /*  WHEN
         *  We right clicked
         */ 
        private void Examine(Rougelike game, Vector2 mouse)
        {
            foreach (Entity E in game.Save.GetRoom().EntityList)
            {
                if (IsMouseOverT(mouse, (int)E.Position.X, (int)E.Position.Y, E.Size))
                {
                    Description result = new Description(E, false, E.Position);

                    Description copy = Description.Contains(DescriptionList, result);
                    if (copy == null)
                    {
                        DescriptionList.AddLast(result);
                    }
                    else
                        DescriptionList.Remove(copy);
                }
            }

            foreach (InvButton B in game.Save.Kevin.Equipment.Items)
            {
                if (IsMouseOverB(mouse, B) && B.Item != null)
                {
                    if (B.Item is Consumable)
                    {
                        if (game.Save.Kevin.Equipment.RightClick(B, game.Save.Kevin))
                        {
                            // Remove any description
                            DescriptionList.Remove(Description.Contains(DescriptionList, new Description(B.Item, true, B.Position)));
                            B.Item = null;
                            continue;
                        }
                    }
                    Description result = new Description(B.Item, true, B.Position);

                    Description copy = Description.Contains(DescriptionList, result);
                    if (copy == null)
                    {
                        DescriptionList.AddLast(result);
                    }
                    else
                        DescriptionList.Remove(copy);
                }
            }
        }

        private bool IsMouseOverB(Vector2 mouse, Button b)
        {
            if (mouse.X >= b.Position.X - b.Origin.X && mouse.X <= b.Position.X + b.Origin.X)
            {
                if (mouse.Y >= OffsetVector.Y + b.Position.Y - b.Origin.Y && mouse.Y <= OffsetVector.Y + b.Position.Y + b.Origin.Y)
                {
                    return true;
                }
            }
            return false;
        }

        public bool IsMouseOverM(Vector2 mouse, Movement movement)
        {
            Vector2 mpos = new Vector2(54, 54) + new Vector2(movement.X, movement.Y) * 66;
            if (mouse.X >= mpos.X - movement.Origin.X && mouse.X <= mpos.X + movement.Origin.X)
            {
                if (mouse.Y >= OffsetVector.Y + mpos.Y - movement.Origin.Y && mouse.Y <= OffsetVector.Y + mpos.Y + movement.Origin.Y)
                {
                    return true;
                }
            }
            return false;
        }

        public bool IsMouseOverT(Vector2 mouse, int x, int y, Vector2 size)
        {
            Vector2 tilepos = OffsetVector + new Vector2(x * 66, y * 66) + new Vector2(64, 64) * size;
            Vector2 Origin = new Vector2(34, 34);
            if (mouse.X >= tilepos.X - Origin.X && mouse.X <= tilepos.X + Origin.X)
            {
                if (mouse.Y >= OffsetVector.Y + tilepos.Y - Origin.Y && mouse.Y <= OffsetVector.Y + tilepos.Y + Origin.Y)
                {
                    return true;
                }
            }
            return false;
        }

        private bool IsMouseOverD(Vector2 mouse, Description d)
        {
            if (mouse.X >= d.Position.X && mouse.X <= d.Position.X + d.Bounds.X)
            {
                if (mouse.Y >= OffsetVector.Y + d.Position.Y && mouse.Y <= OffsetVector.Y + d.Position.Y + d.Bounds.Y)
                {
                    return true;
                }
            }
            return false;
        }

        private bool IsMouseOverDE(Vector2 mouse, Description d)
        {
            if (mouse.X >= d.Position.X + 212 && mouse.X <= d.Position.X + d.Bounds.X - 2)
            {
                if (mouse.Y >= OffsetVector.Y + d.Position.Y + 2 && mouse.Y <= OffsetVector.Y + d.Position.Y + 20)
                {
                    return true;
                }
            }
            return false;
        }
    }
}
