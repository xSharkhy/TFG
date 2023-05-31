import Phaser from "phaser";

import { sceneEvents } from "../events/EventContext";

export default class Interface extends Phaser.Scene {

    private hearts!: Phaser.GameObjects.Group

    constructor() {
        super({ key: 'Interface' });
    }

    create() {
        this.hearts = this.add.group({
            classType: Phaser.GameObjects.Image
        });

        this.hearts.createMultiple({
            key: 'fullHeart',
            setXY: {
                x: 10,
                y: 10,
                stepX: 16
            },
            quantity: 3
        });

        sceneEvents.on('player_hp_change', this.handlePlayerHealthChanged, this);
        this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
            sceneEvents.off('player_hp_change', this.handlePlayerHealthChanged, this);
        });
    }

    private handlePlayerHealthChanged(healthPoints: number) {
        this.hearts.children.each((gameObject, index) => {
            const heart = gameObject as Phaser.GameObjects.Image;
            if (index < healthPoints) {
                heart.setTexture('fullHeart');
            } else {
                this.cameras.main.shake(300);
                heart.setTexture('emptyHeart');
            }

            if (healthPoints === 0) {
                this.scene.launch('GameOver');
            }

        })
    }
}