import React from "react";

const AboutUs: React.FC = () => {
    return (
        <div className="min-h-screen py-10 bg-gray-900">
            <div className="container px-4 mx-auto">
                <h1 className="mb-8 text-4xl font-bold text-white">About Us</h1>
                <p className="mb-8 text-gray-300">
                    We are an indie video game studio specializing in creating
                    immersive dungeon crawlers and roguelikes. With a passion
                    for challenging gameplay and rich storytelling, we strive to
                    deliver unique gaming experiences to our players.
                </p>
                <h2 className="mb-4 text-2xl font-bold text-white">
                    Our Vision
                </h2>
                <p className="mb-8 text-gray-300">
                    At our studio, we believe in the power of interactive
                    storytelling and the thrill of overcoming tough challenges.
                    Our vision is to create captivating games that transport
                    players into atmospheric worlds filled with danger,
                    treasures, and memorable encounters.
                </p>
                <h2 className="mb-4 text-2xl font-bold text-white">
                    Our Games
                </h2>
                <p className="mb-8 text-gray-300">
                    With a focus on dungeon crawlers and roguelikes, our games
                    combine strategic gameplay, procedurally generated levels,
                    and permadeath mechanics. Each game we create is carefully
                    designed to offer endless replayability and a deep sense of
                    exploration.
                </p>
                <h2 className="mb-4 text-2xl font-bold text-white">
                    Join Our Community
                </h2>
                <p className="mb-8 text-gray-300">
                    We love engaging with our players and hearing their
                    feedback. Join our community to stay updated on our latest
                    releases, development progress, and upcoming projects.
                    Follow us on social media and be part of the conversation!
                </p>
                <div className="flex justify-center">
                    <a
                        href="https://twitter.com/yourstudio"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-600"
                    >
                        Follow us on Twitter
                    </a>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
