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
using Rougelike.Types;

namespace Rougelike
{
    public partial class Rougelike : Microsoft.Xna.Framework.Game
    {
        public GraphicsDeviceManager Graphics;
        private SpriteBatch SpriteBatch;

        public enum State { TITLE, OPTIONS, GAME };
        private enum Settings { DISPLAYWIDTH = 1, DISPLAYHEIGHT = 3, ASPECTRATIO = 5, FULLSCREEN = 7, BORDERLESS = 9, LETTERBOX = 11 };
        private enum STAIRS { NONE = 0, DOWN = 1, UP = 2 };

        public State GameState;

        private MenuHandler MenuHandler;

        private Vector2 ScaledMousePos;
        private MouseState LastMouseState;

        private SpriteFont SegeoUiMono;
        private SpriteFont Calibri;
        private SpriteFont Cousine16;
        private SpriteFont Cousine22;
        private SpriteFont CenturyGothic;
        private Color softgray = new Color(87, 77, 77);
        private Color whiteorange = new Color(255, 245, 210);
        private Color brightwhite = new Color(255, 249, 247);
        private Color lightblue = new Color(52, 159, 216);
        private Color orange = new Color(196, 102, 39);

        // Engine Stuff
        // ------------
        // Game Stuff

        private Generator Generator;
        public Save Save;

        // Graphical stuff

        private Texture2D[] Assets;

        public Rougelike()
        {
            Content.RootDirectory = "Content";
            Graphics = new GraphicsDeviceManager(this);
        }

        protected override void Initialize()
        {
            GameState = State.TITLE;
            ScaledMousePos = Vector2.Zero;

            base.Initialize();
        }

        protected override void LoadContent()
        {
            SpriteBatch = new SpriteBatch(GraphicsDevice);
            #region
            Generator = new Generator(
                new Texture2D[]{
                    Content.Load<Texture2D>("textures/gamebuttons/items/woodsword"),
                    Content.Load<Texture2D>("textures/gamebuttons/items/dagger"),
                    Content.Load<Texture2D>("textures/gamebuttons/items/dagger2"),
                    Content.Load<Texture2D>("textures/gamebuttons/items/healthpotion"),
                    Content.Load<Texture2D>("textures/gamebuttons/items/helmet"),
                    Content.Load<Texture2D>("textures/gamebuttons/items/shield"),
                    Content.Load<Texture2D>("textures/gamebuttons/items/coin")}
                );

            Assets = new Texture2D[31];
            Assets[0] = Content.Load<Texture2D>("textures/gamebuttons/empty");
            Assets[1] = Content.Load<Texture2D>("textures/gamebuttons/rock");
            Assets[2] = Content.Load<Texture2D>("textures/gamebuttons/enemy");
            Assets[3] = Content.Load<Texture2D>("textures/gamebuttons/player");
            Assets[4] = Content.Load<Texture2D>("textures/gamebuttons/door");
            Assets[5] = Content.Load<Texture2D>("textures/gamebuttons/movement");
            Assets[6] = Content.Load<Texture2D>("textures/gamebuttons/attack");
            Assets[7] = Content.Load<Texture2D>("textures/gamebuttons/blockcursor");
            Assets[8] = Content.Load<Texture2D>("textures/gamebuttons/creaturehealthbar");
            Assets[9] = Content.Load<Texture2D>("textures/gamebuttons/creaturehealthbaroutline");
            Assets[10] = Content.Load<Texture2D>("textures/menubuttons/titlebackground");
            Assets[11] = Content.Load<Texture2D>("textures/optionsbuttons/optionsbackground");
            Assets[12] = Content.Load<Texture2D>("textures/gamebuttons/gamebackground");
            Assets[13] = Content.Load<Texture2D>("textures/gamebuttons/grid");
            Assets[14] = Content.Load<Texture2D>("textures/gamebuttons/stairs");
            Assets[15] = Content.Load<Texture2D>("textures/gamebuttons/healthbar");
            Assets[16] = Content.Load<Texture2D>("textures/gamebuttons/healthbaroutline");
            Assets[17] = Content.Load<Texture2D>("textures/gamebuttons/apbar");
            Assets[18] = Content.Load<Texture2D>("textures/gamebuttons/minimap/miniroom");
            Assets[19] = Content.Load<Texture2D>("textures/gamebuttons/minimap/minidoor");
            Assets[20] = Content.Load<Texture2D>("textures/gamebuttons/minimap/minidoorh");
            Assets[21] = Content.Load<Texture2D>("textures/gamebuttons/minimap/currentminiroom");
            Assets[22] = Content.Load<Texture2D>("textures/gamebuttons/minimap/clear");
            Assets[23] = Content.Load<Texture2D>("textures/gamebuttons/minimap/health");
            Assets[24] = Content.Load<Texture2D>("textures/gamebuttons/minimap/item");
            Assets[25] = Content.Load<Texture2D>("textures/gamebuttons/descriptor/back");
            Assets[26] = Content.Load<Texture2D>("textures/gamebuttons/enemy2");
            Assets[27] = Content.Load<Texture2D>("textures/gamebuttons/descriptor/backdrop");
            Assets[28] = Content.Load<Texture2D>("textures/gamebuttons/descriptor/exit");
            Assets[29] = Content.Load<Texture2D>("textures/gamebuttons/enemy3");
            Assets[30] = Content.Load<Texture2D>("textures/gamebuttons/minimap/stairs");
            #endregion
            SegeoUiMono = Content.Load<SpriteFont>("fonts/SegeoUiMono");
            Calibri = Content.Load<SpriteFont>("fonts/Calibri");
            Cousine16 = Content.Load<SpriteFont>("fonts/Cousine16");
            Cousine22 = Content.Load<SpriteFont>("fonts/Cousine22");
            CenturyGothic = Content.Load<SpriteFont>("fonts/CenturyGothic");

            MenuHandler = new MenuHandler(this);

            MenuHandler.ApplyChanges(this);
        }


        protected override void UnloadContent()
        {
        }

        protected override void Update(GameTime gameTime)
        {
            MouseState CurrentMouseState = Mouse.GetState();
            ScaledMousePos.X = CurrentMouseState.X / MenuHandler.scale;
            ScaledMousePos.Y = CurrentMouseState.Y / MenuHandler.scale;

            Button hover = MenuHandler.CheckButtons(this, CurrentMouseState, LastMouseState, ScaledMousePos, (System.Windows.Forms.Form)System.Windows.Forms.Control.FromHandle(this.Window.Handle));

            LastMouseState = CurrentMouseState;

            base.Update(gameTime);
        }

        protected override void Draw(GameTime gameTime)
        {
            GraphicsDevice.Clear(Color.CornflowerBlue);
            SpriteBatch.Begin(SpriteSortMode.Deferred, BlendState.AlphaBlend, null, null, null, null, MenuHandler.scalematrix);

            switch (GameState)
            {
                case State.TITLE:
                    SpriteBatch.Draw(Assets[10], MenuHandler.OffsetVector, null, Color.White, 0, Vector2.Zero, 1, SpriteEffects.None, 0);
                    break;

                case State.GAME:
                    SpriteBatch.Draw(Assets[12], MenuHandler.OffsetVector, null, Color.White, 0, Vector2.Zero, 1, SpriteEffects.None, 0);

                    // TILES
                    DrawTiles();

                    // ENTITIES
                    DrawEntities();

                    // MOVEMENTS
                    DrawMovements();

                    // ATTACKS
                    DrawAttacks();

                    // INVENTORY
                    DrawInventory();

                    // UI
                    DrawUI();

                    // MINIMAP
                    DrawMiniMap();

                    // DECRIPTIONS
                    DrawDescriptions();
                    break;

                case State.OPTIONS:
                    SpriteBatch.Draw(Assets[11], MenuHandler.OffsetVector, null, Color.White, 0, Vector2.Zero, 1, SpriteEffects.None, 0);
                    break;
            }

            foreach (Button b in MenuHandler.GetButtonList(GameState))
            {
                SpriteBatch.Draw(b.Sprite, b.Position + MenuHandler.OffsetVector, null, Color.White, 0, b.Origin, 1, SpriteEffects.None, 0);
            }

            MenuHandler.DrawLetterbox(SpriteBatch, MenuHandler.OffsetVector + new Vector2(0, 720));

            // Draw the cursor
            SpriteBatch.Draw(MenuHandler.Cursor, ScaledMousePos, null, Color.White, 0, new Vector2(9, 9), 1, SpriteEffects.None, 0);

            //SpriteBatch.DrawString(SegeoUiMono, Status, new Vector2(700, 0), Color.White);

            SpriteBatch.End();
            base.Draw(gameTime);
        }

        public void Quit()
        {
            this.Exit();
        }

        public void NewGame()
        {
            Save = Generator.GenerateGame();
            Creature.DoTurn(Save.Kevin, Save.GetRoom(), Save.Kevin);
            
        }

        public void GameOver()
        {
            GameState = State.TITLE;
        }
    }
}