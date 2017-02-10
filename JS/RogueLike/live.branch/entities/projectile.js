function doProjectileTurns() {
	for (var i = dungeon.projectiles.length - 1; i >= 0; i--) {
		var projectile = dungeon.projectiles[i];
		
		// get the next move
		var offset = getNextMove(projectile);

		var oldTile = dungeon.tiles[projectile.y][projectile.x];

		// happens with seeking sparks
		if (offset.x == 0 && offset.y == 0) {			
			dungeon.projectiles.remove(projectile);
			oldTile.projectile = null;

			if (dungeon.projectiles.length == 0) {
				flipping = false;
				flip = false;
			}
		}

		var newTile = dungeon.tiles[projectile.y + offset.y][projectile.x + offset.x];

		// move it there
		oldTile.projectile = null;

		projectile.x += offset.x;
		projectile.y += offset.y;

		newTile.projectile = projectile;

		// if an enemy is on our new tile
		if (newTile.hasEnemy()) {
			var enemy = newTile.getEnemy();
			// do our strength to them
			dealDamage(player, projectile.damage, enemy);
			// consume the projectile if it hits an entity
			projectile.ticksRemaining = 1;
		}

		// if it has a lifespan, decrease it a tick
		projectile.ticksRemaining--;

		// if it has a lifespan and 0 ticks left, remove it
		if (projectile.ticksRemaining == 0) {
			dungeon.projectiles.remove(projectile);
			newTile.projectile = null;

			if (dungeon.projectiles.length == 0) {
				flipping = false;
				flip = false;
			}
		}
	}
}

var PROJECTILE_SPARK = 'spark';
function projectile_spark(x, y, dx, dy, destination, damage, lifespan) {
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.damage = damage;
	this.ticksRemaining = lifespan;
	this.destination = destination;

	this.char = CHAR_SPARK;
	this.font = FONT_STYLE_DEFAULT;
	this.color = COLOR_SPARK;
}

function getNextMove(projectile) {

	if (projectile.destination == DESTINATION_NONE) {
		// 1 1 3
		// 1   2
		// 3 2 2

		// 1 1 1
		// 2   2
		// 3 3 3

		// move a direction
		var firstPriorities = [];
		var secondPriorities = [];
		var thirdPriorities = [];
		// don't turn faster than 45 degrees unless you have to
		if (projectile.dx == 1) {
			firstPriorities.push({x:1, y:0});
			if (projectile.dy == 0) {
				firstPriorities.push({x:1,y:1});
				firstPriorities.push({x:1,y:-1});
				secondPriorities.push({x:0, y:1});
				secondPriorities.push({x:0, y:-1});
				thirdPriorities.push({x:-1,y:1});
				thirdPriorities.push({x:-1, y:0});
				thirdPriorities.push({x:-1,y:-1});
			} else {
				firstPriorities.push({x:1,y:projectile.dy});
				firstPriorities.push({x:0,y:projectile.dy});
				secondPriorities.push({x:1,y:-projectile.dy});
				secondPriorities.push({x:1, y:0});
				secondPriorities.push({x:0,y:-projectile.dy});
				thirdPriorities.push({x:1, y:-projectile.dy});
				thirdPriorities.push({x:-1, y:projectile.dy});
			}
		} else if (projectile.dx == -1) {
			firstPriorities.push({x:-1, y:0});
			if (projectile.dy == 0) {
				firstPriorities.push({x:-1,y:1});
				firstPriorities.push({x:-1,y:-1});
				secondPriorities.push({x:0, y:1});
				secondPriorities.push({x:0, y:-1});
				thirdPriorities.push({x:1,y:1});
				thirdPriorities.push({x:1, y:0});
				thirdPriorities.push({x:1,y:-1});
			} else {
				firstPriorities.push({x:-1,y:projectile.dy});
				firstPriorities.push({x:0,y:projectile.dy});
				secondPriorities.push({x:1,y:-projectile.dy});
				secondPriorities.push({x:1, y:0});
				secondPriorities.push({x:0,y:-projectile.dy});
				thirdPriorities.push({x:1, y:-projectile.dy});
				thirdPriorities.push({x:-1, y:projectile.dy});
			}
		} else {
			firstPriorities.push({x:-1,y:projectile.dy});
			firstPriorities.push({x:0,y:projectile.dy});
			firstPriorities.push({x:1,y:projectile.dy});
			secondPriorities.push({x:0, y:1});
			secondPriorities.push({x:0, y:-1});
			thirdPriorities.push({x:-1,y:-projectile.dy});
			thirdPriorities.push({x:0,y:-projectile.dy});
			thirdPriorities.push({x:1,y:-projectile.dy});
		}

		// pick a random valid tile
		while (true) {

			var first = firstPriorities.popRandom();
			if (typeof first === "undefined" || dungeon.tiles[projectile.y + first.y][projectile.x + first.x].getPermanentSolid())
			{
				var second = secondPriorities.popRandom();
				if (typeof second === "undefined" || dungeon.tiles[projectile.y + second.y][projectile.x + second.x].getPermanentSolid()) 
				{
					var third = thirdPriorities.popRandom();
					if (!dungeon.tiles[projectile.y + third.y][projectile.x + third.x].getPermanentSolid())
						return third;
				}
				else
					return second;
			}
			else
				return first;
		}
	} else {
		// route to destination
		return getNextMoveAStar(projectile, projectile.destination);
	}	
}