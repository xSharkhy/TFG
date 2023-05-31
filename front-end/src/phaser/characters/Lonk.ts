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

    private _health = 3;
    private _hammer: Phaser.Physics.Arcade.Group;
    private _isAnimationFlipped = false;

    get health(): number { return this._health; }

    set hammer(hammer: Phaser.Physics.Arcade.Group) {
        this._hammer = hammer;
    }


    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string | number) {
        super(scene, x, y, texture, frame);
        this.anims.play('idle_lonk');
    }

    handleDamage(dir: Phaser.Math.Vector2): void {
        if (this.healthState === HealthState.DAMAGE) return;

        this._health--;

        if (this._health <= 0) {
            this.healthState = HealthState.DEAD;
            this.setTint(0xff0000);
            this.setVelocity(0, 0);
            this.anims.play('idle_lonk');

        } else {
            this.setVelocity(dir.x, dir.y);
            this.setTint(0xff0000);
            this.healthState = HealthState.DAMAGE;
            this.deltaDamage = 0;
        }
    }

    private hammerHit(): void {
        if (this.healthState === HealthState.DAMAGE || this.healthState === HealthState.DEAD) return;
        if (!this._hammer) return;

        const hammer = this._hammer.get(this.x, this.y, 'hammer') as Phaser.Physics.Arcade.Image;
        if (!hammer) return;

        const dx = this.flipX ? -1 : 1;
        const dy = 0;

        const vectorDirection = new Phaser.Math.Vector2(dx, dy).normalize().scale(200);

        // detect what direction the player is facing
        if (this.flipX) {
            hammer.setFlipX(true);
            hammer.setAngle(90);
        } else {
            hammer.setFlipX(false);
            hammer.setAngle(-90);
        }

        hammer.setActive(true);
        hammer.setVisible(true);
        hammer.setRotation(vectorDirection.angle());

        hammer.x += vectorDirection.x;
        hammer.y += vectorDirection.y;

        hammer.setVelocity(vectorDirection.x * 25, vectorDirection.y * 25);
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
        if (Phaser.Input.Keyboard.JustDown(cursors.space!)) {
            this.hammerHit();
            return;
        }

        const speed = 100;
        const direction = cursors.left.isDown ? 'left' : cursors.right.isDown ? 'right' : cursors.up.isDown ? 'up' : cursors.down.isDown ? 'down' : 'idle';

        switch (direction) {
            case 'left':
                this.flipX = true;
                this._isAnimationFlipped = true;
                this.anims.play('walk_lonk', true);
                this.setVelocityX(-speed);
                break;
            case 'right':
                this.flipX = false;
                this._isAnimationFlipped = false;
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