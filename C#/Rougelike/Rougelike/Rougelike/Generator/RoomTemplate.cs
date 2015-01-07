using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.Xna.Framework;

namespace Rougelike
{
    public class RoomTemplate
    {
        public string Name;
        public int HashID;
        public Tile[,] Tiles;
        public int W = 14;
        public int H = 9;
        public int Difficulty = 0;
        public List<Entity> Entities = new List<Entity>();

        public RoomTemplate()
        {
            Tiles = new Tile[15, 10];
            for (int i = 0; i < 15; i++)
            {
                for (int j = 0; j < 10; j++)
                {
                    Tiles[i, j] = new Tile(false);
                }
            }
        }

        public RoomTemplate(String name, int difficulty)
        {
            Tiles = new Tile[15, 10];
            for (int i = 0; i < 15; i++)
            {
                for (int j = 0; j < 10; j++)
                {
                    Tiles[i, j] = new Tile(false);
                }
            }
            Name = name;
            Difficulty = difficulty;
        }
    }
}
