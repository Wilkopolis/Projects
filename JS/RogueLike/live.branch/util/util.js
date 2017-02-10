var alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];

/*				Screen functions				*/

var onScreenEntities = [];
function getOSEObject() {
	var result = {};
	for (var i = onScreenEntities.length - 1; i >= 0; i--) {
		var entity = onScreenEntities[i];
		if (!entity.loggable)
			continue;
		if (result[entity.name] == null) {
			result[entity.name] = {entity:entity, count:1};
		} else {
			result[entity.name].count++;
		}
	}
	return result;
}

var examinedEntity;
function drawExamine() {

	// draw name
	var nameString = examinedEntity.char + ' - ' + examinedEntity.name;
	for (var i = nameString.length - 1; i >= 0; i--) {
		screen.pixels[27][56 + i].char = nameString[i];
		screen.pixels[27][56 + i].color = examinedEntity.color;
	}

	if (typeof examinedEntity.hp !== "undefined") {

		// draw hp bar		
		var hpIncrement = examinedEntity.hpMax / HP_BAR_LENGTH;
		var hpCount = hpIncrement;
		for (var i = 0; i < HP_BAR_LENGTH; i++) {
			screen.pixels[31][56 + i].char = '■';
			if (hpCount <= examinedEntity.hp + .001) 
				screen.pixels[31][56 + i].color = '#009933';
			else
				screen.pixels[31][56 + i].color = '#131324';
			hpCount += hpIncrement;
		}

		// draw hp		
		var hpString = 'HP: ' +  examinedEntity.hp + '/' + examinedEntity.hpMax;
		for (var i = hpString.length - 1; i >= 0; i--) {
			screen.pixels[33][56 + i].char = hpString[i];
			screen.pixels[33][56 + i].color = COLOR_DEFAULT;
		}
	} else if (examinedEntity.type == ENTITY_ITEM) {		

		// draw slot information
		var typeString = examinedEntity.slot;
		for (var i = typeString.length - 1; i >= 0; i--) {
			screen.pixels[29][56 + i].char = typeString[i];
			screen.pixels[29][56 + i].color = COLOR_DEFAULT;
		}

		for (var i = examinedEntity.effects.length - 1; i >= 0; i--) {
			var effectString = examinedEntity.effects[i];
			var typeString = examinedEntity.slot;
			for (var j = typeString.length - 1; j >= 0; j--) {
				screen.pixels[31 + 2 * i][56 + j].char = typeString[j];
				screen.pixels[31 + 2 * i][56 + j].color = COLOR_DEFAULT;
			}
		}
	} else if (examinedEntity.type == ENTITY_CLONING_VAT) {
		
	}
}

// to control blinking in game


// will do all the screen updating so I dont have to think about it
// every time I do any input shit


var PIXEL_INVERT = 'invert';
var PIXEL_MICROWAVE = 'microwave';
var PIXEL_4X_SELECTED = '4x_selected';
var PIXEL_CROSSHAIR = 'crosshair';
var pixelEffects = [];
var lastPixelEffectsLength = 0;
// if we have to draw when 1 tile has a projectile/enemy
// use this bool to flip and draw while waiting
var flipping = false;
var flip = false;
function redraw () {

	lastPixelEffectsLength = pixelEffects.length;

	// apply all special pixel effects
	for (var i = pixelEffects.length - 1; i >= 0; i--) {		
		var effect = pixelEffects[i];
		switch(effect.type) {
			case PIXEL_INVERT:
			windows[SCREEN_GAME].screen.pixels[effect.y][effect.x].invert = true;
			pixelEffects.splice(i,1);
			break;
			case PIXEL_MICROWAVE:
			windows[SCREEN_GAME].screen.pixels[effect.y][effect.x].microwave = true;
			break;
			case PIXEL_CROSSHAIR:
			windows[SCREEN_GAME].screen.pixels[effect.y][effect.x].crosshair = true;
			pixelEffects.splice(i,1);
			break;
		}
	}
	windows[SCREEN_GAME].ctx.clearRect(0, 0, windows[SCREEN_GAME].canvas.width, windows[SCREEN_GAME].canvas.height);

	for (var i = 0; i < DISPLAY_HEIGHT; i++) {
		for (var j = 0; j < DISPLAY_WIDTH; j++) {
			var pixel = windows[SCREEN_GAME].screen.pixels[i][j];

			// fill any healthbar
			if (pixel.hasHp) {
				windows[SCREEN_GAME].ctx.fillStyle = COLOR_HP_BAR_BACKGROUND;
				windows[SCREEN_GAME].ctx.fillRect(j * FONT_H_SPACE - 2, i * FONT_V_SPACE - 11, FONT_H_SPACE - 2, 3);
				windows[SCREEN_GAME].ctx.fillStyle = COLOR_HP_BAR_FOREGROUND;	
				windows[SCREEN_GAME].ctx.fillRect(j * FONT_H_SPACE - 2, i * FONT_V_SPACE - 11, Math.max(0, FONT_H_SPACE * pixel.hpPercent - 2), 3);
				windows[SCREEN_GAME].ctx.fillStyle = COLOR_DEFAULT;
			}

			if (pixel.invert && !pixel.microwave) {
				windows[SCREEN_GAME].ctx.font = FONT_STYLE_CURSOR;
				windows[SCREEN_GAME].ctx.fillStyle = COLOR_DEFAULT;
				windows[SCREEN_GAME].ctx.fillText(CHAR_CURSOR, j * FONT_H_SPACE - 2, i * FONT_V_SPACE + 3);
			}

			// draw it around the character
			if (pixel.hasShield) {
				windows[SCREEN_GAME].ctx.fillStyle = COLOR_SHIELD;
				windows[SCREEN_GAME].ctx.font = FONT_STYLE_SHIELD;
				windows[SCREEN_GAME].ctx.fillText(CHAR_SHIELD, j * FONT_H_SPACE - 4, i * FONT_V_SPACE + 2);
			}

			if (pixel.microwave) {
				windows[SCREEN_GAME].ctx.font = FONT_STYLE_CURSOR;
				windows[SCREEN_GAME].ctx.fillStyle = COLOR_MICROWAVE;
				windows[SCREEN_GAME].ctx.fillText(CHAR_MICROWAVE, j * FONT_H_SPACE - 2, i * FONT_V_SPACE + 3);
			}

			if (pixel.crosshair) {
				windows[SCREEN_GAME].ctx.font = '12px Lucida Console';
				windows[SCREEN_GAME].ctx.fillStyle = COLOR_FLOOR_TILE;
				windows[SCREEN_GAME].ctx.fillText(CHAR_CROSSHAIR, j * FONT_H_SPACE - 2, i * FONT_V_SPACE);				
			}

			var offset = {x:0, y:0};
			offset = OFFSETS[pixel.char];

			if (flip && typeof pixel.flipChar !== 'undefined') {
				pixel.char = pixel.flipChar;
				pixel.font = pixel.flipFont;
				pixel.color = pixel.flipColor;		
			}

			windows[SCREEN_GAME].ctx.font = pixel.font;

			if (pixel.invert) 
				windows[SCREEN_GAME].ctx.fillStyle = '#131313';
			else			
				windows[SCREEN_GAME].ctx.fillStyle = pixel.color;

			if (offset != null)
				windows[SCREEN_GAME].ctx.fillText(pixel.char, j * FONT_H_SPACE + offset.x, i * FONT_V_SPACE + offset.y);
			else
				windows[SCREEN_GAME].ctx.fillText(pixel.char, j * FONT_H_SPACE, i * FONT_V_SPACE);

			// reset
			pixel.font = FONT_STYLE_DEFAULT;
			pixel.invert = false;
			pixel.microwave = false;
			pixel.fourXSelected = false;
			pixel.crosshair = false;
			pixel.hasHp = false;
			pixel.hasShield = false;
		}
	}
}

function screen (width, height) {
	this.width = 320;
	this.height = 320;
	this.pixels = new Array(this.height);
	for (var i = 0; i < this.height; i++) {
		this.pixels[i] = new PixelArray(this.width, ' ', '#333333');
	}
}

function Pixel (char, color, font) {
	char = typeof char !== 'undefined' ?  char : ' ';
	color = typeof color !== 'undefined' ?  color : COLOR_DEFAULT;
	font = typeof font !== 'undefined' ? font : FONT_STYLE_DEFAULT;

	char = char == ' ' ? ' ' : char;

	this.char = char;
	this.color = color;
	this.font = font;

	this.hasHp = false;
	this.hpPercent = 1;
	// effects
	this.invert = false;
	this.microwave = false;
	this.fourXSelected = false;
	this.crosshair = false;
}

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
	for (var i = 0; i < DISPLAY_HEIGHT; i++) {
		for (var j = 0; j < DISPLAY_WIDTH; j++) {
			windows[SCREEN_GAME].screen.pixels[i][j].char = ' ';
		}
	}
}

function relight() {

	// reset this here
	onScreenEntities = [];

	dungeon.tiles[player.y][player.x].opaque = false;
	
	// ray trace all the way back
	var points = getEndOfSightPoints(player);
    for (var i = points.length - 1; i >= 0; i--) {
    	lightLine(player, points[i], dungeon.tiles);
    }
}

function addExposition () {
	// add player class
	log.add("Good morning citizen! Here are your assigned task(s)!");
	var objectivesStrings = objectives.getObjectiveStrings();
	for (var i = 0; i < objectivesStrings.length; i++) {
		log.add((i + 1) + ". " + objectivesStrings[i] + ".");
	}
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
 			for (var i = tile.entities.length - 1; i >= 0; i--) {
 				var entity = tile.entities[i];

 				player.metEntities[entity.hash] = true;

 				// if its a door, we know a room is there, come on
 				if (entity.type == ENTITY_DOOR && !tile.inRoom) {
					var roomPos = {x: mapXMin + Math.round((x0 - (ROOM_CELL_LENGTH - 1)/ 2) / ROOM_CELL_LENGTH), 
								   y: mapYMin + Math.round((y0 - (ROOM_CELL_LENGTH - 1)/ 2) / ROOM_CELL_LENGTH)};
					var room = roomLookup[minimap[roomPos.y][roomPos.x].hash];
					if (!room.discovered)
						discoverRoom(roomPos);
 				}

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
	var topleft = {x:Math.round(player.x - DISPLAY_WIDTH / 2),
				   y:Math.round(player.y - DISPLAY_HEIGHT / 2)};

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
 		var x = x0 - topleft.x;
 		var y = y0 - topleft.y;
 		if (x > 0 && y > 0)
 			pixelEffects.push({type:PIXEL_MICROWAVE, x:x, y:y});

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
 		else if (tile.char == CHAR_PIT)
 			return {x: x0, y: y0};

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

function grapple (player, targetTile) {

	// going to be a pos with for solid hit
	// 	{x:, y:}
	// or for entity hit
	// 	{entity:entity, pos:{x:,y:}}
	var result;
	var firstX = 0;
	var firstY = 0;
	var firstPass = true;

	var x0 = player.x, y0 = player.y;
	var x1 = targetTile.x, y1 = targetTile.y;
	var dx = Math.abs(x1 - x0), sx = x0 < x1 ? 1 : -1;
	var dy = Math.abs(y1 - y0), sy = y0 < y1 ? 1 : -1;
	var err = (dx > dy ? dx : -dy) / 2;
	var lastY = y0;
	var lastX = x0;
 	// iterate from point 1 to point 2
 	while (true) {

 		var tile = dungeon.tiles[y0][x0];

 		if (tile.entities.length > 0 && (y0 != player.y || x0 != player.x)) {
 			for (var i = tile.entities.length - 1; i >= 0; i--) {
 				var entity = tile.entities[i]; 				
 				if (entity.simulatesPhysics)
 					return {entity:entity, pos:{x:firstX, y:firstY}};
 				else
 					return {x: lastX, y: lastY};;
 			}
 		}

 		if (tile.isForceBlocking())
 			return {x: lastX, y: lastY}; 

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

 		// we need to know what our adjacent tile
 		// we leave from
 		if (firstPass) {
			firstX = x0;
			firstY = y0;
 			firstPass = false;
 		}
 	}
}


function getClearShot (targetPos) {
	// Besenham's Line Equation
	var x0 = player.x, y0 = player.y;
	var x1 = targetPos.x, y1 = targetPos.y;
	var dx = Math.abs(x1 - x0), sx = x0 < x1 ? 1 : -1;
	var dy = Math.abs(y1 - y0), sy = y0 < y1 ? 1 : -1;
	var err = (dx > dy ? dx : -dy) / 2;
	var lastY = y0;
	var lastX = x0;
 	// iterate from point 1 to point 2
 	while (true) {

 		var tile = dungeon.tiles[y0][x0];

 		// if we are obstructed, quit traversing
 		if (tile.getOpaque() && (y0 != player.y || x0 != player.x))
 			return false;

 		// rest of the algorithm
 		if (x0 === x1 && y0 === y1)
 			return true;

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

function shoot(shooter, targetPos, range, accuracy, damage) {
	var x0 = shooter.x, y0 = shooter.y;
	var x1 = targetPos.x, y1 = targetPos.y;
	var dx = Math.abs(x1 - x0), sx = x0 < x1 ? 1 : -1;
	var dy = Math.abs(y1 - y0), sy = y0 < y1 ? 1 : -1;
	var err = (dx > dy ? dx : -dy) / 2;
	var lastY = y0;
	var lastX = x0;
 	// iterate from point 1 to point 2
 	while (true) {

 		var newDx = x0 - shooter.x;
 		var newDy = y0 - shooter.y;
 		distance = Math.sqrt(newDx * newDx + newDy * newDy);
 		if (distance >= range) {
 			return;
 		}

 		var tile = dungeon.tiles[y0][x0];

 		// if we are obstructed, quit traversing
 		if (tile.entities.length > 0 && tile.entities.peek().hp !== "undefined" && (y0 != shooter.y || x0 != shooter.x)) {
 			for (var i = tile.entities.length - 1; i >= 0; i--) {
 				var entity = tile.entities[i];
 				if (typeof entity.hp !== "undefined") {

					if (shooter.statuses[EFFECT_EXPOSE_WEAKNESS]) {
						// get status count for the enemy
						var count = 0;
						var keys = Object.keys(entity.statuses);
						for (var j = 0; j < keys.length; j++) {
							var status = entity.statuses[keys[j]];

							if (status.type == STATUS_STUNNED ||
							 	status.type == STATUS_BLEEDING ||
							 	status.type == STATUS_DISARMED)
							 	count++;
						}

						damage = Math.round((count + 2) / 2 * damage);
					}

					if (shooter.statuses[EFFECT_GREED_I]) {
						var greedCount = this.statuses[EFFECT_GREED_I].count;
						factions[FACTION_CLONES].wealth += Math.floor(damage * greedCount / 3);
					}
		
					if (shooter.statuses[EFFECT_VAMPURIC]) {
						shooter.hp = Math.min(shooter.hp + Math.round(damage / 3), shooter.hpMax);
					}

					if (shooter == player && player.skills.skillObject[SKILL_DIVIDENDS].purchased) {
						factions[FACTION_CLONES].wealth += Math.floor(damage / 3);
					}

 					dealDamage(shooter, damage, entity, true);
 				}
 			}
 			return;
 		}

 		// half wall/cover
 		if (tile.getPermanentSolid() && !tile.getOpaque() && (y0 != shooter.y || x0 != shooter.x)) {
 			if (Math.random() > accuracy) {
 				return;
 			}
 		}

 		if (tile.getOpaque())
 			return;

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
	
	var htmlEntry = document.createElement('p');
	htmlEntry.className = 'characterDescription';
	htmlEntry.innerHTML = timestampString + entry;

	windows[SCREEN_LOG].contentDiv.insertBefore(htmlEntry, windows[SCREEN_LOG].contentDiv.firstChild);
	
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

function openInNewTab(url) {
  var win = window.open(url, '_blank');
  win.focus();
}