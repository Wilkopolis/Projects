// generic units
var NAME_NIGHT_GAURD = "defend-o";

var factions = {};
var FACTION_CLONES = "clones";
var FACTION_NONE = "unclaimed";
var FACTION_ANIMAL = "animal";
var FACTION_SOFTWARE = "software";
var FACTION_ROBOT = "robot";
var FACTION_SURVIVOR = "survivor";
var FACTION_HIVEMIND = "hivemind";
var FACTIONS = [FACTION_SOFTWARE];
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
var NAME_GLITCH_1 = "glitch1";
var NAME_GLITCH_2 = "glitch2";
var NAME_GLITCH_3 = "glitch3";
var glitches = [NAME_GLITCH_1, NAME_GLITCH_2, NAME_GLITCH_3];
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
var NAME_LACKEY = "Lackey";
// hivemind units
var NAME_GOO = "goo";
var PRICES = {ant:2, dog:5, monkey:7, gorilla:15,
			  bug:3, glitch:7, trojan:12, ZeroDay:14,
			  robobutler:2, robochef:5, robotmechanic:7, securotron:12,
			  wanderer:2, marauder:5, techie:8, WarBoss:18,
			  goo:10,
			  rat:2, trashbot:3, 'killer weed':5, typo:4
			 };

var TROJAN_ENEMY_TYPES = [NAME_RAT,NAME_TRASH_BOT,NAME_WEED,NAME_TYPO,NAME_ANT,
NAME_DOG,NAME_MONKEY,NAME_BUG,NAME_GLITCH,NAME_TROJAN,NAME_BUTLER,NAME_CHEF,
NAME_MECHANIC,NAME_WANDERER,NAME_MARAUDER,NAME_TECHIE];

function faction_clones(pos, wealth) {
	this.pos = pos;
	this.roomsCaptured = 1;
	this.wealth = wealth;
	this.power = 0;
	this.wpt = 1;
	this.units = [];

	this.doTurn = function() {
		this.spendWealth();
		this.directUnits();
	}

	this.directUnits = function() {
		
	}

	this.spendWealth = function() {

	}

	this.do4XTurn = function() {
		var amount = Math.round(this.wealth * .25);
		this.wealth += this.wpt;
		if (player.skills.skillObject[SKILL_ROTH_IRA].purchased)
			this.wealth += amount;
	}
}

function faction_animal(pos) {
	this.pos = pos;
	this.roomsCaptured = 1;
	this.wealth = 5;
	this.power = 0;
	this.wpt = 1;
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
				if (minimap[i][j].hash == 0 || !roomLookup[minimap[i][j].hash].isRoom)
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
					if (room.unitsEnroute[k].faction == FACTION_ANIMAL)
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
			if (unit.destination != DESTINATION_NONE || (unit.getRoom().faction != FACTION_ANIMAL && dungeon.tiles[unit.y][unit.x].inRoom)) {
				continue;
			}
			// pick room with biggest need
			// send there
			// console.log("Sending " + unit.name + unit.hash + " to x:" + rooms[0].roomCenter.y + "y:" + rooms[0].roomCenter.y)
			unit.destination = rooms[0].roomCenter;
			unit.destinationRoom = rooms[0].room;
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
	this.roomsCaptured = 1;
	this.wealth = 5;
	this.power = 0;
	this.wpt = 1;
	this.units = [];
	this.bugCount = 0;
	this.glitchCount = 0;
	this.trojanCount = 0;
	this.zeroDayCount = 0;

	this.doTurn = function() {
		this.spendWealth();
		this.directUnits();
	}
	
	this.spendWealth = function() {
		var RoomsCaptured = this.roomsCaptured;
		var RoomsTotal = dungeon.roomTotal;
		var RoomRatio = RoomsCaptured/RoomsTotal;
		var WPT = this.wpt;
		var bugCnt = this.bugCount;
		var glcCnt = this.glitchCount;
		var tjnCnt = this.trojanCount;
		var zdaCnt = this.zeroDayCount;
		var UnitTotal = bugCnt + glcCnt + tjnCnt + zdaCnt;

		var valueArray = [];
		valueArray.push({name:NAME_BUG, value:5 * (1 - RoomRatio) + 12 - WPT});
		valueArray.push({name:NAME_GLITCH, value:5 * (1 - RoomRatio) + 10 - (WPT * .6)});
		valueArray.push({name:NAME_TROJAN, value:6 + WPT * .3});
		valueArray.push({name:NAME_ZERO_DAY, value:3 + WPT * .6 + UnitTotal * .5 - 5});

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
				if (minimap[i][j].hash == 0 || !roomLookup[minimap[i][j].hash].isRoom)
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
					if (room.unitsEnroute[k].faction == FACTION_SOFTWARE)
						value -= PRICES[room.unitsEnroute[k].name];
				}
				// distance, closer is better
				var distance = Math.abs(this.pos.x - j) + Math.abs(this.pos.y - i);
				value -= distance;
				// resources, wpt
				value += room.wpt/room.size;
				// faction, if not ours and weak, good, if not ours and strong bad, if empty alright
				value += room.faction == FACTION_SOFTWARE ? 0 : 20;
				// faction, if ours and enemy presence and weak good, if strong, iono
				// value += room.targetFaction != FACTION_SOFTWARE && room.faction != FACTION_SOFTWARE ? 10 : 0;
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
			if (unit.destination != DESTINATION_NONE || (unit.getRoom().faction != FACTION_SOFTWARE && dungeon.tiles[unit.y][unit.x].inRoom)) {
				continue;
			}
			// pick room with biggest need
			// send there
			// console.log("Sending " + unit.name + unit.hash + " to x:" + rooms[0].roomCenter.y + "y:" + rooms[0].roomCenter.y)
			unit.destination = rooms[0].roomCenter;
			unit.destinationRoom = rooms[0].room;
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

function faction_robot(pos) {
	this.pos = pos;
	this.roomsCaptured = 1;
	this.wealth = 5;
	this.power = 0;
	this.wpt = 1;
	this.units = [];
	this.butlerCount = 0;
	this.chefCount = 0;
	this.mechanicCount = 0;
	this.securotronCount = 0;

	this.doTurn = function() {
		this.spendWealth();
		this.directUnits();
	}
	
	this.spendWealth = function() {
		var RoomsCaptured = this.roomsCaptured;
		var RoomsTotal = dungeon.roomTotal;
		var RoomRatio = RoomsCaptured/RoomsTotal;
		var WPT = this.wpt;
		var Power = this.power;
		var btlCnt = this.butlerCount;
		var chfCnt = this.chefCount;
		var mecCnt = this.mechanicCount;
		var secCnt = this.securotronCount;		
		var UnitTotal = btlCnt + chfCnt + mecCnt + secCnt;

		var valueArray = [];
		valueArray.push({name:NAME_BUTLER, value:5 * (1 - RoomRatio) + 10 - WPT + 1 - Power + 6 + UnitTotal * .4});
		valueArray.push({name:NAME_CHEF, value:5 * (1 - RoomRatio) + 8 - .5 * WPT + 1 - Power + 6 + UnitTotal * .6});
		valueArray.push({name:NAME_MECHANIC, value: WPT + 1 - Power + 2 + UnitTotal * .7});
		valueArray.push({name:NAME_SECUROTRON, value: RoomsCaptured + WPT * 1.2 - 2 + Power + UnitTotal});

		valueArray.sort(function(a, b){return b.value-a.value});

		var choice = valueArray[0].name;
		var powerCost = choice == NAME_SECUROTRON ? 2 : 1;
		if (PRICES[choice] <= this.wealth && powerCost <= this.power) {
			this.wealth -= PRICES[choice];
			this.power -= powerCost
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
				if (minimap[i][j].hash == 0 || !roomLookup[minimap[i][j].hash].isRoom)
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
					if (room.unitsEnroute[k].faction == FACTION_ROBOT)
						value -= PRICES[room.unitsEnroute[k].name];
				}
				// distance, closer is better
				var distance = Math.abs(this.pos.x - j) + Math.abs(this.pos.y - i);
				value -= distance;
				// resources, wpt
				value += room.wpt/room.size;
				// faction, if not ours and weak, good, if not ours and strong bad, if empty alright
				value += room.faction == FACTION_ROBOT ? 0 : 20;
				// faction, if ours and enemy presence and weak good, if strong, iono
				// value += room.targetFaction != FACTION_ROBOT && room.faction != FACTION_ROBOT ? 10 : 0;
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
			if (unit.destination != DESTINATION_NONE || (unit.getRoom().faction != FACTION_ROBOT && dungeon.tiles[unit.y][unit.x].inRoom)) {
				continue;
			}
			// pick room with biggest need
			// send there
			// console.log("Sending " + unit.name + unit.hash + " to x:" + rooms[0].roomCenter.y + "y:" + rooms[0].roomCenter.y)
			unit.destination = rooms[0].roomCenter;
			unit.destinationRoom = rooms[0].room;
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

function faction_survivor(pos) {
	this.pos = pos;
	this.roomsCaptured = 1;
	this.wealth = 5;
	this.power = 0;
	this.wpt = 1;
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

		// console.log("Survivors: WPT:" + WPT + ", ", Wealth:" + this.wealth + ", UnitTotal:" + UnitTotal + ", RoomsCaptured:" + RoomsCaptured);

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
				if (minimap[i][j].hash == 0 || !roomLookup[minimap[i][j].hash].isRoom)
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
					if (room.unitsEnroute[k].faction == FACTION_SURVIVOR)
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
			if (unit.destination != DESTINATION_NONE || (unit.getRoom().faction != FACTION_SURVIVOR && dungeon.tiles[unit.y][unit.x].inRoom)) {
				continue;
			}
			// pick room with biggest need
			// send there
			// console.log("Sending " + unit.name + unit.hash + " to x:" + rooms[0].roomCenter.y + "y:" + rooms[0].roomCenter.y)
			unit.destination = rooms[0].roomCenter;
			unit.destinationRoom = rooms[0].room;
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
	this.roomsCaptured = 1;
	this.wealth = 10;
	this.power = 0;
	this.wpt = 1;
	this.units = [];

	this.doTurn = function() {
		this.spendWealth();
		this.directUnits();
	}
	
	this.spendWealth = function() {
		var choice = 'goo';
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
				if (minimap[i][j].hash == 0 || !roomLookup[minimap[i][j].hash].isRoom)
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
					if (room.unitsEnroute[k].faction == FACTION_HIVEMIND)
						value -= PRICES[room.unitsEnroute[k].name];
				}
				// distance, closer is better
				var distance = Math.abs(this.pos.x - j) + Math.abs(this.pos.y - i);
				value -= distance;
				// resources, wpt
				value += room.wpt/room.size;
				// faction, if not ours and weak, good, if not ours and strong bad, if empty alright
				value += room.faction == FACTION_HIVEMIND ? 0 : 20;
				// faction, if ours and enemy presence and weak good, if strong, iono
				// value += room.targetFaction != FACTION_HIVEMIND && room.faction != FACTION_HIVEMIND ? 10 : 0;
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
			if (unit.destination == DESTINATION_NONE) {
				// we are capping
				if (unit.getRoom().faction != FACTION_HIVEMIND && dungeon.tiles[unit.y][unit.x].inRoom) {
					// seek out anybody prevent us from capping
					var unitsInRoom = unit.getRoom().units;
					for (var i = unitsInRoom.length - 1; i >= 0; i--) {
						if (unitsInRoom[i].faction != unit.faction) {
							unit.destination = unitsInRoom[i];
							continue;
						}
					}
				}
			} else {
				continue;
			}
			// pick room with biggest need
			// send there
			// console.log("Sending " + unit.name + unit.hash + " to x:" + rooms[0].roomCenter.y + "y:" + rooms[0].roomCenter.y)
			unit.destination = rooms[0].roomCenter;
			unit.destinationRoom = rooms[0].room;
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

function doFactionTurns() {
	if (!spawnEnemies)
		return;
	for (var faction in factions) {
		factions[faction].doTurn();
	}
}
