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
        private Tile Empty;
        private Tile Solid;
        private Weapon StarterSword;
        private Enemy Minion;
        private Enemy Boss;
        private Vector2 Origin;
        private int HashID;

        private LinkedList<Item> Commons;
        private LinkedList<Item> Rares;
        private LinkedList<Item> Legendarys;

        LinkedList<RoomTemplate> BadTemps = new LinkedList<RoomTemplate>();
        LinkedList<RoomTemplate> GoodTemps = new LinkedList<RoomTemplate>();

        RoomTemplate Start = new RoomTemplate();
        RoomTemplate Finish = new RoomTemplate();
        
        public Generator(Texture2D[] Sprites)
        {
            HashID = -1;
            Origin = new Vector2(34, 34);
            Random = new Random();
            Empty = new Tile(false);
            Solid = new Tile(true);

            //starting room
            Start = new RoomTemplate();
            Start.Tiles = newEmpty();
            Start.Tiles[7, 1].Steps = Tile.Stairs.DOWN;

            BadTemps = BuildBadRooms();
            GoodTemps = BuildGoodRooms();             

            Commons = new LinkedList<Item>();
            Rares = new LinkedList<Item>();
            Legendarys = new LinkedList<Item>();

            // Starter Weapon
            StarterSword = new Weapon();
            StarterSword.Sprite = Sprites[0];
            StarterSword.Cost = 15;
            StarterSword.Damage = 10;
            StarterSword.Type = Item.ItemType.WEILD;
            StarterSword.Mods.Add(Item.Effect.ONEHANDED, 1);
            StarterSword.Mods.Add(Item.Effect.SWORD, 1);
            StarterSword.Name = "Starter Sword";
            StarterSword.HashID = HashID++;

            // Splinter Wooden Sword
            Weapon WoodenSword = new Weapon();
            WoodenSword.Sprite = Sprites[0];
            WoodenSword.Cost = 15;
            WoodenSword.Damage = 20;
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
            
            // Dagger of Doubling
            Weapon Dagger = new Weapon();
            Dagger.Sprite = Sprites[1];
            Dagger.Damage = 5;
            Dagger.Cost = 15;
            Dagger.Type = Item.ItemType.WEILD;
            Dagger.Mods.Add(Item.Effect.ONEHANDED, 1);
            Dagger.Mods.Add(Item.Effect.SWORD, 1);
            Dagger.Mods.Add(Item.Effect.DOUBLING, 1);
            Dagger.Name = "Dagger of Doubling";
            Dagger.HashID = HashID++;
            Legendarys.AddLast(Dagger);

            // Small HP
            HealthPotion SmallHealthPotion = new HealthPotion(HealthPotion.Strength.SMALL);
            SmallHealthPotion.Sprite = Sprites[3];
            SmallHealthPotion.Type = Item.ItemType.CONSUMABLE;
            SmallHealthPotion.HashID = HashID++;
            Commons.AddLast(SmallHealthPotion);

            Minion = new Enemy();
            Minion.Name = "Minion";
            Minion.Nature = "dumb";
            Minion.HP = 100;
            Minion.MaxHP = 100;
            Minion.AP = 80;
            Minion.MaxAP = 80;
            Minion.Origin = Origin;
            Minion.Side = Creature.Faction.NERD;
            Minion.Equipment.SetLeft(StarterSword.Copy(HashID++));
            Minion.Texture = 2;
            Minion.Style = 1;

            Boss = new Enemy();
            Boss.Name = "Boss";
            Boss.Nature = "smart";
            Boss.HP = 200;
            Boss.MaxHP = 200;
            Boss.AP = 100;
            Boss.MaxAP = 100;
            Boss.Origin = Origin;
            Boss.Side = Creature.Faction.NERD;
            Boss.Equipment.SetLeft(StarterSword.Copy(HashID++));
            Boss.Texture = 26;
            Boss.Style = 1;

            SackOfDosh = new Item();
            SackOfDosh.Sprite = Sprites[6];
            SackOfDosh.Type = Item.ItemType.INVENTORY;
        }

    }
}
