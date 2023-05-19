import React, { useState } from "react";
import axios from "axios";

const ApplyForm = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "http://localhost:5000/jobApplication/create",
                {
                    name,
                    email,
                    message,
                }
            );
            console.log(response.data.message);

            if (response.status === 200) {
                setMessage(response.data.message);
                await new Promise((resolve) => setTimeout(resolve, 500)).then(
                    () => {
                        // clean form
                        setName("");
                        setEmail("");
                        setMessage("");
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
                        htmlFor="name"
                        className="block mb-2 text-sm font-medium text-gray-900"
                    >
                        Nombre
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Juanito Juan"
                        className="form-input focus:border-orchid focus:ring-orchid"
                        required
                    />
                </div>
                <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900"
                >
                    Correo electrónico
                </label>
                <div className="mb-6">
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="john.doe@company.com"
                        className="form-input focus:border-orchid focus:ring-orchid"
                        required
                    />
                </div>
                <div className="mb-6">
                    <label
                        htmlFor="message"
                        className="block mb-2 text-sm font-medium text-gray-900"
                    >
                        Mensaje
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Escribe tu mensaje aquí"
                        className="form-input focus:border-orchid focus:ring-orchid"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full py-2 text-sm font-medium text-center text-white rounded bg-tomato hover:bg-dark-redwood focus:outline-none focus:ring-4"
                >
                    Enviar solicitud!
                </button>
            </form>
        </div>
    );
};

export default ApplyForm;
