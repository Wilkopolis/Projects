using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Rougelike.Types;
using System.IO;
using Microsoft.Xna.Framework;

namespace Rougelike.Factory
{
    partial class Generator
    {
        /*
         *  RoomTemplate requirements:          
         *      Have each side be accessable
         *      If Bad, have difficulty         
         */
        public LinkedList<RoomTemplate> BuildGoodRooms()
        {
            LinkedList<RoomTemplate> result = new LinkedList<RoomTemplate>();

            /******************************/
            /*          ENTITIES
            /******************************/



            /******************************/
            /*           ROOMS
            /******************************/

            //Empty Room
            RoomTemplate a = new RoomTemplate();
            a.Tiles = newEmpty();
            LinkedList<Entity> aea = new LinkedList<Entity>();
            a.Stencils.AddLast(new Stencil(1, aea));
            result.AddLast(a);

            return result;
        }

        public LinkedList<RoomTemplate> BuildBadRooms()
        {
            LinkedList<RoomTemplate> result = new LinkedList<RoomTemplate>();

            RoomTemplate a = new RoomTemplate();
            a.Tiles = newEmpty();
            LinkedList<Entity> aea = new LinkedList<Entity>();
            a.Stencils.AddLast(new Stencil(1, aea));
            result.AddLast(a);

            return result;
        }       
    }
}