using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.IO;
using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Input;
using Microsoft.Xna.Framework.Graphics;

namespace Rougelike
{
    partial class Rougelike
    {
        List<Button> OptionButtons = new List<Button>();
        Texture2D OptionButtonSelected;
        Texture2D OptionButtonUnSelected;
        Texture2D OptionBackground;

        void InitializeOptions()
        {
            OptionBackground = Content.Load<Texture2D>("textures/options/background");

            // 4:3
            Button sixforty = new Button(Content.Load<Texture2D>("textures/options/640x480"), new Vector2(170, 30), "640x480");
            OptionButtons.Add(sixforty);
            Button eighthundredsixhundred = new Button(Content.Load<Texture2D>("textures/options/800x600"), new Vector2(170, 60), "800x600");
            OptionButtons.Add(eighthundredsixhundred);
            Button tentwentyfourfiveseventysix = new Button(Content.Load<Texture2D>("textures/options/1024x768"), new Vector2(170, 90), "1024x768");
            OptionButtons.Add(tentwentyfourfiveseventysix);
            Button elevenfiftytwoeightsixtyfour = new Button(Content.Load<Texture2D>("textures/options/1152x864"), new Vector2(170, 120),  "1152x864");
            OptionButtons.Add(elevenfiftytwoeightsixtyfour);
            Button twelveeightyninesixty = new Button(Content.Load<Texture2D>("textures/options/1280x960"), new Vector2(170, 150), "1280x960");
            OptionButtons.Add(twelveeightyninesixty);
            Button fourteenhundred = new Button(Content.Load<Texture2D>("textures/options/1400x1050"), new Vector2(170, 180), "1400x1050");
            OptionButtons.Add(fourteenhundred);
            Button fourteenfortyteneighty = new Button(Content.Load<Texture2D>("textures/options/1440x1080"), new Vector2(170, 210), "1440x1080");
            OptionButtons.Add(fourteenfortyteneighty);
            //Button sixteenhundredtwelvehundred = new Button(Content.Load<Texture2D>("textures/options/1600x1200"), new Vector2(170, 240), "1600x1200");
            //OptionButtons.Add(sixteenhundredtwelvehundred);
            Button twentyfourtyeight = new Button(Content.Load<Texture2D>("textures/options/2048x1536"), new Vector2(170, 270), "2048x1536");
            OptionButtons.Add(twentyfourtyeight);

            // 5:3
            Button eighthundred = new Button(Content.Load<Texture2D>("textures/options/800x480"), new Vector2(280, 30), "800x480");
            OptionButtons.Add(eighthundred);
            Button twelveeightysevensixtyeight = new Button(Content.Load<Texture2D>("textures/options/1280x768"), new Vector2(280, 60), "1280x768");
            OptionButtons.Add(twelveeightysevensixtyeight);
            
            // 5:4
            Button twelveeightytentwentyfour = new Button(Content.Load<Texture2D>("textures/options/1280x1024"), new Vector2(390, 30), "1280x1024");
            OptionButtons.Add(twelveeightytentwentyfour);
            Button twentyfivesixtytwentyfourtyeight = new Button(Content.Load<Texture2D>("textures/options/2560x2048"), new Vector2(390, 60), "2560x2048");
            OptionButtons.Add(twentyfivesixtytwentyfourtyeight);

            // 3:2
            Button elevenfiftytwo = new Button(Content.Load<Texture2D>("textures/options/1152x768"), new Vector2(60, 30), "1152x768");
            OptionButtons.Add(elevenfiftytwo);
            Button twelveeightyeightfiftyfour = new Button(Content.Load<Texture2D>("textures/options/1280x854"), new Vector2(60, 60), "1280x854");
            OptionButtons.Add(twelveeightyeightfiftyfour);
            Button fourteenfortyninesixty = new Button(Content.Load<Texture2D>("textures/options/1440x960"), new Vector2(60, 90), "1440x960");
            OptionButtons.Add(fourteenfortyninesixty);

            // 8:5
            Button twelveeightyeighthundred = new Button(Content.Load<Texture2D>("textures/options/1280x800"), new Vector2(500, 30), "1280x800");
            OptionButtons.Add(twelveeightyeighthundred);
            Button fourteenforty = new Button(Content.Load<Texture2D>("textures/options/1440x900"), new Vector2(500, 60), "1440x900");
            OptionButtons.Add(fourteenforty);
            Button sixteeneighty = new Button(Content.Load<Texture2D>("textures/options/1680x1050"), new Vector2(500, 90), "1680x1050");
            OptionButtons.Add(sixteeneighty);
            Button nineteentwentytwelvehundred = new Button(Content.Load<Texture2D>("textures/options/1920x1200"), new Vector2(500, 120), "1920x1200");
            OptionButtons.Add(nineteentwentytwelvehundred);
            Button twentyfivesixtysixeteenhundred = new Button(Content.Load<Texture2D>("textures/options/2560x1600"), new Vector2(500, 150), "2560x1600");
            OptionButtons.Add(twentyfivesixtysixeteenhundred);

            // 16:9
            Button eightfiftyfour = new Button(Content.Load<Texture2D>("textures/options/854x480"), new Vector2(610, 30), "854x480");
            OptionButtons.Add(eightfiftyfour);
            Button tentwentyfour = new Button(Content.Load<Texture2D>("textures/options/1024x576"), new Vector2(610, 60), "1024x576");
            OptionButtons.Add(tentwentyfour);
            Button twelveeighty = new Button(Content.Load<Texture2D>("textures/options/1280x720"), new Vector2(610, 90), "1280x720");
            OptionButtons.Add(twelveeighty);
            Button thirteensixtysix = new Button(Content.Load<Texture2D>("textures/options/1366x768"), new Vector2(610, 120), "1366x768");
            OptionButtons.Add(thirteensixtysix);
            Button sixteenhundred = new Button(Content.Load<Texture2D>("textures/options/1600x900"), new Vector2(610, 180), "1600x900");
            OptionButtons.Add(sixteenhundred);
            Button nineteentwenty = new Button(Content.Load<Texture2D>("textures/options/1920x1080"), new Vector2(610, 210), "1920x1080");
            OptionButtons.Add(nineteentwenty);
            Button twentyfivesixty = new Button(Content.Load<Texture2D>("textures/options/2560x1440"), new Vector2(610, 240), "2560x1440");
            OptionButtons.Add(twentyfivesixty);

            Button fullscreen = new Button(Content.Load<Texture2D>("textures/options/fullscreen"), new Vector2(60, 480), "fullscreen");
            OptionButtons.Add(fullscreen);
            Button windowed = new Button(Content.Load<Texture2D>("textures/options/windowed"), new Vector2(170, 480), "windowed");
            OptionButtons.Add(windowed);
            Button borderless = new Button(Content.Load<Texture2D>("textures/options/borderless"), new Vector2(280, 480), "borderless");
            OptionButtons.Add(borderless);
            Button letterbox = new Button(Content.Load<Texture2D>("textures/options/letterbox"), new Vector2(390, 480), "widescreen");
            OptionButtons.Add(letterbox);            
            Button back = new Button(Content.Load<Texture2D>("textures/options/back"), new Vector2(640, 650), "back", Keys.Back);
            OptionButtons.Add(back);
            Button applychanges = new Button(Content.Load<Texture2D>("textures/options/applychanges"), new Vector2(500, 480), "applychanges", Keys.A);
            OptionButtons.Add(applychanges);

            Button breakpoint = new Button("break", Keys.P);
            OptionButtons.Add(breakpoint);
       
            Button quit = new Button("quit", Keys.F10);
            OptionButtons.Add(quit);     
                                 
            OptionButtonSelected = Content.Load<Texture2D>("textures/options/selected");
            OptionButtonUnSelected = Content.Load<Texture2D>("textures/options/unselected");

            GameState = State.OPTIONS;
        }

        void CheckOptionScreenInput()
        {
            foreach (Button button in OptionButtons)
            {
                if (Pressed(button.Hotkey))
                {
                    button.WasPressed = true;
                }
                else if (Released(button.Hotkey))
                {
                    if (button.WasPressed)
                    {
                        HandleOptionButton(button);
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
                            HandleOptionButton(button);
                        }
                        button.WasClicked = false;
                    }
                }
            }
        }

        void DrawOptionScreen()
        {
            Draw(OptionBackground);

            foreach (Button button in OptionButtons)
            {
                Draw(button);
            }
        }

        void SelectOptionsButton(string action)
        {
            foreach (Button b in OptionButtons)
            {
                if (b.Action == action)
                {
                    b.Sprite = OptionButtonSelected;
                }
                else
                {
                    b.Sprite = OptionButtonUnSelected;
                }
            }
        }

        void HandleOptionButton(Button b)
        {
            switch (b.Action)
            { 
                case "exit":
                    Quit();
                    break;

                case "back":
                    GameState = State.TITLE;
                    break;

                case "break":
                    //Pause to debug
                    break;

                case "fullscreen":
                    Settings[(int)SettingIndex.FULLSCREEN] = "true";
                    break;

                case "windowed":
                    Settings[(int)SettingIndex.FULLSCREEN] = "false";
                    break;

                case "borderless":
                    if (Settings[(int)SettingIndex.BORDERLESS] == "false")
                    {
                        Settings[(int)SettingIndex.BORDERLESS] = "true";
                    }
                    else
                    {
                        Settings[(int)SettingIndex.BORDERLESS] = "false";
                    }
                    break;

                case "letterbox":
                    if (Settings[(int)SettingIndex.LETTERBOX] == "false")
                    {
                        Settings[(int)SettingIndex.LETTERBOX] = "true";
                        switch (Settings[(int)SettingIndex.ASPECTRATIO])
                        {
                            case "16:9":
                                break;

                            case "3:2":
                                Settings[(int)SettingIndex.DISPLAYHEIGHT] = Convert.ToString((int)Math.Round((2 * Scale * 67) + Convert.ToInt32(Settings[(int)SettingIndex.DISPLAYHEIGHT])));
                                break;

                            case "4:3":
                                Settings[(int)SettingIndex.DISPLAYHEIGHT] = Convert.ToString((int)Math.Round((2 * Scale * 120) + Convert.ToInt32(Settings[(int)SettingIndex.DISPLAYHEIGHT])));
                                break;

                            case "5:3":
                                Settings[(int)SettingIndex.DISPLAYHEIGHT] = Convert.ToString((int)Math.Round((2 * Scale * 24) + Convert.ToInt32(Settings[(int)SettingIndex.DISPLAYHEIGHT])));
                                break;

                            case "5:4":
                                Settings[(int)SettingIndex.DISPLAYHEIGHT] = Convert.ToString((int)Math.Round((2 * Scale * 152) + Convert.ToInt32(Settings[(int)SettingIndex.DISPLAYHEIGHT])));
                                break;

                            case "16:10":
                                Settings[(int)SettingIndex.DISPLAYHEIGHT] = Convert.ToString((int)Math.Round((2 * Scale * 40) + Convert.ToInt32(Settings[(int)SettingIndex.DISPLAYHEIGHT])));
                                break;
                        }
                    }
                    else
                    {
                        Settings[(int)SettingIndex.LETTERBOX] = "false";
                        switch (Settings[5])
                        {
                            case "16:9":
                                break;

                            case "3:2":
                                Settings[(int)SettingIndex.DISPLAYHEIGHT] = Convert.ToString((int)Math.Round((2 * Scale * -67) + Convert.ToInt32(Settings[(int)SettingIndex.DISPLAYHEIGHT])));
                                break;

                            case "4:3":
                                Settings[(int)SettingIndex.DISPLAYHEIGHT] = Convert.ToString((int)Math.Round((2 * Scale * -120) + Convert.ToInt32(Settings[(int)SettingIndex.DISPLAYHEIGHT])));
                                break;

                            case "5:3":
                                Settings[(int)SettingIndex.DISPLAYHEIGHT] = Convert.ToString((int)Math.Round((2 * Scale * -24) + Convert.ToInt32(Settings[(int)SettingIndex.DISPLAYHEIGHT])));
                                break;

                            case "5:4":
                                Settings[(int)SettingIndex.DISPLAYHEIGHT] = Convert.ToString((int)Math.Round((2 * Scale * -152) + Convert.ToInt32(Settings[(int)SettingIndex.DISPLAYHEIGHT])));
                                break;

                            case "16:10":
                                Settings[(int)SettingIndex.DISPLAYHEIGHT] = Convert.ToString((int)Math.Round((2 * Scale * -40) + Convert.ToInt32(Settings[(int)SettingIndex.DISPLAYHEIGHT])));
                                break;
                        }
                    }
                    break;

                case "applychanges":
                    ApplyChanges();
                    break;

                case "640x480":
                    if (Settings[11] == "true")
                    {
                        Settings[1] = "640";
                        Settings[3] = "480";
                        Settings[5] = "4:3";
                    }
                    else
                    {
                        Settings[1] = "640";
                        Settings[3] = "360";
                        Settings[5] = "4:3";
                    }
                    break;

                case "800x480":
                    if (Settings[11] == "true")
                    {
                        Settings[1] = "800";
                        Settings[3] = "480";
                        Settings[5] = "5:3";
                    }
                    else
                    {
                        Settings[1] = "800";
                        Settings[3] = "450";
                        Settings[5] = "5:3";
                    }
                    break;

                case "800x600":
                    if (Settings[11] == "true")
                    {
                        Settings[1] = "800";
                        Settings[3] = "600";
                        Settings[5] = "4:3";
                    }
                    else
                    {
                        Settings[1] = "800";
                        Settings[3] = "450";
                        Settings[5] = "4:3";
                    }
                    break;

                case "854x480":
                    Settings[1] = "854";
                    Settings[3] = "480";
                    Settings[5] = "16:9";
                    break;

                case "1024x576":
                    Settings[1] = "1024";
                    Settings[3] = "576";
                    Settings[5] = "16:9";
                    break;

                case "1024x768":
                    if (Settings[11] == "true")
                    {
                        Settings[1] = "1024";
                        Settings[3] = "768";
                        Settings[5] = "4:3";
                    }
                    else
                    {
                        Settings[1] = "1024";
                        Settings[3] = "576";
                        Settings[5] = "4:3";
                    }
                    break;

                case "1152x768":
                    if (Settings[11] == "true")
                    {
                        Settings[1] = "1152";
                        Settings[3] = "768";
                        Settings[5] = "3:2";
                    }
                    else
                    {
                        Settings[1] = "1152";
                        Settings[3] = "648";
                        Settings[5] = "3:2";
                    }
                    break;

                case "1152x864":
                    if (Settings[11] == "true")
                    {
                        Settings[1] = "1152";
                        Settings[3] = "864";
                        Settings[5] = "4:3";
                    }
                    else
                    {
                        Settings[1] = "1152";
                        Settings[3] = "648";
                        Settings[5] = "4:3";
                    }
                    break;

                case "1280x720":
                    Settings[1] = "1280";
                    Settings[3] = "720";
                    Settings[5] = "16:9";
                    break;

                case "1280x768":
                    if (Settings[11] == "true")
                    {
                        Settings[1] = "1280";
                        Settings[3] = "768";
                        Settings[5] = "5:3";
                    }
                    else
                    {
                        Settings[1] = "1280";
                        Settings[3] = "720";
                        Settings[5] = "5:3";
                    }
                    break;

                case "1280x800":
                    if (Settings[11] == "true")
                    {
                        Settings[1] = "1280";
                        Settings[3] = "800";
                        Settings[5] = "16:10";
                    }
                    else
                    {
                        Settings[1] = "1280";
                        Settings[3] = "720";
                        Settings[5] = "16:10";
                    }
                    break;

                case "1280x854":
                    if (Settings[11] == "true")
                    {
                        Settings[1] = "1280";
                        Settings[3] = "854";
                        Settings[5] = "3:2";
                    }
                    else
                    {
                        Settings[1] = "1280";
                        Settings[3] = "720";
                        Settings[5] = "3:2";
                    }
                    break;

                case "1280x960":
                    if (Settings[11] == "true")
                    {
                        Settings[1] = "1280";
                        Settings[3] = "960";
                        Settings[5] = "4:3";
                    }
                    else
                    {
                        Settings[1] = "1280";
                        Settings[3] = "720";
                        Settings[5] = "4:3";
                    }
                    break;

                case "1280x1024":
                    if (Settings[11] == "true")
                    {
                        Settings[1] = "1280";
                        Settings[3] = "1024";
                        Settings[5] = "5:4";
                    }
                    else
                    {
                        Settings[1] = "1280";
                        Settings[3] = "720";
                        Settings[5] = "5:4";
                    }
                    break;

                case "1366x768":
                    Settings[1] = "1366";
                    Settings[3] = "768";
                    Settings[5] = "16:9";
                    break;

                case "1400x1050":
                    if (Settings[11] == "true")
                    {
                        Settings[1] = "1400";
                        Settings[3] = "1050";
                        Settings[5] = "4:3";
                    }
                    else
                    {
                        Settings[1] = "1400";
                        Settings[3] = "788";
                        Settings[5] = "4:3";
                    }
                    break;

                case "1440x900":
                    if (Settings[11] == "true")
                    {
                        Settings[1] = "1440";
                        Settings[3] = "900";
                        Settings[5] = "16:10";
                    }
                    else
                    {
                        Settings[1] = "1440";
                        Settings[3] = "810";
                        Settings[5] = "16:10";
                    }
                    break;

                case "1440x960":
                    if (Settings[11] == "true")
                    {
                        Settings[1] = "1440";
                        Settings[3] = "960";
                        Settings[5] = "3:2";
                    }
                    else
                    {
                        Settings[1] = "1440";
                        Settings[3] = "810";
                        Settings[5] = "3:2";
                    }
                    break;

                case "1440x1080":
                    if (Settings[11] == "true")
                    {
                        Settings[1] = "1440";
                        Settings[3] = "1080";
                        Settings[5] = "4:3";
                    }
                    else
                    {
                        Settings[1] = "1440";
                        Settings[3] = "810";
                        Settings[5] = "4:3";
                    }
                    break;

                case "1600x900":
                    Settings[1] = "1600";
                    Settings[3] = "900";
                    Settings[5] = "16:9";
                    break;

                case "1600x1200":
                    if (Settings[11] == "true")
                    {
                        Settings[1] = "1600";
                        Settings[3] = "1200";
                        Settings[5] = "4:3";
                    }
                    else
                    {
                        Settings[1] = "1600";
                        Settings[3] = "945";
                        Settings[5] = "4:3";
                    }
                    break;

                case "1680x1050":
                    if (Settings[11] == "true")
                    {
                        Settings[1] = "1680";
                        Settings[3] = "1050";
                        Settings[5] = "16:10";
                    }
                    else
                    {
                        Settings[1] = "1680";
                        Settings[3] = "945";
                        Settings[5] = "16:10";
                    }
                    break;

                case "1920x1080":
                    Settings[1] = "1920";
                    Settings[3] = "1080";
                    Settings[5] = "16:9";
                    break;

                case "1920x1200":
                    if (Settings[11] == "true")
                    {
                        Settings[1] = "1920";
                        Settings[3] = "1200";
                        Settings[5] = "16:10";
                    }
                    else
                    {
                        Settings[1] = "1920";
                        Settings[3] = "1080";
                        Settings[5] = "16:10";
                    }
                    break;

                case "2048x1536":
                    if (Settings[11] == "true")
                    {
                        Settings[1] = "2048";
                        Settings[3] = "1536";
                        Settings[5] = "4:3";
                    }
                    else
                    {
                        Settings[1] = "2048";
                        Settings[3] = "1152";
                        Settings[5] = "4:3";
                    }
                    break;

                case "2560x1440":
                    Settings[1] = "2560";
                    Settings[3] = "1440";
                    Settings[5] = "16:9";
                    break;

                case "2560x1600":
                    if (Settings[11] == "true")
                    {
                        Settings[1] = "2560";
                        Settings[3] = "1600";
                        Settings[5] = "16:10";
                    }
                    else
                    {
                        Settings[1] = "2560";
                        Settings[3] = "1440";
                        Settings[5] = "16:10";
                    }
                    break;

                case "2560x2048":
                    if (Settings[11] == "true")
                    {
                        Settings[1] = "2560";
                        Settings[3] = "2048";
                        Settings[5] = "5:4";
                    }
                    else
                    {
                        Settings[1] = "2560";
                        Settings[3] = "1440";
                        Settings[5] = "5:4";
                    }
                    break;
            }
            SelectOptionsButton(Settings[1] + "x" + Settings[3]);
        }   
    }
}