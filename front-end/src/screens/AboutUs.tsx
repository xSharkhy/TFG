import React from "react";

const AboutUs: React.FC = () => {
    return (
        <div className="flex flex-row items-center justify-center h-full mt-1 py-36 bg-principal-3 dark:bg-principal-0">
            <div className="flex flex-col items-center justify-center w-2/3">
                <h1 className="mb-8 text-4xl font-bold text-principal-0 dark:text-white">
                    About Us
                </h1>
                <p className="mb-8 text-principal-0 dark:text-white">
                    We are an indie video game studio specializing in creating
                    immersive dungeon crawlers and roguelikes. With a passion
                    for challenging gameplay and rich storytelling, we strive to
                    deliver unique gaming experiences to our players.
                </p>
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 md:grid-cols-2">
                    <div>
                        <h3 className="mb-4 text-2xl font-bold text-principal-0 dark:text-white ">
                            Our Vision
                        </h3>
                        <p className="mb-8 text-principal-0 dark:text-white">
                            At our studio, we believe in the power of
                            interactive storytelling and the thrill of
                            overcoming tough challenges. Our vision is to create
                            captivating games that transport players into
                            atmospheric worlds filled with danger, treasures,
                            and memorable encounters.
                        </p>
                    </div>
                    <div>
                        <h3 className="mb-4 text-2xl font-bold text-principal-0 dark:text-white ">
                            Our Games
                        </h3>
                        <p className="mb-8 text-principal-0 dark:text-white">
                            With a focus on dungeon crawlers and roguelikes, our
                            games combine strategic gameplay, procedurally
                            generated levels, and permadeath mechanics. Each
                            game we create is carefully designed to offer
                            endless replayability and a deep sense of
                            exploration.
                        </p>
                    </div>
                    <div>
                        <h3 className="mb-4 text-2xl font-bold text-principal-0 dark:text-white ">
                            Join Our Community
                        </h3>
                        <p className="mb-8 text-principal-0 dark:text-white">
                            We love engaging with our players and hearing their
                            feedback. Join our community to stay updated on our
                            latest releases, development progress, and upcoming
                            projects. Follow us on social media and be part of
                            the conversation!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
