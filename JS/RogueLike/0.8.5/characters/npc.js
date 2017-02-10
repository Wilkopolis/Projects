var ENTITY_NPC = "npc";
var STATE_SHOP = "shop";
var NAME_SHOP = "Shop-O-Matic";
var CHAR_SHOP_KEEPER = '&';
function entity_shop_keeper() {
	// draw information
	this.char = CHAR_SHOP_KEEPER;
	this.color = COLOR_DEFAULT;
	// entity information
	this.type = ENTITY_NPC;
	this.name = NAME_SHOP;
	this.solid = true;
	this.permanentSolid = true;

	this.discovered = false;

	// fill the inventory is items
	this.inventory = [];

	var itemCount = Math.round(Math.random() * 2) + 4;
	// each chest has 1 weapon/armor item
	for (var i = 0; i < itemCount; i++) {
		var loot = generateShopItem(1);
		loot.selected = false;
		this.inventory.push(loot);
	}

	this.interact = function() {
		gameState = STATE_SHOP;
		document.onkeydown = shopOnKeyDown;
		scopeNPC = this;
	}
}