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
var spawnEnemies = false;

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

		if (factionsPresent.length == 1 && factionsPresent[0] == room.faction) {
			room.units = [];
			continue;
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