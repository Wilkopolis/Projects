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
        List<Button> optionButtons = new List<Button>();
        Texture2D optionButtonSelected;
        Texture2D optionButtonUnSelected;
        Texture2D optionBackground;

        void InitializeOptions()
        {
            optionBackground = Content.Load<Texture2D>("textures/options/background");

            // 4:3
            Button sixforty = new Button(Content.Load<Texture2D>("textures/options/640x480"), new Vector2(170, 30), "640x480");
            optionButtons.Add(sixforty);
            Button eighthundredsixhundred = new Button(Content.Load<Texture2D>("textures/options/800x600"), new Vector2(170, 60), "800x600");
            optionButtons.Add(eighthundredsixhundred);
            Button tentwentyfourfiveseventysix = new Button(Content.Load<Texture2D>("textures/options/1024x768"), new Vector2(170, 90), "1024x768");
            optionButtons.Add(tentwentyfourfiveseventysix);
            Button elevenfiftytwoeightsixtyfour = new Button(Content.Load<Texture2D>("textures/options/1152x864"), new Vector2(170, 120),  "1152x864");
            optionButtons.Add(elevenfiftytwoeightsixtyfour);
            Button twelveeightyninesixty = new Button(Content.Load<Texture2D>("textures/options/1280x960"), new Vector2(170, 150), "1280x960");
            optionButtons.Add(twelveeightyninesixty);
            Button fourteenhundred = new Button(Content.Load<Texture2D>("textures/options/1400x1050"), new Vector2(170, 180), "1400x1050");
            optionButtons.Add(fourteenhundred);
            Button fourteenfortyteneighty = new Button(Content.Load<Texture2D>("textures/options/1440x1080"), new Vector2(170, 210), "1440x1080");
            optionButtons.Add(fourteenfortyteneighty);
            Button twentyfourtyeight = new Button(Content.Load<Texture2D>("textures/options/2048x1536"), new Vector2(170, 270), "2048x1536");
            optionButtons.Add(twentyfourtyeight);

            // 5:3
            Button eighthundred = new Button(Content.Load<Texture2D>("textures/options/800x480"), new Vector2(280, 30), "800x480");
            optionButtons.Add(eighthundred);
            Button twelveeightysevensixtyeight = new Button(Content.Load<Texture2D>("textures/options/1280x768"), new Vector2(280, 60), "1280x768");
            optionButtons.Add(twelveeightysevensixtyeight);
            
            // 5:4
            Button twelveeightytentwentyfour = new Button(Content.Load<Texture2D>("textures/options/1280x1024"), new Vector2(390, 30), "1280x1024");
            optionButtons.Add(twelveeightytentwentyfour);
            Button twentyfivesixtytwentyfourtyeight = new Button(Content.Load<Texture2D>("textures/options/2560x2048"), new Vector2(390, 60), "2560x2048");
            optionButtons.Add(twentyfivesixtytwentyfourtyeight);

            // 3:2
            Button elevenfiftytwo = new Button(Content.Load<Texture2D>("textures/options/1152x768"), new Vector2(60, 30), "1152x768");
            optionButtons.Add(elevenfiftytwo);
            Button twelveeightyeightfiftyfour = new Button(Content.Load<Texture2D>("textures/options/1280x854"), new Vector2(60, 60), "1280x854");
            optionButtons.Add(twelveeightyeightfiftyfour);
            Button fourteenfortyninesixty = new Button(Content.Load<Texture2D>("textures/options/1440x960"), new Vector2(60, 90), "1440x960");
            optionButtons.Add(fourteenfortyninesixty);

            // 8:5
            Button twelveeightyeighthundred = new Button(Content.Load<Texture2D>("textures/options/1280x800"), new Vector2(500, 30), "1280x800");
            optionButtons.Add(twelveeightyeighthundred);
            Button fourteenforty = new Button(Content.Load<Texture2D>("textures/options/1440x900"), new Vector2(500, 60), "1440x900");
            optionButtons.Add(fourteenforty);
            Button sixteeneighty = new Button(Content.Load<Texture2D>("textures/options/1680x1050"), new Vector2(500, 90), "1680x1050");
            optionButtons.Add(sixteeneighty);
            Button nineteentwentytwelvehundred = new Button(Content.Load<Texture2D>("textures/options/1920x1200"), new Vector2(500, 120), "1920x1200");
            optionButtons.Add(nineteentwentytwelvehundred);
            Button twentyfivesixtysixeteenhundred = new Button(Content.Load<Texture2D>("textures/options/2560x1600"), new Vector2(500, 150), "2560x1600");
            optionButtons.Add(twentyfivesixtysixeteenhundred);

            // 16:9
            Button eightfiftyfour = new Button(Content.Load<Texture2D>("textures/options/854x480"), new Vector2(610, 30), "854x480");
            optionButtons.Add(eightfiftyfour);
            Button tentwentyfour = new Button(Content.Load<Texture2D>("textures/options/1024x576"), new Vector2(610, 60), "1024x576");
            optionButtons.Add(tentwentyfour);
            Button twelveeighty = new Button(Content.Load<Texture2D>("textures/options/1280x720"), new Vector2(610, 90), "1280x720");
            optionButtons.Add(twelveeighty);
            Button thirteensixtysix = new Button(Content.Load<Texture2D>("textures/options/1366x768"), new Vector2(610, 120), "1366x768");
            optionButtons.Add(thirteensixtysix);
            Button sixteenhundred = new Button(Content.Load<Texture2D>("textures/options/1600x900"), new Vector2(610, 180), "1600x900");
            optionButtons.Add(sixteenhundred);
            Button nineteentwenty = new Button(Content.Load<Texture2D>("textures/options/1920x1080"), new Vector2(610, 210), "1920x1080");
            optionButtons.Add(nineteentwenty);
            Button twentyfivesixty = new Button(Content.Load<Texture2D>("textures/options/2560x1440"), new Vector2(610, 240), "2560x1440");
            optionButtons.Add(twentyfivesixty);

            Button fullscreen = new Button(Content.Load<Texture2D>("textures/options/fullscreen"), new Vector2(60, 480), "fullscreen");
            optionButtons.Add(fullscreen);
            Button windowed = new Button(Content.Load<Texture2D>("textures/options/windowed"), new Vector2(170, 480), "windowed");
            optionButtons.Add(windowed);
            Button borderless = new Button(Content.Load<Texture2D>("textures/options/borderless"), new Vector2(280, 480), "borderless");
            optionButtons.Add(borderless);
            Button letterbox = new Button(Content.Load<Texture2D>("textures/options/letterbox"), new Vector2(390, 480), "widescreen");
            optionButtons.Add(letterbox);  
            Button applychanges = new Button(Content.Load<Texture2D>("textures/options/applychanges"), new Vector2(500, 480), "applychanges", Keys.A);
            optionButtons.Add(applychanges);

            Button breakpoint = new Button("break", Keys.P);
            optionButtons.Add(breakpoint);
       
            Button quit = new Button("quit", Keys.F10);
            optionButtons.Add(quit);

            Button back = new Button(Content.Load<Texture2D>("textures/options/back"), new Vector2(640, 650), "back", Keys.Back);
            optionButtons.Add(back);

            optionButtonSelected = Content.Load<Texture2D>("textures/options/selected");
            optionButtonUnSelected = Content.Load<Texture2D>("textures/options/unselected");

            gameState = State.OPTIONS;
        }

        void CheckOptionScreenInput()
        {
            foreach (Button button in optionButtons)
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
            Draw(optionBackground);

            foreach (Button button in optionButtons)
            {
                Draw(button);
            }
        }

        void SelectOptionsButton(string action)
        {
            foreach (Button b in optionButtons)
            {
                if (b.Action == action)
                {
                    b.Sprite = optionButtonSelected;
                }
                else
                {
                    b.Sprite = optionButtonUnSelected;
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
                    gameState = State.TITLE;
                    break;

                case "break":
                    //Pause to debug
                    break;

                case "fullscreen":
                    settings[(int)SettingIndex.FULLSCREEN] = "true";
                    break;

                case "windowed":
                    settings[(int)SettingIndex.FULLSCREEN] = "false";
                    break;

                case "borderless":
                    if (settings[(int)SettingIndex.BORDERLESS] == "false")
                    {
                        settings[(int)SettingIndex.BORDERLESS] = "true";
                    }
                    else
                    {
                        settings[(int)SettingIndex.BORDERLESS] = "false";
                    }
                    break;

                case "letterbox":
                    if (settings[(int)SettingIndex.LETTERBOX] == "false")
                    {
                        settings[(int)SettingIndex.LETTERBOX] = "true";
                        switch (settings[(int)SettingIndex.ASPECTRATIO])
                        {
                            case "16:9":
                                break;

                            case "3:2":
                                settings[(int)SettingIndex.DISPLAYHEIGHT] = Convert.ToString((int)Math.Round((2 * scale * 67) + Convert.ToInt32(settings[(int)SettingIndex.DISPLAYHEIGHT])));
                                break;

                            case "4:3":
                                settings[(int)SettingIndex.DISPLAYHEIGHT] = Convert.ToString((int)Math.Round((2 * scale * 120) + Convert.ToInt32(settings[(int)SettingIndex.DISPLAYHEIGHT])));
                                break;

                            case "5:3":
                                settings[(int)SettingIndex.DISPLAYHEIGHT] = Convert.ToString((int)Math.Round((2 * scale * 24) + Convert.ToInt32(settings[(int)SettingIndex.DISPLAYHEIGHT])));
                                break;

                            case "5:4":
                                settings[(int)SettingIndex.DISPLAYHEIGHT] = Convert.ToString((int)Math.Round((2 * scale * 152) + Convert.ToInt32(settings[(int)SettingIndex.DISPLAYHEIGHT])));
                                break;

                            case "16:10":
                                settings[(int)SettingIndex.DISPLAYHEIGHT] = Convert.ToString((int)Math.Round((2 * scale * 40) + Convert.ToInt32(settings[(int)SettingIndex.DISPLAYHEIGHT])));
                                break;
                        }
                    }
                    else
                    {
                        settings[(int)SettingIndex.LETTERBOX] = "false";
                        switch (settings[5])
                        {
                            case "16:9":
                                break;

                            case "3:2":
                                settings[(int)SettingIndex.DISPLAYHEIGHT] = Convert.ToString((int)Math.Round((2 * scale * -67) + Convert.ToInt32(settings[(int)SettingIndex.DISPLAYHEIGHT])));
                                break;

                            case "4:3":
                                settings[(int)SettingIndex.DISPLAYHEIGHT] = Convert.ToString((int)Math.Round((2 * scale * -120) + Convert.ToInt32(settings[(int)SettingIndex.DISPLAYHEIGHT])));
                                break;

                            case "5:3":
                                settings[(int)SettingIndex.DISPLAYHEIGHT] = Convert.ToString((int)Math.Round((2 * scale * -24) + Convert.ToInt32(settings[(int)SettingIndex.DISPLAYHEIGHT])));
                                break;

                            case "5:4":
                                settings[(int)SettingIndex.DISPLAYHEIGHT] = Convert.ToString((int)Math.Round((2 * scale * -152) + Convert.ToInt32(settings[(int)SettingIndex.DISPLAYHEIGHT])));
                                break;

                            case "16:10":
                                settings[(int)SettingIndex.DISPLAYHEIGHT] = Convert.ToString((int)Math.Round((2 * scale * -40) + Convert.ToInt32(settings[(int)SettingIndex.DISPLAYHEIGHT])));
                                break;
                        }
                    }
                    break;

                case "applychanges":
                    ApplyChanges();
                    break;

                case "640x480":
                    if (settings[11] == "true")
                    {
                        settings[1] = "640";
                        settings[3] = "480";
                        settings[5] = "4:3";
                    }
                    else
                    {
                        settings[1] = "640";
                        settings[3] = "360";
                        settings[5] = "4:3";
                    }
                    break;

                case "800x480":
                    if (settings[11] == "true")
                    {
                        settings[1] = "800";
                        settings[3] = "480";
                        settings[5] = "5:3";
                    }
                    else
                    {
                        settings[1] = "800";
                        settings[3] = "450";
                        settings[5] = "5:3";
                    }
                    break;

                case "800x600":
                    if (settings[11] == "true")
                    {
                        settings[1] = "800";
                        settings[3] = "600";
                        settings[5] = "4:3";
                    }
                    else
                    {
                        settings[1] = "800";
                        settings[3] = "450";
                        settings[5] = "4:3";
                    }
                    break;

                case "854x480":
                    settings[1] = "854";
                    settings[3] = "480";
                    settings[5] = "16:9";
                    break;

                case "1024x576":
                    settings[1] = "1024";
                    settings[3] = "576";
                    settings[5] = "16:9";
                    break;

                case "1024x768":
                    if (settings[11] == "true")
                    {
                        settings[1] = "1024";
                        settings[3] = "768";
                        settings[5] = "4:3";
                    }
                    else
                    {
                        settings[1] = "1024";
                        settings[3] = "576";
                        settings[5] = "4:3";
                    }
                    break;

                case "1152x768":
                    if (settings[11] == "true")
                    {
                        settings[1] = "1152";
                        settings[3] = "768";
                        settings[5] = "3:2";
                    }
                    else
                    {
                        settings[1] = "1152";
                        settings[3] = "648";
                        settings[5] = "3:2";
                    }
                    break;

                case "1152x864":
                    if (settings[11] == "true")
                    {
                        settings[1] = "1152";
                        settings[3] = "864";
                        settings[5] = "4:3";
                    }
                    else
                    {
                        settings[1] = "1152";
                        settings[3] = "648";
                        settings[5] = "4:3";
                    }
                    break;

                case "1280x720":
                    settings[1] = "1280";
                    settings[3] = "720";
                    settings[5] = "16:9";
                    break;

                case "1280x768":
                    if (settings[11] == "true")
                    {
                        settings[1] = "1280";
                        settings[3] = "768";
                        settings[5] = "5:3";
                    }
                    else
                    {
                        settings[1] = "1280";
                        settings[3] = "720";
                        settings[5] = "5:3";
                    }
                    break;

                case "1280x800":
                    if (settings[11] == "true")
                    {
                        settings[1] = "1280";
                        settings[3] = "800";
                        settings[5] = "16:10";
                    }
                    else
                    {
                        settings[1] = "1280";
                        settings[3] = "720";
                        settings[5] = "16:10";
                    }
                    break;

                case "1280x854":
                    if (settings[11] == "true")
                    {
                        settings[1] = "1280";
                        settings[3] = "854";
                        settings[5] = "3:2";
                    }
                    else
                    {
                        settings[1] = "1280";
                        settings[3] = "720";
                        settings[5] = "3:2";
                    }
                    break;

                case "1280x960":
                    if (settings[11] == "true")
                    {
                        settings[1] = "1280";
                        settings[3] = "960";
                        settings[5] = "4:3";
                    }
                    else
                    {
                        settings[1] = "1280";
                        settings[3] = "720";
                        settings[5] = "4:3";
                    }
                    break;

                case "1280x1024":
                    if (settings[11] == "true")
                    {
                        settings[1] = "1280";
                        settings[3] = "1024";
                        settings[5] = "5:4";
                    }
                    else
                    {
                        settings[1] = "1280";
                        settings[3] = "720";
                        settings[5] = "5:4";
                    }
                    break;

                case "1366x768":
                    settings[1] = "1366";
                    settings[3] = "768";
                    settings[5] = "16:9";
                    break;

                case "1400x1050":
                    if (settings[11] == "true")
                    {
                        settings[1] = "1400";
                        settings[3] = "1050";
                        settings[5] = "4:3";
                    }
                    else
                    {
                        settings[1] = "1400";
                        settings[3] = "788";
                        settings[5] = "4:3";
                    }
                    break;

                case "1440x900":
                    if (settings[11] == "true")
                    {
                        settings[1] = "1440";
                        settings[3] = "900";
                        settings[5] = "16:10";
                    }
                    else
                    {
                        settings[1] = "1440";
                        settings[3] = "810";
                        settings[5] = "16:10";
                    }
                    break;

                case "1440x960":
                    if (settings[11] == "true")
                    {
                        settings[1] = "1440";
                        settings[3] = "960";
                        settings[5] = "3:2";
                    }
                    else
                    {
                        settings[1] = "1440";
                        settings[3] = "810";
                        settings[5] = "3:2";
                    }
                    break;

                case "1440x1080":
                    if (settings[11] == "true")
                    {
                        settings[1] = "1440";
                        settings[3] = "1080";
                        settings[5] = "4:3";
                    }
                    else
                    {
                        settings[1] = "1440";
                        settings[3] = "810";
                        settings[5] = "4:3";
                    }
                    break;

                case "1600x900":
                    settings[1] = "1600";
                    settings[3] = "900";
                    settings[5] = "16:9";
                    break;

                case "1600x1200":
                    if (settings[11] == "true")
                    {
                        settings[1] = "1600";
                        settings[3] = "1200";
                        settings[5] = "4:3";
                    }
                    else
                    {
                        settings[1] = "1600";
                        settings[3] = "945";
                        settings[5] = "4:3";
                    }
                    break;

                case "1680x1050":
                    if (settings[11] == "true")
                    {
                        settings[1] = "1680";
                        settings[3] = "1050";
                        settings[5] = "16:10";
                    }
                    else
                    {
                        settings[1] = "1680";
                        settings[3] = "945";
                        settings[5] = "16:10";
                    }
                    break;

                case "1920x1080":
                    settings[1] = "1920";
                    settings[3] = "1080";
                    settings[5] = "16:9";
                    break;

                case "1920x1200":
                    if (settings[11] == "true")
                    {
                        settings[1] = "1920";
                        settings[3] = "1200";
                        settings[5] = "16:10";
                    }
                    else
                    {
                        settings[1] = "1920";
                        settings[3] = "1080";
                        settings[5] = "16:10";
                    }
                    break;

                case "2048x1536":
                    if (settings[11] == "true")
                    {
                        settings[1] = "2048";
                        settings[3] = "1536";
                        settings[5] = "4:3";
                    }
                    else
                    {
                        settings[1] = "2048";
                        settings[3] = "1152";
                        settings[5] = "4:3";
                    }
                    break;

                case "2560x1440":
                    settings[1] = "2560";
                    settings[3] = "1440";
                    settings[5] = "16:9";
                    break;

                case "2560x1600":
                    if (settings[11] == "true")
                    {
                        settings[1] = "2560";
                        settings[3] = "1600";
                        settings[5] = "16:10";
                    }
                    else
                    {
                        settings[1] = "2560";
                        settings[3] = "1440";
                        settings[5] = "16:10";
                    }
                    break;

                case "2560x2048":
                    if (settings[11] == "true")
                    {
                        settings[1] = "2560";
                        settings[3] = "2048";
                        settings[5] = "5:4";
                    }
                    else
                    {
                        settings[1] = "2560";
                        settings[3] = "1440";
                        settings[5] = "5:4";
                    }
                    break;
            }
            SelectOptionsButton(settings[1] + "x" + settings[3]);
        }   
    }
}