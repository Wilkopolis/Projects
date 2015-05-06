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
        public Tile[,] Tiles = new Tile[15,10];
        public int Difficulty = 0;
        public List<Entity> Entities = new List<Entity>();
        public Vector2I Payout;
        public bool Golden;

        public RoomTemplate(Tile[,] tiles)
        {
            for (int i = 0; i < 15; i++)
            {
                for (int j = 0; j < 10; j++)
                {
                    Tiles[i, j] = tiles[i,j].Copy();
                }
            }
        }

        public RoomTemplate(Tile[,] tiles, String name, int difficulty)
        {
            for (int i = 0; i < 15; i++)
            {
                for (int j = 0; j < 10; j++)
                {
                    Tiles[i, j] = tiles[i, j].Copy();
                }
            }
            Name = name;
            Difficulty = difficulty;
        }
    }
}
