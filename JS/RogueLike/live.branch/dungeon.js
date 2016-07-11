/*				Constants					*/

// heuristic for map generation
var ADJACENT_ROOM_MULTIPLIER = 3;

// dungeon generation stuff
var DUNGEON_HEIGHT = 17;
var DUNGEON_WIDTH = 17;

// difficulty
var DIFFICULTY_EASY = 'easy';
var DIFFICULTY_MEDIUM = 'medium';
var DIFFICULTY_HARD = 'hard';
var difficulty = DIFFICULTY_EASY;

// flavor rooms
var FLAVOR_BANK = 'bank';
var FLAVOR_SHOP = 'shop';
var FLAVOR_ROOMS = [FLAVOR_BANK, FLAVOR_SHOP];

// for resources
var roomLookup = {};

// how wide a room is (+ 2 for hallway on each side)
var ROOM_CELL_LENGTH = 13;

// possible shape of each room in the dungeon
var ROOM_SHAPES = [
	// [x]
	{frequency: 50, offsets:[{x:0,y:0}]},
	// [x]
	// [ ]
	{frequency: 5, offsets:[{x:0,y:0}, {x:0,y:1}]},
	// [ ]
	// [x]
	{frequency: 5, offsets:[{x:0,y:0}, {x:0,y:-1}]},
	// [x][ ]
	{frequency: 5, offsets:[{x:0,y:0}, {x:1,y:0}]},
	// [ ][x]
	{frequency: 5, offsets:[{x:0,y:0}, {x:-1,y:0}]},
	// [ ][ ]
	// [x][ ]
	{frequency: 1, offsets:[{x:0,y:0}, {x:1,y:0}, {x:1,y:-1}, {x:0,y:-1}]},
	// [ ][ ]
	// [ ][x]
	{frequency: 1, offsets:[{x:0,y:0}, {x:-1,y:0}, {x:-1,y:-1}, {x:0,y:-1}]},
	// [ ][x]
	// [ ][ ]
	{frequency: 1, offsets:[{x:0,y:0}, {x:-1,y:0}, {x:-1,y:1}, {x:0,y:1}]},
	// [x][ ]
	// [ ][ ]
	{frequency: 1, offsets:[{x:0,y:0}, {x:1,y:0}, {x:1,y:1}, {x:0,y:1}]},
	//    [ ]
	// [x][ ]
	{frequency: 1, offsets:[{x:0,y:0}, {x:1,y:0}, {x:1,y:-1}]},
	//    [ ]
	// [ ][x]
	{frequency: 1, offsets:[{x:0,y:0}, {x:0,y:-1}, {x:-1,y:0}]},
	//    [x]
	// [ ][ ]
	{frequency: 1, offsets:[{x:0,y:0}, {x:0,y:1}, {x:-1,y:1}]},
	// [ ][ ]
	// [x]
	{frequency: 1, offsets:[{x:0,y:0}, {x:1,y:-1}, {x:0,y:-1}]},
	// [x][ ]
	// [ ] 
	{frequency: 1, offsets:[{x:0,y:0}, {x:1,y:0}, {x:0,y:1}]},
	// [ ][x]
	// [ ]
	{frequency: 1, offsets:[{x:0,y:0}, {x:-1,y:1}, {x:-1,y:0}]},
	// [x][ ]
	//    [ ]
	{frequency: 1, offsets:[{x:0,y:0}, {x:1,y:0}, {x:1,y:1}]},
	// [ ][x]
	//    [ ]
	{frequency: 1, offsets:[{x:0,y:0}, {x:-1,y:0}, {x:0,y:1}]},
	// [ ][ ]
	//    [x]
	{frequency: 1, offsets:[{x:0,y:0}, {x:-1,y:-1}, {x:0,y:-1}]},
	// [x]
	// [ ][ ]
	{frequency: 1, offsets:[{x:0,y:0}, {x:0,y:1}, {x:1,y:1}]},
	// [ ]
	// [x][ ]
	{frequency: 1, offsets:[{x:0,y:0}, {x:0,y:-1}, {x:1,y:0}]},
	// [ ]
	// [ ][x]
	{frequency: 1, offsets:[{x:0,y:0}, {x:-1,y:0}, {x:-1,y:-1}]}
	];

// grid: the minimap for the Barracks type level
// pos: the current position in the grid
function getValidShapes (pos) {
	// the valid shapes
	var results = [];
	for (var i = ROOM_SHAPES.length - 1; i >= 0; i--) {
		var shape = ROOM_SHAPES[i];
		// the current offset
		// check if each offset is valid
		var valid = true;
		for (var j = shape.offsets.length - 1; j >= 0; j--) {
			var offset = shape.offsets[j];
			// if out of bounds, no good
			if (pos.x + offset.x < 0 || pos.x + offset.x >= DUNGEON_WIDTH) {
				valid = false;
				break;
			}
			else if (pos.y + offset.y < 0 || pos.y + offset.y >= DUNGEON_HEIGHT) {
				valid = false;
				break;
			}
			else if (minimap[pos.y + offset.y][pos.x + offset.x].hash != 0) {
				valid = false;
				break;
			}
		}
		if (valid)
			results.push(shape);
	}
	return results;
}

// type of level with a grid-like layout
function Dungeon () {

	this.buildRoom = function(room, templates) {
		// orient the template how we want it
		var blueprint;
		switch (room.size) {
			case 2:
			blueprint = templates[2];
			// apply any transposes we need
			if (shapesEqual(room.shape, ROOM_SHAPES[2])) {
				blueprint = rot90C(blueprint, 2);
				room.seedPos.y -= 1;
			} 
			else if (shapesEqual(room.shape, ROOM_SHAPES[3])) {
				blueprint = rot90C(blueprint, 1);
			} 
			else if (shapesEqual(room.shape, ROOM_SHAPES[4])) {
				blueprint = rot90C(blueprint, 1);
				room.seedPos.x -= 1;
			}
			// apply it to the room segments
			this.applyBlueprint(room, blueprint);
			break;

			case 3:
			blueprint = templates[3];
			// apply any transposes we need
			if (shapesEqual(room.shape, ROOM_SHAPES[9])) {
				blueprint = rot90C(blueprint, 3);
				room.seedPos.y -= 1;
			} else if (shapesEqual(room.shape, ROOM_SHAPES[10])) {
				blueprint = rot90C(blueprint, 3);
				room.seedPos.x -= 1;
				room.seedPos.y -= 1;
			} else if (shapesEqual(room.shape, ROOM_SHAPES[11])) {
				room.seedPos.x -= 1;
				blueprint = rot90C(blueprint, 3);
			} else if (shapesEqual(room.shape, ROOM_SHAPES[12])) {
				blueprint = rot90C(blueprint, 1);
				room.seedPos.y -= 1;
			} else if (shapesEqual(room.shape, ROOM_SHAPES[13])) {
				blueprint = rot90C(blueprint, 1);
			} else if (shapesEqual(room.shape, ROOM_SHAPES[14])) {
				blueprint = rot90C(blueprint, 1);
				room.seedPos.x -= 1;
			} else if (shapesEqual(room.shape, ROOM_SHAPES[15])) {
				blueprint = rot90C(blueprint, 2);
			} else if (shapesEqual(room.shape, ROOM_SHAPES[16])) {
				blueprint = rot90C(blueprint, 2);
				room.seedPos.x -= 1;
			} else if (shapesEqual(room.shape, ROOM_SHAPES[17])) {
				blueprint = rot90C(blueprint, 2);
				room.seedPos.x -= 1;
				room.seedPos.y -= 1;
			} else if (shapesEqual(room.shape, ROOM_SHAPES[19])) {
				room.seedPos.y -= 1;
			} else if (shapesEqual(room.shape, ROOM_SHAPES[20])) {
				room.seedPos.x -= 1;
				room.seedPos.y -= 1;
			}
			// apply it to the room segments
			this.applyBlueprint(room, blueprint);
			break;
			// size 1 or 4, pick 1 of 4 rotations
			default:
			blueprint = templates[room.size];
			if (shapesEqual(room.shape, ROOM_SHAPES[5])) {
				room.seedPos.y -= 1;
			} else if (shapesEqual(room.shape, ROOM_SHAPES[6])) {
				room.seedPos.x -= 1;
				room.seedPos.y -= 1;
			} else if (shapesEqual(room.shape, ROOM_SHAPES[7])) {
				room.seedPos.x -= 1;
			}
			this.applyBlueprint(room, blueprint);			
			break;
		}
	}

	// this guy has to be the monster
	this.applyBlueprint = function(room, template) {
		var seedPos = room.seedPos;
		var seedRoomCenter = {x: (ROOM_CELL_LENGTH - 1)/ 2 + ((seedPos.x - mapXMin) * ROOM_CELL_LENGTH), y: (ROOM_CELL_LENGTH - 1)/ 2 + ((seedPos.y - mapYMin) * ROOM_CELL_LENGTH)};
		var topLeft = {x: seedRoomCenter.x - (ROOM_CELL_LENGTH - 1)/ 2, y: seedRoomCenter.y - (ROOM_CELL_LENGTH - 1)/ 2};
		// make our required entities
		switch (room.event) {
			default:break;
		}
		var roomPos = seedPos;
			
		var NRoom = roomPos.y > 0 && minimap[roomPos.y - 1][roomPos.x].hash != 0;
		var SRoom = roomPos.y < minimap.length - 1 && minimap[roomPos.y + 1][roomPos.x].hash != 0;
		var WRoom = roomPos.x > 0 && minimap[roomPos.y][roomPos.x - 1].hash != 0;
		var ERoom = roomPos.x < minimap[roomPos.y].length - 1 && minimap[roomPos.y][roomPos.x + 1].hash != 0;
		// if we want to enable a path to the rooms diagonal from us
		var NWOpen = NRoom && WRoom && minimap[roomPos.y - 1][roomPos.x - 1].hash != 0;
		var NEOpen = NRoom && ERoom && minimap[roomPos.y - 1][roomPos.x + 1].hash != 0;
		var SWOpen = SRoom && WRoom && minimap[roomPos.y + 1][roomPos.x - 1].hash != 0;
		var SEOpen = SRoom && ERoom && minimap[roomPos.y + 1][roomPos.x + 1].hash != 0;

		for (var i = 0; i < template.length; i++) {
			for (var j = 0; j < template[i].length; j++) {
				var x = topLeft.x + j, y = topLeft.y + i;
				var char = template[i][j];
				var entity = null;
				var newRoomPos = {x: mapXMin + Math.round((x - (ROOM_CELL_LENGTH - 1)/ 2) / ROOM_CELL_LENGTH), 
					    	      y: mapYMin + Math.round((y - (ROOM_CELL_LENGTH - 1)/ 2) / ROOM_CELL_LENGTH)};

				if (newRoomPos.x != roomPos.x || newRoomPos.y != roomPos.y) {
					roomPos = newRoomPos;
					NRoom = roomPos.y > 0 && minimap[roomPos.y - 1][roomPos.x].hash != 0;
					SRoom = roomPos.y < minimap.length - 1 && minimap[roomPos.y + 1][roomPos.x].hash != 0;
					WRoom = roomPos.x > 0 && minimap[roomPos.y][roomPos.x - 1].hash != 0;
					ERoom = roomPos.x < minimap[roomPos.y].length - 1 && minimap[roomPos.y][roomPos.x + 1].hash != 0;
					NWOpen = NRoom && WRoom && minimap[roomPos.y - 1][roomPos.x - 1].hash != 0;
					NEOpen = NRoom && ERoom && minimap[roomPos.y - 1][roomPos.x + 1].hash != 0;
					SWOpen = SRoom && WRoom && minimap[roomPos.y + 1][roomPos.x - 1].hash != 0;
					SEOpen = SRoom && ERoom && minimap[roomPos.y + 1][roomPos.x + 1].hash != 0;
				}
				switch (char) {				
					case SYMBOL_NE_CORNER:
					if (NEOpen)
						char = CHAR_OUTSIDE_TILE;
					else
						char = CHAR_EMPTY;
					break;

					case SYMBOL_NNE_CORNER:
					if (NEOpen)
						char = CHAR_OUTSIDE_TILE;
					else if (NRoom)
						char = CHAR_WALL;
					else
						char = CHAR_EMPTY;
					break;

					case SYMBOL_NEE_CORNER:
					if (NEOpen)
						char = CHAR_OUTSIDE_TILE;
					else if (ERoom)
						char = CHAR_WALL;
					else
						char = CHAR_EMPTY;
					break;
					
					case SYMBOL_NW_CORNER:
					if (NWOpen)
						char = CHAR_OUTSIDE_TILE;
					else if (NRoom)
						char = CHAR_WALL;
					else
						char = CHAR_EMPTY;
					break;

					case SYMBOL_NNW_CORNER:
					if (NWOpen)
						char = CHAR_OUTSIDE_TILE;
					else if (NRoom)
						char = CHAR_WALL;
					else
						char = CHAR_EMPTY;
					break;

					case SYMBOL_NWW_CORNER:
					if (NWOpen)
						char = CHAR_OUTSIDE_TILE;
					else if (WRoom)
						char = CHAR_WALL;
					else
						char = CHAR_EMPTY;
					break;
					
					case SYMBOL_SW_CORNER:
					if (SWOpen)
						char = CHAR_OUTSIDE_TILE;
					else if (SRoom)
						char = CHAR_WALL;
					else
						char = CHAR_EMPTY;
					break;

					case SYMBOL_SSW_CORNER:
					if (SWOpen)
						char = CHAR_OUTSIDE_TILE;
					else if (SRoom)
						char = CHAR_WALL;
					else
						char = CHAR_EMPTY;
					break;

					case SYMBOL_SWW_CORNER:
					if (SWOpen)
						char = CHAR_OUTSIDE_TILE;
					else if (WRoom)
						char = CHAR_WALL;
					else
						char = CHAR_EMPTY;
					break;
					
					case SYMBOL_SE_CORNER:
					if (SEOpen)
						char = CHAR_OUTSIDE_TILE;
					else if (SRoom)
						char = CHAR_WALL;
					else
						char = CHAR_EMPTY;
					break;

					case SYMBOL_SSE_CORNER:
					if (SEOpen)
						char = CHAR_OUTSIDE_TILE;
					else if (SRoom)
						char = CHAR_WALL;
					else
						char = CHAR_EMPTY;
					break;

					case SYMBOL_SEE_CORNER:
					if (SEOpen)
						char = CHAR_OUTSIDE_TILE;
					else if (ERoom)
						char = CHAR_WALL;
					else
						char = CHAR_EMPTY;
					break;
					
					case SYMBOL_NORTH_DOOR:
					char = NRoom ? CHAR_HORIZONTAL_DOOR : CHAR_WALL;
					break;
					
					case SYMBOL_EAST_DOOR:
					char = ERoom ? CHAR_VERTICAL_DOOR : CHAR_WALL;
					break;
					
					case SYMBOL_SOUTH_DOOR:
					char = SRoom ? CHAR_HORIZONTAL_DOOR : CHAR_WALL;
					break;
					
					case SYMBOL_WEST_DOOR:
					char = WRoom ? CHAR_VERTICAL_DOOR : CHAR_WALL;
					break;
					
					case SYMBOL_NORTH_HALL:
					char = NRoom ? CHAR_OUTSIDE_TILE : CHAR_EMPTY;
					break;
					
					case SYMBOL_EAST_HALL:
					char = ERoom ? CHAR_OUTSIDE_TILE : CHAR_EMPTY;
					break;
					
					case SYMBOL_SOUTH_HALL:
					char = SRoom ? CHAR_OUTSIDE_TILE : CHAR_EMPTY;
					break;
					
					case SYMBOL_WEST_HALL:
					char = WRoom ? CHAR_OUTSIDE_TILE : CHAR_EMPTY;
					break;
					
					case SYMBOL_FLOOR:
					char = CHAR_FLOOR_TILE;
					break;
					
					case SYMBOL_WALL:
					char = CHAR_WALL;
					break;

					case SYMBOL_GENERATOR_CONSOLE:
					entity = new entity_generator_console(room);
					room.generatorConsole = entity;
					break;

					case SYMBOL_GENERATOR_BLOCK:
					entity = new entity_generator_block(room);
					if (typeof room.generatorBlocks === "undefined")
						room.generatorBlocks = [];
					room.generatorBlocks.push(entity);
					break;

					case SYMBOL_GENERATOR_CORE:
					entity = new entity_generator_core(room);
					if (typeof room.generatorBlocks === "undefined")
						room.generatorBlocks = [];
					room.generatorBlocks.push(entity);
					break;

					case SYMBOL_GENES_CONSOLE:
					entity = objectives[OBJ_GENES].console;
					entity.pos = {x:x, y:y};
					break;

					case SYMBOL_MASTERMIND_CONSOLE:
					entity = objectives[OBJ_MASTERMIND].console;
					break;

					case SYMBOL_MASTERMIND_PIECE:
					entity = new entity_mastermind_piece();
					objectives[OBJ_MASTERMIND].pieces.push(entity);
					objectives[OBJ_MASTERMIND].tilePositions.push({x:x, y:y});
					break;

					case SYMBOL_CITY_OS_DISK:
					entity = new item_os_disk();
					break;

					case SYMBOL_CITY_CONSOLE:
					entity = objectives[OBJ_CITY_OS].console;
					break;

					case SYMBOL_CLONING_VATS:
					entity = new entity_cloning_vat();
					break;

					case SYMBOL_HALF_WALL:
					char = CHAR_HALF_WALL;
					break;
				}
				if (char != CHAR_EMPTY && char != null)
					this.tiles[y][x] = layTile(char, entity);
			}
		}
	}

	this.objectiveTypes = [];
	this.objectiveTypes.push(MAIN_OBJECTIVES.popRandom());
	this.objectiveTypes.push(SIDE_OBJECTIVES.popRandom());
	this.objectiveTypes.push(SIDE_OBJECTIVES.popRandom());
	this.tiles;
	this.roomPos = {x:0, y:0};
	this.npcs = [];
	this.npcs.removeNPCByHash = removeNPCByHash;
	this.npcs.getNPCByHash = getNPCByHash;
	this.lastKnownEnemyPositions = {};
	// pick how many rooms we want
	// var roomAmount = 10 + Math.round(Math.random() * 10);
	this.roomTotal = 25;
	var roomCount = 0;
	// make the 2d array that will fill with rooms
	minimap = new Array(DUNGEON_HEIGHT);
	for (var i = 0; i < DUNGEON_HEIGHT; i++)
		minimap[i] = new RoomArray(DUNGEON_WIDTH, 0);
	// each room has a unique identifier
	var hash = 1;
	// start if off with the center
	var seedRoomPos = {x:Math.round(DUNGEON_WIDTH/2), y:Math.round(DUNGEON_HEIGHT/2), distance: 0}
	this.roomPos.x = seedRoomPos.x, this.roomPos.y = seedRoomPos.y;
	fourXPos.x = this.roomPos.x, fourXPos.y = this.roomPos.y;
	// wow so weird we always start in the cloning vats
	minimap[seedRoomPos.y][seedRoomPos.x].hash = hash++;
	// track so we know how many tiles to use on the big boy map
	var xMax = seedRoomPos.x;
	var xMin = seedRoomPos.x;
	var yMax = seedRoomPos.y;
	var yMin = seedRoomPos.y;
	// objective 
	this.objectiveCandidates = [];
	// var furthestRoomDist = 0;
	// the collection of open positions we will draw from
	var openSet = [seedRoomPos];
	while (roomCount < this.roomTotal && openSet.length > 0) {
		// pick a random element from the openset
		var currentPos = openSet.popWeighted();
		if (currentPos.distance >= 2)
			this.objectiveCandidates.push({hash:hash, x:currentPos.x, y:currentPos.y});
		// get a weighted list of the shapes 
		var validShapes = getValidShapes(currentPos);
		// pick the room shape
		var shape = validShapes.pickWeighted();
		// but start in a 1 x 1 room okay :)
		if (roomCount == 0)
			shape = ROOM_SHAPES[0];
		// fill the grid given the room shape
		for (var i = shape.offsets.length - 1; i >= 0; i--) {
			// get the offset x/y pair 
			var offset = shape.offsets[i];
			var newPos = {x: currentPos.x + offset.x, y: currentPos.y + offset.y};
			// fill the block at current pos + offset
			minimap[newPos.y][newPos.x].hash = hash;
			roomLookup[hash] = new Room(hash);
			roomLookup[hash].seedPos = newPos;
			roomLookup[hash].size = shape.offsets.length;
			roomLookup[hash].shape = shape;
			minimap[newPos.y][newPos.x].powerCost = shape.offsets.length * 5;
			openSet.setRemove(newPos);
			// update all the bounds
			if (newPos.x < xMin)
				xMin = newPos.x;
			else if (newPos.x > xMax)
				xMax = newPos.x;
			if (newPos.y < yMin)
				yMin = newPos.y;
			else if (newPos.y > yMax)
				yMax = newPos.y;
			// if the space is valid and not already occupied
			// left
			if (newPos.x > 0 && minimap[newPos.y][newPos.x - 1].hash == 0)
				openSet.setAdd({x:newPos.x - 1, y:newPos.y, frequency: 0, distance: Math.abs(seedRoomPos.x - (newPos.x - 1)) + Math.abs(seedRoomPos.y - newPos.y)});
			// right
			if (newPos.x < DUNGEON_WIDTH - 1 && minimap[newPos.y][newPos.x + 1].hash == 0)
				openSet.setAdd({x:newPos.x + 1, y:newPos.y, frequency: 0, distance: Math.abs(seedRoomPos.x - (newPos.x + 1)) + Math.abs(seedRoomPos.y - newPos.y)});
			// up
			if (newPos.y > 0 && minimap[newPos.y - 1][newPos.x].hash == 0)
				openSet.setAdd({x:newPos.x, y:newPos.y - 1, frequency: 0, distance: Math.abs(seedRoomPos.x - newPos.x) + Math.abs(seedRoomPos.y - (newPos.y - 1))});
			// down
			if (newPos.y < DUNGEON_HEIGHT - 1 && minimap[newPos.y + 1][newPos.x].hash == 0)
				openSet.setAdd({x:newPos.x, y:newPos.y + 1, frequency: 0, distance: Math.abs(seedRoomPos.x - newPos.x) + Math.abs(seedRoomPos.y - (newPos.y + 1))});
		}
		hash++,	roomCount++;
		// rebuild the heuristics of nodes in the openset
		openSet.update();
	}
	// add factions	
	var room = roomLookup[minimap[seedRoomPos.y][seedRoomPos.x].hash];
	room.event = EVENT_CLONE_HQ;
	room.faction = FACTION_CLONES;
	room.captureAmount = 1;
	room.visited = true;

	var faction = FACTIONS.popRandom();
	for (var i = 2; i > 0; i--) {
		var faction = FACTIONS.popRandom();
		var factionHQ = this.objectiveCandidates.popRandom();	
		room = roomLookup[minimap[factionHQ.y][factionHQ.x].hash];
		switch(faction) {
			case FACTION_ROBOT:
			factions[FACTION_ROBOT] = new faction_robot(factionHQ);
			room.event = EVENT_ROBOT_HQ;
			break;
			case FACTION_ANIMAL:
			factions[FACTION_ANIMAL] = new faction_animal(factionHQ);
			room.event = EVENT_ANIMAL_HQ;
			break;
			case FACTION_SOFTWARE:
			factions[FACTION_SOFTWARE] = new faction_software(factionHQ);
			room.event = EVENT_SOFTWARE_HQ;
			break;
			case FACTION_SURVIVOR:
			factions[FACTION_SURVIVOR] = new faction_survivor(factionHQ);
			room.event = EVENT_SURVIVOR_HQ;
			break;
			case FACTION_HIVEMIND:
			factions[FACTION_HIVEMIND] = new faction_hivemind(factionHQ);
			room.event = EVENT_HIVEMIND_HQ;
			break;
		}
		room.faction = faction;
		room.captureAmount = 1;
	}
	// add objective rooms
	for (var i = this.objectiveTypes.length - 1; i >= 0; i--) {
		var objectivePos = this.objectiveCandidates.popRandom();
		room = roomLookup[minimap[objectivePos.y][objectivePos.x].hash];
		switch(this.objectiveTypes[i]) {
			case OBJ_GENERATORS:
			// update the objective tracking object
			objectives[OBJ_GENERATORS] = new objective_generators();
			for (var i = GENERATORS_MAX - 1; i >= 0; i--) {			
				room.event = EVENT_GENERATOR;
				room.generator = new generator(i + 1);
				objectives[OBJ_GENERATORS].generators.push(room.generator);	
				objectivePos = this.objectiveCandidates.popRandom();
				room = roomLookup[minimap[objectivePos.y][objectivePos.x].hash];			
			}
			break;

			case OBJ_GENES:
			room.event = EVENT_GENES;
			objectives[OBJ_GENES] = new objective_genes();
			break;

			case OBJ_AUX_GENERATOR:
			// room.event = EVENT_AUX_GEN;
			// objectives[OBJ_AUX_GENERATOR] = new objective_aux_generator();
			break;

			case OBJ_MASTERMIND:
			room.event = EVENT_MASTERMIND;
			objectives[OBJ_MASTERMIND] = new objective_mastermind();
			break;

			case OBJ_CITY_OS:
			objectives[OBJ_CITY_OS] = new objective_city_os();
			room.event = EVENT_CITY_HALL;

			objectivePos = this.objectiveCandidates.popRandom();
			room = roomLookup[minimap[objectivePos.y][objectivePos.x].hash];
			room.event = EVENT_CITY_OS;
			break;
		}
	}
	// add flavor rooms
	for (var i = 0; i < 2; i++) {
		var pos = this.objectiveCandidates.popRandom();
		var room = roomLookup[minimap[pos.y][pos.x].hash];
		room.event = FLAVOR_ROOMS.popRandom();
	}
	// set the player position
	player.x = (ROOM_CELL_LENGTH - 1)/ 2 + (seedRoomPos.x - xMin) * ROOM_CELL_LENGTH;
	player.y = (ROOM_CELL_LENGTH - 1)/ 2 + (seedRoomPos.y - yMin) * ROOM_CELL_LENGTH;
	// build dungeon map into tiles
	var height = yMax - yMin + 1;
	var width = xMax - xMin + 1;	
	mapXMin = xMin;
	mapYMin = yMin;
	display_height_minimap = height;
	display_width_minimap = width;
	// length of each wall section
	var wallLength = ROOM_CELL_LENGTH - 2;
	// we will abstract the large map from the condensed minimap
	// this is our bigboy map
	var generatorCount = 0;
	this.tiles = new Array(height * ROOM_CELL_LENGTH);
	for (var i = 0; i < height * ROOM_CELL_LENGTH; i++)
		this.tiles[i] = new TileArray(width * ROOM_CELL_LENGTH);
	// iterate through the minimap, build the megamap
	for (var hash in roomLookup) {
		var room = roomLookup[hash];
		var templates = ROOM_TEMPLATES.NONE_TEMPLATES;
		switch(room.event) {
			case EVENT_GENERATOR:
			templates = ROOM_TEMPLATES.GENERATOR_TEMPLATES;
			room.ppt = 3;
			room.wpt = 3;
			break;

			case EVENT_GENES:
			templates = ROOM_TEMPLATES.GENES_TEMPLATES;
			break;

			case EVENT_MASTERMIND:
			templates = ROOM_TEMPLATES.MASTERMIND_TEMPLATES;
			break;

			case EVENT_CITY_OS:
			templates = ROOM_TEMPLATES.CITY_OS_TEMPLATES;
			break;

			case EVENT_CITY_HALL:
			tempaltes = ROOM_TEMPLATES.CITY_HALL_TEMPLATES;
			break;

			case EVENT_CLONE_HQ:
			templates = ROOM_TEMPLATES.CLONES_HQ_TEMPLATES;
			break;

			case FLAVOR_BANK:
			templates = ROOM_TEMPLATES.BANK_TEMPLATES;
			room.ppt = 1;
			room.wpt = 4;
			break;

			case FLAVOR_SHOP:
			templates = ROOM_TEMPLATES.SHOP_TEMPLATES;
			room.ppt = 0;
			room.wpt = 5;
			break;
		}
		this.buildRoom(room, templates);
	}

	// we visit the seedroom
	minimap[this.roomPos.y][this.roomPos.x].visited = true;

	this.populateInitial = function () {		
		// populate the dungeon with some starting enemies
		var startingUnitAmount = Math.round(Math.random() * 5 + 15);
		for (var i = 0; i < startingUnitAmount; i++) {
			var room = this.objectiveCandidates.peekRandom();
			// pick unit type
			var unitType = STARTING_UNITS.peekRandom();
			// make unit
			factions[FACTION_NONE].units.push(spawn(room, unitType));
		}
	}

	this.getRoom = function() {
		return roomLookup[minimap[this.roomPos.y][this.roomPos.x].hash];
	}

	this.movePlayer = function(pos) {
		// update the players position
		player.x = pos.x;
		player.y = pos.y;
		this.roomPos = {x: mapXMin + Math.round((pos.x - (ROOM_CELL_LENGTH - 1)/ 2) / ROOM_CELL_LENGTH), 
					    y: mapYMin + Math.round((pos.y - (ROOM_CELL_LENGTH - 1)/ 2) / ROOM_CELL_LENGTH)};

		var room = roomLookup[minimap[this.roomPos.y][this.roomPos.x].hash];

		var newTile = this.tiles[pos.y][pos.x];
		if (newTile.inRoom) {
			room.units.push(player);
			disputedRooms.refSetAdd(room);
		}		
		if (!room.visited && newTile.contains(ENTITY_DOOR)) {
			room.visited = true;
		}
		fourXPos = {x: this.roomPos.x, y: this.roomPos.y};		
	}
}

var CHAR_OUTSIDE_TILE = 'o';
function layTile(char, entity) {
	switch (char) {
		case CHAR_FLOOR_TILE: return new FloorTile(true);
		case CHAR_OUTSIDE_TILE: return new FloorTile(false);
		case CHAR_HORIZONTAL_DOOR: return new FloorTile(false, new Door(CHAR_HORIZONTAL_DOOR));
		case CHAR_VERTICAL_DOOR: return new FloorTile(false, new Door(CHAR_VERTICAL_DOOR));
		case CHAR_WALL: return new WallTile(true);
		case CHAR_HALF_WALL: return new WallTile(false);
		default: return new FloorTile(true, entity);
	}
}

function Door(char) {
	this.type = ENTITY_DOOR;
	this.opaque = true;
	this.solid = false;
	this.permanentSolid = false;
	this.char = char;
	this.name = "door";
	this.font = char == CHAR_HORIZONTAL_DOOR ? FONT_STYLE_UNICODE : FONT_STYLE_DEFAULT;
	this.color = COLOR_DEFAULT;
}

function EmptyTile () {
		
	this.viewState = VIEW_STATE_HIDDEN;

	this.entities = [];

	this.getOpaque = function() {
		return false;
	}

	this.getCharAndFont = function() {
		return {char:' ', font:FONT_STYLE_DEFAULT};
	}

	this.getColor = function() {
		return COLOR_DEFAULT;
	}

	this.getSolid = function() {
		return true;
	}

	this.getPermanentSolid = function() {
		return true;
	}

	this.visit = function() {

	}
}

function WallTile (opaque) {
		
	this.viewState = VIEW_STATE_HIDDEN;

	this.entities = [];

	this.opaque = opaque;
	this.char = opaque ? CHAR_WALL : CHAR_HALF_WALL;

	this.getOpaque = function() {
		return this.opaque;
	}

	this.getCharAndFont = function() {
		switch (this.viewState) {
			case VIEW_STATE_HIDDEN:
				return {char:CHAR_HIDDEN, font:FONT_STYLE_DEFAULT};
			break;

			case VIEW_STATE_VISIBLE:
				this.viewState = VIEW_STATE_SEEN;
				return {char:this.char, font:FONT_STYLE_DEFAULT};
			break;

			case VIEW_STATE_SEEN:
				return {char:this.char, font:FONT_STYLE_DEFAULT};
			break;
		}
	}

	this.getColor = function() {
		switch (this.viewState) {
			case VIEW_STATE_HIDDEN:
				return COLOR_OUT_OF_SIGHT;

			case VIEW_STATE_VISIBLE:
				return COLOR_DEFAULT;

			case VIEW_STATE_SEEN:
				return COLOR_OUT_OF_SIGHT;
		}
	}

	this.getSolid = function() {
		return true;
	}

	this.getPermanentSolid = function() {
		return true;
	}

	this.visit = function() {}
}

function FloorTile (inRoom, entity) {
		
	this.viewState = VIEW_STATE_HIDDEN;

	this.inRoom = inRoom;

	this.entities = [];
	if (typeof entity !== 'undefined' && entity != null)
		this.entities.push(entity);

	this.pastEntityHash = null;

	this.getOpaque = function() {
		for (var i = this.entities.length - 1; i >= 0; i--) {
			if (this.entities[i].opaque)
				return true;
		}
		return false;
	}

	this.getCharAndFont = function() {
		switch (this.viewState) {
			case VIEW_STATE_HIDDEN:
				return {char: CHAR_HIDDEN, font: FONT_STYLE_DEFAULT};
			break;

			case VIEW_STATE_VISIBLE:
				if (this.entities.length > 0)
					return {char: this.entities.peek().char, font: FONT_STYLE_DEFAULT};
				else
					return {char: CHAR_FLOOR_TILE, font: FONT_STYLE_DEFAULT};
			break;

			case VIEW_STATE_SEEN:
				// if there is a last-seen entity
				if (this.pastEntityHash != null) {
					var entity = dungeon.npcs.getNPCByHash(this.pastEntityHash);
					if (entity != null && !entity.visible)
						return {char: entity.char, font: entity.font};
					else if (entity == null || entity.visible)
						this.pastEntityHash = null;				
				// if we didn't have a last seen entity or our last seen entity is visible somewhere
				} else {
					// find our next character
					if (this.entities.length != 0) {
						// standard, find most exposed entity's char
						for (var i = this.entities.length - 1; i >= 0; i--) {
							// if we have an enemy that is not visible, dont use it's char
							if (typeof this.entities[i].visible !== 'undefined' && !this.entities[i].visible)
								continue;
							else
								return {char:this.entities[i].char, font:this.entities[i].font};
						}
					}
				}
				// by default we are the floor tile '.'
				return {char: CHAR_FLOOR_TILE, font: FONT_STYLE_DEFAULT};
			break;
		}
	}

	this.getColor = function() {
		switch (this.viewState) {
			case VIEW_STATE_HIDDEN:
				return COLOR_OUT_OF_SIGHT;

			case VIEW_STATE_VISIBLE:
				if (this.entities.length != 0)
					return this.entities.peek().color;
				else 
					return COLOR_DEFAULT;

			case VIEW_STATE_SEEN:
				return COLOR_OUT_OF_SIGHT;
		}
	}

	this.getSolid = function() {
		return (this.entities.length != 0 && this.entities.peek().solid) || this == dungeon.tiles[player.y][player.x];
	}

	this.getPermanentSolid = function() {
		return this.entities.length != 0 && this.entities.peek().permanentSolid;
	}

	this.visit = function() {
		if (this.viewState == VIEW_STATE_VISIBLE) {
			this.pastEntityHash = null;	
			if (this.entities.length > 0 && typeof this.entities.peek().visible !== 'undefined' && this.entities.peek().visible) {
				this.pastEntityHash = this.entities.peek().hash;
				this.entities.peek().visible = false;
			}
			this.viewState = VIEW_STATE_SEEN;
		}
	}

	this.contains = function(entityType) {
		for (var i = this.entities.length - 1; i >= 0; i--) {
			if (this.entities[i].type == entityType)
				return true;
		}
		return false;
	}
}

var EVENT_NONE = "nothing";
var EVENT_CLONE_HQ = "clone_hq";
var EVENT_GENERATOR = "generator";
var EVENT_AUX_GEN = "aux_gen";
var EVENT_GENES = "genes";
var EVENT_MASTERMIND = "mastermind";
var EVENT_CITY_HALL = "city_hall";
var EVENT_CITY_OS = "city_os";
var EVENT_ANIMAL_HQ = "animal_hq";
var EVENT_SURVIVOR_HQ = "survivor_hq";
var EVENT_HIVEMIND_HQ = "hivemind_hq";
var EVENT_SOFTWARE_HQ = "software_hq";
var EVENT_ROBOT_HQ = "robot_hq";

function RoomSegment (hash) {
	this.hash = hash;
}

function Room (hash) {
	this.hash = hash;
	this.powered = false;
	this.visited = false;
	this.event = EVENT_NONE;
	this.faction = FACTION_NONE;
	this.targetFaction = FACTION_NONE;
	this.captureAmount = 0;
	this.captureRequired = 1;
	this.unitsEnroute = [];
	this.units = [];
	this.ppt = 1;
	this.wpt = 1;
}

function rot90C(template, count) {
	var height = template.length;
	var width = height == 2 * ROOM_CELL_LENGTH ? Math.max(template[0].length, template[ROOM_CELL_LENGTH].length) : template[0].length;
	var resultBlueprint = new Array(width);
	var xOffset = height - 1;
	for (var ii = resultBlueprint.length - 1; ii >= 0; ii--) {
		resultBlueprint[ii] = new Array(height);
	}
	for (var iiii = width - 1; iiii >= 0; iiii--) {
		for (var jjjj = height - 1; jjjj >= 0; jjjj--) {
			var char = template[jjjj][iiii];
			switch (char) {				
				case SYMBOL_NE_CORNER:
				char = h;
				break;

				case SYMBOL_NNE_CORNER:
				char = t;
				break;

				case SYMBOL_NEE_CORNER:
				char = r;
				break;
				
				case SYMBOL_NW_CORNER:
				char = b;
				break;

				case SYMBOL_NNW_CORNER:
				char = c;
				break;

				case SYMBOL_NWW_CORNER:
				char = a;
				break;
				
				case SYMBOL_SW_CORNER:
				char = d;
				break;

				case SYMBOL_SSW_CORNER:
				char = m;
				break;

				case SYMBOL_SWW_CORNER:
				char = g;
				break;
				
				case SYMBOL_SE_CORNER:
				char = f;
				break;

				case SYMBOL_SSE_CORNER:
				char = p;
				break;

				case SYMBOL_SEE_CORNER:
				char = q;
				break;
				
				case SYMBOL_NORTH_DOOR:
				char = j;
				break;
				
				case SYMBOL_EAST_DOOR:
				char = k;
				break;
				
				case SYMBOL_SOUTH_DOOR:
				char = l;
				break;
				
				case SYMBOL_WEST_DOOR:
				char = i;
				break;
				
				case SYMBOL_NORTH_HALL:
				char = e;
				break;
				
				case SYMBOL_EAST_HALL:
				char = s;
				break;
				
				case SYMBOL_SOUTH_HALL:
				char = w;
				break;
				
				case SYMBOL_WEST_HALL:
				char = n;
				break;

				default:break;				
			}
			resultBlueprint[iiii][xOffset - jjjj] = char;
		}
	}
	if (count == 1)
		return resultBlueprint;
	else
		return rot90C(resultBlueprint, --count);
}

var SYMBOL_NNE_CORNER = "north_north_east_corner";
var a = "north_north_east_corner";
var SYMBOL_NE_CORNER = "north_east_corner";
var b = "north_east_corner";
var SYMBOL_NEE_CORNER = "north_east_east_corner";
var c = "north_east_east_corner";
var SYMBOL_NW_CORNER = "north_west_corner";
var d = "north_west_corner";
var SYMBOL_EAST_HALL = "east_hall";
var e = "east_hall";
var SYMBOL_SW_CORNER = "south_west_corner";
var f = "south_west_corner";
var SYMBOL_NNW_CORNER = "north_north_west_corner";
var g = "north_north_west_corner";
var SYMBOL_SE_CORNER = "south_east_corner";
var h = "south_east_corner";
var SYMBOL_NORTH_DOOR = "north_door";
var i = "north_door";
var SYMBOL_EAST_DOOR = "east_door";
var j = "east_door";
var SYMBOL_SOUTH_DOOR = "south_door";
var k = "south_door";
var SYMBOL_WEST_DOOR = "west_door";
var l = "west_door";
var SYMBOL_NWW_CORNER = "north_west_west_corner";
var m = "north_west_west_corner";
var SYMBOL_NORTH_HALL = "north_hall";
var n = "north_hall";
var SYMBOL_FLOOR = "floor";
var o = "floor";
var SYMBOL_SWW_CORNER = "south_west_west_corner";
var p = "south_west_west_corner";
var SYMBOL_SSW_CORNER = "south_south_west_corner";
var q = "south_south_west_corner";
var SYMBOL_SSE_CORNER = "south_south_east_corner";
var r = "south_south_east_corner";
var SYMBOL_SOUTH_HALL = "south_hall";
var s = "south_hall";
var SYMBOL_SEE_CORNER = "south_east_east_corner";
var t = "south_east_east_corner";
var SYMBOL_HALF_WALL = "half_wall";
var u = "half_wall";
var SYMBOL_CLONING_VATS = "cloning_vat";
var v = "cloning_vat";
var SYMBOL_WEST_HALL = "west_hall";
var w = "west_hall";
var SYMBOL_WALL = "wall";
var x = "wall";
var SYMBOL_HOIRZONTAL_DOOR = "horizontal_door";
var y = "horizontal_door";
var SYMBOL_VERTICAL_DOOR = "vertical_door";
var z = "vertical_door";
// generator objective
var SYMBOL_GENERATOR_CONSOLE = "generator_console";
var G = "generator_console";
var SYMBOL_GENERATOR_BLOCK = "generator_block";
var B = "generator_block";
var SYMBOL_GENERATOR_CORE = "generator_core";
var Z = "generator_core";
// genes objective
var SYMBOL_GENES_CONSOLE = "genes_console";
var E = "genes_console";
// mastermind objective
var SYMBOL_MASTERMIND_CONSOLE = "mastermind_console";
var M = "mastermind_console";
var SYMBOL_MASTERMIND_PIECE = "mastermind_piece";
var P = "mastermind_piece";
// city os objective
var SYMBOL_CITY_OS_DISK = "city_os_disk";
var C = "city_os_disk";
var SYMBOL_CITY_CONSOLE = "city_console";
var Y = "city_console";

// alright boys 13 x 13
var ROOM_TEMPLATES = {
	NONE_TEMPLATES : {
		1 :[[d,g,n,n,n,n,n,n,n,n,n,a,b],			
			[m,x,x,x,x,x,i,x,x,x,x,x,c],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,l,o,o,o,o,o,o,o,o,o,j,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[p,x,x,x,x,x,k,x,x,x,x,x,t],
			[f,q,s,s,s,s,s,s,s,s,s,r,h]],

		2 :[[d,g,n,n,n,n,n,n,n,n,n,a,b],			
			[m,x,x,x,x,x,i,x,x,x,x,x,c],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,l,o,o,o,o,o,o,o,o,o,j,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[p,x,o,o,o,o,o,o,o,o,o,x,t],
			[f,x,o,o,o,o,o,o,o,o,o,x,h],
			[d,x,o,o,o,o,o,o,o,o,o,x,b],
			[m,x,o,o,o,o,o,o,o,o,o,x,c],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,l,o,o,o,o,o,o,o,o,o,j,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[p,x,x,x,x,x,k,x,x,x,x,x,t],
			[f,q,s,s,s,s,s,s,s,s,s,r,h]],

		3 :[[d,g,n,n,n,n,n,n,n,n,n,a,b],			
			[m,x,x,x,x,x,i,x,x,x,x,x,c],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,l,o,o,o,o,o,o,o,o,o,j,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[p,x,o,o,o,o,o,o,o,o,o,x,e],
			[f,x,o,o,o,o,o,o,o,o,o,x,t],
			[d,x,o,o,o,o,o,o,o,o,o,x,b,g,n,n,n,n,n,n,n,n,n,n,a,b],
			[m,x,o,o,o,o,o,o,o,o,o,x,x,x,x,x,x,x,x,i,x,x,x,x,x,c],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,l,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,j,e],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[p,x,x,x,x,x,k,x,x,x,x,x,x,x,x,x,x,x,x,k,x,x,x,x,x,t],
			[f,q,s,s,s,s,s,s,s,s,s,r,h,f,q,s,s,s,s,s,s,s,s,s,r,h]],

		4 :[[d,g,n,n,n,n,n,n,n,n,n,a,b,d,g,n,n,n,n,n,n,n,n,n,a,b],	
			[m,x,x,x,x,x,i,x,x,x,x,x,x,x,x,x,x,x,x,i,x,x,x,x,x,c],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,l,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,j,e],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[p,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,t],
			[f,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,h],
			[d,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,b],
			[m,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,c],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,l,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,j,e],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[p,x,x,x,x,x,k,x,x,x,x,x,x,x,x,x,x,x,x,k,x,x,x,x,x,t],
			[f,q,s,s,s,s,s,s,s,s,s,r,h,f,q,s,s,s,s,s,s,s,s,s,r,h]]
		},
	GENERATOR_TEMPLATES : {
		1 :[[d,g,n,n,n,n,n,n,n,n,n,a,b],			
			[m,x,x,x,x,x,i,x,x,x,x,x,c],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,x,o,o,o,o,o,x,o,x,e],
			[w,x,o,o,o,o,G,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,l,o,o,o,B,B,B,o,o,o,j,e],
			[w,x,o,o,o,B,Z,B,o,o,o,x,e],
			[w,x,o,o,o,B,B,B,o,o,o,x,e],
			[w,x,o,x,o,o,o,o,o,x,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[p,x,x,x,x,x,k,x,x,x,x,x,t],
			[f,q,s,s,s,s,s,s,s,s,s,r,h]],

		2 :[[d,g,n,n,n,n,n,n,n,n,n,a,b],			
			[m,x,x,x,x,x,i,x,x,x,x,x,c],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,u,x,o,G,o,x,u,o,x,e],
			[w,x,o,o,x,o,o,o,x,o,o,x,e],
			[w,l,o,o,x,u,u,u,x,o,o,j,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,u,o,o,o,o,o,u,o,x,e],
			[w,x,o,u,o,B,B,B,o,u,o,x,e],
			[w,x,o,u,o,B,Z,B,o,u,o,x,e],
			[p,x,o,o,o,B,B,B,o,o,o,x,t],
			[f,x,o,o,o,o,o,o,o,o,o,x,h],
			[d,x,o,o,o,o,o,o,o,o,o,x,b],
			[m,x,o,u,o,B,B,B,o,u,o,x,c],
			[w,x,o,u,o,B,Z,B,o,u,o,x,e],
			[w,x,o,u,o,B,B,B,o,u,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,l,o,o,o,B,B,B,o,o,o,j,e],
			[w,x,o,u,o,B,Z,B,o,u,o,x,e],
			[w,x,o,u,o,B,B,B,o,u,o,x,e],
			[w,x,o,u,o,o,o,o,o,u,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[p,x,x,x,x,x,k,x,x,x,x,x,t],
			[f,q,s,s,s,s,s,s,s,s,s,r,h]],

		3 :[[d,g,n,n,n,n,n,n,n,n,n,a,b],			
			[m,x,x,x,x,x,i,x,x,x,x,x,c],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,B,B,B,B,B,o,o,x,e],
			[w,x,o,o,B,Z,Z,Z,B,o,o,x,e],
			[w,l,o,o,B,Z,Z,Z,B,o,o,j,e],
			[w,x,o,o,B,B,B,B,B,o,o,x,e],
			[w,x,o,o,o,o,u,o,o,o,o,x,e],
			[w,x,o,o,o,o,u,o,o,o,o,x,e],
			[w,x,o,o,B,B,B,B,B,o,o,x,e],
			[p,x,o,o,B,Z,Z,Z,B,o,o,x,e],
			[f,x,o,o,B,Z,Z,Z,B,o,o,x,t],
			[d,x,o,o,B,B,B,B,B,o,o,x,b,g,n,n,n,n,n,n,n,n,n,n,a,b],
			[m,x,o,o,o,o,o,o,o,o,x,x,x,x,x,x,x,x,x,i,x,x,x,x,x,c],
			[w,x,o,o,o,o,o,o,o,o,x,x,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,u,u,u,u,u,o,o,o,B,B,B,B,o,o,B,B,B,B,o,o,x,e],
			[w,x,o,o,o,o,o,o,u,o,o,o,B,Z,Z,B,o,o,B,Z,Z,B,o,o,x,e],
			[w,l,o,x,u,u,x,o,u,o,o,o,B,Z,Z,B,u,u,B,Z,Z,B,o,o,j,e],
			[w,x,o,o,o,o,u,o,u,o,o,o,B,Z,Z,B,o,o,B,Z,Z,B,o,o,x,e],
			[w,x,o,o,G,o,u,o,u,o,o,o,B,B,B,B,o,o,B,B,B,B,o,o,x,e],
			[w,x,o,o,o,o,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[p,x,x,x,x,x,k,x,x,x,x,x,x,x,x,x,x,x,x,k,x,x,x,x,x,t],
			[f,q,s,s,s,s,s,s,s,s,s,r,h,f,q,s,s,s,s,s,s,s,s,s,r,h]],

		4 :[[d,g,n,n,n,n,n,n,n,n,n,a,b,d,g,n,n,n,n,n,n,n,n,n,a,b],	
			[m,x,x,x,x,x,i,x,x,x,x,x,x,x,x,x,x,x,x,i,x,x,x,x,x,c],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,B,B,B,o,o,B,B,B,o,o,B,B,B,o,o,B,B,B,o,o,x,e],
			[w,x,o,o,B,Z,B,o,o,B,Z,B,o,o,B,Z,B,o,o,B,Z,B,o,o,x,e],
			[w,l,o,o,B,B,B,o,o,B,B,B,o,o,B,B,B,o,o,B,B,B,o,o,j,e],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,x,x,u,o,u,u,o,u,x,x,o,o,o,o,o,o,x,e],
			[w,x,o,o,B,B,B,o,x,o,o,o,o,o,o,o,o,x,o,B,B,B,o,o,x,e],
			[w,x,o,o,B,Z,B,o,u,o,x,o,u,u,o,x,o,u,o,B,Z,B,o,o,x,e],
			[p,x,o,o,B,B,B,o,o,o,o,o,o,o,o,o,o,o,o,B,B,B,o,o,x,t],
			[f,x,o,o,o,o,o,o,u,o,u,o,G,u,o,u,o,u,o,o,o,o,o,o,x,h],
			[d,x,o,o,o,o,o,o,u,o,u,o,u,u,o,u,o,u,o,o,o,o,o,o,x,b],
			[m,x,o,o,B,B,B,o,o,o,o,o,o,o,o,o,o,o,o,B,B,B,o,o,x,c],
			[w,x,o,o,B,Z,B,o,u,o,x,o,u,u,o,x,o,u,o,B,Z,B,o,o,x,e],
			[w,x,o,o,B,B,B,o,x,o,o,o,o,o,o,o,o,x,o,B,B,B,o,o,x,e],
			[w,x,o,o,o,o,o,o,x,x,u,o,u,u,o,u,x,x,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,l,o,o,B,B,B,o,o,B,B,B,o,o,B,B,B,o,o,B,B,B,o,o,j,e],
			[w,x,o,o,B,Z,B,o,o,B,Z,B,o,o,B,Z,B,o,o,B,Z,B,o,o,x,e],
			[w,x,o,o,B,B,B,o,o,B,B,B,o,o,B,B,B,o,o,B,B,B,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[p,x,x,x,x,x,k,x,x,x,x,x,x,x,x,x,x,x,x,k,x,x,x,x,x,t],
			[f,q,s,s,s,s,s,s,s,s,s,r,h,f,q,s,s,s,s,s,s,s,s,s,r,h]]
		},
	CITY_HALL_TEMPLATES : {
		1 :[[d,g,n,n,n,n,n,n,n,n,n,a,b],			
			[m,x,x,x,x,x,i,x,x,x,x,x,c],
			[w,x,o,o,o,o,o,u,o,o,o,x,e],
			[w,x,o,u,o,o,o,o,o,x,o,x,e],
			[w,x,o,u,o,o,u,o,Y,o,o,x,e],
			[w,x,o,o,o,o,u,o,o,o,u,x,e],
			[w,l,o,u,o,o,u,u,u,o,o,j,e],
			[w,x,o,u,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,x,o,u,u,o,u,u,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[p,x,x,x,x,x,k,x,x,x,x,x,t],
			[f,q,s,s,s,s,s,s,s,s,s,r,h]],

		2 :[[d,g,n,n,n,n,n,n,n,n,n,a,b],			
			[m,x,x,x,x,x,i,x,x,x,x,x,c],
			[w,x,o,Y,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,u,u,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,x,u,u,x,p,x,u,u,x,x,e],
			[w,l,o,o,o,o,o,o,o,o,o,j,e],
			[w,x,o,o,o,o,o,o,u,u,o,x,e],
			[w,x,o,o,o,o,x,o,o,o,o,x,e],
			[w,x,o,u,u,o,o,o,u,u,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[p,x,o,u,u,o,o,o,u,u,o,x,t],
			[f,x,o,o,o,o,x,o,o,o,o,x,h],
			[d,x,o,u,u,o,o,o,u,u,o,x,b],
			[m,x,o,o,o,o,o,o,o,o,o,x,c],
			[w,x,o,o,o,o,x,o,o,o,o,x,e],
			[w,x,o,o,o,x,x,x,o,o,o,x,e],
			[w,x,o,o,o,o,x,o,o,o,o,x,e],
			[w,x,o,u,u,o,o,o,u,u,o,x,e],
			[w,l,o,o,o,o,o,o,o,o,o,j,e],
			[w,x,o,u,u,o,o,o,u,u,o,x,e],
			[w,x,o,o,o,o,x,o,o,o,o,x,e],
			[w,x,o,u,u,o,o,o,u,u,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[p,x,x,x,x,x,k,x,x,x,x,x,t],
			[f,q,s,s,s,s,s,s,s,s,s,r,h]],

		3 :[[d,g,n,n,n,n,n,n,n,n,n,a,b],			
			[m,x,x,x,x,x,i,x,x,x,x,x,c],
			[w,x,o,o,u,u,o,u,u,o,o,x,e],
			[w,x,u,o,o,o,o,o,o,o,u,x,e],
			[w,x,u,o,o,o,u,o,o,o,u,x,e],
			[w,x,o,o,u,o,u,o,u,o,o,x,e],
			[w,l,o,o,u,o,o,o,u,o,o,j,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,u,o,o,o,u,o,o,o,u,x,e],
			[w,x,u,o,u,o,u,o,u,o,u,x,e],
			[w,x,o,o,u,o,o,o,u,o,o,x,e],
			[p,x,o,o,o,o,o,o,o,o,o,x,e],
			[f,x,o,o,o,o,u,o,o,o,o,x,t],
			[d,x,o,u,u,o,u,o,u,u,o,x,b,g,n,n,n,n,n,n,n,n,n,n,a,b],
			[m,x,o,o,o,o,o,o,o,o,o,x,x,x,x,x,x,x,x,i,x,x,x,x,x,c],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,u,u,o,o,o,u,u,o,x,e],
			[w,x,x,x,y,x,u,u,x,x,o,o,u,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,x,o,o,u,o,o,u,u,o,o,u,u,o,o,u,x,e],
			[w,x,o,o,o,u,o,u,o,u,o,o,o,o,o,o,o,o,o,o,o,o,o,u,x,e],
			[w,l,o,o,o,o,u,o,o,u,o,o,u,u,o,o,u,u,o,o,u,u,o,o,j,e],
			[w,x,o,o,o,o,o,u,o,x,o,o,o,o,o,o,o,o,o,o,o,o,o,u,x,e],
			[w,x,o,o,o,o,o,o,o,z,o,o,u,o,o,u,u,o,o,u,u,o,o,u,x,e],
			[w,x,u,Y,o,o,o,o,o,x,o,o,u,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,u,u,o,o,o,o,o,x,o,o,o,o,o,o,u,u,o,o,o,u,u,o,x,e],
			[p,x,x,x,x,x,k,x,x,x,x,x,x,x,x,x,x,x,x,k,x,x,x,x,x,t],
			[f,q,s,s,s,s,s,s,s,s,s,r,h,f,q,s,s,s,s,s,s,s,s,s,r,h]],

		4 :[[d,g,n,n,n,n,n,n,n,n,n,a,b,d,g,n,n,n,n,n,n,n,n,n,a,b],	
			[m,x,x,x,x,x,i,x,x,x,x,x,x,x,x,x,x,x,x,i,x,x,x,x,x,c],
			[w,x,o,o,o,o,o,o,x,o,o,o,x,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,x,o,o,o,x,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,z,o,o,o,z,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,x,o,o,o,x,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,l,o,o,o,o,o,o,x,o,o,o,x,o,o,o,o,o,o,o,o,o,o,o,j,e],
			[w,x,o,o,o,o,o,o,x,o,o,o,x,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,x,x,y,x,x,x,x,o,o,o,x,x,x,x,x,y,x,x,x,x,y,x,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[p,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,t],
			[f,x,x,x,y,x,x,x,x,o,o,o,x,x,x,x,x,y,x,x,x,x,y,x,x,h],
			[d,x,o,o,o,o,o,o,x,o,o,o,x,o,o,o,o,o,o,o,o,o,o,o,x,b],
			[m,x,o,o,o,o,o,o,x,o,o,o,x,o,o,o,o,o,o,o,o,o,o,o,x,c],
			[w,x,o,o,o,o,o,o,x,o,o,o,x,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,x,x,y,x,x,x,x,o,o,o,x,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,x,o,o,o,x,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,x,o,o,o,x,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,l,o,o,o,o,o,o,x,o,o,o,x,o,o,o,o,o,o,o,o,o,o,o,j,e],
			[w,x,o,o,o,o,o,o,x,o,o,o,x,x,y,x,x,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,x,o,o,o,x,o,o,o,x,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,x,o,o,o,x,o,o,o,x,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,x,o,o,o,x,o,Y,o,x,o,o,o,o,o,o,o,x,e],
			[p,x,x,x,x,x,k,x,x,x,x,x,x,x,x,x,x,x,x,k,x,x,x,x,x,t],
			[f,q,s,s,s,s,s,s,s,s,s,r,h,f,q,s,s,s,s,s,s,s,s,s,r,h]]
		},
	CITY_OS_TEMPLATES : {
		1 :[[d,g,n,n,n,n,n,n,n,n,n,a,b],			
			[m,x,x,x,x,x,i,x,x,x,x,x,c],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,l,o,o,o,o,C,o,o,o,o,j,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[p,x,x,x,x,x,k,x,x,x,x,x,t],
			[f,q,s,s,s,s,s,s,s,s,s,r,h]],

		2 :[[d,g,n,n,n,n,n,n,n,n,n,a,b],			
			[m,x,x,x,x,x,i,x,x,x,x,x,c],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,l,o,o,o,o,C,o,o,o,o,j,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[p,x,o,o,o,o,o,o,o,o,o,x,t],
			[f,x,o,o,o,o,o,o,o,o,o,x,h],
			[d,x,o,o,o,o,o,o,o,o,o,x,b],
			[m,x,o,o,o,o,o,o,o,o,o,x,c],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,l,o,o,o,o,o,o,o,o,o,j,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[p,x,x,x,x,x,k,x,x,x,x,x,t],
			[f,q,s,s,s,s,s,s,s,s,s,r,h]],

		3 :[[d,g,n,n,n,n,n,n,n,n,n,a,b],			
			[m,x,x,x,x,x,i,x,x,x,x,x,c],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,l,o,o,o,o,o,o,o,o,o,j,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[p,x,o,o,o,o,o,o,o,o,o,x,e],
			[f,x,o,o,o,o,o,o,o,o,o,x,t],
			[d,x,o,o,o,o,o,o,o,o,o,x,b,g,n,n,n,n,n,n,n,n,n,n,a,b],
			[m,x,o,o,o,o,o,o,o,o,o,x,x,x,x,x,x,x,x,i,x,x,x,x,x,c],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,l,o,o,o,o,C,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,j,e],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[p,x,x,x,x,x,k,x,x,x,x,x,x,x,x,x,x,x,x,k,x,x,x,x,x,t],
			[f,q,s,s,s,s,s,s,s,s,s,r,h,f,q,s,s,s,s,s,s,s,s,s,r,h]],

		4 :[[d,g,n,n,n,n,n,n,n,n,n,a,b,d,g,n,n,n,n,n,n,n,n,n,a,b],	
			[m,x,x,x,x,x,i,x,x,x,x,x,x,x,x,x,x,x,x,i,x,x,x,x,x,c],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,l,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,j,e],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[p,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,t],
			[f,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,h],
			[d,x,o,o,o,o,o,o,o,o,o,o,C,o,o,o,o,o,o,o,o,o,o,o,x,b],
			[m,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,c],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,l,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,j,e],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[p,x,x,x,x,x,k,x,x,x,x,x,x,x,x,x,x,x,x,k,x,x,x,x,x,t],
			[f,q,s,s,s,s,s,s,s,s,s,r,h,f,q,s,s,s,s,s,s,s,s,s,r,h]]
		},
	GENES_TEMPLATES : {
		1 :[[d,g,n,n,n,n,n,n,n,n,n,a,b],			
			[m,x,x,x,x,x,i,x,x,x,x,x,c],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,l,o,o,o,o,E,o,o,o,o,j,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[p,x,x,x,x,x,k,x,x,x,x,x,t],
			[f,q,s,s,s,s,s,s,s,s,s,r,h]],

		2 :[[d,g,n,n,n,n,n,n,n,n,n,a,b],			
			[m,x,x,x,x,x,i,x,x,x,x,x,c],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,l,o,o,o,o,E,o,o,o,o,j,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[p,x,o,o,o,o,o,o,o,o,o,x,t],
			[f,x,o,o,o,o,o,o,o,o,o,x,h],
			[d,x,o,o,o,o,o,o,o,o,o,x,b],
			[m,x,o,o,o,o,o,o,o,o,o,x,c],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,l,o,o,o,o,o,o,o,o,o,j,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[p,x,x,x,x,x,k,x,x,x,x,x,t],
			[f,q,s,s,s,s,s,s,s,s,s,r,h]],

		3 :[[d,g,n,n,n,n,n,n,n,n,n,a,b],			
			[m,x,x,x,x,x,i,x,x,x,x,x,c],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,l,o,o,o,o,o,o,o,o,o,j,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[p,x,o,o,o,o,o,o,o,o,o,x,e],
			[f,x,o,o,o,o,o,o,o,o,o,x,t],
			[d,x,o,o,o,o,o,o,o,o,o,x,b,g,n,n,n,n,n,n,n,n,n,n,a,b],
			[m,x,o,o,o,o,o,o,o,o,o,x,x,x,x,x,x,x,x,i,x,x,x,x,x,c],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,l,o,o,o,o,E,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,j,e],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[p,x,x,x,x,x,k,x,x,x,x,x,x,x,x,x,x,x,x,k,x,x,x,x,x,t],
			[f,q,s,s,s,s,s,s,s,s,s,r,h,f,q,s,s,s,s,s,s,s,s,s,r,h]],

		4 :[[d,g,n,n,n,n,n,n,n,n,n,a,b,d,g,n,n,n,n,n,n,n,n,n,a,b],	
			[m,x,x,x,x,x,i,x,x,x,x,x,x,x,x,x,x,x,x,i,x,x,x,x,x,c],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,l,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,j,e],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,E,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[p,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,t],
			[f,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,h],
			[d,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,b],
			[m,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,c],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,l,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,j,e],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[p,x,x,x,x,x,k,x,x,x,x,x,x,x,x,x,x,x,x,k,x,x,x,x,x,t],
			[f,q,s,s,s,s,s,s,s,s,s,r,h,f,q,s,s,s,s,s,s,s,s,s,r,h]]
		},
	MASTERMIND_TEMPLATES : {
		1 :[[d,g,n,n,n,n,n,n,n,n,n,a,b],			
			[m,x,x,x,x,x,i,x,x,x,x,x,c],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,P,o,o,o,o,P,o,x,e],
			[w,l,o,o,o,o,M,o,o,o,o,j,e],
			[w,x,o,P,o,o,o,o,P,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[p,x,x,x,x,x,k,x,x,x,x,x,t],
			[f,q,s,s,s,s,s,s,s,s,s,r,h]],

		2 :[[d,g,n,n,n,n,n,n,n,n,n,a,b],			
			[m,x,x,x,x,x,i,x,x,x,x,x,c],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,P,o,o,o,o,o,P,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,l,o,o,o,o,M,o,o,o,o,j,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,P,o,o,o,o,o,P,o,x,e],
			[p,x,o,o,o,o,o,o,o,o,o,x,t],
			[f,x,o,o,o,o,o,o,o,o,o,x,h],
			[d,x,o,o,o,o,o,o,o,o,o,x,b],
			[m,x,o,o,o,o,o,o,o,o,o,x,c],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,l,o,o,o,o,o,o,o,o,o,j,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[p,x,x,x,x,x,k,x,x,x,x,x,t],
			[f,q,s,s,s,s,s,s,s,s,s,r,h]],

		3 :[[d,g,n,n,n,n,n,n,n,n,n,a,b],			
			[m,x,x,x,x,x,i,x,x,x,x,x,c],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,l,o,o,o,o,o,o,o,o,o,j,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[p,x,o,o,o,o,o,o,o,o,o,x,e],
			[f,x,o,o,o,o,o,o,o,o,o,x,t],
			[d,x,o,o,o,o,o,o,o,o,o,x,b,g,n,n,n,n,n,n,n,n,n,n,a,b],
			[m,x,o,o,o,o,o,o,o,o,o,x,x,x,x,x,x,x,x,i,x,x,x,x,x,c],
			[w,x,o,o,o,P,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,P,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,l,o,o,o,o,M,o,o,P,o,o,o,o,o,o,o,o,o,o,o,o,o,o,j,e],
			[w,x,o,o,o,o,o,o,o,o,P,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[p,x,x,x,x,x,k,x,x,x,x,x,x,x,x,x,x,x,x,k,x,x,x,x,x,t],
			[f,q,s,s,s,s,s,s,s,s,s,r,h,f,q,s,s,s,s,s,s,s,s,s,r,h]],

		4 :[[d,g,n,n,n,n,n,n,n,n,n,a,b,d,g,n,n,n,n,n,n,n,n,n,a,b],	
			[m,x,x,x,x,x,i,x,x,x,x,x,x,x,x,x,x,x,x,i,x,x,x,x,x,c],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,P,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,l,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,j,e],
			[w,x,o,P,o,o,M,o,o,P,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,P,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[p,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,t],
			[f,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,h],
			[d,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,b],
			[m,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,c],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,l,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,j,e],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[p,x,x,x,x,x,k,x,x,x,x,x,x,x,x,x,x,x,x,k,x,x,x,x,x,t],
			[f,q,s,s,s,s,s,s,s,s,s,r,h,f,q,s,s,s,s,s,s,s,s,s,r,h]]
		},
	CLONES_HQ_TEMPLATES :{
		1 :[[d,g,n,n,n,n,n,n,n,n,n,a,b],			
			[m,x,x,x,x,x,i,x,x,x,x,x,c],
			[w,x,v,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,l,o,o,o,o,o,o,o,o,o,j,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[p,x,x,x,x,x,k,x,x,x,x,x,t],
			[f,q,s,s,s,s,s,s,s,s,s,r,h]],

		2 :[[d,g,n,n,n,n,n,n,n,n,n,a,b],			
			[m,x,x,x,x,x,i,x,x,x,x,x,c],
			[w,x,v,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,l,o,o,o,o,o,o,o,o,o,j,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[p,x,o,o,o,o,o,o,o,o,o,x,t],
			[f,x,o,o,o,o,o,o,o,o,o,x,h],
			[d,x,o,o,o,o,o,o,o,o,o,x,b],
			[m,x,o,o,o,o,o,o,o,o,o,x,c],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,l,o,o,o,o,o,o,o,o,o,j,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[p,x,x,x,x,x,k,x,x,x,x,x,t],
			[f,q,s,s,s,s,s,s,s,s,s,r,h]],

		3 :[[d,g,n,n,n,n,n,n,n,n,n,a,b],			
			[m,x,x,x,x,x,i,x,x,x,x,x,c],
			[w,x,v,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,l,o,o,o,o,o,o,o,o,o,j,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[p,x,o,o,o,o,o,o,o,o,o,x,e],
			[f,x,o,o,o,o,o,o,o,o,o,x,t],
			[d,x,o,o,o,o,o,o,o,o,o,x,b,g,n,n,n,n,n,n,n,n,n,n,a,b],
			[m,x,o,o,o,o,o,o,o,o,o,x,x,x,x,x,x,x,x,i,x,x,x,x,x,c],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,l,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,j,e],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[p,x,x,x,x,x,k,x,x,x,x,x,x,x,x,x,x,x,x,k,x,x,x,x,x,t],
			[f,q,s,s,s,s,s,s,s,s,s,r,h,f,q,s,s,s,s,s,s,s,s,s,r,h]],

		4 :[[d,g,n,n,n,n,n,n,n,n,n,a,b,d,g,n,n,n,n,n,n,n,n,n,a,b],	
			[m,x,x,x,x,x,i,x,x,x,x,x,x,x,x,x,x,x,x,i,x,x,x,x,x,c],
			[w,x,v,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,l,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,j,e],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[p,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,t],
			[f,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,h],
			[d,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,b],
			[m,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,c],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,l,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,j,e],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[p,x,x,x,x,x,k,x,x,x,x,x,x,x,x,x,x,x,x,k,x,x,x,x,x,t],
			[f,q,s,s,s,s,s,s,s,s,s,r,h,f,q,s,s,s,s,s,s,s,s,s,r,h]]
		},
	BANK_TEMPLATES : {
		1 :[[d,g,n,n,n,n,n,n,n,n,n,a,b],			
			[m,x,x,x,x,x,i,x,x,x,x,x,c],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,l,o,o,o,o,o,o,o,o,o,j,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[p,x,x,x,x,x,k,x,x,x,x,x,t],
			[f,q,s,s,s,s,s,s,s,s,s,r,h]],

		2 :[[d,g,n,n,n,n,n,n,n,n,n,a,b],			
			[m,x,x,x,x,x,i,x,x,x,x,x,c],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,l,o,o,o,o,o,o,o,o,o,j,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[p,x,o,o,o,o,o,o,o,o,o,x,t],
			[f,x,o,o,o,o,o,o,o,o,o,x,h],
			[d,x,o,o,o,o,o,o,o,o,o,x,b],
			[m,x,o,o,o,o,o,o,o,o,o,x,c],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,l,o,o,o,o,o,o,o,o,o,j,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[p,x,x,x,x,x,k,x,x,x,x,x,t],
			[f,q,s,s,s,s,s,s,s,s,s,r,h]],

		3 :[[d,g,n,n,n,n,n,n,n,n,n,a,b],			
			[m,x,x,x,x,x,i,x,x,x,x,x,c],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,l,o,o,o,o,o,o,o,o,o,j,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[p,x,o,o,o,o,o,o,o,o,o,x,e],
			[f,x,o,o,o,o,o,o,o,o,o,x,t],
			[d,x,o,o,o,o,o,o,o,o,o,x,b,g,n,n,n,n,n,n,n,n,n,n,a,b],
			[m,x,o,o,o,o,o,o,o,o,o,x,x,x,x,x,x,x,x,i,x,x,x,x,x,c],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,l,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,j,e],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[p,x,x,x,x,x,k,x,x,x,x,x,x,x,x,x,x,x,x,k,x,x,x,x,x,t],
			[f,q,s,s,s,s,s,s,s,s,s,r,h,f,q,s,s,s,s,s,s,s,s,s,r,h]],

		4 :[[d,g,n,n,n,n,n,n,n,n,n,a,b,d,g,n,n,n,n,n,n,n,n,n,a,b],	
			[m,x,x,x,x,x,i,x,x,x,x,x,x,x,x,x,x,x,x,i,x,x,x,x,x,c],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,l,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,j,e],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[p,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,t],
			[f,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,h],
			[d,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,b],
			[m,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,c],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,l,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,j,e],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[p,x,x,x,x,x,k,x,x,x,x,x,x,x,x,x,x,x,x,k,x,x,x,x,x,t],
			[f,q,s,s,s,s,s,s,s,s,s,r,h,f,q,s,s,s,s,s,s,s,s,s,r,h]]
		},
	SHOP_TEMPLATES : {
		1 :[[d,g,n,n,n,n,n,n,n,n,n,a,b],			
			[m,x,x,x,x,x,i,x,x,x,x,x,c],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,l,o,o,o,o,o,o,o,o,o,j,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[p,x,x,x,x,x,k,x,x,x,x,x,t],
			[f,q,s,s,s,s,s,s,s,s,s,r,h]],

		2 :[[d,g,n,n,n,n,n,n,n,n,n,a,b],			
			[m,x,x,x,x,x,i,x,x,x,x,x,c],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,l,o,o,o,o,o,o,o,o,o,j,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[p,x,o,o,o,o,o,o,o,o,o,x,t],
			[f,x,o,o,o,o,o,o,o,o,o,x,h],
			[d,x,o,o,o,o,o,o,o,o,o,x,b],
			[m,x,o,o,o,o,o,o,o,o,o,x,c],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,l,o,o,o,o,o,o,o,o,o,j,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[p,x,x,x,x,x,k,x,x,x,x,x,t],
			[f,q,s,s,s,s,s,s,s,s,s,r,h]],

		3 :[[d,g,n,n,n,n,n,n,n,n,n,a,b],			
			[m,x,x,x,x,x,i,x,x,x,x,x,c],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,l,o,o,o,o,o,o,o,o,o,j,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,x,e],
			[p,x,o,o,o,o,o,o,o,o,o,x,e],
			[f,x,o,o,o,o,o,o,o,o,o,x,t],
			[d,x,o,o,o,o,o,o,o,o,o,x,b,g,n,n,n,n,n,n,n,n,n,n,a,b],
			[m,x,o,o,o,o,o,o,o,o,o,x,x,x,x,x,x,x,x,i,x,x,x,x,x,c],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,l,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,j,e],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[p,x,x,x,x,x,k,x,x,x,x,x,x,x,x,x,x,x,x,k,x,x,x,x,x,t],
			[f,q,s,s,s,s,s,s,s,s,s,r,h,f,q,s,s,s,s,s,s,s,s,s,r,h]],

		4 :[[d,g,n,n,n,n,n,n,n,n,n,a,b,d,g,n,n,n,n,n,n,n,n,n,a,b],	
			[m,x,x,x,x,x,i,x,x,x,x,x,x,x,x,x,x,x,x,i,x,x,x,x,x,c],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,l,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,j,e],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[p,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,t],
			[f,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,h],
			[d,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,b],
			[m,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,c],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,l,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,j,e],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
			[p,x,x,x,x,x,k,x,x,x,x,x,x,x,x,x,x,x,x,k,x,x,x,x,x,t],
			[f,q,s,s,s,s,s,s,s,s,s,r,h,f,q,s,s,s,s,s,s,s,s,s,r,h]]
		}
}

function shapesEqual(shape1, shape2) {
	for (var i = shape1.offsets.length - 1; i >= 0; i--) {
		var offset1 = shape1.offsets[i];
		if (i >= shape2.length)
			return false;
		var offset2 = shape2.offsets[i];
		if (offset1.x != offset2.x || offset1.y != offset2.y)
			return false;
	}
	return shape1.offsets.length == shape2.offsets.length;
}