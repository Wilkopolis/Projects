using System;
using System.IO;
using System.Linq;
using System.Collections.Generic;
using BoneStorm;
using Microsoft.Xna.Framework.Graphics;

namespace BoneStorm
{
    public enum EventType {ERROR, TEXT, SPAWN_WALKER, SPAWN_FAST, SPAWN_SWORD1, SPAWN_SWORD2, BOSS_TOGGLE, DOOT, NONE};

    public class Event
    {
        public long StartTime;
        public EventType Type;
        public int Param1;

        public static Map<string, EventType> EventMap = new Map<string, EventType>();
        static Map<string, int> BossToggle = new Map<string, int>();
        static Map<string, int> Doot = new Map<string, int>();
        static Map<string, int> Skeleton = new Map<string, int>();

        public static void Init()
        {
            EventMap.Add("BossToggle", EventType.BOSS_TOGGLE);
            EventMap.Add("Doot", EventType.DOOT);
            EventMap.Add("Text", EventType.TEXT);
            EventMap.Add("SpawnWalker", EventType.SPAWN_WALKER);
            EventMap.Add("SpawnFast", EventType.SPAWN_FAST);
            EventMap.Add("SpawnSword1", EventType.SPAWN_SWORD1);
            EventMap.Add("SpawnSword2", EventType.SPAWN_SWORD2);
            
            BossToggle.Add("180", 0);
            BossToggle.Add("500", 1);
            
            Doot.Add("11", 0);
            Doot.Add("12", 1);
            Doot.Add("13", 2);
            Doot.Add("14", 3);
            Doot.Add("21", 4);
            Doot.Add("22", 5);
            Doot.Add("23", 6);
            Doot.Add("24", 7);
            
            Skeleton.Add("1", 0);
            Skeleton.Add("2", 1);
            Skeleton.Add("3", 2);
            Skeleton.Add("4", 3);
        }

        public Event()
        {
            Type = EventType.NONE;
            Param1 = 0;
        }

        public Event(int j)
        {
            switch(j)
            {
                case 0: Type = EventType.BOSS_TOGGLE; break;
                case 1: Type = EventType.DOOT; break;
                case 2: Type = EventType.SPAWN_WALKER; break;
                case 3: Type = EventType.SPAWN_FAST; break;
                case 4: Type = EventType.SPAWN_SWORD1; break;
                case 5: Type = EventType.SPAWN_SWORD2; break;
                default: Type = EventType.NONE; break;
            }            
            Param1 = 0;
        }

        public Event(long s, EventType t, string p1)
        {
            StartTime = s;
            Type = t;
            switch (t)
            {
                case EventType.BOSS_TOGGLE:
                    Param1 = BossToggle.Forward[p1];
                    break;

                case EventType.DOOT:
                    Param1 = Doot.Forward[p1];
                    break;

                default:
                    Param1 = Skeleton.Forward[p1];
                    break;

            }
        }

        public void CycleParam()
        {
            switch(Type)
            {
                case EventType.BOSS_TOGGLE:
                    Param1 = (Param1 + 1) % (BossToggle.Count + 1);
                    break;
                case EventType.DOOT:
                    Param1 = (Param1 + 1) % (Doot.Count + 1);
                    break;
                default:
                    Param1 = (Param1 + 1) % (Skeleton.Count + 1);
                    break;
            }
        }
    }

    public class Map<T1, T2>
    {
        private Dictionary<T1, T2> _forward = new Dictionary<T1, T2>();
        private Dictionary<T2, T1> _reverse = new Dictionary<T2, T1>();

        public Map()
        {
            this.Forward = new Indexer<T1, T2>(_forward);
            this.Reverse = new Indexer<T2, T1>(_reverse);
        }

        public class Indexer<T3, T4>
        {
            private Dictionary<T3, T4> _dictionary;
            public Indexer(Dictionary<T3, T4> dictionary)
            {
                _dictionary = dictionary;
            }
            public T4 this[T3 index]
            {
                get { return _dictionary[index]; }
                set { _dictionary[index] = value; }
            }
        }

        public int Count = 0;

        public void Add(T1 t1, T2 t2)
        {
            _forward.Add(t1, t2);
            _reverse.Add(t2, t1);
            Count++;
        }

        public Indexer<T1, T2> Forward { get; private set; }
        public Indexer<T2, T1> Reverse { get; private set; }
    }

    partial class Simulator
    {
        static List<Event> Schedule;
        static DateTime startTime;

        static void CheckEvents()
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

        static void PerformEvent(EventType type, int param1)
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
                case EventType.BOSS_TOGGLE:
                    if (boss.Active)
                        boss.Disappear();
                    else
                        boss.Appear(param1);
                    break;
                case EventType.DOOT:
                    boss.Doot(param1);
                    break;
                case EventType.TEXT:
                    switch(param1)
                    {
                        case 3: Text.Add(new SpriteText(Sprites.Three, 20, 40, false)); break;
                        case 2: Text.Add(new SpriteText(Sprites.Two, 20, 40, false)); break;
                        case 1: Text.Add(new SpriteText(Sprites.One, 20, 40, false)); break;
                        case 0: Text.Add(new SpriteText(Sprites.Go, -1, 40, false)); break;
                    }
                    break;
            }
        }        

        // this goes in server eventually
        static void LoadEvents(int players)
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
                        EventType et = Event.EventMap.Forward[splitLine[3]];
                        Event e = new Event(Convert.ToInt64(splitLine[2]), et, splitLine[4]);
                        Schedule.Add(e);
                    }
                }

                reader.Close();
            }

            //sort timeline by starttime
            Schedule.Sort(delegate (Event e1, Event e2) { return (e1.StartTime.CompareTo(e2.StartTime)); });
        }

        static public void SaveEvents()
        {
            Schedule.Sort(delegate (Event e1, Event e2) { return (e1.StartTime.CompareTo(e2.StartTime)); });
            using (StreamWriter writer = new StreamWriter("eventsOut.schd"))
            {
                foreach (Event e in Schedule)
                {
                    //writer.WriteLine("Event:1:" + e.ToString() + ":" + SpawnSword1 + ":" +);
                }

                writer.Close();
            }
        }
    }
}
