function backgroundOnKeyDown(event) {
	event = event || window.event;

	var keyCode = event.keyCode;

	switch (keyCode) {
	    // enter
	    case 13:
		gameState = STATE_LOADOUT;
		document.onkeydown = loadoutOnKeyDown;
		draw();
	    break;
	    // keypad 8 104
	    // w 		87
		case 104: 
	    moveBackground({x:0, y:-1});	    	  
	    break;
	    // keypad 9 105
	    // e 		69
	    case 105:
	    moveBackground({x:1, y:-1});	    	  
	    break;
	    // keypad 6 102
	    // d 		68
	    case 102: 
	    moveBackground({x:1, y:0});	    	  
	    break;
	    // keypad 3 99
	    // c 		67
	    case 99:
	    moveBackground({x:1, y:1});	    	  
	    break;
	    // keypad 2 98
	    // x		88
	    case 98:
	    moveBackground({x:0, y:1});
	    break;
	    // keypad 1 97
	    // z		90
	    case 97:
	    moveBackground({x:-1, y:1});	    	  
	    break;
	    // keypad 4 100
	    // a 		65
	    case 100: 
	    moveBackground({x:-1, y:0});	    	  
	    break;
	    // keypad 7 103
	    // q 		81
	    case 103: 
	    moveBackground({x:-1, y:-1});	    	  
	    break;
	    // keypad 5 101
	    // s 		83
	    case 101: 
	    moveBackground({x:0, y:0});
	    break;
	    // ?
	    case 191:
	    if (!event.shiftKey)
	    	return;
	    if (!helped) {
	    	helped = true;
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

function drawBackground () {
	var classString = "Class";
	var xStart = screen_center_x - Math.round(classString.length / 2) + 1;
	for (var i = classString.length - 1; i >= 0; i--) {
			screen.pixels[3][xStart + i - 20].char = classString[i];
			screen.pixels[3][xStart + i - 20].color = COLOR_DEFAULT;
	}
	for (var i = CLASSES.length - 1; i >= 0; i--) {
		var color = COLOR_CLASS_NAME;
		var classString = CLASSES[i];
		var tempOffset = 10;
		if (i == classCursorPos) {
			color = COLOR_SELECT_CLASS_NAME;
			classString = '[' + CLASSES[i] + ']';
			tempOffset = 11;
		}
		for (var j = classString.length - 1; j >= 0; j--) {
			color = !classSelecting ? COLOR_CLASS_NAME : color;
			if (classString[j] == '[' || classString[j] == ']')
				color = COLOR_DEFAULT;
			screen.pixels[WELCOME_Y_OFFSET + i * 2][WELCOME_X_OFFSET + j - tempOffset].char = classString[j];
			screen.pixels[WELCOME_Y_OFFSET + i * 2][WELCOME_X_OFFSET + j - tempOffset].color = color;
		}
	}
	var welcomeString = "Background";
	var xStart = screen_center_x - Math.round(welcomeString.length / 2) + 1;
	for (var i = welcomeString.length - 1; i >= 0; i--) {
			screen.pixels[3][xStart + i + 14].char = welcomeString[i];
			screen.pixels[3][xStart + i + 14].color = COLOR_DEFAULT;
	}
	for (var i = BACKGROUNDS.length - 1; i >= 0; i--) {
		var color = COLOR_CLASS_NAME;
		var backgroundString = BACKGROUNDS[i];
		var tempOffset = 24;
		if (i == backgroundCursorPos) {
			color = COLOR_SELECT_CLASS_NAME;
			backgroundString = '[' + BACKGROUNDS[i] + ']';
			tempOffset = 23;
		}
		for (var j = backgroundString.length - 1; j >= 0; j--) {
			color = classSelecting ? COLOR_CLASS_NAME : color;
			if (backgroundString[j] == '[' || backgroundString[j] == ']')
				color = COLOR_DEFAULT;
			screen.pixels[WELCOME_Y_OFFSET + i * 2][WELCOME_X_OFFSET + j + tempOffset].char = backgroundString[j];
			screen.pixels[WELCOME_Y_OFFSET + i * 2][WELCOME_X_OFFSET + j + tempOffset].color = color;
		}
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

	draw();
}