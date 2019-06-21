class GameScene extends Phaser.Scene
{
    constructor () 
    {
        super('GameScene');
    }

    create () 
    {
        this.score = {
            pts: 0,
            textObject: this.add.bitmapText(this.game.config.width/2, 20, 'font', '0', 40)
        };
        this.score.textObject.setDepth(4);
        this.gameStarted = true;
        this.finishedGame = false;

        let bgRandom = Phaser.Math.Between(0, 1);
        let bgDayOrNight;
        switch (bgRandom){
            case 0:
                bgDayOrNight = 'background-day';
                break;
            case 1:
                bgDayOrNight = 'background-night';
                break;    
        };
    
        this.bg = this.add.tileSprite(0, 0, 300, 512, bgDayOrNight);
        this.bg.setOrigin(0, 0);
        this.bg.setDepth(0);
        this.bg.setInteractive();

        this.base = this.add.tileSprite(0, this.game.config.height, 600, 50, 'base');
        this.base.setDepth(3);
        this.physics.add.existing(this.base, false);
        this.base.body.allowGravity = false;
        this.base.body.setCollideWorldBounds(true);

        this.bird = this.physics.add.sprite(75, 300).play('fly');
        this.bird.body.height = 24;
        this.bird.setOrigin(0.5, 0.7);
       // this.bird.body.allowGravity = false;
        this.bird.body.setCollideWorldBounds(true);
        this.bird.setDepth(2);
        this.physics.add.collider(this.base, this.bird, this.gameOver, null, this);

        this.pipes = this.physics.add.group();
        this.pipes.setDepth(1);
        this.physics.add.overlap(this.pipes, this.bird, this.gameOver, null, this);

        this.zonesScore = this.physics.add.group();
        this.physics.add.overlap(this.bird, this.zonesScore, this.incrementScore, null, this);

        /*this.intro = this.add.image(this.game.config.width/2, this.game.config.height/2, 'intro');
        this.intro.setDepth(4);*/

        this.bg.on('pointerdown', () => {
            //this.gameStarted ? this.jump() : this.startGame();
            this.jump();
        });

        this.time.addEvent ({ delay: 1500, callback: this.addOnePipe, callbackScope: this, loop: true });
        this.time.addEvent ({ delay: 5000, callback: this.deletePipes, callbackScope: this, loop: true });        
    }

    update ()
    {
        if(!this.finishedGame)
        {
            this.bg.tilePositionX += 0.25;
            this.base.tilePositionX += 2.5;          
        }
        
        if(!this.finishedGame)
        {   
            this.pipes.getChildren().forEach((pipe) => {
                pipe.x -= 2.5;
            });

            this.zonesScore.getChildren().forEach((zoneScore) => {
                zoneScore.x -= 2.5;
            });

            if(this.bird.angle < 20)
            {
                this.bird.angle += 1;
            }
        }
    }

    addOnePipe ()
    {
        if(!this.finishedGame)
        {
            let gap = 120;
            let randomHeightTop = Phaser.Math.Between(50, 312);
            let calculHeightBottom = this.game.config.height - this.base.height - randomHeightTop - gap;
            let pBottom = this.add.tileSprite(400, 462, 52, calculHeightBottom, 'pipe').setOrigin(0.5, 1);
            this.physics.add.existing(pBottom, false);
            this.pipes.add(pBottom);
            pBottom.body.setImmovable();
            pBottom.body.setAllowGravity(false);
            
            let pTop = this.add.tileSprite(400, randomHeightTop, 52, 320, 'pipe').setFlipY(true).setOrigin(0.5, 1);
            this.physics.add.existing(pTop, false);
            this.pipes.add(pTop);
            pTop.body.setImmovable();
            pTop.body.setAllowGravity(false);
            
            let zoneScore = this.add.zone(400 + pBottom.width/2, 0).setSize(1, this.game.config.height - this.base.height);
            this.zonesScore.add(zoneScore);
            zoneScore.setDepth(0);
            this.physics.world.enable(zoneScore);
            zoneScore.body.setAllowGravity(false);
            zoneScore.body.moves = false;  
        }   
    }

    deletePipes ()
    {
        if(!this.finishedGame)
        {
            this.pipes.getChildren().forEach((pipe) => {
                if(pipe.x < -pipe.width)
                {
                    pipe.destroy();
                }
            });
        }
    }

    jump ()
    {
        if(!this.finishedGame)
        {
            this.bird.setVelocityY(-250);
            this.bird.angle = -20;  
        }     
    }

    incrementScore (bird, zoneScore)
    {
        this.score.pts++;
        this.score.textObject.setText(('' + this.score.pts));
        zoneScore.destroy();
    }

   /* startGame ()
    {
        this.gameStarted = true;
        this.intro.visible = false;
        this.bird.body.allowGravity = true;
    }*/

    gameOver ()
    {
        if(!this.finishedGame)
        {
            this.finishedGame = true;
            //this.game.scene.restart('GameScene')
            this.scene.restart();
            /*this.score.textObject.visible = false;
            this.bird.anims.pause();
            this.registry.set('score', this.score);*/
           // this.game.scene.start('GameOverScene');
        }    
    }
}

export default GameScene;