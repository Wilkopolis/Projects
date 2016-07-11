var COLOR_PLAYER 	 = '#FF7519';
var COLOR_BACKGROUND = '#331A00';

var PATH_BACKGROUND = 'background.png';
var PATH_SKELETON = 'skeleton.png';
var PATH_SWORD = 'sword.png';
var PATH_CRATE = 'crate.png';
var PATH_DEBRIS = 'debris.png';

var MAX_JUMP_HEIGHT = 75;
var GRAVITY = .08;

var MAX_OFFSET = 1000;

var LEFT_A = 65;
var LEFT_ARROW = 37;
var RIGHT_D = 68;
var RIGHT_ARROW = 39;
var JUMP_W = 87;
var JUMP_SPACE = 32;
var JUMP_ARROW = 38;
var DOWN_S = 83;
var DOWN_ARROW = 40;
var keyMap = [];
var left = false;
var right = false;
var jump = false;
var jumpReset = true;
var interact = false;
var firing = false;
var shootUp = true;
var shootCoolDown = 200;
var xMoving = 'none';
var mouseX = 0;
var mouseY = 0;

var level = new Level();
var room1 = new Room();

// var fuck = 'fuck';
// var shit = 'shit';
// var stack = 'stack';

window.onload = function () {
	canvas = document.getElementById("canvas");
	canvas.width = window.innerWidth;
	canvas.height = 720;
	startX = $('#canvas').position().left;
	startY = $('#canvas').position().top;
	offset = {x:0, y:0};
	player = new Player();

	ctx = canvas.getContext("2d");
	ctx.font = "30px Arial";

	room1.background = new Image();
	room1.background.src = PATH_BACKGROUND;

	skeleton = new Image();
	skeleton.src = PATH_SKELETON;

	sword = new Image();
	sword.src = PATH_SWORD;

	crate = new Image();
	crate.src = PATH_CRATE;

	debris = new Image()
	debris.src = PATH_DEBRIS;

	room1.entities.push(player);
	room1.entities.push(new Platform(0, 0, 2560, 16));
	room1.entities.push(new Platform(0, 704, 2560, 16));
	room1.entities.push(new Platform(0, 0, 16, 720));
	room1.entities.push(new Platform(2544, 0, 16, 720));
	room1.doors.push(new Door(1850, 620, 100, 100));
	level.rooms.push(room1);

	window.setInterval(update, 1/60);
};

function Level () {
	this.roomIndex = 0;
	this.rooms = [];

	this.getRoom = function() {
		return this.rooms[this.roomIndex];
	};
}

function Room () {
	this.doors = [];
	this.entities = [];
	this.background = null;
}

function Platform (x, y, w, h) {
	this.x = x + w/2;
	this.y = y + h/2;
	this.width = w/2;
	this.height = h/2;
	this.drawn = false;
	this.solid = true;
	
	this.update = function() {
		
	};

	this.getHit = function(p) {
		p.flagged = true;
	};

	this.leftSide = function() {
		return this.x - this.width - offset.x;
	};

	this.rightSide = function() {
		return this.x + this.width - offset.x;
	};

	this.topSide = function() {
		return this.y - this.height;
	};

	this.bottomSide = function() {
		return this.y + this.height;		
	};

	this.nextLeftSide = function() {
		return this.x - this.width - offset.x;
	};

	this.nextRightSide = function() {
		return this.x + this.width - offset.x;
	};

	this.nextTopSide = function() {
		return this.y - this.height;
	};

	this.nextBottomSide = function() {
		return this.y + this.height;		
	};
}

function Door (x, y, w, h, dir) {
	this.x = x;
	this.y = y;
	this.width = w/2;
	this.height = h/2;
	this.dir = dir;

	this.interact = function() {
		switch (dir) {
			case FORWARD:
			break;

			case BACK:
			break;

			case EXIT:
			break;
		}
		level.roomIndex++;
	};

	this.leftSide = function() {
		return this.x - this.width - offset.x;
	};

	this.rightSide = function() {
		return this.x + this.width - offset.x;
	};

	this.topSide = function() {
		return this.y - this.height;
	};

	this.bottomSide = function() {
		return this.y + this.height;		
	};
}

function Player () {
	this.x = canvas.width/2;
	this.y = canvas.height/2;
	this.dx = 0;
	this.dy = 0;
	this.ax = .04;
	this.ay = GRAVITY;
	this.width = 8;
	this.height = 16;
	this.xMax = 2;
	this.yMax = 2;
	this.grounded = false;
	this.jumping = false;
	this.jumpStart = 0;
	this.jumpCount = 2;
	this.drawn = false;
	
	this.update = function() {

		if (interact) {
			for (var d in level.getRoom().doors) {
				if (this.rightSide() >= d.leftSide() && this.leftSide() <= d.rightSide()) {
					if (this.bottomSide() >= d.topSide() && this.topSide() <= d.bottomSide()) {
						// move to next room
						interact = false;
						return;
					}
				}
			}
			interact = false;
		}

		// get where I'm going
		if (jump && !this.jumping && this.jumpCount > 0 && jumpReset) {
			this.jumping = true;
			jumpReset = false;
			this.jumpCount--;
			this.jumpStart = this.y;
			this.dy = -this.yMax;
		} else if (!jump) {
			this.jumping = false;
			jumpReset = true;
		}

		if (jump && this.jumping && this.y >= this.jumpStart - MAX_JUMP_HEIGHT) {
			this.dy = -this.yMax;
		} else if (jump && this.y < this.jumpStart - MAX_JUMP_HEIGHT) {		
			this.jumping = false;
		} 

		if (!this.grounded) {
			this.dy += this.ay;
			if (this.dy > this.yMax)
				this.dy = this.yMax;
		}

		switch (xMoving) {
			case 'right':
			this.dx += this.ax;
			if (this.dx > this.xMax)
				this.dx = this.xMax;
			break;

			case 'left':
			this.dx -= this.ax;
			if (this.dx < -this.xMax)
				this.dx = -this.xMax;
			break;

			case 'none':
			if (this.dx > 0) {
				this.dx -= this.ax;
				if (this.dx < 0)
					this.dx = 0;
			} else if (this.dx < 0) {
				this.dx += this.ax;
				if (this.dx > 0)
					this.dx = 0;
			}
			break;
		}

		// check collisions with entities
		this.grounded = false;
		for (var o of level.getRoom().entities) {
			if (o != this && o.solid) {
				if (this.rightSide() >= o.leftSide() && this.leftSide() <= o.rightSide()) {
					if (this.nextBottomSide() >= o.topSide() && this.bottomSide() <= o.topSide()) {
						this.y = o.topSide() - this.height;
						this.dy = 0;
						this.grounded = true;
						this.jumpCount = 2;
						jumpReset = true;
					} 
					if (this.nextTopSide() <= o.bottomSide() && this.topSide() >= o.bottomSide()) {
						this.y = o.bottomSide() + this.height;
						this.dy = 0;
						this.jumping = false;
					}
				} 
				if (this.topSide() <= o.bottomSide() && this.bottomSide() >= o.topSide()) {
					if (this.nextRightSide() > o.leftSide() && this.rightSide() <= o.leftSide()) {
						this.dx = 0;
						this.x = o.leftSide() - this.width;
					} 
					if (this.nextLeftSide() < o.rightSide() && this.leftSide() >= o.rightSide()) {
						this.dx = 0;
						this.x = o.rightSide() + this.width;
					}
				}
			}
		}

		// check collisions with entities
		this.x += this.dx;
		this.y += this.dy;

		if ((this.x + this.dx > canvas.width * .75 && this.dx > 0) || (this.x + this.dx < canvas.width * .25 && this.dx < 0)) {
			offset.x += this.dx;
			offset.x = Math.min(Math.max(offset.x, 0), MAX_OFFSET);
		}
	};

	this.getHit = function(p) {

	};

	this.leftSide = function() {
		return this.x - this.width;
	};

	this.rightSide = function() {
		return this.x + this.width;
	};

	this.topSide = function() {
		return this.y - this.height;
	};

	this.bottomSide = function() {
		return this.y + this.height;		
	};

	this.nextLeftSide = function() {
		return this.x + this.dx - this.width;
	};

	this.nextRightSide = function() {
		return this.x + this.dx + this.width;
	};

	this.nextTopSide = function() {
		return this.y + this.dy - this.height;
	};

	this.nextBottomSide = function() {
		return this.y + this.dy + this.height;		
	};
}

function Crate (x, y) {
	this.x = x;
	this.y = y;
	this.sprite = crate;
	this.width = crate.width/2;
	this.height = crate.height/2;
	this.drawn = false;
	this.solid = true;

	this.update = function() {

	};

	this.getHit = function(p, dir) {
		// fuck = p.rightSide();
		// shit = this.leftSide();
		// stack = offset.x;
		p.flagged = p.parent != this;

		if (!p.damaging)
			return;

		for (var i = Math.floor(Math.random() * 2) + 2; i > 0; i--) {
			var x, y;
			switch(dir) {
				case 'top':
				x = this.x + (p.x - this.x);
				y = this.bottomSide();
				break;

				case 'bottom':
				x = this.x + (p.x - this.x);
				y = this.topSide();
				break;

				case 'left':
				x = this.rightSide() + offset.x;
				y = this.y + (p.y - this.y);
				break;

				case 'right':
				x = this.leftSide() + offset.x;
				y = this.y + (p.y - this.y);
				break;
			}
			entities.push(new Debris(this, x, y, p.dx, p.dy));	
		}
	};
	
	this.leftSide = function() {
		return this.x - this.width - offset.x;
	};

	this.rightSide = function() {
		return this.x + this.width - offset.x;
	};

	this.topSide = function() {
		return this.y - this.height;
	};

	this.bottomSide = function() {
		return this.y + this.height;		
	};

	this.nextLeftSide = function() {
		return this.x + this.dx;
	};

	this.nextRightSide = function() {
		return this.x + this.dx;
	};

	this.nextTopSide = function() {
		return this.y + this.dy;
	};

	this.nextBottomSide = function() {
		return this.y + this.dy;		
	};
}

function Debris (parent, x, y, dx, dy) {
	this.parent = parent;
	this.sprite = debris;
	this.width = debris.width/2;
	this.height = debris.height/2;
	this.x = x - this.width;
	this.y = y - this.height;
	this.dx = dx + (Math.random() * .25 - .25) * Math.random() - .5;
	this.dy = dy + (Math.random() * .25 - .25) * Math.random() - .5;
	this.ax = .04;
	this.ay = GRAVITY;
	this.gravity = true;
	this.rotation = 0;
	this.rotStep = Math.random() * .2 - .1;
	this.drawn = false;
	this.solid = false;
	
	this.update = function() {
		for (var o of level.getRoom().entities) {
			if (this.rightSide() >= o.leftSide() && this.leftSide() <= o.rightSide()) {
				if (this.nextBottomSide() >= o.topSide() && this.bottomSide() <= o.topSide()) {
					o.getHit(this, 'top');
				} else if (this.nextTopSide() <= o.bottomSide() && this.topSide() >= o.bottomSide()) {
					o.getHit(this, 'bottom');
				}
			} else if (this.topSide() <= o.bottomSide() && this.bottomSide() >= o.topSide()) {
				if (this.nextRightSide() > o.leftSide() && this.rightSide() <= o.leftSide()) {
					o.getHit(this, 'left');
				} else if (this.nextLeftSide() < o.rightSide() && this.leftSide() >= o.rightSide()) {
					o.getHit(this, 'right');
				}
			}
		}

		this.dx += this.ax;
		this.dy += this.ay;
		this.x += this.dx;
		this.y += this.dy;
		this.rotation += this.rotStep;	
	};

	this.leftSide = function() {
		return this.x - this.width - offset.x;
	};

	this.rightSide = function() {
		return this.x + this.width - offset.x;
	};

	this.topSide = function() {
		return this.y - this.height;
	};

	this.bottomSide = function() {
		return this.y + this.height;		
	};

	this.nextLeftSide = function() {
		return this.x + this.dx - this.width - offset.x;
	};

	this.nextRightSide = function() {
		return this.x + this.dx + this.width - offset.x;
	};

	this.nextTopSide = function() {
		return this.y + this.dy - this.height;
	};

	this.nextBottomSide = function() {
		return this.y + this.dy + this.height;		
	};

	this.getHit = function() {};
}

function Sword (parent, x, y, dx, dy) {
	this.parent = parent;
	this.sprite = sword;
	this.width = sword.width/2;
	this.height = sword.height/2;
	this.x = x + this.width;
	this.y = y + this.height;
	this.dx = dx;
	this.dy = dy;
	this.ax = 0;
	this.ay = 0;
	this.rotation = 0;
	this.rotStep = .1;
	this.flagged = false;
	this.gravity = false;
	this.dmg = 1;
	this.drawn = false;
	this.solid = false;

	this.update = function() {
		for (var o of level.getRoom().entities) {
			if (this.rightSide() >= o.leftSide() && this.leftSide() <= o.rightSide()) {
				if (this.nextBottomSide() >= o.nextTopSide() && this.bottomSide() <= o.topSide()) {
					o.getHit(this, 'top');
				} else if (this.nextTopSide() <= o.nextBottomSide() && this.topSide() >= o.bottomSide()) {
					o.getHit(this, 'bottom');
				}
			} else if (this.topSide() <= o.bottomSide() && this.bottomSide() >= o.topSide()) {
				if (this.nextRightSide() > o.nextLeftSide() && this.rightSide() <= o.leftSide()) {
					o.getHit(this, 'left');
				} else if (this.nextLeftSide() < o.nextRightSide() && this.leftSide() >= o.rightSide()) {
					o.getHit(this, 'right');
				}
			}
		}

		if (this.gravity) {
			this.dy += .005;
			this.rotation += this.rotStethis;			
		}

		this.x += this.dx;
		this.y += this.dy;
		this.rotation += this.rotStep;
	};

	this.leftSide = function() {
		return this.x - this.width - offset.x;
	};

	this.rightSide = function() {
		return this.x + this.width - offset.x;
	};

	this.topSide = function() {
		return this.y - this.height;
	};

	this.bottomSide = function() {
		return this.y + this.height;		
	};

	this.nextLeftSide = function() {
		return this.x + this.dx - this.width - offset.x;
	};

	this.nextRightSide = function() {
		return this.x + this.dx + this.width - offset.x;
	};

	this.nextTopSide = function() {
		return this.y + this.dy - this.height;
	};

	this.nextBottomSide = function() {
		return this.y + this.dy + this.height;		
	};

	this.getHit = function() {};
}

function Skeleton_Sword (parent, x, y, dx, dy) {
	this.parent = parent;
	this.sprite = sword;
	this.width = sword.width/2;
	this.height = sword.height/2;
	this.x = x + this.width;
	this.y = y + this.height;
	this.dx = dx;
	this.dy = dy;
	this.ax = 0;
	this.ay = 0;
	this.rotation = 0;
	this.rotStep = .1;
	this.flagged = false;
	this.gravity = false;
	this.dmg = 1;
	this.drawn = false;
	this.solid = false;

	this.update = function() {
		for (var o of level.getRoom().entities) {
			if (this.rightSide() >= o.leftSide() && this.leftSide() <= o.rightSide()) {
				if (this.nextBottomSide() >= o.nextTopSide() && this.bottomSide() <= o.topSide()) {
					o.getHit(this, 'top');
				} else if (this.nextTopSide() <= o.nextBottomSide() && this.topSide() >= o.bottomSide()) {
					o.getHit(this, 'bottom');
				}
			} else if (this.topSide() <= o.bottomSide() && this.bottomSide() >= o.topSide()) {
				if (this.nextRightSide() > o.nextLeftSide() && this.rightSide() <= o.leftSide()) {
					o.getHit(this, 'left');
				} else if (this.nextLeftSide() < o.nextRightSide() && this.leftSide() >= o.rightSide()) {
					o.getHit(this, 'right');
				}
			}
		}

		if (this.gravity) {
			this.dy += .005;
			this.rotation += this.rotStethis;			
		}

		this.x += this.dx;
		this.y += this.dy;
		this.rotation += this.rotStep;
	};

	this.leftSide = function() {
		return this.x - this.width - offset.x;
	};

	this.rightSide = function() {
		return this.x + this.width - offset.x;
	};

	this.topSide = function() {
		return this.y - this.height;
	};

	this.bottomSide = function() {
		return this.y + this.height;		
	};

	this.nextLeftSide = function() {
		return this.x + this.dx - this.width - offset.x;
	};

	this.nextRightSide = function() {
		return this.x + this.dx + this.width - offset.x;
	};

	this.nextTopSide = function() {
		return this.y + this.dy - this.height;
	};

	this.nextBottomSide = function() {
		return this.y + this.dy + this.height;		
	};

	this.getHit = function() {};
}

function Skeleton (x, y) {
	this.x = x;
	this.y = y;
	this.dx = 0;
	this.dy = 0;
	this.ax = .04;
	this.ay = GRAVITY;
	this.xMax = 2;
	this.yMax = 2;
	this.sprite = skeleton;
	this.width = skeleton.width/2;
	this.height = skeleton.height/2;
	this.speed = 1;
	this.gravity = true;
	this.dmg = 1;
	this.solid = true;
	// deciding
	// moving
	// still
	this.state = 'deciding';
	this.tick = 0;

	this.hp = 5;
	this.flagged = false;

	this.update = function() {
		switch (this.state) {
			case 'deciding':
			this.state = 'moving';
			this.ax = .04;
			this.tick = 1000;
			break;

			case 'moving':
			this.dx += this.ax;
			this.dy += this.ay;
			if (Math.abs(this.dx) > this.xMax)
				this.dx = this.dx > 0 ? this.xMax : -this.xMax;
			if (Math.abs(this.dy) > this.yMax)
				this.dy = this.dy > 0 ? this.yMax : -this.yMax;
			this.x += this.dx;
			this.y += this.dy;
			this.tick--;
			if (this.tick <= 0) {
				this.state = 'deciding';
			}
			break;

			case 'still':
			this.tick--;
			if (this.tick <= 0) {
				this.state = 'deciding';
			}
			break;			
		}
	};

	this.getHit = function(p) {
		if (p.dmg) {
			this.hp -= p.dmg;
			p.flagged = true;

			// this.flagged = this.hp <= 0;
		}
	};

	this.leftSide = function() {
		return this.x - this.width - offset.x;
	};

	this.rightSide = function() {
		return this.x + this.width - offset.x;
	};

	this.topSide = function() {
		return this.y - this.height;
	};

	this.bottomSide = function() {
		return this.y + this.height;		
	};

	this.nextLeftSide = function() {
		return this.x + this.dx - this.width - offset.x;
	};

	this.nextRightSide = function() {
		return this.x + this.dx + this.width - offset.x;
	};

	this.nextTopSide = function() {
		return this.y + this.dy - this.height;
	};

	this.nextBottomSide = function() {
		return this.y + this.dy + this.height;		
	};
}

function update () {
	for (var m of level.getRoom().entities) { 
		m.drawn = false;
		m.update()
	}

	level.getRoom().entities.removeIf(function(p) {
		return (p.flagged);
	});

	if (firing && shootUp) {
		window.setTimeout(function() {
			shootUp = true;
		}, shootCoolDown);
		fire();
		shootUp = false;
	}

	draw();
}

function draw () {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawEntities();
}

function drawEntities () {
	ctx.drawImage(level.getRoom().background, offset.x, offset.y, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);

	// ctx.fillStyle = '#E62739';
    // ctx.fillText("projectile.getRight(): " + fuck, 20, 50);
    // ctx.fillText("crate.getLeft(): " + shit, 20, 100);
    // ctx.fillText("offset.x: " + stack, 20, 150);
    for (var p of level.getRoom().entities) {	

    	if (p.drawn || p == player)
    		continue;

    	// draw hitboxes	
		// ctx.fillRect(p.leftSide(), p.topSide(), p.width * 2, p.height * 2);
		if (p.rotStep) {
			drawRotated(p.sprite, p.leftSide() - offset.x, p.topSide(), p.rotation);
			// ctx.fillRect( p.leftSide() - 1, p.topSide() - 1, 2, 2);
			// ctx.fillRect( p.leftSide() - 1, p.bottomSide() - 1, 2, 2);
			// ctx.fillRect( p.rightSide() - 1, p.topSide() - 1, 2, 2);
			// ctx.fillRect( p.rightSide() - 1, p.bottomSide() - 1, 2, 2);			
			// ctx.fillStyle = COLOR_PLAYER;
			// ctx.fillRect( p.nextLeftSide() - 1, p.nextTopSide() - 1, 2, 2);
			// ctx.fillRect( p.nextLeftSide() - 1, p.nextBottomSide() - 1, 2, 2);
			// ctx.fillRect( p.nextRightSide() - 1, p.nextTopSide() - 1, 2, 2);
			// ctx.fillRect( p.nextRightSide() - 1, p.nextBottomSide() - 1, 2, 2);	
		}
		else if (p.sprite) {
			ctx.drawImage(p.sprite, p.leftSide() - offset.x, p.topSide());
		} 
			ctx.fillStyle = '#E62739';
			ctx.fillRect(p.leftSide(), p.topSide(), p.width * 2, p.height * 2);

    	p.drawn = true;
	}

	ctx.fillStyle = COLOR_PLAYER;
	ctx.fillRect(player.x - player.width - offset.x, player.y - player.height, player.width * 2, player.height * 2);
}

function fire () {
	var i = mouseX - (player.x + startX);
	var j = mouseY - (player.y + startY);
	var mag = Math.sqrt(i*i + j*j);

	level.getRoom().entities.push(new Sword(player, player.x + offset.x - player.width, player.topSide(), i/mag, j/mag, sword));
}

function drawRotated (sprite, x, y, theta) {
	ctx.save(); 

	// move to the middle of where we want to draw our image
	ctx.translate(x + (sprite.width/2), y + (sprite.height/2));

	// rotate around that point, converting our 
	// angle from degrees to radians 
	ctx.rotate(theta);

	// draw it up and to the left by half the width
	// and height of the image 
	ctx.drawImage(sprite, -(sprite.width/2), -(sprite.height/2));

	// and restore the co-ords to how they were when we began
	ctx.restore(); 
}

onkeydown = function(event) {
	event = event || window.event;

	var keyCode = event.keyCode;
	keyMap[event.keyCode] = event.type == 'keydown';

	left = keyMap[LEFT_A] || keyMap[LEFT_ARROW];
	right = keyMap[RIGHT_D] || keyMap[RIGHT_ARROW];
	jump = keyMap[JUMP_W] || keyMap[JUMP_ARROW] || keyMap[JUMP_SPACE];
	interact = keyMap[DOWN_S] || keyMap[DOWN_ARROW];

	if (left && right) {
		if (keyCode == LEFT_A || keyCode == LEFT_ARROW)
			xMoving = 'left';
		else if (keyCode == RIGHT_D || keyCode == RIGHT_ARROW)
			xMoving = 'right';
	} else if (left) {
		xMoving = 'left';
	} else if (right) {
		xMoving = 'right';
	} else {
		xMoving = 'none';
	}
};

onkeyup = function(event) {
	event = event || window.event;

	var keyCode = event.keyCode;
	keyMap[keyCode] = event.type == 'keydown';

	left = keyMap[LEFT_A] || keyMap[LEFT_ARROW];
	right = keyMap[RIGHT_D] || keyMap[RIGHT_ARROW];
	jump = keyMap[JUMP_W] || keyMap[JUMP_ARROW] || keyMap[JUMP_SPACE];
	interact = keyMap[DOWN_S] || keyMap[DOWN_ARROW];

	if (keyCode == LEFT_A || keyCode == LEFT_ARROW || keyCode == RIGHT_D || keyCode == RIGHT_ARROW) {
		if (left && right) {
			if (xMoving == 'right')
				xMoving = 'left';
			else if (xMoving == 'left')
				xMoving = 'right';
		} else if (left) {
			xMoving = 'left';
		} else if (right) {
			xMoving = 'right';
		} else {
			xMoving = 'none';
		}
	}
};

onmousedown = function(event) {
	event = event || window.event;switch (event.which) {
		case 1:
		firing = true;
		break;
		case 2:
        // alert('Middle Mouse button pressed.');
        break;
        case 3:
        // alert('Right Mouse button pressed.');
        break;
        default:
        // alert('You have a strange Mouse!');
    }
};

onmousemove = function(event) {
	event = event || window.event;
	mouseX = event.clientX;
	mouseY = event.clientY;
};

onmouseup = function(event) {
	event = event || window.event;switch (event.which) {
		case 1:
		firing = false
		break;

		case 2:
        // alert('Middle Mouse button pressed.');
        break;

        case 3:
        // entities.push(new Crate(offset.x + mouseX, offset.y + mouseY - startY));
        level.getRoom().entities.push(new Crow(offset.x + mouseX, offset.y + mouseY - startY));
        break;

        default:
        // alert('You have a strange Mouse!');
        break;
    }
};

oncontextmenu = function () {
	// cancel default menu
	return false;     
};

function createArray (length) {
	var arr = new Array(length || 0),
	i = length;

	if (arguments.length > 1) {
		var args = Array.prototype.slice.call(arguments, 1);
		while(i--) arr[length-1 - i] = createArray.apply(this, args);
	}

	return arr;
}

Array.prototype.removeIf = function(callback) {
	var i = 0;
	while (i < this.length) {
		if (callback(this[i], i)) {
			this.splice(i, 1);
		}
		else {
			++i;
		}
	}
};