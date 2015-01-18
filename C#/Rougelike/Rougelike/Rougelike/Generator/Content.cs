using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Graphics;
using System.IO;

namespace Rougelike
{
    partial class Rougelike
    {
        Tile Empty = new Tile(false);
        Tile Solid = new Tile(true);
        Random Random = new Random();
        Vector2 Origin = new Vector2(34, 34);

        List<Item> Commons;
        List<Item> Rares;
        List<Item> Legendarys;

        List<RoomTemplate> BadTemps;
        List<RoomTemplate> GoodTemps;

        List<Enemy> EnemyTemplates;

        RoomTemplate Start;
        RoomTemplate Golden;
        Weapon StarterSword;
        HealthPotion SmallHealthPotion;

        String[] NameBank = { "Mac", "KickstarterBacker", "Jebidiah", "Jules", "Fuji", "Llama", "DC", "Tazdingo", "Yuri", "Seany" };

        int Difficulty = 5;

        void InitializeGenerator()
        {
            Commons = new List<Item>();
            Rares = new List<Item>();
            Legendarys = new List<Item>();

            BadTemps = new List<RoomTemplate>();
            GoodTemps = new List<RoomTemplate>();

            EnemyTemplates = new List<Enemy>();

            //Starting Room
            Start = new RoomTemplate();
            Start.Tiles[7, 1].Steps = Stairs.DOWN;

            Golden = new RoomTemplate();
            Golden.Golden = true;
            for (int i = 0; i < 15; i++)
            {
                for (int j = 0; j < 10; j++)
                {
                    Golden.Tiles[i, j].AssetIndex = (int)Texture.GOLDENEMPTY;
                }
            }
            Golden.Tiles[0, 4].Door = true;
            Golden.Tiles[0, 5].Door = true;
            Golden.Tiles[7, 0].Door = true;
            Golden.Tiles[7, 9].Door = true;
            Golden.Tiles[14, 4].Door = true;
            Golden.Tiles[14, 5].Door = true;

            //Starter Weapon
            StarterSword = new Weapon(Content.Load<Texture2D>("textures/game/items/woodsword"), 1, 1, 5, ItemType.WEILD, "Starter Sword", HashID++, new Effect[] {Effect.ONEHANDED, Effect.SWORD});
            
            ////////////////////////////////
            //          ENTITIES          //
            ////////////////////////////////
                            
            /******************************/
            /*           ITEMS
            /******************************/

            #region
            /*
            *      COMMONS   
            */

            // Small HP
            SmallHealthPotion = new HealthPotion(Content.Load<Texture2D>("textures/game/items/healthpotion"), Strength.SMALL, 5, HashID++);
            Commons.Add(SmallHealthPotion);

            Item coin = new Coin(Content.Load<Texture2D>("textures/game/items/coin"), 5);
            Commons.Add(coin);

            /*
             *      RARES   
             */

            // Splinter Wooden Sword
            Weapon woodensword = new Weapon(Content.Load<Texture2D>("textures/game/items/woodsword"), 1, 1, 20, ItemType.WEILD, "Wooden Sword", HashID++, new Effect[] {Effect.ONEHANDED, Effect.SWORD, Effect.SPLINTER});
            Rares.Add(woodensword);

            // Thorny Helmet
            Armor spikyhelmet = new Armor(Content.Load<Texture2D>("textures/game/items/helmet"), 20, ItemType.HEAD, "Noodle Knocker", HashID++, new Effect[] {Effect.THORNS});
            Rares.Add(spikyhelmet);

            //Armor 
            //Rares.Add(spikyhelmet);

            /*
             *      LEGENDARIES   
             */

            // Dagger of Doubling
            Weapon doubledagger = new Weapon(Content.Load<Texture2D>("textures/game/items/dagger"), 2, 2, 30, ItemType.WEILD, "Dagger", HashID++, new Effect[] {Effect.ONEHANDED, Effect.SWORD, Effect.DOUBLING});
            Legendarys.Add(doubledagger);
            #endregion

            LoadGameCreatures();
            LoadGameTemplates();
        }

        void LoadGameTemplates()
        {
            //Foreach .lvl files add it to the list
            string[] fileNames = Directory.GetFiles(Directory.GetCurrentDirectory() + @"\roomtemplates\");
            try
            {
                foreach (string file in fileNames)
                {
                    StreamReader streamreader = new StreamReader(file);
                    string importedlevel = streamreader.ReadToEnd();
                    streamreader.Close();

                    string[] contents = importedlevel.Replace("\r\n", "").Replace("\n", "").Replace("\r", "").Split('-');

                    RoomTemplate result = new RoomTemplate();

                    string[] solids = contents[0].Split(':')[1].Split(',');
                    foreach (string s in solids)
                    {
                        if (s != "")
                        {
                            string[] pair = s.Split('/');
                            result.Tiles[Convert.ToInt32(pair[0]), Convert.ToInt32(pair[1])] = new Tile(true);
                        }
                    }

                    string[] doors = contents[1].Split(':')[1].Split(',');
                    foreach (string d in doors)
                    {
                        if (d != "")
                        {
                            string[] pair = d.Split('/');
                            result.Tiles[Convert.ToInt32(pair[0]), Convert.ToInt32(pair[1])].Door = true;
                        }
                    }

                    string[] payout = contents[2].Split(':')[1].Split('/');
                    result.Payout = new Vector2(Convert.ToInt32(payout[0]), Convert.ToInt32(payout[1]));

                    string[] creatures = contents[3].Split(':')[1].Split(',');
                    foreach (string c in creatures)
                    {
                        if (c != "")
                        {
                            string[] pair = c.Split('=');
                            int enemy = Convert.ToInt32(pair[0]);
                            Enemy guy = EnemyTemplates.ElementAt(enemy).Copy(new Vector2(Convert.ToInt32(pair[1].Split('/')[0]), Convert.ToInt32(pair[1].Split('/')[1])), HashID++);
                            result.Entities.Add(guy);
                        }
                    }

                    string[] items = contents[4].Split(':')[1].Split(',');
                    foreach (string i in items)
                    {
                        if (i != "")
                        {
                            string[] pair = i.Split('/');
                            result.Entities.Add(new HealthPotion(new Vector2(Convert.ToInt32(pair[0]), Convert.ToInt32(pair[1]))));
                        }
                    }
                    result.Difficulty = Convert.ToInt32(contents[5].Split(':')[1]);

                    if (result.Difficulty != 0)
                        BadTemps.Add(result);
                    else
                        GoodTemps.Add(result);
                }
            }
            catch (Exception e)
            {
                Console.WriteLine("The file could not be read:");
                Console.WriteLine(e.Message);
            }
        }

        void LoadGameCreatures()
        {
            //Foreach .nme files add it to the list
            string[] fileNames = Directory.GetFiles(Directory.GetCurrentDirectory() + @"\enemytemplates\");
            try
            {
                foreach (string file in fileNames)
                {
                    StreamReader streamreader = new StreamReader(file);
                    string importedenemy = streamreader.ReadToEnd();
                    streamreader.Close();

                    string[] contents = importedenemy.Replace("\r\n", "").Replace("\n", "").Replace("\r", "").Split('-');

                    Enemy result = new Enemy();
                    string[] stats = contents[0].Split(':')[1].Split(',');
                    //result.Enemy.Name = currentcname;
                    if (stats[0].Split('=')[1].Trim() == "Smart")
                        result.Brains = Nature.SMART;
                    else
                        result.Brains = Nature.DUMB;
                    result.HP = Convert.ToInt32(stats[1].Split('=')[1]);
                    result.MaxHP = Convert.ToInt32(stats[1].Split('=')[1]);
                    result.AP = Convert.ToInt32(stats[2].Split('=')[1]);
                    result.MaxAP = Convert.ToInt32(stats[2].Split('=')[1]);
                    result.AssetIndex = Convert.ToInt32(stats[3].Split('=')[1]);
                    result.Damage = Convert.ToInt32(stats[4].Split('=')[1]);
                    result.Origin = Origin;
                    result.Side = Faction.NERD;
                    string[] mods = contents[1].Split(':')[1].Split(',');
                    if (mods[0] != "")
                    {
                        foreach (string m in mods)
                            result.Effects.Add((Effect)Convert.ToInt32(m));
                    }
                    result.Name = "Steve";
                    EnemyTemplates.Add(result);
                }
            }
            catch (Exception e)
            {
                Console.WriteLine("The file could not be read:");
                Console.WriteLine(e.Message);
            }
        }
    }
}
