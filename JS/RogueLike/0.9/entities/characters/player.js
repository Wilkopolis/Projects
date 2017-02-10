var ENTITY_PLAYER = 'player';
function Character (occupation, background) {
	this.type = ENTITY_PLAYER;
	this.x = 0;
	this.y = 0;
	this.animate = true;
	// true to work with enemies trying to move through us
	// will change if we find a more proper arrangement
	this.obstacle = true;
	this.solid = true;
	this.permanentSolid = false;
	this.simulatesPhysics = true;
	// for the enemy log
	this.loggable = false;
	this.opaque = false;
	
	// the auto-fight radius
	this.range = SIGHT_DISTANCE;

	// damage
	this.strength = background.strength;
	// magic damage
	this.willpower = background.willpower;
	// hp
	this.constitution = background.constitution;
	// crit for now
	this.perception = background.perception;
	// unit performance, capture rate
	this.leadership = background.leadership;

	this.hp = 20 + this.constitution;
	this.hpMax = 20 + this.constitution;
	this.shieldHP = 0;
	this.shieldMax = 0;
	this.xp = 0;
	this.name = 'Wilko';
	this.level = 1;
	this.skillPoints = 100;
	this.attributePoints = 0;
	this.lastLevelXp = 0;
	this.nextLevelXp = 20;

	this.baseDef = 0;

	this.baseCritChance = .05;
	this.attackStyles = ATTACK_STYLES;

	this.faction = FACTION_CLONES;

	this.head = ITEM_NONE;
	this.modules = [];
	this.maxModules = 3;
	this.wielded = [];
	this.armCount = 2;
	this.armsUsed = 0;
	this.accessories = [];
	this.maxAccessories = 1;

	this.lastCombatTick = 0;

	this.class = occupation;

	this.skills = new Skills(occupation);
	this.inventory = new Inventory();
	this.statuses = {};
	this.commonStatuses = [];

	// for items that are passive but have a cooldown still
	this.cooldowns = [];

	// some initial soldier stuff
	if (this.class == CLASS_PHARMACIST)
		this.skills.skillObject[SKILL_PILL_SEEKER].purchased = true;
	else if (occupation.name == CLASS_SOLDIER) {
		player.strength++;
		player.perception++;
	}

	// for SKILL_MICROWAVE_I
	this.target = null;

	// for various companion stuff
	this.allies = [];

	this.arm = function(loadout) {
		for (var i = loadout.length - 1; i >= 0; i--) {
			var item = loadout[i];
			switch(item.slot) {
				case SLOT_WIELDABLE:
					var armsNeeded = item.handCount;
					if (this.armsUsed + armsNeeded <= this.armCount) {
						this.wielded.push(item);
						item.equip(this);
						this.armsUsed += armsNeeded;
					}
				break;
				case SLOT_HEAD:
					if (this.head == ITEM_NONE) {
						this.head = item;
						item.equip(this);
					}
				break;
				case SLOT_MODULE:
					if (this.modules.length < this.maxModules) {
						this.modules.push(item);
						item.equip(this);
					}
				break;
				case SLOT_ACCESSORY:
					if (this.accessories.length < this.maxAccessories) {
						this.accessories.push(item);
						item.equip(this);
					}
				break;
				default:break;
			}
			this.inventory.push(item);
		}
	}

	this.attack = function(enemy, double_strike = false) {

		var damage = this.getDmg();

		// we missed
		if (damage == 0)
			return;		

		// apply any onhit effects

		// money shot
		if (this.skills.skillObject[SKILL_MONEY_SHOT].on) {
			var spent = Math.round(factions[FACTION_CLONES].wealth * .04);
			factions[FACTION_CLONES].wealth -= spent;
			damage += Math.round(spent * 1.5);
		}

		// full attack the primary
		dealDamage(this, damage, enemy);

		// knockback
		if (Math.random() <= this.getKnockBackChance()) {
			// calculate end point
			var dx = enemy.x - player.x;
			var dy = enemy.y - player.y;
			// find the radius endpoint
			var magnitude = Math.sqrt(dx*dx + dy*dy);
			var power = magnitude > 1 ? 2 : 3;
			var endpoint = {x: Math.round(enemy.x + dx * power), y: Math.round(enemy.y + dy * power)};
			var adjustedEndpoint = getLastUnobstructedTile(enemy, endpoint, dungeon.tiles);
			// do the move
			var currentTile = dungeon.tiles[enemy.y][enemy.x];
			var newTile = dungeon.tiles[adjustedEndpoint.y][adjustedEndpoint.x];

			currentTile.entities.remove(enemy);
			enemy.x = adjustedEndpoint.x;
			enemy.y = adjustedEndpoint.y;
			newTile.entities.push(enemy);
				
			enemy.addStatus({type:STATUS_STUNNED, ticksRemaining:1, unique:true});
		}

		// bleeding
		if (Math.random() <= this.getBleedChance()) {
			enemy.addStatus({type:STATUS_BLEEDING, ticksRemaining:3, originator:this, unique:true});
		}

		// disarm - damage debuff
		if (this.skills.skillObject[SKILL_DISARM].purchased && Math.random() < .3)
			enemy.addStatus({type:STATUS_DISARMED, ticksRemaining:3, unique:true});

		if (this.statuses[EFFECT_GREED_I]) {
			var greedCount = this.statuses[EFFECT_GREED_I].count;
			factions[FACTION_CLONES].wealth += Math.floor(damage * greedCount / 3);
		}
		
		if (this.skills.skillObject[SKILL_DIVIDENDS].purchased) {
			factions[FACTION_CLONES].wealth += Math.floor(damage / 3);
		}

		// check for stun
		if (enemy.animate && Math.random() <= this.getStunChance())
			enemy.addStatus({type:STATUS_STUNNED, ticksRemaining:1, unique:true});

		// apply swing attack style
		if (this.getSwingLvl() >= 7) {
			// x x x
			// x @ x
			// x x x
			var ntile = dungeon.tiles[player.y - 1][player.x];
			var netile = dungeon.tiles[player.y - 1][player.x + 1];
			var etile = dungeon.tiles[player.y][player.x + 1];
			var setile = dungeon.tiles[player.y + 1][player.x + 1];
			var stile = dungeon.tiles[player.y + 1][player.x];
			var swtile = dungeon.tiles[player.y + 1][player.x - 1];
			var wtile = dungeon.tiles[player.y][player.x - 1];
			var nwtile = dungeon.tiles[player.y - 1][player.x - 1];

			var proRatedDmg = Math.round(damage * this.getSwingLvl() / 10);
			if (ntile.hasEnemy()) {
				dealDamage(this, proRatedDmg, ntile.getEnemy());
			}
			if (netile.hasEnemy()) {
				dealDamage(this, proRatedDmg, netile.getEnemy());
			}
			if (etile.hasEnemy()) {
				dealDamage(this, proRatedDmg, etile.getEnemy());
			}
			if (setile.hasEnemy()) {
				dealDamage(this, proRatedDmg, setile.getEnemy());
			}
			if (stile.hasEnemy()) {
				dealDamage(this, proRatedDmg, stile.getEnemy());
			}
			if (swtile.hasEnemy()) {
				dealDamage(this, proRatedDmg, swtile.getEnemy());
			}
			if (wtile.hasEnemy()) {
				dealDamage(this, proRatedDmg, wtile.getEnemy());
			}
			if (nwtile.hasEnemy()) {
				dealDamage(this, proRatedDmg, nwtile.getEnemy());
			}
		} else if (this.getSwingLvl() >= 3) {
			var dx = enemy.x - player.x;
			var dy = enemy.y - player.y;
			// e x x
			// x @ 
			// x
			if (dx == -1 && dy == -1) {
				var leftTile = dungeon.tiles[enemy.y + 1][enemy.x];
				var rightTile = dungeon.tiles[enemy.y][enemy.x + 1];
				var bleftTile = dungeon.tiles[enemy.y + 2][enemy.x];
				var brightTile = dungeon.tiles[enemy.y][enemy.x + 2];
			// x e x
			// x @ x		
			} else if (dx == 0 && dy == -1) {
				var leftTile = dungeon.tiles[enemy.y][enemy.x - 1];
				var rightTile = dungeon.tiles[enemy.y][enemy.x + 1];
				var bleftTile = dungeon.tiles[enemy.y - 1][enemy.x - 1];
				var brightTile = dungeon.tiles[enemy.y - 1][enemy.x + 1];				
			// x x e
			//   @ x
			//     x				
			} else if (dx == 1 && dy == -1) {
				var leftTile = dungeon.tiles[enemy.y][enemy.x - 1];
				var rightTile = dungeon.tiles[enemy.y + 1][enemy.x];
				var bleftTile = dungeon.tiles[enemy.y][enemy.x - 2];
				var brightTile = dungeon.tiles[enemy.y + 2][enemy.x];				
			//   x x
			//   @ e
			//   x x				
			} else if (dx == 1 && dy == 0) {
				var leftTile = dungeon.tiles[enemy.y - 1][enemy.x];
				var rightTile = dungeon.tiles[enemy.y + 1][enemy.x];
				var bleftTile = dungeon.tiles[enemy.y - 1][enemy.x - 1];
				var brightTile = dungeon.tiles[enemy.y + 1][enemy.x - 1];
			//     x
			//   @ x
			// x x e				
			} else if (dx == 1 && dy == 1) {
				var leftTile = dungeon.tiles[enemy.y - 1][enemy.x];
				var rightTile = dungeon.tiles[enemy.y][enemy.x - 1];
				var bleftTile = dungeon.tiles[enemy.y - 2][enemy.x];
				var brightTile = dungeon.tiles[enemy.y][enemy.x - 2];				
			// x @ x
			// x e x				
			} else if (dx == 0 && dy == 1) {
				var leftTile = dungeon.tiles[enemy.y][enemy.x + 1];
				var rightTile = dungeon.tiles[enemy.y][enemy.x - 1];
				var bleftTile = dungeon.tiles[enemy.y - 1][enemy.x + 1];
				var brightTile = dungeon.tiles[enemy.y - 1][enemy.x - 1];
			// x
			// x @  
			// e x x
			} else if (dx == -1 && dy == 1) {
				var leftTile = dungeon.tiles[enemy.y - 1][enemy.x];
				var rightTile = dungeon.tiles[enemy.y][enemy.x + 1];
				var bleftTile = dungeon.tiles[enemy.y - 2][enemy.x];
				var brightTile = dungeon.tiles[enemy.y][enemy.x + 2];
			// x x 
			// e @ 
			// x x 				
			} else if (dx == -1 && dy == 0) {
				var leftTile = dungeon.tiles[enemy.y - 1][enemy.x];
				var rightTile = dungeon.tiles[enemy.y + 1][enemy.x];
				var bleftTile = dungeon.tiles[enemy.y - 1][enemy.x + 1];
				var brightTile = dungeon.tiles[enemy.y + 1][enemy.x + 1];			
			}

			var proRatedDmg = Math.round(damage * this.getSwingLvl() / 7);
			if (leftTile.hasEnemy()) {
				dealDamage(this, proRatedDmg, leftTile.getEnemy());
			}
			if (rightTile.hasEnemy()) {
				dealDamage(this, proRatedDmg, rightTile.getEnemy());
			}
			if (bleftTile.hasEnemy()) {
				dealDamage(this, proRatedDmg, bleftTile.getEnemy());
			}
			if (brightTile.hasEnemy()) {
				dealDamage(this, proRatedDmg, brightTile.getEnemy());
			}
		} else if (this.getSwingLvl() >= 1) {
			var dx = enemy.x - player.x;
			var dy = enemy.y - player.y;
			// e x
			// x @ 
			if (dx == -1 && dy == -1) {
				var leftTile = dungeon.tiles[enemy.y + 1][enemy.x];
				var rightTile = dungeon.tiles[enemy.y][enemy.x + 1];
			// x e x
			//   @			
			} else if (dx == 0 && dy == -1) {
				var leftTile = dungeon.tiles[enemy.y][enemy.x - 1];
				var rightTile = dungeon.tiles[enemy.y][enemy.x + 1];				
			//   x e
			//   @ x				
			} else if (dx == 1 && dy == -1) {
				var leftTile = dungeon.tiles[enemy.y][enemy.x - 1];
				var rightTile = dungeon.tiles[enemy.y + 1][enemy.x];				
			//     x
			//   @ e
			//     x				
			} else if (dx == 1 && dy == 0) {
				var leftTile = dungeon.tiles[enemy.y - 1][enemy.x];
				var rightTile = dungeon.tiles[enemy.y + 1][enemy.x];				
			//   @ x
			//   x e				
			} else if (dx == 1 && dy == 1) {
				var leftTile = dungeon.tiles[enemy.y - 1][enemy.x];
				var rightTile = dungeon.tiles[enemy.y][enemy.x - 1];				
			//   @  
			// x e x				
			} else if (dx == 0 && dy == 1) {
				var leftTile = dungeon.tiles[enemy.y][enemy.x + 1];
				var rightTile = dungeon.tiles[enemy.y][enemy.x - 1];				
			// x @  
			// e x  				
			} else if (dx == -1 && dy == 1) {
				var leftTile = dungeon.tiles[enemy.y - 1][enemy.x];
				var rightTile = dungeon.tiles[enemy.y][enemy.x + 1];				
			// x   
			// e @ 
			// x   				
			} else if (dx == -1 && dy == 0) {
				var leftTile = dungeon.tiles[enemy.y - 1][enemy.x];
				var rightTile = dungeon.tiles[enemy.y + 1][enemy.x];			
			}

			var proRatedDmg = Math.round(damage * this.getSwingLvl() / 3);
			if (leftTile.hasEnemy()) {
				dealDamage(this, proRatedDmg, leftTile.getEnemy());
			}
			if (rightTile.hasEnemy()) {
				dealDamage(this, proRatedDmg, rightTile.getEnemy());
			}
		}

		// apply double strike attack style
		random = Math.random();
		if (!double_strike && random <= this.getDoubleStrikeChance()) {
			this.attack(enemy, true);
			log.add("You strike the " + enemy.name + " twice!");
		}
	}

	this.isStunned = function() {
		return this.statuses[STATUS_STUNNED];
	}

	// called at the end of turn
	this.applyStatuses = function() {

		// skill regen
		if (this.skills.skillObject[SKILL_REGEN_II].purchased)
			this.hp = Math.min(this.hp + 8, this.hpMax);
		else if (this.skills.skillObject[SKILL_REGEN_II].purchased)
			this.hp = Math.min(this.hp + 4, this.hpMax);
		else if (this.skills.skillObject[SKILL_REGEN_II].purchased)
			this.hp = Math.min(this.hp + 2, this.hpMax);
		else if (this.skills.skillObject[SKILL_REGEN_I].purchased && this.skills.skillObject[SKILL_REGEN_I].canBeUsed())
			this.hp = Math.min(this.hp + 2, this.hpMax);

		if (this.statuses[SKILL_VICTORY_SPEECH]) {
			for (var i = this.allies.length - 1; i >= 0; i--) {
				this.allies[i].hp = Math.min(this.allies[i].hp + Math.round(this.leadership/3), this.allies[i].hpMax);
			}
		}

		if (this.statuses[ENTITY_BANK_TRIPWIRE]) {
			// add first enemy
			var location = getOpenSpot(this.statuses[ENTITY_BANK_TRIPWIRE].spawner);
			var enemy = MakeNPC(NAME_NIGHT_GAURD, {x:location.x, y:location.y}, [{type:STATUS_STUNNED, ticksRemaining:1}]);
			dungeon.tiles[enemy.y][enemy.x].entities.push(enemy);
			dungeon.npcs.push(enemy);
			// add second enemy
			location = getOpenSpot(this.statuses[ENTITY_BANK_TRIPWIRE].spawner);
			var enemy2 = MakeNPC(NAME_NIGHT_GAURD, {x:location.x, y:location.y}, [{type:STATUS_STUNNED, ticksRemaining:1}]);
			dungeon.tiles[enemy2.y][enemy2.x].entities.push(enemy2);
			dungeon.npcs.push(enemy2);
		}

		if (this.statuses[SKILL_WE_THE_PEOPLE]) {
			var enemies = getEnemiesInRadius(player, 10);
			for (var i = enemies.length - 1; i >= 0; i--) {
				var enemy = enemies[i];
				if (enemy.faction != player.faction) {
					dealDamage(player, Math.round(player.leadership / 3), enemy);
				}
			}
		}

		if (this.statuses[STATUS_BLEEDING]) {
			// bleeding does 5% of maxHP per turn				
			var bleeding_dmg = Math.max(Math.round(this.hpMax * .1), 1);
			// deal it as true damage
			this.hp -= bleeding_dmg;
			if (this.hp <= 0) {
				this.kill(this.statuses[STATUS_BLEEDING].originator);
			}
		}

		// apply each common status
		for (var i = this.commonStatuses.length - 1; i >= 0; i--) {
			var status = this.commonStatuses[i];
			switch(status.type) {
				case EFFECT_REGEN_I:
					this.hp = Math.min(this.hp + 1, this.hpMax);
				break;
				case EFFECT_REGEN_II:
					this.hp = Math.min(this.hp + 2, this.hpMax);
				break;
				case EFFECT_DEGEN_I:
					this.hp -= 1;
				break;
				case EFFECT_DEGEN_II:
					this.hp -= 2;
				break;
			}
		}

		// remove any expired statuses
		var keys = Object.keys(this.statuses);
		for (var i = 0; i < keys.length; i++) {
			var status = this.statuses[keys[i]];

			// don't decrease the end statuses here
			if (status.endStatus)
				continue;

			if (status.ticksRemaining == 0) {
				switch (status.type) {
					case STATUS_SHIELDED:
						this.shieldHP = 0;
						this.shieldMax = 0;
					break;
					case EFFECT_DEF_I:
						this.baseDef -= 1;
					break;
					case EFFECT_DEF_II:
						this.baseDef -= 2;
					break;
					case EFFECT_DEF_III:
						this.baseDef -= 3;
					break;
					case EFFECT_DEF_I_N:
						this.baseDef += 1;
					break;
					case EFFECT_DEF_II_N:
						this.baseDef += 2;
					break;
					case EFFECT_DEF_III_N:
						this.baseDef += 3;
					break;
					case EFFECT_CONSTITUTION_I:
						this.constitution -= 1;
					break;
					case EFFECT_CONSTITUTION_II:
						this.constitution -= 2;
					break;
					case EFFECT_STRENGTH_I:
						this.strength -= 1;
					break;
					case EFFECT_STRENGTH_II:
						this.strength -= 2;
					break;
					case EFFECT_WILLPOWER_I:
						this.willpower -= 1;
					break;
					case EFFECT_WILLPOWER_II:
						this.willpower -= 2;
					break;
					case EFFECT_PERCEPTION_I:
						this.perception -= 1;
					break;
					case EFFECT_PERCEPTION_II:
						this.perception -= 2;
					break;
					case EFFECT_LEADERSHIP_I:
						this.leadership -= 1;
					break;
					case EFFECT_LEADERSHIP_II:
						this.leadership -= 2;
					break;
					case EFFECT_CONSTITUTION_I_N:
						this.constitution += 1;
					break;
					case EFFECT_CONSTITUTION_II_N:
						this.constitution += 2;
					break;
					case EFFECT_STRENGTH_I_N:
						this.strength += 1;
					break;
					case EFFECT_STRENGTH_II_N:
						this.strength += 2;
					break;
					case EFFECT_WILLPOWER_I_N:
						this.willpower += 1;
					break;
					case EFFECT_WILLPOWER_II_N:
						this.willpower += 2;
					break;
					case EFFECT_PERCEPTION_I_N:
						this.perception += 1;
					break;
					case EFFECT_PERCEPTION_II_N:
						this.perception += 2;
					break;
					case EFFECT_LEADERSHIP_I_N:
						this.leadership += 1;
					break;
					case EFFECT_LEADERSHIP_II_N:
						this.leadership += 2;
					break;
					case EFFECT_CLOSE_I:
						this.attackStyles[ATTACK_STYLE_CLOSE].lvl -= 1;
					break;
					case EFFECT_CLOSE_II:
						this.attackStyles[ATTACK_STYLE_CLOSE].lvl -= 2;
					break;
					case EFFECT_CLOSE_III:
						this.attackStyles[ATTACK_STYLE_CLOSE].lvl -= 3;
					break;
					case EFFECT_SWING_I:
						this.attackStyles[ATTACK_STYLE_SWING].lvl -= 1;
					break;
					case EFFECT_SWING_II:
						this.attackStyles[ATTACK_STYLE_SWING].lvl -= 2;
					break;
					case EFFECT_SWING_III:
						this.attackStyles[ATTACK_STYLE_SWING].lvl -= 3;
					break;
					case EFFECT_POKE_I:
						this.attackStyles[ATTACK_STYLE_POKE].lvl -= 1;
					break;
					case EFFECT_POKE_II:
						this.attackStyles[ATTACK_STYLE_POKE].lvl -= 2;
					break;
					case EFFECT_POKE_III:
						this.attackStyles[ATTACK_STYLE_POKE].lvl -= 3;
					break;
					case EFFECT_DEFENSIVE_I:
						this.attackStyles[ATTACK_STYLE_DEFENSIVE].lvl -= 1;
					break;
					case EFFECT_DEFENSIVE_II:
						this.attackStyles[ATTACK_STYLE_DEFENSIVE].lvl -= 2;
					break;
					case EFFECT_DEFENSIVE_III:
						this.attackStyles[ATTACK_STYLE_DEFENSIVE].lvl -= 3;
					break;
				}

				this.statuses[status.type].count--;
				if (this.statuses[status.type].count == 0) {
					if (!status.unique) {
						for (var j = this.commonStatuses.length - 1; j >= 0; j--) {
							if (this.commonStatuses[j].type == status.type)
								this.commonStatuses.splice(j, 1);
						}
					}
					delete this.statuses[status.type];
				}
			} else
				status.ticksRemaining--;
		}

		if (player.hp <= 0)
			player.kill();
	}

	this.applyEndStatuses = function() {

		// trace microwave from player to target,
		// stopping on first solid
		if (this.statuses[SKILL_MICROWAVE_I])
			layMicrowaveI(player, player.target, dungeon.tiles);

		// trace microwave from player to target,
		// stopping at destination only or permanent solid
		if (this.statuses[SKILL_MICROWAVE_II])
			layMicrowaveII(player, player.target, dungeon.tiles);

		// trace microwave from player to target,
		// stopping permanent solid
		if (this.statuses[SKILL_MICROWAVE_III])
			layMicrowaveIII(player, player.target, dungeon.tiles);

		var keys = Object.keys(this.statuses);
		for (var i = 0; i < keys.length; i++) {

			var status = this.statuses[keys[i]];

			// decrease the end statuses here
			if (!status.endStatus)
				continue;

			if (status.ticksRemaining == 0) {				
				switch (status.type) {
					case SKILL_MICROWAVE_I:
					player.target = null;
					break;
					case SKILL_MICROWAVE_II:
					player.target = null;
					break;
					case SKILL_MICROWAVE_III:
					player.target = null;
					break;
				}
				delete this.statuses[status.type];
			} else
				status.ticksRemaining--;
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
			this.statuses[status.type].count = 1;
			this.commonStatuses.push(status);
		} else {
			this.statuses[status.type] = status;
			this.statuses[status.type].count = 1;
		}
	}

	this.removeStatus = function(type) {
		var status = this.statuses[type];
		if (status != null) {

			// if its common, remove one of them
			if (!status.unique) {
				for (var i = this.commonStatuses.length - 1; i >= 0; i--) {
					if (this.commonStatuses[i].type == type) {
						this.commonStatuses.splice(i,1);
						break;
					}
				}
			}

			// remove the status, if its our last one
			// remove the status entirely
			if (this.statuses[type].count > 1)
				this.statuses[type].count--;
			else				
				delete this.statuses[type];

		}
	}
	
	this.checkCooldowns = function() {
		for (var i = this.cooldowns.length - 1; i >= 0; i--) {
			var item = this.cooldowns[i];
			for (var i = item.effects.length - 1; i >= 0; i--) {
				var effect = item.effects[i];
				switch (effect) {
					case EFFECT_SLIME_COMPANION_I:
						if (item.lastUsedTick <= gameTicks - item.cooldown) {
							var slime = MakeNPC(NAME_SLIME_I, getOpenSpot({x:this.x, y:this.y}));
							slime.destination = this;
							slime.parent = item;
							dungeon.npcs.push(slime);
							dungeon.tiles[slime.y][slime.x].entities.push(slime);
							this.allies.push(slime);
							this.cooldowns.splice(i,1);
						}
					break;
				}
			}
		}
	}

	this.getDmg = function() {

		// get the damage from equipped items
		var maxDamage = this.strength;		
		var accuracy = this.perception / 12.5;
		// modify accuracy
		for (var i = this.wielded.length - 1; i >= 0; i--) {
			maxDamage += this.wielded[i].damage / this.wielded.length;
			accuracy += this.wielded[i].accuracy / this.wielded.length;
		}

		// hit chance
		if (Math.random() > accuracy)
			return 0;

		if (this.skills.skillObject[SKILL_ELECTORAL_COLLEGE].purchased)
			maxDamage += factions[FACTION_CLONES].roomsCaptured / 2;

		if (this.skills.skillObject[SKILL_PEOPLES_CHAMPION].purchased)
			maxDamage += player.allies.length;

		// crit!
		if (Math.random() <= this.getCritChance()) {
			maxDamage = maxDamage * this.getCritDamageModifier();
			damage = Math.max(1, Math.round(maxDamage * Math.min(Math.random() + .5, 1)));
		}
		else
			damage = Math.max(1, Math.round(maxDamage * Math.random()));

		var room = dungeon.getRoom();
		if ((room.powered && (room.faction == this.faction || room.faction == FACTION_NONE)) ||
			 this.skills.skillObject[SKILL_OFF_THE_GRID].purchased) {
			return Math.round(damage * 1.5);
		}
		else
			return damage;
	}

	this.takeDamage = function(amount, attacker) {

		// apply any thorns, deal damage to attacker proportionate
		// to the original damage (if physical do thorns around you)
		if (this.skills.skillObject[SKILL_THORNS_II].purchased) {

			// deal damage to all adjacent enemies
			var thornsDamage = Math.max(Math.round(amount * .1), 2);

			// x x x
			// x @ x
			// x x x
			var ntile = dungeon.tiles[player.y - 1][player.x];
			var netile = dungeon.tiles[player.y - 1][player.x + 1];
			var etile = dungeon.tiles[player.y][player.x + 1];
			var setile = dungeon.tiles[player.y + 1][player.x + 1];
			var stile = dungeon.tiles[player.y + 1][player.x];
			var swtile = dungeon.tiles[player.y + 1][player.x - 1];
			var wtile = dungeon.tiles[player.y][player.x - 1];
			var nwtile = dungeon.tiles[player.y - 1][player.x - 1];
			if (ntile.hasEnemy()) {
				var enemy = ntile.entities.peek();
				enemy.hp -= thornsDamage;
				if (enemy.hp <= 0)
					enemy.kill(this);
			}
			if (netile.hasEnemy()) {
				var enemy = netile.entities.peek();
				enemy.hp -= thornsDamage;
				if (enemy.hp <= 0)
					enemy.kill(this);				
			}
			if (etile.hasEnemy()) {
				var enemy = etile.entities.peek();
				enemy.hp -= thornsDamage;
				if (enemy.hp <= 0)
					enemy.kill(this);				
			}
			if (setile.hasEnemy()) {
				var enemy = setile.entities.peek();
				enemy.hp -= thornsDamage;
				if (enemy.hp <= 0)
					enemy.kill(this);				
			}
			if (stile.hasEnemy()) {
				var enemy = stile.entities.peek();
				enemy.hp -= thornsDamage;
				if (enemy.hp <= 0)
					enemy.kill(this);				
			}
			if (swtile.hasEnemy()) {
				var enemy = swtile.entities.peek();
				enemy.hp -= thornsDamage;
				if (enemy.hp <= 0)
					enemy.kill(this);				
			}
			if (wtile.hasEnemy()) {
				var enemy = wtile.entities.peek();
				enemy.hp -= thornsDamage;
				if (enemy.hp <= 0)
					enemy.kill(this);				
			}
			if (nwtile.hasEnemy()) {
				var enemy = nwtile.entities.peek();
				enemy.hp -= thornsDamage;
				if (enemy.hp <= 0)
					enemy.kill(this);				
			}
		} else if (this.skills.skillObject[SKILL_THORNS_I].purchased) {
			// deal damage to the attacker
			var thornsDamage = Math.max(Math.round(amount * .1), 1);
			attacker.hp -= thornsDamage;
			if (attacker.hp <= 0)
				attacker.kill(this);
		}

		if (this.skills.skillObject[SKILL_HEALTH_INSURANCE].purchased)
			factions[FACTION_CLONES].wealth += Math.round(amount / 5);

		// reduce damage with defense
		var def = this.getDef();
		var adjustedDamage = Math.max(0, amount - 3 * def);

		// apply defensive attack style
		var defenseLevel = this.getDefenseLvl();
		if (defenseLevel >= 10)
			amount *= .2;
		else if (defenseLevel >= 9)
			amount *= .4;
		else if (defenseLevel >= 8)
			amount *= .5;
		else if (defenseLevel >= 7)
			amount *= .6;
		else if (defenseLevel >= 6)
			amount *= .7;
		else if (defenseLevel >= 5)
			amount *= .75;
		else if (defenseLevel >= 4)
			amount *= .8;
		else if (defenseLevel >= 3)
			amount *= .85;
		else if (defenseLevel >= 2)
			amount *= .9;
		else if (defenseLevel >= 1)
			amount *= .95;

		amount = Math.round(amount);

		if (this.isShielded() && this.shieldHP > 0) {
			if (this.shieldHP < amount) {
				amount -= this.shieldHP;
				this.shieldHP = 0;
				this.removeStatus(STATUS_SHIELDED);
			} else {
				this.shieldHP -= amount;
				amount = 0;
			}
		}

		this.hp -= amount;
		if (this.hp <= 0)
			this.kill();
	}

	this.getThreatLevel = function(character) {
		return - (Math.abs(this.x - character.x) + Math.abs(this.y - character.y)) + 10 * (1 - this.hp/this.hpMax);;
	}

	this.addKillXp = function(amount) {
		while (amount > 0) {
			var xpTillLevel = this.nextLevelXp - this.xp;
			// level up
			if (xpTillLevel <= amount) {
				amount -= xpTillLevel;
				this.xp += xpTillLevel;
				this.levelUp();
			} else {
				this.xp += amount;
				break;				
			}
		}
	}

	this.levelUp = function() {
		// increment our level
		this.level++;

		// reward with skill points
		this.skillPoints += 3;

		// recalculate xp
		this.lastLevelXp = this.nextLevelXp;
		this.nextLevelXp = Math.round(this.nextLevelXp * 2.25);

		// upgrade our hp
		var hpDif = this.constitution;
		this.hpMax += hpDif;
		this.hp += hpDif;
	}

	this.addCombatExperience = function (damage) {
		var xp = .01 * damage;
		if (this.skills.skillObject[SKILL_WEAPONS_TRAINING].purchased)
			xp *= 2;

		var style = null;
		// prorate by number of selected styles
		var numberOfStyles = 0;
		for (var i = this.attackStyles.length - 1; i >= 0; i--) {
			if (this.attackStyles[i].selected) {
				numberOfStyles++;
			}
		}
		xp = xp / numberOfStyles;
		// apply that much xp to each selected style
		for (var i = this.attackStyles.length - 1; i >= 0; i--) {
			if (this.attackStyles[i].selected) {
				this.attackStyles[i].lvl = Math.min(this.attackStyles[i].lvl + xp, 10);
			}
		}
	}

	this.kill = function() {
		GameOver();
	}

	// gets all the status/skills on cooldown
	this.getEffects = function() {
		var result = {}
		var skill_object = player.skills.skillObject;		

		if (skill_object[SKILL_REGEN_III].purchased)
			result[SKILL_REGEN_III] = {percent:1, used:false};
		else if (skill_object[SKILL_REGEN_II].purchased)
			result[SKILL_REGEN_II] = {percent:1, used:false};
		else if (skill_object[SKILL_REGEN_I].purchased)
			result[SKILL_REGEN_I] = {percent:Math.min((gameTicks - this.lastCombatTick) / 15, 1), used:false};

		if (skill_object[SKILL_BUBBLE_II].purchased)
			result[SKILL_BUBBLE_II] = {percent: Math.min((gameTicks - skill_object[SKILL_BUBBLE_II].lastUsedTick) / skill_object[SKILL_BUBBLE_II].cooldown, 1), used:false};
		else if (skill_object[SKILL_BUBBLE_I].purchased)
			result[SKILL_BUBBLE_I] = {percent: Math.min((gameTicks - skill_object[SKILL_BUBBLE_I].lastUsedTick) / skill_object[SKILL_BUBBLE_I].cooldown, 1), used:false};

		if (skill_object[SKILL_MICROWAVE_III].purchased)
			result[SKILL_MICROWAVE_III] = {percent: Math.min((gameTicks - skill_object[SKILL_MICROWAVE_III].lastUsedTick) / skill_object[SKILL_MICROWAVE_III].cooldown, 1), used:false};
		else if (skill_object[SKILL_MICROWAVE_II].purchased)
			result[SKILL_MICROWAVE_II] = {percent: Math.min((gameTicks - skill_object[SKILL_MICROWAVE_II].lastUsedTick) / skill_object[SKILL_MICROWAVE_II].cooldown, 1), used:false};
		else if (skill_object[SKILL_MICROWAVE_I].purchased)
			result[SKILL_MICROWAVE_I] = {percent: Math.min((gameTicks - skill_object[SKILL_MICROWAVE_I].lastUsedTick) / skill_object[SKILL_MICROWAVE_I].cooldown, 1), used:false};

		if (skill_object[SKILL_THORNS_II].purchased)
			result[SKILL_THORNS_II] = {percent: 1, used:false};
		else if (skill_object[SKILL_THORNS_I].purchased)
			result[SKILL_THORNS_I] = {percent: 1, used:false};

		if (skill_object[SKILL_SPARK_II].purchased)
			result[SKILL_SPARK_II] = {percent: Math.min((gameTicks - skill_object[SKILL_SPARK_II].lastUsedTick) / skill_object[SKILL_SPARK_II].cooldown, 1), used:false};
		else if (skill_object[SKILL_SPARK_I].purchased)
			result[SKILL_SPARK_I] = {percent: Math.min((gameTicks - skill_object[SKILL_SPARK_I].lastUsedTick) / skill_object[SKILL_SPARK_I].cooldown, 1), used:false};

		if (skill_object[SKILL_SUMMON_FAMILIAR].purchased)
			result[SKILL_SUMMON_FAMILIAR] = {percent: Math.min((gameTicks - skill_object[SKILL_SUMMON_FAMILIAR].lastUsedTick) / skill_object[SKILL_SUMMON_FAMILIAR].cooldown, 1), used:false};
		
		if (skill_object[EFFECT_TERRAFORM_I].equipped)
			result[EFFECT_TERRAFORM_I] = {percent: Math.min((gameTicks - skill_object[EFFECT_TERRAFORM_I].lastUsedTick) / skill_object[EFFECT_TERRAFORM_I].cooldown, 1), used:false};

		// always included
		if (skill_object[CONSTRUCT_WALL].purchased)
			result[CONSTRUCT_WALL] = {percent: factions[FACTION_CLONES].wealth >= skill_object[CONSTRUCT_WALL].price ? 1 : 0, used:false};

		if (skill_object[CONSTRUCT_SENTRY_I].purchased)
			result[CONSTRUCT_SENTRY_I] = {percent: factions[FACTION_CLONES].wealth >= skill_object[CONSTRUCT_SENTRY_I].price ? 1 : 0, used:false};

		if (skill_object[CONSTRUCT_MERCENARY].purchased)
			result[CONSTRUCT_MERCENARY] = {percent: factions[FACTION_CLONES].wealth >= skill_object[CONSTRUCT_MERCENARY].price ? 1 : 0, used:false};

		// class skills
		if (skill_object[SKILL_FIELD_DRESSING].purchased)
			result[SKILL_FIELD_DRESSING] = {percent: Math.min((gameTicks - skill_object[SKILL_FIELD_DRESSING].lastUsedTick) / skill_object[SKILL_FIELD_DRESSING].cooldown, 1), used:false};

		if (skill_object[SKILL_VICTORY_SPEECH].purchased)
			result[SKILL_VICTORY_SPEECH] = {percent: Math.min((gameTicks - skill_object[SKILL_VICTORY_SPEECH].lastUsedTick) / skill_object[SKILL_VICTORY_SPEECH].cooldown, 1), used:false};

		if (skill_object[SKILL_CABINET_III].purchased)
			result[SKILL_CABINET_III] = {percent: Math.min((gameTicks - skill_object[SKILL_CABINET_III].lastUsedTick) / skill_object[SKILL_CABINET_III].cooldown, 1), used:false};
		else if (skill_object[SKILL_CABINET_II].purchased)
			result[SKILL_CABINET_II] = {percent: Math.min((gameTicks - skill_object[SKILL_CABINET_II].lastUsedTick) / skill_object[SKILL_CABINET_II].cooldown, 1), used:false};
		else if (skill_object[SKILL_CABINET_I].purchased)
			result[SKILL_CABINET_I] = {percent: Math.min((gameTicks - skill_object[SKILL_CABINET_I].lastUsedTick) / skill_object[SKILL_CABINET_I].cooldown, 1), used:false};

		if (skill_object[SKILL_WE_THE_PEOPLE].purchased)
			result[SKILL_WE_THE_PEOPLE] = {percent: Math.min((gameTicks - skill_object[SKILL_WE_THE_PEOPLE].lastUsedTick) / skill_object[SKILL_WE_THE_PEOPLE].cooldown, 1), used:false};

		if (skill_object[SKILL_DEREGULATION].purchased)
			result[SKILL_DEREGULATION] = {percent: 1, used:false};
		if (skill_object[SKILL_THE_GOOD_STUFF].purchased)
			result[SKILL_THE_GOOD_STUFF] = {percent: 1, used:false};
		if (skill_object[SKILL_STREET_PHARMACIST].purchased)
			result[SKILL_STREET_PHARMACIST] = {percent: 1, used:false};
		if (skill_object[SKILL_ADDICTS_ADVANTAGE].purchased)
			result[SKILL_ADDICTS_ADVANTAGE] = {percent: 1, used:false};
		if (skill_object[SKILL_DETOX].purchased)
			result[SKILL_DETOX] = {percent: 1, used:false};
		if (skill_object[SKILL_QUALITY_CONTROL].purchased)
			result[SKILL_QUALITY_CONTROL] = {percent: 1, used:false};

		if (skill_object[SKILL_ROTH_IRA].purchased)
			result[SKILL_ROTH_IRA] = {percent: 1, used:false};
		if (skill_object[SKILL_DIVIDENDS].purchased)
			result[SKILL_DIVIDENDS] = {percent: 1, used:false};
		if (skill_object[SKILL_HEALTH_INSURANCE].purchased)
			result[SKILL_HEALTH_INSURANCE] = {percent: 1, used:false};
		if (skill_object[SKILL_LIFE_INSURANCE].purchased)
			result[SKILL_LIFE_INSURANCE] = {percent: Math.min((gameTicks - skill_object[SKILL_LIFE_INSURANCE].lastUsedTick) / skill_object[SKILL_LIFE_INSURANCE].cooldown, 1), used:false};
		if (skill_object[SKILL_MONEY_SHOT].purchased)
			result[SKILL_MONEY_SHOT] = {percent: 1, used:false};
		if (skill_object[SKILL_GREASING_THE_WHEELS].purchased)
			result[SKILL_GREASING_THE_WHEELS] = {percent: 1, used:false};

		if (skill_object[SKILL_STUDENT_DISCOUNT].purchased)
			result[SKILL_STUDENT_DISCOUNT] = {percent: 1, used:false};
		if (skill_object[SKILL_ALL_NIGHTER].purchased)
			result[SKILL_ALL_NIGHTER] = {percent: 1, used:false};
		if (skill_object[SKILL_CHANGE_MINOR].purchased)
			result[SKILL_CHANGE_MINOR] = {percent: Math.min((gameTicks - skill_object[SKILL_CHANGE_MINOR].lastUsedTick) / skill_object[SKILL_CHANGE_MINOR].cooldown, 1), used:false};
		if (skill_object[SKILL_CRAM].purchased)
			result[SKILL_CRAM] = {percent: Math.min((gameTicks - skill_object[SKILL_CRAM].lastUsedTick) / skill_object[SKILL_CRAM].cooldown, 1), used:false};
		if (skill_object[SKILL_MONEY_SHOT].purchased)
			result[SKILL_MONEY_SHOT] = {percent: 1, used:false};
		if (skill_object[SKILL_CHANGE_MAJOR].purchased)
			result[SKILL_CHANGE_MAJOR] = {percent: 1, used:false};

		return result;
	}

	this.getCritChance = function() {
		return this.baseCritChance;
	}

	this.getCritDamageModifier = function() {
		return (10 + this.perception) / 10;
	}

	this.isShielded = function() {
		return this.statuses[STATUS_SHIELDED] && this.shieldHP > 0;
	}

	this.getSwingLvl = function() {
		return this.attackStyles[ATTACK_STYLE_SWING].lvl;
	}

	this.getDefenseLvl = function() {
		return this.attackStyles[ATTACK_STYLE_DEFENSIVE].lvl;
	}

	this.getDoubleStrikeChance = function() {
		return this.attackStyles[ATTACK_STYLE_CLOSE].lvl / 10;
	}

	this.getStunChance = function() {
		return this.attackStyles[ATTACK_STYLE_POKE].lvl / 20;
	}

	this.getBleedChance = function() {
		// look over inventory, get total bleed chance
		var chance = 0;
		for (var i = this.inventory.length - 1; i >= 0; i--) {
			var item = this.inventory[i];
			if (item.equipped) {
				if (item.effects.includes(EFFECT_SHARP_I))
					chance += .1;
			}
		}

		return chance;
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

	this.getDef = function() {
		// look over inventory, get total def
		var def = this.baseDef;
		for (var i = this.inventory.length - 1; i >= 0; i--) {
			var item = this.inventory[i];
			if (item.equipped) {
				for (var i = item.effects.length - 1; i >= 0; i--) {
					if (item.effects[i] == EFFECT_DEF_II)
						def += 2;
					else if (item.effects[i] == EFFECT_DEF_I)
						def += 1;
				}
			}
		}

		return def;
	}
}