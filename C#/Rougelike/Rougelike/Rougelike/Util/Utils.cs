namespace Rougelike
{
    public partial class Rougelike
    {
    	int X() 
    	{
    		return Save.Kevin.Position.X;
    	}

    	int Y() 
    	{
            return Save.Kevin.Position.Y;
    	}

    	void RemoveDead() 
    	{
            Save.GetRoom().Entities.RemoveAll(entity => entity is Fighter && ((Fighter)entity).HP <= 0);
    	}

        ////Smarts ParseBrains(string Brains)
        ////{
        ////    if (Brains == "Smart")
        ////    {
        ////        return Smarts.SMART;
        ////    }
        ////    else if (Brains == "Dumb")
        ////    {
        ////        return Smarts.DUMB;
        ////    }
        ////}
    }
}