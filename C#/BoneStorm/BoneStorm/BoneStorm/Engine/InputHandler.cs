using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.Xna.Framework.Input;
using Microsoft.Xna.Framework;

namespace BoneStorm
{
    enum Moving { LEFT, RIGHT, NONE };

    partial class BoneStormClient
    {
        MouseState oldMouse;
        KeyboardState oldKeyboard;
        
        bool shoot;
        bool special;
        bool left;
        Keys leftKey = Keys.A;
        Keys leftKey2 = Keys.Left;
        bool right;
        Keys rightKey = Keys.D;
        Keys rightKey2 = Keys.Right;
        bool jump;
        bool jumpRelease;
        Keys jumpKey = Keys.Space;
        bool ready;
        Keys readyKey = Keys.Enter;
        bool reset;
        Keys resetKey = Keys.R;
        //bool nextCursor;
        //Keys nextCursorKey = Keys.L;
        //bool previousCursor;
        //Keys previousCursorKey = Keys.K;

        // ReadInput
        //
        // functions
        //  - Compare the new states to the old states, determine what command comes out
        //  - Send the appropriate command (jump, shoot, etc).
        //  - Set the the new states as the old states
        //  - Log any jumps
        //  - Log any shoots
        //
        // returns
        //  
        public void ReadInput(MouseState newMouse, KeyboardState newKeyboard)
        {
            ready = newKeyboard.IsKeyUp(readyKey) && oldKeyboard.IsKeyDown(readyKey);
            reset = newKeyboard.IsKeyUp(resetKey) && oldKeyboard.IsKeyDown(resetKey);
            left = newKeyboard.IsKeyDown(leftKey) || newKeyboard.IsKeyDown(leftKey2);
            right = newKeyboard.IsKeyDown(rightKey) || newKeyboard.IsKeyDown(rightKey2);
            jump = newKeyboard.IsKeyDown(jumpKey) && oldKeyboard.IsKeyUp(jumpKey);
            jumpRelease = newKeyboard.IsKeyUp(jumpKey) && oldKeyboard.IsKeyDown(jumpKey);
            shoot = newMouse.LeftButton == ButtonState.Pressed;
            special = newMouse.RightButton == ButtonState.Pressed && oldMouse.RightButton == ButtonState.Released;

            oldMouse = newMouse;
            oldKeyboard = newKeyboard;
        }

        // HandleInput
        //
        // functions
        //  - handles logic from player inputs
        //      - such as left, right, jump, shoot, ready etc.
        //
        // returns
        //  
        public void HandleInput()
        {
            if (gameStarted)
            {
                // if you press a direction while moving your 
                // resultant direction is the newest one
                if (left && right)
                {
                    if (player.Moving == Moving.RIGHT)
                        player.Moving = Moving.LEFT;
                    else if (player.Moving == Moving.LEFT)
                        player.Moving = Moving.RIGHT;
                }
                else if (left)
                    player.Moving = Moving.LEFT;
                else if (right)
                    player.Moving = Moving.RIGHT;
                else
                    player.Moving = Moving.NONE;

                if (jump)
                    player.Jump();
                jump = false;

                // dont apply gravity until done jumping upwards
                if (jumpRelease || player.JumpLimitReached())
                    player.Acc.Y = VEC_GRAVITY.Y;

                // if shoot and cooldown expired cooldown expired
                if (shoot && player.CanShoot)
                    player.Shoot();
                shoot = false;

                // if special and special is charged
                if (special && player.CanSpecial())
                    player.UseSpecial();
                special = false;
            }

            // if ready and serverReady and !gameStarted
            if(ready && !gameStarted)
            {
                StartGame();
            }

            if(reset)
            {
                Reset();
            }
            reset = false;
        }
    }
}
