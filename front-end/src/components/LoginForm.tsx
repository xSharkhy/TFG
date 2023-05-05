import React, { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
    const [emailOrUsername, setEmailOrUsername] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (emailOrUsername.includes("@")) {
                await login(emailOrUsername, null, password).then(() => {
                    navigate("/"); // Redirect to the main page
                }); // login with email
            } else {
                await login(null, emailOrUsername, password).then(() => {
                    navigate("/"); // Redirect to the main page
                }); // login with username
            }
        } catch (error) {
            alert(error.response.data.message); // Show an error message
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col">
            <label htmlFor="emailOrUsername" className="mb-2">
                Email or Username
            </label>
            <input
                type="text"
                id="emailOrUsername"
                value={emailOrUsername}
                onChange={(e) => setEmailOrUsername(e.target.value)}
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
                Login
            </button>
        </form>
    );
};

export default LoginForm;
