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
        const logo = this.add.image(this.width / 2, 70, 'vite.svg');

        const playText: Phaser.GameObjects.Text = this.add.text(50, this.height / 2, 'Play', {
            fontSize: '1rem', color: '#fff'
        }).setInteractive();

        this.changeScene(playText, 'Level1');
    }

    /**
     * When the user clicks on the play text, the scene changes to the game scene
     * @param playText 
     * @param scene 
     */
    changeScene(playText: Phaser.GameObjects.Text, scene: string) {
        playText.on('pointerdown', () => {
            this.scene.start(scene);
        });
    }
}
