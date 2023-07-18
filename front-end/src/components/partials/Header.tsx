import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";

interface HeaderProps {
    isLoggedIn: boolean;
}

const Header: React.FC<HeaderProps> = ({ isLoggedIn }) => {
    const [isAccountOpen, setIsAccountOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [headerStyles, setHeaderStyles] = useState("");
    const accountRef = useRef<HTMLDivElement>(null);
    const location = useLocation();

    const isAdmin =
        JSON.parse(localStorage.getItem("authData") || "{}").role == "admin";

    const handleAccountClick = () => {
        setIsAccountOpen(!isAccountOpen);
    };

    const handleMobileMenuClick = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const handleLogoutClick = () => {
        localStorage.removeItem("authData");
        window.location.href = "/";
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                accountRef.current &&
                !accountRef.current.contains(event.target as Node)
            ) {
                setIsAccountOpen(false);
            }
        };

        window.addEventListener("click", handleClickOutside);

        return () => {
            window.removeEventListener("click", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const updateHeaderStyles = () => {
            const headerStylesInBlog = location.pathname.includes("/blog")
                ? "bg-blog-3 dark:bg-blog-0 text-blog-2 dark:text-blog-2"
                : "bg-principal-3 dark:bg-principal-0 text-principal-2 dark:text-principal-2";
            setHeaderStyles(headerStylesInBlog);

            // Toggle document.body class
            if (headerStylesInBlog.includes("blog")) {
                document.body.classList.add("bg-blog-3", "dark:bg-blog-0");
                document.body.classList.remove(
                    "bg-principal-3",
                    "dark:bg-principal-0"
                );
            } else {
                document.body.classList.add(
                    "bg-principal-3",
                    "dark:bg-principal-0"
                );
                document.body.classList.remove("bg-blog-3", "dark:bg-blog-0");
            }
        };

        // Update styles on component mount
        updateHeaderStyles();

        // Listen for changes in the URL
        const unlisten = () => {
            updateHeaderStyles();
        };
        window.addEventListener("popstate", unlisten);

        // Clean up the listener when the component is unmounted
        return () => {
            window.removeEventListener("popstate", unlisten);
        };
    }, [location]);

    return (
        <header className={`z-50 shadow-sm shadow-black ${headerStyles}`}>
            <div className="px-2 mx-auto sm:px-6 lg:px-8">
                <div className="relative flex items-center justify-between h-16">
                    <div
                        className="absolute inset-y-0 left-0 flex items-center sm:hidden"
                        onClick={handleMobileMenuClick}
                    >
                        <button
                            type="button"
                            className="inline-flex items-center justify-center p-2 rounded-md hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                            aria-controls="mobile-menu"
                            aria-expanded="false"
                        >
                            <span className="sr-only">Open main menu</span>
                            <svg
                                className="block w-6 h-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                                />
                            </svg>
                            <svg
                                className="hidden w-6 h-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                    <div className="flex items-center justify-center flex-1 sm:items-stretch sm:justify-start">
                        <div className="flex items-center flex-shrink-0">
                            <picture>
                                <source
                                    srcSet="/ui/ICONO.svg"
                                    media="(prefers-color-scheme: dark)"
                                />
                                <img
                                    className="w-auto h-8 lg:hidden"
                                    src="/ui/ICONO-DARK.svg"
                                    alt="Revels"
                                />
                                <img
                                className="hidden w-auto h-8 lg:block"
                                src="/ui/ICONO.svg"
                                alt="Revels"
                            />
                            </picture>
                        </div>
                        <div className="hidden sm:ml-6 sm:block">
                            <div className="flex space-x-4">
                                <Link
                                    to="/"
                                    className="px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-md"
                                    aria-current="page"
                                >
                                    Inicio
                                </Link>
                                <Link
                                    to="/about"
                                    className={`px-3 py-2 text-sm font-medium rounded-md ${
                                        headerStyles.includes("blog")
                                            ? "text-blog-0 dark:text-blog-3 hover:bg-blog-0 hover:text-blog-3 dark:hover:bg-blog-3 dark:hover:text-blog-0 "
                                            : "text-principal-0 dark:text-principal-3 hover:bg-principal-0 hover:text-principal-3 dark:hover:bg-principal-3 dark:hover:text-principal-0 "
                                    }`}
                                >
                                    Nosotros
                                </Link>
                                <Link
                                    to="/blog"
                                    className={`px-3 py-2 text-sm font-medium rounded-md ${
                                        headerStyles.includes("blog")
                                            ? "text-blog-0 dark:text-blog-3 hover:bg-blog-0 hover:text-blog-3 dark:hover:bg-blog-3 dark:hover:text-blog-0 "
                                            : "text-principal-0 dark:text-principal-3 hover:bg-principal-0 hover:text-principal-3 dark:hover:bg-principal-3 dark:hover:text-principal-0 "
                                    }`}
                                >
                                    Blog
                                </Link>
                                <Link
                                    to="/foro"
                                    className={`px-3 py-2 text-sm font-medium rounded-md ${
                                        headerStyles.includes("blog")
                                            ? "text-blog-0 dark:text-blog-3 hover:bg-blog-0 hover:text-blog-3 dark:hover:bg-blog-3 dark:hover:text-blog-0 "
                                            : "text-principal-0 dark:text-principal-3 hover:bg-principal-0 hover:text-principal-3 dark:hover:bg-principal-3 dark:hover:text-principal-0 "
                                    }`}
                                >
                                    Foro
                                </Link>
                                <Link
                                    to="/jobApplication"
                                    className={`px-3 py-2 text-sm font-medium rounded-md ${
                                        headerStyles.includes("blog")
                                            ? "text-blog-0 dark:text-blog-3 hover:bg-blog-0 hover:text-blog-3 dark:hover:bg-blog-3 dark:hover:text-blog-0 "
                                            : "text-principal-0 dark:text-principal-3 hover:bg-principal-0 hover:text-principal-3 dark:hover:bg-principal-3 dark:hover:text-principal-0 "
                                    }`}
                                >
                                    Vacantes
                                </Link>
                                <Link
                                    to="/user"
                                    className={`px-3 py-2 text-sm font-medium rounded-md ${
                                        headerStyles.includes("blog")
                                            ? "text-blog-0 dark:text-blog-3 hover:bg-blog-0 hover:text-blog-3 dark:hover:bg-blog-3 dark:hover:text-blog-0 "
                                            : "text-principal-0 dark:text-principal-3 hover:bg-principal-0 hover:text-principal-3 dark:hover:bg-principal-3 dark:hover:text-principal-0 "
                                    }`}
                                >
                                    Miembros
                                </Link>
                                <Link
                                    to="/game"
                                    className={`px-3 py-2 text-sm font-medium rounded-md ${
                                        headerStyles.includes("blog")
                                            ? "text-blog-0 dark:text-blog-3 hover:bg-blog-0 hover:text-blog-3 dark:hover:bg-blog-3 dark:hover:text-blog-0 "
                                            : "text-principal-0 dark:text-principal-3 hover:bg-principal-0 hover:text-principal-3 dark:hover:bg-principal-3 dark:hover:text-principal-0 "
                                    }`}
                                >
                                    Juega!
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        <div
                            className="relative ml-3"
                            ref={accountRef}
                            onClick={handleAccountClick}
                        >
                            <div>
                                <button
                                    type="button"
                                    className="flex text-sm bg-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                    id="user-menu-button"
                                    aria-expanded="false"
                                    aria-haspopup="true"
                                >
                                    <span className="sr-only">
                                        Open user menu
                                    </span>
                                    <img
                                        className="w-8 h-8 rounded-full"
                                        src="/ui/Sample_profile.jpg"
                                        alt=""
                                    />
                                </button>
                            </div>
                            {isAccountOpen && (
                                <div
                                    className="absolute right-0 z-10 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                                    role="menu"
                                    aria-orientation="vertical"
                                    aria-labelledby="user-menu-button"
                                >
                                    {isLoggedIn ? (
                                        <>
                                            {isAdmin && (
                                                <>
                                                    <Link
                                                        to="/blog/create"
                                                        className="block px-4 py-2 text-sm text-gray-700"
                                                        role="menuitem"
                                                        id="user-menu-item-0"
                                                    >
                                                        Crear entrada
                                                    </Link>
                                                    <Link
                                                        to="/jobApplication/index"
                                                        className="block px-4 py-2 text-sm text-gray-700"
                                                        role="menuitem"
                                                        id="user-menu-item-0"
                                                    >
                                                        Ver solicitudes
                                                    </Link>
                                                    <hr className="my-1" />
                                                </>
                                            )}
                                            <Link
                                                to="/account"
                                                className="block px-4 py-2 text-sm text-gray-700"
                                                role="menuitem"
                                                id="user-menu-item-0"
                                            >
                                                Perfil
                                            </Link>
                                            <Link
                                                to="/"
                                                onClick={handleLogoutClick}
                                                className="block px-4 py-2 text-sm text-gray-700"
                                                role="menuitem"
                                                id="user-menu-item-1"
                                            >
                                                Cerrar sesión
                                            </Link>
                                        </>
                                    ) : (
                                        <>
                                            <Link
                                                to="/login"
                                                className="block px-4 py-2 text-sm text-gray-700"
                                                role="menuitem"
                                                id="user-menu-item-0"
                                            >
                                                Iniciar sesión
                                            </Link>
                                            <Link
                                                to="/register"
                                                className="block px-4 py-2 text-sm text-gray-700"
                                                role="menuitem"
                                                id="user-menu-item-1"
                                            >
                                                Registrarse
                                            </Link>
                                        </>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {isMobileMenuOpen && (
                <div className="sm:hidden" id="mobile-menu">
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        <Link
                            to="#"
                            className={`block px-3 py-2 text-base font-medium rounded-md ${
                                headerStyles.includes("blog")
                                    ? "text-blog-0 dark:text-blog-3 hover:bg-blog-0 hover:text-blog-3 dark:hover:bg-blog-3 dark:hover:text-blog-0 "
                                    : "text-principal-0 dark:text-principal-3 hover:bg-principal-0 hover:text-principal-3 dark:hover:bg-principal-3 dark:hover:text-principal-0 "
                            }`}
                            aria-current="page"
                        >
                            Inicio
                        </Link>
                        <Link
                            to="/about"
                            className={`block px-3 py-2 text-base font-medium rounded-md ${
                                headerStyles.includes("blog")
                                    ? "text-blog-0 dark:text-blog-3 hover:bg-blog-0 hover:text-blog-3 dark:hover:bg-blog-3 dark:hover:text-blog-0 "
                                    : "text-principal-0 dark:text-principal-3 hover:bg-principal-0 hover:text-principal-3 dark:hover:bg-principal-3 dark:hover:text-principal-0 "
                            }`}
                        >
                            Nosotros
                        </Link>
                        <Link
                            to="/blog"
                            className={`block px-3 py-2 text-base font-medium rounded-md ${
                                headerStyles.includes("blog")
                                    ? "text-blog-0 dark:text-blog-3 hover:bg-blog-0 hover:text-blog-3 dark:hover:bg-blog-3 dark:hover:text-blog-0 "
                                    : "text-principal-0 dark:text-principal-3 hover:bg-principal-0 hover:text-principal-3 dark:hover:bg-principal-3 dark:hover:text-principal-0 "
                            }`}
                        >
                            Blog
                        </Link>
                        <Link
                            to="/foro"
                            className={`block px-3 py-2 text-base font-medium rounded-md ${
                                headerStyles.includes("blog")
                                    ? "text-blog-0 dark:text-blog-3 hover:bg-blog-0 hover:text-blog-3 dark:hover:bg-blog-3 dark:hover:text-blog-0 "
                                    : "text-principal-0 dark:text-principal-3 hover:bg-principal-0 hover:text-principal-3 dark:hover:bg-principal-3 dark:hover:text-principal-0 "
                            }`}
                        >
                            Foro
                        </Link>
                        <Link
                            to="/jobApplication"
                            className={`block px-3 py-2 text-base font-medium rounded-md ${
                                headerStyles.includes("blog")
                                    ? "text-blog-0 dark:text-blog-3 hover:bg-blog-0 hover:text-blog-3 dark:hover:bg-blog-3 dark:hover:text-blog-0 "
                                    : "text-principal-0 dark:text-principal-3 hover:bg-principal-0 hover:text-principal-3 dark:hover:bg-principal-3 dark:hover:text-principal-0 "
                            }`}
                        >
                            Vacantes
                        </Link>
                        <Link
                            to="/user"
                            className={`block px-3 py-2 text-base font-medium rounded-md ${
                                headerStyles.includes("blog")
                                    ? "text-blog-0 dark:text-blog-3 hover:bg-blog-0 hover:text-blog-3 dark:hover:bg-blog-3 dark:hover:text-blog-0 "
                                    : "text-principal-0 dark:text-principal-3 hover:bg-principal-0 hover:text-principal-3 dark:hover:bg-principal-3 dark:hover:text-principal-0 "
                            }`}
                        >
                            Miembros
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
