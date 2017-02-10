function skillsOnKeyDown(event) {
	event = event || window.event;

	var keyCode = event.keyCode;

	switch (keyCode) {
	    // enter
	    case 13:
	    if (skillsSelecting) {
	    	var skill = player.skills.defaultSkills[skillsCursorPos];
	    	if (skill.requirementsMet()) {	    		
	    		player.lastCombatTick = gameTicks;
		   		player.skillPoints -= skill.getCost();	
		   		skill.level++;
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
	    	if (skill.requirementsMet()) {	    		
	    		player.lastCombatTick = gameTicks;
		   		player.skillPoints -= skill.getCost();	
		   		skill.level++;
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
	// Draw skill points
	var skillPointsString = 'SP: ' + player.skillPoints;
	for (var i = skillPointsString.length - 1; i >= 0; i--) {		
		screen.pixels[SKILLS_STRING_Y][3 + i].char = skillPointsString[i];
		screen.pixels[SKILLS_STRING_Y][3 + i].color = COLOR_DEFAULT;
	}
	// draw Skill:Level
	for (var i = player.skills.defaultSkills.length - 1; i >= 0; i--) {
		var skillString = player.skills.defaultSkills[i].name + ':' + player.skills.defaultSkills[i].level;
		var color = COLOR_CLASS_NAME;		
		var tempOffset = 0;
		if (i == skillsCursorPos) {
			color = COLOR_SELECT_CLASS_NAME;
			skillString = '[' + skillString + ']';
			tempOffset = 1;
		}
		for (var j = skillString.length - 1; j >= 0; j--) {
			screen.pixels[WELCOME_Y_OFFSET + i * 2][WELCOME_X_OFFSET + j - tempOffset].char = skillString[j];
			screen.pixels[WELCOME_Y_OFFSET + i * 2][WELCOME_X_OFFSET + j - tempOffset].color = color;
		}
	}
	var attackStyleString = "Attack Styles";
	var xStart = screen_center_x - Math.round(attackStyleString.length / 2) + 1;
	for (var i = attackStyleString.length - 1; i >= 0; i--) {
			screen.pixels[3][xStart + i + 18].char = attackStyleString[i];
			screen.pixels[3][xStart + i + 18].color = COLOR_DEFAULT;
	}
	for (var i = player.attackStyles.length - 1; i >= 0; i--) {
		var color = COLOR_CLASS_NAME;
		var attackStyleString = player.attackStyles[i].name;
		var tempOffset = 30;
		if (i == attackStyleCursorPos) {
			color = COLOR_SELECT_CLASS_NAME;
			attackStyleString = '[' + attackStyleString + ']';
			tempOffset = 29;
		} else if (player.attackStyles[i].selected) {			
			attackStyleString = '[' + attackStyleString + ']';
			tempOffset = 29;
		}
		for (var j = attackStyleString.length - 1; j >= 0; j--) {
			screen.pixels[WELCOME_Y_OFFSET + i * 2][WELCOME_X_OFFSET + j + tempOffset].char = attackStyleString[j];
			screen.pixels[WELCOME_Y_OFFSET + i * 2][WELCOME_X_OFFSET + j + tempOffset].color = (attackStyleString[j] == '[' || attackStyleString[j] == ']') ? COLOR_DEFAULT : color;
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

var EFFECT_NONE = 'none';
// effects
var EFFECT_DAMAGE = 'Damage';
var EFFECT_REGEN = 'Regen';
// skills
var EFFECT_FORTITUDE = 'Fortitude';
var EFFECT_SHIELD = 'Shield';
var EFFECT_ACCURACY = 'Accuracy';
var EFFECT_PRECISION = 'Precision';
function Skills (occupation) {
	// default skills
	this.defaultSkills = [];
	this.defaultSkills.push(new Skill(EFFECT_FORTITUDE, [1,2,3,2,2], [[],[],[],[],[]]));
	this.defaultSkills.push(new Skill(EFFECT_SHIELD, [1,2,3], [[],[],[]]));
	this.defaultSkills.push(new Skill(EFFECT_ACCURACY, [1,2], [[],[]]));
	this.defaultSkills.push(new Skill(EFFECT_PRECISION, [1,2,3], [[],[],[]]));
	// class specific skills
	this.classSkills = [];
	// this.classSkills.push({name:EFFECT_TEST, lvl:0});

	this.getSkillLevel = function(skillName) {
		for (var i = this.defaultSkills.length - 1; i >= 0; i--) {
			if (this.defaultSkills[i].name == skillName)
				return this.defaultSkills[i].lvl;
		}
		for (var i = this.classSkills.length - 1; i >= 0; i--) {
			if (this.classSkills[i].name == skillName)
				return this.classSkills[i].lvl;
		}
	}
}

// skill would extend effect in a civilized language
function Skill(name, costs, requirements) {
	this.name = name;
	this.level = 0;
	this.maxLvl = costs.length;
	this.costs = costs;
	this.requirements = requirements;

	this.getCost = function() {
		return this.costs[this.level];
	};

	this.requirementsMet = function() {
		for(var requirement of requirements[this.level]) {
			if (!requirement.isSatisfied())
				return false;
		}
		return this.costs[this.level] <= player.skillPoints;
	};
}

function Requirement(effect, level) {
	this.effect = effect;
	this.level = level;

	this.isSatisfied = function() {
		return player.getEffectLevel(this.effect) >= this.level;
	};
}
