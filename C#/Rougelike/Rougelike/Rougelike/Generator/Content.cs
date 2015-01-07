using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Graphics;
using System.IO;

namespace Rougelike
{
    partial class Generator
    {
        private Tile Empty = new Tile(false);
        private Tile Solid = new Tile(true);
        private Random Random = new Random();
        private Vector2 Origin = new Vector2(34, 34);
        private int HashID = -1;

        private List<Item> Commons;
        private List<Item> Rares;
        private List<Item> Legendarys;

        private List<RoomTemplate> BadTemps;
        private List<RoomTemplate> GoodTemps;

        private List<Enemy> Enemies;

        private RoomTemplate Start;
        private Weapon StarterSword;

        private String[] NameBank = { "Mac", "KickstarterBacker", "Jebidiah", "Jules", "Fuji", "Llama", "DC", "Tazdingo", "Yuri", "Seany" };

        private int Difficulty = 5;

        public Generator(Microsoft.Xna.Framework.Content.ContentManager Content)
        {
            Commons = new List<Item>();
            Rares = new List<Item>();
            Legendarys = new List<Item>();

            BadTemps = new List<RoomTemplate>();
            GoodTemps = new List<RoomTemplate>();

            Enemies = new List<Enemy>();

            //Starting Room
            Start = new RoomTemplate();
            Start.Tiles[7, 1].Steps = Stairs.DOWN;

            //Starter Weapon
            StarterSword = new Weapon();
            StarterSword.Sprite = Content.Load<Texture2D>("textures/game/items/woodsword");
            StarterSword.Cost = 1;
            StarterSword.Damage = 1;
            StarterSword.Type = ItemType.WEILD;
            StarterSword.Mods.Add(Effect.ONEHANDED, 1);
            StarterSword.Mods.Add(Effect.SWORD, 1);
            StarterSword.Name = "Starter Sword";
            StarterSword.HashID = HashID++;
            
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
            HealthPotion SmallHealthPotion = new HealthPotion(HealthPotion.Strength.SMALL);
            SmallHealthPotion.Sprite = Content.Load<Texture2D>("textures/game/items/healthpotion");
            SmallHealthPotion.Type = ItemType.CONSUMABLE;
            SmallHealthPotion.HashID = HashID++;
            Commons.Add(SmallHealthPotion);

            /*
             *      RARES   
             */

            // Splinter Wooden Sword
            Weapon WoodenSword = new Weapon();
            WoodenSword.Sprite = Content.Load<Texture2D>("textures/game/items/woodsword");
            WoodenSword.Cost = 1;
            WoodenSword.Damage = 2;
            WoodenSword.Type = ItemType.WEILD;
            WoodenSword.Mods.Add(Effect.ONEHANDED, 1);
            WoodenSword.Mods.Add(Effect.SWORD, 1);
            WoodenSword.Mods.Add(Effect.SPLINTER, 1);
            WoodenSword.Name = "Wooden Sword";
            WoodenSword.HashID = HashID++;
            Rares.Add(WoodenSword);

            // Thorny Helmet
            Armor Helmet = new Armor();
            Helmet.Sprite = Content.Load<Texture2D>("textures/game/items/helmet");
            Helmet.Name = "Noodle Knocker";
            Helmet.Type = ItemType.HEAD;
            Helmet.Mods.Add(Effect.THORNS, 1);
            Helmet.HashID = HashID++;
            Rares.Add(Helmet);

            /*
             *      LEGENDARIES   
             */

            // Dagger of Doubling
            Weapon Dagger = new Weapon();
            Dagger.Sprite = Content.Load<Texture2D>("textures/game/items/dagger");
            Dagger.Damage = 1;
            Dagger.Cost = 1;
            Dagger.Type = ItemType.WEILD;
            Dagger.Mods.Add(Effect.ONEHANDED, 1);
            Dagger.Mods.Add(Effect.SWORD, 1);
            Dagger.Mods.Add(Effect.DOUBLING, 1);
            Dagger.Name = "Dagger of Doubling";
            Dagger.HashID = HashID++;
            Legendarys.Add(Dagger);
            #endregion

            LoadCreatures();
            LoadTemplates();
        }

        private void LoadTemplates()
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

                    string[] creatures = contents[2].Split(':')[1].Split(',');
                    foreach (string c in creatures)
                    {
                        if (c != "")
                        {
                            string[] pair = c.Split('=');
                            int enemy = Convert.ToInt32(pair[0]);
                            Enemy guy = Enemies.ElementAt(enemy).Copy(new Vector2(Convert.ToInt32(pair[1].Split('/')[0]), Convert.ToInt32(pair[1].Split('/')[1])));
                            result.Entities.Add(guy);
                        }
                    }

                    string[] items = contents[3].Split(':')[1].Split(',');
                    foreach (string i in items)
                    {
                        if (i != "")
                        {
                            string[] pair = i.Split('/');
                            result.Entities.Add(new Item(new Vector2(Convert.ToInt32(pair[0]), Convert.ToInt32(pair[1]))));
                        }
                    }
                    result.Difficulty = Convert.ToInt32(contents[4].Split(':')[1]);
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

        private void LoadCreatures()
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
                        result.Brains = Creature.Nature.SMART;
                    else
                        result.Brains = Creature.Nature.DUMB;
                    result.HP = Convert.ToInt32(stats[1].Split('=')[1]);
                    result.MaxHP = Convert.ToInt32(stats[1].Split('=')[1]);
                    result.AP = Convert.ToInt32(stats[2].Split('=')[1]);
                    result.MaxAP = Convert.ToInt32(stats[2].Split('=')[1]);
                    result.AssetIndex = Convert.ToInt32(stats[3].Split('=')[1]);
                    result.Damage = Convert.ToInt32(stats[4].Split('=')[1]);
                    result.Origin = Origin;
                    result.Side = Creature.Faction.NERD;
                    string[] mods = contents[1].Split(':')[1].Split(',');
                    if (mods[0] != "")
                    {
                        foreach (string m in mods)
                            result.Effects.AddLast((Effect)Convert.ToInt32(m));
                    }
                    result.Name = "Steve";
                    Enemies.Add(result);
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
