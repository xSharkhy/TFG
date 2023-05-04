import React from "react";
import { Link } from "react-router-dom";

const HomeScreen: React.FC = () => {
    return (
        <div className="flex flex-row items-center justify-center h-screen text-white bg-dark-charcoal">
            <div className="flex flex-col items-center justify-center w-1/2">
                <h1 className="mb-8 text-6xl font-bold text-center">
                    Dungeon Crawler Game
                </h1>
                <p className="px-12 mb-8 text-xl text-center">
                    Descend into the depths of the dungeon and battle fierce
                    monsters in this fast-paced roguelike game.
                </p>
                <Link
                    to="/game"
                    className="px-6 py-3 text-xl font-bold text-white rounded bg-lime-green hover:bg-kelly-green"
                >
                    Play Now
                </Link>
            </div>
            <div className="flex items-center justify-center w-1/2">
                <img
                    src="https://img.itch.zone/aW1hZ2UvMzA5MDI4LzE1MTgyMjkuZ2lm/original/qGmWJo.gif"
                    alt="Dungeon"
                    className="w-auto "
                />
            </div>
        </div>
    );
};

export default HomeScreen;
