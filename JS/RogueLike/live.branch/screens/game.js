function gameOnKeyDown(event) {

	if (gameOver) {
		resetGame();
		return;
	} else if (windows[SCREEN_PROMPT].visible) {
		if (windows[SCREEN_PROMPT].numberOfOptions == 1 && event.keyCode == 13)
			windows[SCREEN_PROMPT].option1.event();
		return;
	}

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
				windows[SCREEN_GAME].redraw(gameTicks);
			} else if (examinedEntity != null) {
				selectingFor = null;
				selectingTile = false;
				examinedEntity = null;
				relight();
				windows[SCREEN_GAME].redraw(gameTicks);
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
	    // i
	    case 73:
			if (!windows[SCREEN_INVENTORY].visible)
				windows[SCREEN_INVENTORY].show();
			else
				windows[SCREEN_INVENTORY].hide();
	    break;
		// l
		case 76:
	    	if (doingTutorial)
	    		return;

			if (!windows[SCREEN_LEGEND].visible)
				windows[SCREEN_LEGEND].show();
			else
				windows[SCREEN_LEGEND].hide();
		
			// if (typeof objectives[OBJ_GENES] !== 'undefined') {
			// 	var tile = dungeon.tiles[player.y][player.x];
			// 	if (factions[FACTION_CLONES].wealth >= PIPE_COST) {
			// 		factions[FACTION_CLONES].wealth -= PIPE_COST;
			// 		tile.entities.push(new entity_genes_pipe(player));
			// 		if (!objectives[OBJ_GENES].connected)
			// 			objectives[OBJ_GENES].submitted = false;
			// 	}
			// }
		break;
	    // t
	    case 84:
	    	if (doingTutorial)
	    		return;

			if (!windows[SCREEN_LOG].visible)
				windows[SCREEN_LOG].show();
			else
				windows[SCREEN_LOG].hide();
	    break;
	    // u
	    case 85:
			if (!windows[SCREEN_EXAMINE].visible)
				windows[SCREEN_EXAMINE].show();
			else
				windows[SCREEN_EXAMINE].hide();
	    break;
	    // g
	    case 71:
	    	if (doingTutorial)
	    		return;

			if (!windows[SCREEN_OBJECTIVES].visible)
				windows[SCREEN_OBJECTIVES].show();
			else
				windows[SCREEN_OBJECTIVES].hide();
	    break;
	    // b
	    case 66:
			if (!windows[SCREEN_SKILLS].visible)
				windows[SCREEN_SKILLS].show();
			else
				windows[SCREEN_SKILLS].hide();
	    break;
	    // m
	    case 77:
	    	if (doingTutorial)
	    		return;

			if (!windows[SCREEN_MAP].visible)
				windows[SCREEN_MAP].show();
			else
				windows[SCREEN_MAP].hide();
	    break;
	    // r
	    case 82:
	    	if (doingTutorial)
	    		return;

			if (!windows[SCREEN_CHARACTER].visible)
				windows[SCREEN_CHARACTER].show();
			else
				windows[SCREEN_CHARACTER].hide();
	    break;
	    // v
	    case 86:
			if (!windows[SCREEN_SKILL_BAR].visible)
				windows[SCREEN_SKILL_BAR].show();
			else
				windows[SCREEN_SKILL_BAR].hide();
	    break;
	    // f
	    case 70:
	    	if (doingTutorial)
	    		return;

			if (!windows[SCREEN_STATUS].visible)
				windows[SCREEN_STATUS].show();
			else
				windows[SCREEN_STATUS].hide();
	    break;
	    // y
	    case 89:
			if (!windows[SCREEN_CONSTRUCTS].visible)
				windows[SCREEN_CONSTRUCTS].show();
			else
				windows[SCREEN_CONSTRUCTS].hide();
	    break;
	    // h
	    case 72:
			if (!windows[SCREEN_ON_SCREEN_ENTITIES].visible)
				windows[SCREEN_ON_SCREEN_ENTITIES].show();
			else
				windows[SCREEN_ON_SCREEN_ENTITIES].hide();
	    break;
	    // n
	    case 78:
	    	if (doingTutorial)
	    		return;

			if (!windows[SCREEN_ATTACK_STYLES].visible)
				windows[SCREEN_ATTACK_STYLES].show();
			else
				windows[SCREEN_ATTACK_STYLES].hide();
	    break;
	    // j
	    case 74:
	    	if (doingTutorial)
	    		return;

			if (!windows[SCREEN_CAPTURE].visible)
				windows[SCREEN_CAPTURE].show();
			else
				windows[SCREEN_CAPTURE].hide();
	    break;
	    // ; 186
	    case 186:
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
	    break;
		// ,
		case 188:
			if (!windows[SCREEN_PICKUP].visible)
				windows[SCREEN_PICKUP].show();
			else
				windows[SCREEN_PICKUP].hide();
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
				windows[SCREEN_GAME].redraw(gameTicks);
			} else {

				if (!windows[SCREEN_HELP].visible)
					windows[SCREEN_HELP].show();
				else
					windows[SCREEN_HELP].hide();
			}
	    break;
	    // ?
	    case 191:
	    if (!event.shiftKey)
	    	return;
	    
		if (!windows[SCREEN_HELP].visible)
			windows[SCREEN_HELP].show();
		else
			windows[SCREEN_HELP].hide();	    
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
			// if the player has at least one ranged weapon equipped
			if (player.hasOnlyRange()) {

				var baseAccuracy = player.perception / 12.5;

    			for (var i = player.wielded.length - 1; i >= 0; i--) {
    				var gun = player.wielded[i];

    				if (gun.range == RANGE_MELEE || player.bullets == 0)
    					continue;

    				var accuracy = baseAccuracy;
					if (spareArms > 0) {
						accuracy += player.wielded[i].accuracy * 
							(player.attackStyles[ATTACK_STYLE_DEXTERITY].lvl + 40) / 40;
						spareArms--;
					} else {
						accuracy += player.wielded[i].accuracy *
							(player.attackStyles[ATTACK_STYLE_DEXTERITY].lvl + 3.33) / 13.33;
					}
					
					// calculate damage, apply all of our effects and shit
					var damage = gun.damage;
					if (Math.random() < player.getCritChance())
						damage = Math.round(damage * player.getCritDamageModifier());

					if (player.skills.skillObject[SKILL_MONEY_SHOT].on) {
						var spent = Math.round(factions[FACTION_CLONES].wealth * .02);
						factions[FACTION_CLONES].wealth -= spent;
						damage += Math.round(spent);
					}

					if (player.skills.skillObject[SKILL_PEOPLES_CHAMPION].purchased) {
						for (var j = player.allies.length - 1; j >= 0; j--) {				
							damage += Math.round(player.allies[j].baseDamage / 3);
						}
					}

    				if (gun.name == NAME_STARTER_PISTOL) {        					
						var targetPos = {x:mostThreatening.x, y:mostThreatening.y};

						if (accuracy < Math.random()) {
							targetPos.x += Math.round(Math.random() * 2 - 1);
							targetPos.y += Math.round(Math.random() * 2 - 1);
						}

						shoot(player, targetPos, Math.random() * 10 + 10, accuracy, damage);
						player.bullets--;
    				} else if (gun.name == NAME_SHOTGUN) {
    					for (var j = 0; j < 6; j++) {
        					var targetPos = {x:mostThreatening.x, y:mostThreatening.y};
							targetPos.x += Math.round(Math.random() * 4 - 2);
							targetPos.y += Math.round(Math.random() * 4 - 2);

							shoot(player, targetPos, Math.random() * 10 + 7, accuracy, damage);
    					}
						player.bullets--;
    				} else if (gun.name == NAME_DUALIES) {
    					for (var j = 0; j < 2; j++) {
    						var targetPos = {x:mostThreatening.x, y:mostThreatening.y};
							if (accuracy < Math.random()) {
								targetPos.x += Math.round(Math.random() * 2 - 1);
								targetPos.y += Math.round(Math.random() * 2 - 1);
							}

							shoot(player, targetPos, Math.random() * 10 + 10, accuracy, damage);
    					}
						player.bullets--;
    				} else if (gun.name == NAME_SNIPER_RIFLE) {        					
						var targetPos = {x:mostThreatening.x, y:mostThreatening.y};

						shoot(player, targetPos, 30, accuracy, damage);
						player.bullets--;
    				} 
					endTurn();
    			}
				return;
			}

			// move towards target
			var offset = getNextMoveAStar(player, mostThreatening);
			if (offset.x == 0 && offset.y == 0) {
				log.add("Can't auto fight him from here.");
				relight();
				windows[SCREEN_GAME].redraw(gameTicks);
				return;
			}
			// move there
			moveGame(offset);
		}
	} else {		
		log.add("No nearby enemies to auto-fight.")
		relight();
		windows[SCREEN_GAME].redraw(gameTicks);
	}
}

// offset has an x and a y
function moveGame(offset) {

	lastMillis['moveGame'].start = performance.now();

	// if we are picking something, don't allow us to move
	if (selectingTile)
		return false;

	// if we are stunned, skip
	if (player.isStunned())
		offset = {x:0, y:0};

	var blinked = false;
	if (selectingFor == SKILL_BLINK_I) {
		var target = {x: player.x + offset.x * 4, y: player.y + offset.y * 4};

		if (dungeon.tiles[target.y][target.x].getSolid() || !dungeon.tiles[target.y][target.x].canBlink)
			target = getLastUnobstructedTile(player, target, dungeon.tiles);

		offset = {x: target.x - player.x, y: target.y - player.y};

		blinked = true;
		selectingFor = '';
	} else if (selectingFor == SKILL_BLINK_II) {
		var target = {x: player.x + offset.x * 7, y: player.y + offset.y * 7};

		if (dungeon.tiles[target.y][target.x].getSolid() || !dungeon.tiles[target.y][target.x].canBlink)
			target = getLastUnobstructedTile(player, target, dungeon.tiles);

		offset = {x: target.x - player.x, y: target.y - player.y};
		blinked = true;
		selectingFor = '';
	}

	// shorthand for long references
	var tiles = dungeon.tiles;
	var roomSegment = minimap[dungeon.roomPos.y][dungeon.roomPos.x];
	var room = roomLookup[roomSegment.hash];
	// the targeted tile
	var newPos = {x:player.x + offset.x, y:player.y + offset.y}
	// if it doesnt fit
	if (newPos.x < 0 || newPos.y < 0 || newPos.y >= tiles.length || newPos.x >= tiles[newPos.y].length)
		return false;
	// new tile
	var newTile = tiles[newPos.y][newPos.x];
	// handle the move, if its a solid block with nothing in it just return;
	if ((newTile.getSolid() && !(newPos.x == player.x && newPos.y == player.y)) && newTile.entities.length > 0) {
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

			case ENTITY_TUTORIAL_OVER:
				if (Cookies.enabled)
					Cookies.set("tutorialCompleted", true);

				// prompt
				var option1 = {
					text:"Yes",
					event:function() {
						location.reload();
					},
				};
				var option2 = {
					text:"Okay", 
					event:function() {
						location.reload();
					},
				};
				prompt("Visit [This URL] for more info on UrbanCrawl!", option1, option2);
			break;

			case ENTITY_SOLAR_CONSOLE:
				// noon, 6, midnight, 6, noon
				var lastStage = solar_stages[SOLAR_STAGE];				
				SOLAR_STAGE = lastStage.next;

				var currentStage = solar_stages[SOLAR_STAGE];
				COLOR_DEFAULT = currentStage.color;
				SIGHT_DISTANCE = currentStage.distance;
				todModifier += currentStage.modifier;
				player.range = SIGHT_DISTANCE;

				log.add(currentStage.message);
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

			case ENTITY_KENNEL_TERMINAL:
				for (var i = room.dogs.length - 1; i >= 0; i--) {
					var dog = room.dogs[i];
					// balance the dogs
					dog.hp = 10 + (gameTicks/100);
					dog.hpMax = dog.hp;
					dog.baseDamage = 3 + (gameTicks/400);
					// and faction
					dog.faction = FACTION_CLONES;
					dog.destination = player;
					dog.color = COLOR_FACTIONS_POWERED[FACTION_CLONES];
					// add them to your allies
					player.allies.push(dog);
				}

				room.unlockDoors();

				log.add("You release the trapped dog(s).");
			break;

			case ENTITY_ATM:
				var atm = entity;
				player.attack(atm);
			break;

			case ENTITY_BULLET_VENDOR:
				var vendor = entity;
				if (factions[FACTION_CLONES].wealth > 0 && vendor.hp > 0) {
					factions[FACTION_CLONES].wealth--;
					player.bullets++
					vendor.hp--;
					if (vendor.hp <= 0)
						vendor.kill(player);
				}
			break;

			case ENTITY_OBSTACLE:
				if (autoExploring)
					return false;

				player.attack(entity);
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
				if (!entity.submit())
					return;
			break;

			case ENTITY_CHEST:
				entity.open();
			break;

			case ENTITY_NPC:
				entity.interact();
			break;

			default: return false;
		}
	} else if (!newTile.getSolid() || newPos.x == player.x && newPos.y == player.y)
		dungeon.movePlayer(newPos);
	else
		return false;

	// apply 
	if (blinked) {
		if (player.skills.skillObject[SKILL_BLINK_HEAL].purchased) {
			var amount = Math.round(player.hpMax * (player.willpower) / 20);
			player.hp = Math.min(player.hp + amount, player.hpMax);
		}

		var enemies = [];
		if (player.skills.skillObject[SKILL_BLINK_EXIT].purchased ||
			player.skills.skillObject[SKILL_BLINK_STUN].purchased) {
			for (var i = 0; i < MOVE_OPTIONS.length; i++) {
				var adjPos = {x:newPos.x + MOVE_OPTIONS[i].x, y:newPos.y + MOVE_OPTIONS[i].y}
				if (adjPos.y >= 0 && 
					adjPos.x >= 0 &&
					adjPos.y < dungeon.tiles.length &&
				 	adjPos.x < dungeon.tiles[adjPos.y].length) {
					var tile = dungeon.tiles[adjPos.y][adjPos.x];
					if (tile.entities.length > 0 && 
						(((tile.entities.peek().type == ENTITY_ENEMY ||
						tile.entities.peek().type == ENTITY_COMPANION ||
						tile.entities.peek().type == ENTITY_SENTRY) && 
						tile.entities.peek().faction != player.faction) ||
						tile.entities.peek().type == ENTITY_OBSTACLE)) {
						enemies.push(tile.entities.peek());
					}
				}
			}

			if (player.skills.skillObject[SKILL_BLINK_EXIT].purchased) {
				for (var i = enemies.length - 1; i >= 0; i--) {
					dealDamage(player, Math.round(player.constitution/2), enemies[i]);
				}
			}

			if (player.skills.skillObject[SKILL_BLINK_STUN].purchased) {
				for (var i = enemies.length - 1; i >= 0; i--) {
					enemies[i].addStatus({type:STATUS_STUNNED, ticksRemaining:2, unique:true});
				}
			}
		}
	}

	victorious = objectives.progressObjectives();	
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
	// prompt
	var option1 = {
		text:"Yes",
		event:function() {
			location.reload();
		},
	};
	var option2 = {
		text:"Okay", 
		event:function() {
			location.reload();
		},
	};
	var score = getScore();
	prompt("Congradulations! You beat UrbanCrawl with a score of: " + score +
		". Do you want to return to the main menu?", option1, option2);
	// uncomment this for later
	// gameState = STATE_SWITCHBOARD;
	// window.onkeydown = switchboardOnKeyDown;
	// windows[SCREEN_GAME].redraw(gameTicks);
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
	if (!autoExploring)
		windows[SCREEN_GAME].redraw(gameTicks);
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

	if (hardMode) {
		SIGHT_DISTANCE = 10;
		solar_stages[1].distance = 10;
		solar_stages[2].distance = 8;
		solar_stages[3].distance = 6;
		solar_stages[4].distance = 5;
		solar_stages[5].distance = 6;
		solar_stages[6].distance = 8;
	}

	player = new Character(occupation.name, background);
	
	dungeon = new Dungeon();
	dungeon.populateInitial();
	dungeon.tiles[player.y][player.x].entities.push(player);

	var loadout = buildLoadOut();
	player.arm(loadout);

	addExposition();

	relight();
	windows[SCREEN_GAME].redraw(gameTicks);
	
	if (performanceLogging) {
		for (var porperty in factions) {
			console.log(porperty);
		}
		for (var porperty in objectives) {
			console.log(porperty);
		}
	}

	var keys = Object.keys(windows);
	for (var i = 0; i < keys.length; i++) {
		var temp = windows[keys[i]];
		temp.loadPosFromCookies();
	}
}

function newTutorial() {	
	player = new Character(CLASS_STUDENT, BACKGROUNDS[0]);
	player.bullets = 3;
	player.strength = 1;
	player.skillPoints = 0;

	dungeon = new Tutorial();
	dungeon.tiles[player.y][player.x].entities.push(player);

	relight();
	windows[SCREEN_GAME].redraw(gameTicks);
}

var GameOverTagLines = ["better luck next time kid", "thats okay, there'll always be next time",
"tough break kid","it's okay, that was totally unfair"];
var gameOver = false;
function GameOver() {
	if (player.skills.skillObject[SKILL_LIFE_INSURANCE].canBeUsed() && player.skills.skillObject[SKILL_LIFE_INSURANCE].purchased) {
		player.hp = player.hpMax;
		factions[FACTION_CLONES].wealth = 0;
		player.skills.skillObject[SKILL_LIFE_INSURANCE].lastUsedTick = gameTicks;
		log.add("Its sure great to have insurance!");
	}
	log.add("You have died: " + GameOverTagLines.peekRandom() + ".");
	gameOver = true;
	windows[SCREEN_GAME].redraw(gameTicks);
}

function resetGame() {
	location.reload();
	// gameOver = false;
	// // reset factions
	// gameState = STATE_LANDING;
	// gameTicks = 0;
	// document.onkeydown = welcomeOnKeyDown;
}

function drawMap () {
	// dungeonCoordinates: get top left corner of visible map from player position
	var topleft = {x:Math.round(player.x - DISPLAY_WIDTH / 2),
				   y:Math.round(player.y - DISPLAY_HEIGHT / 2)};

	// visit all the tiles after we draw them
	var visitTiles = [];

	// AbsoluteCoordinates: iterate through x and y of screen pixels
	for (var i = 0; i < DISPLAY_HEIGHT; i++) {
		for (var j = 0; j < DISPLAY_WIDTH; j++) {
			// dungeonCoordinates: make sure the i,j pair is in the bounds of the dungeon tiles
			if (topleft.y + i >= 0 && 
				topleft.x + j >= 0 &&
				topleft.y + i < dungeon.tiles.length &&
			 	topleft.x + j < dungeon.tiles[topleft.y + i].length) {

					var tile = dungeon.tiles[topleft.y + i][topleft.x + j];
					
					if (tile.entities.peek() == player || (topleft.y + i == player.y && topleft.x + j == player.x)) {
						windows[SCREEN_GAME].screen.pixels[i][j].char = '@';
						windows[SCREEN_GAME].screen.pixels[i][j].font = FONT_STYLE_DEFAULT;
						windows[SCREEN_GAME].screen.pixels[i][j].color = COLOR_DEFAULT;
						windows[SCREEN_GAME].screen.pixels[i][j].hasShield = player.isShielded();
						continue;
					}

					var styleObj = dungeon.tiles[topleft.y + i][topleft.x + j].getCharInfo();
					windows[SCREEN_GAME].screen.pixels[i][j].color = styleObj.color;
					windows[SCREEN_GAME].screen.pixels[i][j].char = styleObj.char;
					windows[SCREEN_GAME].screen.pixels[i][j].font = styleObj.font;

					if (typeof styleObj.flipChar !== 'undefined') {						
						windows[SCREEN_GAME].screen.pixels[i][j].flipColor = styleObj.flipColor;
						windows[SCREEN_GAME].screen.pixels[i][j].flipChar = styleObj.flipChar;
						windows[SCREEN_GAME].screen.pixels[i][j].flipFont = styleObj.flipFont;

						flipping = true;
					}

					// draw hp bar
					if (styleObj.hasHp) {
						windows[SCREEN_GAME].screen.pixels[i][j].hasHp = true;
						windows[SCREEN_GAME].screen.pixels[i][j].hpPercent = styleObj.hp;
					}

					// if the tile has our target on it, draw it inverted
					if (styleObj.invert)
						pixelEffects.push({type:PIXEL_INVERT, x:j, y:i});

					// draw shield
					windows[SCREEN_GAME].screen.pixels[i][j].hasShield = styleObj.hasShield;

					visitTiles.push(tile);
			} else
				windows[SCREEN_GAME].screen.pixels[i][j].char = ' ';
		}
	}

	// we have to do this after we draw all the tiles first
	for (var i = visitTiles.length - 1; i >= 0; i--)
		visitTiles[i].visit();
}

function resetTiles () {
	// dungeonCoordinates: get top left corner of visible map from player position
	var topleft = {x:Math.round(player.x - DISPLAY_WIDTH / 2),
				   y:Math.round(player.y - DISPLAY_HEIGHT / 2)};

	// visit all the tiles after we draw them
	var visitTiles = [];

	// AbsoluteCoordinates: iterate through x and y of screen pixels
	for (var i = 0; i < DISPLAY_HEIGHT; i++) {
		for (var j = 0; j < DISPLAY_WIDTH; j++) {
			// dungeonCoordinates: make sure the i,j pair is in the bounds of the dungeon tiles
			if (topleft.y + i >= 0 && 
				topleft.x + j >= 0 &&
				topleft.y + i < dungeon.tiles.length &&
			 	topleft.x + j < dungeon.tiles[topleft.y + i].length) {
					var tile = dungeon.tiles[topleft.y + i][topleft.x + j];
					visitTiles.push(tile);
			}
		}
	}

	// we have to do this after we draw all the tiles first
	for (var i = visitTiles.length - 1; i >= 0; i--)
		visitTiles[i].visit();
}

function getScore() {
	// something like this
	var score = player.xp / gameTicks;
	// modify given any difficulty things
	if (hardMode)
		score *= 1.5;
	return score;
}