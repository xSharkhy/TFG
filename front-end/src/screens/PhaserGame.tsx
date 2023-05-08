import React, { useEffect, useRef } from "react";
import Phaser from "phaser";
import GameConfig from "../phaser/config";

// This is the component that will be rendered in the App component
const PhaserGame: React.FC = () => {
    // This is the reference to the div that will contain the Phaser game container
    const gameContainer = useRef(null);

    /*
		The useEffect hook will be called when the component is mounted
		so it does not need to be called manually with an event handler
	*/
    useEffect(() => {
        if (gameContainer.current) {
            /*
				Update the game config object to include the parent property
				to specify the HTML element where the Phaser game should be rendered
			*/
            const config: Phaser.Types.Core.GameConfig = {
                ...GameConfig,
                parent: gameContainer.current,
            };

            // Create a new Phaser game instance with the updated config
            console.log("Initializing Phaser game...");
            const game = new Phaser.Game(config);
            console.log("Phaser game initialized!");
            /* 
				Return a cleanup function to destroy the Phaser game instance
				when the component is unmounted
			*/
            return () => {
                game.destroy(true);
            };
        }
    }, []);

    return <div ref={gameContainer} className="w-full h-full mx-auto my-0" />;
};

export default PhaserGame;
