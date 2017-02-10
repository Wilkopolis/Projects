function fourXOnKeyDown(event) {
	event = event || window.event;

	var keyCode = event.keyCode;

	switch (keyCode) {
	    // m
	    case 77:
	    gameState = STATE_GAME;
	    document.onkeydown = gameOnKeyDown;
	    relight();
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
	    	togglePower(fourXPos);
	    }
	    draw();
	    break;
	    // ?
	    case 191:
	    if (!event.shiftKey)
	    	return;
	    if (!helped) {
	    	helped = true;
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

function draw4X () {
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

// draw the screen with objective progress
function drawObjectives () {
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

function drawTasks() {
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

function move4X(offset) {
	newerInput = true;
	cursorVis = true;
	var newPos = {x:fourXPos.x + offset.x, y:fourXPos.y + offset.y};
	if (newPos.x >= 0 &&
		newPos.y >= 0 &&
		newPos.y < minimap.length &&
		newPos.x < minimap[newPos.y].length &&
		minimap[newPos.y][newPos.x].hash != 0)
		fourXPos.x = newPos.x, fourXPos.y = newPos.y;
	draw();
	blinkMegaMap();
}

// called each time a room is entered for the first time
var lastTick = 0;
var FOURX_PERIOD = 60;
function do4XTurn () {
	if (gameTicks - lastTick >= FOURX_PERIOD) {
		log.add("Turn " + gameTicks / FOURX_PERIOD + " has ended");
		lastTick = gameTicks;
		for (var faction in factions) {
			factions[faction].do4XTurn();
		}
	}
}
