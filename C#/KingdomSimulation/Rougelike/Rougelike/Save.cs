using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.Xna.Framework;

namespace Rougelike
{
    public class Save
    {
        public enum Stage { TRIBE, VILLAGE, CITY, KINGDOM };

        public int year = 0;
        public Stage development = Stage.TRIBE;

        public Save()
        {
        }
    }
}
