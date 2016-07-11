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
        List<Button> titleScreenButtons = new List<Button>();
        Texture2D titleScreenBackground;

        void InitializeTitleScreen()
        {
            InitializeSound();
            InitializeVideo();

            titleScreenBackground = Content.Load<Texture2D>("textures/title/background");

            //Load TitleScreen Buttons
            Button play = new Button(Content.Load<Texture2D>("textures/title/play"), new Vector2(640, 420), "play");
            titleScreenButtons.Add(play);

            Button options = new Button(Content.Load<Texture2D>("textures/title/options"), new Vector2(640, 520), "options");
            titleScreenButtons.Add(options);
            
            Button breaky = new Button("break", Keys.P);
            titleScreenButtons.Add(breaky);

            Button quit = new Button(Content.Load<Texture2D>("textures/title/exit"), new Vector2(640, 620), "exit", Keys.F10);
            titleScreenButtons.Add(quit);

            LoadSettings();
            ApplyChanges();


            //Change state
            gameState = State.TITLE;
        }

        void CheckTitleScreenInput()
        {
            foreach (Button button in titleScreenButtons)
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
                        HandleTitleScreenInput(button);
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
                            HandleTitleScreenInput(button);
                        }
                        button.WasClicked = false;
                    }
                }
            }            
        }

        void HandleTitleScreenInput(Button b)
        {
            switch (b.Action)
            {
                case "play":
                    gameState = State.LOADING;
                    InitializeGame();
                    break;

                case "options":
                    gameState = State.LOADING;
                    InitializeOptions();
                    break;

                case "exit":
                    Quit();
                    break;
                    
                case "break":
                    //Pause to debug
                    break;
            }
        }

        void DrawTitleScreen()
        {
            // Draw the background
            //Draw(TitleScreenBackground);
            DrawVideo();

            // Draw all the buttons            
            foreach (Button button in titleScreenButtons)
            {
                Draw(button);
            }
        }
    }
}
