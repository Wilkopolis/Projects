using System;
using System.IO;
using System.Linq;
using System.Collections.Generic;

namespace BoneStorm
{
    enum EventType {ERROR, THREE, TWO, ONE, GO, SPAWN_WALKER, SPAWN_FAST, SPAWN_SWORD1, SPAWN_SWORD2, BOSS_APPEAR, DOOT, BOSS_DISAPPEAR};

    class Event
    {
        public long StartTime;
        public EventType Type;
        public int Param1;

        public Event(long s, EventType t, int p1)
        {
            StartTime = s;
            Type = t;
            Param1 = p1;
        }
    }

    partial class BoneStormClient
    {
        List<Event> Schedule;
        DateTime startTime;

        void CheckEvents()
        {
            if (Schedule == null || Schedule.Count == 0)
                return;

            double timeElapsed = (DateTime.Now - startTime).TotalMilliseconds;
            while (Schedule.Count > 0 && timeElapsed > Schedule.ElementAt(0).StartTime)
            {
                PerformEvent(Schedule.ElementAt(0).Type, Schedule.ElementAt(0).Param1);
                Schedule.RemoveAt(0);
            }
        }

        void PerformEvent(EventType type, int param1)
        {
            switch(type)
            {
                case EventType.SPAWN_WALKER:
                    SpawnWalker((Barrels)param1);
                    break;
                case EventType.SPAWN_FAST:
                    SpawnFast((Barrels)param1);
                    break;
                case EventType.SPAWN_SWORD1:
                    SpawnSword1((Barrels)param1);
                    break;
                case EventType.SPAWN_SWORD2:
                    SpawnSword2((Barrels)param1);
                    break;
                case EventType.BOSS_APPEAR:
                    boss.Appear(param1);
                    break;
                case EventType.BOSS_DISAPPEAR:
                    boss.Disappear();
                    break;
                case EventType.DOOT:
                    boss.Doot(param1);
                    break;
                case EventType.THREE:
                    Text.Add(new SpriteText(Sprites.Three, 20, 40, false));
                    break;
                case EventType.TWO:
                    Text.Add(new SpriteText(Sprites.Two, 20, 40, false));
                    break;
                case EventType.ONE:
                    Text.Add(new SpriteText(Sprites.One, 20, 40, false));
                    break;
                case EventType.GO:
                    Text.Add(new SpriteText(Sprites.Go, -1, 40, false));
                    break;
            }
        }

        // this goes in server eventually
        void LoadEvents(int players)
        {
            Schedule = new List<Event>();
            // read in start time, and event type
            // make event
            // put event onto timeline
            using (StreamReader reader = new StreamReader("events.schd"))
            {
                string rawLine;
                while ((rawLine = reader.ReadLine()) != null)
                {
                    // remove whitespace
                    string[] splitLine = rawLine.Replace(" ", "").Split(':');
                    if (splitLine[0] == "Event" && Convert.ToInt16(splitLine[1]) == players)
                    {
                        Schedule.Add(new Event(Convert.ToInt64(splitLine[2]), GetEventType(splitLine[3]), Convert.ToInt32(splitLine[4])));
                    }
                }

                reader.Close();
            }

            //sort timeline by starttime
            Schedule.Sort(delegate (Event e1, Event e2) { return (e1.StartTime.CompareTo(e2.StartTime)); });
        }

        EventType GetEventType(string text)
        {
            EventType result = EventType.ERROR;

            switch (text)
            {
                case "SpawnWalker": result = EventType.SPAWN_WALKER; break;
                case "SpawnFast": result = EventType.SPAWN_FAST; break;
                case "SpawnSword1": result = EventType.SPAWN_SWORD1; break;
                case "SpawnSword2": result = EventType.SPAWN_SWORD2; break;
                case "Doot": result = EventType.DOOT; break;
                case "BossAppear": result = EventType.BOSS_APPEAR; break;
                case "BossDisppear": result = EventType.BOSS_DISAPPEAR; break;
                case "Three": result = EventType.THREE; break;
                case "Two": result = EventType.TWO; break;
                case "One": result = EventType.ONE; break;
                case "Go": result = EventType.GO; break;
            }

            return result;
        }
    }
}
