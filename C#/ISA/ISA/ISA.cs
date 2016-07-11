using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ISA
{
    class ISA
    {
        static int Main()
        {
            // our 4 registers
            int[] registers = { 0, 0, 0, 0 };

            // our stream of bits and temporary arrays for parsing them
            char[] instructions = { };
            char[] opcode = new char[4];
            char[] parame = new char[4];

            // load instructions
            try
            {
                // open the files stream
                StreamReader steamReader = new StreamReader("input.txt");
                // set instructions equal to a character array that is the whole
                // input that is trimmed(gets rid of any accidental spaces)
                instructions = steamReader.ReadToEnd().Replace(" ", string.Empty).ToCharArray();
                // close the file stream
                steamReader.Close();
            }
            catch (Exception e)
            {
                Console.WriteLine("The file could not be read:");
                Console.WriteLine(e.Message);
            }

            // Length of instruction should be multiple of 8 - Check for length
            //Console.WriteLine(instructions.Length + "\n");

            // foreach instruction
            for (int i = 0; i < instructions.Length / 8; i++)
            {
                for (int j = 0; j < 4; j++)
                {
                    // assign the opcode of the current insruction
                    opcode[j] = instructions[i * 8 + j];
                    // assign the parameters of the current instruction
                    parame[j] = instructions[i * 8 + j + 4];
                }

                i += Decode(new string(opcode), new string(parame), registers);

                // check for register overflow
                foreach (int k in registers)
                {
                    if (k > 127 || k < -127)
                    {
                        Console.WriteLine("Error: Register Overflow.");
                        return 0;
                    }
                }
            }
            return 0;
        }

        private static int Decode(string opcode, string parame, int[] registers)
        {
            int indexa;
            int indexb;
            switch (opcode)
            {
                // MOVE
                // $b = $a
                case "0000":
                    indexa = Convert.ToInt32(parame.Substring(0, 2),2);
                    indexb = Convert.ToInt32(parame.Substring(2, 2),2);
                    registers[indexb] = registers[indexa];
                    return 0;

                // ADD
                // $3 = $a + $b
                case "0001":
                    indexa = Convert.ToInt32(parame.Substring(0, 2), 2);
                    indexb = Convert.ToInt32(parame.Substring(2, 2), 2);
                    registers[3] = registers[indexa] + registers[indexb];
                    return 0;

                // SUB
                // $3 = $a - $b
                case "0010":
                    indexa = Convert.ToInt32(parame.Substring(0, 2), 2);
                    indexb = Convert.ToInt32(parame.Substring(2, 2), 2);
                    registers[3] = registers[indexa] - registers[indexb];
                    return 0;

                // EQUAL
                // $3 = $a == $b
                case "0011":
                    indexa = Convert.ToInt32(parame.Substring(0, 2), 2);
                    indexb = Convert.ToInt32(parame.Substring(2, 2), 2);
                    registers[3] = registers[indexa] == registers[indexb] ? 1 : 0;
                    return 0;

                // GTHAN
                // $3 = $a > $b
                case "0100":
                    indexa = Convert.ToInt32(parame.Substring(0, 2), 2);
                    indexb = Convert.ToInt32(parame.Substring(2, 2), 2);
                    registers[3] = registers[indexa] > registers[indexb] ? 1 : 0;
                    return 0;

                // ADDS
                // $a = $a + $b
                case "0101":
                    indexa = Convert.ToInt32(parame.Substring(0, 2), 2);
                    indexb = Convert.ToInt32(parame.Substring(2, 2), 2);
                    registers[indexa] = registers[indexa] + registers[indexb];
                    return 0;

                // SUBS
                // $a = $a + $b
                case "0110":
                    indexa = Convert.ToInt32(parame.Substring(0, 2), 2);
                    indexb = Convert.ToInt32(parame.Substring(2, 2), 2);
                    registers[indexa] = registers[indexa] - registers[indexb];
                    return 0;

                // GTHANJ
                // if $a > $b, return $3
                case "0111":
                    indexa = Convert.ToInt32(parame.Substring(0, 2), 2);
                    indexb = Convert.ToInt32(parame.Substring(2, 2), 2);
                    if (registers[indexa] > registers[indexb])
                        return registers[3];
                    return 0;

                // LOADZ
                // $3 = 0000 => immediate
                case "1000":
                    registers[3] = Convert.ToInt32(parame, 2);
                    return 0;

                // ADDI
                // $3 = $3 + immediate 
                case "1001":
                    registers[3] = registers[3] + Convert.ToInt32(parame, 2);
                    return 0;

                // SUBI
                // $3 = $3 - immediate
                case "1010":
                    registers[3] = registers[3] - Convert.ToInt32(parame, 2);
                    return 0;

                // EQUALJ
                // if a == b, return $3
                case "1011":
                    indexa = Convert.ToInt32(parame.Substring(0, 2), 2);
                    indexb = Convert.ToInt32(parame.Substring(2, 2), 2);
                    if (registers[indexa] == registers[indexb])
                        return registers[3];
                    return 0;

                // LOADS
                // Load a signed integer into $3
                // $3 = imm[0] => 0000 => imm[1,2,3]
                case "1100":
                    if (Convert.ToInt32(parame.Substring(0, 1), 2) == 0)
                        registers[3] = Convert.ToInt32(parame.Substring(1, 3), 2);
                    else
                        registers[3] = 0 - Convert.ToInt32(parame.Substring(1, 3), 2);
                    return 0;

                // Shift
                // Left shift $3 by immediate value
                // Left shift by 1 == $3 * 2, by 2 == $3 * 4
                case "1101":
                    registers[3] = (int)(registers[3] * Math.Pow((double)2, (double)Convert.ToInt32(parame, 2)));
                    return 0;

                // Jump 
                // return value of immediate
                case "1110":
                    return Convert.ToInt32(parame, 2);

                // Display
                // Print value of register indicated by immediate
                case "1111":
                    Console.WriteLine(registers[Convert.ToInt32(parame.Substring(2, 2), 2)]);
                    return 0;

                default:
                    Console.WriteLine("The instruction could not be read.");
                    return 0;
            }
        }
    }
}