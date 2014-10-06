using System;
using Microsoft.Xna.Framework.Input;

namespace Game
{
	public class KeyboardManager
	{
		private KeyboardState pState;
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
			F10 = State.IsKeyDown (Keys.F10) && pState.IsKeyUp(Keys.F10);
			JUMP = State.IsKeyDown (Keys.Space) && pState.IsKeyUp(Keys.Space);
			BREAK = State.IsKeyDown (Keys.B) && pState.IsKeyUp(Keys.B);
			PAUSE = State.IsKeyDown (Keys.P) && pState.IsKeyUp(Keys.P);
			LOAD = State.IsKeyDown (Keys.Q) && pState.IsKeyUp(Keys.Q);
//			SAVE = State.IsKeyDown (Keys.E) && pState.IsKeyUp(Keys.E);
			START = State.IsKeyDown (Keys.Enter) && pState.IsKeyUp(Keys.Enter);
			pState = State;
		}
	}
}

