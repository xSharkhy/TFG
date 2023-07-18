import React, { useEffect, useState } from "react";
import axios from "axios";

const BlogCreate = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [author, setAuthor] = useState("");
    const [admins, setAdmins] = useState([]);
    // get authData from local storage and extract the value of the token key
    const token = JSON.parse(localStorage.getItem("authData") || "{}").token;

    useEffect(() => {
        const getAdmins = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:5000/user/index"
                );
                const users = response.data;
                const admins = users.filter((user) => user.role === "admin");
                setAdmins(admins);
            } catch (error) {
                console.error(error);
            }
        };
        getAdmins();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "http://localhost:5000/blog/create",
                { title, content, author },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log(response.data.message);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="h-screen pt-16 ">
            <div className="max-w-2xl px-4 py-8 mx-auto lg:py-16">
                <h2 className="mb-4 text-xl font-bold text-blog-0 dark:text-white">
                    Añadir nuevo Post
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                        <div className="sm:col-span-2">
                            <label
                                htmlFor="title"
                                className="block mb-2 text-sm font-medium text-blog-0 dark:text-white"
                            >
                                Título del Post
                            </label>
                            <input
                                type="text"
                                name="brand"
                                id="brand"
                                className="block rounded-md w-full p-2.5 border text-blog-0 dark:text-white placeholder-gray-400 bg-gray-700 border-gray-600  focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Título del Post"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div className="sm:col-span-2">
                            <label
                                htmlFor="content"
                                className="block mb-2 text-sm font-medium rounded-md text-blog-0 dark:text-white"
                            >
                                Contenido del Post
                            </label>
                            <textarea
                                name="content"
                                id="content"
                                className="block rounded-md w-full p-2.5 border text-blog-0 dark:text-white placeholder-gray-400 bg-gray-700 border-gray-600  focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Contenido del Post"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                            ></textarea>
                        </div>
                        <div className="sm:col-span-2">
                            <label
                                htmlFor="author"
                                className="block mb-2 text-sm font-medium rounded-md text-blog-0 dark:text-white"
                            >
                                Autor del Post
                            </label>
                            <select
                                name="author"
                                id="author"
                                className="block rounded-md w-full p-2.5 border text-white placeholder-gray-400 bg-gray-700 border-gray-600  focus:ring-blue-500 focus:border-blue-500"
                                value={author}
                                onChange={(e) => setAuthor(e.target.value)}
                            >
                                <option value="">Selecciona un autor</option>
                                {admins.map((admin) => (
                                    <option
                                        key={admin._id}
                                        value={admin.username}
                                    >
                                        {admin.username}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="sm:col-span-2">
                            <button
                                type="submit"
                                className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md bg-blog-2 dark:hover:bg-blog-3 hover:bg-blog-1 dark:hover:text-blog-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                            >
                                Añadir Post
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BlogCreate;
