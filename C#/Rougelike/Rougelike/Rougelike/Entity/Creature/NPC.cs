﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.Xna.Framework;

namespace Rougelike
{
    class NPC : Creature
    {
        public NPCType Type;

        public List<ShopButton> Inventory;

        public NPC Copy(int hashid)
        {
            NPC result = new NPC(Type);
            result.HashID = hashid;
            return result;
        }

        public NPC (NPCType type)
        {
            switch (type)
            {
                case NPCType.ENCHANTER:                    
                    AssetIndex = (int)Texture.ENCHANTER;
                    Type = NPCType.ENCHANTER;
                    Position = new Vector2(7, 5);
                    break;

                case NPCType.MERCHANT:                    
                    AssetIndex = (int)Texture.MERCHANT;
                    Inventory = new List<ShopButton>();
                    Type = NPCType.MERCHANT;
                    Position = new Vector2(7, 5);
                    break;

                case NPCType.ALCHEMIST:                    
                    //AssetIndex = (int)Texture.ALCHEMIST;
                    Type = NPCType.ALCHEMIST;
                    Position = new Vector2(7, 5);
                    break;
            }
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
