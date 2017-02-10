/*				Constants					*/

// HTML constants
// in pixels
var CANVAS_WIDTH = 800;
var CANVAS_HEIGHT = 600;

// Screen constants
// number of "pixels" for the "screen"
var DISPLAY_WIDTH = 72;
var DISPLAY_HEIGHT = 52;
// pixels between each character, calculated onload
var FONT_H_SPACE;
var FONT_V_SPACE;

// Screen element constants
// default map offset
var MAP_X_OFFSET = 16;
var MAP_Y_OFFSET = 0;
// map width and height when not in fullscreen
var DISPLAY_WIDTH_MAP = 38;
var DISPLAY_HEIGHT_MAP = 40;
// hp bar
var HP_X_OFFSET = 2;
var HP_Y_OFFSET = 3;
var HP_BAR_LENGTH = 13;
// name
var NAME_X_OFFSET = 1;
var NAME_Y_OFFSET = 2;
// minimap is drawn centered
var MINIMAP_X_CENTER = 64;
var MINIMAP_Y_CENTER = 18;
// 5 entries per column on welcome screen
var CLASS_COLUMN_HEIGHT = 5;
// welcome (class selection) screen
var WELCOME_X_OFFSET = 16;
var WELCOME_Y_OFFSET = 7;
// 4X mode / megamap
var MEGAMAP_X_CENTER = 31;
var MEGAMAP_Y_CENTER = 14;
// how long the cursor will blink in 4X mode
var CURSOR_INTERVAL = 500;
// wealth
var WEALTH_X_OFFSET = 1;
var WEALTH_Y_OFFSET = 7;
// wealth per turn
var WPT_X_OFFSET = 1;
var WPT_Y_OFFSET = 9;
// power
var POWER_X_OFFSET = 1;
var POWER_Y_OFFSET = 13;
// power per turn
var PPT_X_OFFSET = 1;
var PPT_Y_OFFSET = 15;
// for the objective, percent of the screen (vertically)
var PROGRESS_BAR_Y_PERCENT = .78;
var PROGRESS_BAR_WIDTH = 50;
// calculated
var PROGRESS_BAR_X_OFFSET = 0;
var PROGRESS_BAR_Y = 0;
// endgame screen
var SWITCHBOARD_STRING_Y = 5;
var SWITCHBOARD_STRING = 'Switchboard';
// inventory screen
var INVENTORY_STRING_Y = 3;
var INVENTORY_STRING = 'Inventory';
// inventory screen
var FIRMWARE_STRING_Y = 5;
var FIRMWARE_STRING = 'Firmware';
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
var ENTITY_GENERATOR = 'generator';
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

// Cosmetic stuff
// default rendering font
var FONT_STYLE_DEFAULT = "14px Lucida Console";
var FONT_STYLE_BOLD = "bold 14px Lucida Console";
var FONT_STYLE_UNICODE = '11px Arial';
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
var COLOR_GENERATOR_STARTED = '#adb01c';
var COLOR_FACTIONS_UNPOWERED = {animal: '#40552b', software: '#407493', robot: '#a9a434', survivor: '#9b4242', hivemind: '#503472', clones:'#9e3a8f'};
var COLOR_FACTIONS_POWERED = {animal: '#7da754', software: '#7baac6', robot: '#e6d833', survivor: '#d14747', hivemind: '#8963b8', clones:'#e79ae7'};
// healthbar
var COLOR_HP_BAR_BACKGROUND = '#ff5050';
var COLOR_HP_BAR_FOREGROUND = '#2d7a1f';
// classes
var CLASS_DEFAULT = 'Unemployed';
var CLASS_MAYOR = 'Mayor';
var CLASS_PHARMACIST = 'Pharmacist';
var CLASS_INVESTOR = 'Investor';
var CLASS_SOLDIER = 'Soldier';
var CLASS_STUDENT = 'Student';
var CLASSES = [CLASS_DEFAULT, CLASS_MAYOR, CLASS_PHARMACIST, CLASS_INVESTOR, CLASS_SOLDIER, CLASS_STUDENT];

// backgrounds
var GENOME_ESTER = 'Ester';
var GENOME_JOEY = 'Joey';
var GENOME_TIMMY = 'Timmy';
var GENOME_ANDRE = 'Andre';
var GENOME_WHISKERS = 'Whiskers';
var GENOME_VALERIE = 'Valerie';
var BACKGROUNDS = [GENOME_ESTER, GENOME_JOEY, GENOME_TIMMY, GENOME_ANDRE, GENOME_WHISKERS, GENOME_VALERIE];

// backgrounds
var OPTION_CONTINUE = 'Continue';
var OPTION_NEW_GAME = 'New Game';
var WELCOME_OPTIONS = [OPTION_CONTINUE, OPTION_NEW_GAME];

// enemy state stuff
var STATE_ALERT = 'alert';
var STATE_STUNNED = 'stunned';

// line of sight stuff
var SIGHT_DISTANCE = 12;

// console
var LOG_LENGTH = 500;
var LOG_DISPLAY_LENGTH = 6;
var CONSOLE_X_OFFSET = 1;
var CONSOLE_Y_OFFSET = 40;

var DOOR_STATE_CLOSED = 'closed';
var DOOR_STATE_OPEN = 'open';

// char stuff
var CHAR_HORIZONTAL_DOOR = '\u2014';
var UNICODE_XP_BAR = '\u203E';
var CHAR_ZAP = '\u26A1';
var CHAR_GENERATOR_BLOCK = '\u00A4';
var CHAR_NUKE = '\u2622';
var CHAR_VERTICAL_DOOR = '|';
var CHAR_WALL = '#';
var CHAR_HALF_WALL = '+';
var CHAR_HIDDEN = ' ';
var CHAR_EMPTY = ' ';
var CHAR_FLOOR_TILE = '.';
var CHAR_CLONGING_VAT = 'V';
var CHAR_CONSOLE = '■';
var CHAR_OS_DISK = '💾';
var CHAR_EQUIPPED_ITEM = '>';