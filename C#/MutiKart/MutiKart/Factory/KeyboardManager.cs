using System;
using Microsoft.Xna.Framework.Input;

namespace MutiKart
{
	public class KeyboardManager
	{
		private KeyboardState prevState;
		public bool JUMP;
		public bool F10;
		public bool BREAK;
		public bool PAUSE;
		public bool LOAD;
//		public bool SAVE;
		public bool START;

		public KeyboardManager ()
		{
		}

		public void Poll()
		{
			KeyboardState State = Keyboard.GetState ();
			F10 = State.IsKeyDown (Keys.F10) && prevState.IsKeyUp(Keys.F10);
			JUMP = State.IsKeyDown (Keys.Space) && prevState.IsKeyUp(Keys.Space);
			BREAK = State.IsKeyDown (Keys.B) && prevState.IsKeyUp(Keys.B);
			PAUSE = State.IsKeyDown (Keys.P) && prevState.IsKeyUp(Keys.P);
			LOAD = State.IsKeyDown (Keys.Q) && prevState.IsKeyUp(Keys.Q);
//			SAVE = State.IsKeyDown (Keys.E) && prevState.IsKeyUp(Keys.E);
			START = State.IsKeyDown (Keys.Enter) && prevState.IsKeyUp(Keys.Enter);
			prevState = State;
		}
	}
}

