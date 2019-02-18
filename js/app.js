// Enemies our player must avoid
var Enemy = function(x, y, speed) { // Variables applied to each of our instances go here,
    this.x = x; // Where the enemy will spawn in the x axis
    this.y = y; // Where the enemy will spawn in the y axis
    this.speed = speed; // enemies' movement speed
    this.sprite = 'images/enemy-bug.png'; // The image/sprite for our enemies, this uses a helper we've provided to easily load images
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    if (this.x <= 505) {
        this.x += this.speed * dt; //It adds to the initial position of the enemy
    } else {
        this.x = 0;
    }
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt; //It adds to the initial position of the enemy
    checkCollision(this); // Check for the collision
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(x, y, speed) {
    this.x = x; // where the player will spawn in the x axis
    this.y = y; // where the player will spawn in the y axis
    this.speed = speed; // player's movement speed
    this.sprite = 'images/char-boy.png'; //the image for the player
};

Player.prototype.update = function(dt) {
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keyPress) {
    if (keyPress == 'left') {
        player.x -= player.speed;
    }
    if (keyPress == 'up') {
        player.y -= player.speed - 20;
    }
    if (keyPress == 'right') {
        player.x += player.speed;
    }
    if (keyPress == 'down') {
        player.y += player.speed - 20;
    }
};

var checkCollision = function(anEnemy) {
  var phrases = ['Can you explain it to me?',"Baby face Pancho",'FETUS!!!!']
  // check for collision between enemy and player
  if (player.y + 131 >= anEnemy.y + 90 && player.x + 25 <= anEnemy.x + 88 && player.y + 73 <= anEnemy.y + 135 && player.x + 76 >= anEnemy.x + 11) {
    console.log(phrases[Math.floor(Math.random() * Math.floor(3))]); // choose a phrase
    player.x = 202.5;
    player.y = 383;
  }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];
var player = new Player(202.5,380, 100);
var enemy = new Enemy(0, 50, 100);

allEnemies.push(enemy);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
