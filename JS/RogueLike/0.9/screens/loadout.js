var loadoutCursorPos = 0;
var attackStyleCursorPos = 0;

function loadoutOnKeyDown(event) {
	event = event || window.event;

	var keyCode = event.keyCode;

	switch (keyCode) {
	    // Tab 09
	    case 9:
	    event.preventDefault();
	    break;
	    // enter 13
	    case 13:
		gameState = STATE_GAME;
		TILE_X = -1;
		TILE_Y = -1;
	    effectsContainer.style.display = 'block';
		newGame();
		document.onkeydown = gameOnKeyDown;
		relight();
		draw(gameTicks);
	    break;
	    // space bar 32
	    case 32:
	    if (loadoutSelecting) {
		    var loadoutItemNode = LOADOUT_OPTIONS[loadoutCursorPos];
		    if (!loadoutItemNode.selected && startingWealth >= loadoutItemNode.value) {
		    	startingWealth -= loadoutItemNode.value;
		    	loadoutItemNode.selected = true;
		    } else if (loadoutItemNode.selected) {
		    	startingWealth += loadoutItemNode.value;
		    	loadoutItemNode.selected = false;
		    }
	    } else {
	    	for (var i = ATTACK_STYLES.length - 1; i >= 0; i--) {
	    		ATTACK_STYLES[i].selected = false;
	    	}
	    	ATTACK_STYLES[attackStyleCursorPos].selected = true;
	    }
		draw(gameTicks);
	    break;
	    case KEY_NORTH: 
	    moveLoadout({x:0, y:-1});	    	  
	    break;
	    case KEY_NORTH_EAST:
	    moveLoadout({x:1, y:-1});	    	  
	    break;
	    case KEY_EAST: 
	    moveLoadout({x:1, y:0});	    	  
	    break;
	    case KEY_SOUTH_EAST:
	    moveLoadout({x:1, y:1});	    	  
	    break;
	    case KEY_SOUTH:
	    moveLoadout({x:0, y:1});
	    break;
	    case KEY_SOUTH_WEST:
	    moveLoadout({x:-1, y:1});	    	  
	    break;
	    case KEY_WEST: 
	    moveLoadout({x:-1, y:0});	    	  
	    break;
	    case KEY_NORTH_WEST: 
	    moveLoadout({x:-1, y:-1});	    	  
	    break;
	    case KEY_WAIT: 
	    moveLoadout({x:0, y:0});
	    break; 
	    // right arrow 39
	    case 39: 
	    moveLoadout({x:1, y:0});	    	  
	    break;
	    // left arrow 37
	    case 37: 
	    moveLoadout({x:-1, y:0});	    	  
	    break;
	    // up arrow 38
	    case 38:
	    moveLoadout({x:0, y:-1});
	    break;
	    // down arrow 40
	    case 40:
	    moveLoadout({x:0, y:1});
	    break;
	    // ?
	    case 191:
	    if (!event.shiftKey)
	    	return;
	    if (!helped) {
	    	helped = true;
	    	draw(gameTicks);
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

var startingWealth = 50;
function drawLoadout() {
	// draw the section title
	var loadoutString = "Loadout";	
	var xStart = screen_center_x - Math.round(loadoutString.length / 2) + 1;
	for (var i = loadoutString.length - 1; i >= 0; i--) {
			screen.pixels[3][xStart + i - 20].char = loadoutString[i];
			screen.pixels[3][xStart + i - 20].color = COLOR_DEFAULT;
	}
	var descriptionString = "";
	// draw our options
	for (var i = LOADOUT_OPTIONS.length - 1; i >= 0; i--) {
		var color = COLOR_CLASS_NAME;
		var loadoutString = LOADOUT_OPTIONS[i].value + ':' + LOADOUT_OPTIONS[i].name;
		// if we are choosing to take it, color it differently
		if (LOADOUT_OPTIONS[i].selected)
			color = COLOR_DEFAULT;	
		// if our cursor is over it, draw its description and
		// put [brackets] around it
		if (i == loadoutCursorPos) {	
			loadoutString = '[' + loadoutString + ']';
			if (loadoutSelecting)
				descriptionString = LOADOUT_OPTIONS[i].getDescription();
		} else
			loadoutString = ' ' + loadoutString + ' ';
		
		for (var j = loadoutString.length - 1; j >= 0; j--) {
			var tempColor = color;
			if (loadoutString[j] == '[' || loadoutString[j] == ']') {
				if (loadoutSelecting)
					tempColor = COLOR_DEFAULT;
				else
					tempColor = COLOR_CLASS_NAME;
			}
			screen.pixels[WELCOME_Y_OFFSET + i * 2][WELCOME_X_OFFSET + j - 11].char = loadoutString[j];
			screen.pixels[WELCOME_Y_OFFSET + i * 2][WELCOME_X_OFFSET + j - 11].color = tempColor;
		}
	}

	var attackStyleString = "Attack Styles";
	var xStart = screen_center_x - Math.round(attackStyleString.length / 2) + 1;
	for (var i = attackStyleString.length - 1; i >= 0; i--) {
			screen.pixels[3][xStart + i + 18].char = attackStyleString[i];
			screen.pixels[3][xStart + i + 18].color = COLOR_SELECT_CLASS_NAME;
	}
	for (var i = ATTACK_STYLES.length - 1; i >= 0; i--) {
		var color = COLOR_CLASS_NAME;
		var attackStyleString = ATTACK_STYLES[i].name.replaceAll(' ','');
		if (ATTACK_STYLES[i].selected)
			color = COLOR_SELECT_CLASS_NAME;
		if (i == attackStyleCursorPos) {
			attackStyleString = '[' + attackStyleString + ']';
			if (!loadoutSelecting)
				descriptionString = ATTACK_STYLES[i].description;
		} else
			attackStyleString = ' ' + attackStyleString + ' ';

		for (var j = attackStyleString.length - 1; j >= 0; j--) {
			var tempColor = color;
			if ((attackStyleString[j] == '[' || attackStyleString[j] == ']')) {
				if (!loadoutSelecting)
					tempColor = COLOR_SELECT_CLASS_NAME;
				else
					tempColor = COLOR_CLASS_NAME;
			}
			screen.pixels[WELCOME_Y_OFFSET + i * 2][WELCOME_X_OFFSET + j + 29].char = attackStyleString[j];
			screen.pixels[WELCOME_Y_OFFSET + i * 2][WELCOME_X_OFFSET + j + 29].color = tempColor;
		}
	}
	
	// draw our starting funds
	var wealthString = "Dosh: " + startingWealth;
	var xStart = screen_center_x - Math.round(wealthString.length / 2) + 1;
	for (var i = wealthString.length - 1; i >= 0; i--) {
			screen.pixels[50][xStart + i - 20].char = wealthString[i];
			screen.pixels[50][xStart + i - 20].color = COLOR_DEFAULT;
	}

	// draw the option description
	var yOffset = 0;
	var xPos = 0;	
	var MAX_LINE_LENGTH = 55;
	for (var i = 0; i < descriptionString.length; i++) {		
		xPos = i;
		if (yOffset >= 2)
			xPos -= MAX_LINE_LENGTH * yOffset/2;
		if (xPos >= MAX_LINE_LENGTH) {
			yOffset += 2;
			xPos -= MAX_LINE_LENGTH;
		}
		screen.pixels[40 + yOffset][5 + xPos].char = descriptionString[i];
		screen.pixels[40 + yOffset][5 + xPos].color = COLOR_DEFAULT;
	}
}

var loadoutSelecting = true;
function moveLoadout(offset) {
	if (loadoutSelecting && offset.x == 1)
		loadoutSelecting = false;
	else if (!loadoutSelecting && offset.x == -1)
		loadoutSelecting = true;

	if (loadoutSelecting)
		loadoutCursorPos = Math.min(Math.max(offset.y + loadoutCursorPos, 0), LOADOUT_OPTIONS.length - 1);
	else 
		attackStyleCursorPos = Math.min(Math.max(offset.y + attackStyleCursorPos, 0), ATTACK_STYLES.length - 1);
	draw(gameTicks);
}

function buildLoadOut() {
	var result = [];
	for (var i = LOADOUT_OPTIONS.length - 1; i >= 0; i--) {
		if (LOADOUT_OPTIONS[i].selected)
			result.push(MakeItem(LOADOUT_OPTIONS[i].name));
	}
	return result;
}
