using System;
using Microsoft.Xna.Framework.Input;

namespace MOBA
{
	public class KeyboardManager
	{
		private KeyboardState pState;
		public bool F10;
		public bool BREAK;

		public KeyboardManager ()
		{
		}

		public void Poll()
		{
			KeyboardState State = Keyboard.GetState ();
			F10 = State.IsKeyDown (Keys.F10) && pState.IsKeyUp(Keys.F10);
			BREAK = State.IsKeyDown (Keys.B) && pState.IsKeyUp(Keys.B);
			pState = State;
		}
	}
}

