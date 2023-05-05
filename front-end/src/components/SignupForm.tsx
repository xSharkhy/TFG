import React, { useState } from "react";
import { useAuth } from "../auth/AuthContext";

const SignupForm = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { signup } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signup(username, email, password);
            // Redirect to the main page or show a success message
        } catch (error) {
            // Show an error message
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col">
            <label htmlFor="username" className="mb-2">
                Username
            </label>
            <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="p-2 mb-4 border-2 border-gray-300"
            />
            <label htmlFor="email" className="mb-2">
                Email
            </label>
            <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="p-2 mb-4 border-2 border-gray-300"
            />
            <label htmlFor="password" className="mb-2">
                Password
            </label>
            <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="p-2 mb-4 border-2 border-gray-300"
            />
            <button type="submit" className="p-2 text-white bg-blue-500">
                Sign up
            </button>
        </form>
    );
};

export default SignupForm;
