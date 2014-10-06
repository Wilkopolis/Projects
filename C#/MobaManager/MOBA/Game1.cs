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
using MOBA.util;

namespace MOBA
{
	public class Game1 : Microsoft.Xna.Framework.Game
	{
		#region
		private GraphicsDeviceManager Graphics;
		private SpriteBatch SpriteBatch;
		private KeyboardManager KeyBoard;
		// Engine Stuff
		// ------------
		// Game Stuff
		enum State {Host, Finances, Stats, Victory, Over, New, HoH, Day, Tourny, Roster, Tutorial, Cinematic, Week, Game, Scrim, Play, Match, Start, ScheduleScrim, Info, SendAway, Options };
		State state;
		LinkedList<Button> buttonlist;
		LinkedList<Button> startbuttons;
		// State.Start
		Button playbutton;
		Button tutorialbutton;
		Button optionsbutton;
		Button exitbutton;
		Button hohbutton;

		bool HallofFame;
		// Graphical stuff
		#endregion

		public Game1 ()
		{
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
			state = State.Start;
		}

		protected override void LoadContent ()
		{
			SpriteBatch = new SpriteBatch (GraphicsDevice);
			// start buttons
			startbuttons = new LinkedList<Button> ();
			playbutton = new Button (Content.Load<Texture2D>("playbutton"), new Vector2(640,200), new Vector2(50,50));
			startbuttons.AddLast (playbutton);
			tutorialbutton = new Button (Content.Load<Texture2D>("tutorialbutton"), new Vector2(640,300), new Vector2(50,50));
			startbuttons.AddLast (tutorialbutton);
			optionsbutton = new Button (Content.Load<Texture2D>("optionsbutton"), new Vector2(640,400), new Vector2(50,50));
			startbuttons.AddLast (optionsbutton);
			exitbutton = new Button (Content.Load<Texture2D>("exitbutton"), new Vector2(640,500), new Vector2(50,50));
			startbuttons.AddLast (exitbutton);
			hohbutton = new Button (Content.Load<Texture2D>("hohbutton"), new Vector2(640,600), new Vector2(50,50));
			startbuttons.AddLast (hohbutton);

			buttonlist = startbuttons;
		}

		protected override void UnloadContent ()
		{
		}

		protected override void Update (GameTime gameTime)
		{            
			KeyBoard.Poll ();

			if (KeyBoard.F10)
				this.Exit ();
			if (KeyBoard.BREAK)
				System.Console.WriteLine ("BREAK");

			switch (state) {
			case State.Start:
				Button.Update (buttonlist);
				if (playbutton.clicked)
					state = State.Play;
				else if (tutorialbutton.clicked)
					state = State.Tutorial;
				else if (exitbutton.clicked)
					this.Exit ();
				else if (hohbutton.clicked)
					state = State.HoH;
				break;

			default:
				this.Exit ();
				break;
			}
	
			base.Update (gameTime);
		}

		protected override void Draw (GameTime gameTime)
		{
			GraphicsDevice.Clear (Color.CornflowerBlue);
			SpriteBatch.Begin ();

			foreach (Button b in buttonlist) {
				SpriteBatch.Draw(b.texture, b.position, null, Color.White, 0, b.origin, 1, SpriteEffects.None, 0);
			}

			SpriteBatch.End ();
			base.Draw (gameTime);
		}
	}
}