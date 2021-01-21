var system = {
    width: 1024,
    height: 1024 * 0.5625
}

//Create Scene
var gameScene = new Phaser.Scene('Game');
var score = 0;
var lives = 3;
var scoreElement = document.getElementById('score');
var livesElement = document.getElementById('lives');

//Config Game
var config = {
    type: Phaser.CANVAS,
    width: system.width,
    height: system.height,
    scene: gameScene
};

//Create new game
var game = new Phaser.Game(config);

//Game Settings
gameScene.init = function () {

}

//Preload
gameScene.preload = function () {

}

//Create
gameScene.create = function () {
    
    this.cursorKeys = this.input.keyboard.createCursorKeys();

}

//Update
gameScene.update = function () {

    if ( this.input.activePointer.isDown) {
        this.music.play();
    }
    
    //Control player
    if (this.cursorKeys.right.isDown) {
        this.player.x += this.playerSpeed;
    }
    
    if (this.cursorKeys.left.isDown) {
        this.player.x -= this.playerSpeed;
    }
    
    if (this.cursorKeys.up.isDown) {
        this.player.y -= this.playerSpeed;
    }
    
    if (this.cursorKeys.down.isDown) {
        this.player.y += this.playerSpeed;
    }
    
    //Limit player movement
    if (this.player.x > system.width ) { this.player.x = system.width }
    if (this.player.x < 0 ) { this.player.x = 0 }
    if (this.player.y > system.height ) { this.player.y = system.height }
    if (this.player.y < 0 ) { this.player.y = 0 }

    //MoveRobots

    
    //Collision Detection
    var robotCollision5 = this.robot5.getBounds();

    if ( Phaser.Geom.Intersects.RectangleToRectangle( playerCollision, goalCollision )) {
        score++;
        this.robotSpeed += 0.25;
        scoreElement.innerHTML = score;
        this.scene.restart();
    }


}

//EndGame
