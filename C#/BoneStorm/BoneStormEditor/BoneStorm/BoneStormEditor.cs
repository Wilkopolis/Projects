using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Graphics;
using Microsoft.Xna.Framework.Input;
using System.Collections.Generic;
using NAudio.Wave;

namespace BoneStorm
{
    public partial class BoneStormEditor : Game
    {
        GraphicsDeviceManager graphics;
        SpriteBatch spriteBatch;
        //ClientConnection connection;

        // Audio
        IWavePlayer waveOutDevice;
        
        // bool serverReady = false;

        public BoneStormEditor()
        {
            graphics = new GraphicsDeviceManager(this);
            Content.RootDirectory = "Content";
        }

        protected override void Initialize()
        {
            //connection = new ClientConnection();
            //Thread networkThread = new Thread(connection.Handshake);

            //this.TargetElapsedTime = new TimeSpan(0, 0, 0, 0, 100);
            Event.Init();
            Simulator.Initialize(GraphicsDevice);

            base.Initialize();
        }

        // LoadContent
        //
        // functions
        //  - load music 
        //  - load sound effects
        //  - load player sprite
        //  - set connection readyToStart true when everything is loaded
        //
        // returns
        //  
        protected override void LoadContent()
        {
            spriteBatch = new SpriteBatch(GraphicsDevice);

            LoadSettings();
            LoadSounds();
            LoadArt();
        }

        protected override void UnloadContent()
        {

        }

        // Update
        //
        // functions
        //  - Get and send input states to the InputHandler
        //  - Check collisions for all my MY projectiles and enemies
        //  - Log any collisions for my projectiles and ME
        //  - Check collisions for all enemies/projectiles and ME
        //  - Log my HP if hit
        //      - Check if I die and do anything I gotta
        //  - Update my position if I'm moving
        //      - collide with platforms below me 
        //  - Log my position is I'm moving
        //
        // returns
        //  
        protected override void Update(GameTime gameTime)
        {
            if (Keyboard.GetState().IsKeyDown(Keys.Escape))
                Exit();

            Cursor.Pos = new Vector2(Mouse.GetState().Position.X, Mouse.GetState().Position.Y);

            Simulator.HoverCell = GetHoverCell();
            ReadInput(Mouse.GetState(), Keyboard.GetState());
            HandleInput();

            if (Simulator.Playing)
                Simulator.StepFrame(gameTime);

            Cursor.Animate();
            
            base.Update(gameTime);
        }
        
        protected override void Draw(GameTime gameTime)
        {
            GraphicsDevice.Clear(Color.CornflowerBlue);

            spriteBatch.Begin(SpriteSortMode.Deferred, BlendState.NonPremultiplied, null, null, null, null, null);

            spriteBatch.Draw(Sprites.Background, Vector2.Zero, Color.White);

            DrawEntities();
            
            spriteBatch.End();

            base.Draw(gameTime);
        }
    }
}
