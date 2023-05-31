import React from "react";
import { Link } from "react-router-dom";

const HomeScreen: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center h-full gap-16 pt-48 mt-1 md:w-full md:gap-2 md:flex-row text-principal-0 dark:text-white py-36 bg-principal-3 dark:bg-principal-0">
            <div className="flex flex-col items-center justify-center md:w-1/2">
                <h1 className="mb-8 text-6xl font-bold text-center">
                    Demon Slayer Game
                </h1>
                <p className="px-12 mb-8 text-xl text-center">
                    Descend into the depths of the dungeon and battle fierce
                    monsters in this fast-paced roguelike game. <br />
                    <br />
                    Made with React, TypeScript, and Phaser.
                </p>
                <Link
                    to="/game"
                    className="px-6 py-3 text-xl font-bold text-white duration-200 rounded bg-principal-1 hover:bg-principal-2 hover:scale-105"
                >
                    Play Now
                </Link>
            </div>
            <div className="flex items-center justify-center w-1/2">
                <img
                    src="https://img.itch.zone/aW1hZ2UvMzA5MDI4LzE1MTgyMjkuZ2lm/original/qGmWJo.gif"
                    alt="Dungeon"
                    className="w-auto shadow-sm shadow-principal-1"
                />
            </div>
        </div>
    );
};

export default HomeScreen;
