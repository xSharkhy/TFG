import React from "react";
import { Link } from "react-router-dom";

interface HeaderProps {
    isLoggedIn: boolean;
}

const Header: React.FC<HeaderProps> = ({ isLoggedIn }) => {
    const [isAccountOpen, setIsAccountOpen] = React.useState(false);

    const handleAccountClick = () => {
        setIsAccountOpen(!isAccountOpen);
    };

    const handleLogoutClick = () => {
        // Remove the JWT token from local storage
        localStorage.removeItem("token");

        // Redirect the user to the login page
        window.location.href = "/";
    };

    return (
        <header className="sticky top-0 py-4 text-white bg-dark-charcoal">
            <div className="container flex items-center justify-between mx-auto">
                <h1 className="text-2xl font-bold">
                    <Link to="/">Dungeon Crawler Game</Link>
                </h1>
                <nav>
                    <ul className="flex">
                        {!isLoggedIn ? (
                            <>
                                <li className="mx-12">
                                    <Link
                                        to="/login"
                                        className="hover:text-lime-green"
                                    >
                                        Login
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/signup"
                                        className="px-4 py-2 font-bold text-white rounded bg-forest-green hover:bg-kelly-green"
                                    >
                                        Register
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="mx-12">
                                    <Link
                                        to="/game"
                                        className="hover:text-lime-green"
                                    >
                                        Play
                                    </Link>
                                </li>
                                <li className="relative">
                                    <button
                                        onClick={handleAccountClick}
                                        className="hover:text-lime-green"
                                    >
                                        Account
                                    </button>
                                    {isAccountOpen && (
                                        <ul className="absolute right-0 px-4 py-2 text-white rounded shadow-lg top-full bg-dark-charcoal">
                                            <li className="mb-2">
                                                <Link
                                                    to="/achievements"
                                                    className="hover:text-lime-green"
                                                >
                                                    Achievements
                                                </Link>
                                            </li>
                                            <li>
                                                <button
                                                    onClick={handleLogoutClick}
                                                >
                                                    Logout
                                                </button>
                                            </li>
                                        </ul>
                                    )}
                                </li>
                            </>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
