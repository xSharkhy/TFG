enum Movement {
    LEFT,
    RIGHT,
    UP,
    DOWN,
}

const randomDirection = (direction: Movement) => {
    let newDirection: Movement = Phaser.Math.Between(0, 3);

    while (newDirection === direction) {
        newDirection = Phaser.Math.Between(0, 3);
    }

    return newDirection;
}

export default class Chort extends Phaser.Physics.Arcade.Sprite {

    private direction: Movement;
    private moveEvent: Phaser.Time.TimerEvent;


    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string | number) {
        super(scene, x, y, texture, frame);

        this.anims.play('idle_chort', true);

        scene.physics.world.on(Phaser.Physics.Arcade.Events.TILE_COLLIDE, this.handleTileCollision, this);

        this.moveEvent = scene.time.addEvent({
            delay: Phaser.Math.Between(1000, 3000),
            callback: () => {
                this.anims.play('walk_chort', true);
                this.direction = randomDirection(this.direction);
            },
            loop: true
        });
    }

    destroy(fromScene?: boolean): void {
        this.moveEvent.destroy();
        super.destroy(fromScene);
    }

    preUpdate(time: number, delta: number): void {
        super.preUpdate(time, delta);

        const speed = 50;
        switch (this.direction) {
            case Movement.LEFT:
                this.flipX = true;
                this.setVelocityX(-speed);
                break;
            case Movement.RIGHT:
                this.flipX = false;
                this.setVelocityX(speed);
                break;
            case Movement.UP:
                this.setVelocityY(-speed);
                break;
            case Movement.DOWN:
                this.setVelocityY(speed);
                break;
        }
    }

    private handleTileCollision(gameObject: Phaser.GameObjects.GameObject): void {
        if (gameObject !== this) return;

        this.direction = randomDirection(this.direction);
    }
}