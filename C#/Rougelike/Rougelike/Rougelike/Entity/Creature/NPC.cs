using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.Xna.Framework;

namespace Rougelike
{
    class NPC : Creature
    {
        public NPCType Type;

        public NPC (NPCType type)
        {
            switch (type)
            {
                case NPCType.ENCHANTER:                    
                    AssetIndex = (int)Texture.ENCHANTER;
                    Type = NPCType.ENCHANTER;
                    Position = new Vector2(5, 7);
                    break;

                case NPCType.MERCHANT:                    
                    AssetIndex = (int)Texture.MERCHANT;
                    Type = NPCType.MERCHANT;
                    Position = new Vector2(5, 7);
                    break;

                case NPCType.ALCHEMIST:                    
                    AssetIndex = (int)Texture.ALCHEMIST;
                    Type = NPCType.ALCHEMIST;
                    Position = new Vector2(5, 7);
                    break;
            }
        }
    }
}
