import React, { useEffect } from "react";
import Phaser from "phaser";

const PhaserGame: React.FC = () => {
	useEffect(() => {
		const config: Phaser.Types.Core.GameConfig = {
			type: Phaser.AUTO,
			width: 800,
			height: 600,
			parent: "phaser-game",
			scene: {
				create: createScene,
			},
		};

		new Phaser.Game(config);

		function createScene() {
			this.add.text(50, 50, "Hello Phaser!", { font: "48px Arial", fill: "#000000" });
		}

	}, []);

	return <div id="phaser-game" />;
};

export default PhaserGame;
