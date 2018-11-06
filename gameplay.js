    var config = {
        type: Phaser.AUTO,
        width: 288,
        height: 512,
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 600 },
                debug: false
            }
        },
        scene: {
            preload: preload,
            create: create,
            update: update
        }
    };

    var game = new Phaser.Game(config);
    var base;
    var bird;
    var cursors;
    var intro;
    var gameover;
    var gameStarted;
    var finishedGame;
    var anims;
    var pipes;
    var timedEvent;

    function preload ()
    {
        this.load.image('0', 'assets/sprites/0.png');
        this.load.image('1', 'assets/sprites/1.png');
        this.load.image('2', 'assets/sprites/2.png');
        this.load.image('3', 'assets/sprites/3.png');
        this.load.image('4', 'assets/sprites/4.png');
        this.load.image('5', 'assets/sprites/5.png');
        this.load.image('6', 'assets/sprites/6.png');
        this.load.image('7', 'assets/sprites/7.png');
        this.load.image('8', 'assets/sprites/8.png');
        this.load.image('9', 'assets/sprites/9.png');
        this.load.image('background-day', 'assets/sprites/background-day.png');
        this.load.image('background-night', 'assets/sprites/background-night.png');
        this.load.image('base', 'assets/sprites/base.png');
        this.load.image('blue-bird-downflap', 'assets/sprites/bluebird-downflap.png');
        this.load.image('blue-bird-midflap', 'assets/sprites/bluebird-midflap.png');
        this.load.image('blue-bird-upflap', 'assets/sprites/bluebird-upflap.png');
        this.load.image('intro', 'assets/sprites/message.png');
        this.load.image('gameover', 'assets/sprites/gameover.png')
        this.load.spritesheet('bird', 'assets/sprites/birds.png', {frameWidth: 100, frameHeight: 100});
        this.load.image('pipe', 'assets/sprites/pipe-green.png');
    }

    function create ()
    {
        let bg = this.add.sprite(0, 0, 'background-day');
        bg.setOrigin(0, 0);

        intro = this.add.image(game.config.width/2, game.config.height/2, 'intro');
        gameover = this.add.image(game.config.width/2, game.config.height/2, 'gameover');
        gameover.visible = false;
        this.anims.create({
            key: 'fly',
            frames: [
                { key: 'blue-bird-downflap' },
                { key: 'blue-bird-midflap' },
                { key: 'blue-bird-upflap' },
            ],
            frameRate: 8,
            repeat: -1
        });
        anims = this.anims;
        
        //bird.setCollideWorldBounds(true);
        base = this.add.tileSprite(0, 500, 600, 100, 'base');
        bird = this.physics.add.sprite(100, 300, 'bird').play('fly');
        bird.body.allowGravity = false;
        bird.body.setBounce(10);

        pipes = this.physics.add.group();

        timedEvent = this.time.addEvent({ delay: 500, callback: addOnePipe, callbackScope: this, loop: true});
        
        cursors = this.input.keyboard.createCursorKeys();

        this.input.on("pointerdown", function() {
            if (!gameStarted) {
              startGame();
            }
          });
    }

    function update ()
    {
        if(!finishedGame)
        {
            base.tilePositionX += 2.5;

            pipes.getChildren().forEach(function(pipe){
                pipe.x -= 2.5;
            });

        }
        
        if(gameStarted && !finishedGame)
        {
            if(bird.y >= (game.config.height - base.displayHeight + bird.displayHeight))
            {
                finishGame();
            }
            
            if(cursors.space.isDown)
            {
                jump();
            }

            if (bird.angle < 20)
            {
                bird.angle += 1; 
            }
        }
    }   

    function startGame()
    {
        gameStarted = true;
        finishedGame = false;
        intro.visible = false;
        bird.body.allowGravity = true;
    }

    function finishGame() 
    {
        gameStarted = false;
        finishedGame = true;
        gameover.visible = true;
        bird.body.setEnable(false);
        anims.remove('fly');
        base.tilePositionX = 0;
        timedEvent.remove(false);
    }

    function jump()
    {
        bird.setVelocityY(-250);
        bird.angle = -20;
    }

    function addOnePipe(x, y){
        pipes.create(300, 300, 'pipe').body.allowGravity = false;
    }