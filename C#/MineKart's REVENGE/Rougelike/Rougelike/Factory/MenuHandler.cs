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
        private LinkedList<Button> titlebuttons = new LinkedList<Button>();
        private LinkedList<Button> resolutionbuttons = new LinkedList<Button>();
        private LinkedList<Button> gamebuttons = new LinkedList<Button>();

        // Stuff for letterbox and aspect ratios
        private bool letterboxon;
        private Texture2D letterbox;
        private Texture2D letterbox32;
        private Texture2D letterbox43;
        private Texture2D letterbox53;
        private Texture2D letterbox54;
        private Texture2D letterbox1610;

        private Texture2D cursor;
        private Texture2D selection;
        private Button drag;
        private Vector2 windowpos;
        private Vector2 mousesnap;
        // Stuff for scaling resolutions
        private float scale;
        private Matrix scalematrix;
        private int offset;
        private Vector2 offsetvector;
        private Vector2 tileoffset;
        private Vector2 seventwenty;
        private KeyboardState lastkeyboard;

        private string directory = (Directory.GetCurrentDirectory() + "\\settings.ini");

        public MenuHandler(MKRevenge game)
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
            tileoffset = new Vector2(320, 680);
            seventwenty = new Vector2(0, 720);

            windowpos.X = game.Window.ClientBounds.Left;
            windowpos.Y = game.Window.ClientBounds.Top;

            // Buttons
            drag = new Button();
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
            Vector2 offscreen = new Vector2(-1, -1);
            drag.position = new Vector2(360, 15);
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
            drag.attribute = "drag";
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
            Vector2 menubuttonori2 = new Vector2(80, 40);
            drag.origin = new Vector2(360, 15);
            playbutton.origin = menubuttonori2;
            optionsbutton.origin = menubuttonori2;
            backbutton.origin = menubuttonori2;
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
            playbutton.texture = game.Content.Load<Texture2D>("textures/play");
            optionsbutton.texture = game.Content.Load<Texture2D>("textures/options");
            backbutton.texture = game.Content.Load<Texture2D>("textures/back");
            sixforty.texture = game.Content.Load<Texture2D>("textures/640x480");
            eighthundred.texture = game.Content.Load<Texture2D>("textures/800x480");
            eighthundredsixhundred.texture = game.Content.Load<Texture2D>("textures/800x600");
            eightfiftyfour.texture = game.Content.Load<Texture2D>("textures/854x480");
            tentwentyfour.texture = game.Content.Load<Texture2D>("textures/1024x576");
            tentwentyfourfiveseventysix.texture = game.Content.Load<Texture2D>("textures/1024x768");
            elevenfiftytwo.texture = game.Content.Load<Texture2D>("textures/1152x768");
            elevenfiftytwoeightsixtyfour.texture = game.Content.Load<Texture2D>("textures/1152x864");
            twelveeighty.texture = game.Content.Load<Texture2D>("textures/1280x720");
            twelveeightysevensixtyeight.texture = game.Content.Load<Texture2D>("textures/1280x768");
            twelveeightyeighthundred.texture = game.Content.Load<Texture2D>("textures/1280x800");
            twelveeightyeightfiftyfour.texture = game.Content.Load<Texture2D>("textures/1280x854");
            twelveeightyninesixty.texture = game.Content.Load<Texture2D>("textures/1280x960");
            twelveeightytentwentyfour.texture = game.Content.Load<Texture2D>("textures/1280x1024");
            thirteensixtysix.texture = game.Content.Load<Texture2D>("textures/1366x768");
            fourteenhundred.texture = game.Content.Load<Texture2D>("textures/1400x1050");
            fourteenforty.texture = game.Content.Load<Texture2D>("textures/1440x900");
            fourteenfortyninesixty.texture = game.Content.Load<Texture2D>("textures/1440x960");
            fourteenfortyteneighty.texture = game.Content.Load<Texture2D>("textures/1440x1080");
            sixteenhundred.texture = game.Content.Load<Texture2D>("textures/1600x900");
            sixteenhundredtwelvehundred.texture = game.Content.Load<Texture2D>("textures/1600x1200");
            sixteeneighty.texture = game.Content.Load<Texture2D>("textures/1680x1050");
            nineteentwenty.texture = game.Content.Load<Texture2D>("textures/1920x1080");
            nineteentwentytwelvehundred.texture = game.Content.Load<Texture2D>("textures/1920x1200");
            twentyfourtyeight.texture = game.Content.Load<Texture2D>("textures/2048x1536");
            twentyfivesixty.texture = game.Content.Load<Texture2D>("textures/2560x1440");
            twentyfivesixtysixeteenhundred.texture = game.Content.Load<Texture2D>("textures/2560x1600");
            twentyfivesixtytwentyfourtyeight.texture = game.Content.Load<Texture2D>("textures/2560x2048");
            fullscreen.texture = game.Content.Load<Texture2D>("textures/fullscreen");
            windowed.texture = game.Content.Load<Texture2D>("textures/windowed");
            borderless.texture = game.Content.Load<Texture2D>("textures/borderless");
            letterboxbutton.texture = game.Content.Load<Texture2D>("textures/letterbox");
            letterbox32 = game.Content.Load<Texture2D>("textures/letterbox32");
            letterbox43 = game.Content.Load<Texture2D>("textures/letterbox43");
            letterbox53 = game.Content.Load<Texture2D>("textures/letterbox53");
            letterbox54 = game.Content.Load<Texture2D>("textures/letterbox54");
            letterbox1610 = game.Content.Load<Texture2D>("textures/letterbox1610");
            drag.texture = game.Content.Load<Texture2D>("textures/invisablebox");

            cursor = game.Content.Load<Texture2D>("textures/whitedot");
            selection = game.Content.Load<Texture2D>("textures/selection");

            // Button Definitions!
            //Breakpoint Non-Existant
            Button breakpoint = new Button();
            breakpoint.hotkey = Keys.P;
            breakpoint.attribute = "break";       
            breakpoint.position = offscreen; 
            // breakpoint.origin = ;       
            breakpoint.texture = game.Content.Load<Texture2D>("textures/invispixel");

            //Pause Non-Existant
            Button pause = new Button();
            pause.hotkey = Keys.Space;
            pause.position = offscreen;
            // pause.origin = ;       
            pause.attribute = "pause";
            pause.texture = game.Content.Load<Texture2D>("textures/invispixel");

            //Quit Non-Existant
            Button quit = new Button();
            quit.hotkey = Keys.F10;            
            quit.position = offscreen;
            // quit.origin = ;    
            quit.attribute = "exit";
            quit.texture = game.Content.Load<Texture2D>("textures/invispixel");

            //ExitButton Exists
            Button exitbutton = new Button();
            exitbutton.hotkey = Keys.F10;                   
            exitbutton.position = new Vector2(640, 650);     
            exitbutton.origin = menubuttonori2;
            exitbutton.attribute = "exit";
            exitbutton.description = "Quit.";
            exitbutton.texture = game.Content.Load<Texture2D>("textures/exit");

            //ApplyChanges Exists
            Button applychanges = new Button();
            applychanges.hotkey = Keys.A;
            applychanges.position = new Vector2(500, 480);
            applychanges.origin = menubuttonori;
            applychanges.attribute = "applychanges";
            applychanges.description = "This will apply all changes you have made.";
            applychanges.texture = game.Content.Load<Texture2D>("textures/applychanges");

            titlebuttons.AddLast(playbutton);
            titlebuttons.AddLast(optionsbutton);
            titlebuttons.AddLast(exitbutton);
            titlebuttons.AddLast(drag);
            titlebuttons.AddLast(breakpoint);
            gamebuttons.AddLast(drag);
            gamebuttons.AddLast(pause);
            gamebuttons.AddLast(quit);
            gamebuttons.AddLast(breakpoint);
            resolutionbuttons.AddLast(breakpoint);
            resolutionbuttons.AddLast(sixforty);
            resolutionbuttons.AddLast(eighthundred);
            resolutionbuttons.AddLast(eighthundredsixhundred);
            resolutionbuttons.AddLast(eightfiftyfour);
            resolutionbuttons.AddLast(tentwentyfour);
            resolutionbuttons.AddLast(tentwentyfourfiveseventysix);
            resolutionbuttons.AddLast(elevenfiftytwo);
            resolutionbuttons.AddLast(elevenfiftytwoeightsixtyfour);
            resolutionbuttons.AddLast(twelveeighty);
            resolutionbuttons.AddLast(twelveeightysevensixtyeight);
            resolutionbuttons.AddLast(twelveeightyeighthundred);
            resolutionbuttons.AddLast(twelveeightyeightfiftyfour);
            resolutionbuttons.AddLast(twelveeightyninesixty);
            resolutionbuttons.AddLast(twelveeightytentwentyfour);
            resolutionbuttons.AddLast(thirteensixtysix);
            resolutionbuttons.AddLast(fourteenhundred);
            resolutionbuttons.AddLast(fourteenforty);
            resolutionbuttons.AddLast(fourteenfortyninesixty);
            resolutionbuttons.AddLast(fourteenfortyteneighty);
            resolutionbuttons.AddLast(sixteenhundred);
            resolutionbuttons.AddLast(sixteenhundredtwelvehundred);
            resolutionbuttons.AddLast(sixteeneighty);
            resolutionbuttons.AddLast(nineteentwenty);
            resolutionbuttons.AddLast(nineteentwentytwelvehundred);
            resolutionbuttons.AddLast(twentyfourtyeight);
            resolutionbuttons.AddLast(twentyfivesixty);
            resolutionbuttons.AddLast(twentyfivesixtysixeteenhundred);
            resolutionbuttons.AddLast(twentyfivesixtytwentyfourtyeight);
            resolutionbuttons.AddLast(backbutton);
            resolutionbuttons.AddLast(fullscreen);
            resolutionbuttons.AddLast(windowed);
            resolutionbuttons.AddLast(borderless);
            resolutionbuttons.AddLast(letterboxbutton);
            resolutionbuttons.AddLast(applychanges);
            resolutionbuttons.AddLast(drag);
            resolutionbuttons.AddLast(quit);
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

        public bool CheckButtons(MKRevenge game, MouseState thismouse, MouseState lastmouse, Vector2 mouse, System.Windows.Forms.Form form)
        {
            KeyboardState keyboard = Keyboard.GetState();
            foreach (Button b in game.GetButtonlist())
            {
                if (keyboard.IsKeyDown(b.hotkey) && lastkeyboard.IsKeyUp(b.hotkey))
                {
                    b.waspressed = true;
                }
                else if (keyboard.IsKeyUp(b.hotkey) && lastkeyboard.IsKeyDown(b.hotkey))
                {
                    if (b.waspressed)
                    {
                        HandleButton(game, b);
                    }
                    b.waspressed = false;
                }
            }
            lastkeyboard = keyboard;

            foreach (Button b in game.GetButtonlist())
            {
                if (IsMouseOver(mouse, b, offsetvector))
                {
                    // First Click
                    if (thismouse.LeftButton == ButtonState.Pressed && lastmouse.LeftButton == ButtonState.Released)
                    {
                        if (b.attribute == "drag")
                        {
                            windowpos.X = game.Window.ClientBounds.Left;
                            windowpos.Y = game.Window.ClientBounds.Top;
                            mousesnap.X = System.Windows.Forms.Control.MousePosition.X;
                            mousesnap.Y = System.Windows.Forms.Control.MousePosition.Y;
                        }
                        b.waspressed = true;
                    }
                    // Dragging
                    if (b.attribute == "drag" && b.waspressed)
                    {
                        form.Location = new System.Drawing.Point((int)(windowpos.X + System.Windows.Forms.Control.MousePosition.X - mousesnap.X), (int)(windowpos.Y + System.Windows.Forms.Control.MousePosition.Y - mousesnap.Y));
                    }
                    //else if (thismouse.LeftButton == ButtonState.Pressed && lastmouse.LeftButton == ButtonState.Pressed)
                    //{

                    //}
                    // Released
                    if (thismouse.LeftButton == ButtonState.Released)
                    {
                        if (b.waspressed)
                        {
                            HandleButton(game, b);
                        }
                        b.waspressed = false;
                    }
                    return true;
                }
            }
            return false;
        }

        public void HandleButton(MKRevenge game, Button b)
        {
            switch (b.attribute)
            {
                case "play":
                    game.gamestate = MKRevenge.State.Game;
                    game.SetButtons(gamebuttons);
                    break;

                case "options":
                    game.gamestate = MKRevenge.State.Options;
                    game.SetButtons(resolutionbuttons);
                    break;

                case "exit":
                    game.Quit();
                    break;

                case "back":
                    game.gamestate = MKRevenge.State.Title;
                    game.SetButtons(titlebuttons);
                    break;

                case "pause":
                    game.TogglePause();
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
            SelectButton(resolutionbuttons, settings[1] + "x" + settings[3]);
        }

        public void ApplyChanges(MKRevenge game)
        {
            game.graphics.PreferredBackBufferWidth = Convert.ToInt32(settings[1]);
            game.graphics.PreferredBackBufferHeight = Convert.ToInt32(settings[3]);
            scale = Convert.ToInt32(settings[1]) / 1280f;
            scalematrix = Matrix.CreateScale(scale, scale, 1f);
            switch (settings[5])
            {
                case "16:9":
                    letterboxon = false;
                    letterbox = drag.texture;
                    offsetvector = Vector2.Zero;
                    break;

                case "3:2":
                    letterboxon = settings[11] == "true";
                    letterbox = letterbox32;
                    if (letterboxon)
                    {
                        offset = (int)Math.Round(67d);
                    }
                    else
                    {
                        offset = 0;
                    }
                    offsetvector = new Vector2(0, offset);
                    break;

                case "4:3":
                    letterboxon = settings[11] == "true";
                    letterbox = letterbox43;
                    if (letterboxon)
                    {
                        offset = (int)Math.Round(120d);
                    }
                    else
                    {
                        offset = 0;
                    }
                    offsetvector = new Vector2(0, offset);
                    break;

                case "5:3":
                    letterboxon = settings[11] == "true";
                    letterbox = letterbox53;
                    if (letterboxon)
                    {
                        offset = (int)Math.Round(24d);
                    }
                    else
                    {
                        offset = 0;
                    }
                    offsetvector = new Vector2(0, offset);
                    break;

                case "5:4":
                    letterboxon = settings[11] == "true";
                    letterbox = letterbox54;
                    if (letterboxon)
                    {
                        offset = (int)Math.Round(152d);
                    }
                    else
                    {
                        offset = 0;
                    }
                    offsetvector = new Vector2(0, offset);
                    break;

                case "16:10":
                    letterboxon = settings[11] == "true";
                    letterbox = letterbox1610;
                    if (letterboxon)
                    {
                        offset = (int)Math.Round(40d);
                    }
                    else
                    {
                        offset = 0;
                    }
                    offsetvector = new Vector2(0, offset);
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

        public string getSetting(int index)
        {
            return settings[index];
        }

        public void DrawLetterbox(SpriteBatch spriteBatch, Vector2 offset)
        {
            if (letterboxon)
            {
                spriteBatch.Draw(letterbox, Vector2.Zero, null, Color.White, 0, Vector2.Zero, 1, SpriteEffects.None, 0);
                spriteBatch.Draw(letterbox, offset, null, Color.White, 0, Vector2.Zero, 1, SpriteEffects.None, 0);
            }
            else
            {
                spriteBatch.Draw(drag.texture, Vector2.Zero, null, Color.White, 0, Vector2.Zero, 1, SpriteEffects.None, 0);
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

        public Texture2D GetCursor()
        {
            return cursor;
        }

        public float GetScale()
        {
            return scale;
        }

        public Matrix GetScaleMatrix()
        {
            return scalematrix;
        }

        public Vector2 GetOffsetVector()
        {
            return offsetvector;
        }

        public LinkedList<Button> GetTitleButtons()
        {
            return titlebuttons;
        }

        public Vector2 GetTileOffset()
        {
            return tileoffset;
        }
    }
}
