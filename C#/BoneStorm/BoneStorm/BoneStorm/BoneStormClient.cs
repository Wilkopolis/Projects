using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Graphics;
using Microsoft.Xna.Framework.Input;
using System;
using System.Collections.Generic;
using NAudio;
using NAudio.Wave;

namespace BoneStorm
{
    public partial class BoneStormClient : Game
    {
        GraphicsDeviceManager graphics;
        SpriteBatch spriteBatch;
        //ClientConnection connection;

        // Audio
        IWavePlayer waveOutDevice;
        
        // bool serverReady = false;

        public BoneStormClient()
        {
            graphics = new GraphicsDeviceManager(this);
            Content.RootDirectory = "Content";
        }

        protected override void Initialize()
        {
            //connection = new ClientConnection();
            //Thread networkThread = new Thread(connection.Handshake);
            Stage = new List<Platform>() { new Platform(new Rectangle(240, 510, 800, 9)) };
            Platforms = new List<Platform>() { new Platform(new Rectangle(240, 510, 800, 9)) };
            KillZones = new List<Rectangle>() { new Rectangle(-200, -200, 1480, 100), new Rectangle(-200, -200, 100, 1020), new Rectangle(1380, -200, 100, 1020), new Rectangle(-200, 920, 1480, 100)};
            
            player = new Player(VEC_GRAVITY);
            
            pixel = new Texture2D(GraphicsDevice, 1, 1);
            pixel.SetData<Color>(new Color[] { Color.White });

            //this.TargetElapsedTime = new TimeSpan(0, 0, 0, 0, 100);

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

            ReadInput(Mouse.GetState(), Keyboard.GetState());
            HandleInput();            

            if (gameStarted)
            {
                CheckEvents();

                foreach (Skeleton s in Enemies)
                {
                    s.Update(Stage, KillZones);
                }

                foreach (Doot p in Projectiles)
                {
                    p.Update(KillZones);
                }
                Projectiles.RemoveAll(p => p.Marked);

                foreach (PickUp p in PickUps)
                {
                    p.Update();
                }
                PickUps.RemoveAll(p => p.Marked);

                foreach (Tracer t in Tracers)
                {
                    t.Update();
                }
                Tracers.RemoveAll(p => p.Opacity <= 0);

                foreach (Platform p in Platforms)
                {
                    p.Update();
                }
                Platforms.RemoveAll(p => p.Opacity <= 0);

                if (boss != null && boss.Active)
                {
                    boss.Update();
                }

                player.Update(Platforms, KillZones, PickUps);

                boss.UpdateHPBar();
            }

            foreach(SpriteText s in Text)
            {
                s.Move(gameTime);
            }
            Text.RemoveAll(s => s.Opacity <= 0);

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
