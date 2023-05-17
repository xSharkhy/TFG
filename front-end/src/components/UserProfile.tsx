/*
    NOT IMPLEMENTED
*/
import React, { useState, useEffect } from "react";
import axios from "axios";

interface User {
    username: string;
    email: string;
}

const UserProfile: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get<User>(
                    "http://localhost:5000/auth/user",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setUser(response.data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUser();
    }, []);

    if (!user) {
        return <div className="text-center">Loading...</div>;
    }

    return (
        <div className="container px-4 py-8 mx-auto">
            <h1 className="mb-4 text-2xl font-bold">User</h1>
            <p className="mb-2 text-lg">
                <span className="font-semibold">Username:</span> {user.username}
            </p>
            <p className="text-lg">
                <span className="font-semibold">Email:</span> {user.email}
            </p>
        </div>
    );
};

export default UserProfile;
