using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Rougelike.Types;
using Microsoft.Xna.Framework;

namespace Rougelike.Util
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
    }
}
