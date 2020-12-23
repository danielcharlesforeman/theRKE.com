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
    this.playerSpeed = 3;
    this.robotSpeed = 3;
}

//Preload
gameScene.preload = function () {
    this.load.image('backdrop', './assets/backdrop.png');
    this.load.image('player', './assets/female/character_femalePerson_behindBack.png');
    this.load.image('robot', './assets/robot/character_robot_attack0.png');
    this.load.image('goal', './assets/background/topdownTile_40.png');
    this.load.audio('voxel', './assets/music/voxel-revolution-by-kevin-macleod-from-filmmusic-io.mp3');
}

//Create
gameScene.create = function () {
    
    this.cursorKeys = this.input.keyboard.createCursorKeys();
    
    this.music = this.sound.add('voxel');
        
    //backdrop
    var bd = this.add.tileSprite(0, 0, system.width, system.height, 'backdrop');
    bd.setPosition(system.width / 2, system.height / 2);

    //Goal
    this.goal = this.add.sprite( system.width * 0.9, Math.random() * system.height, 'goal' );
    this.goal.setScale( 0.75, 0.75 );
    
    //player
    this.player = this.add.sprite( system.width * 0.05, system.height / 2, 'player');
    this.player.setScale(0.5, 0.5);

    //robot
    this.robot = this.add.sprite( system.width * 0.3, Math.random() * system.height, 'robot');
    this.robot.setScale(0.5, 0.5);
    this.robot.setFlip(true, false);
    this.robot.direction = 'up';

    this.robot2 = this.add.sprite( system.width * 0.4, Math.random() * system.height, 'robot');
    this.robot2.setScale(0.5, 0.5);
    this.robot2.setFlip(true, false);
    this.robot2.direction = 'down';

    this.robot3 = this.add.sprite( system.width * 0.5, Math.random() * system.height, 'robot');
    this.robot3.setScale(0.5, 0.5);
    this.robot3.setFlip(true, false);
    this.robot3.direction = 'up';

    this.robot4 = this.add.sprite( system.width * 0.6, Math.random() * system.height, 'robot');
    this.robot4.setScale(0.5, 0.5);
    this.robot4.setFlip(true, false);
    this.robot4.direction = 'down';
    
    this.robot5 = this.add.sprite( system.width * 0.7, Math.random() * system.height, 'robot');
    this.robot5.setScale(0.5, 0.5);
    this.robot5.setFlip(true, false);
    this.robot5.direction = 'up';
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
    if ( this.robot.direction === 'up' ) { this.robot.y += this.robotSpeed } 
    if ( this.robot.direction === 'down' ) { this.robot.y -= this.robotSpeed }
    if ( this.robot.y > screen.height * 0.5 ) { this.robot.direction = 'down' }
    if ( this.robot.y < 0 ) { this.robot.direction = 'up' }
    
    if ( this.robot2.direction === 'up' ) { this.robot2.y += this.robotSpeed } 
    if ( this.robot2.direction === 'down' ) { this.robot2.y -= this.robotSpeed }
    if ( this.robot2.y > screen.height * 0.5 ) { this.robot2.direction = 'down' }
    if ( this.robot2.y < 0 ) { this.robot2.direction = 'up' }
    
    if ( this.robot3.direction === 'up' ) { this.robot3.y += this.robotSpeed } 
    if ( this.robot3.direction === 'down' ) { this.robot3.y -= this.robotSpeed }
    if ( this.robot3.y > screen.height * 0.5 ) { this.robot3.direction = 'down' }
    if ( this.robot3.y < 0 ) { this.robot3.direction = 'up' }
    
    if ( this.robot4.direction === 'up' ) { this.robot4.y += this.robotSpeed } 
    if ( this.robot4.direction === 'down' ) { this.robot4.y -= this.robotSpeed }
    if ( this.robot4.y > screen.height * 0.5 ) { this.robot4.direction = 'down' }
    if ( this.robot4.y < 0 ) { this.robot4.direction = 'up' }
    
    if ( this.robot5.direction === 'up' ) { this.robot5.y += this.robotSpeed } 
    if ( this.robot5.direction === 'down' ) { this.robot5.y -= this.robotSpeed }
    if ( this.robot5.y > screen.height * 0.5 ) { this.robot5.direction = 'down' }
    if ( this.robot5.y < 0 ) { this.robot5.direction = 'up' }
    
    //Collision Detection
    var playerCollision = this.player.getBounds();
    var goalCollision = this.goal.getBounds();
    var robotCollision = this.robot.getBounds();
    var robotCollision2 = this.robot2.getBounds();
    var robotCollision3 = this.robot3.getBounds();
    var robotCollision4 = this.robot4.getBounds();
    var robotCollision5 = this.robot5.getBounds();

    if ( Phaser.Geom.Intersects.RectangleToRectangle( playerCollision, goalCollision )) {
        score++;
        this.robotSpeed += 0.25;
        scoreElement.innerHTML = score;
        this.scene.restart();
    }
    
    if ( Phaser.Geom.Intersects.RectangleToRectangle( playerCollision, robotCollision )) {
        lives--;
        if (lives < 0 ) { score=0; lives=3; alert('you scored ' + score ) }
        livesElement.innerHTML = lives;
        scoreElement.innerHTML = score;
        this.scene.restart();
    }
    
    if ( Phaser.Geom.Intersects.RectangleToRectangle( playerCollision, robotCollision2 )) {
        lives--;
        if (lives < 0 ) { score=0; lives=3; alert('you scored ' + score ) }
        livesElement.innerHTML = lives;
        scoreElement.innerHTML = score;
        this.scene.restart();
    }
    
    if ( Phaser.Geom.Intersects.RectangleToRectangle( playerCollision, robotCollision3 )) {
        lives--;
        if (lives < 0 ) { score=0; lives=3; alert('you scored ' + score ) }
        livesElement.innerHTML = lives;
        scoreElement.innerHTML = score;
        this.scene.restart();
    }
    
    if ( Phaser.Geom.Intersects.RectangleToRectangle( playerCollision, robotCollision4 )) {
        lives--;
        if (lives < 0 ) { score=0; lives=3; alert('you scored ' + score ) }
        livesElement.innerHTML = lives;
        scoreElement.innerHTML = score;
        this.scene.restart();
    }
    
    if ( Phaser.Geom.Intersects.RectangleToRectangle( playerCollision, robotCollision5 )) {
        lives--;
        if (lives < 0 ) { score=0; lives=3; alert('you scored ' + score ) }
        livesElement.innerHTML = lives;
        scoreElement.innerHTML = score;
        this.scene.restart();
    }

}

//EndGame
