UPGRADE_FIELD_TRAINING1 = "Field Training I";
UPGRADE_FIELD_TRAINING2 = "Field Training II";
UPGRADE_ANATOMY_CLASS   = "Anatomy Class";
UPGRADE_CRIT_GOLD		= "Crits4Gold.com";
UPGRADE_TURBO_MODE		= "Time Dilation";

shopInventory = {};
shopInventory[UPGRADE_FIELD_TRAINING1] = new upgrade_field_training1();
shopInventory[UPGRADE_FIELD_TRAINING2] = new upgrade_field_training2();
shopInventory[UPGRADE_ANATOMY_CLASS] = new upgrade_anatomy_class();
shopInventory[UPGRADE_CRIT_GOLD] = new upgrade_crit_gold();

function upgrade_field_training1 () {
	this.name = UPGRADE_FIELD_TRAINING1;
	this.prereqs = [];
	this.description = "Regen 5hp after each encounter.";
	this.tags = ["field", "training", "1", "i", "regen", "5", "hp", "per", "encounter"];
	this.cost = 40;
}

function upgrade_field_training2 () {
	this.name = UPGRADE_FIELD_TRAINING2;
	this.prereqs = [];
	this.description = "Regen 10hp after each encounter.";
	this.tags = ["field", "training", "2", "ii", "regen", "10", "hp", "per", "encounter"];
	this.cost = 160;
}

function upgrade_anatomy_class () {
	this.name = UPGRADE_ANATOMY_CLASS;
	this.prereqs = [];
	this.description = "add a 10% chance to crit.";
	this.tags = ["anatomy", "class", "crit", "critical", "crits"];
	this.cost = 80;
}

function upgrade_crit_gold () {
	this.name = UPGRADE_CRIT_GOLD;
	this.prereqs = [UPGRADE_ANATOMY_CLASS];
	this.description = "You get a commission (25%) on crit damage.";
	this.tags = ["crit4gold", "crit", "4", "gold", ".com", "crits", "crits4gold.com"];
	this.cost = 80;
}

function buyUpgrade (upgrade) {
	// if this unlocks or makes others to expensive
	// update them
	if (targetGold >= upgrade.cost) {

		spendGold(upgrade.cost);	

		upgrades[upgrade.name] = true;
		
		updateCatalog();

		document.getElementById(upgrade.name).className = "purchased";
		var node = document.getElementById("buy" + upgrade.name);
		node.className = "purchasedButton";
		node.onclick = null;
		document.getElementById("name" + upgrade.name).className = "purchasedName";
		document.getElementById("desc" + upgrade.name).className = "purchasedDescription";
		return true;
	}
}

function updateCatalog () {
	var divs = document.getElementById("resultsDiv").childNodes;
	for (var i = divs.length - 1; i >= 0; i--) {

		var itemDiv = divs[i];

		var upgrade = shopInventory[itemDiv.id];

		// 1) title 2) portrait 3) description 4) buybutton
		var title = itemDiv.childNodes[0];
		var description = itemDiv.childNodes[2];
		var buyButton = itemDiv.childNodes[3];

		if (upgrades[upgrade.name]) {
			itemDiv.className = "purchased";
			title.className = "purchasedName";
			description.className = "purchasedDescription";
			buyButton.className = "purchasedButton";
		} else if (!prereqsMet(upgrade)) {
			itemDiv.className = "locked";
			title.className = "lockedName";
			description.className = "lockedDescription";
			buyButton.className = "purchasedButton";
		} else if (upgrade.cost <= targetGold) {
			itemDiv.className = "affordable";
			title.className = "affordableName";
			description.className = "affordableDescription";

			buyButton.className = "buyButton";
			buyButton.onclick = (function() {
				var updog = upgrade;
				return function() {
					buyUpgrade(updog);
				};
			})();
		} else {
			itemDiv.className = "expensive";
			title.className = "expensiveName";
			description.className = "expensiveDescription";
			buyButton.className = "purchasedButton";
		}
	}
}

function submitHandler () {
	clickSearch();
	return false;
}

function showAll () {
	buildCatalog(shopInventory);
}

function buildCatalog (results) {
	var container = document.getElementById("resultsDiv");
	container.innerHTML = "";
	var i = 0, j = 0;
	for (var itemName in results) {
		container.appendChild(buildItemDiv(i, j, results[itemName]));
		i++;
		if (i > 6) {
			j++;
			i = 0;
		}
	}	
}

function search () {
	var input = $("#inputForm").serialize();
	input = input.substring(7, input.length);
	var tags = input.replace(/\+/g, ' ').replace(/  +/g, ' ').split(' ');
	var results = getResults(tags);
	buildCatalog(results);
}

function getResults (tags) {
	var results = {};
	for (var tag of tags) {
		for (var itemName in shopInventory) {
			var item = shopInventory[itemName];
			var s = tag.toLowerCase();
			if (item.tags.indexOf(s) >= 0) {
				if (results.indexOf(item) < 0)
					results[itemName] = item;
			}
		}
	}
	return results;
}

function prereqsMet (upgrade) {
	for (var i = upgrade.prereqs.length - 1; i >= 0; i--) {
		prereq = upgrade.prereqs[i];
		if (!upgrades[prereq])
			return false;
	}
	return true;
}

function buildItemDiv (i, j, upgrade) {
	var result = document.createElement("div");
	result.id = upgrade.name;
	if (upgrades[upgrade.name]) 
		result.className = "purchased";
	else if (!prereqsMet(upgrade))
		result.className = "locked";
	else if (upgrade.cost <= targetGold) 
		result.className = "affordable";
	else
		result.className = "expensive";

	result.style.top = (41 * j) + "%";
	result.style.left = (25 * i) + "%";

	jQuery(result).hide();
	jQuery(result).fadeIn(250);

	var name = document.createElement("div");
	name.innerHTML = upgrade.name;
	if (upgrades[upgrade.name]) 
		name.className = "purchasedName";
	else if (!prereqsMet(upgrade))
		name.className = "lockedName";
	else if (upgrade.cost <= targetGold) 
		name.className = "affordableName";
	else
		name.className = "expensiveName";
	name.id = "name" + upgrade.name;
	result.appendChild(name);

	var portrait = document.createElement("div");
	portrait.className = "shopPortrait";
	// portrait background image is icon image
	result.appendChild(portrait);

	var description = document.createElement("p");
	if (upgrades[upgrade.name]) 
		description.className = "purchasedDescription";
	else if (!prereqsMet(upgrade))
		description.className = "lockedDescription";
	else if (upgrade.cost <= targetGold) 
		description.className = "affordableDescription";
	else
		description.className = "expensiveDescription";
	description.innerHTML = upgrade.description;
	description.id = "desc" + upgrade.name;
	result.appendChild(description);

	var buy = document.createElement("button");
	buy.innerHTML = "BUY " + upgrade.cost;
	buy.id = "buy" + upgrade.name;
	if (!upgrades[upgrade.name] && prereqsMet(upgrade))
	{
		buy.className = "buyButton";
		buy.onclick = (function() {
			var updog = upgrade;
			return function() {
				buyUpgrade(updog);
			};
		})();		
	} else if (upgrades[upgrade.name]) {
		buy.className = "purchasedButton";
	} else
		buy.className = "purchasedButton";
	result.appendChild(buy);

	return result;
}