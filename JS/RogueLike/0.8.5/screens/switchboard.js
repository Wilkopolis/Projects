function switchboardOnKeyDown(event) {
	event = event || window.event;

	var keyCode = event.keyCode;

	switch (keyCode) {
	    // enter
	    case 13:
	   	gameState = STATE_LANDING;
	   	player = null;
	   	dungeon = null;
	   	newerInput = true;
	   	draw();
	    break;
	    // keypad 8 104
	    // w 		87
	    case 104: 
	    moveSwitchboard({x:0, y:-1});	    	  
	    break;
	    // keypad 9 105
	    // e 		69
	    case 105:
	    moveSwitchboard({x:1, y:-1});	    	  
	    break;
	    // keypad 6 102
	    // d 		68
	    case 102: 
	    moveSwitchboard({x:1, y:0});	    	  
	    break;
	    // keypad 3 99
	    // c 		67
	    case 99:
	    moveSwitchboard({x:1, y:1});	    	  
	    break;
	    // keypad 2 98
	    // x		88
	    case 98:
	    moveSwitchboard({x:0, y:1});
	    break;
	    // keypad 1 97
	    // z		90
	    case 97:
	    moveSwitchboard({x:-1, y:1});	    	  
	    break;
	    // keypad 4 100
	    // a 		65
	    case 100: 
	    moveSwitchboard({x:-1, y:0});	    	  
	    break;
	    // keypad 7 103
	    // q 		81
	    case 103: 
	    moveSwitchboard({x:-1, y:-1});	    	  
	    break;
	    // keypad 5 101
	    // s 		83
	    case 101: 
	    moveSwitchboard({x:0, y:0});
	    break;
	    // ?
	    case 191:
	    if (!event.shiftKey)
	    	return;
	    if (!helped) {
	    	helped = true;
	    	if (gameState == STATE_GAME)
				relight();
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

function drawSwitchboard () {
	var xStart = screen_center_x - Math.round(SWITCHBOARD_STRING.length / 2) + 1;
	for (var i = SWITCHBOARD_STRING.length - 1; i >= 0; i--) {		
		screen.pixels[SWITCHBOARD_STRING_Y][xStart + i].char = SWITCHBOARD_STRING[i];
		screen.pixels[SWITCHBOARD_STRING_Y][xStart + i].color = COLOR_DEFAULT;
	}
	for (var i = switchboard.height - 1; i >= 0; i--) {
		var yOffset = 0;
		if (i == switchboard.height - 1)
			yOffset = 8;
		for (var j = switchboard.switches[i].length - 1; j >= 0; j--) {
			// if we are blinking make it a blank space instead
			if (i == switchBoardPos.y && j == switchBoardPos.x && !cursorVis)
				screen.pixels[11 + (i * 6) + yOffset][12 + (j * 8)].char = ' ';
			else
				screen.pixels[11 + (i * 6) + yOffset][12 + (j * 8)].char = '|';
			screen.pixels[11 + (i * 6) + yOffset][12 + (j * 8)].color = COLOR_DEFAULT;
			screen.pixels[11 + (i * 6) + yOffset][12 + (j * 8)].font = '28pt Lucida Console';
			if (switchboard.switches[i][j]) {				
				screen.pixels[11 + (i * 6) + yOffset][11 + (j * 8)].char = '■';
				screen.pixels[11 + (i * 6) + yOffset][11 + (j * 8)].color = COLOR_POWERED;
				screen.pixels[11 + (i * 6) + yOffset][11 + (j * 8)].font = '28pt Lucida Console';
				// the right side
				screen.pixels[11 + (i * 6) + yOffset][13 + (j * 8)].char = ' ';				
			} else {
				screen.pixels[11 + (i * 6) + yOffset][11 + (j * 8)].char = ' ';
				// the right side
				screen.pixels[11 + (i * 6) + yOffset][13 + (j * 8)].char = '■';
				screen.pixels[11 + (i * 6) + yOffset][13 + (j * 8)].color = COLOR_DEFAULT;
				screen.pixels[11 + (i * 6) + yOffset][13 + (j * 8)].font = '28pt Lucida Console';
			}
		}
	}
	var OCUPATIONAL_STRING = 'Occupational Breaker';
	xStart = screen_center_x - Math.round(OCUPATIONAL_STRING.length / 2) + 1;
	for (var i = OCUPATIONAL_STRING.length - 1; i >= 0; i--) {		
		screen.pixels[36][xStart + i].char = OCUPATIONAL_STRING[i];
		screen.pixels[36][xStart + i].color = COLOR_DEFAULT;
	}
}

function moveSwitchboard(offset) {
	newerInput = true;
	cursorVis = false;
	var newPos = {x:switchBoardPos.x + offset.x, y:switchBoardPos.y + offset.y};
	if (newPos.x >= 0 &&
		newPos.y >= 0 &&
		newPos.y < switchboard.switches.length &&
		newPos.x < switchboard.switches[newPos.y].length)
		switchBoardPos.x = newPos.x, switchBoardPos.y = newPos.y;
	draw();
	blinkSwitchboard();
}

function SwitchBoard (width, height) {
	this.width = width;
	this.height = height;
	this.switches = new Array(this.height);
	for (var i = this.height - 1; i >= 0; i--) {
		this.switches[i] = new Array(this.width);
		for (var j = this.switches[i].length - 1; j >= 0; j--) {
			this.switches[i][j] = false;
		}
	}
}
