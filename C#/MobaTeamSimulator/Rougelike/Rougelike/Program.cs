using System;

namespace Rougelike
{
#if WINDOWS || XBOX
    static class Program
    {
        /// <summary>
        /// The main entry point for the application.
        /// </summary>
        static void Main(string[] args)
        {
            using (MobaSim game = new MobaSim())
            {
                game.Run();
            }
        }
    }
#endif
}

