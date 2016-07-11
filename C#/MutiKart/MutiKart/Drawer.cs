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
	public partial class Peer
	{
        protected void DrawEnemies()
        {
            foreach (StaticEntity e in Enemies)
            {
                SpriteBatch.Draw(e.Sprite, new Vector2(e.Hitbox.X, e.Hitbox.Y) + Displaced, null, Color.White, e.Rotation, Vector2.Zero, 1, SpriteEffects.None, 0);
                // SpriteBatch.Draw(dot, new Vector2(e.Hitbox.X, e.Hitbox.Y) + Displaced, null, Color.White, 0, new Vector2(2,2), 1, SpriteEffects.None, 0);  
                // SpriteBatch.Draw(dot, new Vector2(e.Hitbox.X + e.Hitbox.Width, e.Hitbox.Y) + Displaced, null, Color.White, 0, new Vector2(2,2), 1, SpriteEffects.None, 0);  
                // SpriteBatch.Draw(dot, new Vector2(e.Hitbox.X, e.Hitbox.Y + e.Hitbox.Height) + Displaced, null, Color.White, 0, new Vector2(2,2), 1, SpriteEffects.None, 0);  
                // SpriteBatch.Draw(dot, new Vector2(e.Hitbox.X + e.Hitbox.Width, e.Hitbox.Y + e.Hitbox.Height) + Displaced, null, Color.White, 0, new Vector2(2,2), 1, SpriteEffects.None, 0);  
            }
        }

        protected void DrawSpawners()
        {
            if (Spawners != null)
            {
                foreach (Spawner s in Spawners)
                {
                    SpriteBatch.Draw(s.Sprite, new Vector2(s.Hitbox.X, s.Hitbox.Y) + Displaced, null, Color.White, 0, Vector2.Zero, 1, SpriteEffects.None, 0);
                }
            }
        }

        protected void DrawPlayers()
        {
            for (int i = 0; i < Players.Length; i++)
            {
                DynamicEntity d = Players[i];
                if (d != null)
                {
                    if (i != Net.myindex)
                        SpriteBatch.Draw(d.Sprite, new Vector2(d.Hitbox.X, d.Hitbox.Y) + Displaced, null, Color.White, d.Rotation, d.Origin, 1, SpriteEffects.None, 0);
                        // SpriteBatch.Draw(dot, new Vector2(e.Hitbox.X, e.Hitbox.Y) + Displaced, null, Color.White, 0, new Vector2(2,2), 1, SpriteEffects.None, 0);  
                        // SpriteBatch.Draw(dot, new Vector2(e.Hitbox.X + e.Hitbox.Width, e.Hitbox.Y) + Displaced, null, Color.White, 0, new Vector2(2,2), 1, SpriteEffects.None, 0);  
                        // SpriteBatch.Draw(dot, new Vector2(e.Hitbox.X, e.Hitbox.Y + e.Hitbox.Height) + Displaced, null, Color.White, 0, new Vector2(2,2), 1, SpriteEffects.None, 0);  
                        // SpriteBatch.Draw(dot, new Vector2(e.Hitbox.X + e.Hitbox.Width, e.Hitbox.Y + e.Hitbox.Height) + Displaced, null, Color.White, 0, new Vector2(2,2), 1, SpriteEffects.None, 0); 
                    if (d.HasWon)
                    {
                        SpriteBatch.Draw(WinText[i], new Vector2(450, 200), null, Color.White, 0, Vector2.Zero, 1, SpriteEffects.None, 0);
                    }
                }
            }
        }

        protected void DrawYou()
        {
            SpriteBatch.Draw(Kart.Sprite, CameraPos + new Vector2(0, Kart.bounce), null, Color.White, Kart.Rotation, Kart.Origin, 1, SpriteEffects.None, 0);
            SpriteBatch.Draw(dot, new Vector2(Kart.Hitbox.X, Kart.Hitbox.Y) + Displaced, null, Color.White, 0, new Vector2(2,2), 1, SpriteEffects.None, 0);  
            SpriteBatch.Draw(dot, new Vector2(Kart.Hitbox.X + Kart.Hitbox.Width, Kart.Hitbox.Y) + Displaced, null, Color.White, 0, new Vector2(2,2), 1, SpriteEffects.None, 0);  
            SpriteBatch.Draw(dot, new Vector2(Kart.Hitbox.X, Kart.Hitbox.Y + Kart.Hitbox.Height) + Displaced, null, Color.White, 0, new Vector2(2,2), 1, SpriteEffects.None, 0);  
            SpriteBatch.Draw(dot, new Vector2(Kart.Hitbox.X + Kart.Hitbox.Width, Kart.Hitbox.Y + Kart.Hitbox.Height) + Displaced, null, Color.White, 0, new Vector2(2,2), 1, SpriteEffects.None, 0);   
        }

        //protected void DrawCheckpoints()
        //{
        //    foreach (StaticEntity c in Checkpoints)
        //    {
        //        SpriteBatch.Draw(c.Sprite, new Vector2(c.Hitbox.X, c.Hitbox.Y) + Displaced, null, Color.White, 0, c.Offset, 1, SpriteEffects.None, 0);
        //    }
        //}

        protected void DrawTracks()
        {
            foreach (Track t in Tracks)
            {
                for (int i = 0; i < t.Length; i++)
                {
                    SpriteBatch.Draw(track, new Vector2(t.Hitbox.X, t.Hitbox.Y) + Displaced + new Vector2(i * track.Width, -6), null, Color.White, 0, Vector2.Zero, 1, SpriteEffects.None, 0);
                    //SpriteBatch.Draw(dot, new Vector2(t.Hitbox.X + t.Hitbox.Width, t.Hitbox.Y) + Displaced, null, Color.White, 0, new Vector2(2,2), 1, SpriteEffects.None, 0);  
                    //SpriteBatch.Draw(dot, new Vector2(t.Hitbox.X, t.Hitbox.Y + t.Hitbox.Height) + Displaced, null, Color.White, 0, new Vector2(2,2), 1, SpriteEffects.None, 0);  
                    //SpriteBatch.Draw(dot, new Vector2(t.Hitbox.X + t.Hitbox.Width, t.Hitbox.Y + t.Hitbox.Height) + Displaced, null, Color.White, 0, new Vector2(2,2), 1, SpriteEffects.None, 0);  
                    //SpriteBatch.Draw(dot, new Vector2(t.Hitbox.X, t.Hitbox.Y) + Displaced, null, Color.White, 0, new Vector2(2,2), 1, SpriteEffects.None, 0);  
                }
            }
        }

        protected void DrawDebug()
        {
            SpriteBatch.Draw(dot, new Vector2(Finish.X, Finish.Y) + Displaced, null, Color.White, 0, new Vector2(2, 2), 1, SpriteEffects.None, 0);
            SpriteBatch.Draw(dot, new Vector2(Finish.X + Finish.Width, Finish.Y) + Displaced, null, Color.White, 0, new Vector2(2, 2), 1, SpriteEffects.None, 0);
            SpriteBatch.Draw(dot, new Vector2(Finish.X, Finish.Y + Finish.Height) + Displaced, null, Color.White, 0, new Vector2(2, 2), 1, SpriteEffects.None, 0);
            SpriteBatch.Draw(dot, new Vector2(Finish.X + Finish.Width, Finish.Y + Finish.Height) + Displaced, null, Color.White, 0, new Vector2(2, 2), 1, SpriteEffects.None, 0);
        }
    }
}