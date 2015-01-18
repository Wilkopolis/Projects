using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.Xna.Framework.Graphics;
using Microsoft.Xna.Framework;

namespace Rougelike
{
    public class Room
    {
        public Tile[,] Tiles;
        public List<Entity> Entities = new List<Entity>();
        public Vector2 Payout;
        public bool Visible;
        public bool Exists;
        public bool HasStairs;
        public bool Worked;
        public bool PermaWorked;
        public bool Golden;
        public int Power = 1;
        public int Wealth = 1;
        public int Cost = 5;

        public Room()
        {
        }

        public Room(RoomTemplate template)
        {
            this.Tiles = new Tile[15,10];
            for (int i = 0; i < 15; i++)
            {
                for (int j = 0; j < 10; j++)
                {
                    this.Tiles[i, j] = template.Tiles[i, j].Copy();
                }
            }
            Exists = true;
            Golden = template.Golden;
        }
        
        public void AddToRoom(Entity entity)
        {
            if (entity != null)
                Entities.Add(entity);
            UpdateTiles();
        }

        public void Remove(Entity entity)
        {
            Entities.Remove(entity);
        }

        internal void UpdateTiles()
        {
            foreach (Tile tile in Tiles)
            {
                tile.Reset();
            }
            foreach (Entity entity in Entities)
            {
                if (entity is Enemy)
                {
                    Enemy enemy = entity as Enemy;
                    if (enemy.HP <= 0)
                        Tiles[(int)enemy.Position.X, (int)enemy.Position.Y].Solid = false;
                    else
                        Tiles[(int)entity.Position.X, (int)entity.Position.Y].Solid = true;
                }
                else
                    Tiles[(int)entity.Position.X, (int)entity.Position.Y].Solid = true;
            }
        }

        public Item GetAdjacent(Vector2 position)
        {
            Item Result = null;
            foreach (Entity entity in Entities)
            {
                if (entity is Item)
                {
                    if (position + new Vector2(0, 1) == entity.Position)
                    {
                        return (Item)entity;
                    } 
                    if (position + new Vector2(1, 0) == entity.Position)
                    {
                        return (Item)entity;
                    } 
                    if (position + new Vector2(0, -1) == entity.Position)
                    {
                        return (Item)entity;
                    } 
                    if (position + new Vector2(-1, 0) == entity.Position)
                    {
                        return (Item)entity;
                    }
                }
            }
            return Result;
        }

        public bool HasEastDoor()
        {
            for (int i = 1; i < 9; i++)
            {
                if (Tiles[14, i].Door)
                    return true;
            }
            return false;
        }

        public bool HasNorthDoor()
        {
            for (int i = 1; i < 13; i++)
            {
                if (Tiles[i, 0].Door)
                    return true;
            }
            return false;
        }

        public bool HasSouthDoor()
        {
            for (int i = 1; i < 13; i++)
            {
                if (Tiles[i, 9].Door)
                    return true;
            }
            return false;
        }

        public bool HasWestDoor()
        {
            for (int i = 1; i < 9; i++)
            {
                if (Tiles[0, i].Door)
                    return true;
            }
            return false;
        }

        public bool HasEnemy()
        {
            foreach (Entity Entity in Entities)
            {
                if (Entity is Enemy)
                {
                    return true;
                }
            }
            return false;
        }

        internal bool HasHealth()
        {
            foreach (Entity Entity in Entities)
            {
                if (Entity is HealthPotion)
                {
                    return true;
                }
            }
            return false;
        }

        internal bool HasItem()
        {
            foreach (Entity Entity in Entities)
            {
                if (Entity is Item && !(Entity is HealthPotion))
                {
                    return true;
                }
            }
            return false;
        }

        internal List<Fighter> GetAdjacentCreatures(Fighter victim)
        {
            List<Fighter> result = new List<Fighter>();
            foreach (Entity E in Entities)
            {
                if (E is Fighter)
                {
                    if (victim.Position.X + 1 < 14)
                    {
                        if (E.Position == victim.Position + new Vector2(1, 0))
                            result.Add((Fighter)E);
                    }
                    if (victim.Position.X - 1 >= 0)
                    {
                        if (E.Position == victim.Position + new Vector2(-1, 0))
                            result.Add((Fighter)E);
                    }
                    if (victim.Position.Y + 1 < 9)
                    {
                        if (E.Position == victim.Position + new Vector2(0, 1))
                            result.Add((Fighter)E);
                    }
                    if (victim.Position.Y - 1 >= 0)
                    {
                        if (E.Position == victim.Position + new Vector2(0, -1))
                            result.Add((Fighter)E);
                    }
                }
            }
            return result;
        }
        
        internal bool IsClear()
        {
            foreach (Entity E in Entities)
            {
                if (E is Enemy)
                    return false;
            }
            return true;
        }
    }
}
