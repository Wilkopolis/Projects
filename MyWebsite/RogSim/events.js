// Event Generation constants

EVENT_GROUP_derelict_ship = "derelictship";

EVENT_entrance 	    = "entrance";
EVENT_rat_scout     = "ratscout";
EVENT_securotron    = "securotron";
EVENT_rat_noble     = "nobel";
EVENT_rat_patriarch = "boss";
EVENT_vendor	    = "vendor";

shipEvents = [
{choice:EVENT_rat_noble, frequency:10, minX:30, maxX: DUNGEON_LENGTH},
{choice:EVENT_securotron, frequency:10, minX:0, maxX: DUNGEON_LENGTH},
{choice:EVENT_rat_scout, frequency:10, minX:0, maxX: 20},
{choice:EVENT_vendor, frequency:2, minX:0, maxX: DUNGEON_LENGTH}];

vendorItems = [
{name:MODULE_HP_SMALL, abrv: "S HP", price:10, frequency: 30},
{name:MODULE_HP_MED, abrv: "M HP", price:20, frequency: 20},
{name:MODULE_HP_LRG, abrv: "L HP", price:35, frequency: 5},
{name:MODULE_STR_SMALL, abrv: "S STR", price:25, frequency: 15}];

function event_ship_entrance () {
	
	this.eventType = EVENT_entrance;

	this.options = [];
	this.descriptions = [];

	this.options.push("Salvage");
	this.descriptions.push("Salvage: Keep an eye out for valuables and loot.");
	this.options.push("Secure");
	this.descriptions.push("Secure: Seek out hostile passengers.");
	this.options.push("Study");
	this.descriptions.push("Study: Search for technology left behind.");

	this.playStartText = function() {
		observation("The agent successfully boards the deserted vessel.");
		agent("What's our mission here captain?");
	};

	// return if you progress or not
	this.chooseOption = function (index) {
		switch(index) {
			case 0:
			mission.salvage = true;
			mission.goldModifier = 1.2;
			mission.populateEvents();
			captain("Grab whatever isn't nailed down.");
			agent("Roger.");
			return true;
			break;

			case 1:
			mission.secure = true;
			mission.populateEvents();
			captain("Shoot 'em all and let the vacuum of space sort 'em out.");
			agent("Roger.");
			return true;
			break;

			case 2:
			mission.study = true;
			mission.populateEvents();
			captain("Look for anything that's a shinier version of what we got.");
			agent("Roger.");
			return true;
			break;
		}
	};

	this.reset = function() {
	};
}

// module vendor for now
function event_vendor (x) {

	this.eventType = EVENT_vendor;

	this.options = [];
	this.descriptions = [];

	this.items = [];

	this.itemsBought = 0;
	this.itemCount = Math.round(Math.random() * 3) + 2;
	for (var i = 0; i < 6; i++)
	{
		if (i < this.itemCount) {
			var item = clone(pickWeighted(vendorItems));
			item.price = item.price + Math.round((Math.random() * 5) - 2.5);
			this.items.push(item);
			this.options.push(item.abrv);
		} else
			this.options.push("");
	}

	this.options.push("PASS");

	this.alreadyLow = false;

	var adjs = ["nice", "lovely", "neat", "impressive", "steal of a", "limited edition", "rare", "antique", "used"];

	this.playStartText = function() {
		var welcome = "Welcome to Upgrades 'R Us! Today we have";
		for (var i = 0; i < this.items.length; i++)
		{
			var e = this.items[i];
			var adj = adjs[Math.round(Math.random() * (adjs.length - 1))];

			if (i == this.items.length - 1)
				welcome += "and ";

			welcome += " a " + adj + " " + e.name + "(" + color(e.name, e.abrv) + ")|" + color(LOOT_GOLD, e.price) + ", ";
		}
		robot(welcome.toUpperCase());
	};

	// return if you progress or not
	this.chooseOption = function (index) {
		if (index == 6) {
			agent("I'm good, thanks.");
			return true;
		} else {
			var item = this.items[index];
			agent("I'll take the " + color(item.name, item.name) + " for " + color(LOOT_GOLD, item.price + " gold."));
			if (targetGold >= item.price)	{
				robot("CERTAINLY.");
				spendGold(item.price);
				this.itemsBought++;
				switch(item.name) {
					case MODULE_HP_SMALL: baseHp += 5; break;
					case MODULE_HP_MED:	baseHp += 10; break;
					case MODULE_HP_LRG: baseHp += 15; break;
					case MODULE_STR_SMALL: baseStr += 2; break;
				}
				
				updateLoot(item.name, 1);
				this.alreadyLow = false;

				var button = getElementsWithAttribute('index')[index];
				button.onclick = function() {};
				button.className = 'choiceButton offline';
				if (button.childNodes[1].innerHTML != 'offline')
					scrambleTo(button.childNodes[1], 'offline', 0, 6, 20);

				return this.itemsBought >= this.itemCount;
			} else {
				if (!this.alreadyLow) {
					robot("I'M AFRAID YOU ARE A BIT SHORT.");
					this.alreadyLow = true;
				}
			}
		}
	};

	this.reset = function() {
	};
}

function event_rat_patriarch () {

	this.eventType = EVENT_rat_patriarch;

	this.enemy = new RatPatriarch();

	this.options = [];
	this.options.push("Fight");
	
	this.playStartText = function() {
		observation("Here comes the big boss.");
		forceDraw = true;
	};

	this.chooseOption = function (index) {
		switch(index) {
			// Fight
			case 0:
			attack(this.enemy);
			checkDead();				

			if (this.enemy.hp <= 0) {
				switchToBossDialog();
			}

			return false;
		}
	};

	this.reset = function() {
	};
}

function event_rat_scout (x) {

	this.eventType = EVENT_rat_noble;

	this.enemy = new RatScout(x);
	this.alreadyLow = false;
	this.fought = false;

	this.options = [];
	this.descriptions = [];
	this.options.push("Fight");
	this.descriptions.push("");
	this.options.push("Peek");
	this.descriptions.push("");
	this.options.push("Escape");

	this.lootTable = [{choice: LOOT_GOLD, frequency: 30},
	{choice: MODULE_HP_SMALL, frequency: 10},
	{choice: MODULE_HP_MED, frequency: 5},
	{choice: MODULE_STR_SMALL, frequency: 5},
	{choice: MODULE_HP_LRG, frequency: 1}];
	// TODO, add chance to drop map

	this.playStartText = function() {
		observation("Our sensors detect lesser space vermin.");
	};

	// return if you progress or not
	this.chooseOption = function (index) {
		switch(index) {
			// fight
			case 0:
			// say this line once
			if (!this.fought) {
				captain("Set phasers to kill.")
				this.fought = true;
			}

			// if we died, stop immediatedy
			if (attack(this.enemy))
				return;

			// if they died, loot and progress
			if (this.enemy.hp <= 0) {
				agent("Got 'em Sir!");

				this.loot();

				return true;
			}
			return false;

			// peek
			case 1:

			getHit(this.enemy);

			// peek at map, gain info about next nodes
			if (Math.random() <= .1)
			{
				agent("I got a look at his notes!")

				for (var i = 0; i < 7; i++)
				{
					var node = mission.dungeon[mission.x + 3][i];
					if (node != null)
					{
						node.reveal();
					}
					node = mission.dungeon[mission.x + 6][i];
					if (node != null)
					{
						node.reveal();
					}
					node = mission.dungeon[mission.x + 9][i];
					if (node != null)
					{
						node.reveal();
					}
				}

				var button = getElementsWithAttribute('index')[1];
				button.onclick = function() {};
				button.className = 'choiceButton offline';
				scrambleTo(button.childNodes[1], 'offline', 0, 6, 20);		
			}
			return false;	

			case 2:
			empowerRatPiles();
			agent("I've escaped... But so did they...");
			observation("Rat Scouts grow stronger");
			this.enemy.hp = 0;
			return true;
		}
	}

	this.reset = function(x) {
		this.enemy = new RatScout(x);
		this.alreadyLow = false;
		this.fought = false;
	};

	this.loot = function() {
		var lootType = pickWeighted(this.lootTable).choice;
		switch(lootType) {
			case LOOT_GOLD:
			var goldDrop = Math.ceil(this.enemy.strength * mission.goldModifier);
			observation("The agent loots " + goldDrop + " gold.");	
			addGold(goldDrop);
			break;

			case MODULE_HP_SMALL:
			agent("He dropped something... a Small Health Upgrade Module?");
			captain("Don't worry about that-keep going! But pick it up.");
			addHitText(new ItemDropText(MODULE_HP_SMALL, true));
			addHitText(new ItemDropText(MODULE_HP_SMALL, false));
			baseHp += 5;
			updateLoot(lootType, 1);
			break;

			case MODULE_HP_MED:
			agent("He dropped something... a Medium Health Upgrade Module?");		
			captain("Don't worry about that-keep going! But pick it up.");
			addHitText(new ItemDropText(MODULE_HP_MED, true));
			addHitText(new ItemDropText(MODULE_HP_MED, false));
			baseHp += 10;
			updateLoot(lootType, 1);
			break;

			case MODULE_HP_LRG:
			agent("He dropped something... a Large Health Upgrade Module?");		
			captain("Don't worry about that-keep going! But pick it up.");
			addHitText(new ItemDropText(MODULE_HP_LRG, true));
			addHitText(new ItemDropText(MODULE_HP_LRG, false));
			baseHp += 15;
			updateLoot(lootType, 1);
			break;

			case MODULE_STR_SMALL:
			agent("He dropped something... a Small Steroid Module?");		
			captain("Don't worry about that-keep going! But pick it up.");
			addHitText(new ItemDropText(MODULE_STR_SMALL, true));
			addHitText(new ItemDropText(MODULE_STR_SMALL, false));
			baseStr += 2;
			updateLoot(lootType, 1);
			break;
		}
	};
}

function event_rat_noble (x) {

	this.eventType = EVENT_rat_noble;

	this.enemy = new RatNoble(x);
	this.alreadyLow = false;
	this.fought = false;

	this.options = [];
	this.descriptions = [];
	this.options.push("Fight");
	this.descriptions.push("");
	// this.options.push("Charge");
	// this.descriptions.push("");
	this.options.push("Appease");
	this.descriptions.push("");

	this.lootTable = [{choice: LOOT_GOLD, frequency: 30},
	{choice: MODULE_HP_SMALL, frequency: 10},
	{choice: MODULE_HP_MED, frequency: 5},
	{choice: MODULE_STR_SMALL, frequency: 5},
	{choice: MODULE_HP_LRG, frequency: 1}];

	this.playStartText = function() {
		observation("Our sensors detect a rat of nobel status.");
	};

	// return if you progress or not
	this.chooseOption = function (index) {
		switch(index) {
			// fight
			case 0:
			// say this line once
			if (!this.fought) {
				captain("Set phasers to kill.")
				this.fought = true;
			}

			// if we died
			if (attack(this.enemy))
				return;

			// if they died
			if (this.enemy.hp <= 0) {

				agent("Got 'em Sir!");
				this.loot();

				return true;
			}

			// if friends join the power goes up
			if (Math.random() <= .02)
				this.enemy.grow();

			return false;

			// charge
			case 2:
			var chargeChance = .1;
			var alertChance = .2;
			var helpChance = .2;

			if (Math.random() <= chargeChance) {				
				agent("I made it sir!");
				// so we stop drawing the healthbar
				this.enemy.hp = 0;

				return true;
			}

			// failed
			getHit(this.enemy);
			if (Math.random() <= alertChance) {

				// if they escape, all the others get a bit more powerful
				observation("The commotion has alerted other rats of your presence. Rat piles grow stronger.");				
				empowerRatPiles();	

			// if friends join the power goes up
			} else if (Math.random() <= helpChance) 
				this.enemy.grow();

			return false;	

			// appease
			case 1:
			if (!this.alreadyLow) {
				captain("Set phasers to negotiate.")
			}

			var cost = 3 * this.enemy.strength;
			if (gold >= cost) {
				agent("They shook me down sir.");
				observation("They take you for " + cost + " gold.");
				this.enemy.hp = 0;
				spendGold(cost);
				return true;
			} else {
				if (!this.alreadyLow) {
					agent("They want more sir, " + cost + " gold.");
					this.alreadyLow = true;
				}
				return false;
			}
			break;
		}
	}

	this.reset = function(x) {
		this.enemy = new RatNoble(x);
		this.alreadyLow = false;
		this.fought = false;
	};

	this.loot = function() {
		var lootType = pickWeighted(this.lootTable).choice;
		switch(lootType) {
			case LOOT_GOLD:
			var goldDrop = Math.ceil(this.enemy.strength * mission.goldModifier);
			observation("The agent... somehow pilfers " + goldDrop + " gold.");	
			addGold(goldDrop);
			break;

			case MODULE_HP_SMALL:
			agent("He dropped something... a Small Health Upgrade Module?");
			captain("Don't worry about that-keep going! But pick it up.");
			addHitText(new ItemDropText(MODULE_HP_SMALL, true));
			addHitText(new ItemDropText(MODULE_HP_SMALL, false));
			baseHp += 5;
			updateLoot(lootType, 1);
			break;

			case MODULE_HP_MED:
			agent("He dropped something... a Medium Health Upgrade Module?");		
			captain("Don't worry about that-keep going! But pick it up.");
			addHitText(new ItemDropText(MODULE_HP_MED, true));
			addHitText(new ItemDropText(MODULE_HP_MED, false));
			baseHp += 10;
			updateLoot(lootType, 1);
			break;

			case MODULE_HP_LRG:
			agent("He dropped something... a Large Health Upgrade Module?");		
			captain("Don't worry about that-keep going! But pick it up.");
			addHitText(new ItemDropText(MODULE_HP_LRG, true));
			addHitText(new ItemDropText(MODULE_HP_LRG, false));
			baseHp += 15;
			updateLoot(lootType, 1);
			break;

			case MODULE_STR_SMALL:
			agent("He dropped something... a Small Steroid Module?");		
			captain("Don't worry about that-keep going! But pick it up.");
			addHitText(new ItemDropText(MODULE_STR_SMALL, true));
			addHitText(new ItemDropText(MODULE_STR_SMALL, false));
			baseStr += 2;
			updateLoot(lootType, 1);
			break;
		}
	};
}

function event_securotron (x) {

	this.eventType = EVENT_securotron;

	this.enemy = new Robot(x);
	this.fought = false;
	this.disable = false;

	this.options = [];
	this.descriptions = [];
	// old fashion combat
	this.options.push("Fight");
	this.descriptions.push("");
	// reduced damage, chance to disable
	this.options.push("Hack");
	this.descriptions.push("");

	this.lootTable = [{choice: LOOT_GOLD, frequency: 40},
	{choice: MODULE_HP_SMALL, frequency: 10},
	{choice: MODULE_HP_MED, frequency: 5},
	{choice: MODULE_STR_SMALL, frequency: 5},
	{choice: MODULE_HP_LRG, frequency: 1}];

	this.playStartText = function() {
		robot("INVALID IDENTIFICATION. I SHALL ESCORT YOU OFF THE VESSEL.");
	};

	// return if you progress or not
	this.chooseOption = function (index) {
		switch(index) {
			// fight
			case 0:
			if (!this.fought) {
				captain("Blast this tin man.")
				this.fought = true;
			}

			if (attack(this.enemy))
				return;

			if (this.enemy.hp <= 0) {
				agent("Got 'em Sir!");
				this.loot();

				return true;
			} else 
				this.enemy.regen();
			
			return this.enemy.hp <= 0;

			// hack
			case 1:
			if (this.disable) {				
				captain("Try to disable it!") 
				this.disable = false;
			}
			
			this.enemy.disableCount += 1 + Math.floor(Math.random() * 3);

			getHit(this.enemy);

			var disabled = this.enemy.disableCount > 15;
			if (disabled) {				
				this.enemy.hp = 0;
				robot("SHUTTING DOOOOOoooooown...");		
				this.loot();		
				return true;
			} 
			this.enemy.regen();
			return disabled;
		}
	}

	this.reset = function(x) {
		this.enemy = new Robot(x);
	};

	this.loot = function() {
		var lootType = pickWeighted(this.lootTable).choice;
		switch(lootType) {
			case LOOT_GOLD:
			var goldDrop = Math.ceil(this.enemy.strength * mission.goldModifier);
			observation("The agent scraps " + goldDrop + " gold.");	
			addGold(goldDrop);
			break;

			case MODULE_HP_SMALL:
			agent("He dropped something... a Small Health Upgrade Module?");			
			captain("Don't worry about that-keep going! But pick it up.");
			addHitText(new ItemDropText(MODULE_HP_SMALL, true));
			addHitText(new ItemDropText(MODULE_HP_SMALL, false));
			baseHp += 5;
			updateLoot(lootType, 1);
			break;

			case MODULE_HP_MED:
			agent("He dropped something... a Medium Health Upgrade Module?");			
			captain("Don't worry about that-keep going! But pick it up.");
			addHitText(new ItemDropText(MODULE_HP_MED, true));
			addHitText(new ItemDropText(MODULE_HP_MED, false));
			baseHp += 10;
			updateLoot(lootType, 1);
			break;

			case MODULE_HP_LRG:
			agent("He dropped something... a Large Health Upgrade Module?");			
			captain("Don't worry about that-keep going! But pick it up.");
			addHitText(new ItemDropText(MODULE_HP_LRG, true));
			addHitText(new ItemDropText(MODULE_HP_LRG, false));
			baseHp += 15;
			updateLoot(lootType, 1);
			break;

			case MODULE_STR_SMALL:
			agent("He dropped something... a Small Steroid Module?");		
			captain("Don't worry about that-keep going! But pick it up.");
			addHitText(new ItemDropText(MODULE_STR_SMALL, true));
			addHitText(new ItemDropText(MODULE_STR_SMALL, false));
			baseStr += 2;
			updateLoot(lootType, 1);
			break;
		}
	};
}

function Robot (x) {
	this.strength = 4 + Math.round(x/5);
	this.maxhp = 20 + this.strength * 4;
	this.hp = this.maxhp;
	this.name = "Securotron";
	this.disableCount = 0;
	this.regenRate = 0;
	this.maxRegen = Math.ceil(x/20);

	// called after each attack
	// chance to INCREASE regen rate
	this.regen = function() {
		if (Math.random() < .05) {
			if (this.regenRate < this.maxRegen){
				this.regenRate++;
				robot("DISPERSING RECUPERATIVE NANOMACHINES.")
				this.regenRate = this.maxRegen;
			}
		}
	};

	this.getNextHit = function() {
		var mod = (Math.random() * 1.4 - .4);
		return Math.floor(Math.max(Math.min(mod, 1), 0) * this.strength);
	};
}

function RatNoble (x) {
	this.strength = 4 + Math.round(x/5);
	this.hp = 20 + 5 * this.strength;
	this.maxhp = 20 + 5 * this.strength;
	this.name = "Rat Noble";

	this.grow = function() {
		var jump = Math.round(Math.random() * 1) + 1;
		observation("The rat receives " + jump + " rat reinforcement" + (jump == 1 ? "!" : "s!"));
		this.hp += 5 * jump;
		this.maxhp += 5 * jump;
		this.strength += jump;
		addHitText(new EnemyHealText(5 * jump));
	};

	this.getNextHit = function() {
		var mod = (Math.random() * 1.2 - .2);
		return Math.floor(Math.max(Math.min(mod, 1), 0) * this.strength);
	};
}

// scan through all events and if they are
// rat piles, up the strength of the enemy
function empowerRatPiles () {
	for(var i = mission.eventNodes.length - 1; i >= 0; i--) {
		var tile = mission.eventNodes[i]
		if (tile.event.eventType == EVENT_rat_scout) {
			tile.event.enemy.grow();		
		}
	}
}

function RatScout (x) {
	this.strength = 4 + Math.round(x/5);
	this.maxhp = 20 + 3 * this.strength;
	this.hp = this.maxhp;
	this.name = "Rat Scout";

	this.growQuiet = function() {
		var jump = Math.round(Math.random() * 1) + 1;
		this.hp += 5 * jump;
		this.maxhp += 5 * jump;
		this.strength += jump;
	};

	this.getNextHit = function() {
		var mod = (Math.random() * 1.2 - .2);
		return Math.floor(Math.max(Math.min(mod, 1), 0) * this.strength);
	};
}

function RatPatriarch () {
	this.strength = 40;
	this.hp = 20 + 5 * this.strength;
	this.maxhp = 20 + 5 * this.strength;
	this.name = "Boss";

	this.growQuiet = function() {
		var jump = Math.round(Math.random() * 1) + 1;
		this.hp += 5 * jump;
		this.maxhp += 5 * jump;
		this.strength += jump;
	};

	this.getNextHit = function() {
		var mod = (Math.random() * 1.2 - .2);
		return Math.floor(Math.max(Math.min(mod, 1), 0) * this.strength);
	};
}

var EVENT_ENCOUNTER = "encounter";
var EVENT_BOSS = "boss";
var EVENT_GOOD = "good";
function event_node (x, y) {

	this.eventType = EVENT_ENCOUNTER;

	this.fr = COLOR_EVENT_ENCOUNTER_R;
	this.fg = COLOR_EVENT_ENCOUNTER_G;
	this.fb = COLOR_EVENT_ENCOUNTER_B;
	this.r = COLOR_EVENT_R;
	this.dr = (this.fr - this.r)/20;
	this.g = COLOR_EVENT_G;
	this.dg = (this.fg - this.g)/20;
	this.b = COLOR_EVENT_B;
	this.db = (this.fb - this.b)/20;
	this.event = null;
	this.x = x;
	this.y = y;
	this.paths = [];
	this.previous = [];

	this.reset = function() {
		this.event.reset(this.x);

		switch (this.eventType)
		{
			case EVENT_ENCOUNTER:
			this.fr = COLOR_EVENT_ENCOUNTER_R;
			this.fg = COLOR_EVENT_ENCOUNTER_G;
			this.fb = COLOR_EVENT_ENCOUNTER_B;
			break;
	
			case EVENT_GOOD:
			this.fr = COLOR_EVENT_GOOD_R;
			this.fg = COLOR_EVENT_GOOD_G;
			this.fb = COLOR_EVENT_GOOD_B;
			break;

			case EVENT_BOSS:
			this.fr = COLOR_EVENT_BOSS_R;
			this.fg = COLOR_EVENT_BOSS_G;
			this.fb = COLOR_EVENT_BOSS_B;
			break;
		}
		this.r = COLOR_EVENT_R;
		this.dr = (this.fr - this.r)/20;
		this.g = COLOR_EVENT_G;
		this.dg = (this.fg - this.g)/20;
		this.b = COLOR_EVENT_B;
		this.db = (this.fb - this.b)/20;
	};

	this.reveal = function() {
		ChangingTiles.push(this);
		if (ChangingTiles.length == 1)
			updateTiles();
	};

	this.getColor = function() {
		 return "rgb(" + Math.round(this.r) + "," + Math.round(this.g) + "," + Math.round(this.b) + ")";
	};

	this.getFinalColor = function() {
		 return "rgb(" + Math.round(this.fr) + "," + Math.round(this.fg) + "," + Math.round(this.fb) + ")";
	};

	this.incrColor = function() {
		this.r += this.dr;
		this.g += this.dg;
		this.b += this.db;
	};
}

function makeEvent (choice, x) {
	switch(choice) {
		case EVENT_rat_noble:
		return new event_rat_noble(x);

		case EVENT_securotron:
		return new event_securotron(x);

		case EVENT_rat_scout:
		return new event_rat_scout(x);

		case EVENT_vendor:
		return new event_vendor(x);
	}
}

function genEndEventNode () {
	var result = new event_node();
	result.eventType = EVENT_BOSS;
	result.event = new event_rat_patriarch();
	result.reset();
	return result;
}

function genEntranceNode () {
	var result = new event_node(0, 0);	
	// result.eventType = EVENT_BOSS;
	// result.event = new event_rat_patriarch();
	result.event = new event_ship_entrance();
	result.reset();
	return result;
}

function generateEvent (x) {
	var choices = [];
	// TODO Check if mission.salvage or secure or study when making events
	for (var i = shipEvents.length - 1; i >= 0; i--)
	{
		var e = shipEvents[i];
		if (e.minX <= x)
		{
			choices.push(e)
		}
	}
	var option = pickWeighted(choices).choice;
	return makeEvent(option, x);
}
