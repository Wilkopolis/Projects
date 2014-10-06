#region Using Statements
using System;
using System.Collections.Generic;
using System.Linq;
#endregion

namespace Game
{
	static class Program
	{
		private static Server game;
		// Client Server
		/// <summary>
		/// The main entry point for the application.
		/// </summary>
		[STAThread]
		static void Main ()
		{
			game = new Server ();
			game.Run ();
		}
	}
}
