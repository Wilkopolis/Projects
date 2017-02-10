var MOVE_OPTIONS = [{x:0,y:1},
					{x:0,y:-1},
					{x:1,y:0},
					{x:1,y:1},
					{x:1,y:-1},
					{x:-1,y:0},
					{x:-1,y:1},
					{x:-1,y:-1}];

var ENTITY_WEIGHT = 4;
// return the next move for the entity
function getNextMoveAStar(character, destination) {
	// make the position object from our character
	var pos = {x:character.x, y:character.y};
	// running count of how far we've gone
	var distance = 0;
	// every unvisited node
	var openSet = [];
	openSet.hashTable = {};
	// visited nodes
	var closedSet = [];
	closedSet.hashTable = {};
	closedSet.setContains = specialContains;
	closedSet.specialPush = specialPush;
	// our starting position
	pos.gScore = 0;
	var startNode = new AStarNode({x:0, y:0}, pos, destination, character);
	startNode.gScore = 0;
	openSet.setSmartInsert = setSmartInsert;
	openSet.popBest = popBest;
	openSet.setSmartInsert(startNode);
	while (openSet.length > 0) {
		var current = openSet.popBest();

		var dx = Math.abs(current.x - destination.x);
		var dy = Math.abs(current.y - destination.y);
		if (dx <= 1 && dy <= 1) {
			current = new AStarNode({x:dx, y:dy}, current, destination, character);
			break;
		}

		closedSet.specialPush(current);

		for (var i = MOVE_OPTIONS.length - 1; i >= 0; i--) {
			var offset = MOVE_OPTIONS[i];
			var newNode = new AStarNode(offset, current, destination, character);
			if (!closedSet.setContains(newNode) && !dungeon.tiles[newNode.y][newNode.x].getPermanentSolid(character.faction))
				openSet.setSmartInsert(newNode);
		}
	}
	if (character.statuses[SKILL_BLINK_I] != null && character.statuses[SKILL_BLINK_I].cooldown >=
		gameTicks - character.statuses[SKILL_BLINK_I].lastUsedTick) {		
		while (current.gScore > 4 && !(current.parent.x == pos.x && current.parent.y == pos.y)) {
			current = current.parent;
		}
		character.statuses[SKILL_BLINK_I].lastUsedTick = gameTicks;
	} else {
		while (!(current.parent.x == pos.x && current.parent.y == pos.y)) {
			current = current.parent;
		}		
	}
	return {x:current.x - pos.x, y:current.y - pos.y};
}

function getPathAStar(character, destination) {
	// make the position object from our character
	var pos = {x:character.x, y:character.y};
	// running count of how far we've gone
	var distance = 0;
	// every unvisited node
	var openSet = [];
	openSet.hashTable = {};
	// visited nodes
	var closedSet = [];
	// our starting position
	pos.gScore = 0;
	var startNode = new AStarNode2({x:0, y:0}, pos, destination, character);
	startNode.gScore = 0;
	openSet.setSmartInsert = setSmartInsert;
	openSet.popBest = popBest;
	openSet.setSmartInsert(startNode);
	while (openSet.length > 0) {
		var current = openSet.popBest();

		var dx = Math.abs(current.x - destination.x);
		var dy = Math.abs(current.y - destination.y);
		if (dx <= 1 && dy <= 1) {
			break;
		}

		closedSet.push(current);

		for (var i = MOVE_OPTIONS.length - 1; i >= 0; i--) {
			var offset = MOVE_OPTIONS[i];
			var newNode = new AStarNode2(offset, current, destination, character);
			if (!closedSet.setContains(newNode) && !dungeon.tiles[newNode.y][newNode.x].getPermanentSolid(character.faction))
				openSet.setSmartInsert(newNode);
		}
	}
	var result = []
	while (current.parent.parent != null) {
		result.push({x:current.x - current.parent.x, y:current.y - current.parent.y});
		current = current.parent;
	}
	return result;
}

function AStarNode2(offset, parent, pos, character) {
	this.x = parent.x + offset.x;
	this.y = parent.y + offset.y;
	this.parent = parent;
	this.gScore = parent.gScore + 1;
	// check if there is a temporal entity here
	// we can assume permanent solid is false
	var tile = dungeon.tiles[this.y][this.x];
	if (tile.entities.length > 0) {
		var entity = tile.entities.peek();
		// if we can't move through it, cost the move
		if (tile.getSolid()) {
			// if its friendly, basically can't auto move through it at all
			if (entity.animate)
				this.gScore += 8;
			else if (entity.obstacle)
				this.gScore += 10000;
			else 
				this.gScore += 4;
		}
	}
	this.fScore = this.gScore + Math.sqrt(Math.pow(this.x - pos.x, 2) + Math.pow(this.y - pos.y, 2));
}

function AStarNode(offset, parent, pos, character) {
	this.x = parent.x + offset.x;
	this.y = parent.y + offset.y;
	this.parent = parent;
	this.gScore = parent.gScore + 1;
	// check if there is a temporal entity here
	// we can assume permanent solid is false
	var tile = dungeon.tiles[this.y][this.x];
	if (tile.entities.length > 0) {
		var entity = tile.entities.peek();
		// if we can't move through it, cost the move
		if (tile.getSolid()) {
			// if its friendly, basically can't auto move through it at all
			if (entity.animate)
				this.gScore += 8;
			else if (entity.obstacle && entity.faction == character.faction)
				this.gScore += 10000;
			else 
				this.gScore += 4;
		}
	}
	this.fScore = this.gScore + Math.sqrt(Math.pow(this.x - pos.x, 2) + Math.pow(this.y - pos.y, 2));
}

function setSmartInsert(newNode) {
	// if new start from back and insert into position O(n) however we assume that the newer nodes
		// will have the BEST score so average will be very close to O(4 or 5)
	// make popbest O(1)
	var hash = newNode.x + "," + newNode.y;
	if (typeof this.hashTable[hash] !== 'undefined')
		return;
	for (var i = this.length - 1; i >= 0; i--) {
		if (this[i].fScore >= newNode.fScore) {
			this.splice(i+1, 0, newNode);
			this.hashTable[hash] = true;
			return;
		}
	}
	// for first run and second run
	this.splice(0, 0, newNode);
}

function popBest() {
	var out = this.pop();	
	var hash = out.x + ',' + out.y;
	delete this.hashTable[hash];
	return out;
}

function getNextMoveSimple(pos) {
	var vector = {x: player.x - pos.x, y: player.y - pos.y};
	var offset;
	if (Math.abs(vector.x) > Math.abs(vector.y)) {
		offset = {x:1, y:Math.round(vector.y/vector.x)};
	} else {
		offset = {x:Math.round(vector.x/vector.y), y:1};
	}
	return offset;
}

function autoExplore() {

	// check if bored in the first place
	bored = true;
	for (var i = onScreenEntities.length - 1; i >= 0; i--) {
		if (onScreenEntities[i].type == ENTITY_ENEMY) {
			bored = false
			break;
		}
	}

	if (!bored) {
		log.add("Can't explore! There are enemies nearby.");
		relight();
		draw(gameTicks);
	}
	// explore!
	while (bored) {
		if (unvisitedSegments.length == 0) {
			log.add("Nothing left to explore!");
			relight();
			draw(gameTicks);
			break;
		}
		// find a room that hasn't been visited
		unvisitedSegments.sort(function(segmentA, segmentB) {
	    	var segAPos = {x: segmentA.x - mapXMin, y: segmentA.y - mapYMin};
	    	var segBPos = {x: segmentB.x - mapXMin, y: segmentB.y - mapYMin};
			var segACenter = {x: (ROOM_CELL_LENGTH - 1)/ 2 + (segAPos.x * ROOM_CELL_LENGTH), y: (ROOM_CELL_LENGTH - 1)/ 2 + (segAPos.y * ROOM_CELL_LENGTH)};
			var segBCenter = {x: (ROOM_CELL_LENGTH - 1)/ 2 + (segBPos.x * ROOM_CELL_LENGTH), y: (ROOM_CELL_LENGTH - 1)/ 2 + (segBPos.y * ROOM_CELL_LENGTH)};
			var distanceA = Math.sqrt(Math.pow(segACenter.x - player.x, 2) + Math.pow(segACenter.y - player.y, 2));
			var distanceB = Math.sqrt(Math.pow(segBCenter.x - player.x, 2) + Math.pow(segBCenter.y - player.y, 2));
			return distanceA - distanceB;
		});

		var currentSegment = dungeon.getRoomSegment();
	    var unvisitedRoomSegment = unvisitedSegments[0];
	    // get its destination
	    var adjustedPos = {x: unvisitedRoomSegment.x - mapXMin, y: unvisitedRoomSegment.y - mapYMin};
		var destination = {x: (ROOM_CELL_LENGTH - 1)/ 2 + (adjustedPos.x * ROOM_CELL_LENGTH), y: (ROOM_CELL_LENGTH - 1)/ 2 + (adjustedPos.y * ROOM_CELL_LENGTH)};
		// if the destination is all solid (generator or some shit)
		// search around it until you find an open spot
		destination = getOpenSpot(destination);
		// route too it until something of note happens
		var playerPos = {x: player.x, y: player.y, faction:player.faction};
		// get the players path
		var path = getPathAStar(playerPos, destination);
		
		while(!unvisitedRoomSegment.visited) {
			// path to it
			var offset = path.pop();
			// move there
			if (!moveGame(offset, true)) {
				log.add("failed to auto-explore.");
				relight();
				draw(gameTicks);
				return;
			}

			if (!bored)
				break;
		}
		// LIMITS IT TO 1 SEGMENT PER EXPLORE
		// bored = false;
	}
	bored = true;
}

var revealALL = false
function getNextMoveAStarSpecial(character, destination) {
	revealALL = true;
	// make the position object from our character
	var pos = {x:character.x, y:character.y};
	// running count of how far we've gone
	var distance = 0;
	// every unvisited node
	var openSet = [];
	openSet.hashTable = {};
	// visited nodes
	var closedSet = [];
	closedSet.hashTable = {};
	closedSet.setContains = specialContains;
	closedSet.specialPush = specialPush;
	// our starting position
	pos.gScore = 0;
	var startNode = new AStarNode({x:0, y:0}, pos, destination, character);
	startNode.gScore = 0;
	openSet.setSmartInsert = setSmartInsert;
	openSet.popBest = popBest;
	openSet.setSmartInsert(startNode);
	while (openSet.length > 0) {
		var current = openSet.popBest();

		var dx = Math.abs(current.x - destination.x);
		var dy = Math.abs(current.y - destination.y);
		if (dx <= 1 && dy <= 1) {
			break;
		}

		player.x = current.x;
		player.y = current.y;
		console.log(current.x + "," + current.y);
		draw(gameTicks);

		closedSet.specialPush(current);

		for (var i = MOVE_OPTIONS.length - 1; i >= 0; i--) {
			var offset = MOVE_OPTIONS[i];
			var newNode = new AStarNode(offset, current, destination, character);
			if (!closedSet.setContains(newNode) && !dungeon.tiles[newNode.y][newNode.x].getPermanentSolid(character.faction))
				openSet.setSmartInsert(newNode);
		}
	}
	
	if (character.statuses[SKILL_BLINK_I] != null && character.statuses[SKILL_BLINK_I].cooldown >=
		gameTicks - character.statuses[SKILL_BLINK_I].lastUsedTick) {		
		while (current.gScore > 4 && !(current.parent.x == pos.x && current.parent.y == pos.y)) {
			current = current.parent;
		}
		character.statuses[SKILL_BLINK_I].lastUsedTick = gameTicks;
	} else {
		while (!(current.parent.x == pos.x && current.parent.y == pos.y)) {
			current = current.parent;
		}		
	}

	return {x:current.x - pos.x, y:current.y - pos.y};
}

function specialContains(item) {
	var hash = item.x + "," + item.y;
	return this.hashTable[hash] != null;
}

function specialPush(item) {
	var hash = item.x + "," + item.y;
	this.hashTable[hash] = item;
	this.push(item);
}