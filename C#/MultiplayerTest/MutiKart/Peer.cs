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
	public partial class Peer : Microsoft.Xna.Framework.Game
	{
        #region
        // Network Stuff
        protected Thread Networker;
        protected Network Net;
        protected Player[] Players;
        protected Texture2D[] WinText;
        // Engine Stuff
        protected GraphicsDeviceManager Graphics;
        protected SpriteBatch SpriteBatch;
        // Game Stuff
        protected string Role;
        protected Player Kart;
        protected LinkedList<Spawner> Spawners;
        protected bool Pause;
        protected bool Start;
        protected Texture2D[] KartSprites;
        protected Rekt Finish;
        protected const float airRot = -.5f;
        protected const int rotFrames = 2;
        // Graphical stuff
        protected LinkedList<Entity> Enemies;
        protected LinkedList<Track> Tracks;
        protected LinkedList<DynamicEntity> Animated;
        protected LinkedList<Entity> Moving;
        protected Vector2 CameraPos = new Vector2(150, 400);
        protected Rekt PlayerHitBox = new Rekt(150, 350, 30, 24);
        protected Vector2 Displaced;
        protected Vector2 Terminal = new Vector2(100, 100);
        protected Texture2D track;
        protected Texture2D dot;
        #endregion

        protected override void LoadContent()
        {
            SpriteBatch = new SpriteBatch(GraphicsDevice);

            Finish = new Rekt(2000, 500, 200, 300);

            #region
            KartSprites = new Texture2D[12];
            KartSprites[0] = Content.Load<Texture2D>("minekart/minekart0a");
            KartSprites[1] = Content.Load<Texture2D>("minekart/minekart0b");
            KartSprites[2] = Content.Load<Texture2D>("minekart/minekart1a");
            KartSprites[3] = Content.Load<Texture2D>("minekart/minekart1b");
            KartSprites[4] = Content.Load<Texture2D>("minekart/minekart2a");
            KartSprites[5] = Content.Load<Texture2D>("minekart/minekart2b");
            KartSprites[6] = Content.Load<Texture2D>("minekart/minekart3a");
            KartSprites[7] = Content.Load<Texture2D>("minekart/minekart3b");
            KartSprites[8] = Content.Load<Texture2D>("minekart/minekart4");
            KartSprites[9] = Content.Load<Texture2D>("minekart/minekart4");
            KartSprites[10] = Content.Load<Texture2D>("minekart/minekart5a");
            KartSprites[11] = Content.Load<Texture2D>("minekart/minekart5b");
            // KartSprites[12] = Content.Load<Texture2D> ("minekart/minekart6a");
            // KartSprites[13] = Content.Load<Texture2D> ("minekart/minekart6b");
            // KartSprites[14] = Content.Load<Texture2D> ("minekart/minekart7a");
            // KartSprites[15] = Content.Load<Texture2D> ("minekart/minekart7b");

            WinText = new Texture2D[8];
            WinText[0] = Content.Load<Texture2D>("wintext/player1wins");
            WinText[1] = Content.Load<Texture2D>("wintext/player2wins");
            WinText[2] = Content.Load<Texture2D>("wintext/player3wins");
            WinText[3] = Content.Load<Texture2D>("wintext/player4wins");
            WinText[4] = Content.Load<Texture2D>("wintext/player5wins");
            WinText[5] = Content.Load<Texture2D>("wintext/player6wins");
            WinText[6] = Content.Load<Texture2D>("wintext/player7wins");
            WinText[7] = Content.Load<Texture2D>("wintext/player8wins");
            #endregion

            Kart = new Player(PlayerHitBox, new Vector2(5, 0), new Texture2D[] {
				KartSprites[0],
				KartSprites[1]
			}, new Vector2(23, 12), 5, new Vector2(8, 12), 0);

            Players = new Player[8];
            //Players[0] = Kart.Copy();
            Enemies = new LinkedList<Entity>();
            Animated = new LinkedList<DynamicEntity>();
            Moving = new LinkedList<Entity>();
            Tracks = new LinkedList<Track>();

            Displaced = CameraPos - new Vector2(Kart.Hitbox.X, Kart.Hitbox.Y);

            // level stuff
            Tracks.AddLast(new Track(2000, 100, 400));
            //Tracks.AddLast(new Track(50, 700, 600));

            foreach (Entity e in Enemies)
                Moving.AddLast(e);

            // Static Hazards
            //Enemies.AddLast(new StaticEntity(new Rekt(100, 650, 3000, 100), Vector2.Zero, Content.Load<Texture2D>("null"), Vector2.Zero, Vector2.Zero));

            Moving.AddLast(Kart);
            Animated.AddLast(Kart);

            track = Content.Load<Texture2D>("track");
            dot = Content.Load<Texture2D>("dot");
        }

        protected bool HasPlayerJoined(int index)
        {
            return Net.Flags[index, 0];
        }

        protected bool HasPlayerJumped(int index)
        {
            return Net.Flags[index, 1];            
        }

        protected bool HasPlayerDied(int index)
        {
            return Net.Flags[index, 2];
        }

        protected bool HasPlayerWon(int index)
        {
            return Net.Flags[index, 3];
        }

        protected bool HasPlayerSaved(int index)
        {
            return Net.Flags[index, 4];
        }

        protected void EnterPlayer(int index)
        {
            Console.WriteLine("player " + index.ToString() + " has joined");
            Players[index] = Kart.Copy();
            Players[index].Frames[0] = KartSprites[index * 2];
            Players[index].Frames[1] = KartSprites[index * 2 + 1];
            Moving.AddLast(Players[index]);
            Animated.AddLast(Players[index]);
            Net.Flags[index, 0] = false;
        }

        protected void IJoined()
        {
            EnterPlayer(0);
            Kart.Frames[0] = KartSprites[Net.myindex * 2];
            Kart.Frames[1] = KartSprites[Net.myindex * 2 + 1];
            Players[Net.myindex] = Kart.Copy();
        }

        protected void JumpPlayer(int index)
        {
            Console.WriteLine("player " + index.ToString() + " has jumped");
            Players[index].doJump = true;
            Net.Flags[index, 1] = false;
        }

        protected void RespawnPlayer(int i)
        {
            Console.WriteLine("player " + i.ToString() + " has died");
            Net.Flags[i, 2] = false;
        }

        protected void WinPlayer(int i)
        {
            Console.WriteLine("player " + i.ToString() + " has won");
            Players[i].HasWon = true;
            Start = false;
            Net.Flags[i, 3] = false;
        }

        protected void SavePlayer(int i)
        {
            Console.WriteLine("player " + i.ToString() + " has reached a checkpoint");
            Net.Flags[i, 4] = false;
        }
	}
}