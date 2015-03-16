using System;
using System.IO;
using System.Linq;
using System.Text;
using System.Collections.Generic;
using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Input;
using Microsoft.Xna.Framework.Graphics;

namespace Rougelike
{

    enum SettingIndex { DISPLAYWIDTH = 1, DISPLAYHEIGHT = 3, ASPECTRATIO = 5, FULLSCREEN = 7, BORDERLESS = 9, LETTERBOX = 11 };

    public partial class Rougelike
    {
        Texture2D dot;

        string[] Settings;

        string directory = (Directory.GetCurrentDirectory() + "\\settings.ini");

        // Stuff for letterbox and aspect ratios
        bool Widescreen;
        Texture2D Letterbox;
        //Texture2D Letterbox32;
        //Texture2D Letterbox43;
        //Texture2D Letterbox53;
        //Texture2D Letterbox54;
        //Texture2D Letterbox1610;

        Texture2D Cursor;

        bool WindowDragging;

        Vector2 WindowPosition;
        Vector2 DesktopMousePosition;

        // Stuff for scaling resolutions
        float Scale;
        Matrix ScaleMatrix;
        Vector2 OffsetVector;
        Vector2 ItemDraggingOffsetVector;

        void LoadSettings()
        {
            try
            {
                StreamReader streamreader = new StreamReader("settings.ini");
                string importedsettings = streamreader.ReadToEnd();
                Settings = importedsettings.Split('=', ';');
                for (int i = 0; i < Settings.Length; i++)
                {
                    Settings[i] = Settings[i].Trim();
                }
                streamreader.Close();
            }
            catch (Exception e)
            {
                Console.WriteLine("The file could not be read:");
                Console.WriteLine(e.Message);
            }

            // Set up our window
            Graphics.PreferredBackBufferWidth = Convert.ToInt32(Settings[1]);
            Graphics.PreferredBackBufferHeight = Convert.ToInt32(Settings[3]);
            Graphics.IsFullScreen = (Settings[(int)SettingIndex.FULLSCREEN] == "true");
            //Graphics.SynchronizeWithVerticalRetrace = false;
            //this.IsFixedTimeStep = false;

            // Go boarderless if we have to
            if (Settings[(int)SettingIndex.BORDERLESS] == "true")
            {
                IntPtr hWnd = Window.Handle;
                var control = System.Windows.Forms.Control.FromHandle(hWnd);
                var form = control.FindForm();
                form.FormBorderStyle = System.Windows.Forms.FormBorderStyle.None;
            }

            Scale = Convert.ToInt32((int)SettingIndex.DISPLAYHEIGHT) / 1280f;
            ScaleMatrix = Matrix.CreateScale(Scale, Scale, 1f);
            OffsetVector = Vector2.Zero;

            WindowPosition.X = Window.ClientBounds.Left;
            WindowPosition.Y = Window.ClientBounds.Top;

            //Letterbox32 = Content.Load<Texture2D>("textures/graphics/letterbox");
            //Letterbox43 = Content.Load<Texture2D>("textures/graphics/letterbox");
            //Letterbox53 = Content.Load<Texture2D>("textures/graphics/letterbox");
            //Letterbox54 = Content.Load<Texture2D>("textures/graphics/letterbox");
            //Letterbox1610 = Content.Load<Texture2D>("textures/graphics/letterbox");      

            Cursor = Content.Load<Texture2D>("textures/graphics/cursor");
        }

        void ApplyChanges()
        {
            if (Settings != null)
            {
                Graphics.PreferredBackBufferWidth = Convert.ToInt32(Settings[1]);
                Graphics.PreferredBackBufferHeight = Convert.ToInt32(Settings[3]);
                Scale = Convert.ToInt32(Settings[1]) / 1280f;
                ScaleMatrix = Matrix.CreateScale(Scale, Scale, 1f);
                int offset;
                switch (Settings[5])
                {
                    case "16:9":
                        Widescreen = false;
                        Letterbox = null;
                        OffsetVector = Vector2.Zero;
                        break;

                    case "3:2":
                        Widescreen = Settings[11] == "true";
                        //Letterbox = Letterbox32;
                        if (Widescreen)
                        {
                            offset = (int)Math.Round(67d);
                        }
                        else
                        {
                            offset = 0;
                        }
                        OffsetVector = new Vector2(0, offset);
                        break;

                    case "4:3":
                        Widescreen = Settings[11] == "true";
                        //Letterbox = Letterbox43;
                        if (Widescreen)
                        {
                            offset = (int)Math.Round(120d);
                        }
                        else
                        {
                            offset = 0;
                        }
                        OffsetVector = new Vector2(0, offset);
                        break;

                    case "5:3":
                        Widescreen = Settings[11] == "true";
                        //Letterbox = Letterbox53;
                        if (Widescreen)
                        {
                            offset = (int)Math.Round(24d);
                        }
                        else
                        {
                            offset = 0;
                        }
                        OffsetVector = new Vector2(0, offset);
                        break;

                    case "5:4":
                        Widescreen = Settings[11] == "true";
                        //Letterbox = Letterbox54;
                        if (Widescreen)
                        {
                            offset = (int)Math.Round(152d);
                        }
                        else
                        {
                            offset = 0;
                        }
                        OffsetVector = new Vector2(0, offset);
                        break;

                    case "16:10":
                        Widescreen = Settings[11] == "true";
                        //Letterbox = Letterbox1610;
                        if (Widescreen)
                        {
                            offset = (int)Math.Round(40d);
                        }
                        else
                        {
                            offset = 0;
                        }
                        OffsetVector = new Vector2(0, offset);
                        break;
                }

                Graphics.IsFullScreen = (Settings[7] == "true");

                if (Settings[9] == "true")
                {
                    IntPtr hWnd = Window.Handle;
                    var control = System.Windows.Forms.Control.FromHandle(hWnd);
                    var form = control.FindForm();
                    form.FormBorderStyle = System.Windows.Forms.FormBorderStyle.None;
                }
                else
                {
                    IntPtr hWnd = Window.Handle;
                    var control = System.Windows.Forms.Control.FromHandle(hWnd);
                    var form = control.FindForm();
                    form.FormBorderStyle = System.Windows.Forms.FormBorderStyle.FixedSingle;
                }

                Graphics.ApplyChanges();

                string text = "DisplayWidth = " + Settings[1] + ";\n";
                text += "DisplayHeight = " + Settings[3] + ";\n";
                text += "AspectRatio = " + Settings[5] + ";\n";
                text += "Fullscreen = " + Settings[7] + ";\n";
                text += "Borderless = " + Settings[9] + ";\n";
                text += "Letterbox = " + Settings[11] + ";";

                // WriteAllText creates a file, writes the specified string to the file, 
                // and then closes the file.
                System.IO.File.WriteAllText(@directory, text);
            }
        }

        bool MouseOver(Button button)
        {
            if (TemporaryItem != null)
            {
                if (ScaledMousePosition.X + ItemDraggingOffsetVector.X >= button.Position.X - button.Origin.X && ScaledMousePosition.X + ItemDraggingOffsetVector.X <= button.Position.X + button.Origin.X)
                {
                    if (ScaledMousePosition.Y + ItemDraggingOffsetVector.Y >= OffsetVector.Y + button.Position.Y - button.Origin.Y && ScaledMousePosition.Y + ItemDraggingOffsetVector.Y <= OffsetVector.Y + button.Position.Y + button.Origin.Y)
                    {
                        return true;
                    }
                }
            }
            else
            {
                if (ScaledMousePosition.X >= button.Position.X - button.Origin.X && ScaledMousePosition.X <= button.Position.X + button.Origin.X)
                {
                    if (ScaledMousePosition.Y >= OffsetVector.Y + button.Position.Y - button.Origin.Y && ScaledMousePosition.Y <= OffsetVector.Y + button.Position.Y + button.Origin.Y)
                    {
                        return true;
                    }
                }
            }
            return false;
        }

        bool MouseOver(Button button, Vector2 origin)
        {
            if (ScaledMousePosition.X >= button.Position.X - origin.X && ScaledMousePosition.X <= button.Position.X + origin.X)
            {
                if (ScaledMousePosition.Y >= OffsetVector.Y + button.Position.Y - origin.Y && ScaledMousePosition.Y <= OffsetVector.Y + button.Position.Y + origin.Y)
                {
                    return true;
                }
            }
            return false;
        }

        Vector2 MouseOver(ItemButton button)
        {
            if (TemporaryItem != null)
            {
                if (ScaledMousePosition.X + ItemDraggingOffsetVector.X + 32 >= button.Position.X - button.Origin.X && ScaledMousePosition.X + ItemDraggingOffsetVector.X + 32 <= button.Position.X + button.Origin.X)
                {
                    if (ScaledMousePosition.Y + ItemDraggingOffsetVector.Y + 32 >= OffsetVector.Y + button.Position.Y - button.Origin.Y && ScaledMousePosition.Y + ItemDraggingOffsetVector.Y + 32 <= OffsetVector.Y + button.Position.Y + button.Origin.Y)
                    {
                        return button.Position - ScaledMousePosition - button.Origin;
                    }
                }
            }
            else
            {
                if (ScaledMousePosition.X >= button.Position.X - button.Origin.X && ScaledMousePosition.X <= button.Position.X + button.Origin.X)
                {
                    if (ScaledMousePosition.Y >= OffsetVector.Y + button.Position.Y - button.Origin.Y && ScaledMousePosition.Y <= OffsetVector.Y + button.Position.Y + button.Origin.Y)
                    {
                        return button.Position - ScaledMousePosition - button.Origin;
                    }
                }
            }
            return Vector2.Zero;
        }

        Vector2 MouseOver(Description description)
        {
            if (ScaledMousePosition.X >= description.Position.X && ScaledMousePosition.X <= description.Position.X + description.Bounds.X)
            {
                if (ScaledMousePosition.Y >= OffsetVector.Y + description.Position.Y && ScaledMousePosition.Y <= OffsetVector.Y + description.Position.Y + description.Bounds.Y)
                {
                    return description.Position - ScaledMousePosition;
                }
            }
            return Vector2.Zero;
        }

        bool MouseOver(Entity entity)
        {
            return (MouseOver((int)entity.Position.X, (int)entity.Position.Y));
        }

        bool MouseOver(int i, int j)
        {
            Vector2 tileposition = OffsetVector + new Vector2(i * 66, j * 66) + new Vector2(64, 64);
            Vector2 origin = new Vector2(32, 32);
            if (ScaledMousePosition.X > tileposition.X - origin.X && ScaledMousePosition.X < tileposition.X + origin.X)
            {
                if (ScaledMousePosition.Y > OffsetVector.Y + tileposition.Y - origin.Y && ScaledMousePosition.Y < OffsetVector.Y + tileposition.Y + origin.Y)
                {
                    return true;
                }
            }
            return false;
        }

        bool MouseOverExitButton(Description description)
        {
            if (ScaledMousePosition.X > description.Position.X + 208 && ScaledMousePosition.X < description.Position.X + 226)
            {
                if (ScaledMousePosition.Y > OffsetVector.Y + description.Position.Y + 2 && ScaledMousePosition.Y < OffsetVector.Y + description.Position.Y + 16)
                {
                    return true;
                }
            }
            return false;
        }

        bool Click()
        {
            return CurrentMouseState.LeftButton == ButtonState.Pressed && LastMouseState.LeftButton == ButtonState.Released;
        }

        bool Hold()
        {
            return CurrentMouseState.LeftButton == ButtonState.Pressed && LastMouseState.LeftButton == ButtonState.Pressed;
        }

        bool Released()
        {
            return CurrentMouseState.LeftButton == ButtonState.Released && LastMouseState.LeftButton == ButtonState.Pressed;
        }

        bool Pressed(Keys key)
        {
            return CurrentKeyboard.IsKeyDown(key) && LastKeyboard.IsKeyUp(key);
        }

        bool Released(Keys key)
        {
            return CurrentKeyboard.IsKeyUp(key) && LastKeyboard.IsKeyDown(key);
        }

        bool RightReleased()
        {
            return CurrentMouseState.RightButton == ButtonState.Released && LastMouseState.RightButton == ButtonState.Pressed;
        }

        bool RightClick()
        {
            return CurrentMouseState.RightButton == ButtonState.Pressed && LastMouseState.RightButton == ButtonState.Released;
        }

        void CheckWindowDragging()
        {
            if (CurrentMouseState.LeftButton == ButtonState.Pressed && LastMouseState.LeftButton == ButtonState.Pressed && Settings[(int)SettingIndex.BORDERLESS] == "true")
            {
                System.Windows.Forms.Control form = System.Windows.Forms.Control.FromHandle(this.Window.Handle);
                if (WindowDragging)
                {
                    form.Location = new System.Drawing.Point((int)(WindowPosition.X + System.Windows.Forms.Control.MousePosition.X - DesktopMousePosition.X), (int)(WindowPosition.Y + System.Windows.Forms.Control.MousePosition.Y - DesktopMousePosition.Y));
                }
            }
            else
            {
                WindowDragging = false;
            }

            if (!WindowDragging)
            {
                if (ScaledMousePosition.Y <= 30 * Scale)
                {
                    if (CurrentMouseState.LeftButton == ButtonState.Pressed && LastMouseState.LeftButton == ButtonState.Released)
                    {
                        WindowPosition.X = Window.ClientBounds.Left;
                        WindowPosition.Y = Window.ClientBounds.Top;
                        DesktopMousePosition.X = System.Windows.Forms.Control.MousePosition.X;
                        DesktopMousePosition.Y = System.Windows.Forms.Control.MousePosition.Y;
                        WindowDragging = true;
                    }
                }
            }
        }

        void DrawCursor()
        {
            if (TemporaryItem != null)
                Draw(TemporaryItem.Sprite, ScaledMousePosition + ItemDraggingOffsetVector);
            else
                Draw(Cursor, ScaledMousePosition, new Vector2(3, 9));
        }
    }
}
