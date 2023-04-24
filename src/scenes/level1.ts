export default class Level1 extends Phaser.Scene {
	constructor() {
		super('Level1');
	}

	preload() {
		this.load.image('vite', 'assets/images/vite.svg');
	}

	create() {
		const { width, height } = this.scale;
		const centerX = width * 0.5;
		const centerY = height * 0.5;
		const logo = this.add.image(centerX, centerY, 'vite');
	}
}