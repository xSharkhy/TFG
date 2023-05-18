import { useState, useEffect } from 'react';
import axios from 'axios';

interface AuthData {
    loggedIn: boolean;
    admin: boolean;
}

const useAuth = () => {
    const [authData, setAuthData] = useState<AuthData>({ loggedIn: false, admin: false });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAuthData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/auth/verify', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });
                setAuthData(response.data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchAuthData();
    }, []);

    return { authData, loading };
};

export default useAuth;
