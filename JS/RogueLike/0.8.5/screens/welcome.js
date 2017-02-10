var welcomeCursorPos = 0;

function welcomeOnKeyDown(event) {
	event = event || window.event;

	var keyCode = event.keyCode;

	switch (keyCode) {
	    // enter 13
	    case 13:
		gameState = STATE_BACKGROUND;
		document.onkeydown = backgroundOnKeyDown;
		draw();
	    break;
	    // space 32
	    case 32:
		gameState = STATE_BACKGROUND;
		document.onkeydown = backgroundOnKeyDown;
		draw();
	    break;
	    // keypad 8 104
	    // w 		87
		case 104: 
	    moveWelcome({x:0, y:-1});	    	  
	    break;
	    // keypad 9 105
	    // e 		69
	    case 105:
	    moveWelcome({x:1, y:-1});	    	  
	    break;
	    // keypad 6 102
	    // d 		68
	    case 102: 
	    moveWelcome({x:1, y:0});	    	  
	    break;
	    // keypad 3 99
	    // c 		67
	    case 99:
	    moveWelcome({x:1, y:1});	    	  
	    break;
	    // keypad 2 98
	    // x		88
	    case 98:
	    moveWelcome({x:0, y:1});
	    break;
	    // keypad 1 97
	    // z		90
	    case 97:
	    moveWelcome({x:-1, y:1});	    	  
	    break;
	    // keypad 4 100
	    // a 		65
	    case 100: 
	    moveWelcome({x:-1, y:0});	    	  
	    break;
	    // keypad 7 103
	    // q 		81
	    case 103: 
	    moveWelcome({x:-1, y:-1});	    	  
	    break;
	    // keypad 5 101
	    // s 		83
	    case 101: 
	    moveWelcome({x:0, y:0});
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
	draw();
}
