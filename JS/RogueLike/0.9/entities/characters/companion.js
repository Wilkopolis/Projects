var NAME_FAMILIAR = 'Familiar';
var ENTITY_COMPANION = 'companion';

function doCompanionTurn(npc) {

	var currentTile = dungeon.tiles[npc.y][npc.x];

	// go to our room, otherwise if we encounter something that makes us mad, kill it instead
	var destination = npc.destination;
	var npcDestination = false;
	var candidates = [];
	for (var j = dungeon.npcs.length - 1; j >= 0; j--) {
		if (Math.sqrt(Math.pow(npc.x - dungeon.npcs[j].x, 2) + Math.pow(npc.y - dungeon.npcs[j].y, 2)) < 5 && dungeon.npcs[j].faction != npc.faction)
			candidates.push(dungeon.npcs[j]);
	}

	if (Math.sqrt(Math.pow(npc.x - player.x, 2) + Math.pow(npc.y - player.y, 2)) < 5 && player.faction != FACTION_NONE && player.faction != npc.faction)
		candidates.push(player);

	if (candidates.length > 0) {
		candidates.sort(function(a,b) {return b.getThreatLevel(npc) - a.getThreatLevel(npc)});
		destination = candidates[0];
		npcDestination = true;
	}

	var dx = Math.abs(npc.x - destination.x);
	var dy = Math.abs(npc.y - destination.y);
	var distance = Math.sqrt(dx * dx + dy * dy);
	if (npcDestination) {
		if (distance <= npc.range && npc.canAttack()) {
			dealDamage(npc, npc.getDmg(), destination);
			disputeRoom(npc);
			return;
		}
	}

	// if we are super close, just wait around
	if (destination == npc.destination && distance < 3)
		destination = DESTINATION_NONE;

	if (destination != DESTINATION_NONE) {
		// if within room, do A-Star with weights why not
		var offset = getNextMoveAStar(npc, destination);

		var newPos = {x: npc.x + offset.x, y: npc.y + offset.y};
		var newTile = dungeon.tiles[newPos.y][newPos.x];
		var roomPos = {x: mapXMin + Math.round((npc.x - (ROOM_CELL_LENGTH - 1)/ 2) / ROOM_CELL_LENGTH), 
			    	   y: mapYMin + Math.round((npc.y - (ROOM_CELL_LENGTH - 1)/ 2) / ROOM_CELL_LENGTH)};
		var room = roomLookup[minimap[roomPos.y][roomPos.x].hash];
		// if we reached our destination via smart moving
		if (newTile.getSolid()) {
			// if there is something in our way thats not friendly, hit it
			var obstruction;
			if (typeof newTile.entities.peek() === 'undefined')
				obstruction = player;
			else
				obstruction = newTile.entities.peek();
			// check if we wanna smac the obstruction
			if (npc.canAttack() && obstruction.obstacle && obstruction.faction != npc.faction) {
				
				if (npc.ticksAwayFromMaster > 10) {
					npc.ticksAwayFromMaster = 0;
					// rebound
					newPos = getOpenSpot({x:player.x, y:player.y});
					newTile = dungeon.tiles[newPos.y][newPos.x];

					npc.x = newPos.x;
					npc.y = newPos.y;

					var temp = currentTile.entities.pop();
					newTile.entities.push(temp);
				} else
					dealDamage(npc, npc.getDmg(), obstruction);
			}
		// otherwise do the move
		} else {

			// rebound
			if (npc.ticksAwayFromMaster > 3) {
				npc.ticksAwayFromMaster = 0;
				// rebound
				newPos = getOpenSpot({x:player.x, y:player.y});
				newTile = dungeon.tiles[newPos.y][newPos.x];
			}

			npc.x = newPos.x;
			npc.y = newPos.y;

			var temp = currentTile.entities.pop();
			newTile.entities.push(temp);

			var dx = Math.abs(npc.x - destination.x);
			var dy = Math.abs(npc.y - destination.y);
			var distance = Math.sqrt(dx*dx + dy*dy);
			if (distance > 8)
				npc.ticksAwayFromMaster++;
		}
	} else {
		// else wander or do something simple
		var offset = MOVE_OPTIONS[Math.floor(Math.random() * MOVE_OPTIONS.length)];
		var newPos = {x: npc.x + offset.x, y: npc.y + offset.y};
		var newTile = dungeon.tiles[newPos.y][newPos.x];
		if (!newTile.getSolid()) {				
			npc.x = newPos.x;
			npc.y = newPos.y;
			newTile.entities.push(currentTile.entities.pop());				
		}
	}
	disputeRoom(npc);
}