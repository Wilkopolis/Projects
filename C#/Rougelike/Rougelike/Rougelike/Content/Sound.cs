using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.Xna.Framework.Audio;

namespace Rougelike
{
    partial class Rougelike
    {
        Dictionary<string, SoundEffect> soundtrack;
        SoundEffectInstance soundInstance;
        string nowPlaying;
        float volume = .04f;

        void InitializeSound() 
        {
            soundtrack = new Dictionary<string, SoundEffect>();
            soundtrack.Add("main_menu", Content.Load<SoundEffect>("sounds/music/main_menu"));
            soundtrack.Add("new_game", Content.Load<SoundEffect>("sounds/effect/new_game"));
            soundtrack.Add("track1", Content.Load<SoundEffect>("sounds/music/track1"));
            //soundtrack.Add("track3", Content.Load<SoundEffect>("sounds/soundtrack/track3.mp3"));
            
            // set main menu music
            soundInstance = soundtrack["main_menu"].CreateInstance();
            nowPlaying = "main_menu";
            soundInstance.Volume = volume;
            soundInstance.IsLooped = true;
            //soundInstance.Play();
        }

        void PlayNewGameSound()
        {
            soundInstance.Dispose();
            soundInstance = soundtrack["new_game"].CreateInstance();
            nowPlaying = "new_game";
            soundInstance.Volume = volume;
            soundInstance.Play();
        }

        bool IsStartSoundPlaying()
        {
            return nowPlaying == "new_game" && soundInstance.State == SoundState.Playing;
        }

        bool StartSoundEnded()
        {
            return nowPlaying == "new_game" && soundInstance.State == SoundState.Stopped;
        }

        void PlayGameMusic()
        {
            soundInstance.Dispose();
            soundInstance = soundtrack["track1"].CreateInstance();
            nowPlaying = "track1";
            soundInstance.Volume = volume;
            soundInstance.IsLooped = true;
            soundInstance.Play();
        }
    }
}
