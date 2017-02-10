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
	// switch to the welcome screen
	gameState = STATE_LANDING;
	document.onkeydown = welcomeOnKeyDown;
	// if no game to read out of memory
	welcomeCursorPos = 1;
	// update the screen with the welcome screen
	draw();
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
		moveGame(offset);
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

/*				Objects						*/

function Character (occupation, background, loadout) {
	this.powerLevel = 9001;
	this.hpMax = 25;
	this.x = 0;
	this.y = 0;
	this.hp = 25;
	this.xp = 0;
	this.name = 'Wilko';
	this.level = 1;
	this.skillPoints = 0;
	this.lastLevelXp = 0;
	this.nextLevelXp = 20;

	this.baseDamage = 3;
	this.baseAccuracy = .4;	
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
			if (this.onHand == ITEM_NONE && (!item.twoHanded || (item.twoHanded && this.offHand == ITEM_NONE))) {
				this.onHand = item;
				item.equip(this);
			} else if (this.offHand == ITEM_NONE && (!item.twoHanded || (item.twoHanded && this.onHand == ITEM_NONE))) {
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

		switch (weapons.length) {
			case 0:result += Math.random() <= accuracy ? this.baseDamage : 0; break;
			case 1:result += Math.random() <= accuracy ? weapons[0].dmg : 0; break;
			case 2:result +=  Math.random() <= accuracy ? .5*weapons[0].dmg + .5*weapons[1].dmg : 0; break;
			default:break;
		}

		// don't do full damage
		result = Math.max(1, Math.round(result * Math.random()));

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

	this.addKillXp = function(amount) {
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
		disputeRoom(enemy);
	}
}

function disputeRoom(enemy) {
	var inRoom = dungeon.tiles[enemy.y][enemy.x].inRoom;
	if (inRoom) {
		var roomPos = {x: mapXMin + Math.round((enemy.x - (ROOM_CELL_LENGTH - 1)/ 2) / ROOM_CELL_LENGTH), 
				       y: mapYMin + Math.round((enemy.y - (ROOM_CELL_LENGTH - 1)/ 2) / ROOM_CELL_LENGTH)};
		var room = roomLookup[minimap[roomPos.y][roomPos.x].hash];

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

		var roomOwner = room.faction;
		// if a roomOwning faction is here, do not decay
		// a room is only owned if it is capped/decaying
		if (!factionsPresent.includes(roomOwner) && room.faction != FACTION_NONE) {
			// decay
			room.captureAmount -= .1/room.size;

			// for ui coloring purposes
			room.beingCaptured = false;

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
		} else if (factionsPresent.length == 1) {
			room.captureAmount += .1/room.size;

			// for ui coloring purposes
			room.beingCaptured = true;

			if (room.captureAmount >= room.captureRequired) {
				room.captureAmount = room.captureRequired;
				if (faction != FACTION_NONE) {
					factions[faction].roomsCaptured += room.size;
					factions[faction].ppt += room.ppt;
					factions[faction].wpt += room.wpt;
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