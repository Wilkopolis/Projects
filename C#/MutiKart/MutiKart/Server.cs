using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Audio;
using Microsoft.Xna.Framework.Content;
using Microsoft.Xna.Framework.Graphics;
using Microsoft.Xna.Framework.Input;
using Microsoft.Xna.Framework.Media;
using System.Threading;
using MutiKart.Entities;

namespace MutiKart
{
    public class Server : Peer
    {
        public Server()
        {
            Role = "host";
            Graphics = new GraphicsDeviceManager(this);
            KeyBoard = new KeyboardManager();

            Graphics.PreferredBackBufferWidth = 1280;
            Graphics.PreferredBackBufferHeight = 720;
            Graphics.ApplyChanges();

            Content.RootDirectory = "Content";
        }

        protected override void Initialize()
        {
            base.Initialize();

            Net = new Network();
            //Networker = new Thread(new ThreadStart(Net.Server));
            //Networker.Start();
        }

        protected override void Update(GameTime gameTime)
        {
            CheckKeyboard();

            if (Net.Flag)
            {
                Console.WriteLine(Role);
                Console.WriteLine(Net.Status);
                for (int i = 1; i < 8; i++)
                {
                    if (HasPlayerJoined(i))
                    {
                        EnterPlayer(i);
                        // If a player joins, add our own save as well
                        //if (Saves[Net.myindex] == null)
                        //{
                        //    Save(Net.myindex);
                        //}
                    }
                    if (HasPlayerJumped(i))
                    {
                        JumpPlayer(i);
                    }
                    if (HasPlayerDied(i))
                    {
                        RespawnPlayer(i);
                    }
                    if (HasPlayerWon(i))
                    {
                        WinPlayer(i);
                    }
                    if (HasPlayerSaved(i))
                    {
                        SavePlayer(i);
                    }
                }
                Net.Flag = false;
            }
            if (!Pause && Start)
            {

                if (Kart.Hitbox.Intersect(Finish))
                {
                    Start = false;
                    Net.Flags[Net.myindex, 3] = true;
                    Players[Net.myindex].HasWon = true;
                }

                foreach (Entity e in Enemies)
                {
                    if (Kart.Hitbox.Intersect(e.Hitbox))
                    {
                        break;
                    }
                }

                foreach (Entity m in Moving)
                {
                    m.Accelera = new Vector2(0, .50f);
                    m.Grounded = false;
                    foreach (Track t in Tracks)
                        t.Detect(m);
                    if (m.GetType() == typeof(Player) && ((Player)m).doJump)
                    {
                        ((Player)m).doJump = false;
                    }

                    // Rotation stuff
                    if (m.pGrounded && !m.Grounded)
                    {
                        m.rotGoal = airRot;
                        m.rotStep = ( m.rotGoal - m.Rotation ) / rotFrames;
                    }
                    else if (!m.pGrounded && m.Grounded)
                    {
                        m.rotGoal = 0;
                         m.rotStep = (m.rotGoal - m.Rotation) / rotFrames;
                    }

                    if (m.Rotation != m.rotGoal)
                    {
                        m.Rotation += m.rotStep;
                        if (m.Rotation > m.rotGoal && m.rotStep > 0)
                        {
                            m.Rotation = m.rotGoal;
                        }
                        else if (m.Rotation < m.rotGoal && m.rotStep < 0)
                        {
                            m.Rotation = m.rotGoal;
                        }
                    }

                    m.Velocity += m.Accelera;
                    if (m.Velocity.Y + m.Accelera.Y > Terminal.Y)
                    {
                        m.Velocity.Y = Terminal.Y;
                    }
                    m.Hitbox.X += m.Velocity.X;
                    m.Hitbox.Y += m.Velocity.Y;

                    m.pGrounded = m.Grounded;
                }

                Displaced = CameraPos - new Vector2(Kart.Hitbox.X, Kart.Hitbox.Y);

                foreach (DynamicEntity d in Animated)
                    if (d.Grounded)
                        d.Cycle();
            }
            base.Update(gameTime);
        }

        protected override void Draw(GameTime gameTime)
        {
            GraphicsDevice.Clear(Color.CornflowerBlue);
            SpriteBatch.Begin();

            DrawEnemies();
            DrawSpawners();
            DrawPlayers();
            DrawYou();
            DrawTracks();
            DrawDebug();

            SpriteBatch.End();
            base.Draw(gameTime);
        }
    }
}