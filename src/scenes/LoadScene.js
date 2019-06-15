class LoadScene extends Phaser.Scene  
{
    constructor ()
    {
        super('LoadScene');
    }

    preload ()
    {
        this.load.on('progress', (value) => {
            console.log(value*100 + ' %');
        });

        this.load.on('complete', () => {
            this.scene.start('GameScene');
        });

        this.load.bitmapFont('font', 'assets/fonts/font.png', 'assets/fonts/font.fnt');
        this.load.image('background-day', 'assets/sprites/background-day.png');
        this.load.image('background-night', 'assets/sprites/background-night.png');
        this.load.image('base', 'assets/sprites/base.png');
        this.load.image('blue-bird-downflap', 'assets/sprites/bluebird-downflap.png');
        this.load.image('blue-bird-midflap', 'assets/sprites/bluebird-midflap.png');
        this.load.image('blue-bird-upflap', 'assets/sprites/bluebird-upflap.png');
        this.load.image('yellow-bird-downflap', 'assets/sprites/yellowbird-downflap.png');
        this.load.image('yellow-bird-midflap', 'assets/sprites/yellowbird-midflap.png');
        this.load.image('yellow-bird-upflap', 'assets/sprites/yellowbird-upflap.png');
        this.load.image('red-bird-downflap', 'assets/sprites/redbird-downflap.png');
        this.load.image('red-bird-midflap', 'assets/sprites/redbird-midflap.png');
        this.load.image('red-bird-upflap', 'assets/sprites/redbird-upflap.png');   
        this.load.image('intro', 'assets/sprites/message.png');
        this.load.image('scoreBoard', 'assets/sprites/scoreboard.png');
        this.load.image('pipe', 'assets/sprites/pipe-green.png');
        this.load.image('replay', 'assets/sprites/replay.png');
        this.load.image('medal-bronze', 'assets/sprites/medal_bronze.png');
        this.load.image('medal-silver', 'assets/sprites/medal_silver.png');
        this.load.image('medal-gold', 'assets/sprites/medal_gold.png');
        this.load.image('medal-platinum', 'assets/sprites/medal_platinum.png');
    }

    create ()
    {
        window.addEventListener('resize', this.resize);
        this.resize();

        let birdRandom = Phaser.Math.Between(0, 2);

        switch(birdRandom) {
            case 0:
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
                    break;
            case 1:
                    this.anims.create({
                        key: 'fly',
                        frames: [
                            { key: 'yellow-bird-downflap' },
                            { key: 'yellow-bird-midflap' },
                            { key: 'yellow-bird-upflap' },
                        ],
                        frameRate: 8,
                        repeat: -1
                    });
                    break;
            default:
                    this.anims.create({
                        key: 'fly',
                        frames: [
                            { key: 'red-bird-downflap' },
                            { key: 'red-bird-midflap' },
                            { key: 'red-bird-upflap' },
                        ],
                        frameRate: 8,
                        repeat: -1
                    });
                    break;
        }
    }

    resize ()
    {
        var canvas = document.querySelector("canvas"), width = window.innerWidth, height = window.innerHeight;
        var wratio = width / height, ratio = canvas.width / canvas.height;
        if (wratio < ratio) {
            canvas.style.width = width + "px";
            canvas.style.height = (width / ratio) + "px";
        } 
        else if (wratio < 0.90) {
            canvas.style.width = width + "px";
            canvas.style.height = height + "px";
        }
        else {
            canvas.style.width = (height * ratio) + "px";
            canvas.style.height = height + "px";
        }
    }
}

export default LoadScene;