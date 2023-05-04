import React from "react";

const Footer: React.FC = () => {
    return (
        <footer className="py-4 text-white bg-dark-charcoal">
            <div className="container flex items-center justify-between mx-auto">
                <div>
                    <a
                        href="/terms-of-service"
                        className="mr-4 hover:text-lime-green"
                    >
                        Terms of Service
                    </a>
                    <a
                        href="/cookie-management"
                        className="mr-4 hover:text-lime-green"
                    >
                        Cookie Management
                    </a>
                    <a href="/privacy-policy" className="hover:text-lime-green">
                        Privacy Policy
                    </a>
                </div>
                <p className="text-sm">
                    2023 &copy; Dungeon Crawler Game. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
