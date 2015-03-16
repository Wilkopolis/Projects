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

            //Assets = new Texture2D[50];
            //Assets[0] = Content.Load<Texture2D>("textures/game/empty");
            //Assets[1] = Content.Load<Texture2D>("textures/game/rock");
            //Assets[2] = Content.Load<Texture2D>("textures/game/enemy");
            //Assets[3] = Content.Load<Texture2D>("textures/game/player");
            //Assets[4] = Content.Load<Texture2D>("textures/game/door");
            //Assets[5] = Content.Load<Texture2D>("textures/game/movement");
            //Assets[6] = Content.Load<Texture2D>("textures/game/attack");
            //Assets[7] = Content.Load<Texture2D>("textures/game/blockcursor");
            //Assets[8] = Content.Load<Texture2D>("textures/game/creaturehealthbar");
            //Assets[9] = Content.Load<Texture2D>("textures/game/creaturehealthbaroutline");
            //Assets[10] = Content.Load<Texture2D>("textures/title/background");
            //Assets[11] = Content.Load<Texture2D>("textures/options/background");
            //Assets[12] = Content.Load<Texture2D>("textures/game/background");
            //Assets[13] = Content.Load<Texture2D>("textures/game/grid");
            //Assets[14] = Content.Load<Texture2D>("textures/game/stairs");
            //Assets[15] = Content.Load<Texture2D>("textures/game/healthbar");
            //Assets[16] = Content.Load<Texture2D>("textures/game/healthbaroutline");
            //Assets[17] = Content.Load<Texture2D>("textures/game/apbar");
            //Assets[18] = Content.Load<Texture2D>("textures/game/minimap/visited");
            //Assets[19] = Content.Load<Texture2D>("textures/game/minimap/minidoor");
            //Assets[20] = Content.Load<Texture2D>("textures/game/minimap/minidoorh");
            //Assets[21] = Content.Load<Texture2D>("textures/game/minimap/currentminiroom");
            //Assets[22] = Content.Load<Texture2D>("textures/game/minimap/clear");
            //Assets[23] = Content.Load<Texture2D>("textures/game/minimap/health");
            //Assets[24] = Content.Load<Texture2D>("textures/game/minimap/item");
            //Assets[25] = Content.Load<Texture2D>("textures/game/descriptor/back");
            //Assets[26] = Content.Load<Texture2D>("textures/game/enemy2");
            //Assets[29] = Content.Load<Texture2D>("textures/game/enemy3");
            //Assets[31] = Content.Load<Texture2D>("textures/game/enemy4");
            //Assets[32] = Content.Load<Texture2D>("textures/game/bigboss");
            //Assets[33] = Content.Load<Texture2D>("textures/editor/background");
            //Assets[34] = Content.Load<Texture2D>("textures/editor/enemybackdrop");
            //Assets[35] = Content.Load<Texture2D>("textures/game/4x/poweredroom");
            //Assets[36] = Content.Load<Texture2D>("textures/game/4x/megadoorh");
            //Assets[37] = Content.Load<Texture2D>("textures/game/4x/megadoor");
            //Assets[38] = Content.Load<Texture2D>("textures/game/4x/megaroom");
            //Assets[39] = Content.Load<Texture2D>("textures/classselection/background");
            //Assets[40] = Content.Load<Texture2D>("textures/game/4x/currentroom");
            //Assets[41] = Content.Load<Texture2D>("textures/game/minimap/unvisited");
            //Assets[42] = Content.Load<Texture2D>("textures/game/gempty");
            //Assets[43] = Content.Load<Texture2D>("textures/game/npc/merchant/merchant");
            //Assets[44] = Content.Load<Texture2D>("textures/editor/payout");
            //Assets[45] = Content.Load<Texture2D>("textures/game/npc/alchemist/alchemist");
            //Assets[46] = Content.Load<Texture2D>("textures/game/npc/medic");
            //Assets[47] = Content.Load<Texture2D>("textures/game/npc/gambler");
            //Assets[48] = Content.Load<Texture2D>("textures/game/npc/enchanter/enchanter");
            //Assets[49] = Content.Load<Texture2D>("textures/game/npc/pharmacist/pharmacist");

            dot = Content.Load<Texture2D>("textures/dot");

            SegeoUiMono = Content.Load<SpriteFont>("fonts/SegeoUiMono");
            Calibri = Content.Load<SpriteFont>("fonts/Calibri");
            Cousine12 = Content.Load<SpriteFont>("fonts/Cousine12");
            Cousine16 = Content.Load<SpriteFont>("fonts/Cousine16");
            Cousine22 = Content.Load<SpriteFont>("fonts/Cousine22");
            Cousine72 = Content.Load<SpriteFont>("fonts/Cousine72");
            CenturyGothic = Content.Load<SpriteFont>("fonts/CenturyGothic");

            InitializeTitleScreen();
        }

        protected override void UnloadContent()
        {

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

                    if (UpdateOptions)
                    {
                        Save.GetRoom().Entities.RemoveAll(entity => entity is Fighter && ((Fighter)entity).HP <= 0);
                        if (Save.Kevin.AP == 0)
                            EndTurn();
                        UpdatePlayerOptions();
                        UpdateOptions = false;
                    }

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
            UpdatePlayerOptions();
        }

        public void GameOver()
        {
            GameState = State.TITLE;
            GoldRoomChosen = false;
        }
    }
}