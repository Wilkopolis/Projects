
function Character (occupation, background, loadout) {
	this.x = 0;
	this.y = 0;
	this.animate = true;
	// true to work with enemies trying to move through us
	// will change if we find a more proper arrangement
	this.obstacle = true;
	
	// the auto-fight radius
	this.range = SIGHT_DISTANCE;

	this.hp = 25;
	this.hpMax = 25;
	this.xp = 0;
	this.name = 'Wilko';
	this.level = 1;
	this.skillPoints = 0;
	this.lastLevelXp = 0;
	this.nextLevelXp = 20;

	this.baseDamage = 3;
	this.baseAccuracy = .4;	
	this.attackStyles = ATTACK_STYLES;

	this.faction = FACTION_CLONES;
	this.onHand = ITEM_NONE;
	this.offHand = ITEM_NONE;
	this.head = ITEM_NONE;
	this.module1 = ITEM_NONE;
	this.module2 = ITEM_NONE;
	this.module3 = ITEM_NONE;

	this.lastCombatTick = 0;

	this.skills = new Skills();
	this.inventory = new Inventory();
	this.statuses = [];

	for (var i = loadout.length - 1; i >= 0; i--) {
		var item = loadout[i];
		switch(item.slot) {
			case SLOT_WIELDABLE:
			if (this.onHand == ITEM_NONE && (!item.twoHanded || (item.twoHanded && this.offHand == ITEM_NONE))) {
				this.onHand = item;
				item.equip(this);
			} else if (this.offHand == ITEM_NONE && (!item.twoHanded || (item.twoHanded && this.onHand == ITEM_NONE))) {
				this.offHand = item;
				item.equip(this);
			}
			break;
			case SLOT_HEAD:
			if (this.head == ITEM_NONE) {
				this.head = item;
				item.equip(this);
			}
			break;
			case SLOT_MODULE:
			if (this.module1 == ITEM_NONE) {
				this.module1 = item;
				item.equip(this);
			} else if (this.module2 == ITEM_NONE) {
				this.module2 = item;
				item.equip(this);
			} else if (this.module3 == ITEM_NONE) {
				this.module3 = item;
				item.equip(this);
			}
			break;
			default:break;
		}
		this.inventory.push(item);
	}

	this.attack = function(enemy, double_strike = false) {
		// full attack the primary
		dealDamage(this, this.getDmg(), enemy);

		// apply any onhit effects
		var random = Math.random();
		if (random <= this.getBleedChance()) {
			enemy.addStatus(STATUS_BLEEDING, 3, player);
		}

		// check for stun
		random = Math.random();
		if (random <= this.getStunChance()) {
			enemy.addStatus(STATUS_STUNNED, 1, player);
		}

		// apply swing attack style
		if (this.getSwingLvl() == 10) {
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
				dealDamage(this, this.getDmg(), ntile.getEnemy());
			}
			if (netile.hasEnemy()) {
				dealDamage(this, this.getDmg(), netile.getEnemy());
			}
			if (etile.hasEnemy()) {
				dealDamage(this, this.getDmg(), etile.getEnemy());
			}
			if (setile.hasEnemy()) {
				dealDamage(this, this.getDmg(), setile.getEnemy());
			}
			if (stile.hasEnemy()) {
				dealDamage(this, this.getDmg(), stile.getEnemy());
			}
			if (swtile.hasEnemy()) {
				dealDamage(this, this.getDmg(), swtile.getEnemy());
			}
			if (wtile.hasEnemy()) {
				dealDamage(this, this.getDmg(), wtile.getEnemy());
			}
			if (nwtile.hasEnemy()) {
				dealDamage(this, this.getDmg(), nwtile.getEnemy());
			}
		} else if (this.getSwingLvl() >= 6.66) {
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

			if (leftTile.hasEnemy()) {
				dealDamage(this, this.getDmg(), leftTile.getEnemy());
			}
			if (rightTile.hasEnemy()) {
				dealDamage(this, this.getDmg(), rightTile.getEnemy());
			}
			if (bleftTile.hasEnemy()) {
				dealDamage(this, this.getDmg(), bleftTile.getEnemy());
			}
			if (brightTile.hasEnemy()) {
				dealDamage(this, this.getDmg(), brightTile.getEnemy());
			}
		} else if (this.getSwingLvl() >= 3.33) {
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

			if (leftTile.hasEnemy()) {
				dealDamage(this, this.getDmg(), leftTile.getEnemy());
			}
			if (rightTile.hasEnemy()) {
				dealDamage(this, this.getDmg(), rightTile.getEnemy());
			}
		}

		// apply double strike attack style
		random = Math.random();
		if (!double_strike && random <= this.getDoubleStrikeChance()) {
			this.attack(enemy, true);
			log.add("You strike the " + enemy.name + " twice!");
		}
	}

	this.canAttack = function() {
		return true;
	}

	// called at the end of turn
	this.applyStatuses = function() {
		// apply regen
		if (this.skills.getSkill(SKILL_REGEN_IV)) {
			this.hp = Math.min(this.hp + 8, this.hpMax);
		} else if (this.skills.getSkill(SKILL_REGEN_III)) {
			this.hp = Math.min(this.hp + 4, this.hpMax);
		} else if (this.skills.getSkill(SKILL_REGEN_II)) {
			this.hp = Math.min(this.hp + 2, this.hpMax);
		} else if (this.skills.getSkill(SKILL_REGEN_I) && gameTicks - this.lastCombatTick >= 15) {
			this.hp = Math.min(this.hp + 2, this.hpMax);
		}

		// remove any expired statuses
		for (var i = 0; i < this.statuses.length; i++) {
			if (this.statuses[i].ticksRemaining == 0)
				this.statuses.splice(i,1);
			else
				this.statuses[i].ticksRemaining--;
		}	
	}
	
	this.getDmg = function() {
		// get the damage from equipped items
		var maxDamage = this.baseDamage;
		// if weilding 1 weapon, add its damage
		// if weirlding 2 weapons, add .45 of each's damage
		var weapons = [];
		if (this.onHand != ITEM_NONE && typeof this.onHand.dmg !== "undefined")
			weapons.push(this.onHand);
		if (this.offHand != ITEM_NONE && typeof this.offHand.dmg !== "undefined")
			weapons.push(this.offHand);

		var accuracy = this.baseAccuracy;		

		// modify accuracy
		switch (weapons.length) {
			case 1:
			maxDamage += weapons[0].dmg;
			accuracy += weapons[0].accuracy;
			break;
			case 2:
			maxDamage += .5 * weapons[0].dmg + .5 * weapons[1].dmg;
			accuracy += .5 * weapons[0].accuracy + .5 * weapons[1].accuracy;
			break;
		}

		if (Math.random() > accuracy)
			maxDamage = 0;

		var damage = Math.max(1, Math.round(maxDamage * Math.random()));

		return Math.round(damage);
	}

	this.takeDamage = function(amount) {
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

		this.hp -= amount;
		if (this.hp <= 0)
			this.kill();
	}
	
	this.getThreatLevel = function(character) {
		return - (Math.abs(this.x - character.x) + Math.abs(this.y - character.y)) + 10 * (1 - this.hp/this.hpMax) + 5;
	}

	this.addKillXp = function(amount) {
		while (amount > 0) {
			var xpTillLevel = this.nextLevelXp - this.xp;
			// level up
			if (xpTillLevel <= amount) {
				amount -= xpTillLevel;
				this.xp += xpTillLevel;
				this.level++;
				this.skillPoints += 3;
				this.lastLevelXp = this.nextLevelXp;
				this.nextLevelXp = Math.round(this.nextLevelXp * 2.25);
				var hpDif = Math.round(this.hpMax * .25);
				this.hpMax += hpDif;
				this.hp += hpDif;
			} else {
				this.xp += amount;
				break;				
			}
		}
	}

	this.addCombatExperience = function (damage) {
		var xp = .01 * damage;
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
				style = this.attackStyles[i];
				break;
			}
		}
		style.lvl = Math.min(style.lvl + xp, 10);
	}

	this.kill = function() {
		gameOver();
	}

	this.getSwingLvl = function() {
		return this.attackStyles[1].lvl;
	}

	this.getDefenseLvl = function() {
		return this.attackStyles[3].lvl;
	}

	this.getDoubleStrikeChance = function() {
		return this.attackStyles[2].lvl / 10;
	}

	this.getStunChance = function() {
		return this.attackStyles[0].lvl / 20;
	}

	this.getBleedChance = function() {
		// look over inventory, get largest bleed level
		var largest_level = "";
		for (var i = this.inventory.length - 1; i >= 0; i--) {
			var item = this.inventory[i];
			if (item.equipped) {
				if (item.effects.includes(EFFECT_SHARP_1)) {
					largest_level = EFFECT_SHARP_1;
				}
			}
		}

		switch(largest_level) {
			case EFFECT_SHARP_1: return .1;
			default: return 0;
		}
	}
}