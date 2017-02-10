// set before going to shop screen
var scopeNPC;

var purchasing = false;
var selectingYes = false;

var grandTotal = 0;

function shopOnKeyDown(event) {
	event = event || window.event;

	var keyCode = event.keyCode;

	switch (keyCode) {
	    // Tab 09
	    case 9:
	    event.preventDefault();
	    break;
	    // enter 13
	    case 13:
	    // purchase/confirm
	    if (purchasing && selectingYes) {
	    	purchaseSelection();
	    } else if (purchasing && !selectingYes)
	    	purchasing = false;
	    else if (grandTotal > 0)
	    	purchasing = true;
	    draw(gameTicks);
	    break;
	    // space bar 32
	    case 32:
	    // select/confirm
	    if (purchasing && selectingYes) {
	    	purchaseSelection();
	    } else if (purchasing && !selectingYes)
	    	purchasing = false;
	    else if (scopeNPC.inventory.length > 0) {
	    	var itemEntry = scopeNPC.inventory[shopCursorPos];
	    	if (!itemEntry.selected) {
	    		// if we have enough money, add it to the total
		    	if (factions[FACTION_CLONES].wealth >= itemEntry.value + grandTotal) {
		    		grandTotal += itemEntry.value;
		    		itemEntry.selected = true;
		    	}	    		
	    	} else {
	    		// remove it from our total
	    		itemEntry.selected = false;
		    	grandTotal -= itemEntry.value;
	    	}
	    }
	    draw(gameTicks);
	    break;	    
		// backspace 08
	    case 8:
	    if (purchasing) {
	    	purchasing = false;
	    	draw(gameTicks);
	    } else {
	    	grandTotal = 0;
	    	for (var i = scopeNPC.inventory.length - 1; i >= 0; i--)
	    		scopeNPC.inventory[i].selected = false;
	    	scopeNPC = null;
		    gameState = STATE_GAME;
	    	effectsContainer.style.display = 'block';
		    document.onkeydown = gameOnKeyDown;
		    relight();
		    draw(gameTicks);	    	
	    }
	    break;
	    // escape 27
	    case 27:
	    if (purchasing) {
	    	purchasing = false;
	    	draw(gameTicks);
	    } else {
	    	grandTotal = 0;
	    	for (var i = scopeNPC.inventory.length - 1; i >= 0; i--)
	    		scopeNPC.inventory[i].selected = false;
	    	scopeNPC = null;
		    gameState = STATE_GAME;
	    	effectsContainer.style.display = 'block';
		    document.onkeydown = gameOnKeyDown;
		    relight();
		    draw(gameTicks);	    	  	
	    }
	    break;
	    case KEY_NORTH: 
	    moveShop({x:0, y:-1});	    	  
	    break;
	    case KEY_NORTH_EAST:
	    moveShop({x:1, y:-1});	    	  
	    break;
	    case KEY_EAST: 
	    moveShop({x:1, y:0});	    	  
	    break;
	    case KEY_SOUTH_EAST:
	    moveShop({x:1, y:1});	    	  
	    break;
	    case KEY_SOUTH:
	    moveShop({x:0, y:1});
	    break;
	    case KEY_SOUTH_WEST:
	    moveShop({x:-1, y:1});	    	  
	    break;
	    case KEY_WEST: 
	    moveShop({x:-1, y:0});	    	  
	    break;
	    case KEY_NORTH_WEST: 
	    moveShop({x:-1, y:-1});	    	  
	    break;
	    case KEY_WAIT: 
	    moveShop({x:0, y:0});
	    break; 
	    // right arrow 39
	    case 39: 
	    moveShop({x:1, y:0});	    	  
	    break;
	    // left arrow 37
	    case 37: 
	    moveShop({x:-1, y:0});	    	  
	    break;
	    // up arrow 38
	    case 38:
	    moveShop({x:0, y:-1});
	    break;
	    // down arrow 40
	    case 40:
	    moveShop({x:0, y:1});
	    break;
	    // ?
	    case 191:
	    if (!event.shiftKey)
	    	return;
	    if (!helped) {
	    	helped = true;
	    	draw(gameTicks);
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

function purchaseSelection() {
	var purchases = [];
	// build the array of items to buy
	for (var i = scopeNPC.inventory.length - 1; i >= 0; i--) {
		var itemEntry = scopeNPC.inventory[i];
		if (itemEntry.selected) {
			purchases.push(itemEntry);
		}
	}
	// buy them/remove them from shop
	for (var i = purchases.length - 1; i >= 0; i--) {
		var itemEntry = purchases[i];
		// remove from shop
		scopeNPC.inventory.remove(itemEntry);
		// bothers me I am use the item for the entry as well 
		// as the actually item but I will remove this field
		// to make myself feel better
		delete itemEntry.selected;
		factions[FACTION_CLONES].wealth -= itemEntry.value;
		player.inventory.pickUp(itemEntry);
	}
	// reset purchasing
	purchasing = false;
	grandTotal = 0;
	shopCursorPos = 0;
}

var startingWealth = 50;
function drawShop() {
	// draw the section title
	var shopString = "Shop";	
	var xStart = screen_center_x - Math.round(shopString.length / 2) + 1;
	for (var i = shopString.length - 1; i >= 0; i--) {
			screen.pixels[3][xStart + i - 20].char = shopString[i];
			screen.pixels[3][xStart + i - 20].color = COLOR_DEFAULT;
	}
	if (scopeNPC.inventory.length > 0) {		
		var descriptionString = "";
		// draw our options
		for (var i = scopeNPC.inventory.length - 1; i >= 0; i--) {
			var color = COLOR_CLASS_NAME;
			var shopString = scopeNPC.inventory[i].value + ':' + scopeNPC.inventory[i].name;
			var tempOffset = 7;
			// if we are choosing to take it, color it differently
			if (scopeNPC.inventory[i].selected)
				color = COLOR_DEFAULT;	
			// if our cursor is over it, draw its description and
			// put [brackets] around it
			if (i == shopCursorPos && !purchasing) {	
				shopString = '[' + shopString + ']';
				tempOffset = 8;
				descriptionString = scopeNPC.inventory[i].description;
			}
			for (var j = shopString.length - 1; j >= 0; j--) {
				var tempColor = color;
				if (shopString[j] == '[' || shopString[j] == ']') {
					if (i == shopCursorPos)
						tempColor = COLOR_DEFAULT;
					else
						tempColor = COLOR_CLASS_NAME;
				}
				screen.pixels[WELCOME_Y_OFFSET + i * 2][WELCOME_X_OFFSET + j - tempOffset].char = shopString[j];
				screen.pixels[WELCOME_Y_OFFSET + i * 2][WELCOME_X_OFFSET + j - tempOffset].color = tempColor;
			}
		}
	}

	// draw our current total
	var totalString = "Total: " + grandTotal;
	var xStart = screen_center_x - Math.round(totalString.length / 2) + 1;
	for (var i = totalString.length - 1; i >= 0; i--) {
		screen.pixels[48][xStart + i - (22 - grandTotal.toString().length)].char = totalString[i];
		screen.pixels[48][xStart + i - (22 - grandTotal.toString().length)].color = COLOR_DEFAULT;
	}

	// draw our current funds
	var wealthString = "Dosh: " + factions[FACTION_CLONES].wealth;
	var xStart = screen_center_x - Math.round(wealthString.length / 2) + 1;
	for (var i = wealthString.length - 1; i >= 0; i--) {
		screen.pixels[50][xStart + i - 20].char = wealthString[i];
		screen.pixels[50][xStart + i - 20].color = COLOR_DEFAULT;
	}

	if (purchasing) {	
		var itemCount = 0;
		for (var i = scopeNPC.inventory.length - 1; i >= 0; i--) {
			itemCount += scopeNPC.inventory[i].selected ? 1 : 0;
		}

		// if purchasing, draw the yes/no prompt
		var promptString = "Do you want purchase these ";
		promptString += itemCount;
		promptString += " items for ";
		promptString += grandTotal;
		promptString += " wealth? ";
		promptString += selectingYes ? "[Y]| N " : " Y |[N]";

		xStart = screen_center_x - Math.round(promptString.length / 2) + 1;
		for (var i = promptString.length - 1; i >= 0; i--) {
				screen.pixels[30][5 + i].char = promptString[i];
				screen.pixels[30][5 + i].color = COLOR_DEFAULT;
		}
	}

	if (scopeNPC.inventory.length > 0) {
		// draw the option description
		var yOffset = 0;
		var xPos = 0;	
		var MAX_LINE_LENGTH = 55;
		var descriptionString = scopeNPC.inventory[shopCursorPos].description;
		for (var i = 0; i < descriptionString.length; i++) {		
			xPos = i;
			if (yOffset >= 2)
				xPos -= MAX_LINE_LENGTH * yOffset/2;
			if (xPos >= MAX_LINE_LENGTH) {
				yOffset += 2;
				xPos -= MAX_LINE_LENGTH;
			}
			screen.pixels[40 + yOffset][5 + xPos].char = descriptionString[i];
			screen.pixels[40 + yOffset][5 + xPos].color = COLOR_DEFAULT;
		}
	}
}

function moveShop(offset) {
	if (purchasing) {
		if (selectingYes && offset.x > 0)
			selectingYes = false;
		else if (offset.x < 0)
			selectingYes = true;
	} else
		shopCursorPos = Math.min(Math.max(offset.y + shopCursorPos, 0), scopeNPC.inventory.length - 1);
	draw(gameTicks);
}