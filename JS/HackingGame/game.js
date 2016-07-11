var COLOR_CONNECTION = '#000000';
var COLOR_BACKGROUND = '#331A00';

var mouseX = 0;
var mouseY = 0;

// var fuck = 'fuck';
// var shit = 'shit';
// var stack = 'stack';

// a logic deducing puzzle, like clue
//More of an event really//>>// No! he is the clone, shoot him! 2 other clones and yourself, one leaves
// jigsaw
// missile command
// an action puzzle like portal
// bomb defuse
// lockpick
// casino
// minecart autoscroller
// tacticle

// hacking minigame where there is a grid and you have to try to hack the right one but people are using them and you have to
//
// [ ] [ ] [ ] [ ] 
//
// [ ] [ ] [ ] [ ]
//
// [ ] [ ] [ ] [ ]
//
// [ ] [ ] [ ] [ ]
// tactical minigame

var player;
var connections = [];

window.onload = function () {
	canvas = document.getElementById("canvas");
	canvas.width = window.innerWidth;
	canvas.height = 720;
	startX = $('#canvas').position().left;
	startY = $('#canvas').position().top;
	
	ctx = canvas.getContext("2d");

	ctx.font = "30px Arial";

	var player = new Host(200, 200, '#playerDiv');
	var enemy = new Host(200, 600, '#enemyDiv');

	var connection1 = new Connection(player, enemy);
	connections.push(connection1);
	player.connections.push(connection1);
	enemy.connections.push(connection1);

	window.setInterval(update, 1/60);
};

function Host (x, y, selector) {
	this.x = x;
	this.y = y;
	this.width = 100;
	this.height = 100;
	this.selector = selector;
	this.connections = [];

	this.sendPing = function(destination) {
		// get connection
		for (var c of connections) {
			if (c.hostB.selector == destination){
				c.signals.push(new Signal(this, c.hostB);
			}
		}
	};
}

function clickHost (this) {
	if (coolDown == 0) {
		player.sendPing(this.id);
	}
}

function Connection (hostA, hostB) {
	this.hostA = hostA;
	this.hostB = hostB;
	this.path = [{x:hostA.x, y:hostA.y}, {x:hostB.x, y:hostB.y}];
	this.signals = [];
}

function Signal (hostA, hostB) {
	this.x = hostA.x;
	this.y = hostA.y;
	var length = Math.sqrt((hostB.x - hostA.x) * (hostB.x - hostA.x) + (hostB.y - hostA.y) * (hostB.y - hostA.y))
	this.ticks = 0;
	this.maxTicks = length * 60;
	this.endX = hostB.x;
	this.endY = hostB.y;
	this.dx = (this.endX - this.x)/maxTicks;
	this.dy = (this.endY - this.y)/maxTicks;

	this.update = function() {
		this.x += this.dx;
		this.y += this.dy;

		this.ticks++;
		if (this.ticks >= this.maxTicks) {

		}
	};
}

function update () {
	draw();

	for (var c in connections) {
		for (var s in c.signals) {
			s.update();
		}
	}
}

function draw () {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	drawConnections();
}

function drawConnections () {
	for (var c in connections) {
		cts.fillStyle = COLOR_CONNECTION;
		ctx.fillRect(c.hostA.x, c.hostA.y, 4, c.hostB.y - c.hostA.y);
		for (var s in c.signals) {
			cts.fillStyle = COLOR_CONNECTION;
			ctx.fillRect(c.hostA.x, c.hostA.y, 8, 8);
		}
	}
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
};

onkeyup = function(event) {
	event = event || window.event;

	var keyCode = event.keyCode;
	keyMap[keyCode] = event.type == 'keyup';
};

onmousedown = function(event) {
	event = event || window.event;switch (event.which) {
		case 1:
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
		break;

		case 2:
        // alert('Middle Mouse button pressed.');
        break;

        case 3:
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