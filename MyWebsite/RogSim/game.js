window.onload = function () {
    var openingCanvas = document.getElementById("expositionCanvas");
    openingCanvas.width = 1920;
	openingCanvas.height = 400;
    canvas = document.getElementById("canvas");
    canvas.width = 1229;
	canvas.height = 726;
    sideCanvas = document.getElementById("sideCanvas");
    sideCanvas.width = 366;
	sideCanvas.height = 726;
    closingCanvas = document.getElementById("closingCanvas");
    //TODO, get these nums at desktop
    closingCanvas.width = 1920;
	closingCanvas.height = window.innerHeight;

    ctx = canvas.getContext("2d");
    closingCtx = closingCanvas.getContext("2d");
    sideCtx = sideCanvas.getContext("2d");
    sideCtx.strokeStyle = 'black';

	playerX = 204;
	playerY = 233;

    var width = window.innerWidth;
    var height = window.innerHeight;
	divsOffsetX = (.1 * width + (.2 * .8) * width);
	divsOffsetY = (.1 * height + (.06 * .8) * height);

    missions.push(generateMission());

    agents.push(new Agent());

    updateAgentDivs();

    player = agents[agentIndex];

    playerSprite = new Image();
    playerSprite.src = URL_PLAYER_SPRITE;
    talkingSprites = [8];
    talkingIndex = 0;
    talkingSprites[0] = new Image();
    talkingSprites[0].src = URL_TALKING_ONE;
    talkingSprites[1] = new Image();
    talkingSprites[1].src = URL_TALKING_TWO;
    talkingSprites[2] = new Image();
    talkingSprites[2].src = URL_TALKING_THREE;
    talkingSprites[3] = new Image();
    talkingSprites[3].src = URL_TALKING_FOUR;
    talkingSprites[4] = new Image();
    talkingSprites[4].src = URL_TALKING_FOUR;
    talkingSprites[5] = new Image();
    talkingSprites[5].src = URL_TALKING_FOUR;
    talkingSprites[6] = new Image();
    talkingSprites[6].src = URL_TALKING_FOUR;
    talkingSprites[7] = new Image();
    talkingSprites[7].src = URL_TALKING_FOUR;
    sceneOne = new Image();
    sceneOne.src = URL_SCENE_ONE;
    sceneTwo = new Image();
    sceneTwo.src = URL_SCENE_TWO;
    sceneThree = new Image();
    sceneThree.src = URL_SCENE_THREE;
    shadow = new Image();
    shadow.src = URL_SHADOW_SPRITE;
    crew = new Image();
    crew.src = URL_CREW;
    boss = new Image();
    boss.src = URL_BOSS;
    bigDebris = new Image();
    bigDebris.src = URL_BIG_DEBRIS;

    var titles = [
    "How to take a screenshot",
    "Lee Carvallo's Putting Challenge",
    "BONESTORM",
    "BEAT THE BLACK KNIGHT",
    "Unjustifiably in a position I'd rather not be in",
    "Loli Pantsu Dungeon Quest"];
    // document.title = titles[Math.round(Math.random() * titles.length)];

    // if (Cookies.get("started")) {  
    // if (!Cookies.get("beaten"))
    	$("#openingDiv").fadeOut(500);
    // else
    // 	drawThanks();
    // } else {
    // 	playOpening();
    // }
    // Get Gold From Cookies    
	// document.getElementById("gold").innerHTML = "Gold: " + gold;


	// this for debugging end game
	// endTimes = true;
	// window.setTimeout(function() {
	// 	$('#closingDiv').show();
	// 	$('#closingCanvas').show();
	// 	$('#closingDiv').animate({
	// 		'top':'0',
	// 		'left':'0',
	// 		'width':'100%',
	// 		'height':'100%'
	// 		}, 500, 'easeInOutCubic');
	// }, 0);

	// window.setTimeout(function() {
	// 	window.setInterval(update, 1000/60);
	// 	window.setInterval(draw, 1000/60);
	// }, 0);
};

$(window).resize(function() {
	// redraw all canvases on window resize
	if (mission != null)
		redraw();
});

window.onconextmenu = function () {
	// cancel default menu
    return false;     
}

function redraw () {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	if (mission != null) {
		drawDungeon();	
		drawPlayer();
		drawSideBar();
	}
}

function drawDungeon () {
	//draw dungeon
	for (var i = mission.x + DUNGEON_LENGTH - 1; i >= mission.x - 3; i--) {
		for (var j = DISPLAY_DEPTH - 1; j >= 0; j--) {
			var tile = null;
			if (i >= 0 && i < mission.dungeon.length)
				var tile = mission.dungeon[i][j];
			if (tile == null) {
				ctx.fillStyle = COLOR_WALL;
			} else {
				ctx.fillStyle = COLOR_PATH;
				for (var k = tile.paths.length - 1; k >= 0; k--) {
					drawPath(i + 1, j, tile.paths[k]);
				}
				ctx.fillStyle = tile.getColor();
			}

			// center on player
			var tempX = startX + 20 + (i + 1) * 64;
			var tempY = 11 + j * 64;
			ctx.fillRect(tempX, tempY + startY, 64, 64);
		}
	}
}

var playerX;
var playerY;
var divsOffsetX;
var divsOffsetY;
var endTimes = false;
function drawPlayer () {
	if (endTimes) {
		closingCtx.drawImage(playerSprite, player.pos.x, player.pos.y);

		closingCtx.fillStyle = COLOR_HEALTH_BAR_BACKGROUND;
		closingCtx.fillRect(player.pos.x, player.pos.y - 22, 64, 16);
		closingCtx.fillStyle = COLOR_HEALTH_BAR;
		closingCtx.fillRect(player.pos.x, player.pos.y - 22, (player.hp/player.maxhp) * 60, 12);
	} else {
		ctx.drawImage(playerSprite, playerX, playerY);

		ctx.fillStyle = COLOR_HEALTH_BAR_BACKGROUND;
		ctx.fillRect(playerX, playerY - 22, 64, 16);
		ctx.fillStyle = COLOR_HEALTH_BAR;
		ctx.fillRect(playerX, playerY - 22, (player.hp/player.maxhp) * 60, 12);
	}
}

function drawClosing () {
}

var startX = 120;
var startY = 30;
function drawPath (i, j, yChange) {
	switch(yChange) {
		case -3:
		var squareOne = { rightX: startX + 20 + 64 + i * 64, topY: startY + 11 + j * 64, bottomY: startY + 11 + 64 + j * 64 };
		var squareTwo = { leftX: startX + 20 + 64 + (i + 2) * 64, topY: startY + 11 + (j + yChange) * 64, bottomY: startY + 11 + 64 + (j + yChange) * 64 };
		var path = new Path2D();
		path.moveTo(squareOne.rightX, squareOne.topY);
		path.lineTo(squareOne.rightX, squareOne.bottomY);
		path.lineTo(squareTwo.leftX, squareTwo.bottomY);
		path.lineTo(squareTwo.leftX, squareTwo.topY);
		ctx.fill(path);
		break;

		case -2:
		var squareOne = { rightX: startX + 20 + 64 + i * 64, topY: startY + 11 + j * 64, bottomY: startY + 11 + 64 + j * 64 };
		var squareTwo = { leftX: startX + 20 + 64 + (i + 2) * 64, topY: startY + 11 + (j + yChange) * 64, bottomY: startY + 11 + 64 + (j + yChange) * 64 };
		var path = new Path2D();
		path.moveTo(squareOne.rightX, squareOne.topY);
		path.lineTo(squareOne.rightX, squareOne.bottomY);
		path.lineTo(squareTwo.leftX, squareTwo.bottomY);
		path.lineTo(squareTwo.leftX, squareTwo.topY);
		ctx.fill(path);
		break;

		case -1:
		ctx.fillRect(startX + 20 + i * 64, startY + 11 + j * 64, 64, 64);
		var squareOne = { rightX: startX + 20 + 64 + i * 64, topY: startY + 11 + j * 64, bottomY: startY + 11 + 64 + j * 64 };
		var squareTwo = { leftX: startX + 20 + 64 + (i + 1) * 64, topY: startY + 11 + (j + yChange) * 64, bottomY: startY + 11 + 64 + (j + yChange) * 64 };
		var path = new Path2D();
		path.moveTo(squareOne.rightX, squareOne.topY);
		path.lineTo(squareOne.rightX, squareOne.bottomY);
		path.lineTo(squareTwo.leftX, squareTwo.bottomY);
		path.lineTo(squareTwo.leftX, squareTwo.topY);
		ctx.fill(path);
		ctx.fillRect(startX + 20 + (i + 2) * 64, startY + 11 + (j + yChange) * 64, 64, 64);
		break;

		case 0:		
		ctx.fillRect(startX + 20 + (i) * 64, startY + 11 + j * 64, 64, 64);
		ctx.fillRect(startX + 20 + (i + 1) * 64, startY + 11 + j * 64, 64, 64);
		ctx.fillRect(startX + 20 + (i + 2) * 64, startY + 11 + j * 64, 64, 64);
		break;

		case 1:
		ctx.fillRect(startX + 20 + i * 64, startY + 11 + j * 64, 64, 64);
		var squareOne = { rightX: startX + 20 + 64 + i * 64, topY: startY + 11 + j * 64, bottomY: startY + 11 + 64 + j * 64 };
		var squareTwo = { leftX: startX + 20 + 64 + (i + 1) * 64, topY: startY + 11 + (j + yChange) * 64, bottomY: startY + 11 + 64 + (j + yChange) * 64 };
		var path = new Path2D();
		path.moveTo(squareOne.rightX, squareOne.topY);
		path.lineTo(squareOne.rightX, squareOne.bottomY);
		path.lineTo(squareTwo.leftX, squareTwo.bottomY);
		path.lineTo(squareTwo.leftX, squareTwo.topY);
		ctx.fill(path);
		ctx.fillRect(startX + 20 + (i + 2) * 64, startY + 11 + (j + yChange) * 64, 64, 64);
		break;

		case 2:
		var squareOne = { rightX: startX + 20 + 64 + i * 64, topY: startY + 11 + j * 64, bottomY: startY + 11 + 64 + j * 64 };
		var squareTwo = { leftX: startX + 20 + 64 + (i + 2) * 64, topY: startY + 11 + (j + yChange) * 64, bottomY: startY + 11 + 64 + (j + yChange) * 64 };
		var path = new Path2D();
		path.moveTo(squareOne.rightX, squareOne.topY);
		path.lineTo(squareOne.rightX, squareOne.bottomY);
		path.lineTo(squareTwo.leftX, squareTwo.bottomY);
		path.lineTo(squareTwo.leftX, squareTwo.topY);
		ctx.fill(path);
		break;

		case 3:
		var squareOne = { rightX: startX + 20 + 64 + i * 64, topY: startY + 11 + j * 64, bottomY: startY + 11 + 64 + j * 64 };
		var squareTwo = { leftX: startX + 20 + 64 + (i + 2) * 64, topY: startY + 11 + (j + yChange) * 64, bottomY: startY + 11 + 64 + (j + yChange) * 64 };
		var path = new Path2D();
		path.moveTo(squareOne.rightX, squareOne.topY);
		path.lineTo(squareOne.rightX, squareOne.bottomY);
		path.lineTo(squareTwo.leftX, squareTwo.bottomY);
		path.lineTo(squareTwo.leftX, squareTwo.topY);
		ctx.fill(path);
		break;
	}
}

function drawSideBar () {
	sideCtx.clearRect(0, 0, sideCanvas.width, sideCanvas.height);
 	
 	sideCtx.globalAlpha = stuffOpacity;
	sideCtx.font = "1.5vw monospace";
	sideCtx.fillStyle = COLOR_WHITISH_BLUE;
	sideCtx.fillText(format(player.name, 0), 98, 44);

	sideCtx.font = "1vw monospace";
	sideCtx.fillStyle = COLOR_HEALTH_BAR_BACKGROUND;
	sideCtx.fillRect(100, 54, 200, 24);
	sideCtx.fillStyle = COLOR_HEALTH_BAR;
	sideCtx.fillRect(100, 54, (player.hp/player.maxhp) * 196, 20);

	sideCtx.fillStyle = COLOR_PATH;
	sideCtx.fillRect(20, 20, 64, 64);

	sideCtx.fillStyle = COLOR_HP_TEXT;
	sideCtx.fillText(player.hp + "/" + player.maxhp, 100, 96);
 	sideCtx.globalAlpha = 1;

	// The Enemy
	if (mission.getEvent().enemy && mission.getEvent().enemy.hp > 0 && stuffOpacity > 0 || forceDraw) {
		ctx.globalAlpha = stuffOpacity;
		ctx.fillStyle = COLOR_ENEMY_BAR_BACKGROUND;
		ctx.fillRect(playerX, playerY + 70, 64, 16);
		ctx.fillStyle = COLOR_ENEMY_BAR;
		ctx.fillRect(playerX + 4 + ((mission.getEvent().enemy.maxhp - mission.getEvent().enemy.hp)/mission.getEvent().enemy.maxhp) * 60, playerY + 70,
			(mission.getEvent().enemy.hp/mission.getEvent().enemy.maxhp) * 60, 12);
		ctx.globalAlpha = 1;

		sideCtx.globalAlpha = allOtherOpacity;
		sideCtx.font = "1.5vw monospace";
		sideCtx.fillStyle = COLOR_WHITISH_BLUE;
		var textWidth = (100 / document.documentElement.clientWidth);
		sideCtx.fillText(mission.getEvent().enemy.name, 68 - (textWidth * mission.getEvent().enemy.name.length), 140);

		sideCtx.fillStyle = COLOR_PATH;
		sideCtx.fillRect(236, 118, 64, 64);

		sideCtx.font = "1vw monospace";
		sideCtx.fillStyle = COLOR_HP_TEXT;
		sideCtx.fillText(mission.getEvent().enemy.hp + "/" + mission.getEvent().enemy.maxhp, 168, 190);

		sideCtx.globalAlpha = 1;
		sideCtx.fillStyle = COLOR_ENEMY_BAR_BACKGROUND;
		sideCtx.fillRect(20, 150, 200, 24);
		sideCtx.fillStyle = COLOR_ENEMY_BAR;
		sideCtx.fillRect(24 + ((mission.getEvent().enemy.maxhp - mission.getEvent().enemy.hp)/mission.getEvent().enemy.maxhp) * 200, 150,
			(mission.getEvent().enemy.hp/mission.getEvent().enemy.maxhp) * 196, 20);

	}

	var flush = false;
	for (var i = sideText.length - 1; i >= 0; i--) {
		var n = sideText[i];
		n.y += n.dy;
		sideCtx.font = n.font;
		sideCtx.fillStyle = n.fill;
		sideCtx.fillText(n.text, n.x, n.y);
		if (n.stroke)
    		sideCtx.strokeText(n.text, n.x, n.y);
		if (n.y >= n.fy) {
    		sideText.splice(sideText.indexOf(n), 1);
    		flush = true;
		}
	}

	for (var i = mainText.length - 1; i >= 0; i--) {
		var n = mainText[i];
		n.y += n.dy;
		ctx.font = n.font;
		ctx.fillStyle = n.fill;
		ctx.fillText(n.text, n.x, n.y);
		if (n.stroke)
    		ctx.strokeText(n.text, n.x, n.y);
		if (n.y >= n.fy) {
    		mainText.splice(mainText.indexOf(n), 1);
    		flush = true;
		}
	}

	if (flush)
    	redraw();
}

function describe (div) {
	switch(div.id) {
		case "choiceOne":
		log(mission.getEvent().descriptions[0]);
		break;
		
		case "choiceTwo":
		log(mission.getEvent().descriptions[1]);
		break;

		case "choiceThree":
		log(mission.getEvent().descriptions[2]);
		break;

		case "slot1":
		log(mission.inventory[0].description);
		break;
	}
}

function inventoryContains (item) {
	for (var i = mission.inventory.length - 1; i >= 0; i--) {
		var object = mission.inventory[i];
		if (object.name == item.name)
			return true;
	}
	return false;
}

function playOpening () {
	playSceneOne();
}

var scene;
var SCENE_ONE   	  = "outsideship";
var URL_SCENE_ONE 	  = "art/scene1.png";
var SCENE_TWO   	  = "vastrichs";
var URL_SCENE_TWO 	  = "art/scene2.png";
var SCENE_THREE 	  = "ominousship";
var URL_SCENE_THREE   = "art/scene3.png";
var SCENE_OVER		  = "over";
var URL_TALKING_ONE   = "art/talking1.png"
var URL_TALKING_TWO   = "art/talking2.png"
var URL_TALKING_THREE = "art/talking3.png"
var URL_TALKING_FOUR  = "art/talking4.png"

function continueExposition () {	
	switch (scene) {
		case SCENE_ONE:
		// draw ship floating
		scene = SCENE_TWO;
		break;

		case SCENE_TWO:
		// draw vast riches
		scene = SCENE_THREE;
		document.getElementById("startButton").innerHTML = "START";
		break;

		case SCENE_THREE:
		// draw dank hallway
		$(openingDiv).fadeOut(1500);
		Cookies.set("started", true);
		break;

		default:

		break;
	}
}

var talking = false;
function playSceneOne() {
	scene = SCENE_ONE;
	window.setTimeout(drawScene, 1000/60);
	$('#expositionDiv').html("<p><br><br><br><br><br><br><br><br><br><br><br><br><br><br></p>");
	talking = true;
	incrTalkingSprite();
	window.setTimeout(function() {
		openPilot("Ay captain, scan's done.");
	}, 500);
	window.setTimeout(function() {
		openCaptain("What are we lookin' at?");
		$("#startButton").fadeIn(4000);
	}, 3000);
	window.setTimeout(function() {
		openPilot("It's a graveyard, floatin' around for at least 50 years.");
	}, 5200);
	window.setTimeout(function() {
		openCaptain("And the distress signal?");
	}, 8700);
	window.setTimeout(function() {
		openPilot("Nobody's answerin'.");
	}, 11500);
	window.setTimeout(function() {
		openPilot("Wait a second-");
		talking = false;
	}, 12800);
}

function drawScene () {
	var canvasNode = document.getElementById("expositionCanvas");
	var openingCtx = canvasNode.getContext("2d");
	openingCtx.clearRect(0, 0, openingCtx.width, openingCtx.height);
	switch (scene) {
		case SCENE_ONE:
		// draw ship floating
		openingCtx.drawImage(sceneOne,0,0);
		if (talking) 
			openingCtx.drawImage(talkingSprites[talkingIndex], 910, 360);
		else
			openingCtx.drawImage(talkingSprites[7], 910, 360);	
		window.setTimeout(drawScene, 1000/60);
		break;

		case SCENE_TWO:
		// draw vast riches
		openingCtx.drawImage(sceneTwo,0,0);
		window.setTimeout(drawScene, 1000/60);
		break;

		case SCENE_THREE:
		// draw dank hallway
		openingCtx.drawImage(sceneThree,0,0);
		window.setTimeout(drawScene, 1000/60);
		break;

		default:

		break;
	}
}

function drawThanks() {
	var canvasNode = document.getElementById("expositionCanvas");
	var openingCtx = canvasNode.getContext("2d");
	openingCtx.clearRect(0, 0, openingCtx.width, openingCtx.height);

	var textWidth = (100 / document.documentElement.clientWidth);
	openingCtx.font = "1.5vw monospace";
	openingCtx.fillStyle = COLOR_WHITISH_BLUE;
	openingCtx.fillText("Thanks for playing!", (canvasNode.width/2) - (textWidth * 19 * 150), 300);
}

function incrTalkingSprite () {
	talkingIndex = ++talkingIndex % 8;
	if (talking)
		window.setTimeout(function() {incrTalkingSprite(1000/60)}, 1000/5);
}

function openCaptain (string) {
	var node = document.createElement("p");
	node.style.textAlign = "right";
	node.innerHTML = white(string);

	openLog(node);	
}

function openPilot (string) {
	var node = document.createElement("p");

	node.innerHTML = light_brown(string);

	openLog(node);	
}

function openLog (node) {
	var expositionDiv = document.getElementById("expositionDiv");

	expositionDiv.appendChild(node);		

	jQuery(expositionDiv).animate({
		'scrollTop':'' + expositionDiv.scrollHeight
	}, 1000, 'linear');
}

var ChangingTiles = [];
function updateTiles () {
	for (var i = ChangingTiles.length - 1; i >= 0; i--)
	{
		var t = ChangingTiles[i];
		if (t.getColor() != t.getFinalColor())
			t.incrColor();
		else
    		ChangingTiles.splice(ChangingTiles.indexOf(t), 1);
	}
	redraw();
	if (ChangingTiles.length > 0)
		window.setTimeout(updateTiles, 1000/60)
}