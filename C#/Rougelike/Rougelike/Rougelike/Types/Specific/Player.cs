using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.Xna.Framework.Graphics;
using Microsoft.Xna.Framework;
using Rougelike.Util;

namespace Rougelike.Types
{
    public class Player : Creature
    {

        public int Selection;
        public LinkedList<InvButton> InvButtons;

        // Test case standard Kevin
        public Player()
        {
            Name = "You";
            Texture = (int)TEXTURE.PLAYER;
            Origin = new Vector2(40, 40);
            HP = 4;
            MaxHP = 6;
            Style = 1.0f;
            AP = 5;
            MaxAP = 5;
            Side = Faction.COOLGUY;
            Nature = "dumb";
            Equipment = new Equipment();
            InvButtons = new LinkedList<InvButton>();
        }

        public void UpdateSelected(Vector2 tile)
        {
            for (int k = 0; k < Attacks.Count; k++)
            {
                Attack option = Attacks.ElementAt(k);
                if (option.Target.Position == tile)
                {
                    Selection = k;
                }
            }
        }
    }
}
