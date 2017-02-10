function inventoryOnKeyDown(event) {
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
	    // enter
	    case 13:
		if (player.inventory.length == 0)
			return;
	   	if (selectInventoryItem(event.shiftKey))
	   		draw();
	    break;
	    // escape 27
	    case 27:
	    gameState = STATE_GAME;
	    document.onkeydown = gameOnKeyDown;
	    relight();
	    draw();
	    break;
	    // keypad 8 104
	    // w 		87
	    case 104: 
	    moveInventory({x:0, y:-1});	    	  
	    break;
	    // keypad 9 105
	    // e 		69
	    case 105:
	    moveInventory({x:1, y:-1});	    	  
	    break;
	    // keypad 6 102
	    // d 		68
	    case 102: 
	    moveInventory({x:1, y:0});	    	  
	    break;
	    // keypad 3 99
	    // c 		67
	    case 99:
	    moveInventory({x:1, y:1});	    	  
	    break;
	    // keypad 2 98
	    // x		88
	    case 98:
	    moveInventory({x:0, y:1});
	    break;
	    // keypad 1 97
	    // z		90
	    case 97:
	    moveInventory({x:-1, y:1});	    	  
	    break;
	    // keypad 4 100
	    // a 		65
	    case 100: 
	    moveInventory({x:-1, y:0});	    	  
	    break;
	    // keypad 7 103
	    // q 		81
	    case 103: 
	    moveInventory({x:-1, y:-1});	    	  
	    break;
	    // keypad 5 101
	    // s 		83
	    case 101: 
	    moveInventory({x:0, y:0});
	    break;
	    // i
	    case 73:
	    gameState = STATE_GAME;
	    document.onkeydown = gameOnKeyDown;
	    relight();
	    draw();
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

var inventoryCursorPos = 0;
var inventoryCursorItem = null;
function drawInventory () {
	var xStart = screen_center_x - Math.round(INVENTORY_STRING.length / 2) + 1;
	for (var i = INVENTORY_STRING.length - 1; i >= 0; i--) {		
		screen.pixels[INVENTORY_STRING_Y][xStart + i].char = INVENTORY_STRING[i];
		screen.pixels[INVENTORY_STRING_Y][xStart + i].color = COLOR_DEFAULT;
	}

	var weapons = [];
	var hats = [];
	var modules = [];
	var consumables = [];
	var objectiveItems = [];
	for (var i = player.inventory.length - 1; i >= 0; i--) {
		var item = player.inventory[i]
		switch(item.slot) {
			case SLOT_WIELDABLE:weapons.push(item);break;
			case SLOT_MODULE:modules.push(item);break;
			case SLOT_HEAD:hats.push(item);break;
			case SLOT_CONSUMABLE:consumables.push(item);break;
			default: objectiveItems.push(item);break;
		}
	}
	var yOffset = 3;
	var itemSum = 0;
	if (weapons.length > 0) {
		var sectionTitle = "Weapons";
		var xStart = 12;
		for (var i = sectionTitle.length - 1; i >= 0; i--) {		
			screen.pixels[INVENTORY_STRING_Y + yOffset][xStart + i].char = sectionTitle[i];
			screen.pixels[INVENTORY_STRING_Y + yOffset][xStart + i].color = COLOR_DEFAULT;
		}
		yOffset += 3;
		for (var i = 0; i < weapons.length; i++) {
			var item = weapons[i];
			var itemName = item.name;
			var itemString = itemName;
			var color = item.color;
			if (item.equipped)	
				screen.pixels[INVENTORY_STRING_Y + yOffset][xStart - 6].char = CHAR_EQUIPPED_ITEM;
			for (var j = itemString.length - 1; j >= 0; j--) {
				screen.pixels[INVENTORY_STRING_Y + yOffset][xStart - 4 + j].char = itemString[j];
				screen.pixels[INVENTORY_STRING_Y + yOffset][xStart - 4 + j].color = COLOR_DEFAULT;
				if (i == inventoryCursorPos) {
					screen.pixels[INVENTORY_STRING_Y + yOffset][xStart - 4 + j].font = FONT_STYLE_BOLD;
					inventoryCursorItem = item;
				}
			}
			yOffset += 2;
		}
		yOffset++;
		itemSum += weapons.length;
	}
	if (hats.length > 0) {
		var sectionTitle = "Hats";
		var xStart = 12;
		for (var i = sectionTitle.length - 1; i >= 0; i--) {		
			screen.pixels[INVENTORY_STRING_Y + yOffset][xStart + i].char = sectionTitle[i];
			screen.pixels[INVENTORY_STRING_Y + yOffset][xStart + i].color = COLOR_DEFAULT;
		}
		yOffset += 3;
		for (var i = 0; i < hats.length; i++) {
			var item = hats[i];
			var itemName = item.name;
			var itemString = itemName;
			var color = item.color;
			if (item.equipped)			
				screen.pixels[INVENTORY_STRING_Y + yOffset][xStart - 6].char = CHAR_EQUIPPED_ITEM;
			for (var j = itemString.length - 1; j >= 0; j--) {
				screen.pixels[INVENTORY_STRING_Y + yOffset][xStart - 4 + j].char = itemString[j];
				screen.pixels[INVENTORY_STRING_Y + yOffset][xStart - 4 + j].color = COLOR_DEFAULT;
				if (i == inventoryCursorPos) {
					screen.pixels[INVENTORY_STRING_Y + yOffset][xStart - 4 + j].font = FONT_STYLE_BOLD;
					inventoryCursorItem = item;
				}
			}
			yOffset += 2;
		}
		yOffset++;
		itemSum += hats.length;
	}
	if (modules.length > 0) {
		var sectionTitle = "Modules";
		var xStart = 12;
		for (var i = sectionTitle.length - 1; i >= 0; i--) {		
			screen.pixels[INVENTORY_STRING_Y + yOffset][xStart + i].char = sectionTitle[i];
			screen.pixels[INVENTORY_STRING_Y + yOffset][xStart + i].color = COLOR_DEFAULT;
		}
		yOffset += 3;
		for (var i = 0; i < modules.length; i++) {
			var item = modules[i];
			var itemName = item.name;
			var itemString = itemName;
			var color = item.color;
			if (item.equipped)			
				screen.pixels[INVENTORY_STRING_Y + yOffset][xStart - 6].char = CHAR_EQUIPPED_ITEM;
			for (var j = itemString.length - 1; j >= 0; j--) {
				screen.pixels[INVENTORY_STRING_Y + yOffset][xStart - 4 + j].char = itemString[j];
				screen.pixels[INVENTORY_STRING_Y + yOffset][xStart - 4 + j].color = COLOR_DEFAULT;
				if (i + itemSum == inventoryCursorPos) {
					screen.pixels[INVENTORY_STRING_Y + yOffset][xStart - 4 + j].font = FONT_STYLE_BOLD;
					inventoryCursorItem = item;
				}
			}
			yOffset += 2;
		}
		yOffset++;
		itemSum += modules.length;
	}
	if (consumables.length > 0) {
		var sectionTitle = "Consumables";
		var xStart = 12;
		for (var i = sectionTitle.length - 1; i >= 0; i--) {		
			screen.pixels[INVENTORY_STRING_Y + yOffset][xStart + i].char = sectionTitle[i];
			screen.pixels[INVENTORY_STRING_Y + yOffset][xStart + i].color = COLOR_DEFAULT;
		}
		yOffset += 3;
		for (var i = 0; i < consumables.length; i++) {
			var item = consumables[i];
			var itemName = item.name;
			var itemString = itemName;
			var color = item.color;
			if (item.equipped)			
				screen.pixels[INVENTORY_STRING_Y + yOffset][xStart - 6].char = CHAR_EQUIPPED_ITEM;
			for (var j = itemString.length - 1; j >= 0; j--) {
				screen.pixels[INVENTORY_STRING_Y + yOffset][xStart - 4 + j].char = itemString[j];
				screen.pixels[INVENTORY_STRING_Y + yOffset][xStart - 4 + j].color = COLOR_DEFAULT;
				if (i + itemSum == inventoryCursorPos) {
					screen.pixels[INVENTORY_STRING_Y + yOffset][xStart - 4 + j].font = FONT_STYLE_BOLD;
					inventoryCursorItem = item;
				}
			}
			yOffset += 2;
		}
		yOffset++;
		itemSum += consumables.length;
	}
	if (objectiveItems.length > 0) {
		var sectionTitle = "Task Items";
		var xStart = 12;
		for (var i = sectionTitle.length - 1; i >= 0; i--) {		
			screen.pixels[INVENTORY_STRING_Y + yOffset][xStart + i].char = sectionTitle[i];
			screen.pixels[INVENTORY_STRING_Y + yOffset][xStart + i].color = COLOR_DEFAULT;
		}
		yOffset += 3;
		for (var i = 0; i < objectiveItems.length; i++) {
			var item = objectiveItems[i];
			var itemName = item.name;
			var itemString = itemName;
			var color = item.color;
			if (item.equipped)			
				screen.pixels[INVENTORY_STRING_Y + yOffset][xStart - 6].char = CHAR_EQUIPPED_ITEM;
			for (var j = itemString.length - 1; j >= 0; j--) {
				screen.pixels[INVENTORY_STRING_Y + yOffset][xStart - 4 + j].char = itemString[j];
				screen.pixels[INVENTORY_STRING_Y + yOffset][xStart - 4 + j].color = COLOR_DEFAULT;
				if (i + itemSum == inventoryCursorPos) {
					screen.pixels[INVENTORY_STRING_Y + yOffset][xStart - 4 + j].font = FONT_STYLE_BOLD;
					inventoryCursorItem = item;
				}
			}
			yOffset += 2;
		}
	}
	// draw equipment
	var nothingString = 'Nothing';
	var equippedString = 'Equipped';	
	for (var j = equippedString.length - 1; j >= 0; j--) {
		screen.pixels[INVENTORY_STRING_Y][55 + j].char = equippedString[j];
		screen.pixels[INVENTORY_STRING_Y][55 + j].color = COLOR_DEFAULT;
	}
	var headString = 'Head-' + (player.head == ITEM_NONE ? nothingString : player.head.name);
	var headStringColor = player.head == ITEM_NONE ? COLOR_OUT_OF_SIGHT : COLOR_DEFAULT;
	for (var j = headString.length - 1; j >= 0; j--) {
		screen.pixels[INVENTORY_STRING_Y + 2][54 + j].char = headString[j];
		screen.pixels[INVENTORY_STRING_Y + 2][54 + j].color = j < 5 ? COLOR_DEFAULT : headStringColor;
	}
	var onHandString = 'OnHand-' + (player.onHand == ITEM_NONE ? nothingString : player.onHand.name);
	var onHandStringColor = player.onHand == ITEM_NONE ? COLOR_OUT_OF_SIGHT : COLOR_DEFAULT;
	for (var j = onHandString.length - 1; j >= 0; j--) {
		screen.pixels[INVENTORY_STRING_Y + 4][52 + j].char = onHandString[j];
		screen.pixels[INVENTORY_STRING_Y + 4][52 + j].color = j < 7 ? COLOR_DEFAULT : onHandStringColor;
	}
	var offHandString = 'OffHand-' + (player.offHand == ITEM_NONE ? nothingString : player.offHand.name);
	var offHandStringColor = player.offHand == ITEM_NONE ? COLOR_OUT_OF_SIGHT : COLOR_DEFAULT;
	for (var j = offHandString.length - 1; j >= 0; j--) {
		screen.pixels[INVENTORY_STRING_Y + 6][51 + j].char = offHandString[j];
		screen.pixels[INVENTORY_STRING_Y + 6][51 + j].color = j < 8 ? COLOR_DEFAULT : offHandStringColor;
	}
	var module1String = 'Module1-' + (player.module1 == ITEM_NONE ? nothingString : player.module1.name);
	var module1StringColor = player.module1 == ITEM_NONE ? COLOR_OUT_OF_SIGHT : COLOR_DEFAULT;
	for (var j = module1String.length - 1; j >= 0; j--) {
		screen.pixels[INVENTORY_STRING_Y + 8][51 + j].char = module1String[j];
		screen.pixels[INVENTORY_STRING_Y + 8][51 + j].color = j < 8 ? COLOR_DEFAULT : module1StringColor;
	}
	var module2String = 'Module2-' + (player.module2 == ITEM_NONE ? nothingString : player.module2.name);
	var module2StringColor = player.module2 == ITEM_NONE ? COLOR_OUT_OF_SIGHT : COLOR_DEFAULT;
	for (var j = module2String.length - 1; j >= 0; j--) {
		screen.pixels[INVENTORY_STRING_Y + 10][51 + j].char = module2String[j];
		screen.pixels[INVENTORY_STRING_Y + 10][51 + j].color = j < 8 ? COLOR_DEFAULT : module2StringColor;
	}
	var module3String = 'Module3-' + (player.module3 == ITEM_NONE ? nothingString : player.module3.name);
	var module3StringColor = player.module3 == ITEM_NONE ? COLOR_OUT_OF_SIGHT : COLOR_DEFAULT;
	for (var j = module3String.length - 1; j >= 0; j--) {
		screen.pixels[INVENTORY_STRING_Y + 12][51 + j].char = module3String[j];
		screen.pixels[INVENTORY_STRING_Y + 12][51 + j].color = j < 8 ? COLOR_DEFAULT : module3StringColor;
	}
}

function moveInventory(offset) {
	if (offset.x == 0)
		inventoryCursorPos = Math.min(Math.max(offset.y + inventoryCursorPos, 0), player.inventory.length - 1);
	draw();
}

var SLOT_WIELDABLE = 'wieldable';
var SLOT_HEAD = 'head';
var SLOT_MODULE = 'chest';
var SLOT_NONE = 'objective';
var SLOT_CONSUMABLE = 'consumable';
// return if we successfully equipped the item
function selectInventoryItem(shift) {
	var item = inventoryCursorItem;
	switch (item.slot) {
		case SLOT_WIELDABLE:
		// if the item is already equipped
		if (item.equipped) {
			// if we are targeting the offhand
			if (shift) {
				// if there is an offhand weapon
				if (player.offHand != ITEM_NONE) {
					// if that is us, unequip us
					if (player.offHand == item) {
						player.offHand = ITEM_NONE;
						item.unequip(player);
					// otherwise unequip them and put us there
					} else if (item.canBeEquipped(player)) {
						player.offHand.unequip(player);
						player.offHand = item;
						player.onHand = ITEM_NONE;
					}
				} else {
					player.onHand = ITEM_NONE;
					player.offHand = item;
				}
			} else {				
				// if there is an offhand weapon
				if (player.onHand != ITEM_NONE) {
					// if that is us, unequip us
					if (player.onHand == item) {
						player.onHand = ITEM_NONE;
						item.unequip(player);
					// otherwise unequip them and put us there
					} else if (item.canBeEquipped(player)) {
						player.onHand.unequip(player);
						player.onHand = item;
						player.offHand = ITEM_NONE;
					}
				} else {
					player.offHand = ITEM_NONE;
					player.onHand = item;
				}
			}
		} else if (item.canBeEquipped(player)) {
			if (!shift) {
				if (player.onHand != ITEM_NONE)
					player.onHand.unequip(player);
				player.onHand = item;
				item.equip(player);
			} else {
				if (player.offHand != ITEM_NONE)
					player.offHand.unequip(player);
				player.offHand = item;
				item.equip(player);
			}
		}
		break;
	}
	return true;
}

var ITEM_NONE = -1;
// the inventory object is an array with some special functions
Inventory.prototype = new Array;
function Inventory () {

	this.pickUp = function(item) {
		this.push(item);
	}

	this.hasAndRemove = function(itemName) {
		for (var i = this.length - 1; i >= 0; i--) {
			if (this[i].name == itemName) {
				this.splice(i,1);
				return true;
			}
		}
		return false;
	}
}
