function firmwareOnKeyDown(event) {
	event = event || window.event;

	var keyCode = event.keyCode;

	switch (keyCode) {
	    // enter
	    case 13:
	    select(event.shiftKey);
	    break;
		// g
		case 71:
		gameState = STATE_GAME;
		document.onkeydown = gameOnKeyDown;
		relight();
		draw();
		break;
	    // keypad 8 104
	    // w 		87
	    case 104: 
	    moveFirmware({x:0, y:-1});	    	  
	    break;
	    // keypad 9 105
	    // e 		69
	    case 105:
	    moveFirmware({x:1, y:-1});	    	  
	    break;
	    // keypad 6 102
	    // d 		68
	    case 102: 
	    moveFirmware({x:1, y:0});	    	  
	    break;
	    // keypad 3 99
	    // c 		67
	    case 99:
	    moveFirmware({x:1, y:1});	    	  
	    break;
	    // keypad 2 98
	    // x		88
	    case 98:
	    moveFirmware({x:0, y:1});
	    break;
	    // keypad 1 97
	    // z		90
	    case 97:
	    moveFirmware({x:-1, y:1});	    	  
	    break;
	    // keypad 4 100
	    // a 		65
	    case 100: 
	    moveFirmware({x:-1, y:0});	    	  
	    break;
	    // keypad 7 103
	    // q 		81
	    case 103: 
	    moveFirmware({x:-1, y:-1});	    	  
	    break;
	    // keypad 5 101
	    // s 		83
	    case 101: 
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