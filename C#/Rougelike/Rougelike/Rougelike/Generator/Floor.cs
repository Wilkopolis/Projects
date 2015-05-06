using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.Xna.Framework;

namespace Rougelike
{
    public class Floor
    {
        public Room[,] Rooms;
        public Vector2I Position;
        public Vector2I Max;

        public Floor(Vector2I Max)
        {
            this.Max = Max;
            Rooms = new Room[(int)Max.X, (int)Max.Y];
            for (int i = 0; i < Max.X; i++)
            {
                for (int j = 0; j < Max.Y; j++)
                {
                    Rooms[i, j] = new Room();
                }
            }
        }
    }
}
