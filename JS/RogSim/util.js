// Global Game Constants

w = 1000;
h = 720;

missionCount = 0;
generationCount = 0;
mission = null;
player = null;
agentIndex = 0;
baseHp = 100;
baseStr = 5;
agents = [];
missions = [];
upgrades = {};
backlog = [];
entities = [];

// Loot

loot = {};
MODULE_HP_SMALL = "Small Health Module";
MODULE_HP_MED = "Medium Health Module";
MODULE_HP_LRG = "Large Health Module";
MODULE_STR_SMALL = "Small Steroid Module";
LOOT_GOLD = "Gold";

// Image locations

URL_PLAYER_SPRITE = "art/guy.png";
URL_SHADOW_SPRITE = "art/shadow.png";
URL_CREW = "art/crew.png";
URL_BOSS = "art/boss.png";
URL_BIG_DEBRIS = "art/bigDebris.png";

// Color Constants

COLOR_PLAYER 				= "#FFCCCC";
COLOR_EVENT_R  				= 158
COLOR_EVENT_G  				= 86;
COLOR_EVENT_B  				= 20;
COLOR_EVENT_GOOD_R			= 15;
COLOR_EVENT_GOOD_G			= 130;
COLOR_EVENT_GOOD_B			= 52;
COLOR_EVENT_ENCOUNTER_R		= 202;
COLOR_EVENT_ENCOUNTER_G		= 40;
COLOR_EVENT_ENCOUNTER_B		= 0;
COLOR_EVENT_BOSS_R			= 105;
COLOR_EVENT_BOSS_G			= 46;
COLOR_EVENT_BOSS_B			= 22;
COLOR_PATH   				= "#CC9966";
COLOR_WALL   				= "#03060F";
COLOR_HEALTH_BAR			= "#FF0000";
COLOR_HEALTH_BAR_BACKGROUND	= "#3D001F";
COLOR_ENEMY_BAR				= "#FF6C00";
COLOR_ENEMY_BAR_BACKGROUND	= "#3E1700";
COLOR_UPGRADE_PURCHASED 	= "#FF3300";
COLOR_CYAN					= "#98BAC5";
COLOR_WHITISH_BLUE			= "#D5D9E6";
COLOR_HP_TEXT				= "#787A81";
COLOR_HIT_TEXT				= "#FF0000";
COLOR_CRIT_TEXT				= "#FF3300";
COLOR_MISS_TEXT				= "#3B3B3F";
COLOR_REGEN_TEXT			= "#3D663D";
COLOR_GOLD_TEXT				= "#EAE409";
COLOR_GOLD 					= "#EAE409";
COLOR_LIGHT_BLUE 			= "#2B80FF";
COLOR_PURPLE 				= "#8465C4";
COLOR_ORANGE 				= "#DA7713";
COLOR_LIGHT_BROWN			= "#CC9966";

// Other Constants

DISPLAY_DEPTH = 7;
DUNGEON_LENGTH = 10;

// Path Generation Constants

PATH_UP2 						  = 1;
PATH_UP2_STRAIGHT 				  = 2;
PATH_UP2_STRAIGHT_DOWN2 		  = 3;
PATH_UP2_DOWN 					  = 4;
PATH_UP2_DOWN2 					  = 5;
PATH_UP 						  = 6;
PATH_UP_DOWN 					  = 7;
PATH_UP_DOWN2 					  = 8;
PATH_STRAIGHT 					  = 9;
PATH_STRAIGHT_DOWN2 			  = 10;
PATH_DOWN 						  = 11;
PATH_DOWN2						  = 12;

PATH_UP2_FREQUENCY				  = 100;
PATH_UP2_STRAIGHT_FREQUENCY 	  = 50;
PATH_UP2_STRAIGHT_DOWN2_FREQUENCY = 100;
PATH_UP2_DOWN_FREQUENCY 		  = 50;
PATH_UP2_DOWN2_FREQUENCY 		  = 50;
PATH_UP_FREQUENCY				  =	100;
PATH_UP_DOWN_FREQUENCY 		      = 50;
PATH_UP_DOWN2_FREQUENCY 		  = 50;
PATH_STRAIGHT_FREQUENCY 		  = 100;
PATH_STRAIGHT_DOWN2_FREQUENCY 	  = 50;
PATH_DOWN_FREQUENCY 			  = 100;
PATH_DOWN2_FREQUENCY			  = 100;

logging = true;
function log (node) {
	backlog.push(node);

	if (logging)
		updateLog();
}

function updateLog () {
	var node;
	var consoleDiv = document.getElementById("console");

	if (node = backlog.shift()) {
		consoleDiv.appendChild(node);		
		while (node = backlog.shift()) {
			consoleDiv.appendChild(node);
		}

		logging = false;

		jQuery(consoleDiv).animate({
			'scrollTop':'' + consoleDiv.scrollHeight
		}, 1000, 'linear');

		window.setTimeout(function() {
			logging = true;
			updateLog();
		}, 1100);
	}
}

function updateAgentDivs () {
    $("#agentName2").html(format(agents[0].name, 0));
    $("#hp2").html("Hp: " + agents[0].maxhp);
    $("#strength2").html("Str: " + agents[0].strength);

	// if unlocked 2 or even 3 agents, then move the divs and draw selected

    $("#agentName4").html(format(agents[0].name, 1));
    $("#hp4").html("Hp: (" + Math.round(baseHp * .9) + "-" + Math.round(baseHp * 1.1) + ")");
  	$("#strength4").html("Str: (" + Math.round(baseStr * .8) + "-" + Math.round(baseStr * 1.2) + ")");
}

function updateInvDivs () {
	var weaponsDiv = $("#weaponsDiv")[0];
	weaponsDiv = "";
	for (var i = 0; i < 5; i++) {
		weaponsDiv.appendChild(buildWeaponDiv());
	};
}

function createArray (length) {
	var arr = new Array(length || 0),
	i = length;

	if (arguments.length > 1) {
		var args = Array.prototype.slice.call(arguments, 1);
		while(i--) arr[length-1 - i] = createArray.apply(this, args);
	}

	return arr;
}

function contains (set, x, y) {
	for (var i = set.length - 1; i >= 0; i--) {
		var node = set[i];
		if (node.x == x && node.y == y)
			return true;
	}
	return false;
}

function pickWeighted (options) {
	var sum = 0;
	for (var i = options.length - 1; i >= 0; i--) {
		sum += options[i].frequency;
	}

	var seed = Math.random() * sum;
	var step = 0;
	for (var i = options.length - 1; i >= 0; i--) {
		step += options[i].frequency;
		if (seed < step)
			return options[i];
	}
}

function getElementsWithAttribute(attrib) {
    return document.querySelectorAll('[' + attrib + ']');
}

function cyan (string) {
	return "<span style=\"color:" + COLOR_CYAN + "\">" + string + "</span>";
}

function white (string) {
	return "<span style=\"color:" + COLOR_WHITISH_BLUE + "\">" + string + "</span>";	
}

function italicize (string) {
	return "<i>" + string + "</i>";
}

function robot (string) {
	var node = document.createElement("p");
	node.className = "robotText"

	node.innerHTML = italicize(white('\"' + string + '\"'));

	log(node);	
}

function captain (string) {
	var node = document.createElement("p");

	node.innerHTML = white(string);

	log(node);	
}

function updateLoot (lootType, amount) {
	var lootDiv = document.getElementById("lootDiv");

	if (loot[lootType] == 0) {
		loot[lootType] = amount;
		var node = document.createElement("p");
		node.innerHTML = createLootSpan(lootType);
		node.id = lootType;
		lootDiv.insertBefore(node, lootDiv.childNodes[0]);
		jQuery(lootDiv).animate({
			'top':'' + '' + (-1 * node.offsetHeight)
		}, 0, "linear");
		jQuery(lootDiv).animate({
			'top':'0'
		}, 250);
	} else {
		loot[lootType] += amount;
		document.getElementById(lootType).innerHTML = createLootSpan(lootType);
	}
}

function goldText (string) {
	return "<span style=\"color:" + COLOR_GOLD + "\">" + string + "</span>";
}

function light_blue (string) {
	return "<span style=\"color:" + COLOR_LIGHT_BLUE + "\">" + string + "</span>";
}

function purple (string) {
	return "<span style=\"color:" + COLOR_PURPLE + "\">" + string + "</span>";
}

function orange (string) {
	return "<span style=\"color:" + COLOR_ORANGE + "\">" + string + "</span>";
}

function light_brown (string) {
	return "<span style=\"color:" + COLOR_LIGHT_BROWN + "\">" + string + "</span>";	
}

function createLootSpan (lootType) {
	var span;
	var string;
	if (loot[lootType] > 1) {
		string = loot[lootType] + " x " + lootType;
	} else {
		string = lootType;
	}
	if (lootType == LOOT_GOLD)
		string = loot[lootType] + " Gold";

	return color(lootType, string);
}

function color (lootType, string) {
	var span;
	switch (lootType) {
		case LOOT_GOLD:
		span = goldText(string);
		break;

		case MODULE_HP_SMALL:
		span = light_blue(string);
		break;

		case MODULE_HP_MED:
		span = purple(string);
		break;

		case MODULE_HP_LRG:
		span = orange(string);
		break;

		case MODULE_STR_SMALL:
		span = purple(string);
		break;
	}
	return span;
}

function observation (string) {
	var node = document.createElement("p");
	node.innerHTML = string;
	
	log(node);	
}

function agent (string) {
	var node = document.createElement("p");

	node.innerHTML = italicize(cyan('\"' + string + ' \"'));
	
	log(node);	
}

function spendGold (amount) {
	addHitText(new GoldText("-" + amount));

	targetGold -= amount;

	// if not running
	if (timeElapsed >= duration) {
		startGold = gold;
		duration += 1000;
		incrementGold();
	} else
		duration += 200;
	// its funny but we need duration after the if
	// but before increment gold and also if its
	// running
}

function addGold (amount) {
	addHitText(new GoldText("+" + amount));
	addHitText(new LootGoldText(amount));

	updateLoot(LOOT_GOLD, amount);

	targetGold += amount;

	// if not running
	if (timeElapsed >= duration) {
		startGold = gold;
		duration += 1000;
		incrementGold();
	} else
		duration += 200;
}

var timeElapsed = 0;
var duration = 0;
var startGold = 0;
var gold = 100;
var targetGold = 100;
var step = 1000/60;
function incrementGold () {
	var amount = targetGold - startGold;
	gold = startGold + Math.round(getAmount(timeElapsed, 0, 1, duration) * amount);

	timeElapsed += step;

	if (timeElapsed < duration)
		window.setTimeout(incrementGold, step);
	else  {
		duration = 0;
		timeElapsed = 0;
	}
	document.getElementById("gold").innerHTML = "Gold: " + gold;
}
	
function getAmount (t, b, c, d) {
	if ((t/=d/2) < 1) return c/2*t*t*t + b;
	return c/2*((t-=2)*t*t + 2) + b;
}

mainText = [];
sideText = [];
function addHitText (node) {
	if (node.side)
		sideText.unshift(node);
	else
		mainText.unshift(node);

	if (sideText.length + mainText.length == 1) {
		animateText();
	}
}

function ItemDropText (item, side) {
	this.side = side;
	if (side) {
		this.x = 200;
		this.y = 350;
		this.fy = 400;
	} else {
		this.x = playerX + 48;
		this.y = playerY + 48;
		this.fy = playerY + 96;
	}
	switch (item) {
		case MODULE_HP_SMALL:
		this.text = "Hp+";
		this.fill = COLOR_LIGHT_BLUE;
		break;

		case MODULE_HP_MED:
		this.text = "Hp++";
		this.fill = COLOR_PURPLE;
		break;

		case MODULE_HP_LRG:
		this.text = "Hp+++";
		this.fill = COLOR_ORANGE;
		break;

		case MODULE_STR_SMALL:
		this.text = "Str+";
		this.fill = COLOR_PURPLE;
		break;
	}
	this.font = "28px Impact";
	this.stroke = true;
	this.dy = 1;
}

function PlayerHitText (dmg) {
	this.side = true;
	this.text = dmg;
	this.font = "28px Impact";
	this.fill = COLOR_HIT_TEXT;
	this.stroke = true;
	this.dy = 1;
	this.x = 54;
	this.y = 76;
	this.fy = 126;
}

function PlayerHealText (hp) {	
	this.side = true;
	this.text = "+" + hp;
	this.font = "28px Impact";
	this.fill = COLOR_REGEN_TEXT;
	this.stroke = true;
	this.dy = 1;
	this.x = 54;
	this.y = 76;
	this.fy = 126;
}

function PlayerMissText () {
	this.side = true;
	this.text = "miss";
	this.font = "20px Impact";
	this.fill = COLOR_MISS_TEXT;
	this.stroke = false;
	this.dy = 1;
	this.x = 54;
	this.y = 76;
	this.fy = 126;
}

function EnemyHitText (dmg) {
	this.side = true;
	this.text = "-" + dmg;
	this.font = "28px Impact";
	this.fill = COLOR_HIT_TEXT;
	this.stroke = true;
	this.dy = 1;
	this.x = 270;
	this.y = 164;
	this.fy = 214;
}

function EnemyCritText (dmg) {
	this.side = true;
	this.text = "-" + dmg;
	this.font = "40px Impact";
	this.fill = COLOR_CRIT_TEXT;
	this.stroke = true;
	this.dy = 1;
	this.x = 270;
	this.y = 164;
	this.fy = 214;
}

function EnemyMissText () {
	this.side = true;
	this.text = "miss";
	this.font = "20px Impact";
	this.fill = COLOR_MISS_TEXT;
	this.stroke = false;
	this.dy = 1;
	this.x = 270;
	this.y = 164;
	this.fy = 214;
}

function EnemyHealText (hp) {	
	this.side = true;
	this.text = "+" + hp;
	this.font = "28px Impact";
	this.fill = COLOR_REGEN_TEXT;
	this.stroke = true;
	this.dy = 1;
	this.x = 234;
	this.y = 164;
	this.fy = 214;
}

function GoldText (g) {
	this.side = false;
	this.text = g;
	this.font = "28px Impact";
	this.fill = COLOR_GOLD_TEXT;
	this.stroke = true;
	this.dy = 1;
	this.x = playerX + 48;
	this.y = playerY + 48;
	this.fy = playerY + 96;
}

function LootGoldText (g) {
	this.side = true;
	this.text = "+" + g;
	this.font = "28px Impact";
	this.fill = COLOR_GOLD_TEXT;
	this.stroke = true;
	this.dy = 1;
	this.x = 200;
	this.y = 350;
	this.fy = 400;
}

function animateText () {	
    redraw();

	if (sideText.length + mainText.length > 0)
		window.setTimeout(animateText, 1000/60)
}

function iFuckedUp () {
	document.body.scrollLeft = 0;
	document.body.scrollTop = 0;
}

// span - the object containing text
// text - the new/destination text
// scrambleTime - time in ms spend just spinning
// interval - how long in ms before changing a character
// period - how long to cycle each character to the correct choice during the unscramble
function scrambleTo (span, text, scrambleTime, interval, period) {
	span.parentNode.disabled = true;
	scrambleFor(span, text, scrambleTime, interval, period);
}

function scrambleFor (span, text, scrambleTime, interval, period) {
	if (scrambleTime > 0) {
		var array = span.innerHTML.split('');
		var charIndex = Math.floor(((Math.random() * 1000) * 1000) % array.length);
		var rndChar = randomChar();
		array[charIndex] = rndChar;
		span.innerHTML = array.join('');
		window.setTimeout(function() {scrambleFor(span, text, scrambleTime - interval, interval, period)}, interval);	
	} else {
		var uncompleted = Array.apply(null, Array(text.length)).map(function (_, i) {return i;})
		window.setTimeout(function() {resize(span, text, 0, 0, [], shuffle(uncompleted), period, interval)}, interval);	
	}
}

function resize (span, text, decypherTime, lastTime, completed, uncompleted, period, interval) {
	var array = span.innerHTML.split('');

	if (decypherTime - lastTime >= period ) {
		decypherTime = lastTime;				
		if (array.length > text.length)
			array = array.slice(0,-1);
		else if (array.length < text.length)
			array.push(randomChar());
	}

	var charIndex = Math.floor(((Math.random() * 1000) * 1000) % array.length);
	var rndChar = randomChar();
	array[charIndex] = rndChar;
	span.innerHTML = array.join('');

	if (array.length == text.length)
		window.setTimeout(function() {unscramble(span, text, decypherTime + interval, lastTime, completed, uncompleted, period, interval)}, interval);
	else
		window.setTimeout(function() {resize(span, text, decypherTime + interval, lastTime, completed, uncompleted, period, interval)}, interval);
}

function unscramble (span, text, decypherTime, lastTime, completed, uncompleted, period, interval) {
	var array = span.innerHTML.split('');

	if (decypherTime - lastTime >= period ) {
		decypherTime = lastTime;				
		var next = uncompleted.pop();
		array[next] = text[next];
		completed.push(next);
	} 

	var charIndex = uncompleted.slice(-1)[0];
	var rndChar = randomChar();
	array[charIndex] = rndChar;	
	span.innerHTML = array.join('');	

	if (uncompleted.length != 0)
		window.setTimeout(function() {unscramble(span, text, decypherTime + interval, lastTime, completed, uncompleted, period, interval)}, interval);		
	else	
		span.parentNode.disabled = false;	
}

function shuffle (array) {
	var currentIndex = array.length, temporaryValue, randomIndex ;

	while (0 !== currentIndex) {

		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
}

function randomChar () {
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
	return possible.charAt(Math.floor(Math.random() * possible.length));
	// return String.fromCharCode(Math.floor(((Math.random() * 1000) % 73) + 49));
}

function travel (dir) {

	var choiceButtons = getElementsWithAttribute('index');

	for (var i = 6; i >= 0; i--) {
		var button = choiceButtons[i];
		button.onclick = function(){};	
	}

	var dx = 1;
	var xTotal = 0;
	var xChange = 3 * 64;
	switch (dir) {
		case -3:
		dy = 4/3;
		break;

		case -2:
		dy = 1;
		break;

		case -1:
		dy = 1;
		break;

		case 0:
		dy = 0;
		break;

		case 1:
		dy = -1;
		break;

		case 2:
		dy = -1;
		break;

		case 3:
		dy = -4/3;
		break;
	}
	var yChange = dir * 64;
	var yTotal = 0;
	var fx = startX - xChange;
	var fy = startY - (dir * 64);
	scroll(dx, xTotal, xChange, dy, yTotal, yChange, dir, fx, fy);
}

function scroll (dx, xTotal, xChange, dy, yTotal, yChange, dir, fx, fy) {
	startX -= dx;
	// not done
	if (xTotal < xChange - 1) {		
		switch (dir) {
			case -3:
			if (xTotal > 32) {
				startY += dy;
				yTotal -= dy;
			}
			break;

			case -2:
			if (xTotal > 16) {
				startY += dy;
				yTotal -= dy;
			}
			break;

			case -1:
			if (xTotal > 16) {
				startY += dy;
				yTotal -= dy;
			}
			break;

			case 0:

			break;

			case 1:
			if (xTotal > 48) {
				startY += dy;
				yTotal -= dy;
			}
			break;

			case 2:
			if (xTotal > 48) {
				startY += dy;
				yTotal -= dy;
			}
			break;

			case 3:
			if (xTotal > 32) {
				startY += dy;
				yTotal -= dy;
			}
			break;
		}

		if ((dir > 0 && yTotal > yChange) || (dir < 0 && yTotal < yChange)) {
			yTotal = yChange;
			startY = fy;
			dy = 0;
		}

		window.setTimeout(function() {scroll(dx, xTotal + dx, xChange, dy, yTotal, yChange, dir, fx, fy);}, 500/60);
	}
	else {		
		startX = fx;
		startY = fy;
		mission.x += 3;
		mission.y += dir;
		switchToEvent();
		mission.getEventNode().reveal();
	}
	redraw();
}

function clone(obj) {
    if (null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
}