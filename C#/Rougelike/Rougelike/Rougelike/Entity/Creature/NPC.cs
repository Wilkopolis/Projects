using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Graphics;

namespace Rougelike
{
    public enum NPCType { MERCHANT, ENCHANTER, ALCHEMIST, GAMBLER, MEDIC, PHARMACIST };

    class NPC : Creature
    {
        public NPCType Type;
        public int Uses;

        public NPC(NPCType type, Texture2D sprite)
        {
            Type = type;
            if (Type == NPCType.PHARMACIST || Type == NPCType.GAMBLER || Type == NPCType.MEDIC)
                Uses = 5;
            Sprite = sprite;
            Position = new Vector2(7, 5);
        }

        public NPC Copy(int hashid)
        {
            NPC result = new NPC(Type, Sprite);
            result.HashID = hashid;
            return result;
        }

        override public string GetClass()
        {
            return "NPC";
        }

        override public string[] GetModStrings()
        {
            return new string[]{""};
        }
    }
}
