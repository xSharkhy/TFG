import Load from '../scenes/load';
import Menu from '../scenes/menu';
import Level1 from '../scenes/level1';

const GameConfig: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    backgroundColor: '#000',
    width: 300,
    height: 225,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: true,
        }
    },
    scene: [Load, Menu, Level1],
    scale: {
        zoom: 3,
    },

};

export default GameConfig;