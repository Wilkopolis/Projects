function gameOnKeyDown(event) {

	if (gameOver)
		resetGame();

	// for drawing two different entities on a tile
	flipping = false;

	event = event || window.event;

	var keyCode = event.keyCode;

	switch (keyCode) {
		// backspace 08
		case 8:
			if (selectingTile) {
				selectingTile = false;
				selectingFor = null;
				TILE_X = -1;
				TILE_Y = -1;
				for (var i = pixelEffects.length - 1; i >= 0; i--) {
					var effect = pixelEffects[i];
					if (effect.type == PIXEL_INVERT)
						pixelEffects.remove(effect);
				}
				relight();
				draw(gameTicks);
			} else if (examinedEntity != null) {
				selectingFor = null;
				selectingTile = false;
				examinedEntity = null;
				relight();
				draw(gameTicks);
			}
	    break;
	    // escape 27
	    case 27:
			if (selectingTile) {
				selectingTile = false;
				selectingFor = null;
				TILE_X = -1;
				TILE_Y = -1;
				for (var i = pixelEffects.length - 1; i >= 0; i--) {
					var effect = pixelEffects[i];
					if (effect.type == PIXEL_INVERT)
						pixelEffects.remove(effect);
				}
				relight();
				draw(gameTicks);
			} else if (examinedEntity != null) {
				selectingFor = null;
				selectingTile = false;
				examinedEntity = null;
				relight();
				draw(gameTicks);
			}
	    break;
	    case KEY_NORTH: 
	    	moveGame({x:0, y:-1});	    	  
	    break;
	    case KEY_NORTH_EAST:
	    	moveGame({x:1, y:-1});	    	  
	    break;
	    case KEY_EAST: 
	    	moveGame({x:1, y:0});	    	  
	    break;
	    case KEY_SOUTH_EAST:
	    	moveGame({x:1, y:1});	    	  
	    break;
	    case KEY_SOUTH:
	    	moveGame({x:0, y:1});
	    break;
	    case KEY_SOUTH_WEST:
	    	moveGame({x:-1, y:1});	    	  
	    break;
	    case KEY_WEST: 
	    	moveGame({x:-1, y:0});	    	  
	    break;
	    case KEY_NORTH_WEST: 
	    	moveGame({x:-1, y:-1});	    	  
	    break;
	    case KEY_WAIT: 
	    	moveGame({x:0, y:0});
	    break; 
	    // Tab 09
	    case 9:
	    event.preventDefault();
	    autoFight();
	    break;
	    // o 79
	    case 79:
	   	autoExplore();
	    break;
	    // up arrow 38
	    case 38:
	    if (log.length > LOG_DISPLAY_LENGTH) {
	    	logOffset = Math.min(0, logOffset + 1);
			relight();
			draw(gameTicks);
	    }
	    break;
	    // down arrow 40
	    case 40:	    
	    if (log.length > LOG_DISPLAY_LENGTH) {
	    	logOffset = Math.max(-1 * (log.length - LOG_DISPLAY_LENGTH), logOffset - 1);
			relight();
			draw(gameTicks);
	    }
	    break;
	    // f
	    case 70:
		fullscreen = !fullscreen;
		if (fullscreen) {
			mapDisplayHeight = DISPLAY_HEIGHT, mapDisplayWidth = DISPLAY_WIDTH;
			mapXOffset = 0, mapYOffset = 0;
			effectsContainer.style.marginLeft = (-CANVAS_WIDTH / 2) - 170 + 'px';
		} else {
			mapDisplayHeight = DISPLAY_HEIGHT_MAP, mapDisplayWidth = DISPLAY_WIDTH_MAP
			mapXOffset = MAP_X_OFFSET, mapYOffset = MAP_Y_OFFSET;
			effectsContainer.style.marginLeft = (-CANVAS_WIDTH / 2) + 'px';
		}
		screen_center_x = Math.round(DISPLAY_WIDTH/2);
		screen_player_x = mapXOffset + Math.floor(mapDisplayWidth/2);
		screen_player_y = mapYOffset + Math.floor(mapDisplayHeight/2);
		relight();
		draw(gameTicks);
	    break;
	    // g
	    case 71:
	    gameState = STATE_FIRMWARE;
	    effectsContainer.style.display = 'none';
		document.onkeydown = firmwareOnKeyDown;
	    draw(gameTicks);
	    break;
	    // i
	    case 73:
	    gameState = STATE_INVENTORY;
	    effectsContainer.style.display = 'none';
		document.onkeydown = inventoryOnKeyDown;
	    inventoryCursorPos = 0;
	    draw(gameTicks);
	    break;
		// k
		case 75:
		gameState = STATE_SKILLS;
	    effectsContainer.style.display = 'none';
		document.onkeydown = skillsOnKeyDown;
		draw(gameTicks);
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
	    effectsContainer.style.display = 'none';
		powerButtonContainer.style.display = selectedRoomHash > 0 ? 'block' : 'none';
		document.onkeydown = fourXOnKeyDown;
	    draw(gameTicks);
	    break;
	    // u 85
	    case 85:
		    if (performanceLogging) {
		    	logEntity = [];
			    return;
		    }
	    break;
		// p 80
	    case 80:
	    if (performanceLogging) {
	    	for (var i = logEntity.length - 1; i >= 0; i--) {
		    	console.log(logEntity[i]);
		    }
		    return;
	    }

	    if (!selectingTile) {
	    	selectingTile = true;
	    	selectingFor = 'Examine';
			lightEntities();
	    	draw(gameTicks);
	    }
	    break;
		// ,
		case 188:
		sendPickUp();
		break;
	    // ?
	    case 191:
	    if (!event.shiftKey)
	    	return;
	    if (!helped) {
	    	helped = true;
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

function autoFight() {
	// get units in view
	var entities = onScreenEntities;
	// pick biggest one
	var mostThreatening;
	for (var i = entities.length - 1; i >= 0; i--) {
		if ((entities[i].type == ENTITY_ENEMY || entities[i].type == ENTITY_ATM ||
			 entities[i].type == ENTITY_SENTRY || entities[i].type == ENTITY_COMPANION) && 
			entities[i].faction != player.faction && 
			(mostThreatening == null || entities[i].getThreatLevel(player) > mostThreatening.getThreatLevel(player)))
			mostThreatening = entities[i];
	}
	// if we did pick one
	if (mostThreatening != null) {
		var dx = player.x - mostThreatening.x;
		var dy = player.y - mostThreatening.y;
		// if we are close enough, kill em
		if (Math.abs(dx) <= 1 && Math.abs(dy) <= 1) {
			moveGame({x: -dx, y: -dy});
		} else {
			// if within room, do A-Star with weights why not
			var offset = getNextMoveAStar(player, mostThreatening);
			// move there
			moveGame(offset);
		}
	} else {		
		log.add("No nearby enemies to auto-fight.")
		relight();
		draw(gameTicks);
	}
}

var pickingUp = false;
function sendPickUp() {

	if (pickingUp) {
		pickingUp = false;
		// hide pickup options
	}

	var pickUps = [];
	for (var i = onScreenEntities.length - 1; i >= 0; i--) {
		var entity = onScreenEntities[i];
		if (entity.type == ENTITY_ITEM) {
			pickUps.push(entity);
		}
	}

	if (pickUps.length > 0)


	pickingUp = true;
}

function pickUpOnKeyDown(event) {
	event = event || window.event;

	var keyCode = event.keyCode;
	
	var char = String.fromCharCode(keyCode).toLowerCase();

	switch (keyCode) {
		// backspace 08
		case 8:
		document.onkeydown = gameOnKeyDown;
	    break;
	    // escape 27
	    case 27:
		document.onkeydown = gameOnKeyDown;
	    break;
		// ,
		case 188:
		document.onkeydown = gameOnKeyDown;
		break;		
	    // enter
	    case 13:
		document.onkeydown = gameOnKeyDown;
	    break;
	    // space bar
	    case 32: 
		document.onkeydown = gameOnKeyDown;
	    break;
		// up arrow
	    case 38:
	    if (log.length > LOG_DISPLAY_LENGTH) {
	    	logOffset = Math.min(0, logOffset + 1);
			relight();
			draw(gameTicks);
	    }
	    break;
	    // down arrow
	    case 40:	    
	    if (log.length > LOG_DISPLAY_LENGTH) {
	    	logOffset = Math.max(-1 * (log.length - LOG_DISPLAY_LENGTH), logOffset - 1);
			relight();
			draw(gameTicks);
	    }
	    break;
	    // ?
	    case 191:
	    if (!event.shiftKey)
	    	return;
	    if (!helped) {
	    	helped = true;
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
	    // anything else
	    default: 
	    var item = itemMap[char];
	    if (item != null) {
	    	// get our tile
			var tile = dungeon.tiles[player.y][player.x];
	    	// remove from ground
	    	tile.entities.remove(item);
	    	// pick up
			player.inventory.pickUp(item);
			// remove the objective classification if its the OS Disk
			if (item.type = ENTITY_OS_DISK) {
				room = dungeon.getRoom();
				room.objective = "";
			}
	    }

		document.onkeydown = gameOnKeyDown;
	    break;
	}
}

// offset has an x and a y
function moveGame(offset, autoExploring = false) {

	lastMillis['moveGame'].start = performance.now();

	// if we are picking something, don't allow us to move
	if (selectingTile)
		return false;

	// if we are examing something, consome the movement to 
	// break the examination
	if (examinedEntity != null) {
		selectingFor = null;
		selectingTile = false;
		examinedEntity = null;
		relight();
		draw(gameTicks);
		return false;
	}

	// if we are stunned, skip
	if (player.isStunned())
		offset = {x:0, y:0};

	var complexMove = offset.x != 0 && offset.y != 0;
	// shorthand for long references
	var tiles = dungeon.tiles;
	var pos = player;
	var room = minimap[dungeon.roomPos.y][dungeon.roomPos.x];
	// the targeted tile
	var newPos = {x:pos.x + offset.x, y:pos.y + offset.y}
	// if it doesnt fit
	if (newPos.x < 0 || newPos.y < 0 || newPos.y >= tiles.length || newPos.x >= tiles[newPos.y].length)
		return false;
	// new tile
	var newTile = tiles[newPos.y][newPos.x];
	// handle the move, if its a solid block with nothing in it just return;
	if ((newTile.getSolid() && !(newPos.x == pos.x && newPos.y == pos.y)) && newTile.entities.length > 0) {
		// handle the collision
		var entity = newTile.entities.peek();
		switch (entity.type) {
			case ENTITY_ENEMY:
				player.attack(entity);
			break;

			case ENTITY_SENTRY:
				if (entity.faction != player.faction)
					player.attack(entity);
			break;

			case ENTITY_COMPANION:
				if (entity.faction != player.faction)
					player.attack(entity);
				else {					
					// stun it so it doesn't move
					entity.addStatus({type:STATUS_STUNNED, ticksRemaining:1, unique:true});

					// change places
					var companionTile = dungeon.tiles[entity.y][entity.x];
					var playerTile = dungeon.tiles[player.y][player.x];

					entity.x = player.x;
					entity.y = player.y;

					var temp = companionTile.entities.pop();
					playerTile.entities.push(temp);

					dungeon.movePlayer(newPos);
				}
			break;

			case ENTITY_BANK_TERMINAL:
				entity.room.tripped = true;
				log.add("You disable the bank's security.");
			break;

			case ENTITY_ATM:
				var atm = entity;
				player.attack(atm);
			break;

			case ENTITY_OBSTACLE:
				if (autoExploring)
					return false;

				var obstacle = entity;
				player.attack(obstacle);
			break;

			case ENTITY_GENERATOR_CONSOLE:
				if (!entity.room.generator.started)
					entity.room.generator.startUp();
				else
					return false;
			break;

			case ENTITY_AUX_GENERATOR:
				if (!entity.room.generator.started)
					entity.room.generator.startUp();
				else
					return false;
			break;

			case ENTITY_MASTERMIND_CONSOLE:
				entity.submit();
			break;

			case ENTITY_MASTERMIND_PIECE:
				entity.cycle();
				// reset the console submitted status
				objectives[OBJ_MASTERMIND].console.submitted = false;		
			break;

			case ENTITY_GENES_CONSOLE:
				entity.submit();
			break;

			case ENTITY_CITY_CONSOLE:
				entity.submit();
			break;

			case ENTITY_CHEST:
				entity.open();
			break;

			case ENTITY_NPC:
				entity.interact();
			break;

			default: return false;
		}
	} else if (!newTile.getSolid() || newPos.x == pos.x && newPos.y == pos.y)
		dungeon.movePlayer(newPos);
	else
		return false;

	var victorious = objectives.progressObjectives();
	// You won!
	if (victorious) {
		beatGame();
	} else {
		lastMillis['endTurn'].start = performance.now();
		endTurn();
		lastMillis['endTurn'].end = performance.now();
	}

	lastMillis['moveGame'].end = performance.now();
	if (performanceLogging) {	
		logEntity.push('moveGame: ' + (lastMillis['moveGame'].end - lastMillis['moveGame'].start) + 'ms');
		logEntity.push('endTurn: ' + (lastMillis['endTurn'].end - lastMillis['endTurn'].start) + 'ms');
		logEntity.push('player.applyStatuses: ' + (lastMillis['player.applyStatuses'].end - lastMillis['player.applyStatuses'].start) + 'ms');
		logEntity.push('do4XTurn: ' + (lastMillis['do4XTurn'].end - lastMillis['do4XTurn'].start) + 'ms');
		logEntity.push('doFactionTurns: ' + (lastMillis['doFactionTurns'].end - lastMillis['doFactionTurns'].start) + 'ms');
		logEntity.push('doNPCTurns: ' + (lastMillis['doNPCTurns'].end - lastMillis['doNPCTurns'].start) + 'ms');
		logEntity.push('captureRooms: ' + (lastMillis['captureRooms'].end - lastMillis['captureRooms'].start) + 'ms');
		logEntity.push('player.applyEndStatuses: ' + (lastMillis['player.applyEndStatuses'].end - lastMillis['player.applyEndStatuses'].start) + 'ms');
		logEntity.push('relight: ' + (lastMillis['relight'].end - lastMillis['relight'].start) + 'ms');
	}
	return true;
}

function beatGame() {
	// location.reload();
	
	// initialize the switchboard
	// switchboard = new SwitchBoard(7,5);
	// blinkSwitchboard(gameTicks);
	// gameState = STATE_SWITCHBOARD;
	// window.onkeydown = switchboardOnKeyDown;
	// effectsContainer.style.display = 'none';
	// draw(gameTicks);
}

// TIME HAS PASSED, do stuff like enemy turns, capture rooms etc.
function endTurn() {
	// reset this here because the flashing drawing
	pixelEffects = [];

	gameTicks++;

	logOffset = 0;

	lastMillis['player.applyStatuses'].start = performance.now();
	player.applyStatuses();
	lastMillis['player.applyStatuses'].end = performance.now();

	lastMillis['do4XTurn'].start = performance.now();
	do4XTurn();
	lastMillis['do4XTurn'].end = performance.now();

	// reset this here
	onScreenEntities = [];

	lastMillis['doFactionTurns'].start = performance.now();
	doFactionTurns();
	lastMillis['doFactionTurns'].end = performance.now();

	lastMillis['doNPCTurns'].start = performance.now();
	doNPCTurns();
	lastMillis['doNPCTurns'].end = performance.now();

	doProjectileTurns();

	lastMillis['captureRooms'].start = performance.now();
	captureRooms();
	lastMillis['captureRooms'].end = performance.now();

	player.checkCooldowns();
	
	lastMillis['player.applyEndStatuses'].start = performance.now();
	player.applyEndStatuses();
	lastMillis['player.applyEndStatuses'].end = performance.now();

	lastMillis['relight'].start = performance.now();
	if (!gameOver)
		relight();
	lastMillis['relight'].end = performance.now();

	lastMillis['draw'].start = performance.now();
	draw(gameTicks);
	lastMillis['draw'].end = performance.now();
}

function newGame() {

	var occupation;
	for (var i = CLASSES.length - 1; i >= 0; i--) {
	 	if (CLASSES[i].selected)
	 		occupation = CLASSES[i];
	}

	var background;
	for (var i = BACKGROUNDS.length - 1; i >= 0; i--) {
	 	if (BACKGROUNDS[i].selected)
	 		background = BACKGROUNDS[i];
	}

	player = new Character(occupation.name, background, loadout);
	
	dungeon = new Dungeon();
	dungeon.populateInitial();
	dungeon.tiles[player.y][player.x].entities.push(player);

	var loadout = buildLoadOut();
	player.arm(loadout);

	addExposition();

	relight();
	draw(gameTicks);
	
	if (performanceLogging) {
		for (var porperty in factions) {
			console.log(porperty);
		}
		for (var porperty in objectives) {
			console.log(porperty);
		}
	}
}

var GameOverTagLines = ["better luck next time kid", "thats okay, there'll always be next time",
"tough break kid","it's okay, that was totally unfair"];
var gameOver = false;
function GameOver() {
	if (player.skills.skillObject[SKILL_LIFE_INSURANCE].canBeUsed() && player.skills.skillObject[SKILL_LIFE_INSURANCE].purchased) {
		player.hp = player.hpMax;
		factions[FACTION_CLONES].wealth = 0;
		player.skills.skillObject[SKILL_LIFE_INSURANCE].lastUsedTick = gameTicks;
		log.add("It sure pays to have insurance!");
	}
	// log.add("You have died: " + GameOverTagLines.peekRandom() + ".");
	// gameOver = true;
}

function resetGame() {
	location.reload();
	// gameOver = false;
	// // reset factions
	// gameState = STATE_LANDING;
	// effectsContainer.style.display = 'none';
	// document.onkeydown = welcomeOnKeyDown;
}

function drawStats () {
	var nameAndLvlString = player.name + "   lvl " + player.level;
	for (var i = nameAndLvlString.length - 1; i >= 0; i--) {
		screen.pixels[NAME_Y_OFFSET][NAME_X_OFFSET + i].char = nameAndLvlString[i];
		screen.pixels[NAME_Y_OFFSET][NAME_X_OFFSET + i].color = i > player.name.length ? COLOR_OUT_OF_SIGHT : COLOR_DEFAULT;
	}

	var wealthString = "Wealth:" + factions[FACTION_CLONES].wealth;
	for (var i = wealthString.length - 1; i >= 0; i--) {
		screen.pixels[WEALTH_Y_OFFSET][WEALTH_X_OFFSET + i].char = wealthString[i];
		screen.pixels[WEALTH_Y_OFFSET][WEALTH_X_OFFSET + i].color = COLOR_DEFAULT;
	}

	var powerString = "Power:" + factions[FACTION_CLONES].power;
	for (var i = powerString.length - 1; i >= 0; i--) {
		screen.pixels[POWER_Y_OFFSET][POWER_X_OFFSET + i].char = powerString[i];
		screen.pixels[POWER_Y_OFFSET][POWER_X_OFFSET + i].color = COLOR_DEFAULT;
	}

	var wealthpt = "   WPT:" + factions[FACTION_CLONES].wpt;
	for (var i = wealthpt.length - 1; i >= 0; i--) {
		screen.pixels[WPT_Y_OFFSET][WPT_X_OFFSET + i].char = wealthpt[i];
		screen.pixels[WPT_Y_OFFSET][WPT_X_OFFSET + i].color = COLOR_DEFAULT;
	}
}

function drawHP () {
	var hpIncrement = player.hpMax / HP_BAR_LENGTH;
	var hpCount = hpIncrement;
	for (var i = 0; i < HP_BAR_LENGTH; i++) {
		screen.pixels[HP_Y_OFFSET][i + HP_X_OFFSET].char = '■';
		if (hpCount <= player.hp + .001) 
			screen.pixels[HP_Y_OFFSET][i + HP_X_OFFSET].color = '#009933';
		else
			screen.pixels[HP_Y_OFFSET][i + HP_X_OFFSET].color = '#131324';
		hpCount += hpIncrement;
	}
}

function drawShield () {
	if (player.shieldMax == 0)
		return;

	var shieldIncr = player.shieldMax / HP_BAR_LENGTH;
	var shieldCnt = shieldIncr;
	for (var i = 0; i < HP_BAR_LENGTH; i++) {
		screen.pixels[HP_Y_OFFSET + 1][i + HP_X_OFFSET].char = '■';
		if (shieldCnt <= player.shieldHP + .001) 
			screen.pixels[HP_Y_OFFSET + 1][i + HP_X_OFFSET].color = COLOR_SHIELD;
		else
			screen.pixels[HP_Y_OFFSET + 1][i + HP_X_OFFSET].color = '#131324';
		shieldCnt += shieldIncr;
	}
}

function drawXP() {
	var xpDif = player.nextLevelXp - player.lastLevelXp;
	var xpIncrement = xpDif / HP_BAR_LENGTH;
	var xpCount = player.lastLevelXp;
	for (var i = 0; i < HP_BAR_LENGTH; i++) {
		screen.pixels[HP_Y_OFFSET + 2][i + HP_X_OFFSET].char = '=';
		if (xpCount <= player.xp + .001) 
			screen.pixels[HP_Y_OFFSET + 2][i + HP_X_OFFSET].color = '#9933ff';
		else
			screen.pixels[HP_Y_OFFSET + 2][i + HP_X_OFFSET].color = '#131324';
		xpCount += xpIncrement;
	}
}

function drawMap () {
	// dungeonCoordinates: get top left corner of visible map from player position
	var topleft = {x:Math.round(player.x - mapDisplayWidth / 2),
				   y:Math.round(player.y - mapDisplayHeight / 2)};

	// visit all the tiles after we draw them
	var visitTiles = [];

	// AbsoluteCoordinates: iterate through x and y of screen pixels
	for (var i = 0; i < mapDisplayHeight; i++) {
		for (var j = 0; j < mapDisplayWidth; j++) {
			// dungeonCoordinates: make sure the i,j pair is in the bounds of the dungeon tiles
			if (topleft.y + i >= 0 && 
				topleft.x + j >= 0 &&
				topleft.y + i < dungeon.tiles.length &&
			 	topleft.x + j < dungeon.tiles[topleft.y + i].length &&
			 	mapXOffset + j >= 0 && 
			 	mapYOffset + i >= 0 && 
			 	mapXOffset + j < DISPLAY_WIDTH && 
			 	mapYOffset + i < DISPLAY_HEIGHT) {

					var tile = dungeon.tiles[topleft.y + i][topleft.x + j];
					
					// don't do this here
					if (tile.entities.peek() == player)
						continue;

					var styleObj = dungeon.tiles[topleft.y + i][topleft.x + j].getCharInfo();
					screen.pixels[mapYOffset + i][mapXOffset + j].color = styleObj.color;
					screen.pixels[mapYOffset + i][mapXOffset + j].char = styleObj.char;
					screen.pixels[mapYOffset + i][mapXOffset + j].font = styleObj.font;

					if (typeof styleObj.flipChar !== 'undefined') {						
						screen.pixels[mapYOffset + i][mapXOffset + j].flipColor = styleObj.flipColor;
						screen.pixels[mapYOffset + i][mapXOffset + j].flipChar = styleObj.flipChar;
						screen.pixels[mapYOffset + i][mapXOffset + j].flipFont = styleObj.flipFont;

						flipping = true;
					}

					// draw hp bar
					if (styleObj.hasHp) {
						screen.pixels[mapYOffset + i][mapXOffset + j].hasHp = true;
						screen.pixels[mapYOffset + i][mapXOffset + j].hpPercent = styleObj.hp;
					}

					// if the tile has our target on it, draw it inverted
					if (styleObj.invert)
						pixelEffects.push({type:PIXEL_INVERT, x:mapXOffset + j, y:mapYOffset + i});

					// draw shield
					screen.pixels[mapYOffset + i][mapXOffset + j].hasShield = styleObj.hasShield;

					visitTiles.push(tile);
			} else
				screen.pixels[mapYOffset + i][mapXOffset + j].char = ' ';
		}
	}

	// we have to do this after we draw all the tiles first
	for (var i = visitTiles.length - 1; i >= 0; i--)
		visitTiles[i].visit();

	// place the player ontop
	screen.pixels[screen_player_y][screen_player_x].char = '@';
	screen.pixels[screen_player_y][screen_player_x].font = FONT_STYLE_DEFAULT;
	screen.pixels[screen_player_y][screen_player_x].color = COLOR_DEFAULT;
	screen.pixels[screen_player_y][screen_player_x].hasShield = player.isShielded();

	for (var i = 0; i < mapDisplayHeight; i++) {
		for (var j = 0; j < mapDisplayWidth; j++) {
			// dungeonCoordinates: make sure the i,j pair is in the bounds of the dungeon tiles
			if (topleft.y + i >= 0 && 
				topleft.x + j >= 0 &&
				topleft.y + i < dungeon.tiles.length &&
			 	topleft.x + j < dungeon.tiles[topleft.y + i].length &&
			 	mapXOffset + j >= 0 && 
			 	mapYOffset + i >= 0 && 
			 	mapXOffset + j < DISPLAY_WIDTH && 
			 	mapYOffset + i < DISPLAY_HEIGHT) {
					dungeon.tiles[topleft.y + i][topleft.x + j].visit();			
			}
		}
	}	
}

function drawMiniMap () {
	var topleft = {x:MINIMAP_X_CENTER - Math.round(display_width_minimap / 2),
				   y:MINIMAP_Y_CENTER - Math.round(display_height_minimap / 2)}
	for (var i = 0; i < display_height_minimap; i++) {
		for (var j = 0; j < display_width_minimap; j++) {
			var screenX = topleft.x + j;
			var screenY = topleft.y + i;
			// dungeonCoordinates: make sure the i,j pair is in the bounds of the dungeon tiles
			if (mapYMin + i >= 0 &&
			 	mapXMin + j >= 0 && 
			 	mapYMin + i < minimap.length && 
			 	mapXMin + j < minimap[mapYMin + i].length &&
			 	screenX >= 0 && 
			 	screenY >= 0 && 
			 	screenX < DISPLAY_WIDTH && 
			 	screenY < DISPLAY_HEIGHT) {
				if (minimap[mapYMin + i][mapXMin + j].hash != 0) {
					// pick the color we have so many colors
					// color powered, ourroom, factions, have megamap draw resources or w/e AND objective
					var roomSegment = minimap[mapYMin + i][mapXMin + j];
					var room = roomLookup[roomSegment.hash];
					var faction = room.faction;
					var ourRoom = room == dungeon.getRoom();
					var powered = room.powered;
					var visited = room.visited;
					var discovered = room.discovered;

					if (ourRoom)						
						screen.pixels[screenY][screenX].char = '@';
					else
						screen.pixels[screenY][screenX].char = '■';

					var color;
					if (!discovered)						
						screen.pixels[screenY][screenX].char = ' ';
					else if (!visited)
						color = COLOR_UNPOWERED_UNVISITED;					
					else if (faction != FACTION_NONE && !powered)
						color = COLOR_FACTIONS_UNPOWERED[faction];
					else if (faction != FACTION_NONE && powered)
						color = COLOR_FACTIONS_POWERED[faction];
					else if (!powered)
						color = COLOR_UNPOWERED_VISITED;
					else if (powered)
						color = COLOR_POWERED;
					// color the room
					screen.pixels[screenY][screenX].color = color;
				} else
					screen.pixels[screenY][screenX].char = ' ';					
			}
			else if (screenX >= 0 && 
			 	screenY >= 0 && 
			 	screenX < DISPLAY_WIDTH && 
			 	screenY < DISPLAY_HEIGHT)
				screen.pixels[MINIMAP_Y_OFFSET + i][screenX].char = ' ';
		}
	}
}

var CAPTURE_BAR_LENGTH = 11;
function drawCapture () {

	var captureString = "Capturing";
	var xStart = 24 + screen_center_x - Math.round(captureString.length / 2) + 1;
	for (var i = captureString.length - 1; i >= 0; i--) {
			screen.pixels[3][xStart + i].char = captureString[i];
			screen.pixels[3][xStart + i].color = COLOR_DEFAULT;
	}
	xStart = 24 + screen_center_x - Math.round(CAPTURE_BAR_LENGTH/2) + 1;

	var room = dungeon.getRoom();

	// select the color
	var captureColor;
	if (room.beingCaptured)
		captureColor = COLOR_FACTIONS_UNPOWERED[FACTION_CLONES];
	else
		captureColor = COLOR_FACTIONS_UNPOWERED[room.faction];

	for (var i = 0; i < CAPTURE_BAR_LENGTH; i++) {		
		screen.pixels[7][xStart + i].char = '■';
		screen.pixels[5][xStart + i].char = '■';
		screen.pixels[6][xStart + i].char = '■';
		if (i >= room.captureAmount/1 * CAPTURE_BAR_LENGTH) {	
			screen.pixels[7][xStart + i].color = COLOR_OUT_OF_SIGHT;
			screen.pixels[5][xStart + i].color = COLOR_OUT_OF_SIGHT;
			screen.pixels[6][xStart + i].color = COLOR_OUT_OF_SIGHT;
		} else {				
			screen.pixels[7][xStart + i].color = captureColor;
			screen.pixels[5][xStart + i].color = captureColor;
			screen.pixels[6][xStart + i].color = captureColor;				
		}
	}
}

var effectDivs = {};
function drawEffectDivs() {
	// get all skills and statuses
	var effects = player.getEffects();
	var effectDivs_keys = Object.keys(effectDivs);
	var runningDivHeight = (-CANVAS_HEIGHT / 2) + 150;
	for (var i = 0; i < effectDivs_keys.length; i++) {
		var key = effectDivs_keys[i];
		var div = effectDivs[key];
		// if its onscreen
		if (div.style.display == 'block') {
			// check if its still applicable
			if (effects[div.id] != null) {
				// update the width if we have to
				var percent = effects[div.id].percent * 100 + '%';
				var percentDiv = div.children[0];
				if (percentDiv.style.width != percent)
					percentDiv.style.width = percent;

				if (player.skills.skillObject[div.id].canBeUsed() && player.skills.skillObject[div.id].activatable)
					div.style.cursor = 'pointer';
				else
					div.style.cursor = '';

				var titleSpan = div.children[1];
				if (player.skills.skillObject[key].on) {
					percentDiv.style.background = COLOR_DEFAULT;
					titleSpan.style.color = COLOR_STATUS_ACTIVE;
				} else {
					percentDiv.style.background = player.skills.skillObject[key].activatable ? COLOR_STATUS_ACTIVE : COLOR_STATUS_PASSIVE;;
					titleSpan.style.color = COLOR_DEFAULT;
				}

				if (div.style.height != runningDivHeight)
					div.style.height = runningDivHeight;
				runningDivHeight += 30;

				effects[div.id].used = true;
			} else {
				div.style.display = 'none';
			}
		} else {
			if (effects[div.id]) {
				// update the width if we have to
				var percent = effects[div.id].percent * 100  + '%';
				var percentDiv = div.children[0];
				if (percentDiv.style.width != percent)
					percentDiv.style.width = percent;

				if (div.style.height != runningDivHeight)
					div.style.height = runningDivHeight;
				runningDivHeight += 30;

				div.style.display = 'block';

				effects[div.id].used = true;
			}
		}
	}

	var effect_keys = Object.keys(effects);
	for (var i = effect_keys.length - 1; i >= 0; i--) {
		var key = effect_keys[i];
		var effect = effects[key];
		// the div does not exist, make it
		if (!effect.used) {
			// create skill div
			var newDiv = document.createElement('div');
			// set its name to our skill/status name
			newDiv.id = key;
			// style it
			newDiv.className = 'statusDiv';
			newDiv.style.width = 20 + 8 * key.length + 'px';
			newDiv.style.marginTop = runningDivHeight + 'px';
			newDiv.style.display = 'block';
			runningDivHeight += 30;

			newDiv.onmousedown = getEffectOnMouseDown(key);

			// if its a skill, it will show up here
			if (player.skills.skillObject[key] && player.skills.skillObject[key].canBeUsed())
				newDiv.style.cursor = 'pointer';

			// make the percent bar div
			var percentDiv = document.createElement('div');
			// set its name to our skill/status name
			percentDiv.id = key + 'Percent';
			// style it
			percentDiv.className = 'percentDiv';
			// try from the right for width line of reasons 
			percentDiv.style.width = effect.percent * 100 + '%';
			percentDiv.style.background = player.skills.skillObject[key].activatable ? COLOR_STATUS_ACTIVE : COLOR_STATUS_PASSIVE;
			newDiv.appendChild(percentDiv);

			// make the title div
			var titleSpan = document.createElement('span');
			// set its name to our skill/status name
			titleSpan.id = key + 'Span';
			titleSpan.innerHTML = key;
			// style it
			titleSpan.className = 'titleSpan';
			// try from the right for width line of reasons 
			titleSpan.style.width = '100%';
			newDiv.appendChild(titleSpan);

			// add it to our collection
			effectDivs[key] = newDiv;
			// add it to screen
			effectsContainer.appendChild(newDiv);
		}
	}
}