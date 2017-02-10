// attack styles
var ATTACK_STYLE_SWING = "swing";
var ATTACK_STYLE_POKE = "poke";
var ATTACK_STYLE_CLOSE = "close";
var ATTACK_STYLE_DEFENSIVE = "defensive";
var ATTACK_STYLES = [{name:ATTACK_STYLE_POKE, selected:true, lvl:1}, {name:ATTACK_STYLE_SWING, selected:false, lvl:1},
{name:ATTACK_STYLE_CLOSE, selected:false, lvl:1}, {name:ATTACK_STYLE_DEFENSIVE, selected:false, lvl:1}];

// weapons
var NAME_DAGGER = 'dagger';
var NAME_HAMMER = 'hammer';
var NAME_AXE = 'axe';
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
var EFFECT_COF = 'effect_cof';

// available starting items
var LOADOUT_OPTIONS = [{name:NAME_AXE, value:5, selected:false}, {name:NAME_DAGGER, value:4, selected:false},
 {name:NAME_HAMMER, value:7, selected:false}, {name:NAME_SHORTBOW, value:7, selected:false},
 {name:NAME_HP_POTION, value:4, selected:false}, {name:NAME_OVERLOAD_POTION, value:7, selected:false}];

// nothing
var ITEM_NONE = 'nothing';

/*   	 		Basic Items				*/

function item(name, char, color, slot, twoHanded, damage, accuracy, ranged, effects) {
	// draw information
	this.char = char;
	this.color = color;
	// entity information
	this.type = ENTITY_ITEM;
	this.name = name;
	this.solid = false;
	this.permanentSolid = false; 
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
	// always last	
	this.value = getItemValue(this);

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

// powerLevel is a heuristic used to pick loot strength. Higher is better.
function generateLoot(powerLevel) {
	// var lootType = LOOT_TYPES.peekRandom();	
	// return makeItem(lootType);
	return ITEM_NONE;
}

function makeLoadout(name) {
	var char, color = COLOR_DEFAULT, slot, twoHanded, damage, accuracy, ranged, effects;
	switch(name) {
		case NAME_AXE: 
			char = '(';
			slot = SLOT_WIELDABLE;
			twoHanded = false;
			damage = 3;
			ranged = false;
			effects = [];
		break;
		case NAME_DAGGER: 
			char = '(';
			slot = SLOT_WIELDABLE;
			twoHanded = false;
			damage = 2;
			ranged = false;
			effects = [{name: EFFECT_COF, charges:5}];
		break;
		case NAME_HAMMER: 
			char = '(';
			slot = SLOT_WIELDABLE;
			twoHanded = true;
			damage = 5;
			ranged = false;
			effects = [];
		break;
		case NAME_SHORTBOW: 
			char = ')';
			slot = SLOT_WIELDABLE;
			twoHanded = true;
			damage = 5;
			ranged = true;
			effects = [];
		break;
		case NAME_HP_POTION:
			char = '^';
			slot = SLOT_CONSUMABLE;
			twoHanded = false;
			damage = 0;
			ranged = false;
			effects = [];
		break;	
		case NAME_OVERLOAD_POTION:
			char = '^';
			slot = SLOT_CONSUMABLE;
			twoHanded = false;
			damage = 0;
			ranged = false;
			effects = [];
		break;		
		// Used in the case of skillpoints/attribute points
		default: return name;
	}
	return new item(name, char, color, slot, twoHanded, damage, accuracy, ranged, effects);
}

function getItemValue(item) {
	return 1;
}