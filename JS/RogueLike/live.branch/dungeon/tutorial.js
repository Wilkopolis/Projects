var NAME_STRANDED_MAN = "stranded man";

function Tutorial () {

	this.buildRoom = function(room, template) {
		// if the room is interesting, we stop when exploring
		room.interesting = false;
		room.discoverText = false;
		// orient the template how we want it
		var tiles = template.tiles;
		this.applyBlueprint(room, tiles);
	}

	// this guy has to be the monster
	this.applyBlueprint = function(room, template) {
		var seedPos = room.seedPos;
		var seedRoomCenter = {x: 6, y: 19};
		var topLeft = {x: 0, y: 0};
		
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
					entity = new item_os_disk();
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

					case SYMBOL_RAT:
						entity = MakeNPC(NAME_GIANT_RAT, {x:x, y:y});
						this.npcs.push(entity);
					break;

					case SYMBOL_STRANDED_MAN:
						entity = MakeNPC(NAME_STRANDED_MAN, {x:x, y:y});
						entity.room = room;
						this.npcs.push(entity);
					break;

					case SYMBOL_EXIT:
						entity = new entity_complete_tutorial();
						entity.x = x;
						entity.y = y;
					break;

					case SYMBOL_CROWBAR:
						entity = MakeItem(NAME_CROWBAR);
						entity.x = x;
						entity.y = y;
					break;
				}
				if (char != CHAR_EMPTY && char != null) {
					if (this.tiles[y] == null)
						oops();
					this.tiles[y][x] = layTile(char, entity, blink);
				}
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
	this.roomTotal = 1;

	// add objectives
	for (var i = this.objectiveTypes.length - 1; i >= 0; i--) {
		switch(this.objectiveTypes[i].type) {
			case OBJ_GENERATORS:
			objectives[OBJ_GENERATORS] = new objective_generators();
			break;

			case OBJ_GENES:
			objectives[OBJ_GENES] = new objective_genes();
			break;

			case OBJ_MASTERMIND:
			objectives[OBJ_MASTERMIND] = new objective_mastermind();
			break;

			case OBJ_CITY_OS:
			objectives[OBJ_CITY_OS] = new objective_city_os();
			break;
		}
	}

	var roomCount = 0;
	// make the 2d array that will fill with rooms
	minimap = new Array(2);
	for (var i = 0; i < 2; i++)
		minimap[i] = new RoomArray(2, 0);
	// each room has a unique identifier
	var hash = 1;
	// start if off with the center
	var seedRoomPos = {x:0, y:1, distance: 0}
	this.roomPos.x = 0, this.roomPos.y = 1;
	fourXPos.x = this.roomPos.x, fourXPos.y = this.roomPos.y;
	// wow so weird we always start in the cloning vats
	minimap[seedRoomPos.y][seedRoomPos.x].hash = hash++;
	// track so we know how many tiles to use on the big boy map
	var xMax = seedRoomPos.x;
	var xMin = seedRoomPos.x;
	var yMax = seedRoomPos.y;
	var yMin = seedRoomPos.y;

	workingXMin = seedRoomPos.x;
	workingXMax = seedRoomPos.x;
	workingYMin = seedRoomPos.y;
	workingYMax = seedRoomPos.y;

	// set the player position
	player.x = 5;
	player.y = 19;

	// build dungeon map into tiles
	var height = 2;
	var width = 2;	
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
	roomLookup[1] = new Room(1);
	var room = roomLookup[1];
	var template = tutorial_template;
	
	this.buildRoom(room, template);

	visitRoom(seedRoomPos);

	// make our faction using our hq location
	factions[FACTION_CLONES] = new faction_clones(seedRoomPos, startingWealth);

	// we visit the seedroom
	minimap[this.roomPos.y][this.roomPos.x].visited = true;

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

		var OSE = getOSEObject();
		if (OSE[NAME_STRANDED_MAN] && !seenHimYet) {
			seenHimYet = true;
			var option1 = {
				text:"Okay",
				event:function() {
					windows[SCREEN_PROMPT].hide();
				},
			};
			log.add("Execute this man to advance. Bonus points for creativity.");
			prompt("Execute this man to advance. Bonus points for creativity.", option1);
		}
	}
}
var seenHimYet = false;

var ENTITY_TUTORIAL_OVER = "tutorial_over";
function entity_complete_tutorial() {
	this.type = ENTITY_TUTORIAL_OVER;
	this.solid = true;
	this.permanentSolid = true;
	this.simulatesPhysics = false;
	// for the enemy log
	this.loggable = false;
	this.name = "The Exit!";
	this.description = "Reach this tile to complete the tutorial!";
	this.char = CHAR_CONSOLE;
	this.color = COLOR_DEFAULT;
	this.font = FONT_STYLE_DEFAULT;
}


var ᾊ = "UNUSED";
var SYMBOL_CROWBAR = "crowbar";
var ᾋ = "crowbar";
var SYMBOL_RAT = "giant_rat";
var ᾌ = "giant_rat";
var SYMBOL_STRANDED_MAN = "stranded_man";
var ᾍ = "stranded_man";
var SYMBOL_EXIT = "exit";
var ᾎ = "exit";
var tutorial_template = {

	 tiles:[[x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x],			
			[x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x],
			[x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,N,N,N,N,N,N,N,N,N,x,x],
			[x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,N,N,u,u,u,u,u,N,N,x,x],
			[x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,N,N,u,o,o,o,u,N,N,x,x],
			[x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,N,N,u,o,ᾎ,o,u,N,N,x,x],
			[x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,N,N,u,o,o,o,u,N,N,x,x],
			[x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,N,N,N,N,N,N,N,N,N,x,x],
			[x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,N,N,N,N,N,N,N,N,N,x,x],
			[x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,N,N,N,N,N,N,N,N,N,x,x],
			[x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,N,N,u,o,o,o,u,N,N,x,x],
			[x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,N,N,u,o,o,o,u,N,N,x,x],
			[x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,N,N,u,o,o,o,u,N,N,x,x],
			[x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,N,N,u,o,o,o,u,N,N,x,x],
			[x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,S,x,x,x,x,x,x],
			[x,x,N,N,N,N,N,N,N,N,N,N,N,x,N,u,u,u,u,o,N,N,N,N,x,x],
			[x,x,N,N,N,N,N,N,N,N,N,N,N,x,N,o,o,o,o,o,N,N,N,N,x,x],
			[x,x,N,N,N,N,N,N,N,N,N,N,N,x,N,o,o,o,o,o,N,N,N,N,x,x],
			[x,x,N,N,o,o,ᾋ,N,N,N,o,o,o,x,o,o,o,o,o,o,N,N,o,o,x,x],
			[x,x,N,N,o,o,o,o,o,o,o,ᾌ,o,z,o,o,o,o,o,o,N,N,ᾍ,o,x,x],
			[x,x,N,N,o,o,o,N,N,N,o,o,o,x,o,o,o,o,o,o,N,N,o,o,x,x],
			[x,x,N,N,N,N,N,N,N,N,N,N,N,x,N,o,o,o,o,o,N,N,N,N,x,x],
			[x,x,N,N,N,N,N,N,N,N,N,N,N,x,N,o,V,o,V,o,N,N,N,N,x,x],
			[x,x,N,N,N,N,N,N,N,N,N,N,N,x,N,u,u,u,u,u,N,N,N,N,x,x],
			[x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x],
			[x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x]],
}