// skills
var SKILL_REGEN_I = "Regen I";
var SKILL_REGEN_II = "Regen II";
var SKILL_REGEN_III = "Regen III";
var SKILL_REGEN_IV = "Regen IV";
var SKILL_BUBBLE_I = "Bubble I";
var SKILL_BUBBLE_II = "Bubble II";
var SKILL_THORNS_I = "Thorns I";
var SKILL_THORNS_II = "Thorns II";
var SKILL_SPARK_I = "Spark I";
var SKILL_SPARK_II = "Spark II";
var SKILL_SPARKFALL = "Sparkfall";
var SKILL_SEEKING_SPARKS = "Seeking Sparks";
var SKILL_SPARK_ARMOR = "Spark Armor";
var SKILL_LEAP = "Leap";
var SKILL_SLAM = "Slam";
var SKILL_MICROWAVE_I = "Microwave I";
var SKILL_MICROWAVE_II = "Microwave II";
var SKILL_MICROWAVE_III = "Microwave III";
var SKILL_MICRONADO = "Micro-nado";
var SKILL_IRON_SKIN_I = "Iron Skin I";
var SKILL_IRON_SKIN_II = "Iron Skin II";
var SKILL_RAGE_I = "Rage I";
var SKILL_RAGE_II = "Rage II";
var SKILL_MAN_OF_ARMS_I = "Man of Arms I";
var SKILL_MAN_OF_ARMS_II = "Man of Arms II";
var SKILL_MAN_OF_ARMS_III = "Man of Arms III";
var SKILL_SUMMON_FAMILIAR = "Summon Familiar";
var SKILL_ALL_FOR_ONE = "All for One";
var SKILL_ONE_FOR_ALL = "One for All";
var SKILL_BLINK_I = "Blink I";
var SKILL_BLINK_II = "Blink II";
var SKILL_BLINK_EXIT = "Blink Exit Damage";
var SKILL_BLINK_HEAL = "Blink Heal";
var SKILL_BLINK_FREQUENCY = "Blink Frequency";
var SKILL_BLINK_STUN = "Blink Stun on Land";
var SKILL_PILL_SEEKER = "Pill Seeker";
// soldier skills
var SKILL_OFF_THE_GRID = "Off the Grid";
var SKILL_SOLDIER_OF_FORTUNE = "Soldier of Fortune";
var SKILL_BODY_CONDITIONING = "Body Conditioning";
var SKILL_WEAPONS_TRAINING = "Weapons Training";
var SKILL_DISARM = "Disarm";
var SKILL_FIELD_DRESSING = "Field Dressing";
// mayor skills
var SKILL_PEOPLES_CHAMPION = "People's Champion";
var SKILL_ELECTORAL_COLLEGE = "Electoral College";
var SKILL_VICTORY_SPEECH = "Victory Speech";
var SKILL_CABINET_I = "Cabinet I";
var SKILL_CABINET_II = "Cabinet II";
var SKILL_CABINET_III = "Cabinet III";
var SKILL_WE_THE_PEOPLE = "We the People";
// pharmacist
var SKILL_DEREGULATION = "Deregulation";
var SKILL_THE_GOOD_STUFF = "The Good Stuff";
var SKILL_STREET_PHARMACIST = "Street Pharmacist";
var SKILL_QUALITY_CONTROL = "Quality Control";
// investor skills
var SKILL_ROTH_IRA = "Roth IRA";
var SKILL_DIVIDENDS = "Dividends";
var SKILL_HEALTH_INSURANCE = "Health Insurance";
var SKILL_LIFE_INSURANCE = "Life Insurance";
var SKILL_MONEY_SHOT = "Money Shot";
var SKILL_GREASING_THE_WHEELS = "Greasing the Wheels";
// student skills
var SKILL_STUDENT_DISCOUNT = "Student Discount";
var SKILL_ALL_NIGHTER = "All Nighter";
var SKILL_CRAM = "Cram";
var EFFECT_EXHAUSTED = "Exhausted";
var SKILL_CHANGE_MAJOR = "Change Major";
// defensive constructs
var CONSTRUCT_WALL = "Wall";
var CONSTRUCT_MERCENARY = "Mech-Merc";
var CONSTRUCT_SENTRY_I = "Sentry I";
var CONSTRUCT_SENTRY_II = "Sentry II";
var CONSTRUCT_HEALING_WELL = "Healing Well";
var CONSTRUCT_RAGE_SHRINE = "Rage Shrine";

function Skills (occupation) {
	// default skills
	this.defaultSkills = [
	// (name, cost, cooldown, equipable, active, requirement) 
	new Skill(SKILL_REGEN_I, 2, 15, false, false),
	new Skill(SKILL_REGEN_II, 2, 0, false, false, new Requirement(SKILL_REGEN_I)),
	new Skill(SKILL_REGEN_III, 3, 0, false, false, new Requirement(SKILL_REGEN_II)),
	new Skill(SKILL_REGEN_IV, 5, 0, false, false, new Requirement(SKILL_REGEN_III)),
	new Skill(SKILL_BUBBLE_I, 2, 20, false, true),
	new Skill(SKILL_BUBBLE_II, 3, 20, false, true, new Requirement(SKILL_BUBBLE_I)),
	new Skill(SKILL_LEAP, 2, 30, false, true),
	new Skill(SKILL_SLAM, 2, 15, false, true, new Requirement(SKILL_LEAP)),
	new Skill(SKILL_MICROWAVE_I, 2, 30, false, true),
	new Skill(SKILL_MICROWAVE_II, 2, 30, false, true, new Requirement(SKILL_MICROWAVE_I)),
	new Skill(SKILL_MICROWAVE_III, 2, 30, false, true, new Requirement(SKILL_MICROWAVE_II)),
	new Skill(SKILL_MICRONADO, 3, 45, false, true, new Requirement(SKILL_MICROWAVE_III)),
	new Skill(SKILL_THORNS_I, 3, 0, false, false),
	new Skill(SKILL_THORNS_II, 4, 0, false, false, new Requirement(SKILL_THORNS_I)),
	new Skill(SKILL_SPARK_I, 1, 15, false, true),
	new Skill(SKILL_SPARK_II, 2, 15, false, true, new Requirement(SKILL_SPARK_I)),
	new Skill(SKILL_SPARKFALL, 4, 45, false, true, new Requirement(SKILL_SPARK_II)),
	new Skill(SKILL_SEEKING_SPARKS, 2, 0, false, false, new Requirement(SKILL_SPARK_I)),
	new Skill(SKILL_SPARK_ARMOR, 3, 10, false, false, new Requirement(SKILL_SPARK_II)),
	new Skill(SKILL_SUMMON_FAMILIAR, 2, 60, false, true),
	new Skill(SKILL_PILL_SEEKER, 1, 0, false, false),
	new Skill(SKILL_MAN_OF_ARMS_I, 2, 0, false, false),
	new Skill(SKILL_MAN_OF_ARMS_II, 2, 0, false, false, new Requirement(SKILL_MAN_OF_ARMS_I)),
	new Skill(SKILL_MAN_OF_ARMS_III, 2, 0, false, false, new Requirement(SKILL_MAN_OF_ARMS_II)),
	new Skill(SKILL_BLINK_I, 2, 15, false, true),
	new Skill(SKILL_BLINK_II, 1, 15, false, true, new Requirement(SKILL_BLINK_I)),
	new Skill(SKILL_BLINK_EXIT, 2, 0, false, false, new Requirement(SKILL_BLINK_I)),
	new Skill(SKILL_BLINK_HEAL, 2, 0, false, false, new Requirement(SKILL_BLINK_I)),
	new Skill(SKILL_BLINK_FREQUENCY, 2, 0, false, false, new Requirement(SKILL_BLINK_I)),
	new Skill(SKILL_BLINK_STUN, 2, 0, false, false, new Requirement(SKILL_BLINK_I)),
	new Skill(SKILL_IRON_SKIN_I, 1, 0, false, false),
	new Skill(SKILL_IRON_SKIN_II, 2, 0, false, false, new Requirement(SKILL_IRON_SKIN_I)),
	new Skill(SKILL_RAGE_I, 2, 30, false, true),
	new Skill(SKILL_RAGE_II, 1, 30, false, true, new Requirement(SKILL_RAGE_I)),
	new Skill(SKILL_ALL_FOR_ONE, 2, 0, false, false),
	new Skill(SKILL_ONE_FOR_ALL, 2, 0, false, false)
	];

	// defensive constructs
	// (name, cost, price, activatable, requirement)
	this.constructs = [
		new Construct(CONSTRUCT_WALL, 1, 1, true),
		new Construct(CONSTRUCT_SENTRY_I, 2, 8, true),
		new Construct(CONSTRUCT_SENTRY_II, 2, 16, true),
		new Construct(CONSTRUCT_MERCENARY, 2, 25, true),
		new Construct(CONSTRUCT_HEALING_WELL, 3, 25, true)
	];

	// item skills
	this.hiddenSkills = [
		new Skill(EFFECT_TERRAFORM_I, 0, 10, true, true),
		new Skill(EFFECT_STATIC_FIELD, 0, 5, true, false),
		new Skill(EFFECT_BABBLING_BOOK, 0, 15, true, true),
		new Skill(EFFECT_GRAPPLING_HOOK, 0, 5, true, true)
	];

	var allClassSkills = [
	// soldier skills
	// Off the Grid - Passive power bonus all the time, can't spend power
	new Skill(SKILL_OFF_THE_GRID, 1, 0, false, false),
	// Soldier of Fortune - Passive money per kill
	new Skill(SKILL_SOLDIER_OF_FORTUNE, 2, 0, false, false),
	// Body Conditioning - Passive magic and physical defense
	new Skill(SKILL_BODY_CONDITIONING, 2, 0, false, false),
	// Weapon Training - Passive Attack Style mastery
	new Skill(SKILL_WEAPONS_TRAINING, 3, 0, false, false),
	// Disarm - Passive debuffs enemies you attack
	new Skill(SKILL_DISARM, 2, 0, false, false),
	// Field Dressing - Active, heal w/ cooldown
	new Skill(SKILL_FIELD_DRESSING, 3, 15, false, true),
	// mayor skills
	// Peoples Champion	Mayor - Bonuses for each follower
	new Skill(SKILL_PEOPLES_CHAMPION, 2, 0, false, false),
	// Electoral Collage - Bonuses for each captured room
	new Skill(SKILL_ELECTORAL_COLLEGE, 2, 0, false, false),
	// Victory Speech - Active that boosts you and minions
	new Skill(SKILL_VICTORY_SPEECH, 2, 30, false, true),
	// CabinetI	- Powerful summons
	new Skill(SKILL_CABINET_I, 2, 30, false, true),
	// CabinetII - Powerful summons
	new Skill(SKILL_CABINET_II, 2, 30, false, true, new Requirement(SKILL_CABINET_I)),
	// CabinetIII - Powerful summons
	new Skill(SKILL_CABINET_III, 2, 30, false, true, new Requirement(SKILL_CABINET_II)),
	// We the People - Does huge aoe (non-line of sight) damage over time
	new Skill(SKILL_WE_THE_PEOPLE, 2, 45, false, true),	
	// pharmacist skills
	// Deregulation	- Advanced pills only
	new Skill(SKILL_DEREGULATION, 2, 0, false, false),	
	// The Good Stuff - legendary pills + advanced pills
	new Skill(SKILL_THE_GOOD_STUFF, 3, 0, false, false),	
	// Street Pharmacist - turn pills into $$$
	new Skill(SKILL_STREET_PHARMACIST, 2, 0, false, false),
	// Quality Control - No bad side affects
	new Skill(SKILL_QUALITY_CONTROL, 2, 0, false, false),	
	// investor skills
	// Roth IRA	Investor - 4x Turn gives yields
	new Skill(SKILL_ROTH_IRA, 3, 0, false, false),
	// Dividends - passive, bonus money onhit
	new Skill(SKILL_DIVIDENDS, 2, 0, false, false),
	// Health Insurance - Money for taking damage
	new Skill(SKILL_HEALTH_INSURANCE, 3, 0, false, false),
	// Life Insurance - lose money, respawn
	new Skill(SKILL_LIFE_INSURANCE, 2, 300, false, false),
	// Money Shot - toggleable, %1 money on hit * 2 damage
	new Skill(SKILL_MONEY_SHOT, 2, 0, false, true),
	// Greasing the Wheels - Buy skills with money instead
	new Skill(SKILL_GREASING_THE_WHEELS, 1, 0, false, false),
	// student skills
	// Student Discount	- better prices in stores
	new Skill(SKILL_STUDENT_DISCOUNT, 1, 1, false, false),
	// All-Nighter - Bonus per skill on cooldown
	new Skill(SKILL_ALL_NIGHTER, 2, 1, false, false),
	// Cram - Active Buff, stat- afterwards
	new Skill(SKILL_CRAM, 2, 30, false, true),
	// Change Major - Can switch classes all-together
	new Skill(SKILL_CHANGE_MAJOR, 5, 0, false, true)
	];

	// big data
	this.skillObject = {};
	for (var i = this.defaultSkills.length - 1; i >= 0; i--) {
		var skill = this.defaultSkills[i];
		this.skillObject[skill.name] = skill;
	}
	for (var i = this.hiddenSkills.length - 1; i >= 0; i--) {
		var skill = this.hiddenSkills[i];
		this.skillObject[skill.name] = skill;
	}
	for (var i = this.constructs.length - 1; i >= 0; i--) {
		var skill = this.constructs[i];
		this.skillObject[skill.name] = skill;
	}
	for (var i = allClassSkills.length - 1; i >= 0; i--) {
		var skill = allClassSkills[i];
		this.skillObject[skill.name] = skill;
	}

	// class specific skills
	this.classSkills = [];
	switch(occupation) {
		case CLASS_SOLDIER:
			this.classSkills.push(this.skillObject[SKILL_OFF_THE_GRID]);
			this.classSkills.push(this.skillObject[SKILL_SOLDIER_OF_FORTUNE]);
			this.classSkills.push(this.skillObject[SKILL_BODY_CONDITIONING]);
			this.classSkills.push(this.skillObject[SKILL_WEAPONS_TRAINING]);
			this.classSkills.push(this.skillObject[SKILL_DISARM]);
			this.classSkills.push(this.skillObject[SKILL_FIELD_DRESSING]);
		break;
		case CLASS_MAYOR:
			this.classSkills.push(this.skillObject[SKILL_PEOPLES_CHAMPION]);
			this.classSkills.push(this.skillObject[SKILL_ELECTORAL_COLLEGE]);
			this.classSkills.push(this.skillObject[SKILL_VICTORY_SPEECH]);
			this.classSkills.push(this.skillObject[SKILL_CABINET_I]);
			this.classSkills.push(this.skillObject[SKILL_CABINET_II]);
			this.classSkills.push(this.skillObject[SKILL_CABINET_III]);
			this.classSkills.push(this.skillObject[SKILL_WE_THE_PEOPLE]);
		break;
		case CLASS_PHARMACIST:
			this.classSkills.push(this.skillObject[SKILL_DEREGULATION]);
			this.classSkills.push(this.skillObject[SKILL_THE_GOOD_STUFF]);
			this.classSkills.push(this.skillObject[SKILL_STREET_PHARMACIST]);
			this.classSkills.push(this.skillObject[SKILL_QUALITY_CONTROL]);	
		break;
		case CLASS_INVESTOR:
			this.classSkills.push(this.skillObject[SKILL_ROTH_IRA]);
			this.classSkills.push(this.skillObject[SKILL_DIVIDENDS]);
			this.classSkills.push(this.skillObject[SKILL_HEALTH_INSURANCE]);
			this.classSkills.push(this.skillObject[SKILL_LIFE_INSURANCE]);
			this.classSkills.push(this.skillObject[SKILL_MONEY_SHOT]);
			this.classSkills.push(this.skillObject[SKILL_GREASING_THE_WHEELS]);
		break;
		case CLASS_STUDENT:
			this.classSkills.push(this.skillObject[SKILL_STUDENT_DISCOUNT]);
			this.classSkills.push(this.skillObject[SKILL_ALL_NIGHTER]);
			this.classSkills.push(this.skillObject[SKILL_CRAM]);
			this.classSkills.push(this.skillObject[SKILL_CHANGE_MAJOR]);
		break;
	}

	// all buyable skills
	this.allSkills = this.defaultSkills.concat(this.classSkills);
}

function Skill(name, cost, cooldown, equippable, activatable, requirement) {
	this.name = name;
	this.purchased = false;
	this.equippable = equippable;
	this.equipped = false;
	this.cost = cost;
	// for toggleable skills
	this.on = false;
	this.requirement = requirement;
	this.activatable = activatable;

	// game time usage
	this.lastUsedTick = -cooldown;
	this.cooldown = cooldown;

	this.requirementsMet = function() {
		if (requirement == null)
			return this.cost <= player.skillPoints;
		else
			return this.requirement.isSatisfied() && this.cost <= player.skillPoints;

	}

	this.canBeUsed = function() {
		if (this.name == SKILL_REGEN_I)
			return gameTicks >= player.lastCombatTick + this.cooldown;
		else if (this.name == SKILL_LIFE_INSURANCE)
			return gameTicks >= this.lastUsedTick + this.cooldown;
		return this.activatable && gameTicks >= this.lastUsedTick + this.cooldown;
	}
}

function Construct(name, cost, price, activatable, requirement)  {
	this.name = name;
	this.purchased = false;
	this.cost = cost;
	this.price = price;
	this.requirement = requirement;
	this.activatable = activatable;

	this.requirementsMet = function() {
		if (requirement == null)
			return this.cost <= player.skillPoints;
		else
			return this.requirement.isSatisfied() && this.cost <= player.skillPoints;
	}

	this.canBeUsed = function() {
		return this.price <= factions[FACTION_CLONES].wealth;
	}
}

function Requirement(skill) {
	this.skill = skill;

	this.isSatisfied = function() {
		return player.skills.skillObject[this.skill].purchased;
	}
}

function getEffectOnMouseDown(effect) {
	switch (effect) {
		case SKILL_BUBBLE_I: return UseBubbleI;
		case SKILL_BUBBLE_II: return UseBubbleII;
		case SKILL_MICROWAVE_I: return UseMicrowaveI;
		case SKILL_MICROWAVE_II: return UseMicrowaveII;
		case SKILL_MICROWAVE_III: return UseMicrowaveIII;
		case SKILL_MICRONADO: return UseMicronado;
		case SKILL_SPARK_I: return UseSparkI;
		case SKILL_SPARK_II: return UseSparkII;
		case SKILL_SPARKFALL: return UseSparkFall;
		case EFFECT_TERRAFORM_I: return UseTerraformI;
		case CONSTRUCT_WALL: return UseWall;
		case CONSTRUCT_SENTRY_I: return UseSentryI;
		case CONSTRUCT_SENTRY_I: return UseSentryII;
		case CONSTRUCT_HEALING_WELL: return UseHealingWell;
		case CONSTRUCT_MERCENARY: return UseMechanicalMercenary;
		case SKILL_FIELD_DRESSING: return UseFieldDressing;
		case SKILL_SUMMON_FAMILIAR: return UseSummonFamiliar;
		case SKILL_VICTORY_SPEECH: return UseVictorySpeech;
		case SKILL_CABINET_I: return UseCabinetI;
		case SKILL_CABINET_II: return UseCabinetII;
		case SKILL_CABINET_III: return UseCabinetIII;
		case SKILL_WE_THE_PEOPLE: return UseWeThePeople;
		case SKILL_MONEY_SHOT: return ToggleMoneyShot;
		case SKILL_CRAM: return UseCram;
		case SKILL_CHANGE_MAJOR: return UseChangeMajor;
		case SKILL_BLINK_I: return UseBlinkI;
		case SKILL_BLINK_II: return UseBlinkII;
		case SKILL_LEAP: return UseLeap;
		case SKILL_SLAM: return UseSlam;
		case SKILL_RAGE_I: return UseRageI;
		case SKILL_RAGE_II: return UseRageII;
		case EFFECT_BABBLING_BOOK: return UseBabblingBook;
		case EFFECT_GRAPPLING_HOOK: return UseGrapplingHook;
		default: return null;
	}
}

function UseBubbleI() {
	var skill = player.skills.skillObject[SKILL_BUBBLE_I];
	if (skill.canBeUsed()) {
		// get enemies in a 4 distance radius
		var entities = getNonStaticEntitiesInRadius(player, 4);
		for (var i = entities.length - 1; i >= 0; i--) {
			var entity = entities[i];
			if (entity == player)
				continue;
			// only apply a force if we are unobstructed
			if (safeFromForce(player, entity, dungeon.tiles))
				continue;
			// calculate end point
			var dx = entity.x - player.x;
			var dy = entity.y - player.y;
			// find the radius endpoint
			var distance = Math.sqrt(dx*dx + dy*dy);
			var inverseSQ = Math.pow(4 - distance, 1.5);
			var endpoint = {x: Math.round(entity.x + dx * inverseSQ), y: Math.round(entity.y + dy * inverseSQ)};
			var adjustedEndpoint = getLastUnobstructedTile(entity, endpoint, dungeon.tiles);
			// do the move
			var currentTile = dungeon.tiles[entity.y][entity.x];
			var newTile = dungeon.tiles[adjustedEndpoint.y][adjustedEndpoint.x];

			// if we knock back an enemy to a pit,
			if (newTile.char == CHAR_PIT) {
				// then kill the enemy and reward the player
				if (entity.type == ENTITY_ENEMY || entity.type == ENTITY_COMPANION)
					entity.kill(player, false);
				else if (entity.type == ENTITY_ITEM) {
					// do not softlock the game please
					if (entity.name != NAME_OS_DISK)
						currentTile.entities.remove(entity);
				}
			} else {
				currentTile.entities.remove(entity);
				entity.x = adjustedEndpoint.x;
				entity.y = adjustedEndpoint.y;
				newTile.entities.push(entity);

				if (entity.animate)
					entity.addStatus({type:STATUS_STUNNED, ticksRemaining:1, unique:true});			
			}
		}

		// only add this shield if we don't have one
		player.shields[SKILL_BUBBLE_II] = {capacity:player.willpower * 2, currentStrength:player.willpower * 2, ticksRemaining: 10};

		skill.lastUsedTick = gameTicks;
		endTurn();
	}
}

function UseBubbleII() {
	var skill = player.skills.skillObject[SKILL_BUBBLE_I];
	if (skill.canBeUsed()) {
		// get enemies in a 5 distance radius
		var entities = getNonStaticEntitiesInRadius(player, 5);
		for (var i = entities.length - 1; i >= 0; i--) {
			var entity = entities[i];
			if (entity == player)
				continue;
			// only apply a force if we are unobstructed
			if (safeFromForce(player, entity, dungeon.tiles))
				continue;
			// calculate end point
			var dx = entity.x - player.x;
			var dy = entity.y - player.y;
			// find the radius endpoint
			var distance = Math.sqrt(dx*dx + dy*dy);
			var inverseSQ = Math.pow(5 - distance, 1.5);
			var endpoint = {x: Math.round(entity.x + dx * inverseSQ), y: Math.round(entity.y + dy * inverseSQ)};
			var adjustedEndpoint = getLastUnobstructedTile(entity, endpoint, dungeon.tiles);
			// do the move
			var currentTile = dungeon.tiles[entity.y][entity.x];
			var newTile = dungeon.tiles[adjustedEndpoint.y][adjustedEndpoint.x];

			// if we knock back an enemy to a pit,
			if (newTile.char == CHAR_PIT) {
				// then kill the enemy and reward the player
				if (entity.type == ENTITY_ENEMY || entity.type == ENTITY_COMPANION)
					entity.kill(player, false);
				else if (entity.type == ENTITY_ITEM) {
					// do not softlock the game please
					if (entity.name != NAME_OS_DISK)
						currentTile.entities.remove(entity);
				}
			} else {
				currentTile.entities.remove(entity);
				entity.x = adjustedEndpoint.x;
				entity.y = adjustedEndpoint.y;
				newTile.entities.push(entity);

				if (entity.animate)
					entity.addStatus({type:STATUS_STUNNED, ticksRemaining:1, unique:true});			
			}
		}

		player.shields[SKILL_BUBBLE_II] = {capacity:player.willpower * 3, currentStrength:player.willpower * 3, ticksRemaining: 10};

		skill.lastUsedTick = gameTicks;
		endTurn();
	}
}

function lightTargets() {
	for (var i = onScreenEntities.length - 1; i >= 0; i--) {
		var entity = onScreenEntities[i];
		if (entity.type == ENTITY_ENEMY) {
			var tile = dungeon.tiles[entity.y][entity.x];
 			tile.viewState = VIEW_STATE_VISIBLE;
		}
	}
}

function lightEntities() {
	for (var i = onScreenEntities.length - 1; i >= 0; i--) {
		var entity = onScreenEntities[i];
		if (entity.type != ENTITY_DOOR) {
			var tile = dungeon.tiles[entity.y][entity.x];
 			tile.viewState = VIEW_STATE_VISIBLE;
		}
	}
}

var selectingTile = false;
var selectingFor;
var targetTile;
function UseMicrowaveI() {
	// set selectingTile = true
	selectingTile = true;
	// set selectingFor = SKILL_MICROWAVE_I
	selectingFor = SKILL_MICROWAVE_I;
	// unlight the room
	lightTargets();
	windows[SCREEN_GAME].redraw(gameTicks);
}

function UseMicrowaveII() {
	// set selectingTile = true
	selectingTile = true;
	// set selectingFor = SKILL_MICROWAVE_I
	selectingFor = SKILL_MICROWAVE_II;
	// unlight the room
	lightTargets();
	windows[SCREEN_GAME].redraw(gameTicks);
}

function UseMicrowaveIII() {
	// set selectingTile = true
	selectingTile = true;
	// set selectingFor = SKILL_MICROWAVE_I
	selectingFor = SKILL_MICROWAVE_III;
	// unlight the room
	lightTargets();
	windows[SCREEN_GAME].redraw(gameTicks);
}

var CHAR_SPARK = '~';
var COLOR_SPARK = '#66ccff';
function UseSparkI() {
	var nearbyEnemies = [];
	if (player.skills.skillObject[SKILL_SEEKING_SPARKS].purchased)
		nearbyEnemies = getNearbyEnemies(player, 12);
	// make spark entities on player tile, give them a random direction
	for (var i = 0; i < 5; i++) {
		var direction = MOVE_OPTIONS.peekRandom();

		var destination = DESTINATION_NONE;
		if (player.skills.skillObject[SKILL_SEEKING_SPARKS].purchased)
			destination = nearbyEnemies.peekRandom();

		dungeon.projectiles.push(new projectile_spark(player.x, player.y, direction.x, direction.y, destination, player.willpower, 10));		
	}

	player.skills.skillObject[SKILL_SPARK_I].lastUsedTick = gameTicks;
	endTurn();
}

function UseSparkII() {
	var nearbyEnemies = [];
	if (player.skills.skillObject[SKILL_SEEKING_SPARKS].purchased)
		nearbyEnemies = getNearbyEnemies(player, 12);
	// make spark entities on player tile, give them a random direction
	for (var i = 0; i < 10; i++) {
		var direction = MOVE_OPTIONS.peekRandom();

		var destination = DESTINATION_NONE;
		if (player.skills.skillObject[SKILL_SEEKING_SPARKS].purchased)
			destination = nearbyEnemies.peekRandom();
		
		dungeon.projectiles.push(new projectile_spark(player.x, player.y, direction.x, direction.y, destination, player.willpower * 3/2, 15));		
	}

	player.skills.skillObject[SKILL_SPARK_II].lastUsedTick = gameTicks;
	endTurn();
}

var choicesLeft = 3;
function UseTerraformI() {	
	// set selectingTile = true
	selectingTile = true;
	// set selectingFor = SKILL_MICROWAVE_I
	selectingFor = EFFECT_TERRAFORM_I;
	// set the amount of blocks we can use
	choicesLeft = 3;
	// unlight the room
	relight();
	windows[SCREEN_GAME].redraw(gameTicks);
}

function UseWall() {
	var construct = player.skills.skillObject[CONSTRUCT_WALL];
	if (construct.canBeUsed()) {
		// set selectingTile = true
		selectingTile = true;
		// set selectingFor = SKILL_MICROWAVE_I
		selectingFor = CONSTRUCT_WALL;
		// unlight the room
		relight();
		windows[SCREEN_GAME].redraw(gameTicks);
	}
}

function UseSentryI() {
	var construct = player.skills.skillObject[CONSTRUCT_SENTRY_I];
	if (construct.canBeUsed()) {
		// set selectingTile = true
		selectingTile = true;
		// set selectingFor = SKILL_MICROWAVE_I
		selectingFor = CONSTRUCT_SENTRY_I;
		// unlight the room
		relight();
		windows[SCREEN_GAME].redraw(gameTicks);
	}
}

function UseSentryII() {
	var construct = player.skills.skillObject[CONSTRUCT_SENTRY_II];
	if (construct.canBeUsed()) {
		// set selectingTile = true
		selectingTile = true;
		// set selectingFor = SKILL_MICROWAVE_I
		selectingFor = CONSTRUCT_SENTRY_II;
		// unlight the room
		relight();
		windows[SCREEN_GAME].redraw(gameTicks);
	}
}

var healingWell = null;
function UseHealingWell() {
	var construct = player.skills.skillObject[CONSTRUCT_HEALING_WELL];
	if (construct.canBeUsed()) {
		// set selectingTile = true
		selectingTile = true;
		// set selectingFor = SKILL_MICROWAVE_I
		selectingFor = CONSTRUCT_HEALING_WELL;
		// unlight the room
		relight();
		windows[SCREEN_GAME].redraw(gameTicks);
	}
}

var NAME_MECHANICAL_MERCENARY = "Mech-Merc";
function UseMechanicalMercenary() {
	var construct = player.skills.skillObject[CONSTRUCT_MERCENARY];
	if (construct.canBeUsed()) {		
		// summon familiar		
		var location = getOpenSpot({x:player.x, y:player.y});
		var familiar = MakeNPC(NAME_MECHANICAL_MERCENARY, location, [{type:STATUS_STUNNED, ticksRemaining:1}]);
		familiar.destination = player;

		dungeon.tiles[location.y][location.x].entities.push(familiar);

		player.allies.push(familiar);

		if (player.skills.skillObject[SKILL_PEOPLES_CHAMPION].purchased) {
			player.hp += 3;
			player.hpMax += 3;
		}

		// deduct price
		factions[FACTION_CLONES].wealth -= construct.price;

		// add it to npcs
		dungeon.npcs.push(familiar);

		endTurn();
	}
}

function UseFieldDressing() {
	var skill = player.skills.skillObject[SKILL_FIELD_DRESSING];
	if (skill.canBeUsed()) {
		
		// heal player
		var healAmount = player.hpMax * .3;
		player.hp = Math.min(player.hp + healAmount, player.hpMax);

		skill.lastUsedTick = gameTicks;
		endTurn();
	}
}

function UseSummonFamiliar() {
	var skill = player.skills.skillObject[SKILL_SUMMON_FAMILIAR];
	if (skill.canBeUsed()) {
		
		// remove any existing ones
		for (var i = player.allies.length - 1; i >= 0; i--) {
			if (player.allies[i].name == NAME_FAMILIAR)			
				player.allies[i].unsummon();
		}

		// summon familiar		
		var location = getOpenSpot({x:player.x, y:player.y});
		var familiar = MakeNPC(NAME_FAMILIAR, location, [{type:STATUS_STUNNED, ticksRemaining:1}]);
		familiar.destination = player;

		dungeon.tiles[location.y][location.x].entities.push(familiar);

		player.allies.push(familiar);

		if (player.skills.skillObject[SKILL_PEOPLES_CHAMPION].purchased) {
			player.hp += 3;
			player.hpMax += 3;
		}

		// add it to npcs
		dungeon.npcs.push(familiar);

		skill.lastUsedTick = gameTicks;
		endTurn();
	}
}

function UseVictorySpeech() {
	var skill = player.skills.skillObject[SKILL_VICTORY_SPEECH];
	if (skill.canBeUsed()) {
		
		// add to our player
		player.addStatus({type:SKILL_VICTORY_SPEECH, ticksRemaining:10, unique:true});

		skill.lastUsedTick = gameTicks;
		endTurn();
	}
}

var NAME_INTERN = "intern";
var NAME_STAFFER = "staffer";
var NAME_STRATEGIST = "Strategist";
var NAME_CAMPAIGN_MANAGER = "Manager";
function UseCabinetI() {
	var skill = player.skills.skillObject[SKILL_CABINET_I];
	if (skill.canBeUsed()) {

		// remove any existing summons from this skill
		for (var i = player.allies.length - 1; i >= 0; i--) {
			if (player.allies[i].name == NAME_INTERN ||
				player.allies[i].name == NAME_STAFFER ||
				player.allies[i].name == NAME_STRATEGIST ||
				player.allies[i].name == NAME_CAMPAIGN_MANAGER) {
				player.allies[i].unsummon();
			}				
		}
		
		var options = [{name:NAME_INTERN, frequency:20},
		 {name:NAME_STAFFER, frequency:3},
		 {name:NAME_STRATEGIST, frequency:2}, 
		 {name:NAME_CAMPAIGN_MANAGER, frequency:1}];

		for (var i = 0; i < 3; i++) {			
			// summon familiar
			var location = getOpenSpot({x:player.x, y:player.y});
			var familiar = MakeNPC(options.peekWeighted().name, location, [{type:STATUS_STUNNED, ticksRemaining:1}]);
			familiar.destination = player;

			dungeon.tiles[location.y][location.x].entities.push(familiar);

			player.allies.push(familiar);

			if (player.skills.skillObject[SKILL_PEOPLES_CHAMPION].purchased) {
				player.hp += 3;
				player.hpMax += 3;
			}

			// add it to npcs
			dungeon.npcs.push(familiar);
		}

		skill.lastUsedTick = gameTicks;
		endTurn();
	}
}

function UseCabinetII() {
	var skill = player.skills.skillObject[SKILL_CABINET_II];
	if (skill.canBeUsed()) {

		// remove any existing summons from this skill
		for (var i = player.allies.length - 1; i >= 0; i--) {
			if (player.allies[i].name == NAME_INTERN ||
				player.allies[i].name == NAME_STAFFER ||
				player.allies[i].name == NAME_STRATEGIST ||
				player.allies[i].name == NAME_CAMPAIGN_MANAGER) {
				player.allies[i].unsummon();
			}				
		}
		
		var options = [{name:NAME_INTERN, frequency:10},
		 {name:NAME_STAFFER, frequency:3},
		 {name:NAME_STRATEGIST, frequency:2}, 
		 {name:NAME_CAMPAIGN_MANAGER, frequency:1}];

		for (var i = 0; i < 4; i++) {			
			// summon familiar
			var location = getOpenSpot({x:player.x, y:player.y});
			var familiar = MakeNPC(options.peekWeighted().name, location, [{type:STATUS_STUNNED, ticksRemaining:1}]);
			familiar.destination = player;

			dungeon.tiles[location.y][location.x].entities.push(familiar);

			player.allies.push(familiar);

			if (player.skills.skillObject[SKILL_PEOPLES_CHAMPION].purchased) {
				player.hp += 3;
				player.hpMax += 3;
			}

			// add it to npcs
			dungeon.npcs.push(familiar);
		}

		skill.lastUsedTick = gameTicks;
		endTurn();
	}
}

function UseCabinetIII() {
	var skill = player.skills.skillObject[SKILL_CABINET_III];
	if (skill.canBeUsed()) {

		// remove any existing summons from this skill
		for (var i = player.allies.length - 1; i >= 0; i--) {
			if (player.allies[i].name == NAME_INTERN ||
				player.allies[i].name == NAME_STAFFER ||
				player.allies[i].name == NAME_STRATEGIST ||
				player.allies[i].name == NAME_CAMPAIGN_MANAGER) {
				player.allies[i].unsummon();
			}				
		}
		
		var options = [{name:NAME_INTERN, frequency:5},
		 {name:NAME_STAFFER, frequency:3},
		 {name:NAME_STRATEGIST, frequency:2}, 
		 {name:NAME_CAMPAIGN_MANAGER, frequency:1}];

		for (var i = 0; i < 5; i++) {			
			// summon familiar
			var location = getOpenSpot({x:player.x, y:player.y});
			var familiar = MakeNPC(options.peekWeighted().name, location, [{type:STATUS_STUNNED, ticksRemaining:1}]);
			familiar.destination = player;

			dungeon.tiles[location.y][location.x].entities.push(familiar);

			player.allies.push(familiar);

			if (player.skills.skillObject[SKILL_PEOPLES_CHAMPION].purchased) {
				player.hp += 3;
				player.hpMax += 3;
			}

			// add it to npcs
			dungeon.npcs.push(familiar);
		}

		skill.lastUsedTick = gameTicks;
		endTurn();
	}
}

function UseWeThePeople() {
	var skill = player.skills.skillObject[SKILL_WE_THE_PEOPLE];
	if (skill.canBeUsed()) {
		
		// add to our player
		player.addStatus({type:SKILL_WE_THE_PEOPLE, ticksRemaining:10, unique:true});

		skill.lastUsedTick = gameTicks;
		endTurn();
	}
}

function ToggleMoneyShot() {
	var skill = player.skills.skillObject[SKILL_MONEY_SHOT];
	skill.on = !skill.on;

	drawEffectDivs();
}

function UseCram() {
	var skill = player.skills.skillObject[SKILL_CRAM];
	if (skill.canBeUsed()) {
		
		// add to our player
		player.addStatus({type:SKILL_CRAM, ticksRemaining:15, unique:true});

		skill.lastUsedTick = gameTicks;
		endTurn();
	}
}

function UseChangeMajor() {
	// remove this option
	for (var i = CLASSES.length - 1; i >= 0; i--) {
		if (CLASSES[i].name == CLASS_STUDENT) {
			CLASSES.splice(i,1);
			break;
		}
	}
	// bring up the change major screen
	gameState = STATE_CHANGE_MAJOR;
	document.onkeydown = changeMajorOnKeyDown;
	windows[SCREEN_GAME].redraw(gameTicks);
}

function UseBlinkI() {
	var skill = player.skills.skillObject[SKILL_BLINK_I];
	if (skill.canBeUsed()) {
		// set selectingFor = SKILL_BLINK_I
		selectingFor = SKILL_BLINK_I;
		// unlight the room
		relight();
		windows[SCREEN_GAME].redraw(gameTicks);

		player.skills.skillObject[SKILL_BLINK_I].lastUsedTick = gameTicks;
	}
}

function UseBlinkII() {
	var skill = player.skills.skillObject[SKILL_BLINK_II];
	if (skill.canBeUsed()) {
		// set selectingFor = SKILL_BLINK_II
		selectingFor = SKILL_BLINK_II;
		// unlight the room
		relight();
		windows[SCREEN_GAME].redraw(gameTicks);

		player.skills.skillObject[SKILL_BLINK_II].lastUsedTick = gameTicks;
	}
}

function UseLeap() {	
	// set selectingTile = true
	selectingTile = true;
	// set selectingFor = SKILL_LEAP
	selectingFor = SKILL_LEAP;
	// unlight the room
	relight();
	windows[SCREEN_GAME].redraw(gameTicks);
}

function UseRageI() {
	var skill = player.skills.skillObject[SKILL_RAGE_I];
	if (skill.canBeUsed()) {
		
		// add to our player
		player.strength += 2;
		player.addStatus({type:EFFECT_STRENGTH_II, ticksRemaining:10, unique:false});
		player.perception += 2;
		player.addStatus({type:EFFECT_PERCEPTION_II, ticksRemaining:10, unique:false});
		player.def++;
		player.addStatus({type:EFFECT_DEF_I, ticksRemaining:10, unique:false});

		skill.lastUsedTick = gameTicks;
		endTurn();
	}
}

function UseRageII() {
	var skill = player.skills.skillObject[SKILL_RAGE_II];
	if (skill.canBeUsed()) {
		
		// add to our player
		player.strength += 4;
		player.addStatus({type:EFFECT_STRENGTH_IV, ticksRemaining:15, unique:false});
		player.perception += 4;
		player.addStatus({type:EFFECT_PERCEPTION_IV, ticksRemaining:15, unique:false});
		player.def += 2;
		player.addStatus({type:EFFECT_DEF_II, ticksRemaining:15, unique:false});
		player.faction = FACTION_TEAMLESS;
		player.addStatus({type:EFFECT_TEAMLESS, ticksRemaining:15, unique:false});

		skill.lastUsedTick = gameTicks;
		endTurn();
	}
}

function UseSparkFall() {
	var skill = player.skills.skillObject[SKILL_SPARKFALL];
	if (skill.canBeUsed()) {
		
		// add to our player
		player.addStatus({type:SKILL_SPARKFALL, ticksRemaining:15, unique:true});

		skill.lastUsedTick = gameTicks;
		endTurn();
	}
}

function UseMicronado() {
	var skill = player.skills.skillObject[SKILL_MICRONADO];
	if (skill.canBeUsed()) {
		
		// add to our player
		player.addStatus({type:SKILL_MICRONADO, ticksRemaining:10, unique:true});

		skill.lastUsedTick = gameTicks;
		endTurn();
	}
}

function UseGrapplingHook() {	
	// set selectingTile = true
	selectingTile = true;
	// set selectingFor = SKILL_LEAP
	selectingFor = EFFECT_GRAPPLING_HOOK;
	// unlight the room
	relight();
	windows[SCREEN_GAME].redraw(gameTicks);
}

// field dressing
// sparkfall
// micronado
// microwave 3
// bubble 2
// slam
var random_spells = [SKILL_FIELD_DRESSING, SKILL_SPARKFALL, SKILL_MICRONADO,
SKILL_MICROWAVE_III, SKILL_BUBBLE_II, SKILL_SLAM, SKILL_CABINET_III];
function UseBabblingBook() {	
	var skill = player.skills.skillObject[EFFECT_BABBLING_BOOK];
	if (skill.canBeUsed()) {
		
		// choose a random spell
		var spell = random_spells.peekRandom();
		switch(spell) {
			case SKILL_CABINET_III:
				// remove any existing summons from this skill
				for (var i = player.allies.length - 1; i >= 0; i--) {
					if (player.allies[i].name == NAME_INTERN ||
						player.allies[i].name == NAME_STAFFER ||
						player.allies[i].name == NAME_STRATEGIST ||
						player.allies[i].name == NAME_CAMPAIGN_MANAGER) {
						player.allies[i].unsummon();
					}				
				}
				
				var options = [{name:NAME_INTERN, frequency:5},
				 {name:NAME_STAFFER, frequency:3},
				 {name:NAME_STRATEGIST, frequency:2}, 
				 {name:NAME_CAMPAIGN_MANAGER, frequency:1}];

				for (var i = 0; i < 5; i++) {			
					// summon familiar
					var location = getOpenSpot({x:player.x, y:player.y});
					var familiar = MakeNPC(options.peekWeighted().name, location, [{type:STATUS_STUNNED, ticksRemaining:1}]);
					familiar.destination = player;

					dungeon.tiles[location.y][location.x].entities.push(familiar);

					player.allies.push(familiar);

					if (player.skills.skillObject[SKILL_PEOPLES_CHAMPION].purchased) {
						player.hp += 3;
						player.hpMax += 3;
					}

					// add it to npcs
					dungeon.npcs.push(familiar);
				}

				skill.lastUsedTick = gameTicks;
				endTurn();
			break;
			case SKILL_FIELD_DRESSING:
				var healAmount = player.hpMax * .3;
				player.hp = Math.min(player.hp + healAmount, player.hpMax);
				skill.lastUsedTick = gameTicks;
				endTurn();
			break;
			case SKILL_SPARKFALL:
				player.addStatus({type:SKILL_SPARKFALL, ticksRemaining:15, unique:true});
				skill.lastUsedTick = gameTicks;
				endTurn();
			break;
			case SKILL_MICRONADO:
				player.addStatus({type:SKILL_MICRONADO, ticksRemaining:10, unique:true});
				skill.lastUsedTick = gameTicks;
				endTurn();
			break;
			case SKILL_MICROWAVE_III:
				selectingFor = SKILL_MICROWAVE_III;
				selectingForBook = true;
				lightTargets();
				windows[SCREEN_GAME].redraw(gameTicks);
			break;
			case SKILL_BUBBLE_II:
				var entities = getNonStaticEntitiesInRadius(player, 5);
				for (var i = entities.length - 1; i >= 0; i--) {
					var entity = entities[i];
					if (entity == player)
						continue;
					// only apply a force if we are unobstructed
					if (safeFromForce(player, entity, dungeon.tiles))
						continue;
					// calculate end point
					var dx = entity.x - player.x;
					var dy = entity.y - player.y;
					// find the radius endpoint
					var distance = Math.sqrt(dx*dx + dy*dy);
					var inverseSQ = Math.pow(5 - distance, 1.5);
					var endpoint = {x: Math.round(entity.x + dx * inverseSQ), y: Math.round(entity.y + dy * inverseSQ)};
					var adjustedEndpoint = getLastUnobstructedTile(entity, endpoint, dungeon.tiles);
					// do the move
					var currentTile = dungeon.tiles[entity.y][entity.x];
					var newTile = dungeon.tiles[adjustedEndpoint.y][adjustedEndpoint.x];

					// if we knock back an enemy to a pit,
					if (newTile.char == CHAR_PIT) {
						// then kill the enemy and reward the player
						if (entity.type == ENTITY_ENEMY || entity.type == ENTITY_COMPANION)
							entity.kill(player, false);
						else if (entity.type == ENTITY_ITEM)
							currentTile.entities.remove(entity);
					} else {
						currentTile.entities.remove(entity);
						entity.x = adjustedEndpoint.x;
						entity.y = adjustedEndpoint.y;
						newTile.entities.push(entity);

						if (entity.animate)
							entity.addStatus({type:STATUS_STUNNED, ticksRemaining:1, unique:true});			
					}
				}

				player.shields[SKILL_BUBBLE_II] = {capacity:player.willpower * 3, currentStrength:player.willpower * 3, ticksRemaining: 10};
				
				skill.lastUsedTick = gameTicks;
				endTurn();
			break;
			case SKILL_SLAM:
				selectingFor = SKILL_SLAM;
				selectingForBook = true;
				lightTargets();
				windows[SCREEN_GAME].redraw(gameTicks);
			break;
		}
	}
}