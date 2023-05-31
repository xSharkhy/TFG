import Phaser from 'phaser';
import { Load, Menu, Level1, Interface } from './scenes';
import GameOver from './scenes/GameOver';

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
    scene: [Load, Menu, Level1, Interface, GameOver],
    scale: {
        zoom: 3,
    },

};

export default GameConfig;