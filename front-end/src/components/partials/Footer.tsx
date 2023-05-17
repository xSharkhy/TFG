import React from "react";

const Footer: React.FC = () => {
    return (
        <footer className="fixed bottom-0 w-full py-4 text-white bg-dark-charcoal">
            <div className="container flex items-center justify-between mx-auto">
                <div>
                    <a href="/terms" className="mr-4 hover:text-lime-green">
                        Terms of Service
                    </a>
                    <a href="/cookies" className="mr-4 hover:text-lime-green">
                        Cookie Management
                    </a>
                    <a href="/privacy" className="hover:text-lime-green">
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
