using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Audio;
using Microsoft.Xna.Framework.Content;
using Microsoft.Xna.Framework.Graphics;
using Microsoft.Xna.Framework.Input;
using Microsoft.Xna.Framework.Media;
using System.Threading;

namespace MutiKart
{
	partial class Peer
	{	
        protected KeyboardManager KeyBoard;

        protected void CheckKeyboard()
		{
			KeyBoard.Poll();

            if (KeyBoard.F10)
            {
                //Networker.Abort();
                this.Exit();
            }
            if (KeyBoard.BREAK)
                System.Console.WriteLine("BREAK");
            if (KeyBoard.PAUSE)
                Pause = !Pause;
            if (KeyBoard.LOAD)
            {
                //Load(Net.myindex);
            }
            if (KeyBoard.JUMP)
            {
                Net.Flags[Net.myindex, 1] = true;
                Kart.doJump = true;
            }
            if (KeyBoard.START)
            {
                Net.Flags[Net.myindex, 0] = true;
                Start = true;
            }
		}
	}
}