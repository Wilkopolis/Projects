using System;
using Microsoft.Xna.Framework;
using MutiKart.Entities;

namespace MutiKart
{
	public class Track
	{
		public int Length;
		public Rekt Hitbox;
        public ArrayList<Tuple<float, float>> Angles; 

		public Track (int l, int x, int y, ArrayList<Tuple<float, float>> a)
		{
			Length = l;
			Hitbox = new Rekt (x, y, l * 34, 8);
            Angles = a;
		}

        public void Detect(Entity e)
        {
            if ((e.Hitbox.Y + e.Hitbox.Height <= Hitbox.Y && e.Hitbox.Y + + e.Velocity.Y + e.Hitbox.Height >= Hitbox.Y)
                && (e.Hitbox.X + e.Hitbox.Width > Hitbox.X && e.Hitbox.X < Hitbox.X + Hitbox.Width))
            {
                if (e.GetType() == typeof(Player) && ((Player)e).doJump)
                {
                    ((Player)e).Jump();
                }
                else
                {
                    e.Hitbox.Y = Hitbox.Y - e.Hitbox.Height;
                    e.Velocity.Y = 0;
                    e.Accelera.Y = 0;
                    e.Grounded = true;
                    if (Angles.Count() > 1)
                    {
                        float pos = e.Hitbox.X - Hitbox.X;
                        for (int i = 0; i < Angles.Count() - 1; i++)
                        {
                            if (pos >= Angles.ElementAt(i)[0] && pos <= Angles.ElementAt(i+1)[0])
                            {
                                e.Rotation = Angles.ElementAt(i)[1];
                            }
                        }
                    }
                }
            }
        }
	}
}

