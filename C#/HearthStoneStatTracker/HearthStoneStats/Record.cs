using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace HearthStoneStats
{
    class Record
    {

        public Record()
        {

        }

        public Record(int w, int l)
        {
            wins = w;
            losses = l;
        }

        public int wins;
        public int losses;

        public Record Win()
        {
            wins++;
            return this;
        }

        public Record Lose()
        {
            losses++;
            return this;
        }

        public Record unWin()
        {
            wins--;
            return this;
        }

        public Record unLose()
        {
            losses--;
            return this;
        }

        public static Record operator +(Record x, Record y)
        {
            return new Record(x.wins + y.wins, x.losses + y.losses);
        }


        public override string ToString()
        {
            return wins.ToString() + "/" + losses.ToString();
        }
    }
}
