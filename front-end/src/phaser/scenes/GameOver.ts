export default class GameOver extends Phaser.Scene {
    constructor() {
        super({ key: 'GameOver' });
    }

    create() {
        // Set the background color to transparent
        this.cameras.main.setBackgroundColor(0x000000, 0);

        // Add a red-tinted semi-transparent rectangle
        const redTint = this.add.rectangle(
            this.cameras.main.centerX,
            this.cameras.main.centerY,
            this.cameras.main.width,
            this.cameras.main.height,
            0xff0000,
            0.5
        );

        // Add "Game Over" text
        const gameOverText = this.add.text(
            this.cameras.main.centerX,
            this.cameras.main.centerY - 50,
            'Game Over',
            { fontSize: '48px', color: '#ffffff' }
        ).setOrigin(0.5);

        // Add "Restart" button
        const restartButton = this.add.text(
            this.cameras.main.centerX,
            this.cameras.main.centerY + 50,
            'Restart',
            { fontSize: '32px', color: '#ffffff' }
        ).setOrigin(0.5);

        // Make the "Restart" button interactive and go back to the loading scene when clicked
        restartButton.setInteractive({ useHandCursor: true });
        restartButton.on('pointerdown', () => {
            this.scene.start('Menu');
        });
    }
}
