using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Timers;
using Rougelike.Util;

namespace Rougelike.Factory
{
    class Animator
    {
        private bool go;
        private Timer timer;
        private int tick = 0;
        private int tock = 0;
        private LinkedList<Animated> entitylist;

        public void Animate()
        {
            //// Create a timer with a ten second interval.
            //timer = new Timer();

            //// Hook up the Elapsed event for the timer.
            //timer.Elapsed += new ElapsedEventHandler(OnTimedEvent);

            //timer.Interval = 1;

            //timer.Enabled = true;

            //while (go)
            //{
            //    foreach (Animated e in entitylist)
            //    {

            //        if (tick != tock) 
            //        {
            //            e.fresh = true;
            //        }
            //        switch (e.status) 
            //        {
            //            case Entity.Status.Moving:
            //            if (tick % e.tick == 0 && e.fresh) 
            //            {
            //                if (e.cycle == e.moving.Length - 1) 
            //                {
            //                    e.cycle = 0;
            //                }
            //                else
            //                {
            //                    e.cycle++;
            //                }
            //                tock = tick;
            //                e.fresh = false;
            //            }
            //            e.currentframe = e.moving[e.cycle];
            //            break;

            //            case Entity.Status.Idle:
            //            tick = 0;
            //            tock = 0;
            //            break;
            //        }
                    
            //    }
            //}
            //timer.Enabled = false;
        }

        private void OnTimedEvent(object source, ElapsedEventArgs e)
        {
            tick++;
        }

        public void setEntitys(LinkedList<Animated> entitylist)        {
            this.entitylist = entitylist;
        }

        public void pause(bool pause) {
            go = !pause;
        }
    }
}
