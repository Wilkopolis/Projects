/*				Variables					*/

// changes depending on 'fullscreen' mode
var mapDisplayWidth = 38;
var mapDisplayHeight = 40;
var mapXOffset = 16;
var mapYOffset = 0;
// width and height of the map portion of the screen
var fullscreen = false;
var fourXPos = {x:0, y:0};
var switchBoardPos = {x:0, y:0};
// center of the map on screen
var screen_center_x;
// where the player is drawn on the screen
var screen_player_x;
var screen_player_y;
// display height and width of minimap
var display_width_minimap = 17;
var display_height_minimap = 17;
// used to keep track of the x/y min of the map
var mapXMin;
var mapYMin;
// classes
var availableClasses = [];
// log of activity
var log = []
// how many moves we've made
var gameTicks = 0;
// for welcome screen
var welcomeCursorPos = 0;
var classCursorPos = 0;
var backgroundCursorPos = 0;
// for the loadout screen
var loadoutCursorPos = 0;
var attackStyleCursorPos = 0;
// for megamap
var cursorVis = true;
var newerInput = false;
// html objects
var canvas;
var ctx;
// game objects
var screen;
// u
var player;
// the collection of floors
var dungeon;
// the switchboard
var switchBoard;
// if we are interacting with a chest
var currentChest;
// if we pressed help yet
var helping = false;
var helped = false;
var helpDiv;

// Called on page load
window.onload = function () {
	// Grab the div we populate with html
    canvas = document.getElementById("canvas");
    canvas.width = CANVAS_WIDTH;
	canvas.height = CANVAS_HEIGHT;
    ctx = canvas.getContext("2d");
    ctx.font = FONT_STYLE_DEFAULT;
	// Define the display (screen)
	screen = new Screen(DISPLAY_WIDTH, DISPLAY_HEIGHT);
	FONT_H_SPACE = canvas.width / DISPLAY_WIDTH;
	FONT_V_SPACE = canvas.height / DISPLAY_HEIGHT;
	canvas.style.width = CANVAS_WIDTH + 'px';
	canvas.style.height = CANVAS_HEIGHT + 'px';
	canvas.style.marginLeft = (-CANVAS_WIDTH / 2) + 'px';
	canvas.style.marginTop = (-CANVAS_HEIGHT / 2) + 'px';
    // help div
	helpDiv = document.getElementById("help");
	helpDiv.style.width = CANVAS_WIDTH/3 + 'px';
	helpDiv.style.height = CANVAS_HEIGHT/4 + 'px';
	helpDiv.style.marginLeft = (-CANVAS_WIDTH / 6) + 'px';
	helpDiv.style.marginTop = (-CANVAS_HEIGHT / 6) + 'px';
	// help span	
	helpSpan = document.getElementById("helpText");
	helpSpan.style.lineHeight = CANVAS_WIDTH/6 + 'px';
	// deafult	
	mapDisplayWidth = DISPLAY_WIDTH_MAP;
	mapDisplayHeight = DISPLAY_HEIGHT_MAP;
	// calculate 
	screen_center_x = Math.round(DISPLAY_WIDTH/2);
	screen_player_x = mapXOffset + Math.round(mapDisplayWidth/2);
	screen_player_y = mapYOffset + Math.round(mapDisplayHeight/2);
	PROGRESS_BAR_X_OFFSET = Math.round(DISPLAY_WIDTH/2) - Math.round(PROGRESS_BAR_WIDTH/2);
	PROGRESS_BAR_Y = Math.round(PROGRESS_BAR_Y_PERCENT * DISPLAY_HEIGHT);
	factions[FACTION_CLONES] = new faction_clones();
	// switch to the welcome screen
	gameState = STATE_LANDING;
	document.onkeydown = welcomeOnKeyDown;
	// if no game to read out of memory
	welcomeCursorPos = 1;
	// update the screen with the welcome screen
	draw();
}

function welcomeOnKeyDown(event) {
	event = event || window.event;

	var keyCode = event.keyCode;

	switch (keyCode) {
	    // enter
	    case 13:
		gameState = STATE_BACKGROUND;
		document.onkeydown = backgroundOnKeyDown;
		draw();
	    break;
	    // keypad 8 104
	    // w 		87
		case 87: 
	    moveWelcome({x:0, y:-1});	    	  
	    break;
	    // keypad 9 105
	    // e 		69
	    case 69:
	    moveWelcome({x:1, y:-1});	    	  
	    break;
	    // keypad 6 102
	    // d 		68
	    case 68: 
	    moveWelcome({x:1, y:0});	    	  
	    break;
	    // keypad 3 99
	    // c 		67
	    case 67:
	    moveWelcome({x:1, y:1});	    	  
	    break;
	    // keypad 2 98
	    // x		88
	    case 88:
	    moveWelcome({x:0, y:1});
	    break;
	    // keypad 1 97
	    // z		90
	    case 90:
	    moveWelcome({x:-1, y:1});	    	  
	    break;
	    // keypad 4 100
	    // a 		65
	    case 65: 
	    moveWelcome({x:-1, y:0});	    	  
	    break;
	    // keypad 7 103
	    // q 		81
	    case 81: 
	    moveWelcome({x:-1, y:-1});	    	  
	    break;
	    // keypad 5 101
	    // s 		83
	    case 83: 
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

function backgroundOnKeyDown(event) {
	event = event || window.event;

	var keyCode = event.keyCode;

	switch (keyCode) {
	    // enter
	    case 13:
		gameState = STATE_LOADOUT;
		document.onkeydown = loadoutOnKeyDown;
		draw();
	    break;
	    // keypad 8 104
	    // w 		87
		case 87: 
	    moveBackground({x:0, y:-1});	    	  
	    break;
	    // keypad 9 105
	    // e 		69
	    case 69:
	    moveBackground({x:1, y:-1});	    	  
	    break;
	    // keypad 6 102
	    // d 		68
	    case 68: 
	    moveBackground({x:1, y:0});	    	  
	    break;
	    // keypad 3 99
	    // c 		67
	    case 67:
	    moveBackground({x:1, y:1});	    	  
	    break;
	    // keypad 2 98
	    // x		88
	    case 88:
	    moveBackground({x:0, y:1});
	    break;
	    // keypad 1 97
	    // z		90
	    case 90:
	    moveBackground({x:-1, y:1});	    	  
	    break;
	    // keypad 4 100
	    // a 		65
	    case 65: 
	    moveBackground({x:-1, y:0});	    	  
	    break;
	    // keypad 7 103
	    // q 		81
	    case 81: 
	    moveBackground({x:-1, y:-1});	    	  
	    break;
	    // keypad 5 101
	    // s 		83
	    case 83: 
	    moveBackground({x:0, y:0});
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
		    if (!loadoutItemNode.selected && factions[FACTION_CLONES].wealth >= loadoutItemNode.value) {
		    	factions[FACTION_CLONES].wealth -= loadoutItemNode.value;
		    	loadoutItemNode.selected = true;
		    } else if (loadoutItemNode.selected) {
		    	factions[FACTION_CLONES].wealth += loadoutItemNode.value;
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
		case 87: 
	    moveLoadout({x:0, y:-1});	    	  
	    break;
	    // keypad 9 105
	    // e 		69
	    case 69:
	    moveLoadout({x:1, y:-1});	    	  
	    break;
	    // keypad 6 102
	    // d 		68
	    case 68: 
	    moveLoadout({x:1, y:0});	    	  
	    break;
	    // keypad 3 99
	    // c 		67
	    case 67:
	    moveLoadout({x:1, y:1});	    	  
	    break;
	    // keypad 2 98
	    // x		88
	    case 88:
	    moveLoadout({x:0, y:1});
	    break;
	    // keypad 1 97
	    // z		90
	    case 90:
	    moveLoadout({x:-1, y:1});	    	  
	    break;
	    // keypad 4 100
	    // a 		65
	    case 65: 
	    moveLoadout({x:-1, y:0});	    	  
	    break;
	    // keypad 7 103
	    // q 		81
	    case 81: 
	    moveLoadout({x:-1, y:-1});	    	  
	    break;
	    // keypad 5 101
	    // s 		83
	    case 83: 
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

function gameOnKeyDown(event) {
	event = event || window.event;

	var keyCode = event.keyCode;

	switch (keyCode) {
	    // keypad 8 104
	    // w 		87
		case 87: 
	    movePlayer({x:0, y:-1});	    	  
	    break;
	    // keypad 9 105
	    // e 		69
	    case 69:
	    movePlayer({x:1, y:-1});	    	  
	    break;
	    // keypad 6 102
	    // d 		68
	    case 68: 
	    movePlayer({x:1, y:0});	    	  
	    break;
	    // keypad 3 99
	    // c 		67
	    case 67:
	    movePlayer({x:1, y:1});	    	  
	    break;
	    // keypad 2 98
	    // x		88
	    case 88:
	    movePlayer({x:0, y:1});
	    break;
	    // keypad 1 97
	    // z		90
	    case 90:
	    movePlayer({x:-1, y:1});	    	  
	    break;
	    // keypad 4 100
	    // a 		65
	    case 65: 
	    movePlayer({x:-1, y:0});	    	  
	    break;
	    // keypad 7 103
	    // q 		81
	    case 81: 
	    movePlayer({x:-1, y:-1});	    	  
	    break;
	    // keypad 5 101
	    // s 		83
	    case 83: 
	    movePlayer({x:0, y:0});
	    break;
	    // f
	    case 70:
		fullscreen = !fullscreen;
		if (fullscreen) {
			mapDisplayHeight = DISPLAY_HEIGHT, mapDisplayWidth = DISPLAY_WIDTH;
			mapXOffset = 0, mapYOffset = 0;
		} else {
			mapDisplayHeight = DISPLAY_HEIGHT_MAP, mapDisplayWidth = DISPLAY_WIDTH_MAP
			mapXOffset = MAP_X_OFFSET, mapYOffset = MAP_Y_OFFSET;
		}
		screen_center_x = Math.round(DISPLAY_WIDTH/2);
		screen_player_x = mapXOffset + Math.floor(mapDisplayWidth/2);
		screen_player_y = mapYOffset + Math.floor(mapDisplayHeight/2);
		relight();
		draw();
	    break;
	    // g
	    case 71:
	    gameState = STATE_FIRMWARE;
		document.onkeydown = firmwareOnKeyDown;
	    draw();
	    break;
	    // i
	    case 73:
	    gameState = STATE_INVENTORY;
		document.onkeydown = inventoryOnKeyDown;
	    inventoryCursorPos = 0;
	    draw();
	    break;
		// k
		case 75:
		gameState = STATE_SKILLS;
		document.onkeydown = skillsOnKeyDown;
		draw();
		break;
		// l
		case 76:
		if (typeof objectives[OBJ_GENES] !== 'undefined') {
			var tile = dungeon.tiles[player.y][player.x];
			if (factions[FACTION_CLONES].wealth >= PIPE_COST) {
				factions[FACTION_CLONES].wealth -= PIPE_COST;
				tile.entities.push(new entity_genes_pipe(player));
				if (!objectives[OBJ_GENES].connected)
					objectives[OBJ_GENES].submitted = false;
			}
		}
		break;
	    // m
	    case 77:
	    gameState = STATE_4X_MODE;
		document.onkeydown = fourXOnKeyDown;
	    draw();
	    break;
		// p
	    case 80:
	    var room = minimap[fourXPos.y][fourXPos.x];
	    if (!room.visited)
	    	return
	    else if (room.powered || room.purchased) {
	    	togglePower(fourXPos);
	    } else if (player.power >= room.powerCost) {
	    	player.power -= room.powerCost;
	    	room.purchased = true;
			player.ppt += room.ppt;
	    	togglePower(fourXPos);
	    }
	    relight();
	    draw();
	    break;
		// ,
		case 188:
		var tile = dungeon.tiles[player.y][player.x];		
		if (tile.entities.length > 0 && tile.entities.peek().type == ENTITY_ITEM)		
			player.inventory.pickUp(tile.entities.pop());
		break;
	    // ?
	    case 191:
	    if (!event.shiftKey)
	    	return;
	    if (!helped) {
	    	helped = true;
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

function inventoryOnKeyDown(event) {
	event = event || window.event;

	var keyCode = event.keyCode;

	switch (keyCode) {
	    // backspace 08
	    case 8:
	    gameState = STATE_GAME;
	    document.onkeydown = gameOnKeyDown;
	    relight();
	    draw();
	    break;
	    // enter
	    case 13:
		if (player.inventory.length == 0)
			return;
	   	if (selectInventoryItem(event.shiftKey))
	   		draw();
	    break;
	    // escape 27
	    case 27:
	    gameState = STATE_GAME;
	    document.onkeydown = gameOnKeyDown;
	    relight();
	    draw();
	    break;
	    // keypad 8 104
	    // w 		87
	    case 87: 
	    moveInventory({x:0, y:-1});	    	  
	    break;
	    // keypad 9 105
	    // e 		69
	    case 69:
	    moveInventory({x:1, y:-1});	    	  
	    break;
	    // keypad 6 102
	    // d 		68
	    case 68: 
	    moveInventory({x:1, y:0});	    	  
	    break;
	    // keypad 3 99
	    // c 		67
	    case 67:
	    moveInventory({x:1, y:1});	    	  
	    break;
	    // keypad 2 98
	    // x		88
	    case 88:
	    moveInventory({x:0, y:1});
	    break;
	    // keypad 1 97
	    // z		90
	    case 90:
	    moveInventory({x:-1, y:1});	    	  
	    break;
	    // keypad 4 100
	    // a 		65
	    case 65: 
	    moveInventory({x:-1, y:0});	    	  
	    break;
	    // keypad 7 103
	    // q 		81
	    case 81: 
	    moveInventory({x:-1, y:-1});	    	  
	    break;
	    // keypad 5 101
	    // s 		83
	    case 83: 
	    moveInventory({x:0, y:0});
	    break;
	    // i
	    case 73:
	    gameState = STATE_GAME;
	    document.onkeydown = gameOnKeyDown;
	    relight();
	    draw();
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
	    case 87: 
	    moveSkills({x:0, y:-1});	    	  
	    break;
	    // keypad 9 105
	    // e 		69
	    case 69:
	    moveSkills({x:1, y:-1});	    	  
	    break;
	    // keypad 6 102
	    // d 		68
	    case 68: 
	    moveSkills({x:1, y:0});	    	  
	    break;
	    // keypad 3 99
	    // c 		67
	    case 67:
	    moveSkills({x:1, y:1});	    	  
	    break;
	    // keypad 2 98
	    // x		88
	    case 88:
	    moveSkills({x:0, y:1});
	    break;
	    // keypad 1 97
	    // z		90
	    case 90:
	    moveSkills({x:-1, y:1});	    	  
	    break;
	    // keypad 4 100
	    // a 		65
	    case 65: 
	    moveSkills({x:-1, y:0});	    	  
	    break;
	    // keypad 7 103
	    // q 		81
	    case 81: 
	    moveSkills({x:-1, y:-1});	    	  
	    break;
	    // keypad 5 101
	    // s 		83
	    case 83: 
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

function fourXOnKeyDown(event) {
	event = event || window.event;

	var keyCode = event.keyCode;

	switch (keyCode) {
	    // m
	    case 77:
	    gameState = STATE_GAME;
	    document.onkeydown = gameOnKeyDown;
	    relight();
	    draw();
	    break;
	    // p
	    case 80:
	    var room = minimap[fourXPos.y][fourXPos.x];
	    if (!room.visited)
	    	return
	    else if (room.powered || room.purchased) {
	    	togglePower(fourXPos);
	    } else if (player.power >= room.powerCost) {
	    	player.power -= room.powerCost;
	    	room.purchased = true;
	    	togglePower(fourXPos);
	    }
	    draw();
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
	    case 87: 
	    moveFirmware({x:0, y:-1});	    	  
	    break;
	    // keypad 9 105
	    // e 		69
	    case 69:
	    moveFirmware({x:1, y:-1});	    	  
	    break;
	    // keypad 6 102
	    // d 		68
	    case 68: 
	    moveFirmware({x:1, y:0});	    	  
	    break;
	    // keypad 3 99
	    // c 		67
	    case 67:
	    moveFirmware({x:1, y:1});	    	  
	    break;
	    // keypad 2 98
	    // x		88
	    case 88:
	    moveFirmware({x:0, y:1});
	    break;
	    // keypad 1 97
	    // z		90
	    case 90:
	    moveFirmware({x:-1, y:1});	    	  
	    break;
	    // keypad 4 100
	    // a 		65
	    case 65: 
	    moveFirmware({x:-1, y:0});	    	  
	    break;
	    // keypad 7 103
	    // q 		81
	    case 81: 
	    moveFirmware({x:-1, y:-1});	    	  
	    break;
	    // keypad 5 101
	    // s 		83
	    case 83: 
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
	    case 87: 
	    moveSwitchboard({x:0, y:-1});	    	  
	    break;
	    // keypad 9 105
	    // e 		69
	    case 69:
	    moveSwitchboard({x:1, y:-1});	    	  
	    break;
	    // keypad 6 102
	    // d 		68
	    case 68: 
	    moveSwitchboard({x:1, y:0});	    	  
	    break;
	    // keypad 3 99
	    // c 		67
	    case 67:
	    moveSwitchboard({x:1, y:1});	    	  
	    break;
	    // keypad 2 98
	    // x		88
	    case 88:
	    moveSwitchboard({x:0, y:1});
	    break;
	    // keypad 1 97
	    // z		90
	    case 90:
	    moveSwitchboard({x:-1, y:1});	    	  
	    break;
	    // keypad 4 100
	    // a 		65
	    case 65: 
	    moveSwitchboard({x:-1, y:0});	    	  
	    break;
	    // keypad 7 103
	    // q 		81
	    case 81: 
	    moveSwitchboard({x:-1, y:-1});	    	  
	    break;
	    // keypad 5 101
	    // s 		83
	    case 83: 
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

function chestOnKeyDown(event) {
	event = event || window.event;

	var keyCode = event.keyCode;

	switch (keyCode) {
		// backspace 08
	    case 8:
	    gameState = STATE_GAME;
	    document.onkeydown = gameOnKeyDown;
	    relight();
	    draw();
	    break;
	    // enter
	    case 13:
	   	if (selectChestItem())
	   		draw();
	    break;
	    // escape 27
	    case 27:
	    gameState = STATE_GAME;
	    document.onkeydown = gameOnKeyDown;
	    relight();
	    draw();
	    break;
	    // keypad 8 104
	    // w 		87
	    case 87: 
	    moveChest({x:0, y:-1});	    	  
	    break;
	    // keypad 9 105
	    // e 		69
	    case 69:
	    moveChest({x:1, y:-1});	    	  
	    break;
	    // keypad 6 102
	    // d 		68
	    case 68: 
	    moveChest({x:1, y:0});	    	  
	    break;
	    // keypad 3 99
	    // c 		67
	    case 67:
	    moveChest({x:1, y:1});	    	  
	    break;
	    // keypad 2 98
	    // x		88
	    case 88:
	    moveChest({x:0, y:1});
	    break;
	    // keypad 1 97
	    // z		90
	    case 90:
	    moveChest({x:-1, y:1});	    	  
	    break;
	    // keypad 4 100
	    // a 		65
	    case 65: 
	    moveChest({x:-1, y:0});	    	  
	    break;
	    // keypad 7 103
	    // q 		81
	    case 81: 
	    moveChest({x:-1, y:-1});	    	  
	    break;
	    // keypad 5 101
	    // s 		83
	    case 83: 
	    moveChest({x:0, y:0});
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

/*				Game functions				*/

function move(offset) {
	switch(gameState)
	{
		case STATE_LANDING:
		moveBackground(offset);
		break;

		case STATE_SWITCHBOARD:
		moveSwitchboard(offset);
		break;

		case STATE_GAME:
		movePlayer(offset);
		break;

		case STATE_INVENTORY:
		moveInventory(offset);
		break;

		case STATE_FIRMWARE:
		oops();
		break;

		case STATE_SKILLS:
		moveSkills(offset);
		break;

		case STATE_CHEST:
		moveChest(offset);
		break;
	}
}

function moveWelcome(offset) {
	if (offset.x == 0)
		welcomeCursorPos = Math.min(Math.max(offset.y + welcomeCursorPos, 1), WELCOME_OPTIONS.length - 1);
	draw();
}

var classSelecting = true;
function moveBackground(offset) {
	if (classSelecting && offset.x == 1)
		classSelecting = false;
	else if (!classSelecting && offset.x == -1)
		classSelecting = true;

	if (classSelecting)
		classCursorPos = Math.min(Math.max(offset.y + classCursorPos, 0), CLASSES.length - 1);
	else 
		backgroundCursorPos = Math.min(Math.max(offset.y + backgroundCursorPos, 0), BACKGROUNDS.length - 1);

	draw();
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

// offset has an x and a y
function movePlayer(offset) {
	var complexMove = offset.x != 0 && offset.y != 0;
	// shorthand for long references
	var tiles = dungeon.tiles;
	var pos = player;
	var room = minimap[dungeon.roomPos.y][dungeon.roomPos.x];
	// the targeted tile
	var newPos = {x:pos.x + offset.x, y:pos.y + offset.y}
	// if it doesnt fit
	if (newPos.x < 0 || newPos.y < 0 || newPos.y >= tiles.length || newPos.x >= tiles[newPos.y].length)
		return;
	// new tile
	var newTile = tiles[newPos.y][newPos.x];
	// handle the move, if its a solid block with nothing in it just return;
	if ((newTile.getSolid() && !(newPos.x == pos.x && newPos.y == pos.y)) && newTile.entities.length > 0) {
		// handle the collision
		switch (newTile.entities[newTile.entities.length - 1].type) {
			case ENTITY_ENEMY:
				var enemy = newTile.entities.peek();
				if (fight(player, enemy)) {
					enemy.kill(newTile, player);
				}
			break;

			case ENTITY_GENERATOR_CONSOLE:
				newTile.entities[newTile.entities.length - 1].submit();
			break;

			case ENTITY_AUX_GENERATOR:
				if (!newTile.peek().started)
					newTile.peek().startUp();
				else
					return;
			break;

			case ENTITY_MASTERMIND_CONSOLE:
				newTile.entities.peek().submit();
			break;

			case ENTITY_MASTERMIND_PIECE:
				newTile.entities.peek().cycle();
				// reset the console submitted status
				objectives[OBJ_MASTERMIND].console.submitted = false;		
			break;

			case ENTITY_GENES_CONSOLE:
				newTile.entities.peek().submit();
			break;

			case ENTITY_CITY_CONSOLE:
				newTile.entities.peek().submit();
			break;

			case ENTITY_CHEST:
				newTile.entities.peek().open();
			break;

			default: return;
		}
	} else if (!newTile.getSolid() || newPos.x == pos.x && newPos.y == pos.y)
		dungeon.movePlayer(newPos);
	else
		return;
	// TIME HAS PASSED, do stuff like enemy turns, capture rooms etc.
	var victorious = objectives.progressObjectives();
	if (victorious) {
		// initialize the switchboard
		switchboard = new SwitchBoard(7,5);
		blinkSwitchboard();
		gameState = STATE_SWITCHBOARD;
	} else {
		gameTicks++;
		player.applyStatuses();
		do4XTurn();
		doFactionTurns();
		doEnemyTurns();
		captureRooms();
		relight();
	}
	draw();
}

function move4X(offset) {
	newerInput = true;
	cursorVis = true;
	var newPos = {x:fourXPos.x + offset.x, y:fourXPos.y + offset.y};
	if (newPos.x >= 0 &&
		newPos.y >= 0 &&
		newPos.y < minimap.length &&
		newPos.x < minimap[newPos.y].length &&
		minimap[newPos.y][newPos.x].hash != 0)
		fourXPos.x = newPos.x, fourXPos.y = newPos.y;
	draw();
	blinkMegaMap();
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

function moveInventory(offset) {
	if (offset.x == 0)
		inventoryCursorPos = Math.min(Math.max(offset.y + inventoryCursorPos, 0), player.inventory.length - 1);
	draw();
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

function moveChest(offset) {
	if (offset.x == 0)
		chestCursorPos = Math.min(Math.max(offset.y + chestCursorPos, 0), currentChest.contents.length - 1);
	draw();
}

var SLOT_WIELDABLE = 'wieldable';
var SLOT_HEAD = 'head';
var SLOT_MODULE = 'chest';
var SLOT_NONE = 'objective';
var SLOT_CONSUMABLE = 'consumable';
// return if we successfully equipped the item
function selectInventoryItem(shift) {
	var item = inventoryCursorItem;
	switch (item.slot) {
		case SLOT_WIELDABLE:
		// if the item is already equipped
		if (item.equipped) {
			// if we are targeting the offhand
			if (shift) {
				// if there is an offhand weapon
				if (player.offHand != ITEM_NONE) {
					// if that is us, unequip us
					if (player.offHand == item) {
						player.offHand = ITEM_NONE;
						item.unequip(player);
					// otherwise unequip them and put us there
					} else if (item.canBeEquipped(player)) {
						player.offHand.unequip(player);
						player.offHand = item;
						player.onHand = ITEM_NONE;
					}
				} else {
					player.onHand = ITEM_NONE;
					player.offHand = item;
				}
			} else {				
				// if there is an offhand weapon
				if (player.onHand != ITEM_NONE) {
					// if that is us, unequip us
					if (player.onHand == item) {
						player.onHand = ITEM_NONE;
						item.unequip(player);
					// otherwise unequip them and put us there
					} else if (item.canBeEquipped(player)) {
						player.onHand.unequip(player);
						player.onHand = item;
						player.offHand = ITEM_NONE;
					}
				} else {
					player.offHand = ITEM_NONE;
					player.onHand = item;
				}
			}
		} else if (item.canBeEquipped(player)) {
			if (!shift) {
				if (player.onHand != ITEM_NONE)
					player.onHand.unequip(player);
				player.onHand = item;
				item.equip(player);
			} else {
				if (player.offHand != ITEM_NONE)
					player.offHand.unequip(player);
				player.offHand = item;
				item.equip(player);
			}
		}
		break;
	}
	return true;
}

var MAX_INVENTORY_LENGTH = 52;
function selectChestItem() {
	if (currentChest.contents.length == 0)
		return false;
	var item = currentChest.contents[chestCursorPos];
	if (player.inventory.length < MAX_INVENTORY_LENGTH) {
		player.inventory.pickUp(currentChest.contents.splice(chestCursorPos,1)[0]);
		moveChest({x:0,y:0});
		return true;
	}
	return false;
}

// called each time a room is entered for the first time
var lastTick = 0;
var FOURX_PERIOD = 60;
function do4XTurn () {
	if (gameTicks - lastTick >= FOURX_PERIOD) {
		log.add("Turn " + gameTicks / FOURX_PERIOD + " has ended");
		lastTick = gameTicks;
		for (var faction in factions) {
			factions[faction].do4XTurn();
		}
	}
}

function newGame() {
	var occupation = CLASSES[classCursorPos];
	var background = BACKGROUNDS[backgroundCursorPos];
	var loadout = buildLoadOut();
	player = new Character(occupation, background, loadout);
	dungeon = new Dungeon();
	dungeon.populateInitial();
	skills = new Skills(occupation);
	addExposition();
	relight();
	draw();
}

function gameOver() {
	// gameState = STATE_LANDING;
	// document.onkeydown = welcomeOnKeyDown;
}

function buildLoadOut() {
	var result = [];
	for (var i = LOADOUT_OPTIONS.length - 1; i >= 0; i--) {
		if (LOADOUT_OPTIONS[i].selected)
			result.push(makeItem(LOADOUT_OPTIONS[i].name));
	}
	return result;
}

/*				Objects						*/

function Character (occupation, background, loadout) {
	this.powerLevel = 9001;
	this.hpMax = 10;
	this.x = 0;
	this.y = 0;
	this.hp = 10;
	this.xp = 0;
	this.name = 'Wilko';
	this.level = 1;
	this.skillPoints = 0;
	this.lastLevelXp = 0;
	this.nextLevelXp = 20;
	this.baseDamage = 3;
	this.baseAccuracy = .4;
	this.baseCritChance = .05;
	this.attackStyles = ATTACK_STYLES;
	this.faction = FACTION_CLONES;

	this.onHand = ITEM_NONE;
	this.offHand = ITEM_NONE;
	this.head = ITEM_NONE;
	this.module1 = ITEM_NONE;
	this.module2 = ITEM_NONE;
	this.module3 = ITEM_NONE;

	this.lastCombatTick = 0;

	this.skills = new Skills();
	this.inventory = new Inventory();
	this.statuses = [];

	for (var i = loadout.length - 1; i >= 0; i--) {
		var item = loadout[i];
		switch(item.slot) {
			case SLOT_WIELDABLE:
			if (this.onHand == ITEM_NONE) {
				this.onHand = item;
				item.equip(this);
			} else if (this.offHand == ITEM_NONE) {
				this.offHand = item;
				item.equip(this);
			}
			break;
			case SLOT_HEAD:
			if (this.head == ITEM_NONE) {
				this.head = item;
				item.equip(this);
			}
			break;
			case SLOT_MODULE:
			if (this.module1 == ITEM_NONE) {
				this.module1 = item;
				item.equip(this);
			} else if (this.module2 == ITEM_NONE) {
				this.module2 = item;
				item.equip(this);
			} else if (this.module3 == ITEM_NONE) {
				this.module3 = item;
				item.equip(this);
			}
			break;
			default:break;
		}
		this.inventory.push(item);
	}

	this.applyStatuses = function() {
		switch(this.getEffectLevel(EFFECT_FORTITUDE)) {
			case 0:break;
			case 1:
			var tickDifference = gameTicks - this.lastCombatTick - 5;
			this.hp = Math.max(Math.min(this.hp + 1, this.hpMax), 0);
			break;
			case 2:
			var tickDifference = gameTicks - this.lastCombatTick;
			this.hp = Math.max(Math.min(Math.round(tickDifference/2) + this.hp, this.hpMax), 0);
			break;
			case 3:
			var tickDifference = gameTicks - this.lastCombatTick;
			this.hp = Math.max(Math.min(tickDifference + this.hp, this.hpMax), 1);
			break;
			case 4:
			var tickDifference = gameTicks - this.lastCombatTick;
			this.hp = Math.max(Math.min(2 * tickDifference + this.hp, this.hpMax), 3);
			break;
			case 5:
			this.hp = Math.min(this.hp + 10, this.hpMax);
			break;
			default:break;
		}
		// remove any expired statuses
		for (var i = 0; i < this.statuses.length; i++) {
			if (this.statuses[i].ticksRemaining == 0)
				this.statuses.splice(i,1);
			else
				this.statuses[i].ticksRemaining--;
		}	
	}

	this.getEffectLevel = function(effect) {
		var level = 0;
		// check equipped items
		for (var item of this.inventory.filter(function (element) { return element.equipped; })) {
			if (item.effects.indexOf(effect) >= 0)
				level++;
		}

		// check statuses
		for (var status of this.statuses) {
			if (status.statusType == effect)
				level++;
		}

		// check skills
		level += player.skills.getSkillLevel(effect);
		return level;
	}
	
	this.getDmg = function() {
		// get the damage from equipped items
		var result = 0;
		// if weilding 1 weapon, add its damage
		// if weirlding 2 weapons, add .45 of each's damage
		var weapons = [];
		if (this.onHand != ITEM_NONE && typeof this.onHand.dmg !== "undefined")
			weapons.push(this.onHand);
		if (this.offHand != ITEM_NONE && typeof this.offHand.dmg !== "undefined")
			weapons.push(this.offHand);

		var accuracy = this.baseAccuracy;
		switch (this.getEffectLevel(EFFECT_ACCURACY)) {
			default:break;
			case 1: accuracy = .8; break;
			case 2: accuracy = 1; break;
		}

		switch (this.getEffectLevel(EFFECT_DAMAGE)) {
			default:break;
			case 1: result += 5; break;
			case 2: result += 5; break;
		}

		switch (weapons.length) {
			case 0:result += Math.random() <= accuracy ? this.baseDamage : 0; break;
			case 1:result += Math.random() <= accuracy ? weapons[0].dmg : 0; break;
			case 2:result +=  Math.random() <= accuracy ? .5*weapons[0].dmg + .5*weapons[1].dmg : 0; break;
			default:break;
		}

		var critChance = this.baseCritChance;
		var megaCritChance = 0;
		switch (this.getEffectLevel(EFFECT_PRECISION)) {
			default:break;
			case 1: critChance = .2; break;
			case 2: critChance = .4; break;
			case 3: critChance = .6; megaCritChance = 0.2; break;
		}

		if (Math.random() < critChance) {
			result = Math.random() < megaCritChance ? result * 2.5 : result * 1.5;
		}

		// apply skill/item/crit effects etc.
		return Math.round(result);
	}

	this.takeDamage = function(amount) {
		switch (this.getEffectLevel(EFFECT_SHIELD)) {
			default:break;
			case 1: accuracy = .8; break;
			case 2: accuracy = 1; break;
			case 3: accuracy = 1; break;
		}
		this.hp -= amount;
		if (this.hp <= 0)
			this.kill();
	}

	this.getThreat = function() {
		return this.hpMax * this.baseDamage;
	}

	this.addXp = function(amount) {
		while (amount > 0) {
			var xpTillLevel = this.nextLevelXp - this.xp;
			// level up
			if (xpTillLevel <= amount) {
				amount -= xpTillLevel;
				this.xp += xpTillLevel;
				this.level++;
				this.skillPoints += 1;
				this.lastLevelXp = this.nextLevelXp;
				this.nextLevelXp = Math.round(this.nextLevelXp * 2.25);
				var hpDif = Math.round(this.hpMax * .25);
				this.hpMax += hpDif;
				this.hp += hpDif;
			} else {
				this.xp += amount;
				break;				
			}
		}
	}

	this.addCombatExperience = function () {
		
	}

	this.kill = function() {
		gameOver();
	}
}

var ITEM_NONE = -1;
// the inventory object is an array with some special functions
Inventory.prototype = new Array;
function Inventory () {

	this.pickUp = function(item) {
		this.push(item);
	}

	this.hasAndRemove = function(itemName) {
		for (var i = this.length - 1; i >= 0; i--) {
			if (this[i].name == itemName) {
				this.splice(i,1);
				return true;
			}
		}
		return false;
	}
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

function fight (attacker, defender) {
	defender.takeDamage(attacker.getDmg(), attacker);
	attacker.addCombatExperience();
	attacker.lastCombatTick = gameTicks;
	defender.lastCombatTick = gameTicks;
	return defender.hp <= 0;
}

function doEnemyTurns() {
	for (var i = dungeon.npcs.length - 1; i >= 0; i--) {
		var enemy = dungeon.npcs[i];
		enemy.applyStatuses();
		var enemyPos = {x: enemy.x, y: enemy.y};
		var currentTile = dungeon.tiles[enemyPos.y][enemyPos.x];
		
		if (!enemy.canMove())
			continue;

		// go to our room, otherwise if we encounter something that makes us mad, kill it instead
		var destination = enemy.destination;
		var npcDestination = false;
		var candidates = [];
		for (var j = dungeon.npcs.length - 1; j >= 0; j--) {
			if (Math.sqrt(Math.pow(enemyPos.x - dungeon.npcs[j].x, 2) + Math.pow(enemyPos.y - dungeon.npcs[j].y, 2)) < 8 && dungeon.npcs[j].faction != FACTION_NONE && dungeon.npcs[j].faction != enemy.faction)
				candidates.push(dungeon.npcs[j]);
		}

		if (Math.sqrt(Math.pow(enemyPos.x - player.x, 2) + Math.pow(enemyPos.y - player.y, 2)) < 8 && player.faction != FACTION_NONE && player.faction != enemy.faction)
			candidates.push(player);

		if (candidates.length > 0) {
			candidates.sort(function(a,b) {return b.powerLevel - a.powerLevel});
			destination = candidates[0];
			npcDestination = true;
		}

		var dx = Math.abs(enemyPos.x - destination.x);
		var dy = Math.abs(enemyPos.y - destination.y);
		if (npcDestination) {
			if (dx <= 1 && dy <= 1 && enemy.canAttack()) {
				fight(enemy, destination)
				dispute(enemy);
				continue;
			}
		}

		if (destination != DESTINATION_NONE) {
			// if within room, do A-Star with weights why not
			var offset = getNextMoveAStar(enemyPos, destination);
			var newPos = {x: enemyPos.x + offset.x, y: enemyPos.y + offset.y};
			var newTile = dungeon.tiles[newPos.y][newPos.x];
			var roomPos = {x: mapXMin + Math.round((enemy.x - (ROOM_CELL_LENGTH - 1)/ 2) / ROOM_CELL_LENGTH), 
				    	   y: mapYMin + Math.round((enemy.y - (ROOM_CELL_LENGTH - 1)/ 2) / ROOM_CELL_LENGTH)};
			var room = roomLookup[minimap[roomPos.y][roomPos.x].hash];
			if (newTile.getSolid() || (newPos.x == destination.x && newPos.y == destination.y)) {				
				enemy.destination = DESTINATION_NONE;
				room.unitsEnroute.setRemove(enemy);
			} else {				
				enemy.x = newPos.x;
				enemy.y = newPos.y;

				var temp = currentTile.entities.pop();
				newTile.entities.push(temp);				
			}
		} else {
			// else wander or do something simple
			var offset = MOVE_OPTIONS[Math.floor(Math.random() * MOVE_OPTIONS.length)];
			var newPos = {x: enemyPos.x + offset.x, y: enemyPos.y + offset.y};
			var newTile = dungeon.tiles[newPos.y][newPos.x];
			if (!newTile.getSolid()) {				
				enemy.x = newPos.x;
				enemy.y = newPos.y;
				newTile.entities.push(currentTile.entities.pop());				
			}
		}
		dispute(enemy);
	}
}

function dispute(enemy) {
	if (enemy.faction == FACTION_NONE)
		return;

	var inRoom = dungeon.tiles[enemy.y][enemy.x].inRoom;
	if (inRoom) {
		var roomPos = {x: mapXMin + Math.round((enemy.x - (ROOM_CELL_LENGTH - 1)/ 2) / ROOM_CELL_LENGTH), 
				       y: mapYMin + Math.round((enemy.y - (ROOM_CELL_LENGTH - 1)/ 2) / ROOM_CELL_LENGTH)};
		var room = roomLookup[minimap[roomPos.y][roomPos.x].hash];
		room.units.push(enemy);
		disputedRooms.refSetAdd(room);
	}
}

var disputedRooms = [];
function captureRooms() {
	for (var i = disputedRooms.length - 1; i >= 0; i--) {
		var room = disputedRooms[i];
		var units = room.units;
		var faction = units[0].faction;
		if (faction == null)
			oops();
		var cont = false;
		for (var j = units.length - 1; j > 0; j--) {
			if (units[j].faction != faction) {
				cont = true;
				break;
			}
		}
		if (cont) {
			room.units = [];
			continue;
		}
		if (room.targetFaction == faction) {
			room.captureAmount += .1/room.size;
			if (room.captureAmount >= room.captureRequired) {
				room.captureAmount = room.captureRequired;
				if (faction != FACTION_NONE) {
					factions[faction].roomsCaptured += room.size;
					factions[faction].ppt += room.ppt;
					factions[faction].wpt += room.wpt;
				}
				room.faction = faction;
				room.targetFaction = FACTION_NONE;
			}
		} else if (room.faction != faction) {
			room.captureAmount -= .1/room.size;
			if (room.captureAmount <= 0) {
				room.captureAmount = 0;
				if (room.faction != FACTION_NONE) {
					factions[room.faction].roomsCaptured -= room.size;
					factions[room.faction].ppt -= room.ppt;
					factions[room.faction].wpt -= room.wpt;
				}
				room.faction = FACTION_NONE;
				room.targetFaction = faction;
			}			
		}
		room.units = [];
	}
	disputedRooms = [];
}