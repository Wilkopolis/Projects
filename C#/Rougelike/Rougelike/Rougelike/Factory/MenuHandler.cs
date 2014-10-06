using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.IO;
using Rougelike.Util;
using Microsoft.Xna.Framework.Graphics;
using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Input;
using Rougelike.Types;

namespace Rougelike.Factory
{
    partial class MenuHandler
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

        public Texture2D Cursor;
        private Texture2D tempcursor;
        public Texture2D Selection;
        private Button drag;
        private Vector2 windowpos;
        private Vector2 mousesnap;
        // Stuff for scaling resolutions
        public float scale;
        public Matrix scalematrix;
        private int offset;
        public Vector2 OffsetVector;
        private Vector2 tileoffset;
        private Vector2 seventwenty;
        private KeyboardState lastkeyboard;

        private string directory = (Directory.GetCurrentDirectory() + "\\settings.ini");

        // Engine Stuff
        // --------------
        // Game Stuff

        private InvButton tempinvbutton;
        private Item tempitem;
        private bool dragging;
        private bool itemdragging;
        
        public LinkedList<Description> DescriptionList = new LinkedList<Description>();

        public MenuHandler(Rougelike game)
        {
            #region
            // Load Settings
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
            game.Graphics.PreferredBackBufferWidth = Convert.ToInt32(settings[1]);
            game.Graphics.PreferredBackBufferHeight = Convert.ToInt32(settings[3]);
            game.Graphics.IsFullScreen = (settings[7] == "true");
            //Graphics.SynchronizeWithVerticalRetrace = false;
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
            OffsetVector = Vector2.Zero;
            tileoffset = new Vector2(320, 660);
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
            drag.Position = new Vector2(360, 15);
            playbutton.Position = new Vector2(640, 450);
            optionsbutton.Position = new Vector2(640, 550);
            backbutton.Position = new Vector2(640, 650);
            elevenfiftytwo.Position = new Vector2(60, 30);//32
            twelveeightyeightfiftyfour.Position = new Vector2(60, 60);//32
            fourteenfortyninesixty.Position = new Vector2(60, 90);//32
            sixforty.Position = new Vector2(170, 30);//43
            eighthundredsixhundred.Position = new Vector2(170, 60);//43
            tentwentyfourfiveseventysix.Position = new Vector2(170, 90);//43
            elevenfiftytwoeightsixtyfour.Position = new Vector2(170, 120);//43
            twelveeightyninesixty.Position = new Vector2(170, 150);//43
            fourteenhundred.Position = new Vector2(170, 180);//43
            fourteenfortyteneighty.Position = new Vector2(170, 210);//43
            sixteenhundredtwelvehundred.Position = new Vector2(170, 240);//43
            twentyfourtyeight.Position = new Vector2(170, 270);//43
            eighthundred.Position = new Vector2(280, 30);//53
            twelveeightysevensixtyeight.Position = new Vector2(280, 60);//53
            twelveeightytentwentyfour.Position = new Vector2(390, 30);//54
            twentyfivesixtytwentyfourtyeight.Position = new Vector2(390, 60);//54
            twelveeightyeighthundred.Position = new Vector2(500, 30);//85
            fourteenforty.Position = new Vector2(500, 60);//85
            sixteeneighty.Position = new Vector2(500, 90);//85
            nineteentwentytwelvehundred.Position = new Vector2(500, 120);//85
            twentyfivesixtysixeteenhundred.Position = new Vector2(500, 150);//85
            eightfiftyfour.Position = new Vector2(610, 30);//169
            tentwentyfour.Position = new Vector2(610, 60);//169
            twelveeighty.Position = new Vector2(610, 90);//169
            thirteensixtysix.Position = new Vector2(610, 120);//169
            sixteenhundred.Position = new Vector2(610, 150);//169
            nineteentwenty.Position = new Vector2(610, 180);//169
            twentyfivesixty.Position = new Vector2(610, 210);//169
            fullscreen.Position = new Vector2(60, 480);
            windowed.Position = new Vector2(170, 480);
            borderless.Position = new Vector2(280, 480);
            letterboxbutton.Position = new Vector2(390, 480);
            playbutton.Attribute = "play";
            optionsbutton.Attribute = "options";
            backbutton.Attribute = "back";
            drag.Attribute = "drag";
            letterboxbutton.Attribute = "letterbox";
            sixforty.Attribute = "640x480";//43
            eighthundred.Attribute = "800x480";//53
            eighthundredsixhundred.Attribute = "800x600";//43
            eightfiftyfour.Attribute = "854x480";//169
            tentwentyfour.Attribute = "1024x576";//169
            tentwentyfourfiveseventysix.Attribute = "1024x768";//43
            elevenfiftytwo.Attribute = "1152x768";//32
            elevenfiftytwoeightsixtyfour.Attribute = "1152x864";//43
            twelveeighty.Attribute = "1280x720";//169
            twelveeightysevensixtyeight.Attribute = "1280x768";//53
            twelveeightyeighthundred.Attribute = "1280x800";//85
            twelveeightyeightfiftyfour.Attribute = "1280x854";//32
            twelveeightyninesixty.Attribute = "1280x960";//43
            twelveeightytentwentyfour.Attribute = "1280x1024";//54
            thirteensixtysix.Attribute = "1366x768";//169
            fourteenhundred.Attribute = "1400x1050";//43
            fourteenforty.Attribute = "1440x900";//85
            fourteenfortyninesixty.Attribute = "1440x960";//32
            fourteenfortyteneighty.Attribute = "1440x1080";//43
            sixteenhundred.Attribute = "1600x900";//169
            sixteenhundredtwelvehundred.Attribute = "1600x1200";//43
            sixteeneighty.Attribute = "1680x1050";//85
            nineteentwenty.Attribute = "1920x1080";//169
            nineteentwentytwelvehundred.Attribute = "1920x1200";//85
            twentyfourtyeight.Attribute = "2048x1536";//43
            twentyfivesixty.Attribute = "2560x1440";//169
            twentyfivesixtysixeteenhundred.Attribute = "2560x1600";//85
            twentyfivesixtytwentyfourtyeight.Attribute = "2560x2048";//54
            fullscreen.Attribute = "fullscreen";
            windowed.Attribute = "windowed";
            borderless.Attribute = "borderless";
            fullscreen.Description = "This will make the game fullscreen.";
            windowed.Description = "This will make the game windowed.";
            borderless.Description = "This will make the current window borderless. Will not work in fullscreen.";
            letterboxbutton.Description = "This will toggle on/off the letterboxes around the drawn window.";
            Vector2 menubuttonori = new Vector2(50, 10);
            Vector2 menubuttonori2 = new Vector2(80, 40);
            drag.Origin = new Vector2(360, 15);
            playbutton.Origin = menubuttonori2;
            optionsbutton.Origin = menubuttonori2;
            backbutton.Origin = menubuttonori2;
            sixforty.Origin = menubuttonori;
            eighthundred.Origin = menubuttonori;
            eighthundredsixhundred.Origin = menubuttonori;
            eightfiftyfour.Origin = menubuttonori;
            tentwentyfour.Origin = menubuttonori;
            tentwentyfourfiveseventysix.Origin = menubuttonori;
            elevenfiftytwo.Origin = menubuttonori;
            elevenfiftytwoeightsixtyfour.Origin = menubuttonori;
            twelveeighty.Origin = menubuttonori;
            twelveeightysevensixtyeight.Origin = menubuttonori;
            twelveeightyeighthundred.Origin = menubuttonori;
            twelveeightyeightfiftyfour.Origin = menubuttonori;
            twelveeightyninesixty.Origin = menubuttonori;
            twelveeightytentwentyfour.Origin = menubuttonori;
            thirteensixtysix.Origin = menubuttonori;
            fourteenhundred.Origin = menubuttonori;
            fourteenforty.Origin = menubuttonori;
            fourteenfortyninesixty.Origin = menubuttonori;
            fourteenfortyteneighty.Origin = menubuttonori;
            sixteenhundred.Origin = menubuttonori;
            sixteenhundredtwelvehundred.Origin = menubuttonori;
            sixteeneighty.Origin = menubuttonori;
            nineteentwenty.Origin = menubuttonori;
            nineteentwentytwelvehundred.Origin = menubuttonori;
            twentyfourtyeight.Origin = menubuttonori;
            twentyfivesixty.Origin = menubuttonori;
            twentyfivesixtyfourteenforty.Origin = menubuttonori;
            twentyfivesixtysixeteenhundred.Origin = menubuttonori;
            twentyfivesixtytwentyfourtyeight.Origin = menubuttonori;
            fullscreen.Origin = menubuttonori;
            windowed.Origin = menubuttonori;
            borderless.Origin = menubuttonori;
            letterboxbutton.Origin = menubuttonori;
            playbutton.Sprite = game.Content.Load<Texture2D>("textures/menubuttons/play");
            optionsbutton.Sprite = game.Content.Load<Texture2D>("textures/menubuttons/options");
            backbutton.Sprite = game.Content.Load<Texture2D>("textures/optionsbuttons/back");
            sixforty.Sprite = game.Content.Load<Texture2D>("textures/optionsbuttons/640x480");
            eighthundred.Sprite = game.Content.Load<Texture2D>("textures/optionsbuttons/800x480");
            eighthundredsixhundred.Sprite = game.Content.Load<Texture2D>("textures/optionsbuttons/800x600");
            eightfiftyfour.Sprite = game.Content.Load<Texture2D>("textures/optionsbuttons/854x480");
            tentwentyfour.Sprite = game.Content.Load<Texture2D>("textures/optionsbuttons/1024x576");
            tentwentyfourfiveseventysix.Sprite = game.Content.Load<Texture2D>("textures/optionsbuttons/1024x768");
            elevenfiftytwo.Sprite = game.Content.Load<Texture2D>("textures/optionsbuttons/1152x768");
            elevenfiftytwoeightsixtyfour.Sprite = game.Content.Load<Texture2D>("textures/optionsbuttons/1152x864");
            twelveeighty.Sprite = game.Content.Load<Texture2D>("textures/optionsbuttons/1280x720");
            twelveeightysevensixtyeight.Sprite = game.Content.Load<Texture2D>("textures/optionsbuttons/1280x768");
            twelveeightyeighthundred.Sprite = game.Content.Load<Texture2D>("textures/optionsbuttons/1280x800");
            twelveeightyeightfiftyfour.Sprite = game.Content.Load<Texture2D>("textures/optionsbuttons/1280x854");
            twelveeightyninesixty.Sprite = game.Content.Load<Texture2D>("textures/optionsbuttons/1280x960");
            twelveeightytentwentyfour.Sprite = game.Content.Load<Texture2D>("textures/optionsbuttons/1280x1024");
            thirteensixtysix.Sprite = game.Content.Load<Texture2D>("textures/optionsbuttons/1366x768");
            fourteenhundred.Sprite = game.Content.Load<Texture2D>("textures/optionsbuttons/1400x1050");
            fourteenforty.Sprite = game.Content.Load<Texture2D>("textures/optionsbuttons/1440x900");
            fourteenfortyninesixty.Sprite = game.Content.Load<Texture2D>("textures/optionsbuttons/1440x960");
            fourteenfortyteneighty.Sprite = game.Content.Load<Texture2D>("textures/optionsbuttons/1440x1080");
            sixteenhundred.Sprite = game.Content.Load<Texture2D>("textures/optionsbuttons/1600x900");
            sixteenhundredtwelvehundred.Sprite = game.Content.Load<Texture2D>("textures/optionsbuttons/1600x1200");
            sixteeneighty.Sprite = game.Content.Load<Texture2D>("textures/optionsbuttons/1680x1050");
            nineteentwenty.Sprite = game.Content.Load<Texture2D>("textures/optionsbuttons/1920x1080");
            nineteentwentytwelvehundred.Sprite = game.Content.Load<Texture2D>("textures/optionsbuttons/1920x1200");
            twentyfourtyeight.Sprite = game.Content.Load<Texture2D>("textures/optionsbuttons/2048x1536");
            twentyfivesixty.Sprite = game.Content.Load<Texture2D>("textures/optionsbuttons/2560x1440");
            twentyfivesixtysixeteenhundred.Sprite = game.Content.Load<Texture2D>("textures/optionsbuttons/2560x1600");
            twentyfivesixtytwentyfourtyeight.Sprite = game.Content.Load<Texture2D>("textures/optionsbuttons/2560x2048");
            fullscreen.Sprite = game.Content.Load<Texture2D>("textures/optionsbuttons/fullscreen");
            windowed.Sprite = game.Content.Load<Texture2D>("textures/optionsbuttons/windowed");
            borderless.Sprite = game.Content.Load<Texture2D>("textures/optionsbuttons/borderless");
            letterboxbutton.Sprite = game.Content.Load<Texture2D>("textures/optionsbuttons/letterbox");
            letterbox32 = game.Content.Load<Texture2D>("textures/optionsbuttons/letterbox");
            letterbox43 = game.Content.Load<Texture2D>("textures/optionsbuttons/letterbox");
            letterbox53 = game.Content.Load<Texture2D>("textures/optionsbuttons/letterbox");
            letterbox54 = game.Content.Load<Texture2D>("textures/optionsbuttons/letterbox");
            letterbox1610 = game.Content.Load<Texture2D>("textures/optionsbuttons/letterbox");
            drag.Sprite = game.Content.Load<Texture2D>("textures/optionsbuttons/invisablebox");

            Cursor = game.Content.Load<Texture2D>("textures/menubuttons/cursor");
            Selection = game.Content.Load<Texture2D>("textures/optionsbuttons/selection");
            #endregion

            // Button Definitions!
            //Breakpoint Non-Existant
            Button breakpoint = new Button();
            breakpoint.Hotkey = Keys.P;
            breakpoint.Attribute = "break";
            breakpoint.Position = offscreen;
            // breakpoint.Origin = ;       
            breakpoint.Sprite = game.Content.Load<Texture2D>("textures/gamebuttons/invispixel");
            
            //Quit Non-Existant
            Button quit = new Button();
            quit.Hotkey = Keys.F10;
            quit.Position = offscreen;
            // quit.Origin = ;    
            quit.Attribute = "exit";
            quit.Sprite = game.Content.Load<Texture2D>("textures/gamebuttons/invispixel");

            //ExitButton Exists
            Button exitbutton = new Button();
            exitbutton.Hotkey = Keys.F10;
            exitbutton.Position = new Vector2(640, 650);
            exitbutton.Origin = menubuttonori2;
            exitbutton.Attribute = "exit";
            exitbutton.Description = "Quit.";
            exitbutton.Sprite = game.Content.Load<Texture2D>("textures/menubuttons/exit");

            //ApplyChanges Exists
            Button applychanges = new Button();
            applychanges.Hotkey = Keys.A;
            applychanges.Position = new Vector2(500, 480);
            applychanges.Origin = menubuttonori;
            applychanges.Attribute = "applychanges";
            applychanges.Description = "This will apply all changes you have made.";
            applychanges.Sprite = game.Content.Load<Texture2D>("textures/optionsbuttons/applychanges");

            //Endturn Exists
            Button endturn = new Button();
            endturn.Hotkey = Keys.Space;
            endturn.Position = offscreen;
            // endturn.Origin = ;    
            endturn.Attribute = "endturn";
            endturn.Sprite = game.Content.Load<Texture2D>("textures/gamebuttons/invispixel");

            //Attack Exists
            Button attack = new Button();
            attack.Hotkey = Keys.A;
            attack.Position = offscreen;
            // attack.Origin = ;
            attack.Attribute = "attack";
            attack.Sprite = game.Content.Load<Texture2D>("textures/gamebuttons/invispixel");

            //CycleEnemy Exists
            Button cycle = new Button();
            cycle.Hotkey = Keys.W;
            cycle.Position = offscreen;
            cycle.Attribute = "cycle";
            cycle.Sprite = game.Content.Load<Texture2D>("textures/gamebuttons/invispixel");

            //Pickup Exists
            Button pickup = new Button();
            pickup.Hotkey = Keys.S;
            pickup.Position = offscreen;
            pickup.Attribute = "pickup";
            pickup.Sprite = game.Content.Load<Texture2D>("textures/gamebuttons/invispixel");

            //Enter Exists
            Button enter = new Button();
            enter.Hotkey = Keys.D;
            enter.Position = offscreen;
            enter.Attribute = "enter";
            enter.Sprite = game.Content.Load<Texture2D>("textures/gamebuttons/invispixel");

            titlebuttons.AddLast(playbutton);
            titlebuttons.AddLast(optionsbutton);
            titlebuttons.AddLast(exitbutton);
            titlebuttons.AddLast(drag);
            titlebuttons.AddLast(breakpoint);
            gamebuttons.AddLast(quit);
            gamebuttons.AddLast(breakpoint);
            gamebuttons.AddLast(endturn);
            gamebuttons.AddLast(attack);
            gamebuttons.AddLast(cycle);
            gamebuttons.AddLast(pickup);
            gamebuttons.AddLast(enter);
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

        public void SelectButton(LinkedList<Button> List, string String)
        {
            foreach (Button b in List)
            {
                if (b.Attribute == String)
                {
                    b.Selected = true;
                }
                else
                {
                    b.Selected = false;
                }
            }
        }

        private bool Move(Vector2 mouse, Player Kevin, Room Room)
        {
            if (Kevin.Movements == null)
                return false;

            foreach (Movement movement in Kevin.Movements)
            {
                if (IsMouseOverM(mouse, movement) && Kevin.AP >= movement.Cost)
                {
                    Kevin.Position = new Vector2(movement.X, movement.Y);
                    Kevin.AP = Kevin.AP - movement.Cost;
                    Room.UpdateTiles();
                    Creature.DoTurn(Kevin, Room, Kevin);
                    return true;
                }
            }
            return false;
        }

        private bool Attack(Vector2 mouse, Player Kevin, Room Room)
        {
            foreach (Attack option in Kevin.Attacks)
            {
                if (IsMouseOverT(mouse, (int)option.Target.Position.X, (int)option.Target.Position.Y))
                {
                    Creature.Attack(Kevin, option.Target, Room);
                    Creature.DoTurn(Kevin, Room, Kevin);
                    return true;
                }
            }
            return false;
        }

        public void HandleButton(Rougelike game, Button b)
        {
            switch (b.Attribute)
            {
                case "enter":
                    if (game.Save.GetRoom().Tiles[(int)game.Save.Kevin.Position.X, (int)game.Save.Kevin.Position.Y].Door)
                    {
                        game.Save.GetRoom().Remove(game.Save.Kevin);
                        if (game.Save.Kevin.Position.X == 0)
                        {
                            game.Save.GetFloor().Position += new Vector2(-1, 0);
                            game.Save.GetRoom().Visible = true;
                            for (int i = 1; i < 8; i++)
                            {
                                if (game.Save.GetRoom().Tiles[14, i].Door)
                                {
                                    game.Save.Kevin.Position = new Vector2(14, i);
                                }
                            }
                        }
                        else if ((int)game.Save.Kevin.Position.X == 14)
                        {
                            game.Save.GetFloor().Position += new Vector2(1, 0);
                            game.Save.GetRoom().Visible = true;
                            for (int i = 1; i < 8; i++)
                            {
                                if (game.Save.GetRoom().Tiles[0, i].Door)
                                {
                                    game.Save.Kevin.Position = new Vector2(0, i);
                                }
                            }
                        }
                        else if ((int)game.Save.Kevin.Position.Y == 0)
                        {
                            game.Save.GetFloor().Position += new Vector2(0, -1);
                            game.Save.GetRoom().Visible = true;
                            for (int i = 1; i < 13; i++)
                            {
                                if (game.Save.GetRoom().Tiles[i, 9].Door)
                                {
                                    game.Save.Kevin.Position = new Vector2(i, 9);
                                }
                            }
                        }
                        else if ((int)game.Save.Kevin.Position.Y == 9)
                        {
                            game.Save.GetFloor().Position += new Vector2(0, 1);
                            game.Save.GetRoom().Visible = true;
                            for (int i = 1; i < 13; i++)
                            {
                                if (game.Save.GetRoom().Tiles[i, 0].Door)
                                {
                                    game.Save.Kevin.Position = new Vector2(i, 0);
                                }
                            }
                        }
                        game.Save.GetRoom().AddToRoom(game.Save.Kevin);
                    }
                    else if (game.Save.GetRoom().Tiles[(int)game.Save.Kevin.Position.X, (int)game.Save.Kevin.Position.Y].Steps == Tile.Stairs.UP)
                    {
                        game.Save.GetRoom().Remove(game.Save.Kevin);
                        game.Save.GoUp();
                        game.Save.GetRoom().Visible = true;
                        for (int i = 0; i < 15; i++)
                        {
                            for (int j = 0; j < 10; j++)
                            {
                                if (game.Save.GetRoom().Tiles[i, j].Steps != Tile.Stairs.NONE)
                                {
                                    game.Save.Kevin.Position = new Vector2(i, j);
                                }
                            }
                        }
                        game.Save.GetRoom().AddToRoom(game.Save.Kevin);
                    }
                    else if (game.Save.GetRoom().Tiles[(int)game.Save.Kevin.Position.X, (int)game.Save.Kevin.Position.Y].Steps == Tile.Stairs.DOWN)
                    {
                        game.Save.GetRoom().Remove(game.Save.Kevin);
                        game.Save.GoDown();
                        game.Save.GetRoom().Visible = true;
                        for (int i = 0; i < 15; i++)
                        {
                            for (int j = 0; j < 10; j++)
                            {
                                if (game.Save.GetRoom().Tiles[i, j].Steps != Tile.Stairs.NONE)
                                {
                                    game.Save.Kevin.Position = new Vector2(i, j);
                                }
                            }
                        }
                        game.Save.GetRoom().AddToRoom(game.Save.Kevin);
                    }
                    Creature.DoTurn(game.Save.Kevin, game.Save.GetRoom(), game.Save.Kevin);
                    break;

                case "pickup":
                    Item result = game.Save.GetRoom().GetAdjacent(game.Save.Kevin.Position);
                    if (game.Save.Kevin.Equipment.GetInventoryCount() < 12 && result != null)
                    {
                        game.Save.Kevin.PickUp(result);
                        game.Save.GetRoom().Remove(result);
                        game.Save.GetRoom().UpdateTiles();
                        Creature.DoTurn(game.Save.Kevin, game.Save.GetRoom(), game.Save.Kevin);
                    }
                    break;

                case "cycle":
                    if (game.Save.Kevin.Attacks != null)
                    {
                        if (game.Save.Kevin.Attacks.Count > 1)
                            game.Save.Kevin.Selection = (game.Save.Kevin.Selection + 1) % (game.Save.Kevin.Attacks.Count);
                    }
                    break;

                case "attack":
                    if (game.Save.Kevin.Selection != -1)
                    {
                        Creature.Attack(game.Save.Kevin, game.Save.Kevin.Attacks.ElementAt(game.Save.Kevin.Selection).Target, game.Save.GetRoom());
                        Creature.DoTurn(game.Save.Kevin, game.Save.GetRoom(), game.Save.Kevin);
                    }
                    break;

                case "endturn":
                    game.Save.GetRoom().UpdateTiles();
                    for (int i = 0; i < game.Save.GetRoom().EntityList.Count; i++)
                    {
                        Entity entity = game.Save.GetRoom().EntityList.ElementAt(i);
                        if (entity is Enemy)
                        {
                            Creature.DoTurn((Creature)entity, game.Save.GetRoom(), game.Save.Kevin);
                            ((Creature)entity).EndTurn();
                        }
                    }
                    if (game.Save.Kevin.HP <= 0)
                    {
                        game.GameOver();
                    }
                    else
                    {
                        game.Save.Kevin.EndTurn();
                        Creature.DoTurn(game.Save.Kevin, game.Save.GetRoom(), game.Save.Kevin);
                    }
                    break;

                case "play":
                    game.GameState = Rougelike.State.GAME;
                    game.NewGame();
                    break;

                case "options":
                    game.GameState = Rougelike.State.OPTIONS;
                    break;

                case "exit":
                    game.Quit();
                    break;

                case "back":
                    game.GameState = Rougelike.State.TITLE;
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

        public void ApplyChanges(Rougelike game)
        {
            game.Graphics.PreferredBackBufferWidth = Convert.ToInt32(settings[1]);
            game.Graphics.PreferredBackBufferHeight = Convert.ToInt32(settings[3]);
            scale = Convert.ToInt32(settings[1]) / 1280f;
            scalematrix = Matrix.CreateScale(scale, scale, 1f);
            switch (settings[5])
            {
                case "16:9":
                    letterboxon = false;
                    letterbox = drag.Sprite;
                    OffsetVector = Vector2.Zero;
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
                    OffsetVector = new Vector2(0, offset);
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
                    OffsetVector = new Vector2(0, offset);
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
                    OffsetVector = new Vector2(0, offset);
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
                    OffsetVector = new Vector2(0, offset);
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
                    OffsetVector = new Vector2(0, offset);
                    break;
            }
            game.Graphics.IsFullScreen = (settings[7] == "true");
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
            game.Graphics.ApplyChanges();
            string text = "DisplayWidth = " + settings[1] + ";\n" + "DisplayHeight = " + settings[3] + ";\n" + "AspectRatio = " + settings[5] + ";\n" + "Fullscreen = " + settings[7] + ";\n" + "Borderless = " + settings[9] + ";\n" + "Letterbox = " + settings[11] + ";";
            // WriteAllText creates a file, writes the specified string to the file, 
            // and then closes the file.
            System.IO.File.WriteAllText(@directory, text);
        }

        public string GetSetting(int index)
        {
            return settings[index];
        }

        public void DrawLetterbox(SpriteBatch SpriteBatch, Vector2 offset)
        {
            if (letterboxon)
            {
                SpriteBatch.Draw(letterbox, Vector2.Zero, null, Color.White, 0, Vector2.Zero, 1, SpriteEffects.None, 0);
                SpriteBatch.Draw(letterbox, offset, null, Color.White, 0, Vector2.Zero, 1, SpriteEffects.None, 0);
            }
            else
            {
                SpriteBatch.Draw(drag.Sprite, Vector2.Zero, null, Color.White, 0, Vector2.Zero, 1, SpriteEffects.None, 0);
            }
        }

        public Texture2D GetCursor()
        {
            if (itemdragging)
                return tempitem.Sprite;
            else
                return Cursor;
        }
        
        public LinkedList<Button> GetButtonList(Rougelike.State state)
        {
            switch (state)
            {
                case Rougelike.State.TITLE:
                    return titlebuttons;

                case Rougelike.State.GAME:
                    return gamebuttons;

                case Rougelike.State.OPTIONS:
                    return resolutionbuttons;

                default:
                    return titlebuttons;
            }
        }

        public Vector2 GetTileOffset()
        {
            return tileoffset;
        }
    }
}