var hash = 0;
function Enemy (pos, name, hp, baseDmg, accuracy, baseXp, char, faction, statuses, items) {
	this.type = ENTITY_ENEMY;
	this.name = name;
	this.x = pos.x;
	this.y = pos.y;
	this.hpMax = hp;
	this.hp = hp;
	this.baseXp = baseXp;

	this.baseDamage = baseDmg;
	this.accuracy = accuracy;

	this.char = char;
	this.color = COLOR_FACTIONS_POWERED[faction];
	this.solid = true;
	this.opaque = false;
	this.animate = true;
	this.hash = hash++;
	// a fix needed for the drawEnemyLog
	this.discovered = true;
	this.visible = false;
	this.statuses = statuses;
	this.faction = faction;
	this.destination = DESTINATION_NONE;
	this.inventory = [];

	for (var i = items.length - 1; i >= 0; i--) {
		var item = items[i];
		this.inventory.push(item);
		if (item.canBeEquipped())
			item.equip(this);
	}

	this.applyStatuses = function () {
		for (var i = 0; i < this.statuses.length; i++) {
			var status = this.statuses[i];
			// apply status
			if (status.type == STATUS_BLEEDING) {
				// bleeding does 5% of maxHP per turn				
				var bleeding_dmg = Math.max(Math.round(this.hpMax * .1), 1);
				// deal it as true damage
				this.hp -= 100;
				if (this.hp <= 0) {
					this.kill(dungeon.tiles[this.y][this.x], status.originator);
				}
			}

			// increment
			if (status.ticksRemaining == 0)
				this.statuses.splice(i,1);
			else
				status.ticksRemaining--;
		}
	}

	// if 'statusing' the enemy, set his current status to 
	// the given amount of ticks if it has less than
	// the given amount of ticks. Otherwise add the status
	this.addStatus = function(statusType, duration, originator) {
		for (var i = this.statuses.length - 1; i >= 0; i--) {
			var status = this.statuses[i];
			if (status.type == statusType && status.ticksRemaining <= duration) {
				status.ticksRemaining = duration;
				return;
			}
		}

		this.statuses.push({type:statusType, ticksRemaining:duration, originator:originator});
	}
	
	this.getThreatLevel = function(character) {
		return - Math.sqrt(Math.pow(this.x - character.x,2) + Math.pow(this.y - character.y,2)) + 10 * (1 - this.hp/this.hpMax);
	}

	this.getPowerLevel = function() {
		return this.hpMax * this.baseDamage;		
	}

	this.canMove = function() {
		for (var i = this.statuses.length - 1; i >= 0; i--) {
			if (this.statuses[i].type == STATUS_STUNNED)
				return false;
		}
		// can't move if you're dead
		return this.hp > 0;
	}

	this.canAttack = function() {
		return true;
	}

	this.attack = function(other) {
		dealDamage(this, this.baseDamage, other);
	}

	this.getRoom = function() {
		var roomPos = {x: mapXMin + Math.round((this.x - (ROOM_CELL_LENGTH - 1)/ 2) / ROOM_CELL_LENGTH),
					   y: mapYMin + Math.round((this.y - (ROOM_CELL_LENGTH - 1)/ 2) / ROOM_CELL_LENGTH)};
		var room = minimap[roomPos.y][roomPos.x];
		return room;
	}

	this.getDmg = function() {
		var result = Math.max(1, Math.round(this.baseDamage * Math.random()));

		if (Math.random() < this.accuracy)
			result = 0;

		return result;
	}

	this.takeDamage = function(amount, attacker) {
		this.hp -= amount;
		if (this.hp <= 0)
			this.kill(dungeon.tiles[this.y][this.x], attacker);
	}

	this.kill = function(tile, killer) {
		killer.addKillXp(this.baseXp);
		var powerLevel = this.getPowerLevel();
		var dropItem = generateLoot(powerLevel);
		// remove ourselves from any lists
		dungeon.npcs.setRemove(this);
		factions[this.faction].units.setRemove(this);
		switch(this.name) {
			case NAME_ANT: factions[FACTION_ANIMAL].antCount--; break;
			case NAME_DOG: factions[FACTION_ANIMAL].dogCount--; break;
			case NAME_MONKEY: factions[FACTION_ANIMAL].monkeyCount--; break;
			case NAME_GORILLA: factions[FACTION_ANIMAL].gorillaCount--; break;
			case NAME_WANDERER: factions[FACTION_SURVIVOR].wandererCount--; break;
			case NAME_MARAUDER: factions[FACTION_SURVIVOR].marauderCount--; break;
			case NAME_TECHIE: factions[FACTION_SURVIVOR].techieCount--; break;
			case NAME_WAR_BOSS: factions[FACTION_SURVIVOR].warBossCount--; break;
		}
		// is this truely the end? Are we all just a baseline function call between
		// existence and history?
		tile.entities.remove(this);
		// if we are to drop an item, drop it
		if (dropItem != ITEM_NONE) {
			// if we are in eyesight of the player, it starts as discovered
			if (traceLine(player, this, dungeon.tiles))
				dropItem.discoverd = true;
			tile.entities.push(dropItem);
		}
	}

	this.addKillXp = function(amount) {
		// default for enemies
	}

	this.addCombatExperience = function() {
		// default for enemies
	}
}

function doEnemyTurns() {
	for (var i = dungeon.npcs.length - 1; i >= 0; i--) {
		var enemy = dungeon.npcs[i];
		
		// skip generator blocks
		if (!enemy.animate)
			continue;

		enemy.applyStatuses();

		if (!enemy.canMove())
			continue;
		
		var enemyPos = {x: enemy.x, y: enemy.y};
		var currentTile = dungeon.tiles[enemyPos.y][enemyPos.x];

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
			candidates.sort(function(a,b) {return b.getThreatLevel(enemy) - a.getThreatLevel(enemy)});
			destination = candidates[0];
			npcDestination = true;
		}

		var dx = Math.abs(enemyPos.x - destination.x);
		var dy = Math.abs(enemyPos.y - destination.y);
		if (npcDestination) {
			if (dx <= 1 && dy <= 1 && enemy.canAttack()) {
				dealDamage(enemy, enemy.getDmg(), destination);
				disputeRoom(enemy);
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
			// if we reached our destination via smart moving
			if (newTile.getSolid()) {
				// if there is something in our way thats an obstacle, hit it
				if (enemy.canAttack() && newTile.entities.peek().obstacle)
					dealDamage(enemy, enemy.getDmg(), newTile.entities.peek());
				else {
					enemy.destination = DESTINATION_NONE;
					room.unitsEnroute.setRemove(enemy);					
				}
			} else if (newPos.x == destination.x && newPos.y == destination.y) {
				enemy.destination = DESTINATION_NONE;
				room.unitsEnroute.setRemove(enemy);
			// otherwise do the move
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
		disputeRoom(enemy);
	}
}

function disputeRoom(enemy) {
	var inRoom = dungeon.tiles[enemy.y][enemy.x].inRoom;

	var roomPos = {x: mapXMin + Math.round((enemy.x - (ROOM_CELL_LENGTH - 1)/ 2) / ROOM_CELL_LENGTH), 
			       y: mapYMin + Math.round((enemy.y - (ROOM_CELL_LENGTH - 1)/ 2) / ROOM_CELL_LENGTH)};

	var roomSegment = minimap[roomPos.y][roomPos.x];
	var room = roomLookup[roomSegment.hash];

	if (inRoom && room.isRoom) {

		var existingRoom = false;
		for (var i = disputedRooms.length - 1; i >= 0; i--) {
			existingRoom |= disputedRooms[i].hash == room.hash;
		}

		if (enemy.faction != FACTION_NONE || existingRoom) {
			room.units.push(enemy);
			disputedRooms.refSetAdd(room);
		}
	}
}

function spawn(roomPos, enemyType) {
	var adjustedPos = {x: roomPos.x - mapXMin, y: roomPos.y - mapYMin};
	var wallLength = ROOM_CELL_LENGTH - 2;
	var roomCenter = {x: (ROOM_CELL_LENGTH - 1)/ 2 + (adjustedPos.x * ROOM_CELL_LENGTH), y: (ROOM_CELL_LENGTH - 1)/ 2 + (adjustedPos.y * ROOM_CELL_LENGTH)};
	// northwest corner floorpiece of our current room
	var roomTopLeft = {x: roomCenter.x - (ROOM_CELL_LENGTH - 1)/ 2 + 1, y: roomCenter.y - (ROOM_CELL_LENGTH - 1)/ 2 + 1};
	var innerTopLeft = {x: roomTopLeft.x + 1, y: roomTopLeft.y + 1};
	// var find an open spot in room
	var candidates = [];
	for (var l = wallLength - 3; l >= 0; l--) {
		for (var m = wallLength - 3; m >= 0; m--) {
			if (!dungeon.tiles[innerTopLeft.y + l][innerTopLeft.x + m].getSolid()) {
				candidates.push({x:innerTopLeft.x + m, y:innerTopLeft.y + l});
			}
		}
	}
	var pos = candidates.popRandom();
	// add new enemy of that type
	var enemy = MakeEnemy(enemyType, pos, [{type:STATUS_STUNNED, ticksRemaining:1, originator:null}]);
	enemy.ticks = gameTicks;
	dungeon.tiles[pos.y][pos.x].entities.push(enemy);
	dungeon.npcs.push(enemy);
	return enemy;
}

var DESTINATION_NONE = 'wander';
function MakeEnemy(type, pos, statuses) {
	var hp;
	var dmg;
	var xp;
	var faction;
	var char;
	var items = [];
	var accuracy;
	switch(type) {
		case NAME_ANT:
		factions[FACTION_ANIMAL].antCount++;
		hp = 5 + Math.round(gameTicks/100);
		accuracy = .8;
		dmg = 1 + Math.round(gameTicks/400);
		xp = 3 + Math.round(gameTicks/400);
		faction = FACTION_ANIMAL;
		char = 'a';
		break;
		case NAME_DOG:
		factions[FACTION_ANIMAL].dogCount++;
		hp = 10 + Math.round(gameTicks/100);
		accuracy = .6;
		dmg = 2 + Math.round(gameTicks/400);
		xp = 8 + Math.round(gameTicks/400);
		faction = FACTION_ANIMAL;
		char = 'd';
		break;
		case NAME_MONKEY:
		factions[FACTION_ANIMAL].monkeyCount++;
		hp = 10 + Math.round(gameTicks/100);
		accuracy = .6;
		dmg = 2 + Math.round(gameTicks/400);
		xp = 12 + Math.round(gameTicks/400);
		faction = FACTION_ANIMAL;
		char = 'm';
		break;
		case NAME_GORILLA:
		factions[FACTION_ANIMAL].gorillaCount++;
		hp = 25 + Math.round(gameTicks/100);
		accuracy = .6;
		dmg = 5 + Math.round(gameTicks/400);
		xp = 25 + Math.round(gameTicks/400);
		faction = FACTION_ANIMAL;
		char = 'G';
		break;
		case NAME_WANDERER:
		factions[FACTION_SURVIVOR].wandererCount++;
		hp = 6 + Math.round(gameTicks/100);
		accuracy = .6;
		dmg = 1 + Math.round(gameTicks/400);
		xp = 4 + Math.round(gameTicks/400);
		faction = FACTION_SURVIVOR;
		char = 'w';
		break;
		case NAME_MARAUDER:
		factions[FACTION_SURVIVOR].marauderCount++;
		hp = 14 + Math.round(gameTicks/100);
		accuracy = .7;
		dmg = 3 + Math.round(gameTicks/400);
		xp = 12 + Math.round(gameTicks/400);
		faction = FACTION_SURVIVOR;
		char = 'M';
		break;
		case NAME_TECHIE:
		factions[FACTION_SURVIVOR].techieCount++;
		hp = 13 + Math.round(gameTicks/100);
		accuracy = .5;
		dmg = 2 + Math.round(gameTicks/400);
		xp = 13 + Math.round(gameTicks/400);
		faction = FACTION_SURVIVOR;
		char = 'C';
		break;
		case NAME_WAR_BOSS:
		factions[FACTION_SURVIVOR].warBossCount++;
		hp = 18 + Math.round(gameTicks/100);
		accuracy = .8;
		dmg = 5 + Math.round(gameTicks/400);
		xp = 28 + Math.round(gameTicks/400);
		faction = FACTION_SURVIVOR;
		char = 'W';
		break;
		case NAME_RAT:
		hp = 7;
		accuracy = .7;
		dmg = 2;
		xp = 8;
		faction = FACTION_NONE;
		char = 'r';
		break;
		case NAME_TRASH_BOT:
		hp = 10;
		accuracy = .8;
		dmg = 1;
		xp = 6;
		faction = FACTION_NONE;
		char = 't';
		break;
		case NAME_WEED:
		hp = 15;
		accuracy = .5;
		dmg = 3;
		xp = 14;
		faction = FACTION_NONE;
		char = 'w';
		break;
		case NAME_TYPO:
		hp = 5;
		accuracy = .4;
		dmg = 3;
		xp = 6;
		faction = FACTION_NONE;
		char = 'y';
		break;
	}
	return new Enemy(pos, type, hp, dmg, accuracy, xp, char, faction, statuses, items);
}

function getNearbyUnits(unit) {
	var results = [];
	var pos = {x: unit.x, y:unit.y};
	for (var i = dungeon.npcs.length - 1; i >= 0; i--) {
		var npc = dungeon.npcs[i];
		var distance = Math.sqrt(Math.pow((npc.x - pos.x), 2) + Math.pow((npc.y - pos.y), 2));
		if (distance <= unit.range && unit.faction != npc.faction)
			results.push(npc);
	}
	return results;
}

function getNearbyUnitsInSight(unit) {
	var results = [];
	var tempResults = [];
	var pos = {x: unit.x, y:unit.y};
	for (var i = dungeon.npcs.length - 1; i >= 0; i--) {
		var npc = dungeon.npcs[i];
		var distance = Math.sqrt(Math.pow((npc.x - pos.x), 2) + Math.pow((npc.y - pos.y), 2));
		if (distance <= unit.range && unit.faction != npc.faction)
			tempResults.push(npc);
	}

	for (var i = tempResults.length - 1; i >= 0; i--) {
		var dest = tempResults[i];
		// see if you can route to it
		if (traceLine(pos, dest, dungeon.tiles))
			results.push(tempResults[i]);
	}

	return results;
}