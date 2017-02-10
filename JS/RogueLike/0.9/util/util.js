var alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];

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

function removeSimilar(effect, array) {
	switch(effect) {
		case NAME_HP_POTION_I:
			array.remove(NAME_HP_POTION_II);
		break;
		case NAME_HP_POTION_II:
			array.remove(NAME_HP_POTION_I);
		case EFFECT_DEF_I:
			array.remove(EFFECT_DEF_II);
			array.remove(EFFECT_DEF_III);
			array.remove(EFFECT_DEF_I_N);
			array.remove(EFFECT_DEF_II_N);
			array.remove(EFFECT_DEF_III_N);
		break;
		case EFFECT_DEF_II:
			array.remove(EFFECT_DEF_I);
			array.remove(EFFECT_DEF_III);
			array.remove(EFFECT_DEF_I_N);
			array.remove(EFFECT_DEF_II_N);
			array.remove(EFFECT_DEF_III_N);
		break;
		case EFFECT_DEF_III:
			array.remove(EFFECT_DEF_II);
			array.remove(EFFECT_DEF_I);
			array.remove(EFFECT_DEF_I_N);
			array.remove(EFFECT_DEF_II_N);
			array.remove(EFFECT_DEF_III_N);
		break;
		case EFFECT_DEF_I_N:
			array.remove(EFFECT_DEF_II);
			array.remove(EFFECT_DEF_III);
			array.remove(EFFECT_DEF_I);
			array.remove(EFFECT_DEF_II_N);
			array.remove(EFFECT_DEF_III_N);
		break;
		case EFFECT_DEF_II_N:
			array.remove(EFFECT_DEF_II);
			array.remove(EFFECT_DEF_III);
			array.remove(EFFECT_DEF_I_N);
			array.remove(EFFECT_DEF_I);
			array.remove(EFFECT_DEF_III_N);
		break;
		case EFFECT_DEF_III_N:
			array.remove(EFFECT_DEF_II);
			array.remove(EFFECT_DEF_III);
			array.remove(EFFECT_DEF_I_N);
			array.remove(EFFECT_DEF_II_N);
			array.remove(EFFECT_DEF_I);
		break;
		case EFFECT_CONSTITUTION_I:
			array.remove(EFFECT_CONSTITUTION_II);
			array.remove(EFFECT_CONSTITUTION_I_N);
			array.remove(EFFECT_CONSTITUTION_II_N);
		break;
		case EFFECT_CONSTITUTION_II:
			array.remove(EFFECT_CONSTITUTION_I);
			array.remove(EFFECT_CONSTITUTION_I_N);
			array.remove(EFFECT_CONSTITUTION_II_N);
		break;
		case EFFECT_STRENGTH_I:
			array.remove(EFFECT_STRENGTH_II);
			array.remove(EFFECT_STRENGTH_I_N);
			array.remove(EFFECT_STRENGTH_II_N);
		break;
		case EFFECT_STRENGTH_II:
			array.remove(EFFECT_STRENGTH_I);
			array.remove(EFFECT_STRENGTH_I_N);
			array.remove(EFFECT_STRENGTH_II_N);
		break;
		case EFFECT_WILLPOWER_I:
			array.remove(EFFECT_WILLPOWER_II);
			array.remove(EFFECT_WILLPOWER_I_N);
			array.remove(EFFECT_WILLPOWER_II_N);
		break;
		case EFFECT_WILLPOWER_II:
			array.remove(EFFECT_WILLPOWER_I);
			array.remove(EFFECT_WILLPOWER_I_N);
			array.remove(EFFECT_WILLPOWER_II_N);
		break;
		case EFFECT_PERCEPTION_I:
			array.remove(EFFECT_PERCEPTION_II);
			array.remove(EFFECT_PERCEPTION_I_N);
			array.remove(EFFECT_PERCEPTION_II_N);
		break;
		case EFFECT_PERCEPTION_II:
			array.remove(EFFECT_PERCEPTION_I);
			array.remove(EFFECT_PERCEPTION_I_N);
			array.remove(EFFECT_PERCEPTION_II_N);
		break;
		case EFFECT_LEADERSHIP_I:
			array.remove(EFFECT_LEADERSHIP_II);
			array.remove(EFFECT_LEADERSHIP_I_N);
			array.remove(EFFECT_LEADERSHIP_II_N);
		break;
		case EFFECT_LEADERSHIP_II:
			array.remove(EFFECT_LEADERSHIP_I);
			array.remove(EFFECT_LEADERSHIP_I_N);
			array.remove(EFFECT_LEADERSHIP_II_N);
		break;
		case EFFECT_CONSTITUTION_I_N:
			array.remove(EFFECT_CONSTITUTION_II);
			array.remove(EFFECT_CONSTITUTION_I);
			array.remove(EFFECT_CONSTITUTION_II_N);
		break;
		case EFFECT_CONSTITUTION_II_N:
			array.remove(EFFECT_CONSTITUTION_II);
			array.remove(EFFECT_CONSTITUTION_I_N);
			array.remove(EFFECT_CONSTITUTION_II);
		break;
		case EFFECT_STRENGTH_I_N:
			array.remove(EFFECT_STRENGTH_II);
			array.remove(EFFECT_STRENGTH_I);
			array.remove(EFFECT_STRENGTH_II_N);
		break;
		case EFFECT_STRENGTH_II_N:
			array.remove(EFFECT_STRENGTH_II);
			array.remove(EFFECT_STRENGTH_I_N);
			array.remove(EFFECT_STRENGTH_I);
		break;
		case EFFECT_WILLPOWER_I_N:
			array.remove(EFFECT_WILLPOWER_II);
			array.remove(EFFECT_WILLPOWER_I);
			array.remove(EFFECT_WILLPOWER_II_N);
		break;
		case EFFECT_WILLPOWER_II_N:
			array.remove(EFFECT_WILLPOWER_II);
			array.remove(EFFECT_WILLPOWER_I_N);
			array.remove(EFFECT_WILLPOWER_II);
		break;
		case EFFECT_PERCEPTION_I_N:
			array.remove(EFFECT_PERCEPTION_II);
			array.remove(EFFECT_PERCEPTION_I);
			array.remove(EFFECT_PERCEPTION_II_N);
		break;
		case EFFECT_PERCEPTION_II_N:
			array.remove(EFFECT_PERCEPTION_II);
			array.remove(EFFECT_PERCEPTION_I_N);
			array.remove(EFFECT_PERCEPTION_I);
		break;
		case EFFECT_LEADERSHIP_I_N:
			array.remove(EFFECT_LEADERSHIP_II);
			array.remove(EFFECT_LEADERSHIP_I);
			array.remove(EFFECT_LEADERSHIP_II_N);
		break;
		case EFFECT_LEADERSHIP_II_N:
			array.remove(EFFECT_LEADERSHIP_II);
			array.remove(EFFECT_LEADERSHIP_I_N);
			array.remove(EFFECT_LEADERSHIP_I);
		break;
		case EFFECT_REGEN_I:
			array.remove(EFFECT_REGEN_II);
			array.remove(EFFECT_DEGEN_I);
			array.remove(EFFECT_DEGEN_II);
		break;
		case EFFECT_REGEN_II:
			array.remove(EFFECT_REGEN_I);
			array.remove(EFFECT_DEGEN_I);
			array.remove(EFFECT_DEGEN_II);
		break;
		case EFFECT_DEGEN_I:
			array.remove(EFFECT_REGEN_II);
			array.remove(EFFECT_REGEN_I);
			array.remove(EFFECT_DEGEN_II);
		break;
		case EFFECT_DEGEN_II:
			array.remove(EFFECT_REGEN_II);
			array.remove(EFFECT_REGEN_I);
			array.remove(EFFECT_DEGEN_I);
		break;
	}
}

// resets all the 'pixels' on the screen
function clearScreen () {
	screen.pixels = new Array(screen.height);
	for (var i = 0; i < screen.height; i++) {
		screen.pixels[i] = new PixelArray(screen.width, ' ', '#333333');
	}
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

function getEnemiesInRadius(pos, radius) {
	var results = [];
	for (var i = dungeon.npcs.length - 1; i >= 0; i--) {
		var enemy = dungeon.npcs[i];
		var dx = pos.x - enemy.x;
		var dy = pos.y - enemy.y;
		var distance = Math.sqrt(dx*dx + dy*dy);
		if (distance <= radius)
			results.push(enemy);
	}
	return results;
}

function getNonStaticEntitiesInRadius(pos, radius) {
	var results = [];
	for (var i = radius - 1; i > -radius; i--) {
		for (var j = radius - 1; j > -radius; j--) {
			if (pos.y + i >= 0 &&
				pos.y + i < dungeon.tiles.length &&
				pos.x + j >= 0 &&
				pos.x + j < dungeon.tiles[pos.y + i].length) {
				var x = j;
				var y = i;
				var distance = Math.sqrt(x*x + y*y);
				if (distance <= radius) {
					var tile = dungeon.tiles[pos.y + i][pos.x + j];
					if (tile.entities.length > 0) {
						for (var k = tile.entities.length - 1; k >= 0; k--) {
							var entity = tile.entities[k];
							if (entity.simulatesPhysics)
								results.push(entity);
						}
					}
				}
			}
		}
	}
	return results;
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

 		var tile = tiles[y0][x0];
 		
 		// since we are a valid spot, set the tile to visible
 		tile.viewState = VIEW_STATE_VISIBLE;

 		if (tile.entities.length > 0) {
 			var entity = tile.entities.peek();
 			entity.visible = true;

 			if (!onScreenEntities.includes(entity))
 				onScreenEntities.push(entity);
 			
 			if (typeof entity.discovered !== 'undefined') {
	 			if (bored && (!entity.discovered || entity.type == ENTITY_ENEMY)) {
	 				bored = false;
	 				if (!entity.discovered) {
		 				entity.discovered = true;
		 				log.add("A " + entity.name + " comes into view.");
	 				}
	 			}
 			}
 		}

 		// if we are obstructed, quit traversing
 		if (tile.getOpaque())
 			return false;

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

 	return true;
}

// using bresenhams, trace a ray to a point
// used to see if we have line of sight
function traceLine (p, q, tiles) {
	// Besenham's Line Equation
	var x0 = p.x, y0 = p.y;
	var x1 = q.x, y1 = q.y;
	var dx = Math.abs(x1 - x0), sx = x0 < x1 ? 1 : -1;
	var dy = Math.abs(y1 - y0), sy = y0 < y1 ? 1 : -1;
	var err = (dx > dy ? dx : -dy) / 2;
 	// iterate from point 1 to point 2
 	while (true) {

 		var tile = tiles[y0][x0];
 		
 		// if we are obstructed, quit traversing
 		if (tile.getOpaque())
 			return false;

 		// rest of the algorithm
 		if (x0 === x1 && y0 === y1)
 			return true;

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
 	return true;
}

// using bresenhams, trace a ray to a point
// used to see if we can see the item dropped
// if so, set it as discovered
function lookAtItem (p, q, tiles) {
	// Besenham's Line Equation
	var x0 = p.x, y0 = p.y;
	var x1 = q.x, y1 = q.y;
	var dx = Math.abs(x1 - x0), sx = x0 < x1 ? 1 : -1;
	var dy = Math.abs(y1 - y0), sy = y0 < y1 ? 1 : -1;
	var err = (dx > dy ? dx : -dy) / 2;
 	// iterate from point 1 to point 2
 	while (true) {

 		var tile = tiles[y0][x0];

 		if (tile.entities.length > 0 && typeof tile.entities.peek().discovered !== 'undefined') {
 			if (!tile.entities.peek().discovered) {
 				tile.entities.peek().discovered = true;
 				bored = false;
 			}
 		}
 		
 		// if we are obstructed, quit traversing
 		if (tile.getOpaque())
 			return false;

 		// rest of the algorithm
 		if (x0 === x1 && y0 === y1)
 			return true;

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
 	return true;
}

// add pixel effect, apply damage, light tiles
// do all the things the microwave skill does
function layMicrowaveI (p, q, tiles) {
	var topleft = {x:Math.round(player.x - mapDisplayWidth / 2),
				   y:Math.round(player.y - mapDisplayHeight / 2)};

	var enlightenedTiles = [];

	var damage = Math.max(player.willpower / 3, 1);

	// Besenham's Line Equation
	var x0 = p.x, y0 = p.y;
	var x1 = q.x, y1 = q.y;
	var dx = Math.abs(x1 - x0), sx = x0 < x1 ? 1 : -1;
	var dy = Math.abs(y1 - y0), sy = y0 < y1 ? 1 : -1;
	var err = (dx > dy ? dx : -dy) / 2;
 	// iterate from point 1 to point 2
 	while (true) {

 		var tile = tiles[y0][x0];

 		// add pixel effect
 		var ourDx = player.x - x0;
 		var ourDy = player.y - y0;
 		if (ourDx > -mapDisplayWidth / 2 && ourDx < mapDisplayWidth / 2 &&
 			ourDy > -mapDisplayHeight / 2 && ourDy < mapDisplayHeight / 2) {
 			pixelEffects.push({type:PIXEL_MICROWAVE, x: screen_player_x - ourDx, y:screen_player_y - ourDy });
 		}

 		// illuminate adjacent
 		for (var i = MOVE_OPTIONS.length - 1; i >= 0; i--) {
			var offset = MOVE_OPTIONS[i];
			var newTile = tiles[y0 + offset.y][x0 + offset.x];
			enlightenedTiles.refSetAdd(newTile);
		}

 		// do damage
 		if (tile.hasEnemy()) {
 			dealDamage(player, damage, tile.getEnemy());
 		}
 		
 		// if we are obstructed, quit traversing
 		// stop at enemies, not half walls
 		if (tile.getSolid()) {
 			if (tile.entities.length > 0) {
 				if (tile.entities.peek() != player)
 					break;
 			} else if (tile.getOpaque()) {
 				break;
 			}
 		}

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

 	// light up all the tiles we should have encountered in our traversal
 	for (var i = enlightenedTiles.length - 1; i >= 0; i--) {
 		var tile = enlightenedTiles[i]; 		
 		tile.viewState = VIEW_STATE_VISIBLE;
 	}
}

// stopping only at permanent solid
function layMicrowaveII (p, q, tiles) {
	var topleft = {x:Math.round(player.x - mapDisplayWidth / 2),
				   y:Math.round(player.y - mapDisplayHeight / 2)};

	var enlightenedTiles = [];

	var damage = Math.max(player.willpower / 2, 1);

	// Besenham's Line Equation
	var x0 = p.x, y0 = p.y;
	var x1 = q.x, y1 = q.y;
	var dx = Math.abs(x1 - x0), sx = x0 < x1 ? 1 : -1;
	var dy = Math.abs(y1 - y0), sy = y0 < y1 ? 1 : -1;
	var err = (dx > dy ? dx : -dy) / 2;
 	// iterate from point 1 to point 2
 	while (true) {

 		var tile = tiles[y0][x0];

 		// add pixel effect
 		var ourDx = player.x - x0;
 		var ourDy = player.y - y0;
 		if (ourDx > -mapDisplayWidth / 2 && ourDx < mapDisplayWidth / 2 &&
 			ourDy > -mapDisplayHeight / 2 && ourDy < mapDisplayHeight / 2) {
 			pixelEffects.push({type:PIXEL_MICROWAVE, x: screen_player_x - ourDx, y:screen_player_y - ourDy });
 		}

 		// illuminate adjacent
 		for (var i = MOVE_OPTIONS.length - 1; i >= 0; i--) {
			var offset = MOVE_OPTIONS[i];
			var newTile = tiles[y0 + offset.y][x0 + offset.x];
			enlightenedTiles.refSetAdd(newTile);
		}

 		// do damage 		
 		if (tile.hasEnemy()) {
 			dealDamage(player, damage, tile.getEnemy());
 		}
 		
 		// if we are obstructed, quit traversing
 		if ((tile.getPermanentSolid(player.faction) && tile.getOpaque()) && !(tile.entities.length > 0 && tile.entities.peek() == player))
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

 	// light up all the tiles we should have encountered in our traversal
 	for (var i = enlightenedTiles.length - 1; i >= 0; i--) {
 		var tile = enlightenedTiles[i]; 		
 		tile.viewState = VIEW_STATE_VISIBLE;
 	}
}

// fatter beam
function layMicrowaveIII (p, q, tiles) {
	var topleft = {x:Math.round(player.x - mapDisplayWidth / 2),
				   y:Math.round(player.y - mapDisplayHeight / 2)};

	var enlightenedTiles = [];
	var microwaveTiles = [{x:p.x, y:p.y}];
	var damage = Math.max(player.willpower / 2, 1);

	// Besenham's Line Equation
	var x0 = p.x, y0 = p.y;
	var x1 = q.x, y1 = q.y;
	var dx = Math.abs(x1 - x0), sx = x0 < x1 ? 1 : -1;
	var dy = Math.abs(y1 - y0), sy = y0 < y1 ? 1 : -1;
	var err = (dx > dy ? dx : -dy) / 2;
 	// iterate from point 1 to point 2
 	while (true) {

 		var tile = tiles[y0][x0];
 		
 		// if we are obstructed, quit traversing
 		if ((tile.getPermanentSolid(player.faction) && tile.getOpaque()) && !(tile.entities.length > 0 && tile.entities.peek() == player)) {
 			break;
 		}

 		// add to our extended beam
 		if (!(y0 == p.y && x0 == p.x)) {
	 		for (var i = MOVE_OPTIONS.length - 1; i >= 0; i--) {
				var offset = MOVE_OPTIONS[i];
				microwaveTiles.setAdd({x:x0 + offset.x, y:y0 + offset.y});
			}
 		}

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

 	for (var i = microwaveTiles.length - 1; i >= 0; i--) {
 		var pos = microwaveTiles[i];
 		var tile = tiles[pos.y][pos.x];

 		// add pixel effect
 		var ourDx = player.x - pos.x;
 		var ourDy = player.y - pos.y;
 		if (ourDx > -mapDisplayWidth / 2 && ourDx < mapDisplayWidth / 2 &&
 			ourDy > -mapDisplayHeight / 2 && ourDy < mapDisplayHeight / 2) {
 			pixelEffects.push({type:PIXEL_MICROWAVE, x: screen_player_x - ourDx, y:screen_player_y - ourDy});
 		}
 		
 		// do damage 		
 		if (tile.hasEnemy()) {
 			dealDamage(player, damage, tile.getEnemy());
 		}

 		// illuminate adjacent
 		if (!tile.getOpaque()) {
	 		for (var j = MOVE_OPTIONS.length - 1; j >= 0; j--) {
				var offset = MOVE_OPTIONS[j];
				var newTile = tiles[pos.y + offset.y][pos.x + offset.x];
				enlightenedTiles.refSetAdd(newTile);
			}
 		}
 	}

 	// light up all the tiles we should have encountered in our traversal
 	for (var i = enlightenedTiles.length - 1; i >= 0; i--) {
 		var tile = enlightenedTiles[i]; 		
 		tile.viewState = VIEW_STATE_VISIBLE;
 	}
}

// using bresenhams, trace a ray to a point
function getLastUnobstructedTile (p, q, tiles) {
	// Besenham's Line Equation
	var x0 = p.x, y0 = p.y;
	var x1 = q.x, y1 = q.y;
	var dx = Math.abs(x1 - x0), sx = x0 < x1 ? 1 : -1;
	var dy = Math.abs(y1 - y0), sy = y0 < y1 ? 1 : -1;
	var err = (dx > dy ? dx : -dy) / 2;
	var lastY = y0;
	var lastX = x0;
 	// iterate from point 1 to point 2
 	while (true) {

 		var tile = tiles[y0][x0];

 		// if we are obstructed, quit traversing
 		if (tile.getSolid() && (y0 != p.y || x0 != p.x))
 			return {x: lastX, y: lastY};

 		// rest of the algorithm
 		if (x0 === x1 && y0 === y1)
 			return q;

 		lastY = y0;
 		lastX = x0;

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

// using bresenhams, trace a ray to a point
function safeFromForce (p, q, tiles) {
	// Besenham's Line Equation
	var x0 = p.x, y0 = p.y;
	var x1 = q.x, y1 = q.y;
	var dx = Math.abs(x1 - x0), sx = x0 < x1 ? 1 : -1;
	var dy = Math.abs(y1 - y0), sy = y0 < y1 ? 1 : -1;
	var err = (dx > dy ? dx : -dy) / 2;
	var lastY = y0;
	var lastX = x0;
 	// iterate from point 1 to point 2
 	while (true) {

 		var tile = tiles[y0][x0];

 		// if we are obstructed, quit traversing
 		if (tile.isForceBlocking() && (y0 != p.y || x0 != p.x))
 			return true;

 		// rest of the algorithm
 		if (x0 === x1 && y0 === y1)
 			return false;

 		lastY = y0;
 		lastX = x0;

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
	color = typeof color !== 'undefined' ?  color : COLOR_DEFAULT;
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
			return this.splice(i,1)[0];
	}
}

/*				Base Class Helper functions					*/

// for the console/log
Array.prototype.add = function (entry, timestamp = true) {
	// don't log duplicates for the same gameTick!
	for (var i = log.length - 1; i >= Math.max(0, log.length - 3); i--) {
		var tick = log[i].substr(1, log[i].indexOf(']') - 1);
		var oldEntry = log[i].substr(log[i].indexOf(']') + 1, log[i].length - log[i].indexOf(']') - 1);
		if (tick == gameTicks && oldEntry == entry)
			return;
	}

	if (log.length >= LOG_LENGTH)
		log.shift();

	// if we want to add a timestamp, make it so
	var timestampString = "";
	if (timestamp) {
		timestampString = "[" + gameTicks + "]";
		for (var i = timestampString.length - 1; i >= 0; i--) {
			timestampString[i].color = COLOR_OUT_OF_SIGHT;
		}
	}
	
	log.push(timestampString + entry);
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
Array.prototype.peekWeighted = function() {
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

Array.prototype.popFirst = function() {
	return this.splice(0, 1)[0];
}

Array.prototype.remove = function(element) {
	for (var i = this.length - 1; i >= 0; i--) {
		if (this[i] == element)
			this.splice(i, 1)[0];
	}
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
			return this.splice(i,1)[0];
	}
}

// string

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
}