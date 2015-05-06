using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.Xna.Framework.Graphics;
using Microsoft.Xna.Framework;

namespace Rougelike
{
    public enum Strength {SMALL, MEDIUM, LARGE, MAX};

    interface Consumable
    {
        void Use(Player player);
    }

    public class HealthPotion : Stackable, Consumable
    {         
        public Strength Intensity;

        public HealthPotion(Texture2D sprite, Strength strength, int worth, int hashid)
        {
            Intensity = strength;
            if (Intensity == Strength.SMALL)
            {
                Name = "Small Health Potion";
            }
            else if (Intensity == Strength.MEDIUM)
            {
                Name = "Medium Health Potion";
            }
            else
            {
                Name = "Large Health Potion";
            }
            Sprite = sprite;
            Value = worth;
            HashID = hashid;
            Type = ItemType.CONSUMABLE;
        }

        public HealthPotion(Texture2D sprite)
        {
            Type = ItemType.CONSUMABLE;
            Sprite = sprite;
        }

        public HealthPotion(Vector2I position)
        {
            Type = ItemType.CONSUMABLE;
            Position = position;
        }

        public HealthPotion()
        {
            Type = ItemType.CONSUMABLE;
        }

        public HealthPotion Copy(Vector2I position, int hashid)
        {
            HealthPotion Result = new HealthPotion();
            Result.Sprite = Sprite;
            Result.Position = position;
            Result.Origin = Origin;
            Result.Type = Type;
            Result.Name = Name;
            Result.StackSize = StackSize;
            Result.Value = Value;
            Result.HashID = hashid;
            return Result;
        }

        public HealthPotion Copy(int hashid)
        {
            HealthPotion Result = new HealthPotion();
            Result.Sprite = Sprite;
            Result.Origin = Origin;
            Result.Type = Type;
            Result.Name = Name;
            Result.StackSize = StackSize;
            Result.Value = Value;
            Result.HashID = hashid;
            return Result;
        }

        public void Use(Player player)
        {
            if (player.HP < player.MaxHP)
            {
                if (Intensity == Strength.SMALL)
                {
                    player.HP = player.HP + GetHP();
                    if (player.HP >= player.MaxHP)
                        player.HP = player.MaxHP;
                }
                else if (Intensity == Strength.MEDIUM)
                {
                    player.HP = player.HP + GetHP();
                    if (player.HP >= player.MaxHP)
                        player.HP = player.MaxHP;
                }
                else
                {
                    player.HP = player.HP + GetHP();
                    if (player.HP >= player.MaxHP)
                        player.HP = player.MaxHP;
                }
                StackSize--;
            }
        }

        public int GetHP()
        {
            if (Intensity == Strength.SMALL)
            {
                return 2;
            }
            else if (Intensity == Strength.MEDIUM)
            {
                return 4;
            }
            else
            {
                return 10;
            }
        }

        public override string GetClass()
        {
            return "Restores HP";
        }
    }
}
