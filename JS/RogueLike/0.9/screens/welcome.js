var welcomeCursorPos = 0;

function welcomeOnKeyDown(event) {
	event = event || window.event;

	var keyCode = event.keyCode;

	switch (keyCode) {
	    // Tab 09
	    case 9:
	    event.preventDefault();
	    break;
	    // enter 13
	    case 13:
		gameState = STATE_BACKGROUND;
		BACKGROUNDS.peekRandom().selected = true;
		CLASSES.peekRandom().selected = true;
		for (var i = BACKGROUNDS.length - 1; i >= 0; i--) {
			if (BACKGROUNDS[i].selected) {
				backgroundCursorPos	= i;
				break;
			}
		}
		for (var i = CLASSES.length - 1; i >= 0; i--) {
			if (CLASSES[i].selected) {
				classCursorPos = i;
				break;
			}
		}
		document.onkeydown = backgroundOnKeyDown;
		draw(gameTicks);
	    break;
	    // space 32
	    case 32:
		gameState = STATE_BACKGROUND;
		BACKGROUNDS.peekRandom().selected = true;
		CLASSES.peekRandom().selected = true;
		for (var i = BACKGROUNDS.length - 1; i >= 0; i--) {
			if (BACKGROUNDS[i]) {
				backgroundCursorPos	= i;
				break;
			}
		}
		for (var i = CLASSES.length - 1; i >= 0; i--) {
			if (CLASSES[i]) {
				classCursorPos = i;
				break;
			}
		}
		document.onkeydown = backgroundOnKeyDown;
		draw(gameTicks);
	    break;
	    case KEY_NORTH: 
	    moveWelcome({x:0, y:-1});
	    break;
	    case KEY_NORTH_EAST:
	    moveWelcome({x:1, y:-1});
	    break;
	    case KEY_EAST: 
	    moveWelcome({x:1, y:0});
	    break;
	    case KEY_SOUTH_EAST:
	    moveWelcome({x:1, y:1});
	    break;
	    case KEY_SOUTH:
	    moveWelcome({x:0, y:1});
	    break;
	    case KEY_SOUTH_WEST:
	    moveWelcome({x:-1, y:1});
	    break;
	    case KEY_WEST: 
	    moveWelcome({x:-1, y:0});
	    break;
	    case KEY_NORTH_WEST: 
	    moveWelcome({x:-1, y:-1});
	    break;
	    case KEY_WAIT: 
	    moveWelcome({x:0, y:0});
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

function drawWelcome() {
	for (var i = WELCOME_OPTIONS.length - 1; i >= 0; i--) {
		var color = ! i == welcomeCursorPos ? COLOR_CLASS_NAME : COLOR_DEFAULT;
		var welcomeString = WELCOME_OPTIONS[i];
		var tempOffset = 0;
		if (i == welcomeCursorPos) {
			welcomeString = '[' + WELCOME_OPTIONS[i] + ']';
			tempOffset = 1;
		}
		for (var j = welcomeString.length - 1; j >= 0; j--) {
			screen.pixels[15 + i * 2][WELCOME_X_OFFSET + j - tempOffset].char = welcomeString[j];
			screen.pixels[15 + i * 2][WELCOME_X_OFFSET + j - tempOffset].color = color;
		}
	}
}

function moveWelcome(offset) {
	if (offset.x == 0)
		welcomeCursorPos = Math.min(Math.max(offset.y + welcomeCursorPos, 1), WELCOME_OPTIONS.length - 1);
	draw(gameTicks);
}
