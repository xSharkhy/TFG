import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Footer: React.FC = () => {
    const location = useLocation();
    const [footerStyles, setFooterStyles] = useState("");

    useEffect(() => {
        const updateFooterStyles = () => {
            const footerStylesInBlog = location.pathname.includes("/blog")
                ? "bg-blog-3 dark:bg-blog-0 shadow-principal-0"
                : "bg-principal-3 dark:bg-principal-0 shadow-principal-1 dark:shadow-principal-black";
            setFooterStyles(footerStylesInBlog);
        };

        // Update styles on component mount
        updateFooterStyles();

        // Listen for changes in the URL
        const unlisten = () => {
            updateFooterStyles();
        };
        window.addEventListener("popstate", unlisten);

        // Clean up the listener when the component is unmounted
        return () => {
            window.removeEventListener("popstate", unlisten);
        };
    }, [location]);

    return (
        <footer
            className={`fixed bottom-0 hidden w-full py-4 text-sm shadow-inner md:block dark:text-white ${footerStyles}`}
        >
            <div className="container flex items-center justify-between px-6 mx-auto">
                <div>
                    <a
                        href="/terms"
                        className={`mr-4 hover:text-white ${
                            footerStyles.includes("blog")
                                ? "text-blog-2 dark:text-blog-2"
                                : "text-principal-2"
                        }`}
                    >
                        Terms of Service
                    </a>
                    <a
                        href="/cookies"
                        className={`mr-4 hover:text-white ${
                            footerStyles.includes("blog")
                                ? "text-blog-2 dark:text-blog-2"
                                : "text-principal-2"
                        }`}
                    >
                        Cookie Management
                    </a>
                    <a
                        href="/privacy"
                        className={`mr-4 hover:text-white ${
                            footerStyles.includes("blog")
                                ? "text-blog-2 dark:text-blog-2"
                                : "text-principal-2"
                        }`}
                    >
                        Privacy Policy
                    </a>
                </div>
                <p
                    className={`${
                        footerStyles.includes("blog")
                            ? "text-blog-2 dark:text-blog-1"
                            : "principal-3"
                    }`}
                >
                    2023 &copy; Demon Slayer Game. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
