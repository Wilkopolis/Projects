using System;
using System.Collections.Generic;
using System.Linq;
using System.Xml.Linq;
using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Audio;
using Microsoft.Xna.Framework.Content;
using Microsoft.Xna.Framework.GamerServices;
using Microsoft.Xna.Framework.Graphics;
using Microsoft.Xna.Framework.Input;
using Microsoft.Xna.Framework.Media;

namespace Minekart
{

    public class Game : Microsoft.Xna.Framework.Game
    {
        GraphicsDeviceManager graphics;
        SpriteBatch spriteBatch;

        //Vector2[] Debugspots = new Vector2[4];
        Texture2D debugspot;

        float fps;

        Menu[] menus;

        bool menu = false;

        // Curretlevel corresponds to what stage we are on
        int currentlevel = 0;

        // Builds all the levels into an array and is organized
        // in their heirarchy.
        Level[] lvls = new Level[1];
            Level lvl1;
                Enemy[] lvl1enemies = new Enemy[2];
                    Enemy lvl1enemy1;
                        Texture2D lvl1enemy1image;
                        Vector2 lvl1enemy1ori;
                        Vector2 lvl1enemy1pos;
                        Vector2 lvl1enemy1vel;
                    Enemy lvl1enemy2;
                        Texture2D lvl1enemy2image;
                        Vector2 lvl1enemy2ori;
                        Vector2 lvl1enemy2pos;
                        Vector2 lvl1enemy2vel;
                Surface[] lvl1tracks = new Surface[7];
                    Surface lvl1track1;
                        Texture2D lvl1track1image;
                        Vector2 lvl1track1ori;
                        Vector2 lvl1track1pos;
                    Surface lvl1track2;
                        Texture2D lvl1track2image;
                        Vector2 lvl1track2ori;
                        Vector2 lvl1track2pos;
                    Surface lvl1track3;
                        Texture2D lvl1track3image;
                        Vector2 lvl1track3ori;
                        Vector2 lvl1track3pos;
                    Surface lvl1track4;
                        Texture2D lvl1track4image;
                        Vector2 lvl1track4ori;
                        Vector2 lvl1track4pos;
                    Surface lvl1track5;
                        Texture2D lvl1track5image;
                        Vector2 lvl1track5ori;
                        Vector2 lvl1track5pos;
                    Surface lvl1track6;
                        Texture2D lvl1track6image;
                        Vector2 lvl1track6ori;
                        Vector2 lvl1track6pos;
                    Surface lvl1track7;
                        Texture2D lvl1track7image;
                        Vector2 lvl1track7ori;
                        Vector2 lvl1track7pos;
                Checkpoint[] lvl1checkpoints = new Checkpoint[1];
                    Checkpoint lvl1checkpoint1;                        
                        Vector2 lvl1checkpoint1pos;
                Scene[] lvl1backgrounds = new Scene[2];
                    Scene lvl1background1;
                        Texture2D lvl1background1image;
                        Vector2 lvl1background1pos;
                    Scene lvl1background2;
                        Texture2D lvl1background2image;
                        Vector2 lvl1background2pos;
                    Scene lvl1background3;
                        Texture2D lvl1background3image;
                        Vector2 lvl1background3pos;
                Scene[] lvl1foregrounds = new Scene[1];
                    Scene lvl1foreground1;
                        Texture2D lvl1foreground1image;
                        Vector2 lvl1foreground1pos;
                Fuel[] lvl1fuels = new Fuel[4];
                    Fuel lvl1fuel1;
                        Vector2 lvl1fuel1pos;
                    Fuel lvl1fuel2;
                        Vector2 lvl1fuel2pos;
                    Fuel lvl1fuel3;
                        Vector2 lvl1fuel3pos;
                    Fuel lvl1fuel4;
                        Vector2 lvl1fuel4pos;
                int Fuelcount = 0;

                    
        // Nonlocal constants opposed to the ^^ tree of local constants.
        Vector2 checkpointori;
        Texture2D checkpointoff;
        Texture2D checkpointon;

        // the current level.
        Level stage;

        // Used for restarting from checkpoints
        Vector2 checkpointoffset;
        Vector2 checkpointvelocity;
        Vector2 checkpointacceleration;
        bool checkpointpauseacceleration;
        bool checkpointepauseacceleration;
        bool risdown = false;

        // the stage speed
        Vector2 stagevelocity = new Vector2(-5, 0);

        // the controlled player
        Player player;
            Texture2D player1;
            Texture2D player2;
            Vector2 playerori;

        // The players absolute position on the screen.
        // DO NOT TOUCH
        Vector2 playerpos = new Vector2(200, 432);

        // Used to move every other object around the player.
        Vector2 offset = new Vector2(1000, -100);//1000

        // Used in the jumping action.
        bool dojumpmscount = false;
        bool donejumping = true;
        bool istouching;
        float jumpmscount = 0;
        
        bool risinganim = false;
        bool risinganim2 = false;
        bool fallinganim = false;
        bool fallinganim2 = false;
        bool jumped = false;
        bool falling = false;
        float animmscount = 0;

        bool pauseacceleration = false;
        bool epauseacceleration = false;

        // Cart passive animation
        float rattlecount = 0;
        int rattle = 1;

        Texture2D dothis;

        // For pausing && debugging
        bool pisdown = false;
        bool pause = false;
        bool qisdown = false;
        bool qstep = false;
        float qcount = 0;
        
        public Game()
        {
            graphics = new GraphicsDeviceManager(this);
            Content.RootDirectory = "Content";

            graphics.PreferredBackBufferHeight = 600;
            graphics.PreferredBackBufferWidth = 800;
            graphics.IsFullScreen = false;
            Window.Title = "Minekart";
        }
        
        protected override void Initialize()
        {
            base.Initialize();
        }

        protected override void LoadContent()
        {
            spriteBatch = new SpriteBatch(GraphicsDevice);
            
            player1 = Content.Load<Texture2D>("images/minecart1");
            player2 = Content.Load<Texture2D>("images/minecart2");
            playerori = new Vector2(26, 20);
            player = new Player(player1, playerori, stagevelocity);

            lvl1background1pos = new Vector2(200, -150);
            lvl1background1image = Content.Load<Texture2D>("images/lvl1background1");
            //lvl1background1 = new Scene(lvl1background1image, lvl1background1pos);
            lvl1background2pos = new Vector2(460, -150);
            lvl1background2image = Content.Load<Texture2D>("images/lvl1background2");
            //lvl1background2 = new Scene(lvl1background2image, lvl1background2pos);

            lvl1foreground1image = Content.Load<Texture2D>("images/lvl1foreground1");
            lvl1foreground1pos = new Vector2(1008, 470);
            //lvl1foreground1 = new Scene(lvl1foreground1image, lvl1foreground1pos);

            //Texture2D longtrack = 
            Texture2D emptylongtrack = Content.Load<Texture2D>("images/emptylongtrack");
            Texture2D slanttrack = Content.Load<Texture2D>("images/4Slantmod");
            // lvl1track.alpha = -.2f;
            // lvl1track.acceleration = new Vector2(0, -.8f);
            Texture2D curve = Content.Load<Texture2D>("images/curvetoflat"); // slanttocurve x:+164 y:158-
            Texture2D cart = Content.Load<Texture2D>("images/enemy");
            Texture2D fuel = Content.Load<Texture2D>("images/Fuel");

            //Curves have to come before Slants

            lvl1track1ori = new Vector2(0, 8);
            lvl1track1pos = new Vector2(-824, 550);
            lvl1track1image = Content.Load<Texture2D>("images/1470track");
            lvl1track1 = new Surface(lvl1track1image, lvl1track1ori, lvl1track1pos);

            lvl1track2ori = new Vector2(0, 8);
            lvl1track2pos = new Vector2(720, 600);
            lvl1track2image = Content.Load<Texture2D>("images/416track");
            lvl1track2 = new Surface(lvl1track2image, lvl1track2ori, lvl1track2pos);

            lvl1track3ori = new Vector2(0, 8);
            lvl1track3pos = new Vector2(1280, 600);
            lvl1track3image = Content.Load<Texture2D>("images/416track");
            lvl1track3 = new Surface(lvl1track3image, lvl1track3ori, lvl1track3pos);

            lvl1track4ori = new Vector2(0, 8);
            lvl1track4pos = new Vector2(842, 814);//814
            lvl1track4image = Content.Load<Texture2D>("images/1470track");
            lvl1track4 = new Surface(lvl1track4image, lvl1track4ori, lvl1track4pos);

            lvl1track5ori = new Vector2(0, 4);
            lvl1track5pos = new Vector2(1696, 600);
            lvl1track5image = Content.Load<Texture2D>("images/shortslantdown");
            lvl1track5 = new Surface(lvl1track5image, lvl1track5ori, lvl1track5pos);
            lvl1track5.alpha = .02f;
            lvl1track5.acceleration = new Vector2(0, .33f);
            lvl1track5.max = 5;
            lvl1track5.enemy = false;

            lvl1track6ori = new Vector2(0, 218);
            lvl1track6pos = new Vector2(1696, 814);//814
            lvl1track6image = Content.Load<Texture2D>("images/shortslantdown");
            lvl1track6 = new Surface(lvl1track6image, lvl1track6ori, lvl1track6pos);
            lvl1track6.alpha = .0025f;
            lvl1track6.acceleration = new Vector2(0, -.061f);
            lvl1track6.player = false;
            lvl1track6.max = -2;

            lvl1track7ori = new Vector2(0, 4);
            lvl1track7pos = new Vector2(2300, 814);
            lvl1track7image = Content.Load<Texture2D>("images/shortslantdown");
            lvl1track7 = new Surface(lvl1track7image, lvl1track7ori, lvl1track7pos);
            lvl1track7.alpha = .02f;
            lvl1track7.acceleration = new Vector2(0, .33f);
            lvl1track7.max = 5;
            lvl1track7.enemy = false;

            lvl1enemy1ori = new Vector2(23, 26);
            lvl1enemy1pos = new Vector2(2000, 800);
            lvl1enemy1vel = new Vector2(-2, 0);
            lvl1enemy1image = cart;
            lvl1enemy1 = new Enemy(lvl1enemy1image, lvl1enemy1ori, lvl1enemy1pos, lvl1enemy1vel);
            lvl1enemy2ori = new Vector2(23, 26);
            lvl1enemy2pos = new Vector2(2050, 800);
            lvl1enemy2vel = new Vector2(-2, 0);
            lvl1enemy2image = cart;
            lvl1enemy2 = new Enemy(lvl1enemy2image, lvl1enemy2ori, lvl1enemy2pos, lvl1enemy2vel);

            checkpointori = new Vector2(5, 20);
            lvl1checkpoint1pos = new Vector2(800, 600);
            checkpointoff = Content.Load<Texture2D>("images/checkpointoff");
            checkpointon = Content.Load<Texture2D>("images/checkpointon");
            lvl1checkpoint1 = new Checkpoint(checkpointoff, checkpointon, checkpointori, lvl1checkpoint1pos);

            lvl1fuel1pos = new Vector2(-100, 525);
            lvl1fuel1 = new Fuel(fuel, lvl1fuel1pos);
            lvl1fuel2pos = new Vector2(-50, 525);
            lvl1fuel2 = new Fuel(fuel, lvl1fuel2pos);
            lvl1fuel3pos = new Vector2(0, 525);
            lvl1fuel3 = new Fuel(fuel, lvl1fuel3pos);
            lvl1fuel4pos = new Vector2(50, 525);
            lvl1fuel4 = new Fuel(fuel, lvl1fuel4pos);

            lvl1backgrounds[0] = lvl1background1;
            lvl1backgrounds[1] = lvl1foreground1;
            lvl1tracks[0] = lvl1track1;
            lvl1tracks[1] = lvl1track2;
            lvl1tracks[2] = lvl1track3;
            lvl1tracks[3] = lvl1track4;
            lvl1tracks[4] = lvl1track5;
            lvl1tracks[5] = lvl1track6;
            lvl1tracks[6] = lvl1track7;
            //lvl1enemies[0] = lvl1enemy1;
            //lvl1enemies[1] = lvl1enemy2;
            lvl1checkpoints[0] = lvl1checkpoint1;
            //lvl1fuels[0] = lvl1fuel1;
            //lvl1fuels[1] = lvl1fuel2;
            //lvl1fuels[2] = lvl1fuel3;
            //lvl1fuels[3] = lvl1fuel4;

            lvl1 = new Level(lvl1backgrounds, lvl1foregrounds, lvl1enemies, lvl1checkpoints, lvl1tracks, lvl1fuels);
            
            lvls[0] = lvl1;

            stage = lvls[currentlevel];

            save(stage.Checkpoints[0]);

            debugspot = Content.Load<Texture2D>("images/debug");
            dothis = Content.Load<Texture2D>("images/dothis");
            }

        protected override void UnloadContent()
        {
           
        }

        protected override void Update(GameTime gameTime)
        {
            KeyboardState key = Keyboard.GetState();

            if (key.IsKeyDown(Keys.F10))
                this.Exit();

            if (key.IsKeyDown(Keys.P))
                pisdown = true;

            if (key.IsKeyDown(Keys.Q))
                qisdown = true;

            if (key.IsKeyUp(Keys.Q) && qisdown)
            {
                qisdown = false;
                qstep = !qstep;
                qcount = 0;
                pause = false;
            }
            
            if (qstep)
            {
                qcount += gameTime.ElapsedGameTime.Milliseconds;
                pause = true;
                if (qcount >= 500)
                {
                    pause = false;
                    qcount = 0;
                }
            }

            if (key.IsKeyUp(Keys.P) && pisdown)
            {
                if (qstep)
                    pause = true;
                else 
                    pause = !pause;
                pisdown = false;
            }

            if (!pause || key.IsKeyDown(Keys.Right))
            {
                Console.WriteLine("------------------------------------------------------");
                Console.WriteLine("offset.X");
                Console.WriteLine(offset.X);
                Console.WriteLine("pauseacceleration");
                Console.WriteLine(pauseacceleration);
                Console.WriteLine("stage.Tracks[6].velocity.Y");                
                Console.WriteLine(stage.Tracks[6].velocity.Y);

                player.collisioncheck(stage.Tracks, offset, player.velocity.X);
                if (player.ridingon != null)
                    player.wastouching = player.ridingon.deepcopy();
                istouching = (player.ridingon != null);
                player.checkdead(stage.Enemies, offset);
                if (player.checkfuel(stage, offset))
                {
                    player.velocity.X += -3;
                    player.acceleration.X = .098f;
                    Fuelcount++;
                }

                int num = player.checkpoint(stage, offset);
                if (num != -1)
                {
                    stage.mostrecent = num;
                    save(stage.Checkpoints[stage.mostrecent]);
                }

                // If you get a speed boost, sloooow doooown
                if (player.velocity.X >= stagevelocity.X)
                {
                    player.velocity.X = stagevelocity.X;
                    player.acceleration.X = 0;
                }                

                foreach (Surface track in stage.Tracks)
                {
                    if (track != null)
                    {
                        if (track.tick)
                        {                            
                            track.position += track.velocity;
                            track.origin += track.velocity;

                            if (track.player)
                            {
                                if (!pauseacceleration)
                                {
                                    track.velocity += track.acceleration;
                                    track.omega += track.alpha;
                                }
                            }
                            else
                            {
                                if (!epauseacceleration)
                                {
                                    track.velocity += track.acceleration;
                                    track.omega += track.alpha;
                                }
                            }
                            
                            track.rotation += track.omega;
                            if (track.max > 0)
                            {
                                if (track.alpha > 0)
                                {
                                    if (track.velocity.Y >= track.max)
                                    {
                                        if (track.player)
                                            pauseacceleration = true;
                                        else
                                            epauseacceleration = true;
                                        track.velocity.Y = track.max;
                                    }
                                    if (track.rotation > (float)Math.PI / 4)
                                    {
                                        track.omega = 0;
                                        track.rotation = (float)Math.PI / 4;
                                    }
                                }
                                else if (track.alpha < 0)
                                {
                                    if (track.velocity.Y <= track.max)
                                    {
                                        if (track.player)
                                            pauseacceleration = true;
                                        else
                                            epauseacceleration = true;
                                        track.velocity.Y = track.max;
                                    }
                                    if (track.rotation < -(float)Math.PI / 4)
                                    {
                                        track.omega = 0;
                                        track.rotation = -(float)Math.PI / 4;
                                    }
                                }
                            }
                            else
                            {
                                if (track.alpha > 0)
                                {
                                    if (track.velocity.Y <= track.max)
                                    {
                                        if (track.player)
                                            pauseacceleration = true;
                                        else
                                            epauseacceleration = true;
                                        track.velocity.Y = track.max;
                                    }
                                    if (track.rotation > (float)Math.PI / 4)
                                    {
                                        track.omega = 0;
                                        track.rotation = (float)Math.PI / 4;
                                    }
                                }
                                else if (track.alpha < 0)
                                {
                                    if (track.velocity.Y >= track.max)
                                    {
                                        if (track.player)
                                            pauseacceleration = true;
                                        else
                                            epauseacceleration = true;
                                        track.velocity.Y = track.max;
                                    }
                                    if (track.rotation < -(float)Math.PI / 4)
                                    {
                                        track.omega = 0;
                                        track.rotation = -(float)Math.PI / 4;
                                    }
                                }
                            }
                        }
                        track.tick = false;
                    }
                }
                
                if (player.velocity.Y < -.1f)
                    player.accepttrack = true;

                if (!jumped && !istouching)
                {
                    if (player.wastouching != null)
                    {
                        if (player.wastouching.rotation < 0 && !falling)
                        {
                            fallinganim2 = true;
                            player.velocity.Y = -player.velocity.X;
                        }
                        else if (!falling)
                            fallinganim = true;
                    }
                    else
                        fallinganim = true;
                    falling = true;
                }                

                // counts how long it has been since we started jumping.
                if (dojumpmscount)
                    jumpmscount += gameTime.ElapsedGameTime.Milliseconds;

                if (istouching)
                    rattlecount += gameTime.ElapsedGameTime.Milliseconds;

                if (risinganim)
                {
                    animmscount += gameTime.ElapsedGameTime.Milliseconds;
                    player.rotation = (animmscount / 50) * -(float)Math.PI / 16;
                    if (animmscount > 50)
                    {
                        risinganim = false;
                        player.rotation = -(float)Math.PI / 16;
                        animmscount = 0;
                    }
                }

                if (risinganim2)
                {
                    animmscount += gameTime.ElapsedGameTime.Milliseconds;
                    player.rotation = (animmscount / 100) * -(float)Math.PI / 4;
                    if (animmscount > 100)
                    {
                        risinganim2 = false;
                        player.rotation = -(float)Math.PI / 4;
                        animmscount = 0;
                    }
                }

                if (fallinganim)
                {
                    animmscount += gameTime.ElapsedGameTime.Milliseconds;
                    player.rotation = (animmscount / 100) * (float)Math.PI / 16;
                    if (animmscount > 100)
                    {
                        fallinganim = false;
                        player.rotation = (float)Math.PI / 16;                        
                        animmscount = 0;
                    }
                }

                if (fallinganim2)
                {
                    animmscount += gameTime.ElapsedGameTime.Milliseconds;
                    player.rotation = ((float)Math.PI / 4) * (-200 + animmscount) / 200;
                    if (animmscount >= 150)
                    {
                        fallinganim2 = false;
                        player.rotation = -(float)Math.PI / 16;                        
                        animmscount = 0;
                    }
                }

                if (rattlecount >= 200 + (100 * (5 + player.velocity.X)/2) )
                {
                    rattle = -1 * rattle;
                    player.origin.Y += rattle;
                    if (player.image == player1)
                        player.image = player2;
                    else
                        player.image = player1;
                    rattlecount = 0;
                }
                           
                // if you press the jump key and the jumping is allowed
                if (key.IsKeyDown(Keys.Up))
                {
                    // jump if you are touching a surface, jump and start the 
                    // jump counter.
                    if (istouching)
                    {
                        player.image = player1;
                        player.velocity.Y = 10;
                        risinganim = true;
                        donejumping = false;
                        dojumpmscount = true;
                        jumped = true;
                    }

                    if (risinganim)
                    {
                        animmscount += gameTime.ElapsedGameTime.Milliseconds;
                        player.rotation = (animmscount / 50) * -.2f;
                    }

                    if (jumpmscount < 500 && !donejumping)
                        player.acceleration.Y = -.5f;
                    else
                    {
                        donejumping = true;
                        dojumpmscount = false;
                        jumpmscount = 0;
                    }
                }
                if (key.IsKeyUp(Keys.Up) && dojumpmscount)
                {
                    donejumping = true;
                    jumpmscount = 0;
                }

                if (donejumping && istouching && player.accepttrack)
                {
                    offset.Y = 450 - player.ridingon.position.Y;
                    if (player.ridingon.rotation == 0)
                        player.rotation = 0;
                    player.velocity.Y = 0;
                    player.acceleration.Y = 0;
                    //player.accepttrack = false;
                    falling = false;                 
                    jumped = false;
                }

                if (donejumping && !istouching)
                    player.acceleration.Y = -.8f;

                offset += player.velocity;
                player.velocity += player.acceleration;
                
                if (player.acceleration.X == 0 && offset.X % 5 != 0)
                {
                    offset.X = (float)Math.Ceiling(offset.X);
                    if (offset.X % 5 != 0)
                    {
                        if ((offset.X + 1) % 5 == 0)
                            offset.X += 1;
                        else if ((offset.X - 1) % 5 == 0)
                            offset.X -= 1;
                        else if ((offset.X + 2) % 5 == 0)
                            offset.X += 2;
                        else if ((offset.X - 2) % 5 == 0)
                            offset.X -= 2;
                    }
                }
                for (int i = 0; i < stage.Enemies.Length; i++)
                {
                    Enemy e = stage.Enemies[i];
                    if (e != null)
                    {
                        if (true)//!e.checkdead()
                        {
                            e.collisioncheck(stage.Tracks);
                            bool eistouching = (e.ridingon != null);

                            if (!eistouching)
                                e.acceleration.Y = .8f;

                            if (eistouching)
                            {
                                e.position.Y = e.ridingon.position.Y;
                                e.velocity.Y = 0;
                                e.acceleration.Y = 0;
                            }
                            e.position += e.velocity;
                            e.velocity += e.acceleration;
                        }
                        else
                            stage.Enemies[i] = null;
                    }
                }

                //for (int i = 0; i < stage.Backgrounds.Length; i++)
                //{
                //    Scene back = stage.Backgrounds[i];
                //    if (back != null)
                //    {
                //        back.backgroundcheck(offset);
                //    }
                //}
                //for (int i = 0; i < stage.Foregrounds.Length; i++)
                //{

                //}

                //for (int i = 0; i < stage.Tracks.Length; i++)
                //{

                //}

                foreach (Fuel f in stage.Fuels)
                {
                    if (f != null)
                    {
                        if (Math.Abs(f.velocity.Y) >= 1.2)
                            f.acceleration = -f.acceleration;
                        f.position += f.velocity;
                        f.velocity += f.acceleration;
                    }
                }              
                
                // Reset Check
                if (key.IsKeyDown(Keys.R))
                    risdown = true;

                if (key.IsKeyUp(Keys.R) && risdown)
                {
                    Restart();
                    risdown = false;
                }
                
                if (player.dead)
                {
                    Restart();
                    player.dead = false;
                }

                // ------------------------------------------------------------------------------------------
                //
                // ALL SCRIPTED EVENTS GO HERE
                //
                // ------------------------------------------------------------------------------------------
                //Spawn an enemy
                if ((offset.X == -1100 || (offset.X > -1100 && offset.X + player.velocity.X < -1100)))
                {
                    stage.Enemies[1] = lvl1enemy2.deepcopy();
                    stage.Enemies[0] = lvl1enemy1.deepcopy();
                    stage.Enemies[0].ignoreme = 1696;
                }

                // Enter mineshaft transition background
                if ((offset.X == -800 || (offset.X > -800 && offset.X + player.velocity.X < -800)))
                {
                    // stage.Backgrounds[0] = lvl1background2;
                }

                //if (offset.X == 950 || (offset.X > 950 && offset.X + player.velocity.X < 950))
                //    stage.Fuels[0] = lvl1fuel1.deepcopy();

                //if (offset.X == 900 || (offset.X > 900 && offset.X + player.velocity.X < 900))
                //    stage.Fuels[1] = lvl1fuel2.deepcopy();

                //if (offset.X == 850 || (offset.X > 850 && offset.X + player.velocity.X < 850))
                //    stage.Fuels[2] = lvl1fuel3.deepcopy();

                //if (offset.X == 800 || (offset.X > 800 && offset.X + player.velocity.X < 800))
                //    stage.Fuels[3] = lvl1fuel4.deepcopy();

                if (offset.X == -1725 || (offset.X > -1725 && offset.X + player.velocity.X < -1725))
                {
                    Surface T = stage.Tracks[4];
                    T.acceleration = new Vector2(0, -.75f);
                    T.alpha = -.05f;
                    pauseacceleration = false;
                }

                if (offset.X < -1740 && stage.Tracks[4].rotation <= 0)
                {
                    stage.Tracks[4].rotation = 0;                       
                    stage.Tracks[4].alpha = 0;
                }
                if (stage.Enemies[1] != null && stage.Enemies[1].position.X <= 1750)
                {
                    epauseacceleration = false;
                    stage.Tracks[5].alpha = -.0025f;
                    stage.Tracks[5].acceleration = new Vector2(0, .061f);
                    stage.Tracks[5].max = 0;
                }
                if ((offset.X == -2000 || (offset.X > -2000 && offset.X + player.velocity.X < -2000)))
                {
                    pauseacceleration = false;
                }
            }

            base.Update(gameTime);
        }

        protected override void Draw(GameTime gameTime)
        {
            GraphicsDevice.Clear(Color.White);

            spriteBatch.Begin(SpriteSortMode.Immediate, BlendState.AlphaBlend);

            foreach (Scene back in stage.Backgrounds)
            {
                if (back != null && back.show)
                spriteBatch.Draw(back.image, back.position + offset, null, Color.White, 0, Vector2.Zero, 1, SpriteEffects.None, 0);
            }

            foreach (Checkpoint check in stage.Checkpoints)
            {
                if (check != null)
                {
                    spriteBatch.Draw(check.image, check.position + offset, null, Color.White, 0, check.origin, 1, SpriteEffects.None, 0);
                   // spriteBatch.Draw(debugspot, check.position + offset, null, Color.White, 0, Vector2.Zero, 1, SpriteEffects.None, 0);
                }
            }

            foreach (Enemy goon in stage.Enemies)
            {
                if (goon != null)
                {
                    spriteBatch.Draw(goon.image, goon.position + offset, null, Color.White, goon.rotation, goon.origin, 1, SpriteEffects.None, 0);
                    //spriteBatch.Draw(debugspot, goon.position + offset, null, Color.White, 0, Vector2.Zero, 1, SpriteEffects.None, 0);
                }
            }

            spriteBatch.Draw(player.image, playerpos, null, Color.White, player.rotation, player.origin, 1, SpriteEffects.None, 0);
            //spriteBatch.Draw(debugspot, playerpos, null, Color.White, 0, Vector2.Zero, 1, SpriteEffects.None, 0);

            foreach (Surface track in stage.Tracks)
            {
                if (track != null)
                {
                    spriteBatch.Draw(track.image, track.position + offset, null, Color.White, 0, track.origin, 1, SpriteEffects.None, 0);
                    spriteBatch.Draw(debugspot, track.position + offset, null, Color.White, 0, Vector2.Zero, 1, SpriteEffects.None, 0);
                }
            }

            foreach (Fuel rod in stage.Fuels)
            {
                if (rod != null)
                {
                    spriteBatch.Draw(rod.image, rod.position + offset, null, Color.White, 0, rod.origin, 1, SpriteEffects.None, 0);
                    //spriteBatch.Draw(debugspot, rod.position + offset, null, Color.White, 0, Vector2.Zero, 1, SpriteEffects.None, 0);
                }
            }

            spriteBatch.Draw(dothis, new Vector2 (600, 0), null, Color.White, 0, Vector2.Zero, 1, SpriteEffects.None, 0);
            //spriteBatch.Draw(debugspot, new Vector2(600, 0), null, Color.White, 0, Vector2.Zero, 1, SpriteEffects.None, 0);

            foreach (Scene fore in stage.Foregrounds)
            {
                if (fore != null)
                {
                    spriteBatch.Draw(fore.image, fore.position + offset, null, Color.White, 0, Vector2.Zero, 1, SpriteEffects.None, 0);
                   // spriteBatch.Draw(debugspot, fore.position + offset, null, Color.White, 0, Vector2.Zero, 1, SpriteEffects.None, 0);
                }
            }

            //foreach (Vector2 loc in Debugspots)
                

            spriteBatch.End();
            
            base.Draw(gameTime);
        }

        public void save(Checkpoint checkpoint)
        {
            checkpoint.save = stage.deepcopy();
            checkpointoffset = new Vector2 (offset.X, offset.Y);
            checkpointvelocity = new Vector2(player.velocity.X, player.velocity.Y);
            checkpointacceleration = new Vector2(player.acceleration.X, player.acceleration.Y);
            checkpointpauseacceleration = pauseacceleration;
            checkpointepauseacceleration = epauseacceleration;
        }

        public void Restart()
        {
            stage = stage.Checkpoints[stage.mostrecent].save.deepcopy();
            offset = new Vector2(checkpointoffset.X, checkpointoffset.Y);
            player.velocity = new Vector2(checkpointvelocity.X, checkpointvelocity.Y);
            player.acceleration = new Vector2(checkpointacceleration.X, checkpointacceleration.Y);
            pauseacceleration = checkpointpauseacceleration;
            epauseacceleration = checkpointepauseacceleration;
            save(stage.Checkpoints[stage.mostrecent]);
        }
    }
}
