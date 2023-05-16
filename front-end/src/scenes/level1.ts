import debugDraw from '../utilities/debug';

export default class Level1 extends Phaser.Scene {

    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
    private player!: Phaser.Physics.Arcade.Sprite;

    constructor() {
        super('Level1');
    }

    preload() {
        this.cursors = this.input.keyboard.createCursorKeys();

        this.load.image('dungeon_tiles', 'tiles/dungeon_tiles.png');
        this.load.tilemapTiledJSON('arena', 'tiles/level-01.json');

    }

    create() {
        const { width, height } = this.scale;
        const centerX = width * 0.5;
        const centerY = height * 0.5;

        const map = this.make.tilemap({ key: 'arena' });

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const tileset: any = map.addTilesetImage('dungeon', 'dungeon_tiles');
        const groundLayer: any = map.createLayer('Ground', tileset, 16, 0);
        const wallsLayer: any = map.createLayer('Walls', tileset, 16, 0);

        wallsLayer.setCollisionByProperty({ collide: true });

        // debugDraw(wallsLayer, this);

        this.player = this.physics.add.sprite(centerX - 20, centerY, 'lonk', 'elf_m_idle_anim_f0.png');
        this.player.setOrigin(0.5, 1);
        this.player.body?.setSize(15, 21, true);
        this.player.body?.setOffset(0, 8);


        this.anims.create({
            key: 'idle_lonk',
            frames: this.anims.generateFrameNames('lonk', {
                prefix: 'elf_m_idle_anim_f',
                start: 0,
                end: 3,
                suffix: '.png'
            }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'walk_lonk',
            frames: this.anims.generateFrameNames('lonk', {
                prefix: 'elf_m_run_anim_f',
                start: 0,
                end: 3,
                suffix: '.png'
            }),
            frameRate: 10,
            repeat: -1
        });

        this.player.anims.play('idle_lonk', true);

        this.physics.add.collider(this.player, wallsLayer);

        // Enemy
        const enemy = this.physics.add.sprite(centerX, centerY, 'chort', 'chort_idle_anim_f0.png');
        enemy.setOrigin(0.5, 1);
        enemy.body?.setSize(12, 17, true);
        enemy.body?.setOffset(3, 6);

        this.anims.create({
            key: 'idle_chort',
            frames: this.anims.generateFrameNames('chort', {
                prefix: 'chort_idle_anim_f',
                start: 0,
                end: 3,
                suffix: '.png'
            }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'walk_chort',
            frames: this.anims.generateFrameNames('chort', {
                prefix: 'chort_run_anim_f',
                start: 0,
                end: 3,
                suffix: '.png'
            }),
            frameRate: 10,
            repeat: -1
        });

        enemy.anims.play('idle_chort', true);
    }

    update(t: number, dt: number) {
        if (!this.cursors || !this.player) return;

        const speed = 100;

        const player = this.player;
        const direction = this.cursors.left.isDown ? 'left' : this.cursors.right.isDown ? 'right' : this.cursors.up.isDown ? 'up' : this.cursors.down.isDown ? 'down' : 'idle';

        switch (direction) {
            case 'left':
                player.flipX = true;
                player.anims.play('walk_lonk', true);
                player.setVelocityX(-speed);
                break;
            case 'right':
                player.flipX = false;
                player.anims.play('walk_lonk', true);
                player.setVelocityX(speed);
                break;
            case 'up':
                player.anims.play('walk_lonk', true);
                player.setVelocityY(-speed);
                break;
            case 'down':
                player.anims.play('walk_lonk', true);
                player.setVelocityY(speed);
                break;
            default:
                player.anims.play('idle_lonk', true);
                player.setVelocityX(0);
                player.setVelocityY(0);
                break;
        }
    }
}
