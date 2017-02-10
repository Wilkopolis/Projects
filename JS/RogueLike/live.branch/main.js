// WILLIE
// Can't see the whole log, its cut off on the tops and bottoms
// Trying to format the the pickup entries consistantly
// style on the scroll bar(s)
// dragging divs also clicks on the divs below
// can scroll a bit off the side
// center div on page load
// size and position of default divs
// drawing shield/hp on status div
// examine div - all divs
// shift click highlights a bunch of stuff
// need to find a way to examine skills one mouse over (shft + f1 to examine anything)
// see if auto explorering stops when it encounters an enemy
// right click pills ot sell
// add npc (sentry) to room heuristic for do faction turns
// puzzles where you have to navigate a simple maze but it draws your location delayed by 1 turn
// high scores

// Good Names:
// SystemShock
// BioShock
// Minecraft
// Risk of Rain
// Borderlands
// Civilization
// Dota

// Bad Names:
// Desponia
// A Flame in the Flood
// Crawl Stone Soup
// League Of Legends cause LoL

// Candidates:
// Sparkore
// Core
// Spark
// CityOfSparks
// Spork
// Coretown
// Sparktown
// Amptown
// Wilko
// Ruins
// CityOfRuins
// Rundown
// Rebuild
// Restart
// Respark
// Conduct
// Command
// Conductor
// Tasks
// Fixer
// Patch
// Repair
// Handyman
// Clonetown
// Topia
// Overrun
// MAGA
// MAGFO
// MEGA
// MAGAME
// Magma
// Magmopolis
// year3001
// year2087
// year2099
// year2080
// Switch
// RatRace
// DungeonOfDays
// SocialCommentary
// Society
// Work
// PowerxTime
// PowerTime
// Circuit
// WorkCircuit
// 40HourDungeon
// 40HourQuest
// 9ToDie
// 9ToDive
// Quest40
// CompanyCulture
// You will die in 2000 turns
// 9:5:40
// 401k
// TheVault
// VaultTown
// VaultQuest
// Life
// Liife
// L-fe
// lIFe
// l-I-Fe
// lifelike
// rogue
// rouge
// rougelike
// QuestForTheSwitchboard
// MakeItToTheBreaker
// SwitchQuest
// BoardLords
// SwitchLords
// LordOfTheSwitches
// SwitchKing
// KingOfTheSwitches
// MakerOrBreaker
// Slogg
// Slog
// UrbanCrawl
// 45.55.250.151 (just ip, no name)
// www.5underscores.com (some stupid joke name like that)

// Hello, I am Wilko-creator of UrbanCrawl and here is everything you need to play the game

// urban crawl is a free to play, single player, turn based, rouglike that you can play in your browser
// at wilko.io/urbancrawl

// To play the game all you need is a mouse, keyboard, and a web browser

// When the game starts you are given the objectives you must complete in order to win

// During the game you need to use every item, skill, and bit of tactical acquity you have to succeed

// The help menu will get you to the answer for any question you may have about the game, visit us at /r/urbancrawl or join us on
// our discord

// Stop right here and go play the game if you want, Otherwise I'm going to start talking about controls, ui, then go into some mechanics

// 5 seconds fade to black

// classes

// When starting the game, choose your class, character archetype and starting items,
// for most classes you will not be able to change your class later.
// Each class has specific skills and requires a unique playstyle

// Your starting loadout may consist of weapons, armor, or nothing at all. Money you don't spend
// is carried over to your starting character. Be sure not to take more weapons than you have hands to wield them.

// UI

// If you have cookies enabled, the game will save your window locations, sizes, and visiblity when you reload

// These are the default windows and positions. You can resize a window using the handles on the edges
// and lock them into place with a mouse middle click.

// Game Window
// The game window cannot be hidden. This window is where you will create your character,
// aim skills, use shops, and generally play the game.

// Help Window - esc or ?
// This window has helpful links to the game wiki where you can read in-depth
// descriptions of mechanics, skills, items, and their interactions. The subreddit for updates and discussion
// and I can always be found in the discord if you have any questions

// Examine
// This window should give a rough description of any entity in the game. Shift+click an item or npc to examine it.

// Log Window
// This window contains information on items dropped, rooms entered, and objective status

// Objectives
// Objectives you have completed are highlighted. Complete all of them and win the game!

// Map Window
// This window shows you all the rooms you've discovered and visited. Click on a room
// to toggle it's powered status. Visit the wiki for a run down on the types of rooms.
// also press l for the legend

// Capture
// capturing a room gives you the power and wealth per turn it provides

// Pickup Window
// Click on an item entry here to pick it up. Shift+Click to further examine it

// Nearby Window
// This shows allies and enemies in view

// Status Window
// This shows your health along with statuses you are afflicted by

// SkillBar Window
// This window has your active skills. There is no limit to how many skills you can have
// and most skills have no cost and only a cooldown

// Character Info Window
// This window shows all the information about your character. Visit the wiki for a further explantion
// of each attribute

// Skills and Constructs
// By leveling up, you get skill points you can spend to unlock skills and constructs. Skills are
// abilities that help you survive and defeat the elements of the dungeon while constructs are physical
// buildings or companions that cost wealth to summon.

// Attack Styles
// This window allows you to change up which attack styles you are current training. Speaking of which

// Combat
// There are many ways to destroy your enemies in Urban Crawl

/*				Variables					*/

// changes depending on 'fullscreen' mode
var mapDisplayWidth = 38;
var mapDisplayHeight = 40;
var mapXOffset = 16;
var mapYOffset = 0;
// width and height of the map portion of the screen
var fullscreen = false;
var fourXPos = {x:0, y:0};
var switchBoardPos = {x:0, y:0};
// center of the map on screen
var screen_center_x;
// where the player is drawn on the screen
var screen_player_x;
var screen_player_y;
// display height and width of minimap
var display_width_minimap = 17;
var display_height_minimap = 17;
// used to keep track of the x/y min of the map
var mapXMin;
var mapYMin;
// classes
var availableClasses = [];
// log of activity
var log = []
// how many moves we've made
var gameTicks = 0;
// for shop screen
var shopCursorPos = 0;
var todModifier = 1.0;
// for megamap
var cursorVis = true;
var newerInput = false;
// game objects
var screen;
// u
var player;
// the collection of floors
var dungeon;
// the switchboard
var switchBoard;
// if we pressed help yet
var helping = false;
var helped = false;
var helpDiv;
// for auto exploring, goes false when something happens
var bored = true;
var victorious = false;
// for debug
var spawnEnemies = false;
var tutorial = false;
var doingTutorial = false;
var performanceLogging = false;

var effectDivs = {};

var fourXCursor = {x:0,y:0};
// for using a set of keys
var numpadKeys = false;
var KEY_NORTH = 0;
var KEY_NORTH_EAST = 1;
var KEY_EAST = 2;
var KEY_SOUTH_EAST = 3;
var KEY_SOUTH = 4;
var KEY_SOUTH_WEST = 5;
var KEY_WEST = 6;
var KEY_NORTH_WEST = 7;
var KEY_WAIT = 8;

var lastMillis = {
	'moveGame':{},
	'endTurn':{},
	'player.applyStatuses':{},
	'do4XTurn':{},
	'doFactionTurns':{},
	'doNPCTurns':{},
	'captureRooms':{},
	'player.applyEndStatuses':{},
	'relight':{},
	'draw':{},
	'doNPCTurns|EnemySetup':{},
	'doNPCTurns|EnemyDirecting':{},
	'doNPCTurns|routing':{},
	'doNPCTurns|getNextMoveAStar':{},
	'doNPCTurns|wander':{},
	'doNPCTurns|disputeRoom':{}
};

var logEntity = [];

// Called on page load
window.onload = function () {

	// gotta load the stuff
	if (Cookies.enabled) {
		Cookies.defaults = {
		 	expires: Infinity
		};
	}

	// bind the keys we are using
	if (numpadKeys) {
		// keypad 8 104
		KEY_NORTH = 104;
	    // keypad 9 105
		KEY_NORTH_EAST = 105;
	    // keypad 6 102
		KEY_EAST = 102;
	    // keypad 3 99
		KEY_SOUTH_EAST = 99;
	    // keypad 2 98
		KEY_SOUTH = 98;
	    // keypad 1 97
		KEY_SOUTH_WEST = 97;
	    // keypad 4 100
		KEY_WEST = 100;
	    // keypad 7 103
		KEY_NORTH_WEST = 103;
	    // keypad 5 101
		KEY_WAIT = 101;
	} else {
	    // w 		87
		KEY_NORTH = 87;
	    // e 		69
		KEY_NORTH_EAST = 69;
	    // d 		68
		KEY_EAST = 68;
	    // c 		67
		KEY_SOUTH_EAST = 67;
	    // x		88
		KEY_SOUTH = 88;
	    // z		90
		KEY_SOUTH_WEST = 90;
	    // a 		65
		KEY_WEST = 65;
	    // q 		81
		KEY_NORTH_WEST = 81;
	    // s 		83
		KEY_WAIT = 83;
	}

	// switch to the welcome screen
	gameState = STATE_LANDING;
	document.onkeydown = welcomeOnKeyDown;

	// initial loadout
	for (var i = LOADOUT_OPTIONS.length - 1; i >= 0; i--)
		LOADOUT_OPTIONS[i] = MakeItem(LOADOUT_OPTIONS[i].name);

	windows[SCREEN_GAME] = new Window(SCREEN_GAME);

	windows[SCREEN_MAP] = new Window(SCREEN_MAP);
	// this needs to happen because changing window size could fuck with
	// the map
	windows[SCREEN_MAP].pixel_width = windows[SCREEN_MAP].div.style.width.replace("%","") / 100 * window.innerWidth;
	windows[SCREEN_MAP].pixel_height = windows[SCREEN_MAP].pixel_width;
	windows[SCREEN_MAP].div.style.height = windows[SCREEN_MAP].pixel_width + 'px';
	windows[SCREEN_MAP].div.style.width = windows[SCREEN_MAP].pixel_width + 'px';
	windows[SCREEN_MAP].redraw();

	windows[SCREEN_PICKUP] = new Window(SCREEN_PICKUP);
	windows[SCREEN_STATUS] = new Window(SCREEN_STATUS);
	windows[SCREEN_CHARACTER] = new Window(SCREEN_CHARACTER);
	windows[SCREEN_SKILL_BAR] = new Window(SCREEN_SKILL_BAR);
	windows[SCREEN_LOG] = new Window(SCREEN_LOG);
	windows[SCREEN_OBJECTIVES] = new Window(SCREEN_OBJECTIVES);
	windows[SCREEN_CONSTRUCTS] = new Window(SCREEN_CONSTRUCTS);
	windows[SCREEN_ON_SCREEN_ENTITIES] = new Window(SCREEN_ON_SCREEN_ENTITIES);
	windows[SCREEN_ATTACK_STYLES] = new Window(SCREEN_ATTACK_STYLES);
	windows[SCREEN_INVENTORY] = new Window(SCREEN_INVENTORY);
	windows[SCREEN_EXAMINE] = new Window(SCREEN_EXAMINE);
	windows[SCREEN_CAPTURE] = new Window(SCREEN_CAPTURE);
	windows[SCREEN_LEGEND] = new Window(SCREEN_LEGEND);
	windows[SCREEN_PROMPT] = new Window(SCREEN_PROMPT);

	if (Cookies.enabled || tutorial) {
		var tutorialDone = Cookies.get("tutorialCompleted") != null;
		if (!tutorialDone || tutorial) {
			doingTutorial = true;
			newTutorial();
			gameState = STATE_GAME;
			document.onkeydown = gameOnKeyDown;

			log.add("You also have to equip it somehow.");
			log.add("You can pick up items using the pickup window or " +
				"clicking on the ground like an animal.");
			log.add("Kill the giant rat before it kills you.");

			// prompt
			var option1 = {
				text:"Alright",
				event:function() {
					windows[SCREEN_PROMPT].hide();
					windows[SCREEN_HELP].show();
					windows[SCREEN_GAME].show();
					windows[SCREEN_LOG].show();
					windows[SCREEN_STATUS].show();
					windows[SCREEN_PICKUP].show();
					windows[SCREEN_ON_SCREEN_ENTITIES].show();
				},
			};
			prompt("Kill the giant rat before it kills you.", option1);
		} else {
			windows[SCREEN_GAME].loadPosFromCookies();
		}
	} else {	
		windows[SCREEN_GAME].loadPosFromCookies();
	}

	// need to do this after for tutorial reasons
	windows[SCREEN_SKILLS] = new Window(SCREEN_SKILLS);
	windows[SCREEN_HELP] = new Window(SCREEN_HELP);
	windows[SCREEN_HELP].loadPosFromCookies();

	// initialize the switchboard
	switchboard = new SwitchBoard(7,5);

	window.addEventListener("resize", function() {
		if (windows[SCREEN_MAP].visible && Cookies.enabled) {
			var verification = Cookies.get(SCREEN_MAP);
			if (verification == null) {
				windows[SCREEN_MAP].pixel_width = windows[SCREEN_MAP].div.style.width.replace("%","") / 100 * window.innerWidth;
				windows[SCREEN_MAP].pixel_height = windows[SCREEN_MAP].pixel_width;
				windows[SCREEN_MAP].div.style.height = windows[SCREEN_MAP].pixel_width + 'px';
				windows[SCREEN_MAP].div.style.width = windows[SCREEN_MAP].pixel_width + 'px';
				windows[SCREEN_MAP].redraw();
			}
		}

		var verification = null;
		if (Cookies.enabled) {
			var verification = Cookies.get(SCREEN_ON_SCREEN_ENTITIES);
			if (verification == null) {
				windows[SCREEN_ON_SCREEN_ENTITIES].div.style.top = windows[SCREEN_MAP].div.style.height;
			}

			verification = Cookies.get(SCREEN_GAME);
		}

		if (verification == null) {
			if (gameState == STATE_GAME)
				relight();

			windows[SCREEN_GAME].pixel_width = windows[SCREEN_GAME].div.style.width.replace("px","").replace("%","") / 100 * window.innerWidth;
			windows[SCREEN_GAME].pixel_height = windows[SCREEN_GAME].div.style.height.replace("px","").replace("%","") / 100 * window.innerHeight;

		    DISPLAY_WIDTH = Math.round(windows[SCREEN_GAME].pixel_width / FONT_H_SPACE);
		    DISPLAY_HEIGHT = Math.round(windows[SCREEN_GAME].pixel_height / FONT_V_SPACE);
			    
		    windows[SCREEN_GAME].canvas.width = windows[SCREEN_GAME].pixel_width;
			windows[SCREEN_GAME].canvas.height = windows[SCREEN_GAME].pixel_height;
			windows[SCREEN_GAME].canvas.style.width = windows[SCREEN_GAME].pixel_width + 'px';
			windows[SCREEN_GAME].canvas.style.height = windows[SCREEN_GAME].pixel_height + 'px';

			// calculate 
			screen_center_x = Math.round(DISPLAY_WIDTH/2);
			screen_center_y = Math.round(DISPLAY_HEIGHT/2);

			windows[SCREEN_GAME].redraw(gameTicks);
		}			
	});
}
var windows = [];

// disable right click
window.oncontextmenu = function() {
    return false;
}

var TILE_Y = -1;
var TILE_X = -1;
function onMouseMove (event) {

	if (gameOver)
		return;

	switch (gameState) {
		case STATE_LANDING:
		break;
		case STATE_BACKGROUND:
			// get the pixel x/y
			TILE_Y = Math.round((event.layerY + 6) / FONT_V_SPACE);
			TILE_X = Math.round((event.layerX - 4) / FONT_H_SPACE);
			if (TILE_X < DISPLAY_WIDTH * .5) {
				classSelecting = true;
				for (var i = CLASSES.length - 1; i >= 0; i--) {
					if (Math.round(DISPLAY_HEIGHT * .2) + 2 + i * 2 == TILE_Y)
						classCursorPos = i;
				}
				windows[SCREEN_GAME].redraw(gameTicks);	
			} else {
				classSelecting = false;
				for (var i = BACKGROUNDS.length - 1; i >= 0; i--) {
					if (Math.round(DISPLAY_HEIGHT * .2) + 2 + i * 2 == TILE_Y)
						backgroundCursorPos = i;
				}
				windows[SCREEN_GAME].redraw(gameTicks);	
			}
		break;
		case STATE_LOADOUT:
			// get the pixel x/y
			TILE_Y = Math.round((event.layerY + 6) / FONT_V_SPACE);
			TILE_X = Math.round((event.layerX - 4) / FONT_H_SPACE);
			if (TILE_X < DISPLAY_WIDTH * .5) {
				loadoutSelecting = true;
				for (var i = LOADOUT_OPTIONS.length - 1; i >= 0; i--) {
					if (Math.round(DISPLAY_HEIGHT * .2) + 2 + i * 2 == TILE_Y)
						loadoutCursorPos = i;
				}
				windows[SCREEN_GAME].redraw(gameTicks);	
			} else {
				loadoutSelecting = false;
				for (var i = ATTACK_STYLES.length - 1; i >= 0; i--) {
					if (Math.round(DISPLAY_HEIGHT * .2) + 2 + i * 2 == TILE_Y)
						attackStyleCursorPos = i;
				}
				windows[SCREEN_GAME].redraw(gameTicks);	
			}
		break;
		case STATE_SWITCHBOARD:
			var yStart = Math.max(Math.round(DISPLAY_HEIGHT * .5) - 16, 1);
			yStart += 4;

			var xStart = Math.max(Math.round(DISPLAY_WIDTH * .5) - 24, 1);

			var mouseX = event.layerX - 4 - xStart * 12;
			var mouseY = event.layerY + 12 - yStart * 12;

			var adjX = Math.round(mouseX / 96);
			var adjY = Math.round(mouseY / 74);

			if (adjY > 3) {
				adjY = Math.round((mouseY - 36) / 74);
			}

			switchBoardPos = {x:adjX, y:adjY};

			windows[SCREEN_GAME].redraw(gameTicks);
		break;
		case STATE_GAME:
			if (dungeon == null || dungeon.tiles == null)
				return;

			var mustRedraw = false;

			nextY = Math.round((event.layerY + 6) / FONT_V_SPACE);
			nextX = Math.round((event.layerX - 4) / FONT_H_SPACE);

			var topleft = {x:Math.round(player.x - DISPLAY_WIDTH / 2),
						   y:Math.round(player.y - DISPLAY_HEIGHT / 2)};

			var mapPos = {x:topleft.x + nextX,
						  y:topleft.y + nextY};

			if (mapPos.y < 0 || mapPos.y >= dungeon.tiles.length ||
				mapPos.x < 0 || mapPos.x >= dungeon.tiles[0].length)
				return;

			targetTile = dungeon.tiles[mapPos.y][mapPos.x];
			targetTile.x = mapPos.x;
			targetTile.y = mapPos.y;
			
			if (targetTile.viewState == VIEW_STATE_HIDDEN) {

				targetTile = null;

				if (lastPixelEffectsLength > 0) {
					relight();
					windows[SCREEN_GAME].redraw(gameTicks);
				}

			} else if (player.hasRange()) {
				if (!targetTile.getPermanentSolid()) {
					pixelEffects.push({type:PIXEL_CROSSHAIR, x:nextX, y:nextY});
					mustRedraw = true;
				} else if (lastPixelEffectsLength > 0) {
					relight();
					windows[SCREEN_GAME].redraw(gameTicks);
				}
			} 

			if (selectingTile) {			
				
				if (nextX >= 0 && nextX < DISPLAY_WIDTH &&  nextY >= 0 && nextY < DISPLAY_HEIGHT) {

					TILE_X = nextX;
					TILE_Y = nextY;

					var topleft = {x:Math.round(player.x - DISPLAY_WIDTH / 2),
					   			   y:Math.round(player.y - DISPLAY_HEIGHT / 2)};
					
					if (!targetTile.getPermanentSolid()) {
						targetTile.x = mapPos.x;
						targetTile.y = mapPos.y;
					
						pixelEffects.push({type:PIXEL_INVERT, x:TILE_X, y:TILE_Y})

					}
				}
				// only light the right things for the job
				mustRedraw = true;
				switch(selectingFor) {
					case 'Examine':	lightEntities(); break;
					case EFFECT_TERRAFORM_I: relight(); break;
					case EFFECT_GRAPPLING_HOOK: relight(); break;
					case CONSTRUCT_WALL: relight(); break;
					case CONSTRUCT_SENTRY_I: relight(); break;
					case SKILL_LEAP: relight(); break;
					case SKILL_SLAM: relight(); break;
					default: lightTargets(); break;
				}
			} else
				relight();

			if (mustRedraw)
				windows[SCREEN_GAME].redraw(gameTicks);
		break;
		case STATE_SKILLS:
			// get the pixel x/y
			TILE_Y = Math.round((event.layerY + 3) / FONT_V_SPACE);
			TILE_X = Math.round((event.layerX - 4) / FONT_H_SPACE);
			if (TILE_X < 30) {
				skillSelecting = true;
				attackStyleSelecting = false;
				constructSelecting = false;
				skillsCursorPos = Math.min(Math.max(Math.round((TILE_Y - 8) / 2), 0), player.skills.allSkills.length - 1);
				windows[SCREEN_GAME].redraw(gameTicks);
			} else if (TILE_X > 38) {
				if (TILE_Y < 18) {
					skillSelecting = false;
					attackStyleSelecting = true;
					constructSelecting = false;
					attackStyleCursorPos = Math.min(Math.max(Math.round((TILE_Y - 8) / 2), 0), player.attackStyles.length - 1);
					windows[SCREEN_GAME].redraw(gameTicks);
				} else {
					skillSelecting = false;
					attackStyleSelecting = false;
					constructSelecting = true;
					constructCursorPos = Math.min(Math.max(Math.round((TILE_Y - 22) / 2), 0), player.skills.constructs.length - 1);
					windows[SCREEN_GAME].redraw(gameTicks);
				}
			}
		break;
		case STATE_SWITCHBOARD:
		break;
	}
}

var selectedRoomHash = -1;
function onMouseDown(event) {

	switch (event.button) {
        case 0:
            // do the stuff below
        break;
        case 1:
        	event.preventDefault();
        break;
        case 2:
        	// fire a ranged weapon
        	if (gameState == STATE_GAME) {
        		if (targetTile == null || player.bullets == 0)
        			return;

        		if (player.hasRange()) {
        		
					var baseAccuracy = player.perception / 12.5;

					if (player.statuses[SKILL_CRAM]) {
						baseAccuracy += .1;
					} else if (player.statuses[EFFECT_EXHAUSTED])
						baseAccuracy -= .1;

					// there is an accuracy penalty for holding a gun with 1 hand
					var spareArms = player.armCount - player.armsUsed;

        			for (var i = player.wielded.length - 1; i >= 0; i--) {

        				var gun = player.wielded[i];

        				if (!gun.ranged || player.bullets == 0)
        					continue;

	        			if (targetTile.x == player.x && targetTile.y == player.y) {
	        				dealDamage(player, gun.damage, player);
	        				continue;
	        			}

        				var accuracy = baseAccuracy;
						if (spareArms > 0) {
							accuracy += gun.accuracy * 
								(player.attackStyles[ATTACK_STYLE_DEXTERITY].lvl + 40) / 40;
							spareArms--;
						} else {
							accuracy += gun.accuracy *
								(player.attackStyles[ATTACK_STYLE_DEXTERITY].lvl + 3.33) / 13.33;
						}

						// calculate damage, apply all of our effects and shit
						var damage = gun.damage;
						if (Math.random() < player.getCritChance())
							damage = Math.round(damage * player.getCritDamageModifier());

						if (player.skills.skillObject[SKILL_MONEY_SHOT].on) {
							var spent = Math.round(factions[FACTION_CLONES].wealth * .02);
							factions[FACTION_CLONES].wealth -= spent;
							damage += Math.round(spent);
						}

						if (player.skills.skillObject[SKILL_PEOPLES_CHAMPION].purchased) {
							for (var j = player.allies.length - 1; j >= 0; j--) {				
								damage += Math.round(player.allies[j].baseDamage / 3);
							}
						}

        				if (gun.name == NAME_STARTER_PISTOL) {        					
							var targetPos = {x:targetTile.x, y:targetTile.y};

							if (accuracy < Math.random()) {
								targetPos.x += Math.round(Math.random() * 2 - 1);
								targetPos.y += Math.round(Math.random() * 2 - 1);
							}

							shoot(player, targetPos, Math.random() * 10 + 10, accuracy, damage);
							player.bullets--;
        				} else if (gun.name == NAME_SHOTGUN) {
        					for (var j = 0; j < 6; j++) {
	        					var targetPos = {x:targetTile.x, y:targetTile.y};
								targetPos.x += Math.round(Math.random() * 4 - 2);
								targetPos.y += Math.round(Math.random() * 4 - 2);

								shoot(player, targetPos, Math.random() * 10 + 7, accuracy, damage);
        					}
							player.bullets--;
        				} else if (gun.name == NAME_DUALIES) {
        					for (var j = 0; j < 2; j++) {
        						var targetPos = {x:targetTile.x, y:targetTile.y};
								if (accuracy < Math.random()) {
									targetPos.x += Math.round(Math.random() * 2 - 1);
									targetPos.y += Math.round(Math.random() * 2 - 1);
								}

								shoot(player, targetPos, Math.random() * 10 + 10, accuracy, damage);
        					}
							player.bullets--;
        				} else if (gun.name == NAME_SNIPER_RIFLE) {        					
							var targetPos = {x:targetTile.x, y:targetTile.y};

							shoot(player, targetPos, 30, accuracy, damage);
							player.bullets--;
        				} 
						endTurn();
        			}
					return;
				}
        	}
		return;
        default: return;
    }

	switch (gameState) {
		case STATE_LANDING:
		    if (WELCOME_OPTIONS[welcomeCursorPos] == OPTION_NEW_HARD)
		    	hardMode = true;
		    
			gameState = STATE_BACKGROUND;
			BACKGROUNDS.peekRandom().selected = true;
			CLASSES.peekRandom().selected = true;
			for (var i = BACKGROUNDS.length - 1; i >= 0; i--) {
				if (BACKGROUNDS[i].selected) {
					backgroundCursorPos	= i;
					break;
				}
			}
			for (var i = CLASSES.length - 1; i >= 0; i--) {
				if (CLASSES[i].selected) {
					classCursorPos = i;
					break;
				}
			}
			document.onkeydown = backgroundOnKeyDown;
			windows[SCREEN_GAME].redraw(gameTicks);
		break;
		case STATE_BACKGROUND:
		    if (classSelecting) {
		    	for (var i = CLASSES.length - 1; i >= 0; i--) {
		    		CLASSES[i].selected = false;
		    	}
		    	CLASSES[classCursorPos].selected = true;
		    } else {
		    	for (var i = BACKGROUNDS.length - 1; i >= 0; i--) {
		    		BACKGROUNDS[i].selected = false;
		    	}
		    	BACKGROUNDS[backgroundCursorPos].selected = true;
		    }
			windows[SCREEN_GAME].redraw(gameTicks);			
		break;
		case STATE_LOADOUT:
			if (loadoutSelecting) {
			    var loadoutItemNode = LOADOUT_OPTIONS[loadoutCursorPos];
			    if (!loadoutItemNode.selected && startingWealth >= loadoutItemNode.value) {
			    	startingWealth -= loadoutItemNode.value;
			    	loadoutItemNode.selected = true;
			    } else if (loadoutItemNode.selected) {
			    	startingWealth += loadoutItemNode.value;
			    	loadoutItemNode.selected = false;
			    }
		    } else {
		    	count = 0;
		    	for (var i = ATTACK_STYLES.length - 1; i >= 0; i--)
		    		count += ATTACK_STYLES[i].selected ? 1 : 0;

		    	if (count == 1 && ATTACK_STYLES[attackStyleCursorPos].selected)
		    		return;

		    	ATTACK_STYLES[attackStyleCursorPos].selected = !ATTACK_STYLES[attackStyleCursorPos].selected;
		    }
		    windows[SCREEN_GAME].redraw(gameTicks);
		break;
		case STATE_SWITCHBOARD:
		    if (switchBoardPos.y >= 0 && switchBoardPos.y < switchboard.switches.length &&
		    	switchBoardPos.x >= 0 && switchBoardPos.x < switchboard.switches[0].length) {
		    	if (switchboard.switches[switchBoardPos.y][switchBoardPos.x].purchased) {
		    		switchboard.switches[switchBoardPos.y][switchBoardPos.x].on = !switchboard.switches[switchBoardPos.y][switchBoardPos.x].on;
		    		switchboard.switches[switchBoardPos.y][switchBoardPos.x].writeToCookies();
		    	} else {
		    		// prompt
					var option1 = {
						text:"Yes",
						data: switchBoardPos,
						event:function() {
							switchboard.switches[this.data.y][this.data.x].purchased = true;
							switchboard.switches[this.data.y][this.data.x].on = true;						
		    				switchboard.switches[this.data.y][this.data.x].writeToCookies();
		    				windows[SCREEN_PROMPT].hide();
							windows[SCREEN_GAME].redraw(gameTicks);
						},
					};
					var option2 = {
						text:"No", 
						event:function() {
							windows[SCREEN_PROMPT].hide();
						},
					};
					prompt("Do you want to flip this switch?", option1, option2);
		    	}
				windows[SCREEN_GAME].redraw(gameTicks);
		    }
		break;
		case STATE_GAME:

			// we can't use any of our shit if we are stunned
			if (player.isStunned() || targetTile == null || targetTile.viewState == VIEW_STATE_HIDDEN)
				return;

			if (event.shiftKey) {
				if (targetTile.entities.length > 0) {
					examinedEntity = targetTile.entities.peek();

					if (!windows[SCREEN_EXAMINE].visible)
						windows[SCREEN_EXAMINE].show();
					else
						windows[SCREEN_EXAMINE].redraw();
				}
				return;
			} else {				
				if (targetTile.entities.length > 0) {
					entity = targetTile.entities.peek();
					if (entity.type == ENTITY_ITEM) {						
						dungeon.tiles[entity.y][entity.x].entities.remove(entity)
						player.inventory.pickUp(entity);
						endTurn();
						windows[SCREEN_INVENTORY].redraw();
					}
				}
			}

			switch(selectingFor) {
				case SKILL_MICROWAVE_I:
					if (targetTile != null) {
						player.target = {x:targetTile.x, y:targetTile.y};
						player.addStatus({type:SKILL_MICROWAVE_I, ticksRemaining:5, endStatus:true, unique:true});
						TILE_X = -1;
						TILE_Y = -1;
						endTurn();
						selectingFor = null;
						selectingTile = false;
						player.skills.skillObject[SKILL_MICROWAVE_I].lastUsedTick = gameTicks;
					}
				break;
				case SKILL_MICROWAVE_II:
					if (targetTile != null) {
						player.target = {x:targetTile.x, y:targetTile.y};
						player.addStatus({type:SKILL_MICROWAVE_II, ticksRemaining:5, endStatus:true, unique:true});
						TILE_X = -1;
						TILE_Y = -1;
						endTurn();
						selectingFor = null;
						selectingTile = false;
						player.skills.skillObject[SKILL_MICROWAVE_II].lastUsedTick = gameTicks;
					}
				break;
				case SKILL_MICROWAVE_III:
					if (targetTile != null) {
						player.target = {x:targetTile.x, y:targetTile.y};
						player.addStatus({type:SKILL_MICROWAVE_III, ticksRemaining:5, endStatus:true, unique:true});
						TILE_X = -1;
						TILE_Y = -1;
						endTurn();
						selectingFor = null;
						selectingTile = false;
						player.skills.skillObject[SKILL_MICROWAVE_III].lastUsedTick = gameTicks;
					}
				break;
				case EFFECT_TERRAFORM_I:
					if (targetTile != null && !targetTile.getSolid()) {
						targetTile.entities.push(MakeNPC(NAME_EARTH_OBSTACLE, {x:targetTile.x, y:targetTile.y}));
						player.skills.skillObject[EFFECT_TERRAFORM_I].lastUsedTick = gameTicks;
					} else
						return;

					choicesLeft--;

					if (choicesLeft == 0) {				
						selectingFor = null;
						selectingTile = false;
						endTurn();
					}
				break;
				case CONSTRUCT_WALL:
					if (targetTile != null && !targetTile.getSolid()) {
						targetTile.entities.push(MakeNPC(NAME_PLAYER_WALL, {x:targetTile.x, y:targetTile.y}));
					} else
						return;

					factions[FACTION_CLONES].wealth -= player.skills.skillObject[CONSTRUCT_WALL].price;

					if (factions[FACTION_CLONES].wealth < player.skills.skillObject[CONSTRUCT_WALL].price) {
						log.add("You need more money to place constructs.");
						endTurn();
						selectingFor = null;
						selectingTile = false;
					}
				break;
				case CONSTRUCT_SENTRY_I:
					if (targetTile != null && !targetTile.getSolid()) {
						
						var construct = MakeNPC(CONSTRUCT_SENTRY_I, {x:targetTile.x, y:targetTile.y}, [{type:STATUS_STUNNED, ticksRemaining:1, unique:true}]);
						// so enemies can hit us
						dungeon.npcs.push(construct);
						// so we can do turns
						factions[FACTION_CLONES].units.push(construct);

						targetTile.entities.push(construct);

					} else
						return;

					factions[FACTION_CLONES].wealth -= player.skills.skillObject[CONSTRUCT_SENTRY_I].price;

					if (factions[FACTION_CLONES].wealth < player.skills.skillObject[CONSTRUCT_SENTRY_I].price) {
						log.add("You need more money to place constructs.");
						endTurn();
						selectingFor = null;
						selectingTile = false;
					}
				break;
				case CONSTRUCT_SENTRY_II:
					if (targetTile != null && !targetTile.getSolid()) {
						
						var construct = MakeNPC(CONSTRUCT_SENTRY_II, {x:targetTile.x, y:targetTile.y}, [{type:STATUS_STUNNED, ticksRemaining:1, unique:true}]);
						// so enemies can hit us
						dungeon.npcs.push(construct);
						// so we can do turns
						factions[FACTION_CLONES].units.push(construct);

						targetTile.entities.push(construct);

					} else
						return;

					factions[FACTION_CLONES].wealth -= player.skills.skillObject[CONSTRUCT_SENTRY_II].price;

					if (factions[FACTION_CLONES].wealth < player.skills.skillObject[CONSTRUCT_SENTRY_II].price) {
						log.add("You need more money to place constructs.");
						endTurn();
						selectingFor = null;
						selectingTile = false;
					}
				break;				
				case CONSTRUCT_HEALING_WELL:
					if (healingWell == null && targetTile != null && !targetTile.getSolid()) {
						
						var construct = MakeNPC(CONSTRUCT_HEALING_WELL, {x:targetTile.x, y:targetTile.y}, [{type:STATUS_STUNNED, ticksRemaining:1, unique:true}]);
						healingWell = construct
						// so enemies can hit us
						dungeon.npcs.push(construct);
						// so we can do turns
						factions[FACTION_CLONES].units.push(construct);

						targetTile.entities.push(construct);

					} else
						return;

					factions[FACTION_CLONES].wealth -= player.skills.skillObject[CONSTRUCT_HEALING_WELL].price;

					if (factions[FACTION_CLONES].wealth < player.skills.skillObject[CONSTRUCT_HEALING_WELL].price) {
						log.add("You need more money to place constructs.");
						endTurn();
						selectingFor = null;
						selectingTile = false;
					}
				break;
				case SKILL_LEAP:
					if (targetTile != null && !targetTile.getSolid() && targetTile.canBlink && getClearShot(targetTile)) {

						dungeon.tiles[player.y][player.x].entities.remove(player);

						player.x = targetTile.x;
						player.y = targetTile.y;

						dungeon.tiles[player.y][player.x].entities.push(player);

						var entities = [];
						for (var i = 0; i < MOVE_OPTIONS.length; i++) {
							var adjPos = {x:player.x + MOVE_OPTIONS[i].x, y:player.y + MOVE_OPTIONS[i].y}
							if (adjPos.y >= 0 && 
								adjPos.x >= 0 &&
								adjPos.y < dungeon.tiles.length &&
							 	adjPos.x < dungeon.tiles[adjPos.y].length) {
								var tile = dungeon.tiles[adjPos.y][adjPos.x];
								if (tile.entities.length > 0 && 
									(((tile.entities.peek().type == ENTITY_ENEMY ||
									tile.entities.peek().type == ENTITY_COMPANION) && 
									tile.entities.peek().faction != player.faction) ||
									tile.entities.peek().type == ENTITY_OBSTACLE)) {
									entities.push(tile.entities.peek());
								}
							}
						}

						// deal damage on landing
						for (var i = entities.length - 1; i >= 0; i--) {
							var enemy = entities[i];
							dealDamage(player, player.strength, enemy);
						}
						
						player.skills.skillObject[SKILL_LEAP].lastUsedTick = gameTicks;
						endTurn();
						selectingFor = null;
						selectingTile = false;
					}
				break;
				case SKILL_SLAM:
					if (targetTile != null && !targetTile.getSolid()) {

						dungeon.tiles[player.y][player.x].entities.remove(player);

						player.x = targetTile.x;
						player.y = targetTile.y;

						dungeon.tiles[player.y][player.x].entities.push(player);						
						
						var entities = [];
						for (var i = 0; i < MOVE_OPTIONS.length; i++) {
							var adjPos = {x:player.x + MOVE_OPTIONS[i].x, y:player.y + MOVE_OPTIONS[i].y}
							if (adjPos.y >= 0 && 
								adjPos.x >= 0 &&
								adjPos.y < dungeon.tiles.length &&
							 	adjPos.x < dungeon.tiles[adjPos.y].length) {
								var tile = dungeon.tiles[adjPos.y][adjPos.x];
								if (tile.entities.length > 0 && 
									(((tile.entities.peek().type == ENTITY_ENEMY ||
									tile.entities.peek().type == ENTITY_COMPANION) && 
									tile.entities.peek().faction != player.faction) ||
									tile.entities.peek().type == ENTITY_OBSTACLE)) {
									entities.push(tile.entities.peek());
								}
							}
						}

						// deal damage on landing
						for (var i = entities.length - 1; i >= 0; i--) {
							var enemy = entities[i];
							dealDamage(player, player.strength, enemy);
						}

						// knock back on landing
						for (var i = entities.length - 1; i >= 0; i--) {
							var entity = entities[i];
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

							// if we knock back an enemy to a pit,
							if (newTile.char == CHAR_PIT) {
								// then kill the enemy and reward the player
								if (entity.type == ENTITY_ENEMY || entity.type == ENTITY_COMPANION)
									entity.kill(player, false);
								else if (entity.type == ENTITY_ITEM)
									currentTile.entities.remove(entity);
							} else {
								currentTile.entities.remove(entity);
								entity.x = adjustedEndpoint.x;
								entity.y = adjustedEndpoint.y;
								newTile.entities.push(entity);

								if (entity.animate)
									entity.addStatus({type:STATUS_STUNNED, ticksRemaining:3, unique:true});			
							}
						}

						if (selectingForBook) {
							player.skills.skillObject[EFFECT_BABBLING_BOOK].lastUsedTick = gameTicks;
							selectingForBook = false;
						} else
							player.skills.skillObject[SKILL_SLAM].lastUsedTick = gameTicks;
						endTurn();
						selectingFor = null;
						selectingTile = false;
					}
				break;
				case EFFECT_GRAPPLING_HOOK:

					// route until we hit a solid tile or entity
					var result = grapple(player, targetTile);

					// if its an entity, bring it next to us
					if (result.entity != null) {
						if (result.entity.type == ENTITY_ITEM) {
							dungeon.tiles[result.entity.y][result.entity.x].entities.remove(result.entity);
							player.inventory.pickUp(result.entity);
						} else {
							// move adjacent to player
							var pos = result.pos;

							var resultTile = dungeon.tiles[pos.y][pos.x];
							if (resultTile.char == CHAR_PIT)
								entity.kill(player, false);
							else {					
								// update the entity's position
								dungeon.tiles[result.entity.y][result.entity.x].entities.remove(result.entity);
								result.entity.x = pos.x;
								result.entity.y = pos.y;
								dungeon.tiles[result.entity.y][result.entity.x].entities.push(result.entity);

								// stun them for a turn
								result.entity.addStatus({type:STATUS_STUNNED, ticksRemaining:1, unique:true});
							}
						}						
					// it is not an entity, move us there
					} else {
						// update the players position
						dungeon.tiles[player.y][player.x].entities.remove(player);
						player.x = result.x;
						player.y = result.y;
						dungeon.tiles[player.y][player.x].entities.push(player);
					}

					player.skills.skillObject[EFFECT_GRAPPLING_HOOK].lastUsedTick = gameTicks;
					endTurn();
					selectingFor = null;
					selectingTile = false;
				break;
			}
		break;
		case STATE_INVENTORY:
		break;
		case STATE_SKILLS:
		selectSkill();
		break;
		case STATE_4X_MODE:
		// set selected hash
		var tempHash = minimap[fourXCursor.y][fourXCursor.x].hash;

		if (tempHash > 0) {

			var room = roomLookup[tempHash];
			if (room.discovered) {
				
				selectedRoomHash = tempHash;
				
				powerButtonContainer.style.display = 'block';

				var div = document.getElementById('powerPercent');
				var span = document.getElementById('powerSpan');
				if (room.powered) {
					div.style.background = '#131313';
					span.style.color = '#ecf277';
				} else {
					div.style.background = '#ecf277';
					span.style.color = '#131313';
				}
			}
		} else
			powerButtonContainer.style.display = 'none';
		break;
		case STATE_FIRMWARE:
		break;
		case STATE_SWITCHBOARD:
		break;
	}
}

/*				Objects						*/

function dealDamage (attacker, damage, victim, ranged = false) {
	victim.takeDamage(damage, attacker);
	if (!ranged)
		attacker.addCombatExperience(damage);
	else
		attacker.addRangedCombatExperience(damage)
	attacker.lastCombatTick = gameTicks;
	victim.lastCombatTick = gameTicks;
	return victim.hp <= 0;
}

var disputedRooms = [];
function captureRooms() {
	for (var i = disputedRooms.length - 1; i >= 0; i--) {

		var room = disputedRooms[i];

		var units = room.units;

		var faction = units[0].faction;
		var factionsPresent = [];
		for (var j = units.length - 1; j >= 0; j--) {
			if (!factionsPresent.includes(units[j].faction)) {
				factionsPresent.push(units[j].faction);
			}
		}

		if (factionsPresent.length == 1 && factionsPresent[0] == room.faction && room.captureAmount == 1) {
			room.units = [];
			continue;
		}

		// if we are a mayor, cap twice as fast
		var rate = 1;
		if (factionsPresent[0] == FACTION_CLONES && player.class == CLASS_MAYOR)
			rate = 2;

		var roomOwner = room.faction;
		// if a roomOwning faction is here, do not decay
		// a room is only owned if it is capped/decaying
		if (!factionsPresent.includes(roomOwner) && room.faction != FACTION_NONE) {
			// decay
			room.captureAmount -= .1/room.size * rate;

			// for ui coloring purposes
			room.beingCaptured = false;

			if (room.captureAmount <= 0) {
				room.captureAmount = 0;
				if (room.faction != FACTION_NONE) {
					if (room.faction == FACTION_CLONES && player.skills.skillObject[SKILL_ELECTORAL_COLLEGE].purchased) {						
						player.hpMax -= 3;
						player.hp -= 3;
						if (player.hp <= 0)
							GameOver();
					}

					factions[room.faction].roomsCaptured -= room.size;
					factions[room.faction].wpt -= room.wpt;
					factions[room.faction].power -= room.power;
				}
				room.faction = FACTION_NONE;
				room.targetFaction = faction;
			}
		} else if (factionsPresent.length == 1) {
			room.captureAmount += .1/room.size * rate;

			// for ui coloring purposes
			room.beingCaptured = true;

			if (room.captureAmount >= room.captureRequired) {
				room.captureAmount = room.captureRequired;
				if (faction != FACTION_NONE) {
					if (faction == FACTION_CLONES && player.skills.skillObject[SKILL_ELECTORAL_COLLEGE].purchased) {						
						player.hpMax += 3;
						player.hp += 3;
					}
					factions[faction].roomsCaptured += room.size;
					factions[faction].wpt += room.wpt;
					factions[faction].power += room.power;
				}
				room.faction = faction;
				room.targetFaction = FACTION_NONE;

				// for ui coloring purposes			
				room.beingCaptured = false;
			}
		}

		room.units = [];
	}
	disputedRooms = [];
}