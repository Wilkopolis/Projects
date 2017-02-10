// attack styles
var ATTACK_STYLE_SWING = 1;
var ATTACK_STYLE_POKE = 0;
var ATTACK_STYLE_CLOSE = 2;
var ATTACK_STYLE_DEFENSIVE = 3;
var ATTACK_STYLES = [
{name:"poke     ", selected:true, lvl:0, description:"Attack Style: Chance to stun enemy on hit based on level."},
{name:"swing    ", selected:false, lvl:0, description:"Attack Style: Hit adjacent enemies. Ranged based on level."},
{name:"close    ", selected:false, lvl:0, description:"Attack Style: Chance to strike twice based on level."},
{name:"defensive", selected:false, lvl:0, description:"Attack Style: Percent damage reduction based on level."}];
// slots
var SLOT_WIELDABLE = 'wieldable';
var SLOT_HEAD = 'Head';
var SLOT_MODULE = 'Module';
var SLOT_NONE = 'objective';
var SLOT_ACCESSORY = 'accessory';
var SLOT_CONSUMABLE = 'Consumable';
// weapons
var NAME_UTILITY_KNIFE = 'Utility Knife';
var NAME_WRENCH = 'Monkey Wrench';
var NAME_FIRE_AXE = 'Fire Axe';
var NAME_LUMBER_AXE = 'Lumber Axe';
var NAME_TERRAFORMER = 'Terraformer';
var NAME_GREED_DAGGER = 'Greed Dagger';
// hats
var NAME_HARD_HAT = 'Hardhat';
// chests
var NAME_HOCKEY_PADS = 'Hockey Pads';
// modules
var NAME_HP_MODULE_I = 'VitaChip v1';
var NAME_HP_MODULE_II = 'VitaChip v2';
var NAME_OFFENSE_MODULE_I = 'AdrenoCore v1';
var NAME_BRAIN_MODULE_I = 'Thinkcore v1';
// accessories
var NAME_SLIME_BELT = 'Slime Belt';
// consumables
var NAME_HP_POTION_I = 'Diet Hp Soda';
var NAME_HP_POTION_II = 'Hp Soda';
var NAME_BRAIN_POTION = 'Brain Drink';
var NAME_MUSCLE_POTION = 'Beef Cola';
// effects
var EFFECT_SHARP_I = 'Sharp I'; // chance to bleed
var EFFECT_STUN_I = 'Stun I';
var EFFECT_STUN_II = 'Stun II';
var EFFECT_KNOCKBACK_I = 'Knockback I';
var EFFECT_KNOCKBACK_II = 'Knockback II';
var EFFECT_KNOCKBACK_III = 'Knockback III';
var EFFECT_DEF_I = 'Def+';
var EFFECT_DEF_II = 'Def++';
var EFFECT_DEF_III = 'Def+++';
var EFFECT_DEF_I_N = 'Def-';
var EFFECT_DEF_II_N = 'Def--';
var EFFECT_DEF_III_N = 'Def---';
// attributes
var EFFECT_CONSTITUTION_I = 'Con+';
var EFFECT_CONSTITUTION_II = 'Con++';
var EFFECT_STRENGTH_I = 'Str+';
var EFFECT_STRENGTH_II = 'Str++';
var EFFECT_WILLPOWER_I = 'Will+';
var EFFECT_WILLPOWER_II = 'Wil++';
var EFFECT_PERCEPTION_I = 'Per+';
var EFFECT_PERCEPTION_II = 'Per++';
var EFFECT_LEADERSHIP_I = 'Lead+';
var EFFECT_LEADERSHIP_II = 'Lead++';
var EFFECT_CONSTITUTION_I_N = 'Con-';
var EFFECT_CONSTITUTION_II_N = 'Con--';
var EFFECT_STRENGTH_I_N = 'Str-';
var EFFECT_STRENGTH_II_N = 'Str--';
var EFFECT_WILLPOWER_I_N = 'Will-';
var EFFECT_WILLPOWER_II_N = 'Wil--';
var EFFECT_PERCEPTION_I_N = 'Per-';
var EFFECT_PERCEPTION_II_N = 'Per--';
var EFFECT_LEADERSHIP_I_N = 'Lead-';
var EFFECT_LEADERSHIP_II_N = 'Lead--';
// attack styles
var EFFECT_CLOSE_I = 'Close+';
var EFFECT_CLOSE_II = 'Close++';
var EFFECT_CLOSE_III = 'Close+++';
var EFFECT_SWING_I = 'Swing+';
var EFFECT_SWING_II = 'Swing++';
var EFFECT_SWING_III = 'Swing+++';
var EFFECT_POKE_I = 'Poke+';
var EFFECT_POKE_II = 'Poke++';
var EFFECT_POKE_III = 'Poke+++';
var EFFECT_DEFENSIVE_I = 'Defensive+';
var EFFECT_DEFENSIVE_II = 'Defensive++';
var EFFECT_DEFENSIVE_III = 'Defensive+++';
// unique
var EFFECT_TERRAFORM_I = 'Terraform I';
var EFFECT_GREED_I = 'Greed I'; // money on hit
var EFFECT_SLIME_COMPANION_I = 'Slimer I'; // pet slime follows you
// just regen
var EFFECT_REGEN_I = 'Regen I';
var EFFECT_REGEN_II = 'Regen II';
var EFFECT_DEGEN_I = 'Degen I';
var EFFECT_DEGEN_II = 'Degen II';
// modules
var CHAR_MODULE = '\u037D';

// available starting items
var LOADOUT_OPTIONS = [{name:NAME_FIRE_AXE, selected:false},
 {name:NAME_UTILITY_KNIFE, selected:false},
 {name:NAME_WRENCH, selected:false},
 {name:NAME_HP_MODULE_I, selected:false},
 {name:NAME_BRAIN_MODULE_I, selected:false},
 {name:NAME_GREED_DAGGER, selected:false},
 {name:NAME_SLIME_BELT, selected:false}];

// nothing
var ITEM_NONE = 'nothing';

// commons
var COMMONS = [NAME_UTILITY_KNIFE, NAME_FIRE_AXE, NAME_WRENCH, NAME_HP_MODULE_I, NAME_HP_POTION_I, NAME_BRAIN_POTION, NAME_MUSCLE_POTION];
// rares
var RARES = [NAME_HARD_HAT, NAME_HP_MODULE_II, NAME_LUMBER_AXE, NAME_MUSCLE_POTION, NAME_BRAIN_MODULE_I, NAME_GREED_DAGGER];
// epics
var MYTHICS = [NAME_HOCKEY_PADS, NAME_OFFENSE_MODULE_I];
// legendaries
var LEGENDARIES = [NAME_TERRAFORMER];

// n = 6 gives a good enough approximation
// a normal distrbution from 0-6 that centered around 3
function gaussian() {
    return Math.abs(.5 - ((Math.random() + Math.random() + Math.random() + Math.random()) / 4));
}

// unitXp is a heuristic used to pick loot strength. Higher is better.
function generateLoot(unitXp) {

	// check if we are a pharmacist, if so make some pills maybe
	if ((player.class == CLASS_PHARMACIST && Math.random() <= .3) || (player.class != CLASS_PHARMACIST && player.skills.skillObject[SKILL_PILL_SEEKER] && Math.random() <= .1))
		return MakePill(unitXp);

	// the loot we will be making
	var lootType = ITEM_NONE;

	var number = gaussian();
	// adjust the number based on the unit's xp
	number += unitXp / 200;
	// chance for rarity groups
	if (number < .14) {
		// chance for no item
		if (Math.random() < .8)
			lootType = ITEM_NONE;
		else
			lootType = COMMONS.peekRandom();
	} else if (number < .22) {
		// chance for no item
		if (Math.random() < .6)
			lootType = ITEM_NONE;
		else
			lootType = RARES.peekRandom();
	} else if (number < .3) {
		// chance for no item
		if (Math.random() < .5)
			lootType = ITEM_NONE;
		else
			lootType = MYTHICS.peekRandom();
	} else if (number <= 1) {
		// chance for no item
		if (Math.random() < .4)
			lootType = ITEM_NONE;
		else
			lootType = LEGENDARIES.peekRandom();
	}
	if (lootType != ITEM_NONE && Math.random() <= .3)
		return Math.round(Math.random() * unitXp * 4);
	else
		return MakeItem(lootType);
}

function generateShopItem() {
	// the loot we will be making
	var lootType;

	var number = gaussian();
	// chance for rarity groups
	if (number < .14) {
		lootType = COMMONS.peekRandom();
	} else if (number < .22) {
		lootType = RARES.peekRandom();
	} else if (number < .3) {
		lootType = MYTHICS.peekRandom();
	} else if (number <= 1) {
		lootType = LEGENDARIES.peekRandom();
	}
	return MakeItem(lootType);
}

function MakeItem(lootType) {
	var char,
	color = COLOR_DEFAULT, 
	slot, handCount = 1, 
	damage, 
	accuracy, 
	ranged, 
	effects, 
	value, 
	cooldown = 0;
	description = "", 
	font = FONT_STYLE_DEFAULT;
	switch(lootType) {
		case NAME_SLIME_BELT:			
			char = CHAR_ACCESSORY;
			font = FONT_STYLE_POTION;
			slot = SLOT_ACCESSORY;
			effects = [EFFECT_SLIME_COMPANION_I];
			cooldown = 20;
			value = 20;
		break;
		case NAME_HP_POTION_I:
			char = CHAR_POTION;
			font = FONT_STYLE_POTION;
			slot = SLOT_CONSUMABLE;
			effects = [NAME_HP_POTION_I];
			value = 20;
		break;
		case NAME_HP_POTION_II:
			char = CHAR_POTION;
			font = FONT_STYLE_POTION;
			slot = SLOT_CONSUMABLE;
			effects = [NAME_HP_POTION_II];
			value = 45;
		break;
		case NAME_BRAIN_POTION:
			char = CHAR_POTION;
			font = FONT_STYLE_POTION;
			slot = SLOT_CONSUMABLE;
			effects = [{type:EFFECT_WILLPOWER_II, ticksRemaining:20, unique:false}, {type:EFFECT_LEADERSHIP_II, ticksRemaining:20, unique:false}];
			value = 20;
		break;
		case NAME_MUSCLE_POTION:
			char = CHAR_POTION;
			font = FONT_STYLE_POTION;
			slot = SLOT_CONSUMABLE;
			effects = [{type:EFFECT_STRENGTH_II, ticksRemaining:20, unique:false}, {type:EFFECT_CONSTITUTION_II, ticksRemaining:20, unique:false}];
			value = 20;
		break;
		case NAME_GREED_DAGGER: 
			char = '(';
			slot = SLOT_WIELDABLE;
			damage = 1;
			ranged = false;
			effects = [EFFECT_GREED_I, EFFECT_STRENGTH_I_N, EFFECT_DEF_I_N];
			accuracy = .2;
			value = 20;
		break;
		case NAME_LUMBER_AXE: 
			char = '(';
			slot = SLOT_WIELDABLE;
			damage = 6;
			ranged = false;
			effects = [EFFECT_SWING_I, EFFECT_SHARP_I];
			accuracy = .2;
			value = 20;
		break;
		case NAME_TERRAFORMER: 
			char = 'i';
			slot = SLOT_WIELDABLE;
			damage = 7;
			ranged = false;
			effects = [EFFECT_TERRAFORM_I];
			accuracy = .1;
			value = 60;
		break;
		case NAME_HOCKEY_PADS: 
			char = 'H';
			slot = SLOT_HEAD;
			effects = [EFFECT_DEF_II, EFFECT_CONSTITUTION_I];
			value = 45;
		break;
		case NAME_HARD_HAT: 
			char = 'c';
			slot = SLOT_HEAD;
			effects = [EFFECT_DEF_II];
			value = 30;
		break;
		case NAME_FIRE_AXE: 
			char = '(';
			slot = SLOT_WIELDABLE;
			damage = 3;
			ranged = false;
			effects = [EFFECT_SWING_I];
			accuracy = .2;
			value = 20;
		break;
		case NAME_UTILITY_KNIFE: 
			char = '(';
			slot = SLOT_WIELDABLE;
			damage = 2;
			ranged = false;
			effects = [EFFECT_SHARP_I];
			accuracy = .3;
			value = 16;
		break;
		case NAME_WRENCH: 
			char = '(';
			slot = SLOT_WIELDABLE;
			handCount = 2;
			damage = 5;
			ranged = false;
			effects = [];
			accuracy = 0;
			value = 28;
		break;
		case NAME_HP_MODULE_I:
			char = CHAR_MODULE;
			slot = SLOT_MODULE;
			effects = [EFFECT_CONSTITUTION_I];
			value = 26;
		break;
		case NAME_HP_MODULE_II:
			char = CHAR_MODULE;
			slot = SLOT_MODULE;
			effects = [EFFECT_CONSTITUTION_II];
			value = 48;
		break;
		case NAME_OFFENSE_MODULE_I:
			char = CHAR_MODULE;
			slot = SLOT_MODULE;
			effects = [EFFECT_CLOSE_II, EFFECT_STRENGTH_I];
			value = 48;
		break;
		case NAME_BRAIN_MODULE_I:
			char = CHAR_MODULE;
			slot = SLOT_MODULE;
			effects = [EFFECT_WILLPOWER_I, EFFECT_LEADERSHIP_I];
			value = 48;
		break;

		// unit items, not for player consumption
		case NAME_TRASH_BOT:
			slot = SLOT_WIELDABLE;
			damage = 0;
			ranged = false;
			effects = [EFFECT_STUN_I];
			accuracy = 0;
		break;
		case NAME_BUTLER:
			slot = SLOT_WIELDABLE;
			damage = 0;
			ranged = false;
			effects = [EFFECT_STUN_II];
			accuracy = 0;
		break;
		case NAME_DOG:
			slot = SLOT_WIELDABLE;
			damage = 0;
			ranged = false;
			effects = [EFFECT_SHARP_I];
			accuracy = 0;
		break;
		case NAME_GORILLA:
			slot = SLOT_WIELDABLE;
			damage = 0;
			ranged = false;
			effects = [EFFECT_KNOCKBACK_III];
			accuracy = 0;
		break;	
		// ITEM_NONE/AttributePoints/SkillPoints
		default: return lootType;
	}
	return new item(lootType, char, font, color, slot, handCount, damage, accuracy, ranged, effects, value, cooldown, description);
}

var PILL_NORMAL = 'pill_normal';
var PILL_GOOD = 'pill_good';
var PILL_LEGENDARY = 'pill_legendary';
// legendary pills
var NAME_PILL_STIMULANT = 'stimulant'; // crit chance up, close++, regen for 15
var NAME_PILL_AMPHETAMINE = 'amphetamine'; // per+, will++, for 30
var NAME_PILL_SALTS = 'MDPV'; // lose faction, per++, str++ for 30
var NAME_PILL_OPIATE = 'opiate'; // def++, con++, for 30
var NAME_PILL_STEROID = 'steroid'; // str++, crit damage+ for 30
var NAME_PILL_ANTIPSYCHOTIC = 'anti-psychotic'; // lead++, will+, for 30
var NAME_PILL_STAT_UP = 'stat_up'; // 2 stat up, 1 stat down

var DRUG_PREFIXES = ["cef", "ceph", "cort", "rifa", "sulf", "cam"];
var DRUG_SUFFIXES = ["ane","ase","azole","azosin","barbital","caine","calci","cillin",
"ciclovir","curium","cycline","dazole","dipine","dronate","floxacin","ine","micin","navir","actone"];

var LEGENDARY_PILLS = [NAME_PILL_STIMULANT, NAME_PILL_AMPHETAMINE, NAME_PILL_SALTS, NAME_PILL_OPIATE, NAME_PILL_STEROID,
					   NAME_PILL_ANTIPSYCHOTIC, NAME_PILL_STAT_UP];

var PILL_NORMAL_GOOD_EFFECTS = [{name:EFFECT_CLOSE_I, frequency:8},{name:EFFECT_CLOSE_II, frequency:2},{name:EFFECT_SWING_I, frequency:8},
{name:EFFECT_SWING_II, frequency:2},{name:EFFECT_POKE_I, frequency:8},{name:EFFECT_POKE_II, frequency:2},{name:EFFECT_DEFENSIVE_I, frequency:8},
{name:EFFECT_DEFENSIVE_II, frequency:2},{name:EFFECT_CONSTITUTION_I, frequency:15},{name:EFFECT_CONSTITUTION_II, frequency:7},
{name:EFFECT_CONSTITUTION_I, frequency:15},{name:EFFECT_CONSTITUTION_II, frequency:7},{name:EFFECT_STRENGTH_I, frequency:15},
{name:EFFECT_STRENGTH_II, frequency:7},{name:EFFECT_WILLPOWER_I, frequency:15},{name:EFFECT_WILLPOWER_II, frequency:7},
{name:EFFECT_PERCEPTION_I, frequency:15},{name:EFFECT_PERCEPTION_II, frequency:7},{name:EFFECT_LEADERSHIP_I, frequency:15},
{name:EFFECT_LEADERSHIP_II, frequency:7},{name:EFFECT_DEF_I, frequency:15},{name:EFFECT_DEF_II, frequency:7},
{name:EFFECT_REGEN_I, frequency:10},{name:NAME_HP_POTION_I, frequency:10}];

var PILL_NORMAL_BAD_EFFECTS = [{name:EFFECT_CONSTITUTION_I_N, frequency:5},{name:EFFECT_CONSTITUTION_II_N, frequency:5},
{name:EFFECT_STRENGTH_I_N, frequency:5},{name:EFFECT_STRENGTH_II_N, frequency:5},{name:EFFECT_WILLPOWER_I_N, frequency:5},
{name:EFFECT_WILLPOWER_II_N, frequency:5},{name:EFFECT_PERCEPTION_I_N, frequency:5},{name:EFFECT_PERCEPTION_II_N, frequency:5},
{name:EFFECT_LEADERSHIP_I_N, frequency:5},{name:EFFECT_LEADERSHIP_II_N, frequency:5}, {name:EFFECT_DEGEN_I, frequency:10},
{name:EFFECT_DEGEN_II, frequency:10},{name:EFFECT_DEF_I_N, frequency:5},{name:EFFECT_DEF_II_N, frequency:5},{name:EFFECT_DEGEN_I, frequency:10}];

var PILL_ADVANCED_GOOD_EFFECTS = [{name:EFFECT_CLOSE_II, frequency:8},{name:EFFECT_CLOSE_III, frequency:2},{name:EFFECT_SWING_II, frequency:8},
{name:EFFECT_SWING_III, frequency:2},{name:EFFECT_POKE_II, frequency:8},{name:EFFECT_POKE_III, frequency:2},{name:EFFECT_DEFENSIVE_II, frequency:8},
{name:EFFECT_DEFENSIVE_III, frequency:2},{name:EFFECT_CONSTITUTION_I, frequency:8},{name:EFFECT_CONSTITUTION_II, frequency:15},
{name:EFFECT_CONSTITUTION_I, frequency:8},{name:EFFECT_CONSTITUTION_II, frequency:15},{name:EFFECT_STRENGTH_I, frequency:8},
{name:EFFECT_STRENGTH_II, frequency:15},{name:EFFECT_WILLPOWER_I, frequency:8},{name:EFFECT_WILLPOWER_II, frequency:15},
{name:EFFECT_PERCEPTION_I, frequency:8},{name:EFFECT_PERCEPTION_II, frequency:15},{name:EFFECT_LEADERSHIP_I, frequency:8},
{name:EFFECT_LEADERSHIP_II, frequency:15},{name:EFFECT_DEF_II, frequency:15},{name:EFFECT_DEF_III, frequency:7},
{name:EFFECT_REGEN_II, frequency:10},{name:NAME_HP_POTION_I, frequency:10},{name:NAME_HP_POTION_II, frequency:10}];

var PILL_ADVANCED_BAD_EFFECTS = [{name:EFFECT_CONSTITUTION_I_N, frequency:5},{name:EFFECT_CONSTITUTION_II_N, frequency:5},
{name:EFFECT_STRENGTH_I_N, frequency:5},{name:EFFECT_STRENGTH_II_N, frequency:5},{name:EFFECT_WILLPOWER_I_N, frequency:5},
{name:EFFECT_WILLPOWER_II_N, frequency:5},{name:EFFECT_PERCEPTION_I_N, frequency:5},{name:EFFECT_PERCEPTION_II_N, frequency:5},
{name:EFFECT_LEADERSHIP_I_N, frequency:5},{name:EFFECT_LEADERSHIP_II_N, frequency:5}, {name:EFFECT_DEGEN_I, frequency:10},
{name:EFFECT_DEGEN_II, frequency:10},{name:EFFECT_DEF_I_N, frequency:5},{name:EFFECT_DEF_II_N, frequency:5},
{name:EFFECT_DEGEN_II, frequency:10}];

var EFFECT_ADDICTIVE = 'addictive';
var EFFECT_TEAMLESS = 'teamless';

function MakePill(unitXp) {

	var char = CHAR_PILL,
	color = COLOR_DEFAULT, 
	slot = SLOT_CONSUMABLE, 
	effects = [], 
	value, 
	description = "", 
	font = FONT_STYLE_PILL;

	var DrugType = PILL_NORMAL;

	if (player.skills.skillObject[SKILL_DEREGULATION].purchased) {

		DrugType = PILL_GOOD;

		if (player.skills.skillObject[SKILL_THE_GOOD_STUFF].purchased && Math.random() <= .1) {
			DrugType = LEGENDARY_PILLS.peekRandom();
		}
	}

	var permanent = Math.random() <= .3 + unitXp / 200;
	var addictive = Math.random() <= .5;

	// 1x good, 2x bad
	if (DrugType == PILL_NORMAL) {

		// pick the name
		DrugType = DRUG_PREFIXES.peekRandom() + DRUG_SUFFIXES.peekRandom();

		// set up our initial good and bad effects
		var GOODS = PILL_NORMAL_GOOD_EFFECTS.slice(0);
		var BADS = PILL_NORMAL_BAD_EFFECTS.slice(0);

		// pick our good, remove the duplicate effects
		var good = GOODS.popWeighted().name;
		removeSimilar(good, BADS);

		// pick our bads, remove the duplicate effects
		var bad = BADS.popWeighted().name;

		if (!player.skills.skillObject[SKILL_QUALITY_CONTROL].purchased) {
			removeSimilar(bad, BADS);
			var bad2 = BADS.popWeighted().name;
			effects.push({type:bad2, duration:15, permanent:permanent, addictive:addictive});
		}
		
		effects.push({type:good, duration:15, permanent:permanent, addictive:addictive});	
		effects.push({type:bad, duration:15, permanent:permanent, addictive:addictive});

		value = permanent ? 15 : 7;
	// 2x good, 1x bad
	} else if (DrugType == PILL_GOOD) {

		// pick the name
		DrugType = DRUG_PREFIXES.peekRandom() + DRUG_SUFFIXES.peekRandom();

		// set up our initial good and bad effects
		var GOODS = PILL_ADVANCED_GOOD_EFFECTS.slice(0);
		var BADS = PILL_ADVANCED_BAD_EFFECTS.slice(0);

		// pick our bad, remove the duplicate effects
		if (!player.skills.skillObject[SKILL_QUALITY_CONTROL].purchased) {
			var bad = BADS.popWeighted().name;
			removeSimilar(bad, GOODS);
			effects.push({type:bad, duration:15, permanent:permanent, addictive:addictive});
		}

		// pick our goods, remove the duplicate effects
		var good = GOODS.popWeighted().name;
		removeSimilar(bad, GOODS);

		var good2 = GOODS.popWeighted().name;
		
		effects.push({type:good, duration:25, permanent:permanent, addictive:addictive});	
		effects.push({type:good, duration:25, permanent:permanent, addictive:addictive});

		value = permanent ? 35 : 20;
	// legendary
	} else {
		switch(DrugType) {
			// crit chance up, close++, regen for 20
			case NAME_PILL_STIMULANT:

				effects = [{type:EFFECT_CRIT_CHANCE_III, duration:20, permanent:permanent, addictive:addictive},
						   {type:EFFECT_CLOSE_III, duration:20, permanent:permanent, addictive:addictive},
						   {type:EFFECT_REGEN_II, duration:20, permanent:permanent, addictive:addictive}];

				value = permanent ? 50 : 30;
			break;
			// per+, will++, for 30
			case NAME_PILL_AMPHETAMINE:

				effects = [{type:EFFECT_PERCEPTION_I, duration:30, permanent:permanent, addictive:addictive},
						   {type:EFFECT_WILLPOWER_II, duration:30, permanent:permanent, addictive:addictive}];

				value = permanent ? 50 : 30;
			break; 
			// lose faction, per++, str++ for 30
			case NAME_PILL_SALTS:

				effects = [{type:EFFECT_PERCEPTION_II, duration:30, permanent:permanent, addictive:addictive},
						   {type:EFFECT_STRENGTH_II, duration:30, permanent:permanent, addictive:addictive},
						   {type:EFFECT_TEAMLESS, duration:30, permanent:permanent, addictive:addictive}];

				value = permanent ? 50 : 30;
			break; 
			// def++, con++, for 30
			case NAME_PILL_OPIATE:

				effects = [{type:EFFECT_DEF_II, duration:30, permanent:permanent, addictive:addictive},
						   {type:EFFECT_CONSTITUTION_II, duration:30, permanent:permanent, addictive:addictive}];

				value = permanent ? 50 : 30;
			break; 
			// str++, crit damage+ for 30
			case NAME_PILL_STEROID:

				effects = [{type:EFFECT_STRENGTH_II, duration:30, permanent:permanent, addictive:addictive},
						   {type:EFFECT_CRIT_DAMAGE_II, duration:30, permanent:permanent, addictive:addictive}];

				value = permanent ? 50 : 30;
			break;
			// lead++, will+, for 30
			case NAME_PILL_ANTIPSYCHOTIC:
				
				effects = [{type:EFFECT_LEADERSHIP_II, duration:30, permanent:permanent, addictive:addictive},
						   {type:EFFECT_WILLPOWER_I, duration:30, permanent:permanent, addictive:addictive}];

				value = permanent ? 50 : 30;
			break; 
			case NAME_PILL_STAT_UP:

				var GOODS = PILL_STATS_UP.slice(0);
				var BADS = PILL_STATS_DOWN.slice(0);
				var effect_1 = 

				effects = [{type:EFFECT_STRENGTH_II, duration:30, permanent:permanent, addictive:addictive},
						   {type:EFFECT_CRIT_DAMAGE_II, duration:30, permanent:permanent, addictive:addictive}];

				value = permanent ? 50 : 30;
			break;
		}
	}
	
	return new item(DrugType, char, font, color, slot, false, 0, 0, false, effects, value, 0, description);
}

/*   	 		Basic Items				*/

function item(name, char, font, color, slot, handCount, damage, accuracy, ranged, effects, value, cooldown, description = "") {
	// draw information
	this.char = char;
	this.color = color;
	this.font = font;
	// entity information
	this.type = ENTITY_ITEM;
	this.name = name;
	this.solid = false;
	this.permanentSolid = false;
	this.simulatesPhysics = true;
	this.animate = false;
	// for the enemy log
	this.loggable = false;
	// for auto exploring
	this.discovered = true;
	// item information
	this.equipped = false;
	// wieldable
	this.slot = slot;
	this.handCount = handCount;
	this.damage = damage;
	this.accuracy = accuracy;
	this.ranged = ranged;
	this.hash = hash++;
	this.lastUsedTick = - cooldown;
	this.cooldown = cooldown;
	// effects
	this.effects = effects;
	this.value = value;
	this.description = description;
	// for being knockedback
	this.x = 0;
	this.y = 0;

	this.canBeEquipped = function(character) {
		switch (this.slot) {
			case SLOT_CONSUMABLE: return false;
			case SLOT_MODULE: return character.modules.length < character.maxModules;
			case SLOT_ACCESSORY: return character.accessories.length < character.maxAccessories;
			default: return true;
		}
	}

	this.canBeUnequipped = function() {
		return true;
	}

	this.equip = function(character) {
		this.equipped = true;
		for (var i = this.effects.length - 1; i >= 0; i--) {
			var effect = this.effects[i];
			switch (effect) {
				case EFFECT_TERRAFORM_I: character.skills.skillObject[EFFECT_TERRAFORM_I].equipped = true; break;
				case EFFECT_DEF_I: character.baseDef += 1; break;
				case EFFECT_DEF_II: character.baseDef += 2; break;
				case EFFECT_DEF_III: character.baseDef += 3; break;
				case EFFECT_DEF_I_N: character.baseDef -= 1; break;
				case EFFECT_DEF_II_N: character.baseDef -= 2; break;
				case EFFECT_DEF_III_N: character.baseDef -= 3; break;
				case EFFECT_CONSTITUTION_I: 
					character.constitution += 1; 
					var newHpMax = 20 + character.constitution * character.level;
					var hpDiff = newHpMax - character.hpMax;
					character.hpMax = newHpMax;
					character.hp += hpDiff;
				break;
				case EFFECT_CONSTITUTION_II: 
					character.constitution += 2; 
					var newHpMax = 20 + character.constitution * character.level;
					var hpDiff = newHpMax - character.hpMax;
					character.hpMax = newHpMax;
					character.hp += hpDiff;
				break;
				case EFFECT_STRENGTH_I: character.strength += 1; break;
				case EFFECT_STRENGTH_II: character.strength += 2; break;
				case EFFECT_WILLPOWER_I: character.willpower += 1; break;
				case EFFECT_WILLPOWER_II: character.willpower += 2; break;
				case EFFECT_PERCEPTION_I: character.perception += 1; break;
				case EFFECT_PERCEPTION_II: character.perception += 2; break;
				case EFFECT_LEADERSHIP_I: character.leadership += 1; break;
				case EFFECT_LEADERSHIP_II: character.leadership += 2; break;
				case EFFECT_CONSTITUTION_I_N: 
					character.constitution -= 1;
					var newHpMax = 20 + character.constitution * character.level;
					var hpDiff = newHpMax - character.hpMax;
					character.hpMax = newHpMax;
					character.hp += hpDiff; 
				break;
				case EFFECT_CONSTITUTION_II_N: 
					character.constitution -= 2;
					var newHpMax = 20 + character.constitution * character.level;
					var hpDiff = newHpMax - character.hpMax;
					character.hpMax = newHpMax;
					character.hp += hpDiff;
				break;
				case EFFECT_STRENGTH_I_N: character.strength -= 1; break;
				case EFFECT_STRENGTH_II_N: character.strength -= 2; break;
				case EFFECT_WILLPOWER_I_N: character.willpower -= 1; break;
				case EFFECT_WILLPOWER_II_N: character.willpower -= 2; break;
				case EFFECT_PERCEPTION_I_N: character.perception -= 1; break;
				case EFFECT_PERCEPTION_II_N: character.perception -= 2; break;
				case EFFECT_LEADERSHIP_I_N: character.leadership -= 1; break;
				case EFFECT_LEADERSHIP_II_N: character.leadership -= 2; break;
				case EFFECT_CLOSE_I: character.attackStyles[ATTACK_STYLE_CLOSE].lvl += 1; break;
				case EFFECT_CLOSE_II: character.attackStyles[ATTACK_STYLE_CLOSE].lvl += 2; break;
				case EFFECT_CLOSE_III: character.attackStyles[ATTACK_STYLE_CLOSE].lvl += 3; break;
				case EFFECT_SWING_I: character.attackStyles[ATTACK_STYLE_SWING].lvl += 1; break;
				case EFFECT_SWING_II: character.attackStyles[ATTACK_STYLE_SWING].lvl += 2; break;
				case EFFECT_SWING_III: character.attackStyles[ATTACK_STYLE_SWING].lvl += 3; break;
				case EFFECT_POKE_I: character.attackStyles[ATTACK_STYLE_POKE].lvl += 1; break;
				case EFFECT_POKE_II: character.attackStyles[ATTACK_STYLE_POKE].lvl += 2; break;
				case EFFECT_POKE_III: character.attackStyles[ATTACK_STYLE_POKE].lvl += 3; break;
				case EFFECT_DEFENSIVE_I: character.attackStyles[ATTACK_STYLE_DEFENSIVE].lvl += 1; break;
				case EFFECT_DEFENSIVE_II: character.attackStyles[ATTACK_STYLE_DEFENSIVE].lvl += 2; break;
				case EFFECT_DEFENSIVE_III: character.attackStyles[ATTACK_STYLE_DEFENSIVE].lvl += 3; break;
				case EFFECT_GREED_I: character.addStatus({type:EFFECT_GREED_I, ticksRemaining:-1, unique:false}); break;
				case EFFECT_SLIME_COMPANION_I:
					for (var j = dungeon.npcs.length - 1; j >= 0; j--) {
						var npc = dungeon.npcs[j];
						if (npc.name == NAME_SLIME_I && npc.parent == this) {
							npc.destination = character;
							npc.type = ENTITY_COMPANION;
							npc.faction = FACTION_CLONES;
							npc.color = COLOR_FACTIONS_POWERED[npc.faction];
							character.allies.push(npc);
							return;
						}
					}
					if (this.lastUsedTick <= gameTicks - this.cooldown) {						
						var slime = MakeNPC(NAME_SLIME_I, getOpenSpot({x:character.x, y:character.y}));
						slime.destination = character;
						slime.parent = this;
						dungeon.npcs.push(slime);
						dungeon.tiles[slime.y][slime.x].entities.push(slime);
						character.allies.push(slime);
					}
				break;
			}
		}
	}

	this.unequip = function(character) {
		this.equipped = false;
		for (var i = this.effects.length - 1; i >= 0; i--) {
			var effect = this.effects[i];
			switch (effect) {
				case EFFECT_TERRAFORM_I: character.skills.skillObject[EFFECT_TERRAFORM_I].equipped = false;	break;	
				case EFFECT_DEF_I: character.baseDef -= 1; break;
				case EFFECT_DEF_II: character.baseDef -= 2; break;
				case EFFECT_DEF_III: character.baseDef -= 3; break;
				case EFFECT_DEF_I_N: character.baseDef += 1; break;
				case EFFECT_DEF_II_N: character.baseDef += 2; break;
				case EFFECT_DEF_III_N: character.baseDef += 3; break;
				case EFFECT_CONSTITUTION_I: 
					character.constitution -= 1; 
					var newHpMax = 20 + character.constitution * character.level;
					var hpDiff = newHpMax - character.hpMax;
					character.hpMax = newHpMax;
					character.hp += hpDiff;
				break;
				case EFFECT_CONSTITUTION_II: 
					character.constitution -= 2; 
					var newHpMax = 20 + character.constitution * character.level;
					var hpDiff = newHpMax - character.hpMax;
					character.hpMax = newHpMax;
					character.hp += hpDiff;
				break;
				case EFFECT_STRENGTH_I: character.strength -= 1; break;
				case EFFECT_STRENGTH_II: character.strength -= 2; break;
				case EFFECT_WILLPOWER_I: character.willpower -= 1; break;
				case EFFECT_WILLPOWER_II: character.willpower -= 2; break;
				case EFFECT_PERCEPTION_I: character.perception -= 1; break;
				case EFFECT_PERCEPTION_II: character.perception -= 2; break;
				case EFFECT_LEADERSHIP_I: character.leadership -= 1; break;
				case EFFECT_LEADERSHIP_II: character.leadership -= 2; break;
				case EFFECT_CONSTITUTION_I_N: 
					character.constitution += 1;
					var newHpMax = 20 + character.constitution * character.level;
					var hpDiff = newHpMax - character.hpMax;
					character.hpMax = newHpMax;
					character.hp += hpDiff; 
				break;
				case EFFECT_CONSTITUTION_II_N: 
					character.constitution += 2;
					var newHpMax = 20 + character.constitution * character.level;
					var hpDiff = newHpMax - character.hpMax;
					character.hpMax = newHpMax;
					character.hp += hpDiff;
				break;
				case EFFECT_STRENGTH_I_N: character.strength += 1; break;
				case EFFECT_STRENGTH_II_N: character.strength += 2; break;
				case EFFECT_WILLPOWER_I_N: character.willpower += 1; break;
				case EFFECT_WILLPOWER_II_N: character.willpower += 2; break;
				case EFFECT_PERCEPTION_I_N: character.perception += 1; break;
				case EFFECT_PERCEPTION_II_N: character.perception += 2; break;
				case EFFECT_LEADERSHIP_I_N: character.leadership += 1; break;
				case EFFECT_LEADERSHIP_II_N: character.leadership += 2; break;
				case EFFECT_CLOSE_I: character.attackStyles[ATTACK_STYLE_CLOSE].lvl -= 1; break;
				case EFFECT_CLOSE_II: character.attackStyles[ATTACK_STYLE_CLOSE].lvl -= 2; break;
				case EFFECT_CLOSE_III: character.attackStyles[ATTACK_STYLE_CLOSE].lvl -= 3; break;
				case EFFECT_SWING_I: character.attackStyles[ATTACK_STYLE_SWING].lvl -= 1; break;
				case EFFECT_SWING_II: character.attackStyles[ATTACK_STYLE_SWING].lvl -= 2; break;
				case EFFECT_SWING_III: character.attackStyles[ATTACK_STYLE_SWING].lvl -= 3; break;
				case EFFECT_POKE_I: character.attackStyles[ATTACK_STYLE_POKE].lvl -= 1; break;
				case EFFECT_POKE_II: character.attackStyles[ATTACK_STYLE_POKE].lvl -= 2; break;
				case EFFECT_POKE_III: character.attackStyles[ATTACK_STYLE_POKE].lvl -= 3; break;
				case EFFECT_DEFENSIVE_I: character.attackStyles[ATTACK_STYLE_DEFENSIVE].lvl -= 1; break;
				case EFFECT_DEFENSIVE_II: character.attackStyles[ATTACK_STYLE_DEFENSIVE].lvl -= 2; break;
				case EFFECT_DEFENSIVE_III: character.attackStyles[ATTACK_STYLE_DEFENSIVE].lvl -= 3; break;
				case EFFECT_GREED_I: character.removeStatus(effect.type); break;
				case EFFECT_SLIME_COMPANION_I:
					// free the slime
					for (var j = character.allies.length - 1; j >= 0; j--) {
						if (character.allies[j].name == NAME_SLIME_I && character.allies[j].parent == this) {
							character.allies[j].destination = DESTINATION_NONE;
							character.allies[j].type = ENTITY_ENEMY;
							character.allies[j].color = COLOR_DEFAULT;
							break;
						}
					}
				break;
			}
		}
	}

	this.canBeConsumed = function(character) {
		switch (this.name) {
			case NAME_HP_POTION_I:
				return character.hp < character.hpMax;
			break;
			default: return true;
		}
	}

	this.consume = function(character) {
		for (var i = this.effects.length - 1; i >= 0; i--) {
			var effect = this.effects[i];
			switch(effect.type) {				
				case NAME_HP_POTION_I:
					character.hp = Math.min(character.hp + 15, character.hpMax);
				break;	
				case NAME_HP_POTION_II:
					character.hp = Math.min(character.hp + 25, character.hpMax);
				break;			
				case EFFECT_DEF_I:
					character.baseDef += 1;
					if (!effect.permanent)
						character.addStatus({type:effect.type, ticksRemaining:effect.duration, unique:false});
				break;
				case EFFECT_DEF_II:
					character.baseDef += 2;
					if (!effect.permanent)
						character.addStatus({type:effect.type, ticksRemaining:effect.duration, unique:false});
				break;
				case EFFECT_DEF_III:
					character.baseDef += 3;
					if (!effect.permanent)
						character.addStatus({type:effect.type, ticksRemaining:effect.duration, unique:false});
				break;
				case EFFECT_DEF_I_N:
					character.baseDef -= 1;
					if (!effect.permanent)
						character.addStatus({type:effect.type, ticksRemaining:effect.duration, unique:false});
				break;
				case EFFECT_DEF_II_N:
					character.baseDef -= 2;
					if (!effect.permanent)
						character.addStatus({type:effect.type, ticksRemaining:effect.duration, unique:false});
				break;
				case EFFECT_DEF_III_N:
					character.baseDef -= 3;
					if (!effect.permanent)
						character.addStatus({type:effect.type, ticksRemaining:effect.duration, unique:false});
				break;
				case EFFECT_CONSTITUTION_I:
					character.constitution += 1;
					if (!effect.permanent)
						character.addStatus({type:effect.type, ticksRemaining:effect.duration, unique:false});
				break;
				case EFFECT_CONSTITUTION_II:
					character.constitution += 2;
					if (!effect.permanent)
						character.addStatus({type:effect.type, ticksRemaining:effect.duration, unique:false});
				break;
				case EFFECT_STRENGTH_I:
					character.strength += 1;
					if (!effect.permanent)
						character.addStatus({type:effect.type, ticksRemaining:effect.duration, unique:false});
				break;
				case EFFECT_STRENGTH_II:
					character.strength += 2;
					if (!effect.permanent)
						character.addStatus({type:effect.type, ticksRemaining:effect.duration, unique:false});
				break;
				case EFFECT_WILLPOWER_I:
					character.willpower += 1;
					if (!effect.permanent)
						character.addStatus({type:effect.type, ticksRemaining:effect.duration, unique:false});
				break;
				case EFFECT_WILLPOWER_II:
					character.willpower += 2;
					if (!effect.permanent)
						character.addStatus({type:effect.type, ticksRemaining:effect.duration, unique:false});
				break;
				case EFFECT_PERCEPTION_I:
					character.perception += 1;
					if (!effect.permanent)
						character.addStatus({type:effect.type, ticksRemaining:effect.duration, unique:false});
				break;
				case EFFECT_PERCEPTION_II:
					character.perception += 2;
					if (!effect.permanent)
						character.addStatus({type:effect.type, ticksRemaining:effect.duration, unique:false});
				break;
				case EFFECT_LEADERSHIP_I:
					character.leadership += 1;
					if (!effect.permanent)
						character.addStatus({type:effect.type, ticksRemaining:effect.duration, unique:false});
				break;
				case EFFECT_LEADERSHIP_II:
					character.leadership += 2;
					if (!effect.permanent)
						character.addStatus({type:effect.type, ticksRemaining:effect.duration, unique:false});
				break;
				case EFFECT_CONSTITUTION_I_N:
					character.constitution -= 1;
					if (!effect.permanent)
						character.addStatus({type:effect.type, ticksRemaining:effect.duration, unique:false});
				break;
				case EFFECT_CONSTITUTION_II_N:
					character.constitution -= 2;
					if (!effect.permanent)
						character.addStatus({type:effect.type, ticksRemaining:effect.duration, unique:false});
				break;
				case EFFECT_STRENGTH_I_N:
					character.strength -= 1;
					if (!effect.permanent)
						character.addStatus({type:effect.type, ticksRemaining:effect.duration, unique:false});
				break;
				case EFFECT_STRENGTH_II_N:
					character.strength -= 2;
					if (!effect.permanent)
						character.addStatus({type:effect.type, ticksRemaining:effect.duration, unique:false});
				break;
				case EFFECT_WILLPOWER_I_N:
					character.willpower -= 1;
					if (!effect.permanent)
						character.addStatus({type:effect.type, ticksRemaining:effect.duration, unique:false});
				break;
				case EFFECT_WILLPOWER_II_N:
					character.willpower -= 2;
					if (!effect.permanent)
						character.addStatus({type:effect.type, ticksRemaining:effect.duration, unique:false});
				break;
				case EFFECT_PERCEPTION_I_N:
					character.perception -= 1;
					if (!effect.permanent)
						character.addStatus({type:effect.type, ticksRemaining:effect.duration, unique:false});
				break;
				case EFFECT_PERCEPTION_II_N:
					character.perception -= 2;
					if (!effect.permanent)
						character.addStatus({type:effect.type, ticksRemaining:effect.duration, unique:false});
				break;
				case EFFECT_LEADERSHIP_I_N:
					character.leadership -= 1;
					if (!effect.permanent)
						character.addStatus({type:effect.type, ticksRemaining:effect.duration, unique:false});
				break;
				case EFFECT_LEADERSHIP_II_N:
					character.leadership -= 2;
					if (!effect.permanent)
						character.addStatus({type:effect.type, ticksRemaining:effect.duration, unique:false});
				break;
				case EFFECT_CLOSE_I:
					character.attackStyles[ATTACK_STYLE_CLOSE].lvl += 1;
					if (!effect.permanent)
						character.addStatus({type:effect.type, ticksRemaining:effect.duration, unique:false});
				break;
				case EFFECT_CLOSE_II:
					character.attackStyles[ATTACK_STYLE_CLOSE].lvl += 2;
					if (!effect.permanent)
						character.addStatus({type:effect.type, ticksRemaining:effect.duration, unique:false});
				break;
				case EFFECT_CLOSE_III:
					character.attackStyles[ATTACK_STYLE_CLOSE].lvl += 3;
					if (!effect.permanent)
						character.addStatus({type:effect.type, ticksRemaining:effect.duration, unique:false});
				break;
				case EFFECT_SWING_I:
					character.attackStyles[ATTACK_STYLE_SWING].lvl += 1;
					if (!effect.permanent)
						character.addStatus({type:effect.type, ticksRemaining:effect.duration, unique:false});
				break;
				case EFFECT_SWING_II:
					character.attackStyles[ATTACK_STYLE_SWING].lvl += 2;
					if (!effect.permanent)
						character.addStatus({type:effect.type, ticksRemaining:effect.duration, unique:false});
				break;
				case EFFECT_SWING_III:
					character.attackStyles[ATTACK_STYLE_SWING].lvl += 3;
					if (!effect.permanent)
						character.addStatus({type:effect.type, ticksRemaining:effect.duration, unique:false});
				break;
				case EFFECT_POKE_I:
					character.attackStyles[ATTACK_STYLE_POKE].lvl += 1;
					if (!effect.permanent)
						character.addStatus({type:effect.type, ticksRemaining:effect.duration, unique:false});
				break;
				case EFFECT_POKE_II:
					character.attackStyles[ATTACK_STYLE_POKE].lvl += 2;
					if (!effect.permanent)
						character.addStatus({type:effect.type, ticksRemaining:effect.duration, unique:false});
				break;
				case EFFECT_POKE_III:
					character.attackStyles[ATTACK_STYLE_POKE].lvl += 3;
					if (!effect.permanent)
						character.addStatus({type:effect.type, ticksRemaining:effect.duration, unique:false});
				break;
				case EFFECT_DEFENSIVE_I:
					character.attackStyles[ATTACK_STYLE_DEFENSIVE].lvl += 1;
					if (!effect.permanent)
						character.addStatus({type:effect.type, ticksRemaining:effect.duration, unique:false});
				break;
				case EFFECT_DEFENSIVE_II:
					character.attackStyles[ATTACK_STYLE_DEFENSIVE].lvl += 2;
					if (!effect.permanent)
						character.addStatus({type:effect.type, ticksRemaining:effect.duration, unique:false});
				break;
				case EFFECT_DEFENSIVE_III:
					character.attackStyles[ATTACK_STYLE_DEFENSIVE].lvl += 3;
					if (!effect.permanent)
						character.addStatus({type:effect.type, ticksRemaining:effect.duration, unique:false});
				break;
				case EFFECT_REGEN_I:
					var duration = effect.permanent ? -1 : effect.duration;
					character.addStatus({type:effect.type, ticksRemaining:duration, unique:false});
				break;
				case EFFECT_REGEN_II:
					var duration = effect.permanent ? -1 : effect.duration;
					character.addStatus({type:effect.type, ticksRemaining:duration, unique:false});
				break;
				case EFFECT_DEGEN_I:
					var duration = effect.permanent ? -1 : effect.duration;
					character.addStatus({type:effect.type, ticksRemaining:duration, unique:false});
				break;
				case EFFECT_DEGEN_II:
					var duration = effect.permanent ? -1 : effect.duration;
					character.addStatus({type:effect.type, ticksRemaining:duration, unique:false});
				break;
			}
		}
	}

	this.getDescription = function() {
		var result = "";
		result += this.name;
		switch (this.slot) {
			case SLOT_WIELDABLE: 
			result += "(" + this.handCount + "H)| ";
			result += "Acc:" + this.accuracy + " ";
			result += "Dmg:" + this.damage + "";
			if (this.effects.length > 0)
				result += ", "
			break;
			case SLOT_MODULE: result += "(Mod)| "; break;
			case SLOT_CONSUMABLE: result += "(Consumable)| "; break;
			case SLOT_HEAD: result += "(Head)| "; break;
			case SLOT_ACCESSORY: result += "(Acc)| ";
		}
		for (var i = this.effects.length - 1; i >= 0; i--) {
			result += this.effects[i];
			if (i != 0)
				result += ", ";
		}
		return result;
	}
}