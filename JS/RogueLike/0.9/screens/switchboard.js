function switchboardOnKeyDown(event) {
	event = event || window.event;

	var keyCode = event.keyCode;

	switch (keyCode) {
	    // Tab 09
	    case 9:
	    event.preventDefault();
	    break;
	    // enter
	    case 13:
	   	gameState = STATE_LANDING;
	   	player = null;
	   	dungeon = null;
	   	newerInput = true;
	   	draw(gameTicks);
	    break;
	    case KEY_NORTH: 
	    moveSwitchboard({x:0, y:-1});	    	  
	    break;
	    case KEY_NORTH_EAST:
	    moveSwitchboard({x:1, y:-1});	    	  
	    break;
	    case KEY_EAST: 
	    moveSwitchboard({x:1, y:0});	    	  
	    break;
	    case KEY_SOUTH_EAST:
	    moveSwitchboard({x:1, y:1});	    	  
	    break;
	    case KEY_SOUTH:
	    moveSwitchboard({x:0, y:1});
	    break;
	    case KEY_SOUTH_WEST:
	    moveSwitchboard({x:-1, y:1});	    	  
	    break;
	    case KEY_WEST: 
	    moveSwitchboard({x:-1, y:0});	    	  
	    break;
	    case KEY_NORTH_WEST: 
	    moveSwitchboard({x:-1, y:-1});	    	  
	    break;
	    case KEY_WAIT: 
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
	gameTicks++;
	var newPos = {x:switchBoardPos.x + offset.x, y:switchBoardPos.y + offset.y};
	if (newPos.x >= 0 &&
		newPos.y >= 0 &&
		newPos.y < switchboard.switches.length &&
		newPos.x < switchboard.switches[newPos.y].length)
		switchBoardPos.x = newPos.x, switchBoardPos.y = newPos.y;
	blinkSwitchboard(gameTicks);
}

function blinkSwitchboard (tick) {
	draw(tick);
	cursorVis = !cursorVis;
	if (gameTicks == tick)
		window.setTimeout(function(){blinkSwitchboard(tick);}, CURSOR_INTERVAL);
}

var NAME_MEDIUM = "Medium";
var NAME_HARD = "Hard";
var NAME_DAY_NIGHT = "Day/Night";
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
	this.switches[0,0] = new Switch(NAME_MEDIUM, "Turn up the heat a little.");
	this.switches[0,1] = new Switch(NAME_HARD, "Turn up the heat a little bit more.");
	this.switches[1,0] = new Switch(NAME_DAY_NIGHT, "Ah, turn the solar simulator back on.");
	// new classes
	// this.switches[4,0] = new Switch(NAME_DAY_NIGHT, "Ah, turn the solar simulator back on.");
}
