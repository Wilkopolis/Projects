using System;
using System.Collections.Generic;
using Microsoft.Xna.Framework;

namespace Game
{
	public class SaveState
	{
		public DynamicEntity Kart;

		public SaveState (DynamicEntity kart)
		{
			Kart = kart;
		}
	}
}

