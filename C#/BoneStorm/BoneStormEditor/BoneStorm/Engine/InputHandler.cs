using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.Xna.Framework.Input;
using Microsoft.Xna.Framework;

namespace BoneStorm
{
    enum Moving { LEFT, RIGHT, NONE };

    partial class BoneStormEditor
    {
        MouseState oldMouse;
        KeyboardState oldKeyboard;

        bool LeftMouse;
        bool Save;
        Keys SaveKey = Keys.S;
        bool Play;
        Keys PlayKey = Keys.Enter;

        Vector2 GetHoverCell()
        {
            Vector2 RelativeMousePos = Cursor.Pos - new Vector2(CELLS_START_X, CELLS_START_Y);
            Vector2 RelativeCell = new Vector2((int)Math.Round(RelativeMousePos.X / 24 - .5), (int)Math.Round(RelativeMousePos.Y / 24 - .5));
            Vector2 AbsoluteCell = new Vector2(RelativeCell.X + Simulator.CurrentStartFrame, RelativeCell.Y);
            return AbsoluteCell;
        }

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
            //jumpRelease = newKeyboard.IsKeyUp(jumpKey) && oldKeyboard.IsKeyDown(jumpKey);
            LeftMouse = newMouse.LeftButton == ButtonState.Pressed && oldMouse.LeftButton == ButtonState.Released;
            Save = newKeyboard.IsKeyUp(SaveKey) && oldKeyboard.IsKeyDown(SaveKey);
            Play = newKeyboard.IsKeyUp(PlayKey) && oldKeyboard.IsKeyDown(PlayKey);

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
            if (LeftMouse)
            {
                if (!(Simulator.HoverCell.X < 0 || Simulator.HoverCell.X > 49 || Simulator.HoverCell.Y < 0 || Simulator.HoverCell.Y > 6))
                    Simulator.Cells[(int)Simulator.HoverCell.X, (int)Simulator.HoverCell.Y].CycleParam();
            }
            LeftMouse = false;

            if (Save)
            {
                Simulator.SaveEvents();
            }
            Save = false;

            if (Play)
            {
                Simulator.Play();
            }
            Play = false;
        }
    }
}
