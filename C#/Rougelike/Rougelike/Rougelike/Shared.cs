using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Rougelike
{
    public enum State { TITLE, OPTIONS, GAME, EDITOR, CLASSSELECTION, LOADING };
    public enum Settings { DISPLAYWIDTH = 1, DISPLAYHEIGHT = 3, ASPECTRATIO = 5, FULLSCREEN = 7, BORDERLESS = 9, LETTERBOX = 11 };
    public enum Tab { TEMPLATES, ENEMIES };
    public enum Class { MASTERMIND, PHARMACIST, SOLDIER }
}
