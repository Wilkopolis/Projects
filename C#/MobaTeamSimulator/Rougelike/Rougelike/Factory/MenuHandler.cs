using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.IO;
using Rougelike.Util;
using Microsoft.Xna.Framework.Graphics;
using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Input;

namespace Rougelike.Factory
{
    class MenuHandler
    {
        private enum Settings { DISPLAYWIDTH = 1, DISPLAYHEIGHT = 3, ASPECTRATIO = 5, FULLSCREEN = 7, BORDERLESS = 9, LETTERBOX = 11 };

        private string[] settings;
        private LinkedList<Button> supbuttons = new LinkedList<Button>();
        private LinkedList<Button> optionbuttons = new LinkedList<Button>();
        private LinkedList<Button> gamebuttons = new LinkedList<Button>();
        private LinkedList<Button> loadbuttons = new LinkedList<Button>();
        private LinkedList<Button> ntbuttons = new LinkedList<Button>();
        private LinkedList<Button> tbbuttons = new LinkedList<Button>();

        // Stuff for letterbox and aspect ratios
        private bool letterboxon = false;
        private Vector2 letterbox = Vector2.Zero;

        public Texture2D cursor;
        private bool dragging;
        private Vector2 windowpos;
        private Vector2 mousesnap;
        // Stuff for scaling resolutions
        public float scale;
        public Matrix scalematrix;
        public Vector2 offsetvector;
        private KeyboardState lastkeyboard;

        private string directory = (Directory.GetCurrentDirectory() + "\\settings.ini");

        public MenuHandler(MobaSim game)
        {
            // Load Settings
            try
            {
                StreamReader streamreader = new StreamReader("settings.ini");
                string importedsettings = streamreader.ReadToEnd();
                settings = importedsettings.Split('=', ';');
                int i = 0;
                for (i = 0; i < settings.Length; i++)
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
            game.graphics.PreferredBackBufferWidth = Convert.ToInt32(settings[1]);
            game.graphics.PreferredBackBufferHeight = Convert.ToInt32(settings[3]);
            game.graphics.IsFullScreen = (settings[7] == "true");
            //graphics.SynchronizeWithVerticalRetrace = false;
            //this.IsFixedTimeStep = false;

            // Go boarderless if we have to
            if (settings[9] == "true")
            {
                IntPtr hWnd = game.Window.Handle;
                var control = System.Windows.Forms.Control.FromHandle(hWnd);
                var form = control.FindForm();
                form.FormBorderStyle = System.Windows.Forms.FormBorderStyle.None;
            }

            scale = Convert.ToInt32((int)Settings.DISPLAYHEIGHT) / 1280f;
            scalematrix = Matrix.CreateScale(scale, scale, 1f);
            offsetvector = Vector2.Zero;

            windowpos.X = game.Window.ClientBounds.Left;
            windowpos.Y = game.Window.ClientBounds.Top;

            // Buttons
            Button playbutton = new Button();
            Button optionsbutton = new Button();
            Button backbutton = new Button();
            Button sixforty = new Button();
            Button eighthundred = new Button();
            Button eighthundredsixhundred = new Button();
            Button eightfiftyfour = new Button();
            Button tentwentyfour = new Button();
            Button tentwentyfourfiveseventysix = new Button();
            Button elevenfiftytwo = new Button();
            Button elevenfiftytwoeightsixtyfour = new Button();
            Button twelveeighty = new Button();
            Button twelveeightysevensixtyeight = new Button();
            Button twelveeightyeighthundred = new Button();
            Button twelveeightyeightfiftyfour = new Button();
            Button twelveeightyninesixty = new Button();
            Button twelveeightytentwentyfour = new Button();
            Button thirteensixtysix = new Button();
            Button fourteenhundred = new Button();
            Button fourteenforty = new Button();
            Button fourteenfortyninehundred = new Button();
            Button fourteenfortyninesixty = new Button();
            Button fourteenfortyteneighty = new Button();
            Button sixteenhundred = new Button();
            Button sixteenhundredninehundred = new Button();
            Button sixteenhundredtwelvehundred = new Button();
            Button sixteeneighty = new Button();
            Button nineteentwenty = new Button();
            Button nineteentwentytwelvehundred = new Button();
            Button twentyfourtyeight = new Button();
            Button twentyfourtyeightfifteenthirtysix = new Button();
            Button twentyfivesixty = new Button();
            Button twentyfivesixtyfourteenforty = new Button();
            Button twentyfivesixtysixeteenhundred = new Button();
            Button twentyfivesixtytwentyfourtyeight = new Button();
            Button fullscreen = new Button();
            Button windowed = new Button();
            Button borderless = new Button();
            Button letterboxbutton = new Button();
            playbutton.position = new Vector2(640, 450);
            optionsbutton.position = new Vector2(640, 550);
            backbutton.position = new Vector2(640, 650);
            elevenfiftytwo.position = new Vector2(60, 30);//3:2
            twelveeightyeightfiftyfour.position = new Vector2(60, 60);//3:2
            fourteenfortyninesixty.position = new Vector2(60, 90);//3:2
            sixforty.position = new Vector2(170, 30);//4:3
            eighthundredsixhundred.position = new Vector2(170, 60);//4:3
            tentwentyfourfiveseventysix.position = new Vector2(170, 90);//4:3
            elevenfiftytwoeightsixtyfour.position = new Vector2(170, 120);//4:3
            twelveeightyninesixty.position = new Vector2(170, 150);//4:3
            fourteenhundred.position = new Vector2(170, 180);//4:3
            fourteenfortyteneighty.position = new Vector2(170, 210);//4:3
            sixteenhundredtwelvehundred.position = new Vector2(170, 240);//4:3
            twentyfourtyeight.position = new Vector2(170, 270);//4:3
            eighthundred.position = new Vector2(280, 30);//5:3
            twelveeightysevensixtyeight.position = new Vector2(280, 60);//5:3
            twelveeightytentwentyfour.position = new Vector2(390, 30);//5:4
            twentyfivesixtytwentyfourtyeight.position = new Vector2(390, 60);//5:4
            twelveeightyeighthundred.position = new Vector2(500, 30);//8:5
            fourteenforty.position = new Vector2(500, 60);//8:5
            sixteeneighty.position = new Vector2(500, 90);//8:5
            nineteentwentytwelvehundred.position = new Vector2(500, 120);//8:5
            twentyfivesixtysixeteenhundred.position = new Vector2(500, 150);//8:5
            eightfiftyfour.position = new Vector2(610, 30);//16:9
            tentwentyfour.position = new Vector2(610, 60);//16:9
            twelveeighty.position = new Vector2(610, 90);//16:9
            thirteensixtysix.position = new Vector2(610, 120);//16:9
            sixteenhundred.position = new Vector2(610, 150);//16:9
            nineteentwenty.position = new Vector2(610, 180);//16:9
            twentyfivesixty.position = new Vector2(610, 210);//16:9
            fullscreen.position = new Vector2(60, 480);
            windowed.position = new Vector2(170, 480);
            borderless.position = new Vector2(280, 480);
            letterboxbutton.position = new Vector2(390, 480);
            playbutton.attribute = "play";
            optionsbutton.attribute = "options";
            backbutton.attribute = "back";
            letterboxbutton.attribute = "letterbox";
            sixforty.attribute = "640x480";//4:3
            eighthundred.attribute = "800x480";//5:3
            eighthundredsixhundred.attribute = "800x600";//4:3
            eightfiftyfour.attribute = "854x480";//16:9
            tentwentyfour.attribute = "1024x576";//16:9
            tentwentyfourfiveseventysix.attribute = "1024x768";//4:3
            elevenfiftytwo.attribute = "1152x768";//3:2
            elevenfiftytwoeightsixtyfour.attribute = "1152x864";//4:3
            twelveeighty.attribute = "1280x720";//16:9
            twelveeightysevensixtyeight.attribute = "1280x768";//5:3
            twelveeightyeighthundred.attribute = "1280x800";//8:5
            twelveeightyeightfiftyfour.attribute = "1280x854";//3:2
            twelveeightyninesixty.attribute = "1280x960";//4:3
            twelveeightytentwentyfour.attribute = "1280x1024";//5:4
            thirteensixtysix.attribute = "1366x768";//16:9
            fourteenhundred.attribute = "1400x1050";//4:3
            fourteenforty.attribute = "1440x900";//8:5
            fourteenfortyninesixty.attribute = "1440x960";//3:2
            fourteenfortyteneighty.attribute = "1440x1080";//4:3
            sixteenhundred.attribute = "1600x900";//16:9
            sixteenhundredtwelvehundred.attribute = "1600x1200";//4:3
            sixteeneighty.attribute = "1680x1050";//8:5
            nineteentwenty.attribute = "1920x1080";//16:9
            nineteentwentytwelvehundred.attribute = "1920x1200";//8:5
            twentyfourtyeight.attribute = "2048x1536";//4:3
            twentyfivesixty.attribute = "2560x1440";//16:9
            twentyfivesixtysixeteenhundred.attribute = "2560x1600";//8:5
            twentyfivesixtytwentyfourtyeight.attribute = "2560x2048";//5:4
            fullscreen.attribute = "fullscreen";
            windowed.attribute = "windowed";
            borderless.attribute = "borderless";
            fullscreen.description = "This will make the game fullscreen.";
            windowed.description = "This will make the game windowed.";
            borderless.description = "This will make the current window borderless. Will not work in fullscreen.";
            letterboxbutton.description = "This will toggle on/off the letterboxes around the drawn window.";
            Vector2 menubuttonori = new Vector2(50, 20);
            playbutton.origin = menubuttonori;
            optionsbutton.origin = menubuttonori;
            backbutton.origin = menubuttonori;
            sixforty.origin = menubuttonori;
            eighthundred.origin = menubuttonori;
            eighthundredsixhundred.origin = menubuttonori;
            eightfiftyfour.origin = menubuttonori;
            tentwentyfour.origin = menubuttonori;
            tentwentyfourfiveseventysix.origin = menubuttonori;
            elevenfiftytwo.origin = menubuttonori;
            elevenfiftytwoeightsixtyfour.origin = menubuttonori;
            twelveeighty.origin = menubuttonori;
            twelveeightysevensixtyeight.origin = menubuttonori;
            twelveeightyeighthundred.origin = menubuttonori;
            twelveeightyeightfiftyfour.origin = menubuttonori;
            twelveeightyninesixty.origin = menubuttonori;
            twelveeightytentwentyfour.origin = menubuttonori;
            thirteensixtysix.origin = menubuttonori;
            fourteenhundred.origin = menubuttonori;
            fourteenforty.origin = menubuttonori;
            fourteenfortyninesixty.origin = menubuttonori;
            fourteenfortyteneighty.origin = menubuttonori;
            sixteenhundred.origin = menubuttonori;
            sixteenhundredtwelvehundred.origin = menubuttonori;
            sixteeneighty.origin = menubuttonori;
            nineteentwenty.origin = menubuttonori;
            nineteentwentytwelvehundred.origin = menubuttonori;
            twentyfourtyeight.origin = menubuttonori;
            twentyfivesixty.origin = menubuttonori;
            twentyfivesixtyfourteenforty.origin = menubuttonori;
            twentyfivesixtysixeteenhundred.origin = menubuttonori;
            twentyfivesixtytwentyfourtyeight.origin = menubuttonori;
            fullscreen.origin = menubuttonori;
            windowed.origin = menubuttonori;
            borderless.origin = menubuttonori;
            letterboxbutton.origin = menubuttonori;
            playbutton.texture = 1;
            optionsbutton.texture = 1;
            backbutton.texture = 1;
            sixforty.texture = 2;
            eighthundred.texture = 2;
            eighthundredsixhundred.texture = 2;
            eightfiftyfour.texture = 2;
            tentwentyfour.texture = 2;
            tentwentyfourfiveseventysix.texture = 2;
            elevenfiftytwo.texture = 2;
            elevenfiftytwoeightsixtyfour.texture = 2;
            twelveeighty.texture = 2;
            twelveeightysevensixtyeight.texture = 2;
            twelveeightyeighthundred.texture = 2;
            twelveeightyeightfiftyfour.texture = 2;
            twelveeightyninesixty.texture = 2;
            twelveeightytentwentyfour.texture = 2;
            thirteensixtysix.texture = 2;
            fourteenhundred.texture = 2;
            fourteenforty.texture = 2;
            fourteenfortyninesixty.texture = 2;
            fourteenfortyteneighty.texture = 2;
            sixteenhundred.texture = 2;
            sixteenhundredtwelvehundred.texture = 2;
            sixteeneighty.texture = 2;
            nineteentwenty.texture = 2;
            nineteentwentytwelvehundred.texture = 2;
            twentyfourtyeight.texture = 2;
            twentyfivesixty.texture = 2;
            twentyfivesixtysixeteenhundred.texture = 2;
            twentyfivesixtytwentyfourtyeight.texture = 2;
            fullscreen.texture = 2;
            windowed.texture = 2;
            borderless.texture = 2;
            letterboxbutton.texture = 2;

            cursor = game.Content.Load<Texture2D>("textures/whitedot");

            Vector2 offscreen = new Vector2(1500, 1000);

            // Button Definitions!
            //Breakpoint Non-Existant
            Button breakpoint = new Button();
            breakpoint.hotkey = Keys.P;
            breakpoint.attribute = "break";       
            breakpoint.position = offscreen; 
            // breakpoint.origin = ;       
            breakpoint.texture = 0;

            //Quit Non-Existant
            Button quit = new Button();
            quit.hotkey = Keys.F10;            
            quit.position = offscreen;
            // quit.origin = ;    
            quit.attribute = "exit";
            quit.texture = 0;

            //ExitButton Exists
            Button exitbutton = new Button();
            exitbutton.hotkey = Keys.F10;                   
            exitbutton.position = new Vector2(640, 650);     
            exitbutton.origin = menubuttonori;
            exitbutton.attribute = "exit";
            exitbutton.description = "Quit.";
            exitbutton.texture = 1;

            //ApplyChanges Exists
            Button applychanges = new Button();
            applychanges.hotkey = Keys.A;
            applychanges.position = new Vector2(500, 480);
            applychanges.origin = menubuttonori;
            applychanges.attribute = "applychanges";
            applychanges.description = "This will apply all changes you have made.";
            applychanges.texture = 1;

            supbuttons.AddLast(playbutton);
            supbuttons.AddLast(optionsbutton);
            supbuttons.AddLast(exitbutton);
            supbuttons.AddLast(breakpoint);
            gamebuttons.AddLast(quit);
            gamebuttons.AddLast(breakpoint);
            optionbuttons.AddLast(breakpoint);
            optionbuttons.AddLast(sixforty);
            optionbuttons.AddLast(eighthundred);
            optionbuttons.AddLast(eighthundredsixhundred);
            optionbuttons.AddLast(eightfiftyfour);
            optionbuttons.AddLast(tentwentyfour);
            optionbuttons.AddLast(tentwentyfourfiveseventysix);
            optionbuttons.AddLast(elevenfiftytwo);
            optionbuttons.AddLast(elevenfiftytwoeightsixtyfour);
            optionbuttons.AddLast(twelveeighty);
            optionbuttons.AddLast(twelveeightysevensixtyeight);
            optionbuttons.AddLast(twelveeightyeighthundred);
            optionbuttons.AddLast(twelveeightyeightfiftyfour);
            optionbuttons.AddLast(twelveeightyninesixty);
            optionbuttons.AddLast(twelveeightytentwentyfour);
            optionbuttons.AddLast(thirteensixtysix);
            optionbuttons.AddLast(fourteenhundred);
            optionbuttons.AddLast(fourteenforty);
            optionbuttons.AddLast(fourteenfortyninesixty);
            optionbuttons.AddLast(fourteenfortyteneighty);
            optionbuttons.AddLast(sixteenhundred);
            optionbuttons.AddLast(sixteenhundredtwelvehundred);
            optionbuttons.AddLast(sixteeneighty);
            optionbuttons.AddLast(nineteentwenty);
            optionbuttons.AddLast(nineteentwentytwelvehundred);
            optionbuttons.AddLast(twentyfourtyeight);
            optionbuttons.AddLast(twentyfivesixty);
            optionbuttons.AddLast(twentyfivesixtysixeteenhundred);
            optionbuttons.AddLast(twentyfivesixtytwentyfourtyeight);
            optionbuttons.AddLast(backbutton);
            optionbuttons.AddLast(fullscreen);
            optionbuttons.AddLast(windowed);
            optionbuttons.AddLast(borderless);
            optionbuttons.AddLast(letterboxbutton);
            optionbuttons.AddLast(applychanges);
            optionbuttons.AddLast(quit);
        }

        public void SelectButton(LinkedList<Button> list, string s)
        {
            foreach (Button b in list)
            {
                if (b.attribute == s)
                {
                    b.selected = true;
                }
                else
                {
                    b.selected = false;
                }
            }
        }

        public Button CheckButtons(MobaSim game, MouseState thismouse, MouseState lastmouse, Vector2 mousepos, System.Windows.Forms.Form form)
        {            
            // Check all the buttons by their hotkeys
            KeyboardState keyboard = Keyboard.GetState();
            //foreach (Button b in GetButtonList(game.GetGamestate()))
            //{
            //    if (keyboard.IsKeyDown(b.hotkey) && lastkeyboard.IsKeyUp(b.hotkey))
            //    {
            //        b.waspressed = true;
            //    }
            //    else if (keyboard.IsKeyUp(b.hotkey) && lastkeyboard.IsKeyDown(b.hotkey))
            //    {
            //        if (b.waspressed)
            //        {
            //            HandleButton(game, b);
            //        }
            //        b.waspressed = false;
            //    }
            //}
            lastkeyboard = keyboard;

            // Mouse interactions with buttons
            //foreach (Button b in GetButtonList(game.GetGamestate()))
            //{
            //    if (IsMouseOver(mousepos, b))
            //    {
            //        // First Click
            //        if (thismouse.LeftButton == ButtonState.Pressed && lastmouse.LeftButton == ButtonState.Released)
            //        {
            //            b.waspressed = true;
            //        }
            //        // Mouse release
            //        if (thismouse.LeftButton == ButtonState.Released)
            //        {
            //            if (b.waspressed)
            //            {
            //                HandleButton(game, b);
            //            }
            //            b.waspressed = false;
            //        }
            //    }
            //}

            // Window Dragging
            if (thismouse.LeftButton == ButtonState.Pressed && lastmouse.LeftButton == ButtonState.Pressed)
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
            return null;
        }
     
        public void HandleButton(MobaSim game, Button b)
        {
            switch (b.attribute)
            {
                case "play":
                    LinkedList<Button> tempbuttons = supbuttons;
                    game.SetButtons(tempbuttons);
                    break;

                case "options":
                    game.gamestate = MobaSim.State.Options;
                    game.SetButtons(optionbuttons);
                    break;

                case "exit":
                    game.Quit();
                    break;

                case "back":
                    //game.gamestate = MobaSim.State.StartUp;
                    game.SetButtons(supbuttons);
                    break;
                    
                case "break":
                    //Pause to debug
                    break;
                
                case "fullscreen":
                    settings[7] = "true";
                    break;

                case "windowed":
                    settings[7] = "false";
                    break;

                case "borderless":
                    if (settings[9] == "false")
                    {
                        settings[9] = "true";
                    }
                    else
                    {
                        settings[9] = "false";
                    }
                    break;

                case "letterbox":
                    if (settings[11] == "false")
                    {
                        settings[11] = "true";
                        switch (settings[5])
                        {
                            case "16:9":
                                break;

                            case "3:2":
                                settings[3] = Convert.ToString((int)Math.Round((2 * scale * 67) + Convert.ToInt32(settings[3])));
                                break;

                            case "4:3":
                                settings[3] = Convert.ToString((int)Math.Round((2 * scale * 120) + Convert.ToInt32(settings[3])));
                                break;

                            case "5:3":
                                settings[3] = Convert.ToString((int)Math.Round((2 * scale * 24) + Convert.ToInt32(settings[3])));
                                break;

                            case "5:4":
                                settings[3] = Convert.ToString((int)Math.Round((2 * scale * 152) + Convert.ToInt32(settings[3])));
                                break;

                            case "16:10":
                                settings[3] = Convert.ToString((int)Math.Round((2 * scale * 40) + Convert.ToInt32(settings[3])));
                                break;
                        }
                    }
                    else
                    {
                        settings[11] = "false";
                        switch (settings[5])
                        {
                            case "16:9":
                                break;

                            case "3:2":
                                settings[3] = Convert.ToString((int)Math.Round((2 * scale * -67) + Convert.ToInt32(settings[3])));
                                break;

                            case "4:3":
                                settings[3] = Convert.ToString((int)Math.Round((2 * scale * -120) + Convert.ToInt32(settings[3])));
                                break;

                            case "5:3":
                                settings[3] = Convert.ToString((int)Math.Round((2 * scale * -24) + Convert.ToInt32(settings[3])));
                                break;

                            case "5:4":
                                settings[3] = Convert.ToString((int)Math.Round((2 * scale * -152) + Convert.ToInt32(settings[3])));
                                break;

                            case "16:10":
                                settings[3] = Convert.ToString((int)Math.Round((2 * scale * -40) + Convert.ToInt32(settings[3])));
                                break;
                        }
                    }
                    break;

                case "applychanges":
                    ApplyChanges(game);
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
            SelectButton(optionbuttons, settings[1] + "x" + settings[3]);
        }

        public void ApplyChanges(MobaSim game)
        {
            game.graphics.PreferredBackBufferWidth = Convert.ToInt32(settings[1]);
            game.graphics.PreferredBackBufferHeight = Convert.ToInt32(settings[3]);
            scale = Convert.ToInt32(settings[1]) / 1280f;
            scalematrix = Matrix.CreateScale(scale, scale, 1f);
            switch (settings[5])
            {
                case "16:9":
                    letterbox = Vector2.Zero;
                    offsetvector = Vector2.Zero;
                    break;

                case "3:2":
                    letterboxon = settings[11] == "true";
                    letterbox = new Vector2(1280, 60);
                    if (letterboxon)
                    {
                        offsetvector = new Vector2(0, 60);
                    }
                    else
                    {
                        offsetvector = Vector2.Zero;
                    }
                    break;

                case "4:3":
                    letterboxon = settings[11] == "true";
                    letterbox = new Vector2(1280, 120);
                    if (letterboxon)
                    {
                        offsetvector = new Vector2(0, 120);
                    }
                    else
                    {
                        offsetvector = Vector2.Zero;
                    }
                    break;

                case "5:3":
                    letterboxon = settings[11] == "true";
                    letterbox = new Vector2(1280, 40);
                    if (letterboxon)
                    {
                        offsetvector = new Vector2(0, 40);
                    }
                    else
                    {
                        offsetvector = Vector2.Zero;
                    }
                    break;

                case "5:4":
                    letterboxon = settings[11] == "true";
                    letterbox = new Vector2(1280, 150);
                    if (letterboxon)
                    {
                        offsetvector = new Vector2(0, 150);
                    }
                    else
                    {
                        offsetvector = Vector2.Zero;
                    }
                    break;

                case "16:10":
                    letterboxon = settings[11] == "true";
                    letterbox = new Vector2(1280, 64);
                    if (letterboxon)
                    {
                        offsetvector = new Vector2(0, 64);
                    }
                    else
                    {
                        offsetvector = Vector2.Zero;
                    }
                    break;
            }
            game.graphics.IsFullScreen = (settings[7] == "true");
            if (settings[9] == "true")
            {
                IntPtr hWnd = game.Window.Handle;
                var control = System.Windows.Forms.Control.FromHandle(hWnd);
                var form = control.FindForm();
                form.FormBorderStyle = System.Windows.Forms.FormBorderStyle.None;
            }
            else
            {
                IntPtr hWnd = game.Window.Handle;
                var control = System.Windows.Forms.Control.FromHandle(hWnd);
                var form = control.FindForm();
                form.FormBorderStyle = System.Windows.Forms.FormBorderStyle.FixedSingle;
            }
            game.graphics.ApplyChanges();
            string text = "DisplayWidth = " + settings[1] + ";\n" + "DisplayHeight = " + settings[3] + ";\n" + "AspectRatio = " + settings[5] + ";\n" + "Fullscreen = " + settings[7] + ";\n" + "Borderless = " + settings[9] + ";\n" + "Letterbox = " + settings[11] + ";";
            // WriteAllText creates a file, writes the specified string to the file, 
            // and then closes the file.
            System.IO.File.WriteAllText(@directory, text);
        }

        private bool IsMouseOver(Vector2 mouse, Button b)
        {
            if (mouse.X >= b.position.X - b.origin.X && mouse.X <= b.position.X + b.origin.X)
            {
                if (mouse.Y >= offsetvector.Y + b.position.Y - b.origin.Y && mouse.Y <= offsetvector.Y + b.position.Y + b.origin.Y)
                {
                    return true;
                }
            }
            return false;
        }

        public string getSetting(int index)
        {
            return settings[index];
        }

        public void DrawLetterbox(GraphicsDevice graphics, SpriteBatch spriteBatch)
        {
            if (letterboxon)
            {
                Texture2D texture = new Texture2D(graphics, 1, 1, false, SurfaceFormat.Color);
                texture.SetData<Color>(new Color[] { Color.White }); 
                spriteBatch.Draw(texture, new Rectangle(0, 0, (int)letterbox.X, (int)letterbox.Y), Color.Black);
                spriteBatch.Draw(texture, new Rectangle(0, (int)offsetvector.Y, (int)letterbox.X, (int)letterbox.Y), Color.Black);
            }
        }

        private bool IsMouseOver(Vector2 mouse, Button b, Vector2 offsetvector)
        {
            if (mouse.X >= b.position.X - b.origin.X && mouse.X <= b.position.X + b.origin.X)
            {
                if (mouse.Y >= offsetvector.Y + b.position.Y - b.origin.Y && mouse.Y <= offsetvector.Y + b.position.Y + b.origin.Y)
                {
                    return true;
                }
            }
            return false;
        }
    }
}
