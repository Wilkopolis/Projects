// Paunch list
// - Make things look identical on all browsers at all resolutions
// - continue developing boss fight
// - add more events
// - hacking minigame

// || Events ||

// 7 Entrance:
// 	- 3 options that impact the dungeon ahead

// 7 Vending Machine:
// 	- buy any 3 random things

// 9 Hacking Game:
// 	- get access to locked rooms in the next set
// 	- get access to buffs
// 	- get access to consumables

// 2 Securotron:
// 	- med hp
// 	- med dmg
// 	- chance to hack and give you ally for short time
// 	- high tech
// 	- med tech
// 	- low gold

// 1 Rat Scout:
// 	- chance to reveal nearby map

// 3 Rat Priest:
// 	- low hp
// 	- chance to med hit chance to low heal
// 	- med gold
// 	- low tech
// 	- slightly high p up

// 4 Rat Officer:
// 	- low tech loot chance
// 	- regular power up loot chance
// 	- higher gold

// 5 Rat Soldier:
// 	- med-high hp
// 	- high hit
// 	- med gold
// 	- low tech
// 	- med chance to p up

// 10/1 Rat Patriarch:
// 	- Fuckin' platformer

// 8 Upgrades:
//  - turbo mode
//  - aloha snackbar
// 	- Be able to see 1 level ahead
// 	- be able to see all levels ahead
// 	- hacking game ups
// 	- ambiguous boss fight upgrade $$$
// 	- upgraded effectiveness of consumables
// 	- ship map lock down
// 	- checkpoints
// 	- stimulant disperse (loot up, hit and hp up)
// 	- sedative disperse (loot down, hit and hp down)

//TODO fix simulataneous kill and die
function attack (enemy) {
	var mod = (Math.random() * 1.2 - .2);
	var	myDamage = Math.floor(Math.max(Math.min(mod, 1), 0) * player.strength);
	
	var crit = false;
	if (upgrades[UPGRADE_ANATOMY_CLASS]) {
		if (Math.random() < .1) {
			myDamage = Math.ceil(myDamage * 1.5);
			crit = true;
		}
	}

	//TODO uh cant kill regening guy it turns out
	enemy.hp = Math.max(enemy.hp - myDamage, 0);

	if (myDamage > 0) {
		if (crit) {
			addHitText(new EnemyCritText(myDamage));
			if (upgrades[UPGRADE_CRIT_GOLD])
				addGold(Math.round(myDamage * .25));
		} else
			addHitText(new EnemyHitText(myDamage));
		if (enemy.name == "Securotron" && enemy.regenRate > 0 && enemy.hp != 0) {
			addHitText(new EnemyHealText(enemy.regenRate));
			enemy.hp += enemy.regenRate;
			if (enemy.hp > enemy.maxhp)
				enemy.hp = enemy.maxhp;
		}
	} else {
		addHitText(new EnemyMissText());
	}

	if (enemy.hp >= 0)
		return getHit(enemy);
	else
		return false;
}

function getHit (enemy) {
	var theirDamage = enemy.getNextHit();

	player.addHp(-theirDamage);

	return checkDead();
}

names = ["Wilko", "Jules", "Fuji", "Llama", "DC", "Seany", "Bird", "Aekx", "Willy", "Stamos"];

function Agent (parent) {
	this.critChance = 0;
	this.critMultiplier = 1;

	this.hp = Math.round((1 + ((Math.random() - .5) * .2)) * baseHp);
	this.maxhp = this.hp;
	this.strength = Math.round((1 + ((Math.random() - .5) * .4)) * baseStr);

	this.acc = {x: 0, y: GRAVITY};
	this.vel = {x: 0, y: 0};
	this.pos = {x: playerX + divsOffsetX, y: playerY + divsOffsetY};

	if (parent)
		this.name = parent.name;
	else
		this.name = names[Math.floor(Math.random() * names.length)];

	this.addHp = function(dmg) {
		this.hp += dmg;
		this.hp = Math.max(Math.min(this.maxhp, this.hp), 0);
		if (dmg < 0)
			addHitText(new PlayerHitText(dmg));
		else if (dmg > 0)
			addHitText(new PlayerHealText(dmg))
		else 
			addHitText(new PlayerMissText(dmg));
	};
}

function format (name, add) {
	if (generationCount < 10)
		return name + "00" + (generationCount + add);
	else if (generationCount < 100)
		return name + "0" + (generationCount + add);
	else 
		return name + (generationCount + add);
}

function checkDead () {

	if (player.hp == 0) {

		die();
		return true;
	}
	return false;
}

function healthModule (size) {
	this.HpAmount = size;

	this.apply = function(agent) {
		agent.hp += this.HpAmount;
		agent.maxhp += this.HpAmount;
	};
}