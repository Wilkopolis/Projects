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
            using (MKRevenge game = new MKRevenge())
            {
                game.Run();
            }
        }
    }
#endif
}

