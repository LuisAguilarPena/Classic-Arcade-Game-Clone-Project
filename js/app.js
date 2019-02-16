// Enemies our player must avoid
var Enemy = function(posX, posY, movSpeed) { // Variables applied to each of our instances go here,
    this.posX = posX; // Where the enemy will spawn in the x axis
    this.posY = posY; // Where the enemy will spawn in the y axis
    this.movSpeed = movSpeed; // enemies' movement speed
    this.sprite = 'images/enemy-bug.png'; // The image/sprite for our enemies, this uses a helper we've provided to easily load images
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.posX += this.movSpeed * dt; //It adds to the initial position of the enemy
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.posX, this.posY);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(playerPosX, playerPosY, playerMovSpeed) {
    this.playerPosX = playerPosX; // where the player will spawn in the x axis
    this.playerPosY = playerPosY; // where the player will spawn in the y axis
    this.playerMovSpeed = playerMovSpeed; // player's movement speed
    this.sprite = "images/char-horn-girl.png"; //the image for the player
};

Player.prototype.update = function(dt) {
    this.playerPosX += this.playerMovSpeed * dt;
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.playerPosX, this.playerPosY);
};

/*Player.prototype.handleInput = function() {

}*/

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];
var player = new Player(0,0, 10);
var enemy = new Enemy(250, 0, 10);

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
