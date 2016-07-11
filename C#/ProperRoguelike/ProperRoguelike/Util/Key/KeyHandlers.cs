namespace ProperRoguelike
{
    partial class Roguelike
    {
        public static void ToggleEscMenu ()
        {
            menus[Menus.ESCAPE].Visible = !menus[Menus.ESCAPE].Visible;
        }
    }
}
