function pinMission (div) {
	jQuery(div).toggleClass('selected');
}

function clickDeploy (div) {
	// if (mission == null) 
	// 	mission = missions[div.getAttribute('i')];
	mission = generateMission();
	redraw();
	
	document.getElementById("lootDiv").innerHTML = "";

	loot[MODULE_HP_SMALL] = 0;
	loot[MODULE_HP_MED] = 0;
	loot[MODULE_HP_LRG] = 0;
	loot[MODULE_STR_SMALL] = 0;
	loot[LOOT_GOLD] = 0;

	switchToMissionScreen();
}

function clickBegin () {
	$('#promptDiv').animate({
		'left':'200%'
	}, 500, 'easeInOutCubic');

	switchToEventCinematic();
	// redraw();
}

function clickChoiceButton (index) {
	mission.sendChoice(index);
	redraw();
}

function clickMissionsTab (div) {
	$('#missions').addClass('active');
	$('#agents').removeClass('active');
	$('#upgrades').removeClass('active');
	switchToMissions();
}

function clickAgentsTab (div) {
	$('#agents').addClass('active');
	$('#missions').removeClass('active');
	$('#upgrades').removeClass('active');
	switchToAgents();
}

function clickUpgradesTab (div) {
	$('#upgrades').addClass('active');
	$('#missions').removeClass('active');
	$('#agents').removeClass('active');
	switchToUpgrades();
}

function die () {
	agent("Tell my wife, I-...");

	$('#promptText').text('Uhhh, whos next?');
	$('#beginButton').html('continue');

	var choiceButtons = getElementsWithAttribute('index');
	for (var i = 6; i >= 0; i--) {
		var button = choiceButtons[i];
		button.onclick = function() {};
		button.className = 'choiceButton offline';
		if (button.childNodes[1].innerHTML != 'offline')
			scrambleTo(button.childNodes[1], 'offline', 100, 6, 20);		
	}

	generationCount++;
	$("#generation").html("Generation: " + generationCount);

	document.getElementById("beginButton").onclick = switchToMainMenu;

	$('#promptDiv').animate({
			'left':'2%'
	}, 1500, 'easeOutExpo');

	$("#canvas").fadeOut(2500);
}

function beatMission () {
	$('#promptText').text('Thanks for playing!');

	$('#beginButton').hide();

	// document.getElementById('beginButton').onclick = switchToMainMenu;
	Cookies.set("beaten", true);

	$('#promptDiv').animate({
		'left':'2%'
	}, 1500, 'easeOutExpo');

	$("#canvas").fadeOut(2500);
}

function switchToMainMenu () {

	agents[agentIndex] = new Agent(player);
	updateAgentDivs();

	var choiceButtons = getElementsWithAttribute('index');

	for (var i = 6; i >= 0; i--) {
		var button = choiceButtons[i];
		button.onclick = function() {};
		button.className = 'choiceButton offline';
		if (button.childNodes[1].innerHTML != 'offline')
			scrambleTo(button.childNodes[1], 'offline', 100, 6, 20);		
	}

	$('#promptDiv').animate({
		'left':'200%'
	}, 500, 'easeInOutCubic');

	window.setTimeout(function(){
		$('#topBlinder').animate({
			'top':'-20%'
		}, 750, 'easeInOutCubic');
		$('#bottomBlinder').animate({
			'bottom':'-20%'
		}, 750, 'easeInOutCubic');
		$('#leftBlinder').animate({
			'left':'-20%'
		}, 750, 'easeInOutCubic');
		$('#rightBlinder').animate({
			'right':'-20%'
		}, 750, 'easeInOutCubic');
	}, 500);

	window.setTimeout(function(){
		$('#menuTopBar').animate({
			'left':'0%'
		}, 600, 'easeInOutQuint');
		$('#gameTopBar').animate({
			'left':'100%'
		}, 600, 'easeInOutCubic');
		$('#instanceTab').hide();
		$('#missionDiv1').removeClass('selected');
		$('#missionDiv1')[0].onclick = function(arg) {
			return function() {					
				pinMission(arg);
			};
		}($('#missionDiv1')[0]);
		$('.missionDiv').removeAttr('style');
		$('.missionHide').removeAttr('style');
		$('.mission').removeAttr('style');
		$('.deployButton').removeAttr('style');
		$('.deployedButton').removeAttr('style');
		$('#deploy1').removeClass('deployedButton').addClass('deployButton');
		$('#mission').css({
			'color':'#FCEBB6'
		});
	}, 800);

	window.setTimeout(function(){
		$('#generation').css({
			'color':'#FCEBB6'
		});
	}, 900);

	window.setTimeout(function(){
		$('#gold').css({
			'color':'#FCEBB6'
		});
		$('#deployText').animate({
			'left':'0%'
		}, 500, 'easeInOutCubic');
	}, 1000);

	window.setTimeout(function(){
		$('#gold').css({
			'color':'#FCEBB6'
		});
		$('#menuSideBar').animate({
			'top':'0%'
		}, 1000, 'easeOutBounce');
		$('#gameSideBar').animate({
			'top':'200%'
		}, 1000, 'easeOutBounce');
	}, 1000);

	window.setTimeout(function(){
		$('#deploy1').css({
			'cursor':'pointer',
		});		
		$('#promptText').text('Yo dog, do the mission.');
		$('#beginButton').html('Begin');
		$('#beginButton')[0].onclick = clickBegin;
		$('#deploy1')[0].onclick = function() {clickDeploy($('#deploy1')[0]);};
		mission.reset();
		redraw();
		player = agents[agentIndex];
	}, 1100);
}

function switchToEventCinematic () {
	redraw();

	var choiceButtons = getElementsWithAttribute('index');

	for (var i = mission.getEvent().options.length - 1; i >= 0; i--) {
		var button = choiceButtons[i];
		button.onclick = function(arg) {
			return function() {					
				clickChoiceButton(arg);
			};
		}(i);
		button.className = 'choiceButton';
		scrambleTo(button.childNodes[1], mission.getEvent().options[i], 500, 6, 100);		
	}

	for (var i = 6; i > mission.getEvent().options.length - 1; i--) {
		var button = choiceButtons[i];
		button.onclick = function() {};
		button.className = 'choiceButton offline';
		if (button.childNodes[1].innerHTML != 'offline')
			scrambleTo(button.childNodes[1], 'offline', 500, 6, 200);		
	}

	mission.getEventNode().reveal();
	mission.getEvent().playStartText();
}

function switchToEvent () {
	redraw();

	var choiceButtons = getElementsWithAttribute('index');

	var ev = mission.getEvent();

	for (var i = 0; i < 7; i++) {			
		var button = choiceButtons[i];
		if (i >= ev.options.length || ev.options[i] == "" ) {
			button.onclick = function() {};
			button.className = 'choiceButton offline';
			if (button.childNodes[1].innerHTML != 'offline')
				scrambleTo(button.childNodes[1], 'offline', 0, 6, 20);	
		} else {
			button.onclick = function(arg) {
				return function() {					
					clickChoiceButton(arg);
				};
			}(i);
			button.className = 'choiceButton';
			scrambleTo(button.childNodes[1], ev.options[i], 0, 6, 20);	
		}	
	}

	mission.getEvent().playStartText();
}

function switchToMissionScreen () {
	
	$(function() {
		$('#deploy1')[0].onclick = function() {};
		$('#console').html("<p><br><br><br><br><br><br><br><br></p>");
		$('#deploy1').removeClass('deployButton').addClass('deployedButton');
		$('#missionDiv1').attr('onclick','').unbind('click');
		$('#deploy1').css({
			'top':'85%'
		});
		$('.mission').css({
			'top':'0%',
			'bottom':'0%',
			'left':'0%',
			'right':'0%'
		});
		$('.missionHide').css({
			'top':'0%',
			'bottom':'0%',
			'left':'0%',
			'right':'0%',
			'height':'100%'
		});
		$('.missionDiv').css({
			'top':'0%',
			'bottom':'0%',
			'left':'0%',
			'right':'0%',
			'height':'100%'
		});
		$('#menuTopBar').animate({
			'left':'-100%'
		}, 500, 'easeInOutQuint');		
	});

	window.setTimeout(function(){
		$('#gameTopBar').animate({
			'left':'0%'
		}, 1000, 'easeOutBounce');
	}, 300);

	window.setTimeout(function(){
		$('#mission').css({
			'color':'#EDF1FF'
		});
	}, 400);

	window.setTimeout(function(){
		$('#generation').css({
			'color':'#EDF1FF'
		});
	}, 500);

	window.setTimeout(function(){		
		$('#deploy1').animate({
			'top':'0%',
			'bottom':'0%',
			'left':'0%',
			'width':'100%',
		}, 250, 'easeInOutQuart')
		$('#deploy1').css({
			'cursor':'default',
			'border': '0'
		});
		$('#menuSideBar').animate({
			'top':'-101%'
		}, 500, 'easeOutBounce');
		$('#gold').css({
			'color':'#EDF1FF'
		});
	}, 600);

	window.setTimeout(function(){
		$('#gameSideBar').animate({
			'top':'0'
		}, 1000, 'easeOutBounce');
	}, 900);

	window.setTimeout(function(){
		$('#topBlinder').animate({
			'top':'0%'
		}, 750, 'easeOutBounce');
	}, 1000);	
	window.setTimeout(function(){
		$('#bottomBlinder').animate({
			'bottom':'4.5%'
		}, 750, 'easeOutBounce');
	}, 1600);
	window.setTimeout(function(){
		$('#leftBlinder').animate({
			'left':'0%'
		}, 750, 'easeOutBounce');
	}, 2000);
	window.setTimeout(function(){
		$('#rightBlinder').animate({
			'right':'0%'
		}, 750, 'easeOutBounce');
	}, 2050);

	window.setTimeout(function(){	
		$('#deployText').animate({
			'left':'-1000%'
		}, 500, 'easeInOutCubic');
		$('#deploy1').css({
			'cursor':'default'
		});
	}, 2500);

	window.setTimeout(function(){
		$("#instanceTab").show();
		$('#promptDiv').animate({
			'left':'2%'
		}, 1500, 'easeOutExpo');
	}, 3000);
	
	window.setTimeout(function() {
		$("#canvas").fadeIn(2500);
		$("#sideCanvas").fadeIn(2500);
	}, 3000);
}

function switchToBossDialog () {
	$('#promptPortrait').hide();

	$('#beginButton')[0].onclick = enterBossMiniGame;

	$('#promptText').hide();
	// $('#promptText').html("There is no negotiating with beasts.");
	$('#promptText').html("Welcome to die.");
	window.setTimeout(function() {
		$('#promptText').fadeIn(1000);	
	}, 1500);

	$('#promptDiv').animate({
		'left':'2%'
	}, 1500, 'easeOutExpo');
}

function enterBossMiniGame () {
	$('#beginButton')[0].onclick = null;

	var choiceButtons = getElementsWithAttribute('index');
	window.setTimeout(function() {
		var button = choiceButtons[0];
		button.onclick = null;
		button.className = 'choiceButton';
		scrambleTo(button.childNodes[1], 'offline', 16000, 6, 20);	
	}, 200);
	window.setTimeout(function() {
		var button = choiceButtons[1];
		button.onclick = null;
		button.className = 'choiceButton';
		scrambleTo(button.childNodes[1], 'offline', 16000, 6, 20);	
	}, 300);
	window.setTimeout(function() {
		var button = choiceButtons[2];
		button.onclick = null;
		button.className = 'choiceButton';
		scrambleTo(button.childNodes[1], 'offline', 16000, 6, 20);	
	}, 400);
	window.setTimeout(function() {
		var button = choiceButtons[3];
		button.onclick = null;
		button.className = 'choiceButton';
		scrambleTo(button.childNodes[1], 'offline', 16000, 6, 20);	
	}, 500);
	window.setTimeout(function() {
		var button = choiceButtons[4];
		button.onclick = null;
		button.className = 'choiceButton';
		scrambleTo(button.childNodes[1], 'offline', 16000, 6, 20);	
	}, 600);
	window.setTimeout(function() {
		var button = choiceButtons[5];
		button.onclick = null;
		button.className = 'choiceButton';
		scrambleTo(button.childNodes[1], 'offline', 16000, 6, 20);	
	}, 700);
	window.setTimeout(function() {
		var button = choiceButtons[6];
		button.onclick = null;
		button.className = 'choiceButton';
		scrambleTo(button.childNodes[1], 'offline', 16000, 6, 20);	
	}, 800);

	window.setTimeout(function() {
		$('#promptDiv').animate({
			'left':'200%'
		}, 1000, 'easeInOutCubic');
		scrambleTo(document.getElementById("gold"), 'OFFLINE', 16000, 6, 20);
	}, 900);

	window.setTimeout(function() {
		scrambleTo(document.getElementById("generation"), 'OFFLINE', 16000, 6, 20);
	}, 1000);

	window.setTimeout(function() {
		cinmating = true;
		startStartX = startX;
		bossFightCinematic();
	}, 1500);

	window.setTimeout(function() {
		fadingStuff = true;
		endTimes = true;
		redraw();
		$('#loot').fadeOut(833);
	}, 3500);

	window.setTimeout(function() {
		bossHealing = true;
	}, 5000);

	window.setTimeout(function() {
		allOtherOpacity = 0;
	}, 9500);

	window.setTimeout(function() {
		$('#generation').hide();
	}, 10200);

	window.setTimeout(function() {
		$('#gold').hide();
	}, 10800);

	window.setTimeout(function() {
		$('#console').html("<p><br><br><br><br><br><br><br><br></p>");
	}, 11400);

	window.setTimeout(function() {
		$('#choiceOne').hide();
	}, 12000);
	window.setTimeout(function() {
		$('#choiceTwo').hide();
	}, 12300);
	window.setTimeout(function() {
		$('#choiceThree').hide();
	}, 12600);
	window.setTimeout(function() {
		$('#choiceFour').hide();
	}, 12900);
	window.setTimeout(function() {
		$('#choiceFive').hide();
	}, 13200);
	window.setTimeout(function() {
		$('#choiceSix').hide();
	}, 13500);
	window.setTimeout(function() {
		$('#choiceSeven').hide();
	}, 14600);

	window.setTimeout(function() {
		cinmating = false;
	}, 15000);

	window.setTimeout(function() {
		observation("Let's get it on.")
	}, 16000);


	window.setTimeout(function() {
		$('#closingDiv').show();
		$('#closingCanvas').show();
		$('#closingDiv').animate({
			'top':'0',
			'left':'0',
			'width':'100%',
			'height':'100%'
			}, 500, 'easeInOutCubic');
	}, 17400);

	window.setTimeout(function() {
		window.setInterval(update, 1000/60);
		window.setInterval(draw, 1000/60);
	}, 18000);
}

var shakeOffset = 0;
var shakerCount = 0;
var startStartX;
var cinmating = false;
var fadingStuff = false;
var bossHealing = false;
var stuffOpacity = 1;
var allOtherOpacity = 1;
var forceDraw = false;
function bossFightCinematic () {
	shakeOffset = 7 * Math.sin(shakerCount);
	shakerCount += .8;	

	if (fadingStuff)
		stuffOpacity = Math.max(stuffOpacity - .02, 0);

	if (bossHealing)
		mission.getEvent().enemy.hp = Math.round(Math.min(mission.getEvent().enemy.hp + 1.5, mission.getEvent().enemy.maxhp));

	startX = startStartX + shakeOffset;

	redraw();

	if (cinmating)
		window.setTimeout(bossFightCinematic, 1000/60);
}

function switchToUpgrades() {
	$("#upgradesTab").fadeIn(250);
	$("#missionsTab").fadeOut(250);
	$("#agentsTab").fadeOut(250);
}

function switchToMissions() {
	$("#missionsTab").fadeIn(250);
	$("#agentsTab").fadeOut(250);
	$("#upgradesTab").fadeOut(250);
}

function switchToAgents() {
	$("#agentsTab").fadeIn(250);
	$("#missionsTab").fadeOut(250);
	$("#upgradesTab").fadeOut(250);
}

function askForPath () {
	mission.inEvent = false;

	var choiceButtons = getElementsWithAttribute('index');
	for (var i = 0; i < 7; i++) {		
		var button = choiceButtons[i];
		if (mission.getEventNode().paths.indexOf(i - 3) < 0) {
			button.onclick = function() {};
			button.className = 'choiceButton offline';
			if (button.childNodes[1].innerHTML != 'offline')
				scrambleTo(button.childNodes[1], 'offline', 0, 6, 20);
		} else {
			button.onclick = function(arg) {
				return function() {					
					clickChoiceButton(arg);
				};
			}(i - 3);
			button.className = 'choiceButton';
			scrambleTo(button.childNodes[1], 'continue', 0, 6, 20);				
		}
	}
}