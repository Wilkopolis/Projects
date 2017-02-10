// if we are interacting with a chest
var scopeChest;

function chestOnKeyDown(event) {
	event = event || window.event;

	var keyCode = event.keyCode;

	switch (keyCode) {
	    // Tab 09
	    case 9:
	    event.preventDefault();
	    break;
		// backspace 08
	    case 8:
	    gameState = STATE_GAME;
	    document.onkeydown = gameOnKeyDown;
	    if (scopeChest.contents.length == 0)
	    	dungeon.tiles[scopeChest.y][scopeChest.x].entities.remove(scopeChest);
	    relight();
	    windows[SCREEN_GAME].redraw(gameTicks);
	    break;
	    // escape 27
	    case 27:
	    gameState = STATE_GAME;
	    document.onkeydown = gameOnKeyDown;
	    if (scopeChest.contents.length == 0)
	    	dungeon.tiles[scopeChest.y][scopeChest.x].entities.remove(scopeChest);
	    relight();
	    windows[SCREEN_GAME].redraw(gameTicks);
	    break;
	    // enter 13 
	    case 13:
	   	if (selectChestItem())
	   		windows[SCREEN_GAME].redraw(gameTicks);
	    break;
	    // space 32
	    case 32:
	   	if (selectChestItem())
	   		windows[SCREEN_GAME].redraw(gameTicks);
	    break;	    
		case KEY_NORTH: 
	    moveChest({x:0, y:-1});	    	  
	    break;
	    case KEY_NORTH_EAST:
	    moveChest({x:1, y:-1});	    	  
	    break;
	    case KEY_EAST: 
	    moveChest({x:1, y:0});	    	  
	    break;
	    case KEY_SOUTH_EAST:
	    moveChest({x:1, y:1});	    	  
	    break;
	    case KEY_SOUTH:
	    moveChest({x:0, y:1});
	    break;
	    case KEY_SOUTH_WEST:
	    moveChest({x:-1, y:1});	    	  
	    break;
	    case KEY_WEST: 
	    moveChest({x:-1, y:0});	    	  
	    break;
	    case KEY_NORTH_WEST: 
	    moveChest({x:-1, y:-1});	    	  
	    break;
	    case KEY_WAIT: 
	    moveChest({x:0, y:0});
	    break; 
	    // right arrow 39
	    case 39: 
	    moveChest({x:1, y:0});	    	  
	    break;
	    // left arrow 37
	    case 37: 
	    moveChest({x:-1, y:0});	    	  
	    break;
	    // ?
	    case 191:
	    if (!event.shiftKey)
	    	return;
	    if (!helped) {
	    	helped = true;
	    }
	    if (helping) {
	    	helpDiv.style.display = "none";
	    } else {	    	
	    	helpDiv.style.display = "block";
	    }
	    helping = !helping;
	    break;
		default:break;
	}
}

var CHEST_STRING = "Reward Cache";
var chestCursorPos = 0;
function drawChest () {
	// draw the section title
	var chestString = "Reward Cache";	
	var xStart = screen_center_x - Math.round(chestString.length / 2) + 1;
	for (var i = chestString.length - 1; i >= 0; i--) {
			windows[SCREEN_GAME].screen.pixels[3][xStart + i].char = chestString[i];
			windows[SCREEN_GAME].screen.pixels[3][xStart + i].color = COLOR_DEFAULT;
	}
	var descriptionString = "";
	// draw our options
	for (var i = scopeChest.contents.length - 1; i >= 0; i--) {
		var item = scopeChest.contents[i];
		var color = COLOR_CLASS_NAME;

		var chestString = "";
		for (var j = chestString.length - 1; j >= 0; j--) {
			var tempColor = color;
			if (chestString[j] == '[' || chestString[j] == ']') {
				if (i == chestCursorPos)
					tempColor = COLOR_DEFAULT;
				else
					tempColor = COLOR_CLASS_NAME;
			}
			windows[SCREEN_GAME].screen.pixels[WELCOME_Y_OFFSET + i * 2][WELCOME_X_OFFSET + j - tempOffset].char = chestString[j];
			windows[SCREEN_GAME].screen.pixels[WELCOME_Y_OFFSET + i * 2][WELCOME_X_OFFSET + j - tempOffset].color = tempColor;
		}
	}
}

function moveChest(offset) {
	if (offset.x == 0)
		chestCursorPos = Math.min(Math.max(offset.y + chestCursorPos, 0), scopeChest.contents.length - 1);
	windows[SCREEN_GAME].redraw(gameTicks);
}

var MAX_INVENTORY_LENGTH = 52;
function selectChestItem() {
	if (scopeChest.contents.length == 0)
		return false;
	var item = scopeChest.contents[chestCursorPos];
	if (player.inventory.length < MAX_INVENTORY_LENGTH) {
		player.inventory.pickUp(scopeChest.contents.splice(chestCursorPos,1)[0]);
		moveChest({x:0,y:0});
		return true;
	}
	return false;
}