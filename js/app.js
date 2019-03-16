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
		this.sprite = 'images/char-boy.png';
	}

	update(dt) {}

	render() {
		ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
		displayScoreLevel(score, gameLevel);
	}

	handleInput(keyPress) {
		if (keyPress == 'left') {
			player.x -= player.speed;
		}
		if (keyPress == 'up') {
			player.y -= player.speed * 1.7;
		}
		if (keyPress == 'right') {
			player.x += player.speed;
		}
		if (keyPress == 'down') {
			player.y += player.speed * 1.7;
		}
		console.log('keyPress is: ' + keyPress);
	}
}

// Function to display player's score
var displayScoreLevel = function(aScore, aLevel) {
	var canvas = document.getElementsByTagName('canvas');
	var firstCanvasTag = canvas[0];

	// add player score and level to div element created
	scoreLevelDiv.innerHTML = 'Score: ' + aScore + ' / ' + 'Level: ' + aLevel;
	document.body.insertBefore(scoreLevelDiv, firstCanvasTag[0]);
};

var checkCollision = function(anEnemy) {
	// check for collision between enemy and player
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

	// check for player reaching top of canvas and winning the game
	// if player wins, add 1 to the score and level
	// pass score as an argument to the increaseDifficulty function
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

	// check if player runs into left, bottom, or right canvas walls
	// prevent player from moving beyond canvas wall boundaries
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

// Increase number of enemies on screen based on player's score
var increaseDifficulty = function(numEnemies) {
	// remove all previous enemies on canvas
	allEnemies.length = 0;

	// load new set of enemies
	for (var i = 0; i <= numEnemies; i++) {
		var enemy = new Enemy(0, Math.random() * 184 + 50, Math.random() * 256);

		allEnemies.push(enemy);
	}
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
// Enemy randomly placed vertically within section of canvas
// Declare new score and gameLevel variables to store score and level
var allEnemies = [];
var player = new Player(201.25, 383, 50); // x -> 0, 201.25, 402.5 y ->
var score = 0;
var gameLevel = 1;
var scoreLevelDiv = document.createElement('div');
var enemy = new Enemy(0, Math.random() * 184 + 50, Math.random() * 256);

allEnemies.push(enemy);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
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
