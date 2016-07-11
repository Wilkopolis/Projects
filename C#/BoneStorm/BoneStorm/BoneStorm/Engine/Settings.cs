using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Graphics;
using System;
using System.Collections.Generic;
using System.IO;
using NAudio;
using NAudio.Wave;

namespace BoneStorm
{
    enum Setting { WIDTH, PRIMARY, SPECIAL, IP, PORT, DISPLAY, CURSOR, VOLUME };
    public enum Special { PLATFORM, DPS, SHIELD, HEAL };

    partial class BoneStormClient
    {
        // holds each setting loaded from file
        Dictionary<Setting, string> Settings = new Dictionary<Setting, string>();

        // special values in text
        const string SPECIAL_PLATFORM = "platform";
        const string SPECIAL_DPS = "steroid";
        const string SPECIAL_SHEILD = "shield";
        const string SPECIAL_HEAL = "medic";

        // LoadSettings
        //
        // functions
        //  - opens file handle
        //  - reads each line in and decides what the line is
        //      - comment, width, primary, ip, etc.
        //  - updates settings Dictionary with settings from file
        //  - closes file handle
        //
        // returns
        //  
        void LoadSettings()
        {
            using (StreamReader reader = new StreamReader("config.ini"))
            {
                string rawLine;
                while ((rawLine = reader.ReadLine()) != null) {
                    // remove whitespace and linebreaks
                    string[] splitLine = rawLine.Replace(" ", "").Split('=');
                    switch (splitLine[0]) {
                        case "ip": Settings[Setting.IP] = splitLine[1]; break;
                        case "port": Settings[Setting.PORT] = splitLine[1]; break;
                        case "primary": Settings[Setting.PRIMARY] = splitLine[1]; break;
                        case "special": Settings[Setting.SPECIAL] = splitLine[1]; break;
                        case "width": Settings[Setting.WIDTH] = splitLine[1]; break;
                        case "display": Settings[Setting.DISPLAY] = splitLine[1]; break;
                        case "cursor": Settings[Setting.CURSOR] = splitLine[1]; break;
                        case "volume": Settings[Setting.VOLUME] = splitLine[1]; break;
                    }
                }
                
                reader.Close();
            }

            ApplySettings();            
        }

        // LoadMusic
        //
        // functions
        //  - loads all the sounds effects used in game
        //  - loads the song
        //
        // returns
        //  
        void LoadSounds()
        {
            waveOutDevice = new WaveOut();
            #pragma warning disable CS0618 // Type or member is obsolete
            waveOutDevice.Volume = .01f;
            #pragma warning restore CS0618 // Type or member is obsolete
            AudioFileReader audioFileReader = new AudioFileReader("song.mp3");
            waveOutDevice.Init(audioFileReader);
        }

        // LoadMusic
        //
        // functions
        //  - loads all the art assets used in game
        //  - puts them in the static Sprites class
        //
        // returns
        //  
        void LoadArt()
        {
            Sprites.Background = Content.Load<Texture2D>("art/stage.png");

            Cursor.SpriteSheet = Content.Load<Texture2D>("art/cursors.png");
            Cursor.Rectangle = new Rectangle(256,192,64,64);

            // Platform
            Sprites.Platform = Content.Load<Texture2D>("art/platform.png");

            // Pick Ups
            Sprites.Bone = Content.Load<Texture2D>("art/bone.png");

            // Text
            Sprites.One = Content.Load<Texture2D>("art/text/one.png");
            Sprites.Two = Content.Load<Texture2D>("art/text/two.png");
            Sprites.Three = Content.Load<Texture2D>("art/text/three.png");
            Sprites.Go = Content.Load<Texture2D>("art/text/go.png");
            Sprites.Pause = Content.Load<Texture2D>("art/text/pause.png");
            Sprites.Victory = Content.Load<Texture2D>("art/text/victory.png");

            // Characters
            player.Sprite = Content.Load<Texture2D>("art/player.png");

            Sprites.Doot = Content.Load<Texture2D>("art/projectiles/doot.png");

            List<Texture2D> tempSprites = new List<Texture2D>();
            for (int i = 1; i < 26; i++)
                tempSprites.Add(Content.Load<Texture2D>("art/walker/frame (" + i.ToString() + ").png"));
            Sprites.Walker = tempSprites.ToArray();

            tempSprites.Clear();
            for (int i = 1; i < 24; i++)
                tempSprites.Add(Content.Load<Texture2D>("art/fast/frame (" + i.ToString() + ").png"));
            Sprites.Fast = tempSprites.ToArray();

            tempSprites.Clear();
            for (int i = 1; i < 16; i++)
                tempSprites.Add(Content.Load<Texture2D>("art/sword1/frame (" + i.ToString() + ").png"));
            Sprites.Sword1 = tempSprites.ToArray();

            tempSprites.Clear();
            for (int i = 1; i < 41; i++)
                tempSprites.Add(Content.Load<Texture2D>("art/sword2/frame (" + i.ToString() + ").png"));
            Sprites.Sword2 = tempSprites.ToArray();

            tempSprites.Clear();
            for (int i = 1; i < 3; i++)
                tempSprites.Add(Content.Load<Texture2D>("art/dootdoot/frame (" + i.ToString() + ").png"));
            Sprites.DootDoot = tempSprites.ToArray();

            boss = new DootDoot(Sprites.DootDoot, Sprites.DootDootSchedule);
        }

        // ApplySettings
        //
        // functions
        //  - applies applicable settings
        //      - width
        //      - display mode
        //
        // returns
        //  
        void ApplySettings()
        {
            graphics.PreferredBackBufferWidth = Convert.ToInt16(Settings[Setting.WIDTH]);
            graphics.PreferredBackBufferHeight = (int)Math.Round(Convert.ToInt16(Settings[Setting.WIDTH]) * AspectRatio);

            //Apply display style
            graphics.ApplyChanges();

            switch (Settings[Setting.SPECIAL])
            {
                case SPECIAL_PLATFORM:
                    player.Special = Special.PLATFORM;
                    player.specialCooldown = 20;
                    break;

                case SPECIAL_DPS:
                    player.Special = Special.DPS;
                    player.specialCooldown = 300;
                    break;

                case SPECIAL_SHEILD:
                    player.Special = Special.SHIELD;
                    player.specialCooldown = 300;
                    break;

                default:
                    player.Special = Special.PLATFORM;
                    player.specialCooldown = 20;
                    break;
            }
        }

        void SaveSettings()
        {
            using (StreamWriter writer = new StreamWriter("config.ini"))
            {
                foreach (KeyValuePair<Setting, string> setting in Settings)
                {
                    switch (setting.Key)
                    {
                        case Setting.IP: writer.WriteLine("ip=" + setting.Value); break;
                        case Setting.PORT: writer.WriteLine("port=" + setting.Value); break;
                        case Setting.PRIMARY: writer.WriteLine("primary=" + setting.Value); break;
                        case Setting.SPECIAL: writer.WriteLine("special=" + setting.Value); break;
                        case Setting.WIDTH: writer.WriteLine("width=" + setting.Value); break;
                        case Setting.DISPLAY: writer.WriteLine("display=" + setting.Value); break;
                        case Setting.CURSOR: writer.WriteLine("cursor=" + setting.Value); break;
                        case Setting.VOLUME: writer.WriteLine("volume=" + setting.Value); break;
                    }
                }

                writer.Close();
            }
        }
    }
}
