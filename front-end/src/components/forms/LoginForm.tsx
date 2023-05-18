import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const LoginForm = () => {
    const [emailOrUsername, setEmailOrUsername] = useState("");
    const [password, setPassword] = useState("");

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
                localStorage.setItem("user", response.data.role);
                console.log("User logged in successfully");
                // Wait htmlFor the token to be stored
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
        <div className="grid self-center w-full p-4 my-16 bg-gray-100 border border-gray-500 rounded-lg shadow shadow-gray-300 sm:p-6 md:p-8 md:mx-auto md:max-w-xl">
            <form onSubmit={handleSubmit}>
                <div className="mb-6">
                    <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-900"
                    >
                        Correo electrónico o nombre de usuario
                    </label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        value={emailOrUsername}
                        onChange={(e) => setEmailOrUsername(e.target.value)}
                        className="form-input focus:border-orchid focus:ring-orchid"
                        placeholder="john.doe@company.com"
                        required
                    />
                </div>
                <div className="mb-6">
                    <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-900"
                    >
                        Contraseña
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="form-input focus:border-orchid focus:ring-orchid"
                        placeholder="•••••••••"
                        required
                    />
                </div>
                <div className="flex items-start mb-6">
                    <div className="flex items-center h-5">
                        <input
                            id="remember"
                            type="checkbox"
                            name="remember"
                            className="w-4 h-4 border border-gray-300 rounded focus:ring-3 bg-gray-50 focus:border-orchid focus:ring-orchid"
                        />
                    </div>
                    <label
                        htmlFor="remember"
                        className="ml-2 text-sm font-medium text-gray-900"
                    >
                        Mantener la sesión iniciada.
                    </label>
                </div>
                <button
                    type="submit"
                    className="w-full py-2 text-sm font-medium text-center text-white rounded bg-tomato hover:bg-dark-redwood focus:outline-none focus:ring-4"
                >
                    Iniciar Sesión!
                </button>
                <span className="block mt-4 text-xs font-medium text-right">
                    Aún no eres usuario?{" "}
                    <Link
                        to="/login"
                        className="font-bold text-tomato hover:text-dark-redwood hover:underline"
                    >
                        {" "}
                        Regístrate aquí!
                    </Link>
                </span>
            </form>
        </div>
    );
};

export default LoginForm;
