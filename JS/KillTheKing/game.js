var COLOR_INV_STRING 		 	= "#66FFFF";
var COLOR_ITEM_BASIC 		 	= "#66FFFF";
var COLOR_TOPBAR	 		 	= "#22324D";
var COLOR_SIDEBAR	 		 	= "#0E0E14";
var COLOR_CONSOLE_BACKGROUND 	= "#120F0F";
var COLOR_CONSOLE_PLAIN_TEXT 	= "#BDC2CA";
var COLOR_CONTAINER_BACKGROUND 	= "#1B283E";

var FONT_SIDEBAR	= "18px Courier New, monospace";

window.onload = function() {

    canvas = document.getElementById("gameCanvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    topBarHeight = Math.round(canvas.height/40);
    sideBarWidth = Math.round(canvas.width/4);
    consoleHeight = Math.round(canvas.height/5);
    consoleWidth = canvas.width - sideBarWidth;
    legendStartX = canvas.width - sideBarWidth + Math.round(sideBarWidth / 5);
    legendStartY = Math.round(canvas.height * .5);
    charWidth = 90;
    charHeight = 34;
    xJump = Math.round(consoleWidth / charWidth);
    yJump = Math.round((canvas.height - consoleHeight - topBarHeight)/ charHeight);
    startX = 0;
    startY = topBarHeight + yJump;
    menuX = Math.round(canvas.width / 10);
    menuY = Math.round(canvas.height / 10);
    menuWidth = canvas.width - sideBarWidth - (menuX * 2);
    menuHeight = canvas.height - topBarHeight - consoleHeight - (menuY * 2);

    consoleX = 4;
    consoleY = canvas.height - consoleHeight + 18;
    console = [];
    console.push("Kill the King!");

    ctx = canvas.getContext("2d");

    player = new Player();
    player.pickUp(new Dagger());

    areas = [];
    depth = 0;
    container = null;

    generateWorld();

    redraw();
};

function redraw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	var legend = [];

	ctx.font = FONT_SIDEBAR;
	for (var j = player.y - charHeight / 2; j < player.y + charHeight / 2; j++) {
		for (var i = player.x - charWidth / 2; i < player.x + charWidth / 2; i++) {
			var char = "";
			if (i >= 0 && i <= currentArea.width - 1 && j >= 0 && j <= currentArea.height - 1) {
				if (currentArea.tiles[j][i].entity != null) {
					char = currentArea.tiles[j][i].entity.char;
					ctx.fillStyle = currentArea.tiles[j][i].entity.color;
					if (char != "@")
						legend.push(char + "    " + currentArea.tiles[j][i].entity.name + ";" + currentArea.tiles[j][i].entity.color);
				} else {
					char = currentArea.tiles[j][i].char;
					ctx.fillStyle = currentArea.tiles[j][i].color;
				}
			} else {
				char = " ";
			}
			ctx.fillText(char, startX + (i - (player.x - charWidth / 2)) * xJump, startY + (j - (player.y - charHeight / 2)) * yJump);
		}
	}	

	drawTopBar();

	drawSideBar(legend);

	drawConsole();

	if (container != null) {
		drawContainerInterface();
	} else if (player.inInventory) {
		drawInventory();
	}
}

function drawTopBar() {
	ctx.fillStyle = COLOR_TOPBAR;
	ctx.fillRect(0, 0, canvas.width, topBarHeight);
}

function drawSideBar(legend) {
	ctx.fillStyle = COLOR_SIDEBAR;
	ctx.fillRect(canvas.width - sideBarWidth, topBarHeight, sideBarWidth,
		canvas.height - topBarHeight);

	ctx.font = FONT_SIDEBAR;	

	for (var i = legend.length - 1; i >= 0; i--) {
		var strings = legend[i].split(";");
		ctx.fillStyle = strings[1];
		ctx.fillText(strings[0], legendStartX, legendStartY + i * 18);
	};
}

function drawConsole() {
	ctx.fillStyle = COLOR_CONSOLE_BACKGROUND;
	ctx.fillRect(0, canvas.height - consoleHeight, consoleWidth, consoleHeight);
	ctx.fillStyle = COLOR_CONSOLE_PLAIN_TEXT;
	var start = console.length - 10;
	start = start < 0 ? 0 : start;
	var stop = console.length;
	stop = stop > 10 ? 10 : stop;
	for (var i = 0; i < stop; i++) {
		ctx.fillText(console[start + i], consoleX, consoleY + i * 18);
	};
}

function drawContainer() {
	ctx.fillStyle = COLOR_CONTAINER_BACKGROUND;
	ctx.fillRect(menuX, menuY, menuWidth, menuHeight);
}

function drawInventory() {
	drawContainer();

	ctx.font = FONT_SIDEBAR;

	for (var i = 0, len = player.inventoryStrings.length; i < len; i++) {
		ctx.fillStyle = player.inventoryStrings[i].color;
		ctx.fillText(player.inventoryStrings[i].text, menuX + 4, menuY + i * 18 + 18);
	};
}

document.onkeydown = function(event) {
    event = event || window.event;

    var keyCode = event.keyCode;

    switch (keyCode) {

    // i
    case 73:
    if (!player.interacting) {
        toggleInventory();
    }
    break;

    // keypad 8
    case 104:
    if (!player.interacting) {
        up();
    }
    break;

    // keypad 9
    case 105:
    if (!player.interacting) {
        upRight();
    }
    break;

    // keypad 6
    case 102:
    if (!player.interacting) {
        right();
    }
    break;

    // keypad 3
    case 99:
    if (!player.interacting) {
        downRight();
    }
    break;

    // keypad 2
    case 98:
    if (!player.interacting) {
        down();
    }
    break;

    // keypad 1
    case 97:
    if (!player.interacting) {
        downLeft();
    }
    break;

    // keypad 4
    case 100:
    if (!player.interacting) {
        left();
    }
    break;

    // keypad 7
    case 103:
    if (!player.interacting) {
        upLeft();
    }
    break;

    // up
    // <
    case 190:
    if (event.shiftKey) {
        if (!player.interacting) {
            stairsUp();
        }
    }
    break;

    // down
    // >
    case 188:
    if (event.shiftKey) {
        if (!player.interacting) {
            stairsDown();
        }
    }
    break;

    default:
    break;
} 
};

function Area(w, h) {
	this.creatures = [];
	this.width = w;
	this.height = h;
	this.tiles = createArray(w,h);
}

function interact(other) {
	if (other.unlocked) {
		open(other);
	} else {
		fight(other);
	}
}

function fight(other) {
	var damage = player.getDamage();
	console.push("You hit " + other.name + " for " + damage + " damage.");
	other.health -= damage;

	if (other.health <=0)
		kill(other);
}

function kill(entity) {
	console.push(entity.killText);
	currentArea.tiles[entity.y][entity.x].entity = null;
}

function open(chest) {
	container = chest;
	player.interacting = true;
}

function toggleInventory() {
	player.inInventory = !player.inInventory;
    redraw();
}

function move(y, x) {
	if (!currentArea.tiles[y][x].solid && !(currentArea.tiles[player.y][x].solid && currentArea.tiles[y][player.x].solid)) {
		currentArea.tiles[player.y][player.x].entity = null;
		player.x = x;
		player.y = y;
		currentArea.tiles[player.y][player.x].entity = player;
	} else if (currentArea.tiles[y][x].door) {
		currentArea.tiles[y][x].door = false;
		currentArea.tiles[y][x].solid = false;
		console.push("You open the door.");
		if (currentArea.tiles[y][x].char == "|")
			currentArea.tiles[y][x].char = "_";
		else if (currentArea.tiles[y][x].char == "_")
			currentArea.tiles[y][x].char = "|";
	}
}

function stairsDown() {
	if (currentArea.tiles[player.y][player.x].stairs && depth > 0) {
		currentArea.tiles[player.y][player.x].entity = null;
		currentArea = areas[--depth];	
		currentArea.tiles[player.y][player.x].entity = player;	
		redraw();
	}
}

function stairsUp() {
	if (currentArea.tiles[player.y][player.x].stairs && depth < areas.length - 1) {
		currentArea.tiles[player.y][player.x].entity = null;
		currentArea = areas[++depth];
		currentArea.tiles[player.y][player.x].entity = player;
		redraw();
	}
}

function up() {
	if (currentArea.tiles[player.y - 1][player.x].entity == null)
	{
		move(player.y - 1, player.x);
	} else {
		interact(currentArea.tiles[player.y - 1][player.x].entity);
	}
	redraw();
}

function upLeft() {
	if (currentArea.tiles[player.y - 1][player.x - 1].entity == null)
	{
		move(player.y - 1, player.x - 1);
	} else {
		interact(currentArea.tiles[player.y - 1][player.x - 1].entity);
	}
	redraw();
}

function left() {
	if (currentArea.tiles[player.y][player.x - 1].entity == null)
	{
		move(player.y, player.x - 1);
	} else {
		interact(currentArea.tiles[player.y][player.x - 1].entity);
	}
	redraw();
}

function downLeft() {
	if (currentArea.tiles[player.y + 1][player.x - 1].entity == null)
	{
		move(player.y + 1, player.x - 1);
	} else {
		interact(currentArea.tiles[player.y + 1][player.x - 1].entity);
	}
	redraw();
}

function down() {
	if (currentArea.tiles[player.y + 1][player.x].entity == null)
	{
		move(player.y + 1, player.x);
	} else {
		interact(currentArea.tiles[player.y + 1][player.x].entity);
	}
	redraw();
}

function downRight() {
	if (currentArea.tiles[player.y + 1][player.x + 1].entity == null)
	{
		move(player.y + 1, player.x + 1);
	} else {
		interact(currentArea.tiles[player.y + 1][player.x + 1].entity);
	}
	redraw();
}

function right() {
	if (currentArea.tiles[player.y][player.x + 1].entity == null)
	{
		move(player.y, player.x + 1);
	} else {
		interact(currentArea.tiles[player.y][player.x + 1].entity);
	}
	redraw();
}

function upRight() {
	if (currentArea.tiles[player.y - 1][player.x + 1].entity == null)
	{
		move(player.y - 1, player.x + 1);
	} else {
		interact(currentArea.tiles[player.y - 1][player.x + 1].entity);
	}
	redraw();
}

function NPC(x, y, char, color, name, killText) {
	this.x = x;
	this.y = y;
	this.char = char;
	this.color = color;
	this.name = name;
	this.killText = killText;

	this.maxHealth = 20;
	this.health = 20;
}

var menuKeys = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];

function Player() {
	this.x = 85;
	this.y = 30;
	this.char = "@";
	this.color = "#A1A1A0";

	this.maxHealth = 20;
	this.health = 20;

	this.interacting = false;
	this.inInventory = false;

	this.inventory = [];
	this.inventoryMap = {};
	this.inventoryStrings = [];
	this.effects = [];
	this.crit = 0;

	this.getDamage = function() {
		var damage = 0;
		for (var i = this.inventory.length - 1; i >= 0; i--) {
			if (this.inventory[i].equipped)			
				damage += this.inventory[i].damage;
		};
		return damage;
	};

	this.pickUp = function(item) {
		this.inventory.push(item);
		this.inventoryMap[menuKeys.pop()] = item;
		this.rebuildInventoryStrings();
	};

	this.rebuildInventoryStrings = function() {
		var weaponsString = {text: "Weapons\n", color: COLOR_INV_STRING};
		var weaponStrings = [];
		var armorString = {text: "Equipment\n", color: COLOR_INV_STRING};
		var armorStrings = [];
		var consumableString = {text: "Consumables\n", color: COLOR_INV_STRING};
		var consumableStrings = [];
		this.inventoryStrings = [];
		// the key is the button the item is associated with
		for (var key in this.inventoryMap) { 
			// add the text object to the appropriate list
			if (this.inventoryMap.hasOwnProperty(key) && this.inventoryMap[key].type == "weapon") {
				weaponStrings.push({text: key + " - " + this.inventoryMap[key].name, color: COLOR_ITEM_BASIC});
			}
		}
		this.inventoryStrings.concat(weaponStrings);
	};
}

function EmptyTile() {
	this.entity = null;
	this.solid = true;
	this.char = " ";
	this.color = "#434747";
}

function FloorTile() {
	this.entity = null;
	this.char = ".";
	this.color = "#434747";
}

function WallTile() {
	this.entity = null;
	this.solid = true;
	this.char = "#";
	this.color = "#627474";
}

function HorizontalDoorTile() {
	this.entity = null;
	this.solid = true;
	this.char = "|";
	//maybe make a door object with locked property
	this.door = true;
	this.color = "#997A00";
}

function VerticalDoorTile() {
	this.entity = null;
	this.solid = true;
	this.char = "_";
	//maybe make a door object with locked property
	this.door = true;
	this.color = "#997A00";
}

function LadderTile() {
	this.entity = null;
	this.stairs = true;
	this.char = "H";
	this.color = "#7A5C00";
}

function WaterTile() {
	this.entity = null;
	this.char = "~";
	this.color = "#3366FF";	
}

function HalfWallTile() {
	this.entity = null;
	this.char = "=";
	this.color = "#6B7080";	
}

function createArray(length) {
	var arr = new Array(length || 0),
	i = length;

	if (arguments.length > 1) {
		var args = Array.prototype.slice.call(arguments, 1);
		while(i--) arr[length-1 - i] = createArray.apply(this, args);
	}

	return arr;
}

function Dagger() {
	// this.char = "/";
	// this.color = "#66FFFF";
	this.equipped = true;
	this.name = "Dagger";
	this.type = "weapon";
	this.damage = 2;
}

function ConcentrationPotion() {
	this.use = function (entity) {
		entity.effects.push(new ConcentrationEffect());
	}
}

function ConcentrationEffect() {
	this.apply = function (entity) {
		entity.crit += .2;
	}
}

function Chest(items) {
	this.char = "D";
	this.name = "Chest";
	this.color = "#522900";
	this.unlocked = true;
	this.items = items;
}

function generateWorld() {

	// pick a template
	generateItems();
	processWorld(churchSunday);
	processWorld(churchSunday2);

	currentArea = areas[depth];
}

function processWorld(string) {
	var data = string.split(',');
	for (var k = 0, lena = data.length; k < len; k++) {
		data[k] = data[k].split('');
	}
	var height = data.length;
	var width = data[0].length;

	var specialIndex = 0;

	var level = new Area(width, height);
	for (var j = 0, len = data.length; j < len; j++) {
		for (var i = 0, leng = data[j].length; i < leng; i++) {
			switch (data[j][i]) {
				case " ":
				level.tiles[j][i] = new EmptyTile();
				break; 

				case "#":
				level.tiles[j][i] = new WallTile();
				break;

				case "=":
				level.tiles[j][i] = new HalfWallTile();
				break;

				case "~":
				level.tiles[j][i] = new WaterTile();
				break;

				case ".":
				level.tiles[j][i] = new FloorTile();
				break;

				case "|":
				level.tiles[j][i] = new HorizontalDoorTile();
				break;

				case "_":
				level.tiles[j][i] = new VerticalDoorTile();
				break;

				case "H":
				level.tiles[j][i] = new LadderTile();
				break;

				case "1":
				level.tiles[j][i] = new FloorTile();
				level.tiles[j][i].entity = specialItems[specialIndex++];
				break;

				case "K":
				level.tiles[j][i] = new FloorTile();
				level.tiles[j][i].entity = new NPC(i, j, 'K', "#FF9900", "King Wilko", "The King is dead.");
				break;

				case "P":
				level.tiles[j][i] = new FloorTile();
				level.tiles[j][i].entity = new NPC(i, j, 'P', "#B8B6B4", "Father Lawrence", "The Priest is dead.");
				break;

				case "G":
				level.tiles[j][i] = new FloorTile();
				level.tiles[j][i].entity = new NPC(i, j, 'G', "#398F39", "Gaurd", "The Gaurd is dead.");
				break;
			}
		}
	}
	areas.push(level);
}

function generateItems() {
	specialItems = [];

	var seed = Math.floor((Math.random() * 100) + 1);

	// Custom Office Chest West
	seed = Math.floor((Math.random() * 100) + 1);
	if (seed > 60)
		specialItems.push(new Chest([]));
	else if (seed > 40)
		specialItems.push(new Chest([]));
	else if (seed > 20)
		specialItems.push(new Chest([]));
	else if (seed > 10)
		specialItems.push(new Chest([]));
	else
		specialItems.push(new Chest([]));

	// Custom Office Chest East

	// Tailor's Chest Upstairs
	seed = Math.floor((Math.random() * 100) + 1);
	if (seed > 60)
		specialItems.push(new Chest([new Dagger()]));
	else if (seed > 40)
		specialItems.push(new Chest([new ConcentrationPotion()]));
	else if (seed > 20)
		specialItems.push(new Chest([new Dagger(), new ConcentrationPotion()]));
	else if (seed > 10)
		specialItems.push(new Chest([new Needle()]));
	else
		specialItems.push(new Chest([new Needle(), new ConcentrationPotion()]));
}