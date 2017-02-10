// generic units
var NAME_NIGHT_GAURD = "defend-o";

var factions = {'unclaimed' : new faction_none()};
var FACTION_CLONES = "clones";
var FACTION_NONE = "unclaimed";
var FACTION_ANIMAL = "animal";
var FACTION_SOFTWARE = "software";
var FACTION_ROBOT = "robot";
var FACTION_SURVIVOR = "survivor";
var FACTION_HIVEMIND = "hivemind";
var FACTIONS = [FACTION_ANIMAL, FACTION_SURVIVOR];
// factionless units
var NAME_RAT = "rat";
var NAME_TRASH_BOT = "trashbot";
var NAME_WEED = "killer weed";
var NAME_TYPO = "typo";
var STARTING_UNITS = [NAME_RAT, NAME_TRASH_BOT, NAME_WEED, NAME_TYPO];
// animal units
var NAME_ANT = "ant";
var NAME_DOG = "dog";
var NAME_MONKEY = "monkey";
var NAME_GORILLA = "gorilla";
// software units
var NAME_BUG = "bug";
var NAME_GLITCH = "glitch";
var NAME_TROJAN = "trojan";
var NAME_ZERO_DAY = "ZeroDay";
// robot units
var NAME_BUTLER = "robobutler";
var NAME_CHEF = "robochef";
var NAME_MECHANIC = "robomechanic";
var NAME_SECUROTRON = "securotron";
// survivor units
var NAME_WANDERER = "wanderer";
var NAME_MARAUDER = "marauder";
var NAME_TECHIE = "techie";
var NAME_WAR_BOSS = "WarBoss";
// hivemind units
var NAME_GOO = "goo";
var PRICES = {ant:2, dog:5, monkey:7, gorilla:15,
			  bug:3, glitch:7, trojan:12, ZeroDay:14,
			  robobutler:2, robochef:5, robotmechanic:7, securotron:12,
			  wanderer:2, marauder:5, techie:8, WarBoss:18,
			  goo:5
			 };

function faction_clones(pos, wealth, tiles) {
	this.pos = pos;
	this.roomsCaptured = 0;
	this.wealth = wealth;
	this.power = 0;
	this.wpt = 1;
	this.ppt = 1;
	this.units = [];

	// put some defenses in
	var sentryTiles = [];
	var roomCenter = {x: (ROOM_CELL_LENGTH - 1)/ 2 + ((pos.x - mapXMin) * ROOM_CELL_LENGTH),
				      y: (ROOM_CELL_LENGTH - 1)/ 2 + ((pos.y - mapYMin) * ROOM_CELL_LENGTH)};
	// put the corners into the array
	sentryTiles.push({x: roomCenter.x - 4, y: roomCenter.y - 4});
	sentryTiles.push({x: roomCenter.x - 4, y: roomCenter.y + 4});
	sentryTiles.push({x: roomCenter.x + 4, y: roomCenter.y - 4});
	sentryTiles.push({x: roomCenter.x + 4, y: roomCenter.y + 4});
	for (var i = sentryTiles.length - 1; i >= 0; i--) {
		var pos = sentryTiles[i];
		var sentry = new entity_hq_sentry(pos);

		var tile = tiles[pos.y][pos.x];
		tile.entities.push(sentry);

		this.units.push(sentry);
	}

	this.doTurn = function() {
		// this.spendWealth();
		this.directUnits();
	}

	this.directUnits = function() {
		for (var i = this.units.length - 1; i >= 0; i--) {
			var unit = this.units[i];
			if (unit.type == NAME_HQ_SENTRY) {
				// get units in view
				var enemys = getNearbyUnitsInSight(unit);
				if (enemys.length == 0)
					continue;
				// pick biggest one
				var mostThreatening;
				for (var i = enemys.length - 1; i >= 0; i--) {
					if (mostThreatening == null || enemys[i].getThreat() > mostThreatening.getThreat())
						mostThreatening = enemys[i];
				}
				// FIRE
				fight(unit, mostThreatening);
			}
		}
	}

	this.do4XTurn = function() {
		this.power += this.ppt;
		this.wealth += this.wpt;
	}
}

function faction_animal(pos) {
	this.pos = pos;
	this.roomsCaptured = 0;
	this.wealth = 5;
	this.power = 0;
	this.wpt = 1;
	this.ppt = 0;
	this.units = [];
	this.antCount = 0;
	this.dogCount = 0;
	this.monkeyCount = 0;
	this.gorillaCount = 0;

	this.doTurn = function() {
		this.spendWealth();
		this.directUnits();
	}

	this.spendWealth = function() {
		var RoomsCaptured = this.roomsCaptured;
		var RoomsTotal = dungeon.roomTotal;
		var RoomRatio = RoomsCaptured/RoomsTotal;
		var WPT = this.wpt;
		var PPT = this.ppt;
		var antCnt = this.antCount;
		var dogCnt = this.dogCount;
		var monCnt = this.monkeyCount;
		var gorCnt = this.gorillaCount;
		var MeleeRatio = antCnt + dogCnt + gorCnt == 0 ? 1 : monCnt/(antCnt + dogCnt + gorCnt);
		var UnitTotal = antCnt + dogCnt + monCnt + gorCnt;

		var valueArray = [];
		valueArray.push({name:NAME_ANT, value:35 - UnitTotal + 20 * -RoomRatio + Math.exp(-(WPT - 10)/4)});
		valueArray.push({name:NAME_DOG, value:38 + 5 * -RoomRatio - .18*WPT - 0.8*UnitTotal});
		valueArray.push({name:NAME_MONKEY, value:- 5 + 20 * RoomRatio + WPT * 0.9 + 10 * (1 - MeleeRatio) + UnitTotal});
		valueArray.push({name:NAME_GORILLA, value: - 5 + 20 * RoomRatio +  WPT * 1.04 + UnitTotal * 1.1});

		valueArray.sort(function(a, b){return b.value-a.value});

		var choice = valueArray[0].name;
		if (PRICES[choice] <= this.wealth) {
			this.wealth -= PRICES[choice];
			this.units.push(spawn(this.pos, choice));
		}
	}

	this.directUnits = function() {
		// don't run if we have no free units
		var run = false;
		for (var i = this.units.length - 1; i >= 0; i--) {
			if (this.units[i].destination == DESTINATION_NONE) {
				run = true;
			}
		}
		if (!run)
			return;
		// for every room calculate a value of sending a unit there
		var rooms = [];
		for (var i = minimap.length - 1; i >= 0; i--) {
			for (var j = minimap[i].length - 1; j >= 0; j--) {
				// if the room is empty then continue onto the next
				if (minimap[i][j].hash == 0)
					continue;

				var cont = false;
				for (var k = rooms.length - 1; k >= 0; k--) {
					if (rooms[k].room.hash == minimap[i][j].hash) {
						cont = true;
						break;
					}
				}

				if (cont)
					continue;

				var room = roomLookup[minimap[i][j].hash];
				var value = 0;
				for (var k = room.unitsEnroute.length - 1; k >= 0; k--) {
					value -= PRICES[room.unitsEnroute[k].name];
				}
				// distance, closer is better
				var distance = Math.abs(this.pos.x - j) + Math.abs(this.pos.y - i);
				value -= distance;
				// resources, wpt
				value += room.wpt/room.size;
				// faction, if not ours and weak, good, if not ours and strong bad, if empty alright
				value += room.faction == FACTION_ANIMAL ? 0 : 20;
				// faction, if ours and enemy presence and weak good, if strong, iono
				// value += room.targetFaction != FACTION_ANIMAL && room.faction != FACTION_ANIMAL ? 10 : 0;
				// enemy presence
				// ?
				// the center of our room in the megamap coords
				var adjustedPos = {x: j - mapXMin, y: i - mapYMin};
				var roomCenter = {x: (ROOM_CELL_LENGTH - 1)/ 2 + (adjustedPos.x * ROOM_CELL_LENGTH), y: (ROOM_CELL_LENGTH - 1)/ 2 + (adjustedPos.y * ROOM_CELL_LENGTH)};

				rooms.push({room:room, value:value, roomCenter:roomCenter});
			}
		}
		// sort by value
		rooms.sort(function(a,b) {return b.value - a.value});
		// for every unit, send to the most valuable then deduct the value of sending a unit there by the units value
		for (var i = this.units.length - 1; i >= 0; i--) {
			var unit = this.units[i];
			// only direct the ones without destinations
			if (unit.destination != DESTINATION_NONE || (roomLookup[unit.getRoom().hash].faction != FACTION_ANIMAL && dungeon.tiles[unit.y][unit.x].inRoom)) {
				continue;
			}
			// pick room with biggest need
			// send there
			// console.log("Sending " + unit.name + unit.hash + " to x:" + rooms[0].roomCenter.y + "y:" + rooms[0].roomCenter.y)
			unit.destination = rooms[0].roomCenter;
			rooms[0].value -= PRICES[unit.name];
			rooms[0].room.unitsEnroute.push(unit);
			// resort
			rooms.sort(function(a,b) {return b.value - a.value});
		}
	}

	this.do4XTurn = function() {
		this.wealth += this.wpt;
	}
}

function faction_software(pos) {
	this.pos = pos;
	this.roomsCaptured = 0;
	this.wealth = 5;
	this.power = 0;
	this.wpt = 1;
	this.ppt = 0;
	this.units = [];

	this.doTurn = function() {
		this.spendWealth();
		this.directUnits();
	}

	this.spendWealth = function() {
		var valueArray = [];
		valueArray.push({name:NAME_BUG, value: 1});
		valueArray.push({name:NAME_GLITCH, value: 0});
		valueArray.push({name:NAME_ZERO_DAY, value: 0});
		valueArray.push({name:NAME_TROJAN, value: 0});

		valueArray.sort(function(a, b){return b.value-a.value});

		var choice = valueArray[0].name;
		if (PRICES[choice] <= this.wealth) {
			this.wealth -= PRICES[choice];
			this.units.push(spawn(this.pos, choice));
		}
	}

	this.directUnits = function() {

	}

	this.do4XTurn = function() {
		this.wealth += this.wpt;
	}
}

function faction_robot(pos) {
	this.pos = pos;
	this.roomsCaptured = 0;
	this.wealth = 5;
	this.power = 0;
	this.wpt = 1;
	this.ppt = 0;
	this.units = [];

	this.doTurn = function() {
		this.spendWealth();
		this.directUnits();
	}

	this.spendWealth = function() {
		var valueArray = [];
		valueArray.push({name:NAME_BUTLER, value: 1});
		valueArray.push({name:NAME_CHEF, value: 0});
		valueArray.push({name:NAME_MECHANIC, value: 0});
		valueArray.push({name:NAME_SECUROTRON, value: 0});

		valueArray.sort(function(a, b){return b.value-a.value});

		var choice = valueArray[0].name;
		if (PRICES[choice] <= this.wealth) {
			this.wealth -= PRICES[choice];
			this.units.push(spawn(this.pos, choice));
		}
	}

	this.directUnits = function() {

	}

	this.do4XTurn = function() {
		this.wealth += this.wpt;
	}
}

function faction_survivor(pos) {
	this.pos = pos;
	this.roomsCaptured = 0;
	this.wealth = 5;
	this.power = 0;
	this.wpt = 1;
	this.ppt = 0;
	this.units = [];
	this.wandererCount = 0;
	this.marauderCount = 0;
	this.techieCount = 0;
	this.warBossCount = 0;

	this.doTurn = function() {
		this.spendWealth();
		this.directUnits();
	}

	this.spendWealth = function() {
		var RoomsCaptured = this.roomsCaptured;
		var RoomsTotal = dungeon.roomTotal;
		var RoomRatio = RoomsCaptured/RoomsTotal;
		var WPT = this.wpt;
		var PPT = this.ppt;
		var wandererCount = this.wandererCount;
		var marauderCount = this.marauderCount;
		var techieCount = this.techieCount;
		var warBossCount = this.warBossCount;
		var TechieRatio = marauderCount == 0 ? 1 : techieCount / marauderCount;
		var UnitTotal = wandererCount + marauderCount + techieCount + warBossCount;

		var valueArray = [];
		valueArray.push({name:NAME_WANDERER, value: (1 - RoomRatio) + (8 - WPT) + (5 - 2 * UnitTotal)});
		valueArray.push({name:NAME_MARAUDER, value: (WPT * .4) + (UnitTotal * 0.6 + 0.1)});
		valueArray.push({name:NAME_TECHIE, value: (WPT * .4) + ((1 - TechieRatio) * 2) + (UnitTotal * 0.6)});
		valueArray.push({name:NAME_WAR_BOSS, value: (WPT * 0.5 - 3) + (UnitTotal - warBossCount * 6)});

		valueArray.sort(function(a, b){return b.value-a.value});

		// console.log("Survivors: WPT:" + WPT + ", PPT:" + PPT + ", Wealth:" + this.wealth + ", UnitTotal:" + UnitTotal + ", RoomsCaptured:" + RoomsCaptured);

		var choice = valueArray[0].name;
		// console.log("Survivors: want a " + choice);
		if (PRICES[choice] <= this.wealth) {
			this.wealth -= PRICES[choice];
			// console.log("Survivors: buying a " + choice);
			this.units.push(spawn(this.pos, choice));
		}
	}

	this.directUnits = function() {
		// don't run if we have no free units
		var run = false;
		for (var i = this.units.length - 1; i >= 0; i--) {
			if (this.units[i].destination == DESTINATION_NONE) {
				run = true;
			}
		}
		if (!run)
			return;
		// for every room calculate a value of sending a unit there
		var rooms = [];
		for (var i = minimap.length - 1; i >= 0; i--) {
			for (var j = minimap[i].length - 1; j >= 0; j--) {
				// if the room is empty then continue onto the next
				if (minimap[i][j].hash == 0)
					continue;

				var cont = false;
				for (var k = rooms.length - 1; k >= 0; k--) {
					if (rooms[k].room.hash == minimap[i][j].hash) {
						cont = true;
						break;
					}
				}

				if (cont)
					continue;

				var room = roomLookup[minimap[i][j].hash];
				var value = 0;
				for (var k = room.unitsEnroute.length - 1; k >= 0; k--) {
					value -= PRICES[room.unitsEnroute[k].name];
				}
				// distance, closer is better
				var distance = Math.abs(this.pos.x - j) + Math.abs(this.pos.y - i);
				value -= distance;
				// resources, wpt
				value += room.wpt/room.size;
				// faction, if not ours and weak, good, if not ours and strong bad, if empty alright
				value += room.faction == FACTION_SURVIVOR ? 0 : 20;
				// faction, if ours and enemy presence and weak good, if strong, iono
				// value += room.targetFaction != FACTION_ANIMAL && room.faction != FACTION_ANIMAL ? 10 : 0;
				// enemy presence
				// ?
				// the center of our room in the megamap coords
				var adjustedPos = {x: j - mapXMin, y: i - mapYMin};
				var roomCenter = {x: (ROOM_CELL_LENGTH - 1)/ 2 + (adjustedPos.x * ROOM_CELL_LENGTH), y: (ROOM_CELL_LENGTH - 1)/ 2 + (adjustedPos.y * ROOM_CELL_LENGTH)};

				rooms.push({room:room, value:value, roomCenter:roomCenter});
			}
		}
		// sort by value
		rooms.sort(function(a,b) {return b.value - a.value});
		// for every unit, send to the most valuable then deduct the value of sending a unit there by the units value
		for (var i = this.units.length - 1; i >= 0; i--) {
			var unit = this.units[i];
			// only direct the ones without destinations
			if (unit.destination != DESTINATION_NONE || (roomLookup[unit.getRoom().hash].faction != FACTION_SURVIVOR && dungeon.tiles[unit.y][unit.x].inRoom)) {
				continue;
			}
			// pick room with biggest need
			// send there
			// console.log("Sending " + unit.name + unit.hash + " to x:" + rooms[0].roomCenter.y + "y:" + rooms[0].roomCenter.y)
			unit.destination = rooms[0].roomCenter;
			rooms[0].value -= PRICES[unit.name];
			rooms[0].room.unitsEnroute.push(unit);
			// resort
			rooms.sort(function(a,b) {return b.value - a.value});
		}
	}

	this.do4XTurn = function() {
		this.wealth += this.wpt;
	}
}

function faction_hivemind(pos) {
	this.pos = pos;
	this.roomsCaptured = 0;
	this.wealth = 5;
	this.power = 0;
	this.wpt = 1;
	this.ppt = 0;
	this.units = [];

	this.doTurn = function() {
		this.spendWealth();
		this.directUnits();
	}

	this.spendWealth = function() {
		var valueArray = [];
		valueArray.push({name:NAME_GOO, value: 1});

		valueArray.sort(function(a, b){return b.value-a.value});

		var choice = valueArray[0].name;
		if (PRICES[choice] <= this.wealth) {
			this.wealth -= PRICES[choice];
			this.units.push(spawn(this.pos, choice));
		}
	}

	this.directUnits = function() {

	}

	this.do4XTurn = function() {
		this.wealth += this.wpt;
	}
}

function faction_none() {
	this.units = [];
	this.doTurn = function() {}
	this.directUnits = function() {}
	this.spendWealth = function() {}
	this.do4XTurn = function() {}
}

function doFactionTurns() {
	for (var faction in factions) {
		factions[faction].doTurn();
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
	var enemy = MakeEnemy(enemyType, pos, [{statusType:STATE_STUNNED, ticksRemaining:1}]);
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
	this.color = COLOR_FACTIONS_UNPOWERED[faction];
	this.solid = true;
	this.opaque = false;
	this.hash = hash++;
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
			if (this.statuses[i].ticksRemaining == 0)
				this.statuses.splice(i,1);
			else
				this.statuses[i].ticksRemaining--;
		}
	}

	this.getThreat = function() {
		return this.hpMax * this.baseDamage;
	}

	this.canMove = function() {
		for (var i = this.statuses.length - 1; i >= 0; i--) {
			if (this.statuses[i].statusType == STATE_STUNNED)
				return false;
		}
		return true;
	}

	this.canAttack = function() {
		return true;
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
		var threatLevel = this.getThreat();
		var dropItem = generateLoot(threatLevel);
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
		tile.entities.pop();
		// if we are to drop an item, drop it
		if (dropItem != ITEM_NONE)
			tile.entities.push(dropItem);
	}

	this.addKillXp = function(amount) {
		// default for enemies
	}

	this.addCombatExperience = function() {
		// default for enemies
	}
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