/*				Variables					*/

// objectives
var OBJ_GENERATORS = 'generators';
var OBJ_GENES = 'genes';
var MAIN_OBJECTIVES = [OBJ_GENERATORS];
var OBJ_AUX_GENERATOR = 'aux_generators';
var OBJ_MASTERMIND = 'mastermind';
var OBJ_CITY_OS = 'deliver';
var SIDE_OBJECTIVES = [OBJ_MASTERMIND, OBJ_CITY_OS];

// once they are all complete, you win the run! :3
var objectives = new Objectives();

// generators objective
var GENERATORS_MAX = 3;
var GENERATOR_TICKS = 100;

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
			return complete;

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
		if (complete) {
			// if we are auto-exploring, stop!
			bored = false;
			rewardPlayer();			
		}
		return complete;
	}

	this.getTaskString = function() {
		return "Turn on the generators";
	}
}

function generator (id, room_segment) {
	this.id = id;
	this.roomSegment = room_segment;
	this.started = false;
	this.finished = false;
	this.ticks = 0;
	this.maxTicks = GENERATOR_TICKS;

	// set during dungeon generation
	this.console = null;

	// so we can update their color when start up
	this.blocks = [];

	this.startUp = function() {
		this.started = true;
		for (var i = this.blocks.length - 1; i >= 0; i--) {
			var generator_piece = this.blocks[i];
			generator_piece.faction = FACTION_CLONES;
			switch(generator_piece.type){
				case ENTITY_GENERATOR_BLOCK:
				generator_piece.color = COLOR_GENERATOR_STARTED;
				break;

				case ENTITY_GENERATOR_CORE:
				dungeon.npcs.push(generator_piece);
				break;
			}
		}

		roomLookup[this.roomSegment.hash].powered = true;

		// make the enemy to spawn
		var enemy = MakeNPC(NAME_NIGHT_GAURD, {x:0, y:0}, [{type:STATUS_STUNNED, ticksRemaining:1}]);
		// pick an amount
		var numberOfEnemies = Math.round(Math.random() * 10) + 8;
		// build all the spaces
		var tileCandidates = [];
		var openSet = [{x: this.roomSegment.x - mapXMin, y: this.roomSegment.y - mapYMin}];
		var closedSet = [];
		while (openSet.length > 0) {
			var current_segment = openSet.pop();
			closedSet.push(current_segment);
			if (current_segment.y + mapYMin > 0) {
				// check north
				var north_segment = minimap[current_segment.y - 1 + mapYMin][current_segment.x + mapXMin];
				// if its part of our room, add it to our set, keep moving
				if (north_segment.hash == this.roomSegment.hash && !closedSet.setContains({x: north_segment.x - mapXMin, y: north_segment.y - mapYMin}))
					openSet.push({x: north_segment.x - mapXMin, y: north_segment.y - mapYMin});
				else if (north_segment.hash != this.roomSegment.hash && north_segment.hash != 0) {
					var roomCenter = {x: (ROOM_CELL_LENGTH - 1)/ 2 + (current_segment.x * ROOM_CELL_LENGTH), y: (ROOM_CELL_LENGTH - 1)/ 2 + (current_segment.y * ROOM_CELL_LENGTH)};
					var topleft = {x: roomCenter.x - (ROOM_CELL_LENGTH - 1)/ 2 + 2, y: roomCenter.y - (ROOM_CELL_LENGTH - 1)/ 2 + 2};
					var xstart = topleft.x;
					var ystart = topleft.y - 3;
					// if its not, add the inbetween tiles
					for (var i = 0; i < 9; i++) {
						tileCandidates.push({y: ystart, x:xstart + i});
						tileCandidates.push({y: ystart + 1, x:xstart + i});
					}
				}
			}
			if (current_segment.y + mapYMin < minimap.length - 1) {
				// check south
				var south_segment = minimap[current_segment.y + 1 + mapYMin][current_segment.x + mapXMin];
				// if its part of our room, add it to our set, keep moving
				if (south_segment.hash == this.roomSegment.hash && !closedSet.setContains({x: south_segment.x - mapXMin, y: south_segment.y - mapYMin}))
					openSet.push({x: south_segment.x - mapXMin, y: south_segment.y - mapYMin});
				else if (south_segment.hash != this.roomSegment.hash && south_segment.hash != 0) {
					var roomCenter = {x: (ROOM_CELL_LENGTH - 1)/ 2 + (current_segment.x * ROOM_CELL_LENGTH), y: (ROOM_CELL_LENGTH - 1)/ 2 + (current_segment.y * ROOM_CELL_LENGTH)};
					var topleft = {x: roomCenter.x - (ROOM_CELL_LENGTH - 1)/ 2 + 2, y: roomCenter.y - (ROOM_CELL_LENGTH - 1)/ 2 + 2};
					var xstart = topleft.x;
					var ystart = topleft.y + ROOM_CELL_LENGTH - 4;
					// if its not, add the inbetween tiles
					for (var i = 0; i < 9; i++) {
						tileCandidates.push({y: ystart, x:xstart + i});
						tileCandidates.push({y: ystart + 1, x:xstart + i});
					}
				}
			}
			if (current_segment.x + mapXMin < minimap[0].length - 1) {
				// check east
				var east_segment = minimap[current_segment.y + mapYMin][current_segment.x + 1 + mapXMin];
				// if its part of our room, add it to our set, keep moving
				if (east_segment.hash == this.roomSegment.hash && !closedSet.setContains({x: east_segment.x - mapXMin, y: east_segment.y - mapYMin}))
					openSet.push({x: east_segment.x - mapXMin, y: east_segment.y - mapYMin});
				else if (east_segment.hash != this.roomSegment.hash && east_segment.hash != 0) {
					var roomCenter = {x: (ROOM_CELL_LENGTH - 1)/ 2 + (current_segment.x * ROOM_CELL_LENGTH), y: (ROOM_CELL_LENGTH - 1)/ 2 + (current_segment.y * ROOM_CELL_LENGTH)};
					var topleft = {x: roomCenter.x - (ROOM_CELL_LENGTH - 1)/ 2 + 2, y: roomCenter.y - (ROOM_CELL_LENGTH - 1)/ 2 + 1};
					var xstart = topleft.x + ROOM_CELL_LENGTH - 3;
					var ystart = topleft.y;
					// if its not, add the inbetween tiles
					for (var i = 0; i < 9; i++) {
						tileCandidates.push({y: ystart + i, x:xstart});
						tileCandidates.push({y: ystart + i, x:xstart + 1});
					}
				}					
			}
			if (current_segment.x + mapXMin > 0) {
				// check west
				var west_segment = minimap[current_segment.y + mapYMin][current_segment.x - 1 + mapXMin];
				// if its part of our room, add it to our set, keep moving
				if (west_segment.hash == this.roomSegment.hash && !closedSet.setContains({x: west_segment.x - mapXMin, y: west_segment.y - mapYMin}))
					openSet.push({x: west_segment.x - mapXMin, y: west_segment.y - mapYMin});
				else if (west_segment.hash != this.roomSegment.hash && west_segment.hash != 0) {
					var roomCenter = {x: (ROOM_CELL_LENGTH - 1)/ 2 + (current_segment.x * ROOM_CELL_LENGTH), y: (ROOM_CELL_LENGTH - 1)/ 2 + (current_segment.y * ROOM_CELL_LENGTH)};
					var topleft = {x: roomCenter.x - (ROOM_CELL_LENGTH - 1)/ 2 + 2, y: roomCenter.y - (ROOM_CELL_LENGTH - 1)/ 2 + 1};
					var xstart = topleft.x - 3;
					var ystart = topleft.y;
					// if its not, add the inbetween tiles
					for (var i = 0; i < 9; i++) {
						tileCandidates.push({y: ystart + i, x:xstart});
						tileCandidates.push({y: ystart + i, x:xstart + 1});
					}
				}
			}
		}

		var enemyCount = 0;
		while (enemyCount < numberOfEnemies) {
			var tilePos = tileCandidates.popRandom();
			tilePos = getOpenSpot(tilePos);
			var tile = dungeon.tiles[tilePos.y][tilePos.x];
			var gaurd = clone(enemy);
			gaurd.x = tilePos.x;
			gaurd.y = tilePos.y;
			gaurd.destination = this.console;
			dungeon.npcs.push(gaurd);
			tile.entities.push(gaurd);
			enemyCount++;
		}
	}

	this.fail = function() {
		// strengthen enemies

		log.add("Generator " + this.id + " is compromised, enemy presence will increase.")

		roomLookup[this.roomSegment.hash].powered = false;

		// unlight all the tiles
		this.finished = true;
		for (var i = this.blocks.length - 1; i >= 0; i--) {
			var generator_piece = this.blocks[i];
			// make it untargetable
			dungeon.npcs.remove(generator_piece);
			switch(generator_piece.type){
				case ENTITY_GENERATOR_BLOCK:
				generator_piece.color = COLOR_GENERATOR_FAILED;
				break;
			}
		}

		// free the defend-o's
		for (var i = dungeon.npcs.length - 1; i >= 0; i--) {
			if (dungeon.npcs[i].name == NAME_NIGHT_GAURD) {
				dungeon.npcs[i].destination = DESTINATION_NONE;
			}
		}
	}

	this.complete = function() {

		// if you power up the generator, get power as a reward
		factions[FACTION_CLONES].power++;

		for (var i = this.blocks.length - 1; i >= 0; i--) {
			var generator_piece = this.blocks[i];
			// make it untargetable
			dungeon.npcs.remove(generator_piece);
			switch(generator_piece.type){
				case ENTITY_GENERATOR_BLOCK:
				generator_piece.color = COLOR_DEFAULT;
				break;
			}
		}
		
		// free the defend-o's
		for (var i = dungeon.npcs.length - 1; i >= 0; i--) {
			if (dungeon.npcs[i].name == NAME_NIGHT_GAURD) {
				dungeon.npcs[i].destination = DESTINATION_NONE;
			}
		}
	}

	this.step = function() {
		if (!this.started)
			return;
		this.ticks++;
		if (this.ticks == GENERATOR_TICKS) {
			this.finished = true;
			
			this.complete();

			log.add("Generator " + this.id + " is now operational.");

			objectives[OBJ_GENERATORS].generatorsFinished++;
		}
	}

	this.getTitleString = function() {
		return "Generator " + this.id + " is powering up, protect the core!";
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
		var start = {x: this.console.x, y:this.console.y};
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
	this.font = FONT_STYLE_DEFAULT;
	this.solid = true;
	this.permanentSolid = true;
	this.simulatesPhysics = false;
	// for the enemy log
	this.loggable = false;

	this.started = false;
	this.finished = false;
	this.name = "Generator";
	this.discovered = true;
	this.ticks = 0;
	this.maxTicks = GENERATOR_TICKS;

	// so we can update their color when start up
	this.blocks = [];

	this.startUp = function() {
		this.started = true;
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
					if (!dungeon.tiles[tilePos.y][tilePos.x].getSolid())
						options.push(MOVE_OPTIONS[j]);
				}
				if (options.length == 0) {
					log.add("You didn't really mean to submit this, did you?");
					return;
				}
				var offset = options[Math.floor(Math.random() * options.length)];
				var enemyPos = {x:this.tilePositions[i].x + offset.x, y:this.tilePositions[i].y + offset.y};
				var enemy = MakeNPC(NAME_NIGHT_GAURD, {x:enemyPos.x, y:enemyPos.y}, [{type:STATUS_STUNNED, ticksRemaining:1}]);
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

function objective_city_os () {
	this.osDelivered = false;
	this.console = new entity_city_hall_console();

	this.progressTicks = function(ticks) {
		return this.osDelivered;
	}
	
	this.getTaskString = function() {
		return "Reinstall the city's operating system";
	}

	this.submit = function() {
		if (player.inventory.hasAndRemove(NAME_OS_DISK)) {
			log.add("You successfully reinstalled the city's operating system.")
			this.osDelivered = true;
		} else if (!this.osDelivered)
			log.add("You need the OS to reinstall the city's operating system.");
	}
}

var CHAR_TRIPWIRE = ',';
var ENTITY_BANK_TRIPWIRE = 'bank_tripwire';
function entity_bank_tripwire () {
	// draw information
	this.char = CHAR_TRIPWIRE;
	this.color = COLOR_DEFAULT;
	this.font = FONT_STYLE_DEFAULT;
	// entity information
	this.type = ENTITY_BANK_TRIPWIRE;
	this.name = 'bank tripwire';
	this.solid = false;
	this.permanentSolid = false;	
}

var NAME_OS_DISK = 'OsDisk'
var FONT_STYLE_OS_DISK = "10px Lucida Console";
function item_os_disk () {
	// draw information
	this.char = CHAR_OS_DISK;
	this.color = COLOR_DEFAULT;
	this.font = FONT_STYLE_OS_DISK;
	// entity information
	this.type = ENTITY_ITEM;
	this.name = NAME_OS_DISK;
	this.solid = false;
	this.permanentSolid = false;
	this.simulatesPhysics = true;
	// for auto exploring
	this.discovered = true;
	// for the enemy log
	this.loggable = false;
	// item information
	this.slot = SLOT_NONE;		
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
	var result = getOpenSpot(player);
	var chestTile = dungeon.tiles[result.y][result.x];
	chestTile.entities.push(new entity_reward_chest(result, chestTile));
}
