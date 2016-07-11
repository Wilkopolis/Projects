using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.Xna.Framework.Graphics;
using Microsoft.Xna.Framework;

namespace Rougelike
{
    public class Coin : Item
    {
        public Coin()
        { 
        }

        public Coin(Texture2D sprite, int value)
        {
            Sprite = sprite;
            Value = value;
        }

        public Coin Copy(int hashid)
        {
            Coin result = new Coin();
            result.Sprite = Sprite;
            result.Hash = hashid;
            result.Value = Value;
            return result;
        }

        public Coin Copy(Vector2I position, int hashid, int value)
        {
            Coin result = new Coin();
            result.Sprite = Sprite;
            result.Hash = hashid;
            result.Position = position;
            result.Value = value;
            return result;
        }

        public override string GetClass()
        {
            return Value.ToString();
        }
    }
}
