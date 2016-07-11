using Microsoft.Xna.Framework;

namespace BoneStorm
{
    enum Barrels { TOP_LEFT = 1, TOP_RIGHT = 3, BOTTOM_LEFT = 2, BOTTOM_RIGHT = 4 };

    partial class Simulator
    {
        static float SPEED_UP_FAST = -20;
        static float SPEED_HOR_SLOW = 5;
        static float SPEED_HOR_SLOWER = 4;
        static float SPEED_HOR_FAST = 6;

        static Vector2 VEC_GRAVITY  = new Vector2(0, 1f);
        static Vector2 VEC_TERMINAL = new Vector2(20, 20);
        
        static void SpawnWalker(Barrels barrel)
        {
            // create the enemy
            Skeleton temp = new Skeleton(Sprites.Walker, Sprites.WalkerSchedule);
            // set the position and velocity
            Fire(temp, barrel, SPEED_HOR_SLOW);
            // add it to the list
            Enemies.Add(temp);
        }

        static void SpawnFast(Barrels barrel)
        {
            // create the enemy
            Skeleton temp = new Skeleton(Sprites.Fast, Sprites.FastSchedule);
            // set the position and velocity
            Fire(temp, barrel, SPEED_HOR_FAST);
            // add it to the list
            Enemies.Add(temp);
        }

        static void SpawnSword1(Barrels barrel)
        {
            // create the enemy
            Skeleton temp = new Skeleton(Sprites.Sword1, Sprites.Sword1Schedule);
            temp.FacingLeft = true;
            // set the position and velocity
            Fire(temp, barrel, SPEED_HOR_SLOWER);
            // add it to the list
            Enemies.Add(temp);
        }

        static void SpawnSword2(Barrels barrel)
        {
            // create the enemy
            Skeleton temp = new Skeleton(Sprites.Sword2, Sprites.Sword2Schedule);
            // set the position and velocity
            Fire(temp, barrel, SPEED_HOR_SLOWER);
            // add it to the list
            Enemies.Add(temp);
        }

        static void Fire(Character enemy, Barrels barrel, float xSpeed)
        {
            switch(barrel)
            {
                case Barrels.TOP_LEFT:
                    enemy.Pos.X = 120;
                    enemy.Pos.Y = 120;
                    enemy.Vel.X = xSpeed;
                    enemy.Max = VEC_TERMINAL;
                    enemy.Acc = VEC_GRAVITY;
                    break;

                case Barrels.BOTTOM_LEFT:
                    enemy.Pos.X = 120;
                    enemy.Pos.Y = 400;
                    enemy.Vel.X = xSpeed;
                    enemy.Vel.Y = SPEED_UP_FAST;
                    enemy.Max = VEC_TERMINAL;
                    enemy.Acc = VEC_GRAVITY;
                    break;

                case Barrels.TOP_RIGHT:
                    enemy.Pos.X = 1100;
                    enemy.Pos.Y = 120;
                    enemy.Vel.X = -xSpeed;
                    enemy.Max = VEC_TERMINAL;
                    enemy.Acc = VEC_GRAVITY;
                    enemy.FacingLeft = !enemy.FacingLeft;
                    break;

                case Barrels.BOTTOM_RIGHT:
                    enemy.Pos.X = 1100;
                    enemy.Pos.Y = 400;
                    enemy.Vel.X = -xSpeed;
                    enemy.Vel.Y = SPEED_UP_FAST;
                    enemy.Max = VEC_TERMINAL;
                    enemy.Acc = VEC_GRAVITY;
                    enemy.FacingLeft = !enemy.FacingLeft;
                    break;
            }
        }
    }
}
