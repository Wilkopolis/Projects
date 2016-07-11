
/*				Game Helper functions					*/

//recursively set color
function updateGeneratorTileColor (generator, color) {
	for (var i = generator.tiles.length - 1; i >= 0; i--) {
		generator.tiles[i].pixel.color = color;
	}
}

// debugger function
function oops () {
	console.log("you fucked up");
}

// resets all the 'pixels' on the screen
function clearScreen () {
	screen.pixels = new Array(screen.height);
	for (var i = 0; i < screen.height; i++) {
		screen.pixels[i] = new PixelArray(screen.width, ' ', '#333333');
	}
}

function blinkMegaMap () {
	if (newerInput) {
		newerInput = false;
		return;
	}
	updateScreen();
	cursorVis = !cursorVis;
	window.setTimeout(blinkMegaMap, CURSOR_INTERVAL);
}

function blinkSwitchboard () {
	if (newerInput) {
		newerInput = false;
		return;
	}
	updateScreen();
	cursorVis = !cursorVis;
	window.setTimeout(blinkSwitchboard, CURSOR_INTERVAL);
}

function relight() {
	dungeon.tiles[player.y][player.x].opaque = false;
	var points = getEndOfSightPoints(player);
	// ray trace all the way back
    for (var i = points.length - 1; i >= 0; i--) {
    	lightLine(player, points[i], dungeon.tiles);
    }
}

function addExposition () {
	// Flavor factoid log.add("Remember");
	var objectivesStrings = objectives.getObjectiveStrings();
	for (var i = objectivesStrings.length - 1; i >= 0; i--) {
		log.add((i + 1) + ". " + objectivesStrings[i] + ".");
	}
	// add player class
	log.add("Good morning citizen! Here are your assigned task(s)!");
}

// line of site, get all the points we trace to
function getEndOfSightPoints (pos) {
	var radius = SIGHT_DISTANCE;
	var results = [];
	for (var i = radius - 1; i > -radius; i--) {
		for (var j = radius - 1; j > -radius; j--) {
			if (player.y + i >= 0 &&
				player.y + i < dungeon.tiles.length &&
				player.x + j >= 0 &&
				player.x + j < dungeon.tiles[player.y + i].length) {
				var x = j;
				var y = i;
				var distance = Math.sqrt(x*x + y*y);
				if (distance <= radius)
					results.push({x: player.x + j, y:player.y + i});
			}
		}
	}
	return results;
}

// using bresenhams, trace a light ray to a point
function lightLine (p, q, tiles) {
	// Besenham's Line Equation
	var x0 = p.x, y0 = p.y;
	var x1 = q.x, y1 = q.y;
	var dx = Math.abs(x1 - x0), sx = x0 < x1 ? 1 : -1;
	var dy = Math.abs(y1 - y0), sy = y0 < y1 ? 1 : -1;
	var err = (dx > dy ? dx : -dy) / 2;
 	// iterate from point 1 to point 2
 	while (true) {
 		// check to see if the tile is valid
 		if (x0 < 0 || y0 < 0 || y0 >= tiles.length || x0 >= tiles[y0].length)
 			break;
 		// since we are a valid spot, set the tile to visible
 		tiles[y0][x0].viewState = VIEW_STATE_VISIBLE;

 		if (tiles[y0][x0].entities.length > 0 && typeof tiles[y0][x0].entities.peek().visible !== 'undefined')
 			tiles[y0][x0].entities.peek().visible = true;

 		// if we are obstructed, quit traversing
 		if (tiles[y0][x0].getOpaque() && (y0 != player.y || x0 != player.x))
 			break;

 		// rest of the algorithm
 		if (x0 === x1 && y0 === y1)
 			break;
 		var e2 = err;
 		if (e2 > -dx) {
 			err -= dy;
 			x0 += sx;
 		}
 		if (e2 < dy) {
 			err += dx;
 			y0 += sy;
 		}
 	}
}

// only works for non-objects
function ValueArray (length, value) {
  	var result = [];
  	for (var i = 0; i < length; i++) {
    	result.push(value);
  	}
  	return result;
}

function PixelArray (length, chara, color) {
	chara = typeof chara !== 'undefined' ?  chara : ' ';
	color = typeof color !== 'undefined' ?  color : '#cdc0b6';
  	var result = [];
  	for (var i = 0; i < length; i++) {
    	result.push(new Pixel(chara, color));
  	}
  	return result;
}

function TileArray (length) {
  	var result = [];
  	for (var i = 0; i < length; i++) {
    	result.push(new EmptyTile());
  	}
  	return result;
}

function RoomArray (length, hash) {
  	var result = [];
  	for (var i = 0; i < length; i++) {
    	result.push(new RoomSegment(hash));
  	}
  	return result;
}

function clone(obj) {
	var target = {};
	for (var i in obj) {
		if (obj.hasOwnProperty(i)) {
			target[i] = obj[i];
		}
	}
	return target;
}

function getNPCByHash(hash) {
	for (var i = this.length - 1; i >= 0; i--) {
		if (this[i].hash == hash)
			return this[i];
	}
	return null;
}

function removeNPCByHash(hash) {
	for (var i = this.length - 1; i >= 0; i--) {
		if (this[i].hash == hash)
			return this.splice(i,1);
	}
}

/*				Base Class Helper functions					*/

// for the console/log
Array.prototype.add = function (entry) {
	for (var i = log.length - 1; i >= Math.max(0,log.length - 3); i--) {
		if (log[i].substr(log[i].indexOf(']') + 1, log[i].length - log[i].indexOf(']') - 1) == entry)
			return;
	}
	if (log.length >= LOG_LENGTH)
		log.shift();
	var timestamp = "[" + gameTicks + "]";
	for (var i = timestamp.length - 1; i >= 0; i--) {
		timestamp[i].color = COLOR_OUT_OF_SIGHT;
	}
	log.push(timestamp + entry);
}

// okay not best pratice - don't do this kids at home
Array.prototype.update = function() {
	var pos;
	for (var i = this.length - 1; i >= 0; i--) {
		pos = this[i];
		pos.frequency = 5;
		if (pos.y - 1 >= 0 && minimap[pos.y - 1][pos.x].hash == 0)
			pos.frequency *= ADJACENT_ROOM_MULTIPLIER;
		if (pos.y + 1 < minimap.length && minimap[pos.y + 1][pos.x].hash == 0)
			pos.frequency *= ADJACENT_ROOM_MULTIPLIER;
		if (pos.x - 1 >= 0 && minimap[pos.y][pos.x - 1].hash == 0)
			pos.frequency *= ADJACENT_ROOM_MULTIPLIER;
		if (pos.x + 1 < minimap[pos.y].length && minimap[pos.y][pos.x + 1].hash == 0)
			pos.frequency *= ADJACENT_ROOM_MULTIPLIER;
	}
}

// returns an element picked randomly(weighted)
// requires every entry to have a 'frequency' property
// otherwise frequency is 1
Array.prototype.pickWeighted = function() {
	var sum = 0;
	for (var i = this.length - 1; i >= 0; i--) {
		sum += typeof this[i].frequency !== 'undefined' ? this[i].frequency : 1;
	}

	var seed = Math.random() * sum;
	var step = 0;
	for (var i = this.length - 1; i >= 0; i--) {
		step += typeof this[i].frequency !== 'undefined' ? this[i].frequency : 1;
		if (seed < step)
			return this[i];
	}
}

// removes and returns an element picked randomly(weighted)
// requires every entry to have a 'frequency' property
// otherwise frequency is 1
Array.prototype.popWeighted = function() {
	var sum = 0;
	for (var i = this.length - 1; i >= 0; i--) {
		sum += typeof this[i].frequency !== 'undefined' ?  this[i].frequency : 1;
	}

	var seed = Math.random() * sum;
	var step = 0;
	for (var i = this.length - 1; i >= 0; i--) {
		step += typeof this[i].frequency !== 'undefined' ?  this[i].frequency : 1;;
		if (seed < step)
			return this.splice(i, 1)[0];
	}
}

// pick a random element, remove that element from the collection, return the element
Array.prototype.popRandom = function() {
	var index = Math.floor(Math.random() * this.length);
	var result = this[index];
	this.splice(index, 1);
	return result;
}

// pick a random element, return the element
Array.prototype.peekRandom = function() {
	var index = Math.floor(Math.random() * this.length);
	var result = this[index];
	return result;
}

Array.prototype.peek = function() {
	return this[this.length - 1];
}

// closed set stuff
Array.prototype.setContains = function(element) {
	for (var i = this.length - 1; i >= 0; i--) {
		if (this[i].x == element.x && this[i].y == element.y)
			return true;
	}
	return false;
}

// acts like push but
Array.prototype.setAdd = function(element) {
	for (var i = this.length - 1; i >= 0; i--) {
		if (this[i].x == element.x && this[i].y == element.y)
			return;
	}
	this.push(element);
}

// acts like push but
Array.prototype.refSetAdd = function(element) {
	for (var i = this.length - 1; i >= 0; i--) {
		if (this[i] == element)
			return;
	}
	this.push(element);
}

// not really setRemove, just a special remove for my collection
Array.prototype.setRemove = function(element) {
	for (var i = this.length - 1; i >= 0; i--) {
		if (this[i].x == element.x && this[i].y == element.y)
			return this.splice(i,1);
	}
}
