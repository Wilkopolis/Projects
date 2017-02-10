function inventoryOnKeyDown(event) {
	event = event || window.event;

	var keyCode = event.keyCode;

	switch (keyCode) {
	    // backspace 08
	    case 8:
	    gameState = STATE_GAME;
	    effectsContainer.style.display = 'block';
	    document.onkeydown = gameOnKeyDown;
	    relight();
	    draw(gameTicks);
	    break;
	    // enter 13
	    case 13:
		if (player.inventory.length == 0)
			return;
	   	if (selectInventoryItem())
	   		moveGame({x:0, y:0});
	    break;
	    // space 32
	    case 32:
		if (player.inventory.length == 0)
			return;
	   	if (selectInventoryItem())
	   		moveGame({x:0, y:0});
	    break;
	    // escape 27
	    case 27:
	    gameState = STATE_GAME;
	    effectsContainer.style.display = 'block';
	    document.onkeydown = gameOnKeyDown;
	    relight();
	    draw(gameTicks);
	    break;
	    case KEY_NORTH: 
	    moveInventory({x:0, y:-1});	    	  
	    break;
	    case KEY_NORTH_EAST:
	    moveInventory({x:1, y:-1});	    	  
	    break;
	    case KEY_EAST: 
	    moveInventory({x:1, y:0});	    	  
	    break;
	    case KEY_SOUTH_EAST:
	    moveInventory({x:1, y:1});	    	  
	    break;
	    case KEY_SOUTH:
	    moveInventory({x:0, y:1});
	    break;
	    case KEY_SOUTH_WEST:
	    moveInventory({x:-1, y:1});	    	  
	    break;
	    case KEY_WEST: 
	    moveInventory({x:-1, y:0});	    	  
	    break;
	    case KEY_NORTH_WEST: 
	    moveInventory({x:-1, y:-1});	    	  
	    break;
	    case KEY_WAIT: 
	    moveInventory({x:0, y:0});
	    break; 
	    // up arrow 38
	    case 38:
	    moveInventory({x:0, y:-1});
	    break;
	    // down arrow 40
	    case 40:
	    moveInventory({x:0, y:1});
	    break;
	    // Tab 09
	    case 9:
	    event.preventDefault();
	    break;
	    // i
	    case 73:
	    gameState = STATE_GAME;
	    effectsContainer.style.display = 'block';
	    document.onkeydown = gameOnKeyDown;
	    relight();
	    draw(gameTicks);
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
	var accessories = [];
	var objectiveItems = [];
	for (var i = player.inventory.length - 1; i >= 0; i--) {
		var item = player.inventory[i]
		switch(item.slot) {
			case SLOT_WIELDABLE:weapons.push(item);break;
			case SLOT_MODULE:modules.push(item);break;
			case SLOT_HEAD:hats.push(item);break;
			case SLOT_CONSUMABLE:consumables.push(item);break;
			case SLOT_ACCESSORY:accessories.push(item);break;
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
			// if equipped, build a string to show that
			if (item.equipped) {
				screen.pixels[INVENTORY_STRING_Y + yOffset][xStart - 6].char = CHAR_EQUIPPED_ITEM;
				screen.pixels[INVENTORY_STRING_Y + yOffset][xStart - 6].color = COLOR_DEFAULT;
			}
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
			// if equipped, build a string to show that
			if (item.equipped) {
				screen.pixels[INVENTORY_STRING_Y + yOffset][xStart - 6].char = CHAR_EQUIPPED_ITEM;
				screen.pixels[INVENTORY_STRING_Y + yOffset][xStart - 6].color = COLOR_DEFAULT;
			}
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
			// if equipped, build a string to show that
			if (item.equipped) {
				screen.pixels[INVENTORY_STRING_Y + yOffset][xStart - 6].char = CHAR_EQUIPPED_ITEM;
				screen.pixels[INVENTORY_STRING_Y + yOffset][xStart - 6].color = COLOR_DEFAULT;
			}
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
	if (accessories.length > 0) {
		var sectionTitle = "Accessories";
		var xStart = 12;
		for (var i = sectionTitle.length - 1; i >= 0; i--) {		
			screen.pixels[INVENTORY_STRING_Y + yOffset][xStart + i].char = sectionTitle[i];
			screen.pixels[INVENTORY_STRING_Y + yOffset][xStart + i].color = COLOR_DEFAULT;
		}
		yOffset += 3;
		for (var i = 0; i < accessories.length; i++) {
			var item = accessories[i];
			var itemName = item.name;
			var itemString = itemName;
			var color = item.color;
			// if equipped, build a string to show that
			if (item.equipped) {
				screen.pixels[INVENTORY_STRING_Y + yOffset][xStart - 6].char = CHAR_EQUIPPED_ITEM;
				screen.pixels[INVENTORY_STRING_Y + yOffset][xStart - 6].color = COLOR_DEFAULT;
			}
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
		itemSum += accessories.length;
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
			// if equipped, build a string to show that
			if (item.equipped) {
				screen.pixels[INVENTORY_STRING_Y + yOffset][xStart - 6].char = CHAR_EQUIPPED_ITEM;
				screen.pixels[INVENTORY_STRING_Y + yOffset][xStart - 6].color = COLOR_DEFAULT;
			}
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
			// if equipped, build a string to show that
			if (item.equipped) {
				screen.pixels[INVENTORY_STRING_Y + yOffset][xStart - 6].char = CHAR_EQUIPPED_ITEM;
				screen.pixels[INVENTORY_STRING_Y + yOffset][xStart - 6].color = COLOR_DEFAULT;
			}
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
	var yPos = INVENTORY_STRING_Y + 4;
	for (var i = 0; i < player.armCount; i++) {
		var wieldable = player.wielded[i];
		var wieldableString = 'Hand'+ (i+1) +'-' + (wieldable != null ? wieldable.name : nothingString);
		var wieldableStringColor = (wieldable != null ? COLOR_DEFAULT : COLOR_OUT_OF_SIGHT);
		for (var j = wieldableString.length - 1; j >= 0; j--) {
			screen.pixels[yPos][52 + j].char = wieldableString[j];
			screen.pixels[yPos][52 + j].color = j < 6 ? COLOR_DEFAULT : wieldableStringColor;
		}
		yPos += 2;
	}
	for (var i = 0; i < player.maxAccessories; i++) {
		var accessory = player.accessories[i];
		var accessoryString = 'Acc'+ (i+1) +'-' + (accessory != null ? accessory.name : nothingString);
		var accessoryStringColor = (accessory != null ? COLOR_DEFAULT : COLOR_OUT_OF_SIGHT);
		for (var j = accessoryString.length - 1; j >= 0; j--) {
			screen.pixels[yPos][52 + j].char = accessoryString[j];
			screen.pixels[yPos][52 + j].color = j < 5 ? COLOR_DEFAULT : accessoryStringColor;
		}
		yPos += 2;
	}
	for (var i = 0; i < player.maxModules; i++) {
		var module = player.modules[i];
		var moduleString = 'Module'+ (i+1) +'-' + (module != null ? module.name : nothingString);
		var moduleStringColor = (module != null ? COLOR_DEFAULT : COLOR_OUT_OF_SIGHT);
		for (var j = moduleString.length - 1; j >= 0; j--) {
			screen.pixels[yPos][52 + j].char = moduleString[j];
			screen.pixels[yPos][52 + j].color = j < 7 ? COLOR_DEFAULT : moduleStringColor;
		}
		yPos += 2;
	}
}

function drawCharacterInfo () {

	// draw our name
	var nameString = 'Wilko';	
	for (var i = nameString.length - 1; i >= 0; i--) {
		screen.pixels[20][56 + i].char = nameString[i];
		screen.pixels[20][56 + i].color = COLOR_DEFAULT;
	}

	// draw our hp
	var hpText = 'HP:' + player.hp + "/" + player.hpMax;
	for (var i = hpText.length - 1; i >= 0; i--) {
		screen.pixels[22][56 + i].char = hpText[i];
		screen.pixels[22][56 + i].color = COLOR_DEFAULT;
	}

	// draw our shield
	var shieldText = 'Shield:';
	for (var i = shieldText.length - 1; i >= 0; i--) {
		screen.pixels[24][52 + i].char = shieldText[i];
		screen.pixels[24][52 + i].color = COLOR_DEFAULT;
	}
	shieldText = player.shieldHP + "/" + player.shieldMax;
	var color = player.shieldHP > 0 ? COLOR_DEFAULT : COLOR_OUT_OF_SIGHT;
	for (var i = shieldText.length - 1; i >= 0; i--) {
		screen.pixels[24][59 + i].char = shieldText[i];
		screen.pixels[24][59 + i].color = color;
	}

	// draw the xp
	var xpText = 'XP:' + player.xp + "/" + player.nextLevelXp;	
	for (var i = xpText.length - 1; i >= 0; i--) {
		screen.pixels[26][56 + i].char = xpText[i];
		screen.pixels[26][56 + i].color = COLOR_DEFAULT;
	}

	// draw the level
	var levelString = 'Lvl:' + player.level;	
	for (var i = levelString.length - 1; i >= 0; i--) {
		screen.pixels[28][55 + i].char = levelString[i];
		screen.pixels[28][55 + i].color = COLOR_DEFAULT;
	}

	// draw the skill points
	var skillPointString = 'SP:' + player.skillPoints;	
	for (var i = skillPointString.length - 1; i >= 0; i--) {
		screen.pixels[30][56 + i].char = skillPointString[i];
		screen.pixels[30][56 + i].color = COLOR_DEFAULT;
	}

	// draw the attribute points
	var attributePointsString = 'AP:' + player.attributePoints;	
	for (var i = attributePointsString.length - 1; i >= 0; i--) {
		screen.pixels[32][56 + i].char = attributePointsString[i];
		screen.pixels[32][56 + i].color = COLOR_DEFAULT;
	}

	// draw the wealth	
	var wealthString = "Wealth:" + factions[FACTION_CLONES].wealth;
	for (var i = wealthString.length - 1; i >= 0; i--) {
		screen.pixels[34][52 + i].char = wealthString[i];
		screen.pixels[34][52 + i].color = COLOR_DEFAULT;
	}

	var powerString = "Power:" + factions[FACTION_CLONES].power;
	for (var i = powerString.length - 1; i >= 0; i--) {
		screen.pixels[36][53 + i].char = powerString[i];
		screen.pixels[36][53 + i].color = COLOR_DEFAULT;
	}

	var wptString = "WPT:" + factions[FACTION_CLONES].wpt;
	for (var i = wptString.length - 1; i >= 0; i--) {
		screen.pixels[38][55 + i].char = wptString[i];
		screen.pixels[38][55 + i].color = COLOR_DEFAULT;
	}
	// draw the attributes
	var strString = "Str:";
	var k = 0;
	for (var j = 0; j < strString.length; j++) {			
		screen.pixels[40][55 + j].char = strString[j];
		screen.pixels[40][55 + j].color = COLOR_STRENGTH;
	}
	var strValue = player.strength + " ";
	for (var j = 0; j < strValue.length; j++) {			
		screen.pixels[40][59 + j].char = strValue[j];
		screen.pixels[40][59 + j].color = COLOR_DEFAULT;
	}
	var wilString = "Will:";
	for (var j = 0; j < wilString.length; j++) {			
		screen.pixels[42][54 + j].char = wilString[j];
		screen.pixels[42][54 + j].color = COLOR_WILLPOWER;
	}
	var wilValue = player.willpower + " ";
	for (var j = 0; j < wilValue.length; j++) {			
		screen.pixels[42][59 + j].char = wilValue[j];
		screen.pixels[42][59 + j].color = COLOR_DEFAULT;
	}
	var conString = "Con:";
	for (var j = 0; j < conString.length; j++) {			
		screen.pixels[44][55 + j].char = conString[j];
		screen.pixels[44][55 + j].color = COLOR_CONSTITUTION;
	}
	var conValue = player.constitution + " ";
	for (var j = 0; j < conValue.length; j++) {			
		screen.pixels[44][59 + j].char = conValue[j];
		screen.pixels[44][59 + j].color = COLOR_DEFAULT;
	}
	var perString = "Per:";
	for (var j = 0; j < perString.length; j++) {			
		screen.pixels[46][55 + j].char = perString[j];
		screen.pixels[46][55 + j].color = COLOR_PERCEPTION;
	}
	var perValue = player.perception + " ";
	for (var j = 0; j < perValue.length; j++) {			
		screen.pixels[46][59 + j].char = perValue[j];
		screen.pixels[46][59 + j].color = COLOR_DEFAULT;
	}
	var leaString = "Lead:";
	for (var j = 0; j < leaString.length; j++) {			
		screen.pixels[48][54 + j].char = leaString[j];
		screen.pixels[48][54 + j].color = COLOR_LEADERSHIP;
	}
	var leaValue = player.leadership + " ";
	for (var j = 0; j < leaValue.length; j++) {			
		screen.pixels[48][59 + j].char = leaValue[j];
		screen.pixels[48][59 + j].color = COLOR_DEFAULT;
	}
}

function moveInventory(offset) {
	if (offset.x == 0)
		inventoryCursorPos = Math.min(Math.max(offset.y + inventoryCursorPos, 0), player.inventory.length - 1);
	draw(gameTicks);
}

// return if we successfully equipped the item
function selectInventoryItem() {
	var item = inventoryCursorItem;
	switch (item.slot) {
		case SLOT_WIELDABLE:
			// if the item is already equiped, unequip it
			if (item.equipped) {
				player.wielded.remove(item);
				item.unequip(player);
				player.armsUsed -= item.handCount;
				return true;
			// try to equip it
			} else {
				// if we have enough arms, take it
				if (player.armsUsed + item.handCount <= player.armCount) {
					player.wielded.push(item);
					item.equip(player);
					player.armsUsed += item.handCount;
					return true;
				// if we don't have enough arms, equip it-
				// but unequip all other weapons
				} else if (player.armsUsed > 0) {
					for (var i = player.wielded.length - 1; i >= 0; i--) {
						player.wielded[i].unequip(player);
						player.wielded.remove(player.wielded[i]);
					}
					player.armsUsed = item.handCount;
					player.wielded.push(item);
					item.equip(player);
					return true;
				}
			}
		break;
		case SLOT_MODULE:
			if (item.equipped) {

				item.unequip(player);

				player.modules.remove(item);
				return true;

			} else if (item.canBeEquipped(player)) {

				item.equip(player);

				player.modules.push(item);
				return true;
			}
		break;
		case SLOT_ACCESSORY:
			if (item.equipped) {

				item.unequip(player);

				player.accessories.remove(item);
				return true;

			} else if (item.canBeEquipped(player)) {

				item.equip(player);

				player.accessories.push(item);
				return true;
			}
		break;
		case SLOT_HEAD:
			if (item.equipped) {

				item.unequip(player);

				player.head = ITEM_NONE;
				return true;

			} else if (item.canBeEquipped(player)) {

				item.equip(player);

				player.head = item;
				return true;
			}
		break;
		case SLOT_CONSUMABLE:
			if (item.canBeConsumed(player)) {
				item.consume(player);

				player.inventory.remove(item);
				return true;
			}
		break;
	}
	return false;
}

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

	this.equippedCount = function(slot) {
		var count = 0;
		for (var i = this.length - 1; i >= 0; i--) {
			if (typeof this[i].slot !== 'undefined' && this[i].slot == slot && this[i].equipped) {
				count++;
			}
		}
		return count;
	}
}
