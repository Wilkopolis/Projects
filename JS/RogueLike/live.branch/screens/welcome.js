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
	    if (welcomeCursorPos == 2)
	    	hardMode = true;

		gameState = STATE_BACKGROUND;
		var pickBackground = true;
		for (var i = BACKGROUNDS.length - 1; i >= 0; i--) {
			if (BACKGROUNDS[i].selected) {
				pickBackground = false;
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
		if (pickBackground) {
			BACKGROUNDS.peekRandom().selected = true;
			CLASSES.peekRandom().selected = true;
		}
		document.onkeydown = backgroundOnKeyDown;
		windows[SCREEN_GAME].redraw(gameTicks);
	    break;
	    // space 32
	    case 32:
	    if (welcomeCursorPos == 2)
	    	hardMode = true;
	    
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
		windows[SCREEN_GAME].redraw(gameTicks);
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
	    // escape 27
	    case 27:
			if (!windows[SCREEN_HELP].visible)
				windows[SCREEN_HELP].show();
			else
				windows[SCREEN_HELP].hide();
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

function drawWelcome() {
	var xStart = screen_center_x - Math.round(OPTION_NEW_GAME.length / 2) - 1;
	for (var i = WELCOME_OPTIONS.length - 1; i >= 0; i--) {
		var color = i != welcomeCursorPos ? COLOR_CLASS_NAME : COLOR_DEFAULT;
		var welcomeString = WELCOME_OPTIONS[i];
		var tempOffset = 0;
		if (i == welcomeCursorPos) {
			welcomeString = '[' + WELCOME_OPTIONS[i] + ']';
			tempOffset = 1;
		}
		var yStart = Math.round(DISPLAY_HEIGHT * .4);
		for (var j = welcomeString.length - 1; j >= 0; j--) {
			windows[SCREEN_GAME].screen.pixels[yStart + i * 2][xStart + j - tempOffset].char = welcomeString[j];
			windows[SCREEN_GAME].screen.pixels[yStart + i * 2][xStart + j - tempOffset].color = color;
		}
	}
}

function moveWelcome(offset) {
	var cont = false;
	var hardUnlocked = switchboard.getSwitch(NAME_HARD).on;
	yMin = cont ? 0 : 1;
	yMax = hardUnlocked ? 2 : 1;
	welcomeCursorPos = Math.min(Math.max(offset.y + welcomeCursorPos, yMin), yMax);
	windows[SCREEN_GAME].redraw(gameTicks);
}
