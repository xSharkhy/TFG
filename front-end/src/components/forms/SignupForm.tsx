import React, { useState } from "react";
import axios from "axios";

const SignupForm = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "http://localhost:5000/auth/signup",
                {
                    username,
                    email,
                    password,
                }
            );
            console.log(response.data.message);

            if (response.status === 201) {
                localStorage.setItem("token", response.data.token);
                console.log("User created successfully");
                // Wait for the token to be stored
                await new Promise((resolve) => setTimeout(resolve, 500)).then(
                    () => {
                        window.location.href = "/"; // Redirect to the home page
                    }
                );
            }
        } catch (error) {
            alert(error.response.data.message); // Show an error message
        }
    };

    return (
        <div className="grid self-center w-full p-4 my-20 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 md:max-w-lg lg:mx-auto lg:max-w-xl">
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
                <button
                    type="submit"
                    className="p-2 text-white rounded-md bg-dark-raspberry"
                >
                    Sign up
                </button>
            </form>
        </div>
    );
};

export default SignupForm;
