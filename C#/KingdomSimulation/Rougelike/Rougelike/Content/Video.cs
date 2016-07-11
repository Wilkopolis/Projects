using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.Xna.Framework.Graphics;
using Microsoft.Xna.Framework.Media;
using Microsoft.Xna.Framework;

namespace Rougelike
{   
    public partial class Rougelike
    {
        Video video;
        VideoPlayer player;
        Texture2D videoTexture;

        void InitializeVideo()
        {
            video = Content.Load<Video>("video/background");
            player = new VideoPlayer();
            player.IsLooped = true;
            StartVideo();
        }
        
        void StartVideo()
        {
            player.Play(video);
        }

        void DrawVideo()
        {
            if (player.State != MediaState.Stopped)
                videoTexture = player.GetTexture();

            // Drawing to the rectangle will stretch the 
            // video to fill the screen
            Rectangle screen = new Rectangle(GraphicsDevice.Viewport.X,
                GraphicsDevice.Viewport.Y,
                GraphicsDevice.Viewport.Width,
                GraphicsDevice.Viewport.Height + 2);

            // Draw the video, if we have a texture to draw.
            if (videoTexture != null)
            {
                spriteBatch.Draw(videoTexture, screen, Color.White);
            }
        }
    }
}
