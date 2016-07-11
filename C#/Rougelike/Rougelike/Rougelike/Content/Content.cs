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
        Tile EmptyTile;
        Tile SolidTile;
        Tile DoorTile;
        Tile[,] DoorTiles;
        Tile[,] EmptyTiles;
        Texture2D StairsSprite;
        Random Random = new Random();
        Vector2I Origin = new Vector2I(34, 34);

        List<Item> Commons;
        List<Item> Rares;
        List<Item> Legendarys;

        RoomTemplate debugRoom;
        List<RoomTemplate> BadTemps;
        List<RoomTemplate> GoodTemps;

        List<Enemy> EnemyTemplates;

        RoomTemplate Start;
        RoomTemplate Golden;
        Weapon StarterSword;
        HealthPotion SmallHealthPotion;
        Pill MasterPill;
        NPC Alchemist;
        NPC Pharmacist;
        NPC Enchanter;
        NPC Medic;
        NPC Merchant;
        NPC Gambler;

        String[] NameBank = { "Mac", "KickstarterBacker", "Jebidiah", "Jules", "Fuji", "Llama", "DC", "Tazdingo", "Yuri", "Seany" };
        
        void InitializeGenerator(Class playerclass)
        {
            Commons = new List<Item>();
            Rares = new List<Item>();
            Legendarys = new List<Item>();

            BadTemps = new List<RoomTemplate>();
            GoodTemps = new List<RoomTemplate>();

            EnemyTemplates = new List<Enemy>();

            EmptyTile = new Tile(Content.Load<Texture2D>("textures/game/tiles/empty"), false);
            SolidTile = new Tile(Content.Load<Texture2D>("textures/game/tiles/solid"), true);
            StairsSprite = Content.Load<Texture2D>("textures/game/tiles/stairs");
            DoorTile = new Tile(Content.Load<Texture2D>("textures/game/tiles/door"), false);
            DoorTile.Door = true;
            Payout = Content.Load<Texture2D>("textures/editor/payout");
            Enemy1 = Content.Load<Texture2D>("textures/game/creatures/enemy");
            Enemy2 = Content.Load<Texture2D>("textures/game/creatures/enemy2");
            Enemy3 = Content.Load<Texture2D>("textures/game/creatures/enemy3");
            Enemy4 = Content.Load<Texture2D>("textures/game/creatures/enemy4");
            EnemySprites[0] = Enemy1;
            EnemySprites[1] = Enemy2;
            EnemySprites[2] = Enemy3;
            EnemySprites[3] = Enemy4;

            EmptyTiles = new Tile[15, 10];
            for (int i = 0; i < 15; i++)
            {
                for (int j = 0; j < 10; j++)
                {
                    EmptyTiles[i, j] = EmptyTile.Copy();
                }
            }

            DoorTiles = new Tile[15, 10];
            for (int i = 0; i < 15; i++)
            {
                for (int j = 0; j < 10; j++)
                {
                    DoorTiles[i, j] = EmptyTile.Copy();
                }
            }
            DoorTiles[0, 4] = DoorTile.Copy();
            DoorTiles[0, 5] = DoorTile.Copy();
            DoorTiles[7, 0] = DoorTile.Copy();
            DoorTiles[7, 9] = DoorTile.Copy();
            DoorTiles[14, 4] = DoorTile.Copy();
            DoorTiles[14, 5] = DoorTile.Copy();

            //Starting Room
            Start = new RoomTemplate(EmptyTiles);
            Start.Tiles[7, 1].Sprite = StairsSprite;
            Start.Tiles[7, 1].Steps = Stairs.DOWN;

            Golden = new RoomTemplate(DoorTiles);
            Golden.Golden = true;

            Alchemist = new NPC(NPCType.ALCHEMIST, Content.Load<Texture2D>("textures/game/npc/alchemist/alchemist"));
            Pharmacist = new NPC(NPCType.PHARMACIST, Content.Load<Texture2D>("textures/game/npc/pharmacist/pharmacist"));
            Enchanter = new NPC(NPCType.ENCHANTER, Content.Load<Texture2D>("textures/game/npc/enchanter/enchanter"));
            Merchant = new NPC(NPCType.MERCHANT, Content.Load<Texture2D>("textures/game/npc/merchant/merchant"));
            Medic = new NPC(NPCType.MEDIC, Content.Load<Texture2D>("textures/game/npc/medic"));
            Gambler = new NPC(NPCType.GAMBLER, Content.Load<Texture2D>("textures/game/npc/gambler"));

            //Casino
            RoomTemplate casino = new RoomTemplate(DoorTiles);
            casino.Entities.Add(Gambler.Copy(HashID++));
            GoodTemps.Add(casino);

            //Hospital
            RoomTemplate hospital = new RoomTemplate(DoorTiles);
            hospital.Entities.Add(Medic.Copy(HashID++));
            GoodTemps.Add(hospital);

            //Recycling Plant
            RoomTemplate merchant = new RoomTemplate(DoorTiles);
            merchant.Entities.Add(Merchant.Copy(HashID++));
            GoodTemps.Add(merchant);

            //Enchanter
            RoomTemplate enchanter = new RoomTemplate(DoorTiles);
            enchanter.Entities.Add(Enchanter.Copy(HashID++));
            GoodTemps.Add(enchanter);

            //Alchemist
            RoomTemplate alchemist = new RoomTemplate(DoorTiles);
            alchemist.Entities.Add(Alchemist.Copy(HashID++));
            GoodTemps.Add(alchemist);

            if (playerclass == Class.PHARMACIST)
            {
                //Pharmacist
                RoomTemplate pharmacy = new RoomTemplate(DoorTiles);
                pharmacy.Entities.Add(Pharmacist.Copy(HashID++));
                GoodTemps.Add(pharmacy);
            }

            //Starter Weapon
            //StarterSword = new Weapon(Content.Load<Texture2D>("textures/game/items/woodsword"), 20, 1, 5, ItemType.WEILD, "Starter Sword", HashID++, new Effect[] { Effect.ONEHANDED, Effect.SWORD });
            StarterSword = new Weapon(Content.Load<Texture2D>("textures/game/items/woodsword"), 1, 1, 5, ItemType.WEILD, "Starter Sword", HashID++, new Effect[] { Effect.ONEHANDED, Effect.SWORD });

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
            SmallHealthPotion = new HealthPotion(Content.Load<Texture2D>("textures/game/items/healthpotion"), Strength.SMALL, 5, HashID++);
            Commons.Add(SmallHealthPotion);

            Coin coin = new Coin(Content.Load<Texture2D>("textures/game/items/coin"), 5);
            Commons.Add(coin);

            if (playerclass == Class.PHARMACIST)
            {
                MasterPill = new Pill(new List<Texture2D>(){Content.Load<Texture2D>("textures/game/npc/pharmacist/bluepill"),Content.Load<Texture2D>("textures/game/npc/pharmacist/redpill"), Content.Load<Texture2D>("textures/game/npc/pharmacist/whitepill")});
                Commons.Add(MasterPill);
            }

            /*
             *      RARES   
             */

            // Splinter Wooden Sword
            Weapon woodensword = new Weapon(Content.Load<Texture2D>("textures/game/items/woodsword"), 1, 1, 20, ItemType.WEILD, "Wooden Sword", HashID++, new Effect[] { Effect.ONEHANDED, Effect.SWORD, Effect.SPLINTER });
            Rares.Add(woodensword);

            // Thorny Helmet
            Armor spikyhelmet = new Armor(Content.Load<Texture2D>("textures/game/items/helmet"), 10, ItemType.HEAD, "Noodle Knocker", HashID++, new Effect[] { Effect.THORNS });
            Rares.Add(spikyhelmet);

            Armor meatshield = new Armor(Content.Load<Texture2D>("textures/game/items/shield"), 20, ItemType.WEILD, "Meat Shield", HashID++, new Effect[] { Effect.ONEHANDED, Effect.ABSORB });
            Rares.Add(meatshield);

            Armor gorillavest = new Armor(Content.Load<Texture2D>("textures/game/items/armor"), 15, ItemType.CHEST, "Gorilla Torso", HashID++, new Effect[] { Effect.BEEFUP });
            Rares.Add(gorillavest);

            /*
             *      LEGENDARIES   
             */

            // Dagger of Doubling
            Weapon doubledagger = new Weapon(Content.Load<Texture2D>("textures/game/items/dagger"), 2, 1, 30, ItemType.WEILD, "Dagger", HashID++, new Effect[] { Effect.ONEHANDED, Effect.SWORD, Effect.DOUBLING });
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

                    RoomTemplate result = new RoomTemplate(DoorTiles);

                    string[] solids = contents[0].Split(':')[1].Split(',');
                    foreach (string s in solids)
                    {
                        if (s != "")
                        {
                            string[] pair = s.Split('/');
                            result.Tiles[Convert.ToInt32(pair[0]), Convert.ToInt32(pair[1])] = SolidTile.Copy();
                        }
                    }

                    string[] doors = contents[1].Split(':')[1].Split(',');
                    //foreach (string d in doors)
                    //{
                    //    if (d != "")
                    //    {
                    //        string[] pair = d.Split('/');
                    //result.Tiles[Convert.ToInt32(pair[0]), Convert.ToInt32(pair[1])] = DoorTile.Copy();
                    //    }
                    //}

                    string[] payout = contents[2].Split(':')[1].Split('/');
                    result.Payout = new Vector2I(Convert.ToInt32(payout[0]), Convert.ToInt32(payout[1]));

                    string[] creatures = contents[3].Split(':')[1].Split(',');
                    foreach (string c in creatures)
                    {
                        if (c != "")
                        {
                            string[] pair = c.Split('=');
                            int enemy = Convert.ToInt32(pair[0]);
                            Enemy guy = EnemyTemplates.ElementAt(enemy).Copy(new Vector2I(Convert.ToInt32(pair[1].Split('/')[0]), Convert.ToInt32(pair[1].Split('/')[1])), HashID++);
                            result.Entities.Add(guy);
                        }
                    }

                    result.Difficulty = Convert.ToInt32(contents[4].Split(':')[1]);

                    if (result.Difficulty > 9)
                        debugRoom = result;
                    BadTemps.Add(result);
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
            //string[] fileNames = Directory.GetFiles(Directory.GetCurrentDirectory() + @"\enemytemplates\");
            //try
            //{
            //    foreach (string fileName in fileNames)
            //    {                    
            //        string line;
            //        StreamReader file = new StreamReader(fileName);
            //        Enemy result = new Enemy();
            //        while ((line = file.ReadLine().Replace("\r\n", "").Replace("\n", "").Replace("\r", "").Replace(" ","")) != null)
            //        {
            //            if (line.StartsWith("Hash"))
            //                result.Hash = Convert.ToInt32(line.Split('=')[1]);
            //            else if (line.StartsWith("Brains"))
            //                result.Brains = ParseBrains(line.Split('=')[1]);
            //            else if (line.StartsWith("HP")) 
            //            {
            //                result.MaxHP = Convert.ToInt32(line.Split('=')[1]);
            //                result.HP = Convert.ToInt32(line.Split('=')[1]);
            //            }
            //            else if (line.StartsWith("Texture"))
            //                result.Texture = line.Split('=')[1];
            //            else if (line.StartsWith("Damage"))
            //                result.Damage = Convert.ToInt32(line.Split('=')[1]);
            //            else if (line.StartsWith("Mod"))
            //        }

            //        file.Close();
            //        EnemyTemplates.Add(result);
            //    }
            //}
            //catch (Exception e)
            //{
            //    Console.WriteLine("The file could not be read:");
            //    Console.WriteLine(e.Message);
            //}
        }
    }
}
