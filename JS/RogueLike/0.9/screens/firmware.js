function firmwareOnKeyDown(event) {
	event = event || window.event;

	var keyCode = event.keyCode;

	switch (keyCode) {
	    // Tab 09
	    case 9:
	    event.preventDefault();
	    break;
	    // enter
	    case 13:
	    select(event.shiftKey);
	    break;
		// g
		case 71:
		gameState = STATE_GAME;
	    effectsContainer.style.display = 'block';
		document.onkeydown = gameOnKeyDown;
		relight();
		draw(gameTicks);
		break;
	    case KEY_NORTH: 
	    moveFirmware({x:0, y:-1});
	    break;
	    case KEY_NORTH_EAST:
	    moveFirmware({x:1, y:-1});
	    break;
	    case KEY_EAST: 
	    moveFirmware({x:1, y:0});
	    break;
	    case KEY_SOUTH_EAST:
	    moveFirmware({x:1, y:1});
	    break;
	    case KEY_SOUTH:
	    moveFirmware({x:0, y:1});
	    break;
	    case KEY_SOUTH_WEST:
	    moveFirmware({x:-1, y:1});
	    break;
	    case KEY_WEST: 
	    moveFirmware({x:-1, y:0});
	    break;
	    case KEY_NORTH_WEST: 
	    moveFirmware({x:-1, y:-1});
	    break;
	    case KEY_WAIT: 
	    moveFirmware({x:0, y:0});
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

function drawFirmware () {
	var xStart = screen_center_x - Math.round(FIRMWARE_STRING.length / 2) + 1;
	for (var i = FIRMWARE_STRING.length - 1; i >= 0; i--) {		
		screen.pixels[FIRMWARE_STRING_Y][xStart + i].char = FIRMWARE_STRING[i];
		screen.pixels[FIRMWARE_STRING_Y][xStart + i].color = COLOR_DEFAULT;
	}
}