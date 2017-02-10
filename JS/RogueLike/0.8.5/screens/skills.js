function skillsOnKeyDown(event) {
	event = event || window.event;

	var keyCode = event.keyCode;

	switch (keyCode) {
	    // enter
	    case 13:
	    if (skillsSelecting) {
	    	var skill = player.skills.defaultSkills[skillsCursorPos];
	    	if (skill.requirementsMet() && !skill.purchased) {	    		
	    		player.lastCombatTick = gameTicks;
		   		player.skillPoints -= skill.cost;
		   		skill.purchased = true;
		   		draw();
		   	}	    	
	    } else {	    	
	    	var attackStyleCount = 0;
	    	for (var i = player.attackStyles.length - 1; i >= 0; i--) {
	    		attackStyleCount += player.attackStyles[i].selected ? 1 : 0;
	    	}
	    	if (attackStyleCount == 1 && player.attackStyles[attackStyleCursorPos].selected)
	    		return;
	    	else
	    		player.attackStyles[attackStyleCursorPos].selected = !player.attackStyles[attackStyleCursorPos].selected;
	    }
	    break;
	    // space
	    case 32:
	    if (skillsSelecting) {
	    	var skill = player.skills.defaultSkills[skillsCursorPos];
	    	if (skill.requirementsMet() && !skill.purchased) {	    		
	    		player.lastCombatTick = gameTicks;
		   		player.skillPoints -= skill.cost;	
		   		skill.purchased = true;
		   		draw();
		   	}	    	
	    } else {	    	
	    	var attackStyleCount = 0;
	    	// we can have multiple attack styles selected
	    	for (var i = player.attackStyles.length - 1; i >= 0; i--) {
	    		attackStyleCount += player.attackStyles[i].selected ? 1 : 0;
	    	}
	    	// can't have less than 1
	    	if (attackStyleCount == 1 && player.attackStyles[attackStyleCursorPos].selected)
	    		return;
	    	else {	    		
	    		player.attackStyles[attackStyleCursorPos].selected = !player.attackStyles[attackStyleCursorPos].selected;
	    		draw();
	    	}
	    }
	    break;
		// k
		case 75:
		gameState = STATE_GAME;
		document.onkeydown = gameOnKeyDown;
		relight();
		draw();
		break;
	    // keypad 8 104
	    // w 		87
	    case 104: 
	    moveSkills({x:0, y:-1});	    	  
	    break;
	    // up arrow
	    case 38: 
	    moveSkills({x:0, y:-1});	    	  
	    break;
	    // keypad 9 105
	    // e 		69
	    case 105:
	    moveSkills({x:1, y:-1});	    	  
	    break;
	    // keypad 6 102
	    // d 		68
	    case 102: 
	    moveSkills({x:1, y:0});	    	  
	    break;
	    // keypad 3 99
	    // c 		67
	    case 99:
	    moveSkills({x:1, y:1});	    	  
	    break;
	    // keypad 2 98
	    // x		88
	    case 98:
	    moveSkills({x:0, y:1});
	    break;
	    // down arrow
	    case 40: 
	    moveSkills({x:0, y:1});	    	  
	    break;
	    // keypad 1 97
	    // z		90
	    case 97:
	    moveSkills({x:-1, y:1});	    	  
	    break;
	    // keypad 4 100
	    // a 		65
	    case 100: 
	    moveSkills({x:-1, y:0});	    	  
	    break;
	    // keypad 7 103
	    // q 		81
	    case 103: 
	    moveSkills({x:-1, y:-1});	    	  
	    break;
	    // keypad 5 101
	    // s 		83
	    case 101: 
	    moveSkills({x:0, y:0});
	    break;
	    // right arrow 39
	    case 39: 
	    moveSkills({x:1, y:0});	    	  
	    break;
	    // left arrow 37
	    case 37: 
	    moveSkills({x:-1, y:0});	    	  
	    break;
	    // down arrow 40
	    case 40: 
	    moveSkills({x:0, y:1});	    	  
	    break;
	    // up arrow 38
	    case 38: 
	    moveSkills({x:0, y:-1});	    	  
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

var SKILLS_STRING = 'Skills';
var SKILLS_STRING_Y = 3;
var skillsCursorPos = 0;
function drawSkills () {
	// draw skills title
	var xStart = screen_center_x - Math.round(SKILLS_STRING.length / 2) + 1;
	for (var i = SKILLS_STRING.length - 1; i >= 0; i--) {		
		screen.pixels[SKILLS_STRING_Y][xStart + i - 15].char = SKILLS_STRING[i];
		screen.pixels[SKILLS_STRING_Y][xStart + i - 15].color = COLOR_DEFAULT;
	}

	// draw skill points
	var skillPointsString = 'SP: ' + player.skillPoints;
	for (var i = skillPointsString.length - 1; i >= 0; i--) {		
		screen.pixels[SKILLS_STRING_Y][3 + i].char = skillPointsString[i];
		screen.pixels[SKILLS_STRING_Y][3 + i].color = COLOR_DEFAULT;
	}

	// draw Skill:Cost
	for (var i = player.skills.defaultSkills.length - 1; i >= 0; i--) {
		var skill = player.skills.defaultSkills[i];
		var skillString = skill.name + ':' + skill.cost;
		var color = skill.purchased ? COLOR_SELECT_CLASS_NAME : COLOR_CLASS_NAME;
		var tempOffset = 0;
		if (i == skillsCursorPos) {
			skillString = '[' + skillString + ']';
			tempOffset = 1;
		}
		if (skill.purchased)
			color = COLOR_DEFAULT;
		for (var j = skillString.length - 1; j >= 0; j--) {
			var tempColor = color;			
			if (skillString[j] == '[' || skillString[j] == ']')
				tempColor = COLOR_DEFAULT;
			screen.pixels[WELCOME_Y_OFFSET + i * 2][WELCOME_X_OFFSET + j - tempOffset + 1].char = skillString[j];
			screen.pixels[WELCOME_Y_OFFSET + i * 2][WELCOME_X_OFFSET + j - tempOffset + 1].color = tempColor;
		}
	}

	// draw the attack styles
	var attackStyleString = "Attack Styles";
	var xStart = screen_center_x - Math.round(attackStyleString.length / 2) + 1;
	for (var i = attackStyleString.length - 1; i >= 0; i--) {
			screen.pixels[3][xStart + i + 18].char = attackStyleString[i];
			screen.pixels[3][xStart + i + 18].color = COLOR_SELECT_CLASS_NAME;
	}
	for (var i = player.attackStyles.length - 1; i >= 0; i--) {
		var color = COLOR_CLASS_NAME;
		var attackStyleString = player.attackStyles[i].name + ' ' + player.attackStyles[i].lvl.toFixed(2);
		var tempOffset = 30;
		if (i == attackStyleCursorPos && !skillsSelecting) {
			attackStyleString = '[' + attackStyleString + ']';
			tempOffset = 29;
		} 
		if (player.attackStyles[i].selected) {			
			color = COLOR_SELECT_CLASS_NAME;
		}
		for (var j = attackStyleString.length - 1; j >= 0; j--) {
			screen.pixels[WELCOME_Y_OFFSET + i * 2][WELCOME_X_OFFSET + j + tempOffset + 3].char = attackStyleString[j];
			screen.pixels[WELCOME_Y_OFFSET + i * 2][WELCOME_X_OFFSET + j + tempOffset + 3].color = (attackStyleString[j] == '[' || attackStyleString[j] == ']') ? COLOR_DEFAULT : color;
		}
	}
}

var skillsSelecting = true;
function moveSkills(offset) {
	if (skillsSelecting && offset.x == 1)
		skillsSelecting = false;
	else if (!skillsSelecting && offset.x == -1)
		skillsSelecting = true;

	if (skillsSelecting)
		skillsCursorPos = Math.min(Math.max(offset.y + skillsCursorPos, 0), player.skills.defaultSkills.length + player.skills.classSkills.length - 1);
	else 
		attackStyleCursorPos = Math.min(Math.max(offset.y + attackStyleCursorPos, 0), player.attackStyles.length - 1);
	draw();
}