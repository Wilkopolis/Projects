/*				Constants					*/

// heuristic for map generation
var ADJACENT_ROOM_MULTIPLIER = 3;

// dungeon generation stuff
var DUNGEON_HEIGHT = 17;
var DUNGEON_WIDTH = 17;

// difficulty
var hardMode = false;

// flavor rooms
var FLAVOR_BANK = 'bank';
var FLAVOR_SHOP = 'shop';
var FLAVOR_KENNEL = 'kennel';
// var FLAVOR_CASINO = 'casino'; // GAMBLE
// var FLAVOR_PHARMACY = 'pharmacy'; // make your own pills
// var FLAVOR_GROCERY = 'grocery'; // has a bunch of potions
var FLAVOR_VAULT = 'vault'; // if we have a vault, give units a 1/1000 chance to drop a key
var FLAVOR_LIBRARY = 'library'; // books that give you +attack style or stats or crit chance
var FLAVOR_SUN_ROOM = 'sun_room' // toggles between day/night
var FLAVOR_ROOMS = [{type: FLAVOR_BANK, sizes: [1,2], frequency:4}, {type: FLAVOR_SHOP, sizes: [1,2], frequency:4},
{type: FLAVOR_KENNEL, sizes: [1], frequency:5}, {type: FLAVOR_SUN_ROOM, sizes: [1,2], frequency:3}, 
{type: FLAVOR_VAULT, sizes: [1,3,4], frequency:3}, {type: FLAVOR_LIBRARY, sizes: [1,2,3,4], frequency:4}
];
// , {type: FLAVOR_GROCERY, sizes: [1,2], frequency:5}];

// for resources
var roomLookup = {};
// for player auto explor
var unvisitedSegments = [];

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
		// if the room is interesting, we stop when exploring
		room.interesting = templates.interesting;
		room.discoverText = templates.discoverText;
		// orient the template how we want it
		var tiles;
		switch (room.size) {
			case 1:
			var blueprints = templates[1];
			var blueprint = blueprints.peekWeighted();
			tiles = blueprint.tiles;
			room.isRoom = blueprint.isRoom;
			var number = gaussian();
			var wpt;
			if (number < .14)
				wpt = 1;
			else if (number < .22)
				wpt = 2;
			else if (number < .3)
				wpt = 0;
			else if (number <= 1)
				wpt = 3;
			room.wpt = wpt;
			break;
			case 2:
			var blueprints = templates[2];
			var blueprint = blueprints.peekWeighted();
			tiles = blueprint.tiles;
			room.isRoom = blueprint.isRoom;
			// apply any transposes we need
			if (shapesEqual(room.shape, ROOM_SHAPES[2])) {
				tiles = rot90C(tiles, 2, room);
				room.seedPos.y -= 1;
			} 
			else if (shapesEqual(room.shape, ROOM_SHAPES[3])) {
				tiles = rot90C(tiles, 1, room);
			} 
			else if (shapesEqual(room.shape, ROOM_SHAPES[4])) {
				tiles = rot90C(tiles, 1, room);
				room.seedPos.x -= 1;
			}
			var number = gaussian();
			var wpt;
			if (number < .14)
				wpt = 2;
			else if (number < .22)
				wpt = 3;
			else if (number < .3)
				wpt = 1;
			else if (number <= 1)
				wpt = 4;
			room.wpt = wpt;
			break;
			case 3:
			var blueprints = templates[3];
			var blueprint = blueprints.peekWeighted();
			tiles = blueprint.tiles;
			room.isRoom = blueprint.isRoom;
			// apply any transposes we need
			if (shapesEqual(room.shape, ROOM_SHAPES[9])) {
				tiles = rot90C(tiles, 3, room);
				room.seedPos.y -= 1;
			} else if (shapesEqual(room.shape, ROOM_SHAPES[10])) {
				tiles = rot90C(tiles, 3, room);
				room.seedPos.x -= 1;
				room.seedPos.y -= 1;
			} else if (shapesEqual(room.shape, ROOM_SHAPES[11])) {
				room.seedPos.x -= 1;
				tiles = rot90C(tiles, 3, room);
			} else if (shapesEqual(room.shape, ROOM_SHAPES[12])) {
				tiles = rot90C(tiles, 1, room);
				room.seedPos.y -= 1;
			} else if (shapesEqual(room.shape, ROOM_SHAPES[13])) {
				tiles = rot90C(tiles, 1, room);
			} else if (shapesEqual(room.shape, ROOM_SHAPES[14])) {
				tiles = rot90C(tiles, 1, room);
				room.seedPos.x -= 1;
			} else if (shapesEqual(room.shape, ROOM_SHAPES[15])) {
				tiles = rot90C(tiles, 2, room);
			} else if (shapesEqual(room.shape, ROOM_SHAPES[16])) {
				tiles = rot90C(tiles, 2, room);
				room.seedPos.x -= 1;
			} else if (shapesEqual(room.shape, ROOM_SHAPES[17])) {
				tiles = rot90C(tiles, 2, room);
				room.seedPos.x -= 1;
				room.seedPos.y -= 1;
			} else if (shapesEqual(room.shape, ROOM_SHAPES[19])) {
				room.seedPos.y -= 1;
			} else if (shapesEqual(room.shape, ROOM_SHAPES[20])) {
				room.seedPos.x -= 1;
				room.seedPos.y -= 1;
			}
			var number = gaussian();
			var wpt;
			if (number < .14)
				wpt = 3;
			else if (number < .22)
				wpt = 4;
			else if (number < .3)
				wpt = 2;
			else if (number <= 1)
				wpt = 5;
			room.wpt = wpt;
			break;
			// size 1 or 4, pick 1 of 4 rotations
			default:
			var blueprints = templates[4];
			var blueprint = blueprints.peekWeighted();
			tiles = blueprint.tiles;
			room.isRoom = blueprint.isRoom;
			if (shapesEqual(room.shape, ROOM_SHAPES[5])) {
				room.seedPos.y -= 1;
			} else if (shapesEqual(room.shape, ROOM_SHAPES[6])) {
				room.seedPos.x -= 1;
				room.seedPos.y -= 1;
			} else if (shapesEqual(room.shape, ROOM_SHAPES[7])) {
				room.seedPos.x -= 1;
			}
			var number = gaussian();
			var wpt;
			if (number < .14)
				wpt = 4;
			else if (number < .22)
				wpt = 5;
			else if (number < .3)
				wpt = 3;
			else if (number <= 1)
				wpt = 6;
			room.wpt = wpt;
			room.power = 2;
			break;
		}

		this.applyBlueprint(room, tiles);
	}

	// this guy has to be the monster
	this.applyBlueprint = function(room, template) {
		var seedPos = room.seedPos;
		var seedRoomCenter = {x: (ROOM_CELL_LENGTH - 1)/ 2 + ((seedPos.x - mapXMin) * ROOM_CELL_LENGTH), y: (ROOM_CELL_LENGTH - 1)/ 2 + ((seedPos.y - mapYMin) * ROOM_CELL_LENGTH)};
		var topLeft = {x: seedRoomCenter.x - (ROOM_CELL_LENGTH - 1)/ 2, y: seedRoomCenter.y - (ROOM_CELL_LENGTH - 1)/ 2};
		
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
				var blink = true;
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
						char = CHAR_WALL;
					break;

					case SYMBOL_NNE_CORNER:
					if (NEOpen)
						char = CHAR_OUTSIDE_TILE;
					else if (NRoom)
						char = CHAR_WALL;
					else
						char = CHAR_WALL;
					break;

					case SYMBOL_NEE_CORNER:
					if (NEOpen)
						char = CHAR_OUTSIDE_TILE;
					else if (ERoom)
						char = CHAR_WALL;
					else
						char = CHAR_WALL;
					break;
					
					case SYMBOL_NW_CORNER:
					if (NWOpen)
						char = CHAR_OUTSIDE_TILE;
					else if (NRoom)
						char = CHAR_WALL;
					else
						char = CHAR_WALL;
					break;

					case SYMBOL_NNW_CORNER:
					if (NWOpen)
						char = CHAR_OUTSIDE_TILE;
					else if (NRoom)
						char = CHAR_WALL;
					else
						char = CHAR_WALL;
					break;

					case SYMBOL_NWW_CORNER:
					if (NWOpen)
						char = CHAR_OUTSIDE_TILE;
					else if (WRoom)
						char = CHAR_WALL;
					else
						char = CHAR_WALL;
					break;
					
					case SYMBOL_SW_CORNER:
					if (SWOpen)
						char = CHAR_OUTSIDE_TILE;
					else if (SRoom)
						char = CHAR_WALL;
					else
						char = CHAR_WALL;
					break;

					case SYMBOL_SSW_CORNER:
					if (SWOpen)
						char = CHAR_OUTSIDE_TILE;
					else if (SRoom)
						char = CHAR_WALL;
					else
						char = CHAR_WALL;
					break;

					case SYMBOL_SWW_CORNER:
					if (SWOpen)
						char = CHAR_OUTSIDE_TILE;
					else if (WRoom)
						char = CHAR_WALL;
					else
						char = CHAR_WALL;
					break;
					
					case SYMBOL_SE_CORNER:
					if (SEOpen)
						char = CHAR_OUTSIDE_TILE;
					else if (SRoom)
						char = CHAR_WALL;
					else
						char = CHAR_WALL;
					break;

					case SYMBOL_SSE_CORNER:
					if (SEOpen)
						char = CHAR_OUTSIDE_TILE;
					else if (SRoom)
						char = CHAR_WALL;
					else
						char = CHAR_WALL;
					break;

					case SYMBOL_SEE_CORNER:
					if (SEOpen)
						char = CHAR_OUTSIDE_TILE;
					else if (ERoom)
						char = CHAR_WALL;
					else
						char = CHAR_WALL;
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
					char = NRoom ? CHAR_OUTSIDE_TILE : CHAR_WALL;
					break;
					
					case SYMBOL_EAST_HALL:
					char = ERoom ? CHAR_OUTSIDE_TILE : CHAR_WALL;
					break;
					
					case SYMBOL_SOUTH_HALL:
					char = SRoom ? CHAR_OUTSIDE_TILE : CHAR_WALL;
					break;
					
					case SYMBOL_WEST_HALL:
					char = WRoom ? CHAR_OUTSIDE_TILE : CHAR_WALL;
					break;

					case SYMBOL_HOIRZONTAL_DOOR:
					char = CHAR_HORIZONTAL_DOOR + 'in';					
					break;
					
					case SYMBOL_VERTICAL_DOOR:
					char = CHAR_VERTICAL_DOOR + 'in';
					break;

					case SYMBOL_FLOOR:
					char = CHAR_FLOOR_TILE;
					break;

					case SYMBOL_FLOOR_NO_BLINK:
					char = CHAR_FLOOR_TILE;
					blink = false;
					break;
					
					case SYMBOL_VAULT_LOOT:
					entity = generateVaultLoot();
					entity.x = x;
					entity.y = y;
					blink = false;
					break;

					case SYMBOL_WALL:
					char = CHAR_WALL;
					break;

					case SYMBOL_GENERATOR_CONSOLE:
					entity = new entity_generator_console(room);
					entity.x = x;
					entity.y = y;
					room.generator.console = entity;
					break;

					case SYMBOL_GENERATOR_BLOCK:
					entity = MakeNPC(NAME_GENERATOR_BLOCK, {x:x, y:y});
					entity.faction = room.faction;
					entity.color = COLOR_DEFAULT;

					room.generator.blocks.push(entity);
					break;

					case SYMBOL_GENERATOR_CORE:
					entity = MakeNPC(NAME_GENERATOR_CORE, {x:x, y:y});
					entity.room = room;
					entity.faction = room.faction;
					entity.color = COLOR_DEFAULT;

					room.generator.blocks.push(entity);
					break;

					case SYMBOL_GENES_CONSOLE:
					entity = objectives[OBJ_GENES].console;
					entity.x = x;
					entity.y = y;
					break;

					case SYMBOL_SHOP_KEEPER_GARUNTEED:
					entity = new entity_shop_keeper();
					entity.x = x;
					entity.y = y;
					break;

					case SYMBOL_SHOP_KEEPER:
					if (Math.random() > .5) {
						entity = new entity_shop_keeper();
						entity.x = x;
						entity.y = y;
					}
					break;

					case SYMBOL_ATM:
					if (Math.random() > .8) {
						entity = MakeNPC(NAME_ATM, {x:x, y:y});
					}						
					break;

					case SYMBOL_ATM_GARUNTEED:
					entity = MakeNPC(NAME_ATM, {x:x, y:y});
					break;

					case SYMBOL_BULLET_VENDOR:
					if (Math.random() > .8) {
						entity = MakeNPC(SYMBOL_BULLET_VENDOR, {x:x, y:y});
					}						
					break;

					case SYMBOL_BULLET_VENDOR_GARUNTEED:
						entity = MakeNPC(SYMBOL_BULLET_VENDOR, {x:x, y:y});
					break;

					case SYMBOL_BANK_TRIPWIRE:
					entity = new entity_bank_tripwire();
					entity.x = x;
					entity.y = y;
					break;

					case SYMBOL_BANK_SPAWNER:
					entity = new entity_bank_spawner();
					entity.x = x;
					entity.y = y;
					room.spawner = entity;
					break;

					case SYMBOL_BANK_TERMINAL:
					entity = new entity_bank_terminal(room);
					entity.x = x;
					entity.y = y;
					break;

					case SYMBOL_LOCKED_DOOR_H:
					entity = new entity_locked_door(true);
					entity.x = x;
					entity.y = y;
					room.lockedDoors.push(entity);
					break;

					case SYMBOL_LOCKED_DOOR_V:
					entity = new entity_locked_door(false);
					entity.x = x;
					entity.y = y;
					room.lockedDoors.push(entity);
					break;

					case SYMBOL_DOG_SPAWN:
						entity = MakeNPC(DOG_NAMES.popRandom(), {x:x, y:y});
						this.npcs.push(entity);
						room.dogs.push(entity);
					break;

					case SYMBOL_DOG_SPAWN_MAYBE:					
					if (Math.random() > .84) {
						entity = MakeNPC(DOG_NAMES.popRandom(), {x:x, y:y});
						this.npcs.push(entity);
						room.dogs.push(entity);
					}
					break;

					case SYMBOL_KENNEL_TERMINAL:
					entity = new entity_kennel_terminal(room);
					entity.x = x;
					entity.y = y;
					break;

					case SYMBOL_MASTERMIND_CONSOLE:
					entity = objectives[OBJ_MASTERMIND].console;
					break;

					case SYMBOL_MASTERMIND_PIECE:
					entity = new entity_mastermind_piece();
					entity.x = x;
					entity.y = y;
					objectives[OBJ_MASTERMIND].pieces.push(entity);
					objectives[OBJ_MASTERMIND].tilePositions.push({x:x, y:y});
					break;

					case SYMBOL_CITY_OS_DISK:
					entity = MakeItem(NAME_OS_DISK);
					entity.x = x;
					entity.y = y;
					break;

					case SYMBOL_SOLAR_CONSOLE:
					entity = new entity_solar_console();
					entity.x = x;
					entity.y = y;
					break;

					case SYMBOL_CITY_CONSOLE:
					entity = new entity_city_hall_console();
					objectives[OBJ_CITY_OS].console = entity;
					break;

					case SYMBOL_CLONING_VATS:
					if (objectives[OBJ_GENES] != null) {						
						entity = new entity_cloning_vat();
						entity.x = x;
						entity.y = y;
					}
					break;

					case SYMBOL_HALF_WALL:
					char = CHAR_HALF_WALL;
					break;

					case SYMBOL_PIT:
					char = CHAR_PIT;
					break;

					case SYMBOL_HQ_SENTRY:
					entity = MakeNPC(CONSTRUCT_SENTRY_I, {x:x, y:y});
					entity.faction = room.faction;
					entity.color = COLOR_FACTIONS_POWERED[room.faction];

					this.npcs.push(entity);
					break;

					case SYMBOL_BOOK_SPAWN:
					entity = new entity_book_shelf();
					entity.x = x;
					entity.y = y;
					break;

					case SYMBOL_GOOD_BOOK_SPAWN:
					entity = new entity_book_shelf();
					entity.x = x;
					entity.y = y;
					break;
				}
				if (char != CHAR_EMPTY && char != null)
					this.tiles[y][x] = layTile(char, entity, blink);
				if (char == SYMBOL_BOOK_SPAWN && Math.random() < .3) {
					var book = MakeBook(false);
					book.x = x;
					book.y = y;
					this.tiles[y][x].entities.push(book);
				} else if (char == SYMBOL_GOOD_BOOK_SPAWN) {
					var book = MakeBook(true)	;
					book.x = x;
					book.y = y;
					this.tiles[y][x].entities.push(book);
				}
			}
		}
	}

	// make our faction using our hq location
	factions[FACTION_CLONES] = new faction_clones(seedRoomPos, startingWealth);
	
	this.objectiveTypes = [];
	this.objectiveTypes.push(MAIN_OBJECTIVES.popRandom());
	this.objectiveTypes.push(SIDE_OBJECTIVES.popRandom());
	this.objectiveTypes.push(SIDE_OBJECTIVES.popRandom());
	this.tiles;
	this.roomPos = {x:0, y:0};
	// for spark/things
	this.projectiles = [];
	// for things that are persistent
	this.npcs = [];
	this.lastKnownEnemyPositions = {};
	// pick how many rooms we want
	this.roomTotal = 30 + Math.round(Math.random() * 10);
	if (hardMode)
		this.roomTotal += 10;
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
	this.hqCandidates = [];
	this.enemySpawnRooms = [];
	// var furthestRoomDist = 0;
	// the collection of open positions we will draw from
	var openSet = [seedRoomPos];
	while (roomCount < this.roomTotal && openSet.length > 0) {
		// pick a random element from the openset
		var currentPos = openSet.popWeighted();
		if (currentPos.distance > 1) {
			this.objectiveCandidates.push({hash:hash, x:currentPos.x, y:currentPos.y});
			this.enemySpawnRooms.push({hash:hash, x:currentPos.x, y:currentPos.y});
		}
		// get a weighted list of the shapes 
		var validShapes = getValidShapes(currentPos);
		// pick the room shape
		var shape = validShapes.peekWeighted();
		// but start in a 1 x 1 room okay :)
		if (roomCount == 0)
			shape = ROOM_SHAPES[0];			

		// make all hq's 1 x 1 only
		if (roomCount > 0 && currentPos.distance > 2 && shape == ROOM_SHAPES[0])
			this.hqCandidates.push({hash:hash, x:currentPos.x, y:currentPos.y});

		// fill the grid given the room shape
		for (var i = shape.offsets.length - 1; i >= 0; i--) {
			// get the offset x/y pair 
			var offset = shape.offsets[i];
			var newPos = {x: currentPos.x + offset.x, y: currentPos.y + offset.y};
			// fill the block at current pos + offset
			minimap[newPos.y][newPos.x].hash = hash;
			// we set this for our auto exploring
			minimap[newPos.y][newPos.x].x = newPos.x;
			minimap[newPos.y][newPos.x].y = newPos.y;
			// add it to our collection of room segments
			unvisitedSegments.push(minimap[newPos.y][newPos.x]);
			roomLookup[hash] = new Room(hash);
			roomLookup[hash].seedPos = newPos;
			roomLookup[hash].shape = clone(shape);
			roomLookup[hash].size = shape.offsets.length;
			roomLookup[hash].shape.offsets = shape.offsets.slice(0);
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
	room.powered = true;
	room.partVisited = true;
	room.discovered = true;
	factions[FACTION_CLONES].wpt += room.wpt;
	unvisitedSegments.remove(minimap[seedRoomPos.y][seedRoomPos.x]);
	workingXMin = seedRoomPos.x;
	workingXMax = seedRoomPos.x;
	workingYMin = seedRoomPos.y;
	workingYMax = seedRoomPos.y;

	// place the factions on the map
	for (var i = 2; i > 0; i--) {
		var faction = FACTIONS.popRandom();
		var factionHQ = this.hqCandidates.popRandom();
		this.objectiveCandidates.setRemove(factionHQ);
		this.enemySpawnRooms.setRemove(factionHQ);
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
		room.powered = true;
		room.captureAmount = 1;
	}

	// add objective rooms
	for (var i = this.objectiveTypes.length - 1; i >= 0; i--) {

		// only use rooms that are the correct size
		var sizeCandidates = [];
		for (var j = this.objectiveCandidates.length - 1; j >= 0; j--) {
			if (this.objectiveTypes[i].sizes.includes(roomLookup[this.objectiveCandidates[j].hash].size))
				sizeCandidates.push(this.objectiveCandidates[j]);
		}

		objectivePos = sizeCandidates.popRandom();
		room = roomLookup[minimap[objectivePos.y][objectivePos.x].hash];
		room.objective = this.objectiveTypes[i].type;
		this.objectiveCandidates.setRemove(objectivePos);

		switch(this.objectiveTypes[i].type) {
			case OBJ_GENERATORS:
			// update the objective tracking object
			objectives[OBJ_GENERATORS] = new objective_generators();
			for (var i = GENERATORS_MAX - 1; i >= 0; i--) {			
				room.event = EVENT_GENERATOR;
				room.generator = new generator(i + 1, minimap[objectivePos.y][objectivePos.x]);
				objectives[OBJ_GENERATORS].generators.push(room.generator);	

				// for the next loop
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

			var sizeOneCandidates = [];
			for (var j = this.objectiveCandidates.length - 1; j >= 0; j--) {
				if (roomLookup[this.objectiveCandidates[j].hash].size == 1)
					sizeOneCandidates.push(this.objectiveCandidates[j]);
			}

			objectivePos = sizeOneCandidates.popRandom();
			room = roomLookup[minimap[objectivePos.y][objectivePos.x].hash];
			room.event = EVENT_CITY_OS;

			this.objectiveCandidates.setRemove(objectivePos);
			break;
		}
	}

	// add flavor rooms
	for (var i = 0; i < 4; i++) {
		var event = FLAVOR_ROOMS.peekWeighted();	

		var candidates = [];
		for (var j = this.objectiveCandidates.length - 1; j >= 0; j--) {
			if (event.sizes.includes(roomLookup[this.objectiveCandidates[j].hash].size))
				candidates.push(this.objectiveCandidates[j]);
		}

		eventPos = candidates.popRandom();
		room = roomLookup[minimap[eventPos.y][eventPos.x].hash];
		room.event = event.type;

		if (event.type == FLAVOR_VAULT) {
			LEGENDARIES.push(NAME_VAULT_KEY);
		}

		this.objectiveCandidates.setRemove(eventPos);
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

	visitRoom(seedRoomPos);
	
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
			templates = ROOM_TEMPLATES.CITY_HALL_TEMPLATES;
			break;

			case EVENT_CLONE_HQ:
			templates = ROOM_TEMPLATES.CLONES_HQ_TEMPLATE;
			break;

			case EVENT_HIVEMIND_HQ:
			templates = ROOM_TEMPLATES.HIVEMIND_HQ_TEMPLATE;
			break;

			case EVENT_ANIMAL_HQ:
			templates = ROOM_TEMPLATES.ANIMAL_HQ_TEMPLATE;
			break;

			case EVENT_SOFTWARE_HQ:
			templates = ROOM_TEMPLATES.SOFTWARE_HQ_TEMPLATE;
			break;

			case EVENT_SURVIVOR_HQ:
			templates = ROOM_TEMPLATES.SURVIVOR_HQ_TEMPLATE;
			break;

			case EVENT_ROBOT_HQ:
			templates = ROOM_TEMPLATES.ROBOT_HQ_TEMPLATE;
			break;

			case FLAVOR_BANK:
			templates = ROOM_TEMPLATES.BANK_TEMPLATES;
			room.wpt = 4;
			break;

			case FLAVOR_SUN_ROOM:
			templates = ROOM_TEMPLATES.SUN_ROOM_TEMPLATES;
			room.power += room.size;
			break;

			case FLAVOR_VAULT:
			templates = ROOM_TEMPLATES.VAULT_TEMPLATES;
			break;

			case FLAVOR_LIBRARY:
			templates = ROOM_TEMPLATES.LIBRARY_TEMPLATES;
			break;

			case FLAVOR_SHOP:
			templates = ROOM_TEMPLATES.SHOP_TEMPLATES;
			room.wpt = 5;
			break;

			case FLAVOR_KENNEL:
			templates = ROOM_TEMPLATES.KENNEL_TEMPLATES;
			break;

		}
		this.buildRoom(room, templates);
	}

	// we visit the seedroom
	minimap[this.roomPos.y][this.roomPos.x].visited = true;

	this.populateInitial = function () {
		if (!spawnEnemies)
			return;
		// populate the dungeon with some starting enemies
		var startingUnitAmount = 30 + Math.round(Math.random() * 5);
		for (var i = 0; i < startingUnitAmount; i++) {
			var room = this.enemySpawnRooms.peekRandom();
			// pick unit type
			var unitType = STARTING_UNITS.peekRandom();
			// make unit
			spawn(room, unitType);
		}
	}

	this.getRoom = function() {
		return roomLookup[minimap[this.roomPos.y][this.roomPos.x].hash];
	}

	this.getRoomSegment = function() {
		return minimap[this.roomPos.y][this.roomPos.x];		
	}

	this.movePlayer = function(pos) {
		// update the players position
		this.tiles[player.y][player.x].entities.remove(player);
		player.x = pos.x;
		player.y = pos.y;
		this.tiles[player.y][player.x].entities.push(player);

		this.roomPos = {x: mapXMin + Math.round((pos.x - (ROOM_CELL_LENGTH - 1)/ 2) / ROOM_CELL_LENGTH), 
					    y: mapYMin + Math.round((pos.y - (ROOM_CELL_LENGTH - 1)/ 2) / ROOM_CELL_LENGTH)};

		var roomSegment = minimap[this.roomPos.y][this.roomPos.x];
		var room = roomLookup[roomSegment.hash];

		var newTile = this.tiles[pos.y][pos.x];
		if (room.isRoom && newTile.inRoom) {
			room.units.push(player);
			disputedRooms.refSetAdd(room);
		}	
			
		if (newTile.entities.length > 0) {
			for (var i = newTile.entities.length - 1; i >= 0; i--) {
				if (newTile.entities[i].type == ENTITY_BANK_TRIPWIRE && !room.tripped) {
					room.tripped = true;
					if (spawnEnemies)
						player.addStatus({type:ENTITY_BANK_TRIPWIRE, ticksRemaining:6, spawner:room.spawner, unique:false});
				}
			}
		}

		if (!room.visited && (newTile.contains(ENTITY_DOOR) || newTile.inRoom)) {
			if (!room.partVisited)
				room.partVisited = true;
			visitRoom(this.roomPos);
			if (room.interesting) {
				bored = false;
				log.add(room.discoverText);
				// PAY UP
				if (room.event == FLAVOR_LIBRARY) {
					for (var i = player.inventory.length - 1; i >= 0; i--) {
						var item = player.inventory[i];
						if (item.name == NAME_OVERDUE_BOOK) {
							log.add("Is that an Overdue book? Pay up sonny.");
							factions[FACTION_CLONES].wealth -= Math.min(Math.round(gameTicks / 50), 1);
							if (item.equipped)
								item.unequip(player);
							player.inventory.remove(item);
							break;
						}
					}
				}
			}
		}

		if (!roomSegment.visited) {
			// get room center
		    var adjustedPos = {x: roomSegment.x - mapXMin, y: roomSegment.y - mapYMin};
			var roomCenter = {x: (ROOM_CELL_LENGTH - 1)/ 2 + (adjustedPos.x * ROOM_CELL_LENGTH), y: (ROOM_CELL_LENGTH - 1)/ 2 + (adjustedPos.y * ROOM_CELL_LENGTH)};
			// get player pos
			var playerPos = {x: player.x, y: player.y};
			var dx = playerPos.x - roomCenter.x;
			var dy = playerPos.y - roomCenter.y;
			// get distance
			var distance = Math.sqrt(dx*dx + dy*dy);
			// if less than 8
			if (distance <= 5) {
				roomSegment.visited = true;
				unvisitedSegments.remove(roomSegment);				
			}
		}

		fourXPos = {x: this.roomPos.x, y: this.roomPos.y};
	}
}

function visitRoom(roomPos) {
	var room = roomLookup[minimap[roomPos.y][roomPos.x].hash];
	room.visited = true;
	// onlny our seed room needs this so why not
	room.discovered = true;

	var adjacentRooms = [];
	var OFFSETS = [{x:1,y:0},{x:-1,y:0},{x:0,y:1},{x:0,y:-1}];
	var openSet = [roomPos];
	var closedSet = [];
	var hash = room.hash;
	while (openSet.length > 0) {
		var pos = openSet.popRandom();
		closedSet.push(pos);
		for (var i = OFFSETS.length - 1; i >= 0; i--) {
			var offset = OFFSETS[i];
			var newPos = {x:pos.x + offset.x, y:pos.y + offset.y};
			if (newPos.y >= 0 && newPos.y < minimap.length && 
			newPos.x >= 0 && newPos.x < minimap[newPos.y].length - 1) {
				if (minimap[newPos.y][newPos.x].hash <= 0)
					continue;
				var newRoom = roomLookup[minimap[newPos.y][newPos.x].hash];
				if (newRoom.hash == hash && !closedSet.setContains(newPos)) {
					newRoom.visited = true;
					openSet.push(newPos);
				} else
					discoverRoom(newPos);
			}
		}
	}
}

var workingYMin = 0;
var workingYMax = 0;
var workingXMin = 0;
var workingXMax = 0;
var workingHeight = 0;
var workingWidth = 0;
function discoverRoom(roomPos) {
	var room = roomLookup[minimap[roomPos.y][roomPos.x].hash];
	// onlny our seed room needs this so why not
	room.discovered = true;

	// adjust our working height based on the shape
	for (var i = 0; i < display_height_minimap; i++) {
		for (var j = 0; j < display_width_minimap; j++) {
			var mapY = mapYMin + i;
			var mapX = mapXMin + j;
			if (minimap[mapY][mapX].hash == room.hash) {
				if (mapY < workingYMin) {
					workingYMin = mapY;
				}
				else if (mapY > workingYMax) {
					workingYMax = mapY;
				}
				// adjust our working width
				if (mapX < workingXMin) {
					workingXMin = mapX;
				}
				else if (mapX > workingXMax) {
					workingXMax = mapX;
				}
			}
		}
	}

	workingHeight = workingYMax - workingYMin + 1;
	workingWidth = workingXMax - workingXMin + 1;
}

var CHAR_OUTSIDE_TILE = 'o';
var CHAR_HORIZONTAL_DOOR_IN = '\u2014' + 'in';
var CHAR_VERTICAL_DOOR_IN = '|' + 'in';
var CHAR_PIT = ' ';
function layTile(char, entity, canBlink) {
	var result = null
	switch (char) {
		case CHAR_FLOOR_TILE: result = new FloorTile(true); break;
		case CHAR_OUTSIDE_TILE: result = new FloorTile(false); break;
		case CHAR_HORIZONTAL_DOOR: result = new FloorTile(false, new Door(CHAR_HORIZONTAL_DOOR)); break;
		case CHAR_VERTICAL_DOOR: result = new FloorTile(false, new Door(CHAR_VERTICAL_DOOR)); break;
		case CHAR_HORIZONTAL_DOOR_IN: result = new FloorTile(true, new Door(CHAR_HORIZONTAL_DOOR)); break;
		case CHAR_VERTICAL_DOOR_IN: result = new FloorTile(true, new Door(CHAR_VERTICAL_DOOR)); break;
		case CHAR_WALL: result = new WallTile(true); break;
		case CHAR_HALF_WALL: result = new WallTile(false); break;
		case CHAR_PIT: result = new PitTile(); break;
		default: result = new FloorTile(true, entity); break;
	}
	result.canBlink = canBlink;
	return result;
}		

// while the center is solid, iterate around it
// until you find a valid position
function getOpenSpot(destination) {
	var openSet = [destination];
	var closedSet = [];
	var options = MOVE_OPTIONS.slice(0);
	options.splice(0, 0, {x:0,y:0});
	do {
		var pos = openSet.pop();
		closedSet.push(pos);
		for (var i = 0; i < options.length; i++) {
			var newPos = {x:pos.x + options[i].x, y:pos.y + options[i].y}
			if (newPos.y >= 0 && 
				newPos.x >= 0 &&
				newPos.y < dungeon.tiles.length &&
			 	newPos.x < dungeon.tiles[newPos.y].length) {
				var tile = dungeon.tiles[newPos.y][newPos.x];
				if (!tile.getSolid())
					return newPos;
				else if (!closedSet.setContains(newPos)) {
					openSet.push(newPos);
				}
			}
		}
	} while (tile.getSolid())
	return destination;
}

function Door(char) {
	this.type = ENTITY_DOOR;
	this.opaque = true;
	this.solid = false;
	this.permanentSolid = false;
	this.simulatesPhysics = false;
	this.char = char;
	this.name = "door";
	this.font = char == CHAR_HORIZONTAL_DOOR ? FONT_STYLE_UNICODE : FONT_STYLE_DEFAULT;
	this.color = COLOR_DEFAULT;
}

function EmptyTile () {
		
	this.viewState = VIEW_STATE_HIDDEN;

	this.canBlink = true;

	this.entities = [];

	this.getOpaque = function() {
		return false;
	}

	this.getCharInfo = function() {
		return {char:' ', font:FONT_STYLE_DEFAULT, color:COLOR_DEFAULT, hasHp:false, hasShield:false};
	}

	this.getSolid = function() {
		return true;
	}

	this.getPermanentSolid = function() {
		return true;
	}
	
	this.isForceBlocking = function() {
		return true;
	}

	this.visit = function() {}

	this.contains = function(entityType) {
		return false;
	}

	this.hasEnemy = function() {
		return this.contains(ENTITY_ENEMY);
	}

	this.getEnemy = function() {
		return false;
	}
}

function WallTile (opaque) {
		
	this.viewState = VIEW_STATE_HIDDEN;

	this.canBlink = true;

	this.entities = [];

	this.opaque = opaque;
	this.char = opaque ? CHAR_WALL : CHAR_HALF_WALL;
	this.font = opaque ? FONT_STYLE_DEFAULT : FONT_STYLE_HALF_WALL;

	this.getOpaque = function() {
		return this.opaque;
	}

	this.getCharInfo = function() {
		if (revealALL)
			this.viewState = VIEW_STATE_VISIBLE;
		
		switch (this.viewState) {
			case VIEW_STATE_HIDDEN:
				return {char:CHAR_HIDDEN, font:this.font, color:COLOR_OUT_OF_SIGHT, hasHp:false, hasShield:false};
			break;

			case VIEW_STATE_VISIBLE:
				this.viewState = VIEW_STATE_SEEN;
				if (this.entities.length > 0)
					return {char: entity.char, font: entity.font, color:COLOR_DEFAULT, hasHp:false, hasShield:false};
				return {char:this.char, font:this.font, color:COLOR_DEFAULT, hasHp:false, hasShield:false};
			break;

			case VIEW_STATE_SEEN:
				if (this.entities.length > 0)
					return {char: entity.char, font: entity.font, color:COLOR_OUT_OF_SIGHT, hasHp:false, hasShield:false};
				return {char:this.char, font:this.font, color:COLOR_OUT_OF_SIGHT, hasHp:false, hasShield:false};
			break;
		}
	}

	this.getSolid = function() {
		return true;
	}

	this.getPermanentSolid = function() {
		return true;
	}

	this.isForceBlocking = function() {
		return true;
	}

	this.contains = function(entityType) {
		return false;
	}

	this.hasEnemy = function() {
		return this.contains(ENTITY_ENEMY);
	}

	this.getEnemy = function() {
		return false;
	}

	this.visit = function() {
		if (this.viewState == VIEW_STATE_VISIBLE)
			this.viewState = VIEW_STATE_SEEN;
	}
}

function PitTile () {
		
	this.viewState = VIEW_STATE_HIDDEN;

	this.canBlink = true;

	this.entities = [];

	this.opaque = false;
	this.char = CHAR_PIT;

	this.getOpaque = function() {
		return this.opaque;
	}

	this.getCharInfo = function() {
		return {char: this.char, font: FONT_STYLE_DEFAULT, color:COLOR_OUT_OF_SIGHT, hasHp:false, hasShield:false};
	}

	this.getSolid = function() {
		return true;
	}

	this.getPermanentSolid = function() {
		return true;
	}

	this.isForceBlocking = function() {
		return false;
	}

	this.contains = function(entityType) {
		return false;
	}

	this.hasEnemy = function() {
		return false
	}

	this.getEnemy = function() {
		return false;
	}

	this.visit = function() {}
}

function FloorTile (inRoom, entity) {
		
	this.viewState = VIEW_STATE_HIDDEN;

	this.canBlink = true;

	this.inRoom = inRoom;

	this.entities = [];
	if (typeof entity !== 'undefined' && entity != null)
		this.entities.push(entity);

	this.pastEntity = null;
	this.projectile = null;

	this.getOpaque = function() {
		var nonOpaqueEntity = false;
		var door = false;
		for (var i = this.entities.length - 1; i >= 0; i--) {
			if (!this.entities[i].opaque)
				nonOpaqueEntity = true;			
			else if (this.entities[i].name == 'door')
				door = true;
		}
		return !nonOpaqueEntity && door;
	}
	
	this.getCharInfo = function() {
		if (revealALL)
			this.viewState = VIEW_STATE_VISIBLE;

		switch (this.viewState) {
			case VIEW_STATE_HIDDEN:
				return {char:CHAR_HIDDEN, font:FONT_STYLE_DEFAULT, color:COLOR_OUT_OF_SIGHT, hasHp:false, hasShield:false};
			break;

			case VIEW_STATE_VISIBLE:
				// check for any alternate chars
				// from our projectiles
				var flipChar, flipColor, flipFont;
				var char = CHAR_FLOOR_TILE;
				var font = FONT_STYLE_DEFAULT;
				var color = COLOR_DEFAULT;
				var hp = 0;
				var hasHp = false;
				var hasShield = false;
				var invert = false;

				// if we have a projectile, set the alternate char/color
				if (this.projectile != null) {
					flipChar = this.projectile.char;
					flipFont = this.projectile.style;
					flipColor = this.projectile.color;
				}

				if (this.entities.length > 0) {
					var entity = this.entities.peek();
					invert = false;
					char = entity.char;
					font = entity.font;
					color = entity.color;

					// if its our target, invert the tile
					if (entity == player.target)
						invert = true;

					// if the entity, has hp or a shield, draw the hpbar/shield
					if (typeof entity.hp !== 'undefined' && entity.hp != entity.hpMax) {
						hp = entity.hp/entity.hpMax;
						hasHp = true;
						hasShield = entity.isShielded();
					}
				}

				return {char:char, font:font, color:color, hasHp:hasHp, hp:hp, hasShield:hasShield, invert:invert, flipChar:flipChar, flipFont:flipFont, flipColor:flipColor};
			break;

			case VIEW_STATE_SEEN:
				var flipChar, flipColor, flipFont;
				var char = CHAR_FLOOR_TILE;
				var font = FONT_STYLE_DEFAULT;
				var color = COLOR_OUT_OF_SIGHT;
				var hp = 0;
				var hasHp = false;
				var hasShield = false;
				var invert = false;

				// if we have a projectile, set the alternate char/color
				if (this.projectile != null) {
					flipChar = this.projectile.char;
					flipFont = this.projectile.style;
					flipColor = this.projectile.color;
				}

				// if there is a last-seen entity
				if (this.pastEntity != null) {
					var entity = this.pastEntity;
					if (!entity.visible) {						
						invert = false;
						char = entity.char;
						font = entity.font;
					} else if (entity.visible)
						this.pastEntity = null;				
				// if we didn't have a last seen entity or our last seen entity is visible somewhere
				} else {
					// find our next character
					if (this.entities.length != 0) {
						// standard, find most exposed entity's char
						for (var i = this.entities.length - 1; i >= 0; i--) {
							var entity = this.entities[i];
							// if we have an enemy that is not visible, dont use it's char
							if (typeof entity.visible !== 'undefined' && !entity.visible)
								continue;
							else {
								char = entity.char;
								font = entity.font;
							} 
						}
					}
				}

				// by default we are the floor tile '.'
				return {char:char, font:font, color:color, hasHp:hasHp, hp:hp, hasShield:hasShield, invert:invert, flipChar:flipChar, flipFont:flipFont, flipColor:flipColor};
			break;
		}
	}

	this.getSolid = function() {
		return this.entities.length != 0 && this.entities.peek().solid;
	}

	this.getPermanentSolid = function(faction) {
		if (this.entities.length == 0)
			return false;
		else {
			var entity = this.entities.peek();
			return entity.permanentSolid || (entity.faction == faction && !entity.animate);
		}
	}

	this.isForceBlocking = function() {
		if (this.entities.length == 0)
			return false;
		else {
			var entity = this.entities.peek();
			// if it can be moved, it can't block force
			return !entity.simulatesPhysics;
		}
	}

	this.visit = function() {
		if (this.viewState == VIEW_STATE_VISIBLE) {
			this.pastEntity = null;
			for (var i = this.entities.length - 1; i >= 0; i--) {
				var entity = this.entities[i];				
				if (entity.visible)
					entity.visible = false;
			}
			if (this.entities.length > 0)
				this.pastEntity = this.entities.peek();

			this.viewState = VIEW_STATE_SEEN;
		}
	}

	this.hasEnemy = function() {
		return this.contains(ENTITY_ENEMY);
	}

	this.getEnemy = function() {
		for (var i = this.entities.length - 1; i >= 0; i--) {
			if (this.entities[i].type == ENTITY_ENEMY)
				return this.entities[i];
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
	// we use this for player auto path finding
	this.visited = false;
	// its minimap pos
	this.x = 0;
	this.y = 0;
}

function Room (hash) {
	this.hash = hash;
	this.powered = false;
	this.visited = false;
	this.partVisited = false;
	this.discovered = false;
	this.event = EVENT_NONE;
	this.faction = FACTION_NONE;
	this.targetFaction = FACTION_NONE;
	this.captureAmount = 0;
	this.captureRequired = 1;
	this.beingCaptured = false;
	this.objective = "";
	this.unitsEnroute = [];
	this.units = [];
	this.wpt = 1;
	this.power = 1;

	// for auto-exploring
	this.interesting = false;

	// if it has walls + door or not
	this.isRoom = true;

	// bank tripwire
	this.tripped = false;
	// for banks
	this.spawner;
	// locked doors
	this.lockedDoors = [];
	this.dogs = [];
	// the origin of our room
	this.seedPos = {x:0, y:0};
	// the number of segments in our room
	this.size;
	// the particular shape of our room
	this.shape;

	this.unlockDoors = function() {
		for (var i = this.lockedDoors.length - 1; i >= 0; i--) {
			var door = this.lockedDoors[i];
			dungeon.tiles[door.y][door.x].entities.remove(door);
		}
	}
}

function rot90C(template, count, room) {
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

				case SYMBOL_HOIRZONTAL_DOOR:
				char = SYMBOL_VERTICAL_DOOR;
				break;

				case SYMBOL_VERTICAL_DOOR:
				char = SYMBOL_HOIRZONTAL_DOOR;
				break;

				case SYMBOL_LOCKED_DOOR_V:
				char = SYMBOL_LOCKED_DOOR_H;
				break;

				case SYMBOL_LOCKED_DOOR_H:
				char = SYMBOL_LOCKED_DOOR_V;
				break;

				default:break;				
			}
			resultBlueprint[iiii][xOffset - jjjj] = char;
		}
	}

	// rotate the room
	for (var abc = room.shape.offsets.length - 1; abc >= 0; abc--) {
		var offset = room.shape.offsets[abc];
		if (offset.x == 1 && offset.y == 0)
			room.shape.offsets[abc] = {x: 0, y:1};
		else if (offset.x == 1 && offset.y == 1)
			room.shape.offsets[abc] = {x: -1, y:1};
		else if (offset.x == 0 && offset.y == 1)
			room.shape.offsets[abc] = {x: -1, y:0};
		else if (offset.x == -1 && offset.y == 1)
			room.shape.offsets[abc] = {x: -1, y:-1};
		else if (offset.x == -1 && offset.y == 0)
			room.shape.offsets[abc] = {x: 0, y:-1};
		else if (offset.x == -1 && offset.y == -1)
			room.shape.offsets[abc] = {x: 1, y:-1};
		else if (offset.x == 0 && offset.y == -1)
			room.shape.offsets[abc] = {x: 1, y:0};
		else if (offset.x == 1 && offset.y == -1)
			room.shape.offsets[abc] = {x: 1, y:1};
	}

	if (count == 1)
		return resultBlueprint;
	else
		return rot90C(resultBlueprint, --count, room);
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
var SYMBOL_CLONING_VATS = "cloning_vat";
var v = "cloning_vat";
var SYMBOL_WEST_HALL = "west_hall";
var w = "west_hall";
var SYMBOL_HOIRZONTAL_DOOR = "horizontal_door";
var y = "horizontal_door";
var SYMBOL_VERTICAL_DOOR = "vertical_door";
var z = "vertical_door";
// basic tiles
var SYMBOL_FLOOR = "floor";
var o = "floor";
var SYMBOL_WALL = "wall";
var x = "wall";
var SYMBOL_HALF_WALL = "half_wall";
var u = "half_wall";
var SYMBOL_PIT = "pit";
var N = "pit";
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
var ᾉ = "city_console";
// clones hq
var SYMBOL_HQ_SENTRY = "hq_sentry";
var H = "hq_sentry";
// shops
var SYMBOL_SHOP_KEEPER_GARUNTEED = "shop_keeper";
var A = "shop_keeper";
var SYMBOL_SHOP_KEEPER = "shop_keeper1";
var I = "shop_keeper1"
var SYMBOL_BULLET_VENDOR = "bulleter";
var U = "bulleter";
var SYMBOL_BULLET_VENDOR_GARUNTEED = "bulleter1";
var V = "bulleter1";
// bank
var SYMBOL_ATM = "atm";
var D = "atm";
var SYMBOL_ATM_GARUNTEED = "atm1";
var F = "atm1";
var SYMBOL_BANK_TRIPWIRE = "tripwire";
var J = "tripwire";
var SYMBOL_BANK_SPAWNER = "bank_spawner";
var K = "bank_spawner";
var SYMBOL_BANK_TERMINAL = "bank_terminal";
var L = "bank_terminal";
// kennel
var SYMBOL_KENNEL_TERMINAL = "kennel_terminal";
var O = "kennel_terminal";
var SYMBOL_DOG_SPAWN = "dog_spawn";
var Q = "dog_spawn";
var SYMBOL_DOG_SPAWN_MAYBE = "dog_spawn_maybe";
var R = "dog_spawn_maybe";
var SYMBOL_LOCKED_DOOR_H = "locked_door_h";
var S = "locked_door_h";
var SYMBOL_LOCKED_DOOR_V = "locked_door_v";
var W = "locked_door_v";
// solar
var SYMBOL_SOLAR_CONSOLE = "solar_console";
var T = "solar_console";
var SYMBOL_FLOOR_NO_BLINK = "floor_no_blink";
var X = "floor_no_blink";
var SYMBOL_VAULT_LOOT = "vault_loot";
var Y = "vault_loot";
// library
var SYMBOL_BOOK_SPAWN = "book_shelf";
var ᾊ = "book_shelf";
var SYMBOL_GOOD_BOOK_SPAWN = "good_book_shelf";
var ᾈ = "good_book_shelf";

// alright boys 13 x 13
var ROOM_TEMPLATES = {
	NONE_TEMPLATES : {

		interesting: false,

	    1 :[
			{
				 tiles:[[d,g,n,n,n,n,n,n,n,n,n,a,b],
						[m,d,g,x,x,x,i,x,x,x,a,b,c],
						[w,m,x,x,o,o,o,o,o,x,x,c,e],
						[w,x,x,o,o,o,o,o,o,o,x,x,e],
						[w,x,o,o,o,o,o,o,o,o,o,x,e],
						[w,x,o,o,o,o,x,o,o,o,o,x,e],
						[w,l,o,o,o,x,x,x,o,o,o,j,e],
						[w,x,o,o,o,o,x,o,o,o,o,x,e],
						[w,x,o,o,o,o,o,o,o,o,o,x,e],
						[w,x,x,o,o,o,o,o,o,o,x,x,e],
						[w,p,x,x,o,o,o,o,o,x,x,x,e],
						[p,f,q,x,x,x,k,x,x,x,r,h,t],
						[f,q,s,s,s,s,s,s,s,s,s,r,h]],

				isRoom: true,
				frequency: 2
			},

			{
				 tiles:[[d,g,n,n,n,n,n,n,n,n,n,a,b],
						[m,x,x,x,x,x,i,x,x,x,x,x,c],
						[w,x,o,o,o,o,o,o,o,o,o,x,e],
						[w,x,o,x,x,o,o,o,x,x,o,x,e],
						[w,x,o,x,o,o,o,o,o,x,o,x,e],
						[w,x,o,o,o,x,o,x,o,o,o,x,e],
						[w,l,o,o,o,o,o,o,o,o,o,j,e],
						[w,x,o,o,o,x,o,x,o,o,o,x,e],
						[w,x,o,x,o,o,o,o,o,x,o,x,e],
						[w,x,o,x,x,o,o,o,x,x,o,x,e],
						[w,x,o,o,o,o,o,o,o,o,o,x,e],
						[p,x,x,x,x,x,k,x,x,x,x,x,t],
						[f,q,s,s,s,s,s,s,s,s,s,r,h]],

				isRoom: true,
				frequency: 3
			},

			{
				 tiles:[[d,g,n,n,n,n,n,n,n,n,n,a,b],
						[m,x,x,x,x,x,i,x,x,x,x,x,c],
						[w,x,N,N,N,N,o,N,N,N,N,x,e],
						[w,x,N,N,N,N,o,N,N,N,N,x,e],
						[w,x,N,N,N,o,o,o,N,N,N,x,e],
						[w,x,N,N,o,o,o,o,o,N,N,x,e],
						[w,l,o,o,o,o,o,o,o,o,o,j,e],
						[w,x,N,N,o,o,o,o,o,N,N,x,e],
						[w,x,N,N,N,o,o,o,N,N,N,x,e],
						[w,x,N,N,N,N,o,N,N,N,N,x,e],
						[w,x,N,N,N,N,o,N,N,N,N,x,e],
						[p,x,x,x,x,x,k,x,x,x,x,x,t],
						[f,q,s,s,s,s,s,s,s,s,s,r,h]],

				isRoom: true,
				frequency: 2
			},

			{
				 tiles:[[d,g,n,n,n,n,n,n,n,n,n,a,b],
						[m,x,x,x,x,x,i,x,x,x,x,x,c],
						[w,x,o,o,o,o,o,o,o,o,o,x,e],
						[w,x,o,N,N,N,o,N,N,N,o,x,e],
						[w,x,o,N,N,N,o,N,N,N,o,x,e],
						[w,x,o,o,N,o,o,o,N,o,o,x,e],
						[w,l,o,o,o,o,o,o,o,o,o,j,e],
						[w,x,o,o,N,o,o,o,N,o,o,x,e],
						[w,x,o,N,N,N,o,N,N,N,o,x,e],
						[w,x,o,N,N,N,o,N,N,N,o,x,e],
						[w,x,o,o,o,o,o,o,o,o,o,x,e],
						[p,x,x,x,x,x,k,x,x,x,x,x,t],
						[f,q,s,s,s,s,s,s,s,s,s,r,h]],

				isRoom: true,
				frequency: 2
			},

			{
				 tiles:[[d,g,n,n,n,n,n,n,n,n,n,a,b],
						[m,x,x,x,x,x,i,x,x,x,x,x,c],
						[w,x,o,o,o,o,o,o,o,o,o,x,e],
						[w,x,o,o,o,o,o,o,o,o,o,x,e],
						[w,x,o,o,x,x,o,x,x,o,o,x,e],
						[w,x,o,o,x,x,x,x,x,o,o,x,e],
						[w,l,o,o,o,x,x,x,o,o,o,j,e],
						[w,x,o,o,x,x,x,x,x,o,o,x,e],
						[w,x,o,o,x,x,o,x,x,o,o,x,e],
						[w,x,o,o,o,o,o,o,o,o,o,x,e],
						[w,x,o,o,o,o,o,o,o,o,o,x,e],
						[p,x,x,x,x,x,k,x,x,x,x,x,t],
						[f,q,s,s,s,s,s,s,s,s,s,r,h]],

				isRoom: true,
				frequency: 3
			},

			{
				 tiles:[[d,g,n,n,n,n,n,n,n,n,n,a,b],
						[m,d,g,x,x,x,i,x,x,x,a,b,c],
						[w,m,x,x,o,o,o,o,o,x,x,c,e],
						[w,x,x,o,o,o,o,o,o,o,x,x,e],
						[w,x,o,o,x,x,o,x,x,o,o,x,e],
						[w,x,o,o,x,x,o,x,x,o,o,x,e],
						[w,l,o,o,o,o,o,o,o,o,o,j,e],
						[w,x,o,x,x,x,o,x,x,x,o,x,e],
						[w,x,o,o,x,x,x,x,x,o,o,x,e],
						[w,x,x,o,o,x,x,x,o,o,x,x,e],
						[w,p,x,x,o,o,o,o,o,x,x,x,e],
						[p,f,q,x,x,x,k,x,x,x,r,h,t],
						[f,q,s,s,s,s,s,s,s,s,s,r,h]],

				isRoom: true,
				frequency: 3
			},

			{
				 tiles:[[d,g,n,n,n,n,n,n,n,n,n,a,b],
						[m,o,o,o,o,o,o,o,o,o,o,o,c],
						[w,o,o,o,o,o,o,o,o,o,o,o,e],
						[w,o,o,o,o,o,o,o,o,o,o,o,e],
						[w,o,o,o,o,o,o,o,o,o,o,o,e],
						[w,o,o,o,o,o,o,o,o,o,o,o,e],
						[w,o,o,o,o,o,o,o,o,o,o,o,e],
						[w,o,o,o,o,o,o,o,o,o,o,o,e],
						[w,o,o,o,o,o,o,o,o,o,o,o,e],
						[w,o,o,o,o,o,o,o,o,o,o,o,e],
						[w,o,o,o,o,o,o,o,o,o,o,o,e],
						[p,o,o,o,o,o,o,o,o,o,o,o,t],
						[f,q,s,s,s,s,s,s,s,s,s,r,h]],

				isRoom: false,
				frequency: 1
			},

			{
				 tiles:[[d,g,n,n,n,n,n,n,n,n,n,a,b],
						[m,o,o,o,o,o,o,o,o,o,o,o,c],
						[w,o,o,o,o,o,o,o,o,o,o,o,e],
						[w,o,o,o,o,o,o,o,o,o,o,o,e],
						[w,o,o,o,o,u,o,u,o,o,o,o,e],
						[w,o,o,o,u,u,o,u,u,o,o,o,e],
						[w,o,o,o,o,o,o,o,o,o,o,o,e],
						[w,o,o,o,u,u,o,u,u,o,o,o,e],
						[w,o,o,o,o,u,o,u,o,o,o,o,e],
						[w,o,o,o,o,o,o,o,o,o,o,o,e],
						[w,o,o,o,o,o,o,o,o,o,o,o,e],
						[p,o,o,o,o,o,o,o,o,o,o,o,t],
						[f,q,s,s,s,s,s,s,s,s,s,r,h]],

				isRoom: false,
				frequency: 1
			}
		],

		2 :[ 
			{
				 tiles:[[d,g,n,n,n,n,n,n,n,n,n,a,b],			
						[m,x,x,x,x,x,i,x,x,x,x,x,c],
						[w,x,o,o,o,o,o,o,o,o,o,x,e],
						[w,x,o,o,o,o,o,o,o,o,o,x,e],
						[w,x,o,o,x,x,o,x,x,o,o,x,e],
						[w,x,o,o,x,x,o,x,x,o,o,x,e],
						[w,l,o,o,o,o,o,o,o,o,o,j,e],
						[w,x,o,o,x,x,o,x,x,o,o,x,e],
						[w,x,o,o,x,x,o,x,x,o,o,x,e],
						[w,x,o,o,o,o,o,o,o,o,o,x,e],
						[w,x,o,o,o,o,o,o,o,o,o,x,e],
						[p,x,x,o,o,u,o,u,o,o,x,x,t],
						[f,x,x,o,o,u,o,u,o,o,x,x,h],
						[d,x,x,o,o,u,o,u,o,o,x,x,b],
						[m,x,x,o,o,u,o,u,o,o,x,x,c],
						[w,x,o,o,o,o,o,o,o,o,o,x,e],
						[w,x,o,o,o,o,o,o,o,o,o,x,e],
						[w,x,o,o,x,x,o,x,x,o,o,x,e],
						[w,x,o,o,x,x,o,x,x,o,o,x,e],
						[w,l,o,o,o,o,o,o,o,o,o,j,e],
						[w,x,o,o,x,x,o,x,x,o,o,x,e],
						[w,x,o,o,x,x,o,x,x,o,o,x,e],
						[w,x,o,o,o,o,o,o,o,o,o,x,e],
						[w,x,o,o,o,o,o,o,o,o,o,x,e],
						[p,x,x,x,x,x,k,x,x,x,x,x,t],
						[f,q,s,s,s,s,s,s,s,s,s,r,h]],

				isRoom: true,
				frequency: 1
			},

			{
				 tiles:[[d,g,n,n,n,n,n,n,n,n,n,a,b],			
						[m,x,x,x,x,x,i,x,x,x,x,x,c],
						[w,x,o,o,o,o,o,o,o,o,o,x,e],
						[w,x,o,o,o,o,o,o,o,o,o,x,e],
						[w,x,x,u,x,y,x,o,o,u,o,x,e],
						[w,x,o,o,o,o,u,o,o,u,o,x,e],
						[w,l,o,o,o,o,x,o,o,u,o,j,e],
						[w,x,o,o,o,o,x,o,o,u,o,x,e],
						[w,x,o,o,o,o,u,o,o,u,o,x,e],
						[w,x,u,x,y,x,x,o,o,u,o,x,e],
						[w,x,o,o,o,o,o,o,o,u,o,x,e],
						[p,x,o,o,o,o,o,o,u,u,o,x,t],
						[f,x,o,o,o,o,o,u,u,o,o,x,h],
						[d,x,o,u,o,o,o,o,o,o,o,x,b],
						[m,x,o,u,o,o,o,o,o,o,o,x,c],
						[w,x,o,u,o,x,u,x,o,o,o,x,e],
						[w,x,o,u,o,u,u,u,o,o,o,x,e],
						[w,x,o,u,o,x,u,x,o,o,o,x,e],
						[w,x,o,u,o,o,o,o,o,o,o,x,e],
						[w,l,o,u,o,o,o,o,o,o,o,j,e],
						[w,x,o,u,o,o,o,x,u,x,o,x,e],
						[w,x,o,u,o,o,o,u,u,u,o,x,e],
						[w,x,o,u,o,o,o,x,u,x,o,x,e],
						[w,x,o,u,o,o,o,o,o,o,o,x,e],
						[p,x,x,x,x,x,k,x,x,x,x,x,t],
						[f,q,s,s,s,s,s,s,s,s,s,r,h]],

				isRoom: true,
				frequency: 1
			},

			{
				 tiles:[[d,g,n,n,n,n,n,n,n,n,n,a,b],			
						[m,x,x,x,x,x,i,x,x,x,x,x,c],
						[w,x,o,o,o,o,o,o,o,o,o,x,e],
						[w,x,o,N,N,N,o,N,N,N,o,x,e],
						[w,x,o,N,N,N,o,N,N,N,o,x,e],
						[w,x,o,N,N,N,o,N,N,N,o,x,e],
						[w,l,o,o,o,o,o,o,o,o,o,j,e],
						[w,x,o,o,o,o,o,o,o,o,o,x,e],
						[w,x,o,o,o,o,o,o,o,o,o,x,e],
						[w,x,o,x,x,x,o,x,x,x,o,x,e],
						[w,x,o,o,o,o,o,o,o,o,o,x,e],
						[p,x,x,x,o,o,o,o,o,x,x,x,t],
						[f,x,x,x,o,x,o,x,o,x,x,x,h],
						[d,x,x,x,o,o,o,o,o,x,x,x,b],
						[m,x,o,o,o,o,o,o,o,o,o,x,c],
						[w,x,o,x,x,x,o,x,x,x,o,x,e],
						[w,x,o,o,o,o,o,o,o,o,o,x,e],
						[w,x,o,o,o,o,o,o,o,o,o,x,e],
						[w,x,o,u,o,o,o,o,o,u,o,x,e],
						[w,l,o,u,o,o,o,o,o,u,o,j,e],
						[w,x,o,u,u,u,u,u,u,u,o,x,e],
						[w,x,o,N,N,N,N,N,N,N,o,x,e],
						[w,x,o,N,N,N,N,N,N,N,o,x,e],
						[w,x,o,o,o,o,o,o,o,o,o,x,e],
						[p,x,x,x,x,x,k,x,x,x,x,x,t],
						[f,q,s,s,s,s,s,s,s,s,s,r,h]],

				isRoom: true,
				frequency: 1
			}
		],

		3 :[
			{
				 tiles:[[d,g,n,n,n,n,n,n,n,n,n,a,b],			
						[m,x,x,x,x,x,i,x,x,x,x,x,c],
						[w,x,x,x,x,x,o,x,x,x,x,x,e],
						[w,x,x,x,x,x,o,x,x,x,x,x,e],
						[w,x,x,x,o,o,o,o,o,x,x,x,e],
						[w,x,x,x,o,o,o,o,o,x,x,x,e],
						[w,l,o,o,o,o,o,o,o,o,o,j,e],
						[w,x,o,o,o,o,o,x,o,o,o,x,e],
						[w,x,o,o,o,o,x,x,o,o,o,x,e],
						[w,x,o,o,o,x,x,o,o,o,o,x,e],
						[w,x,o,o,o,x,o,o,o,o,o,x,e],
						[p,x,o,o,x,x,o,o,o,o,o,x,e],
						[f,x,o,o,x,o,o,o,o,o,x,x,t],
						[d,x,o,o,o,o,o,o,o,x,x,x,b,g,n,n,n,n,n,n,n,n,n,n,a,b],
						[m,x,o,o,o,o,o,o,x,x,x,x,x,x,x,x,x,x,x,i,x,x,x,x,x,c],
						[w,x,o,o,o,o,o,o,x,x,x,x,x,x,o,o,o,o,o,o,x,x,x,x,x,e],
						[w,x,o,o,o,o,o,o,x,x,x,x,x,o,o,o,o,o,o,o,x,x,x,x,x,e],
						[w,x,o,o,o,o,o,o,o,x,x,x,o,o,o,o,o,o,o,o,o,o,x,x,x,e],
						[w,x,o,o,o,o,o,o,o,o,x,x,o,o,o,o,o,o,o,o,o,o,x,x,x,e],
						[w,l,o,o,o,o,x,x,o,o,o,x,x,o,o,o,o,x,x,o,o,o,o,o,j,e],
						[w,x,x,x,o,o,o,x,x,o,o,o,o,o,o,o,x,x,o,o,o,o,x,x,x,e],
						[w,x,x,x,o,o,o,o,x,o,o,o,o,o,x,x,x,o,o,o,o,o,x,x,x,e],
						[w,x,x,x,x,x,o,o,o,o,o,o,o,x,x,x,o,o,o,o,x,x,x,x,x,e],
						[w,x,x,x,x,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,x,x,x,x,e],
						[p,x,x,x,x,x,k,x,x,x,x,x,x,x,x,x,x,x,x,k,x,x,x,x,x,t],
						[f,q,s,s,s,s,s,s,s,s,s,r,h,f,q,s,s,s,s,s,s,s,s,s,r,h]],

				isRoom: true,
				frequency: 1
			},

			{
				 tiles:[[d,g,n,n,n,n,n,n,n,n,n,a,b],			
						[m,x,x,x,x,x,i,x,x,x,x,x,c],
						[w,x,o,o,o,o,o,o,o,o,o,x,e],
						[w,x,o,x,x,o,o,o,x,x,o,x,e],
						[w,x,o,x,x,o,u,o,u,u,o,x,e],
						[w,x,o,u,u,o,u,o,x,x,o,x,e],
						[w,l,o,x,x,o,o,o,x,x,o,j,e],
						[w,x,o,x,x,o,o,o,x,x,o,x,e],
						[w,x,o,o,o,o,o,o,o,o,o,x,e],
						[w,x,o,o,u,u,o,u,u,o,o,x,e],
						[w,x,o,o,o,o,o,o,o,o,o,x,e],
						[p,x,o,x,x,o,o,o,x,x,o,x,e],
						[f,x,o,x,x,o,o,o,x,x,o,x,t],
						[d,x,o,x,x,o,o,o,x,x,o,x,b,g,n,n,n,n,n,n,n,n,n,n,a,b],
						[m,x,o,x,x,u,o,o,u,u,o,x,x,x,x,x,x,x,x,i,x,x,x,x,x,c],
						[w,x,o,x,x,o,o,o,x,x,o,o,x,x,x,x,x,o,o,o,x,x,x,x,x,e],
						[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,u,o,o,o,o,o,o,o,x,e],
						[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,u,u,u,o,o,x,e],
						[w,x,o,x,x,o,o,o,x,x,o,o,o,u,u,o,o,o,o,u,u,u,o,o,x,e],
						[w,l,o,u,u,o,o,u,x,x,o,o,o,u,u,o,o,o,o,o,o,o,o,o,j,e],
						[w,x,o,x,x,o,o,o,x,x,o,o,o,u,u,o,o,o,o,u,u,u,o,o,x,e],
						[w,x,o,x,x,o,o,o,x,x,o,o,o,o,o,o,o,o,o,u,u,u,o,o,x,e],
						[w,x,o,x,x,o,o,o,x,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
						[w,x,o,o,o,o,o,o,o,o,o,o,x,x,x,x,x,o,o,o,x,x,x,x,x,e],
						[p,x,x,x,x,x,k,x,x,x,x,x,x,x,x,x,x,x,x,k,x,x,x,x,x,t],
						[f,q,s,s,s,s,s,s,s,s,s,r,h,f,q,s,s,s,s,s,s,s,s,s,r,h]],

				isRoom: true,
				frequency: 1
			}
		],

		4 :[
			{
				 tiles:[[d,g,n,n,n,n,n,n,n,n,n,a,b,d,g,n,n,n,n,n,n,n,n,n,a,b],	
						[m,x,x,x,x,x,i,x,x,x,x,x,x,x,x,x,x,x,x,i,x,x,x,x,x,c],
						[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,x,x,e],
						[w,x,o,o,o,x,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,x,e],
						[w,x,o,o,x,x,x,o,o,o,o,o,o,o,o,o,o,x,x,x,o,o,o,o,x,e],
						[w,x,o,x,x,x,o,o,o,o,o,x,u,u,o,o,o,o,x,x,x,o,o,o,x,e],
						[w,l,o,x,x,o,o,o,o,o,o,o,o,o,o,o,u,o,o,o,x,x,o,o,j,e],
						[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,u,o,o,o,x,o,o,x,e],
						[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
						[w,x,o,o,o,o,u,o,o,o,o,o,u,u,o,o,o,o,o,u,o,o,o,o,x,e],
						[w,x,x,y,x,x,u,o,o,o,o,u,x,x,u,o,o,o,o,o,u,o,o,o,x,e],
						[p,x,o,o,o,x,u,o,o,o,u,x,x,x,x,u,o,o,o,o,o,o,o,o,x,t],
						[f,x,o,o,o,x,u,o,o,u,x,x,x,x,x,x,u,o,o,o,u,o,o,o,x,h],
						[d,x,x,x,x,x,u,o,o,u,x,x,x,x,x,x,u,o,o,o,u,o,o,o,x,b],
						[m,x,o,o,o,o,o,o,o,o,u,x,x,x,x,u,o,o,o,o,o,o,o,o,x,c],
						[w,x,o,o,o,o,o,o,o,o,o,u,x,x,u,o,o,o,o,o,o,o,o,o,x,e],
						[w,x,o,o,o,o,x,o,o,o,o,o,u,u,o,o,o,o,u,x,x,x,x,o,x,e],
						[w,x,o,o,o,o,o,u,o,o,o,o,o,o,o,o,o,o,x,o,o,o,x,x,x,e],
						[w,x,o,o,x,o,o,o,u,o,o,o,o,o,o,o,o,o,o,o,x,o,o,o,x,e],
						[w,l,o,o,u,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,x,o,o,j,e],
						[w,x,o,o,u,o,o,o,o,o,o,x,u,u,x,o,o,o,x,x,x,x,x,x,x,e],
						[w,x,u,o,o,u,u,o,u,u,o,z,o,o,x,D,o,o,o,x,x,x,x,x,x,e],
						[w,x,u,o,o,o,o,o,o,o,o,x,o,o,x,o,o,o,o,o,x,x,x,x,x,e],
						[w,x,o,o,u,u,o,o,u,u,o,x,o,o,x,o,o,o,o,o,x,x,x,x,x,e],
						[p,x,x,x,x,x,k,x,x,x,x,x,x,x,x,x,x,x,x,k,x,x,x,x,x,t],
						[f,q,s,s,s,s,s,s,s,s,s,r,h,f,q,s,s,s,s,s,s,s,s,s,r,h]],

				isRoom: true,
				frequency: 1
			}
		]
	},
	GENERATOR_TEMPLATES : {

		interesting: true,
		discoverText: "You've found a generator.",

	    1 :[
			{
				 tiles:[[d,g,n,n,n,n,n,n,n,n,n,a,b],			
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

				isRoom: true,
				frequency: 1
			}
		],

		2 :[ 
			{
				 tiles:[[d,g,n,n,n,n,n,n,n,n,n,a,b],			
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

				isRoom: true,
				frequency: 1
			}
		],

		3 :[
			{
				 tiles:[[d,g,n,n,n,n,n,n,n,n,n,a,b],			
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

				isRoom: true,
				frequency: 1
			}
		],

		4 :[
			{
				 tiles:[[d,g,n,n,n,n,n,n,n,n,n,a,b,d,g,n,n,n,n,n,n,n,n,n,a,b],	
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
						[f,q,s,s,s,s,s,s,s,s,s,r,h,f,q,s,s,s,s,s,s,s,s,s,r,h]],

				isRoom: true,
				frequency: 1
			}
		]
	},
	CITY_HALL_TEMPLATES : {

		interesting: true,
		discoverText: "You happen upon the City's mainframe.",

	    1 :[
			{
				 tiles:[[d,g,n,n,n,n,n,n,n,n,n,a,b],			
						[m,x,x,x,x,x,i,x,x,x,x,x,c],
						[w,x,o,o,o,o,o,u,o,o,o,x,e],
						[w,x,o,u,o,o,o,o,o,x,o,x,e],
						[w,x,o,u,o,o,u,o,ᾉ,o,o,x,e],
						[w,x,o,o,o,o,u,o,o,o,u,x,e],
						[w,l,o,u,o,o,u,u,u,o,o,j,e],
						[w,x,o,u,o,o,o,o,o,o,o,x,e],
						[w,x,o,o,o,o,o,o,o,o,o,x,e],
						[w,x,o,x,o,u,u,o,u,u,o,x,e],
						[w,x,o,o,o,o,o,o,o,o,o,x,e],
						[p,x,x,x,x,x,k,x,x,x,x,x,t],
						[f,q,s,s,s,s,s,s,s,s,s,r,h]],

				isRoom: true,
				frequency: 1
			}
		],

		2 :[ 
			{
				 tiles:[[d,g,n,n,n,n,n,n,n,n,n,a,b],			
						[m,x,x,x,x,x,i,x,x,x,x,x,c],
						[w,x,o,ᾉ,o,o,o,o,o,o,o,x,e],
						[w,x,o,o,o,o,o,o,u,u,o,x,e],
						[w,x,o,o,o,o,o,o,o,o,o,x,e],
						[w,x,x,u,u,x,x,x,y,y,x,x,e],
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

				isRoom: true,
				frequency: 1
			}
		],

		3 :[
			{
				 tiles:[[d,g,n,n,n,n,n,n,n,n,n,a,b],			
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
						[w,x,u,ᾉ,o,o,o,o,o,x,o,o,u,o,o,o,o,o,o,o,o,o,o,o,x,e],
						[w,x,u,u,o,o,o,o,o,x,o,o,o,o,o,o,u,u,o,o,o,u,u,o,x,e],
						[p,x,x,x,x,x,k,x,x,x,x,x,x,x,x,x,x,x,x,k,x,x,x,x,x,t],
						[f,q,s,s,s,s,s,s,s,s,s,r,h,f,q,s,s,s,s,s,s,s,s,s,r,h]],

				isRoom: true,
				frequency: 1
			}
		],

		4 :[
			{
				 tiles:[[d,g,n,n,n,n,n,n,n,n,n,a,b,d,g,n,n,n,n,n,n,n,n,n,a,b],	
						[m,x,x,x,x,x,i,x,x,x,x,x,x,x,x,x,x,x,x,i,x,x,x,x,x,c],
						[w,x,o,o,o,o,o,o,x,o,o,o,x,o,o,x,o,o,x,o,o,x,o,o,x,e],
						[w,x,o,o,o,o,o,o,x,o,o,o,x,o,o,x,o,o,x,o,o,x,o,o,x,e],
						[w,x,o,u,u,u,o,o,z,o,o,o,z,o,o,o,o,o,o,o,o,o,o,o,x,e],
						[w,x,o,o,o,o,o,o,x,o,o,o,x,o,o,o,o,o,o,o,o,o,o,o,x,e],
						[w,l,o,o,o,o,o,o,x,o,o,o,x,o,o,o,x,o,x,o,o,x,o,o,j,e],
						[w,x,o,o,o,o,o,o,x,o,o,o,x,o,o,o,x,o,x,o,o,x,o,o,x,e],
						[w,x,x,x,y,x,x,x,x,o,o,o,x,x,x,x,x,y,x,x,x,x,y,x,x,e],
						[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
						[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
						[p,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,t],
						[f,x,x,x,y,x,x,x,x,o,o,o,x,x,x,x,x,y,x,x,x,x,y,x,x,h],
						[d,x,o,o,o,x,o,o,x,o,o,o,x,o,o,o,o,o,o,o,o,o,o,o,x,b],
						[m,x,o,o,o,x,o,o,x,o,o,o,x,o,o,o,o,o,o,o,o,o,o,o,x,c],
						[w,x,o,o,o,o,o,o,x,o,o,o,x,o,o,o,u,u,u,o,o,o,o,o,x,e],
						[w,x,x,x,y,x,x,x,x,o,o,o,x,o,o,o,o,o,o,o,o,o,o,o,x,e],
						[w,x,o,o,o,x,o,o,x,o,o,o,x,o,o,x,o,o,o,o,x,o,o,o,x,e],
						[w,x,o,o,o,o,o,o,x,o,o,o,x,o,o,o,o,o,o,o,o,o,o,o,x,e],
						[w,l,o,o,o,o,o,o,x,o,o,o,x,o,o,o,o,o,o,u,o,u,o,o,j,e],
						[w,x,o,o,o,o,o,o,x,o,o,o,x,x,y,x,x,o,o,o,o,o,o,o,x,e],
						[w,x,o,o,o,o,o,o,x,o,o,o,x,o,o,o,x,o,o,u,u,u,o,o,x,e],
						[w,x,o,u,u,o,o,o,x,o,o,o,x,o,o,o,x,o,o,o,o,o,o,o,x,e],
						[w,x,o,o,o,o,o,o,x,o,o,o,x,o,ᾉ,o,x,o,o,o,o,o,o,o,x,e],
						[p,x,x,x,x,x,k,x,x,x,x,x,x,x,x,x,x,x,x,k,x,x,x,x,x,t],
						[f,q,s,s,s,s,s,s,s,s,s,r,h,f,q,s,s,s,s,s,s,s,s,s,r,h]],

				isRoom: true,
				frequency: 1
			}
		]
	},
	CITY_OS_TEMPLATES : {
		
		interesting: true,
		discoverText: "You've found the City's OS!",

		1 :[
			 {
				 tiles:[[d,g,n,n,n,n,n,n,n,n,n,a,b],			
						[m,x,x,x,x,x,i,x,x,x,x,x,c],
						[w,x,o,o,o,o,o,o,o,o,o,x,e],
						[w,x,o,u,o,o,o,o,o,u,o,x,e],
						[w,x,o,o,N,N,o,N,N,o,o,x,e],
						[w,x,o,o,N,o,o,o,N,o,o,x,e],
						[w,l,o,o,o,o,C,o,o,o,o,j,e],
						[w,x,o,o,N,o,o,o,N,o,o,x,e],
						[w,x,o,o,N,N,o,N,N,o,o,x,e],
						[w,x,o,u,o,o,o,o,o,u,o,x,e],
						[w,x,o,o,o,o,o,o,o,o,o,x,e],
						[p,x,x,x,x,x,k,x,x,x,x,x,t],
						[f,q,s,s,s,s,s,s,s,s,s,r,h]],

				isRoom: true,
				frequency: 1
			}
		]
	},
	GENES_TEMPLATES : {
		
		interesting: true,
		discoverText: "You discover a cell-well.",

		1 :[
			 {
				 tiles:[[d,g,n,n,n,n,n,n,n,n,n,a,b],			
						[m,x,x,x,x,x,i,x,x,x,x,x,c],
						[w,x,N,N,u,o,o,o,u,N,N,x,e],
						[w,x,N,N,u,o,o,o,u,N,N,x,e],
						[w,x,u,u,x,o,o,o,x,u,u,x,e],
						[w,x,o,o,o,o,o,o,o,o,o,x,e],
						[w,l,o,o,o,o,E,o,o,o,o,j,e],
						[w,x,o,o,o,o,o,o,o,o,o,x,e],
						[w,x,u,u,x,o,o,o,x,u,u,x,e],
						[w,x,N,N,u,o,o,o,u,N,N,x,e],
						[w,x,N,N,u,o,o,o,u,N,N,x,e],
						[p,x,x,x,x,x,k,x,x,x,x,x,t],
						[f,q,s,s,s,s,s,s,s,s,s,r,h]],

				isRoom: true,
				frequency: 1
			}
		],

		2 :[ 
			{
				 tiles:[[d,g,n,n,n,n,n,n,n,n,n,a,b],			
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

				isRoom: true,
				frequency: 1
			}
		],

		3 :[
			{
				 tiles:[[d,g,n,n,n,n,n,n,n,n,n,a,b],			
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

				isRoom: true,
				frequency: 1
			}
		],

		4 :[
			{
				 tiles:[[d,g,n,n,n,n,n,n,n,n,n,a,b,d,g,n,n,n,n,n,n,n,n,n,a,b],	
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
						[f,q,s,s,s,s,s,s,s,s,s,r,h,f,q,s,s,s,s,s,s,s,s,s,r,h]],

				isRoom: true,
				frequency: 1
			}
		]
	},
	MASTERMIND_TEMPLATES : {
		
		interesting: true,
		discoverText: "You discover some mysterious machine.",

		1 :[
			{
				 tiles:[[d,g,n,n,n,n,n,n,n,n,n,a,b],			
						[m,x,x,x,x,x,i,x,x,x,x,x,c],
						[w,x,o,o,o,o,o,o,o,o,o,x,e],
						[w,x,o,u,u,u,o,u,u,u,o,x,e],
						[w,x,o,o,o,o,o,o,o,o,o,x,e],
						[w,x,o,o,P,o,o,o,o,P,o,x,e],
						[w,l,o,o,o,o,M,o,o,o,o,j,e],
						[w,x,o,P,o,o,o,o,P,o,o,x,e],
						[w,x,o,o,o,o,o,o,o,o,o,x,e],
						[w,x,o,u,u,u,o,u,u,u,o,x,e],
						[w,x,o,o,o,o,o,o,o,o,o,x,e],
						[p,x,x,x,x,x,k,x,x,x,x,x,t],
						[f,q,s,s,s,s,s,s,s,s,s,r,h]],

				isRoom: true,
				frequency: 1
			},

			{
				 tiles:[[d,g,n,n,n,n,n,n,n,n,n,a,b],			
						[m,x,x,x,x,x,i,x,x,x,x,x,c],
						[w,x,x,x,o,o,o,o,o,o,o,x,e],
						[w,x,x,o,o,o,o,o,o,o,o,x,e],
						[w,x,o,o,x,o,o,P,P,o,o,x,e],
						[w,x,o,o,o,o,o,P,P,o,o,x,e],
						[w,l,o,o,o,o,o,o,o,o,o,j,e],
						[w,x,o,o,o,M,o,o,o,o,o,x,e],
						[w,x,o,x,x,o,o,o,x,o,o,x,e],
						[w,x,o,x,x,o,o,o,o,o,x,x,e],
						[w,x,o,o,o,o,o,o,o,x,x,x,e],
						[p,x,x,x,x,x,k,x,x,x,x,x,t],
						[f,q,s,s,s,s,s,s,s,s,s,r,h]],

				isRoom: true,
				frequency: 1
			},

			{
				 tiles:[[d,g,n,n,n,n,n,n,n,n,n,a,b],			
						[m,x,x,x,x,x,i,x,x,x,x,x,c],
						[w,x,x,x,o,o,o,o,o,x,x,x,e],
						[w,x,x,x,o,u,u,u,o,x,x,x,e],
						[w,x,o,o,o,o,o,o,o,o,o,x,e],
						[w,x,o,o,o,P,o,P,o,o,o,x,e],
						[w,l,o,o,o,o,M,o,o,o,o,j,e],
						[w,x,o,o,o,P,o,P,o,o,o,x,e],
						[w,x,o,o,o,o,o,o,o,o,o,x,e],
						[w,x,x,x,o,u,u,u,o,x,x,x,e],
						[w,x,x,x,o,o,o,o,o,x,x,x,e],
						[p,x,x,x,x,x,k,x,x,x,x,x,t],
						[f,q,s,s,s,s,s,s,s,s,s,r,h]],

				isRoom: true,
				frequency: 1
			}
		]
	},
	CLONES_HQ_TEMPLATE :{

		interesting: false,

		1 :[
			 {
				 tiles:[[d,g,n,n,n,n,n,n,n,n,n,a,b],			
						[m,x,x,x,x,x,i,x,x,x,x,x,c],
						[w,x,v,o,o,o,o,o,o,o,o,x,e],
						[w,x,o,o,o,o,o,o,o,o,o,x,e],
						[w,x,o,o,H,o,o,o,H,o,o,x,e],
						[w,x,o,o,o,o,o,o,o,o,o,x,e],
						[w,l,o,o,o,o,o,o,o,o,o,j,e],
						[w,x,o,o,o,o,o,o,o,o,o,x,e],
						[w,x,o,o,H,o,o,o,H,o,o,x,e],
						[w,x,o,o,o,o,o,o,o,o,o,x,e],
						[w,x,o,o,o,o,o,o,o,o,o,x,e],
						[p,x,x,x,x,x,k,x,x,x,x,x,t],
						[f,q,s,s,s,s,s,s,s,s,s,r,h]],

				isRoom: true,
				frequency: 1
			}
		]
	},
	HIVEMIND_HQ_TEMPLATE :{

		interesting: true,
		discoverText: "The run down lab still has active defenses, watch out!",

		1 :[
			 {
				 tiles:[[d,g,n,n,n,n,n,n,n,n,n,a,b],			
						[m,x,x,x,x,x,i,x,x,x,x,x,c],
						[w,x,o,o,o,o,o,o,o,o,o,x,e],
						[w,x,o,o,o,o,o,o,o,o,o,x,e],
						[w,x,o,o,H,o,o,o,H,o,o,x,e],
						[w,x,o,o,o,o,o,o,o,o,o,x,e],
						[w,l,o,o,o,o,o,o,o,o,o,j,e],
						[w,x,o,o,o,o,o,o,o,o,o,x,e],
						[w,x,o,o,H,o,o,o,H,o,o,x,e],
						[w,x,o,o,o,o,o,o,o,o,o,x,e],
						[w,x,o,o,o,o,o,o,o,o,o,x,e],
						[p,x,x,x,x,x,k,x,x,x,x,x,t],
						[f,q,s,s,s,s,s,s,s,s,s,r,h]],

				isRoom: true,
				frequency: 1
			}
		]
	},
	ANIMAL_HQ_TEMPLATE :{

		interesting: true,
		discoverText: "Somebody installed sentries in this animal exhibit!",

		1 :[
			 {
				 tiles:[[d,g,n,n,n,n,n,n,n,n,n,a,b],			
						[m,x,x,x,x,x,i,x,x,x,x,x,c],
						[w,x,o,o,o,o,o,o,o,o,o,x,e],
						[w,x,o,o,o,o,o,o,o,o,o,x,e],
						[w,x,o,o,H,o,o,o,H,o,o,x,e],
						[w,x,o,o,o,o,o,o,o,o,o,x,e],
						[w,l,o,o,o,o,o,o,o,o,o,j,e],
						[w,x,o,o,o,o,o,o,o,o,o,x,e],
						[w,x,o,o,H,o,o,o,H,o,o,x,e],
						[w,x,o,o,o,o,o,o,o,o,o,x,e],
						[w,x,o,o,o,o,o,o,o,o,o,x,e],
						[p,x,x,x,x,x,k,x,x,x,x,x,t],
						[f,q,s,s,s,s,s,s,s,s,s,r,h]],

				isRoom: true,
				frequency: 1
			}
		]
	},
	SOFTWARE_HQ_TEMPLATE :{

		interesting: true,
		discoverText: "Watch out for real sentries!",

		1 :[
			 {
				 tiles:[[d,g,n,n,n,n,n,n,n,n,n,a,b],			
						[m,x,x,x,x,x,i,x,x,x,x,x,c],
						[w,x,o,o,o,o,o,o,o,o,o,x,e],
						[w,x,o,o,o,o,o,o,o,o,o,x,e],
						[w,x,o,o,H,o,o,o,H,o,o,x,e],
						[w,x,o,o,o,o,o,o,o,o,o,x,e],
						[w,l,o,o,o,o,o,o,o,o,o,j,e],
						[w,x,o,o,o,o,o,o,o,o,o,x,e],
						[w,x,o,o,H,o,o,o,H,o,o,x,e],
						[w,x,o,o,o,o,o,o,o,o,o,x,e],
						[w,x,o,o,o,o,o,o,o,o,o,x,e],
						[p,x,x,x,x,x,k,x,x,x,x,x,t],
						[f,q,s,s,s,s,s,s,s,s,s,r,h]],

				isRoom: true,
				frequency: 1
			}
		]
	},
	ROBOT_HQ_TEMPLATE :{

		interesting: true,
		discoverText: "This robot assembly plant seems well and defended!",

		1 :[
			 {
				 tiles:[[d,g,n,n,n,n,n,n,n,n,n,a,b],			
						[m,x,x,x,x,x,i,x,x,x,x,x,c],
						[w,x,o,o,o,o,o,o,o,o,o,x,e],
						[w,x,o,o,o,o,o,o,o,o,o,x,e],
						[w,x,o,o,H,o,o,o,H,o,o,x,e],
						[w,x,o,o,o,o,o,o,o,o,o,x,e],
						[w,l,o,o,o,o,o,o,o,o,o,j,e],
						[w,x,o,o,o,o,o,o,o,o,o,x,e],
						[w,x,o,o,H,o,o,o,H,o,o,x,e],
						[w,x,o,o,o,o,o,o,o,o,o,x,e],
						[w,x,o,o,o,o,o,o,o,o,o,x,e],
						[p,x,x,x,x,x,k,x,x,x,x,x,t],
						[f,q,s,s,s,s,s,s,s,s,s,r,h]],

				isRoom: true,
				frequency: 1
			}
		]
	},
	SURVIVOR_HQ_TEMPLATE :{

		interesting: true,
		discoverText: "You've found the WarBoss's WarRoom!",

		1 :[
			 {
				 tiles:[[d,g,n,n,n,n,n,n,n,n,n,a,b],			
						[m,x,x,x,x,x,i,x,x,x,x,x,c],
						[w,x,o,o,o,o,o,o,o,o,o,x,e],
						[w,x,o,o,o,o,o,o,o,o,o,x,e],
						[w,x,o,o,H,o,o,o,H,o,o,x,e],
						[w,x,o,o,o,o,o,o,o,o,o,x,e],
						[w,l,o,o,o,o,o,o,o,o,o,j,e],
						[w,x,o,o,o,o,o,o,o,o,o,x,e],
						[w,x,o,o,H,o,o,o,H,o,o,x,e],
						[w,x,o,o,o,o,o,o,o,o,o,x,e],
						[w,x,o,o,o,o,o,o,o,o,o,x,e],
						[p,x,x,x,x,x,k,x,x,x,x,x,t],
						[f,q,s,s,s,s,s,s,s,s,s,r,h]],

				isRoom: true,
				frequency: 1
			}
		]
	},
	BANK_TEMPLATES : {

		interesting: true,
		discoverText: "You discover an abandoned bank.",

		1 :[
			 {
				 tiles:[[d,g,n,n,n,n,n,n,n,n,n,a,b],			
						[m,x,x,x,x,x,i,x,x,x,x,x,c],
						[w,x,D,D,D,x,o,o,o,u,o,x,e],
						[w,x,D,D,D,x,o,o,o,x,o,x,e],
						[w,x,D,o,D,x,o,o,o,u,o,x,e],
						[w,x,x,y,x,x,o,o,F,x,o,x,e],
						[w,l,o,o,o,o,o,o,o,o,o,j,e],
						[w,x,o,o,o,o,o,o,o,x,o,x,e],
						[w,x,o,u,u,o,o,o,o,u,o,x,e],
						[w,x,o,u,u,o,o,o,o,x,o,x,e],
						[w,x,o,o,o,o,o,o,o,u,o,x,e],
						[p,x,x,x,x,x,k,x,x,x,x,x,t],
						[f,q,s,s,s,s,s,s,s,s,s,r,h]],

				isRoom: true,
				frequency: 1
			}
		],

		2 :[ 
			{
				 tiles:[[d,g,n,n,n,n,n,n,n,n,n,a,b],			
						[m,x,x,x,x,x,i,x,x,x,x,x,c],
						[w,x,D,o,o,o,o,o,o,o,D,x,e],
						[w,x,o,o,x,o,o,o,x,o,o,x,e],
						[w,x,o,o,o,o,o,o,o,o,o,x,e],
						[w,x,o,o,o,o,o,o,o,o,o,x,e],
						[w,l,o,u,u,u,o,u,u,u,o,j,e],
						[w,x,o,u,o,o,o,o,o,u,o,x,e],
						[w,x,x,x,x,x,y,x,x,x,x,x,e],
						[w,x,o,o,o,o,o,o,o,o,o,x,e],
						[w,x,o,u,o,u,u,u,o,u,o,x,e],
						[p,x,o,u,o,o,o,o,o,u,o,x,t],
						[f,x,L,u,o,o,o,o,o,o,o,x,h],
						[d,x,x,x,x,J,J,J,x,x,x,x,b],
						[m,x,K,o,o,o,o,o,o,o,o,x,c],
						[w,x,o,o,x,x,x,o,o,o,o,x,e],
						[w,x,o,o,o,o,x,x,x,o,o,x,e],
						[w,x,o,o,x,o,D,D,x,o,o,x,e],
						[w,x,J,o,x,D,D,D,x,o,J,x,e],
						[w,l,J,o,x,D,D,F,x,o,J,j,e],
						[w,x,J,o,x,F,D,F,x,o,J,x,e],
						[w,x,o,o,x,x,x,x,x,o,o,x,e],
						[w,x,o,o,o,o,o,o,o,o,o,x,e],
						[w,x,o,o,o,J,J,J,o,o,o,x,e],
						[p,x,x,x,x,x,k,x,x,x,x,x,t],
						[f,q,s,s,s,s,s,s,s,s,s,r,h]],

				isRoom: true,
				frequency: 1
			}
		]
	},
	SUN_ROOM_TEMPLATES : {

		interesting: true,
		discoverText: "You found the Solar Controller. It is happily humming along.",

		1 :[
			 {
				 tiles:[[d,g,n,n,n,n,n,n,n,n,n,a,b],			
						[m,x,x,x,x,x,i,x,x,x,x,x,c],
						[w,x,o,o,o,o,o,o,o,o,o,x,e],
						[w,x,o,o,o,o,o,o,o,o,o,x,e],
						[w,x,o,o,x,x,y,x,x,o,o,x,e],
						[w,x,o,o,x,o,o,o,x,o,o,x,e],
						[w,l,o,o,z,o,T,o,z,o,o,j,e],
						[w,x,o,o,x,o,o,o,x,o,o,x,e],
						[w,x,o,o,x,x,y,x,x,o,o,x,e],
						[w,x,o,o,o,o,o,o,o,o,o,x,e],
						[w,x,o,o,o,o,o,o,o,o,o,x,e],
						[p,x,x,x,x,x,k,x,x,x,x,x,t],
						[f,q,s,s,s,s,s,s,s,s,s,r,h]],

				isRoom: true,
				frequency: 1
			}
		],

		2 :[ 
			{
				 tiles:[[d,g,n,n,n,n,n,n,n,n,n,a,b],			
						[m,x,x,x,x,x,i,x,x,x,x,x,c],
						[w,x,o,o,o,o,o,o,o,o,o,x,e],
						[w,x,o,o,u,o,o,o,u,o,o,x,e],
						[w,x,o,u,x,o,o,o,x,u,o,x,e],
						[w,x,o,o,o,o,o,o,o,o,o,x,e],
						[w,l,o,o,u,u,o,u,u,o,o,j,e],
						[w,x,o,o,o,o,o,o,o,o,o,x,e],
						[w,x,o,o,o,N,o,N,o,o,o,x,e],
						[w,x,u,u,N,N,o,N,N,u,u,x,e],
						[w,x,N,N,N,N,o,N,N,N,N,x,e],
						[p,x,N,N,N,o,o,o,N,N,N,x,t],
						[f,x,N,N,N,o,T,o,N,N,N,x,h],
						[d,x,N,N,N,o,o,o,N,N,N,x,b],
						[m,x,N,N,N,N,o,N,N,N,N,x,c],
						[w,x,N,N,N,N,o,N,N,N,N,x,e],
						[w,x,N,N,N,o,o,o,N,N,N,x,e],
						[w,x,N,N,N,o,o,o,N,N,N,x,e],
						[w,x,N,o,o,o,u,o,o,o,N,x,e],
						[w,l,o,o,o,o,u,o,o,o,o,j,e],
						[w,x,o,o,o,u,u,u,o,o,o,x,e],
						[w,x,o,o,o,o,u,o,o,o,o,x,e],
						[w,x,o,u,u,o,o,o,u,u,o,x,e],
						[w,x,o,o,o,o,o,o,o,o,o,x,e],
						[p,x,x,x,x,x,k,x,x,x,x,x,t],
						[f,q,s,s,s,s,s,s,s,s,s,r,h]],

				isRoom: true,
				frequency: 1
			}
		]
	},
	LIBRARY_TEMPLATES : {

		interesting: true,
		discoverText: "Books! All the books in the world and all the time to read them!",

	    1 :[
			{
				 tiles:[[d,g,n,n,n,n,n,n,n,n,n,a,b],
						[m,x,x,x,x,x,i,x,x,x,x,x,c],
						[w,x,x,ᾊ,ᾊ,x,o,x,ᾊ,ᾊ,x,x,e],
						[w,x,ᾊ,o,o,o,o,o,o,o,ᾊ,x,e],
						[w,x,ᾊ,o,o,o,o,o,o,o,ᾊ,x,e],
						[w,x,x,o,u,u,o,u,u,o,x,x,e],
						[w,l,o,o,u,u,o,u,u,o,o,j,e],
						[w,x,x,o,u,u,o,u,u,o,x,x,e],
						[w,x,ᾊ,o,o,o,o,o,o,o,ᾊ,x,e],
						[w,x,ᾊ,o,o,o,o,o,o,o,ᾊ,x,e],
						[w,x,x,ᾊ,ᾊ,x,o,x,ᾊ,ᾊ,x,x,e],
						[p,x,x,x,x,x,k,x,x,x,x,x,t],
						[f,q,s,s,s,s,s,s,s,s,s,r,h]],

				isRoom: true,
				frequency: 2
			}
		],

		2 :[ 
			{
				 tiles:[[d,g,n,n,n,n,n,n,n,n,n,a,b],			
						[m,x,x,x,x,x,i,x,x,x,x,x,c],
						[w,x,x,ᾊ,ᾊ,x,o,x,ᾊ,ᾊ,x,x,e],
						[w,x,ᾊ,o,o,o,o,o,o,o,ᾊ,x,e],
						[w,x,ᾊ,o,o,o,o,o,o,o,ᾊ,x,e],
						[w,x,x,o,o,o,o,o,o,o,x,x,e],
						[w,l,o,o,o,o,o,o,o,o,o,j,e],
						[w,x,o,o,x,ᾊ,ᾊ,ᾊ,x,o,o,x,e],
						[w,x,o,o,x,ᾊ,ᾊ,ᾊ,x,o,o,x,e],
						[w,x,o,o,o,o,o,o,o,o,o,x,e],
						[w,x,o,x,x,x,o,x,x,x,o,x,e],
						[p,x,o,ᾊ,x,ᾊ,o,ᾊ,x,ᾊ,o,x,t],
						[f,x,o,ᾊ,x,ᾊ,o,ᾊ,x,ᾊ,o,x,h],
						[d,x,o,ᾊ,x,ᾊ,o,ᾊ,x,ᾊ,o,x,b],
						[m,x,o,ᾊ,x,ᾊ,o,ᾊ,x,ᾊ,o,x,c],
						[w,x,o,ᾊ,x,ᾊ,o,ᾊ,x,ᾊ,o,x,e],
						[w,x,o,x,x,x,o,x,x,x,o,x,e],
						[w,x,o,o,o,o,o,o,o,o,o,x,e],
						[w,x,o,o,x,ᾊ,ᾊ,ᾊ,x,o,o,x,e],
						[w,l,o,o,o,o,o,o,o,o,o,j,e],
						[w,x,o,o,x,ᾊ,ᾊ,ᾊ,x,o,o,x,e],
						[w,x,o,o,x,ᾊ,ᾊ,ᾊ,x,o,o,x,e],
						[w,x,o,o,o,o,o,o,o,o,o,x,e],
						[w,x,o,o,o,o,o,o,o,o,o,x,e],
						[p,x,x,x,x,x,k,x,x,x,x,x,t],
						[f,q,s,s,s,s,s,s,s,s,s,r,h]],

				isRoom: true,
				frequency: 1
			}
		],

		3 :[
			{
				 tiles:[[d,g,n,n,n,n,n,n,n,n,n,a,b],			
						[m,x,x,x,x,x,i,x,x,x,x,x,c],
						[w,x,o,o,o,o,o,o,o,o,o,x,e],
						[w,x,o,x,x,o,o,o,x,x,o,x,e],
						[w,x,o,ᾊ,ᾊ,o,u,o,ᾊ,ᾊ,o,x,e],
						[w,x,o,ᾊ,ᾊ,o,u,o,ᾊ,ᾊ,o,x,e],
						[w,l,o,ᾊ,ᾊ,o,o,o,ᾊ,ᾊ,o,j,e],
						[w,x,o,x,x,o,o,o,x,x,o,x,e],
						[w,x,o,o,o,o,o,o,o,o,o,x,e],
						[w,x,o,o,u,u,o,u,u,o,o,x,e],
						[w,x,o,o,o,o,o,o,o,o,o,x,e],
						[p,x,o,x,x,o,o,o,x,x,o,x,e],
						[f,x,o,ᾊ,ᾊ,o,o,o,ᾊ,ᾊ,o,x,t],
						[d,x,o,ᾊ,ᾊ,o,o,o,ᾊ,ᾊ,o,x,b,g,n,n,n,n,n,n,n,n,n,n,a,b],
						[m,x,o,ᾊ,ᾊ,u,o,o,ᾊ,ᾊ,o,x,x,x,x,x,x,x,x,i,x,x,x,x,x,c],
						[w,x,o,x,x,o,o,o,x,x,o,o,x,ᾊ,ᾊ,ᾊ,x,o,o,o,x,ᾊ,ᾊ,ᾊ,x,e],
						[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,u,o,o,o,o,o,o,o,x,e],
						[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,u,u,u,o,o,x,e],
						[w,x,o,x,x,o,o,o,x,x,o,o,o,u,u,o,o,o,o,u,u,u,o,o,x,e],
						[w,l,o,ᾊ,ᾊ,o,o,u,ᾊ,ᾊ,o,o,o,u,u,o,o,o,o,o,o,o,o,o,j,e],
						[w,x,o,ᾊ,ᾊ,o,o,o,ᾊ,ᾊ,o,o,o,u,u,o,o,o,o,u,u,u,o,o,x,e],
						[w,x,o,ᾊ,ᾈ,o,o,o,ᾊ,ᾊ,o,o,o,o,o,o,o,o,o,u,u,u,o,o,x,e],
						[w,x,o,x,x,o,o,o,x,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
						[w,x,o,o,o,o,o,o,o,o,o,o,x,ᾊ,ᾊ,ᾊ,x,o,o,o,x,ᾊ,ᾊ,ᾊ,x,e],
						[p,x,x,x,x,x,k,x,x,x,x,x,x,x,x,x,x,x,x,k,x,x,x,x,x,t],
						[f,q,s,s,s,s,s,s,s,s,s,r,h,f,q,s,s,s,s,s,s,s,s,s,r,h]],

				isRoom: true,
				frequency: 1
			}
		],

		4 :[
			{
				 tiles:[[d,g,n,n,n,n,n,n,n,n,n,a,b,d,g,n,n,n,n,n,n,n,n,n,a,b],	
						[m,x,x,x,x,x,i,x,x,x,x,x,x,x,x,x,x,x,x,i,x,x,x,x,x,c],
						[w,x,o,o,o,o,o,o,o,o,x,x,x,x,x,x,o,o,o,o,o,o,o,o,x,e],
						[w,x,o,o,o,o,o,o,o,o,o,o,x,x,o,o,o,o,o,o,o,o,o,o,x,e],
						[w,x,o,o,o,u,u,o,o,o,o,o,o,o,o,o,o,o,o,u,u,o,o,o,x,e],
						[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
						[w,l,o,x,x,y,y,x,o,o,o,u,u,u,u,o,o,o,x,y,y,x,x,o,j,e],
						[w,x,x,x,ᾊ,o,o,x,o,o,o,u,o,u,u,o,o,o,x,o,o,ᾊ,x,x,x,e],
						[w,x,ᾊ,ᾊ,o,o,o,x,o,o,o,o,o,o,o,o,o,o,x,o,o,o,ᾊ,ᾊ,x,e],
						[w,x,o,o,o,o,o,o,x,o,o,o,o,o,o,o,o,x,o,o,o,o,o,o,x,e],
						[w,x,o,x,x,x,o,o,ᾊ,x,o,o,o,o,o,o,x,ᾊ,o,o,x,x,x,o,x,e],
						[p,x,o,ᾊ,x,ᾊ,o,o,ᾊ,x,o,u,o,u,o,u,x,ᾊ,o,o,ᾊ,x,ᾊ,o,x,t],
						[f,x,o,ᾊ,x,ᾊ,o,o,ᾊ,x,o,u,o,u,o,u,x,ᾊ,o,o,ᾊ,x,ᾊ,o,x,h],
						[d,x,o,ᾊ,x,ᾊ,o,o,ᾊ,x,o,o,o,o,o,o,x,ᾊ,o,o,ᾊ,x,ᾊ,o,x,b],
						[m,x,o,ᾊ,x,ᾊ,o,o,ᾊ,x,o,o,ᾈ,ᾈ,o,o,x,ᾊ,o,o,ᾊ,x,ᾊ,o,x,c],
						[w,x,o,x,x,x,o,o,ᾊ,x,o,o,ᾈ,ᾈ,o,o,x,ᾊ,o,o,x,x,x,o,x,e],
						[w,x,o,o,o,o,o,o,x,o,o,o,o,o,o,o,o,x,o,o,o,o,o,o,x,e],
						[w,x,ᾊ,ᾊ,o,o,o,x,o,o,x,x,o,o,x,x,o,o,x,o,o,o,ᾊ,ᾊ,x,e],
						[w,x,x,x,ᾊ,o,o,o,o,o,ᾊ,ᾊ,o,o,ᾊ,ᾊ,o,o,o,o,o,ᾊ,x,x,x,e],
						[w,l,o,x,x,o,o,o,o,o,ᾊ,ᾊ,o,o,ᾊ,ᾊ,o,o,o,o,o,x,x,o,j,e],
						[w,x,o,o,o,o,u,u,o,o,ᾊ,ᾊ,o,o,ᾊ,ᾊ,o,o,u,u,o,o,o,o,x,e],
						[w,x,x,o,o,o,u,u,o,o,x,x,o,o,x,x,o,o,u,u,o,o,o,x,x,e],
						[w,x,ᾊ,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,ᾊ,x,e],
						[w,x,x,ᾊ,ᾊ,x,o,x,ᾊ,ᾊ,ᾊ,ᾊ,ᾊ,ᾊ,ᾊ,ᾊ,ᾊ,ᾊ,x,o,x,ᾊ,ᾊ,x,x,e],
						[p,x,x,x,x,x,k,x,x,x,x,x,x,x,x,x,x,x,x,k,x,x,x,x,x,t],
						[f,q,s,s,s,s,s,s,s,s,s,r,h,f,q,s,s,s,s,s,s,s,s,s,r,h]],

				isRoom: true,
				frequency: 1
			}
		]
	},
	SHOP_TEMPLATES : {

		interesting: true,
		discoverText: "You hear the familiar ring of the corner shop!",

		1 :[
			{
				 tiles:[[d,g,n,n,n,n,n,n,n,n,n,a,b],			
						[m,x,x,x,x,x,i,x,x,x,x,x,c],
						[w,x,o,o,o,o,o,u,o,o,o,x,e],
						[w,x,o,x,x,U,o,u,o,A,o,x,e],
						[w,x,o,o,o,o,o,u,o,o,o,x,e],
						[w,x,o,x,x,V,o,u,u,o,u,x,e],
						[w,l,o,o,o,o,o,o,o,o,o,j,e],
						[w,x,o,o,o,o,o,o,o,o,o,x,e],
						[w,x,u,o,o,x,o,x,o,o,u,x,e],
						[w,x,u,o,o,o,o,o,o,o,u,x,e],
						[w,x,u,u,u,o,o,D,u,u,u,x,e],
						[p,x,x,x,x,x,k,x,x,x,x,x,t],
						[f,q,s,s,s,s,s,s,s,s,s,r,h]],

				isRoom: true,
				frequency: 1
			}
		],

		2 :[
			{
				 tiles:[[d,g,n,n,n,n,n,n,n,n,n,a,b],			
						[m,x,x,x,x,x,i,x,x,x,x,x,c],
						[w,x,o,o,o,o,o,o,u,o,o,x,e],
						[w,x,o,o,u,o,o,o,u,I,o,x,e],
						[w,x,o,I,u,o,o,o,u,o,o,x,e],
						[w,x,u,u,x,U,o,o,x,x,o,x,e],
						[w,l,o,o,o,o,o,o,o,o,o,j,e],
						[w,x,o,o,x,o,o,o,x,x,o,x,e],
						[w,x,u,o,o,o,o,o,u,o,o,x,e],
						[w,x,u,o,o,o,o,o,u,I,o,x,e],
						[w,x,u,o,o,o,o,o,u,o,o,x,e],
						[p,x,o,o,x,o,o,o,x,x,x,x,t],
						[f,x,o,o,o,o,o,o,o,o,U,x,h],
						[d,x,V,o,o,o,o,o,o,o,o,x,b],
						[m,x,x,x,x,o,o,o,x,o,F,x,c],
						[w,x,o,o,u,o,o,o,o,o,u,x,e],
						[w,x,o,I,u,o,o,o,o,o,u,x,e],
						[w,x,o,o,u,o,o,o,o,o,u,x,e],
						[w,x,o,x,x,o,o,o,x,o,o,x,e],
						[w,l,o,o,o,o,o,o,o,o,o,j,e],
						[w,x,o,x,x,o,o,F,x,u,u,x,e],
						[w,x,o,o,u,o,o,o,u,I,o,x,e],
						[w,x,o,I,u,o,o,o,u,o,o,x,e],
						[w,x,o,o,u,o,o,o,o,o,o,x,e],
						[p,x,x,x,x,x,k,x,x,x,x,x,t],
						[f,q,s,s,s,s,s,s,s,s,s,r,h]],

				isRoom: true,
				frequency: 1
			}
		]
	},
	KENNEL_TEMPLATES : {

		interesting: true,
		discoverText: "Something yaps and whimpers as you enter the doorway.",

		1 :[
			{
				 tiles:[[d,g,n,n,n,n,n,n,n,n,n,a,b],			
						[m,x,x,x,x,x,i,x,x,x,x,x,c],
						[w,x,o,o,o,u,o,u,o,o,o,x,e],
						[w,x,o,o,R,u,o,u,Q,o,o,x,e],
						[w,x,u,S,u,u,o,u,u,S,u,x,e],
						[w,x,o,o,o,o,o,o,o,o,o,x,e],
						[w,l,o,o,o,o,o,o,o,o,o,j,e],
						[w,x,o,o,o,o,o,o,o,o,o,x,e],
						[w,x,u,S,u,u,o,o,u,u,o,x,e],
						[w,x,o,o,R,u,o,o,o,O,o,x,e],
						[w,x,o,o,o,u,o,o,o,o,o,x,e],
						[p,x,x,x,x,x,k,x,x,x,x,x,t],
						[f,q,s,s,s,s,s,s,s,s,s,r,h]],

				isRoom: true,
				frequency: 1
			}
		],
	},
	VAULT_TEMPLATES : {

		interesting: true,
		discoverText: "The Vault! Find the key to unlock its riches.",

		1 :[
			{
				 tiles:[[d,g,n,n,n,n,n,n,n,n,n,a,b],			
						[m,x,x,x,x,x,i,x,x,x,x,x,c],
						[w,x,o,o,o,o,o,o,o,o,o,x,e],
						[w,x,o,o,o,o,o,o,o,o,o,x,e],
						[w,x,o,o,u,u,S,u,u,o,o,x,e],
						[w,x,o,o,u,Y,X,Y,u,o,o,x,e],
						[w,l,o,o,u,Y,Y,Y,u,o,o,j,e],
						[w,x,o,o,u,Y,Y,Y,u,o,o,x,e],
						[w,x,o,o,u,u,u,u,u,o,o,x,e],
						[w,x,o,o,o,o,o,o,o,o,o,x,e],
						[w,x,o,o,o,o,o,o,o,o,o,x,e],
						[p,x,x,x,x,x,k,x,x,x,x,x,t],
						[f,q,s,s,s,s,s,s,s,s,s,r,h]],

				isRoom: true,
				frequency: 1
			}
		],

		3 :[
			{
				 tiles:[[d,g,n,n,n,n,n,n,n,n,n,a,b],			
						[m,x,x,x,x,x,i,x,x,x,x,x,c],
						[w,x,x,x,o,o,o,o,o,x,x,x,e],
						[w,x,x,x,o,o,o,o,o,x,x,x,e],
						[w,x,o,o,o,o,o,o,o,o,o,x,e],
						[w,x,o,o,o,o,o,o,o,o,o,x,e],
						[w,l,o,o,o,o,o,o,o,o,o,j,e],
						[w,x,N,N,o,o,o,o,o,N,N,x,e],
						[w,x,N,N,N,o,o,o,N,N,N,x,e],
						[w,x,N,N,N,o,o,o,N,N,N,x,e],
						[w,x,N,N,N,N,o,N,N,N,N,x,e],
						[p,x,N,N,N,N,o,N,N,N,N,x,e],
						[f,x,N,N,N,N,o,N,N,N,N,x,t],
						[d,x,N,N,N,N,o,N,N,N,N,x,b,g,n,n,n,n,n,n,n,n,n,n,a,b],
						[m,x,N,N,N,N,o,N,N,N,N,x,x,x,x,x,x,x,x,i,x,x,x,x,x,c],
						[w,x,o,o,o,o,o,o,o,o,o,N,N,N,N,N,N,N,N,o,o,o,x,x,x,e],
						[w,x,o,x,x,u,S,u,x,x,o,N,N,N,N,N,N,N,N,o,o,o,x,x,x,e],
						[w,x,o,x,X,X,X,X,X,x,o,N,N,N,N,N,N,N,o,o,o,o,o,o,x,e],
						[w,x,o,u,X,Y,Y,Y,X,u,o,N,N,N,N,N,o,o,o,o,o,o,o,o,x,e],
						[w,l,o,u,X,Y,X,Y,X,W,o,o,o,o,o,o,o,o,o,o,o,o,o,o,j,e],
						[w,x,o,u,X,Y,Y,Y,X,u,o,N,N,N,N,N,o,o,o,o,o,o,o,o,x,e],
						[w,x,o,x,X,X,X,X,X,x,o,N,N,N,N,N,N,N,o,o,o,o,o,o,x,e],
						[w,x,o,x,x,u,u,u,x,x,o,N,N,N,N,N,N,N,N,o,o,o,x,x,x,e],
						[w,x,o,o,o,o,o,o,o,o,o,N,N,N,N,N,N,N,N,o,o,o,x,x,x,e],
						[p,x,x,x,x,x,k,x,x,x,x,x,x,x,x,x,x,x,x,k,x,x,x,x,x,t],
						[f,q,s,s,s,s,s,s,s,s,s,r,h,f,q,s,s,s,s,s,s,s,s,s,r,h]],

				isRoom: true,
				frequency: 1
			}
		],

		4 :[
			{
				 tiles:[[d,g,n,n,n,n,n,n,n,n,n,a,b,d,g,n,n,n,n,n,n,n,n,n,a,b],	
						[m,x,x,x,x,x,i,x,x,x,x,x,x,x,x,x,x,x,x,i,x,x,x,x,x,c],
						[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
						[w,x,o,o,o,N,N,N,N,N,N,N,N,N,N,N,N,N,N,N,N,o,o,o,x,e],
						[w,x,o,o,N,N,x,u,u,x,N,N,N,N,N,N,x,u,u,x,N,N,o,o,x,e],
						[w,x,o,N,N,x,x,X,X,x,x,N,N,N,N,x,x,X,X,x,x,N,N,o,x,e],
						[w,l,o,N,x,x,X,X,X,X,x,x,u,u,x,x,X,X,X,X,x,x,N,o,j,e],
						[w,x,o,N,x,X,X,X,X,X,X,X,X,X,X,X,X,X,X,X,X,x,N,o,x,e],
						[w,x,o,N,u,X,X,Y,X,X,Y,X,X,X,X,Y,X,X,Y,X,X,u,N,o,x,e],
						[w,x,o,N,u,X,X,X,X,X,X,X,X,X,X,X,X,X,X,X,X,u,N,o,x,e],
						[w,x,o,N,x,X,X,Y,X,X,Y,X,X,X,X,Y,X,X,Y,X,X,x,N,o,x,e],
						[p,x,o,N,x,X,X,X,X,X,X,X,X,X,X,X,X,X,X,X,X,x,N,o,x,t],
						[f,x,o,N,x,X,X,X,X,X,X,X,X,X,X,X,X,X,X,X,X,x,N,o,x,h],
						[d,x,o,N,u,X,X,N,N,X,X,x,S,S,x,X,X,N,N,X,X,u,N,o,x,b],
						[m,x,o,N,u,X,X,N,N,X,X,x,o,o,x,X,X,N,N,X,X,u,N,o,x,c],
						[w,x,o,N,x,X,X,N,N,X,X,x,o,o,x,X,X,N,N,X,X,x,N,o,x,e],
						[w,x,o,N,x,X,X,N,N,X,x,x,o,o,x,x,X,N,N,X,X,x,N,o,x,e],
						[w,x,o,N,x,X,X,N,N,X,x,N,o,o,N,x,X,N,N,X,X,x,N,o,x,e],
						[w,x,o,N,x,X,X,N,N,X,x,N,o,o,N,x,X,N,N,X,X,x,N,o,x,e],
						[w,l,o,N,x,x,X,X,X,X,x,N,o,o,N,x,X,X,X,X,x,x,N,o,j,e],
						[w,x,o,N,N,x,x,X,X,X,x,N,o,o,N,x,X,X,X,x,x,N,N,o,x,e],
						[w,x,o,o,N,N,x,u,u,x,x,N,o,o,N,x,u,u,x,x,N,N,o,o,x,e],
						[w,x,o,o,o,N,N,N,N,N,N,N,o,o,N,N,N,N,N,N,N,o,o,o,x,e],
						[w,x,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,x,e],
						[p,x,x,x,x,x,k,x,x,x,x,x,x,x,x,x,x,x,x,k,x,x,x,x,x,t],
						[f,q,s,s,s,s,s,s,s,s,s,r,h,f,q,s,s,s,s,s,s,s,s,s,r,h]],

				isRoom: true,
				frequency: 1
			}
		]
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