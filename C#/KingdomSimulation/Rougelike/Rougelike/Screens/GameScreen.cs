using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Input;
using Microsoft.Xna.Framework.Graphics;

namespace Rougelike
{
    public partial class Rougelike
    {
        Texture2D gameBackground;
        List<Button> gameButtons;

        bool gameInitialized;

        void InitializeGame()
        {
            if (!gameInitialized)
            {
                SegeoUiMono = Content.Load<SpriteFont>("fonts/SegeoUiMono");
                Calibri = Content.Load<SpriteFont>("fonts/Calibri");
                Cousine12 = Content.Load<SpriteFont>("fonts/Cousine12");
                Cousine16 = Content.Load<SpriteFont>("fonts/Cousine16");
                Cousine22 = Content.Load<SpriteFont>("fonts/Cousine22");
                Cousine72 = Content.Load<SpriteFont>("fonts/Cousine72");
                CenturyGothic = Content.Load<SpriteFont>("fonts/CenturyGothic");

                // debug
                dot = Content.Load<Texture2D>("textures/dot");

                gameBackground = Content.Load<Texture2D>("textures/game/background");

                gameButtons = new List<Button>();

                Button quit = new Button("quit", Keys.F10);
                gameButtons.Add(quit);

                Button endturn = new Button("endturn", Keys.Space);
                gameButtons.Add(endturn);

                Button breaky = new Button("break", Keys.P);
                gameButtons.Add(breaky);

                gameInitialized = true;
            }

            NewGame();
        }

        void CheckGameInput()
        {
            foreach (Button button in gameButtons)
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
                        HandleGameInput(button);
                        break;
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
                            HandleGameInput(button);
                            break;
                        }
                        button.WasClicked = false;
                    }
                }
            }
        }

        void HandleGameInput(Button button)
        {
            switch (button.Action)
            {
                case "endturn":
                    save.year++;
                    if (save.year == 10)
                        save.development = Save.Stage.CITY;
                    if (save.year == 20)
                        save.development = Save.Stage.VILLAGE;
                    if (save.year == 40)
                        save.development = Save.Stage.KINGDOM;
                    if (save.year >= 54)
                    {
                        TheEvent();
                    }
                    break;

                case "quit":
                    Quit();
                    break;

                case "break":
                    //Pause to debug
                    break;
            }
        }

        void DrawGameScreen()
        {
            Draw(gameBackground);

            DrawUI();

            foreach (Button button in gameButtons)
            {
                Draw(button);
            }
        }

        void EndTurn()
        {
        }

        void TheEvent()
        {
            InitializeEndScreen();
            gameState = State.END;
        }
    }
}
