using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.Xna.Framework;

namespace Rougelike.Types
{
    public class Floor
    {
        public Room[,] Rooms;
        public Vector2 Position;
        public Vector2 Max;

        public Floor (Vector2 Max)
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
