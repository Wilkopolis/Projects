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
        GraphicsDeviceManager Graphics;
        SpriteBatch SpriteBatch;
        Vector2 ScaledMousePosition = Vector2.Zero;
        MouseState CurrentMouseState;
        MouseState LastMouseState;
        KeyboardState CurrentKeyboard;
        KeyboardState LastKeyboard;

        State GameState = State.LOADING;

        Save Save;

        public Rougelike()
        {
            Content.RootDirectory = "Content";
            Graphics = new GraphicsDeviceManager(this);
        }

        protected override void Initialize()
        {
            base.Initialize();
        }

        protected override void LoadContent()
        {
            SpriteBatch = new SpriteBatch(GraphicsDevice);

            SegeoUiMono = Content.Load<SpriteFont>("fonts/SegeoUiMono");
            Calibri = Content.Load<SpriteFont>("fonts/Calibri");
            Cousine12 = Content.Load<SpriteFont>("fonts/Cousine12");
            Cousine16 = Content.Load<SpriteFont>("fonts/Cousine16");
            Cousine22 = Content.Load<SpriteFont>("fonts/Cousine22");
            Cousine72 = Content.Load<SpriteFont>("fonts/Cousine72");
            CenturyGothic = Content.Load<SpriteFont>("fonts/CenturyGothic");

            // debug
            dot = Content.Load<Texture2D>("textures/dot");

            //aa = Content.Load<Texture2D>("textures/a");
            //bb = Content.Load<Texture2D>("textures/b");

            InitializeTitleScreen();
        }

        protected override void UnloadContent()
        {
            Content.Unload();
        }

        protected override void Update(GameTime gameTime)
        {
            CurrentMouseState = Mouse.GetState();
            CurrentKeyboard = Keyboard.GetState();
            ScaledMousePosition.X = CurrentMouseState.X / Scale;
            ScaledMousePosition.Y = CurrentMouseState.Y / Scale;

            switch (GameState)
            {
                case State.TITLE:
                    CheckTitleScreenInput();
                    break;

                case State.EDITOR:
                    CheckEditorInput();
                    break;

                case State.GAME:
                    if (IsStartSoundPlaying())
                        break;
                    //else if (StartSoundEnded())
                    //    PlayGameMusic();

                    CheckGameInput();

                    if (MegaMapMode)
                    {
                        CheckMegaMapButtons();
                        CheckSkillButtons();
                    }

                    CheckActiveSkills();

                    if (InteractingWithNPC())
                        CheckNPCButtons();

                    if (DescriptionList.Count == 0)
                        CheckItemDragging();

                    CheckMouseHover();
                    CheckDescriptions();

                    if (ChangedFloors)
                    {
                        if (Save.Depth == 1)
                        {
                            Button megamap = new Button("4x", Keys.Tab);
                            GameButtons.Add(megamap);
                        }
                        BuildMegaMap();
                        ChangedFloors = false;
                    }
                    break;

                case State.OPTIONS:
                    CheckOptionScreenInput();
                    break;

                case State.CLASSSELECTION:
                    CheckClassSelectionScreenInput();
                    break;
            }

            CheckWindowDragging();

            LastMouseState = CurrentMouseState;
            LastKeyboard = CurrentKeyboard;

            base.Update(gameTime);
        }

        protected override void Draw(GameTime gameTime)
        {
            GraphicsDevice.Clear(Color.CornflowerBlue);
            SpriteBatch.Begin(SpriteSortMode.Deferred, BlendState.AlphaBlend, null, null, null, null, ScaleMatrix);

            switch (GameState)
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

                case State.EDITOR:
                    DrawEditorScreen();
                    break;

                case State.CLASSSELECTION:
                    DrawClassSelectionScreen();
                    break;
            }

            DrawLetterbox();

            // Draw the cursor
            DrawCursor();

            //SpriteBatch.DrawString(SegeoUiMono, Status, new Vector2(700, 0), Color.White);

            SpriteBatch.End();
            base.Draw(gameTime);
        }

        public void Quit()
        {
            this.Exit();
        }

        public void NewGame(Class playerclass)
        {
            Save = GenerateGame(playerclass);
            //PlayNewGameSound();
        }

        public void GameOver()
        {
            GameState = State.TITLE;
            GoldRoomChosen = false;
        }
    }
}