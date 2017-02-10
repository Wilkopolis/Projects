// unique entities

var ENTITY_NPC = "npc";
var STATE_SHOP = "shop";
var NAME_SHOP = "Shop-O-Matic";
var CHAR_SHOP_KEEPER = '&';
function entity_shop_keeper() {
	// draw information
	this.char = CHAR_SHOP_KEEPER;
	this.color = COLOR_DEFAULT;
	// entity information
	this.type = ENTITY_NPC;
	this.name = NAME_SHOP;
	this.solid = true;
	this.permanentSolid = true;
	this.simulatesPhysics = false;

	this.discovered = true;

	// for the enemy log
	this.loggable = true;

	// fill the inventory is items
	this.inventory = [];

	var itemCount = Math.round(Math.random() * 2) + 4;	
	for (var i = 0; i < itemCount; i++) {
		var loot = generateShopItem();
		loot.selected = false;
		this.inventory.push(loot);
	}

	this.interact = function() {
		gameState = STATE_SHOP;
		document.onkeydown = shopOnKeyDown;
		scopeNPC = this;
	}
}

var ENTITY_GENERATOR_CONSOLE = 'generator_console';
function entity_generator_console(room) {
	this.type = ENTITY_GENERATOR_CONSOLE;

	this.solid = true;
	this.permanentSolid = true;
	this.simulatesPhysics = false;
	this.char = CHAR_CONSOLE;
	this.color = COLOR_DEFAULT;
	this.font = FONT_STYLE_DEFAULT;
	this.name = "Generator Console";

	// for auto exploring
	this.discovered = true;
	// for the enemy log
	this.loggable = false;
	
	this.room = room;
}

function entity_genes_console () {
	this.type = ENTITY_GENES_CONSOLE;
	this.char = CHAR_CONSOLE;
	this.color = COLOR_DEFAULT;
	this.font = FONT_STYLE_DEFAULT;
	this.solid = true;
	this.permanentSolid = true;
	this.simulatesPhysics = false;
	this.discovered = true;
	// for the enemy log
	this.loggable = false;
	this.name = "Genes Console";

	this.submit = function() {
		objectives[OBJ_GENES].submit();
	}
}

function entity_cloning_vat () {
	this.x = 0;
	this.y = 0;
	this.type = ENTITY_CLONING_VAT;
	this.solid = true;
	this.permanentSolid = true;
	this.simulatesPhysics = false;
	// for the enemy log
	this.loggable = false;
	this.name = "The Printer";
	this.description = "When hooked up, the printer can produce useful companions."
	this.char = CHAR_CLONGING_VAT;
	this.color = COLOR_DEFAULT;
	this.font = FONT_STYLE_DEFAULT;
}

var ENTITY_BANK_SPAWNER = 'bank_spawner';
function entity_bank_spawner () {
	this.x = 0;
	this.y = 0;
	this.type = ENTITY_BANK_SPAWNER;
	this.solid = true;
	this.permanentSolid = true;
	this.simulatesPhysics = false;
	// for the enemy log
	this.loggable = false;
	this.name = "Secure Mother 3000";
	this.description = "The 'mother' of all anti-theft systems.";
	this.char = 'V';
	this.color = COLOR_DEFAULT;
	this.font = FONT_STYLE_DEFAULT;
}

var ENTITY_BANK_TERMINAL = 'bank_terminal';
function entity_bank_terminal (room) {
	this.x = 0;
	this.y = 0;
	this.room = room;
	this.type = ENTITY_BANK_TERMINAL;
	this.solid = true;
	this.permanentSolid = true;
	this.simulatesPhysics = false;
	// for the enemy log
	this.loggable = false;
	this.name = "Security Console";
	this.description = "Used to disable certain security systems.";
	this.char = CHAR_CONSOLE;
	this.color = COLOR_DEFAULT;
	this.font = FONT_STYLE_DEFAULT;
}

var ENTITY_KENNEL_TERMINAL = 'kennel_terminal';
function entity_kennel_terminal (room) {
	this.x = 0;
	this.y = 0;
	this.room = room;
	this.type = ENTITY_KENNEL_TERMINAL;
	this.solid = true;
	this.permanentSolid = true;
	this.simulatesPhysics = false;
	// for the enemy log
	this.loggable = false;
	this.name = "Houndmaster 2000";
	this.description = "Used to disable certain security systems.";
	this.char = CHAR_CONSOLE;
	this.color = COLOR_DEFAULT;
	this.font = FONT_STYLE_DEFAULT;
}

var ENTITY_BOOK_SHELF = 'book_shelf';
function entity_book_shelf() { 	
	this.x = 0;
	this.y = 0;
	this.type = ENTITY_BOOK_SHELF;
	this.solid = true;
	this.permanentSolid = true;
	this.simulatesPhysics = false;
	// for the enemy log
	this.loggable = false;
	this.name = "";
	this.description = "";
	this.char = CHAR_HALF_WALL;
	this.color = COLOR_DEFAULT;
	this.font = FONT_STYLE_DEFAULT;
} 

var SOLAR_STAGE = 1;
var solar_stages = {
	1 : {
		color: '#CDC0B6',
		distance: 12,
		modifier: -.17,
		next: 2,
		message: "The time of day is now 12:00pm. Please enjoy your day."
	},
	2 : {
		color: '#BBAFA6',
		distance: 10,
		modifier: .17,
		next: 3,
		message: "The time of day is now 8:00pm. Take care now."
	},
	3 : {
		color: '#A89E95',
		distance: 7,
		modifier: .17,
		next: 4,
		message: "The time of day is now 12:00am. Beware of hostile actors."
	},
	4 : {
		color: '#968C85',
		distance: 4,
		modifier: .17,
		next: 5,
		message: "The time of day is now 2:00am. City life is now at its most dangerous."
	},
	5 : {
		color: '#A89E95',
		distance: 7,
		modifier: -.17,
		next: 6,
		message: "The time of day is now 5:00am. Beware of hostile actors."
	},
	6 : {
		color: '#BBAFA6',
		distance: 10,
		modifier: -.17,
		next: 1,
		message: "The time of day is now 7:00amm. Take care now."
	}
};
var ENTITY_SOLAR_CONSOLE = 'solar_console';
function entity_solar_console() {
	this.x = 0;
	this.y = 0;
	this.type = ENTITY_SOLAR_CONSOLE;
	this.solid = true;
	this.permanentSolid = true;
	this.simulatesPhysics = false;
	// for the enemy log
	this.loggable = false;
	this.name = "Solar Controller";
	this.description = "Used to control the time of day. Installed by Solar-Systems.";
	this.char = CHAR_CONSOLE;
	this.color = COLOR_DEFAULT;
	this.font = FONT_STYLE_DEFAULT;	
}

var ENTITY_LOCKED_DOOR = 'locked_door';
function entity_locked_door(horizontal) {
	this.x = 0;
	this.y = 0;
	this.type = ENTITY_LOCKED_DOOR;
	this.solid = true;
	this.permanentSolid = true;
	this.simulatesPhysics = false;
	// for the enemy log
	this.loggable = false;
	this.name = "Door";
	this.description = "Used to prevent things on the other side from reach you.";
	this.char = horizontal ? CHAR_HORIZONTAL_DOOR : CHAR_VERTICAL_DOOR;
	this.color = COLOR_DEFAULT;
	this.font = FONT_STYLE_DEFAULT;	
}

var PIPE_CHAR_VERTICAL = '|';
var PIPE_CHAR_HORIZONT = '=';
var PIPE_CHAR_NORTOEAS;
var PIPE_CHAR_EASTOSOU;
var PIPE_CHAR_SOUTOWES;
var PIPE_CHAR_WESTONOR;
var PIPE_COLOR_OFF = '#b991e6';
var PIPE_COLOR_ON = '#5b3993';
function entity_genes_pipe (pos) {
	this.type = ENTITY_GENES_PIPE;
	this.char = PIPE_CHAR_HORIZONT;
	this.color = PIPE_COLOR_OFF;
	this.solid = false;
	this.permanentSolid = false;
	// for the enemy log
	this.loggable = false;
	this.simulatesPhysics = false;
}


function entity_mastermind_piece () {
	this.type = ENTITY_MASTERMIND_PIECE;
	this.char = MASTERMIND_CHARS.peekRandom();
	this.color = COLOR_DEFAULT;
	this.font = FONT_STYLE_DEFAULT;
	this.solid = true;
	this.permanentSolid = true;
	this.simulatesPhysics = false;
	// for the enemy log
	this.loggable = false;
	
	this.cycle = function() {
		var index = MASTERMIND_CHARS.indexOf(this.char);
		index = ++index % MASTERMIND_CHARS.length;
		this.char = MASTERMIND_CHARS[index];
	}
}

function entity_mastermind_console () {	
	this.type = ENTITY_MASTERMIND_CONSOLE;
	this.char = CHAR_CONSOLE;
	this.color = COLOR_DEFAULT;
	this.font = FONT_STYLE_DEFAULT;
	this.solid = true;
	this.permanentSolid = true;
	this.simulatesPhysics = false;
	this.name = "Puzzle";
	this.discovered = true;
	// for the enemy log
	this.loggable = false;

	this.submitted = false;

	this.submit = function() {
		objectives[OBJ_MASTERMIND].submit();
	}
}

var STATE_CHEST = "chest";
var ENTITY_CHEST = "chest";
var NAME_CHEST = "chest";
var CHAR_CHEST = '\uD83D\uDCE6';
function entity_reward_chest(pos, tile) {
	this.x = pos.x;
	this.y = pos.y;
	// draw information
	this.char = CHAR_CHEST;
	this.color = COLOR_DEFAULT;
	this.font = FONT_STYLE_CHEST;
	// entity information
	this.type = ENTITY_CHEST;
	this.name = NAME_CHEST;
	this.solid = true;
	this.permanentSolid = true;
	this.simulatesPhysics = false;
	// for the enemy log
	this.loggable = false;
	// item information
	this.equippable = false;
	this.consumable = false;
	this.discovered = true;
	// fill it with any existing items
	this.ourTile = tile;
	this.contents = [];
	for (var i = 0; i < this.ourTile.entities.length; i++) {
		if (this.ourTile.entities[i].type == ENTITY_ITEM) {
			this.contents.push(this.ourTile.entities.splice(i,1));
			i--;
		}
	}
	// each chest has 1 weapon/armor item
	for (var i = 2; i >= 0; i--) {
		var loot = generateShopItem(1);
		if (loot != ITEM_NONE)
			this.contents.push(loot);
	}

	this.open = function() {
		scopeChest = this;
		gameState = STATE_CHEST;
		document.onkeydown = chestOnKeyDown;
	}

	this.close = function() {
		scopeChest = null;
		if (this.contents.length == 0) {
			this.ourTile.entities.pop();
		}
		gameState = STATE_GAME;
	    effectsContainer.style.display = 'block';
	}
}

function entity_city_hall_console() {
	this.type = ENTITY_CITY_CONSOLE;
	this.char = CHAR_CONSOLE;
	this.color = COLOR_DEFAULT;
	this.font = FONT_STYLE_DEFAULT;
	this.solid = true;
	this.permanentSolid = true;
	this.simulatesPhysics = false;
	this.name = "City Hall Console";
	this.discovered = true;
	// for the enemy log
	this.loggable = false;

	this.submit = function() {
		return objectives[OBJ_CITY_OS].submit();
	}
}
