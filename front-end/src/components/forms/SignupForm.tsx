import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const SignupForm = () => {
    const [username, setUsername] = useState("");
    const [birthday, setBirthday] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password != confirmPassword) {
            console.log(password, confirmPassword);
            alert("Las contraseñas no coinciden");
            return;
        }
        try {
            const response = await axios.post(
                "http://localhost:5000/auth/register",
                {
                    username,
                    birthday,
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
        <div className="grid self-center w-full p-4 my-16 bg-gray-100 border border-gray-500 rounded-lg shadow shadow-gray-300 sm:p-6 md:p-8 md:mx-auto md:max-w-xl">
            <form onSubmit={handleSubmit}>
                <div className="grid gap-6 mb-6 md:grid-cols-2">
                    <div className="w-full place-self-end">
                        <label
                            htmlFor="username"
                            className="block mb-2 text-sm font-medium text-gray-900"
                        >
                            Nombre de usuario
                        </label>
                        <div className="flex">
                            <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md">
                                @
                            </span>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="block w-full min-w-0 flex-1 rounded-none rounded-r-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-orchid focus:ring-orchid"
                                placeholder="Juancito13"
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <label
                            htmlFor="birthday"
                            className="block mb-2 text-sm font-medium text-gray-900"
                        >
                            Fecha de nacimiento{" "}
                            <span className="font-semibold text-dark-slate-blue-">
                                {" "}
                                * Formato (DD/MM/AAAA)
                            </span>
                        </label>
                        <input
                            type="date"
                            id="birthday"
                            name="birthday"
                            value={birthday}
                            onChange={(e) => setBirthday(e.target.value)}
                            className="form-input focus:border-orchid focus:ring-orchid"
                            placeholder="DD/MM/AAAA"
                            required
                        />
                    </div>
                </div>
                <div>
                    <div className="mb-6">
                        <label
                            htmlFor="email"
                            className="block mb-2 text-sm font-medium text-gray-900"
                        >
                            Correo electrónico
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                    <div className="mb-6">
                        <label
                            htmlFor="confirm_password"
                            className="block mb-2 text-sm font-medium text-gray-900"
                        >
                            Confirmar contraseña
                        </label>
                        <input
                            type="password"
                            id="confirm_password"
                            name="password_confirmation"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
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
                                value=""
                                className="w-4 h-4 border border-gray-300 rounded focus:ring-3 bg-gray-50 focus:ring-dark-raspberry"
                                required
                            />
                        </div>
                        <label
                            htmlFor="remember"
                            className="ml-2 text-sm font-medium text-gray-900"
                        >
                            Estoy de acuerdo con la{" "}
                            <Link
                                to="/privacy-policy"
                                className=" text-sienna hover:underline"
                            >
                                política de privacidad
                            </Link>
                            .
                        </label>
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 text-sm font-medium text-center text-white rounded bg-tomato hover:bg-dark-redwood focus:outline-none focus:ring-4"
                    >
                        Registrarse!
                    </button>
                    <span className="block mt-4 text-xs font-medium text-right">
                        Ya estás registrado?{" "}
                        <Link
                            to="/login"
                            className="font-bold text-tomato hover:text-dark-redwood hover:underline"
                        >
                            {" "}
                            Accede.
                        </Link>
                    </span>
                </div>
            </form>
        </div>
    );
};

export default SignupForm;
