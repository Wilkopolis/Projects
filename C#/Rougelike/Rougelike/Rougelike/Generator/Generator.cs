using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.IO;
using Microsoft.Xna.Framework.Graphics;
using Microsoft.Xna.Framework;

namespace Rougelike
{
    partial class Rougelike
    {
        Save GenerateGame(Class playerclass)
        {
            Save Result = new Save();

            Player Kevin = new Player(PlayerSprite, HashID++, playerclass);

            Result.Floors = GenerateFloors(5);

            Kevin.Position = new Vector2(5, 7);

            Result.GetRoom().AddToRoom(Kevin);
            Kevin.PickUp(StarterSword);

            Result.Kevin = Kevin;
            return Result;
        }

        Floor[] GenerateFloors(int amount)
        {
            Floor[] result = new Floor[amount];

            result[0] = GenerateStart();
            for (int i = 1; i < amount; i++)
            {
                result[i] = GenerateFloor(i);
            }

            // Place Stairs and Floor positions
            HashSet<Vector2> openset = new HashSet<Vector2>();
            for (int i = 1; i < amount; i++)
            {
                // On this floor
                Floor floor = result[i];
                openset = new HashSet<Vector2>();
                // Add all existing rooms
                for (int x = 0; x < floor.Max.X; x++)
                {
                    for (int y = 0; y < floor.Max.Y; y++)
                    {
                        if (floor.Rooms[x, y].Exists)
                            openset.Add(new Vector2(x, y));
                    }
                }
                // Pick a room
                Vector2 choice = openset.ElementAt(Random.Next(0, openset.Count()));
                // Pick a tile
                LinkedList<Tile> stairlist = new LinkedList<Tile>();
                for (int j = 1; j < 13; j++)
                {
                    for (int k = 1; k < 8; k++)
                    {
                        // Add all available tiles
                        if (StairFree(floor.Rooms[(int)choice.X, (int)choice.Y].Tiles[j, k]))
                        {
                            stairlist.AddLast(floor.Rooms[(int)choice.X, (int)choice.Y].Tiles[j, k]);
                        }
                    }
                }
                // Set the tile
                stairlist.ElementAt(Random.Next(0, stairlist.Count)).Steps = Stairs.UP;
                floor.Rooms[(int)choice.X, (int)choice.Y].HasStairs = true;
                floor.Position = choice;

                // If we arent on the last floor, add a stair down
                if (i != amount - 1)
                {
                    // USE SAME FLOOR
                    // Add all existing rooms
                    HashSet<Vector2> openset2 = new HashSet<Vector2>();
                    for (int x = 0; x < floor.Max.X; x++)
                    {
                        for (int y = 0; y < floor.Max.Y; y++)
                        {
                            if (floor.Rooms[x, y].Exists)
                                openset2.Add(new Vector2(x, y));
                        }
                    }
                    // Pick the room
                    Vector2 choice2 = openset2.ElementAt(Random.Next(0, openset2.Count()));
                    // Pick the tile
                    LinkedList<Tile> stairlist2 = new LinkedList<Tile>();
                    for (int j = 1; j < 13; j++)
                    {
                        for (int k = 1; k < 8; k++)
                        {
                            // Add all available tiles
                            if (StairFree(floor.Rooms[(int)choice2.X, (int)choice2.Y].Tiles[j, k]))
                            {
                                stairlist2.AddLast(floor.Rooms[(int)choice2.X, (int)choice2.Y].Tiles[j, k]);
                            }
                        }
                    }
                    // Set the tile
                    Tile temp = stairlist2.ElementAt(Random.Next(0, stairlist2.Count));
                    temp = StairsTile.Copy();
                    floor.Rooms[(int)choice2.X, (int)choice2.Y].HasStairs = true;
                }
            }
            //result[amount - 1] = GenerateFinish();

            return result;
        }

        Floor GenerateStart()
        {
            Floor result = new Floor(new Vector2(1, 1));
            result.Rooms[0, 0] = new Room(Start);
            return result;
        }

        Floor GenerateFinish()
        {
            Floor result = new Floor(new Vector2(1, 1));
            //result.Rooms[0, 0] = new Room(Finish);
            //result.Rooms[0, 0].EntityList = Finish.Entities; 
            return result;
        }

        Floor GenerateFloor(int depth)
        {
            Vector2 max = Vector2.Zero;
            switch (Random.Next(0, 3))
            {
                case 0:
                    max = new Vector2(4, 4);
                    break;

                case 1:
                    max = new Vector2(5, 5);
                    break;

                case 2:
                    max = new Vector2(6, 6);
                    break;
            }
            Floor result = new Floor(max);
            BuildFloor(max, result.Rooms);
            for (int i = 0; i < max.X; i++)
            {
                for (int j = 0; j < max.Y; j++)
                {
                    if (result.Rooms[i, j].Exists)
                        result.Rooms[i, j] = GenerateRoom(depth);
                }
            }

            PickGoldRoom(result.Rooms, result.Max);

            TrimDoors(result.Rooms, result.Max);

            return result;
        }

        Room GenerateRoom(int depth)
        {
            // Pick a good room or bad room
            RoomTemplate template;

            if (GeerateGoodRoom())
            {
                template = PickGoodTemplate(depth);
            }
            else
            {
                template = PickBadTemplate(depth);
            }

            return BuildRoom(template);
        }

        int BuildFloor(Vector2 max, Room[,] rooms)
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

        Room BuildRoom(RoomTemplate template)
        {
            Room result = new Room(template);

            // Make a room from the stencil
            foreach (Entity E in template.Entities)
            {
                if (E is Item)
                    result.Entities.Add(GenerateItem(E.Position));
                else if (E is Enemy)
                    result.Entities.Add(((Enemy)E).Copy(HashID++));
                else if (E is NPC)
                {
                    NPC guy = ((NPC)E).Copy(HashID++);
                    if (guy.Type == NPCType.MERCHANT)
                        ShopInventory = GenerateShopInventory();
                    else if (guy.Type == NPCType.ENCHANTER)
                        EnchanterButtons = GenerateEnchantments();
                    result.Entities.Add(guy);
                }
            }
            result.Payout = template.Payout;
            
            result.UpdateTiles();

            return result;
        }

        Item GenerateItem(Vector2 position)
        {
            // pick an item from commons rares or legendaries
            Item result;
            Item prize;

            int rand = Random.Next(0, 100);

            if (rand < 95)
                prize = Rares.ElementAt(Random.Next(0, Rares.Count()));
            else
                prize = Legendarys.ElementAt(Random.Next(0, Legendarys.Count()));

            result = Dupe(prize);

            result.Position = position;
            return result;
        }

        Item GenerateItem()
        {
            Item result;

            int rand = Random.Next(0, 100);

            if (rand < 95)
                result = Rares.ElementAt(Random.Next(0, Rares.Count()));
            else
                result = Legendarys.ElementAt(Random.Next(0, Legendarys.Count()));

            return Dupe(result);
        }

        Item GeneratePrize()
        {
            Item result = Commons.ElementAt(Random.Next(0, Commons.Count()));
            if (result is HealthPotion)
            {
                return ((HealthPotion)result).Copy(Save.GetRoom().Payout, HashID++);
            }
            else if (result is Coin)
            {
                return ((Coin)result).Copy(Save.GetRoom().Payout, HashID++, Random.Next(0, 10));
            }
            else if (result is Pill)
                return ((Pill)result).Copy(Save.GetRoom().Payout, HashID++, Random, PlayerHasSkill("prescription"), PlayerHasSkill("fda"));
            return null;
        }

        bool StairFree(Tile tile)
        {
            return (!tile.Solid && tile.Steps == Stairs.NONE);
        }

        bool GeerateGoodRoom()
        {
            return Random.Next(0, 100) < 10;
        }

        RoomTemplate PickGoodTemplate(int depth)
        {
            RoomTemplate result = GoodTemps.ElementAt(Random.Next(0, GoodTemps.Count));
            return result;
        }

        RoomTemplate PickBadTemplate(int depth)
        {
            List<RoomTemplate> results = BadTemps.FindAll(template => template.Difficulty == depth);
            return results.ElementAt(Random.Next(0, results.Count));
        }

        void TrimDoors(Room[,] rooms, Vector2 max)
        {
            for (int i = 0; i < max.X; i++)
            {
                for (int j = 0; j < max.Y; j++)
                {
                    if (rooms[i, j].Exists)
                    {
                        Room current = rooms[i, j];
                        if (i - 1 >= 0)
                        {
                            if (!rooms[i - 1, j].Exists)
                            {
                                for (int k = 0; k < 10; k++)
                                {
                                    if (current.Tiles[0, k].Door)
                                    {
                                        current.Tiles[0, k] = EmptyTile.Copy();
                                    }
                                }
                            }
                        }
                        else
                        {
                            for (int k = 0; k < 10; k++)
                            {
                                if (current.Tiles[0, k].Door)
                                {
                                    current.Tiles[0, k] = EmptyTile.Copy();
                                }
                            }
                        }
                        if (j - 1 >= 0)
                        {
                            if (!rooms[i, j - 1].Exists)
                            {
                                for (int k = 0; k < 15; k++)
                                {
                                    if (current.Tiles[k, 0].Door)
                                    {
                                        current.Tiles[k, 0] = EmptyTile.Copy();
                                    }
                                }
                            }
                        }
                        else
                        {
                            for (int k = 0; k < 15; k++)
                            {
                                if (current.Tiles[k, 0].Door)
                                {
                                    current.Tiles[k, 0] = EmptyTile.Copy();
                                }
                            }
                        }
                        if (i + 1 < max.X)
                        {
                            if (!rooms[i + 1, j].Exists)
                            {
                                for (int k = 0; k < 10; k++)
                                {
                                    if (current.Tiles[14, k].Door)
                                    {
                                        current.Tiles[14, k] = EmptyTile.Copy();
                                    }
                                }
                            }
                        }
                        else
                        {
                            for (int k = 0; k < 10; k++)
                            {
                                if (current.Tiles[14, k].Door)
                                {
                                    current.Tiles[14, k] = EmptyTile.Copy();
                                }
                            }
                        }
                        if (j + 1 < max.Y)
                        {
                            if (!rooms[i, j + 1].Exists)
                            {
                                for (int k = 0; k < 15; k++)
                                {
                                    if (current.Tiles[k, 9].Door)
                                    {
                                        current.Tiles[k, 9] = EmptyTile.Copy();
                                    }
                                }
                            }
                        }
                        else
                        {
                            for (int k = 0; k < 15; k++)
                            {
                                if (current.Tiles[k, 9].Door)
                                {
                                    current.Tiles[k, 9] = EmptyTile.Copy();
                                }
                            }
                        }
                    }
                }
            }
        }

        void PickGoldRoom(Room[,] rooms, Vector2 max)
        {
            List<Vector2> candidates = new List<Vector2>();
            for (int i = 0; i < max.X; i++)
            {
                for (int j = 0; j < max.Y; j++)
                {
                    if (rooms[i, j].Exists)
                        candidates.Add(new Vector2(i,j));
                }
            }
            Vector2 result = candidates.ElementAt(Random.Next(0, candidates.Count));
            rooms[(int)result.X, (int)result.Y] = new Room(Golden);
        }

        List<ShopButton> GenerateShopInventory()
        {
            List<ShopButton> result = new List<ShopButton>();
            ShopButton uno = new ShopButton(SmallHealthPotion, Random.Next(3, 5));
            uno.Position = new Vector2(300, 300);
            result.Add(uno);
            ShopButton dos = new ShopButton(GenerateItem(), 1);
            dos.Position = new Vector2(420, 300);
            result.Add(dos);
            ShopButton tre = new ShopButton(GenerateItem(), 1);
            tre.Position = new Vector2(540, 300);
            result.Add(tre);
            return result;
        }

        List<EnchantmentButton> GenerateEnchantments()
        {
            List<EnchantmentButton> result = new List<EnchantmentButton>();
            result.Add(GenerateEnchantmentButton(new Vector2(700, 320)));
            result.Add(GenerateEnchantmentButton(new Vector2(700, 400)));
            result.Add(GenerateEnchantmentButton(new Vector2(700, 480)));
            return result;
        }

        EnchantmentButton GenerateEnchantmentButton(Vector2 position)
        {
            Effect effect;
            int cost;

            int rand = Random.Next(0, 100);
            if (rand < 10)
            {
                effect = Effect.ABSORB;
                cost = 15;
            }
            else if (rand < 20)
            {
                effect = Effect.BEEFUP;
                cost = 10;
            }
            else if (rand < 30)
            {
                effect = Effect.DOUBLING;
                cost = 30;
            }
            else if (rand < 40)
            {
                effect = Effect.SPLINTER;
                cost = 10;
            }
            else
            {
                effect = Effect.THORNS;
                cost = 10;
            }

            return new EnchantmentButton(EnchantmentButtonBack, position, effect, cost);
        }
    }
}