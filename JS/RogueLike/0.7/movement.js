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
function getNextMoveAStar(pos, destination) {
	// maybe do this by enemy count and do cheaper methods for others
	var simple = true;
	for (var i = MOVE_OPTIONS.length - 1; i >= 0; i--) {
		var tile = dungeon.tiles[destination.y + MOVE_OPTIONS[i].y][destination.x + MOVE_OPTIONS[i].x];
		if (!tile.getSolid())
			simple = false;
	}
	// if we cant actually get next to him, just do a simple pathfinding instead
	if (simple)
		return getNextMoveSimple(pos);	
	// running count of how far we've gone
	var distance = 0;
	// every unvisited node
	var openSet = [];
	openSet.hashTable = {};
	// visited nodes
	var closedSet = [];
	// our starting position
	pos.gScore = 0;
	var startNode = new AStarNode({x:0, y:0}, pos, destination);
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
			var newNode = new AStarNode(offset, current, destination);
			if (!closedSet.setContains(newNode) && !dungeon.tiles[newNode.y][newNode.x].getPermanentSolid())
				openSet.setSmartInsert(newNode);
		}
	}
	while (!(current.parent.x == pos.x && current.parent.y == pos.y)) {
		current = current.parent;
	}
	return {x:current.x - pos.x, y:current.y - pos.y};
}

function AStarNode(offset, parent, pos) {
	this.x = parent.x + offset.x;
	this.y = parent.y + offset.y;
	this.parent = parent;
	this.gScore = parent.gScore + 1;
	// if (dungeon.tiles[this.y][this.x].getSolid())
	// 	this.gScore += .4;
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
