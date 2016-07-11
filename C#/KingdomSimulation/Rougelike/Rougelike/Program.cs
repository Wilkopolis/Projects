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
            using (Rougelike game = new Rougelike())
            {
                game.Run();
            }
        }
    }
#endif
}

