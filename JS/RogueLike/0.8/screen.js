/*				Screen functions				*/

function drawLog () {
	var limit = Math.min(log.length, LOG_DISPLAY_LENGTH);
	for (var i = 0; i < limit; i++) {
		var logEntry = log[log.length - i - 1];
		var color = COLOR_DEFAULT;
		for (var j = logEntry.length - 1; j >= 0; j--) {
			if (logEntry[j] == "]")
				color = COLOR_OUT_OF_SIGHT;
			screen.pixels[CONSOLE_Y_OFFSET + 2 * i][CONSOLE_X_OFFSET + j].char = logEntry[j];
			screen.pixels[CONSOLE_Y_OFFSET + 2 * i][CONSOLE_X_OFFSET + j].color = color;
		}
	}
}

var onScreenEnemies = {};
function drawEnemyLog() {
	for (var i = dungeon.npcs.length - 1; i >= 0; i--) {
		var enemy = dungeon.npcs[i];
		if (enemy.visible) {
			if (onScreenEnemies[enemy.name] == null) {
				onScreenEnemies[enemy.name] = {char:enemy.char, count:1};
			} else {
				onScreenEnemies[enemy.name].count++;
			}
		}
	}
	var i = 0;
	for (var enemyEntry in onScreenEnemies) {
		var enemyString = onScreenEnemies[enemyEntry].char + " " + enemyEntry;
		if (onScreenEnemies[enemyEntry].count > 1)
			enemyString += " x" + onScreenEnemies[enemyEntry].count;
		for (var j = enemyString.length - 1; j >= 0; j--) {
			screen.pixels[27 + i * 2][56 + j].char = enemyString[j];
			screen.pixels[27 + i * 2][56 + j].color = COLOR_DEFAULT;
		}
		i++;
	}
	onScreenEnemies =  {};
}

// will do all the screen updating so I dont have to think about it
// every time I do any input shit
function draw() {
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
			drawEnemyLog();
			drawCapture();
			drawStats();
			drawHP();
			drawXP();
			drawMiniMap();
			drawMap();
			if (drawObjectives())
				drawLog();
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
		break;

		case STATE_INVENTORY:
			drawInventory();
		break;

		case STATE_CHEST:
			drawChest();
		break;

		// the landing page
		case STATE_LANDING:
		drawWelcome();
		break;
	}
	if (!helped) {
		screen.pixels[screen.height - 1][screen.width - 1].char = "?";
		screen.pixels[screen.height - 1][screen.width - 1].color = COLOR_DEFAULT;
	}
	redraw();
}

function redraw () {
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

			ctx.font = pixel.font;
			ctx.fillStyle = pixel.color;			
			ctx.fillText(pixel.char, j * FONT_H_SPACE, i * FONT_V_SPACE);

			// reset
			pixel.font = FONT_STYLE_DEFAULT;
		}
	}
}

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
	color = typeof color !== 'undefined' ?  color : '#cdc0b6';
	font = typeof font !== 'undefined' ? font : FONT_STYLE_DEFAULT;

	char = char == ' ' ? ' ' : char;

	this.char = char;
	this.color = color;
	this.font = font;

	this.hasHp = false;
	this.hpPercent = 1;
}
