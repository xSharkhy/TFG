import { createLonkAnims, createLankAnims, createDokAnims, createEldelbarAnims } from '../animations/CharacterAnims';

export default class Menu extends Phaser.Scene {
    private width!: number;
    private height!: number;

    constructor() {
        super('Menu');
    }

    init(): void {
        this.width = this.cameras.main.width;
        this.height = this.cameras.main.height;
    }

    create() {
        // show the 4 characters and their animations
        createLonkAnims(this.anims);
        createLankAnims(this.anims);
        createDokAnims(this.anims);
        createEldelbarAnims(this.anims);

        const title = this.add.image(this.width / 2, 50, 'title');
        title.setScale(0.25);

        const lonk = this.add.sprite(this.width / 2 + 25, this.height / 2 + 12, 'lonk');
        lonk.play('idle_lonk');

        const lank = this.add.sprite(this.width / 2 + 75, this.height / 2, 'lank');
        lank.play('idle_lank');

        const dok = this.add.sprite(this.width / 2 - 25, this.height / 2, 'dok');
        dok.play('idle_dok');

        const eldelbar = this.add.sprite(this.width / 2 - 75, this.height / 2, 'eldelbar');
        eldelbar.play('idle_eldelbar');

        const playButton = this.add.image(this.width / 2, this.height - 50, 'playButton').setInteractive();
        playButton.setScale(0.2);

        this.changeScene(playButton, 'Level1');
    }

    /**
     * When the user clicks on the play text, the scene changes to the game scene
     * @param playButton
     * @param scene 
     */
    changeScene(playButton: Phaser.GameObjects.Image, scene: string) {
        playButton.on('pointerdown', () => {
            this.scene.start(scene);
        });
    }
}
