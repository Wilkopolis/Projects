using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Graphics;
using Microsoft.Xna.Framework.Input;
using System.Collections.Generic;

namespace ProperRoguelike
{
    enum GameState {BACKGROUND_SELECT, GAME, END_GAME};
    enum Menus {ESCAPE};

    public partial class Roguelike : Game
    {
        GraphicsDeviceManager graphics;
        SpriteBatch spriteBatch;
        GameState state;

        public Roguelike()
        {
            graphics = new GraphicsDeviceManager(this);
            Content.RootDirectory = "Content";

            // always allow user to resize window
            this.Window.AllowUserResizing = true;
        }
        
        protected override void Initialize()
        {
            // set the initial game state
            state = GameState.BACKGROUND_SELECT;

            // set the initial keyboard states
            PreviousKeyboardState = Keyboard.GetState();
            CurrentKeyboardState = Keyboard.GetState();

            // load the config/key bindings
            LoadSettingsAndKeys();
            ApplySettings();

            base.Initialize();
        }

        static Dictionary<Menus, Menu> menus;

        SpriteFont titleFont;
        protected override void LoadContent()
        {
            spriteBatch = new SpriteBatch(GraphicsDevice);

            // fonts
            titleFont = Content.Load<SpriteFont>("fonts\\title");

            // menus
            menus = new Dictionary<Menus, Menu>
            {
                { Menus.ESCAPE, new Menu("Escape", 100, 100, 100, 100, new List<Sprite>
                    {
                        new Sprite(new Texture2D(graphics.GraphicsDevice, 100, 300), 182, 104, 216, 100, Vector2.Zero),
                        new Sprite(new Texture2D(graphics.GraphicsDevice, 100, 20), 142, 80, 168, 255, Vector2.Zero),
                        new Sprite(Content.Load<Texture2D>("graphics\\exit.png"), new Vector2(82, 1))
                    })
                }
            };
        }

        protected override void UnloadContent() {}

        KeyboardState PreviousKeyboardState;
        KeyboardState CurrentKeyboardState;
        protected override void Update(GameTime gameTime)
        {
            CurrentKeyboardState = Keyboard.GetState();

            // get all the commands
            var commands = KeyMap.Keys;

            // iterate over the commands, check the hit keys
            foreach (Command command in commands)
            {
                // get all the keys for this command
                CommandHandler handler = KeyMap[command];
                foreach(Keys key in handler.Keys)
                {
                    if (CurrentKeyboardState.IsKeyUp(key) && PreviousKeyboardState.IsKeyDown(key))
                        handler.Handler();
                }
            }

            PreviousKeyboardState = CurrentKeyboardState;
            base.Update(gameTime);
        }
        
        protected override void Draw(GameTime gameTime)
        {
            GraphicsDevice.Clear(Color.CornflowerBlue);

            spriteBatch.Begin();         

            // draw the foreground
            switch(state)
            {
                case GameState.BACKGROUND_SELECT:
                    drawBackgroundSelect();
                    break;

                case GameState.GAME:
                    drawGame();
                    break;

                case GameState.END_GAME:
                    drawEndGame();
                    break;
            }

            drawMenus();

            if (framing != Framing.NONE)
                drawLetterBox();

            drawCursor();

            spriteBatch.End();

            base.Draw(gameTime);
        }
    }
}
