// Presentation stuff
var slideNumber = 0;
var maxSlides = 5;

window.onload = function() {
    // $('html,body').animate({
    //     scrollLeft: $('#test').css('left')
    // }, 800);
}

window.onkeyup = function(e) { 
	// -->
	if (e.keyCode == 39) {
		slideNumber = Math.min(slideNumber + 1, maxSlides);
	}
	// <--
	else if (e.keyCode == 37) {
		slideNumber = Math.max(slideNumber - 1, 0);
	}

    $('html,body').animate({
        scrollLeft: $('#span' + slideNumber).css('left')
    }, 400, 'easeInOutCubic');

	return false;
}

// Example stuff

function scrambleInnerHTML(button) {
	var newPhrase = pickRandomPhrase(button.innerHTML);
	scrambleTo(button.childNodes[1], newPhrase, 100, 6, 20, false);
}

function scrambleInnerHTMLCinematic(button) {
	var newPhrase = pickRandomPhrase(button.innerHTML);
	scrambleTo(button.childNodes[1], newPhrase, 2000, 6, 75, true);
}

function pickRandomPhrase(previous) {
	var choices = ['I\'m in.', 'Connected.', 'Continue?', 'encrypted.', '100% Complete.', '$w0rdf1$h', 'password?', 'ERROR.', 'Access Denied.', 'Access Granted.'];
	choices.remove(previous);

	return choices[Math.floor(Math.random() * choices.length)];
}

Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};

// span - the object containing text
// text - the new/destination text
// scrambleTime - time in ms spend just spinning
// interval - how long in ms before changing a character
// period - how long to cycle each character to the correct choice during the unscramble
// cleanUnscramble - pin down correct characters left to right, or randomly
function scrambleTo (span, text, scrambleTime, interval, period, cleanUnscramble) {
	span.parentNode.disabled = true;
	scrambleFor(span, text, scrambleTime, interval, period, cleanUnscramble);
}

function scrambleFor (span, text, scrambleTime, interval, period, cleanUnscramble) {
	if (scrambleTime > 0) {
		var array = span.innerHTML.split('');
		var charIndex = Math.floor(((Math.random() * 1000) * 1000) % array.length);
		var rndChar = correctRandomChar();
		array[charIndex] = rndChar;
		span.innerHTML = array.join('');
		window.setTimeout(function() {scrambleFor(span, text, scrambleTime - interval, interval, period, cleanUnscramble)}, interval);	
	} else {
		var uncompleted = Array.apply(null, Array(text.length)).map(function (_, i) {return i;}).reverse();
		if (!cleanUnscramble)
			uncompleted = shuffle(uncompleted);
		window.setTimeout(function() {resize(span, text, 0, 0, [], uncompleted, period, interval, cleanUnscramble)}, interval);	
	}
}

function resize (span, text, decypherTime, lastTime, completed, uncompleted, period, interval, cleanUnscramble) {
	var array = span.innerHTML.split('');

	if (decypherTime - lastTime >= period ) {
		decypherTime = lastTime;				
		if (array.length > text.length)
			array = array.slice(0,-1);
		else if (array.length < text.length)
			array.push(correctRandomChar());
	}

	var charIndex = Math.floor(((Math.random() * 1000) * 1000) % array.length);
	var rndChar = correctRandomChar();
	array[charIndex] = rndChar;
	span.innerHTML = array.join('');

	if (array.length == text.length)
		window.setTimeout(function() {unscramble(span, text, decypherTime + interval, lastTime, completed, uncompleted, period, interval)}, interval);
	else
		window.setTimeout(function() {resize(span, text, decypherTime + interval, lastTime, completed, uncompleted, period, interval)}, interval);
}

function unscramble (span, text, decypherTime, lastTime, completed, uncompleted, period, interval) {
	var array = span.innerHTML.split('');

	if (decypherTime - lastTime >= period ) {
		decypherTime = lastTime;				
		var next = uncompleted.pop();
		array[next] = text[next];
		completed.push(next);
	} 

	var charIndex = uncompleted.slice(-1)[0];
	var rndChar = correctRandomChar();
	array[charIndex] = rndChar;	
	span.innerHTML = array.join('');	

	if (uncompleted.length != 0)
		window.setTimeout(function() {unscramble(span, text, decypherTime + interval, lastTime, completed, uncompleted, period, interval)}, interval);		
	else	
		span.parentNode.disabled = false;	
}

function shuffle (array) {
	var currentIndex = array.length, temporaryValue, randomIndex ;

	while (0 !== currentIndex) {

		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
}

function correctRandomChar () {
	var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
	return possible.charAt(Math.floor(Math.random() * possible.length));
}

function incorrectRandomChar() {
	return String.fromCharCode(Math.floor(((Math.random() * 1000) % 73) + 49));
}