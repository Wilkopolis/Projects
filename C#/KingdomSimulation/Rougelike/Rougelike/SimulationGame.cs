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

namespace Rougelike
{
    public partial class Rougelike : Microsoft.Xna.Framework.Game
    {
        public enum State { TITLE, OPTIONS, GAME, LOADING, END };

        GraphicsDeviceManager graphics;
        SpriteBatch spriteBatch;
        Vector2 scaledMousePosition = Vector2.Zero;
        MouseState currentMouseState;
        MouseState lastMouseState;
        KeyboardState currentKeyboard;
        KeyboardState lastKeyboard;

        State gameState;

        Save save;

        public Rougelike()
        {
            Content.RootDirectory = "Content";
            graphics = new GraphicsDeviceManager(this);
            gameState = State.LOADING;
        }

        protected override void Initialize()
        {
            base.Initialize();
        }

        protected override void LoadContent()
        {
            spriteBatch = new SpriteBatch(GraphicsDevice);

            InitializeTitleScreen();
        }

        protected override void UnloadContent()
        {
            Content.Unload();
        }

        protected override void Update(GameTime gameTime)
        {
            currentMouseState = Mouse.GetState();
            currentKeyboard = Keyboard.GetState();
            scaledMousePosition.X = currentMouseState.X / scale;
            scaledMousePosition.Y = currentMouseState.Y / scale;

            switch (gameState)
            {
                case State.TITLE:
                    CheckTitleScreenInput();
                    break;
                    
                case State.GAME:
                    CheckGameInput();
                    break;

                case State.OPTIONS:
                    CheckOptionScreenInput();
                    break;                    
            }

            CheckWindowDragging();

            lastMouseState = currentMouseState;
            lastKeyboard = currentKeyboard;

            base.Update(gameTime);
        }

        protected override void Draw(GameTime gameTime)
        {
            GraphicsDevice.Clear(Color.CornflowerBlue);
            spriteBatch.Begin(SpriteSortMode.Deferred, BlendState.AlphaBlend, null, null, null, null, scaleMatrix);

            switch (gameState)
            {
                case State.TITLE:
                    DrawTitleScreen();
                    break;

                case State.GAME:
                    DrawGameScreen();
                    break;

                case State.OPTIONS:
                    DrawOptionScreen();
                    break;       
             
                case State.LOADING:
                    //DrawLoading();
                    break;

                case State.END:
                    DrawEndScreen();
                    break;
            }

            DrawLetterbox();

            // Draw the cursor
            DrawCursor();
            
            spriteBatch.End();
            base.Draw(gameTime);
        }

        public void Quit()
        {
            this.Exit();
        }

        public void NewGame()
        {
            save = new Save();
            gameState = State.GAME;
        }
    }
}