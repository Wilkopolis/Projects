// attack styles
var ATTACK_STYLE_SWING = "swing";
var ATTACK_STYLE_POKE = "poke";
var ATTACK_STYLE_CLOSE = "close";
var ATTACK_STYLE_DEFENSIVE = "defensive";
var ATTACK_STYLE_CASTING = "casting";
var ATTACK_STYLES = [{name:ATTACK_STYLE_POKE, selected:true, lvl:1}, {name:ATTACK_STYLE_SWING, selected:false, lvl:1},
{name:ATTACK_STYLE_CLOSE, selected:false, lvl:1}, {name:ATTACK_STYLE_DEFENSIVE, selected:false, lvl:1}];

// proficiencies
var PROF_AMATUER = "amatuer";
var PROF_CHALLENGING = "challenging";
var PROF_MASTERFUL = "masterful";
// weapon names
var NAME_FORK = "Fork";
var NAME_CROWBAR = "Crowbar";
var NAME_BASEBALL_BAT = "Baseball Bat";
var NAME_CABLE_WHIP = "Cable Whip";
var NAME_FIRE_AXE = "Fire Axe";
// module names
var NAME_HP_MODULE = "hp module";
var NAME_ACC_MODULE = "acc module";
var NAME_DMG_MODULE = "dmg module";
var NAME_REGEN_MODULE = "regen module";
// consumable names
var NAME_WHEY_POTION = "whey potion";
var LOOT_TYPES = [NAME_CROWBAR, NAME_BASEBALL_BAT, NAME_HP_MODULE, NAME_DMG_MODULE, NAME_REGEN_MODULE, NAME_CABLE_WHIP, NAME_FIRE_AXE];
// available starting items
var LOADOUT_OPTIONS = [{value:10, name:NAME_CROWBAR, selected:false},{value:15, name:NAME_BASEBALL_BAT, selected:false},{value:5, name:NAME_FORK, selected:false},
{value:15, name:NAME_HP_MODULE, selected:false}, {value:15, name:NAME_ACC_MODULE, selected:false}, {value:15, name:NAME_DMG_MODULE, selected:false}, 
{value:25, name:NAME_REGEN_MODULE, selected:false}, {value:10, name:NAME_WHEY_POTION, selected:false}];
// nothing
var ITEM_NONE = 'nothing';

/*   	 		Basic Items				*/

function item_fork() {
	// draw information
	this.char = '/';
	this.color = COLOR_DEFAULT;
	// entity information
	this.type = ENTITY_ITEM;
	this.name = NAME_FORK;
	this.solid = false;
	this.permanentSolid = false;
	// item information
	this.equipped = false;
	// wieldable
	this.slot = SLOT_WIELDABLE;
	this.twoHanded = false;
	this.dmg = 1;
	this.accuracy = .6;
	// effects
	this.effects = [];
	// always last	
	this.value = getItemValue(this);

	this.canBeEquipped = function() {
		return true;
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

// basic accuracy, good damage
function item_crowbar() {
	// draw information
	this.char = '/';
	this.color = COLOR_DEFAULT;
	// entity information
	this.type = ENTITY_ITEM;
	this.name = NAME_CROWBAR;
	this.solid = false;
	this.permanentSolid = false;
	// item information
	this.equipped = false;
	// wieldable
	this.slot = SLOT_WIELDABLE;
	this.twoHanded = false;
	this.dmg = 3;
	this.accuracy = .5;
	// effects
	this.effects = [];
	// always last	
	this.value = getItemValue(this);

	this.canBeEquipped = function() {
		return true;
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

function item_baseball_bat() {
	// draw information
	this.char = '/';
	this.color = COLOR_DEFAULT;
	// entity information
	this.type = ENTITY_ITEM;
	this.name = NAME_BASEBALL_BAT;
	this.solid = false;
	this.permanentSolid = false;
	// item information
	this.equipped = false;
	// wieldable
	this.slot = SLOT_WIELDABLE;
	this.twoHanded = false;
	this.dmg = 4;
	this.accuracy = .6;
	// effects
	this.effects = [];
	// always last	
	this.value = getItemValue(this);

	this.canBeEquipped = function() {
		return true;
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

// gives you a max hp boost
function item_hp_module() {
	// draw information
	this.char = '>';
	this.color = COLOR_DEFAULT;
	// entity information
	this.type = ENTITY_ITEM;
	this.name = NAME_HP_MODULE;
	this.solid = false;
	this.permanentSolid = false;
	// item information
	this.equipped = false;
	// module
	this.slot = SLOT_MODULE;
	// effect
	this.effects = [EFFECT_FORTITUDE];
	// always last	
	this.value = getItemValue(this);

	this.canBeEquipped = function() {
		return true;
	}

	this.equip = function(character) {
		this.equipped = true;
		var hpDiff = 20;
		character.hp += hpDiff;
		character.hpMax += hpDiff;
	}

	this.canBeUnequipped = function (character) {
		return character.hp > 20;
	}

	this.unequip = function(character) {
		this.equipped = false;		
		var hpDiff = 20;
		character.hp -= hpDiff;
		character.hpMax -= hpDiff;
	}
}

// gives you a base damage boost
function item_dmg_module() {
	// draw information
	this.char = '>';
	this.color = COLOR_DEFAULT;
	// entity information
	this.type = ENTITY_ITEM;
	this.name = NAME_DMG_MODULE;
	this.solid = false;
	this.permanentSolid = false;
	// item information
	this.equipped = false;
	// module
	this.slot = SLOT_MODULE;
	// effect
	this.effects = [EFFECT_DAMAGE];
	// always last	
	this.value = getItemValue(this);

	this.canBeEquipped = function() {
		return true;
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

// gives you an accuracy boost
function item_acc_module() {
	// draw information
	this.char = '>';
	this.color = COLOR_DEFAULT;
	// entity information
	this.type = ENTITY_ITEM;
	this.name = NAME_ACC_MODULE;
	this.solid = false;
	this.permanentSolid = false;
	// item information
	this.equipped = false;
	// module
	this.slot = SLOT_MODULE;
	// effect
	this.effects = [EFFECT_ACCURACY];
	// always last	
	this.value = getItemValue(this);

	this.canBeEquipped = function() {
		return true;
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

// gives you basically 1 level of regen 
function item_regen_module() {
	// draw information
	this.char = '>';
	this.color = COLOR_DEFAULT;
	// entity information
	this.type = ENTITY_ITEM;
	this.name = NAME_REGEN_MODULE;
	this.solid = false;
	this.permanentSolid = false;
	// item information
	this.equipped = false;
	// module
	this.slot = SLOT_MODULE;
	// effect
	this.effects = [EFFECT_REGEN];
	// always last	
	this.value = getItemValue(this);

	this.canBeEquipped = function() {
		return true;
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

// gives you a temperary experience mod boost
function item_whey_potion() {
	// draw information
	this.char = 'p';
	this.color = COLOR_DEFAULT;
	// entity information
	this.type = ENTITY_ITEM;
	this.name = NAME_WHEY_POTION;
	this.solid = false;
	this.permanentSolid = false;
	// item information
	this.equipped = false;
	// module
	this.slot = SLOT_CONSUMABLE;
	// effects
	this.effects = [];
	// always last	
	this.value = getItemValue(this);

	this.canBeEquipped = function() {
		return false;
	}
}

/*   	 		Unrand Arts				*/

// crow bar - like a bar made out of crows HA
// pacifier - pacify enemies

function item_cable_whip() {
	// draw information
	this.char = '}';
	this.color = COLOR_DEFAULT;
	// entity information
	this.type = ENTITY_ITEM;
	this.name = NAME_CABLE_WHIP;
	this.solid = false;
	this.permanentSolid = false;
	// item information
	this.equipped = false;
	// wieldable
	this.slot = SLOT_WIELDABLE;
	this.twoHanded = false;
	this.dmg = 2;
	// effects
	this.effects = [];
	// always last	
	this.value = getItemValue(this);

	this.canBeEquipped = function() {
		return true;
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

function item_fire_axe() {
	// draw information
	this.char = '>';
	this.color = COLOR_DEFAULT;
	// entity information
	this.type = ENTITY_ITEM;
	this.name = NAME_FIRE_AXE;
	this.solid = false;
	this.permanentSolid = false;
	// item information
	this.equipped = false;
	// wieldable
	this.slot = SLOT_WIELDABLE;
	this.twoHanded = true;
	this.dmg = 4;
	// effects
	this.effects = [];
	// always last	
	this.value = getItemValue(this);

	this.canBeEquipped = function() {
		return true;
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

// powerLevel is a heuristic used to pick loot strength. Higher is better.
function generateLoot(powerLevel) {
	var lootType = LOOT_TYPES.peekRandom();	
	return makeItem(lootType);
}

function makeItem(name) {
	switch(name) {
		case NAME_CROWBAR: return new item_crowbar();
		case NAME_HP_MODULE: return new item_hp_module();
		case NAME_ACC_MODULE: return new item_acc_module();
		case NAME_DMG_MODULE: return new item_dmg_module();
		case NAME_REGEN_MODULE: return new item_regen_module();
		case NAME_WHEY_POTION: return new item_whey_potion();
		case NAME_CABLE_WHIP: return new item_cable_whip();
		case NAME_FIRE_AXE: return new item_fire_axe();
		case NAME_FORK: return new item_fork();
		case NAME_BASEBALL_BAT: return new item_baseball_bat();
		default: return ITEM_NONE;
	}
}

function getItemValue(item) {
	return 1;
}