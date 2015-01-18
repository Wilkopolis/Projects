using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.Xna.Framework.Graphics;
using Microsoft.Xna.Framework;

namespace Rougelike
{
    class RoomButton : Button
    {
        public Room Room;

        public RoomButton(Texture2D sprite, Vector2 position, Room room)
        {
            Sprite = sprite;
            Position = position;
            Origin = new Vector2(Sprite.Width / 2, Sprite.Height / 2);
            Room = room;
            Action = "room";
        }
    }
}
