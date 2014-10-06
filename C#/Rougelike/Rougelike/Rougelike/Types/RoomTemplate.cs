using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Rougelike.Types
{
    public class RoomTemplate
    {
        public Tile[,] Tiles;
        public LinkedList<Stencil> Stencils;

        public RoomTemplate()
        {
            Stencils = new LinkedList<Stencil>();
        }
    }
}
