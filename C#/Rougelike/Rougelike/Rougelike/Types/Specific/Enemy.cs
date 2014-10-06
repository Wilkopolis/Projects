using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.Xna.Framework.Graphics;
using Microsoft.Xna.Framework;

namespace Rougelike.Types
{
    public class Enemy : Creature
    {
        int Difficulty;

        public Enemy()
        {
            Equipment = new Equipment();
        }

        new public Enemy Copy()
        {
            Enemy Result = new Enemy();            
            Result.HP = HP;
            Result.MaxHP = MaxHP;
            Result.AP = AP;
            Result.MaxAP = MaxAP;
            Result.Name = Name;
            Result.Nature = Nature;
            Result.Origin = Origin;
            Result.Position = Position;
            Result.Texture = Texture;
            Result.Side = Side;
            Result.Equipment = Equipment;
            Result.Difficulty = Difficulty;
            return Result;
        }
    }
}
