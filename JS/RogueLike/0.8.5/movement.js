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

		closedSet.push(current);

		for (var i = MOVE_OPTIONS.length - 1; i >= 0; i--) {
			var offset = MOVE_OPTIONS[i];
			var newNode = new AStarNode(offset, current, destination, character);
			if (!closedSet.setContains(newNode) && !dungeon.tiles[newNode.y][newNode.x].getPermanentSolid())
				openSet.setSmartInsert(newNode);
		}
	}
	while (!(current.parent.x == pos.x && current.parent.y == pos.y)) {
		current = current.parent;
	}
	return {x:current.x - pos.x, y:current.y - pos.y};
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
			if (entity.animate) {
				this.gScore += 4;
			} else {
				this.gScore += 10;
			}
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
	var tiles = getEndOfSightPoints(player);
	for (var i = tiles.length - 1; i >= 0; i--) {
		var pos = tiles[i];
		var tile = dungeon.tiles[pos.y][pos.x];
		// check if they have an item or enemy on them
		for (var j = tile.entities.length - 1; j >= 0; j--) {
			if (tile.entities[j].type == ENTITY_ENEMY && lightLine(player, pos, dungeon.tiles)) {							
				bored = false;
				break;
			}
		}

		if (!bored)
			break;
	}
	if (!bored) {
		log.add("Can't explore! There are enemies nearby.");
		relight();
		draw();
	}
	// explore!
	while (bored) {
		if (unvisitedSegments.length == 0) {
			log.add("Nothing left to explore!");
			relight();
			draw();
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

	    var unvisitedRoomSegment = unvisitedSegments[0];
	    // get its destination
	    var adjustedPos = {x: unvisitedRoomSegment.x - mapXMin, y: unvisitedRoomSegment.y - mapYMin};
		var destination = {x: (ROOM_CELL_LENGTH - 1)/ 2 + (adjustedPos.x * ROOM_CELL_LENGTH), y: (ROOM_CELL_LENGTH - 1)/ 2 + (adjustedPos.y * ROOM_CELL_LENGTH)};
		// if the destination is all solid (generator or some shit)
		// search around it until you find an open spot
		destination = getOpenSpot(destination);
		// route too it until something of note happens
		var playerPos;
		var currentSegment = dungeon.getRoomSegment();
		while(!unvisitedRoomSegment.visited) {
			playerPos = {x: player.x, y: player.y};
			// path to it
			var offset = getNextMoveAStar(playerPos, destination);
			// move there
			moveGame(offset);

			// check if we are bored still
			// get all tiles in radius
			var tiles = getEndOfSightPoints(player);
			for (var i = tiles.length - 1; i >= 0; i--) {
				var pos = tiles[i];
				var tile = dungeon.tiles[pos.y][pos.x];
				// check if they have an item or enemy on them
				for (var j = tile.entities.length - 1; j >= 0; j--) {
					var e = tile.entities[j];
					if (e.type == ENTITY_ENEMY && traceLine(player, pos, dungeon.tiles)) {
						bored = false;
						log.add("A " + tile.entities[j].name + " comes into view.")
						relight();
						draw();
						break;
					}
				}

				if (!bored)
					break;
			}
			if (!bored)
				break;
		}
		// LIMITS IT TO 1 SEGMENT PER EXPLORE
		bored = false;
	}
	bored = true;
}