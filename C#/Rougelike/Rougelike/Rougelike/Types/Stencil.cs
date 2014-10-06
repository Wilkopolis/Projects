using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.Xna.Framework;

namespace Rougelike.Types
{
    public class Stencil
    {
        public int Difficulty;
        public LinkedList<Entity> Entities;

        public Stencil(int difficulty, LinkedList<Entity> entities)
        {
            Difficulty = difficulty;
            Entities = entities;
        }
    }
}
