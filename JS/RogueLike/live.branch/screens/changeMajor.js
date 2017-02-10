var STATE_CHANGE_MAJOR = 'changeMajor';
var changeMajorCursor = 0;
var confirming = false;
function changeMajorOnKeyDown(event) {
	event = event || window.event;

	var keyCode = event.keyCode;

	switch (keyCode) {
	    // Tab 09
	    case 9:
	    event.preventDefault();
	    break;
		// backspace 08
	    case 8:
	    if (confirming) {
	    	confirming = false;
	    	windows[SCREEN_GAME].redraw(gameTicks);
	    } else {
	    	grandTotal = 0;
	    	for (var i = CLASSES.length - 1; i >= 0; i--)
	    		CLASSES[i].selected = false;
	    	scopeNPC = null;
		    gameState = STATE_GAME;
		    document.onkeydown = gameOnKeyDown;
		    relight();
		    windows[SCREEN_GAME].redraw(gameTicks);
	    }
	    break;
	    // enter 13
	    case 13:
	    // confirm
	    if (confirming && selectingYes) {
	    	changeClass();
	    } else if (confirming && !selectingYes)
	    	confirming = false;
	    else
	    	confirming = true;
	    break;
	    // space bar 32
	    case 32:	    
	    // confirm
	    if (confirming && selectingYes) {
	    	changeClass();
	    } else if (confirming && !selectingYes)
	    	confirming = false;
	    else
	    	confirming = true;
	    break;	    
	    // escape 27
	    case 27:
	    if (confirming) {
	    	confirming = false;
	    	windows[SCREEN_GAME].redraw(gameTicks);
	    } else {
		    gameState = STATE_GAME;
		    document.onkeydown = gameOnKeyDown;
		    relight();
		    windows[SCREEN_GAME].redraw(gameTicks);	    	  	
	    }
	    break;
	    case KEY_NORTH: 
	    moveChangeMajor({x:0, y:-1});	    	  
	    break;
	    case KEY_NORTH_EAST:
	    moveChangeMajor({x:1, y:-1});	    	  
	    break;
	    case KEY_EAST: 
	    moveChangeMajor({x:1, y:0});	    	  
	    break;
	    case KEY_SOUTH_EAST:
	    moveChangeMajor({x:1, y:1});	    	  
	    break;
	    case KEY_SOUTH:
	    moveChangeMajor({x:0, y:1});
	    break;
	    case KEY_SOUTH_WEST:
	    moveChangeMajor({x:-1, y:1});	    	  
	    break;
	    case KEY_WEST: 
	    moveChangeMajor({x:-1, y:0});	    	  
	    break;
	    case KEY_NORTH_WEST: 
	    moveChangeMajor({x:-1, y:-1});	    	  
	    break;
	    case KEY_WAIT: 
	    moveChangeMajor({x:0, y:0});
	    break; 
	    // right arrow 39
	    case 39: 
	    moveChangeMajor({x:1, y:0});	    	  
	    break;
	    // left arrow 37
	    case 37: 
	    moveChangeMajor({x:-1, y:0});	    	  
	    break;
	    // up arrow 38
	    case 38:
	    moveChangeMajor({x:0, y:-1});
	    break;
	    // down arrow 40
	    case 40:
	    moveChangeMajor({x:0, y:1});
	    break;
		default:break;
	}
}

function changeClass() {
	// change player class
	player.class = CLASSES[changeMajorCursor].name;

	// update skills
	player.skills.skillObject[SKILL_CHANGE_MAJOR].purchased = false;
	
	// remove from the all skills
	for (var i = player.skills.classSkills.length - 1; i >= 0; i--) {
		player.skills.allSkills.remove(player.skills.classSkills[i]);
	}

	// class specific skills
	player.skills.classSkills = [];
	switch(player.class) {
		case CLASS_SOLDIER:
			player.skills.classSkills.push(player.skills.skillObject[SKILL_OFF_THE_GRID]);
			player.skills.classSkills.push(player.skills.skillObject[SKILL_SOLDIER_OF_FORTUNE]);
			player.skills.classSkills.push(player.skills.skillObject[SKILL_BODY_CONDITIONING]);
			player.skills.classSkills.push(player.skills.skillObject[SKILL_WEAPONS_TRAINING]);
			player.skills.classSkills.push(player.skills.skillObject[SKILL_DISARM]);
			player.skills.classSkills.push(player.skills.skillObject[SKILL_FIELD_DRESSING]);
		break;
		case CLASS_MAYOR:
			player.skills.classSkills.push(player.skills.skillObject[SKILL_PEOPLES_CHAMPION]);
			player.skills.classSkills.push(player.skills.skillObject[SKILL_ELECTORAL_COLLEGE]);
			player.skills.classSkills.push(player.skills.skillObject[SKILL_VICTORY_SPEECH]);
			player.skills.classSkills.push(player.skills.skillObject[SKILL_CABINET_I]);
			player.skills.classSkills.push(player.skills.skillObject[SKILL_CABINET_II]);
			player.skills.classSkills.push(player.skills.skillObject[SKILL_CABINET_III]);
			player.skills.classSkills.push(player.skills.skillObject[SKILL_WE_THE_PEOPLE]);
		break;
		case CLASS_PHARMACIST:
			player.skills.classSkills.push(player.skills.skillObject[SKILL_DEREGULATION]);
			player.skills.classSkills.push(player.skills.skillObject[SKILL_THE_GOOD_STUFF]);
			player.skills.classSkills.push(player.skills.skillObject[SKILL_STREET_PHARMACIST]);
			player.skills.classSkills.push(player.skills.skillObject[SKILL_QUALITY_CONTROL]);	
		break;
		case CLASS_INVESTOR:
			player.skills.classSkills.push(player.skills.skillObject[SKILL_ROTH_IRA]);
			player.skills.classSkills.push(player.skills.skillObject[SKILL_DIVIDENDS]);
			player.skills.classSkills.push(player.skills.skillObject[SKILL_HEALTH_INSURANCE]);
			player.skills.classSkills.push(player.skills.skillObject[SKILL_LIFE_INSURANCE]);
			player.skills.classSkills.push(player.skills.skillObject[SKILL_MONEY_SHOT]);
			player.skills.classSkills.push(player.skills.skillObject[SKILL_GREASING_THE_WHEELS]);
		break;
	}

	// all buyable skills
	player.skills.allSkills = player.skills.defaultSkills.concat(player.skills.classSkills);

	// change back to game
    gameState = STATE_GAME;
    document.onkeydown = gameOnKeyDown;
    relight();
    windows[SCREEN_GAME].redraw(gameTicks);	
}

function drawChangeMajors() {
	// draw the section title
	var classString = "Classes";	
	var xStart = screen_center_x - Math.round(classString.length / 2) + 1;
	for (var i = classString.length - 1; i >= 0; i--) {
			screen.pixels[3][xStart + i - 20].char = classString[i];
			screen.pixels[3][xStart + i - 20].color = COLOR_DEFAULT;
	}		
	var descriptionString = "";
	// draw our options
	for (var i = CLASSES.length - 1; i >= 0; i--) {
		var color = COLOR_CLASS_NAME;

		var classString = CLASSES[i].name;

		var tempOffset = 7;
		// if we are choosing to take it, color it differently
		if (i == changeMajorCursor)
			color = COLOR_DEFAULT;	
		// if our cursor is over it, draw its description and
		// put [brackets] around it
		if (i == changeMajorCursor && !confirming) {	
			classString = '[' + classString + ']';
			tempOffset = 8;
			descriptionString = CLASSES[i].description;
		}
		for (var j = classString.length - 1; j >= 0; j--) {		
			screen.pixels[WELCOME_Y_OFFSET + i * 2][WELCOME_X_OFFSET + j - tempOffset].char = classString[j];
			screen.pixels[WELCOME_Y_OFFSET + i * 2][WELCOME_X_OFFSET + j - tempOffset].color = color;
		}
	}

	if (confirming) {
		var newClass = '';
		for (var i = CLASSES.length - 1; i >= 0; i--) {
			if (i == changeMajorCursor)
				newClass = CLASSES[i].name;
		}

		// if confirming, draw the yes/no prompt
		var promptString = "Do you want to be a ";
		promptString += newClass;
		promptString += "? ";
		promptString += selectingYes ? "[Y]| N " : " Y |[N]";

		xStart = screen_center_x - Math.round(promptString.length / 2) + 1;
		for (var i = promptString.length - 1; i >= 0; i--) {
				screen.pixels[30][5 + i].char = promptString[i];
				screen.pixels[30][5 + i].color = COLOR_DEFAULT;
		}
	}

	// draw the option description
	var yOffset = 0;
	var xPos = 0;	
	var MAX_LINE_LENGTH = 55;
	var descriptionString = CLASSES[changeMajorCursor].description;
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

function moveChangeMajor(offset) {
	if (confirming) {
		if (selectingYes && offset.x > 0)
			selectingYes = false;
		else if (offset.x < 0)
			selectingYes = true;
	} else
		changeMajorCursor = Math.min(Math.max(offset.y + changeMajorCursor, 0), CLASSES.length - 1);
	windows[SCREEN_GAME].redraw(gameTicks);
}