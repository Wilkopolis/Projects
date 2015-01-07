using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Rougelike
{
    public class HealthPotion : Potion, Consumable
    {

        public enum Strength {SMALL, MEDIUM, LARGE, MAX};
        public Strength Intensity;

        public HealthPotion(Strength strength)
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
        }

        new public HealthPotion Copy(int NewHash)
        {
            HealthPotion Result = new HealthPotion(Intensity);
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
                if (Intensity == Strength.SMALL)
                {
                    creature.HP = creature.HP + GetHP();
                    if (creature.HP >= creature.MaxHP)
                        creature.HP = creature.MaxHP;
                }
                else if (Intensity == Strength.MEDIUM)
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
