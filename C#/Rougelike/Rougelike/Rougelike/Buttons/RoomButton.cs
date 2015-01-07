using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.Xna.Framework;

namespace Rougelike
{
    public class RoomButton : Button
    {
        public Room Room;
        public bool Visable;

        public RoomButton(Room room, Vector2 position)
        {
            Room = room;
            Position = position;
            Visable = false;
            Action = "room";
        }
    }
}