using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.IO;
using Microsoft.Xna.Framework.Graphics;
using Microsoft.Xna.Framework;
using Rougelike.Types;
using Rougelike.Util;
using Rougelike.Factory;

namespace Rougelike.Factory
{
    partial class Generator
    {
        private Random Random;

        private Item SackOfDosh;

        private String[] NameBank = { "Mac", "KickstarterBacker", "Jebidiah", "Jules", "Fuji", "Llama", "DC", "Tazdingo", "Yuri", "Seany" };
        
        public Save GenerateGame()
        {
            Save Result = new Save();

            Result.Floors = GenerateFloors(5);

            Player Kevin = new Player();

            Kevin.Position = new Vector2(5,7);

            Result.GetRoom().AddToRoom(Kevin);
            Kevin.PickUp(StarterSword);

            Result.Kevin = Kevin;             
            return Result;
        }

        public Floor[] GenerateFloors(int amount)
        {
            Floor[] result = new Floor[amount];

            result[0] = GenerateStart();
            for (int i = 1; i < amount; i++)
            {
                result[i] = GenerateFloor(i, 1);
            }

            // Place Stairs and Floor positions
            HashSet<Vector2> openset = new HashSet<Vector2>();      
            for (int i = 1; i < amount; i++)
            {
                Floor floor = result[i];
                openset = new HashSet<Vector2>();
                for (int x = 0; x < floor.Max.X; x++)
                {
                    for (int y = 0; y < floor.Max.Y; y++)
                    {
                        if (floor.Rooms[x, y].Exists)
                            openset.Add(new Vector2(x,y));
                    }
                }
                Vector2 choice = openset.ElementAt(Random.Next(0, openset.Count()));
                LinkedList<Tile> stairlist = new LinkedList<Tile>();
                for (int j = 1; j < 13; j++)
                {
                    for (int k = 1; k < 8; k++)
                    {
                        if (stairFree(floor.Rooms[(int)choice.X, (int)choice.Y].Tiles[j, k]))
                        {
                            stairlist.AddLast(floor.Rooms[(int)choice.X, (int)choice.Y].Tiles[j, k]);
                        }
                    }
                }
                stairlist.ElementAt(Random.Next(0, stairlist.Count)).Steps = Tile.Stairs.UP;
                floor.Position = choice;

                if (i != amount - 1)
                {
                    Floor floor2 = result[i + 1];
                    HashSet<Vector2> openset2 = new HashSet<Vector2>();
                    for (int x = 0; x < floor2.Max.X; x++)
                    {
                        for (int y = 0; y < floor2.Max.Y; y++)
                        {
                            if (floor2.Rooms[x, y].Exists)
                                openset2.Add(new Vector2(x, y));
                        }
                    }
                    Vector2 choice2 = openset2.ElementAt(Random.Next(0, openset2.Count()));
                    stairlist = new LinkedList<Tile>();
                    for (int j = 1; j < 13; j++)
                    {
                        for (int k = 1; k < 8; k++)
                        {
                            if (stairFree(floor2.Rooms[(int)choice2.X, (int)choice2.Y].Tiles[j, k]))
                            {
                                stairlist.AddLast(floor2.Rooms[(int)choice2.X, (int)choice2.Y].Tiles[j, k]);
                            }
                        }
                    }
                    stairlist.ElementAt(Random.Next(0, stairlist.Count)).Steps = Tile.Stairs.DOWN;
                }
            }

            return result;
        }

        private Floor GenerateStart()
        {
            Floor result = new Floor(new Vector2(1, 1));
            result.Rooms[0, 0] = new Room(Start);
            return result;
        }

        private Floor GenerateFloor(int depth, int totaldepth)
        {            
            Vector2 max = Vector2.Zero;
            switch (Random.Next(0, 3))
            {
                case 0:
                    max = new Vector2(5, 5);
                    break;

                case 1:
                    max = new Vector2(7, 7);
                    break;

                case 2:
                    max = new Vector2(9, 9);
                    break;
            }                 
            Floor result = new Floor(max);
            BuildFloor(max, result.Rooms);
            float temp = BadTemps.Count() * depth / totaldepth;
            int difficulty = (int)Math.Round(temp + Random.Next(-depth / totaldepth, depth / totaldepth));
            for (int i = 0; i < max.X; i++)
            {
                for (int j = 0; j < max.Y; j++)
                {
                    if (result.Rooms[i, j].Exists)
                        result.Rooms[i, j] = GenerateRoom(depth, totaldepth);
                }
            }

            //Calc Doors
            for (int i = 0; i < max.X; i++)
            {
                for (int j = 0; j < max.Y; j++)
                {
                    if (result.Rooms[i, j].Exists)
                    {
                        if (j + 1 < max.Y && result.Rooms[i, j + 1].Exists)
                        {
                            // Generate a door below us
                            // Make a list of possible door solutions
                            LinkedList<Tile> tiles = new LinkedList<Tile>();
                            for (int k = 1; k < 13; k++)
                            {
                                if (!result.Rooms[i, j].Tiles[k, 9].TrueSolid)
                                {
                                    tiles.AddLast(result.Rooms[i, j].Tiles[k, 9]);
                                }
                            }
                            // pick a random option
                            tiles.ElementAt(Random.Next(0, tiles.Count)).Door = true;
                        }
                        if (j - 1 >= 0 && result.Rooms[i, j - 1].Exists)
                        {
                            // Generate a door above us
                            LinkedList<Tile> tiles = new LinkedList<Tile>();
                            for (int k = 1; k < 13; k++)
                            {
                                if (!result.Rooms[i, j].Tiles[k, 0].TrueSolid)
                                {
                                    tiles.AddLast(result.Rooms[i, j].Tiles[k, 0]);
                                }
                            }
                            // pick a random option
                            tiles.ElementAt(Random.Next(0, tiles.Count)).Door = true;
                        }
                        if (i + 1 < max.X && result.Rooms[i + 1, j].Exists)
                        {
                            // Generate to the right of us
                            LinkedList<Tile> tiles = new LinkedList<Tile>();
                            for (int k = 1; k < 8; k++)
                            {
                                if (!result.Rooms[i, j].Tiles[14, k].TrueSolid)
                                {
                                    tiles.AddLast(result.Rooms[i, j].Tiles[14, k]);
                                }
                            }
                            // pick a random option
                            tiles.ElementAt(Random.Next(0, tiles.Count)).Door = true;
                        }
                        if (i - 1 >= 0 && result.Rooms[i - 1, j].Exists)
                        {
                            // Generate to the left of us
                            LinkedList<Tile> tiles = new LinkedList<Tile>();
                            for (int k = 1; k < 8; k++)
                            {
                                if (!result.Rooms[i, j].Tiles[0, k].TrueSolid)
                                {
                                    tiles.AddLast(result.Rooms[i, j].Tiles[0, k]);
                                }
                            }
                            // pick a random option
                            tiles.ElementAt(Random.Next(0, tiles.Count)).Door = true;
                        }
                    }
                }
            }

            foreach (Room room in result.Rooms)
            {
                if (room.Exists)
                {
                    foreach (Tile tile in room.Tiles)
                    {
                        if (tile.Door)
                        {
                            tile.Solid = true;
                        }
                    }
                }
            }
            
            return result;
        }

        private Room GenerateRoom(int depth, int floors)
        {
            // Pick a good room or bad room
            RoomTemplate template;
            LinkedList<Stencil> choices;
            if (Random.Next(0, 10) > 0)
            {
                template = BadTemps.ElementAt(Random.Next(0, BadTemps.Count()));
                //// Pick a stencil with difficulty
                //choices = new LinkedList<Stencil>();
                //foreach (Stencil s in template.Stencils)
                //{
                //    if (s.Difficulty > depth && s.Difficulty < depth + 4)
                //    {
                //        choices.AddLast(s);
                //    }
                //}
                // Pick ANY stencil
                choices = new LinkedList<Stencil>();
                foreach (Stencil s in template.Stencils)
                {
                    choices.AddLast(s);
                }
            }
            else
            {
                template = GoodTemps.ElementAt(Random.Next(0, GoodTemps.Count()));
                // Pick ANY stencil
                choices = new LinkedList<Stencil>();
                foreach (Stencil s in template.Stencils)
                {
                    choices.AddLast(s);
                }
            }
            Room result = new Room(template);
            
            // Pick a choice and make a room out of it
            Stencil choice = choices.ElementAt(Random.Next(0, choices.Count()));
            // Make a room from the stencil
            foreach (Entity E in choice.Entities)
            {
                if (E is Item)
                    result.EntityList.AddLast(GenerateItem(E.Position));
                else if (E is Enemy)
                    result.EntityList.AddLast(((Enemy)E).Copy());
                //else if (E is NPC)
            }
                
            result.UpdateTiles();
            return result;
        }

        private int BuildFloor(Vector2 max, Room[,] rooms)
        {
            int RoomAmount = (int)Math.Round(max.X * max.Y / 2);
            HashSet<Vector2> openset = new HashSet<Vector2>();
            // Start somewhere randomly in the floor
            int result = 0;

            openset.Add(new Vector2(Random.Next(0, (int)max.X), Random.Next(0, (int)max.Y)));
            while (RoomAmount > 0)
            {
                // pick a random room
                Vector2 current = openset.ElementAt(Random.Next(0, openset.Count()));
                openset.Remove(current);
                rooms[(int)current.X, (int)current.Y].Exists = true;
                if (current.X - 1 >= 0)
                    openset.Add(new Vector2(current.X - 1, current.Y));
                if (current.Y - 1 >= 0)
                    openset.Add(new Vector2(current.X, current.Y - 1));
                if (current.X + 1 < max.X)
                    openset.Add(new Vector2(current.X + 1, current.Y));
                if (current.Y + 1 < max.Y)
                    openset.Add(new Vector2(current.X, current.Y + 1));
                RoomAmount--;
                result++;
            }
            return result;
        }

        private Item GenerateItem(Vector2 position)
        {
            // pick an item from commons rares or legendaries
            Item result;

            int rand = Random.Next(0, 100);

            if (rand < 70)
                result = Commons.ElementAt(Random.Next(0, Commons.Count()));
            else if (rand < 95)
                result = Rares.ElementAt(Random.Next(0, Rares.Count()));
            else
                result = Legendarys.ElementAt(Random.Next(0, Legendarys.Count()));

            result.Position = position;
            return result;
        }

        private Tile[,] newEmpty()
        {
            Tile[,] result = new Tile[15, 10];
            for (int i = 0; i < 15; i++)
            {
                for (int j = 0; j < 10; j++)
                {
                    result[i, j] = Empty.Copy();
                }
            }
            return result;
        }

        private bool stairFree(Tile tile)
        {
            return (!tile.TrueSolid || tile.Steps == Tile.Stairs.NONE);
        }
    }
}