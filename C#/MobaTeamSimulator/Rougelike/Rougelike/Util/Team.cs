using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Rougelike.Util
{
    class Team
    {
        public string TeamName;
        public LinkedList<Player> players;
        public LinkedList<Player> subs;
    }
}
