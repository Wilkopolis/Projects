using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.Xna.Framework.Graphics;
using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Input;

namespace Rougelike
{
    public partial class Rougelike
    {
        List<Button> ClassSelectionButtons = new List<Button>();
        Texture2D ClassSelected;
        Texture2D ClassUnselected;
        Texture2D ClassSelectionBackground;

        void InitializeClassSelectionScreen()
        {
            //Load ClassSelectionScreen Buttons
            ClassSelectionBackground = Content.Load<Texture2D>("textures/classselection/background");

            // The button sprites will change so this is necessary
            ClassSelected = Content.Load<Texture2D>("textures/classselection/selected");
            ClassUnselected = Content.Load<Texture2D>("textures/classselection/unselected");

            //Mastermind Exists
            Button mastermind = new Button(ClassUnselected, new Vector2(200, 300), "mastermind");
            ClassSelectionButtons.Add(mastermind);

            Button breaky = new Button("break", Keys.P);
            ClassSelectionButtons.Add(breaky);

            Button Quit = new Button("quit", Keys.F10);
            ClassSelectionButtons.Add(Quit);

            //Change state
            GameState = State.CLASSSELECTION;
        }

        void CheckClassSelectionScreenInput()
        {
            foreach (Button button in ClassSelectionButtons)
            {
                // Keyboard
                if (Pressed(button.Hotkey))
                {
                    button.WasPressed = true;
                }
                else if (Released(button.Hotkey))
                {
                    if (button.WasPressed)
                    {
                        HandleInputClassSelectionScreen(button);
                    }
                    button.WasPressed = false;
                }

                // Mouse
                if (MouseOver(button))
                {
                    if (Click())
                    {
                        button.WasClicked = true;
                    }
                    else if (Released())
                    {
                        if (button.WasClicked)
                        {
                            HandleInputClassSelectionScreen(button);
                        }
                        button.WasClicked = false;
                    }
                }
            }  
        }

        void HandleInputClassSelectionScreen(Button b)
        {
            switch (b.Action)
            {
                case "mastermind":
                    InitializeGenerator();
                    InitializeGame();
                    break;

                case "quit":
                    Quit();
                    break;

                case "break":
                    //Pause to debug
                    break;
            }
        }

        void DrawClassSelectionScreen()
        {
            Draw(ClassSelectionBackground);

            foreach (Button button in ClassSelectionButtons)
            {
                Draw(button);
                if (button.Visable)
                    SpriteBatch.DrawString(Cousine22, button.Action, OffsetVector + button.Position - new Vector2(82, 15), Color.White);
            }
        }
    }
}
