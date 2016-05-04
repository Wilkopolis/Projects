var floor = .8;
var left_wall = .05;
var right_wall = .7;
var ceiling = .3;
var GRAVITY = .5;
var crewPos = {x:300, y:500};
var bossPos = {x:1400, y:350};

var jumped = false;
var jumpCnt = 0;
var left = false;
var right = false;
window.onkeydown = function(e) { 
	if (endTimes) {
	   	if (e.keyCode == 68 || e.keyCode == 39) {
	   		// d / -->
	   		player.vel.x = 5;
	   		right = true;
	   	} else if (e.keyCode == 87 || e.keyCode == 38) {
	   		// w / ^
	   	} else if (e.keyCode == 65 || e.keyCode == 37) {
	   		// a / <--
	   		player.vel.x = -5;
	   		left = true;
	   	} else if (e.keyCode == 32) {
	   		if (!jumped && jumpCnt < 2) {
	   			// space
	   			player.vel.y = -12;
	   			player.acc.y = GRAVITY;
	   			jumped = true;
	   			jumpCnt++;
	   		}
	   	}
   	}

	return !(e.keyCode == 32 || e.keyCode == 34 || e.keyCode == 33 || e.keyCode == 40 || e.keyCode == 38);
}

window.onkeyup = function(e) { 
	if (endTimes) {
	   	if (e.keyCode == 68 || e.keyCode == 39) {
	   		// d / -->
	   		if (left)
	   			player.vel.x = -5;
	   		else
	   			player.vel.x = 0;
	   		right = false;
	   	} else if (e.keyCode == 87 || e.keyCode == 38) {
	   		// w / ^
	   	} else if (e.keyCode == 65 || e.keyCode == 37) {
	   		// a / <--
	   		if (right)
	   			player.vel.x = 5;
	   		else
	   			player.vel.x = 0;
	   		left = false;
	   	} else if (e.keyCode == 32) {
	   		// space
	   		jumped = false;
	   	} else if (e.keyCode == 67)	{	   		
	   		entities.push({
	   			img: bigDebris,
	   			pos: {x: 1500, y: 800},
	   			vel: {x: -2.4, y: -15},
	   			acc: {x: 0, y: .5}});
	   	}
   	}

	return !(e.keyCode == 32 || e.keyCode == 34 || e.keyCode == 33 || e.keyCode == 40 || e.keyCode == 38);
}

function update () {
	var ground = floor * window.innerHeight;
	var leftWall = left_wall * window.innerWidth;
	var rightWall = right_wall * window.innerWidth;

	player.vel.y += player.acc.y;
	player.vel.x += player.acc.x;

	// hits the ground
	if (player.pos.y < ground && player.pos.y + player.vel.y >= ground) {
		player.acc.y = 0;
		player.vel.y = 0;
		player.pos.y = ground;
	   	jumpCnt = 0;
	} else
		player.pos.y += player.vel.y;
	// hits the left wall
	if (player.pos.x + player.vel.x <= leftWall) {
		player.acc.x = 0;
		player.vel.x = 0;
		player.pos.x = leftWall;
	} else if (player.pos.x + player.vel.x >= rightWall) {
		player.acc.x = 0;
		player.vel.x = 0;
		player.pos.x = rightWall;
	} else
		player.pos.x += player.vel.x;

	var i = 0;
	while (i < entities.length) {
		var entity = entities[i];
		var center = {x: entity.pos.x + entity.img.width/2, y:entity.pos.y + entity.img.height/2 };
		if (entity.pos.y < ground && entity.pos.y + entity.vel.y >= ground && center.x > leftWall && center.y < rightWall) {
			entity.vel.y = -entity.vel.y;
			entity.pos.y = ground;
		} else {			
			entity.vel.y += entity.acc.y;
			entity.vel.x += entity.acc.x;
			entity.pos.y = Math.min(entity.vel.y + entity.pos.y, ground);
			entity.pos.x += entity.vel.x;
		}
		// if entity is offscreen
		if (entity.pos.x > 2000 || entity.pos.x < -100 || entity.pos.y > 900) {
			// kill
			entities.splice(i,1);
			continue;
		}

		// air resistance
		entity.vel.x = Math.round(.99 * entity.vel.x * 1000) / 1000;
		entity.vel.y = Math.round(.99 * entity.vel.y * 1000) / 1000;
		i++;
	}
}

function draw () {
	closingCtx.clearRect(0, 0, closingCanvas.width, closingCanvas.height);
	// the ground shadow
	closingCtx.drawImage(shadow, 700, 820);
	// the helpless crew
	closingCtx.drawImage(crew, crewPos.x, crewPos.y);
	// the big boss
	closingCtx.drawImage(boss, bossPos.x, bossPos.y);
	for (var i = entities.length - 1; i >= 0; i--) {
		var entity = entities[i];		
		closingCtx.drawImage(entity.img, entity.pos.x, entity.pos.y);
	}
	drawPlayer();	


	// closingCtx.fillStyle = COLOR_HEALTH_BAR_BACKGROUND;
	// closingCtx.fillRect(player.pos.x, player.pos.y - 22, 64, 16);
	// closingCtx.fillStyle = COLOR_HEALTH_BAR;
	// closingCtx.fillRect(player.pos.x, player.pos.y - 22, (player.hp/player.maxhp) * 60, 12);
}

function bigDebris() {
	this.img = bigDebris;
	this.pos = {x: 1500, y: 800};
	this.vel = {x: -1, y: 1};
	this.acc = {x: 0, y: GRAVITY};
}

chargeStart = 0;
function charge() {
	chargeStart = new Date().getTime();
}

function release() {
	var timePassed = new Date.getTime() - chargeStart;
	// if ball within influence
	for (var i = entities.length - 1; i >= 0; i--) {
		var ball = entities[i];
		// if (ball)
	}
	// calc resultant vector
		// get ball center
		// get player center
	// add vector to velocity
}