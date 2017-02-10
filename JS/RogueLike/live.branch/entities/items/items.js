
// for effects and skills
var DESCRIPTIONS = {
	'stunned' : {description:"Unable to move or attack."},
	'bleeding' : {description:"Take 10% of total hp damage per turn."},
	'shielded' : {description:"Absorbs damage."},
	'disarmed' : {description:"Deals half damage."},
	'Sharp I' : {description:"+10% to bleed on hit."},
	'Splinter' : {description:"40% chance to deal damage taken to adjacent enemies when hit.", strength:"10% of damage taken"},
	'Discharge' : {description:"70% change to spawn a spark projectile when hit.", strength:"Willpower"},
	'Static Field' : {description:"Shock a nearby enemy.", strength:"Willpower / 2", cooldown:"5"},
	'Smolder' : {description:"Passively deals damage to units.", strength:"Constitution / 5"},
	'Slowed' : {description:"Moves every 4th turn."},
	'Hands I' : {description:"Adds the ability to wield 1 more hand worth of items."},
	'Fashionable' : {description:"Add the ability to wear 2 more accessories."},
	'Stun I' : {description:"+10% chance to stun on hit."},
	'Stun II' : {description:"+20% chance to stun on hit."},
	'Knockback I' : {description:"+10% chance to knockback on hit.", strength:"2 Tiles"},
	'Knockback II' : {description:"+20% chance to knockback on hit.", strength:"2 Tiles"},
	'Knockback III' : {description:"+30% chance to knockback on hit.", strength:"2 Tiles"},
	'Def+' : {description:""},
	'Def++' : {description:""},
	'Def+++' : {description:""},
	'Def-' : {description:""},
	'Def--' : {description:""},
	'Def---' : {description:""},
	'Con+' : {description:""},
	'Con++' : {description:""},
	'Str+' : {description:""},
	'Str++' : {description:""},
	'Str+4' : {description:""},
	'Will+' : {description:""},
	'Wil++' : {description:""},
	'Per+' : {description:""},
	'Per++' : {description:""},
	'Per+++' : {description:""},
	'Per+4' : {description:""},
	'Lead+' : {description:""},
	'Lead++' : {description:""},
	'Con-' : {description:""},
	'Con--' : {description:""},
	'Str-' : {description:""},
	'Str--' : {description:""},
	'Will-' : {description:""},
	'Wil--' : {description:""},
	'Per-' : {description:""},
	'Per--' : {description:""},
	'Lead-' : {description:""},
	'Lead--' : {description:""},
	'Close+' : {description:""},
	'Close++' : {description:""},
	'Close+++' : {description:""},
	'Swing+' : {description:""},
	'Swing++' : {description:""},
	'Swing+++' : {description:""},
	'Poke+' : {description:""},
	'Poke++' : {description:""},
	'Poke+++' : {description:""},
	'Defensive+' : {description:""},
	'Defensive++' : {description:""},
	'Defensive+++' : {description:""},
	'Terraform I' : {description:"The ability to place 3 walls for free.", cooldown:"10"},
	'Greed I' : {description:"Rewards money on hit.", strength:"30% of damage dealt"},
	'Slimer I' : {description:"Provides a slime companion", strength:"Leadership", cooldown:"20"},
	'Insight' : {description:"Damage is calculated from your highest stat instead of strength."},
	'Mending I' : {description:"Restores HP per turn.", strength:"1"},
	'Mending II' : {description:"Restores HP per turn.", strength:"2"},
	'Degen I' : {description:"Depletes HP per turn.", strength:"1"},
	'Degen II' : {description:"Depletes HP per turn.", strength:"2"},
	"Regen I" : {description:"Restores HP after a delay.", strength:"1", cooldown:"15"},
	"Regen II" : {description:"Restores HP per turn.", strength:"2"},
	"Regen III" : {description:"Restores HP per turn.", strength:"4"},
	"Regen IV" : {description:"Restores HP per turn.", strength:"8"},
	"Bubble I" : {description:"Knocks back nearby enemies. Shields yourself.", strength:"Willpower * 2", cooldown:"20"},
	"Bubble II" : {description:"Knocks back nearby enemies. Shields yourself.", strength:"Willpower * 3", cooldown:"20"},
	"Thorns I" : {description:"Deals damage back to the attacker.", strength:"10% of damage"},
	"Thorns II" : {description:"Deals damage to adjacent enemies.", strength:"10% of damage"},
	"Spark I" : {description:"Spawns a storm of sparks at your location.", strength:"Willpower", duration:"10"},
	"Spark II" : {description:"Spawns a storm of sparks at your location.", strength:"Willpower * 1.5", duration:"15", cooldown:"15"},
	"Seeking Sparks" : {description:"Causes your sparks to seek out enemies.", cooldown:"15"},
	"Spark Armor" : {description:"Provides a regenerative shield.", strength:"Willpower"},
	"Leap" : {description:"You jump and land at the target location, dealing damage to adjacent enemies on land.", strength:"Strength", cooldown:"30"},
	"Slam" : {description:"Your leap now knocks back enemies on landing", strength:"Strength", cooldown:"15"},
	"Microwave I" : {description:"Fire a beam of energy at the target. Stopping at the first solid it hits.", strength:"Willpower / 2", cooldown:"30"},
	"Microwave II" : {description:"Beam can now hit multiple enemies.", strength:"Willpower / 2", cooldown:"30"},
	"Microwave III" : {description:"Beam is now wider, now stopping only at walls.", strength:"Willpower / 2", cooldown:"30"},
	"Iron Skin I" : {description:"Def+"},
	"Iron Skin II" : {description:"Def++"},
	"Rage I" : {description:"Str++, Per++", duration:"10", cooldown:"30"},
	"Rage II" : {description:"Str+4, Def+4. Causes temporary madness.", duration:"15", cooldown:"30"},
	"Man of Arms I" : {description:"Allows you to wield an additional hand's worth of items."},
	"Man of Arms II" : {description:"Allows you to wield an additional hand's worth of items."},
	"Man of Arms III" : {description:"Allows you to wield an additional hand's worth of items."},
	"Summon Familiar" : {description:"Summons a spectral companion with health and damage based on Willpower."},
	"All for One" : {description:"Gain damage for each follower."},
	"One for All" : {description:"Split damage taken amoung your allies."},
	"Blink I" : {description:"Causes you to blink forward on your next movement.", cooldown:"15"},
	"Blink II" : {description:"Causes you to blink further on your next movement.", cooldown:"15"},
	"Blink Exit Damage" : {description:"Deals damage to adjacent enemies on exit.", strength:"Constitution / 2"},
	"Blink Heal" : {description:"Heal yourself after blinking.", strength:"Willpower / 20 %"},
	"Blink Frequency" : {description:"Reduce the cooldown of blink."},
	"Blink Stun on Land" : {description:"Blink stuns adjacent enemies on exit."},
	"Pill Seeker" : {description:"You can scavange drugs from the deceased."},
	"Off the Grid" : {description:"Lose the ability to power rooms. Gain 1.5x damage."},
	"Soldier of Fortune" : {description:"Get paid to hurt people.", strength:"1/2 of XP"},
	"Body Conditioning" : {description:"Def+"},
	"Weapons Training" : {description:"Master attack styles faster.", strength:"2x"},
	"Disarm" : {description:"30% Chance to debuffs enemies on hit. Makes them deal less damage.", strength:"1/2 Damage"},
	"Field Dressing" : {description:"Heal self.", strength:"30% of Total HP.", cooldown:"15"},
	"People's Champion" : {description:"Gain HP and Damage per each ally.", strength:"3 HP, 30% of their damage"},
	"Electoral College" : {description:"Gain damage for each room captured.", strength:"Rooms captured / 2"},
	"Victory Speech" : {description:"Heal your allies for 10 turns.", strength:"Leadership / 3", duration:"10", cooldown:"45"},
	"Cabinet I" : {description:"Summon volunteers for your cause.", cooldown:"30"},
	"Cabinet II" : {description:"Summon more powerful volunteers for your cause.", cooldown:"30"},
	"Cabinet III" : {description:"Summon even more powerful volunteers for your cause.", cooldown:"30"},
	"We the People" : {description:"Damage those within earshot.", strength:"Leadership / 3", duration:"10", cooldown:"45"},
	"Deregulation" : {description:"Access to stronger stuff."},
	"The Good Stuff" : {description:"Access to the best stuff."},
	"Street Pharmacist" : {description:"Turn drugs into money!"},
	"Quality Control" : {description:"Removes any undesired side-effects."},
	"Roth IRA" : {description:"Gain interest on your savings every 4x turn.", strength:"25%"},
	"Dividends" : {description:"Get returns on damage done.", strength:"33%"},
	"Health Insurance" : {description:"Get payouts for damage you take.", strength:"20%"},
	"Life Insurance" : {description:"Pay all your money to live again.", cooldown:"300"},
	"Money Shot" : {description:"Toggle. Buy damage on hit.", strength:"2%"},
	"Greasing the Wheels" : {description:"Become able to purchase skills with money."},
	"Student Discount" : {description:"Better prices at shops.", strength:"40% off"},
	"All Nighter" : {description:"Gain hp for each skill on cooldown.", strength:"1 HP per skill"},
	"Cram" : {description:"Gain damage and accuracy temporarily. Train faster. Become exhausted afterwards.", strength:"Willpower, .1 accuracy, 2x experience", duration:"10", cooldown:""},
	"Exhausted" : {description:"Train slower. Lose a bit of accuracy", strength:"80% slower, -.1 accuracy", duration:"10"},
	"Change Major" : {description:"Change classes. Keep common skills and attack experience."},
	"Wall" : {description:"Build a temporary wall.", cost:"$1"},
	"Mech-Merc" : {description:"Commission a companion.", cost:"$25"},
	"Sentry I" : {description:"Construct a sentry. Works better in powered rooms.", cost:"$8"}
}

// attack styles
var ATTACK_STYLE_SWING = 1;
var ATTACK_STYLE_POKE = 0;
var ATTACK_STYLE_CLOSE = 2;
var ATTACK_STYLE_DEFENSIVE = 3;
var ATTACK_STYLE_DEXTERITY = 4;
var ATTACK_STYLES = [
{name:"poke", selected:true, lvl:0, description:"Attack Style: Chance to stun enemy on hit based on level."},
{name:"swing", selected:false, lvl:0, description:"Attack Style: Hit adjacent enemies. Ranged based on level."},
{name:"close", selected:false, lvl:0, description:"Attack Style: Chance to strike twice based on level."},
{name:"defensive", selected:false, lvl:0, description:"Attack Style: Percent damage reduction based on level."},
{name:"dexterity", selected:false, lvl:0, description:"Attack Style: Crit chance/ranged accuracy."}];
// slots
var SLOT_WIELDABLE = 'wieldable';
var SLOT_HEAD = 'Head';
var SLOT_BODY = 'Body';
var SLOT_MODULE = 'Module';
var SLOT_NONE = 'objective';
var SLOT_ACCESSORY = 'accessory';
var SLOT_CONSUMABLE = 'Consumable';
// wieldables
var NAME_UTILITY_KNIFE = 'Utility Knife';
var NAME_WRENCH = 'Monkey Wrench';
var NAME_FIRE_AXE = 'Fire Axe';
var NAME_LUMBER_AXE = 'Lumber Axe';
var NAME_TERRAFORMER = 'Terraformer';
var NAME_GREED_DAGGER = 'Greed Dagger';
var NAME_PLUS_4_SWORD = '+4 Sword of Slaying';
var NAME_SHEET_METAL_SHIELD = 'Sheet Metal Shield';
var NAME_WOODEN_SHIELD = 'Tabletop Shield';
var NAME_STAFF_OF_INSIGHT = 'Staff of Insight';
var NAME_SMOLDERING_SHIELD = 'Smoldering Shield';
var NAME_FIRE_POKER = 'Fire Poker';
var NAME_BASEBALL_BAT = 'Nailed Bat';
var NAME_NUNCHUKS = 'Nunchucks';
var NAME_GREAT_NUNCHUKS = 'Greatnunchucks';
var NAME_BRASS_KNUCKLES = 'Brass Knuckles';
var NAME_BALANCED_SWORD = 'Balanced Sword';
var NAME_WELL_BALANCED_SWORD = 'Well-Balanced Sword';
var NAME_THE_LEVEL = 'The Level';
var NAME_HUNGRY_BLADE = 'Hungering Blade';
var NAME_STARTER_PISTOL = 'Starter Pistol';
var NAME_SHOTGUN = 'Shotgun';
var NAME_SNIPER_RIFLE = 'Sniper Rifle';
var NAME_DUALIES = 'Dualies';
var NAME_OVERDUE_BOOK = 'Overdue Book';
var NAME_BABBLING_BOOK = 'Babbling Book';
var NAME_GRAPPLING_HOOK = 'Grappling Hook';
var NAME_KEY_BLADE = 'Keyblade'; // vault only
var NAME_CROWBAR = 'Crowbar';
// hats
var NAME_HARD_HAT = 'Hardhat';
var NAME_FOIL_HAT = 'Tinfoil Hat';
var NAME_WIG = 'Wig';
var NAME_HAIR_GEL = 'Hair Gel';
// chests
var NAME_HOCKEY_PADS = 'Hockey Pads';
var NAME_FRAYED_VEST = 'Frayed Vest';
var NAME_TESLA_JACKET = 'Tesla Jacket';
var NAME_CORSET = 'Corset';
var NAME_BATH_ROBE = 'Bath Robe';
// modules
var NAME_HP_MODULE_I = 'VitaChip v1';
var NAME_HP_MODULE_II = 'VitaChip v2';
var NAME_OFFENSE_MODULE_I = 'AdrenoCore v1';
var NAME_BRAIN_MODULE_I = 'Thinkcore v1';
var NAME_STORAGE_MODULE = 'The Appendor';
var NAME_WEAK_SEEKER = 'WeakSeeker';
// accessories
var NAME_SLIME_BELT = 'Slime Belt';
var NAME_LEATHER_BELT = 'Leather Belt';
var NAME_RING_OF_FASHION = 'Ring of Fashion';
var NAME_NECK_TIE = 'Power Tie';
var NAME_POWER_BALANCE_BRACLET = 'Power Balance Band';
var NAME_EYE_GLASSES = 'Eye Glasses';
// consumables
var NAME_HP_POTION_I = 'Diet Hp Soda';
var NAME_HP_POTION_II = 'Hp Soda';
var NAME_BRAIN_POTION = 'Brain-ade';
var NAME_MUSCLE_POTION = 'Beef Cola';
var NAME_RAGE_POTION = 'Loco Cola';
var NAME_DEFENSE_POTION = 'Numbing Spirits';
// vault key
var NAME_VAULT_KEY = 'Vault Key';
// effects
var EFFECT_SHARP_I = 'Sharp I'; // chance to bleed
var EFFECT_SPLINTER = 'Splinter'; // chance to thorn random enemy on hit
var EFFECT_DISCHARGE = 'Discharge'; // chance to spawn spark on being hit
var EFFECT_STATIC_FIELD = 'Static Field'; // zap people around you
var EFFECT_SMOLDER = 'Smolder'; // does little damage in aoe around you
var EFFECT_SLOWED = 'Slowed'; // kinda NPC only, cant move every turn
var EFFECT_ARMS_I = 'Hands I'; // more hands
var EFFECT_FASHIONABLE = 'Fashionable'; // more accessories
var EFFECT_EXPOSE_WEAKNESS = 'Expose Weakness'; // dmg bonus to cc'd enemies
var EFFECT_VAMPURIC = 'Vampiric'; // heal on hit
var EFFECT_BABBLING_BOOK = 'Babbeling Book'; // random spell
var EFFECT_ENERGY_SHIELD = 'Energy Shield';
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
var EFFECT_STRENGTH_IV = 'Str+4';
var EFFECT_WILLPOWER_I = 'Will+';
var EFFECT_WILLPOWER_II = 'Wil++';
var EFFECT_PERCEPTION_I = 'Per+';
var EFFECT_PERCEPTION_II = 'Per++';
var EFFECT_PERCEPTION_III = 'Per+++';
var EFFECT_PERCEPTION_IV = 'Per+4';
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
var EFFECT_INSIGHT = 'Insight'; // use your highest stat for damage
var EFFECT_GRAPPLING_HOOK = "Grappling Hook"; // its a grappling hook
// just regen
var EFFECT_REGEN_I = 'Mending I';
var EFFECT_REGEN_II = 'Mending II';
var EFFECT_DEGEN_I = 'Degen I';
var EFFECT_DEGEN_II = 'Degen II';
// modules
var CHAR_MODULE = '\u037D';
var CHAR_KEY = 'k';
var CHAR_GUN = '\uD83D\uDD2B';

// available starting items
var LOADOUT_OPTIONS = [{name:NAME_FIRE_AXE, selected:false},
 {name:NAME_UTILITY_KNIFE, selected:false},
 {name:NAME_WRENCH, selected:false},
 {name:NAME_HP_MODULE_I, selected:false},
 {name:NAME_BRAIN_MODULE_I, selected:false},
 {name:NAME_GREED_DAGGER, selected:false},
 {name:NAME_SLIME_BELT, selected:false},
 {name:NAME_STARTER_PISTOL, selected:false}];

// nothing
var ITEM_NONE = 'nothing';
var ITEM_BULLETS = 'bullets';

// commons
var COMMONS = [NAME_WIG, NAME_UTILITY_KNIFE, NAME_FIRE_AXE, NAME_WRENCH, NAME_HP_MODULE_I,
 NAME_WOODEN_SHIELD, NAME_FOIL_HAT, NAME_FIRE_POKER, NAME_BASEBALL_BAT, NAME_NUNCHUKS, 
 NAME_BRASS_KNUCKLES, NAME_NECK_TIE, NAME_HAIR_GEL, NAME_EYE_GLASSES, NAME_STARTER_PISTOL,
 NAME_CROWBAR];
// rares
var RARES = [NAME_HARD_HAT, NAME_HP_MODULE_II, NAME_LUMBER_AXE, NAME_CORSET,
 NAME_BRAIN_MODULE_I, NAME_GREED_DAGGER, NAME_SHEET_METAL_SHIELD, NAME_FRAYED_VEST,
 NAME_SLIME_BELT, NAME_BALANCED_SWORD, NAME_HUNGRY_BLADE, NAME_BATH_ROBE, NAME_SHOTGUN, 
 NAME_DUALIES];
// epics
var MYTHICS = [NAME_HOCKEY_PADS, NAME_OFFENSE_MODULE_I, NAME_PLUS_4_SWORD, NAME_GREAT_NUNCHUKS,
 NAME_STORAGE_MODULE, NAME_LEATHER_BELT, NAME_SMOLDERING_SHIELD, NAME_RING_OF_FASHION, 
 NAME_WELL_BALANCED_SWORD, NAME_WEAK_SEEKER];
// legendaries
var LEGENDARIES = [NAME_TERRAFORMER, NAME_STAFF_OF_INSIGHT, NAME_THE_LEVEL, NAME_POWER_BALANCE_BRACLET,
 NAME_SNIPER_RIFLE, NAME_BABBLING_BOOK, NAME_GRAPPLING_HOOK];

var NON_ITEMS = [
{name:NAME_HP_POTION_I, frequency: 4},
{name:NAME_HP_POTION_II, frequency: 4},
{name:NAME_BRAIN_POTION, frequency: 3},
{name:NAME_MUSCLE_POTION, frequency: 2},
{name:NAME_RAGE_POTION, frequency: 1},
{name:NAME_DEFENSE_POTION, frequency: 2},
];

// n = 6 gives a good enough approximation
// a normal distrbution from 0-6 that centered around 3
function gaussian() {
    return Math.abs(.5 - ((Math.random() + Math.random() + Math.random() + Math.random()) / 4));
}

// unitXp is a heuristic used to pick loot strength. Higher is better.
function generateLoot(unitXp) {

	var makePill = false;
	var makeBook = false;

	// check if we are a pharmacist, if so make some pills maybe
	if ((player.class == CLASS_PHARMACIST && Math.random() <= .3) || (player.class != CLASS_PHARMACIST && player.skills.skillObject[SKILL_PILL_SEEKER].purchased && Math.random() <= .1))
		makePill = true;

	if (switchboard.getSwitch(NAME_BOOK_WORM).on)
		makeBook = true;

	if (makeBook && makePill)
		return Math.random() > .5 ? MakePill(unitXp) : MakeBook(false);
	else if (makeBook)
		return MakeBook(false);
	else if (makePill)
		return MakePill(unitXp);

	// the loot we will be making
	var lootType = ITEM_NONE;

	var number = gaussian();
	// adjust the number based on the unit's xp
	if (hardMode)
		number += unitXp / 300;
	else		
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

	// after an item has been chosen
	if (lootType != ITEM_NONE) {
		// don't make an item
		if (Math.random() < .5) {
			var random = Math.random();
			// bullets
			if (random < .3)
				return {type:ITEM_BULLETS, amount:Math.round(unitXp/2)};
			// make a potion
			else if (random < .7)
				return MakeItem(NON_ITEMS.peekWeighted().name);
			// wealth
			else
				return {type:ITEM_MONEY, amount:Math.round(unitXp)};
		}
	} 
	
	return MakeItem(lootType);
}
var ITEM_MONEY = 'wealth';

function generateShopItem() {
	// the loot we will be making
	var lootType;

	var number = gaussian();
	if (hardMode)
		number -= .01;
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

	if (Math.random < .3)
		lootType = NON_ITEMS.peekWeighted().name;

	return MakeItem(lootType);
}

function generateVaultLoot() {
	// the loot we will be making
	var lootType;

	var number = gaussian() + .1;
	if (number < .14) {
		lootType = COMMONS.peekRandom();
	} else if (number < .22) {
		lootType = RARES.peekRandom();
	} else if (number < .3) {
		lootType = MYTHICS.peekRandom();
	} else if (number <= 1) {
		var legends = LEGENDARIES.slice(0);
		legends.remove(NAME_VAULT_KEY);
		legends.push(NAME_KEY_BLADE);
		lootType = legends.peekRandom();
	}
	return MakeItem(lootType);
}

var BOOK_CHARS = ['\uD83D\uDCD7', '\uD83D\uDCD8', '\uD83D\uDCD9'];
var NAME_XP_BOOK = 'Words of Wisdom';
var EFFECT_XP = 'Xp';
var NAME_COMBAT_XP_BOOK = 'Combat Manual';
var EFFECT_COMBAT_XP = 'Combat Xp';
var NAME_SKILL_POINT_BOOK = 'Used Textbook';
var EFFECT_SKILL_POINT = 'Skill Point';
var NAME_ATTRIBUTE_BOOK = 'New Textbook';
var EFFECT_ATTRIBUTE_POINT = 'attribute_point';
var EFFECT_SPELL_BOOK = 'Spell Book';
var ATTRIBUTE_BOOKS = [{name:"Pumping Iron", type:EFFECT_STRENGTH_I, duration:1, permanent:true},
 	{name:"How to be Perfect", type:EFFECT_WILLPOWER_I, duration:1, permanent:true}, 
 	{name:"P.I.W.L.T.B.", type:EFFECT_CONSTITUTION_I, duration:1, permanent:true}, 
 	{name:"A Beautiful Mind", type:EFFECT_PERCEPTION_I, duration:1, permanent:true}, 
 	{name:"The Art of War", type:EFFECT_LEADERSHIP_I, duration:1, permanent:true}];
var SPELL_BOOKS = [{name:"Sparkfall", type:SKILL_SPARKFALL, duration:10},
	{name:"Bubble II", type:SKILL_BUBBLE_II, duration:10}, 
	{name:"Micronado", type:SKILL_MICRONADO, duration:10}];
var BOOK_TYPES = [{frequency: 10, type:NAME_COMBAT_XP_BOOK}, {frequency: 8, type:NAME_XP_BOOK},
	{frequency: 3, type:NAME_SKILL_POINT_BOOK}, {frequency: 2, type:NAME_ATTRIBUTE_BOOK}, 
	{frequency: 3, type:EFFECT_SPELL_BOOK}];
var GOOD_BOOKS = [{frequency: 3, type:NAME_COMBAT_XP_BOOK}, {frequency: 4, type:NAME_XP_BOOK},
	{frequency: 8, type:NAME_SKILL_POINT_BOOK}, {frequency: 7, type:NAME_ATTRIBUTE_BOOK},
	{frequency: 8, type:EFFECT_SPELL_BOOK}];
var BOOK_NAMES = ["A Tale of Two Cities", "The Old Man and the Sea", "The Pearl", "The Hunchback of Notre Dame", "Romeo and Juliet",
"Sherlock Holmes", "The Catcher and the Rye", "City of Ember", "Harry Potter and the Sorcerers Stone", "Les Miserables",
"To Kill a Mocking Bird"];
function MakeBook(goodSpawn) {
	var profile = goodSpawn ? GOOD_BOOKS.peekWeighted() : BOOK_TYPES.peekWeighted();
	return MakeItem(profile.type);
}

function MakeItem(lootType) {
	var char = '?',
	color = COLOR_DEFAULT, 
	slot = SLOT_CONSUMABLE, 
	handCount = 1, 
	damage = 0, 
	accuracy = 0, 
	ranged = false,
	shield = false;
	effects = [], 
	value = 0, 
	cooldown = 0;
	description = "", 
	font = FONT_STYLE_DEFAULT;
	var random = Math.random();
	switch(lootType) {
		case NAME_BABBLING_BOOK:
			char = BOOK_CHARS.peekRandom();
			slot = SLOT_WIELDABLE;
			font = FONT_STYLE_POTION;
			shield = true;
			effects = [EFFECT_WILLPOWER_I, EFFECT_BABBLING_BOOK];
		break;
		case NAME_OVERDUE_BOOK:
			char = BOOK_CHARS.peekRandom();
			slot = SLOT_WIELDABLE;
			font = FONT_STYLE_POTION;
			shield = true;
			effects = [EFFECT_WILLPOWER_II, EFFECT_DEF_I];
		break;
		case NAME_XP_BOOK:
			char = BOOK_CHARS.peekRandom();
			slot = SLOT_CONSUMABLE;
			font = FONT_STYLE_POTION;
			effects = [EFFECT_XP];
		break;
		case NAME_COMBAT_XP_BOOK: 
			char = BOOK_CHARS.peekRandom();
			slot = SLOT_CONSUMABLE;
			font = FONT_STYLE_POTION;
			effects = [EFFECT_COMBAT_XP];
		break;
		case NAME_SKILL_POINT_BOOK: 
			char = BOOK_CHARS.peekRandom();
			slot = SLOT_CONSUMABLE;
			font = FONT_STYLE_POTION;
			effects = [EFFECT_SKILL_POINT];
		break;
		case NAME_ATTRIBUTE_BOOK: 
			char = BOOK_CHARS.peekRandom();
			slot = SLOT_CONSUMABLE;
			font = FONT_STYLE_POTION;
			var book = ATTRIBUTE_BOOKS.peekRandom();
			effects = [book];
			lootType = [book.name];
		break;
		case EFFECT_SPELL_BOOK:
			char = BOOK_CHARS.peekRandom();
			slot = SLOT_CONSUMABLE;
			font = FONT_STYLE_POTION;
			var book = SPELL_BOOKS.peekRandom();
			effects = [book];
			lootType = [book.name];
		break;
		case NAME_VAULT_KEY:
			slot = SLOT_NONE;
			char = CHAR_KEY;
			value = 300;
		break;
		case NAME_STARTER_PISTOL:
			char = CHAR_GUN;
			slot = SLOT_WIELDABLE;
			damage = 6;
			accuracy = .3;
			ranged = true;
			value = 30;
		break;
		case NAME_DUALIES:
			char = CHAR_GUN;
			slot = SLOT_WIELDABLE;
			damage = 5;
			accuracy = .3;
			ranged = true;
			value = 35;
		break;
		case NAME_SHOTGUN:
			char = CHAR_GUN;
			slot = SLOT_WIELDABLE;
			damage = 3;
			accuracy = .2;
			ranged = true;
			value = 40;
		break;
		case NAME_SNIPER_RIFLE:
			char = CHAR_GUN;
			slot = SLOT_WIELDABLE;
			damage = 12;
			accuracy = 1;
			ranged = true;
			value = 75;
		break;
		case NAME_FRAYED_VEST:
			char = CHAR_BODY;
			slot = SLOT_BODY;
			effects = [EFFECT_DISCHARGE];
			if (random < .33)
				effects.push(EFFECT_DEF_I);
			else if (random < .66)
				effects.push(EFFECT_DEF_II);
			description = "This ragged article is known to shock if not handled carefully.";
			value = 45;
		break;
		case NAME_TESLA_JACKET:
			char = CHAR_BODY;
			slot = SLOT_BODY;
			effects = [EFFECT_STATIC_FIELD];
			if (random < .33)
				effects.push(EFFECT_DEF_I);
			else if (random < .66)
				effects.push(EFFECT_DEF_II);
			else
				effects.push(EFFECT_DEF_III);
			description = "Current is known to arc from the wearer to nearby enemies.";
			value = 45;
		break;
		case NAME_CORSET:
			char = CHAR_BODY;
			slot = SLOT_BODY;
			effects = [EFFECT_STRENGTH_I_N, 
			EFFECT_WILLPOWER_II, 
			EFFECT_PERCEPTION_I];
			value = 45;
		break;
		case NAME_EYE_GLASSES:
			char = CHAR_ACCESSORY;
			font = FONT_STYLE_POTION;
			slot = SLOT_ACCESSORY;
			effects = [EFFECT_PERCEPTION_II];
			if (random < .33)
				effects = [EFFECT_PERCEPTION_I];
			value = 13;
		break;
		case NAME_SLIME_BELT:
			char = CHAR_ACCESSORY;
			font = FONT_STYLE_POTION;
			slot = SLOT_ACCESSORY;
			effects = [EFFECT_SLIME_COMPANION_I];
			if (random < .33)
				effects.push(EFFECT_DEF_I);
			cooldown = 20;
			value = 33;
		break;
		case NAME_NECK_TIE:
			char = CHAR_ACCESSORY;
			font = FONT_STYLE_POTION;
			slot = SLOT_ACCESSORY;
			effects = [EFFECT_LEADERSHIP_I];
			value = 20;
		break;
		case NAME_POWER_BALANCE_BRACLET:
			char = CHAR_ACCESSORY;
			font = FONT_STYLE_POTION;
			slot = SLOT_ACCESSORY;
			effects = [EFFECT_STRENGTH_I, EFFECT_WILLPOWER_I,
			EFFECT_CONSTITUTION_I, EFFECT_PERCEPTION_I,
			EFFECT_LEADERSHIP_I];
			value = 85;
		break;
		case NAME_LEATHER_BELT:
			char = CHAR_ACCESSORY;
			font = FONT_STYLE_POTION;
			slot = SLOT_ACCESSORY;
			effects = [EFFECT_STRENGTH_II, EFFECT_CONSTITUTION_II];
			value = 60;
		break;
		case NAME_RING_OF_FASHION:
			char = CHAR_ACCESSORY;
			font = FONT_STYLE_POTION;
			slot = SLOT_ACCESSORY;
			effects = [EFFECT_FASHIONABLE];
			value = 45;
		break;
		case NAME_HP_POTION_I:
			char = CHAR_POTION;
			font = FONT_STYLE_POTION;
			slot = SLOT_CONSUMABLE;
			effects = [NAME_HP_POTION_I];
			value = 15;
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
			value = 25;
		break;
		case NAME_MUSCLE_POTION:
			char = CHAR_POTION;
			font = FONT_STYLE_POTION;
			slot = SLOT_CONSUMABLE;
			effects = [{type:EFFECT_STRENGTH_II, ticksRemaining:20, unique:false}, {type:EFFECT_CONSTITUTION_II, ticksRemaining:20, unique:false}];
			value = 30;
		break;
		case NAME_RAGE_POTION:
			char = CHAR_POTION;
			font = FONT_STYLE_POTION;
			slot = SLOT_CONSUMABLE;
			effects = [{type:EFFECT_STRENGTH_II, ticksRemaining:20, unique:false}, {type:EFFECT_PERCEPTION_II, ticksRemaining:20, unique:false},
				 {type:EFFECT_TEAMLESS, ticksRemaining:20, unique:true},  {type:EFFECT_CLOSE_I, ticksRemaining:20, unique:false},
				 {type:EFFECT_SWING_I, ticksRemaining:20, unique:false}];
			value = 35;
		break;
		case NAME_DEFENSE_POTION:
			char = CHAR_POTION;
			font = FONT_STYLE_POTION;
			slot = SLOT_CONSUMABLE;
			effects = [{type:EFFECT_DEF_II, ticksRemaining:20, unique:false}];
			value = 25;
		break;
		case NAME_GREED_DAGGER:
			char = CHAR_WIELDABLE;
			slot = SLOT_WIELDABLE;
			damage = 1;
			effects = [EFFECT_GREED_I, EFFECT_STRENGTH_I_N, EFFECT_DEF_I_N];
			accuracy = .2;
			value = 20;
		break;
		case NAME_HUNGRY_BLADE:
			char = CHAR_WIELDABLE;
			slot = SLOT_WIELDABLE;
			damage = 5;
			effects = [EFFECT_VAMPURIC, EFFECT_DEGEN_I];
			accuracy = .3;
			value = 33;
		break;
		case NAME_CROWBAR:
			char = CHAR_WIELDABLE;
			slot = SLOT_WIELDABLE;
			damage = 2;
			effects = [EFFECT_DEFENSIVE_II];
			accuracy = 1;
			value = 15;
			description = "Ah, old reliable";
		break;
		case NAME_KEY_BLADE:
			char = CHAR_WIELDABLE;
			slot = SLOT_WIELDABLE;
			damage = 10;
			hands = 2;
			effects = [EFFECT_STRENGTH_II, EFFECT_WILLPOWER_II, EFFECT_LEADERSHIP_I, EFFECT_CLOSE_III, EFFECT_ENERGY_SHIELD]
			accuracy = .3;
			value = 35;
		break;
		case NAME_GRAPPLING_HOOK:
			char = CHAR_WIELDABLE;
			slot = SLOT_WIELDABLE;
			damage = 4;
			effects = [EFFECT_GRAPPLING_HOOK]
			accuracy = .3;
			value = 32;
		break;
		case NAME_BALANCED_SWORD:
			char = CHAR_WIELDABLE;
			slot = SLOT_WIELDABLE;
			damage = 4;
			effects = [EFFECT_POKE_I, EFFECT_CLOSE_I, EFFECT_SWING_I, EFFECT_DEFENSIVE_I]
			accuracy = .1;
			value = 35;
		break;
		case NAME_WELL_BALANCED_SWORD:
			char = CHAR_WIELDABLE;
			slot = SLOT_WIELDABLE;
			damage = 6;
			effects = [EFFECT_POKE_II, EFFECT_CLOSE_II, EFFECT_SWING_II, EFFECT_DEFENSIVE_II]
			accuracy = .1;
			value = 52;
		break;
		case NAME_THE_LEVEL:
			char = CHAR_WIELDABLE;
			slot = SLOT_WIELDABLE;
			damage = 10;
			effects = [EFFECT_POKE_III, EFFECT_CLOSE_III, EFFECT_SWING_III, EFFECT_DEFENSIVE_III]
			accuracy = .2;
			value = 90;
		break;
		case NAME_FIRE_POKER:
			char = CHAR_WIELDABLE;
			slot = SLOT_WIELDABLE;
			damage = 3;
			if (random < .33)
				effects.push(EFFECT_POKE_II);
			else
				effects.push(EFFECT_POKE_III);
			accuracy = .2;
			value = 22;
		break;
		case NAME_BRASS_KNUCKLES: 
			char = CHAR_WIELDABLE;
			slot = SLOT_WIELDABLE;
			damage = 3;
			effects.push(EFFECT_CLOSE_I);
			if (random < .5)
				effects.push(EFFECT_POKE_I);
			accuracy = .3;
			value = 22;
		break;
		case NAME_NUNCHUKS: 
			char = CHAR_WIELDABLE;
			slot = SLOT_WIELDABLE;
			damage = 3;
			if (random < .33)
				effects.push(EFFECT_CLOSE_II);
			else
				effects.push(EFFECT_CLOSE_I);
			accuracy = .3;
			value = 27;
		break;
		case NAME_GREAT_NUNCHUKS: 
			char = CHAR_WIELDABLE;
			slot = SLOT_WIELDABLE;
			handCount = 2;
			damage = 7;
			if (random < .33)
				effects.push(EFFECT_CLOSE_III);
			else
				effects.push(EFFECT_CLOSE_II);
			if (Math.random() < .5) 
				effects.push(EFFECT_POKE_II);
			else
				effects.push(EFFECT_POKE_I);				
			accuracy = .2;
			value = 27;
		break;
		case NAME_BASEBALL_BAT: 
			char = CHAR_WIELDABLE;
			slot = SLOT_WIELDABLE;
			damage = 5;
			effects = [EFFECT_SWING_II];
			if (random < .66)
				effects.push(EFFECT_SHARP_I);
			accuracy = .2;
			value = 30;
		break;
		case NAME_PLUS_4_SWORD: 
			char = CHAR_WIELDABLE;
			slot = SLOT_WIELDABLE;
			damage = 11;
			if (random < .33)
				effects.push(EFFECT_PERCEPTION_I);
			else if (random < .66)
				effects.push(EFFECT_STRENGTH_I);
			else {
				effects.push(EFFECT_PERCEPTION_I);
				effects.push(EFFECT_STRENGTH_I);
			}
			accuracy = .3;
			value = 78;
		break;
		case NAME_LUMBER_AXE: 
			char = CHAR_WIELDABLE;
			slot = SLOT_WIELDABLE;
			damage = 6;
			effects = [EFFECT_SWING_I];
			if (random < .6)
				effects.push(EFFECT_SHARP_I);
			accuracy = .2;
			value = 30;
		break;
		case NAME_STAFF_OF_INSIGHT: 
			char = CHAR_WIELDABLE;
			slot = SLOT_WIELDABLE;
			handCount = 2;
			damage = 3;
			effects = [EFFECT_INSIGHT];
			accuracy = .1;
			value = 80;
		break;
		case NAME_TERRAFORMER: 
			char = 'i';
			slot = SLOT_WIELDABLE;
			damage = 7;
			effects = [EFFECT_TERRAFORM_I];
			accuracy = .1;
			value = 60;
		break;
		case NAME_BATH_ROBE:
			char = CHAR_BODY;
			slot = SLOT_BODY;
			effects = [EFFECT_WILLPOWER_II];
			value = 32;
		break;
		case NAME_HOCKEY_PADS:
			char = CHAR_BODY;
			slot = SLOT_BODY;
			effects = [EFFECT_CONSTITUTION_II];
			if (random < .33)
				effects.push(EFFECT_DEF_I);
			else
				effects.push(EFFECT_DEF_II);
			value = 45;
		break;
		case NAME_WOODEN_SHIELD: 
			char = CHAR_WIELDABLE;
			slot = SLOT_WIELDABLE;
			shield = true;
			effects = [EFFECT_DEF_I, EFFECT_SPLINTER];
			value = 50;
		break;
		case NAME_SHEET_METAL_SHIELD: 
			char = CHAR_WIELDABLE;
			slot = SLOT_WIELDABLE;
			shield = true;
			effects = [EFFECT_STRENGTH_I_N];
			if (random < .33)
				effects.push(EFFECT_DEF_II);
			else
				effects.push(EFFECT_DEF_III);
			value = 50;
		break;
		case NAME_SMOLDERING_SHIELD: 
			char = CHAR_WIELDABLE;
			slot = SLOT_WIELDABLE;
			shield = true;
			effects = [EFFECT_SMOLDER];
			if (random < .33)
				effects.push(EFFECT_DEF_II);
			else
				effects.push(EFFECT_DEF_I);
			value = 50;
		break;
		case NAME_HARD_HAT: 
			char = CHAR_HAT;
			slot = SLOT_HEAD;
			if (random < .33)
				effects.push(EFFECT_DEF_I);
			else
				effects.push(EFFECT_DEF_II);
			value = 30;
		break;
		case NAME_FOIL_HAT: 
			char = CHAR_HAT;
			slot = SLOT_HEAD;
			effects = [EFFECT_DEF_I];
			value = 15;
		break;
		case NAME_WIG: 
			char = CHAR_HAT;
			slot = SLOT_HEAD;
			effects = [EFFECT_LEADERSHIP_I];
			value = 15;
		break;
		case NAME_HAIR_GEL: 
			char = CHAR_HAT;
			slot = SLOT_HEAD;
			effects = [EFFECT_LEADERSHIP_I_N, EFFECT_DEF_I];
			value = 18;
		break;
		case NAME_FIRE_AXE: 
			char = CHAR_WIELDABLE;
			slot = SLOT_WIELDABLE;
			damage = 3;
			effects = [EFFECT_SWING_I];
			accuracy = .2;
			value = 20;
		break;
		case NAME_UTILITY_KNIFE: 
			char = CHAR_WIELDABLE;
			slot = SLOT_WIELDABLE;
			damage = 2;
			effects = [EFFECT_SHARP_I];
			accuracy = .3;
			value = 16;
		break;
		case NAME_WRENCH: 
			char = CHAR_WIELDABLE;
			slot = SLOT_WIELDABLE;
			handCount = 2;
			damage = 5;
			effects = [];
			accuracy = 0;
			value = 28;
		break;
		case NAME_WEAK_SEEKER:
			char = CHAR_MODULE;
			slot = SLOT_MODULE;
			effects = [EFFECT_EXPOSE_WEAKNESS];
			value = 34;
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
		case NAME_STORAGE_MODULE:
			char = CHAR_MODULE;
			slot = SLOT_MODULE;
			effects = [EFFECT_ARMS_I];
			value = 48;
		break;
		case NAME_OS_DISK:
			char = CHAR_OS_DISK;
			font = FONT_STYLE_OS_DISK;
			slot = SLOT_NONE;
			description = "The code that runs this place.";
		break;
		// unit items, not for player consumption
		case NAME_TRASH_BOT:
			slot = SLOT_WIELDABLE;
			damage = 0;
			effects = [EFFECT_STUN_I];
			accuracy = 0;
		break;
		case NAME_BUTLER:
			slot = SLOT_WIELDABLE;
			damage = 0;
			effects = [EFFECT_STUN_II];
			accuracy = 0;
		break;
		case NAME_DOG:
			slot = SLOT_WIELDABLE;
			damage = 0;
			effects = [EFFECT_SHARP_I];
			accuracy = 0;
		break;
		case NAME_GORILLA:
			slot = SLOT_WIELDABLE;
			damage = 0;
			effects = [EFFECT_KNOCKBACK_III];
			accuracy = 0;
		break;	
		// ITEM_NONE/AttributePoints/SkillPoints
		default: return lootType;
	}
	return new item(lootType, char, font, color, slot, handCount, damage, accuracy, shield, ranged, effects, value, cooldown, description);
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

var PILL_STATS_UP = [EFFECT_STRENGTH_I, EFFECT_STRENGTH_II, EFFECT_WILLPOWER_I,
 EFFECT_WILLPOWER_II, EFFECT_CONSTITUTION_I, EFFECT_CONSTITUTION_II, EFFECT_PERCEPTION_I,
  EFFECT_PERCEPTION_II, EFFECT_LEADERSHIP_I, EFFECT_LEADERSHIP_II];

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

	// 1x good, 1x bad
	if (DrugType == PILL_NORMAL) {

		// pick the name
		DrugType = DRUG_PREFIXES.peekRandom() + DRUG_SUFFIXES.peekRandom();

		// set up our initial good and bad effects
		var GOODS = PILL_NORMAL_GOOD_EFFECTS.slice(0);
		var BADS = PILL_NORMAL_BAD_EFFECTS.slice(0);

		// pick our good, remove the duplicate effects
		var good = GOODS.popWeighted().name;
		removeSimilar(good, BADS);


		if (!player.skills.skillObject[SKILL_QUALITY_CONTROL].purchased) {			
			// pick our bads, remove the duplicate effects
			var bad = BADS.popWeighted().name;
			effects.push({type:bad, duration:15, permanent:permanent});
		}
		
		effects.push({type:good, duration:15, permanent:permanent});	
		// effects.push({type:bad, duration:15, permanent:permanent});

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
			effects.push({type:bad, duration:15, permanent:permanent});
		}

		// pick our goods, remove the duplicate effects
		var good = GOODS.popWeighted().name;
		removeSimilar(bad, GOODS);

		var good2 = GOODS.popWeighted().name;
		
		effects.push({type:good, duration:25, permanent:permanent});	
		effects.push({type:good, duration:25, permanent:permanent});

		value = permanent ? 35 : 20;
	// legendary
	} else {
		switch(DrugType) {
			// crit chance up, close++, regen for 20
			case NAME_PILL_STIMULANT:

				effects = [{type:EFFECT_PERCEPTION_III, duration:20, permanent:permanent},
						   {type:EFFECT_CLOSE_III, duration:20, permanent:permanent},
						   {type:EFFECT_REGEN_II, duration:20, permanent:permanent}];

				value = permanent ? 50 : 30;
			break;
			// per+, will++, for 30
			case NAME_PILL_AMPHETAMINE:

				effects = [{type:EFFECT_PERCEPTION_I, duration:30, permanent:permanent},
						   {type:EFFECT_WILLPOWER_II, duration:30, permanent:permanent}];

				value = permanent ? 50 : 30;
			break; 
			// lose faction, per++, str++ for 30
			case NAME_PILL_SALTS:

				effects = [{type:EFFECT_PERCEPTION_II, duration:30, permanent:permanent},
						   {type:EFFECT_STRENGTH_II, duration:30, permanent:permanent},
						   {type:EFFECT_TEAMLESS, duration:30, permanent:permanent}];

				value = permanent ? 50 : 30;
			break; 
			// def++, con++, for 30
			case NAME_PILL_OPIATE:

				effects = [{type:EFFECT_DEF_II, duration:30, permanent:permanent},
						   {type:EFFECT_CONSTITUTION_II, duration:30, permanent:permanent}];

				value = permanent ? 50 : 30;
			break; 
			// str++, crit damage+ for 30
			case NAME_PILL_STEROID:

				effects = [{type:EFFECT_STRENGTH_II, duration:30, permanent:permanent},
						   {type:EFFECT_PERCEPTION_II, duration:30, permanent:permanent}];

				value = permanent ? 50 : 30;
			break;
			// lead++, will+, for 30
			case NAME_PILL_ANTIPSYCHOTIC:
				
				effects = [{type:EFFECT_LEADERSHIP_II, duration:30, permanent:permanent},
						   {type:EFFECT_WILLPOWER_I, duration:30, permanent:permanent}];

				value = permanent ? 50 : 30;
			break; 
			case NAME_PILL_STAT_UP:

				var GOODS = PILL_STATS_UP.slice(0);
				var effect_1 = GOODS.popRandom();
				var effect_2 = GOODS.popRandom();

				effects = [{type:effect_1, duration:30, permanent:true},
						   {type:effect_2, duration:30, permanent:true}];

				value = 50;
			break;
		}
	}
	
	return new item(DrugType, char, font, color, slot, 0, 0, 0, false, false, effects, value, 0, description);
}

function MakeLegendaryPill() {

	var char = CHAR_PILL,
	color = COLOR_DEFAULT, 
	slot = SLOT_CONSUMABLE, 
	effects = [], 
	value, 
	description = "", 
	font = FONT_STYLE_PILL;

	var DrugType = LEGENDARY_PILLS.peekRandom();
	var permanent = true;

	switch(DrugType) {
		// crit chance up, close++, regen for 20
		case NAME_PILL_STIMULANT:

			effects = [{type:EFFECT_PERCEPTION_III, duration:20, permanent:permanent},
					   {type:EFFECT_CLOSE_III, duration:20, permanent:permanent},
					   {type:EFFECT_REGEN_II, duration:20, permanent:permanent}];

			value = permanent ? 50 : 30;
		break;
		// per+, will++, for 30
		case NAME_PILL_AMPHETAMINE:

			effects = [{type:EFFECT_PERCEPTION_I, duration:30, permanent:permanent},
					   {type:EFFECT_WILLPOWER_II, duration:30, permanent:permanent}];

			value = permanent ? 50 : 30;
		break; 
		// lose faction, per++, str++ for 30
		case NAME_PILL_SALTS:

			effects = [{type:EFFECT_PERCEPTION_II, duration:30, permanent:permanent},
					   {type:EFFECT_STRENGTH_II, duration:30, permanent:permanent},
					   {type:EFFECT_TEAMLESS, duration:30, permanent:permanent}];

			value = permanent ? 50 : 30;
		break; 
		// def++, con++, for 30
		case NAME_PILL_OPIATE:

			effects = [{type:EFFECT_DEF_II, duration:30, permanent:permanent},
					   {type:EFFECT_CONSTITUTION_II, duration:30, permanent:permanent}];

			value = permanent ? 50 : 30;
		break; 
		// str++, crit damage+ for 30
		case NAME_PILL_STEROID:

			effects = [{type:EFFECT_STRENGTH_II, duration:30, permanent:permanent},
					   {type:EFFECT_PERCEPTION_II, duration:30, permanent:permanent}];

			value = permanent ? 50 : 30;
		break;
		// lead++, will+, for 30
		case NAME_PILL_ANTIPSYCHOTIC:
			
			effects = [{type:EFFECT_LEADERSHIP_II, duration:30, permanent:permanent},
					   {type:EFFECT_WILLPOWER_I, duration:30, permanent:permanent}];

			value = permanent ? 50 : 30;
		break; 
		case NAME_PILL_STAT_UP:

			var GOODS = PILL_STATS_UP.slice(0);
			var effect_1 = GOODS.popRandom();
			var effect_2 = GOODS.popRandom();

			effects = [{type:effect_1, duration:30, permanent:true},
					   {type:effect_2, duration:30, permanent:true}];

			value = 50;
		break;
	}
	
	return new item(DrugType, char, font, color, slot, false, 0, 0, false, effects, value, 0, description);
}

/*   	 		Basic Items				*/

function item(name, char, font, color, slot, handCount, damage, accuracy, shield, ranged, effects, value, cooldown, description = "") {
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
	this.shield = shield;
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
			case SLOT_NONE: return false;
			case SLOT_MODULE: return character.modules.length < character.maxModules;
			case SLOT_ACCESSORY: return character.accessories.length < character.maxAccessories;
			case SLOT_WIELDABLE: return character.armsUsed + this.handCount <= character.armCount;
			default: return true;
		}
	}

	this.canBeUnequipped = function() {
		return true;
	}

	this.equip = function(character) {
		this.equipped = true;
		
		// do internal loadout stuff
		switch(this.slot) {
			case SLOT_WIELDABLE:
				var armsNeeded = this.handCount;
				if (character.armsUsed + armsNeeded <= character.armCount) {
					character.wielded.push(this);
					character.armsUsed += armsNeeded;
				}
			break;
			case SLOT_HEAD:
				if (character.head != ITEM_NONE)
					character.head.unequip(character);

				character.head = this;
			break;
			case SLOT_BODY:
				if (character.body != ITEM_NONE)
					character.body.unequip(character);
				
				character.body = this;
			break;				
			case SLOT_MODULE:
				if (character.modules.length < character.maxModules) {
					character.modules.push(this);
				}
			break;
			case SLOT_ACCESSORY:
				if (character.accessories.length < character.maxAccessories) {
					character.accessories.push(this);
				}
			break;
			default:break;
		}

		for (var i = this.effects.length - 1; i >= 0; i--) {
			var effect = this.effects[i];
			switch (effect) {
				case EFFECT_TERRAFORM_I: character.skills.skillObject[EFFECT_TERRAFORM_I].equipped = true; break;
				case EFFECT_STATIC_FIELD: character.skills.skillObject[EFFECT_STATIC_FIELD].equipped = true; break;
				case EFFECT_GRAPPLING_HOOK: character.skills.skillObject[EFFECT_GRAPPLING_HOOK].equipped = true; break;
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
				case EFFECT_DISCHARGE: character.addStatus({type:EFFECT_DISCHARGE, ticksRemaining:-1, unique:false}); break;
				case EFFECT_SPLINTER: character.addStatus({type:EFFECT_SPLINTER, ticksRemaining:-1, unique:false}); break;
				case EFFECT_INSIGHT: character.addStatus({type:EFFECT_INSIGHT, ticksRemaining:-1, unique:true}); break;
				case EFFECT_SMOLDER: character.addStatus({type:EFFECT_SMOLDER, ticksRemaining:-1, unique:true}); break;
				case EFFECT_VAMPURIC: character.addStatus({type:EFFECT_VAMPURIC, ticksRemaining:-1, unique:true}); break;
				case EFFECT_ARMS_I: character.armCount++; break;
				case EFFECT_FASHIONABLE: character.maxAccessories += 2; break;
				case EFFECT_ENERGY_SHIELD: player.shields[EFFECT_ENERGY_SHIELD] = {capacity:25, currentStrength:25, ticksRemaining: -1}; break;
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

		switch(this.slot) {
			case SLOT_WIELDABLE:
				var armsNeeded = this.handCount;
				character.wielded.remove(this);
				character.armsUsed -= armsNeeded;
			break;
			case SLOT_HEAD:
				character.head = ITEM_NONE;
			break;
			case SLOT_BODY:
				character.body = ITEM_NONE;
			break;				
			case SLOT_MODULE:
				character.modules.remove(this);
			break;
			case SLOT_ACCESSORY:
				character.accessories.remove(this);
			break;
			default:break;
		}

		for (var i = this.effects.length - 1; i >= 0; i--) {
			var effect = this.effects[i];
			switch (effect) {
				case EFFECT_TERRAFORM_I: character.skills.skillObject[EFFECT_TERRAFORM_I].equipped = false;	break;
				case EFFECT_STATIC_FIELD: character.skills.skillObject[EFFECT_STATIC_FIELD].equipped = false; break;
				case EFFECT_GRAPPLING_HOOK: character.skills.skillObject[EFFECT_GRAPPLING_HOOK].equipped = false; break;
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
				case EFFECT_SPLINTER: character.removeStatus(effect.type); break;
				case EFFECT_DISCHARGE: character.removeStatus(effect.type); break;
				case EFFECT_STATIC_FIELD: character.removeStatus(effect.type); break;
				case EFFECT_INSIGHT: character.removeStatus(effect.type); break;
				case EFFECT_SMOLDER: character.removeStatus(effect.type); break;
				case EFFECT_VAMPURIC: character.removeStatus(effect.type); break;
				case EFFECT_ENERGY_SHIELD: delete player.shields[EFFECT_ENERGY_SHIELD]; break;
				case EFFECT_ARMS_I: 
					character.armCount--;
					var count = 0;
					for (var i = character.wielded.length - 1; i >= 0; i--) {
						count += character.wielded[i].handCount;
						if (count > character.armCount) {
							character.wielded[i].unequip(character);
							character.wielded[i].splice(i,1);
						}
					}
				break;
				case EFFECT_FASHIONABLE: 
					character.maxAccessories -= 2;
					var count = 0;
					for (var i = character.accessories.length - 1; i >= 0; i--) {
						count++;
						if (count > character.maxAccessories) {
							character.accessories[i].unequip(character);
							character.accessories[i].splice(i,1);
						}
					}
				break;
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
				case EFFECT_XP:
					var xp = Math.round(Math.pow(player.level, 1.5));
					player.addKillXp(xp);
				break;
				case EFFECT_COMBAT_XP:
					var xp = player.level * 5 + 5;
					player.addCombatExperience(xp);
				break;
				case EFFECT_SKILL_POINT:
					player.skillPoints++;
				break;
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
				case EFFECT_STRENGTH_IV:
					character.strength += 4;
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
				case EFFECT_PERCEPTION_III:
					character.perception += 3;
					if (!effect.permanent)
						character.addStatus({type:effect.type, ticksRemaining:effect.duration, unique:false});
				break;
				case EFFECT_PERCEPTION_IV:
					character.perception += 4;
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
				case EFFECT_TEAMLESS:
					character.faction = FACTION_TEAMLESS;
					character.addStatus({type:effect.type, ticksRemaining:duration, unique:false});
				break;
			}
		}
	}

	this.getDescription = function() {
		var result = "";
		if (this.slot == SLOT_WIELDABLE) {
			result += "Dmg:";
			result += this.damage;
			result += ", Acc:";
			result += this.accuracy;
			if (this.effects.length > 0)
				result += ",";
			result += " ";
		}
		for (var i = this.effects.length - 1; i >= 0; i--) {
			var effect = this.effects[i];
			if (effect.type != null) {
				if (effect.permanent)
					result += '<b>' + effect.type + '</b>';
				else
					result += effect.type;
			}
			else
				result += effect;
			if (i != 0)
				result += ", ";
		}
		return result;
	}

	this.getPrefix = function() {
		var result = this.name;	
		switch (this.slot) {
			case SLOT_WIELDABLE: result += "(" + this.handCount + "H) "; break;
			case SLOT_MODULE: result += "(Mod) "; break;
			case SLOT_BODY: result += "(Body) "; break;
			case SLOT_CONSUMABLE: result += "(Consumable) "; break;
			case SLOT_HEAD: result += "(Head) "; break;
			case SLOT_ACCESSORY: result += "(Acc) ";
		}
		return result;
	}

	this.getHTMLDescription = function(length) {
		var element = document.createElement('p');
		element.style.color = COLOR_DEFAULT;		
		element.className = 'description';
		element.style.marginLeft = '5px';
		element.style.marginTop = '5px';
		element.style.marginBottom = '5px';

		element.style.cursor = 'pointer';
		$(element).click({item: this}, pickUp);

		// populate the entry
		if (this.char.length == 1)			
			element.innerHTML = "\u00A0" + this.char;
		else
			element.innerHTML = this.char;
		element.innerHTML += " - " + this.getPrefix();

		element.innerHTML += '|' + this.getDescription();
		return element;
	}
}

function pickUp(data) {
	var item = data.data.item;
	if (!dungeon.tiles[item.y][item.x].canBlink && dungeon.tiles[player.y][player.x].canBlink) {
		log.add("You must be inside the vault to pick this up.");
		return;
	}
	dungeon.tiles[item.y][item.x].entities.remove(item)
	player.inventory.pickUp(item);
	endTurn();
	windows[SCREEN_INVENTORY].redraw();
}

function consume(data) {
	var item = data.data.item;
	player.inventory.remove(item);
	item.consume(player);
	endTurn();
	windows[SCREEN_INVENTORY].redraw();
}

function togglePower(data) {
	var room = data.data.room;

	if (player.skills.skillObject[SKILL_OFF_THE_GRID].purchased || room.hash <= 0)
		return;

	if (!room.powered && factions[FACTION_CLONES].power > 0) {
		room.powered = true;
		factions[FACTION_CLONES].power--;
	} else {
		room.powered = false;
		factions[FACTION_CLONES].power++;
	}

	windows[SCREEN_CHARACTER].redraw();
	windows[SCREEN_MAP].redraw();
}

function clickItem(data) {
	var item = data.data.item;

	if (data.shiftKey) {
		// describe
		examinedEntity = item;

		if (!windows[SCREEN_EXAMINE].visible)
			windows[SCREEN_EXAMINE].show();
		else
			windows[SCREEN_EXAMINE].redraw();
	} else {		
		if (!item.equipped)
			item.equip(player);
		else {
			if (item.name == NAME_HUNGRY_BLADE) {
				// prompt
				var option1 = {
					text:"Destroy", 
					event:function() {
						this.item.unequip(player);
						player.inventory.remove(item);
						windows[SCREEN_INVENTORY].redraw();
						windows[SCREEN_PROMPT].hide();
					},
					item:item
				};
				var option2 = {
					text:"Nevermind", 
					event:function() {
						windows[SCREEN_PROMPT].hide();
					}
				};
				prompt("Purchase with skill points or wealth?", option1, option2);
			} else
				item.unequip(player);
		}
	}

	endTurn();

	windows[SCREEN_INVENTORY].redraw();
}