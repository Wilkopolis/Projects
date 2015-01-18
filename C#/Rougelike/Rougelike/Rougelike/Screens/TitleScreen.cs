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
        List<Button> TitleScreenButtons = new List<Button>();
        Texture2D TitleScreenBackground;

        void InitializeTitleScreen()
        {
            TitleScreenBackground = Content.Load<Texture2D>("textures/title/background");

            //Load TitleScreen Buttons
            Button play = new Button(Content.Load<Texture2D>("textures/title/play"), new Vector2(640, 450), "play");
            TitleScreenButtons.Add(play);

            Button options = new Button(Content.Load<Texture2D>("textures/title/options"), new Vector2(640, 550), "options");
            TitleScreenButtons.Add(options);

            Button editor = new Button(Content.Load<Texture2D>("textures/title/editor"), new Vector2(840, 550), "editor");
            TitleScreenButtons.Add(editor);

            Button breaky = new Button("break", Keys.P);
            TitleScreenButtons.Add(breaky);

            Button quit = new Button(Content.Load<Texture2D>("textures/title/exit"), new Vector2(640, 650), "exit", Keys.F10);
            TitleScreenButtons.Add(quit);

            LoadSettings();
            ApplyChanges();

            //Change state
            GameState = State.TITLE;
        }

        void CheckTitleScreenInput()
        {
            foreach (Button button in TitleScreenButtons)
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
                    GameState = State.LOADING;
                    InitializeClassSelectionScreen();
                    break;

                case "options":
                    GameState = State.LOADING;
                    InitializeOptions();
                    break;

                case "exit":
                    Quit();
                    break;

                case "editor":
                    GameState = State.LOADING;
                    InitializeEditor();
                    break;

                case "break":
                    //Pause to debug
                    break;
            }
        }

        void DrawTitleScreen()
        {
            // Draw the background
            Draw(TitleScreenBackground);

            // Draw all the buttons            
            foreach (Button button in TitleScreenButtons)
            {
                Draw(button);
            }
        }
    }
}
