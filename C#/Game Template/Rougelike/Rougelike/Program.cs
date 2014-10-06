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
            using (Template game = new Template())
            {
                game.Run();
            }
        }
    }
#endif
}

