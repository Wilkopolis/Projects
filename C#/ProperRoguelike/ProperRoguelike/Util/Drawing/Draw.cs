using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Graphics;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ProperRoguelike
{
    partial class Roguelike
    {

        void drawLetterBox()
        {
            spriteBatch.Draw(letterboxTexture, Vector2.Zero, Color.White);
            spriteBatch.Draw(letterboxTexture, LetterBoxPos, Color.White);
        }

        /* 
           draw the menus 
        */
        void drawMenus()
        {
            foreach (Menu menu in menus.Values)
            {
                menu.Draw(spriteBatch, titleFont);
            }
        }

        /* 
           draw the class selection screen   
        */
        List<Element> backgroundElements = new List<Element>();
        void drawBackgroundSelect()
        {
            foreach (Element element in backgroundElements)
            {
                // element.draw()
            }
        }

        /* 
            draw the game screen    
        */
        List<Element> gameElements = new List<Element>();
        void drawGame()
        {
            // draw map
            // draw characters
            foreach (Element element in gameElements)
            {
                // element.draw()
            }
        }

        /* 
            draw the endgame screen
        */
        List<Element> endGameElements = new List<Element>();
        void drawEndGame()
        {
            foreach (Element element in endGameElements)
            {
                // element.draw()
            }
        }

        /* 
            draw the cursor at the current mouse position
        */
        void drawCursor()
        {
            // draw cursor at mouse position
        }
    }
}
