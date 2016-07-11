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

        string[] settings;

        string directory = (Directory.GetCurrentDirectory() + "\\settings.ini");

        // Stuff for letterbox and aspect ratios
        bool widescreen;
        Texture2D letterbox;
        //Texture2D Letterbox32;
        //Texture2D Letterbox43;
        //Texture2D Letterbox53;
        //Texture2D Letterbox54;
        //Texture2D Letterbox1610;

        Texture2D cursor;

        bool windowDragging;

        Vector2 windowPosition;
        Vector2 desktopMousePosition;

        // Stuff for scaling resolutions
        float scale;
        Matrix scaleMatrix;
        Vector2 offsetVector;

        void LoadSettings()
        {
            try
            {
                StreamReader streamreader = new StreamReader("settings.ini");
                string importedsettings = streamreader.ReadToEnd();
                settings = importedsettings.Split('=', ';');
                for (int i = 0; i < settings.Length; i++)
                {
                    settings[i] = settings[i].Trim();
                }
                streamreader.Close();
            }
            catch (Exception e)
            {
                Console.WriteLine("The file could not be read:");
                Console.WriteLine(e.Message);
            }

            // Set up our window
            graphics.PreferredBackBufferWidth = Convert.ToInt32(settings[1]);
            graphics.PreferredBackBufferHeight = Convert.ToInt32(settings[3]);
            graphics.IsFullScreen = (settings[(int)SettingIndex.FULLSCREEN] == "true");
            //Graphics.SynchronizeWithVerticalRetrace = false;
            //this.IsFixedTimeStep = false;

            // Go boarderless if we have to
            if (settings[(int)SettingIndex.BORDERLESS] == "true")
            {
                IntPtr hWnd = Window.Handle;
                var control = System.Windows.Forms.Control.FromHandle(hWnd);
                var form = control.FindForm();
                form.FormBorderStyle = System.Windows.Forms.FormBorderStyle.None;
            }

            scale = Convert.ToInt32((int)SettingIndex.DISPLAYHEIGHT) / 1280f;
            scaleMatrix = Matrix.CreateScale(scale, scale, 1f);
            offsetVector = Vector2.Zero;

            windowPosition.X = Window.ClientBounds.Left;
            windowPosition.Y = Window.ClientBounds.Top;

            //Letterbox32 = Content.Load<Texture2D>("textures/graphics/letterbox");
            //Letterbox43 = Content.Load<Texture2D>("textures/graphics/letterbox");
            //Letterbox53 = Content.Load<Texture2D>("textures/graphics/letterbox");
            //Letterbox54 = Content.Load<Texture2D>("textures/graphics/letterbox");
            //Letterbox1610 = Content.Load<Texture2D>("textures/graphics/letterbox");      

            cursor = Content.Load<Texture2D>("textures/graphics/cursor");
        }

        void ApplyChanges()
        {
            if (settings != null)
            {
                graphics.PreferredBackBufferWidth = Convert.ToInt32(settings[1]);
                graphics.PreferredBackBufferHeight = Convert.ToInt32(settings[3]);
                scale = Convert.ToInt32(settings[1]) / 1280f;
                scaleMatrix = Matrix.CreateScale(scale, scale, 1f);
                int offset;
                switch (settings[5])
                {
                    case "16:9":
                        widescreen = false;
                        letterbox = null;
                        offsetVector = Vector2.Zero;
                        break;

                    case "3:2":
                        widescreen = settings[11] == "true";
                        //Letterbox = Letterbox32;
                        if (widescreen)
                        {
                            offset = (int)Math.Round(67d);
                        }
                        else
                        {
                            offset = 0;
                        }
                        offsetVector = new Vector2(0, offset);
                        break;

                    case "4:3":
                        widescreen = settings[11] == "true";
                        //Letterbox = Letterbox43;
                        if (widescreen)
                        {
                            offset = (int)Math.Round(120d);
                        }
                        else
                        {
                            offset = 0;
                        }
                        offsetVector = new Vector2(0, offset);
                        break;

                    case "5:3":
                        widescreen = settings[11] == "true";
                        //Letterbox = Letterbox53;
                        if (widescreen)
                        {
                            offset = (int)Math.Round(24d);
                        }
                        else
                        {
                            offset = 0;
                        }
                        offsetVector = new Vector2(0, offset);
                        break;

                    case "5:4":
                        widescreen = settings[11] == "true";
                        //Letterbox = Letterbox54;
                        if (widescreen)
                        {
                            offset = (int)Math.Round(152d);
                        }
                        else
                        {
                            offset = 0;
                        }
                        offsetVector = new Vector2(0, offset);
                        break;

                    case "16:10":
                        widescreen = settings[11] == "true";
                        //Letterbox = Letterbox1610;
                        if (widescreen)
                        {
                            offset = (int)Math.Round(40d);
                        }
                        else
                        {
                            offset = 0;
                        }
                        offsetVector = new Vector2(0, offset);
                        break;
                }

                graphics.IsFullScreen = (settings[7] == "true");

                if (settings[9] == "true")
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

                graphics.ApplyChanges();

                string text = "DisplayWidth = " + settings[1] + ";\n";
                text += "DisplayHeight = " + settings[3] + ";\n";
                text += "AspectRatio = " + settings[5] + ";\n";
                text += "Fullscreen = " + settings[7] + ";\n";
                text += "Borderless = " + settings[9] + ";\n";
                text += "Letterbox = " + settings[11] + ";";

                // WriteAllText creates a file, writes the specified string to the file, 
                // and then closes the file.
                System.IO.File.WriteAllText(@directory, text);
            }
        }

        bool MouseOver(Button button)
        {
            if (scaledMousePosition.X >= button.Position.X - button.Origin.X && scaledMousePosition.X <= button.Position.X + button.Origin.X)
            {
                if (scaledMousePosition.Y >= offsetVector.Y + button.Position.Y - button.Origin.Y && scaledMousePosition.Y <= offsetVector.Y + button.Position.Y + button.Origin.Y)
                {
                    return true;
                }
            }
            return false;
        }

        bool Click()
        {
            return currentMouseState.LeftButton == ButtonState.Pressed && lastMouseState.LeftButton == ButtonState.Released;
        }

        bool Hold()
        {
            return currentMouseState.LeftButton == ButtonState.Pressed && lastMouseState.LeftButton == ButtonState.Pressed;
        }

        bool Released()
        {
            return currentMouseState.LeftButton == ButtonState.Released && lastMouseState.LeftButton == ButtonState.Pressed;
        }

        bool Pressed(Keys key)
        {
            return currentKeyboard.IsKeyDown(key) && lastKeyboard.IsKeyUp(key);
        }

        bool Released(Keys key)
        {
            return currentKeyboard.IsKeyUp(key) && lastKeyboard.IsKeyDown(key);
        }

        bool RightReleased()
        {
            return currentMouseState.RightButton == ButtonState.Released && lastMouseState.RightButton == ButtonState.Pressed;
        }

        bool RightClick()
        {
            return currentMouseState.RightButton == ButtonState.Pressed && lastMouseState.RightButton == ButtonState.Released;
        }

        void CheckWindowDragging()
        {
            if (currentMouseState.LeftButton == ButtonState.Pressed && lastMouseState.LeftButton == ButtonState.Pressed && settings[(int)SettingIndex.BORDERLESS] == "true")
            {
                System.Windows.Forms.Control form = System.Windows.Forms.Control.FromHandle(this.Window.Handle);
                if (windowDragging)
                {
                    form.Location = new System.Drawing.Point((int)(windowPosition.X + System.Windows.Forms.Control.MousePosition.X - desktopMousePosition.X), (int)(windowPosition.Y + System.Windows.Forms.Control.MousePosition.Y - desktopMousePosition.Y));
                }
            }
            else
            {
                windowDragging = false;
            }

            if (!windowDragging)
            {
                if (scaledMousePosition.Y <= 30 * scale)
                {
                    if (currentMouseState.LeftButton == ButtonState.Pressed && lastMouseState.LeftButton == ButtonState.Released)
                    {
                        windowPosition.X = Window.ClientBounds.Left;
                        windowPosition.Y = Window.ClientBounds.Top;
                        desktopMousePosition.X = System.Windows.Forms.Control.MousePosition.X;
                        desktopMousePosition.Y = System.Windows.Forms.Control.MousePosition.Y;
                        windowDragging = true;
                    }
                }
            }
        }

        void DrawCursor()
        {
            Draw(cursor, scaledMousePosition, new Vector2(3, 9));
        }
    }
}
