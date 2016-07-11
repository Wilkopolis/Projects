
var TILES_URL = "tiles.png";

var DISPLAY_TILE_WIDTH  = 20;
var DISPLAY_TILE_HEIGHT = 18;

window.onload = function () {
	canvas = document.getElementById("canvas");
	canvas.width = 640;
	canvas.height = 576;

	ctx = canvas.getContext("2d");

	tiles = new Image();
	tiles.src = TILES_URL;

	window.setInterval(update, 1/60);
	window.setInterval(draw, 1/60);
};

function update () {

}

function draw () {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawDungeon();
}

function drawDungeon () {
	for (var i = 0; i < DISPLAY_TILE_WIDTH; i++) {
		for (var j = 0; j < DISPLAY_TILE_HEIGHT; j++) {
			// var tile = dungeon[i][j];
			// ctx.drawImage(tiles, tile.sx * 32, tile.sy * 32, 32, 32, i * 32, j * 32);
			ctx.drawImage(tiles, 0, 32, 32, 32, i * 32, j * 32, 32, 32);
		}
	}
}