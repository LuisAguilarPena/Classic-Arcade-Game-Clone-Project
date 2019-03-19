// Enemy class, all other enemies will inherit from this class
class Enemy {
	constructor(x, y, speed) {
		this.x = x;
		this.y = y;
		this.speed = speed;
		this.sprite = 'images/original-sprites/enemy.png';
	}
	// for smooth movement, see engine.js
	update(dt) {
		this.x += this.speed * dt;
		// resets enemy position once it reaches edge of screen
		if (this.x >= 505) {
			this.x = 0;
		}
		// collision with player, this refers to an enemy
		checkCollision(this);
	}
	// in order to render
	render() {
		ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	}
}

class Player {
	constructor(x, y, speed) {
		this.x = x;
		this.y = y;
		this.speed = speed;
		this.sprite = 'images/original-sprites/player-sprite-1.png';
	}
	// game breaks without it
	update(dt) {}

	render() {
		// render to canvas context (ctx)
		ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
		displayScoreLevel(score, gameLevel);
	}

	handleInput(keyPress) {
		if (keyPress == 'left') {
			player.x -= player.speed;
			console.log('x=', this.x);
			console.log('y=', this.y);
		}
		if (keyPress == 'up') {
			player.y -= player.speed * 1.7;
			console.log('x=', this.x);
			console.log('y=', this.y);
		}
		if (keyPress == 'right') {
			player.x += player.speed;
			console.log('x=', this.x);
			console.log('y=', this.y);
		}
		if (keyPress == 'down') {
			player.y += player.speed * 1.7;
			console.log('x=', this.x);
			console.log('y=', this.y);
		}
		if (keyPress == '1') {
			player.sprite = 'images/original-sprites/player-sprite-1.png';
		}
		if (keyPress == '2') {
			player.sprite = 'images/original-sprites/player-sprite-2.png';
		}
		if (keyPress == '3') {
			player.sprite = 'images/original-sprites/player-sprite-3.png';
		}
		console.log('keyPress is: ' + keyPress);
	}
}
// to render score and level at the bottom of the html with a new div
const displayScoreLevel = (aScore, aLevel) => {
	var canvas = document.getElementsByTagName('canvas');

	var firstCanvasTag = canvas[0];

	scoreLevelDiv.innerHTML = 'Score: ' + aScore + ' / ' + 'Level: ' + aLevel;

	document.body.insertBefore(scoreLevelDiv, firstCanvasTag[0]);
};

const checkCollision = (anEnemy) => {
	if (
		player.y + 131 >= anEnemy.y + 90 &&
		player.x + 25 <= anEnemy.x + 88 &&
		player.y + 73 <= anEnemy.y + 135 &&
		player.x + 76 >= anEnemy.x + 11
	) {
		console.log('collided');
		player.x = 202.5;
		player.y = 383;
	}
	// Behaviour of app when player reaches top
	if (player.y + 63 <= 0) {
		player.x = 202.5;
		player.y = 383;
		console.log('you made it!');

		ctx.fillStyle = 'white';
		ctx.fillRect(0, 0, 505, 171);

		score += 1;
		gameLevel += 1;
		console.log('current score: ' + score + ', current level: ' + gameLevel);
		increaseDifficulty(score);
	}
	// Player can not go outside of canvas
	if (player.y > 383) {
		player.y = 383;
	}
	if (player.x > 402.5) {
		player.x = 402.5;
	}
	if (player.x < 2.5) {
		player.x = 2.5;
	}
};

const increaseDifficulty = (numEnemies) => {
	allEnemies.length = 0;

	for (let i = 0; i <= numEnemies; i++) {
		var enemy = new Enemy(0, Math.random() * 184 + 50, Math.random() * 256);

		allEnemies.push(enemy);
	}
};
// Create the new instances and objects require to start game:
var allEnemies = [];
var player = new Player(201.25, 383, 50); // in the middle
var score = 0;
var gameLevel = 1;
var scoreLevelDiv = document.createElement('div'); // create div for displaying score and level
var enemy = new Enemy(0, Math.random() * 184 + 50, Math.random() * 256);

allEnemies.push(enemy);
// https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
// https://developer.mozilla.org/en-US/docs/Web/Events
document.addEventListener('keydown', (e) => {
	var allowedKeys = {
		37: 'left',
		38: 'up',
		39: 'right',
		40: 'down',
		49: '1',
		50: '2',
		51: '3'
	};

	player.handleInput(allowedKeys[e.keyCode]);
	console.log(allowedKeys[e.keyCode]);
});
