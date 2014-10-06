using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Rougelike.Types
{
    public class HealthPotion : Potion, Consumable
    {

        public enum Strength {SMALL, MEDIUM, LARGE, MAX};
        public Strength Size;

        public HealthPotion(Strength strength)
        {
            Size = strength;
            if (Size == Strength.SMALL)
            {
                Name = "Small Health Potion";
            }
            else if (Size == Strength.MEDIUM)
            {
                Name = "Medium Health Potion";
            }
            else
            {
                Name = "Large Health Potion";
            }
        }

        new public HealthPotion Copy(int NewHash)
        {
            HealthPotion Result = new HealthPotion(Size);
            Result.Sprite = Sprite;
            Result.Position = Position;
            Result.Origin = Origin;
            Result.Type = Type;
            Result.StackSize = StackSize;
            Result.HashID = NewHash;
            return Result;
        }

        public void Use (Creature creature)
        {
            if (creature.HP <= creature.MaxHP)
            {
                if (Size == Strength.SMALL)
                {
                    creature.HP = creature.HP + GetHP();
                    if (creature.HP >= creature.MaxHP)
                        creature.HP = creature.MaxHP;
                }
                else if (Size == Strength.MEDIUM)
                {
                    creature.HP = creature.HP + GetHP();
                    if (creature.HP >= creature.MaxHP)
                        creature.HP = creature.MaxHP;
                }
                else
                {
                    creature.HP = creature.HP + GetHP();
                    if (creature.HP >= creature.MaxHP)
                        creature.HP = creature.MaxHP;
                }
                StackSize--;
            }
        }

        public int GetHP()
        {
            if (Size == Strength.SMALL)
            {
                return 20;
            }
            else if (Size == Strength.MEDIUM)
            {
                return 40;
            }
            else
            {
                return 100;
            }
        }

        public override string GetClass()
        {
            return "Restores HP";
        }

    }
}
