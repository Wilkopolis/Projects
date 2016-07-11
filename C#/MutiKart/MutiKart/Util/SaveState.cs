using System;
using System.Collections.Generic;
using Microsoft.Xna.Framework;

namespace MutiKart
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

