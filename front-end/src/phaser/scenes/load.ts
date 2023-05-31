import Phaser from 'phaser';

export default class Load extends Phaser.Scene {
    private loadingBar!: Phaser.GameObjects.Graphics;
    private progressBar!: Phaser.GameObjects.Graphics;

    constructor() {
        super('Load');
    }

    preload(): void {
        this.cameras.main.setBackgroundColor(0x000);
        this.createLoadingBar();

        this.load.on('progress', (value: number) => {
            this.progressBar.clear();
            this.progressBar.fillStyle(0x000, 1);
            this.progressBar.fillRect(
                this.cameras.main.width / 4,
                this.cameras.main.height / 2 - 16,
                (this.cameras.main.width / 2) * value,
                16
            );
        }, this);


        // DEBUG
        for (let i = 0; i < 100; i++) {
            this.load.image(`logo-${i}`, '/vite.svg');
        }

        // Load assets
        this.load.image('tiles', 'tiles/dungeon_tiles.png');
        this.load.tilemapTiledJSON('arena', 'tiles/level-01.json');

        this.load.atlas('lonk', 'characters/lonk.png', 'characters/lonk.json');
        this.load.atlas('lank', 'characters/lank.png', 'characters/lank.json');
        this.load.atlas('dok', 'characters/dok.png', 'characters/dok.json');
        this.load.atlas('eldelbar', 'characters/eldelbar.png', 'characters/eldelbar.json');

        this.load.atlas('chort', 'enemies/chort.png', 'enemies/chort.json');

        this.load.image('fullHeart', 'ui/ui_heart_full.png');
        this.load.image('emptyHeart', 'ui/ui_heart_empty.png');
        this.load.image('playButton', 'ui/ui_play.png');
        this.load.image('title', 'ui/ui_sample_title.png');

        this.load.image('hammer', 'weapons/hammer.png');

        this.load.on('complete', () => {
            this.scene.start('Menu');
        }, this);
    }

    /**
     * Method to create the loading bar
     * @private
     * @memberof Load
     * @return {void}
     * @see https://phaser.io/examples/v3/view/loader/loader-events
     */
    private createLoadingBar(): void {
        this.loadingBar = this.add.graphics();
        this.loadingBar.fillStyle(0xffffff, 1);
        this.loadingBar.fillRect(
            this.cameras.main.width / 4 - 2,
            this.cameras.main.height / 2 - 18,
            this.cameras.main.width / 2 + 4,
            20
        );
        this.progressBar = this.add.graphics();
    }
}