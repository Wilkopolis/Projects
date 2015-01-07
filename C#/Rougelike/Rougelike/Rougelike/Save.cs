using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.Xna.Framework;

namespace Rougelike
{
    public class Save
    {
        public Floor[] Floors;
        public int Depth;
        public Player Kevin;

        public Save()
        {
            Depth = 0;
        }

        public Room GetRoom()
        {
            return Floors[Depth].Rooms[(int)Floors[Depth].Position.X, (int)Floors[Depth].Position.Y];
        }

        public Floor GetFloor()
        {
            return Floors[Depth];
        }

        public void GoDown()
        {
            Depth++;
        }

        public void GoUp()
        {
            Depth--;
        }

        public Room GetGoldRoom()
        {
            for (int i = 0; i < Floors[Depth].Max.X; i++)
            {
                for (int j = 0; j < Floors[Depth].Max.Y; j++)
                {
                    if (Floors[Depth].Rooms[i, j].Golden)
                        return Floors[Depth].Rooms[i, j];
                }
            }
            return null;
        }
    }
}
