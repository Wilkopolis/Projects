using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.Xna.Framework.Graphics;
using Microsoft.Xna.Framework;

namespace Rougelike
{
    enum DrugEffect { Painkiller1, Painkiller2, Uppers, Uppers2, Steroids, Steroids2, Expired1, Expired2, Expired3, Vitamins1, Vitamins2, Vitamins3, Knowledge, Bad1};

    class Pill : Stackable, Consumable
    {
        public DrugEffect Drug;
        public List<Texture2D> Sprites;

        public Pill()
        {
            Name = "Pill";
        }

        public Pill(List<Texture2D> sprites)
        {
            Name = "Pill";
            Sprites = sprites;
        }

        public void Use(Player player)
        {
            StackSize--;
        }

        public Pill Copy(int hashid, Random seed, bool prescription, bool fda)
        {
            Pill result = new Pill();
            result.HashID = hashid;
            result.Sprite = Sprites.ElementAt(seed.Next(0, Sprites.Count));
            if (prescription)
            {
                if (fda)
                {
                   
                }
                else
                {
                   
                }
            }
            else
            {
                if (fda)
                {
                   
                }
                else
                {
                    
                }
            }
            return result;
        }

        public Pill Copy(Vector2 position, int hashid, Random seed, bool prescription, bool fda)
        {
            Pill result = new Pill();
            result.HashID = hashid;
            result.Position = position;
            result.Sprite = Sprites.ElementAt(seed.Next(0, Sprites.Count));
            if (prescription)
            {
                if (fda)
                {
                    switch (seed.Next(0, 5))
                    {
                        case 0:
                            result.Drug = DrugEffect.Vitamins2;
                            break;

                        case 1:
                            result.Drug = DrugEffect.Vitamins3;
                            break;

                        case 2:
                            result.Drug = DrugEffect.Steroids2;
                            break;

                        case 3:
                            result.Drug = DrugEffect.Painkiller2;
                            break;

                        case 4:
                            result.Drug = DrugEffect.Uppers2;
                            break;
                    }
                }
                else
                {
                    switch (seed.Next(0, 7))
                    {
                        case 0:
                            result.Drug = DrugEffect.Vitamins2;
                            break;

                        case 1:
                            result.Drug = DrugEffect.Vitamins3;
                            break;

                        case 2:
                            result.Drug = DrugEffect.Steroids2;
                            break;

                        case 3:
                            result.Drug = DrugEffect.Painkiller2;
                            break;

                        case 4:
                            result.Drug = DrugEffect.Uppers2;
                            break;

                        case 5:
                            result.Drug = DrugEffect.Expired2;
                            break;

                        case 6:
                            result.Drug = DrugEffect.Expired3;
                            break;
                    }

                }
            }
            else
            {
                if (fda)
                {
                    switch (seed.Next(0, 4))
                    {
                        case 0:
                            result.Drug = DrugEffect.Vitamins1;
                            break;

                        case 1:
                            result.Drug = DrugEffect.Painkiller1;
                            break;

                        case 2:
                            result.Drug = DrugEffect.Steroids;
                            break;

                        case 3:
                            result.Drug = DrugEffect.Uppers;
                            break;
                    }
                }
                else
                {
                    switch (seed.Next(0, 5))
                    {
                        case 0:
                            result.Drug = DrugEffect.Expired1;
                            break;

                        case 1:
                            result.Drug = DrugEffect.Painkiller1;
                            break;

                        case 2:
                            result.Drug = DrugEffect.Steroids;
                            break;

                        case 3:
                            result.Drug = DrugEffect.Uppers;
                            break;

                        case 4:
                            result.Drug = DrugEffect.Vitamins1;
                            break;
                    }
                }
            }
            return result;
        }

        public override string GetClass()
        {
            return "Does... stuff...";
        }
    }
}
