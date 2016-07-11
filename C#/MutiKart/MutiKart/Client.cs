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
    public class Client : Peer 
    {
        public Client()
        {
            Role = "client";
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
            Networker = new Thread(new ThreadStart(Net.Client));
            Networker.Start();
        }

        protected override void Update(GameTime gameTime)
        {
            CheckKeyboard();

            if (Net.Flag)
            {
                Console.WriteLine(Role);
                Console.WriteLine(Net.Status);
                for (int i = 0; i < 8; i++)
                {
                    if (HasPlayerJoined(i))
                    {
                        if (i == 0)
                        {
                            Console.WriteLine("Go!");
                            Start = true;
                        }
                        else if (i == Net.myindex)
                        {
                            IJoined();
                        }
                        else
                        {
                            EnterPlayer(i);
                        }
                        Net.Flags[i, 0] = false;
                    }
                    if (HasPlayerJumped(i) && i != Net.myindex)
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
                    m.Accelera = new Vector2(0, .17f);
                    m.Grounded = false;
                    foreach (Track t in Tracks)
                        t.Detect(m);
                    if (m.GetType() == typeof(Player) && ((Player)m).doJump)
                    {
                        ((Player)m).doJump = false;
                    }

                    if (m.Velocity.Y + m.Accelera.Y < Terminal.Y)
                    {
                        m.Velocity += m.Accelera;
                    }
                    m.Velocity += m.Accelera;
                    m.Hitbox.X += m.Velocity.X;
                    m.Hitbox.Y += m.Velocity.Y;
                }

                Displaced = CameraPos - new Vector2(Kart.Hitbox.X, Kart.Hitbox.Y);

                foreach (DynamicEntity d in Animated)
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