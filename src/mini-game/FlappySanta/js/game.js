//Create Scene
var gameScene = new Phaser.Scene('Game');
var score = 0;
var lives = 3;
var scoreElement = document.getElementById('score');
var livesElement = document.getElementById('lives');

//Config Game
var config = {
    type: Phaser.CANVAS,
    width: 1024,
    height: 576,
    scene: gameScene,
    physics: {
        default: 'arcade',
        arcade: { y: 300 },
        debug: true
    }
};

//Create new game
var game = new Phaser.Game(config);

//Game Settings
gameScene.init = function () {

}

//Preload
gameScene.preload = function () {
    this.load.image('santa', 'assets/Santa.png');
    this.load.image('ground', 'assets/ground.png');
    this.load.image('brick', 'assets/brick.png');
}

//Create
gameScene.create = function () {
    
    //Control keys
    this.cursorKeys = this.input.keyboard.createCursorKeys();
    
    player = this.physics.add.sprite( 100, 64, 'santa');
    player.setBounce(0.25);
    player.body.setGravityY(300);
    
    ground = this.physics.add.staticGroup();
    ground.create(512, 566, 'ground');
    this.physics.add.collider(player, ground);
    

}

//Update
gameScene.update = function () {

    if (this.cursorKeys.up.isDown || this.input.activePointer.isDown ) {
        player.setVelocityY(-175);
    }
    
    if ( player.y < 0 ) { player.y = 0 }
    
}

