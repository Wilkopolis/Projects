using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.Xna.Framework.Graphics;
using Microsoft.Xna.Framework;

namespace Rougelike.Types
{
    public class Room
    {
        public Tile[,] Tiles;
        public LinkedList<Entity> EntityList = new LinkedList<Entity>();
        public bool Visible;
        public bool Exists;
        public bool HasStairs;
        public string Style;

        public Room()
        {
        }

        public Room(RoomTemplate T)
        {
            this.Tiles = new Tile[15,10];
            for (int i = 0; i < 15; i++)
            {
                for (int j = 0; j < 10; j++)
                {
                    this.Tiles[i, j] = T.Tiles[i, j].Copy();
                }
            }
            Exists = true;
        }
        
        public void AddToRoom(Entity entity)
        {
            if (entity != null)
                EntityList.AddLast(entity);
            UpdateTiles();
        }

        public void Remove(Entity entity)
        {
            EntityList.Remove(entity);
        }

        internal void UpdateTiles()
        {
            foreach (Tile tile in Tiles)
            {
                tile.Reset();
            }
            foreach (Entity entity in EntityList)
            {
                Tiles[(int)entity.Position.X, (int)entity.Position.Y].Solid = true;
            }
        }

        public Item GetAdjacent(Vector2 position)
        {
            Item Result = null;
            foreach (Entity entity in EntityList)
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
            foreach (Entity Entity in EntityList)
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
            foreach (Entity Entity in EntityList)
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
            foreach (Entity Entity in EntityList)
            {
                if (Entity is Item && !(Entity is HealthPotion))
                {
                    return true;
                }
            }
            return false;
        }
        
        internal LinkedList<Creature> GetAdjacentCreatures(Creature victim)
        {
            LinkedList<Creature> result = new LinkedList<Creature>();
            foreach (Entity E in EntityList)
            {
                if (E is Creature)
                {
                    if (victim.Position.X + 1 < 14)
                    {
                        if (E.Position == victim.Position + new Vector2(1, 0))
                            result.AddLast((Creature)E);
                    }
                    if (victim.Position.X - 1 >= 0)
                    {
                        if (E.Position == victim.Position + new Vector2(-1, 0))
                            result.AddLast((Creature)E);
                    }
                    if (victim.Position.Y + 1 < 9)
                    {
                        if (E.Position == victim.Position + new Vector2(0, 1))
                            result.AddLast((Creature)E);
                    }
                    if (victim.Position.Y - 1 >= 0)
                    {
                        if (E.Position == victim.Position + new Vector2(0, -1))
                            result.AddLast((Creature)E);
                    }
                }
            }
            return result;
        }

        // Returns if all the enemies are dead
        internal bool IsClear()
        {
            foreach (Entity E in EntityList)
            {
                if (E is Enemy)
                    return false;
            }
            return true;
        }
    }
}
