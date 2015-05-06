using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.Xna.Framework.Graphics;
using Microsoft.Xna.Framework;

namespace Rougelike
{
    public partial class Enemy : Fighter, IEquatable<Entity>
    {
        public List<Effect> Effects = new List<Effect>();
        public int Damage;
        public int Cost = 1;
        public int XP;
        public Enemy WaitingOn;

        public Enemy()
        {

        }

        public Enemy(Texture2D sprite, String name)
        {
            Name = name;
            Side = Faction.NERD;
            Position = new Vector2I();
            Sprite = sprite;
            Damage = 1;
            HP = 1;
            MaxHP = 1;
            AP = 1;
            MaxAP = 1;
            XP = 1;
        }

        public Enemy Copy(int hashid)
        {
            Enemy Result = new Enemy();
            Result.HP = HP;
            Result.MaxHP = MaxHP;
            Result.AP = AP;
            Result.MaxAP = MaxAP;
            Result.Name = Name;
            Result.Brains = Brains;
            Result.Origin = Origin;
            Result.Position = Position;
            Result.Sprite = Sprite;
            Result.Side = Side;
            Result.Damage = Damage;
            Result.Cost = Cost;
            Result.XP = XP;
            Result.HashID = hashid;
            return Result;
        }

        public Enemy Copy(Vector2I Position, int hashid)
        {
            Enemy Result = new Enemy();
            Result.HP = HP;
            Result.MaxHP = MaxHP;
            Result.AP = AP;
            Result.MaxAP = MaxAP;
            Result.Name = Name;
            Result.Brains = Brains;
            Result.Origin = Origin;
            Result.Position = Position;
            Result.Sprite = Sprite;
            Result.Damage = Damage;
            Result.Cost = Cost;
            Result.Side = Side;
            Result.XP = XP;
            Result.HashID = hashid;
            return Result;
        }

        override public int GetDamage(Random seed)
        {
            return Damage;
        }

        override public int GetAttackCost()
        {
            return Cost;
        }

        override public Dictionary<Effect, int> GetOffensiveEffects()
        {
            Dictionary<Effect, int> results = new Dictionary<Effect, int>();
            foreach (Effect E in Effects)
            {
                if ((int)E > 0 && (int)E < 100)
                {
                    if (results.ContainsKey(E))
                        results[E]++;
                    else
                        results.Add(E, 1);
                }
            }
            return results;
        }

        override public Dictionary<Effect, int> GetDefensiveEffects()
        {
            Dictionary<Effect, int> results = new Dictionary<Effect, int>();
            foreach (Effect E in Effects)
            {
                if ((int)E < 0)
                {
                    if (results.ContainsKey(E))
                        results[E]++;
                    else
                        results.Add(E, 1);
                }
            }
            return results;
        }
        
        public override string[] GetModStrings()
        {
            Dictionary<Effect, int> Mods = GetEffects();

            LinkedList<string> mods = new LinkedList<string>();
            foreach (Effect E in Mods.Keys)
            {
                if ((int)E < 100)
                    mods.AddLast(Item.ModToString(E) + " " + Item.StrengthToString(Mods[E]));
            }

            string[] result = { "", "", "", "" };
            int i = 0;
            foreach (string mod in mods)
            {
                if (result[i].Length + mod.Length > 20)
                    i++;
                result[i] += mod + ", ";
            }
            if (i != 0)
                result[i] = result[i].Substring(0, result[i].Length - 1);

            return result;
        }

        public Dictionary<Effect, int> GetEffects()
        {
            Dictionary<Effect, int> results = new Dictionary<Effect, int>();
            foreach (Effect E in Effects)
            {
                if (results.ContainsKey(E))
                    results[E]++;
                else
                    results.Add(E, 1);
            }
            return results;
        }

        public override string GetClass()
        {
            return "Enemy";
        }        

        new public bool Equals(Entity other)
        {
            return Position == other.Position;
        }
    }
}
