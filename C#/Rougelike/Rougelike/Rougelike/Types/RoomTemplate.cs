using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.Xna.Framework;

namespace Rougelike.Types
{
    public class RoomTemplate
    {
        public Tile[,] Tiles;
        public int Difficulty;
        public LinkedList<Entity> Entities = new LinkedList<Entity>();

        public RoomTemplate()
        {
        }
    }
}
