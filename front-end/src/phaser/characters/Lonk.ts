import Phaser from 'phaser';

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace Phaser.GameObjects {
        interface GameObjectFactory {
            lonk(x: number, y: number, texture: string, frame?: string | number): Lonk;
        }
    }
}

enum HealthState {
    IDLE,
    DAMAGE,
    DEAD
}

export default class Lonk extends Phaser.Physics.Arcade.Sprite {

    private healthState = HealthState.IDLE;
    private deltaDamage = 0;

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string | number) {
        super(scene, x, y, texture, frame);
        this.anims.play('idle_lonk');
    }

    handleDamage(dir: Phaser.Math.Vector2): void {
        if (this.healthState === HealthState.DAMAGE) return;

        this.setVelocity(dir.x, dir.y);
        this.setTint(0xff0000);
        this.healthState = HealthState.DAMAGE;
        this.deltaDamage = 0;
    }

    preUpdate(time: number, delta: number): void {

        super.preUpdate(time, delta);
        switch (this.healthState) {
            case HealthState.IDLE:
                break;
            case HealthState.DAMAGE:
                this.deltaDamage += delta;
                if (this.deltaDamage > 250) {
                    this.healthState = HealthState.IDLE;
                    this.clearTint();
                }
                break;
        }
    }


    update(cursors: Phaser.Types.Input.Keyboard.CursorKeys): void {

        if (this.healthState === HealthState.DAMAGE || this.healthState === HealthState.DEAD) return;
        if (!cursors) return;

        const speed = 100;
        const direction = cursors.left.isDown ? 'left' : cursors.right.isDown ? 'right' : cursors.up.isDown ? 'up' : cursors.down.isDown ? 'down' : 'idle';

        switch (direction) {
            case 'left':
                this.flipX = true;
                this.anims.play('walk_lonk', true);
                this.setVelocityX(-speed);
                break;
            case 'right':
                this.flipX = false;
                this.anims.play('walk_lonk', true);
                this.setVelocityX(speed);
                break;
            case 'up':
                this.anims.play('walk_lonk', true);
                this.setVelocityY(-speed);
                break;
            case 'down':
                this.anims.play('walk_lonk', true);
                this.setVelocityY(speed);
                break;
            default:
                this.anims.play('idle_lonk', true);
                this.setVelocityX(0);
                this.setVelocityY(0);
                break;
        }
    }
}

Phaser.GameObjects.GameObjectFactory.register('lonk', function (this: Phaser.GameObjects.GameObjectFactory, x: number, y: number, texture: string, frame?: string | number) {
    const sprite = new Lonk(this.scene, x, y, texture, frame);

    this.displayList.add(sprite);
    this.updateList.add(sprite);

    this.scene.physics.world.enableBody(sprite, Phaser.Physics.Arcade.DYNAMIC_BODY);

    sprite.setOrigin(0.5, 1);
    sprite.body?.setSize(15, 21, true);
    sprite.body?.setOffset(0, 8);

    return sprite;
});