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
	windows[SCREEN_GAME].redraw(gameTicks);
}

// called each time a room is entered for the first time
var lastTick = 0;
var FOURX_PERIOD = 60;
function do4XTurn () {
	if (gameTicks - lastTick >= FOURX_PERIOD && !doingTutorial) {
		log.add("Turn " + gameTicks / FOURX_PERIOD + " has ended");

		if (switchboard.getSwitch(NAME_DAY_NIGHT).on) {
			// noon, 6, midnight, 6, noon
			var lastStage = solar_stages[SOLAR_STAGE];				
			SOLAR_STAGE = lastStage.next;

			var currentStage = solar_stages[SOLAR_STAGE];
			COLOR_DEFAULT = currentStage.color;
			SIGHT_DISTANCE = currentStage.distance;
			todModifier += currentStage.modifier;
			player.range = SIGHT_DISTANCE;

			log.add(currentStage.message);
		}

		lastTick = gameTicks;
		for (var faction in factions) {
			factions[faction].do4XTurn();
		}
	}
}

function togglePowered() {

	if (player.skills.skillObject[SKILL_OFF_THE_GRID].purchased || selectedRoomHash <= 0)
		return;

	var room = roomLookup[selectedRoomHash];
	var div = document.getElementById('powerPercent');
	var span = document.getElementById('powerSpan');

	if (!room.powered && factions[FACTION_CLONES].power > 0) {
		room.powered = true;
		factions[FACTION_CLONES].power -= 1;
		div.style.background = '#131313';
		span.style.color = '#ecf277';
		windows[SCREEN_GAME].redraw(gameTicks);
	} else if (room.powered) {
		room.powered = false;
		factions[FACTION_CLONES].power++;
		div.style.background = '#ecf277';
		span.style.color = '#131313';
		windows[SCREEN_GAME].redraw(gameTicks);
	}
}