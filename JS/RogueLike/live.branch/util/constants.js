/*				Constants					*/

// HTML constants in pixels
var INITIAL_WIDTH = 864;
var INITIAL_HEIGHT = 624;

// pixels between each character
var FONT_H_SPACE = 12;
var FONT_V_SPACE = 12;

// how long the cursor will blink in 4X mode
var CURSOR_INTERVAL = 500;

// game states
var STATE_LANDING = 'landing';
var STATE_BACKGROUND = 'background';
var STATE_LOADOUT = 'loadout';
var STATE_GAME = 'game';
var STATE_INVENTORY = 'inventory';
var STATE_SKILLS = 'skills';
var STATE_4X_MODE = '4xmode';
var STATE_FIRMWARE = 'firmware';
var STATE_SWITCHBOARD = 'switchboard';

// tile states for line of sight stuff
var VIEW_STATE_SEEN    = 'seen';
var VIEW_STATE_HIDDEN  = 'hidden';
var VIEW_STATE_VISIBLE = 'visible';

// entity types
var ENTITY_AUX_GENERATOR = 'auxGenerator';
var ENTITY_ENEMY = 'enemy';
var ENTITY_MASTERMIND_PIECE = 'piece';
var ENTITY_MASTERMIND_CONSOLE = 'puzzleConsole';
var ENTITY_GENES_CONSOLE = 'genesConsole';
var ENTITY_GENES_PIPE = 'genesPipe';
var ENTITY_CLONING_VAT = 'cloningVat';
var ENTITY_CITY_CONSOLE = 'cityConsole';
var ENTITY_ITEM = 'item';
var ENTITY_DOOR = 'door';
var ENTITY_SENTRY = 'sentry';
var ENTITY_ATM = 'ATM';

var NAME_ATM = 'ATM Machine';

// Cosmetic stuff
// default rendering font
var FONT_STYLE_DEFAULT = "14px Lucida Console";
var FONT_STYLE_HALF_WALL = "14px Lucida Console";
var FONT_STYLE_POTION = "10px Lucida Console";
var FONT_STYLE_PILL = "8px Lucida Console";
var FONT_STYLE_PILLAR = "14px Lucida Console";
var FONT_STYLE_CHEST = "10px Lucida Console";
var FONT_STYLE_BOLD = "bold 14px Lucida Console";
var FONT_STYLE_UNICODE = '10px Arial';
var FONT_STYLE_4X = '28pt Lucida Console';
var FONT_STYLE_4X_S = '32pt Lucida Console';
var FONT_STYLE_CURSOR = '18pt Lucida Console';
// color for everything
var COLOR_DEFAULT = '#cdc0b6';
var COLOR_FLOOR_TILE = '#bfaea2';
var COLOR_OUT_OF_SIGHT = '#615043';
// stuff for welcome screen
var COLOR_CLASS_NAME = '#5c5c89';
var COLOR_SELECT_CLASS_NAME = '#b3b3cc';
// stuff for minimap
var COLOR_CURSOR = '#b991e6';
var COLOR_UNPOWERED_UNVISITED = '#5b4b3e';
var COLOR_UNPOWERED_VISITED = '#8e674f';
var COLOR_POWERED = '#bf876f';
var COLOR_HIVE = '#5b3993';
var COLOR_GENES = '#40552b';
var COLOR_GENES_POWERED = '#6fa023';
var COLOR_OURROOM = '#9f582d';
var COLOR_OURROOM_POWERED = '#eb7729';
var COLOR_OBJECTIVE = '#38466b';
var COLOR_OBJECTIVE_POWERED = '#3153ae';
// stuff for tiles
var COLOR_GENERATOR = '#727d22';
var COLOR_GENERATOR_STARTED = '#d1e072';
var COLOR_GENERATOR_FAILED = '#b84a45';
var COLOR_FACTIONS_UNPOWERED = {animal: '#40552b', software: '#407493', robot: '#a9a434', survivor: '#9b4242', hivemind: '#503472', clones:'#9e3a8f', unclaimed:'#5b4b3e'};
var COLOR_FACTIONS_POWERED = {animal: '#7da754', software: '#7baac6', robot: '#e6d833', survivor: '#d14747', hivemind: '#8963b8', clones:'#e79ae7', unclaimed:'#cdc0b6'};
// var COLOR_STATUSES = {"Regen I": '#223D1C',"Regen II": '#223D1C',"Regen III": '#223D1C',"Regen IV": '#223D1C',"Bubble I": '#0FA3B1',"Bubble II": '#0FA3B1',"Thorns I": '#993d00',"Thorns II": '#993d00',"Spark I": '#FFC857',"Spark II": '#FFC857',"Spark III": '#FFC857',"Leap": '#2E4052',"Slam": '#412234',"Microwave I": '#D44D5C',"Microwave II": '#D44D5C',"Microwave III": '#D44D5C',"Proactive Armor I": '#0EB1D2',"Proactive Armor II": '#0EB1D2',"Proactive Armor III": '#0EB1D2',"Mine": '#1F2232',"Sentry I": '#596475',"Support Sentry I": '#7EB77F',"Adrenaline Sentry I": '#596869',"Sentry II": '#596475',"Sentry Companion": '#515751',"Sentry III": '#596475',"Build Robochef": '#596869',"Build Robomechanic": '#656256',"Redo": '#260C1A',"Iron Skin I": '#432E36',"Iron Skin II": '#432E36',"Rage I": '#5F4842',"Rage II": '#5F4842',"Dual Wielding I": '#AF8D86',"Dual Wielding II": '#AF8D86',"Dual Wielding III": '#AF8D86',"Change Places": '#5E6472',"Blink I": '#006989',"Blink II": '#006989'};
var COLOR_STATUS_PASSIVE = '#431313';
var COLOR_STATUS_ACTIVE = '#223D1C';
var COLOR_4X_SELECTED = '#a28976';
var COLOR_4X_CURSOR = '#5c5c89';
var COLOR_EQUIPPED = '#CCCCCC';
var COLOR_UNEQUIPPED = '#605A55';
// shield
var CHAR_SHIELD = 'O';
var COLOR_SHIELD = '#0FA3B1';
var FONT_STYLE_SHIELD = '24px Lucida Console';
// microwave
var CHAR_MICROWAVE = '■'
var COLOR_MICROWAVE = '#B11D0F';
// healthbar
var COLOR_HP_BAR_BACKGROUND = '#ff5050';
var COLOR_HP_BAR_FOREGROUND = '#2d7a1f';
// attributes
var COLOR_STRENGTH = '#cc7a00'
var COLOR_WILLPOWER = '#5353c6'
var COLOR_CONSTITUTION = '#990000'
var COLOR_PERCEPTION = '#2db300'
var COLOR_LEADERSHIP = '#bf40bf'
// classes
var CLASS_DEFAULT = 'Unemployed';
var CLASS_MAYOR = 'Mayor';
var CLASS_PHARMACIST = 'Pharmacist';
var CLASS_INVESTOR = 'Investor';
var CLASS_SOLDIER = 'Soldier';
var CLASS_STUDENT = 'Student';
var CLASSES = [{name:CLASS_SOLDIER, selected:false, description:"Class which specializes in weapons and physical combat."},
{name:CLASS_MAYOR, selected:false, description:"Class which specializes in room capturing and defense, as well as companions."},
{name:CLASS_PHARMACIST, selected:false, description:"Class which comes with its own supply of mind and body altering substances."}, 
{name:CLASS_INVESTOR, selected:false, description:"Class with can gain power from money."},
{name:CLASS_STUDENT, selected:false, description:"Class which starts in debt, but learns quickly."}];

// backgrounds
var GENOME_ESTER = 'Ester';
var GENOME_JOEY = 'Joey';
var GENOME_TIMMY = 'Timmy';
var GENOME_ANDRE = 'Andre';
var GENOME_WHISKERS = 'Whiskers';
var GENOME_VALERIE = 'Valerie';
var BACKGROUNDS = [{name:GENOME_JOEY, offset:"     ", strength:5, willpower:6, constitution:5, perception:6, leadership:3, selected:false, description:""}, // Spends most of his time playing out scenarios in his head.
{name:GENOME_ANDRE, offset:"    ", strength:8, willpower:4, constitution:7, perception:2, leadership:4, selected:false, description:""}, // They say he is the strongest kid in the whole high school. They also say he can't read.
{name:GENOME_ESTER, offset:"    ", strength:3, willpower:8, constitution:4, perception:4, leadership:6, selected:false, description:""}, // People always down-play the sweet old lady.
{name:GENOME_TIMMY, offset:"    ", strength:4, willpower:4, constitution:5, perception:7, leadership:5, selected:false, description:""}, // Never underestimate the mischievousness of unsupervised children.
{name:GENOME_VALERIE, offset:"  ", strength:3, willpower:6, constitution:4, perception:5, leadership:7, selected:false, description:""}, // Nobody likes a know-it-all.
{name:GENOME_WHISKERS, offset:" ", strength:4, willpower:2, constitution:8, perception:8, leadership:3, selected:false, description:""}]; // They say cats have 9 lives (they don't).

// backgrounds
// var OPTION_CONTINUE = 'Continue';
var OPTION_NEW_GAME = 'New Game';
var OPTION_NEW_HARD = 'New Hard Game';
var WELCOME_OPTIONS = [OPTION_NEW_GAME, OPTION_NEW_HARD];

// statuses
var STATUS_STUNNED = 'stunned';
var STATUS_BLEEDING = 'bleeding';
var STATUS_SHIELDED = 'shielded';
var STATUS_DISARMED = 'disarmed';

// line of sight stuff
var SIGHT_DISTANCE = 12;

// console
var LOG_LENGTH = 500;
var LOG_DISPLAY_LENGTH = 6;
var CONSOLE_X_OFFSET = 1;
var CONSOLE_Y_OFFSET = 40;

// char stuff
var CHAR_HAT = 'c';
var CHAR_WIELDABLE = '(';
var CHAR_BODY = 'H';
var CHAR_HORIZONTAL_DOOR = '\u2014';
var UNICODE_XP_BAR = '\u203E';
var CHAR_GENERATOR_CORE = '\u26A1';
var CHAR_GENERATOR_BLOCK = '\u00A4';
var CHAR_SENTRY = '\u0497';
var CHAR_VERTICAL_DOOR = '|';
var CHAR_WALL = '#';
var CHAR_HALF_WALL = '+';
var CHAR_HIDDEN = ' ';
var CHAR_EMPTY = '!';
var CHAR_FLOOR_TILE = '.';
var CHAR_CLONGING_VAT = 'V';
var CHAR_CONSOLE = '\uD83D\uDDB3';
var CHAR_OS_DISK = '\uD83D\uDCBE';
var CHAR_EQUIPPED_ITEM = '>';
var CHAR_ATM = '$';
var CHAR_CURSOR = '■';
var CHAR_PILLAR = '\uD83D\uDDC6';
var CHAR_POTION = '\uD83C\uDF7A';
var CHAR_PILL = '\uD83D\uDC8A';
var CHAR_ACCESSORY = '~';
var CHAR_CROSSHAIR = '\u2295';
// offsets for certain chars
var FOURX_OFFSETS = {'@':{x:3, y:-2}};
var OFFSETS = {'@':{x:1, y:2}, '\u26A1':{x: -5, y: 0}, '\uD83C\uDF7A':{x: -3, y: 1},
'\uD83D\uDDB3':{x: -3, y: 1}, '\uD83D\uDCBE':{x: -2, y: 1}, '\uD83D\uDC8A':{x: -2, y: 1},
'\uD83D\uDCE6':{x: -2, y: 1}, '\uD835\uDEB7':{x: -2, y: 2}, '#':{x: 1, y: 1}};
var PICKUP_OFFSETS = {'\uD83D\uDC8A':{x: 2, y: -3}};