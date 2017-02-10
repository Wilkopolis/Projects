function loadoutOnKeyDown(event) {
	event = event || window.event;

	var keyCode = event.keyCode;

	switch (keyCode) {
	    // enter
	    case 13:
		gameState = STATE_GAME;
		newGame();
		document.onkeydown = gameOnKeyDown;
		relight();
		draw();
	    break;
	    // space bar
	    case 32:
	    if (loadoutSelecting) {
		    var loadoutItemNode = LOADOUT_OPTIONS[loadoutCursorPos];
		    if (!loadoutItemNode.selected && startingWealth >= loadoutItemNode.value) {
		    	startingWealth -= loadoutItemNode.value;
		    	loadoutItemNode.selected = true;
		    } else if (loadoutItemNode.selected) {
		    	startingWealth += loadoutItemNode.value;
		    	loadoutItemNode.selected = false;
		    }
	    } else {
	    	for (var i = ATTACK_STYLES.length - 1; i >= 0; i--) {
	    		ATTACK_STYLES[i].selected = false;
	    	}
	    	ATTACK_STYLES[attackStyleCursorPos].selected = true;
	    }
		draw();
	    break;
	    // keypad 8 104
	    // w 		87
		case 104: 
	    moveLoadout({x:0, y:-1});	    	  
	    break;
	    // keypad 9 105
	    // e 		69
	    case 105:
	    moveLoadout({x:1, y:-1});	    	  
	    break;
	    // keypad 6 102
	    // d 		68
	    case 102: 
	    moveLoadout({x:1, y:0});	    	  
	    break;
	    // keypad 3 99
	    // c 		67
	    case 99:
	    moveLoadout({x:1, y:1});	    	  
	    break;
	    // keypad 2 98
	    // x		88
	    case 98:
	    moveLoadout({x:0, y:1});
	    break;
	    // keypad 1 97
	    // z		90
	    case 97:
	    moveLoadout({x:-1, y:1});	    	  
	    break;
	    // keypad 4 100
	    // a 		65
	    case 100: 
	    moveLoadout({x:-1, y:0});	    	  
	    break;
	    // keypad 7 103
	    // q 		81
	    case 103: 
	    moveLoadout({x:-1, y:-1});	    	  
	    break;
	    // keypad 5 101
	    // s 		83
	    case 101: 
	    moveLoadout({x:0, y:0});
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

var startingWealth = 12;
function drawLoadout() {
	var loadoutString = "Loadout";
	var xStart = screen_center_x - Math.round(loadoutString.length / 2) + 1;
	for (var i = loadoutString.length - 1; i >= 0; i--) {
			screen.pixels[3][xStart + i - 20].char = loadoutString[i];
			screen.pixels[3][xStart + i - 20].color = COLOR_DEFAULT;
	}
	for (var i = LOADOUT_OPTIONS.length - 1; i >= 0; i--) {
		var color = COLOR_CLASS_NAME;
		var loadoutString = LOADOUT_OPTIONS[i].value + ':' + LOADOUT_OPTIONS[i].name;
		var tempOffset = 10;
		if (LOADOUT_OPTIONS[i].selected) {			
			loadoutString = '[' + loadoutString + ']';
			tempOffset = 11;
		}
		if (i == loadoutCursorPos)
			color = loadoutSelecting ? COLOR_SELECT_CLASS_NAME : color;
		for (var j = loadoutString.length - 1; j >= 0; j--) {
			screen.pixels[WELCOME_Y_OFFSET + i * 2][WELCOME_X_OFFSET + j - tempOffset].char = loadoutString[j];
			screen.pixels[WELCOME_Y_OFFSET + i * 2][WELCOME_X_OFFSET + j - tempOffset].color = (loadoutString[j] == '[' || loadoutString[j] == ']') ? COLOR_DEFAULT : color;
		}
	}
	var attackStyleString = "Attack Styles";
	var xStart = screen_center_x - Math.round(attackStyleString.length / 2) + 1;
	for (var i = attackStyleString.length - 1; i >= 0; i--) {
			screen.pixels[3][xStart + i + 18].char = attackStyleString[i];
			screen.pixels[3][xStart + i + 18].color = COLOR_DEFAULT;
	}
	for (var i = ATTACK_STYLES.length - 1; i >= 0; i--) {
		var color = COLOR_CLASS_NAME;
		var attackStyleString = ATTACK_STYLES[i].name;
		var tempOffset = 30;
		if (ATTACK_STYLES[i].selected) {
			attackStyleString = '[' + attackStyleString + ']';
			tempOffset = 29;
		} 
		if (i == attackStyleCursorPos)
			color = !loadoutSelecting ? COLOR_SELECT_CLASS_NAME : color;
		for (var j = attackStyleString.length - 1; j >= 0; j--) {
			screen.pixels[WELCOME_Y_OFFSET + i * 2][WELCOME_X_OFFSET + j + tempOffset].char = attackStyleString[j];
			screen.pixels[WELCOME_Y_OFFSET + i * 2][WELCOME_X_OFFSET + j + tempOffset].color = (attackStyleString[j] == '[' || attackStyleString[j] == ']') ? COLOR_DEFAULT : color;
		}
	}
	var wealthString = "Dosh: " + startingWealth;
	var xStart = screen_center_x - Math.round(wealthString.length / 2) + 1;
	for (var i = wealthString.length - 1; i >= 0; i--) {
			screen.pixels[50][xStart + i - 20].char = wealthString[i];
			screen.pixels[50][xStart + i - 20].color = COLOR_DEFAULT;
	}
}

var loadoutSelecting = true;
function moveLoadout(offset) {
	if (loadoutSelecting && offset.x == 1)
		loadoutSelecting = false;
	else if (!loadoutSelecting && offset.x == -1)
		loadoutSelecting = true;

	if (loadoutSelecting)
		loadoutCursorPos = Math.min(Math.max(offset.y + loadoutCursorPos, 0), LOADOUT_OPTIONS.length - 1);
	else 
		attackStyleCursorPos = Math.min(Math.max(offset.y + attackStyleCursorPos, 0), ATTACK_STYLES.length - 1);
	draw();
}

function buildLoadOut() {
	var result = [];
	for (var i = LOADOUT_OPTIONS.length - 1; i >= 0; i--) {
		if (LOADOUT_OPTIONS[i].selected)
			result.push(makeLoadout(LOADOUT_OPTIONS[i].name));
	}
	return result;
}
