import debugDraw from '../utilities/debug';

import { createChortAnims } from '../animations/EnemyAnims';

import Chort from '../enemies/Chort';

import Lonk from '../characters/Lonk';
import '../characters/Lonk';

import { sceneEvents } from '../events/EventContext';

export default class Level1 extends Phaser.Scene {

    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
    private player!: Lonk;

    private playerCollider!: Phaser.Physics.Arcade.Collider;

    constructor() {
        super('Level1');
    }

    preload() {
        this.cursors = this.input.keyboard.createCursorKeys();

        this.load.image('dungeon_tiles', 'tiles/dungeon_tiles.png');
        this.load.tilemapTiledJSON('arena', 'tiles/level-01.json');

    }

    create() {
        this.scene.run('Interface');

        // createLonkAnims(this.anims);
        createChortAnims(this.anims);

        const { width, height } = this.scale;
        const centerX = width * 0.5;
        const centerY = height * 0.5;

        const map = this.make.tilemap({ key: 'arena' });

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const tileset: any = map.addTilesetImage('dungeon', 'dungeon_tiles');
        const groundLayer: any = map.createLayer('Ground', tileset, 0, 0);
        const wallsLayer: any = map.createLayer('Walls', tileset, 0, 0);

        const hammer = this.physics.add.group({
            classType: Phaser.Physics.Arcade.Image,
            maxSize: 10,
        });

        wallsLayer.setCollisionByProperty({ collide: true });

        this.player = this.add.lonk(centerX, centerY, 'lonk');
        this.player.hammer = hammer;

        // debugDraw(wallsLayer, this);

        // Enemy

        const enemies = this.physics.add.group({
            classType: Chort, createCallback: (gameObject) => {
                const chortGo = gameObject as Chort;
                chortGo.body.onCollide = true;
            }
        });

        enemies.get(centerX + 20, centerY, 'chort');

        // Collisions
        this.physics.add.collider(this.player, wallsLayer);
        this.physics.add.collider(enemies, wallsLayer);
        this.physics.add.collider(hammer, wallsLayer, (obj1, obj2) => obj1.destroy(), undefined, this);
        this.physics.add.collider(hammer, enemies, this.handleHammerEnemyCollision, undefined, this);
        this.playerCollider = this.physics.add.collider(this.player, enemies, this.handlePlayerEnemyCollision, undefined, this);
    }

    private handleHammerEnemyCollision(hammer: Phaser.Physics.Arcade.Image, enemy: Phaser.Physics.Arcade.Image) {
        enemy.destroy();
        hammer.destroy();
    }

    private handlePlayerEnemyCollision(obj1: Phaser.GameObjects.GameObject, obj2: Phaser.GameObjects.GameObject) {

        const chort = obj2 as Chort;

        const dx = this.player.x - chort.x;
        const dy = this.player.y - chort.y;

        const dir = new Phaser.Math.Vector2(dx, dy).normalize().scale(200);

        this.player.handleDamage(dir);

        sceneEvents.emit('player_hp_change', this.player.health);

        if (this.player.health <= 0) {
            this.playerCollider?.destroy();
        }
    }

    update(time: number, delta: number) {

        if (this.player) this.player.update(this.cursors);
    }
}
