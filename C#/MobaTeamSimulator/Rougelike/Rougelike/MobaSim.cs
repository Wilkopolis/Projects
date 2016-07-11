using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Audio;
using Microsoft.Xna.Framework.Content;
using Microsoft.Xna.Framework.GamerServices;
using Microsoft.Xna.Framework.Graphics;
using Microsoft.Xna.Framework.Input;
using Microsoft.Xna.Framework.Media;
using System.Threading;
using Rougelike.Factory;
using Rougelike.Util;

namespace Rougelike
{
    public class MobaSim : Microsoft.Xna.Framework.Game
    {
        public GraphicsDeviceManager graphics;
        SpriteBatch spriteBatch;

        private enum Settings { DISPLAYWIDTH = 1, DISPLAYHEIGHT = 3, ASPECTRATIO = 5, FULLSCREEN = 7, BORDERLESS = 9, LETTERBOX = 11 };
        public State gamestate;

        MenuHandler menuhandler;

        // Button lists, buttons to draw onscreen
        private LinkedList<Button> buttonlist = new LinkedList<Button>();
        
        private Vector2 mousepos;
        private MouseState lastmouse;
        
        SpriteFont segeouimono;
        private string status = "";
        
        // Engine Stuff
        // ------------
        // Game Stuff

        Texture2D[] textures;

        public enum State {MainMenu, Options, Tutorial, Cinematic, Lobby, Tournament, GameOver, Victory, Match, NewGame, NewGame_Roster, HallofHeros, Stats, Finances};
        bool Play;
        bool NewWeek;
        bool ScheduleScrim;
        bool PickScrim;
        bool PlayerInfo;
        Player CurrentPlayer;
        bool Dispatch;
        bool ReturnConfirmation;
        bool KickConfirmation;
        bool DayInfo;

        bool HoHUnlocked;

        public MobaSim()
        {
            Content.RootDirectory = "Content";
            graphics = new GraphicsDeviceManager(this);
        }

        protected override void Initialize()
        {           
            gamestate = State.MainMenu;
            mousepos = Vector2.Zero;

            base.Initialize();
        }


        protected override void LoadContent()
        {
            spriteBatch = new SpriteBatch(GraphicsDevice);

            segeouimono = Content.Load<SpriteFont>("fonts/title");

            //menuhandler = new MenuHandler(this);

            //Load permanent stuff
            //Load HoH

            //textures = new Texture2D[]{
            //    Content.Load<Texture2D>("textures/null"),
            //    Content.Load<Texture2D>("textures/button1"),
            //    Content.Load<Texture2D>("textures/button2"),
            //};

            //buttonlist = menuhandler.GetButtonList(gamestate);
            //menuhandler.ApplyChanges(this);
        }


        protected override void UnloadContent()
        {
        }

        protected override void Update(GameTime gameTime)
        {
            //MouseState mouse = Mouse.GetState();
            //mousepos.X = mouse.X / menuhandler.scale;
            //mousepos.Y = mouse.Y / menuhandler.scale;

            //menuhandler.CheckButtons(this, mouse, lastmouse, mousepos, (System.Windows.Forms.Form)System.Windows.Forms.Control.FromHandle(this.Window.Handle));
           
            //lastmouse = mouse;

            base.Update(gameTime);
        }


        protected override void Draw(GameTime gameTime)
        {
            GraphicsDevice.Clear(new Color(242, 239, 229));
            //spriteBatch.Begin(SpriteSortMode.Deferred, BlendState.AlphaBlend, null, null, null, null, menuhandler.scalematrix);

            switch (gamestate)
            {
                case State.MainMenu:
                    #region
                    //Draw screen
                    //Draw Play Button
                    //Draw Options Button
                    //Draw Exit Button

                    //Draw Hall of Heros Button
                    if (Play)
                    {
                        //Draw Saves
                    }
                    #endregion
                    break;

                case State.Match:
                    #region
                    // Draw all players, titles, champions, bans
                    // Draw Graph
                    // Draw Game Favor

                    //Audience sounds
                    #endregion
                    break;

                case State.Lobby:
                    #region
                    // Draw background
                    // Draw Week
                    // Draw Money
                    // Draw Players
                    // Draw Subs
                    // Draw Day Options
                    // Draw Calendar
                    // Draw Upcomming Events
                    // Draw Options Button
                    // Draw MainMenu Button
                    // Draw Quit Button
                    // Draw Schedule Scrim Button
                    // Draw Finances Button
                    // Draw Sign Up Button
                    // Draw Free Agents Button
                    // Draw Stats Button

                    if (NewWeek)
                    {
                        #region
                        // Draw Window
                        // Draw News
                        // Draw OK Button
                        #endregion
                    }
                    if (ScheduleScrim)
                    {
                        #region
                        // Draw Window
                        // Draw Options
                        // Draw Back Button
                        // Draw OK Button
                        #endregion
                    }
                    if (PickScrim)
                    {
                        #region
                        // Draw Window
                        // Draw all 3 Teams
                        // Draw Back
                        // Draw OK Button
                        #endregion
                    }
                    if (PlayerInfo)
                    {
                        #region
                        // Draw Window
                        // Draw Player Name/Name/Activity
                        // Draw Skills and their Bars
                        // Draw Skills
                        // Draw Conditioins and their Bars
                        // Draw Champion Proficiency Bars
                        // Draw Kick Button
                        // Draw Dispatch Button
                        // Draw Salary and Increment Buttons
                        // Draw Traits
                        // Draw Back Button
                        // Make List of []
                        // Draw Solo Que []
                        // Draw Stream []
                        // Draw Rest []
                        if (CurrentPlayer.Away)
                        {
                            #region
                            // Draw Return button
                            #endregion
                        }
                        if (ReturnConfirmation)
                        {
                            #region
                            // Draw Window
                            // Draw Yes Button
                            // Draw No Button
                            #endregion 
                        }
                        if (Dispatch)
                        {
                            #region
                            // Draw
                            // Draw Window
                            // Draw List of Options []
                            // Draw Selected Option Description
                            // Draw OK Button
                            // Draw Cancle Button
                            #endregion
                        }
                        if (KickConfirmation)
                        {
                            #region
                            #endregion
                        }
                        #endregion
                    }
                    if (DayInfo)
                    {
                        #region
                        #endregion
                    }
                    #endregion
                    break;

                case State.Finances:
                    //
                    break;

                case State.Options:
                    #region
                    // Draw Background
                    // Draw Resolution Buttons
                    // Draw Apply Button
                    // Draw OK Button
                    // Draw Back Button
                    // Draw Windowed []
                    // Draw Letterbox []
                    // Draw Borderless []
                    #endregion
                    break;
            }

            //foreach (Button b in buttonlist)
            //{
            //    spriteBatch.Draw(textures[b.texture], b.position + menuhandler.offsetvector, null, Color.White, 0, b.origin, 1, SpriteEffects.None, 0);
            //    spriteBatch.DrawString(segeouimono, b.attribute, b.position + menuhandler.offsetvector - b.origin, Color.Black);
            //}            

            //menuhandler.DrawLetterbox(GraphicsDevice, spriteBatch);
            
            //spriteBatch.Draw(menuhandler.cursor, mousepos, null, Color.White, 0, Vector2.Zero, 1, SpriteEffects.None, 0);

            //spriteBatch.DrawString(segeouimono, status, mousepos, Color.Black);
            
            //spriteBatch.End();
            base.Draw(gameTime);
        }

        public void Quit()
        {
            this.Exit();
        }

        public void SetButtons(LinkedList<Button> list)
        {
            buttonlist = list;
        }

        public void SetStatus(string update)
        {
            status = update;
        }

        public LinkedList<Button> GetButtonlist()
        {
            return buttonlist;
        }

        public State GetGamestate()
        {
            return gamestate;
        }
    }
}