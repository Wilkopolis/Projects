function switchboardOnKeyDown(event) {
	event = event || window.event;

	var keyCode = event.keyCode;

	switch (keyCode) {
	    // Tab 09
	    case 9:
	    event.preventDefault();
	    break;
	    // space 32
	    case 32:
	    if (switchBoardPos.y > 0 && switchBoardPos.y < switchboard.length &&
	    	switchBoardPos.y > 0 && switchBoardPos.y < switchboard[0].length) {
	    	if (switchboard[switchBoardPos.y][switchBoardPos.x].purchased) {
	    		switchboard[switchBoardPos.y][switchBoardPos.x].on = !switchboard[switchBoardPos.y][switchBoardPos.x].on;
	    		switchboard[switchBoardPos.y][switchBoardPos.x].writeToCookies();
	    	} else {
	    		// prompt
				var option1 = {
					text:"Yes", 
					event:function() {
						switchboard[switchBoardPos.y][switchBoardPos.x].purchased = true;
						switchboard[switchBoardPos.y][switchBoardPos.x].on = true;						
	    				switchboard[switchBoardPos.y][switchBoardPos.x].writeToCookies();
						windows[SCREEN_PROMPT].hide();
						windows[SCREEN_GAME].redraw(gameTicks);
					},
				};
				var option2 = {
					text:"No", 
					event:function() {						
						windows[SCREEN_PROMPT].hide();
					},
				};
				prompt("Do you want to flip this switch?", option1, option2);
	    	}
			windows[SCREEN_GAME].redraw(gameTicks);
	    }
	    break;
	    // enter
	    case 13:
	   	// gameState = STATE_LANDING;
	   	// player = null;
	   	// dungeon = null;
	   	// newerInput = true;
	   	// windows[SCREEN_GAME].redraw(gameTicks);
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
		default:break;
	}
}

function drawSwitchboard () {
	var switchboardString = "Switchboard";
	var xStart = Math.max(Math.round(DISPLAY_WIDTH * .5) - 
		Math.round(switchboardString.length / 2) + 1, 20);
	var yStart = Math.max(Math.round(DISPLAY_HEIGHT * .5) - 16, 1);
	var titleYPos = yStart;
	for (var i = switchboardString.length - 1; i >= 0; i--) {		
		windows[SCREEN_GAME].screen.pixels[yStart][xStart + i].char = switchboardString[i];
		windows[SCREEN_GAME].screen.pixels[yStart][xStart + i].color = COLOR_DEFAULT;
	}
	xStart = Math.max(Math.round(DISPLAY_WIDTH * .5) - 24, 1);
	yStart += 4;
	for (var i = switchboard.height - 1; i >= 0; i--) {
		var yOffset = 0;
		if (i == switchboard.height - 1)
			yOffset = 3;
		for (var j = switchboard.switches[i].length - 1; j >= 0; j--) {
			// if we are blinking make it a blank space instead
			var selected = i == switchBoardPos.y && j == switchBoardPos.x;
			var purchased = switchboard.switches[i][j].purchased;
			var color = selected ? COLOR_DEFAULT : COLOR_OUT_OF_SIGHT;
			windows[SCREEN_GAME].screen.pixels[yStart + (i * 6) + yOffset][xStart + (j * 8)].char = '|';
			windows[SCREEN_GAME].screen.pixels[yStart + (i * 6) + yOffset][xStart + (j * 8)].color = purchased ? COLOR_OUT_OF_SIGHT : color;
			windows[SCREEN_GAME].screen.pixels[yStart + (i * 6) + yOffset][xStart + (j * 8)].font = '28pt Lucida Console';
			if (switchboard.switches[i][j].on) {				
				windows[SCREEN_GAME].screen.pixels[yStart + (i * 6) + yOffset][xStart - 1 + (j * 8)].char = ' ';
				// the right side
				windows[SCREEN_GAME].screen.pixels[yStart + (i * 6) + yOffset][xStart + 1 + (j * 8)].char = '■';
				windows[SCREEN_GAME].screen.pixels[yStart + (i * 6) + yOffset][xStart + 1 + (j * 8)].color = selected ? COLOR_DEFAULT : COLOR_GENERATOR_STARTED;
				windows[SCREEN_GAME].screen.pixels[yStart + (i * 6) + yOffset][xStart + 1 + (j * 8)].font = '28pt Lucida Console';
			} else {
				windows[SCREEN_GAME].screen.pixels[yStart + (i * 6) + yOffset][xStart - 1 + (j * 8)].char = '■';
				windows[SCREEN_GAME].screen.pixels[yStart + (i * 6) + yOffset][xStart - 1 + (j * 8)].color = purchased ? COLOR_GENERATOR_FAILED : color;
				windows[SCREEN_GAME].screen.pixels[yStart + (i * 6) + yOffset][xStart - 1 + (j * 8)].font = '28pt Lucida Console';
				// the right side
				windows[SCREEN_GAME].screen.pixels[yStart + (i * 6) + yOffset][xStart + 1 + (j * 8)].char = ' ';
			}
		}
	}
	var jobsString = 'Jobs';
	xStart = Math.max(Math.round(DISPLAY_WIDTH * .5) - 
		Math.round(jobsString.length / 2) + 1, 24);
	var yStart = titleYPos + 26;
	for (var i = jobsString.length - 1; i >= 0; i--) {		
		windows[SCREEN_GAME].screen.pixels[yStart][xStart + i].char = jobsString[i];
		windows[SCREEN_GAME].screen.pixels[yStart][xStart + i].color = COLOR_DEFAULT;
	}

	// draw the description
    if (switchBoardPos.y >= 0 && switchBoardPos.y < switchboard.switches.length &&
    	switchBoardPos.x >= 0 && switchBoardPos.x < switchboard.switches[0].length) {
		var breaker = switchboard.switches[switchBoardPos.y][switchBoardPos.x];
		var descriptionString = breaker.name  + ' ' + breaker.description;
		// draw the option description
		var yOffset = 0;
		var xPos = 0;	
		var MAX_LINE_LENGTH = DISPLAY_WIDTH - 10;
		var xStart = 5
		var yStart = titleYPos + 36;
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
}

function moveSwitchboard(offset) {
	newerInput = true;
	gameTicks++;
	var newPos = {x:switchBoardPos.x + offset.x, y:switchBoardPos.y + offset.y};
	if (newPos.x >= 0 &&
		newPos.y >= 0 &&
		newPos.y < switchboard.switches.length &&
		newPos.x < switchboard.switches[newPos.y].length)
		switchBoardPos.x = newPos.x, switchBoardPos.y = newPos.y;
}

var NAME_HARD = "Hard";
var NAME_DAY_NIGHT = "Day/Night Room";
var NAME_BOOK_WORM = "Book Worm";
var CLASS_COP = "Police Officer";
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
	this.switches[0][0] = new Switch(NAME_HARD, "Here's a REAL challenge.");
	this.switches[0][1] = new Switch(NAME_DAY_NIGHT, "Reactivate the solar simulator. Inhabitants grow restless at night.");
	this.switches[0][2] = new Switch(NAME_BOOK_WORM, "You seek out reading materials from fallen foes.");
	this.switches[0][3] = new Switch('', "");
	this.switches[0][4] = new Switch('', "");
	this.switches[0][5] = new Switch('', "");
	this.switches[0][6] = new Switch('', "");
	this.switches[1][0] = new Switch('', "");
	this.switches[1][1] = new Switch('', "");
	this.switches[1][2] = new Switch('', "");
	this.switches[1][3] = new Switch('', "");
	this.switches[1][4] = new Switch('', "");
	this.switches[1][5] = new Switch('', "");
	this.switches[1][6] = new Switch('', "");
	this.switches[2][0] = new Switch('', "");
	this.switches[2][1] = new Switch('', "");
	this.switches[2][2] = new Switch('', "");
	this.switches[2][3] = new Switch('', "");
	this.switches[2][4] = new Switch('', "");
	this.switches[2][5] = new Switch('', "");
	this.switches[2][6] = new Switch('', "");
	this.switches[3][0] = new Switch('', "");
	this.switches[3][1] = new Switch('', "");
	this.switches[3][2] = new Switch('', "");
	this.switches[3][3] = new Switch('', "");
	this.switches[3][4] = new Switch('', "");
	this.switches[3][5] = new Switch('', "");
	this.switches[3][6] = new Switch('', "");
	this.switches[4][0] = new Switch('', "");
	this.switches[4][1] = new Switch('', "");
	this.switches[4][2] = new Switch('', "");
	this.switches[4][3] = new Switch('', "");
	this.switches[4][4] = new Switch('', "");
	this.switches[4][5] = new Switch('', "");
	this.switches[4][6] = new Switch('', "");

	// load their unlocked values from memory
    if (Cookies.enabled) {
		for (var i = this.height - 1; i >= 0; i--) {
			for (var j = this.switches[i].length - 1; j >= 0; j--) {
				this.switches[i][j].init();
			}
		}
	}

	this.getSwitch = function(name) {
		switch (name) {
			case NAME_HARD: return this.switches[0][0];
			case NAME_DAY_NIGHT: return this.switches[0][1];
			case NAME_BOOK_WORM: return this.switches[0][2];
		}
	}
}

function Switch(name, description) {
	this.name = name;
	this.description = description;
	this.on = false;
	this.purchased = false;

	this.writeToCookies = function() {
		if (Cookies.enabled) {
			Cookies.set("switch_on_" + this.name, this.on);
			Cookies.set("switch_purchased_" + this.name, this.on);
		}
	}

	this.init = function() {			
		this.on = Cookies.get("switch_on_" + this.name) != null;
		this.purchased = Cookies.get("switch_purchased_" + this.name) != null;
	}
}