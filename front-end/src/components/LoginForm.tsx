import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
    const [emailOrUsername, setEmailOrUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "http://localhost:5000/auth/login",
                {
                    emailOrUsername,
                    password,
                }
            );
            console.log(response.data.message);

            if (response.status === 200) {
                localStorage.setItem("token", response.data.token);
                console.log("User logged in successfully");
                // Wait for the token to be stored
                await new Promise((resolve) => setTimeout(resolve, 500)).then(
                    () => {
                        navigate("/"); // Redirect to the home page
                    }
                );
            }
        } catch (error) {
            alert(error.response.data.message); // Show an error message
        }
    };

    return (
        <div className="grid self-center w-full p-4 my-20 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 lg:mx-auto lg:max-w-xl">
            <form onSubmit={handleSubmit} className="flex flex-col">
                <label htmlFor="emailOrUsername" className="mb-2">
                    Email or Username
                </label>
                <input
                    type="text"
                    id="emailOrUsername"
                    value={emailOrUsername}
                    onChange={(e) => setEmailOrUsername(e.target.value)}
                    className="p-2 mb-4 border-2 border-gray-300 rounded-md"
                />
                <label htmlFor="password" className="mb-2">
                    Password
                </label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="p-2 mb-4 border-2 border-gray-300 rounded-md"
                />
                <button type="submit" className="p-2 text-white bg-blue-500">
                    Login
                </button>
            </form>
        </div>
    );
};

export default LoginForm;
