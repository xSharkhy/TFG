import Load from '../scenes/load';
import Menu from '../scenes/menu';
import Level1 from '../scenes/level1';

const GameConfig: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	backgroundColor: '#125555',
	width: 800,
	height: 600,
	scene: [Load, Menu, Level1]
};

export default GameConfig;