function gameOnKeyDown(event) {
	event = event || window.event;

	var keyCode = event.keyCode;

	switch (keyCode) {
	    // keypad 8 104
	    // w 		87
		case 104: 
	    moveGame({x:0, y:-1});	    	  
	    break;
	    // keypad 9 105
	    // e 		69
	    case 105:
	    moveGame({x:1, y:-1});	    	  
	    break;
	    // keypad 6 102
	    // d 		68
	    case 102: 
	    moveGame({x:1, y:0});	    	  
	    break;
	    // keypad 3 99
	    // c 		67
	    case 99:
	    moveGame({x:1, y:1});	    	  
	    break;
	    // keypad 2 98
	    // x		88
	    case 98:
	    moveGame({x:0, y:1});
	    break;
	    // keypad 1 97
	    // z		90
	    case 97:
	    moveGame({x:-1, y:1});	    	  
	    break;
	    // keypad 4 100
	    // a 		65
	    case 100: 
	    moveGame({x:-1, y:0});	    	  
	    break;
	    // keypad 7 103
	    // q 		81
	    case 103: 
	    moveGame({x:-1, y:-1});	    	  
	    break;
	    // keypad 5 101
	    // s 		83
	    case 101: 
	    moveGame({x:0, y:0});
	    break;
	    // Tab 09
	    case 9:
	    event.preventDefault();
	    // get units in view
		var enemys = getNearbyUnitsInSight(player);
		if (enemys.length == 0) {
			log.add("No nearby enemies to auto-fight.")
			relight();
			draw();
			break;
		}
		// pick biggest one
		var mostThreatening;
		for (var i = enemys.length - 1; i >= 0; i--) {
			if (mostThreatening == null || enemys[i].getThreatLevel(player) > mostThreatening.getThreatLevel(player))
				mostThreatening = enemys[i];
		}
		// if we did pick one
		if (mostThreatening != null) {
			var playerPos = {x: player.x, y: player.y};
			var dx = playerPos.x - mostThreatening.x;
			var dy = playerPos.y - mostThreatening.y;
			// if we are close enough, kill em
			if (Math.abs(dx) <= 1 && Math.abs(dy) <= 1 && player.canAttack()) {				
				moveGame({x: -dx, y: -dy});
			} else {
				// if within room, do A-Star with weights why not
				var offset = getNextMoveAStar(playerPos, mostThreatening);
				// move there
				moveGame(offset);
			}
			relight();
			draw();
		}
	    break;
	    // o 79
	    case 79:
	   	autoExplore();
	    break;
	    // up arrow 38
	    case 38:
	    if (log.length > LOG_DISPLAY_LENGTH) {
	    	logOffset = Math.min(0, logOffset + 1);
			relight();
			draw();
	    }
	    break;
	    // down arrow 40
	    case 40:	    
	    if (log.length > LOG_DISPLAY_LENGTH) {
	    	logOffset = Math.max(-1 * (log.length - LOG_DISPLAY_LENGTH), logOffset - 1);
			relight();
			draw();
	    }
	    break;
	    // f
	    case 70:
		fullscreen = !fullscreen;
		if (fullscreen) {
			mapDisplayHeight = DISPLAY_HEIGHT, mapDisplayWidth = DISPLAY_WIDTH;
			mapXOffset = 0, mapYOffset = 0;
		} else {
			mapDisplayHeight = DISPLAY_HEIGHT_MAP, mapDisplayWidth = DISPLAY_WIDTH_MAP
			mapXOffset = MAP_X_OFFSET, mapYOffset = MAP_Y_OFFSET;
		}
		screen_center_x = Math.round(DISPLAY_WIDTH/2);
		screen_player_x = mapXOffset + Math.floor(mapDisplayWidth/2);
		screen_player_y = mapYOffset + Math.floor(mapDisplayHeight/2);
		relight();
		draw();
	    break;
	    // g
	    case 71:
	    gameState = STATE_FIRMWARE;
		document.onkeydown = firmwareOnKeyDown;
	    draw();
	    break;
	    // i
	    case 73:
	    gameState = STATE_INVENTORY;
		document.onkeydown = inventoryOnKeyDown;
	    inventoryCursorPos = 0;
	    draw();
	    break;
		// k
		case 75:
		gameState = STATE_SKILLS;
		document.onkeydown = skillsOnKeyDown;
		draw();
		break;
		// l
		case 76:
		if (typeof objectives[OBJ_GENES] !== 'undefined') {
			var tile = dungeon.tiles[player.y][player.x];
			if (factions[FACTION_CLONES].wealth >= PIPE_COST) {
				factions[FACTION_CLONES].wealth -= PIPE_COST;
				tile.entities.push(new entity_genes_pipe(player));
				if (!objectives[OBJ_GENES].connected)
					objectives[OBJ_GENES].submitted = false;
			}
		}
		break;
	    // m
	    case 77:
	    gameState = STATE_4X_MODE;
		document.onkeydown = fourXOnKeyDown;
	    draw();
	    break;
		// p
	    case 80:
	    var room = minimap[fourXPos.y][fourXPos.x];
	    if (!room.visited)
	    	return
	    else if (room.powered || room.purchased) {
	    	togglePower(fourXPos);
	    } else if (player.power >= room.powerCost) {
	    	player.power -= room.powerCost;
	    	room.purchased = true;
			player.ppt += room.ppt;
	    	togglePower(fourXPos);
	    }
	    relight();
	    draw();
	    break;
		// ,
		case 188:
		var tile = dungeon.tiles[player.y][player.x];
		// get count of how many ___items___ we are standing on
		var itemCount = 0;
		var tempKeys = alphabet.slice(0);
		for (var item of tile.entities) {
			if (item.type == ENTITY_ITEM) {
				itemCount++;
			}
		}
		// if we have just one, pick it up
		if (itemCount == 1) {
			if (tile.entities.length > 0 && tile.entities.peek().type == ENTITY_ITEM)		
				player.inventory.pickUp(tile.entities.popLast());
		} else if (itemCount > 1) {
			itemMap = {};
			var tempKeys = alphabet.slice(0);
			for (var item of tile.entities) {
				if (item.type == ENTITY_ITEM) {
					itemMap[tempKeys.popLast()] = item;
				}
			}

			// print out options
			var lineString = "Items here: ";
			var MAX_LINE_LENGTH = 60;
			var keys = Object.keys(itemMap);
			for (var i = 0; i < keys.length; i++) {
				var key = keys[i];
				var nextItem = key + " - " + itemMap[key].name;

				if (i != keys.length - 1)
					nextItem += ", ";
				else
					nextItem += ".";						

				if (lineString.length < MAX_LINE_LENGTH) {
					lineString += nextItem;
				} else {
					log.add(lineString, false);

					// reset the count/aggregate line
					lineString = "";
				}
			}

			if (lineString != "")
				log.add(lineString, false);

			relight();
	    	draw();
			// set the on key down
			document.onkeydown = pickUpOnKeyDown;
		}
		break;
	    // ?
	    case 191:
	    if (!event.shiftKey)
	    	return;
	    if (!helped) {
	    	helped = true;
			relight();
	    	draw();
	    }
	    if (helping) {
	    	helpDiv.style.display = "none";
	    } else {	    	
	    	helpDiv.style.display = "block";
	    }
	    helping = !helping;
	    break;
		default:break;
	}
}

function pickUpOnKeyDown(event) {
	event = event || window.event;

	var keyCode = event.keyCode;
	
	var char = String.fromCharCode(keyCode).toLowerCase();

	switch (keyCode) {
		// backspace 08
		case 8:
		document.onkeydown = gameOnKeyDown;
	    break;
	    // escape 27
	    case 27:
		document.onkeydown = gameOnKeyDown;
	    break;
		// ,
		case 188:
		document.onkeydown = gameOnKeyDown;
		break;		
	    // enter
	    case 13:
		document.onkeydown = gameOnKeyDown;
	    break;
	    // space bar
	    case 32: 
		document.onkeydown = gameOnKeyDown;
	    break;
		// up arrow
	    case 38:
	    if (log.length > LOG_DISPLAY_LENGTH) {
	    	logOffset = Math.min(0, logOffset + 1);
			relight();
			draw();
	    }
	    break;
	    // down arrow
	    case 40:	    
	    if (log.length > LOG_DISPLAY_LENGTH) {
	    	logOffset = Math.max(-1 * (log.length - LOG_DISPLAY_LENGTH), logOffset - 1);
			relight();
			draw();
	    }
	    break;
	    // ?
	    case 191:
	    if (!event.shiftKey)
	    	return;
	    if (!helped) {
	    	helped = true;
			relight();
	    	draw();
	    }
	    if (helping) {
	    	helpDiv.style.display = "none";
	    } else {	    	
	    	helpDiv.style.display = "block";
	    }
	    helping = !helping;
	    break;
	    // anything else
	    default: 
	    var item = itemMap[char];
	    if (item != null) {
	    	// get our tile
			var tile = dungeon.tiles[player.y][player.x];
	    	// remove from ground
	    	tile.entities.remove(item);
	    	// pick up
			player.inventory.pickUp(item);
	    }

		document.onkeydown = gameOnKeyDown;
	    break;
	}
}

function drawStats () {
	var nameAndLvlString = player.name + "   lvl " + player.level;
	for (var i = nameAndLvlString.length - 1; i >= 0; i--) {
		screen.pixels[NAME_Y_OFFSET][NAME_X_OFFSET + i].char = nameAndLvlString[i];
		screen.pixels[NAME_Y_OFFSET][NAME_X_OFFSET + i].color = i > player.name.length ? COLOR_OUT_OF_SIGHT : '#cdc0b6';
	}

	var wealthString = "Wealth:" + factions[FACTION_CLONES].wealth;
	for (var i = wealthString.length - 1; i >= 0; i--) {
		screen.pixels[WEALTH_Y_OFFSET][WEALTH_X_OFFSET + i].char = wealthString[i];
		screen.pixels[WEALTH_Y_OFFSET][WEALTH_X_OFFSET + i].color = '#cdc0b6';
	}

	var powerString = "Power:" + factions[FACTION_CLONES].power;
	for (var i = powerString.length - 1; i >= 0; i--) {
		screen.pixels[POWER_Y_OFFSET][POWER_X_OFFSET + i].char = powerString[i];
		screen.pixels[POWER_Y_OFFSET][POWER_X_OFFSET + i].color = '#cdc0b6';
	}

	var wealthpt = "   WPT:" + factions[FACTION_CLONES].wpt;
	for (var i = wealthpt.length - 1; i >= 0; i--) {
		screen.pixels[WPT_Y_OFFSET][WPT_X_OFFSET + i].char = wealthpt[i];
		screen.pixels[WPT_Y_OFFSET][WPT_X_OFFSET + i].color = '#cdc0b6';
	}

	var pptString = "  PPT:" + factions[FACTION_CLONES].ppt;
	for (var i = pptString.length - 1; i >= 0; i--) {
		screen.pixels[PPT_Y_OFFSET][PPT_X_OFFSET + i].char = pptString[i];
		screen.pixels[PPT_Y_OFFSET][PPT_X_OFFSET + i].color = '#cdc0b6';
	}
}

function drawHP () {
	var hpIncrement = player.hpMax / HP_BAR_LENGTH;
	var hpCount = hpIncrement;
	for (var i = 0; i < HP_BAR_LENGTH; i++) {
		screen.pixels[HP_Y_OFFSET][i + HP_X_OFFSET].char = '■';
		if (hpCount <= player.hp + .001) 
			screen.pixels[HP_Y_OFFSET][i + HP_X_OFFSET].color = '#009933';
		else
			screen.pixels[HP_Y_OFFSET][i + HP_X_OFFSET].color = '#131324';
		hpCount += hpIncrement;
	}
}

function drawXP() {
	var xpDif = player.nextLevelXp - player.lastLevelXp;
	var xpIncrement = xpDif / HP_BAR_LENGTH;
	var xpCount = player.lastLevelXp;
	for (var i = 0; i < HP_BAR_LENGTH; i++) {
		screen.pixels[HP_Y_OFFSET + 1][i + HP_X_OFFSET].char = '=';
		if (xpCount <= player.xp + .001) 
			screen.pixels[HP_Y_OFFSET + 1][i + HP_X_OFFSET].color = '#9933ff';
		else
			screen.pixels[HP_Y_OFFSET + 1][i + HP_X_OFFSET].color = '#131324';
		xpCount += xpIncrement;
	}
}

function drawMap () {
	// dungeonCoordinates: get top left corner of visible map from player position
	var topleft = {x:Math.round(player.x - mapDisplayWidth / 2),
				   y:Math.round(player.y - mapDisplayHeight / 2)};

	// AbsoluteCoordinates: iterate through x and y of screen pixels
	for (var i = 0; i < mapDisplayHeight; i++) {
		for (var j = 0; j < mapDisplayWidth; j++) {
			// dungeonCoordinates: make sure the i,j pair is in the bounds of the dungeon tiles
			if (topleft.y + i >= 0 && 
				topleft.x + j >= 0 &&
				topleft.y + i < dungeon.tiles.length &&
			 	topleft.x + j < dungeon.tiles[topleft.y + i].length &&
			 	mapXOffset + j >= 0 && 
			 	mapYOffset + i >= 0 && 
			 	mapXOffset + j < DISPLAY_WIDTH && 
			 	mapYOffset + i < DISPLAY_HEIGHT) {
					var tile = dungeon.tiles[topleft.y + i][topleft.x + j];
					screen.pixels[mapYOffset + i][mapXOffset + j].color = tile.getColor();		
					var styleObj = dungeon.tiles[topleft.y + i][topleft.x + j].getCharAndFont();
					screen.pixels[mapYOffset + i][mapXOffset + j].char = styleObj.char;
					screen.pixels[mapYOffset + i][mapXOffset + j].font = styleObj.font;
					if (styleObj.hasHp) 
					{
						// draw hp bar
						screen.pixels[mapYOffset + i][mapXOffset + j].hasHp = true;
						screen.pixels[mapYOffset + i][mapXOffset + j].hpPercent = styleObj.hp;
					}
					tile.visit();
			} else
				screen.pixels[mapYOffset + i][mapXOffset + j].char = ' ';
		}
	}

	// place the player ontop
	screen.pixels[screen_player_y][screen_player_x].char = '@';
	screen.pixels[screen_player_y][screen_player_x].font = FONT_STYLE_DEFAULT;
	screen.pixels[screen_player_y][screen_player_x].color = COLOR_DEFAULT;
	for (var i = 0; i < mapDisplayHeight; i++) {
		for (var j = 0; j < mapDisplayWidth; j++) {
			// dungeonCoordinates: make sure the i,j pair is in the bounds of the dungeon tiles
			if (topleft.y + i >= 0 && 
				topleft.x + j >= 0 &&
				topleft.y + i < dungeon.tiles.length &&
			 	topleft.x + j < dungeon.tiles[topleft.y + i].length &&
			 	mapXOffset + j >= 0 && 
			 	mapYOffset + i >= 0 && 
			 	mapXOffset + j < DISPLAY_WIDTH && 
			 	mapYOffset + i < DISPLAY_HEIGHT) {
					dungeon.tiles[topleft.y + i][topleft.x + j].visit();			
			}
		}
	}	
}

function drawMiniMap () {
	var topleft = {x:MINIMAP_X_CENTER - Math.round(display_width_minimap / 2),
				   y:MINIMAP_Y_CENTER - Math.round(display_height_minimap / 2)}
	for (var i = 0; i < display_height_minimap; i++) {
		for (var j = 0; j < display_width_minimap; j++) {
			var screenX = topleft.x + j;
			var screenY = topleft.y + i;
			// dungeonCoordinates: make sure the i,j pair is in the bounds of the dungeon tiles
			if (mapYMin + i >= 0 &&
			 	mapXMin + j >= 0 && 
			 	mapYMin + i < minimap.length && 
			 	mapXMin + j < minimap[mapYMin + i].length &&
			 	screenX >= 0 && 
			 	screenY >= 0 && 
			 	screenX < DISPLAY_WIDTH && 
			 	screenY < DISPLAY_HEIGHT) {
				if (minimap[mapYMin + i][mapXMin + j].hash != 0) {
					// pick the color we have so many colors
					// color powered, ourroom, factions, have megamap draw resources or w/e AND objective
					var room = roomLookup[minimap[mapYMin + i][mapXMin + j].hash];
					var faction = room.faction;
					var ourRoom = room == dungeon.getRoom();
					var powered = room.powered;
					var visited = room.visited;
					var discovered = room.discovered;

					if (ourRoom)						
						screen.pixels[screenY][screenX].char = '@';
					else
						screen.pixels[screenY][screenX].char = '■';

					var color;
					if (!discovered)						
						screen.pixels[screenY][screenX].char = ' ';
					else if (!visited)
						color = COLOR_UNPOWERED_UNVISITED;					
					else if (faction != FACTION_NONE && !powered)
						color = COLOR_FACTIONS_UNPOWERED[faction];
					else if (faction != FACTION_NONE && powered)
						color = COLOR_FACTIONS_POWERED[faction];
					else if (!powered)
						color = COLOR_UNPOWERED_VISITED;
					else if (powered)
						color = COLOR_POWERED;
					// color the room
					screen.pixels[screenY][screenX].color = color;
				} else
					screen.pixels[screenY][screenX].char = ' ';					
			}
			else if (screenX >= 0 && 
			 	screenY >= 0 && 
			 	screenX < DISPLAY_WIDTH && 
			 	screenY < DISPLAY_HEIGHT)
				screen.pixels[MINIMAP_Y_OFFSET + i][screenX].char = ' ';
		}
	}
}

var CAPTURE_BAR_LENGTH = 11;
function drawCapture () {
	var inRoom = dungeon.tiles[player.y][player.x].inRoom;
	if (!inRoom || dungeon.getRoom().captureAmount == 1 || !dungeon.getRoom().isRoom)
		return;

	var captureString = "Capturing";
	var xStart = 24 + screen_center_x - Math.round(captureString.length / 2) + 1;
	for (var i = captureString.length - 1; i >= 0; i--) {
			screen.pixels[3][xStart + i].char = captureString[i];
			screen.pixels[3][xStart + i].color = COLOR_DEFAULT;
	}
	xStart = 24 + screen_center_x - Math.round(CAPTURE_BAR_LENGTH/2) + 1;

	var room = dungeon.getRoom();

	// select the color
	var captureColor;
	if (room.beingCaptured)
		captureColor = COLOR_FACTIONS_UNPOWERED[FACTION_CLONES];
	else
		captureColor = COLOR_FACTIONS_UNPOWERED[room.faction];

	for (var i = 0; i < CAPTURE_BAR_LENGTH; i++) {		
		screen.pixels[7][xStart + i].char = '■';
		screen.pixels[5][xStart + i].char = '■';
		screen.pixels[6][xStart + i].char = '■';
		if (i >= room.captureAmount/1 * CAPTURE_BAR_LENGTH) {	
			screen.pixels[7][xStart + i].color = COLOR_OUT_OF_SIGHT;
			screen.pixels[5][xStart + i].color = COLOR_OUT_OF_SIGHT;
			screen.pixels[6][xStart + i].color = COLOR_OUT_OF_SIGHT;
		} else {				
			screen.pixels[7][xStart + i].color = captureColor;
			screen.pixels[5][xStart + i].color = captureColor;
			screen.pixels[6][xStart + i].color = captureColor;				
		}
	}
}

// offset has an x and a y
function moveGame(offset) {
	var complexMove = offset.x != 0 && offset.y != 0;
	// shorthand for long references
	var tiles = dungeon.tiles;
	var pos = player;
	var room = minimap[dungeon.roomPos.y][dungeon.roomPos.x];
	// the targeted tile
	var newPos = {x:pos.x + offset.x, y:pos.y + offset.y}
	// if it doesnt fit
	if (newPos.x < 0 || newPos.y < 0 || newPos.y >= tiles.length || newPos.x >= tiles[newPos.y].length)
		return;
	// new tile
	var newTile = tiles[newPos.y][newPos.x];
	if (!newTile)
		oops();
	// handle the move, if its a solid block with nothing in it just return;
	if ((newTile.getSolid() && !(newPos.x == pos.x && newPos.y == pos.y)) && newTile.entities.length > 0) {
		// handle the collision
		switch (newTile.entities[newTile.entities.length - 1].type) {
			case ENTITY_ENEMY:
				var enemy = newTile.entities.peek();
				player.attack(enemy);
			break;

			case ENTITY_GENERATOR_CONSOLE:
				newTile.entities[newTile.entities.length - 1].submit();
			break;

			case ENTITY_AUX_GENERATOR:
				if (!newTile.peek().started)
					newTile.peek().startUp();
				else
					return;
			break;

			case ENTITY_MASTERMIND_CONSOLE:
				newTile.entities.peek().submit();
			break;

			case ENTITY_MASTERMIND_PIECE:
				newTile.entities.peek().cycle();
				// reset the console submitted status
				objectives[OBJ_MASTERMIND].console.submitted = false;		
			break;

			case ENTITY_GENES_CONSOLE:
				newTile.entities.peek().submit();
			break;

			case ENTITY_CITY_CONSOLE:
				newTile.entities.peek().submit();
			break;

			case ENTITY_CHEST:
				newTile.entities.peek().open();
			break;

			case ENTITY_NPC:
				newTile.entities.peek().interact();
			break;

			default: return;
		}
	} else if (!newTile.getSolid() || newPos.x == pos.x && newPos.y == pos.y)
		dungeon.movePlayer(newPos);
	else
		return;

	var victorious = objectives.progressObjectives();
	// You won!
	if (victorious) {
		// initialize the switchboard
		switchboard = new SwitchBoard(7,5);
		blinkSwitchboard();
		gameState = STATE_SWITCHBOARD;
	} else {
		// TIME HAS PASSED, do stuff like enemy turns, capture rooms etc.
		gameTicks++;
		logOffset = 0;
		player.applyStatuses();
		do4XTurn();
		doFactionTurns();
		doEnemyTurns();
		captureRooms();
		relight();
	}

	draw();
}

function newGame() {
	var occupation = CLASSES[classCursorPos];
	var background = BACKGROUNDS[backgroundCursorPos];
	var loadout = buildLoadOut();
	player = new Character(occupation, background, loadout);
	dungeon = new Dungeon();
	dungeon.populateInitial();
	skills = new Skills(occupation);
	addExposition();
	relight();
	draw();
}

function gameOver() {
	// gameState = STATE_LANDING;
	// document.onkeydown = welcomeOnKeyDown;
}
