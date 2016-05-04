/*				Variables					*/

// objectives
var OBJ_GENERATORS = 'generators';
var OBJ_GENES = 'genes';
var MAIN_OBJECTIVES = [OBJ_GENERATORS, OBJ_GENES];
var OBJ_AUX_GENERATOR = 'aux_generators';
var OBJ_MASTERMIND = 'mastermind';
var OBJ_CITY_OS = 'deliver';
var SIDE_OBJECTIVES = [OBJ_MASTERMIND, OBJ_CITY_OS];

// once they are all complete, you win the run! :3
var objectives = new Objectives();

// generators objective
var GENERATORS_MAX = 3;
var GENERATOR_TICKS = 100;

// always hives
var HIVES_MAX = 3;

function objective_generators (difficulty) {
	this.generators = [];	
	this.generatorsFinished = 0;
	this.generatorsStarts = 0;

	this.isComplete = function() {
		var complete = true;
		for (var i = this.generators.length - 1; i >= 0; i--)
			complete &= this.generators[i].finished;
		return complete;
	}

	this.getTickers = function() {
		var results = [];
		// we don't use #0
		for (var i = this.generators.length - 1; i >= 0; i--) {
			if (this.generators[i].started && !this.generators[i].finished)
				results.push(this.generators[i]);
		}
		return results;
	}

	this.progressTicks = function(ticks) {
		// are we finished?
		var complete = true;
		for (var i = this.generators.length - 1; i > 0; i--)
			complete &= this.generators[i].finished;
		// if so, we're done here
		if (complete)
			return;

		var stepCount = 0;
		while (stepCount < ticks) {
			for (var i = this.generators.length - 1; i >= 0; i--) {
				if (this.generators[i].started && !this.generators[i].finished)
					this.generators[i].step();
			}
			stepCount++;
		}
		// gotta do it afterwards so we finish on time
		complete = true;
		for (var i = this.generators.length - 1; i > 0; i--)
			complete &= this.generators[i].finished;
		// if this is the first time we finished
		if (complete)
			rewardPlayer();
		return complete;
	}

	this.getTaskString = function() {
		return "Turn on the generators";
	}
}

var ENTITY_GENERATOR_CONSOLE = 'generator_console';
function entity_generator_console(room) {
	this.type = ENTITY_GENERATOR_CONSOLE;

	this.solid = true;
	this.permanentSolid = true;
	this.char = CHAR_CONSOLE;
	this.color = COLOR_DEFAULT;
	
	this.room = room;

	this.submit = function() {
		if (!this.room.generator.started)
			this.room.generator.startUp();
	}
}

function entity_generator_block(room) {
	this.type = ENTITY_GENERATOR;

	this.solid = true;
	this.permanentSolid = true;
	this.char = CHAR_GENERATOR_BLOCK;
	this.color = COLOR_DEFAULT;
	
	this.room = room;
}

var ENTITY_GENERATOR_CORE = 'generator_core';
function entity_generator_core(room) {
	this.type = ENTITY_GENERATOR_CORE;

	this.solid = true;
	this.permanentSolid = true;
	this.char = CHAR_CONSOLE;
	this.color = COLOR_DEFAULT;
	
	this.room = room;
}

function entity_generator_core () {	
	this.type = ENTITY_GENERATOR;
	this.char = CHAR_ZAP;
	this.color = COLOR_DEFAULT;
	this.solid = true;
	this.permanentSolid = true;
}

function generator (id) {
	this.id = id;
	this.started = false;
	this.finished = false;
	this.ticks = 0;
	this.maxTicks = GENERATOR_TICKS;

	// so we can update their color when start up
	this.tiles = [];

	this.startUp = function() {
		this.started = true;
	}

	this.step = function() {
		if (!this.started)
			return;
		this.ticks++;
		if (this.ticks == GENERATOR_TICKS) {
			this.finished = true;
			log.add("Generator " + this.id + " is now operational.");
			objectives[OBJ_GENERATORS].generatorsFinished++;
		}
	}

	this.getTitleString = function() {
		return "Generator " + this.id + " is powering up...";
	}
}

var PIPE_COST = 2;
function objective_genes () {
	this.connected = false;
	this.submitted = false;
	this.pipes = [];
	this.console = new entity_genes_console();
	this.playerRewarded = false;

	this.progressTicks = function(ticks) {
		return this.connected && this.submitted;
	}

	this.getTaskString = function() {
		return "Turn on the genes";
	}

	this.submit = function() {
		this.submitted = true;
		this.updateConnected();
		var complete = this.connected;
		if (complete) {
			log.add("The pipeline is complete");
			if (!this.playerRewarded) {
				rewardPlayer();
				this.playerRewarded = true;
			}
		}
		else
			log.add("The pipeline is not complete!")
	}

	this.updateConnected = function() {
		var start = {x: this.console.pos.x, y:this.console.pos.y};
		var openSet = [start];
		var closedSet = [];
		this.connected = false;
		while (!this.connected && openSet.length > 0) {
			// the openset will contain pipes so far
			var pos = openSet.pop();
			closedSet.push(pos);
			// see if it has any adjacent pipes
			var newPos = {x: pos.x + 1, y: pos.y};
			var tile = dungeon.tiles[newPos.y][newPos.x];
			// if it does, add them to the open set if they arent in the closedSet
			if (tile.entity != null && tile.entity.type == ENTITY_CLONING_VAT) {
				this.connected = true; 
			} else if (tile.entity != null && tile.entity.type == ENTITY_GENES_PIPE && !closedSet.setContains(newPos))
				openSet.push(newPos);
			// west
			newPos = {x: pos.x - 1, y: pos.y};
			tile = dungeon.tiles[newPos.y][newPos.x];
			if (tile.entity != null && tile.entity.type == ENTITY_CLONING_VAT) {
				this.connected = true; 
			} else if (tile.entity != null && tile.entity.type == ENTITY_GENES_PIPE && !closedSet.setContains(newPos))
				openSet.push(newPos);
			// south
			newPos = {x: pos.x, y: pos.y + 1};
			tile = dungeon.tiles[newPos.y][newPos.x];
			if (tile.entity != null && tile.entity.type == ENTITY_CLONING_VAT) {
				this.connected = true;
			} else if (tile.entity != null && tile.entity.type == ENTITY_GENES_PIPE && !closedSet.setContains(newPos))
				openSet.push(newPos);
			// north
			newPos = {x: pos.x, y: pos.y - 1};
			tile = dungeon.tiles[newPos.y][newPos.x];
			if (tile.entity != null && tile.entity.type == ENTITY_CLONING_VAT) {
				this.connected = true;
			} else if (tile.entity != null && tile.entity.type == ENTITY_GENES_PIPE && !closedSet.setContains(newPos))
				openSet.push(newPos);
		}
		return;
	}
}

function entity_genes_console () {
	this.type = ENTITY_GENES_CONSOLE;
	this.char = CHAR_CONSOLE;
	this.color = COLOR_DEFAULT;
	this.solid = true;
	this.permanentSolid = true;
	// this.pos - define when placed in the tiles

	this.submit = function() {
		objectives[OBJ_GENES].submit();
	}
}

function entity_cloning_vat () {
	this.type = ENTITY_CLONING_VAT;
	this.solid = true;	
	this.permanentSolid = true;
	this.char = CHAR_CLONGING_VAT;
	this.color = COLOR_DEFAULT;
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
}

function objective_aux_generator () {
	this.generator = new entity_aux_generator();

	this.progressTicks = function(ticks) {
		var stepCount = 0;
		while (stepCount < ticks) {
			if (this.generator.started && !this.generator.finished)
				this.generator.step();
			stepCount++;
		}
		// gotta do it afterwards so we finish on time
		var complete = this.generator.finished;
		return complete;
	}
	
	this.getTickers = function() {
		if (this.generator.started && !this.generator.finished)
			return [this.generator];
		else
			return [];
	}

	this.getTaskString = function() {
		return "Turn on the aux generator";
	}
}

function entity_aux_generator () {
	this.type = ENTITY_AUX_GENERATOR;
	this.char = CHAR_CONSOLE;
	this.color = COLOR_DEFAULT;
	this.solid = true;
	this.permanentSolid = true;

	this.started = false;
	this.finished = false;
	this.ticks = 0;
	this.maxTicks = GENERATOR_TICKS;

	// so we can update their color when start up
	this.tiles = [];

	this.startUp = function() {
		this.started = true;
		for (var i = this.tiles.length - 1; i >= 0; i--) {
			this.tiles[i].entities[this.tiles[i].entities.length - 1].color = COLOR_GENERATOR_STARTED;
		}
	}

	this.step = function() {
		if (!this.started)
			return;
		this.ticks++;
		if (this.ticks == GENERATOR_TICKS) {
			rewardPlayer();
			this.finished = true;
			log.add("The auxillary generator is now operational.");
		}
	}

	this.getTitleString = function() {
		return "The auxillary generator is powering up...";
	}
}

var MASTERMIND_SOLUTION_LENGTH = 4;
// var MASTERMIND_CHARS = ['\u10C4', '\u10B9', '\u10BE', '\u10A7', '\u10A55'];
var MASTERMIND_CHARS = ['A', 'B', 'C', 'D'];
function objective_mastermind () {
	this.console = new entity_mastermind_console();
	this.rewardGiven = false;
	this.solution = [];
	this.pieces = [];

	for (var i = MASTERMIND_SOLUTION_LENGTH - 1; i >= 0; i--) {
		// this.solution.push(MASTERMIND_CHARS.peekRandom());
		this.solution.push('A');
	}

	this.tilePositions = [];
	
	this.progressTicks = function(ticks) {
		return this.isComplete();
	}
	
	this.getTaskString = function() {
		return "Solve that puzzle";
	}

	this.isComplete = function() {
		var result = this.console.submitted;
		for (var i = MASTERMIND_SOLUTION_LENGTH - 1; i >= 0; i--) {
			result = result && this.pieces[i].char == this.solution[i];
		}
		return result;
	}

	this.submit = function () {
		// can only win after you submit and its correct
		this.console.submitted = true;
		var wrongCount = 0;
		for (var i = MASTERMIND_SOLUTION_LENGTH - 1; i >= 0; i--) {
			var correct = this.pieces[i].char == this.solution[i];

			if (!correct) {
				wrongCount += 1;
				var options = [];
				for (var j = MOVE_OPTIONS.length - 1; j >= 0; j--) {
					var tilePos = {x:this.tilePositions[i].x + MOVE_OPTIONS[j].x, y:this.tilePositions[i].y + MOVE_OPTIONS[j].y}
					if (!dungeon.tiles[tilePos.y][tilePos.x].getSolid() && !(tilePos.x == player.x && tilePos.y == player.y))
						options.push(MOVE_OPTIONS[j]);
				}
				if (options.length == 0) {
					log.add("You didn't really mean to submit this, did you?");
					return;
				}
				var offset = options[Math.floor(Math.random() * options.length)];
				var enemyPos = {x:this.tilePositions[i].x + offset.x, y:this.tilePositions[i].y + offset.y};
				var enemy = new Enemy(enemyPos, NAME_NIGHT_GAURD, 10, 1, 5, 'f', FACTION_NONE, [{statusType:STATE_STUNNED, ticksRemaining:1}]);
				dungeon.tiles[enemyPos.y][enemyPos.x].entities.push(enemy);
				dungeon.npcs.push(enemy);
			}
		}

		if (wrongCount == 0 && !this.rewardGiven) {
			log.add("Correct!");
			rewardPlayer();
			this.rewardGiven = true;
		}
	}
}

function entity_mastermind_piece () {
	this.type = ENTITY_MASTERMIND_PIECE;
	this.char = MASTERMIND_CHARS.peekRandom();
	this.color = COLOR_DEFAULT;
	this.solid = true;
	this.permanentSolid = true;

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
	this.solid = true;
	this.permanentSolid = true;

	this.submitted = false;

	this.submit = function() {
		objectives[OBJ_MASTERMIND].submit();
	}
}

function objective_city_os () {
	this.osDelivered = false;
	this.console = new entity_city_hall_console();

	this.progressTicks = function(ticks) {
		return this.osDelivered;
	}
	
	this.getTaskString = function() {
		return "Upgrade the city os";
	}

	this.submit = function() {
		if (player.inventory.hasAndRemove(NAME_OS_DISK)) {
			log.add("You successfully update the city's mainframe.")
			this.osDelivered = true;
		} else if (!this.osDelivered)
			log.add("You need the OS upgrade to update the city's mainframe.");
	}
}

var NAME_OS_DISK = 'OsDisk'
function item_os_disk () {
	// draw information
	this.char = CHAR_OS_DISK;
	this.color = COLOR_DEFAULT;
	// entity information
	this.type = ENTITY_ITEM;
	this.name = NAME_OS_DISK;
	this.solid = false;
	this.permanentSolid = false;
	// item information
	this.slot = SLOT_NONE;
}

function entity_city_hall_console() {
	this.type = ENTITY_CITY_CONSOLE;
	this.char = CHAR_CONSOLE;
	this.color = COLOR_DEFAULT;
	this.solid = true;
	this.permanentSolid = true;

	this.submit = function() {
		objectives[OBJ_CITY_OS].submit();
	}
}

function Objectives () {

	this.getObjectives = function() {		
		var results = [];
		for (var key in this) {		
			if (typeof this[key].getTaskString !== "undefined") {
				results.push(this[key]);
			}	
		}
		return results;
	}

	this.getTickingObjectives = function() {
		var results = [];
		for (var key in this) {		
			if (typeof this[key].getTickers !== "undefined") {
				results = results.concat(this[key].getTickers());
			}	
		}
		return results;
	}

	this.progressObjectives = function() {
		var victory = true;
		for (var key in this) {		
			if (typeof this[key].progressTicks !== "undefined") {
				victory &= this[key].progressTicks(1);
			}	
		}
		return victory;
	}

	this.getObjectiveStrings = function() {		
		var results = [];
		for (var key in this) {		
			if (typeof this[key].getTaskString !== "undefined") {
				results.push(this[key].getTaskString());
			}	
		}
		return results;
	}
}

// spawn an item chest
function rewardPlayer() {
	var candidates = [];
	for (var i = MOVE_OPTIONS.length - 1; i >= 0; i--) {
			var offset = MOVE_OPTIONS[i];
			if (!dungeon.tiles[player.y + offset.y][player.x + offset.x].getPermanentSolid())
				candidates.push(offset);
		}
	var result = candidates.popRandom();
	var chestLocation = {x: player.x + result.x, y:player.y + result.y};
	var chestTile = dungeon.tiles[chestLocation.y][chestLocation.x];
	if (chestTile.entities.length > 0 && chestTile.entities.peek().type == ENTITY_ENEMY) {
		var enemy = chestTile.entities.pop();
		enemy.kill(chestTile);
	}
	chestTile.entities.push(new entity_reward_chest(chestTile));
}

var STATE_CHEST = "chest";
var ENTITY_CHEST = "chest";
var NAME_CHEST = "chest";
var CHAR_CHEST = 'n';
function entity_reward_chest(tile) {
	// draw information
	this.char = CHAR_CHEST;
	this.color = COLOR_DEFAULT;
	// entity information
	this.type = ENTITY_CHEST;
	this.name = NAME_CHEST;
	this.solid = true;
	this.permanentSolid = true;
	// item information
	this.equippable = false;
	this.consumable = false;
	// fill it with any existing items
	this.ourTile = tile;
	this.contents = [];
	for (var i = 0; i < this.ourTile.length; i++) {
		if (this.ourTile[i].type == ENTITY_ITEM) {
			contents.push(this.ourTile.splice(i,1));
			i--;
		}
	}
	// each chest has 1 weapon/armor item
	this.contents.push(generateLoot(1));
	this.contents.push(generateLoot(1));
	this.contents.push(generateLoot(1));

	this.open = function() {
		currentChest = this;
		gameState = STATE_CHEST;
	}

	this.close = function() {
		currentChest = null;
		if (this.contents.length == 0) {
			this.ourTile.entities.pop();
		}
		gameState = STATE_GAME;
	}
}
