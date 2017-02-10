var backgroundCursorPos = 0;
var classCursorPos = 0;

function backgroundOnKeyDown(event) {
	event = event || window.event;

	var keyCode = event.keyCode;

	switch (keyCode) {
	    // Tab 09
	    case 9:
	    event.preventDefault();
	    break;
	    // backspace 08
	    case 8:
	    gameState = STATE_LANDING;
		document.onkeydown = welcomeOnKeyDown;
	    windows[SCREEN_GAME].redraw(gameTicks);
	    break;
	    // enter
	    case 13:
		gameState = STATE_LOADOUT;
		document.onkeydown = loadoutOnKeyDown;
		// reset this here
		startingWealth = hardMode ? 30 : 50;
		for (var i = LOADOUT_OPTIONS.length - 1; i >= 0; i--) {
			LOADOUT_OPTIONS[i].selected = false;
		}
		// if we are a student, we in debt
    	for (var i = CLASSES.length - 1; i >= 0; i--) {
    		if (CLASSES[i].selected && CLASSES[i].name == CLASS_STUDENT)
    			startingWealth = -50;
    		else if (CLASSES[i].selected && CLASSES[i].name == CLASS_INVESTOR)
    			startingWealth = hardMode ? 50 : 75;
    	}
		windows[SCREEN_GAME].redraw(gameTicks);
	    break;
	    // space bar
	    case 32:
	    if (classSelecting) {		    
	    	for (var i = CLASSES.length - 1; i >= 0; i--) {
	    		CLASSES[i].selected = false;
	    	}
	    	CLASSES[classCursorPos].selected = true;
	    } else {
	    	for (var i = BACKGROUNDS.length - 1; i >= 0; i--) {
	    		BACKGROUNDS[i].selected = false;
	    	}
	    	BACKGROUNDS[backgroundCursorPos].selected = true;
	    }
		windows[SCREEN_GAME].redraw(gameTicks);
	    break;
		case KEY_NORTH: 
	    moveBackground({x:0, y:-1});	    	  
	    break;
	    case KEY_NORTH_EAST:
	    moveBackground({x:1, y:-1});	    	  
	    break;
	    case KEY_EAST: 
	    moveBackground({x:1, y:0});	    	  
	    break;
	    case KEY_SOUTH_EAST:
	    moveBackground({x:1, y:1});	    	  
	    break;
	    case KEY_SOUTH:
	    moveBackground({x:0, y:1});
	    break;
	    case KEY_SOUTH_WEST:
	    moveBackground({x:-1, y:1});	    	  
	    break;
	    case KEY_WEST: 
	    moveBackground({x:-1, y:0});	    	  
	    break;
	    case KEY_NORTH_WEST: 
	    moveBackground({x:-1, y:-1});	    	  
	    break;
	    case KEY_WAIT: 
	    moveBackground({x:0, y:0});
	    break;
	    // right arrow 39
	    case 39: 
	    moveBackground({x:1, y:0});	    	  
	    break;
	    // left arrow 37
	    case 37: 
	    moveBackground({x:-1, y:0});	    	  
	    break;
	    // up arrow 38
	    case 38:
	    moveBackground({x:0, y:-1});
	    break;
	    // down arrow 40
	    case 40:
	    moveBackground({x:0, y:1});
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

function drawBackground () {
	var descriptionString = "";

	var classString = "Class";
	var xStart = Math.round(DISPLAY_WIDTH * .2); - Math.round(classString.length / 2) + 1;
	var yStart = Math.round(DISPLAY_HEIGHT * .2);
	for (var i = classString.length - 1; i >= 0; i--) {
			windows[SCREEN_GAME].screen.pixels[yStart][xStart + i].char = classString[i];
			windows[SCREEN_GAME].screen.pixels[yStart][xStart + i].color = COLOR_DEFAULT;
	}
	for (var i = CLASSES.length - 1; i >= 0; i--) {
		var classs = CLASSES[i];
		var color = COLOR_CLASS_NAME;
		var classString = classs.name;
		var tempOffset = 0;
		if (i == classCursorPos) {
			classString = '[' + classs.name + ']';
			tempOffset = 1;
			if (classSelecting)
				descriptionString = classs.description;
		}
		if (classs.selected)
			color = COLOR_DEFAULT;
		var xStart = Math.round(DISPLAY_WIDTH * .2); - Math.round(classString.length / 2) + 1;
		var yStart = Math.round(DISPLAY_HEIGHT * .2) + 2;
		for (var j = classString.length - 1; j >= 0; j--) {
			var tempColor = color;
			if (classString[j] == '[' || classString[j] == ']')
				tempColor = classSelecting ? COLOR_DEFAULT : COLOR_CLASS_NAME;
			windows[SCREEN_GAME].screen.pixels[yStart + i * 2][xStart + j - tempOffset].char = classString[j];
			windows[SCREEN_GAME].screen.pixels[yStart + i * 2][xStart + j - tempOffset].color = tempColor;
		}
	}

	var welcomeString = "Background";
	var xStart = Math.round(DISPLAY_WIDTH * .6); - Math.round(classString.length / 2) + 1;
	var yStart = Math.round(DISPLAY_HEIGHT * .2);
	for (var i = welcomeString.length - 1; i >= 0; i--) {
			windows[SCREEN_GAME].screen.pixels[yStart][xStart + i].char = welcomeString[i];
			windows[SCREEN_GAME].screen.pixels[yStart][xStart + i].color = COLOR_SELECT_CLASS_NAME;
	}
	for (var i = BACKGROUNDS.length - 1; i >= 0; i--) {
		var background = BACKGROUNDS[i];
		var color = COLOR_CLASS_NAME;
		var backgroundString = background.name;
		var tempOffset = 1;
		if (i == backgroundCursorPos) {
			backgroundString = '[' + background.name + ']';
			backgroundString += background.offset.substr(0, background.offset.length - 1);
			tempOffset = 0;
			if (!classSelecting)
				descriptionString = background.description;
		}
		else
			backgroundString += background.offset;

		if (background.selected)
			color = COLOR_SELECT_CLASS_NAME;

		var xStart = Math.round(DISPLAY_WIDTH * .6); - Math.round(backgroundString.length / 2) + 1;
		var yStart = Math.round(DISPLAY_HEIGHT * .2) + 2;
		for (var j = backgroundString.length - 1; j >= 0; j--) {
			var tempColor = color;
			if (backgroundString[j] == '[' || backgroundString[j] == ']')
				tempColor = !classSelecting ? COLOR_SELECT_CLASS_NAME : COLOR_CLASS_NAME;
			windows[SCREEN_GAME].screen.pixels[yStart + i * 2][xStart + j + tempOffset].char = backgroundString[j];
			windows[SCREEN_GAME].screen.pixels[yStart + i * 2][xStart + j + tempOffset].color = tempColor;
		}

		if (!background.selected && i != backgroundCursorPos)
			continue;
	}

	tempOffset = 0;
	tempOffset++;

	var color = COLOR_DEFAULT;

	var yStart = Math.round(DISPLAY_HEIGHT * .8);
	var xStart = Math.round(DISPLAY_WIDTH * .5) - Math.round(32 / 2) + 1;

	if (!classSelecting) {
		var background = BACKGROUNDS[backgroundCursorPos];

		var strString = "Str:";
		// var color2 = background.selected ? COLOR_STRENGTH : COLOR_OUT_OF_SIGHT;
		var color2 = COLOR_STRENGTH;
		for (var j = 0; j < strString.length; j++) {			
			windows[SCREEN_GAME].screen.pixels[yStart][xStart + tempOffset].char = strString[j];
			windows[SCREEN_GAME].screen.pixels[yStart][xStart + tempOffset].color = color2;
			tempOffset++;
		}
		var strValue = background.strength + " ";
		for (var j = 0; j < strValue.length; j++) {			
			windows[SCREEN_GAME].screen.pixels[yStart][xStart + tempOffset].char = strValue[j];
			windows[SCREEN_GAME].screen.pixels[yStart][xStart + tempOffset].color = color;
			tempOffset++;
		}
		var wilString = "Will:";
		// var color2 = background.selected ? COLOR_WILLPOWER : COLOR_OUT_OF_SIGHT;
		var color2 = COLOR_WILLPOWER;
		for (var j = 0; j < wilString.length; j++) {			
			windows[SCREEN_GAME].screen.pixels[yStart][xStart + tempOffset].char = wilString[j];
			windows[SCREEN_GAME].screen.pixels[yStart][xStart + tempOffset].color = color2;
			tempOffset++;
		}
		var wilValue = background.willpower + " ";
		for (var j = 0; j < wilValue.length; j++) {			
			windows[SCREEN_GAME].screen.pixels[yStart][xStart + tempOffset].char = wilValue[j];
			windows[SCREEN_GAME].screen.pixels[yStart][xStart + tempOffset].color = color;
			tempOffset++;
		}
		var conString = "Con:";
		// var color2 = background.selected ? COLOR_CONSTITUTION : COLOR_OUT_OF_SIGHT;
		var color2 = COLOR_CONSTITUTION;
		for (var j = 0; j < conString.length; j++) {			
			windows[SCREEN_GAME].screen.pixels[yStart][xStart + tempOffset].char = conString[j];
			windows[SCREEN_GAME].screen.pixels[yStart][xStart + tempOffset].color = color2;
			tempOffset++;
		}
		var conValue = background.constitution + " ";
		for (var j = 0; j < conValue.length; j++) {			
			windows[SCREEN_GAME].screen.pixels[yStart][xStart + tempOffset].char = conValue[j];
			windows[SCREEN_GAME].screen.pixels[yStart][xStart + tempOffset].color = color;
			tempOffset++;
		}
		var perString = "Per:";
		// var color2 = background.selected ? COLOR_PERCEPTION : COLOR_OUT_OF_SIGHT;
		var color2 = COLOR_PERCEPTION;
		for (var j = 0; j < perString.length; j++) {			
			windows[SCREEN_GAME].screen.pixels[yStart][xStart + tempOffset].char = perString[j];
			windows[SCREEN_GAME].screen.pixels[yStart][xStart + tempOffset].color = color2;
			tempOffset++;
		}
		var perValue = background.perception + " ";
		for (var j = 0; j < perValue.length; j++) {			
			windows[SCREEN_GAME].screen.pixels[yStart][xStart + tempOffset].char = perValue[j];
			windows[SCREEN_GAME].screen.pixels[yStart][xStart + tempOffset].color = color;
			tempOffset++;
		}
		var leaString = "Lead:";
		// var color2 = background.selected ? COLOR_LEADERSHIP : COLOR_OUT_OF_SIGHT;
		var color2 = COLOR_LEADERSHIP;
		for (var j = 0; j < leaString.length; j++) {			
			windows[SCREEN_GAME].screen.pixels[yStart][xStart + tempOffset].char = leaString[j];
			windows[SCREEN_GAME].screen.pixels[yStart][xStart + tempOffset].color = color2;
			tempOffset++;
		}
		var leaValue = background.leadership + " ";
		for (var j = 0; j < leaValue.length; j++) {			
			windows[SCREEN_GAME].screen.pixels[yStart][xStart + tempOffset].char = leaValue[j];
			windows[SCREEN_GAME].screen.pixels[yStart][xStart + tempOffset].color = color;
			tempOffset++;
		}
	}

	// draw the option description
	var descriptionString = classSelecting ? CLASSES[classCursorPos].description : '';
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

var classSelecting = true;
function moveBackground(offset) {
	if (classSelecting && offset.x == 1)
		classSelecting = false;
	else if (!classSelecting && offset.x == -1)
		classSelecting = true;

	if (classSelecting)
		classCursorPos = Math.min(Math.max(offset.y + classCursorPos, 0), CLASSES.length - 1);
	else 
		backgroundCursorPos = Math.min(Math.max(offset.y + backgroundCursorPos, 0), BACKGROUNDS.length - 1);

	windows[SCREEN_GAME].redraw(gameTicks);
}