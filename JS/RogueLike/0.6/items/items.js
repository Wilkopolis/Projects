// attack styles
var ATTACK_STYLE_SWING = "swing";
var ATTACK_STYLE_FLICK = "flick";
var ATTACK_STYLE_POKE = "poke";
var ATTACK_STYLE_STAB = "stab";
var ATTACK_STYLE_CASTING = "casting";
// proficiencies
var PROF_AMATUER = "amatuer";
var PROF_CHALLENGING = "challenging";
var PROF_MASTERFUL = "masterful";
// weapon names
var NAME_CROWBAR = "Crowbar";
var NAME_CABLE_WHIP = "Cable Whip";
var NAME_FIRE_AXE = "Fire Axe";
// legendary item effect: pacify -> neat
var LOOT_TYPES = [NAME_CROWBAR, NAME_CABLE_WHIP, NAME_FIRE_AXE, NAME_HP_MODULE, NAME_DMG_MODULE, NAME_REGEN_MODULE];
// module names
var NAME_HP_MODULE = "hp module";
var NAME_DMG_MODULE = "dmg module";
var NAME_REGEN_MODULE = "regen module";
// nothing
var ITEM_NONE = 'nothing';

function generateEquippable() {
	// pick type (module, hat, wieldable etc.)
	// make one of random quality
	return new item_fire_axe();
}

function generateDropItem(enemy) {
	var powerLevel = enemy.getThreat();
	var lootType = 'none';
	if (powerLevel > 5)
		lootType = LOOT_TYPES.peekRandom();
	
	switch(lootType) {
		case NAME_CROWBAR: return new item_crow_bar();
		case NAME_CABLE_WHIP: return new item_cable_whip();
		case NAME_FIRE_AXE: return new item_fire_axe();
		case NAME_HP_MODULE: return new item_hp_module();
		case NAME_DMG_MODULE: return new item_dmg_module();
		case NAME_REGEN_MODULE: return new item_regen_module();
		default: return ITEM_NONE;
	}
}

function item_crow_bar() {
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
	this.attackStyle = ATTACK_STYLE_SWING;
	this.dmg = 3;
	// always last	
	this.value = getItemValue(this);

	this.canBeEquipped = function() {
		return true;
	}
}

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
	this.attackStyle = ATTACK_STYLE_FLICK;
	this.dmg = 2;
	// always last	
	this.value = getItemValue(this);

	this.canBeEquipped = function() {
		return true;
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
	this.attackStyle = ATTACK_STYLE_SWING;
	this.dmg = 4;
	// always last	
	this.value = getItemValue(this);

	this.canBeEquipped = function() {
		return true;
	}
}

function item_hp_module() {	
	// draw information
	this.char = '9';
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
	// always last	
	this.value = getItemValue(this);

	this.canBeEquipped = function() {
		return true;
	}
}

function item_dmg_module() {	
	// draw information
	this.char = '8';
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
	// always last	
	this.value = getItemValue(this);

	this.canBeEquipped = function() {
		return true;
	}
}

function item_regen_module() {	
	// draw information
	this.char = '9';
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
	// always last	
	this.value = getItemValue(this);

	this.canBeEquipped = function() {
		return true;
	}
}

function getItemValue(item) {
	return 1;
}