var hash = 0;
function NPC (type, pos, name, hp, baseDmg, accuracy, baseXp, range, animate, physics, obstacle, permanentSolid, char, font, faction, loggable, statuses, items, description) {
	this.type = type;
	this.name = name;
	this.x = pos.x;
	this.y = pos.y;
	this.hpMax = hp;
	this.hp = hp;
	this.baseXp = baseXp;

	this.shieldHP = 0;

	this.baseDamage = baseDmg;
	this.accuracy = accuracy;
	this.range = range;

	this.char = char;
	this.font = font;
	this.color = COLOR_FACTIONS_POWERED[faction] == null ? COLOR_DEFAULT : COLOR_FACTIONS_POWERED[faction];
	this.solid = true;
	this.permanentSolid = false;
	this.simulatesPhysics = physics;
	this.opaque = false;
	this.animate = animate;
	// for the enemy log
	this.loggable = loggable;
	this.obstacle = obstacle;
	this.hash = hash++;
	// a fix needed for the drawEnemyLog
	this.discovered = true;
	this.visible = false;
	// for the trojan enemy
	this.trojan = false;
	// for the goo hivemind
	this.goo = false;
	// attack every other turn for sentry
	this.startingTick = gameTicks;
	// for companions
	this.ticksAwayFromMaster = 0;

	this.description = description;

	// for the Zero Day enemy
	this.form = ZD_FORM_MOVE;

	this.statuses = {};
	for (var i = statuses.length - 1; i >= 0; i--)
		this.statuses[statuses[i].type] = statuses[i];
	this.commonStatuses = [];

	this.faction = faction;
	this.destination = DESTINATION_NONE;
	this.inventory = new Inventory();

	this.killCount = 0;

	for (var i = items.length - 1; i >= 0; i--) {
		var item = items[i];
		this.inventory.push(item);
		if (item.canBeEquipped(this))
			item.equip(this);
	}

	this.getDescription = function() {
		return this.description;
	}

	this.applyStatuses = function () {

		// check for deployables here
		if (healingWell != null) {
			var dx = healingWell.x - this.x;
			var dy = healingWell.y - this.y;
			var distance = Math.sqrt(dx * dx + dy * dy);
			if (distance <= healingWell.range) {
				this.hp = Math.max(this.hp + 3, this.hpMax);
			}
		}

		var keys = Object.keys(this.statuses);
		for (var i = 0; i < keys.length; i++) {
			var status = this.statuses[keys[i]];

			switch(status.type) {

				case EFFECT_SMOLDER:
					var nearbyEnemies = getNearbyEnemies(this, 5);
					for (var i = nearbyEnemies.length - 1; i >= 0; i--) {
						var enemy = nearbyEnemies[i];
						dealDamage(this, Math.round(this.baseDamage / 5), enemy);
					}
				break;

				case EFFECT_REGEN_I:
					this.hp = Math.min(this.hp + 1, this.hpMax);
				break;
			}

			// increment
			if (status.ticksRemaining == 0)
				delete this.statuses[keys[i]];
			else
				status.ticksRemaining--;
		}

		// unique statuses

		if (this.statuses[STATUS_BLEEDING]) {
			// bleeding does 5% of maxHP per turn				
			var bleeding_dmg = Math.max(Math.round(this.hpMax * .1), 1);
			// deal it as true damage
			this.hp -= bleeding_dmg;
			if (this.hp <= 0) {
				this.kill(status.originator);
			}
		}

		if (this.statuses[NAME_CHEF] && 
			this.statuses[NAME_CHEF].cooldown >= gameTicks - this.statuses[NAME_CHEF].lastUsedTick) {
			// buff a random one
			var nearbyAllies = getNearbyAllies(this, 5);
			var ally = nearbyAllies.popRandom();

			var buff = CHEF_BUFFS.peekRandom();
			ally.addStatus({type:buff, ticksRemaining:5, unique:false});

			this.statuses[NAME_CHEF].lastUsedTick = gameTicks;
		}

		if (this.statuses[NAME_MECHANIC] && 
			this.statuses[NAME_MECHANIC].cooldown >= gameTicks - this.statuses[NAME_MECHANIC].lastUsedTick) {
			// buff a random one
			var nearbyAllies = getNearbyAllies(this, 5);
			var ally = nearbyAllies.popRandom();
			
			var gain = Math.round(this.hpMax * .5);
			ally.hp += gain;
			ally.hpMax += gain;
			
			this.statuses[NAME_MECHANIC].lastUsedTick = gameTicks;
		}

		if (this.statuses[NAME_ZERO_DAY] && 
			this.statuses[NAME_ZERO_DAY].cooldown >= gameTicks - this.statuses[NAME_ZERO_DAY].lastUsedTick) {
			
			var bestForm = '';

			var nearbyEnemyCount = getNearbyEnemies(this, 5).length;
			var hpPercent = this.hp/this.hpMax;

			var tankHeuristic = (1 - hpPercent) * 4;
			var areaHeuristic = Math.min(nearbyEnemyCount, 3.5);
			var moveHeuristic = 1.99;

			if (tankHeuristic > moveHeuristic && tankHeuristic > areaHeuristic)
				bestForm = ZD_FORM_TANK;
			else if (areaHeuristic > moveHeuristic && areaHeuristic > tankHeuristic)
				bestForm = ZD_FORM_AREA;
			else
				bestForm = ZD_FORM_MOVE;

			if (bestForm != this.form) {

				// clean up current
				if (this.form == ZD_FORM_TANK) {
					// remove regen
					delete this.statuses[EFFECT_REGEN_I];
					// lose hp/max
					var loss = Math.round(this.hpMax * .25);
					this.hp -= loss;
					this.hpMax -= loss;
					// remove movespeed debuff
					delete this.statuses[EFFECT_SLOWED];
				} else if (this.form == ZD_FORM_AREA) {
					// remove aoe status
					delete this.statuses[EFFECT_SMOLDER];
				} else if (this.form == ZD_FORM_MOVE) {
					// remove move status
					delete this.statuses[SKILL_BLINK_I];
				}

				this.form = bestForm

				// add new effects
				if (this.form == ZD_FORM_TANK) {
					// add regen
					this.addStatus({type:EFFECT_REGEN_I, ticksRemaining:-1, unique:false});
					// gain hp/max
					var gain = Math.round(this.hpMax * .25);
					this.hp += gain;
					this.hpMax += gain;
					// add movespeed debuff
					this.addStatus({type:EFFECT_SLOWED, ticksRemaining:-1, lastUsedTick:0, cooldown:3, unique:true});
				} else if (this.form == ZD_FORM_AREA) {
					// add aoe status
					this.addStatus({type:EFFECT_SMOLDER, ticksRemaining:-1, unique:false});
				} else if (this.form == ZD_FORM_MOVE) {
					// add move status
					this.addStatus({type:SKILL_BLINK_I, ticksRemaining:-1, lastUsedTick:0, cooldown:20, unique:true});
				}
			}

			this.statuses[NAME_ZERO_DAY].lastUsedTick = gameTicks;
		}
	}

	// if 'statusing' the enemy, set his current status to 
	// the given amount of ticks if it has less than
	// the given amount of ticks. Otherwise add the status
	this.addStatus = function(status) {
		if (status.unique && this.statuses[status.type] != null && this.statuses[status.type].ticksRemaining <= status.ticksRemaining)
			this.statuses[status.type].ticksRemaining = status.ticksRemaining;
		else if (!status.unique && this.statuses[status.type] != null) {
			this.statuses[status.type].count++;
			this.commonStatuses.push(status);
		} else if (!status.unique) {
			this.statuses[status.type] = status;
			this.commonStatuses.push(status);
		} else
			this.statuses[status.type] = status;
	}
	
	this.getThreatLevel = function(character) {
		var offset = 0;
		if (this.type == ENTITY_GENERATOR_CORE)
			offset = 100;
		else if (this.type == ENTITY_SENTRY || this.type == ENTITY_COMPANION)
			offset = 10;

		return offset - Math.sqrt(Math.pow(this.x - character.x,2) + Math.pow(this.y - character.y,2)) + 10 * (1 - this.hp/this.hpMax);;
	}

	// a companion only skill
	this.unsummon = function () {

		// this is for clearing a room. If we are directing units to cap
		// a room, we could set a unit to its destination so it will clear
		// the room.
		for (var i = dungeon.npcs.length - 1; i >= 0; i--) {
			if (dungeon.npcs[i].destination == this)
				dungeon.npcs[i].destination = DESTINATION_NONE;
		}

		this.destination.allies.remove(this);

		if (this.destination == player && player.skills.skillObject[SKILL_PEOPLES_CHAMPION].purchased) {
			player.hp -= 3;
			player.hpMax -= 3;

			if (player.hp <= 0)
				GameOver();
		}

		// get the tile we are on
		var tile = dungeon.tiles[this.y][this.x];

		// remove ourselves from any lists
		dungeon.npcs.remove(this);
		
		// I must have been in a good mood to have commented this:
		// is this truely the end? Are we all just a baseline function call between
		// existence and history?
		tile.entities.remove(this);	
	}

	this.getPowerLevel = function() {
		return this.hpMax * this.baseDamage;		
	}

	this.canMove = function() {
		if (this.statuses[STATUS_STUNNED] != null)
			return false;
		else if (this.statuses[EFFECT_SLOWED] != null) {
			if (this.statuses[EFFECT_SLOWED].cooldown <= 
				gameTicks - this.statuses[EFFECT_SLOWED].lastUsedTick) {
				this.statuses[EFFECT_SLOWED].lastUsedTick == gameTicks;
				return false;
			}
		} else {
			return this.hp > 0;
		}
	}

	this.canAttack = function() {
		if (this.type == ENTITY_SENTRY) {
			var room = this.getRoom();
			if (room.powered)
				return (gameTicks - this.startingTick) % 2 == 0;
			else
				return (gameTicks - this.startingTick) % 4 == 0;
		}

		if (this.statuses[STATUS_STUNNED] != null)
			return false;
		else 
			return this.hp > 0;
	}
	
	this.isShielded = function() {
		return this.statuses[STATUS_SHIELDED] && this.shieldHP > 0;
	}

	this.getBleedChance = function() {
		// look over inventory, get largest bleed level
		var largest_level = "";
		for (var i = this.inventory.length - 1; i >= 0; i--) {
			var item = this.inventory[i];
			if (item.equipped) {
				if (item.effects.includes(EFFECT_SHARP_I)) {
					largest_level = EFFECT_SHARP_I;
				}
			}
		}

		switch(largest_level) {
			case EFFECT_SHARP_I: return .1;
			default: return 0;
		}
	}

	this.getKnockBackChance = function() {
		// look over inventory, get total knockback chance
		var chance = 0;
		for (var i = this.inventory.length - 1; i >= 0; i--) {
			var item = this.inventory[i];
			if (item.equipped) {
				if (item.effects.includes(EFFECT_KNOCKBACK_I))
					chance += .1;
				else if (item.effects.includes(EFFECT_KNOCKBACK_II))
					chance += .2;
				else if (item.effects.includes(EFFECT_KNOCKBACK_III))
					chance += .3;
			}
		}

		return chance;
	}

	this.getStunChance = function() {
		// look over inventory, get total knockback chance
		var chance = 0;
		for (var i = this.inventory.length - 1; i >= 0; i--) {
			var item = this.inventory[i];
			if (item.equipped) {
				if (item.effects.includes(EFFECT_STUN_I))
					chance += .1;
				else if (item.effects.includes(EFFECT_STUN_II))
					chance += .2;
			}
		}

		return chance;
	}

	this.getRangedDamage = function() {
		return this.baseDamage * todModifier;
	}

	this.getRangedAccuracy = function() {
		return this.accuracy + (1 - todModifier) / 3;
	}

	this.attack = function(target) {		

		// miss
		var effectiveAccuracy = this.accuracy + (1 - todModifier) / 3;
		if (Math.random() > effectiveAccuracy)
			result = 0;

		// try to shoot em
		if (this.range != RANGE_MELEE) {
			shoot(this, {x:target.x, y:target.y}, Math.random() * this.range + this.range - 2, effectiveAccuracy, this.getDmg());
			return;
		}

		// bleeding
		if (Math.random() <= this.getBleedChance()) {
			target.addStatus({type:STATUS_BLEEDING, ticksRemaining:3, originator:this, unique:true});
		}

		// stunned
		if (Math.random() <= this.getStunChance()) {
			target.addStatus({type:STATUS_STUNNED, ticksRemaining:1, unique:true});
		}

		// knockback
		if (Math.random() <= this.getKnockBackChance()) {
			// calculate end point
			var dx = target.x - player.x;
			var dy = target.y - player.y;
			// find the radius endpoint
			var magnitude = Math.sqrt(dx*dx + dy*dy);
			var power = magnitude > 1 ? 2 : 3;
			var endpoint = {x: Math.round(target.x + dx * power), y: Math.round(target.y + dy * power)};
			var adjustedEndpoint = getLastUnobstructedTile(target, endpoint, dungeon.tiles);
			// do the move
			var currentTile = dungeon.tiles[target.y][target.x];
			var newTile = dungeon.tiles[adjustedEndpoint.y][adjustedEndpoint.x];

			currentTile.entities.remove(target);
			target.x = adjustedEndpoint.x;
			target.y = adjustedEndpoint.y;
			newTile.entities.push(target);
				
			// no need to stun the player here
			if (target != player)
				target.addStatus({type:STATUS_STUNNED, ticksRemaining:1, unique:true});
		}

		dealDamage(this, this.getDmg(), target);
	}
	
	this.getRoom = function() {
		var roomPos = {x: mapXMin + Math.round((this.x - (ROOM_CELL_LENGTH - 1)/ 2) / ROOM_CELL_LENGTH),
					   y: mapYMin + Math.round((this.y - (ROOM_CELL_LENGTH - 1)/ 2) / ROOM_CELL_LENGTH)};
		var roomSegment = minimap[roomPos.y][roomPos.x];
		return roomLookup[roomSegment.hash];
	}

	this.getDmg = function() {

		var effectiveDamage = this.baseDamage * todModifier;
		
		var result = Math.max(1, Math.round(effectiveDamage * Math.random()));
		// if we are a sentry, we always do max damage
		if (this.type == ENTITY_SENTRY)
			result = this.baseDamage;

		if (this.statuses[STATUS_DISARMED])
			result = Math.round(result/2);

		if (doingTutorial)
			return result;

		var room = this.getRoom();		
		if (room.powered && (room.faction == this.faction || room.faction == FACTION_NONE))
			return Math.round(result * 1.5);
		else
			return result;
	}

	this.takeDamage = function(amount, attacker) {
		this.hp -= amount;

		if (this.type == ENTITY_ATM)
			factions[attacker.faction].wealth += amount;

		if (this.hp <= 0)
			this.kill(attacker);
	}

	this.kill = function(killer, dropLoot = true) {

		killer.killCount++;

		// get the tile we are on
		var tile = dungeon.tiles[this.y][this.x];

		if (!this.animate) {
			tile.entities.remove(this);

			if (this.type == ENTITY_GENERATOR_CORE)
				this.room.generator.fail()
			return;
		}

		// this is for clearing a room. If we are directing units to cap
		// a room, we could set a unit to its destination so it will clear
		// the room.
		for (var i = dungeon.npcs.length - 1; i >= 0; i--) {
			if (dungeon.npcs[i].destination == this)
				dungeon.npcs[i].destination = DESTINATION_NONE;
		}

		// release us from units enroute
		if (typeof this.destinationRoom !== 'undefined') {
			this.destinationRoom.unitsEnroute.remove(this);
		}

		// some skill stuff
		if (killer == player && player.skills.skillObject[SKILL_SOLDIER_OF_FORTUNE].purchased) {
			var worth = Math.round(this.baseXp / 2);
			factions[FACTION_CLONES].wealth += worth;
		}

		// take control
		if (killer.faction == FACTION_HIVEMIND) {

			// remove killer if its the goo
			if (killer.name == NAME_GOO) {
				dungeon.npcs.setRemove(killer);
				dungeon.tiles[killer.y][killer.x].entities.remove(killer);
			}				

			// set me to some health
			this.hp = Math.round(this.hpMax * .5);

			this.statuses = [{type:STATUS_STUNNED, ticksRemaining:1, unique:true},
				{type:EFFECT_REGEN_I, ticksRemaining:-1, unique:false}];

			// change my faction to hivemind
			this.faction = FACTION_HIVEMIND;
			this.color = COLOR_FACTIONS_POWERED[FACTION_HIVEMIND];

			factions[FACTION_HIVEMIND].units.push(this);
			return;
		}

		// give the guy xp
		if (doingTutorial)
			killer = player;

		killer.addKillXp(this.baseXp);

		// remove ourselves from any lists
		dungeon.npcs.setRemove(this);

		if (factions[this.faction] != null)
			factions[this.faction].units.setRemove(this);

		if (!this.trojan && !this.goo && !doingTutorial) {			
			switch(this.name) {
				case NAME_ANT: factions[FACTION_ANIMAL].antCount--; break;
				case NAME_DOG: factions[FACTION_ANIMAL].dogCount--; break;
				case NAME_MONKEY: factions[FACTION_ANIMAL].monkeyCount--; break;
				case NAME_GORILLA: factions[FACTION_ANIMAL].gorillaCount--; break;
				case NAME_WANDERER: factions[FACTION_SURVIVOR].wandererCount--; break;
				case NAME_MARAUDER: factions[FACTION_SURVIVOR].marauderCount--; break;
				case NAME_TECHIE: factions[FACTION_SURVIVOR].techieCount--; break;
				case NAME_WAR_BOSS: factions[FACTION_SURVIVOR].warBossCount--; break;
				case NAME_BUG: factions[FACTION_SOFTWARE].bugCount--; break;
				case NAME_GLITCH: factions[FACTION_SOFTWARE].glitchCount--; break;
				case NAME_TROJAN: factions[FACTION_SOFTWARE].trojanCount--; break;
				case NAME_ZERO_DAY: factions[FACTION_SOFTWARE].zeroDayCount--; break;
				case NAME_BUTLER: factions[FACTION_ROBOT].butlerCount--; break;
				case NAME_CHEF: factions[FACTION_ROBOT].chefCount--; break;
				case NAME_MECHANIC: factions[FACTION_ROBOT].mechanicCount--; break;
				case NAME_SECUROTRON: factions[FACTION_ROBOT].securotronCount--; break;
			}
		}
		
		if (this.trojan) {			
			// if this enemy was a trojan, spawn the trojan
			var enemy = MakeNPC(NAME_TROJAN, {x:this.x, y:this.y}, [{type:STATUS_STUNNED, ticksRemaining:1, unique:true}]);
			tile.entities.push(enemy);
			dungeon.npcs.push(enemy);
		} else if (dropLoot) {

			// if we are to drop an item, drop it
			var dropItem = generateLoot(this.baseXp);
			// tutorial stuff
			if (this.name == NAME_GIANT_RAT) {
				dropItem = MakeItem(NAME_STARTER_PISTOL);
				dropItem.accuracy = 1.2;
			} else if (this.name == NAME_STRANDED_MAN) {
				var option1 = {
					text:"Bring it on",
					event:function() {
						windows[SCREEN_PROMPT].hide();
					},
				};
				log.add("Now to escape the tutorial, you may have to use all the SKILL you have!");
				prompt("Now to escape the tutorial, you may have to use all the SKILL you have!", option1);
				dropItem = ITEM_NONE;
				this.room.unlockDoors();
			}

			if (dropItem.type == ITEM_MONEY && factions[killer.faction] != null) { 
				factions[killer.faction].wealth += dropItem.amount;
				if (killer == player)
					log.add("The " + this.name + " drops " + dropItem.amount + " money.");
			} else if (dropItem.type == ITEM_BULLETS && killer == player) {
				player.bullets += dropItem.amount;
				log.add("The " + this.name + " drops " + dropItem.amount + " ammo.");
			} else if (dropItem != ITEM_NONE) {
				// if we are in eyesight of the player, it starts as discovered
				dropItem.y = this.y;
				dropItem.x = this.x;
				tile.entities.push(dropItem);
				if (lookAtItem(player, this, dungeon.tiles))
					log.add("The " + this.name + " drops a " + dropItem.name);
			}
		}

		// if we are the bug enemy, multiply
		while (this.name == NAME_BUG && Math.random() < .2) {
			var spot = getOpenSpot(this);
			var enemy = MakeNPC(NAME_BUG, {x:spot.x, y:spot.y}, [{type:STATUS_STUNNED, ticksRemaining:1, unique:true}]);
			var tile = dungeon.tiles[enemy.y][enemy.x];

			dungeon.npcs.push(enemy);
			factions[FACTION_SOFTWARE].units.push(enemy);
			factions[FACTION_SOFTWARE].bugCount++;

			tile.entities.push(enemy);
		}

		// if we belong to an item (parent) have our master (destination)
		// add the parent item to its list of cooldowns
		if (this.parent != null) {
			this.destination.cooldowns.push(this.parent);
			this.parent.lastUsedTick = gameTicks;
		}

		// can only have 
		if (this.name == CONSTRUCT_HEALING_WELL)
			healingWell = null;

		tile.entities.remove(this);
	}

	this.addKillXp = function(amount) {
		// default for enemies
	}

	this.addCombatExperience = function() {
		// default for enemies
	}

	this.addRangedCombatExperience = function() {
		// default for enemies
	}
}

function doNPCTurns() {
	for (var i = 0; i < dungeon.npcs.length; i++) {

		lastMillis['doNPCTurns|EnemySetup'].start = performance.now();
		var npc = dungeon.npcs[i];
		
		// skip generator cores
		if (!npc.animate)
			continue;		

		npc.applyStatuses();

		if (npc.type == ENTITY_SENTRY) {
			if (doingTutorial)
				doSentryTurnTutorial(npc);
			else
				doSentryTurn(npc);
		} else if (npc.canMove()) {
			if (npc.type == ENTITY_ENEMY) {
				if (doingTutorial)
					doEnemyTurnTutorial(npc);
				else
					doEnemyTurn(npc);
			} else if (npc.type == ENTITY_COMPANION)
				doCompanionTurn(npc);
		}
	}
}

function doSentryTurn(sentry) {

	if (!sentry.canAttack())
		return;

	// get units in view
	var enemys = getNearbyUnitsInSight(sentry);
	
	// be fair to the player!
	if (enemys.includes(player) && player.metEntities[sentry.hash] == null) {
		player.metEntities[sentry.hash] = true;
		enemys.remove(player);
	}

	if (enemys.length == 0)
		return;

	// pick biggest one
	var mostThreatening;
	for (var i = enemys.length - 1; i >= 0; i--) {
		if (mostThreatening == null || enemys[i].getThreatLevel(sentry) > mostThreatening.getThreatLevel(sentry))
			mostThreatening = enemys[i];
	}
	// FIRE
	sentry.attack(mostThreatening);
}

function doSentryTurnTutorial(sentry) {

	// get units in view
	var enemys = getNearbyUnitsInSight(sentry);
	
	// be fair to the player!
	if (enemys.includes(player) && player.metEntities[sentry.hash] == null) {
		player.metEntities[sentry.hash] = true;
		enemys.remove(player);
	}

	if (enemys.length == 0)
		return;

	// pick biggest one
	var mostThreatening;
	for (var i = enemys.length - 1; i >= 0; i--) {
		if (mostThreatening == null || enemys[i].getThreatLevel(sentry) > mostThreatening.getThreatLevel(sentry))
			mostThreatening = enemys[i];
	}
	// FIRE
	sentry.attack(mostThreatening);
}

function doEnemyTurn(npc) {
	
	var currentTile = dungeon.tiles[npc.y][npc.x];

	// go to our room, otherwise if we encounter something that makes us mad, kill it instead
	var destination = npc.destination;
	var npcDestination = false;
	var candidates = [];
	for (var j = dungeon.npcs.length - 1; j >= 0; j--) {
		if (Math.sqrt(Math.pow(npc.x - dungeon.npcs[j].x, 2) + Math.pow(npc.y - dungeon.npcs[j].y, 2)) < 10 && dungeon.npcs[j].faction != npc.faction)
			candidates.push(dungeon.npcs[j]);
	}

	if (Math.sqrt(Math.pow(npc.x - player.x, 2) + Math.pow(npc.y - player.y, 2)) < 10 && player.faction != npc.faction)
		candidates.push(player);

	if (candidates.length > 0) {
		candidates.sort(function(a,b) {return b.getThreatLevel(npc) - a.getThreatLevel(npc)});
		destination = candidates[0];
		npcDestination = true;
	}

	var dx = Math.abs(npc.x - destination.x);
	var dy = Math.abs(npc.y - destination.y);
	if (npcDestination) {
		var distance = Math.sqrt(dx * dx + dy * dy);
		if (distance <= npc.range && npc.canAttack()) {
			npc.attack(destination);
			disputeRoom(npc);
			return;
		}

		if (npc.statuses[NAME_SECUROTRON]) {
			var target = candidates.peekRandom();
			var damage = Math.round(npc.baseDamage / 4);
			dealDamage(npc, damage, target);
		} else if (npc.statuses[NAME_MARAUDER] && npc.statuses[NAME_MARAUDER].cooldown >=
			gameTicks - npc.statuses[NAME_MARAUDER].lastUsedTick) {
			var target = candidates.peekRandom();
			var damage = npc.baseDamage;
			dealDamage(npc, damage, target);
			npc.statuses[NAME_MARAUDER].lastUsedTick = gameTicks;
		} else if (npc.statuses[NAME_TECHIE] && npc.statuses[NAME_TECHIE].cooldown >=
			gameTicks - npc.statuses[NAME_TECHIE].lastUsedTick) {
			var spot = getOpenSpot(npc);
			var sentry = MakeNPC(CONSTRUCT_SENTRY_I, spot, [{type:STATUS_STUNNED, ticksRemaining:1, unique:true}])
			sentry.faction = FACTION_SURVIVOR;
			dungeon.npcs.push(sentry);
			dungeon.tiles[sentry.y][sentry.x].entities.push(sentry);
			npc.statuses[NAME_TECHIE].lastUsedTick = gameTicks;
		}
	}

	lastMillis['doNPCTurns|EnemySetup'].end = performance.now();
	lastMillis['doNPCTurns|EnemyDirecting'].start = performance.now();
	if (destination != DESTINATION_NONE) {

		// for trying to navigate to stuff surrounded by solids
		if (!npcDestination)
			destination = getOpenSpot(destination);

		lastMillis['doNPCTurns|routing'].start = performance.now();
		// if within room, do A-Star with weights why not
		lastMillis['doNPCTurns|getNextMoveAStar'].start = performance.now();
		var offset = getNextMoveAStar(npc, destination);
		lastMillis['doNPCTurns|getNextMoveAStar'].end = performance.now();
		// if (lastMillis['doNPCTurns|getNextMoveAStar'].end - lastMillis['doNPCTurns|getNextMoveAStar'].start > 100) {			
		// 	offset = getNextMoveAStarSpecial(npc, destination);
		// }
		var newPos = {x: npc.x + offset.x, y: npc.y + offset.y};
		var newTile = dungeon.tiles[newPos.y][newPos.x];
		var roomPos = {x: mapXMin + Math.round((npc.x - (ROOM_CELL_LENGTH - 1)/ 2) / ROOM_CELL_LENGTH), 
			    	   y: mapYMin + Math.round((npc.y - (ROOM_CELL_LENGTH - 1)/ 2) / ROOM_CELL_LENGTH)};
		var room = roomLookup[minimap[roomPos.y][roomPos.x].hash];
		// if we reached our destination via smart moving
		if (newTile.getSolid()) {
			// if there is something in our way thats not friendly, hit it
			var obstruction;
			if (typeof newTile.entities.peek() === 'undefined')
				obstruction = player;
			else
				obstruction = newTile.entities.peek();
			// check if we wanna smac the obstruction
			if (npc.canAttack() && obstruction.obstacle && obstruction.faction != npc.faction)
				npc.attack(obstruction);
		} else if (newPos.x == destination.x && newPos.y == destination.y) {
			npc.destination = DESTINATION_NONE;
			room.unitsEnroute.setRemove(npc);
		// otherwise do the move
		} else {
			npc.x = newPos.x;
			npc.y = newPos.y;

			var temp = currentTile.entities.pop();
			newTile.entities.push(temp);

			var dx = Math.abs(npc.x - destination.x);
			var dy = Math.abs(npc.y - destination.y);
			if (dx == 1 || dy == 1) {
				npc.destination = DESTINATION_NONE;
				room.unitsEnroute.setRemove(npc);
			}
		}
		lastMillis['doNPCTurns|routing'].end = performance.now();
	} else {
		lastMillis['doNPCTurns|wander'].start = performance.now();
		// else wander or do something simple
		var offset = MOVE_OPTIONS[Math.floor(Math.random() * MOVE_OPTIONS.length)];
		var newPos = {x: npc.x + offset.x, y: npc.y + offset.y};
		var newTile = dungeon.tiles[newPos.y][newPos.x];
		if (!newTile.getSolid()) {				
			npc.x = newPos.x;
			npc.y = newPos.y;
			newTile.entities.push(currentTile.entities.pop());				
		}
		lastMillis['doNPCTurns|wander'].end = performance.now();
	}
	lastMillis['doNPCTurns|disputeRoom'].start = performance.now();
	disputeRoom(npc);
	lastMillis['doNPCTurns|disputeRoom'].end = performance.now();
	lastMillis['doNPCTurns|EnemyDirecting'].end = performance.now();

	if (performanceLogging) {
		logEntity.push('doNPCTurns|EnemySetup: ' + (lastMillis['doNPCTurns|EnemySetup'].end - lastMillis['doNPCTurns|EnemySetup'].start) + 'ms');	
		logEntity.push('doNPCTurns|EnemyDirecting: ' + (lastMillis['doNPCTurns|EnemyDirecting'].end - lastMillis['doNPCTurns|EnemyDirecting'].start) + 'ms');	
		logEntity.push('doNPCTurns|routing: ' + (lastMillis['doNPCTurns|routing'].end - lastMillis['doNPCTurns|routing'].start) + 'ms');	
		logEntity.push('doNPCTurns|getNextMoveAStar: ' + (lastMillis['doNPCTurns|getNextMoveAStar'].end - lastMillis['doNPCTurns|getNextMoveAStar'].start) + 'ms');	
		logEntity.push('doNPCTurns|wander: ' + (lastMillis['doNPCTurns|wander'].end - lastMillis['doNPCTurns|wander'].start) + 'ms');
		logEntity.push('doNPCTurns|disputeRoom: ' + (lastMillis['doNPCTurns|disputeRoom'].end - lastMillis['doNPCTurns|disputeRoom'].start) + 'ms');
	}
}

function doEnemyTurnTutorial(npc) {
	
	if (npc.name == NAME_STRANDED_MAN && npc.hp == npc.hpMax)
		return;

	var currentTile = dungeon.tiles[npc.y][npc.x];

	// go to our room, otherwise if we encounter something that makes us mad, kill it instead
	var destination = npc.destination;
	var npcDestination = false;
	var candidates = [];
	for (var j = dungeon.npcs.length - 1; j >= 0; j--) {
		if (Math.sqrt(Math.pow(npc.x - dungeon.npcs[j].x, 2) + Math.pow(npc.y - dungeon.npcs[j].y, 2)) < 10 && dungeon.npcs[j].faction != npc.faction)
			candidates.push(dungeon.npcs[j]);
	}

	if (Math.sqrt(Math.pow(npc.x - player.x, 2) + Math.pow(npc.y - player.y, 2)) < 10 && player.faction != npc.faction)
		candidates.push(player);

	if (candidates.length > 0) {
		candidates.sort(function(a,b) {return b.getThreatLevel(npc) - a.getThreatLevel(npc)});
		destination = candidates[0];
		npcDestination = true;
	}

	var dx = Math.abs(npc.x - destination.x);
	var dy = Math.abs(npc.y - destination.y);
	if (npcDestination) {
		var distance = Math.sqrt(dx * dx + dy * dy);
		if (distance <= npc.range && npc.canAttack()) {
			npc.attack(destination);
			return;
		}

		if (npc.statuses[NAME_SECUROTRON]) {
			var target = candidates.peekRandom();
			var damage = Math.round(npc.baseDamage / 4);
			dealDamage(npc, damage, target);
		} else if (npc.statuses[NAME_MARAUDER] && npc.statuses[NAME_MARAUDER].cooldown >=
			gameTicks - npc.statuses[NAME_MARAUDER].lastUsedTick) {
			var target = candidates.peekRandom();
			var damage = npc.baseDamage;
			dealDamage(npc, damage, target);
			npc.statuses[NAME_MARAUDER].lastUsedTick = gameTicks;
		} else if (npc.statuses[NAME_TECHIE] && npc.statuses[NAME_TECHIE].cooldown >=
			gameTicks - npc.statuses[NAME_TECHIE].lastUsedTick) {
			var spot = getOpenSpot(npc);
			var sentry = MakeNPC(CONSTRUCT_SENTRY_I, spot, [{type:STATUS_STUNNED, ticksRemaining:1, unique:true}])
			sentry.faction = FACTION_SURVIVOR;
			dungeon.npcs.push(sentry);
			dungeon.tiles[sentry.y][sentry.x].entities.push(sentry);
			npc.statuses[NAME_TECHIE].lastUsedTick = gameTicks;
		}
	}

	if (npc.name == NAME_STRANDED_MAN)
		destination = DESTINATION_NONE;

	if (destination != DESTINATION_NONE) {

		var offset = getNextMoveAStar(npc, destination);

		var newPos = {x: npc.x + offset.x, y: npc.y + offset.y};
		var newTile = dungeon.tiles[newPos.y][newPos.x];

		// if we reached our destination via smart moving
		if (newTile.getSolid()) {
			// if there is something in our way thats not friendly, hit it
			var obstruction;
			if (typeof newTile.entities.peek() === 'undefined')
				obstruction = player;
			else
				obstruction = newTile.entities.peek();
			// check if we wanna smac the obstruction
			if (npc.canAttack() && obstruction.obstacle && obstruction.faction != npc.faction)
				npc.attack(obstruction);
		// otherwise do the move
		} else {
			npc.x = newPos.x;
			npc.y = newPos.y;

			var temp = currentTile.entities.pop();
			newTile.entities.push(temp);
		}
	} else {
		// else wander or do something simple
		var offset = MOVE_OPTIONS[Math.floor(Math.random() * MOVE_OPTIONS.length)];
		var newPos = {x: npc.x + offset.x, y: npc.y + offset.y};
		var newTile = dungeon.tiles[newPos.y][newPos.x];
		if (!newTile.getSolid()) {				
			npc.x = newPos.x;
			npc.y = newPos.y;
			newTile.entities.push(currentTile.entities.pop());				
		}
	}
}

function disputeRoom(enemy) {
	var inRoom = dungeon.tiles[enemy.y][enemy.x].inRoom;

	var roomPos = {x: mapXMin + Math.round((enemy.x - (ROOM_CELL_LENGTH - 1)/ 2) / ROOM_CELL_LENGTH), 
			       y: mapYMin + Math.round((enemy.y - (ROOM_CELL_LENGTH - 1)/ 2) / ROOM_CELL_LENGTH)};

	var roomSegment = minimap[roomPos.y][roomPos.x];
	var room = roomLookup[roomSegment.hash];

	if (inRoom && room.isRoom) {

		var existingRoom = false;
		for (var i = disputedRooms.length - 1; i >= 0; i--) {
			existingRoom |= disputedRooms[i].hash == room.hash;
		}

		if (enemy.faction != FACTION_NONE || existingRoom) {
			room.units.push(enemy);
			disputedRooms.refSetAdd(room);
		}
	}
}

function spawn(roomPos, enemyType) {
	var adjustedPos = {x: roomPos.x - mapXMin, y: roomPos.y - mapYMin};
	var wallLength = ROOM_CELL_LENGTH - 2;
	var roomCenter = {x: (ROOM_CELL_LENGTH - 1)/ 2 + (adjustedPos.x * ROOM_CELL_LENGTH), y: (ROOM_CELL_LENGTH - 1)/ 2 + (adjustedPos.y * ROOM_CELL_LENGTH)};
	// northwest corner floorpiece of our current room
	var roomTopLeft = {x: roomCenter.x - (ROOM_CELL_LENGTH - 1)/ 2 + 1, y: roomCenter.y - (ROOM_CELL_LENGTH - 1)/ 2 + 1};
	var innerTopLeft = {x: roomTopLeft.x + 1, y: roomTopLeft.y + 1};
	// var find an open spot in room
	var candidates = [];
	for (var l = wallLength - 3; l >= 0; l--) {
		for (var m = wallLength - 3; m >= 0; m--) {
			if (!dungeon.tiles[innerTopLeft.y + l][innerTopLeft.x + m].getSolid()) {
				candidates.push({x:innerTopLeft.x + m, y:innerTopLeft.y + l});
			}
		}
	}
	var pos = candidates.popRandom();

	// add new enemy of that type to the count
	switch(enemyType) {
		case NAME_ANT: factions[FACTION_ANIMAL].antCount++; break;
		case NAME_DOG: factions[FACTION_ANIMAL].dogCount++; break;
		case NAME_MONKEY: factions[FACTION_ANIMAL].monkeyCount++; break;
		case NAME_GORILLA: factions[FACTION_ANIMAL].gorillaCount++; break;
		case NAME_WANDERER: factions[FACTION_SURVIVOR].wandererCount++; break;
		case NAME_MARAUDER: factions[FACTION_SURVIVOR].marauderCount++; break;
		case NAME_TECHIE: factions[FACTION_SURVIVOR].techieCount++; break;
		case NAME_WAR_BOSS: factions[FACTION_SURVIVOR].warBossCount++; break;
		case NAME_BUG: factions[FACTION_SOFTWARE].bugCount++; break;
		case NAME_GLITCH: factions[FACTION_SOFTWARE].glitchCount++; break;
		case NAME_TROJAN: factions[FACTION_SOFTWARE].trojanCount++; break;
		case NAME_ZERO_DAY: factions[FACTION_SOFTWARE].zeroDayCount++; break;
		case NAME_BUTLER: factions[FACTION_ROBOT].butlerCount++; break;
		case NAME_CHEF: factions[FACTION_ROBOT].chefCount++; break;
		case NAME_MECHANIC: factions[FACTION_ROBOT].mechanicCount++; break;
		case NAME_SECUROTRON: factions[FACTION_ROBOT].securotronCount++; break;
		case NAME_GOO: factions[FACTION_HIVEMIND].gooCount++; break;
	}
	var trojan = false;
	if (enemyType == NAME_TROJAN) {
		trojan = true;
		enemyType = TROJAN_ENEMY_TYPES.peekRandom();
	}
	// if its a glitch, use the 1 of 3 enemy templates
	enemyType = enemyType == NAME_GLITCH ? glitches.peekRandom() : enemyType;
	var enemy = MakeNPC(enemyType, pos, [{type:STATUS_STUNNED, ticksRemaining:1, unique:true}]);
	enemy.trojan = trojan;
	enemy.faction = trojan ? FACTION_SOFTWARE : enemy.faction;
	enemy.ticks = gameTicks;
	dungeon.tiles[pos.y][pos.x].entities.push(enemy);
	dungeon.npcs.push(enemy);
	return enemy;
}

var CHAR_BULLET_VENDOR = '&';
var ENTITY_BULLET_VENDOR = 'bullet_vendor';
var ENTITY_TOTEM = 'deployable';
var ENTITY_GENERATOR_BLOCK = 'generator_block';
var NAME_GENERATOR_BLOCK = 'Generator Wall';
var ENTITY_GENERATOR_CORE = 'generator_core';
var NAME_GENERATOR_CORE = 'Generator Core';
var NAME_EARTH_OBSTACLE = "Earthern Pillar";
var NAME_PLAYER_WALL = "Insta-Wall";
var NAME_SLIME_I = "blooper";
var ENTITY_OBSTACLE = 'obstacle';
var FACTION_OTHER = 'enemy to all';
var FACTION_TEAMLESS = 'teamless';
var DESTINATION_NONE = 'wander';
var ZD_FORM_TANK = 'zd-form-tank';
var ZD_FORM_MOVE = 'zd-form-move';
var ZD_FORM_AREA = 'zd-form-area';
var CHEF_BUFFS = ['Smolder', 'Regen I', 'Stun I'];
var NAME_SPOT = 'spot';
var NAME_MAX = 'max';
var NAME_REX = 'rex';
var DOG_NAMES = ['spot','max', 'rex'];
var RANGE_MELEE = 1.5;
function MakeNPC(type, pos, statuses = []) {
	var entityType = ENTITY_ENEMY;
	var hp = 1;
	var dmg = 0;
	var xp = 0;
	var range = RANGE_MELEE;
	var faction = FACTION_NONE;
	var char;
	var font = FONT_STYLE_DEFAULT;
	var items = [];
	var accuracy = 0;
	var animate = true;
	var obstacle = false;
	var permanentSolid = false;
	var physics = true;
	var loggable = true;
	var description = "";
	switch(type) {
		case NAME_SPOT:
			entityType = ENTITY_COMPANION;
			hp = 100;
			accuracy = .9;
			dmg = 1;
			faction = FACTION_NONE;
			description = "A good boy.";
			char = 'd';
		break;
		case NAME_MAX:
			entityType = ENTITY_COMPANION;
			hp = 100;
			accuracy = .9;
			dmg = 1;
			faction = FACTION_NONE;
			description = "A good boy.";
			char = 'd';
		break;
		case NAME_REX:
			entityType = ENTITY_COMPANION;
			hp = 100;
			accuracy = .9;
			dmg = 1;
			faction = FACTION_NONE;
			description = "A good boy.";
			char = 'd';
		break;
		case NAME_SLIME_I:
			entityType = ENTITY_COMPANION;
			hp = 15 + player.leadership;
			accuracy = .9;
			dmg = 1 + Math.round(player.leadership / 5);
			faction = FACTION_CLONES;
			description = "Can't keep him down.";
			char = 'o';
		break;
		case NAME_MECHANICAL_MERCENARY:
			entityType = ENTITY_COMPANION;
			hp = 30;
			accuracy = .8;
			dmg = 5;
			faction = FACTION_CLONES;
			description = 'Runs on money. Not much other work nowadays.';
			range = 5;
			char = 'E';
		break;
		case NAME_FAMILIAR:
			entityType = ENTITY_COMPANION;
			hp = 5 + player.willpower * 5;
			accuracy = .8;
			dmg = 1 + player.willpower;
			faction = FACTION_CLONES;
			description = "A spectral vestige that resembles your childhood pet.";
			char = 'x';
		break;
		case NAME_INTERN:
			entityType = ENTITY_COMPANION;
			hp = 5 + player.leadership;
			accuracy = .7;
			dmg = 1 + Math.round(player.leadership / 3);
			faction = FACTION_CLONES;
			description = "They'll do anything for " + '"experience"' + " hahaha.";
			char = 'j';
		break;
		case NAME_STAFFER:
			entityType = ENTITY_COMPANION;
			hp = 5 + player.leadership * 2;
			accuracy = .7;
			dmg = 2 + Math.round(player.leadership / 2);
			faction = FACTION_CLONES;
			description = "Ready to die for your cause.";
			char = 's';
		break;
		case NAME_STRATEGIST:
			entityType = ENTITY_COMPANION;
			hp = 10 + player.leadership * 3;
			accuracy = .7;
			dmg = 2 + player.leadership;
			faction = FACTION_CLONES;
			description = "His strategy is often 'hit that guy'.";
			char = 'S';
		break;
		case NAME_CAMPAIGN_MANAGER:
			entityType = ENTITY_COMPANION;
			hp = 15 + player.leadership * 4;
			accuracy = .8;
			dmg = 4 + player.leadership;
			faction = FACTION_CLONES;
			description = "One of the toughest beaurocrats out there.";
			char = 'M';
		break;
		case NAME_GENERATOR_CORE:
			entityType = ENTITY_GENERATOR_CORE;
			hp = 30;
			physics = false;
			animate = false;
			loggable = false;
			char = CHAR_GENERATOR_CORE;
			faction = FACTION_CLONES;
			description = "Ah yes, the core which generates power using some sort of science.";
		break;
		case NAME_GENERATOR_BLOCK:
			entityType = ENTITY_GENERATOR_BLOCK;
			hp = 50;
			physics = false;
			animate = false;
			obstacle = true;
			loggable = false;
			char = CHAR_GENERATOR_BLOCK;
			faction = FACTION_CLONES;
			description = "Solid reinforced metal of some sort.";
		break;
		case NAME_EARTH_OBSTACLE:
			entityType = ENTITY_OBSTACLE;
			font = FONT_STYLE_PILLAR;
			hp = 20;
			physics = false;
			animate = false;
			loggable = false;
			char = CHAR_PILLAR;
			faction = FACTION_OTHER;
			description = "A sudden outcrop.";
		break;
		case NAME_PLAYER_WALL:
			entityType = ENTITY_OBSTACLE;
			hp = 20;
			physics = false;
			animate = false;
			loggable = false;
			char = CHAR_PILLAR;
			font = FONT_STYLE_PILLAR;
			faction = FACTION_OTHER;
			description = "You don't want one of these to unfold in your pocket.";
		break;
		case NAME_NIGHT_GAURD:
			hp = 8 + Math.round(gameTicks/100);
			accuracy = .7;
			dmg = 1 + Math.round(gameTicks/400);
			xp = 3 + Math.round(gameTicks/400);
			char = 'f';
			description = "Its like somebody stapled a nightstick to a pinwheel.";
		break;
		case CONSTRUCT_SENTRY_I:
			entityType = ENTITY_SENTRY;
			hp = 20;
			accuracy = 1;
			range = 8;
			dmg = 2;
			xp = 10;
			faction = FACTION_CLONES;
			char = CHAR_SENTRY;
			description = "A name in home security.";
		break;
		case CONSTRUCT_SENTRY_II:
			entityType = ENTITY_SENTRY;
			hp = 35;
			accuracy = 1;
			range = 8;
			dmg = 3;
			xp = 15;
			faction = FACTION_CLONES;
			char = CHAR_SENTRY;
			description = "A name in home security.";
		break;
		case CONSTRUCT_HEALING_WELL:
			entityType = ENTITY_HEALING_WELL;
			hp = 20;
			range = 5;
			dmg = 3;
			xp = 15;
			faction = FACTION_CLONES;
			char = CHAR_SENTRY;
			description = "Emits a healing aura.";
		break;
		case NAME_ANT:
			hp = 5 + Math.round(gameTicks/100);
			accuracy = .8;
			dmg = 1 + Math.round(gameTicks/400);
			xp = 3 + Math.round(gameTicks/400);
			faction = FACTION_ANIMAL;
			char = 'a';
			description = "An industrious soldier of the animal kingdom.";
		break;
		case NAME_DOG:
			hp = 10 + Math.round(gameTicks/100);
			accuracy = .6;
			dmg = 2 + Math.round(gameTicks/400);
			xp = 8 + Math.round(gameTicks/400);
			faction = FACTION_ANIMAL;
			items.push(MakeItem(NAME_DOG));
			char = 'd';
			description = "Has a sharp bite capable of bleeding targets.";
		break;
		case NAME_MONKEY:
			hp = 10 + Math.round(gameTicks/100);
			accuracy = .6;
			dmg = 2 + Math.round(gameTicks/400);
			xp = 12 + Math.round(gameTicks/400);
			range = 4;
			faction = FACTION_ANIMAL;
			char = 'm';
			description = "Can attack from range. With what-I'd rather not say.";
		break;
		case NAME_GORILLA:
			hp = 25 + Math.round(gameTicks/100);
			accuracy = .6;
			dmg = 5 + Math.round(gameTicks/400);
			xp = 25 + Math.round(gameTicks/400);
			faction = FACTION_ANIMAL;
			items.push(MakeItem(NAME_GORILLA));
			char = 'G';
			description = "A formidable brute. So powerful, his blows can knock you clean off your feet.";
		break;
		case NAME_STRANDED_MAN:
			hp = 20;
			accuracy = .6;
			dmg = 1;
			xp = 25;
			faction = FACTION_SURVIVOR;
			char = 'w';
			description = "God knows how long hes be stranded over there.";
		break;
		case NAME_WANDERER:
			hp = 6 + Math.round(gameTicks/100);
			accuracy = .6;
			dmg = 1 + Math.round(gameTicks/400);
			xp = 4 + Math.round(gameTicks/400);
			faction = FACTION_SURVIVOR;
			char = 'w';
			description = "He's lost, just like you.";
		break;
		case NAME_MARAUDER:
			hp = 14 + Math.round(gameTicks/100);
			accuracy = .7;
			dmg = 3 + Math.round(gameTicks/400);
			xp = 12 + Math.round(gameTicks/400);
			faction = FACTION_SURVIVOR;
			statuses.push({type:NAME_MARAUDER, ticksRemaining:-1, lastUsedTick:0, cooldown:5, unique:true});
			char = 'M';
			description = "With his bolt-action rifle, he has made his home in the ruins of this city.";
		break;
		case NAME_TECHIE:
			hp = 13 + Math.round(gameTicks/100);
			accuracy = .5;
			dmg = 2 + Math.round(gameTicks/400);
			xp = 13 + Math.round(gameTicks/400);
			faction = FACTION_SURVIVOR;
			statuses.push({type:NAME_TECHIE, ticksRemaining:-1, lastUsedTick:0, cooldown:25, unique:true});
			char = 'C';
			description = "Grungy and resourceful-this unit can create devices to aid in combat.";
		break;
		case NAME_WAR_BOSS:
			hp = 18 + Math.round(gameTicks/100);
			accuracy = .8;
			dmg = 5 + Math.round(gameTicks/400);
			xp = 28 + Math.round(gameTicks/400);
			faction = FACTION_SURVIVOR;
			char = 'W';
			description = "A WarBoss always fights with a posse of his most devout.";
		break;
		case NAME_LACKEY:
			hp = 8 + Math.round(gameTicks/100);
			accuracy = .7;
			dmg = 2 + Math.round(gameTicks/400);
			xp = 10 + Math.round(gameTicks/400);
			faction = FACTION_SURVIVOR;
			char = 'l';
			description = "A lackey feels the need to impress his WarBoss with an offering after each kill.";
		break;
		case NAME_GIANT_RAT:
			hp = 20;
			accuracy = 1;
			dmg = 2;
			xp = 20;
			char = 'r';
			description = "Its a rougelike, what do you want";
		break;
		case NAME_RAT:
			hp = 14 + Math.round(gameTicks/100);
			accuracy = .7;
			dmg = 2 + Math.round(gameTicks/400);
			xp = 8 + Math.round(gameTicks/400);
			char = 'r';
			description = "Its a rougelike, what do you want";
		break;
		case NAME_TRASH_BOT:
			hp = 20 + Math.round(gameTicks/100);
			accuracy = .7;
			dmg = 1 + Math.round(gameTicks/400);
			xp = 6 + Math.round(gameTicks/400);
			items.push(MakeItem(NAME_TRASH_BOT));
			char = 't';
			description = "He's going to DUMPSTER you.";
		break;
		case NAME_WEED:
			hp = 20 + Math.round(gameTicks/100);
			accuracy = .5;
			dmg = 3 + Math.round(gameTicks/400);
			xp = 14 + Math.round(gameTicks/400);
			char = 'w';
			description = "A little overgrown horror with a thirst for blood.";
		break;
		case NAME_TYPO:
			hp = 10 + Math.round(gameTicks/100);
			accuracy = .4;
			dmg = 3 + Math.round(gameTicks/400);
			xp = 6 + Math.round(gameTicks/400);
			char = 'y';
			description = "A malicious mistake of little consequence.";
		break;
		case NAME_BUG:
			hp = 3 + Math.round(gameTicks/100);
			accuracy = .6;
			dmg = 1 + Math.round(gameTicks/400);
			xp = 2 + Math.round(gameTicks/400);
			faction = FACTION_SOFTWARE;
			char = 'b';
			description = "Not of the insect sort, these have a habit of reinventing themselves after being fixed.";
		break;
		case NAME_GLITCH_1:
			type = NAME_GLITCH;
			hp = 5 + Math.round(gameTicks/100);
			accuracy = .8;
			dmg = 5 + Math.round(gameTicks/400);
			xp = 8 + Math.round(gameTicks/400);
			faction = FACTION_SOFTWARE;
			char = 'g';
			description = "Something's wrong, are these units supposed to hit hard, move around, or be tanky?";
		break;
		case NAME_GLITCH_2:
			type = NAME_GLITCH;
			hp = 8 + Math.round(gameTicks/100);
			accuracy = .7;
			dmg = 3 + Math.round(gameTicks/400);
			xp = 8 + Math.round(gameTicks/400);
			faction = FACTION_SOFTWARE;
			statuses.push({type:SKILL_BLINK_I, ticksRemaining:-1, lastUsedTick:0, cooldown:20, unique:true});
			char = 'g';
			description = "Something's wrong, are these units supposed to hit hard, move around, or be tanky?";
		break;
		case NAME_GLITCH_3:
			type = NAME_GLITCH;
			hp = 15 + Math.round(gameTicks/50);
			accuracy = .7;
			dmg = 2 + Math.round(gameTicks/400);
			xp = 8 + Math.round(gameTicks/400);
			faction = FACTION_SOFTWARE;
			char = 'g';
			description = "Something's wrong, are these units supposed to hit hard, move around, or be tanky?";
		break;
		case NAME_TROJAN:
			hp = 7 + Math.round(gameTicks/100);
			accuracy = .7;
			dmg = 2 + Math.round(gameTicks/400);
			xp = 5 + Math.round(gameTicks/400);
			faction = FACTION_SOFTWARE;
			description = "After the host is slain, the Trojan has little to prevent its own annihilation.";
			char = 'j';
		break;
		case NAME_ZERO_DAY:
			hp = 15 + Math.round(gameTicks/100);
			accuracy = .7;
			dmg = 4 + Math.round(gameTicks/400);
			xp = 20 + Math.round(gameTicks/400);
			faction = FACTION_SOFTWARE;
			statuses.push({type:NAME_ZERO_DAY, ticksRemaining:-1, lastUsedTick:0, cooldown:5, unique:true});
			description = "";
			char = 'Z';
			description = "A ZeroDay can exploit the vulnerabilities of the user it is attacking.";
		break;
		case NAME_BUTLER:
			hp = 5 + Math.round(gameTicks/100);
			accuracy = .7;
			dmg = 1 + Math.round(gameTicks/400);
			xp = 6 + Math.round(gameTicks/400);
			faction = FACTION_ROBOT;
			items.push(MakeItem(NAME_BUTLER));
			char = 'n';
			description = "A cheaply built, powered unit which has a tendency to discharge when striking.";
		break;
		case NAME_CHEF:
			hp = 8 + Math.round(gameTicks/100);
			accuracy = .8;
			dmg = 2 + Math.round(gameTicks/400);
			xp = 10 + Math.round(gameTicks/400);
			faction = FACTION_ROBOT;
			statuses.push({type:NAME_CHEF, ticksRemaining:-1, lastUsedTick:0, cooldown:10, unique:true});
			char = 'c';
			description = "These culinary scavengers can whip up powerful buffs for their nearby allies.";
		break;
		case NAME_MECHANIC:
			hp = 12 + Math.round(gameTicks/100);
			accuracy = .7;
			dmg = 4 + Math.round(gameTicks/400);
			xp = 14 + Math.round(gameTicks/400);
			faction = FACTION_ROBOT;
			statuses.push({type:NAME_MECHANIC, ticksRemaining:-1, lastUsedTick:0, cooldown:10, unique:true});
			char = 'm';
			description = "With wrenches for arms, these guys are adept at fixing up any mechanical damage.";
		break;
		case NAME_SECUROTRON:
			hp = 20 + Math.round(gameTicks/100);
			accuracy = .8;
			dmg = 5 + Math.round(gameTicks/400);
			xp = 30 + Math.round(gameTicks/400);
			faction = FACTION_ROBOT;
			statuses.push({type:NAME_SECUROTRON, ticksRemaining:-1, unique:true});
			char = 'S';
			description = "Top of the line murderbot. It's mounted sentry runs off internal power.";
		break;
		case NAME_GOO:
			hp = 5 + Math.round(gameTicks/100);
			accuracy = .9;
			dmg = 1 + Math.round(gameTicks/400);
			xp = 7 + Math.round(gameTicks/400);
			faction = FACTION_HIVEMIND;
			char = 'o';
			description = "The crime rates in hivemind towns are astonishingly low.";
			statuses.push({type:SKILL_REGEN_I, ticksRemaining:-1, unique:false});
		break;
		case NAME_ATM:
			char = CHAR_ATM;
			entityType = ENTITY_ATM;
			loggable = true;
			hp = 30;
			animate = false;
			physics = false;
			faction = FACTION_NONE;
			permanentSolid = true;
		break;
		case SYMBOL_BULLET_VENDOR:
			char = CHAR_BULLET_VENDOR;
			entityType = ENTITY_BULLET_VENDOR;
			loggable = true;
			hp = Math.round(Math.random() * 5 + 5);
			animate = false;
			physics = false;
			faction = FACTION_NONE;
			permanentSolid = true;
		break;
	}
	return new NPC(entityType, pos, type, hp, dmg, accuracy, xp, range,
	animate, physics, obstacle, permanentSolid, char, font, faction, 
	loggable, statuses, items, description);
}

function getNearbyEnemies(unit, range) {
	var results = [];
	var pos = {x: unit.x, y:unit.y};
	for (var i = dungeon.npcs.length - 1; i >= 0; i--) {
		var npc = dungeon.npcs[i];
		var distance = Math.sqrt(Math.pow((npc.x - pos.x), 2) + Math.pow((npc.y - pos.y), 2));
		if (distance <= range && unit.faction != npc.faction)
			results.push(npc);
	}
	return results;
}

function getNearbyAllies(unit, range) {
	var results = [];
	var pos = {x: unit.x, y:unit.y};
	for (var i = dungeon.npcs.length - 1; i >= 0; i--) {
		var npc = dungeon.npcs[i];
		var distance = Math.sqrt(Math.pow((npc.x - pos.x), 2) + Math.pow((npc.y - pos.y), 2));
		if (distance <= range && unit.faction == npc.faction)
			results.push(npc);
	}
	return results;
}
function getNearbyUnitsInSight(unit) {
	var results = [];
	var tempResults = [];
	var pos = {x: unit.x, y:unit.y};
	for (var i = dungeon.npcs.length - 1; i >= 0; i--) {
		var npc = dungeon.npcs[i];
		var distance = Math.sqrt(Math.pow((npc.x - pos.x), 2) + Math.pow((npc.y - pos.y), 2));
		if (distance <= unit.range && unit.faction != npc.faction)
			tempResults.push(npc);
	}

	if (Math.sqrt(Math.pow(unit.x - player.x, 2) + Math.pow(unit.y - player.y, 2)) <= unit.range && player.faction != unit.faction)
		tempResults.push(player);

	for (var i = tempResults.length - 1; i >= 0; i--) {
		var dest = tempResults[i];
		// see if you can route to it
		if (traceLine(pos, dest, dungeon.tiles))
			results.push(tempResults[i]);
	}

	return results;
}