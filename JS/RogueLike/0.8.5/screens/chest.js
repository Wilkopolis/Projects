// if we are interacting with a chest
var scopeChest;

function chestOnKeyDown(event) {
	event = event || window.event;

	var keyCode = event.keyCode;

	switch (keyCode) {
		// backspace 08
	    case 8:
	    gameState = STATE_GAME;
	    document.onkeydown = gameOnKeyDown;
	    relight();
	    draw();
	    break;
	    // escape 27
	    case 27:
	    gameState = STATE_GAME;
	    document.onkeydown = gameOnKeyDown;
	    relight();
	    draw();
	    break;
	    // enter 13 
	    case 13:
	   	if (selectChestItem())
	   		draw();
	    break;
	    // space 32
	    case 32:
	   	if (selectChestItem())
	   		draw();
	    break;
	    // keypad 8 104
	    // w 		87
	    case 104: 
	    moveChest({x:0, y:-1});	    	  
	    break;
	    // keypad 9 105
	    // e 		69
	    case 105:
	    moveChest({x:1, y:-1});	    	  
	    break;
	    // keypad 6 102
	    // d 		68
	    case 102: 
	    moveChest({x:1, y:0});	    	  
	    break;
	    // keypad 3 99
	    // c 		67
	    case 99:
	    moveChest({x:1, y:1});	    	  
	    break;
	    // keypad 2 98
	    // x		88
	    case 98:
	    moveChest({x:0, y:1});
	    break;
	    // keypad 1 97
	    // z		90
	    case 97:
	    moveChest({x:-1, y:1});	    	  
	    break;
	    // keypad 4 100
	    // a 		65
	    case 100: 
	    moveChest({x:-1, y:0});	    	  
	    break;
	    // keypad 7 103
	    // q 		81
	    case 103: 
	    moveChest({x:-1, y:-1});	    	  
	    break;
	    // keypad 5 101
	    // s 		83
	    case 101: 
	    moveChest({x:0, y:0});
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
	var xStart = screen_center_x - Math.round(CHEST_STRING.length / 2) + 1;
	for (var i = CHEST_STRING.length - 1; i >= 0; i--) {		
		screen.pixels[INVENTORY_STRING_Y][xStart + i].char = CHEST_STRING[i];
		screen.pixels[INVENTORY_STRING_Y][xStart + i].color = COLOR_DEFAULT;
	}

	for (var i = scopeChest.contents.length - 1; i >= 0; i--) {
		var item = scopeChest.contents[i];
		var itemName = item.name;
		var itemString = itemName;
		var color = item.color;
		for (var j = itemString.length - 1; j >= 0; j--) {
			screen.pixels[INVENTORY_STRING_Y + 3 + i * 2][xStart - 10 + j].char = itemString[j];
			screen.pixels[INVENTORY_STRING_Y + 3 + i * 2][xStart - 10 + j].color = COLOR_DEFAULT;
			if (i == chestCursorPos)
				screen.pixels[INVENTORY_STRING_Y + 3 + i * 2][xStart - 10 + j].font = FONT_STYLE_BOLD;
		}
	}
}

function moveChest(offset) {
	if (offset.x == 0)
		chestCursorPos = Math.min(Math.max(offset.y + chestCursorPos, 0), scopeChest.contents.length - 1);
	draw();
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