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
	    // backspace 08
	    case 8:
	    gameState = STATE_BACKGROUND;
		document.onkeydown = backgroundOnKeyDown;
		// reset options
	    windows[SCREEN_GAME].redraw(gameTicks);
	    break;
	    // enter 13
	    case 13:
		gameState = STATE_GAME;
		TILE_X = -1;
		TILE_Y = -1;
		newGame();
		document.onkeydown = gameOnKeyDown;
		relight();
		windows[SCREEN_GAME].redraw(gameTicks);
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
		windows[SCREEN_GAME].redraw(gameTicks);
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
	    // escape 27
	    case 27:
			if (selectingTile) {
				selectingTile = false;
				selectingFor = null;
				TILE_X = -1;
				TILE_Y = -1;
				for (var i = pixelEffects.length - 1; i >= 0; i--) {
					var effect = pixelEffects[i];
					if (effect.type == PIXEL_INVERT)
						pixelEffects.remove(effect);
				}
				relight();
				windows[SCREEN_GAME].redraw(gameTicks);
			} else {

				if (!windows[SCREEN_HELP].visible)
					windows[SCREEN_HELP].show();
				else
					windows[SCREEN_HELP].hide();
			}
	    break;
	    // ?
	    case 191:
		    if (!event.shiftKey)
		    	return;
		    
			if (!windows[SCREEN_HELP].visible)
				windows[SCREEN_HELP].show();
			else
				windows[SCREEN_HELP].hide();	    
	    break;
		default:break;
	}
}

var startingWealth = 50;
function drawLoadout() {
	// draw the section title
	var loadoutString = "Loadout";
	var xStart = Math.round(DISPLAY_WIDTH * .3) - Math.round(loadoutString.length / 2) + 1;
	var yStart = Math.round(DISPLAY_HEIGHT * .2);
	for (var i = loadoutString.length - 1; i >= 0; i--) {
			windows[SCREEN_GAME].screen.pixels[yStart][xStart + i].char = loadoutString[i];
			windows[SCREEN_GAME].screen.pixels[yStart][xStart + i].color = COLOR_DEFAULT;
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
				descriptionString = LOADOUT_OPTIONS[i].getPrefix() + LOADOUT_OPTIONS[i].getDescription();
		} else
			loadoutString = ' ' + loadoutString + ' ';
		
		var xStart = Math.round(DISPLAY_WIDTH * .3) - Math.round(loadoutString.length / 2) + 1;
		var yStart = Math.round(DISPLAY_HEIGHT * .2) + 2;
		for (var j = loadoutString.length - 1; j >= 0; j--) {
			var tempColor = color;
			if (loadoutString[j] == '[' || loadoutString[j] == ']') {
				if (loadoutSelecting)
					tempColor = COLOR_DEFAULT;
				else
					tempColor = COLOR_CLASS_NAME;
			}
			windows[SCREEN_GAME].screen.pixels[yStart + i * 2][xStart + j].char = loadoutString[j];
			windows[SCREEN_GAME].screen.pixels[yStart + i * 2][xStart + j].color = tempColor;
		}
	}

	var attackStyleString = "Attack Styles";
	var xStart = Math.round(DISPLAY_WIDTH * .7) - Math.round(attackStyleString.length / 2) + 1;
	var yStart = Math.round(DISPLAY_HEIGHT * .2);
	for (var i = attackStyleString.length - 1; i >= 0; i--) {
			windows[SCREEN_GAME].screen.pixels[yStart][xStart + i].char = attackStyleString[i];
			windows[SCREEN_GAME].screen.pixels[yStart][xStart + i].color = COLOR_SELECT_CLASS_NAME;
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

		var xStart = Math.round(DISPLAY_WIDTH * .7) - Math.round(attackStyleString.length / 2) + 1;
		var yStart = Math.round(DISPLAY_HEIGHT * .2) + 2;
		for (var j = attackStyleString.length - 1; j >= 0; j--) {
			var tempColor = color;
			if ((attackStyleString[j] == '[' || attackStyleString[j] == ']')) {
				if (!loadoutSelecting)
					tempColor = COLOR_SELECT_CLASS_NAME;
				else
					tempColor = COLOR_CLASS_NAME;
			}
			windows[SCREEN_GAME].screen.pixels[yStart + i * 2][xStart + j].char = attackStyleString[j];
			windows[SCREEN_GAME].screen.pixels[yStart + i * 2][xStart + j].color = tempColor;
		}
	}
	
	// draw our starting funds
	var wealthString = "Dosh: " + startingWealth;
	var xStart = Math.round(DISPLAY_WIDTH * .2) - Math.round(wealthString.length / 2) + 1;
	var yStart = Math.round(DISPLAY_HEIGHT * .6);
	for (var i = wealthString.length - 1; i >= 0; i--) {
			windows[SCREEN_GAME].screen.pixels[yStart][xStart + i].char = wealthString[i];
			windows[SCREEN_GAME].screen.pixels[yStart][xStart + i].color = COLOR_DEFAULT;
	}

	// draw the option description
	var yOffset = 0;
	var xPos = 0;	
	var MAX_LINE_LENGTH = DISPLAY_WIDTH - 10;
	var xStart = 5
	var yStart = Math.round(DISPLAY_HEIGHT * .8);
	for (var i = 0; i < descriptionString.length; i++) {		
		xPos = i;
		if (yOffset >= 2)
			xPos -= MAX_LINE_LENGTH * yOffset/2;
		if (xPos >= MAX_LINE_LENGTH) {
			yOffset += 2;
			xPos -= MAX_LINE_LENGTH;
		}
		windows[SCREEN_GAME].screen.pixels[yStart + yOffset][xStart + xPos].char = descriptionString[i];
		windows[SCREEN_GAME].screen.pixels[yStart + yOffset][xStart + xPos].color = COLOR_DEFAULT;
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
	windows[SCREEN_GAME].redraw(gameTicks);
}

function buildLoadOut() {
	var result = [];
	for (var i = LOADOUT_OPTIONS.length - 1; i >= 0; i--) {
		if (LOADOUT_OPTIONS[i].selected)
			result.push(MakeItem(LOADOUT_OPTIONS[i].name));
	}
	return result;
}
