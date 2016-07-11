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
    public class MKRevenge : Microsoft.Xna.Framework.Game
    {
        public GraphicsDeviceManager graphics;
        SpriteBatch spriteBatch;

        public enum State { Title, Options, Game };
        private enum Settings { DISPLAYWIDTH = 1, DISPLAYHEIGHT = 3, ASPECTRATIO = 5, FULLSCREEN = 7, BORDERLESS = 9, LETTERBOX = 11 };
        private Vector2 seventwenty = new Vector2(0, 720);
        public State gamestate;

        MenuHandler menuhandler;
        Animator animator = new Animator();
        Thread animationthread;

        // Button lists, buttons to draw onscreen
        private LinkedList<Button> buttonlist = new LinkedList<Button>();
        
        private Vector2 mousepos;
        private MouseState lastmouse;

        // Stuff for loading and saving settings
        private string directory;

        private bool pause;
        SpriteFont segeouimono;
        private string status = "";
        
        private DateTime pausestart;
        private TimeSpan delay;
        public TimeSpan totaldelay;

        // Engine Stuff
        // ------------
        // Game Stuff

        double camerapos;
        LinkedList<Track> track;

        public MKRevenge()
        {
            Content.RootDirectory = "Content";
            graphics = new GraphicsDeviceManager(this);
        }

        protected override void Initialize()
        {           
            gamestate = State.Title;
            mousepos = Vector2.Zero;
            pause = false;
            delay = new TimeSpan(0);

            base.Initialize();
        }


        protected override void LoadContent()
        {
            spriteBatch = new SpriteBatch(GraphicsDevice);

            segeouimono = Content.Load<SpriteFont>("fonts/segeouimono");

            menuhandler = new MenuHandler(this);

            buttonlist = menuhandler.GetTitleButtons();
            menuhandler.ApplyChanges(this);
        }


        protected override void UnloadContent()
        {
        }

        protected override void Update(GameTime gameTime)
        {
            MouseState mouse = Mouse.GetState();
            mousepos.X = mouse.X / menuhandler.GetScale();
            mousepos.Y = mouse.Y / menuhandler.GetScale();

            if (!pause)
            {

            }
            else
            {
                delay = System.DateTime.Now - pausestart;
            }

            menuhandler.CheckButtons(this, mouse, lastmouse, mousepos, (System.Windows.Forms.Form)System.Windows.Forms.Control.FromHandle(this.Window.Handle));
           
            lastmouse = mouse;

            base.Update(gameTime);
        }


        protected override void Draw(GameTime gameTime)
        {
            GraphicsDevice.Clear(Color.CornflowerBlue);
            spriteBatch.Begin(SpriteSortMode.Deferred, BlendState.AlphaBlend, null, null, null, null, menuhandler.GetScaleMatrix());

            foreach (Button b in buttonlist)
            {
                spriteBatch.Draw(b.texture, b.position + menuhandler.GetOffsetVector(), null, Color.White, 0, b.origin, 1, SpriteEffects.None, 0);
                if (b.selected)
                {
                    // spriteBatch.Draw(selection, b.pos + menuhandler.GetOffsetVector(), null, Color.White, 0, b.ori, 1, SpriteEffects.None, 0);
                }
            }            

            menuhandler.DrawLetterbox(spriteBatch, menuhandler.GetOffsetVector() + seventwenty);
            
            spriteBatch.Draw(menuhandler.GetCursor(), mousepos, null, Color.White, 0, Vector2.Zero, 1, SpriteEffects.None, 0);

            spriteBatch.DrawString(segeouimono, status, mousepos, Color.Black);
            
            spriteBatch.End();
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

        public void TogglePause()
        {
            if (pause)
            {
                totaldelay += delay;
                pause = false;
            }
            else
            {
                pausestart = System.DateTime.Now;
                pause = true;
            }
        }
    }
}