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
// for shop screen
var shopCursorPos = 0;
// for megamap
var cursorVis = true;
var newerInput = false;
// html objects
var canvas;
var ctx;
var effectsContainer;
// game objects
var screen;
// u
var player;
// the collection of floors
var dungeon;
// the switchboard
var switchBoard;
// if we pressed help yet
var helping = false;
var helped = false;
var helpDiv;
// for auto exploring, goes false when something happens
var bored = true;
// for debug
var spawnEnemies = true;
var performanceLogging = false;
// for using a set of keys
var numpadKeys = false;
var KEY_NORTH = 0;
var KEY_NORTH_EAST = 1;
var KEY_EAST = 2;
var KEY_SOUTH_EAST = 3;
var KEY_SOUTH = 4;
var KEY_SOUTH_WEST = 5;
var KEY_WEST = 6;
var KEY_NORTH_WEST = 7;
var KEY_WAIT = 8;

var lastMillis = {
	'moveGame':{},
	'endTurn':{},
	'player.applyStatuses':{},
	'do4XTurn':{},
	'doFactionTurns':{},
	'doNPCTurns':{},
	'captureRooms':{},
	'player.applyEndStatuses':{},
	'relight':{},
	'draw':{},
	'doNPCTurns|EnemySetup':{},
	'doNPCTurns|EnemyDirecting':{},
	'doNPCTurns|routing':{},
	'doNPCTurns|getNextMoveAStar':{},
	'doNPCTurns|wander':{},
	'doNPCTurns|disputeRoom':{}
};

var logEntity = [];

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
	// set the position of the effects div
    effectsContainer = document.getElementById("effectsContainer");
	effectsContainer.style.marginLeft = (-CANVAS_WIDTH / 2) + 'px';
	effectsContainer.style.marginTop = (-CANVAS_HEIGHT / 2) + 'px';
    powerButtonContainer = document.getElementById("powerButtonContainer");
	powerButtonContainer.style.marginLeft = (-CANVAS_WIDTH / 2) + 'px';
	powerButtonContainer.style.marginTop = (-CANVAS_HEIGHT / 2) + 'px';
	document.getElementById("containerContainer").style.display = 'block';
    // help div
	helpDiv = document.getElementById("help");
	helpDiv.style.width = CANVAS_WIDTH/3 + 'px';
	helpDiv.style.height = CANVAS_HEIGHT/4 + 'px';
	helpDiv.style.marginLeft = (-CANVAS_WIDTH / 6) + 'px';
	helpDiv.style.marginTop = (-CANVAS_HEIGHT / 6) + 'px';
	// help span	
	helpSpan = document.getElementById("helpText");
	helpSpan.style.lineHeight = CANVAS_WIDTH/6 + 'px';
	
	// the static power/unpower button
	var powerDiv = document.createElement('div');
	powerDiv.id = 'powerDiv';
	// style it
	powerDiv.className = 'statusDiv';
	powerDiv.style.width = '60px';
	powerDiv.style.marginTop = (-CANVAS_HEIGHT / 2) + 150 + 'px';
	powerDiv.onmousedown = togglePowered;
	powerDiv.style.cursor = 'pointer';

	// make the title div
	var titleSpan = document.createElement('span');
	// set its name to our skill/status name
	titleSpan.id = 'powerSpan';
	titleSpan.innerHTML = 'Power';
	// style it
	titleSpan.className = 'titleSpan';
	// try from the right for width line of reasons 
	titleSpan.style.width = '100%';
	titleSpan.style.color = '#131313'
	powerDiv.appendChild(titleSpan);

	var percentDiv = document.createElement('div');
	// set its name to our skill/status name
	percentDiv.id = 'powerPercent';
	// style it
	percentDiv.className = 'percentDiv';
	// try from the right for width line of reasons 
	percentDiv.style.width = '100%';
	percentDiv.style.background = '#ecf277';
	powerDiv.appendChild(percentDiv);

	// add it to screen
	powerButtonContainer.appendChild(powerDiv);

	// deafult	
	mapDisplayWidth = DISPLAY_WIDTH_MAP;
	mapDisplayHeight = DISPLAY_HEIGHT_MAP;
	// calculate 
	screen_center_x = Math.round(DISPLAY_WIDTH/2);
	screen_player_x = mapXOffset + Math.round(mapDisplayWidth/2);
	screen_player_y = mapYOffset + Math.round(mapDisplayHeight/2);
	PROGRESS_BAR_X_OFFSET = Math.round(DISPLAY_WIDTH/2) - Math.round(PROGRESS_BAR_WIDTH/2);
	PROGRESS_BAR_Y = Math.round(PROGRESS_BAR_Y_PERCENT * DISPLAY_HEIGHT);
	// bind the keys we are using
	if (numpadKeys) {
		// keypad 8 104
		KEY_NORTH = 104;
	    // keypad 9 105
		KEY_NORTH_EAST = 105;
	    // keypad 6 102
		KEY_EAST = 102;
	    // keypad 3 99
		KEY_SOUTH_EAST = 99;
	    // keypad 2 98
		KEY_SOUTH = 98;
	    // keypad 1 97
		KEY_SOUTH_WEST = 97;
	    // keypad 4 100
		KEY_WEST = 100;
	    // keypad 7 103
		KEY_NORTH_WEST = 103;
	    // keypad 5 101
		KEY_WAIT = 101;
	} else {
	    // w 		87
		KEY_NORTH = 87;
	    // e 		69
		KEY_NORTH_EAST = 69;
	    // d 		68
		KEY_EAST = 68;
	    // c 		67
		KEY_SOUTH_EAST = 67;
	    // x		88
		KEY_SOUTH = 88;
	    // z		90
		KEY_SOUTH_WEST = 90;
	    // a 		65
		KEY_WEST = 65;
	    // q 		81
		KEY_NORTH_WEST = 81;
	    // s 		83
		KEY_WAIT = 83;
	}
	// switch to the welcome screen
	gameState = STATE_LANDING;
	document.onkeydown = welcomeOnKeyDown;
	// mouse integration
	canvas.onmousemove = onMouseMove;
	canvas.onmousedown = onMouseDown;
	// if no game to read out of memory
	welcomeCursorPos = 1;
	// initial loadout
	for (var i = LOADOUT_OPTIONS.length - 1; i >= 0; i--) {
		LOADOUT_OPTIONS[i] = MakeItem(LOADOUT_OPTIONS[i].name);
	}
	// update the screen with the welcome screen
	draw(gameTicks);
}

// disable right click
window.oncontextmenu = function() {
    return false;
}

var TILE_Y = -1;
var TILE_X = -1;
function onMouseMove (event) {
	switch (gameState) {		
		case STATE_LANDING:
		break;
		case STATE_BACKGROUND:
			// get the pixel x/y
			TILE_Y = Math.round((event.layerY + 3) / FONT_V_SPACE);
			TILE_X = Math.round((event.layerX - 4) / FONT_H_SPACE);
			if (TILE_Y < 28) {
				if (TILE_X < 22) {
					classSelecting = true;
					for (var i = CLASSES.length - 1; i >= 0; i--) {
						if (WELCOME_Y_OFFSET + i * 2 == TILE_Y)
							classCursorPos = i;
					}
					draw(gameTicks);	
				} else if (TILE_X > 26) {
					classSelecting = false;
					for (var i = BACKGROUNDS.length - 1; i >= 0; i--) {
						if (WELCOME_Y_OFFSET + i * 2 == TILE_Y)
							backgroundCursorPos = i;
					}
					draw(gameTicks);	
				}
			}
		break;
		case STATE_LOADOUT:
			// get the pixel x/y
			TILE_Y = Math.round((event.layerY + 3) / FONT_V_SPACE);
			TILE_X = Math.round((event.layerX - 4) / FONT_H_SPACE);
			if (TILE_Y < 28) {
				if (TILE_X < 30) {
					loadoutSelecting = true;
					for (var i = LOADOUT_OPTIONS.length - 1; i >= 0; i--) {
						if (WELCOME_Y_OFFSET + i * 2 == TILE_Y)
							loadoutCursorPos = i;
					}
					draw(gameTicks);	
				} else if (TILE_X > 38) {
					loadoutSelecting = false;
					for (var i = ATTACK_STYLES.length - 1; i >= 0; i--) {
						if (WELCOME_Y_OFFSET + i * 2 == TILE_Y)
							attackStyleCursorPos = i;
					}
					draw(gameTicks);	
				}
			}
		break;
		case STATE_GAME:
			if (selectingTile) {
				for (var i = pixelEffects.length - 1; i >= 0; i--) {
					var effect = pixelEffects[i];
					if (effect.type == PIXEL_INVERT)
						pixelEffects.remove(effect);
				}
				// get the pixel x/y
				nextY = Math.round((event.layerY + 3) / FONT_V_SPACE);
				nextX = Math.round((event.layerX - 4) / FONT_H_SPACE);
				if (nextX > mapXOffset && nextX < mapDisplayWidth + mapXOffset &&  nextY > mapYOffset && nextY < mapDisplayHeight + mapYOffset) {
					TILE_X = nextX;
					TILE_Y = nextY;
					pixelEffects.push({type:PIXEL_INVERT, x:TILE_X, y:TILE_Y})
					var topleft = {x:Math.round(player.x - mapDisplayWidth / 2),
					   			   y:Math.round(player.y - mapDisplayHeight / 2)};
					var mapPos = {x:topleft.x + TILE_X - mapXOffset,
								  y:topleft.y + TILE_Y - mapYOffset};
					if (mapPos.y < 0 || mapPos.y >= dungeon.tiles.length ||
						mapPos.x < 0 || mapPos.x >= dungeon.tiles[0].length)
						return;

					targetTile = dungeon.tiles[mapPos.y][mapPos.x];
					if (targetTile.viewState == VIEW_STATE_HIDDEN)
						return;
					
					targetTile.x = mapPos.x;
					targetTile.y = mapPos.y;
				}
				// only light the right things for the job
				switch(selectingFor) {
					case 'Examine':	lightEntities(); break;
					case EFFECT_TERRAFORM_I: relight(); break;
					case CONSTRUCT_WALL: relight(); break;
					case CONSTRUCT_SENTRY_I: relight(); break;
					default: lightTargets(); break;
				}
				draw(gameTicks);
			}
		break;
		case STATE_INVENTORY:
		break;
		case STATE_SKILLS:
			// get the pixel x/y
			TILE_Y = Math.round((event.layerY + 3) / FONT_V_SPACE);
			TILE_X = Math.round((event.layerX - 4) / FONT_H_SPACE);
			if (TILE_X < 30) {
				skillSelecting = true;
				attackStyleSelecting = false;
				constructSelecting = false;
				skillsCursorPos = Math.min(Math.max(Math.round((TILE_Y - 8) / 2), 0), player.skills.allSkills.length - 1);
				draw(gameTicks);
			} else if (TILE_X > 38) {
				if (TILE_Y < 18) {
					skillSelecting = false;
					attackStyleSelecting = true;
					constructSelecting = false;
					attackStyleCursorPos = Math.min(Math.max(Math.round((TILE_Y - 8) / 2), 0), player.attackStyles.length - 1);
					draw(gameTicks);
				} else {
					skillSelecting = false;
					attackStyleSelecting = false;
					constructSelecting = true;
					constructCursorPos = Math.min(Math.max(Math.round((TILE_Y - 22) / 2), 0), player.skills.constructs.length - 1);
					draw(gameTicks);
				}
			}
		break;
		case STATE_4X_MODE:

			// get the pixel x/y			
			var topleft = {x: MEGAMAP_X_CENTER - Math.round(display_width_minimap / 2),
						   y: MEGAMAP_Y_CENTER - Math.round(display_height_minimap / 2)};
			
			var nextY = Math.floor(Math.max(Math.min(
					( ( ( topleft.y * FONT_V_SPACE ) + event.layerY ) / MEGAMAP_CELL_HEIGHT) - topleft.y + 1 + mapYMin
				, minimap.length - 1), 0));

			var nextX = Math.floor(Math.max(Math.min(
					( ( ( topleft.x * FONT_H_SPACE ) + event.layerX ) / MEGAMAP_CELL_WIDTH) - topleft.x + mapXMin
				, minimap[0].length - 1), 0));

			fourXCursor = {x: nextX, y: nextY};	
			
			draw(gameTicks);
			
		break;
		case STATE_FIRMWARE:
		break;
		case STATE_SWITCHBOARD:
		break;
	}
}

var selectedRoomHash = -1;
function onMouseDown(event) {

	switch (event.which) {
        case 1:
            // alert('Left Mouse button pressed.');
            break;
        case 2:
        	return;
            // alert('Middle Mouse button pressed.');
            break;
        case 3:
        	return;
            // alert('Right Mouse button pressed.');
            break;
        default: return;
            // alert('You have a strange Mouse!');
    }

	switch (gameState) {		
		case STATE_LANDING:
		break;
		case STATE_BACKGROUND:
		    if (classSelecting) {		    
		    	for (var i = CLASSES.length - 1; i >= 0; i--) {
		    		CLASSES[i].selected = false;
		    	}
		    	CLASSES[classCursorPos].selected = true;
		    } else {
		    	for (var i = BACKGROUNDS.length - 1; i >= 0; i--) {
		    		BACKGROUNDS[i].selected = false;
		    	}
		    	BACKGROUNDS[backgroundCursorPos].selected = true;
		    }
			draw(gameTicks);			
		break;
		case STATE_LOADOUT:
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
		    draw(gameTicks);
		break;
		case STATE_GAME:

			// we can't use any of our shit if we are stunned
			if ((player.isStunned() && selectingFor != 'Examine') || targetTile == null || targetTile.viewState == VIEW_STATE_HIDDEN)
				return;

			switch(selectingFor) {
				case SKILL_MICROWAVE_I:
					if (targetTile != null) {
						for (var i = targetTile.entities.length - 1; i >= 0; i--) {
							var entity = targetTile.entities[i];
							if (entity.type == ENTITY_ENEMY) {
								player.target = entity;
								player.addStatus({type:SKILL_MICROWAVE_I, ticksRemaining:3, endStatus:true, unique:true});
								TILE_X = -1;
								TILE_Y = -1;
								endTurn();
								selectingFor = null;
								selectingTile = false;
								player.skills.skillObject[SKILL_MICROWAVE_I].lastUsedTick = gameTicks;
							}
						}
					}
				break;
				case SKILL_MICROWAVE_II:
					if (targetTile != null) {
						for (var i = targetTile.entities.length - 1; i >= 0; i--) {
							var entity = targetTile.entities[i];
							if (entity.type == ENTITY_ENEMY) {
								player.target = entity;
								player.addStatus({type:SKILL_MICROWAVE_II, ticksRemaining:3, endStatus:true, unique:true});
								TILE_X = -1;
								TILE_Y = -1;
								endTurn();
								selectingFor = null;
								selectingTile = false;
								player.skills.skillObject[SKILL_MICROWAVE_II].lastUsedTick = gameTicks;
							}
						}
					}
				break;
				case SKILL_MICROWAVE_III:
					if (targetTile != null) {
						for (var i = targetTile.entities.length - 1; i >= 0; i--) {
							var entity = targetTile.entities[i];
							if (entity.type == ENTITY_ENEMY) {
								player.target = entity;
								player.addStatus({type:SKILL_MICROWAVE_III, ticksRemaining:3, endStatus:true, unique:true});
								TILE_X = -1;
								TILE_Y = -1;
								endTurn();
								selectingFor = null;
								selectingTile = false;
								player.skills.skillObject[SKILL_MICROWAVE_III].lastUsedTick = gameTicks;
							}
						}
					}
				break;
				case 'Examine':
					if (targetTile != null) {
						if (targetTile.entities.length > 0) {
							for (var i = targetTile.entities.length - 1; i >= 0; i--)
								log.add(targetTile.entities[i].getDescription());
							examinedEntity = targetTile.entities.peek();
							lightEntities();
							draw(gameTicks);
						}
					}
				break;
				case EFFECT_TERRAFORM_I:
					if (targetTile != null && !targetTile.getSolid()) {
						targetTile.entities.push(MakeNPC(NAME_EARTH_OBSTACLE, {x:targetTile.x, y:targetTile.y}));
						player.skills.skillObject[EFFECT_TERRAFORM_I].lastUsedTick = gameTicks;
					} else
						return;

					choicesLeft--

					if (choicesLeft == 0) {				
						selectingFor = null;
						selectingTile = false;
						endTurn();
					}
				break;
				case CONSTRUCT_WALL:
					if (targetTile != null && !targetTile.getSolid()) {
						targetTile.entities.push(MakeNPC(NAME_PLAYER_WALL, {x:targetTile.x, y:targetTile.y}));
					} else
						return;

					factions[FACTION_CLONES].wealth -= player.skills.skillObject[CONSTRUCT_WALL].price;

					if (factions[FACTION_CLONES].wealth < player.skills.skillObject[CONSTRUCT_WALL].price) {
						log.add("You need more money to place constructs.");
						endTurn();
						selectingFor = null;
						selectingTile = false;
					}
				break;
				case CONSTRUCT_SENTRY_I:
					if (targetTile != null && !targetTile.getSolid()) {
						
						var construct = MakeNPC(CONSTRUCT_SENTRY_I, {x:targetTile.x, y:targetTile.y}, [{type:STATUS_STUNNED, ticksRemaining:1}]);
						// so enemies can hit us
						dungeon.npcs.push(construct);
						// so we can do turns
						factions[FACTION_CLONES].units.push(construct);

						targetTile.entities.push(construct);

					} else
						return;

					factions[FACTION_CLONES].wealth -= player.skills.skillObject[CONSTRUCT_SENTRY_I].price;

					if (factions[FACTION_CLONES].wealth < player.skills.skillObject[CONSTRUCT_SENTRY_I].price) {
						log.add("You need more money to place constructs.");
						endTurn();
						selectingFor = null;
						selectingTile = false;
					}
				break;
			}
		break;
		case STATE_INVENTORY:
		break;
		case STATE_SKILLS:
		selectSkill();
		break;
		case STATE_4X_MODE:
		// set selected hash
		var tempHash = minimap[fourXCursor.y][fourXCursor.x].hash;

		if (tempHash > 0) {

			var room = roomLookup[tempHash];
			if (room.discovered) {
				
				selectedRoomHash = tempHash;
				
				powerButtonContainer.style.display = 'block';

				var div = document.getElementById('powerPercent');
				var span = document.getElementById('powerSpan');
				if (room.powered) {
					div.style.background = '#131313';
					span.style.color = '#ecf277';
				} else {
					div.style.background = '#ecf277';
					span.style.color = '#131313';
				}
			}
		} else
			powerButtonContainer.style.display = 'none';
		break;
		case STATE_FIRMWARE:
		break;
		case STATE_SWITCHBOARD:
		break;
	}
}

/*				Objects						*/

function dealDamage (attacker, damage, victim) {
	victim.takeDamage(damage, attacker);
	attacker.addCombatExperience(damage);
	attacker.lastCombatTick = gameTicks;
	victim.lastCombatTick = gameTicks;
	return victim.hp <= 0;
}

var disputedRooms = [];
function captureRooms() {
	for (var i = disputedRooms.length - 1; i >= 0; i--) {

		var room = disputedRooms[i];

		var units = room.units;

		var faction = units[0].faction;
		var factionsPresent = [];
		for (var j = units.length - 1; j >= 0; j--) {
			if (!factionsPresent.includes(units[j].faction)) {
				factionsPresent.push(units[j].faction);
			}
		}

		if (factionsPresent.length == 1 && factionsPresent[0] == room.faction && room.captureAmount == 1) {
			room.units = [];
			continue;
		}

		// if we are a mayor, cap twice as fast
		var rate = 1;
		if (factionsPresent[0] == FACTION_CLONES && player.class == CLASS_MAYOR)
			rate = 2;

		var roomOwner = room.faction;
		// if a roomOwning faction is here, do not decay
		// a room is only owned if it is capped/decaying
		if (!factionsPresent.includes(roomOwner) && room.faction != FACTION_NONE) {
			// decay
			room.captureAmount -= .1/room.size * rate;

			// for ui coloring purposes
			room.beingCaptured = false;

			if (room.captureAmount <= 0) {
				room.captureAmount = 0;
				if (room.faction != FACTION_NONE) {
					if (room.faction == FACTION_CLONES && player.skills.skillObject[SKILL_ELECTORAL_COLLEGE].purchased) {						
						player.hpMax -= 3;
						player.hp -= 3;
						if (player.hp <= 0)
							GameOver();
					}

					factions[room.faction].roomsCaptured -= room.size;
					factions[room.faction].wpt -= room.wpt;
					factions[room.faction].power -= room.power;
				}
				room.faction = FACTION_NONE;
				room.targetFaction = faction;
			}
		} else if (factionsPresent.length == 1) {
			room.captureAmount += .1/room.size * rate;

			// for ui coloring purposes
			room.beingCaptured = true;

			if (room.captureAmount >= room.captureRequired) {
				room.captureAmount = room.captureRequired;
				if (faction != FACTION_NONE) {
					if (faction == FACTION_CLONES && player.skills.skillObject[SKILL_ELECTORAL_COLLEGE].purchased) {						
						player.hpMax += 3;
						player.hp += 3;
					}
					factions[faction].roomsCaptured += room.size;
					factions[faction].wpt += room.wpt;
					factions[faction].power += room.power;
				}
				room.faction = faction;
				room.targetFaction = FACTION_NONE;

				// for ui coloring purposes			
				room.beingCaptured = false;
			}
		}

		room.units = [];
	}
	disputedRooms = [];
}