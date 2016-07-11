using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.Xna.Framework;

namespace Rougelike
{

    /*
     *  This is all stuff for creatures moving and attacking 
     */
    partial class Rougelike
    {
        // How much I want the tilemovement to cost in AP
        // This is here for ease of change
        int mod = 1;

        void DoEnemyTurns()
        {
                foreach (Enemy enemy in Save.GetRoom().Entities)
                {
                    if (AreAdjacent(enemy, Save.Kevin))
                    {
                        // if (!FindAnotherSpot(enemy))
                        //Fight(enemy);
                    }
                    else
                    {
                        //Movement wow = GetNextMove(enemy);
                        //if (wow != null)
                        //{
                        //    firstRun = true;
                        //    aaa = new HashSet<AStarNode>();
                        //    bbb = new HashSet<AStarNode>();
                        //    Take(enemy, wow);
                        //}
                        //break;
                        Movement move = GetNextMove(enemy);
                        Take(enemy, move);
                        //Enemy inmyway = SpotIsClear(move);
                        //if (inmyway == null)
                        //{
                        //    Take(enemy, move);
                        //    enemy.WaitingOn = null;
                        //}
                        //else
                        //{
                        //    if (enemy.WaitingOn == inmyway && inmyway.AP == 0)
                        //        enemy.AP = 0;
                        //    else
                        //        enemy.WaitingOn = inmyway;
                        //}
                    }
            }
            foreach (Enemy enemy in Save.GetRoom().Entities.FindAll(entity => entity is Enemy))
            {
                enemy.ApplyEndTurnEffects();
            }
            Save.GetRoom().UpdateTiles();
        }

        //bool FindAnotherSpot(Enemy me)
        //{
        //    foreach (Enemy enemy in Save.GetRoom().Entities.FindAll(entity => entity is Enemy))
        //    {
        //        if (enemy.WaitingOn == me)
        //        {
        //            int left = 100, right = 100, up = 100, down = 100;
        //            if (Save.Kevin.Position.X > 0)
        //            {
        //                if (!Save.GetRoom().Tiles[(int)Save.Kevin.Position.X - 1, (int)Save.Kevin.Position.Y].Solid)
        //                {
        //                    left = (int)(Math.Abs(Save.Kevin.Position.X - 1 - me.Position.X) + Math.Abs(Save.Kevin.Position.Y - me.Position.Y));
        //                }
        //            }
        //            if (Save.Kevin.Position.Y > 0)
        //            {
        //                if (!Save.GetRoom().Tiles[(int)Save.Kevin.Position.X, (int)Save.Kevin.Position.Y - 1].Solid)
        //                {
        //                    up = (int)(Math.Abs(Save.Kevin.Position.X - me.Position.X) + Math.Abs(Save.Kevin.Position.Y - 1 - me.Position.Y));
        //                }
        //            }
        //            if (Save.Kevin.Position.X < 14)
        //            {
        //                if (!Save.GetRoom().Tiles[(int)Save.Kevin.Position.X + 1, (int)Save.Kevin.Position.Y].Solid)
        //                {
        //                    right = (int)(Math.Abs(Save.Kevin.Position.X + 1 - me.Position.X) + Math.Abs(Save.Kevin.Position.Y - me.Position.Y));
        //                }
        //            }
        //            if (Save.Kevin.Position.Y < 9)
        //            {
        //                if (!Save.GetRoom().Tiles[(int)Save.Kevin.Position.X, (int)Save.Kevin.Position.Y + 1].Solid)
        //                {
        //                    down = (int)(Math.Abs(Save.Kevin.Position.X - me.Position.X) + Math.Abs(Save.Kevin.Position.Y + 1 - me.Position.Y));
        //                }
        //            }
        //            if (up != 0 && up < down && up < left && up < right)
        //            {
        //                AStar(me, 1, Save.Kevin.Position - new Vector2(0, 1));
        //            }
        //            else if (left != 0 && left < down && left < up && left < right)
        //            {
        //                AStar(me, 1, Save.Kevin.Position - new Vector2(1, 0));
        //            }
        //            else if (right != 0 && right < down && right < up && right < left)
        //            {
        //                AStar(me, 1, Save.Kevin.Position + new Vector2(1, 0));
        //            }
        //            else if (down != 0 && down < right && down < up && down < left)
        //            {
        //                AStar(me, 1, Save.Kevin.Position + new Vector2(0, 1));
        //            }
        //            if (me.Movements.Count > 0)
        //            {
        //                Enemy inmyway = SpotIsClear(me.Movements.First.Value);
        //                if (inmyway == null)
        //                    Take(enemy, me.Movements.First.Value);
        //            }
        //            return true;
        //        }
        //    }
        //    return false;
        //}
    }
}
