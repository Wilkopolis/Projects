var SCREEN_PICKUP = 'pickup-screen';
// both mini and mega map
var SCREEN_MAP = 'map-screen';
var SCREEN_LEGEND = 'legend-screen';
// hp/xp/effects
var SCREEN_STATUS = 'status-screen';
// hp, xp, lvl, attributes, defense, maxDamage, crit%, critMod
var SCREEN_CHARACTER = 'character-screen';
// inventory screen
var SCREEN_INVENTORY = 'inventory-screen';
// hotkeys, wiki links
var SCREEN_HELP = 'help-screen';
// draw the skills
var SCREEN_SKILLS = 'skills-screen';
// constructs
var SCREEN_CONSTRUCTS = 'constructs-screen';
// attack styles
var SCREEN_ATTACK_STYLES = 'attackStyle-screen';
// skills
var SCREEN_SKILL_BAR = 'skillBar-screen';
// log of events
var SCREEN_LOG = 'log-screen';
// onscreen log
var SCREEN_ON_SCREEN_ENTITIES = 'onScreenEntities-screen';
// objectives
var SCREEN_OBJECTIVES = 'objective-screen';
// oh boy
var SCREEN_GAME = 'game-screen';
// description
var SCREEN_EXAMINE = 'description-screen';
// current room capture?
var SCREEN_CAPTURE = 'capture-screen';
// yes or no
var SCREEN_PROMPT = 'prompt';

function Window(id) {

	this.id = id;

	switch(id) {
		case SCREEN_PICKUP: this.redraw = redrawPickup; break;
		case SCREEN_MAP: this.redraw = redrawMap; break;
		case SCREEN_CHARACTER: this.redraw = redrawCharacter; break;
		case SCREEN_STATUS: this.redraw = redrawStatus; break;
		case SCREEN_SKILL_BAR: this.redraw = redrawSkillBar; break;
		case SCREEN_OBJECTIVES: this.redraw = redrawObjectives; break;
		case SCREEN_SKILLS: this.redraw = redrawSkills; break;
		case SCREEN_CONSTRUCTS: this.redraw = redrawConstructs; break;
		case SCREEN_ATTACK_STYLES: this.redraw = redrawAttackStyles; break;
		case SCREEN_ON_SCREEN_ENTITIES: this.redraw = redrawOSE; break;
		case SCREEN_INVENTORY: this.redraw = redrawInventory; break;
		case SCREEN_GAME: this.redraw = redrawGame; break;
		case SCREEN_EXAMINE: this.redraw = redrawExamine; break;
		case SCREEN_CAPTURE: this.redraw = redrawCapture; break;
		default: this.redraw = function(){}; break;
	}

	this.visible = false;
	// if default, we start with this one the screen
	// for a new player
	this.default = false;

	this.locked = false;

	// html stuff
	this.div = document.createElement('div');
	this.div.id = id;
	this.div.parentWindow = this;
	this.div.className = 'ui-widget-content';
	this.div.style.position = 'absolute';
	this.div.style.width = '100px';
	this.div.style.height = '100px';
	this.pixel_width = 100;
	this.pixel_height = 100;
	this.div.style.background = '#2B2B2B';
	this.div.style.overflow = 'hidden';
	$(this.div).hide();
	document.body.appendChild(this.div);

	$(this.div).draggable({containment: "document"});
	
	switch(id) {
		case SCREEN_PROMPT:

			this.div.style.padding = '5px';
			this.div.style.top = '25%';
			this.div.style.left = '45%';

			$(this.div).resizable({
				autohide: true, 
				handles: "all"
			});

		break;
		case SCREEN_HELP:

			this.default = true;

			this.div.style.paddingTop = '5px';
			this.div.style.paddingLeft = '5px';
			this.div.style.top = '2%';
			this.div.style.left = '1%';
			this.div.style.width = '170px';
			this.div.style.height = '380px';
			this.div.style.whiteSpace = 'nowrap';

			var title = document.createElement('p');
			title.style.color = COLOR_DEFAULT;
			title.style.font = FONT_STYLE_DEFAULT;
			title.style.margin = '0';
			title.style.marginBottom = '10px';
			title.innerHTML = 'Help';
			this.div.appendChild(title);

			$(this.div).resizable({
				autohide: true, 
				handles: "all"
			});

			// wiki
			var wiki = document.createElement('p');
			wiki.style.color = COLOR_DEFAULT;
			wiki.style.font = FONT_STYLE_DEFAULT;
			wiki.style.margin = '0';
			wiki.style.marginBottom = '10px';
			wiki.style.cursor = 'pointer';
			wiki.innerHTML = 'Wiki';
			wiki.onclick = function() {
				openInNewTab("www.google.com");
			}
			this.div.appendChild(wiki);

			// blog
			var blog = document.createElement('p');
			blog.style.color = COLOR_DEFAULT;
			blog.style.font = FONT_STYLE_DEFAULT;
			blog.style.margin = '0';
			blog.style.marginBottom = '10px';
			blog.style.cursor = 'pointer';
			blog.innerHTML = 'Blog';
			blog.onclick = function() {
				openInNewTab("www.google.com");
			}
			this.div.appendChild(blog);

			// discord
			var discord = document.createElement('p');
			discord.style.color = COLOR_DEFAULT;
			discord.style.font = FONT_STYLE_DEFAULT;
			discord.style.margin = '0';
			discord.style.marginBottom = '10px';
			discord.style.cursor = 'pointer';
			discord.innerHTML = '#discord';
			discord.onclick = function() {
				openInNewTab("www.google.com");
			}
			this.div.appendChild(discord);

			// subreddit
			var subreddit = document.createElement('p');
			subreddit.style.color = COLOR_DEFAULT;
			subreddit.style.font = FONT_STYLE_DEFAULT;
			subreddit.style.margin = '0';
			subreddit.style.marginBottom = '10px';
			subreddit.style.cursor = 'pointer';
			subreddit.innerHTML = 'Subreddit';
			subreddit.onclick = function() {
				openInNewTab("www.google.com");
			}
			this.div.appendChild(subreddit);

			// hotkeys
			var hotkeys = document.createElement('p');
			hotkeys.style.color = COLOR_DEFAULT;
			hotkeys.style.font = FONT_STYLE_DEFAULT;
			hotkeys.style.margin = '0';
			hotkeys.style.marginBottom = '10px';
			hotkeys.style.cursor = 'pointer';
			hotkeys.innerHTML = 'Hotkeys:';
			hotkeys.onclick = function() {
				openInNewTab("www.google.com");
			}
			this.div.appendChild(hotkeys);

			var hotkeys = [
			"esc/? - Help (this)",
			"r - Character Info",
			"f - Status",
			"v - Skill Bar",
			"t - Log",
			"g - Objectives",
			"b - Skills",
			"y - Constructs",
			"h - Nearby NPCs",
			"n - Attack Styles",
			"u - Examine",
			"j - Capture",
			"m - Map",
			"l - Map Legend",
			"i - Inventory",
			", - Pickup"
			];
			if (doingTutorial) {				
				var hotkeys = [
				"esc/? - Help (this)",
				"v - Skill Bar",
				"b - Skills",
				"y - Constructs",
				"h - Nearby NPCs",
				"u - Examine",
				"i - Inventory"
				];
				this.div.style.height = '250px';
			}
			for (var i = 0; i < hotkeys.length; i++) {
				var hotkey = hotkeys[i];
				var entry = document.createElement('p');
				entry.style.color = COLOR_DEFAULT;
				entry.style.font = FONT_STYLE_DEFAULT;
				entry.style.margin = '0';
				entry.style.marginLeft = '10px';
				entry.innerHTML = hotkey;
				this.div.appendChild(entry);
			}

		break;
		case SCREEN_LEGEND:

			this.div.style.paddingTop = '5px';
			this.div.style.paddingLeft = '5px';
			this.div.style.width = '308px';
			this.div.style.height = '260px';
			this.div.style.whiteSpace = 'nowrap';

			var title = document.createElement('p');
			title.style.color = COLOR_DEFAULT;
			title.style.font = FONT_STYLE_DEFAULT;
			title.style.margin = '0';
			title.style.marginBottom = '10px';
			title.innerHTML = 'Map Legend';
			this.div.appendChild(title);

			// our room

			var legendEntry = document.createElement('div');

			var roomDiv = document.createElement('div');
			roomDiv.style.width = '20px';
			roomDiv.style.height = '20px';
			roomDiv.style.position = 'absolute';
			roomDiv.style.background = COLOR_UNPOWERED_VISITED;
			roomDiv.style.lineHeight = '81%';

			var charElement = document.createElement('div');
			jQuery(roomDiv).fitText(.1);
			roomDiv.innerHTML = '@';
			roomDiv.style.color = COLOR_DEFAULT;
			roomDiv.appendChild(charElement);

			var description = document.createElement('p');
			description.className = 'characterDescription';
			description.style.marginLeft = '27px';
			description.innerHTML = ' - The room you are current in.'

			legendEntry.appendChild(roomDiv);
			legendEntry.appendChild(description);
			this.div.appendChild(legendEntry);

			// visited

			var legendEntry = document.createElement('div');

			var roomDiv = document.createElement('div');
			roomDiv.style.width = '20px';
			roomDiv.style.height = '20px';
			roomDiv.style.position = 'absolute';
			roomDiv.style.background = COLOR_UNPOWERED_VISITED;	

			var description = document.createElement('p');
			description.className = 'characterDescription';
			description.style.marginLeft = '27px';
			description.innerHTML = ' - An ordinary, visited room.'

			legendEntry.appendChild(roomDiv);
			legendEntry.appendChild(description);
			this.div.appendChild(legendEntry);

			// unvisited

			var legendEntry = document.createElement('div');

			var roomDiv = document.createElement('div');
			roomDiv.style.width = '20px';
			roomDiv.style.height = '20px';
			roomDiv.style.position = 'absolute';
			roomDiv.style.background = COLOR_UNPOWERED_UNVISITED;	

			var description = document.createElement('p');
			description.className = 'characterDescription';
			description.style.marginLeft = '27px';
			description.innerHTML = ' - A discovered but unvisited room.'

			legendEntry.appendChild(roomDiv);
			legendEntry.appendChild(description);
			this.div.appendChild(legendEntry);

			// powered

			var legendEntry = document.createElement('div');

			var roomDiv = document.createElement('div');
			roomDiv.style.width = '20px';
			roomDiv.style.height = '20px';
			roomDiv.style.position = 'absolute';
			roomDiv.style.background = COLOR_POWERED;	

			var description = document.createElement('p');
			description.className = 'characterDescription';
			description.style.marginLeft = '27px';
			description.innerHTML = ' - A powered, ordinary room.'

			legendEntry.appendChild(roomDiv);
			legendEntry.appendChild(description);
			this.div.appendChild(legendEntry);

			// objective

			var legendEntry = document.createElement('div');

			var roomDiv = document.createElement('div');
			roomDiv.style.width = '20px';
			roomDiv.style.height = '20px';
			roomDiv.style.position = 'absolute';
			roomDiv.style.background = COLOR_POWERED;
			roomDiv.style.outline = "solid #8884FF";	

			var description = document.createElement('p');
			description.className = 'characterDescription';
			description.style.marginLeft = '27px';
			description.innerHTML = ' - A room with an objective in it.'

			legendEntry.appendChild(roomDiv);
			legendEntry.appendChild(description);
			this.div.appendChild(legendEntry);
			
			// hqs

			var legendEntry = document.createElement('div');

			var roomDiv = document.createElement('div');
			roomDiv.style.width = '20px';
			roomDiv.style.height = '20px';
			roomDiv.style.position = 'absolute';
			roomDiv.style.background = COLOR_FACTIONS_UNPOWERED[FACTION_CLONES];	

			var description = document.createElement('p');
			description.className = 'characterDescription';
			description.style.marginLeft = '27px';
			description.innerHTML = ' - A room controlled by you.';

			legendEntry.appendChild(roomDiv);
			legendEntry.appendChild(description);
			this.div.appendChild(legendEntry);

			var legendEntry = document.createElement('div');

			var roomDiv = document.createElement('div');
			roomDiv.style.width = '20px';
			roomDiv.style.height = '20px';
			roomDiv.style.position = 'absolute';
			roomDiv.style.background = COLOR_FACTIONS_UNPOWERED[FACTION_ANIMAL];	

			var description = document.createElement('p');
			description.className = 'characterDescription';
			description.style.marginLeft = '27px';
			description.innerHTML = ' - A room controlled by animals.';

			legendEntry.appendChild(roomDiv);
			legendEntry.appendChild(description);
			this.div.appendChild(legendEntry);

			var legendEntry = document.createElement('div');

			var roomDiv = document.createElement('div');
			roomDiv.style.width = '20px';
			roomDiv.style.height = '20px';
			roomDiv.style.position = 'absolute';
			roomDiv.style.background = COLOR_FACTIONS_UNPOWERED[FACTION_ROBOT];	

			var description = document.createElement('p');
			description.className = 'characterDescription';
			description.style.marginLeft = '27px';
			description.innerHTML = ' - A room controlled by robots.';

			legendEntry.appendChild(roomDiv);
			legendEntry.appendChild(description);
			this.div.appendChild(legendEntry);

			var legendEntry = document.createElement('div');

			var roomDiv = document.createElement('div');
			roomDiv.style.width = '20px';
			roomDiv.style.height = '20px';
			roomDiv.style.position = 'absolute';
			roomDiv.style.background = COLOR_FACTIONS_UNPOWERED[FACTION_SOFTWARE];	

			var description = document.createElement('p');
			description.style.marginLeft = '27px';
			description.className = 'characterDescription';
			description.innerHTML = ' - A room controlled by software.';

			legendEntry.appendChild(roomDiv);
			legendEntry.appendChild(description);
			this.div.appendChild(legendEntry);

			var legendEntry = document.createElement('div');

			var roomDiv = document.createElement('div');
			roomDiv.style.width = '20px';
			roomDiv.style.height = '20px';
			roomDiv.style.position = 'absolute';
			roomDiv.style.background = COLOR_FACTIONS_UNPOWERED[FACTION_SURVIVOR];	

			var description = document.createElement('p');
			description.className = 'characterDescription';
			description.style.marginLeft = '27px';
			description.innerHTML = ' - A room controlled by survivors.';

			legendEntry.appendChild(roomDiv);
			legendEntry.appendChild(description);
			this.div.appendChild(legendEntry);
			
		break;
		case SCREEN_GAME:

			this.default = true;

			INITIAL_WIDTH = Math.round(window.innerWidth * .6);
			INITIAL_HEIGHT = Math.round(window.innerHeight * .7);

			this.div.style.width = 100 * INITIAL_WIDTH / window.innerWidth + '%';
			this.div.style.height = 100 * INITIAL_HEIGHT / window.innerHeight + '%';

			this.div.style.left = 100 * (window.innerWidth / 2 - INITIAL_WIDTH / 2) / window.innerWidth + '%';
			this.div.style.top = 100 * (window.innerHeight / 2 - INITIAL_HEIGHT / 2) / window.innerHeight + '%';

			// Grab the div we populate with html
		    this.canvas = document.createElement("canvas");
		    this.canvas.width = INITIAL_WIDTH;
			this.canvas.height = INITIAL_HEIGHT;
			this.canvas.style.width = INITIAL_WIDTH + 'px';
			this.canvas.style.height = INITIAL_HEIGHT + 'px';
			this.div.appendChild(this.canvas);

		    this.ctx = this.canvas.getContext("2d");

		    DISPLAY_WIDTH = Math.round(INITIAL_WIDTH / FONT_H_SPACE);
		    DISPLAY_HEIGHT = Math.round(INITIAL_HEIGHT / FONT_V_SPACE);

			// Define the display (screen)
			this.screen = new screen(DISPLAY_WIDTH, DISPLAY_HEIGHT);

			// global things
			screen_center_x = Math.round(DISPLAY_WIDTH/2);
			screen_center_y = Math.round(DISPLAY_HEIGHT/2);

			// mouse integration
			this.div.onmousemove = onMouseMove;
			this.div.onmousedown = onMouseDown;

			$(this.div).resizable({
				autohide: true, 
				handles: "all",
				minWidth: 256,
				minHeight: 256,
				resize: function(event, ui) {

					if (gameState == STATE_GAME)
						relight();

					this.parentWindow.pixel_width = ui.size.width;
					this.parentWindow.pixel_height = ui.size.height;

				    DISPLAY_WIDTH = Math.round(this.parentWindow.pixel_width / FONT_H_SPACE);
				    DISPLAY_HEIGHT = Math.round(this.parentWindow.pixel_height / FONT_V_SPACE);
		    
				    this.parentWindow.canvas.width = this.parentWindow.pixel_width;
					this.parentWindow.canvas.height = this.parentWindow.pixel_height;
					this.parentWindow.canvas.style.width = this.parentWindow.pixel_width + 'px';
					this.parentWindow.canvas.style.height = this.parentWindow.pixel_height + 'px';

					// calculate 
					screen_center_x = Math.round(DISPLAY_WIDTH/2);
					screen_center_y = Math.round(DISPLAY_HEIGHT/2);

					this.parentWindow.redraw(gameTicks);
				} 
			});

		break;
		case SCREEN_EXAMINE:

			this.default = false;

			this.div.style.paddingTop = '5px';
			this.div.style.paddingLeft = '5px';

			var title = document.createElement('p');
			title.style.color = COLOR_DEFAULT;
			title.style.font = FONT_STYLE_DEFAULT;
			title.style.margin = '0';
			title.style.marginBottom = '10px';
			title.innerHTML = 'Examine';
			this.div.appendChild(title);

			$(this.div).resizable({
				autohide: true, 
				handles: "all"
			});

			// always need to have one of these
			this.contentDiv = document.createElement('div');
			this.contentDiv.style.overflowY = 'auto';
			this.div.appendChild(this.contentDiv);

		break;
		case SCREEN_CAPTURE:

			this.default = true;

			this.div.style.paddingTop = '5px';
			this.div.style.paddingLeft = '5px';
			this.div.style.paddingRight = '5px';
			this.div.style.top = '6%';
			this.div.style.right = '20.05%';
			this.div.style.width = '10%';
			this.div.style.height = '8%';

			var title = document.createElement('p');
			title.style.color = COLOR_DEFAULT;
			title.style.font = FONT_STYLE_DEFAULT;
			title.style.margin = '0';
			title.style.marginBottom = '10px';
			title.innerHTML = 'Capture';
			this.div.appendChild(title);

			$(this.div).resizable({
				autohide: true, 
				handles: "all"
			});

			// always need to have one of these
			this.contentDiv = document.createElement('div');
			this.contentDiv.style.height = '40px';
			this.div.appendChild(this.contentDiv);

		break;
		case SCREEN_ON_SCREEN_ENTITIES:

			this.default = true;

			this.div.style.paddingTop = '5px';
			this.div.style.paddingLeft = '5px';
			this.div.style.top = 100 * window.innerWidth * .2025 / window.innerHeight + '%';
			this.div.style.left = '80%';
			this.div.style.width = '12%';
			this.div.style.height = '10%';

			var title = document.createElement('p');
			title.style.color = COLOR_DEFAULT;
			title.style.font = FONT_STYLE_DEFAULT;
			title.style.margin = '0';
			title.style.marginBottom = '10px';
			title.innerHTML = 'Nearby';
			this.div.appendChild(title);

			$(this.div).resizable({
				autohide: true, 
				handles: "all"
			});

			// always need to have one of these
			this.contentDiv = document.createElement('div');
			this.div.appendChild(this.contentDiv);

		break;
		case SCREEN_LOG:

			this.default = true;

			this.div.style.paddingTop = '5px';
			this.div.style.paddingLeft = '5px';
			this.div.style.top = '50%';
			this.div.style.left = '0%';
			this.div.style.width = '19.5%';
			this.div.style.height = '17%';

			var title = document.createElement('p');
			title.style.color = COLOR_DEFAULT;
			title.style.font = FONT_STYLE_DEFAULT;
			title.style.margin = '0';
			title.style.marginBottom = '10px';
			title.innerHTML = 'Log';
			this.div.appendChild(title);

			$(this.div).resizable({
				autohide: true, 
				handles: "all"
			});

			// always need to have one of these
			this.contentDiv = document.createElement('div');
			this.contentDiv.style.overflowY = 'scroll';
			this.div.appendChild(this.contentDiv);

		break;
		case SCREEN_SKILLS:

			this.div.style.paddingTop = '5px';
			this.div.style.paddingLeft = '5px';
			this.div.style.width = '30%';
			this.div.style.height = '80%';

			// the skills every class has
			this.commonSkillsDiv = document.createElement('div');
			this.divOne = document.createElement('div');
			this.divOne.style.float = 'left';

			var title = document.createElement('p');
			title.style.color = COLOR_DEFAULT;
			title.style.font = FONT_STYLE_DEFAULT;
			title.style.marginTop = '5px';
			title.style.marginLeft = '5px';
			title.innerHTML = 'Skills';

			this.divOne.appendChild(title);
			this.divOne.appendChild(this.commonSkillsDiv);
			this.div.appendChild(this.divOne);

				$(this.div).resizable({
					autohide: true, 
					handles: "all"
				});

			if (!doingTutorial) {

				// the skills only your class has
				this.classSkillsDiv = document.createElement('div');
				this.divTwo = document.createElement('div');
				this.divTwo.style.float = 'left';

				var title = document.createElement('p');
				title.style.color = COLOR_DEFAULT;
				title.style.font = FONT_STYLE_DEFAULT;
				title.style.marginLeft = '5px';
				title.style.marginBottom = '10px';
				title.style.marginTop = '10px';
				title.innerHTML = 'Class Skills';
				
				this.divTwo.appendChild(title);
				this.divTwo.appendChild(this.classSkillsDiv);
				this.div.appendChild(this.divTwo);

			}

		break;
		case SCREEN_INVENTORY:

			this.div.style.paddingTop = '5px';
			this.div.style.paddingLeft = '5px';
			this.div.style.width = '200px';
			this.div.style.height = '300px';

			var title = document.createElement('p');
			title.style.color = COLOR_DEFAULT;
			title.style.font = FONT_STYLE_DEFAULT;
			title.style.marginTop = '5px';
			title.style.marginLeft = '5px';
			title.innerHTML = 'Inventory';

			this.divOne = document.createElement('div');
			this.divOne.appendChild(title);
			this.itemsDiv = document.createElement('div');
			this.itemsDiv.style.marginRight = '10px';
			this.divOne.appendChild(this.itemsDiv);
			this.divOne.style.float = 'left';
			this.div.appendChild(this.divOne);

			var title = document.createElement('p');
			title.style.color = COLOR_DEFAULT;
			title.style.font = FONT_STYLE_DEFAULT;
			title.style.marginLeft = '5px';
			title.style.marginBottom = '10px';
			title.style.marginTop = '10px';
			title.innerHTML = 'Equipped';

			this.divTwo = document.createElement('div');
			this.divTwo.appendChild(title);
			this.equippedDiv = document.createElement('div');
			this.divTwo.appendChild(this.equippedDiv);
			this.divTwo.style.float = 'left';
			this.div.appendChild(this.divTwo);

			$(this.div).resizable({
				autohide: true, 
				handles: "all"
			});

		break;
		case SCREEN_CONSTRUCTS:

			this.div.style.paddingTop = '5px';
			this.div.style.width = '150px';
			this.div.style.height = '150px';
			this.div.style.paddingLeft = '5px';

			var title = document.createElement('p');
			title.style.color = COLOR_DEFAULT;
			title.style.font = FONT_STYLE_DEFAULT;
			title.style.margin = '0';
			title.style.marginBottom = '10px';
			title.innerHTML = 'Constructs';
			this.div.appendChild(title);

			$(this.div).resizable({
				autohide: true, 
				handles: "all"
			});

			// always need to have one of these
			this.contentDiv = document.createElement('div');
			this.div.appendChild(this.contentDiv);

		break;
		case SCREEN_ATTACK_STYLES:

			this.div.style.paddingTop = '5px';
			this.div.style.paddingLeft = '5px';

			var title = document.createElement('p');
			title.style.color = COLOR_DEFAULT;
			title.style.font = FONT_STYLE_DEFAULT;
			title.style.margin = '0';
			title.style.marginBottom = '10px';
			title.innerHTML = 'Attack Styles';
			this.div.appendChild(title);

			$(this.div).resizable({
				autohide: true, 
				handles: "all"
			});

			// always need to have one of these
			this.contentDiv = document.createElement('div');
			this.div.appendChild(this.contentDiv);

		break;
		case SCREEN_OBJECTIVES:

			this.div.style.paddingTop = '5px';
			this.div.style.paddingLeft = '5px';

			var title = document.createElement('p');
			title.style.color = COLOR_DEFAULT;
			title.style.font = FONT_STYLE_DEFAULT;
			title.style.margin = '0';
			title.style.marginBottom = '10px';
			title.innerHTML = 'Objectives';
			this.div.appendChild(title);

			$(this.div).resizable({
				autohide: true, 
				handles: "all"
			});

			// always need to have one of these
			this.contentDiv = document.createElement('div');
			this.contentDiv.style.paddingTop = '10px';
			this.contentDiv.style.paddingLeft = '10px';
			this.div.appendChild(this.contentDiv);

		break;
		case SCREEN_CHARACTER:

			this.div.style.paddingTop = '5px';
			this.div.style.paddingLeft = '5px';

			var title = document.createElement('p');
			title.style.color = COLOR_DEFAULT;
			title.style.font = FONT_STYLE_DEFAULT;
			title.style.margin = '0';
			title.style.marginBottom = '10px';
			title.innerHTML = 'Character';
			this.div.appendChild(title);

			$(this.div).resizable({
				autohide: true, 
				handles: "all"
			});

			// always need to have one of these
			this.contentDiv = document.createElement('div');
			// this.contentDiv.style.overflowX = 'hidden';
			this.div.appendChild(this.contentDiv);

		break;
		case SCREEN_STATUS:

			this.default = true;

			this.div.style.top = '15%';
			this.div.style.left = '13%';
			this.div.style.width = '7%';
			this.div.style.height = '20%';

			var title = document.createElement('p');
			title.style.color = COLOR_DEFAULT;
			title.style.font = FONT_STYLE_DEFAULT;
			title.innerHTML = 'Status';
			title.style.margin = '0';
			title.style.marginTop = '5px';
			title.style.marginBottom = '5px';
			title.style.marginLeft = '5px';
			this.div.appendChild(title);

			// always need to have one of these
			this.contentDiv = document.createElement('div');
			this.div.appendChild(this.contentDiv);


			// draw the hp bar
			var hpBarDiv = document.createElement('div');
			var hpBar = document.createElement('div');
			hpBar.style.width = "90%";
			hpBar.style.marginLeft = "5%";
			hpBar.style.height = '20px';
			hpBar.style.background = COLOR_HP_BAR_BACKGROUND;
			var innerHpBar = document.createElement('div');
			innerHpBar.style.width = '100%';
			innerHpBar.style.background = COLOR_HP_BAR_FOREGROUND;
			innerHpBar.style.height = '20px';
			this.innerHpBar = innerHpBar;
			hpBar.appendChild(innerHpBar);
			hpBarDiv.appendChild(hpBar);

			// draw the xp bar
			var xpBar = document.createElement('div');
			xpBar.style.width = "90%";
			xpBar.style.marginLeft = "5%";
			xpBar.style.height = '7px';
			xpBar.style.background = '#131324';
			var innerXpBar = document.createElement('div');
			innerXpBar.style.width = '100%';
			innerXpBar.style.background = '#9933ff';
			innerXpBar.style.height = '7px';
			innerXpBar.style.marginBottom = '5px';
			this.innerXpBar = innerXpBar;
			xpBar.appendChild(innerXpBar);
			hpBarDiv.appendChild(xpBar);
			this.contentDiv.appendChild(hpBarDiv);

			// draw the ammo
			this.ammoDiv = document.createElement('div')
			this.ammoDiv.className = "characterDescription";
			this.ammoDiv.style.textAlign = "center";
			this.ammoDiv.style.marginTop = "5px";
			this.contentDiv.appendChild(this.ammoDiv);

			$(this.div).resizable({
				autohide: true, 
				handles: "all"
			});

		break;
		case SCREEN_SKILL_BAR:

			this.div.style.paddingLeft = '5px';
			this.div.style.paddingTop = '5px';

			var title = document.createElement('p');
			title.style.color = COLOR_DEFAULT;
			title.style.font = FONT_STYLE_DEFAULT;
			title.innerHTML = 'Skill Bar';
			title.style.margin = '0';
			title.style.marginBottom = '5px';
			this.div.appendChild(title);

			$(this.div).resizable({
				autohide: true, 
				handles: "all"
			});

		break;
		case SCREEN_PICKUP:

			this.default = true;

			this.div.style.paddingTop = '5px';
			this.div.style.paddingLeft = '5px';
			this.div.style.top = '68%';
			this.div.style.left = '0%';
			this.div.style.width = '19.5%';
			this.div.style.height = '50px';
			this.div.style.whiteSpace = 'nowrap';

			var title = document.createElement('p');
			title.style.color = COLOR_DEFAULT;
			title.style.font = FONT_STYLE_DEFAULT;
			title.innerHTML = 'Pick Up';
			title.style.margin = '0';
			this.div.appendChild(title);
			
			$(this.div).resizable({
				autohide: true, 
				handles: "all"
			});

			// always need to have one of these
			this.contentDiv = document.createElement('div');
			this.div.appendChild(this.contentDiv);

		break;
		case SCREEN_MAP:

			this.default = true;

			this.div.style.top = '0%';
			this.div.style.left = '80%';
			this.div.style.width = '20%';
			this.pixel_width = .20 * window.innerWidth;
			this.div.style.height = .20 * window.innerWidth + 'px';
			this.pixel_height = .20 * window.innerWidth;

			$(this.div).resizable({
				autohide: true, 
				handles: "all",
				aspectRatio: true,				
				resize: function(event, ui) {
					this.parentWindow.pixel_width = ui.size.width;
					this.parentWindow.pixel_height = ui.size.height;
					this.parentWindow.redraw();
				} 
			});

			// always need to have one of these
			this.contentDiv = document.createElement('div');
			this.div.appendChild(this.contentDiv);

			this.contentDiv.style.width = '100%';
			this.contentDiv.style.height = '100%';
		break;
	}

	$(this.div).mouseup(function(event) {
		if (this.id == SCREEN_PROMPT) 
			return;

		switch (event.button) {
			case 0:
	            if (Cookies.enabled) {
					Cookies.set(this.id, true);
					if (this.style.left.includes('%'))
						Cookies.set(this.id + "x", this.style.left.replace('%',"") / 100 * window.innerWidth + 'px');
					else
						Cookies.set(this.id + "x", this.style.left);
					if (this.style.top.includes('%'))
						Cookies.set(this.id + "y", this.style.top.replace('%',"") / 100 * window.innerHeight + 'px');
					else
						Cookies.set(this.id + "y", this.style.top);
					if (this.style.width.includes('%'))
						Cookies.set(this.id + "w", this.style.width.replace('%',"") / 100 * window.innerWidth + 'px');
					else
						Cookies.set(this.id + "w", this.style.width);
					if (this.style.height.includes('%'))
						Cookies.set(this.id + "h", this.style.height.replace('%',"") / 100 * window.innerHeight + 'px');
					else
						Cookies.set(this.id + "h", this.style.height);
					// turn all %'s into px after you click it once
					this.style.left = Cookies.get(this.id + "x");
					this.style.top = Cookies.get(this.id + "y");
					this.style.width = Cookies.get(this.id + "w");
					this.style.height = Cookies.get(this.id + "h");
				}
			break;
	        case 1:
		        if (this.parentWindow.locked)
					this.parentWindow.unlock();
				else
					this.parentWindow.lock(); 
				event.preventDefault();
			return;	            
	        case 2: return;
	        default: return;
	    }		
	});

	this.loadPosFromCookies = function() {
		if (doingTutorial)
			return;

		if (Cookies.enabled) {
			var verification = Cookies.get(this.id);
			if (verification != null) {
				this.div.style.left = Cookies.get(this.id + "x");
				this.div.style.top = Cookies.get(this.id + "y");
				this.div.style.width = Cookies.get(this.id + "w");
				this.div.style.height = Cookies.get(this.id + "h");
				if (this.id == SCREEN_GAME) {
					this.pixel_width = this.div.style.width.replace("px","").replace("%","");
					this.pixel_height = this.div.style.height.replace("px","").replace("%","");

				    DISPLAY_WIDTH = Math.round(this.div.style.width.replace("px","").replace("%","") / FONT_H_SPACE);
				    DISPLAY_HEIGHT = Math.round(this.div.style.height.replace("px","").replace("%","") / FONT_V_SPACE);		

					// global things
					screen_center_x = Math.round(DISPLAY_WIDTH/2);
					screen_center_y = Math.round(DISPLAY_HEIGHT/2);

					this.canvas.width = this.pixel_width;
					this.canvas.height = this.pixel_height;
					this.canvas.style.width = this.pixel_width + 'px';
					this.canvas.style.height = this.pixel_height + 'px';
				} else if (this.id == SCREEN_MAP) {					
					this.pixel_width = this.div.style.width.replace("px","").replace("%","");
					this.pixel_height = this.div.style.height.replace("px","").replace("%","");
				}
				var locked = Cookies.get(this.id + "locked");
				if (locked == "true") {
					this.lock();
				}
			}
			var visible = Cookies.get(this.id + "visible");
			if (visible == "true" || (this.default && typeof visible === 'undefined')) {
				this.show();
			}
		} else if (this.default) {
			this.show();
		}
	}

	this.show = function() {
		this.visible = true;
		Cookies.set(this.id + "visible", true);
		$(this.div).show(100);
		this.redraw(gameTicks);
	}

	this.hide = function() {
		this.visible = false;
		Cookies.set(this.id + "visible", false);
		$(this.div).hide(100);
	}

	this.lock = function() {
		this.locked = true;
		Cookies.set(this.id + "locked", this.locked);
		$(this.div).draggable( "disable" );
		if (this.id != SCREEN_LEGEND)
			$(this.div).resizable( "disable" );
		this.div.style.borderStyle = 'none';
	}

	this.unlock = function() {
		this.locked = false;
		Cookies.set(this.id + "locked", this.locked);
		$(this.div).draggable( "enable" );
		if (this.id != SCREEN_LEGEND)
			$(this.div).resizable( "enable" );
		this.div.style.borderStyle = 'solid';
	}
}

function redrawPickup() {

	// clear the entries
	while (this.contentDiv.firstChild) {
    	this.contentDiv.removeChild(this.contentDiv.firstChild);
	}

	var items = [];
	var padLength = 0;
	for (var i = onScreenEntities.length - 1; i >= 0; i--) {
		var entity = onScreenEntities[i];
		if (entity.type == ENTITY_ITEM) {
			items.push(entity);
			var pad = entity.getPrefix().length + 5;
			if (pad > padLength)
				padLength = pad;
		}
	}

	for (var i = items.length - 1; i >= 0; i--) {
		var item = items[i];
		this.contentDiv.appendChild(item.getHTMLDescription(padLength));
	}
}

function redrawOSE() {

	// clear the entries
	while (this.contentDiv.firstChild) {
    	this.contentDiv.removeChild(this.contentDiv.firstChild);
	}

	var enemies = getOSEObject();
	for (var enemyEntry in enemies) {
		var entryElement = document.createElement('p');
		entryElement.innerHTML = "<span style=\"color:" + enemies[enemyEntry].entity.color +
			"\">" + enemies[enemyEntry].entity.char + "</span>";
		entryElement.innerHTML += "<span style=\"color:" + COLOR_DEFAULT + "\">";
		entryElement.innerHTML += "  " + enemyEntry;
		if ( enemies[enemyEntry].count > 1)
			entryElement.innerHTML += " x " + enemies[enemyEntry].count;
		entryElement.innerHTML += "</span>";
		entryElement.className = 'characterDescription';
		this.contentDiv.appendChild(entryElement);
	}
}

function redrawAttackStyles() {

	// clear the entries
	while (this.contentDiv.firstChild)
    	this.contentDiv.removeChild(this.contentDiv.firstChild);

	// draw the attack styles
	for (var i = player.attackStyles.length - 1; i >= 0; i--) {
		var element = document.createElement('p');
		element.innerHTML = player.attackStyles[i].name + '  ' + player.attackStyles[i].lvl.toFixed(2);
		element.className = 'characterDescription';
		element.style.cursor = 'pointer';
		element.style.color = COLOR_CLASS_NAME;
		element.index = i;
		element.onclick = function() {
			var selectedCount = 0;
			for (var i = player.attackStyles.length - 1; i >= 0; i--)
				selectedCount += player.attackStyles[i].selected ? 1 : 0;

			if (selectedCount == 1 && player.attackStyles[this.index].selected)
				return;

			player.attackStyles[this.index].selected = !player.attackStyles[this.index].selected;
			this.style.color = player.attackStyles[this.index].selected ? COLOR_SELECT_CLASS_NAME : COLOR_CLASS_NAME;
		}
		
		if (i == attackStyleCursorPos && attackStyleSelecting)
			element.innerHTML = '[' + element.innerHTML + ']';
		
		if (player.attackStyles[i].selected)
			element.style.color = COLOR_SELECT_CLASS_NAME;

		this.contentDiv.appendChild(element);
	}
}

function redrawInventory() {

	while (this.itemsDiv.firstChild)
    	this.itemsDiv.removeChild(this.itemsDiv.firstChild);
	while (this.equippedDiv.firstChild)
    	this.equippedDiv.removeChild(this.equippedDiv.firstChild);

	var weapons = [];
	var hats = [];
	var bodies = [];
	var modules = [];
	var consumables = [];
	var accessories = [];
	var objectiveItems = [];
	for (var i = player.inventory.length - 1; i >= 0; i--) {
		var item = player.inventory[i]
		switch(item.slot) {
			case SLOT_WIELDABLE:weapons.push(item);break;
			case SLOT_MODULE:modules.push(item);break;
			case SLOT_HEAD:hats.push(item);break;
			case SLOT_BODY:bodies.push(item);break;
			case SLOT_CONSUMABLE:consumables.push(item);break;
			case SLOT_ACCESSORY:accessories.push(item);break;
			default: objectiveItems.push(item);break;
		}
	}
	var itemSum = 0;
	if (weapons.length > 0) {
		var element = document.createElement('p');
		element.innerHTML = "Weapons";
		element.className = 'characterDescription';
		this.itemsDiv.appendChild(element);

		for (var i = 0; i < weapons.length; i++) {
			var item = weapons[i];

			var element = document.createElement('p');
			element.innerHTML = item.name;
			if (item.canBeEquipped(player) || item.equipped) {
				$(element).click({item: item}, clickItem);
				element.style.cursor = 'pointer';
			}

			element.className = 'itemEntry';

			// if equipped, build a string to show that
			if (item.equipped) {				
				element.innerHTML = CHAR_EQUIPPED_ITEM + ' ' + item.name;
				element.style.color = COLOR_EQUIPPED;
			}

			this.itemsDiv.appendChild(element);
		}
	}
	if (hats.length > 0) {
		var element = document.createElement('p');
		element.innerHTML = "Hats";
		element.className = 'characterDescription';
		this.itemsDiv.appendChild(element);

		for (var i = 0; i < hats.length; i++) {
			var item = hats[i];

			var element = document.createElement('p');
			element.innerHTML = item.name;
			element.className = 'itemEntry';
			if (item.canBeEquipped(player) || item.equipped) {				
				$(element).click({item: item}, clickItem);
				element.style.cursor = 'pointer';
			}

			// if equipped, build a string to show that
			if (item.equipped) {				
				element.innerHTML = CHAR_EQUIPPED_ITEM + ' ' + item.name;
				element.style.color = COLOR_EQUIPPED;
			}

			this.itemsDiv.appendChild(element);
		}
	}
	if (bodies.length > 0) {
		var element = document.createElement('p');
		element.innerHTML = "Chests";
		element.className = 'characterDescription';
		this.itemsDiv.appendChild(element);

		for (var i = 0; i < bodies.length; i++) {
			var item = bodies[i];

			var element = document.createElement('p');
			element.innerHTML = item.name;
			element.className = 'itemEntry';
			if (item.canBeEquipped(player) || item.equipped) {				
				$(element).click({item: item}, clickItem);
				element.style.cursor = 'pointer';
			}

			// if equipped, build a string to show that
			if (item.equipped) {				
				element.innerHTML = CHAR_EQUIPPED_ITEM + ' ' + item.name;
				element.style.color = COLOR_EQUIPPED;
			}

			this.itemsDiv.appendChild(element);
		}
	}
	if (modules.length > 0) {
		var element = document.createElement('p');
		element.innerHTML = "Modules";
		element.className = 'characterDescription';
		this.itemsDiv.appendChild(element);

		for (var i = 0; i < modules.length; i++) {
			var item = modules[i];

			var element = document.createElement('p');
			element.innerHTML = item.name;
			element.className = 'itemEntry';
			if (item.canBeEquipped(player) || item.equipped) {				
				$(element).click({item: item}, clickItem);
				element.style.cursor = 'pointer';
			}

			// if equipped, build a string to show that
			if (item.equipped) {				
				element.innerHTML = CHAR_EQUIPPED_ITEM + ' ' + item.name;
				element.style.color = COLOR_EQUIPPED;
			}

			this.itemsDiv.appendChild(element);
		}
	}
	if (accessories.length > 0) {
		var element = document.createElement('p');
		element.innerHTML = "Accessories";
		element.className = 'characterDescription';
		this.itemsDiv.appendChild(element);

		for (var i = 0; i < accessories.length; i++) {
			var item = accessories[i];

			var element = document.createElement('p');
			element.innerHTML = item.name;
			element.className = 'itemEntry';
			if (item.canBeEquipped(player) || item.equipped) {				
				$(element).click({item: item}, clickItem);
				element.style.cursor = 'pointer';
			}

			// if equipped, build a string to show that
			if (item.equipped) {				
				element.innerHTML = CHAR_EQUIPPED_ITEM + ' ' + item.name;
				element.style.color = COLOR_EQUIPPED;
			}

			this.itemsDiv.appendChild(element);
		}
	}
	if (consumables.length > 0) {
		var element = document.createElement('p');
		element.innerHTML = "Consumables";
		element.className = 'characterDescription';
		this.itemsDiv.appendChild(element);

		for (var i = 0; i < consumables.length; i++) {
			var item = consumables[i];

			var element = document.createElement('p');
			element.innerHTML = item.name;
			element.className = 'itemEntry';			
			$(element).click({item: item}, consume);
			element.style.cursor = 'pointer';

			// if equipped, build a string to show that
			if (item.equipped) {				
				element.innerHTML = CHAR_EQUIPPED_ITEM + ' ' + item.name;
				element.style.color = COLOR_EQUIPPED;
			}

			this.itemsDiv.appendChild(element);
		}
	}
	if (objectiveItems.length > 0) {
		var element = document.createElement('p');
		element.innerHTML = "Task Items";
		element.className = 'characterDescription';
		this.itemsDiv.appendChild(element);

		for (var i = 0; i < objectiveItems.length; i++) {
			var item = objectiveItems[i];

			var element = document.createElement('p');
			element.innerHTML = item.name;
			element.className = 'itemEntry';

			// if equipped, build a string to show that
			if (item.equipped) {				
				element.innerHTML = CHAR_EQUIPPED_ITEM + ' ' + item.name;
				element.style.color = COLOR_EQUIPPED;
			}

			this.itemsDiv.appendChild(element);
		}
	}

	// draw equipment
	var nothingString = 'Nothing';

	var element = document.createElement('p');
	element.innerHTML = 'Head - ';
	element.className = 'characterDescription';
	if (player.head != ITEM_NONE)
		element.innerHTML += "<span style=\"color:" + COLOR_EQUIPPED + "\">" + player.head.name + "</span>";
	else
		element.innerHTML += "<span style=\"color:" + COLOR_UNEQUIPPED + "\">" + nothingString + "</span>";
	$(element).click({item: item}, clickItem);
	element.style.cursor = 'pointer';
	this.equippedDiv.appendChild(element);

	var index = 0;
	var lastArm = 0;
	for (var i = 0; i < player.armCount; i++) {
		var wieldedString = nothingString;
		var equipped = false;
		if (player.wielded.length > index) {
			wieldedString = player.wielded[index].name;
			equipped = true;
			if (i - lastArm == player.wielded[index].handCount || player.wielded[index].handCount == 1) {
				index++;
				lastArm = i;
			}
		}
		var element = document.createElement('p');
		element.innerHTML = 'Hand'+ (i+1) + ' - ';
		element.className = 'characterDescription';
		if (equipped)
			element.innerHTML += "<span style=\"color:" + COLOR_EQUIPPED + "\">" + wieldedString + "</span>";
		else
			element.innerHTML += "<span style=\"color:" + COLOR_UNEQUIPPED + "\">" + nothingString + "</span>";
		$(element).click({item: item}, clickItem);
		element.style.cursor = 'pointer';
		this.equippedDiv.appendChild(element);
	}

	var element = document.createElement('p');
	element.innerHTML = 'Body - ';
	element.className = 'characterDescription';
	if (player.body != ITEM_NONE)
		element.innerHTML += "<span style=\"color:" + COLOR_EQUIPPED + "\">" + player.body.name + "</span>";
	else
		element.innerHTML += "<span style=\"color:" + COLOR_UNEQUIPPED + "\">" + nothingString + "</span>";
	$(element).click({item: item}, clickItem);
	element.style.cursor = 'pointer';
	this.equippedDiv.appendChild(element);

	for (var i = 0; i < player.maxAccessories; i++) {
		var accessory = player.accessories[i];
		var element = document.createElement('p');
		element.innerHTML = 'Accessory'+ (i+1) + ' - ';
		if (accessory != null)
			element.innerHTML += "<span style=\"color:" + COLOR_EQUIPPED + "\">" + accessory.name + "</span>";
		else
			element.innerHTML += "<span style=\"color:" + COLOR_UNEQUIPPED + "\">" + nothingString + "</span>";
		$(element).click({item: item}, clickItem);
		element.style.cursor = 'pointer';
		element.className = 'characterDescription';
		this.equippedDiv.appendChild(element);
	}
	for (var i = 0; i < player.maxModules; i++) {
		var module = player.modules[i];
		var element = document.createElement('p');
		element.innerHTML = 'Module'+ (i+1) + ' - ';
		element.className = 'characterDescription';
		if (module != null)
			element.innerHTML += "<span style=\"color:" + COLOR_EQUIPPED + "\">" + module.name + "</span>";
		else
			element.innerHTML += "<span style=\"color:" + COLOR_UNEQUIPPED + "\">" + nothingString + "</span>";
		$(element).click({item: item}, clickItem);
		element.style.cursor = 'pointer';
		this.equippedDiv.appendChild(element);
	}
}

function redrawMap() {

	// clear the minimap
	while (this.contentDiv.firstChild)
    	this.contentDiv.removeChild(this.contentDiv.firstChild);

	// calculate the aspect ratio
	var aspectRatio = 1;
	// get width/height
	var width = this.pixel_width, height = this.pixel_height;
	// get the dimensions of the map blocks in pixels
	var blockSize = height / (workingHeight > workingWidth ? workingHeight : workingWidth);

	var centerOffset = Math.abs(workingHeight - workingWidth);
	var verticalCenteringOffset = 0;
	var horizontalCenteringOffset = 0;
	if (workingHeight > workingWidth)
		horizontalCenteringOffset = centerOffset / 2;
	else if (workingWidth > workingHeight)
		verticalCenteringOffset = centerOffset / 2;

	// the minimap is always going to be a fixed aspect ratio of 1
	for (var i = mapYMin; i < mapYMin + display_height_minimap; i++) {
		for (var j = mapXMin; j < mapXMin + display_width_minimap; j++) {
			// map info
			var roomSegment = minimap[i][j];
			var room = roomLookup[roomSegment.hash];

			if (roomSegment.hash == 0)
				continue;

			// style elements
			var pixelChar;
			var fontStyle = FONT_STYLE_4X;
			var color;

			// pick the color we have so many colors
			var selected = minimap[fourXCursor.y][fourXCursor.x].hash == roomSegment.hash;
			var ourRoom = roomSegment.hash == dungeon.getRoom().hash;
			var powered = room.powered;
			var visited = roomSegment.visited;
			var partVisited = room.partVisited;
			var discovered = room.discovered;
			var objective = room.objective != "";
			var captured = room.captureAmount == room.captureRequired;
			var vault = room.event == FLAVOR_VAULT;

			if (!discovered)
				continue;					
			else {
				var roomDiv = document.createElement('div');
				roomDiv.style.position = 'absolute';
				roomDiv.style.top = (i - workingYMin + verticalCenteringOffset + .125) * blockSize + 'px';
				roomDiv.style.left = (j - workingXMin + horizontalCenteringOffset + .125) * blockSize + 'px';
				roomDiv.style.width = blockSize * .75 + 'px';
				roomDiv.style.height = blockSize * .75 + 'px';
				roomDiv.style.background = COLOR_DEFAULT;		
				roomDiv.style.lineHeight = '81%';

				if ((factions[FACTION_CLONES].power > 0 || room.powered) && visited) {
					roomDiv.style.cursor = 'pointer';
					$(roomDiv).click({room: room}, togglePower);
				}

				this.contentDiv.appendChild(roomDiv);

				if (ourRoom) {
					var charElement = document.createElement('div');
					jQuery(roomDiv).fitText(.1);
					roomDiv.innerHTML = '@';
					roomDiv.style.color = COLOR_DEFAULT;
					roomDiv.appendChild(charElement);
				}

				// selecting the color
				if (!partVisited)
					roomDiv.style.background = COLOR_UNPOWERED_UNVISITED;
				else if (captured && !powered)
					roomDiv.style.background = COLOR_FACTIONS_UNPOWERED[room.faction];
				else if (captured && powered)
					roomDiv.style.background = COLOR_FACTIONS_POWERED[room.faction];
				else if (!powered)
					roomDiv.style.background = COLOR_UNPOWERED_VISITED
				else if (powered)
					roomDiv.style.background = COLOR_POWERED;

				if (objective && partVisited) {
					roomDiv.style.outline = "solid #8884FF";
				}
			}
		}
	}
}

function redrawCharacter() {

	// clear the entries
	while (this.contentDiv.firstChild)
    	this.contentDiv.removeChild(this.contentDiv.firstChild);

	var elementsToAdd = [];

	// draw class
	var element = document.createElement('p');
	element.className = 'characterDescription';
	element.innerHTML = '\u00A0Class: ' + player.class;
	elementsToAdd.push(element);

	// draw Hp
	var element = document.createElement('p');
	element.className = 'characterDescription';
	element.innerHTML = '\u00A0\u00A0\u00A0\u00A0HP: ' + player.hp + "/" + player.hpMax;
	elementsToAdd.push(element);

	// draw Xp
	var element = document.createElement('p');
	element.className = 'characterDescription';
	element.innerHTML = '\u00A0\u00A0\u00A0\u00A0XP: ' + player.xp + "/" + player.nextLevelXp;	
	elementsToAdd.push(element);

	// draw the level
	var element = document.createElement('p');
	element.className = 'characterDescription';
	element.innerHTML = '\u00A0\u00A0\u00A0Lvl: ' + player.level;	
	elementsToAdd.push(element);

	// draw the skill points
	var element = document.createElement('p');
	element.className = 'characterDescription';
	element.innerHTML = '\u00A0\u00A0\u00A0\u00A0SP: ' + player.skillPoints;
	elementsToAdd.push(element);

	// draw the attribute points
	var element = document.createElement('p');
	element.className = 'characterDescription';
	element.innerHTML = '\u00A0\u00A0\u00A0\u00A0AP: ' + player.attributePoints;
	elementsToAdd.push(element);
	
	// draw the wealth
	var element = document.createElement('p');
	element.className = 'characterDescription';
	element.innerHTML = "Wealth: " + factions[FACTION_CLONES].wealth;
	elementsToAdd.push(element);

	var element = document.createElement('p');
	element.className = 'characterDescription';
	element.innerHTML = "\u00A0Power: " + factions[FACTION_CLONES].power;
	elementsToAdd.push(element);

	var element = document.createElement('p');
	element.className = 'characterDescription';
	element.innerHTML = "\u00A0\u00A0\u00A0WPT: " + factions[FACTION_CLONES].wpt;
	elementsToAdd.push(element);

	var def = player.getDef();
	var element = document.createElement('p');
	element.className = 'characterDescription';
	element.innerHTML = "\u00A0\u00A0\u00A0Def: " + def;
	elementsToAdd.push(element);

	// draw the attributes	
	var element = document.createElement('p');
	element.className = 'characterDescription';
	element.innerHTML = "\u00A0\u00A0\u00A0Str: " + player.strength;
	elementsToAdd.push(element);
	
	var element = document.createElement('p');
	element.className = 'characterDescription';
	element.innerHTML = "\u00A0\u00A0Will: " + player.willpower;
	elementsToAdd.push(element);
	
	var element = document.createElement('p');
	element.className = 'characterDescription';
	element.innerHTML = "\u00A0\u00A0\u00A0Con: " + player.constitution;
	elementsToAdd.push(element);
	
	var element = document.createElement('p');
	element.className = 'characterDescription';
	element.innerHTML = "\u00A0\u00A0\u00A0Per: " + player.perception;
	elementsToAdd.push(element);
	
	var element = document.createElement('p');
	element.className = 'characterDescription';
	element.innerHTML = "\u00A0\u00A0Lead: " + player.leadership;
	elementsToAdd.push(element);

	var element = document.createElement('p');
	element.className = 'characterDescription';
	element.innerHTML = "\u00A0\u00A0Ammo: " + player.bullets;
	elementsToAdd.push(element);

	for (var i = 0; i < elementsToAdd.length; i++) {
		this.contentDiv.appendChild(elementsToAdd[i]);
	}
}

function redrawStatus() {

	// draw the hp bar
	this.innerHpBar.style.width = player.hp/player.hpMax * 100 + '%';

	// draw the xp bar
	this.innerXpBar.style.width = player.xp/player.nextLevelXp * 100 + '%';

	this.ammoDiv.innerHTML = CHAR_GUN + ": " + player.bullets;

	// draw the stasuses
	var effects = player.getEffects();
	var effectDivs_keys = Object.keys(effectDivs);
	var runningDivHeight = 5;
	for (var i = 0; i < effectDivs_keys.length; i++) {
		var key = effectDivs_keys[i];
		var div = effectDivs[key];
		// if its onscreen
		if (div.style.display == 'block') {
			// check if its still applicable
			if (effects[div.id] != null) {
				// update the width if we have to
				var percent = effects[div.id].percent * 100 + '%';
				var percentDiv = div.children[0];
				if (percentDiv.style.width != percent)
					percentDiv.style.width = percent;

				var titleSpan = div.children[1];
				if (player.skills.skillObject[key].on) {
					percentDiv.style.background = COLOR_DEFAULT;
					titleSpan.style.color = COLOR_STATUS_ACTIVE;
				} else {
					percentDiv.style.background = player.skills.skillObject[key].activatable ? COLOR_STATUS_ACTIVE : COLOR_STATUS_PASSIVE;;
					titleSpan.style.color = COLOR_DEFAULT;
				}

				if (div.style.height != runningDivHeight)
					div.style.height = runningDivHeight;
				runningDivHeight += 30;

				effects[div.id].used = true;
			}
		} else {
			if (effects[div.id]) {
				// update the width if we have to
				var percent = effects[div.id].percent * 100  + '%';
				var percentDiv = div.children[0];
				if (percentDiv.style.width != percent)
					percentDiv.style.width = percent;

				if (div.style.height != runningDivHeight)
					div.style.height = runningDivHeight;
				runningDivHeight += 30;

				div.style.display = 'block';

				effects[div.id].used = true;
			}
		}
	}

	var effect_keys = Object.keys(effects);
	for (var i = effect_keys.length - 1; i >= 0; i--) {
		var key = effect_keys[i];
		var effect = effects[key];
		// the div does not exist, make it
		if (!effect.used) {
			// create skill div
			var newDiv = document.createElement('div');
			// set its name to our skill/status name
			newDiv.id = key;
			// style it
			newDiv.className = 'statusDiv';
			// newDiv.style.width = 20 + 8 * key.length + 'px';
			newDiv.style.marginTop = runningDivHeight + 'px';
			newDiv.style.display = 'block';
			runningDivHeight += 30;

			newDiv.onmousedown = getEffectOnMouseDown(key);

			// if its a skill, it will show up here
			if (player.skills.skillObject[key] && player.skills.skillObject[key].canBeUsed())
				newDiv.style.cursor = 'pointer';

			// make the percent bar div
			var percentDiv = document.createElement('div');
			// set its name to our skill/status name
			percentDiv.id = key + 'Percent';
			// style it
			percentDiv.className = 'percentDiv';
			// try from the right for width line of reasons 
			percentDiv.style.width = effect.percent * 100 + '%';
			percentDiv.style.background = player.skills.skillObject[key].activatable ? COLOR_STATUS_ACTIVE : COLOR_STATUS_PASSIVE;
			newDiv.appendChild(percentDiv);

			// make the title div
			var titleSpan = document.createElement('span');
			// set its name to our skill/status name
			titleSpan.id = key + 'Span';
			titleSpan.innerHTML = key;
			// style it
			titleSpan.className = 'titleSpan';
			// try from the right for width line of reasons 
			titleSpan.style.width = '100%';
			newDiv.appendChild(titleSpan);

			// add it to our collection
			effectDivs[key] = newDiv;
			// add it to screen
			this.contentDiv.appendChild(newDiv);
		}
	}
}

function redrawSkillBar() {
	var effects = player.getActiveSkills();
	var effectDivs_keys = Object.keys(effectDivs);	
	for (var i = 0; i < effectDivs_keys.length; i++) {
		var key = effectDivs_keys[i];
		var div = effectDivs[key];
		// if its onscreen
		if (div.style.display == 'block') {
			// check if its still applicable
			if (effects[div.id] != null) {
				// update the width if we have to
				var percent = effects[div.id].percent * 100 + '%';
				var percentDiv = div.children[0];
				if (percentDiv.style.width != percent)
					percentDiv.style.width = percent;

				if (player.skills.skillObject[div.id].canBeUsed() && player.skills.skillObject[div.id].activatable)
					div.style.cursor = 'pointer';
				else
					div.style.cursor = '';

				var titleSpan = div.children[1];
				if (player.skills.skillObject[key].on) {
					percentDiv.style.background = COLOR_DEFAULT;
					titleSpan.style.color = COLOR_STATUS_ACTIVE;
				} else {
					percentDiv.style.background = player.skills.skillObject[key].activatable ? COLOR_STATUS_ACTIVE : COLOR_STATUS_PASSIVE;;
					titleSpan.style.color = COLOR_DEFAULT;
				}

				effects[div.id].used = true;
			}
		} else {
			if (effects[div.id]) {
				// update the width if we have to
				var percent = effects[div.id].percent * 100  + '%';
				var percentDiv = div.children[0];
				if (percentDiv.style.width != percent)
					percentDiv.style.width = percent;

				div.style.display = 'block';

				effects[div.id].used = true;
			}
		}
	}

	var effect_keys = Object.keys(effects);
	for (var i = effect_keys.length - 1; i >= 0; i--) {
		var key = effect_keys[i];
		var effect = effects[key];
		// the div does not exist, make it
		if (!effect.used) {
			// create skill div
			var newDiv = document.createElement('div');
			// set its name to our skill/status name
			newDiv.id = key;
			// style it
			newDiv.className = 'skillDiv';
			newDiv.style.width = 20 + 8 * key.length + 'px';
			// newDiv.style.marginTop = runningDivHeight + 'px';
			newDiv.style.display = 'block';
			// runningDivHeight += 30;

			newDiv.onmousedown = getEffectOnMouseDown(key);

			// if its a skill, it will show up here
			if (player.skills.skillObject[key] && player.skills.skillObject[key].canBeUsed())
				newDiv.style.cursor = 'pointer';

			// make the percent bar div
			var percentDiv = document.createElement('div');
			// set its name to our skill/status name
			percentDiv.id = key + 'Percent';
			// style it
			percentDiv.className = 'percentDiv';
			// try from the right for width line of reasons 
			percentDiv.style.width = effect.percent * 100 + '%';
			percentDiv.style.background = player.skills.skillObject[key].activatable ? COLOR_STATUS_ACTIVE : COLOR_STATUS_PASSIVE;
			newDiv.appendChild(percentDiv);

			// make the title div
			var titleSpan = document.createElement('span');
			// set its name to our skill/status name
			titleSpan.id = key + 'Span';
			titleSpan.innerHTML = key;
			// style it
			titleSpan.className = 'skillTitleSpan';
			// try from the right for width line of reasons 
			newDiv.appendChild(titleSpan);

			// add it to our collection
			effectDivs[key] = newDiv;
			// add it to screen
			this.div.appendChild(newDiv);
		}
	}
}

function redrawObjectives() {

	// clear the entries
	while (this.contentDiv.firstChild) {
    	this.contentDiv.removeChild(this.contentDiv.firstChild);
	}

	// draw the objectives
	var taskElement = document.createElement('p');
	taskElement.className = 'characterDescription';
	taskElement.innerHTML = "Here are your assigned task(s).";
	this.contentDiv.appendChild(taskElement);

	var objs = objectives.getObjectives();
	for (var i = 0; i < objs.length; i++) {
		var taskElement = document.createElement('p');
		taskElement.className = 'characterDescription';
		taskElement.style.marginTop = '5px';
		taskElement.innerHTML = (i + 1) + ". " + objs[i].getTaskString() + ".";
		if (!objs[i].progressTicks(0))
			taskElement.style.color = COLOR_OUT_OF_SIGHT;
		this.contentDiv.appendChild(taskElement);
	}

	// draw generators powering up
	var tickers = objectives.getTickingObjectives();
	for (var i = tickers.length - 1; i >= 0; i--) {

		var taskElement = document.createElement('p');
		taskElement.className = 'characterDescription';
		taskElement.style.marginLeft = '30px';
		if (!tickers[i].started)
			taskElement.style.color = COLOR_OUT_OF_SIGHT;
		else if (tickers[i].finished && !tickers[i].failed)
			taskElement.style.color = COLOR_GENERATOR_STARTED;
		else if (tickers[i].started && tickers[i].failed)
			taskElement.style.color = COLOR_GENERATOR_FAILED;
		taskElement.innerHTML = tickers[i].getTitleString();
		this.contentDiv.appendChild(taskElement);

		var taskElement = document.createElement('p');
		taskElement.className = 'characterDescription';
		taskElement.style.marginLeft = '30px';

		var progressLength = Math.round(tickers[i].ticks / tickers[i].maxTicks * 50);
		for (var l = 50; l >= 0; l--) {
			if (l < progressLength)
				taskElement.innerHTML += '=';
		}
		
		this.contentDiv.appendChild(taskElement);
	}
}

function redrawConstructs() {

	this.div.firstChild.innerHTML = "Constructs: " + player.skillPoints;

	// clear the entries
	while (this.contentDiv.firstChild)
    	this.contentDiv.removeChild(this.contentDiv.firstChild);

	for (var i = player.skills.constructs.length - 1; i >= 0; i--) {
		var construct = player.skills.constructs[i];
		var element = document.createElement('p');
		element.skill = construct;
		// set the style
		element.className = 'characterDescription';
		// set the text
		element.innerHTML = "$" + construct.price + '|' + construct.name + ':' + construct.cost;
		if (player.skills.skillObject[SKILL_GREASING_THE_WHEELS].purchased)
			element.innerHTML += ':$' + (construct.cost * 25);
		// set the on click
		element.style.color = COLOR_CLASS_NAME;	
		if (!construct.purchased) {
			if (construct.cost <= player.skillPoints || (player.skills.skillObject[SKILL_GREASING_THE_WHEELS].purchased &&
				factions[FACTION_CLONES].wealth >= construct.cost * 25)) {
				if (doingTutorial) {
					if (construct.name == CONSTRUCT_SENTRY_I) {
						element.style.cursor = 'pointer';
						element.onclick = buySkill;
						element.style.color = COLOR_SELECT_CLASS_NAME;
					}						
				} else {
					element.style.cursor = 'pointer';
					element.onclick = buySkill;
					element.style.color = COLOR_SELECT_CLASS_NAME;
				}
			}
		}
		this.contentDiv.appendChild(element);
	}
}

function redrawSkills() {

	this.div.firstChild.firstChild.innerHTML = "Skills: " + player.skillPoints;

	// clear the entries
	while (this.commonSkillsDiv.firstChild)
    	this.commonSkillsDiv.removeChild(this.commonSkillsDiv.firstChild);
	while (!doingTutorial && this.classSkillsDiv.firstChild)
    	this.classSkillsDiv.removeChild(this.classSkillsDiv.firstChild);

	// add the common skills
	for (var i = 0; i < player.skills.defaultSkills.length; i++) {
		var skill = player.skills.defaultSkills[i];
		var element = document.createElement('p');
		element.skill = skill;
		// set the style
		element.className = 'characterDescription';
		// set the text
		element.innerHTML = skill.name + ':' + skill.cost;
		if (player.skills.skillObject[SKILL_GREASING_THE_WHEELS].purchased)
			element.innerHTML += ':$' + (skill.cost * 25);
		// set the on click
		if (!skill.purchased) {
			// if it can be bought, set the color
			element.style.color = COLOR_CLASS_NAME;	
			if (skill.requirement == null || skill.requirement.isSatisfied()) {
				if (skill.cost <= player.skillPoints || (player.skills.skillObject[SKILL_GREASING_THE_WHEELS].purchased &&
					factions[FACTION_CLONES].wealth >= skill.cost * 25)) {
					if (doingTutorial) {
						if (skill.name == SKILL_LEAP || skill.name == SKILL_MICROWAVE_I) {
							element.style.cursor = 'pointer';
							element.onclick = buySkill;
							element.style.color = COLOR_SELECT_CLASS_NAME;
						}						
					} else {
						element.style.cursor = 'pointer';
						element.onclick = buySkill;
						element.style.color = COLOR_SELECT_CLASS_NAME;
					}
				}
			}			
		}
		this.commonSkillsDiv.appendChild(element);
	}

	if (doingTutorial)
		return;

	// class skills
	for (var i = player.skills.classSkills.length - 1; i >= 0; i--) {
		var skill = player.skills.classSkills[i];
		var element = document.createElement('p');
		element.skill = skill;
		// set the style
		element.className = 'characterDescription';
		element.style.cursor = 'pointer';
		// set the text
		element.innerHTML = skill.name + ':' + skill.cost;
		if (player.skills.skillObject[SKILL_GREASING_THE_WHEELS].purchased)
			element.innerHTML += ':$' + (skill.cost * 25);
		// set the on click
		if (!skill.purchased) {
			element.onclick = buySkill;
			// if it can be bought, set the color
			if ((skill.requirement == null || skill.requirement.isSatisfied()) && (skill.cost <= player.skillPoints || 
				(player.skills.skillObject[SKILL_GREASING_THE_WHEELS].purchased &&
				factions[FACTION_CLONES].wealth >= skill.cost * 25)))
				element.style.color = COLOR_SELECT_CLASS_NAME;
			else
				element.style.color = COLOR_CLASS_NAME;				
		}
		this.classSkillsDiv.appendChild(element);
	}
}

// ZeroDay
// ZZZZZ 
//   ZZ
//  ZZ
// ZZZZZ
//
// Enemy
// faction
// Hp/Hp
// BaseDmg 
// 
// Effect1 : Description
// Effect2 : Description
// 
// Flavor and functional description
function redrawExamine() {

	// clear the entries
	while (this.contentDiv.firstChild)
    	this.contentDiv.removeChild(this.contentDiv.firstChild);

    if (examinedEntity == null)
    	return;

	var element = document.createElement('p');
	element.innerHTML = examinedEntity.name;
	element.className = 'characterDescription';
	this.contentDiv.appendChild(element);

	var element = document.createElement('p');
	element.innerHTML = examinedEntity.char;
	element.className = 'characterDescription';
	element.style.marginTop = '10px';
	element.style.marginBottom = '10px';
	element.style.color = examinedEntity.color;
	element.style.fontSize = '48px';
	element.style.height = '48px';
	element.style.overflow = 'hidden';
	this.contentDiv.appendChild(element);

	var element = document.createElement('p');
	element.innerHTML = ' ';
	element.className = 'characterDescription';
	this.contentDiv.appendChild(element);

	if (examinedEntity.type == ENTITY_ENEMY || examinedEntity.type == ENTITY_COMPANION) {

		var element = document.createElement('p');
		element.innerHTML = examinedEntity.type;
		element.className = 'characterDescription';
		this.contentDiv.appendChild(element);

		var element = document.createElement('p');
		element.innerHTML = examinedEntity.faction;
		element.className = 'characterDescription';
		this.contentDiv.appendChild(element);

		var element = document.createElement('p');
		element.innerHTML = 'Hp: ' + examinedEntity.hp + '/' + examinedEntity.hpMax;
		element.className = 'characterDescription';
		this.contentDiv.appendChild(element);

		var element = document.createElement('p');
		element.innerHTML = 'Dmg: ' + examinedEntity.baseDamage;
		element.className = 'characterDescription';
		this.contentDiv.appendChild(element);

		var element = document.createElement('p');
		element.innerHTML = 'Range: ' + (examinedEntity.range == RANGE_MELEE ? 'melee' : examinedEntity.range);
		element.className = 'characterDescription';
		this.contentDiv.appendChild(element);

		var element = document.createElement('p');
		element.innerHTML = ' ';
		element.className = 'characterDescription';
		this.contentDiv.appendChild(element);	

	} else if (examinedEntity.type == ENTITY_ITEM) {

		// different items should have different formats
		switch(examinedEntity.slot) {
			case SLOT_HEAD: 
				var element = document.createElement('p');
				element.innerHTML = "Armor";
				element.className = 'characterDescription';
				this.contentDiv.appendChild(element);
				var element = document.createElement('p');
				element.innerHTML = ' ';
				element.className = 'characterDescription';
				this.contentDiv.appendChild(element);
				var element = document.createElement('p');
				element.innerHTML = "Slot - Head";
				element.className = 'characterDescription';
				this.contentDiv.appendChild(element);
			break;
			case SLOT_WIELDABLE:
				var element = document.createElement('p');
				element.innerHTML = "Weapon";
				element.className = 'characterDescription';
				this.contentDiv.appendChild(element);
				var element = document.createElement('p');
				element.innerHTML = ' ';
				element.className = 'characterDescription';
				this.contentDiv.appendChild(element);
				if (examinedEntity.damage > 0) {					
					var element = document.createElement('p');
					element.innerHTML = 'Dmg:' + examinedEntity.damage;
					element.className = 'characterDescription';
					this.contentDiv.appendChild(element);
				}
				var element = document.createElement('p');
				element.innerHTML = 'Accuracy:' + examinedEntity.accuracy;
				element.className = 'characterDescription';
				this.contentDiv.appendChild(element);
			break;
			case SLOT_BODY: break;
			case SLOT_ACCESSORY: break;
			case SLOT_CONSUMABLE: break;
			case SLOT_NONE: break;
		}

		for (var i = examinedEntity.effects.length - 1; i >= 0; i--) {
			var effect = examinedEntity.effects[i];		
			var description = DESCRIPTIONS[effect];

			var element = document.createElement('p');
			element.innerHTML = effect + (description.description == "" ? "" : (" - " + description.description));
			element.className = 'characterDescription';
			this.contentDiv.appendChild(element);

			if (typeof description.strength !== 'undefined') {
				var element = document.createElement('p');
				element.innerHTML = "Strength: " + description.strength;
				element.className = 'characterDescription';
				element.marginLeft = '10px';
				this.contentDiv.appendChild(element);
			}

			if (typeof description.cooldown !== 'undefined') {
				var element = document.createElement('p');
				element.innerHTML = "Cooldown: " + description.cooldown;
				element.className = 'characterDescription';
				element.marginLeft = '10px';
				this.contentDiv.appendChild(element);
			}
		}
	}

	var element = document.createElement('p');
	element.innerHTML = ' ';
	element.className = 'characterDescription';
	this.contentDiv.appendChild(element);

	var element = document.createElement('p');
	element.innerHTML = examinedEntity.description;
	element.className = 'characterDescription';
	this.contentDiv.appendChild(element);
}

function buySkill() {
	var skill = this.skill;
	if (skill.requirement == null || skill.requirement.isSatisfied()) {
		if (player.skills.skillObject[SKILL_GREASING_THE_WHEELS].purchased) {
			if (skill.cost <= player.skillPoints && skill.cost * 25 <= factions[FACTION_CLONES].wealth) {
				// prompt
				var option1 = {
					text:"SP", 
					event:function() {
						purchaseSkill(this, true);						
						windows[SCREEN_PROMPT].hide();
					},
				};
				var option2 = {
					text:"Money", 
					event:function() {
						purchaseSkill(this, false);						
						windows[SCREEN_PROMPT].hide();
					},
				};
				prompt("Purchase with skill points or wealth?", option1, option2);
			} else if (skill.cost <= player.skillPoints) {
				purchaseSkill(this, true);
			} else if (skill.cost * 25 <= factions[FACTION_CLONES].wealth) {
				purchaseSkill(this, false);
			}
		} else {
			if (skill.requirementsMet()) {
				purchaseSkill(this, true);
			}		
		}
	}

	// some skills require us to update this
	if (windows[SCREEN_CHARACTER].visible)
		windows[SCREEN_CHARACTER].redraw();

	windows[SCREEN_SKILLS].redraw();
	windows[SCREEN_CONSTRUCTS].redraw();
}

function purchaseSkill(skillDiv, usingSkillPoints) {
	var skill = skillDiv.skill;
	if (usingSkillPoints) {
		player.skillPoints -= skill.cost;
		skill.purchased = true;
	} else {
		factions[FACTION_CLONES].wealth -= skill.cost * 25;
		skill.purchased = true;
	}

	skillDiv.style.cursor = '';
	
	switch(skill.name) {	
		case SKILL_BODY_CONDITIONING: player.baseDef++; break;
		case SKILL_IRON_SKIN_I: player.baseDef++; break;
		case SKILL_IRON_SKIN_II: player.baseDef++; break;
	}

	if (windows[SCREEN_SKILL_BAR].visible)
		windows[SCREEN_SKILL_BAR].redraw();
	if (windows[SCREEN_STATUS].visible)
		windows[SCREEN_STATUS].redraw();

	skillDiv.style.color = COLOR_DEFAULT;
}

function prompt(text, option1, option2) {

	var promptDiv = windows[SCREEN_PROMPT].div;

	windows[SCREEN_PROMPT].option1 = option1;
	windows[SCREEN_PROMPT].option2 = option2;

	windows[SCREEN_PROMPT].numberOfOptions = option2 == null ? 1 : 2;

	// clear the entries
	while (promptDiv.firstChild)
    	promptDiv.removeChild(promptDiv.firstChild);

	promptDiv.parentWindow = this;
	promptDiv.className = 'ui-widget-content';
	promptDiv.style.position = 'absolute';
	promptDiv.style.width = '200px';
	promptDiv.style.height = '150px';
	promptDiv.style.background = '#2B2B2B';
	promptDiv.style.overflow = 'hidden';

	var description = document.createElement('p');
	description.innerHTML = text;
	description.className = 'characterDescription';
	promptDiv.appendChild(description);

	var option1Button = document.createElement('div');
	option1Button.innerHTML = option1.text;
	option1Button.onclick = option1.event;
	if (typeof option1.data !== 'undefined')
		option1Button.data = option1.data;
	option1Button.style.cursor = 'pointer';
	option1Button.style.background = '#6C436F';
	option1Button.style.color = COLOR_DEFAULT;

	option1Button.parentWindow = promptDiv;
	promptDiv.appendChild(option1Button);

	if (option2 != null) {
		var option2Button = document.createElement('div');
		option2Button.innerHTML = option2.text;
		option2Button.onclick = option2.event;
		if (typeof option2.data !== 'undefined')
			option2Button.data = option2.data;
		option2Button.style.cursor = 'pointer';
		option2Button.style.background = '#6C436F';
		option2Button.style.color = COLOR_DEFAULT;

		option2Button.parentWindow = promptDiv;
		promptDiv.appendChild(option2Button);
	}

	windows[SCREEN_PROMPT].show();
}

function redrawGame(tick) {

	if (tick != gameTicks)
		return;

	if (flipping)
		relight();

	clearScreen();
	switch(gameState) { 

		case STATE_BACKGROUND:
			drawBackground();
		break;

		case STATE_LOADOUT:
			drawLoadout();
		break;

		case STATE_SWITCHBOARD:
			drawSwitchboard();
		break;

		case STATE_GAME:

			if (windows[SCREEN_MAP].visible)
				windows[SCREEN_MAP].redraw();
			if (windows[SCREEN_SKILL_BAR].visible)
				windows[SCREEN_SKILL_BAR].redraw();
			if (windows[SCREEN_STATUS].visible)
				windows[SCREEN_STATUS].redraw();
			if (windows[SCREEN_SKILLS].visible)
				windows[SCREEN_SKILLS].redraw();
			if (windows[SCREEN_CONSTRUCTS].visible)
				windows[SCREEN_CONSTRUCTS].redraw();
			if (windows[SCREEN_CHARACTER].visible)
				windows[SCREEN_CHARACTER].redraw();
			if (windows[SCREEN_OBJECTIVES].visible)
				windows[SCREEN_OBJECTIVES].redraw();
			if (windows[SCREEN_PICKUP].visible)
				windows[SCREEN_PICKUP].redraw();
			if (windows[SCREEN_ON_SCREEN_ENTITIES].visible)
				windows[SCREEN_ON_SCREEN_ENTITIES].redraw();
			if (windows[SCREEN_CAPTURE].visible)
				windows[SCREEN_CAPTURE].redraw();

			drawMap();

			if (flipping) {
				flip = !flip;

				window.setTimeout(function(){redrawGame(tick);}, CURSOR_INTERVAL);
			}
		break;

		case STATE_CHANGE_MAJOR:
			drawChangeMajors();
		break;

		case STATE_CHEST:
			drawChest();
		break;

		case STATE_SHOP:
			drawShop();
		break;

		case STATE_LANDING:
			drawWelcome();
		break;
	}
	redraw();
}

function redrawCapture() {

	var room = dungeon.getRoom();
	var inRoom = dungeon.tiles[player.y][player.x].inRoom;
	if (inRoom && room.captureAmount != 1 && room.isRoom) {
		var captureColor;
		if (room.beingCaptured)
			captureColor = COLOR_FACTIONS_UNPOWERED[FACTION_CLONES];
		else
			captureColor = COLOR_FACTIONS_UNPOWERED[room.faction];

		this.contentDiv.style.background = captureColor;
		this.contentDiv.style.width = room.captureAmount/1 * 100 + '%';

	} else {
		this.contentDiv.style.background = COLOR_OUT_OF_SIGHT;
		this.contentDiv.style.width = room.captureAmount/1 * 100 + '%';
	}
}