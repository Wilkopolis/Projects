function getDirection (dungeon, openSet, endSet, x, y) {

	var min = Math.max(y - 4, 0);
	var max = Math.min(y + 4, 6);
	var iMin = min;
	var iMax = max;

	// on my x
	for (var i = max; i >= y; i--) {
		if (dungeon[x][i]) {
			for (var j = dungeon[x][i].paths.length - 1; j >= 0; j--) {
				var path = dungeon[x][i].paths[j];
				var num = parseInt(path);
				if (i + num < iMax)
					iMax = i + num;
			}
		}
	}
	for (var i = min; i <= y; i++) {
		if (dungeon[x][i]) {
			for (var j = dungeon[x][i].paths.length - 1; j >= 0; j--) {
				var path = dungeon[x][i].paths[j];
				var num = parseInt(path);
				if (i + num > iMin)
					iMin = i + num;
			}
		}
	}

	var validPaths = [];
	for (var i = iMax; i >= iMin; i--) { 
		validPaths[i] = (i == 6 || (!dungeon[x + 3][i + 1] && !contains(openSet, x + 3, i + 1) && !contains(endSet, x + 3, i + 1))) &&
					    (i == 0 || (!dungeon[x + 3][i - 1] && !contains(openSet, x + 3, i - 1) && !contains(endSet, x + 3, i - 1)));
	}

	var options = []

	if (validPaths[y - 2]) {
		options.push({choice: PATH_UP2, frequency: PATH_UP2_FREQUENCY});
	}
	if (validPaths[y - 2] && validPaths[y]) {
		options.push({choice: PATH_UP2_STRAIGHT, frequency: PATH_UP2_STRAIGHT_FREQUENCY});
	}
	if (validPaths[y - 2] && validPaths[y + 1]) {
		options.push({choice: PATH_UP2_DOWN, frequency: PATH_UP2_DOWN_FREQUENCY});
	}
	if (validPaths[y - 2] && validPaths[y + 2]) {
		options.push({choice: PATH_UP2_DOWN2, frequency: PATH_UP2_DOWN2_FREQUENCY});
	}
	if (validPaths[y - 2] && validPaths[y] && validPaths[y + 2]) {
		options.push({choice: PATH_UP2_STRAIGHT_DOWN2, frequency: PATH_UP2_STRAIGHT_DOWN2_FREQUENCY});
	}
	if (validPaths[y - 1]) {
		options.push({choice: PATH_UP, frequency: PATH_UP_FREQUENCY});
	}
	if (validPaths[y - 1] && validPaths[y + 1]) {
		options.push({choice: PATH_UP_DOWN, frequency: PATH_UP_DOWN_FREQUENCY});
	}
	if (validPaths[y - 1] && validPaths[y + 2]) {
		options.push({choice: PATH_UP_DOWN2, frequency: PATH_UP_DOWN2_FREQUENCY});
	}
	if (validPaths[y]) {
		options.push({choice: PATH_STRAIGHT, frequency: PATH_STRAIGHT_FREQUENCY});
	}
	if (validPaths[y] && validPaths[y + 2]) {
		options.push({choice: PATH_STRAIGHT_DOWN2, frequency: PATH_STRAIGHT_DOWN2_FREQUENCY});
	}
	if (validPaths[y + 1]) {
		options.push({choice: PATH_DOWN, frequency: PATH_DOWN_FREQUENCY});
	}
	if (validPaths[y + 2]) {
		options.push({choice: PATH_DOWN2, frequency: PATH_DOWN2_FREQUENCY});
	}

	return pickWeighted(options).choice;
}

function MISSION_Derelict_Ship () {

	this.x = 0;
	this.y = 3;

	this.dungeon = createArray(100,7);

	this.name = "Derelict Ship"
	this.over = false;

	// for when you want to look at every event without
	// dungeon crawling. heh.
	this.eventNodes = [];
	this.inEvent = true;

	this.goldModifier = 1.0;

	var node = null;
	// this.dungeon[0][3] = new EVENT_entrance();
	this.dungeon[0][3] = genEntranceNode();
	this.dungeon[0][3].paths.push(0);
	var openSet = [{x:3, y:3, previous: {x: 0, y: 3}}];
	var endSet = [];

	while (node = openSet.pop()) {
		if (this.dungeon[node.x][node.y]) {
			this.dungeon[node.x][node.y].previous.push({x: node.previous.x, y:node.previous.y});
		} else {
			var event = new event_node(node.x, node.y);
			event.previous.push({x: node.previous.x, y:node.previous.y});
			this.dungeon[node.x][node.y] = event;
			this.eventNodes.push(event);

			switch(getDirection(this.dungeon, openSet, endSet, node.x, node.y)) {
				case PATH_UP2:
					this.dungeon[node.x][node.y].paths.push(-2);
					if (node.x < DUNGEON_LENGTH) {
						openSet.push({x: node.x + 3, y: node.y - 2, previous: node});
					} else {
						endSet.push({x: node.x + 3, y: node.y - 2, previous: node});
					}
				break;

				case PATH_UP2_STRAIGHT:
					this.dungeon[node.x][node.y].paths.push(-2);
					if (node.x < DUNGEON_LENGTH) {
						openSet.push({x: node.x + 3, y: node.y - 2, previous: node});
					} else {
						endSet.push({x: node.x + 3, y: node.y - 2, previous: node});
					}
					this.dungeon[node.x][node.y].paths.push(0);
					if (node.x < DUNGEON_LENGTH) {
						openSet.push({x: node.x + 3, y: node.y, previous: node});
					} else {
						endSet.push({x: node.x + 3, y: node.y, previous: node});
					}	
				break;

				case PATH_UP2_STRAIGHT_DOWN2:
					this.dungeon[node.x][node.y].paths.push(-2);
					if (node.x < DUNGEON_LENGTH) {
						openSet.push({x: node.x + 3, y: node.y - 2, previous: node});
					} else {
						endSet.push({x: node.x + 3, y: node.y - 2, previous: node});
					}
					this.dungeon[node.x][node.y].paths.push(0);
					if (node.x < DUNGEON_LENGTH) {
						openSet.push({x: node.x + 3, y: node.y, previous: node});
					} else {
						endSet.push({x: node.x + 3, y: node.y, previous: node});
					}	
					this.dungeon[node.x][node.y].paths.push(2);
					if (node.x < DUNGEON_LENGTH) {
						openSet.push({x: node.x + 3, y: node.y + 2, previous: node});
					} else {
						endSet.push({x: node.x + 3, y: node.y + 2, previous: node});
					}
				break;

				case PATH_UP2_DOWN:
					this.dungeon[node.x][node.y].paths.push(-2);
					if (node.x < DUNGEON_LENGTH) {
						openSet.push({x: node.x + 3, y: node.y - 2, previous: node});
					} else {
						endSet.push({x: node.x + 3, y: node.y - 2, previous: node});
					}
					this.dungeon[node.x][node.y].paths.push(1);
					if (node.x < DUNGEON_LENGTH) {
						openSet.push({x: node.x + 3, y: node.y + 1, previous: node});
					} else {
						endSet.push({x: node.x + 3, y: node.y + 1, previous: node});
					}
				break;

				case PATH_UP2_DOWN2:
					this.dungeon[node.x][node.y].paths.push(-2);
					if (node.x < DUNGEON_LENGTH) {
						openSet.push({x: node.x + 3, y: node.y - 2, previous: node});
					} else {
						endSet.push({x: node.x + 3, y: node.y - 2, previous: node});
					}
					this.dungeon[node.x][node.y].paths.push(2);
					if (node.x < DUNGEON_LENGTH) {
						openSet.push({x: node.x + 3, y: node.y + 2, previous: node});
					} else {
						endSet.push({x: node.x + 3, y: node.y + 2, previous: node});
					}
				break;

				case PATH_UP:
					this.dungeon[node.x][node.y].paths.push(-1);
					if (node.x < DUNGEON_LENGTH) {
						openSet.push({x: node.x + 3, y: node.y - 1, previous: node});
					} else {
						endSet.push({x: node.x + 3, y: node.y - 1, previous: node});
					}
				break;

				case PATH_UP_DOWN:
					this.dungeon[node.x][node.y].paths.push(-1);
					if (node.x < DUNGEON_LENGTH) {
						openSet.push({x: node.x + 3, y: node.y - 1, previous: node});
					} else {
						endSet.push({x: node.x + 3, y: node.y - 1, previous: node});
					}
					this.dungeon[node.x][node.y].paths.push(1);
					if (node.x < DUNGEON_LENGTH) {
						openSet.push({x: node.x + 3, y: node.y + 1, previous: node});
					} else {
						endSet.push({x: node.x + 3, y: node.y + 1, previous: node});
					}
				break;

				case PATH_UP_DOWN2:
					this.dungeon[node.x][node.y].paths.push(2);
					if (node.x < DUNGEON_LENGTH) {
						openSet.push({x: node.x + 3, y: node.y + 2, previous: node});
					} else {
						endSet.push({x: node.x + 3, y: node.y + 2, previous: node});
					}
					this.dungeon[node.x][node.y].paths.push(-1);
					if (node.x < DUNGEON_LENGTH) {
						openSet.push({x: node.x + 3, y: node.y - 1, previous: node});
					} else {
						endSet.push({x: node.x + 3, y: node.y - 1, previous: node});
					}
				break;

				case PATH_STRAIGHT:
					this.dungeon[node.x][node.y].paths.push(0);
					if (node.x < DUNGEON_LENGTH) {
						openSet.push({x: node.x + 3, y: node.y, previous: node});
					} else {
						endSet.push({x: node.x + 3, y: node.y, previous: node});
					}			
				break;

				case PATH_STRAIGHT_DOWN2:
					this.dungeon[node.x][node.y].paths.push(0);
					if (node.x < DUNGEON_LENGTH) {
						openSet.push({x: node.x + 3, y: node.y, previous: node});
					} else {
						endSet.push({x: node.x + 3, y: node.y, previous: node});
					}		
					this.dungeon[node.x][node.y].paths.push(2);
					if (node.x < DUNGEON_LENGTH) {
						openSet.push({x: node.x + 3, y: node.y + 2, previous: node});
					} else {
						endSet.push({x: node.x + 3, y: node.y + 2, previous: node});
					}	
				break;

				case PATH_DOWN:
					this.dungeon[node.x][node.y].paths.push(1);
					if (node.x < DUNGEON_LENGTH) {
						openSet.push({x: node.x + 3, y: node.y + 1, previous: node});
					} else {
						endSet.push({x: node.x + 3, y: node.y + 1, previous: node});
					}
				break;

				case PATH_DOWN2:
					this.dungeon[node.x][node.y].paths.push(2);
					if (node.x < DUNGEON_LENGTH) {
						openSet.push({x: node.x + 3, y: node.y + 2, previous: node});
					} else {
						endSet.push({x: node.x + 3, y: node.y + 2, previous: node});
					}
				break;
			}
		}
	}

	//close it off
	node = null;
	while(node = endSet.pop()) { 
		this.dungeon[node.x][node.y] = new event_node(node.x, node.y)
		this.eventNodes.push(this.dungeon[node.x][node.y]);
		this.dungeon[node.x][node.y].previous.push({x: node.previous.x, y:node.previous.y});
		switch(node.y) {
			case 0:	
			this.dungeon[node.x + 3][node.y + 3] = genEndEventNode();	
			this.dungeon[node.x + 3][node.y + 3].previous.push({x: node.previous.x, y:node.previous.y});	
			this.dungeon[node.x][node.y].paths.push(3);	
			break;

			case 1:
			this.dungeon[node.x + 3][node.y + 2] = genEndEventNode();
			this.dungeon[node.x + 3][node.y + 2].previous.push({x: node.previous.x, y:node.previous.y});
			this.dungeon[node.x][node.y].paths.push(2);
			break;

			case 2:
			this.dungeon[node.x + 3][node.y + 1] = genEndEventNode();
			this.dungeon[node.x + 3][node.y + 1].previous.push({x: node.previous.x, y:node.previous.y});
			this.dungeon[node.x][node.y].paths.push(1);
			break;

			case 3:
			this.dungeon[node.x + 3][node.y] = genEndEventNode();
			this.dungeon[node.x + 3][node.y].previous.push({x: node.previous.x, y:node.previous.y});
			this.dungeon[node.x][node.y].paths.push(0);
			break;

			case 4:
			this.dungeon[node.x + 3][node.y - 1] = genEndEventNode();
			this.dungeon[node.x + 3][node.y - 1].previous.push({x: node.previous.x, y:node.previous.y});
			this.dungeon[node.x][node.y].paths.push(-1);
			break;

			case 5:
			this.dungeon[node.x + 3][node.y - 2] = genEndEventNode();
			this.dungeon[node.x + 3][node.y - 2].previous.push({x: node.previous.x, y:node.previous.y});
			this.dungeon[node.x][node.y].paths.push(-2);
			break;

			case 6:
			this.dungeon[node.x + 3][node.y - 3] = genEndEventNode();
			this.dungeon[node.x + 3][node.y - 3].previous.push({x: node.previous.x, y:node.previous.y});
			this.dungeon[node.x][node.y].paths.push(-3);
			break;
		}
		// this.eventNodes.push(this.dungeon[node.x + 3][3]);
	}

	this.getEventNode = function() {
		return this.dungeon[this.x][this.y];
	};

	this.getEvent = function() {
		return this.dungeon[this.x][this.y].event;
	};

	this.sendChoice = function(index) {
		if (this.inEvent) {
			// proceed is if the event ended and we are to progress
			var proceed = this.getEvent().chooseOption(index);
			if (proceed) {
				if (this.over) {
					//dungeon is over
					beatMission();
				} else {
					if (upgrades[UPGRADE_FIELD_TRAINING2])
						player.addHp(10);
					if (upgrades[UPGRADE_FIELD_TRAINING1])
						player.addHp(5);

					askForPath();
					this.inEvent = false;
				}
			} 
		} else {
			if (this.getEventNode().paths.indexOf(index) >= 0) {
				travel(index)
				this.inEvent = true;
			}
		}
	};

	this.populateEvents = function() {
		for (var i = this.eventNodes.length - 1; i >= 0; i--) {
			var e = this.eventNodes[i];
			e.event = generateEvent(e.x);
			if (e.event.eventType == EVENT_vendor)
				e.eventType = EVENT_GOOD;
			e.reset();
		}
	};

	this.reset = function() {
		startX = 120;
		startY = 30;
		this.x = 0;
		this.y = 3;
		for (var i = this.eventNodes.length - 1; i >= 0; i--) {
			this.eventNodes[i].reset();
		}
	};
}

function generateMission () {
	return new MISSION_Derelict_Ship();
}