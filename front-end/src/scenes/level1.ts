import debugDraw from '../utilities/debug';
import { createChortAnims } from '../phaser/animations/EnemyAnims';
import { createLonkAnims } from '../phaser/animations/CharacterAnims';
import Chort from '../phaser/enemies/Chort';

import Lonk from './../phaser/characters/Lonk';
import '../phaser/characters/Lonk';

export default class Level1 extends Phaser.Scene {

    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
    private player!: Lonk;

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
        const groundLayer: any = map.createLayer('Ground', tileset, 0, 0);
        const wallsLayer: any = map.createLayer('Walls', tileset, 0, 0);

        wallsLayer.setCollisionByProperty({ collide: true });

        // debugDraw(wallsLayer, this);

        this.player = this.add.lonk(centerX, centerY, 'lonk');
        createLonkAnims(this.anims);
        createChortAnims(this.anims);
        // Enemy

        const enemies = this.physics.add.group({
            classType: Chort,
            createCallback: (go) => {
                const chortGo = go as Chort;
                chortGo.body.onCollide = true;
            }
        });

        enemies.get(centerX + 20, centerY, 'chort');

        // Collisions
        this.physics.add.collider(this.player, wallsLayer);
        this.physics.add.collider(enemies, wallsLayer);
        this.physics.add.collider(this.player, enemies, this.handlePlayerEnemyCollision, undefined, this);
    }

    private handlePlayerEnemyCollision(obj1: Phaser.GameObjects.GameObject, obj2: Phaser.GameObjects.GameObject) {

        const enemy = obj2 as Chort;

        const dx = this.player.x - enemy.x;
        const dy = this.player.y - enemy.y;

        const dir = new Phaser.Math.Vector2(dx, dy).normalize().scale(200);

        this.player.handleDamage(dir);
    }

    update(time: number, delta: number) {

        if (this.player) this.player.update(this.cursors);
    }
}
