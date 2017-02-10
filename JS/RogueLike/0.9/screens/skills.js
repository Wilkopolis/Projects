function skillsOnKeyDown(event) {
	event = event || window.event;

	var keyCode = event.keyCode;

	switch (keyCode) {
	    // Tab 09
	    case 9:
	    event.preventDefault();
	    break;
	    // enter
	    case 13:
	    selectSkill();
	    break;
	    // space
	    case 32:
	    selectSkill();
	    break;
		// k
		case 75:
		gameState = STATE_GAME;
	    effectsContainer.style.display = 'block';
		document.onkeydown = gameOnKeyDown;
		relight();
		draw(gameTicks);
		break;
		// escape 27
		case 27:
		gameState = STATE_GAME;
	    effectsContainer.style.display = 'block';
		document.onkeydown = gameOnKeyDown;
		relight();
		draw(gameTicks);
		break;
		// backspace 8
		case 8:
		gameState = STATE_GAME;
	    effectsContainer.style.display = 'block';
		document.onkeydown = gameOnKeyDown;
		relight();
		draw(gameTicks);
		break;
		case KEY_NORTH: 
	    moveSkills({x:0, y:-1});	    	  
	    break;
	    case KEY_NORTH_EAST:
	    moveSkills({x:1, y:-1});	    	  
	    break;
	    case KEY_EAST: 
	    moveSkills({x:1, y:0});	    	  
	    break;
	    case KEY_SOUTH_EAST:
	    moveSkills({x:1, y:1});	    	  
	    break;
	    case KEY_SOUTH:
	    moveSkills({x:0, y:1});
	    break;
	    case KEY_SOUTH_WEST:
	    moveSkills({x:-1, y:1});	    	  
	    break;
	    case KEY_WEST: 
	    moveSkills({x:-1, y:0});	    	  
	    break;
	    case KEY_NORTH_WEST: 
	    moveSkills({x:-1, y:-1});	    	  
	    break;
	    case KEY_WAIT: 
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

function selectSkill() {

	if (skillSelecting) {
		var skill = player.skills.allSkills[skillsCursorPos];
		if (skill.requirementsMet() && !skill.purchased) {
	   		player.skillPoints -= skill.cost;
	   		skill.purchased = true;
	   		switch(skill.name) {
	   			case SKILL_BODY_CONDITIONING: player.baseDef++; break;
	   		}
	   		draw(gameTicks);
	   	}	    	
	} else if (attackStyleSelecting) {	    	
		var attackStyleCount = 0;
		for (var i = player.attackStyles.length - 1; i >= 0; i--) {
			attackStyleCount += player.attackStyles[i].selected ? 1 : 0;
		}

		if (attackStyleCount == 1 && player.attackStyles[attackStyleCursorPos].selected)
			return;
		else {
			player.attackStyles[attackStyleCursorPos].selected = !player.attackStyles[attackStyleCursorPos].selected;
	   		draw(gameTicks);
		}
	} else if (constructSelecting) {	    	
		var construct = player.skills.constructs[constructCursorPos];
		if (construct.requirementsMet() && !construct.purchased) {
	   		player.skillPoints -= construct.cost;
	   		construct.purchased = true;
	   		draw(gameTicks);
	   	}	
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

	// draw Skill:Cost
	for (var i = player.skills.allSkills.length - 1; i >= 0; i--) {
		var skill = player.skills.allSkills[i];
		var skillString = skill.name + ':' + skill.cost;
		var unselectedColor = skill.cost <= player.skillPoints ? COLOR_SELECT_CLASS_NAME : COLOR_CLASS_NAME;
		var color = skill.purchased ? COLOR_DEFAULT : unselectedColor;
		var tempOffset = 0;
		if (i == skillsCursorPos && skillSelecting) {
			skillString = '[' + skillString + ']';
			tempOffset = 1;
		}
		for (var j = skillString.length - 1; j >= 0; j--) {
			var tempColor = color;			
			if (skillString[j] == '[' || skillString[j] == ']') {
				tempColor = COLOR_DEFAULT;
			}
			screen.pixels[WELCOME_Y_OFFSET + i * 2][5 + j - tempOffset].char = skillString[j];
			screen.pixels[WELCOME_Y_OFFSET + i * 2][5 + j - tempOffset].color = tempColor;
		}
	}

	// draw skill points
	var skillPointsString = 'SP: ' + player.skillPoints;
	for (var i = skillPointsString.length - 1; i >= 0; i--) {		
		screen.pixels[SKILLS_STRING_Y][3 + i].char = skillPointsString[i];
		screen.pixels[SKILLS_STRING_Y][3 + i].color = COLOR_DEFAULT;
	}

	// draw the attack styles
	var attackStyleString = "Attack Styles";
	var xStart = screen_center_x - Math.round(attackStyleString.length / 2) + 1;
	for (var i = attackStyleString.length - 1; i >= 0; i--) {
			screen.pixels[3][xStart + i + 20].char = attackStyleString[i];
			screen.pixels[3][xStart + i + 20].color = COLOR_SELECT_CLASS_NAME;
	}
	for (var i = player.attackStyles.length - 1; i >= 0; i--) {
		var color = COLOR_CLASS_NAME;
		var attackStyleString = player.attackStyles[i].name + '  ' + player.attackStyles[i].lvl.toFixed(2);
		var tempOffset = 30;
		if (i == attackStyleCursorPos && attackStyleSelecting) {
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

	// draw constructs title
	var constructString = 'Constructs'
	var xStart = screen_center_x - Math.round(constructString.length / 2) + 1;
	for (var i = constructString.length - 1; i >= 0; i--) {		
		screen.pixels[18][xStart + i + 19].char = constructString[i];
		screen.pixels[18][xStart + i + 19].color = COLOR_DEFAULT;
	}

	// draw constructs:SkillPointCost:WealthCost	
	for (var i = player.skills.constructs.length - 1; i >= 0; i--) {
		var construct = player.skills.constructs[i];
		var constructString = construct.price + "$ - " + construct.name + ':' + construct.cost;		
		var unselectedColor = construct.cost <= player.skillPoints ? COLOR_SELECT_CLASS_NAME : COLOR_CLASS_NAME;
		var color = construct.purchased ? COLOR_DEFAULT : unselectedColor;
		var tempOffset = 0;
		if (i == constructCursorPos && constructSelecting) {
			constructString = '[' + constructString + ']';
			tempOffset = 1;
		}
		if (construct.purchased)
			color = COLOR_DEFAULT;
		for (var j = constructString.length - 1; j >= 0; j--) {
			var tempColor = color;			
			if (constructString[j] == '[' || constructString[j] == ']') {
				tempColor = COLOR_DEFAULT;
			}
			screen.pixels[22 + i * 2][50 + j - tempOffset].char = constructString[j];
			screen.pixels[22 + i * 2][50 + j - tempOffset].color = tempColor;
		}
	}
}

var skillSelecting = true;
var attackStyleSelecting = false;
var constructSelecting = false;
var constructCursorPos = 0;
function moveSkills(offset) {

	if (skillSelecting) {

		// jumping the aisle
		if (offset.x == 1) {
			if (skillsCursorPos < 5) {
				// set our state
				skillSelecting = false;
				attackStyleSelecting = true;

				// set our cursor position
				attackStyleCursorPos = Math.min(Math.max(offset.y + skillsCursorPos, 0), player.attackStyles.length - 1);
			} else {				
				// set our state
				skillSelecting = false;
				constructSelecting = true;

				// set our cursor position
				constructCursorPos = Math.min(Math.max(offset.y + skillsCursorPos - 10, 0), player.skills.constructs.length - 1);
			}
		}

	} else if (attackStyleSelecting) {		

		// jumping the aisle
		if (offset.x == -1) {

			// set our state
			skillSelecting = true;
			attackStyleSelecting = false;

			// set our cursor position
			skillsCursorPos = attackStyleCursorPos;

		} if (offset.y == 1 && offset.x == 0) {

			if (attackStyleCursorPos == player.attackStyles.length - 1) {
				
				// start selecting the group below us
				attackStyleSelecting = false;
				constructSelecting = true;

				constructCursorPos = -1;

			}
		}

	} else if (constructSelecting) {

		// jumping the aisle
		if (offset.x == -1) {

			// set our state
			skillSelecting = true;
			constructSelecting = false;

			// set our cursor position
			skillsCursorPos = constructCursorPos + 8;

		} if (offset.y == -1 && offset.x == 0) {

			if (constructCursorPos == 0) {
				
				// start selecting the group below us
				attackStyleSelecting = true;
				constructSelecting = false;

				attackStyleCursorPos = player.attackStyles.length;

			}
		}
	}

	if (skillSelecting)
		skillsCursorPos = Math.min(Math.max(offset.y + skillsCursorPos, 0), player.skills.defaultSkills.length + player.skills.classSkills.length - 1);
	else if (constructSelecting)
		constructCursorPos = Math.min(Math.max(offset.y + constructCursorPos, 0), player.skills.constructs.length - 1);
	else
		attackStyleCursorPos = Math.min(Math.max(offset.y + attackStyleCursorPos, 0), player.attackStyles.length - 1);

	draw(gameTicks);
}