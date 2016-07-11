using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chooser
{
    class Program
    {
        static void Main(string[] args)
        {
            string[] todo = {};

            // Load Settings
            try
            {
                StreamReader streamreader = new StreamReader("ShitToDo.txt");
                string importedsettings = streamreader.ReadToEnd();
                todo = importedsettings.Split(';');
                int i = 0;
                for (i = 0; i < todo.Length; i++)
                {
                    todo[i] = todo[i].Trim();
                }
                streamreader.Close();
            }
            catch (Exception e)
            {
                Console.WriteLine("The file could not be read:");
                Console.WriteLine(e.Message);
            }

            string response = "N";
            Random random = new Random();
            do {
                if (response == "N")
                {
                    System.Console.WriteLine("You should really " + todo[random.Next(0, todo.Count())] + ", fag.\n");
                    System.Console.WriteLine("Is this a good idea? N for No, Q for quit.");
                }
                response = Console.ReadLine();
            } while (response != "Q");
        }
    }
}
