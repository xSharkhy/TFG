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

		this.load.on('complete', () => {
			this.scene.start('Menu');
		}, this);

		// DEBUG
		for (let i = 0; i < 100; i++) {
			this.load.image(`logo-${i}`, '/vite.svg');
		}
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