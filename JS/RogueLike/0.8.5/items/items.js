// attack styles
var ATTACK_STYLE_SWING = "swing    ";
var ATTACK_STYLE_POKE = "poke     ";
var ATTACK_STYLE_CLOSE = "close    ";
var ATTACK_STYLE_DEFENSIVE = "defensive";
var ATTACK_STYLES = [
{name:ATTACK_STYLE_POKE, selected:true, lvl:0},
{name:ATTACK_STYLE_SWING, selected:false, lvl:0},
{name:ATTACK_STYLE_CLOSE, selected:false, lvl:0},
{name:ATTACK_STYLE_DEFENSIVE, selected:false, lvl:0}];

// weapons
var NAME_UTILITY_KNIFE = 'Utility Knife';
var NAME_WRENCH = 'Monkey Wrench';
var NAME_FIRE_AXE = 'Fire Axe';
var NAME_MACE = 'mace';
var NAME_HP_POTION = 'hp_potion';
var NAME_OVERLOAD_POTION = 'overload_potion';
var NAME_REGEN_POTION = 'regen_potion';
var NAME_SCRAP_SHIELD = 'scrap_shield';
var NAME_SKILLPOINT = 'skillpoint';
var NAME_ATTRIBUTEPOINT = 'attributepoint';
var NAME_SHORTBOW = 'shortbow';
var NAME_COF_BURNER = 'cof_burner';

// modules
var NAME_HP_MODULE = 'hp_module';

// effects
var EFFECT_SHARP_1 = 'effect_sharp1';

// available starting items
var LOADOUT_OPTIONS = [{name:NAME_FIRE_AXE, value:20, selected:false, description:"Fire Axe(1H) - Dmg:3, Range:Melee."},
 {name:NAME_UTILITY_KNIFE, value:16, selected:false, description:"Utility Knife(1H) - Dmg:2, Range:Melee, Effects: Sharp I - 10% Chance to cause bleeding in fleshy targets."},
 {name:NAME_WRENCH, value:28, selected:false, description:"Monkey Wrench(2H) - Dmg:5, Range:Melee."}];

// nothing
var ITEM_NONE = 'nothing';
var LOOT_ITEMS = [ITEM_NONE, NAME_UTILITY_KNIFE, NAME_FIRE_AXE, NAME_WRENCH];

// powerLevel is a heuristic used to pick loot strength. Higher is better.
function generateLoot(powerLevel) {
	var lootType = LOOT_ITEMS.peekRandom();	
	return MakeItem(lootType, powerLevel);
}

function generateShopItem(powerLevel) {
	var shopItems = LOOT_ITEMS.slice(0);
	shopItems.remove(ITEM_NONE);
	var lootType = shopItems.peekRandom();	
	return MakeItem(lootType, powerLevel);
}

function MakeItem(lootType, powerLevel) {	
	var char, color = COLOR_DEFAULT, slot, twoHanded, damage, accuracy, ranged, effects, value, description;
	switch(lootType) {
		case NAME_FIRE_AXE: 
			char = '(';
			slot = SLOT_WIELDABLE;
			twoHanded = false;
			damage = 3;
			ranged = false;
			effects = [];
			accuracy = .2;
			value = 20;
			description = "Fire Axe(1H) - Dmg:3, Range:Melee.";
		break;
		case NAME_UTILITY_KNIFE: 
			char = '(';
			slot = SLOT_WIELDABLE;
			twoHanded = false;
			damage = 2;
			ranged = false;
			effects = [EFFECT_SHARP_1];
			accuracy = .3;
			value = 16;
			description = "Utility Knife(1H) - Dmg:2, Range:Melee, Effects: Sharp I - 10% Chance to cause bleeding in fleshy targets.";
		break;
		case NAME_WRENCH: 
			char = '(';
			slot = SLOT_WIELDABLE;
			twoHanded = true;
			damage = 5;
			ranged = false;
			effects = [];
			accuracy = 0;
			value = 28;
			description = "Monkey Wrench(2H) - Dmg:5, Range:Melee.";
		break;		
		case ITEM_NONE: return ITEM_NONE;
	}
	return new item(lootType, char, color, slot, twoHanded, damage, accuracy, ranged, effects, value, description);
}

/*   	 		Basic Items				*/

function item(name, char, color, slot, twoHanded, damage, accuracy, ranged, effects, value, description = "") {
	// draw information
	this.char = char;
	this.color = color;
	// entity information
	this.type = ENTITY_ITEM;
	this.name = name;
	this.solid = false;
	this.permanentSolid = false; 
	// for auto exploring
	this.discovered = false;
	// item information
	this.equipped = false;
	// wieldable
	this.slot = slot;
	this.twoHanded = twoHanded;
	this.damage = damage;
	this.accuracy = accuracy;
	this.ranged = ranged;
	// effects
	this.effects = effects;
	this.value = value;
	this.description = description;

	this.canBeEquipped = function() {
		return this.slot != SLOT_CONSUMABLE;
	}

	this.canBeUnequipped = function() {
		return true;
	}

	this.equip = function() {
		this.equipped = true;
	}

	this.unequip = function() {
		this.equipped = false;
	}
}

/*   	 		Unrand Arts				*/

function makeLoadoutItem(name) {
	var char, color = COLOR_DEFAULT, slot, twoHanded, damage, accuracy, ranged, effects;
	switch(name) {
		case NAME_FIRE_AXE: 
			char = '(';
			slot = SLOT_WIELDABLE;
			twoHanded = false;
			damage = 3;
			ranged = false;
			effects = [];
			accuracy = .2;
		break;
		case NAME_UTILITY_KNIFE: 
			char = '(';
			slot = SLOT_WIELDABLE;
			twoHanded = false;
			damage = 2;
			ranged = false;
			effects = [EFFECT_SHARP_1];
			accuracy = .3;
		break;
		case NAME_WRENCH: 
			char = '(';
			slot = SLOT_WIELDABLE;
			twoHanded = true;
			damage = 5;
			ranged = false;
			effects = [];
			accuracy = 0;
		break;
		// Used in the case of skillpoints/attribute points
		default: return name;
	}
	return new item(name, char, color, slot, twoHanded, damage, accuracy, ranged, effects);
}

function getItemValue(item) {
	return 1;
}