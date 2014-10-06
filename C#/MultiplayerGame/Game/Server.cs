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

namespace Game
{
	public class Server : Microsoft.Xna.Framework.Game
	{
		#region
		// Network Stuff
		private Thread Networking;
		private Network Networker;
		private DynamicEntity[] Players;
		private Texture2D[] WinText;

		private GraphicsDeviceManager Graphics;
		private SpriteBatch SpriteBatch;
		private KeyboardManager KeyBoard;
		// Engine Stuff
		// ------------
		// Game Stuff
		private string Role;
		private DynamicEntity Kart;
		private SaveState[] Saves;
		private LinkedList<StaticEntity> Checkpoints;
		private LinkedList<Spawner> Spawners;
		private bool Pause;
		private bool Start = false;
		private Texture2D[] KartSprites;
		private Rekt Finish;
		// Graphical stuff
		private LinkedList<Entity> Enemies;
		private LinkedList<Track> Tracks;
		private LinkedList<DynamicEntity> Animated;
		private LinkedList<Entity> Moving;
		private Vector2 CameraPos;
		private Vector2 Displaced;
		private Vector2 Terminal;
		private Texture2D CheckPointOn;
		private Texture2D track;
		private Texture2D dot;
		#endregion

		public Server ()
		{
			Role = "host";
			Graphics = new GraphicsDeviceManager (this);
			KeyBoard = new KeyboardManager ();

			Graphics.PreferredBackBufferWidth = 1280;
			Graphics.PreferredBackBufferHeight = 720;
			Graphics.ApplyChanges ();

			Content.RootDirectory = "Content";
		}

		protected override void Initialize ()
		{
			base.Initialize ();

			Networker = new Network ();
			Networking = new Thread (new ThreadStart (Networker.Server));
			Networking.Start ();
		}

		protected override void LoadContent ()
		{
			SpriteBatch = new SpriteBatch (GraphicsDevice);

			CameraPos = new Vector2 (150, 275);
			Displaced = Vector2.Zero;
			Terminal = new Vector2 (100, 100);
			Finish = new Rekt (2000, 400, 200, 300);

			#region
			KartSprites = new Texture2D[12];
			KartSprites[0] = Content.Load<Texture2D> ("minekart/minekart0a");
			KartSprites[1] = Content.Load<Texture2D> ("minekart/minekart0b");
			KartSprites[2] = Content.Load<Texture2D> ("minekart/minekart1a");
			KartSprites[3] = Content.Load<Texture2D> ("minekart/minekart1b");
			KartSprites[4] = Content.Load<Texture2D> ("minekart/minekart2a");
			KartSprites[5] = Content.Load<Texture2D> ("minekart/minekart2b");
			KartSprites[6] = Content.Load<Texture2D> ("minekart/minekart3a");
			KartSprites[7] = Content.Load<Texture2D> ("minekart/minekart3b");
			KartSprites[8] = Content.Load<Texture2D> ("minekart/minekart4");
			KartSprites[9] = Content.Load<Texture2D> ("minekart/minekart4");
			KartSprites[10] = Content.Load<Texture2D> ("minekart/minekart5a");
			KartSprites[11] = Content.Load<Texture2D> ("minekart/minekart5b");
//			KartSprites[12] = Content.Load<Texture2D> ("minekart/minekart6a");
//			KartSprites[13] = Content.Load<Texture2D> ("minekart/minekart6b");
//			KartSprites[14] = Content.Load<Texture2D> ("minekart/minekart7a");
//			KartSprites[15] = Content.Load<Texture2D> ("minekart/minekart7b");

			WinText = new Texture2D[8];
			WinText[0] = Content.Load<Texture2D> ("playerwins/player1wins");
			WinText[1] = Content.Load<Texture2D> ("playerwins/player2wins");
			WinText[2] = Content.Load<Texture2D> ("playerwins/player3wins");
			WinText[3] = Content.Load<Texture2D> ("playerwins/player4wins");
			WinText[4] = Content.Load<Texture2D> ("playerwins/player5wins");
			WinText[5] = Content.Load<Texture2D> ("playerwins/player6wins");
			WinText[6] = Content.Load<Texture2D> ("playerwins/player7wins");
			WinText[7] = Content.Load<Texture2D> ("playerwins/player8wins");
			#endregion

			Kart = new DynamicEntity (new Rekt (150, 275, 30, 24), new Vector2 (3, 0), new Texture2D[] {
				KartSprites[0],
				KartSprites[1]
			}, new Vector2(23,12), 5, new Vector2 (8,12));

			Players = new DynamicEntity[8];
			Players [0] = Kart.Copy ();
			Checkpoints = new LinkedList<StaticEntity> ();
			Enemies = new LinkedList<Entity> ();
			Animated = new LinkedList<DynamicEntity> ();
			Moving = new LinkedList<Entity> ();
			Tracks = new LinkedList<Track> ();
			Saves = new SaveState[8];

			// level stuff
			Tracks.AddLast (new Track(20, new Rekt (100, 400, 20 * 34, 8)));
			Tracks.AddLast (new Track(50, new Rekt (700, 600, 50 * 34, 8)));
			Checkpoints.AddLast (new StaticEntity(new Rekt(1200, 578, 8, 22), Vector2.Zero, Content.Load<Texture2D> ("saveoff"), new Vector2(4, 11), Vector2.Zero));

			foreach (Entity e in Enemies)
				Moving.AddLast (e);

			// static hazards
			Enemies.AddLast (new StaticEntity(new Rekt (100, 650, 3000, 100), Vector2.Zero, Content.Load<Texture2D> ("null"), Vector2.Zero, Vector2.Zero));

			Moving.AddLast (Kart);
			Animated.AddLast (Kart);

			CheckPointOn = Content.Load<Texture2D> ("saveon");
			track = Content.Load<Texture2D> ("track");
			dot = Content.Load<Texture2D> ("dot");
		}

		protected override void UnloadContent ()
		{
		}

		protected override void Update (GameTime gameTime)
		{            
			KeyBoard.Poll ();

			if (KeyBoard.F10) {
				Networking.Abort ();
				this.Exit ();
			}
			if (KeyBoard.BREAK)
				System.Console.WriteLine ("BREAK");
			if (KeyBoard.PAUSE)
				Pause = !Pause;
			if (KeyBoard.LOAD) {
				Load (Networker.myindex);
			}
			if (KeyBoard.JUMP) {
				Kart.Jump = true;
				Networker.Flags[Networker.myindex,1] = true;
			}
			if (KeyBoard.START) {
				Networker.Flags[Networker.myindex,0] = true;
				Start = true;
			}

			if (Networker.Flag) {
				Console.WriteLine (Role);
				Console.WriteLine (Networker.Status);
				for (int i = 1; i < 8; i++) {
					if (Networker.Flags [i, 0]) {
						Console.WriteLine ("player " + i.ToString () + " has joined");
						Players [i] = Kart.Copy ();
						Players [i].Frames [0] = KartSprites [i * 2];
						Players [i].Frames [1] = KartSprites [i * 2 + 1];
						Moving.AddLast (Players [i]);
						Animated.AddLast (Players [i]);
						if (Saves [0] == null) {
							Save (0);
						}
						Save (i);
						Networker.Flags [i, 0] = false;
					} 
					if (Networker.Flags [i, 1]) {
						Console.WriteLine ("player " + i.ToString () + " has jumped");
						Players [i].Jump = true;
						Networker.Flags [i, 1] = false;
					} 
					if (Networker.Flags [i, 2]) {
						Console.WriteLine ("player " + i.ToString () + " has died");
						Load (i);
						Networker.Flags [i, 2] = false;
					}
					if (Networker.Flags [i, 3]) {
						Console.WriteLine ("player " + i.ToString () + " has won");
						Players [i].HasWon = true;
						Start = false;
						Networker.Flags [i, 3] = false;
					}
					if (Networker.Flags [i, 4]) {
						Console.WriteLine ("player " + i.ToString () + " has reached a checkpoint");
						Save (i);
						Networker.Flags [i, 4] = false;
					}
				}
				Networker.Flag = false;
			}

			if (!Pause && Start) {

				if (Kart.Hitbox.Intersect (Finish)) {
					Start = false;
					Networker.Flags [Networker.myindex, 3] = true;
					Players [Networker.myindex].HasWon = true;
				}

				foreach (Entity e in Enemies) {
					if (Kart.Hitbox.Intersect (e.Hitbox)) {
						Load (Networker.myindex);
							break;
					}
				}

				foreach (StaticEntity c in Checkpoints) {
					if (Kart.Hitbox.Intersect (c.Hitbox)) {
						Networker.Flags [Networker.myindex, 4] = true;
						Save (Networker.myindex);
						c.Sprite = CheckPointOn;
						break;
					}
				}

				foreach (Entity m in Moving) {
					m.Accelera = new Vector2 (0, .17f);
					m.Grounded = false;
					foreach (Track t in Tracks)
						t.Detect (m);
					m.Jump = false;

					if (m.Velocity.Y + m.Accelera.Y < Terminal.Y) {
						m.Velocity += m.Accelera;
					}
					m.Velocity += m.Accelera;
					m.Hitbox.X += m.Velocity.X;
					m.Hitbox.Y += m.Velocity.Y; 
				}

				Displaced = CameraPos - new Vector2 (Kart.Hitbox.X, Kart.Hitbox.Y);

				foreach (DynamicEntity d in Animated)
					if (d.Grounded)
						d.Cycle ();
			}
			base.Update (gameTime);
		}

		protected override void Draw (GameTime gameTime)
		{
			GraphicsDevice.Clear (Color.CornflowerBlue);
			SpriteBatch.Begin ();

			foreach (StaticEntity e in Enemies) {
				SpriteBatch.Draw (e.Sprite, new Vector2 (e.Hitbox.X, e.Hitbox.Y) + Displaced, null, Color.White, 0, Vector2.Zero, 1, SpriteEffects.None, 0);
//				SpriteBatch.Draw(dot, new Vector2(e.Hitbox.X, e.Hitbox.Y) + Displaced, null, Color.White, 0, new Vector2(2,2), 1, SpriteEffects.None, 0);  
//				SpriteBatch.Draw(dot, new Vector2(e.Hitbox.X + e.Hitbox.Width, e.Hitbox.Y) + Displaced, null, Color.White, 0, new Vector2(2,2), 1, SpriteEffects.None, 0);  
//				SpriteBatch.Draw(dot, new Vector2(e.Hitbox.X, e.Hitbox.Y + e.Hitbox.Height) + Displaced, null, Color.White, 0, new Vector2(2,2), 1, SpriteEffects.None, 0);  
//				SpriteBatch.Draw(dot, new Vector2(e.Hitbox.X + e.Hitbox.Width, e.Hitbox.Y + e.Hitbox.Height) + Displaced, null, Color.White, 0, new Vector2(2,2), 1, SpriteEffects.None, 0);  
			}

			foreach (Spawner s in Spawners) {
				SpriteBatch.Draw(s.Sprite, new Vector2 (s.Hitbox.X, s.Hitbox.Y) + Displaced, null, Color.White, 0, Vector2.Zero, 1, SpriteEffects.None, 0);
			}

			for (int i = 0; i < Players.Length; i++) {
				DynamicEntity d = Players [i];
				if (d != null) {
					if (i != Networker.myindex)
						SpriteBatch.Draw (d.Sprite, new Vector2 (d.Hitbox.X, d.Hitbox.Y) + Displaced, null, Color.White, 0, Vector2.Zero, 1, SpriteEffects.None, 0);
					//SpriteBatch.Draw(dot, new Vector2(e.Hitbox.X, e.Hitbox.Y) + Displaced, null, Color.White, 0, new Vector2(2,2), 1, SpriteEffects.None, 0);  
					//SpriteBatch.Draw(dot, new Vector2(e.Hitbox.X + e.Hitbox.Width, e.Hitbox.Y) + Displaced, null, Color.White, 0, new Vector2(2,2), 1, SpriteEffects.None, 0);  
					//SpriteBatch.Draw(dot, new Vector2(e.Hitbox.X, e.Hitbox.Y + e.Hitbox.Height) + Displaced, null, Color.White, 0, new Vector2(2,2), 1, SpriteEffects.None, 0);  
					//SpriteBatch.Draw(dot, new Vector2(e.Hitbox.X + e.Hitbox.Width, e.Hitbox.Y + e.Hitbox.Height) + Displaced, null, Color.White, 0, new Vector2(2,2), 1, SpriteEffects.None, 0); 
					if (d.HasWon) {
						SpriteBatch.Draw (WinText[i], new Vector2 (450, 200), null, Color.White, 0, Vector2.Zero, 1, SpriteEffects.None, 0);
					}
				}
			}

			SpriteBatch.Draw(dot, new Vector2(Finish.X, Finish.Y) + Displaced, null, Color.White, 0, new Vector2(2,2), 1, SpriteEffects.None, 0);  
			SpriteBatch.Draw(dot, new Vector2(Finish.X + Finish.Width, Finish.Y) + Displaced, null, Color.White, 0, new Vector2(2,2), 1, SpriteEffects.None, 0);  
			SpriteBatch.Draw(dot, new Vector2(Finish.X, Finish.Y + Finish.Height) + Displaced, null, Color.White, 0, new Vector2(2,2), 1, SpriteEffects.None, 0);  
			SpriteBatch.Draw(dot, new Vector2(Finish.X + Finish.Width, Finish.Y + Finish.Height) + Displaced, null, Color.White, 0, new Vector2(2,2), 1, SpriteEffects.None, 0); 

			SpriteBatch.Draw(Kart.Sprite, CameraPos + new Vector2(0, Kart.index), null, Color.White, 0, Vector2.Zero, 1, SpriteEffects.None, 0);   
			//SpriteBatch.Draw(dot, new Vector2(Kart.Hitbox.X, Kart.Hitbox.Y) + Displaced + Kart.Offset, null, Color.White, 0, new Vector2(2,2), 1, SpriteEffects.None, 0);  
			//SpriteBatch.Draw(dot, new Vector2(Kart.Hitbox.X + Kart.Hitbox.Width, Kart.Hitbox.Y) + Displaced + Kart.Offset, null, Color.White, 0, new Vector2(2,2), 1, SpriteEffects.None, 0);  
			//SpriteBatch.Draw(dot, new Vector2(Kart.Hitbox.X, Kart.Hitbox.Y + Kart.Hitbox.Height) + Displaced + Kart.Offset, null, Color.White, 0, new Vector2(2,2), 1, SpriteEffects.None, 0);  
			//SpriteBatch.Draw(dot, new Vector2(Kart.Hitbox.X + Kart.Hitbox.Width, Kart.Hitbox.Y + Kart.Hitbox.Height) + Displaced + Kart.Offset, null, Color.White, 0, new Vector2(2,2), 1, SpriteEffects.None, 0);   

			foreach (StaticEntity c in Checkpoints) {
				SpriteBatch.Draw (c.Sprite, new Vector2 (c.Hitbox.X, c.Hitbox.Y) + Displaced, null, Color.White, 0, c.Offset, 1, SpriteEffects.None, 0);  
			}

			foreach (Track t in Tracks)
				for (int i = 0; i < t.Length; i++) {
					SpriteBatch.Draw (track, new Vector2 (t.Hitbox.X, t.Hitbox.Y) + Displaced + new Vector2 (i * track.Width, -6), null, Color.White, 0, Vector2.Zero, 1, SpriteEffects.None, 0);  
					//SpriteBatch.Draw(dot, new Vector2(t.Hitbox.X + t.Hitbox.Width, t.Hitbox.Y) + Displaced, null, Color.White, 0, new Vector2(2,2), 1, SpriteEffects.None, 0);  
					//SpriteBatch.Draw(dot, new Vector2(t.Hitbox.X, t.Hitbox.Y + t.Hitbox.Height) + Displaced, null, Color.White, 0, new Vector2(2,2), 1, SpriteEffects.None, 0);  
					//SpriteBatch.Draw(dot, new Vector2(t.Hitbox.X + t.Hitbox.Width, t.Hitbox.Y + t.Hitbox.Height) + Displaced, null, Color.White, 0, new Vector2(2,2), 1, SpriteEffects.None, 0);  
					//SpriteBatch.Draw(dot, new Vector2(t.Hitbox.X, t.Hitbox.Y) + Displaced, null, Color.White, 0, new Vector2(2,2), 1, SpriteEffects.None, 0);  
				}  

			SpriteBatch.End ();
			base.Draw (gameTime);
		}

		private void Save(int index) 
		{
			if (index == Networker.myindex) {
				Saves [index] = new SaveState (Kart.Copy ());
			} else {
				Saves [index] = new SaveState (Players[index].Copy ());
			}
		}

		private void Load(int index)
		{
			// you died
			if (index == Networker.myindex) {
				Networker.Flags [Networker.myindex, 2] = true;
				Moving.Remove (Kart);
				Animated.Remove (Kart);
				Kart = Saves[index].Kart.Copy ();
				Moving.AddLast (Kart);
				Animated.AddLast (Kart);
			// somebody else died lol
			} else {
				Moving.Remove (Players[index]);
				Animated.Remove (Players[index]);
				Players[index] = Saves[index].Kart.Copy ();
				Moving.AddLast (Players[index]);
				Animated.AddLast (Players[index]);
			}
		}
	}
}