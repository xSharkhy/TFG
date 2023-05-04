import React from "react";
import { Link } from "react-router-dom";

const HomeScreen: React.FC = () => {
    return (
        <div className="flex flex-row items-center justify-center h-screen text-white bg-dark-charcoal">
            <div className="w-1/2">
                <h1 className="mb-8 text-6xl font-bold text-center">
                    Dungeon Crawler Game
                </h1>
                <p className="mb-8 text-xl text-center">
                    Descend into the depths of the dungeon and battle fierce
                    monsters in this fast-paced roguelike game.
                </p>
                <Link
                    to="/game"
                    className="px-4 py-2 font-bold text-white rounded bg-lime-green hover:bg-kelly-green"
                >
                    Play Now
                </Link>
            </div>
            <div className="w-1/2">
                <img
                    src="/dungeon-image.png"
                    alt="Dungeon"
                    className="w-full"
                />
            </div>
        </div>
    );
};

export default HomeScreen;
