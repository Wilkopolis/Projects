using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Rougelike.Types;
using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Graphics;

namespace Rougelike.Factory
{
    partial class Generator
    {
        private Tile Empty = new Tile(false);
        private Tile Solid = new Tile(true);
        private Random Random = new Random();
        private Vector2 Origin = new Vector2(34, 34);
        private int HashID = -1;

        private LinkedList<Item> Commons;
        private LinkedList<Item> Rares;
        private LinkedList<Item> Legendarys;

        private LinkedList<RoomTemplate> BadTemps;
        private LinkedList<RoomTemplate> GoodTemps;

        private RoomTemplate Start;
        private RoomTemplate Finish;
        private Weapon StarterSword;

        private String[] NameBank = { "Mac", "KickstarterBacker", "Jebidiah", "Jules", "Fuji", "Llama", "DC", "Tazdingo", "Yuri", "Seany" };
        
        public Generator(Texture2D[] Sprites)
        {
            Commons = new LinkedList<Item>();
            Rares = new LinkedList<Item>();
            Legendarys = new LinkedList<Item>(); 

            BadTemps = new LinkedList<RoomTemplate>();
            GoodTemps = new LinkedList<RoomTemplate>();
            
            //Starting Room
            Start = new RoomTemplate();
            Start.Tiles = newEmpty();
            Start.Tiles[7, 1].Steps = Tile.Stairs.DOWN;

            //Starter Weapon
            StarterSword = new Weapon();
            StarterSword.Sprite = Sprites[0];
            StarterSword.Cost = 1;
            StarterSword.Damage = 1;
            StarterSword.Type = Item.ItemType.WEILD;
            StarterSword.Mods.Add(Item.Effect.ONEHANDED, 1);
            StarterSword.Mods.Add(Item.Effect.SWORD, 1);
            StarterSword.Name = "Starter Sword";
            StarterSword.HashID = HashID++;

            //Final Boss
            Enemy BigBoss = new Enemy();
            BigBoss.Size = new Vector2(3, 2);
            BigBoss.Name = "BigBoss";
            BigBoss.Nature = "dumb";
            BigBoss.HP = 10;
            BigBoss.MaxHP = 10;
            BigBoss.AP = 6;
            BigBoss.MaxAP = 6;
            //BigBoss.Mobile = false;
            BigBoss.Origin = Origin * new Vector2(3, 2);
            BigBoss.Size = new Vector2(3, 2);
            BigBoss.Side = Creature.Faction.NERD;
            BigBoss.Equipment.SetLeft(StarterSword.Copy(HashID++));
            BigBoss.Texture = 32;
            BigBoss.Style = 1;

            //Ending Room
            Finish = new RoomTemplate();
            Finish.Tiles = newEmpty();
            Finish.Entities.AddLast(BigBoss.Copy(new Vector2(6,3)));
            Finish.Tiles[7, 9].Steps = Tile.Stairs.UP;

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
            SmallHealthPotion.Sprite = Sprites[3];
            SmallHealthPotion.Type = Item.ItemType.CONSUMABLE;
            SmallHealthPotion.HashID = HashID++;
            Commons.AddLast(SmallHealthPotion);

            /*
             *      RARES   
             */

            // Splinter Wooden Sword
            Weapon WoodenSword = new Weapon();
            WoodenSword.Sprite = Sprites[0];
            WoodenSword.Cost = 1;
            WoodenSword.Damage = 2;
            WoodenSword.Type = Item.ItemType.WEILD;
            WoodenSword.Mods.Add(Item.Effect.ONEHANDED, 1);
            WoodenSword.Mods.Add(Item.Effect.SWORD, 1);
            WoodenSword.Mods.Add(Item.Effect.SPLINTER, 1);
            WoodenSword.Name = "Wooden Sword";
            WoodenSword.HashID = HashID++;
            Rares.AddLast(WoodenSword);

            // Thorny Helmet
            Armor Helmet = new Armor();
            Helmet.Sprite = Sprites[4];
            Helmet.Name = "Noodle Knocker";
            Helmet.Type = Item.ItemType.HEAD;
            Helmet.Mods.Add(Item.Effect.THORNS, 1);
            Helmet.HashID = HashID++;
            Rares.AddLast(Helmet);

            /*
             *      LEGENDARIES   
             */

            // Dagger of Doubling
            Weapon Dagger = new Weapon();
            Dagger.Sprite = Sprites[1];
            Dagger.Damage = 1;
            Dagger.Cost = 1;
            Dagger.Type = Item.ItemType.WEILD;
            Dagger.Mods.Add(Item.Effect.ONEHANDED, 1);
            Dagger.Mods.Add(Item.Effect.SWORD, 1);
            Dagger.Mods.Add(Item.Effect.DOUBLING, 1);
            Dagger.Name = "Dagger of Doubling";
            Dagger.HashID = HashID++;
            Legendarys.AddLast(Dagger);
            #endregion

            /******************************/
            /*          CREATURES
            /******************************/
             #region
            //Weak Fat Enemy
            Enemy ea = new Enemy();
            ea.Name = "Fat";
            ea.Nature = "dumb";
            ea.HP = 4;
            ea.MaxHP = 4;
            ea.AP = 2;
            ea.MaxAP = 2;
            ea.Origin = Origin;
            ea.Side = Creature.Faction.NERD;
            ea.Equipment.SetLeft(StarterSword.Copy(HashID++));
            ea.Texture = 31;
            ea.Style = 1;

            //Weak thin Enemy
            Enemy eb = new Enemy();
            eb.Name = "Thin";
            eb.Nature = "dumb";
            eb.HP = 2;
            eb.MaxHP = 2;
            eb.AP = 3;
            eb.MaxAP = 3;
            eb.Origin = Origin;
            eb.Side = Creature.Faction.NERD;
            eb.Equipment.SetLeft(StarterSword.Copy(HashID++));
            eb.Texture = 2;
            eb.Style = 1;

            //Weak rounded Enemy
            Enemy ec = new Enemy();
            ec.Name = "Thin";
            ec.Nature = "dumb";
            ec.HP = 3;
            ec.MaxHP = 3;
            ec.AP = 3;
            ec.MaxAP = 3;
            ec.Origin = Origin;
            ec.Side = Creature.Faction.NERD;
            ec.Equipment.SetLeft(StarterSword.Copy(HashID++));
            ec.Texture = 2;
            ec.Style = 1;
            #endregion

            ////////////////////////////////
            //           ROOMS            //
            ////////////////////////////////

            // [ , , , , , , ,D, , , , , , , ]
            // [ , , , , , , , , , , , , , , ]
            // [ , , , , , , , , , , , , , , ]
            // [ , , , , , , , , , , , , , , ]
            // [ , , , , , , , , , , , , , ,D]
            // [D, , , , , , ,I, , , , , , , ]
            // [ , , , , , , , , , , , , , , ]
            // [ , , , , , , , , , , , , , , ]
            // [ , , , , , , , , , , , , , , ]
            // [ , , , , , , ,D, , , , , , , ]

            RoomTemplate a = new RoomTemplate();
            a.Tiles = newEmpty();
            a.Entities.AddLast(GenerateItem(new Vector2(7, 4)));
            GoodTemps.AddLast(a);

            // [ , , , , , , ,D, , , , , , , ]
            // [ , , , , , , , , , , , , , , ]
            // [ , , , , ,E, , , , , , , , , ]
            // [ , , , , , , , , , , , , , , ]
            // [ , , , , , , , , , , , , , ,D]
            // [D, , , , , , , , , , , , , , ]
            // [ , , , , , ,E, , , , , , , , ]
            // [ , , , , , , , , , , , , , , ]
            // [ , , , , , , , , , , , , , , ]
            // [ , , , , , , ,D, , , , , , , ]

            //Tank & DPS Difficulty 1
            RoomTemplate b = new RoomTemplate();
            b.Tiles = newEmpty();
            b.Entities.AddLast(eb.Copy(new Vector2(5, 2)));
            b.Entities.AddLast(ea.Copy(new Vector2(6, 6)));
            b.Difficulty = 1;
            BadTemps.AddLast(b);

            // [ , , , , , , ,D, , , , , , , ]
            // [ , , , , , , , , , , , , , , ]
            // [ , , , , ,E, , , , , , , , , ]
            // [ , , , , , , , , , , , , , , ]
            // [ , , , , , , , , , ,E, , , ,D]
            // [D, , , , , , , , , , , , , , ]
            // [ , , , , , ,E, , , , , , , , ]
            // [ , , , , , , , , , , , , , , ]
            // [ , , , , , , , , , , , , , , ]
            // [ , , , , , , ,D, , , , , , , ]

            //Rounded Difficulty 2
            RoomTemplate c = new RoomTemplate();
            c.Tiles = newEmpty();
            c.Entities.AddLast(ec.Copy(new Vector2(5, 2)));
            c.Entities.AddLast(ec.Copy(new Vector2(6, 6)));
            c.Entities.AddLast(ec.Copy(new Vector2(10, 4)));
            c.Difficulty = 2;
            BadTemps.AddLast(c);

            // [ , , , , , , ,D, , , , , , , ]
            // [ ,S,S, , , , , , , , , , , , ]
            // [ ,S, , ,E,S,S,S, , , , ,S,S, ]
            // [ ,S, , ,S,S, , , , , , ,S, , ]
            // [ , , , ,S, ,E, , , , ,S,S, , ]
            // [D, , , , , , ,S, , , ,S, , ,D]
            // [ , , , , , , , , ,S, , , , , ]
            // [ ,S,S, , ,S, , ,S,S, , , , , ]
            // [ ,S,S, , ,S, , ,S,S, , , , , ]
            // [S, , , , , , ,D,S, , , , , , ]

            //Tank & DPS Difficulty 1
            RoomTemplate d = new RoomTemplate();
            d.Tiles = newEmpty();
            #region
            d.Tiles[0, 9] = Solid.Copy();
            d.Tiles[1, 1] = Solid.Copy();
            d.Tiles[1, 2] = Solid.Copy();
            d.Tiles[1, 3] = Solid.Copy();
            d.Tiles[1, 7] = Solid.Copy();
            d.Tiles[1, 8] = Solid.Copy();
            d.Tiles[2, 1] = Solid.Copy();
            d.Tiles[2, 7] = Solid.Copy();
            d.Tiles[2, 8] = Solid.Copy();
            d.Tiles[4, 3] = Solid.Copy();
            d.Tiles[4, 4] = Solid.Copy();
            d.Tiles[5, 2] = Solid.Copy();
            d.Tiles[5, 3] = Solid.Copy();
            d.Tiles[5, 7] = Solid.Copy();
            d.Tiles[5, 8] = Solid.Copy();
            d.Tiles[6, 2] = Solid.Copy();
            d.Tiles[7, 2] = Solid.Copy();
            d.Tiles[7, 5] = Solid.Copy();
            d.Tiles[8, 7] = Solid.Copy();
            d.Tiles[8, 8] = Solid.Copy();
            d.Tiles[8, 9] = Solid.Copy();
            d.Tiles[9, 6] = Solid.Copy();
            d.Tiles[9, 7] = Solid.Copy();
            d.Tiles[9, 8] = Solid.Copy();
            d.Tiles[11, 4] = Solid.Copy();
            d.Tiles[11, 5] = Solid.Copy();
            d.Tiles[12, 2] = Solid.Copy();
            d.Tiles[12, 3] = Solid.Copy();
            d.Tiles[12, 4] = Solid.Copy();
            d.Tiles[13, 2] = Solid.Copy();
            #endregion
            d.Entities.AddLast(ea.Copy(new Vector2(4, 2)));
            d.Entities.AddLast(eb.Copy(new Vector2(6, 4)));
            d.Difficulty = 1;
            BadTemps.AddLast(d);

            // [ , , , , , , ,D, , , , , , , ]
            // [ ,S,S, , , , , , , , , , , , ]
            // [ ,S, , , ,S,S,S, , , , ,S,S, ]
            // [ ,S, , ,S,S,E, , , , , ,S, , ]
            // [ , , , ,S,E, , , , , ,S,S, , ]
            // [D, , , , , , ,S, , , ,S, , ,D]
            // [ , , , , , , , ,E,S, , , , , ]
            // [ ,S,S, , ,S, , ,S,S, , , , , ]
            // [ ,S,S, , ,S, , ,S,S, , , , , ]
            // [S, , , , , , ,D,S, , , , , , ]

            //Rounded Difficulty 2
            RoomTemplate e = new RoomTemplate();
            e.Tiles = newEmpty();
            #region
            e.Tiles[0, 9] = Solid.Copy();
            e.Tiles[1, 1] = Solid.Copy();
            e.Tiles[1, 2] = Solid.Copy();
            e.Tiles[1, 3] = Solid.Copy();
            e.Tiles[1, 7] = Solid.Copy();
            e.Tiles[1, 8] = Solid.Copy();
            e.Tiles[2, 1] = Solid.Copy();
            e.Tiles[2, 7] = Solid.Copy();
            e.Tiles[2, 8] = Solid.Copy();
            e.Tiles[4, 3] = Solid.Copy();
            e.Tiles[4, 4] = Solid.Copy();
            e.Tiles[5, 2] = Solid.Copy();
            e.Tiles[5, 3] = Solid.Copy();
            e.Tiles[5, 7] = Solid.Copy();
            e.Tiles[5, 8] = Solid.Copy();
            e.Tiles[6, 2] = Solid.Copy();
            e.Tiles[7, 2] = Solid.Copy();
            e.Tiles[7, 5] = Solid.Copy();
            e.Tiles[8, 7] = Solid.Copy();
            e.Tiles[8, 8] = Solid.Copy();
            e.Tiles[8, 9] = Solid.Copy();
            e.Tiles[9, 6] = Solid.Copy();
            e.Tiles[9, 7] = Solid.Copy();
            e.Tiles[9, 8] = Solid.Copy();
            e.Tiles[11, 4] = Solid.Copy();
            e.Tiles[11, 5] = Solid.Copy();
            e.Tiles[12, 2] = Solid.Copy();
            e.Tiles[12, 3] = Solid.Copy();
            e.Tiles[12, 4] = Solid.Copy();
            e.Tiles[13, 2] = Solid.Copy();
            #endregion
            e.Entities.AddLast(ec.Copy(new Vector2(5, 4)));
            e.Entities.AddLast(ec.Copy(new Vector2(6, 4)));
            e.Entities.AddLast(ec.Copy(new Vector2(8, 6)));
            e.Difficulty = 1;
            BadTemps.AddLast(e);
        }
    }
}
