class Enemy {
	constructor(x, y, speed) {
		this.x = x;
		this.y = y;
		this.speed = speed;
		this.sprite = 'images/enemy-bug.png';
	}
	update(dt) {
		this.x += this.speed * dt;

		if (this.x >= 505) {
			this.x = 0;
		}

		checkCollision(this);
	}

	render() {
		ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	}
}

class Player {
	constructor(x, y, speed) {
		this.x = x;
		this.y = y;
		this.speed = speed;
		this.sprite = 'images/char-horn-girl.png';
	}

	update(dt) {}

	render() {
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
		console.log('keyPress is: ' + keyPress);
	}
}

var displayScoreLevel = function(aScore, aLevel) {
	var canvas = document.getElementsByTagName('canvas');

	var firstCanvasTag = canvas[0];

	scoreLevelDiv.innerHTML = 'Score: ' + aScore + ' / ' + 'Level: ' + aLevel;

	document.body.insertBefore(scoreLevelDiv, firstCanvasTag[0]);
};

var checkCollision = function(anEnemy) {
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

var increaseDifficulty = function(numEnemies) {
	allEnemies.length = 0;

	for (var i = 0; i <= numEnemies; i++) {
		var enemy = new Enemy(0, Math.random() * 184 + 50, Math.random() * 256);

		allEnemies.push(enemy);
	}
};

var allEnemies = [];
var player = new Player(201.25, 383, 50); // x -> 0, 201.25, 402.5 y ->
var score = 0;
var gameLevel = 1;
var scoreLevelDiv = document.createElement('div');
var enemy = new Enemy(0, Math.random() * 184 + 50, Math.random() * 256);

allEnemies.push(enemy);

document.addEventListener('keydown', function(e) {
	var allowedKeys = {
		37: 'left',
		38: 'up',
		39: 'right',
		40: 'down'
	};

	player.handleInput(allowedKeys[e.keyCode]);
	console.log(allowedKeys[e.keyCode]);
});
