using System;
using System.Collections.Generic;
using Microsoft.Xna.Framework;

namespace Game
{
	public class SaveState
	{
		public DynamicEntity Kart;
		public LinkedList<StaticEntity> Enemies;
		public LinkedList<DynamicEntity> Animated;
		public LinkedList<Entity> Moving;
		public bool Pause;

		public SaveState (DynamicEntity kart, LinkedList<StaticEntity> enemies, LinkedList<DynamicEntity> animated, LinkedList<Entity> moving, bool pause)
		{
			Kart = kart;
			Enemies = enemies;
			Animated = animated;
			Moving = moving;
			Pause = pause;
		}
	}
}

