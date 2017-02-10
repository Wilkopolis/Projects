/*				Screen functions				*/

var logOffset = 0;
function drawLog () {
	var log_limit;
	// if we have objectives that updating, draw less log entries
	switch(objectives.getTickingObjectives().length) {
		case 1: log_limit = 4; break;
		case 2: log_limit = 2; break;
		case 3: log_limit = 1; break;
		default: log_limit = LOG_DISPLAY_LENGTH; break;
	}
	var limit = Math.min(log.length, log_limit);
	for (var i = 0; i < limit; i++) {
		var logEntry = log[log.length - i - 1 + logOffset];
		var color = COLOR_DEFAULT;
		for (var j = logEntry.length - 1; j >= 0; j--) {
			if (logEntry[j] == "]")
				color = COLOR_OUT_OF_SIGHT;
			screen.pixels[CONSOLE_Y_OFFSET + 2 * i][CONSOLE_X_OFFSET + j].char = logEntry[j];
			screen.pixels[CONSOLE_Y_OFFSET + 2 * i][CONSOLE_X_OFFSET + j].color = color;
		}
	}
}

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

var onScreenEntities = [];
function drawEnemyLog() {
	var enemies = getOSEObject();
	var i = 0;
	for (var enemyEntry in enemies) {
		screen.pixels[27 + i * 2][55].char = enemies[enemyEntry].entity.char;
		screen.pixels[27 + i * 2][55].color = enemies[enemyEntry].entity.color;
		var enemyString = " " + enemyEntry;
		if (enemies[enemyEntry].count > 1)
			enemyString += " x" + enemies[enemyEntry].count;
		for (var j = enemyString.length - 1; j >= 0; j--) {
			screen.pixels[27 + i * 2][56 + j].char = enemyString[j];
			screen.pixels[27 + i * 2][56 + j].color = COLOR_DEFAULT;
		}
		i++;
	}
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
function draw(tick) {

	if (tick != gameTicks)
		return;

	if (flipping) {
		relight();
	}			

	clearScreen();
	switch(gameState) { 

		case STATE_BACKGROUND:
			drawBackground();
		break;

		case STATE_LOADOUT:
			drawLoadout();
		break;

		case STATE_SWITCHBOARD:
			drawSwitchboard();
		break;

		case STATE_GAME:
			if (fullscreen) {			
				drawMap();
			} else {

				if (examinedEntity != null)
					drawExamine();
				else
					drawEnemyLog();

				var inRoom = dungeon.tiles[player.y][player.x].inRoom;
				if (inRoom && dungeon.getRoom().captureAmount != 1 && dungeon.getRoom().isRoom)
					drawCapture();

				drawStats();
				drawHP();
				drawShield();
				drawXP();
				drawMiniMap();
				drawMap();			
				drawLog();
				drawObjectives();
				drawEffectDivs();

				if (flipping) {
					flip = !flip;

					window.setTimeout(function(){draw(tick);}, CURSOR_INTERVAL);
				}
			
			}
		break;

		case STATE_FIRMWARE:
			drawFirmware();
		break;

		case STATE_SKILLS:
			drawSkills();
		break;

		case STATE_4X_MODE:	
			drawStats();
			draw4X();
			drawTasks();
			if (selectedRoomHash > 0)
				drawRoomInfo();
		break;

		case STATE_INVENTORY:
			drawInventory();
			drawCharacterInfo();
		break;

		case STATE_CHEST:
			drawChest();
		break;

		case STATE_SHOP:
			drawShop();
		break;

		// the landing page
		case STATE_LANDING:
			drawWelcome();
		break;
	}
	redraw();
}

var PIXEL_INVERT = 'invert';
var PIXEL_MICROWAVE = 'microwave';
var PIXEL_4X_SELECTED = '4x_selected';
var pixelEffects = [];
// if we have to draw when 1 tile has a projectile/enemy
// use this bool to flip and draw while waiting
var flipping = false;
var flip = false;
function redraw () {

	// apply all special pixel effects
	for (var i = pixelEffects.length - 1; i >= 0; i--) {
		var effect = pixelEffects[i];
		switch(effect.type) {
			case PIXEL_INVERT:
			screen.pixels[effect.y][effect.x].invert = true;			
			break;
			case PIXEL_MICROWAVE:
			screen.pixels[effect.y][effect.x].microwave = true;
			break;
			case PIXEL_4X_SELECTED:
			screen.pixels[effect.y][effect.x].fourXSelected = true;
			break;
			case EVENT_GENERATOR:
			screen.pixels[effect.y][effect.x].generator = true;				
			break;
			case EVENT_GENES:
			screen.pixels[effect.y][effect.x].genes = true;				
			break;
			case EVENT_MASTERMIND:
			screen.pixels[effect.y][effect.x].puzzle = true;
			break;
			case EVENT_CITY_HALL:
			screen.pixels[effect.y][effect.x].cityHall = true;	
			break;
			case EVENT_CITY_OS:
			screen.pixels[effect.y][effect.x].cityOS = true;	
			break;
		}
	}

	ctx.clearRect(0, 0, canvas.width, canvas.height);

	for (var i = 0; i < DISPLAY_HEIGHT; i++) {
		for (var j = 0; j < DISPLAY_WIDTH; j++) {
			var pixel = screen.pixels[i][j];

			// fill any healthbar
			if (pixel.hasHp) {
				ctx.fillStyle = COLOR_HP_BAR_BACKGROUND;
				ctx.fillRect(j * FONT_H_SPACE - 2, i * FONT_V_SPACE - 11, FONT_H_SPACE - 2, 3);
				ctx.fillStyle = COLOR_HP_BAR_FOREGROUND;	
				ctx.fillRect(j * FONT_H_SPACE - 2, i * FONT_V_SPACE - 11, Math.max(0, FONT_H_SPACE * pixel.hpPercent - 2), 3);
				ctx.fillStyle = COLOR_DEFAULT;
			}

			if (pixel.invert && !pixel.microwave) {
				ctx.font = FONT_STYLE_CURSOR;
				ctx.fillStyle = COLOR_DEFAULT;
				ctx.fillText(CHAR_CONSOLE, j * FONT_H_SPACE - 2, i * FONT_V_SPACE + 3);
			}

			// draw it around the character
			if (pixel.hasShield) {
				ctx.fillStyle = COLOR_SHIELD;
				ctx.font = FONT_STYLE_SHIELD;
				ctx.fillText(CHAR_SHIELD, j * FONT_H_SPACE - 4, i * FONT_V_SPACE + 2);
			}

			if (pixel.microwave) {
				ctx.font = FONT_STYLE_CURSOR;
				ctx.fillStyle = COLOR_MICROWAVE;
				ctx.fillText(CHAR_MICROWAVE, j * FONT_H_SPACE - 2, i * FONT_V_SPACE + 3);
			}

			var offset = {x:0, y:0};
			if (gameState == STATE_4X_MODE) {
			 	offset = FOURX_OFFSETS[pixel.char];
			} else if (gameState == STATE_GAME) {
				offset = OFFSETS[pixel.char];
			}

			if (pixel.fourXSelected) {
				ctx.font = FONT_STYLE_4X_S;
				ctx.fillStyle = COLOR_4X_SELECTED;
				ctx.fillText('■', j * FONT_H_SPACE - 2, i * FONT_V_SPACE + 2);
			}

			if (flip && typeof pixel.flipChar !== 'undefined') {
				pixel.char = pixel.flipChar;
				pixel.font = pixel.flipFont;
				pixel.color = pixel.flipColor;		
			}

			ctx.font = pixel.font;

			if (pixel.invert) 
				ctx.fillStyle = '#131313';
			else			
				ctx.fillStyle = pixel.color;

			if (offset != null)
				ctx.fillText(pixel.char, j * FONT_H_SPACE + offset.x, i * FONT_V_SPACE + offset.y);
			else
				ctx.fillText(pixel.char, j * FONT_H_SPACE, i * FONT_V_SPACE);

			// reset
			pixel.font = FONT_STYLE_DEFAULT;
			pixel.invert = false;
			pixel.microwave = false;
			pixel.fourXSelected = false;
		}
	}

	// ctx.fillStyle = COLOR_DEFAULT;
	// var topleft = {x: MEGAMAP_X_CENTER - Math.round(display_width_minimap / 2),
	// 			   y: MEGAMAP_Y_CENTER - Math.round(display_height_minimap / 2)};
	// for (var i = 0; i < display_height_minimap; i++) {
	// 	for (var j = 0; j < display_width_minimap; j++) {					
	// 		for (var k = 0; k <= display_width_minimap * MEGAMAP_CELL_WIDTH; k += MEGAMAP_CELL_WIDTH) {		
	// 			ctx.fillRect(topleft.x * FONT_H_SPACE + k - .5, (topleft.y - 2) * FONT_V_SPACE + 1, 1, display_height_minimap * MEGAMAP_CELL_HEIGHT);		
	// 		}
	// 		for (var k = 0; k <= display_height_minimap * MEGAMAP_CELL_HEIGHT; k += MEGAMAP_CELL_HEIGHT) {		
	// 			ctx.fillRect(topleft.x * FONT_H_SPACE, (topleft.y - 2) * FONT_V_SPACE + k + .5, display_width_minimap * MEGAMAP_CELL_WIDTH, 1);		
	// 		}
	// 	}
	// }
}

var MEGAMAP_CELL_HEIGHT = 23.1;
var MEGAMAP_CELL_WIDTH = 22.23;

function Screen (width, height) {
	this.width = width;
	this.height = height;
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
}
