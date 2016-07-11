using System;
using System.Collections.Generic;
using Microsoft.Xna.Framework.Input;

namespace ProperRoguelike
{
    enum Command { MENU };
    
    class CommandHandler
    {
        public CommandHandler(HashSet<Keys> k, Action h)
        {
            Keys = k;
            Handler = h;
        }

        public HashSet<Keys> Keys;
        public Action Handler;
    }

    partial class Roguelike
    {
        // default key bindings
        Dictionary<Command, CommandHandler> KeyMap = new Dictionary<Command, CommandHandler>
        {
            { Command.MENU, new CommandHandler(new HashSet<Keys> {Keys.Escape}, ToggleEscMenu) }
        };

        bool KeyAlreadyBound(Keys key)
        {
            var values = KeyMap.Values;
            foreach (CommandHandler handler in values)
            {
                if (handler.Keys.Contains(key))
                    return true;
            }
            return false;
        }

        void UnbindKey(Keys key)
        {
            var values = KeyMap.Values;
            foreach (CommandHandler handler in values)
            {
                if (handler.Keys.Contains(key))
                    handler.Keys.Remove(key);
            }
        }
    }
}
