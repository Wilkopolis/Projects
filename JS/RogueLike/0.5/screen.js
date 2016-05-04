/*				Screen functions				*/

function updateWelcome () {
	var welcomeString = "Choose your class";
	var xStart = screen_center_x - Math.round(welcomeString.length / 2) + 1;
	for (var i = welcomeString.length - 1; i >= 0; i--) {
			screen.pixels[3][xStart + i].char = welcomeString[i];
			screen.pixels[3][xStart + i].color = COLOR_DEFAULT;
	}
	xStart = screen_center_x - Math.round(29/2) + 1;
	for (var i = 29 - 1; i >= 0; i--) {
			screen.pixels[4][xStart + i].char = '_';
			screen.pixels[4][xStart + i].color = COLOR_DEFAULT;
	}
	for (var i = CLASSES.length - 1; i >= 0; i--) {
		var color = i == welcomeCursorPos ? COLOR_SELECT_CLASS_NAME : COLOR_CLASS_NAME;
		for (var j = CLASSES[i].length - 1; j >= 0; j--) {
			screen.pixels[WELCOME_Y_OFFSET + i * 2][WELCOME_X_OFFSET + j].char = CLASSES[i][j];
			screen.pixels[WELCOME_Y_OFFSET + i * 2][WELCOME_X_OFFSET + j].color = color;
		}
	}
}

function updateStats () {
	for (var i = player.name.length - 1; i >= 0; i--) {
		screen.pixels[NAME_Y_OFFSET][NAME_X_OFFSET + i].char = player.name[i];
		screen.pixels[NAME_Y_OFFSET][NAME_X_OFFSET + i].color = '#cdc0b6';
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

function updateHP () {
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

function updateMap () {
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
					screen.pixels[mapYOffset + i][mapXOffset + j].color = dungeon.tiles[topleft.y + i][topleft.x + j].getColor();		
					var styleObj = dungeon.tiles[topleft.y + i][topleft.x + j].getCharAndFont();
					screen.pixels[mapYOffset + i][mapXOffset + j].char = styleObj.char;
					screen.pixels[mapYOffset + i][mapXOffset + j].font = styleObj.font;
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

function updateMiniMap () {
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

					if (ourRoom)						
						screen.pixels[screenY][screenX].char = '@';
					else
						screen.pixels[screenY][screenX].char = '■';

					var color;
					if (!visited)
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

function update4X () {
	var topleft = {x: MEGAMAP_X_CENTER - Math.round(display_width_minimap / 2),
				   y: MEGAMAP_Y_CENTER - Math.round(display_height_minimap / 2)}
	for (var i = 0; i < display_height_minimap; i++) {
		for (var j = 0; j < display_width_minimap; j++) {
			// adjusted values cause zoomed in
			var mapX = mapXMin + j;
			var mapY = mapYMin + i;
			var adjX = j * 2;
			var adjY = i * 2;
			var screenX = topleft.x + adjX;
			var screenY = topleft.y + adjY;
			// dungeonCoordinates: make sure the i,j pair is in the bounds of the dungeon tiles
			if (mapY >= 0 &&
			 	mapX >= 0 && 
			 	mapY < minimap.length && 
			 	mapX < minimap[mapY].length)	{
				// if it is a room				
				var room = minimap[mapYMin + i][mapXMin + j];
				var pixelChar;
				if (room.hash == 0)
					continue;
				else
					pixelChar = '■';
				// pick the color we have so many colors
				var selected = minimap[mapY][mapX].hash == minimap[fourXPos.y][fourXPos.x].hash;
				var ourRoom = room.hash == dungeon.getRoom().hash;
				var powered = room.powered;
				var hive = room.hive;
				var visited = room.visited;
				var objective = room.hasObjective;
				var color;
				if (selected && cursorVis)
					color = COLOR_CURSOR;
				else if (ourRoom && !powered)
					color = COLOR_OURROOM;
				else if (ourRoom && powered)
					color = COLOR_OURROOM_POWERED;
				else if (hive)
					color = COLOR_HIVE;
				else if (!visited)
					color = COLOR_UNPOWERED_UNVISITED;
				else if (objective && !powered)
					color = COLOR_OBJECTIVE;
				else if (objective && powered)
					color = COLOR_OBJECTIVE_POWERED;
				else if (!powered)
					color = COLOR_UNPOWERED_VISITED
				else if (powered)
					color = COLOR_POWERED;
				// topleft
				if (screenX >= 0 && 
			 		screenY >= 0 && 
			 		screenX < DISPLAY_WIDTH && 
			 		screenY < DISPLAY_HEIGHT) {
					screen.pixels[screenY][screenX].char = pixelChar;
					screen.pixels[screenY][screenX].color = color;
					screen.pixels[screenY][screenX].font = '28pt Lucida Console';
				}
			}
		}
	}
}

function updateTasks() {
	var taskString = "Here are your assigned task(s).";
	for (var i = taskString.length - 1; i >= 0; i--) {
		screen.pixels[40][10 + i].char = taskString[i];
		screen.pixels[40][10 + i].color = COLOR_DEFAULT;
	}
	var objs = objectives.getObjectives();
	for (var i = objs.length - 1; i >= 0; i--) {
		var objectiveString = (i + 1) + ". " + objs[i].getTaskString() + ".";
		var color = COLOR_OUT_OF_SIGHT;
		if (objs[i].progressTicks(0))
			color = COLOR_DEFAULT;
		for (var j = objectiveString.length - 1; j >= 0; j--) {
			screen.pixels[42 + 2 * i][10 + j].char = objectiveString[j];
			screen.pixels[42 + 2 * i][10 + j].color = color;
		}
	}
}

function updateLog () {
	var limit = Math.min(log.length, LOG_DISPLAY_LENGTH);
	for (var i = 0; i < limit; i++) {
		var logEntry = log[log.length - i - 1];
		var color = COLOR_DEFAULT;
		for (var j = logEntry.length - 1; j >= 0; j--) {
			if (logEntry[j] == "]")
				color = COLOR_OUT_OF_SIGHT;
			screen.pixels[CONSOLE_Y_OFFSET + 2 * i][CONSOLE_X_OFFSET + j].char = logEntry[j];
			screen.pixels[CONSOLE_Y_OFFSET + 2 * i][CONSOLE_X_OFFSET + j].color = color;
		}
	}
}

// update the screen with objective progress
function updateObjectives () {
	// if we are drawing objectives accross the bottom, dont draw the log
	var drawLog = true;
	// iterate through ticking objectives, for those active draw progress
	var tickers = objectives.getTickingObjectives();
	for (var i = tickers.length - 1; i >= 0; i--) {
		drawLog = false;
		var titleString = tickers[i].getTitleString();
		var titleString_x_start = screen_center_x - Math.round(titleString.length / 2);
		var progressLength = Math.round(tickers[i].ticks / tickers[i].maxTicks * PROGRESS_BAR_WIDTH);
		// clear the screen where we are drawing the objectives
		// screen.pixels[PROGRESS_BAR_Y + i * 3 - 1][PROGRESS_BAR_X_OFFSET - 1].char = ' ';
		// screen.pixels[PROGRESS_BAR_Y + i * 3][PROGRESS_BAR_X_OFFSET - 1].char = ' ';
		// screen.pixels[PROGRESS_BAR_Y + i * 3 + 1][PROGRESS_BAR_X_OFFSET - 1].char = ' ';
		// screen.pixels[PROGRESS_BAR_Y + i * 3 + 2][PROGRESS_BAR_X_OFFSET - 1].char = ' ';
		for (var l = PROGRESS_BAR_WIDTH; l >= 0; l--) {
			// clear the screen where we are drawing the objectives
			// screen.pixels[PROGRESS_BAR_Y + i * 3 - 1][PROGRESS_BAR_X_OFFSET + l - 1].char = ' ';
			// put the title string for the objective char in the pixel 
			if (PROGRESS_BAR_X_OFFSET + l - 1 >= titleString_x_start && PROGRESS_BAR_X_OFFSET + l - 1 < titleString_x_start + titleString.length) {
				screen.pixels[PROGRESS_BAR_Y + i * 3][PROGRESS_BAR_X_OFFSET + l].char = titleString[l - (titleString_x_start - (PROGRESS_BAR_X_OFFSET - 1))];
				screen.pixels[PROGRESS_BAR_Y + i * 3][PROGRESS_BAR_X_OFFSET + l].color = COLOR_DEFAULT;
			} 
			// else
				// screen.pixels[PROGRESS_BAR_Y + i * 3][PROGRESS_BAR_X_OFFSET + l].char = ' ';
			// put the progress bar char instead of a blank space if you've progressed enough
			if (l <= progressLength) {
				screen.pixels[PROGRESS_BAR_Y + i * 3 + 1][PROGRESS_BAR_X_OFFSET + l].char = '=';
				screen.pixels[PROGRESS_BAR_Y + i * 3 + 1][PROGRESS_BAR_X_OFFSET + l].color = COLOR_DEFAULT;
			} 
			// else
				// screen.pixels[PROGRESS_BAR_Y + i * 3 + 1][PROGRESS_BAR_X_OFFSET + l - 1].char = ' ';
			// screen.pixels[PROGRESS_BAR_Y + i * 3 + 2][PROGRESS_BAR_X_OFFSET + l - 1].char = ' ';
		}
		// clear the screen where we are drawing the objectives
		// screen.pixels[PROGRESS_BAR_Y + i * 3 - 1][PROGRESS_BAR_X_OFFSET + PROGRESS_BAR_WIDTH].char = ' ';
		// screen.pixels[PROGRESS_BAR_Y + i * 3][PROGRESS_BAR_X_OFFSET + PROGRESS_BAR_WIDTH].char = ' ';
		// screen.pixels[PROGRESS_BAR_Y + i * 3 + 1][PROGRESS_BAR_X_OFFSET + PROGRESS_BAR_WIDTH].char = ' ';
		// screen.pixels[PROGRESS_BAR_Y + i * 3 + 2][PROGRESS_BAR_X_OFFSET + PROGRESS_BAR_WIDTH].char = ' ';
	}
	return drawLog;
}

function updateSwitchboard () {
	var xStart = screen_center_x - Math.round(SWITCHBOARD_STRING.length / 2) + 1;
	for (var i = SWITCHBOARD_STRING.length - 1; i >= 0; i--) {		
		screen.pixels[SWITCHBOARD_STRING_Y][xStart + i].char = SWITCHBOARD_STRING[i];
		screen.pixels[SWITCHBOARD_STRING_Y][xStart + i].color = COLOR_DEFAULT;
	}
	for (var i = switchboard.height - 1; i >= 0; i--) {
		var yOffset = 0;
		if (i == switchboard.height - 1)
			yOffset = 8;
		for (var j = switchboard.switches[i].length - 1; j >= 0; j--) {
			// if we are blinking make it a blank space instead
			if (i == switchBoardPos.y && j == switchBoardPos.x && !cursorVis)
				screen.pixels[11 + (i * 6) + yOffset][12 + (j * 8)].char = ' ';
			else
				screen.pixels[11 + (i * 6) + yOffset][12 + (j * 8)].char = '|';
			screen.pixels[11 + (i * 6) + yOffset][12 + (j * 8)].color = COLOR_DEFAULT;
			screen.pixels[11 + (i * 6) + yOffset][12 + (j * 8)].font = '28pt Lucida Console';
			if (switchboard.switches[i][j]) {				
				screen.pixels[11 + (i * 6) + yOffset][11 + (j * 8)].char = '■';
				screen.pixels[11 + (i * 6) + yOffset][11 + (j * 8)].color = COLOR_POWERED;
				screen.pixels[11 + (i * 6) + yOffset][11 + (j * 8)].font = '28pt Lucida Console';
				// the right side
				screen.pixels[11 + (i * 6) + yOffset][13 + (j * 8)].char = ' ';				
			} else {
				screen.pixels[11 + (i * 6) + yOffset][11 + (j * 8)].char = ' ';
				// the right side
				screen.pixels[11 + (i * 6) + yOffset][13 + (j * 8)].char = '■';
				screen.pixels[11 + (i * 6) + yOffset][13 + (j * 8)].color = COLOR_DEFAULT;
				screen.pixels[11 + (i * 6) + yOffset][13 + (j * 8)].font = '28pt Lucida Console';
			}
		}
	}
	var OCUPATIONAL_STRING = 'Occupational Breaker';
	xStart = screen_center_x - Math.round(OCUPATIONAL_STRING.length / 2) + 1;
	for (var i = OCUPATIONAL_STRING.length - 1; i >= 0; i--) {		
		screen.pixels[36][xStart + i].char = OCUPATIONAL_STRING[i];
		screen.pixels[36][xStart + i].color = COLOR_DEFAULT;
	}
}

var inventoryCursorPos = 0;
function updateInventory () {
	var xStart = screen_center_x - Math.round(INVENTORY_STRING.length / 2) + 1;
	for (var i = INVENTORY_STRING.length - 1; i >= 0; i--) {		
		screen.pixels[INVENTORY_STRING_Y][xStart + i].char = INVENTORY_STRING[i];
		screen.pixels[INVENTORY_STRING_Y][xStart + i].color = COLOR_DEFAULT;
	}

	var weapons = [];
	var modules = [];
	var consumables = [];
	var objectiveItems = [];
	for (var i = player.inventory.length - 1; i >= 0; i--) {
		var item = player.inventory[i]
		switch(item.slot) {
			case SLOT_WIELDABLE:weapons.push(item);break;
			case SLOT_MODULE:modules.push(item);break;
			case SLOT_HEAD:modules.push(item);break;
			default: objectiveItems.push(item);break;
		}
	}
	var yOffset = 3;
	var itemSum = 0;
	if (weapons.length > 0) {
		var sectionTitle = "Weapons";
		var xStart = 12;
		for (var i = sectionTitle.length - 1; i >= 0; i--) {		
			screen.pixels[INVENTORY_STRING_Y + yOffset][xStart + i].char = sectionTitle[i];
			screen.pixels[INVENTORY_STRING_Y + yOffset][xStart + i].color = COLOR_DEFAULT;
		}
		yOffset += 3;
		for (var i = 0; i < weapons.length; i++) {
			var item = weapons[i];
			var itemName = item.name;
			var itemString = 'a - ' + itemName;
			var color = item.color;
			if (item.equipped)			
				screen.pixels[INVENTORY_STRING_Y + yOffset][xStart - 12].char = CHAR_EQUIPPED_ITEM;
			for (var j = itemString.length - 1; j >= 0; j--) {
				screen.pixels[INVENTORY_STRING_Y + yOffset][xStart - 10 + j].char = itemString[j];
				screen.pixels[INVENTORY_STRING_Y + yOffset][xStart - 10 + j].color = COLOR_DEFAULT;
				if (i == inventoryCursorPos)
					screen.pixels[INVENTORY_STRING_Y + yOffset][xStart - 10 + j].font = FONT_STYLE_BOLD;
			}
			yOffset += 2;
		}
		itemSum += weapons.length;
	}
	if (modules.length > 0) {
		var sectionTitle = "Modules";
		var xStart = 12;
		for (var i = sectionTitle.length - 1; i >= 0; i--) {		
			screen.pixels[INVENTORY_STRING_Y + yOffset][xStart + i].char = sectionTitle[i];
			screen.pixels[INVENTORY_STRING_Y + yOffset][xStart + i].color = COLOR_DEFAULT;
		}
		yOffset += 3;
		for (var i = 0; i < modules.length; i++) {
			var item = modules[i];
			var itemName = item.name;
			var itemString = 'a - ' + itemName;
			var color = item.color;
			if (item.equipped)			
				screen.pixels[INVENTORY_STRING_Y + yOffset][xStart - 12].char = CHAR_EQUIPPED_ITEM;
			for (var j = itemString.length - 1; j >= 0; j--) {
				screen.pixels[INVENTORY_STRING_Y + yOffset][xStart - 10 + j].char = itemString[j];
				screen.pixels[INVENTORY_STRING_Y + yOffset][xStart - 10 + j].color = COLOR_DEFAULT;
				if (i + itemSum == inventoryCursorPos)
					screen.pixels[INVENTORY_STRING_Y + yOffset][xStart - 10 + j].font = FONT_STYLE_BOLD;
			}
			yOffset += 2;
		}
		itemSum += modules.length;
	}
	if (consumables.length > 0) {
		var sectionTitle = "Consumables";
		var xStart = 12;
		for (var i = sectionTitle.length - 1; i >= 0; i--) {		
			screen.pixels[INVENTORY_STRING_Y + yOffset][xStart + i].char = sectionTitle[i];
			screen.pixels[INVENTORY_STRING_Y + yOffset][xStart + i].color = COLOR_DEFAULT;
		}
		yOffset += 3;
		for (var i = 0; i < consumables.length; i++) {
			var item = consumables[i];
			var itemName = item.name;
			var itemString = 'a - ' + itemName;
			var color = item.color;
			if (item.equipped)			
				screen.pixels[INVENTORY_STRING_Y + yOffset][xStart - 12].char = CHAR_EQUIPPED_ITEM;
			for (var j = itemString.length - 1; j >= 0; j--) {
				screen.pixels[INVENTORY_STRING_Y + yOffset][xStart - 10 + j].char = itemString[j];
				screen.pixels[INVENTORY_STRING_Y + yOffset][xStart - 10 + j].color = COLOR_DEFAULT;
				if (i + itemSum == inventoryCursorPos)
					screen.pixels[INVENTORY_STRING_Y + yOffset][xStart - 10 + j].font = FONT_STYLE_BOLD;
			}
			yOffset += 2;
		}
		itemSum += consumables.length;
	}
	if (objectiveItems.length > 0) {
		var sectionTitle = "Task Items";
		var xStart = 12;
		for (var i = sectionTitle.length - 1; i >= 0; i--) {		
			screen.pixels[INVENTORY_STRING_Y + yOffset][xStart + i].char = sectionTitle[i];
			screen.pixels[INVENTORY_STRING_Y + yOffset][xStart + i].color = COLOR_DEFAULT;
		}
		yOffset += 3;
		for (var i = 0; i < objectiveItems.length; i++) {
			var item = objectiveItems[i];
			var itemName = item.name;
			var itemString = 'a - ' + itemName;
			var color = item.color;
			if (item.equipped)			
				screen.pixels[INVENTORY_STRING_Y + yOffset][xStart - 12].char = CHAR_EQUIPPED_ITEM;
			for (var j = itemString.length - 1; j >= 0; j--) {
				screen.pixels[INVENTORY_STRING_Y + yOffset][xStart - 10 + j].char = itemString[j];
				screen.pixels[INVENTORY_STRING_Y + yOffset][xStart - 10 + j].color = COLOR_DEFAULT;
				if (i + itemSum == inventoryCursorPos)
					screen.pixels[INVENTORY_STRING_Y + yOffset][xStart - 10 + j].font = FONT_STYLE_BOLD;
			}
			yOffset += 2;
		}
	}
}

var SKILLS_STRING = 'Skills';
var SKILLS_STRING_Y = 3;
var skillsCursorPos = 0;
function updateSkills () {
	// draw skills title
	var xStart = screen_center_x - Math.round(SKILLS_STRING.length / 2) + 1;
	for (var i = SKILLS_STRING.length - 1; i >= 0; i--) {		
		screen.pixels[SKILLS_STRING_Y][xStart + i].char = SKILLS_STRING[i];
		screen.pixels[SKILLS_STRING_Y][xStart + i].color = COLOR_DEFAULT;
	}
	// Draw skill points
	var skillPointsString = 'SP: ' + player.skillPoints;
	for (var i = skillPointsString.length - 1; i >= 0; i--) {		
		screen.pixels[SKILLS_STRING_Y][3 + i].char = skillPointsString[i];
		screen.pixels[SKILLS_STRING_Y][3 + i].color = COLOR_DEFAULT;
	}
	// draw Skill:Level
	for (var i = skills.defaultSkills.length - 1; i >= 0; i--) {
		var color = i == skillsCursorPos ? COLOR_SELECT_CLASS_NAME : COLOR_CLASS_NAME;
		var skillString = skills.defaultSkills[i].name + ':' + skills.defaultSkills[i].lvl;
		for (var j = skillString.length - 1; j >= 0; j--) {
			screen.pixels[WELCOME_Y_OFFSET + i][WELCOME_X_OFFSET + j + Math.round(i / CLASS_COLUMN_HEIGHT)].char = skillString[j];
			screen.pixels[WELCOME_Y_OFFSET + i][WELCOME_X_OFFSET + j + Math.round(i / CLASS_COLUMN_HEIGHT)].color = color;
			if (i == skillsCursorPos)
				screen.pixels[WELCOME_Y_OFFSET + i][WELCOME_X_OFFSET + j + Math.round(i / CLASS_COLUMN_HEIGHT)].font = FONT_STYLE_BOLD;
		}
	}
}

function updateFirmware () {
	var xStart = screen_center_x - Math.round(FIRMWARE_STRING.length / 2) + 1;
	for (var i = FIRMWARE_STRING.length - 1; i >= 0; i--) {		
		screen.pixels[FIRMWARE_STRING_Y][xStart + i].char = FIRMWARE_STRING[i];
		screen.pixels[FIRMWARE_STRING_Y][xStart + i].color = COLOR_DEFAULT;
	}
}

var CHEST_STRING = "Reward Cache";
var chestCursorPos = 0;
function updateChest () {
	var xStart = screen_center_x - Math.round(CHEST_STRING.length / 2) + 1;
	for (var i = CHEST_STRING.length - 1; i >= 0; i--) {		
		screen.pixels[INVENTORY_STRING_Y][xStart + i].char = CHEST_STRING[i];
		screen.pixels[INVENTORY_STRING_Y][xStart + i].color = COLOR_DEFAULT;
	}

	for (var i = currentChest.contents.length - 1; i >= 0; i--) {
		var item = currentChest.contents[i];
		var itemName = item.name;
		var itemString = 'a - ' + itemName;
		var color = item.color;
		for (var j = itemString.length - 1; j >= 0; j--) {
			screen.pixels[INVENTORY_STRING_Y + 3 + i * 2][xStart - 10 + j].char = itemString[j];
			screen.pixels[INVENTORY_STRING_Y + 3 + i * 2][xStart - 10 + j].color = COLOR_DEFAULT;
			if (i == chestCursorPos)
				screen.pixels[INVENTORY_STRING_Y + 3 + i * 2][xStart - 10 + j].font = FONT_STYLE_BOLD;
		}
	}
}

var CAPTURE_BAR_LENGTH = 11;
function updateCapture () {
	var inRoom = dungeon.tiles[player.y][player.x].inRoom;
	if (!inRoom || dungeon.getRoom().captureAmount == 1)
		return;
	var captureString = "Capturing";
	var xStart = 24 + screen_center_x - Math.round(captureString.length / 2) + 1;
	for (var i = captureString.length - 1; i >= 0; i--) {
			screen.pixels[3][xStart + i].char = captureString[i];
			screen.pixels[3][xStart + i].color = COLOR_DEFAULT;
	}
	xStart = 24 + screen_center_x - Math.round(CAPTURE_BAR_LENGTH/2) + 1;
	for (var i = 0; i < CAPTURE_BAR_LENGTH; i++) {		
			screen.pixels[7][xStart + i].char = '■';
			screen.pixels[5][xStart + i].char = '■';
			screen.pixels[6][xStart + i].char = '■';
			if (i >= dungeon.getRoom().captureAmount/1 * CAPTURE_BAR_LENGTH) {	
				screen.pixels[7][xStart + i].color = COLOR_OUT_OF_SIGHT;
				screen.pixels[5][xStart + i].color = COLOR_OUT_OF_SIGHT;
				screen.pixels[6][xStart + i].color = COLOR_OUT_OF_SIGHT;
			} else {				
				screen.pixels[7][xStart + i].color = COLOR_FACTIONS_UNPOWERED[FACTION_CLONES];
				screen.pixels[5][xStart + i].color = COLOR_FACTIONS_UNPOWERED[FACTION_CLONES];
				screen.pixels[6][xStart + i].color = COLOR_FACTIONS_UNPOWERED[FACTION_CLONES];				
			}
	}
}

var onScreenEnemies = {};
function updateEnemyLog() {
	for (var i = dungeon.npcs.length - 1; i >= 0; i--) {
		var enemy = dungeon.npcs[i];
		if (enemy.visible) {
			if (onScreenEnemies[enemy.name] == null) {
				onScreenEnemies[enemy.name] = {char:enemy.char, count:1};
			} else {
				onScreenEnemies[enemy.name].count++;
			}
		}
	}
	var i = 0;
	for (var enemyEntry in onScreenEnemies) {
		var enemyString = onScreenEnemies[enemyEntry].char + " " + enemyEntry;
		if (onScreenEnemies[enemyEntry].count > 1)
			enemyString += " x" + onScreenEnemies[enemyEntry].count;
		for (var j = enemyString.length - 1; j >= 0; j--) {
			screen.pixels[27 + i * 2][57 + j].char = enemyString[j];
			screen.pixels[27 + i * 2][57 + j].color = COLOR_DEFAULT;
		}
		i++;
	}
	onScreenEnemies =  {};
}

// will do all the screen updating so I dont have to think about it
// every time I do any input shit
function updateScreen () {
	clearScreen();
	switch(gameState) { 
		// winscreen
		case STATE_SWITCHBOARD:
			updateSwitchboard();
		break;

		// gameplay
		case STATE_GAME:
		if (fullscreen) {			
			updateMap();
		} else {
			updateEnemyLog();
			updateCapture();
			updateStats();
			updateHP();
			updateMiniMap();
			updateMap();
			if (updateObjectives())
				updateLog();
		}
		break;

		case STATE_FIRMWARE:
			updateFirmware();
		break;

		case STATE_SKILLS:
			updateSkills();
		break;

		case STATE_4X_MODE:	
			updateStats();		
			update4X();
			updateTasks();
		break;

		case STATE_INVENTORY:
			updateInventory();
		break;

		case STATE_CHEST:
			updateChest();
		break;

		// the landing page
		case STATE_WELCOME:
			updateWelcome();
		break;
	}
	if (!helped) {
		screen.pixels[screen.height - 1][screen.width - 1].char = "?";
		screen.pixels[screen.height - 1][screen.width - 1].color = COLOR_DEFAULT;
	}
	redraw();
}

function redraw () {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	for (var i = 0; i < DISPLAY_HEIGHT; i++) {
		for (var j = 0; j < DISPLAY_WIDTH; j++) {
			var pixel = screen.pixels[i][j];
			ctx.font = pixel.font;
			ctx.fillStyle = pixel.color;			
			ctx.fillText(pixel.char, j * FONT_H_SPACE, i * FONT_V_SPACE);
			pixel.font = FONT_STYLE_DEFAULT;
		}
	}
}

function Screen (width, height) {
	this.width = width;
	this.height = height;
	this.pixels = new Array(this.height);
	for (var i = 0; i < this.height; i++) {
		this.pixels[i] = new PixelArray(this.width, ' ', '#333333');
	}
}

function Pixel (char, color, font) {
	char = typeof char !== 'undefined' ?  char : ' ';
	color = typeof color !== 'undefined' ?  color : '#cdc0b6';
	font = typeof font !== 'undefined' ? font : FONT_STYLE_DEFAULT;

	char = char == ' ' ? ' ' : char;

	this.char = char;
	this.color = color;
	this.font = font;
}