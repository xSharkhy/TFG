import React, { useEffect, useState } from "react";
import axios from "axios";
import { HiOutlineTrash, HiOutlinePencil } from "react-icons/hi";

const BlogShow: React.FC = () => {
    const getId = () => window.location.href.split("/").pop();
    const token = localStorage.getItem("token");
    const isAdmin = localStorage.getItem("role") === "admin";
    const [blog, setBlog] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editedBlog, setEditedBlog] = useState({ title: "", content: "" });

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:5000/blog/show/${getId()}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setBlog(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchBlog();
    }, [token]);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/blog/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            window.location.href = "/blog";
        } catch (error) {
            console.error(error);
        }
    };

    const openEditModal = () => {
        setEditedBlog({ title: blog.title, content: blog.content });
        setIsEditing(true);
    };

    const closeEditModal = () => {
        setIsEditing(false);
    };

    const handleEditInputChange = (event) => {
        const { name, value } = event.target;
        setEditedBlog((prevBlog) => ({ ...prevBlog, [name]: value }));
    };

    const handleEditSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.put(
                `http://localhost:5000/blog/edit/${getId()}`,
                editedBlog,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setBlog(editedBlog);
            setIsEditing(false);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="max-w-2xl px-4 py-16 mx-auto sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
            <div className="lg:grid lg:grid-cols-12 lg:gap-8">
                <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
                    <div>
                        {isAdmin && (
                            <div className="flex justify-around w-full px-4 py-2 border border-white lg:border-black lg:inline-block lg:mr-6">
                                <button
                                    onClick={() => handleDelete(blog._id)}
                                    className="p-2 m-6 text-white bg-red-600 rounded-md shadow-md shadow-red-900 hover:bg-red-500 hover:shadow-red-700"
                                >
                                    <HiOutlineTrash />
                                </button>
                                <button
                                    onClick={openEditModal}
                                    className="p-2 m-6 text-white bg-green-600 rounded-md shadow-md shadow-green-900 hover:bg-green-500 hover:shadow-green-700"
                                >
                                    <HiOutlinePencil />
                                </button>
                            </div>
                        )}
                        <h1 className="mt-1 text-4xl font-extrabold tracking-tight text-gray-50 sm:mt-5 sm:text-6xl lg:mt-6 xl:text-6xl">
                            <span className="block">{blog.title}</span>
                        </h1>
                    </div>
                    <p className="mt-3 text-base text-gray-200 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                        Esto es un ejemplo de párrafo introductorio para el
                        blog. <br /> Lorem ipsum dolor sit amet, consectetur
                        adipiscing elit. Duis viverra sem et urna blandit
                        laoreet eget sit amet metus. Aliquam imperdiet in turpis
                        at consectetur. Curabitur nec lacinia eros. Nulla
                        facilisi. Nulla lobortis enim ut tortor porta pharetra.
                        Nunc nisl arcu, elementum et arcu eu, tincidunt pharetra
                        justo. Nunc feugiat malesuada dui et accumsan. Maecenas
                        sed massa urna. Donec vitae metus imperdiet, finibus
                        nulla vel, aliquet massa. <br />
                        <span
                            id="author"
                            className="block mt-5 text-gray-900"
                        ></span>
                        <br />
                    </p>
                </div>
            </div>
            <hr />
            <div className="mx-auto mt-16 prose prose-lg text-gray-300 prose-indigo">
                <p>
                    {isEditing ? (
                        <textarea
                            value={editedBlog.content}
                            onChange={handleEditInputChange}
                        />
                    ) : (
                        <span>{blog.content}</span>
                    )}
                    <br />
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Duis viverra sem et urna blandit laoreet eget sit amet
                    metus. Aliquam imperdiet in turpis at consectetur. Curabitur
                    nec lacinia eros. Nulla facilisi. Nulla lobortis enim ut
                    tortor porta pharetra. Nunc nisl arcu, elementum et arcu eu,
                    tincidunt pharetra justo. Nunc feugiat malesuada dui et
                    accumsan.
                    <br /> Maecenas sed massa urna. Donec vitae metus imperdiet,
                    finibus nulla vel, aliquet massa. Nullam vel consequat quam.
                    Duis nisi tellus, porttitor finibus viverra tincidunt,
                    semper ac purus. Cras in erat condimentum, porta dolor sed,
                    iaculis felis. Class aptent taciti sociosqu ad litora
                    torquent per conubia nostra, per inceptos himenaeos. Duis
                    volutpat urna faucibus egestas feugiat.
                    <br /> Vestibulum eu velit nec ipsum malesuada cursus sed ac
                    turpis. Curabitur sagittis interdum blandit. Aenean sapien
                    lorem, ullamcorper in commodo ultrices, posuere vulputate
                    purus. Vivamus ullamcorper malesuada ex, sit amet fringilla
                    neque dignissim maximus. Vivamus id imperdiet mauris.
                    <br /> Cras id eros tristique, sodales lorem ac, tincidunt
                    orci. Duis a sem vel quam suscipit dapibus. Nulla ac felis
                    felis. Nunc mattis gravida eleifend. In vel porta arcu.
                    Curabitur non malesuada ligula. Nunc ex ante, interdum nec
                    turpis ut, scelerisque malesuada nulla.overflow-hidden
                    text-ellipsis whitespace-nowrap
                </p>
            </div>

            {/* Edit Modal */}
            {isEditing && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="absolute inset-0 bg-black opacity-50"></div>
                    <div className="relative z-10 p-6 bg-white rounded-lg">
                        <h2 className="mb-4 text-xl font-bold">Edit Blog</h2>
                        <form onSubmit={handleEditSubmit}>
                            <div className="mb-4">
                                <label
                                    htmlFor="title"
                                    className="block mb-1 font-bold text-gray-700"
                                >
                                    Title:
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    value={editedBlog.title}
                                    onChange={handleEditInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orchid"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="content"
                                    className="block mb-1 font-bold text-gray-700"
                                >
                                    Content:
                                </label>
                                <textarea
                                    id="content"
                                    name="content"
                                    value={editedBlog.content}
                                    onChange={handleEditInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orchid"
                                    required
                                ></textarea>
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    onClick={closeEditModal}
                                    className="px-4 py-2 mr-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-orchid"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 text-white border border-transparent rounded-md shadow-sm bg-orchid hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-orchid"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BlogShow;
