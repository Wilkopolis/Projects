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
var SKILL_SEEKING_SPARKS = "Seeking Sparks";
var SKILL_SPARK_III = "Spark Armor";
var SKILL_LEAP = "Leap";
var SKILL_SLAM = "Slam";
var SKILL_MICROWAVE_I = "Microwave I";
var SKILL_MICROWAVE_II = "Microwave II";
var SKILL_MICROWAVE_III = "Microwave III";
var SKILL_PROACTIVE_ARMOR_I = "Proactive Armor I";
var SKILL_PROACTIVE_ARMOR_II = "Proactive Armor II";
var SKILL_PROACTIVE_ARMOR_III = "Proactive Armor III";
var SKILL_LOOTING = "Looting";
var SKILL_BUILD_ROBOCHEF = "Build Robochef";
var SKILL_BUILD_ROBOMECHANIC = "Build Robomechanic";
var SKILL_REDO = "Redo";
var SKILL_IRON_SKIN_I = "Iron Skin I";
var SKILL_IRON_SKIN_II = "Iron Skin II";
var SKILL_RAGE_I = "Rage I";
var SKILL_RAGE_II = "Rage II";
var SKILL_DUAL_WIELDING_I = "Dual Wielding I";
var SKILL_DUAL_WIELDING_II = "Dual Wielding II";
var SKILL_DUAL_WIELDING_III = "Dual Wielding III";
var SKILL_SUMMON_FAMILIAR = "Summon Familiar";
var SKILL_STRONGER_ALLIES = "Stronger Allies";
var SKILL_MORE_ALLIES = "More Allies";
var SKILL_HEFTIER_ALLIES = "Heftier Allies";
var SKILL_FRIENDS_DOWNTOWN = "Friends Downtown";
var SKILL_CHANGE_PLACES = "Change Places";
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
var SKILL_FIELD_DRESSING = "Filed Dressing";
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
var SKILL_ADDICTS_ADVANTAGE = "Addict's Advantage";
var SKILL_DETOX = "Detox";
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
var SKILL_CHANGE_MAJOR = "Change Major";
var SKILL_CHANGE_MINOR = "Change Minor";
// defensive constructs
var CONSTRUCT_WALL = "Wall";
var CONSTRUCT_MINE = "Mine";
var CONSTRUCT_MERCENARY = "Mech-Merc";
var CONSTRUCT_SENTRY_I = "Sentry I";
var CONSTRUCT_SUPPORT_SENTRY_I = "Support Sentry I";
var CONSTRUCT_ADRENALINE_SENTRY_I = "Adrenaline Sentry I";
var CONSTRUCT_SENTRY_II = "Sentry II";
var CONSTRUCT_SENTRY_COMPANION = "Sentry Companion";
var CONSTRUCT_SENTRY_III = "Sentry III";

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
	new Skill(SKILL_MICROWAVE_I, 2, 30, false, true),
	new Skill(SKILL_MICROWAVE_II, 2, 30, false, true, new Requirement(SKILL_MICROWAVE_I)),
	new Skill(SKILL_MICROWAVE_III, 2, 30, false, true, new Requirement(SKILL_MICROWAVE_II)),
	new Skill(SKILL_THORNS_I, 3, 0, false, false),
	new Skill(SKILL_THORNS_II, 4, 0, false, false, new Requirement(SKILL_THORNS_I)),
	new Skill(SKILL_SPARK_I, 1, 15, false, true),
	new Skill(SKILL_SPARK_II, 2, 15, false, true, new Requirement(SKILL_SPARK_I)),
	new Skill(SKILL_SUMMON_FAMILIAR, 2, 60, false, true),
	new Skill(SKILL_PILL_SEEKER, 1, 0, false, false)
	];

	// defensive constructs
	// (name, cost, price, activatable, requirement)
	this.constructs = [
		new Construct(CONSTRUCT_WALL, 1, 1, true),
		new Construct(CONSTRUCT_SENTRY_I, 2, 8, true),
		new Construct(CONSTRUCT_MERCENARY, 2, 25, true)
	];

	// item skills
	this.hiddenSkills = [
	new Skill(EFFECT_TERRAFORM_I, 0, 10, true, true),
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
	// Addict's Advantage - Bonus for being addicted
	new Skill(SKILL_ADDICTS_ADVANTAGE, 3, 0, false, false),
	// Detox - removes all addiction - ACTIVE SKILL
	new Skill(SKILL_DETOX, 1, 120, false, true),
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
	new Skill(SKILL_CRAM, 2, 1, false, true),
	// Change Major - Can switch classes all-together
	new Skill(SKILL_CHANGE_MAJOR, 5, 0, false, false),
	// Change Minor - Can switch firmwares without issues
	new Skill(SKILL_CHANGE_MINOR, 2, 300, false, false)
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
			this.classSkills.push(this.skillObject[SKILL_ADDICTS_ADVANTAGE]);
			this.classSkills.push(this.skillObject[SKILL_DETOX]);
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
			this.classSkills.push(this.skillObject[SKILL_CHANGE_MINOR]);
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
		case SKILL_SPARK_I: return UseSparkI;
		case SKILL_SPARK_II: return UseSparkII;
		case EFFECT_TERRAFORM_I: return UseTerraformI;
		case CONSTRUCT_WALL: return UseWall;
		case CONSTRUCT_SENTRY_I: return UseSentryI;
		case CONSTRUCT_MERCENARY: return UseMechanicalMercenary;
		case SKILL_FIELD_DRESSING: return UseFieldDressing;
		case SKILL_SUMMON_FAMILIAR: return UseSummonFamiliar;
		case SKILL_VICTORY_SPEECH: return UseVictorySpeech;
		case SKILL_CABINET_I: return UseCabinetI;
		case SKILL_CABINET_II: return UseCabinetII;
		case SKILL_CABINET_III: return UseCabinetIII;
		case SKILL_WE_THE_PEOPLE: return UseWeThePeople;
		case SKILL_MONEY_SHOT: return ToggleMoneyShot;
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

			currentTile.entities.remove(entity);
			entity.x = adjustedEndpoint.x;
			entity.y = adjustedEndpoint.y;
			newTile.entities.push(entity);

			if (entity.animate)
				entity.addStatus({type:STATUS_STUNNED, ticksRemaining:1, unique:true});
		}

		player.addStatus({type:STATUS_SHIELDED, ticksRemaining:10, amount:15, endStatus:false, unique:true});
		player.shieldHP += 15;
		player.shieldMax += 15;

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

			currentTile.entities.remove(entity);
			entity.x = adjustedEndpoint.x;
			entity.y = adjustedEndpoint.y;
			newTile.entities.push(entity);

			if (entity.animate)				
				entity.addStatus({type:STATUS_STUNNED, ticksRemaining:1, unique:true});
		}

		player.addStatus({type:STATUS_SHIELDED, ticksRemaining:10, amount:25, endStatus:false, unique:true});
		player.shieldHP += 25;
		player.shieldMax += 25;

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
	draw(gameTicks);
}

function UseMicrowaveII() {
	// set selectingTile = true
	selectingTile = true;
	// set selectingFor = SKILL_MICROWAVE_I
	selectingFor = SKILL_MICROWAVE_II;
	// unlight the room
	lightTargets();
	draw(gameTicks);
}

function UseMicrowaveIII() {
	// set selectingTile = true
	selectingTile = true;
	// set selectingFor = SKILL_MICROWAVE_I
	selectingFor = SKILL_MICROWAVE_III;
	// unlight the room
	lightTargets();
	draw(gameTicks);
}

var CHAR_SPARK = '~';
var COLOR_SPARK = '#66ccff';
function UseSparkI() {
	// make spark entities on player tile, give them a random direction
	for (var i = 0; i < 5; i++) {
		var direction = MOVE_OPTIONS.peekRandom();
		dungeon.projectiles.push(new projectile_spark(player.x, player.y, direction.x, direction.y, player.willpower, 10));		
	}

	player.skills.skillObject[SKILL_SPARK_II].lastUsedTick = gameTicks;
	endTurn();
}

function UseSparkII() {
	// make spark entities on player tile, give them a random direction
	for (var i = 0; i < 10; i++) {
		var direction = MOVE_OPTIONS.peekRandom();
		dungeon.projectiles.push(new projectile_spark(player.x, player.y, direction.x, direction.y, player.willpower * 3/2, 15));		
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
	draw(gameTicks);
}

function UseWall() {	
	// set selectingTile = true
	selectingTile = true;
	// set selectingFor = SKILL_MICROWAVE_I
	selectingFor = CONSTRUCT_WALL;
	// unlight the room
	relight();
	draw(gameTicks);
}

function UseSentryI() {	
	// set selectingTile = true
	selectingTile = true;
	// set selectingFor = SKILL_MICROWAVE_I
	selectingFor = CONSTRUCT_SENTRY_I;
	// unlight the room
	relight();
	draw(gameTicks);
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