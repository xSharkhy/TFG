import { useState, useEffect } from "react";

export const useAuth = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            // TODO: check if token is valid
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    return isLoggedIn;
};
