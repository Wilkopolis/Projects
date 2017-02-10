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
	    // enter
	    case 13:
		gameState = STATE_LOADOUT;
		document.onkeydown = loadoutOnKeyDown;
		draw(gameTicks);
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
		draw(gameTicks);
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

function drawBackground () {
	var descriptionString = "";

	var classString = "Class";
	var xStart = screen_center_x - Math.round(classString.length / 2) + 1;
	for (var i = classString.length - 1; i >= 0; i--) {
			screen.pixels[3][xStart + i - 20].char = classString[i];
			screen.pixels[3][xStart + i - 20].color = COLOR_DEFAULT;
	}
	for (var i = CLASSES.length - 1; i >= 0; i--) {
		var classs = CLASSES[i];
		var color = COLOR_CLASS_NAME;
		var classString = classs.name;
		var tempOffset = 10;
		if (i == classCursorPos) {
			classString = '[' + classs.name + ']';
			tempOffset = 11;
			if (classSelecting)
				descriptionString = classs.description;
		}
		if (classs.selected)
			color = COLOR_DEFAULT;
		for (var j = classString.length - 1; j >= 0; j--) {
			var tempColor = color;
			if (classString[j] == '[' || classString[j] == ']')
				tempColor = classSelecting ? COLOR_DEFAULT : COLOR_CLASS_NAME;
			screen.pixels[WELCOME_Y_OFFSET + i * 2][WELCOME_X_OFFSET + j - tempOffset].char = classString[j];
			screen.pixels[WELCOME_Y_OFFSET + i * 2][WELCOME_X_OFFSET + j - tempOffset].color = tempColor;
		}
	}

	var welcomeString = "Background";
	var xStart = screen_center_x - Math.round(welcomeString.length / 2) + 1;
	for (var i = welcomeString.length - 1; i >= 0; i--) {
			screen.pixels[3][xStart + i + 14].char = welcomeString[i];
			screen.pixels[3][xStart + i + 14].color = COLOR_SELECT_CLASS_NAME;
	}
	for (var i = BACKGROUNDS.length - 1; i >= 0; i--) {
		var background = BACKGROUNDS[i];
		var color = COLOR_CLASS_NAME;
		var backgroundString = background.name;
		var tempOffset = 15;
		if (i == backgroundCursorPos) {
			backgroundString = '[' + background.name + ']';
			backgroundString += background.offset.substr(0, background.offset.length - 1);
			tempOffset = 14;
			if (!classSelecting)
				descriptionString = background.description;
		}
		else
			backgroundString += background.offset;

		if (background.selected)	
			color = COLOR_SELECT_CLASS_NAME;

		var k = 0;
		for (var j = backgroundString.length - 1; j >= 0; j--) {
			var tempColor = color;
			if (backgroundString[j] == '[' || backgroundString[j] == ']')
				tempColor = !classSelecting ? COLOR_SELECT_CLASS_NAME : COLOR_CLASS_NAME;
			screen.pixels[WELCOME_Y_OFFSET + i * 2][WELCOME_X_OFFSET + j + tempOffset].char = backgroundString[j];
			screen.pixels[WELCOME_Y_OFFSET + i * 2][WELCOME_X_OFFSET + j + tempOffset].color = tempColor;
			k++;
		}

		if (!background.selected && i != backgroundCursorPos)
			continue;

		var color = background.selected ? COLOR_DEFAULT : COLOR_SELECT_CLASS_NAME;

		var strString = "Str:";
		var color2 = background.selected ? COLOR_STRENGTH : COLOR_OUT_OF_SIGHT;
		for (var j = 0; j < strString.length; j++) {			
			screen.pixels[WELCOME_Y_OFFSET + i * 2][WELCOME_X_OFFSET + tempOffset + k].char = strString[j];
			screen.pixels[WELCOME_Y_OFFSET + i * 2][WELCOME_X_OFFSET + tempOffset + k].color = color2;
			k++;
		}
		var strValue = background.strength + " ";
		for (var j = 0; j < strValue.length; j++) {			
			screen.pixels[WELCOME_Y_OFFSET + i * 2][WELCOME_X_OFFSET + tempOffset + k].char = strValue[j];
			screen.pixels[WELCOME_Y_OFFSET + i * 2][WELCOME_X_OFFSET + tempOffset + k].color = color;
			k++;
		}
		var wilString = "Will:";
		var color2 = background.selected ? COLOR_WILLPOWER : COLOR_OUT_OF_SIGHT;
		for (var j = 0; j < wilString.length; j++) {			
			screen.pixels[WELCOME_Y_OFFSET + i * 2][WELCOME_X_OFFSET + tempOffset + k].char = wilString[j];
			screen.pixels[WELCOME_Y_OFFSET + i * 2][WELCOME_X_OFFSET + tempOffset + k].color = color2;
			k++;
		}
		var wilValue = background.willpower + " ";
		for (var j = 0; j < wilValue.length; j++) {			
			screen.pixels[WELCOME_Y_OFFSET + i * 2][WELCOME_X_OFFSET + tempOffset + k].char = wilValue[j];
			screen.pixels[WELCOME_Y_OFFSET + i * 2][WELCOME_X_OFFSET + tempOffset + k].color = color;
			k++;
		}
		var conString = "Con:";
		var color2 = background.selected ? COLOR_CONSTITUTION : COLOR_OUT_OF_SIGHT;
		for (var j = 0; j < conString.length; j++) {			
			screen.pixels[WELCOME_Y_OFFSET + i * 2][WELCOME_X_OFFSET + tempOffset + k].char = conString[j];
			screen.pixels[WELCOME_Y_OFFSET + i * 2][WELCOME_X_OFFSET + tempOffset + k].color = color2;
			k++;
		}
		var conValue = background.constitution + " ";
		for (var j = 0; j < conValue.length; j++) {			
			screen.pixels[WELCOME_Y_OFFSET + i * 2][WELCOME_X_OFFSET + tempOffset + k].char = conValue[j];
			screen.pixels[WELCOME_Y_OFFSET + i * 2][WELCOME_X_OFFSET + tempOffset + k].color = color;
			k++;
		}
		var perString = "Per:";
		var color2 = background.selected ? COLOR_PERCEPTION : COLOR_OUT_OF_SIGHT;
		for (var j = 0; j < perString.length; j++) {			
			screen.pixels[WELCOME_Y_OFFSET + i * 2][WELCOME_X_OFFSET + tempOffset + k].char = perString[j];
			screen.pixels[WELCOME_Y_OFFSET + i * 2][WELCOME_X_OFFSET + tempOffset + k].color = color2;
			k++;
		}
		var perValue = background.perception + " ";
		for (var j = 0; j < perValue.length; j++) {			
			screen.pixels[WELCOME_Y_OFFSET + i * 2][WELCOME_X_OFFSET + tempOffset + k].char = perValue[j];
			screen.pixels[WELCOME_Y_OFFSET + i * 2][WELCOME_X_OFFSET + tempOffset + k].color = color;
			k++;
		}
		var leaString = "Lead:";
		var color2 = background.selected ? COLOR_LEADERSHIP : COLOR_OUT_OF_SIGHT;
		for (var j = 0; j < leaString.length; j++) {			
			screen.pixels[WELCOME_Y_OFFSET + i * 2][WELCOME_X_OFFSET + tempOffset + k].char = leaString[j];
			screen.pixels[WELCOME_Y_OFFSET + i * 2][WELCOME_X_OFFSET + tempOffset + k].color = color2;
			k++;
		}
		var leaValue = background.leadership + " ";
		for (var j = 0; j < leaValue.length; j++) {			
			screen.pixels[WELCOME_Y_OFFSET + i * 2][WELCOME_X_OFFSET + tempOffset + k].char = leaValue[j];
			screen.pixels[WELCOME_Y_OFFSET + i * 2][WELCOME_X_OFFSET + tempOffset + k].color = color;
			k++;
		}
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

	draw(gameTicks);
}