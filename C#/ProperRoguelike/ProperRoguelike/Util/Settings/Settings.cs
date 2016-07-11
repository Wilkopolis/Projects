using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Graphics;
using Microsoft.Xna.Framework.Input;
using OpenTK;
using System;
using System.Collections.Generic;
using System.IO;
using System.Reflection;
using System.Text.RegularExpressions;

namespace ProperRoguelike
{
    // resolution/padding
    enum Framing { LETTER_BOX_H, LETTER_BOX_V, NONE };

    static class Setting
    {
        public static int X = -1;
        public static int Y = -1;
        public static int WIDTH = 1280;
        public static int HEIGHT = 720;
        public static float UISCALE = 1.0f;
        public static bool BORDERLESS = false;
    }

    partial class Roguelike
    {
        // constants
        string SETTINGS_FILE_PATH = "settings.cfg";
                
        /* 
            Read settings/key assosciations from file, update settings object    
        */
        void LoadSettingsAndKeys()
        {
            // Load user settings
            string[] fileLines = {};
            try
            {
                fileLines = File.ReadAllLines(SETTINGS_FILE_PATH);
            }
            catch(Exception e)
            {
                if (e is System.IO.FileNotFoundException)
                {
                    System.Windows.Forms.MessageBox.Show("Could not find the settings file:\n\n" + e.Message + "\n\nUsing default settings.");
                }
                else
                {
                    System.Windows.Forms.MessageBox.Show("Unknown exception: \n" + e.Message + "\n\nUsing default settings.");
                }
            }

            string currentSettingString = "", currentValueString = "";
            foreach (string line in fileLines)
            {
                try
                {
                    // remove all whitespace
                    string cleanLine = Regex.Replace(line, @"\s+", "");

                    // skip comment lines
                    if (cleanLine.Substring(0, 1) == "#")
                        continue;

                    // parse the result into a pair
                    string[] settingTuple = cleanLine.Split('=');                    

                    // get the key/value
                    string settingName = settingTuple[0].ToUpper();
                    string valueString = settingTuple[1];
                    // used for helpful error message
                    currentSettingString = settingName;
                    currentValueString = valueString;
                    // get the key type
                    // its a setting
                    if (typeof(Setting).GetField(settingName) != null)
                    {
                        FieldInfo field = typeof(Setting).GetField(settingName);

                        // try to cast the string value to the desired type
                        var value = Convert.ChangeType(valueString, field.FieldType);

                        // set the setting value
                        field.SetValue(null, value);
                    }
                    // its a keybinding
                    else if (Enum.Parse(typeof(Command), settingName) != null)
                    {
                        Command command = (Command)Enum.Parse(typeof(Command), settingName);

                        // get the exiting handler
                        CommandHandler handler = KeyMap[command];

                        // parse the key                       
                        Keys value = (Keys)Enum.Parse(typeof(Keys), valueString);

                        if (KeyAlreadyBound(value))
                            UnbindKey(value);

                        KeyMap[command].Keys.Add(value);
                    }
                    // its ???
                    else
                        throw new System.NullReferenceException();
                }
                catch (Exception e)
                {
                    // field not found
                    if (e is System.NullReferenceException)
                    {
                        System.Windows.Forms.MessageBox.Show("Unknown setting: \"" + currentSettingString + "\", ignoring it.");
                    }
                    else if (e is System.FormatException)
                    {
                        FieldInfo field = typeof(Setting).GetField(currentSettingString);
                        var value = field.GetValue(null);
                        System.Windows.Forms.MessageBox.Show("Unsupported value: \"" + currentValueString + "\", for setting: \"" + currentSettingString + "\", using default value: \"" + value.ToString() + "\".");
                    }
                    else if (e is System.ArgumentException)
                    {
                        System.Windows.Forms.MessageBox.Show("Unknown key: \"" + currentValueString + "\", ignoring binding entry for: \"" + currentSettingString + "\".");
                    }
                    else
                    {
                        System.Windows.Forms.MessageBox.Show("Unknown exception: \n" + e.Message + "\n\nUsing default setting for \"" + currentSettingString + "\" .");
                    }
                }
            }
        }

        /* 
            Apply settings to our game window    
        */
        int letterBoxSize = 0;
        Framing framing = Framing.NONE;
        Texture2D letterboxTexture = null;
        Microsoft.Xna.Framework.Vector2 LetterBoxPos = Microsoft.Xna.Framework.Vector2.Zero;
        void ApplySettings()
        {
            // apply Width and Height
            graphics.PreferredBackBufferWidth = Setting.WIDTH;
            graphics.PreferredBackBufferHeight = Setting.HEIGHT;

            // calculate letterbox
            // given width calculate 16:9 height
            int expectedHeight = Setting.WIDTH * 9/16;
            int heightDiff = Setting.HEIGHT - expectedHeight;
            // bars on sides
            if (heightDiff > 0)
            {
                letterBoxSize = heightDiff / 2;
                framing = Framing.LETTER_BOX_V;

                // make the letterbox texture
                letterboxTexture = new Texture2D(graphics.GraphicsDevice, Setting.WIDTH, letterBoxSize);
                Color[] data = new Color[Setting.WIDTH * letterBoxSize];
                for (int i = 0; i < data.Length; ++i) data[i] = Color.Black;
                letterboxTexture.SetData(data);

                // calculate its position
                LetterBoxPos = new Microsoft.Xna.Framework.Vector2(0, Setting.HEIGHT - letterBoxSize);
            }
            // bars on top/bottom
            else if (heightDiff < 0)
            {
                letterBoxSize = -heightDiff / 2;
                framing = Framing.LETTER_BOX_H;

                // make the letterbox texture
                letterboxTexture = new Texture2D(graphics.GraphicsDevice, letterBoxSize, Setting.HEIGHT);
                Color[] data = new Color[letterBoxSize * Setting.HEIGHT];
                for (int i = 0; i < data.Length; ++i) data[i] = Color.Black;
                letterboxTexture.SetData(data);

                // calculate its position
                LetterBoxPos = new Microsoft.Xna.Framework.Vector2(Setting.WIDTH - letterBoxSize, 0);
            }
            else
            {
                letterBoxSize = 0;
                framing = Framing.NONE;
            }

            // apply X and Y
            if (Setting.X != -1 || Setting.Y != -1)
                Window.Position = new Microsoft.Xna.Framework.Point(Setting.X, Setting.Y);
            else
                Window.Position = new Microsoft.Xna.Framework.Point(System.Windows.Forms.Screen.PrimaryScreen.Bounds.Width / 2 - graphics.PreferredBackBufferWidth / 2,
                    System.Windows.Forms.Screen.PrimaryScreen.Bounds.Height / 2 - graphics.PreferredBackBufferHeight / 2);

            // apply Borderless
            Window.IsBorderless = Setting.BORDERLESS;

            // no resizing
            Window.AllowUserResizing = false;

            // apply Cursor            
            this.IsMouseVisible = true;            
        }
    }
}
