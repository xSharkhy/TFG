import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const BlogIndex = () => {
    const [blogs, setBlogs] = React.useState([]);

    React.useEffect(() => {
        const getBlogs = async () => {
            try {
                const response = await axios.get("http://localhost:5000/blog");
                const blogs = response.data;
                setBlogs(blogs);
            } catch (error) {
                console.error(error);
            }
        };
        getBlogs();
    }, []);

    return (
        <div className="w-full pt-16 bg-gray-900 ">
            <div className="px-4 py-8 mx-auto lg:py-16">
                <h2 className="mb-8 text-6xl font-bold text-center text-white">
                    Blog de Desarrollo
                </h2>
                <div className="grid justify-center grid-cols-1 gap-12 md:grid-cols-2">
                    {blogs.map((blog) => (
                        <Link
                            to={`/blog/show/${blog._id}`}
                            className="grid items-center grid-cols-1 gap-4 bg-gray-800 border border-gray-700 rounded-lg shadow md:grid-cols-2 hover:bg-gray-700"
                            key={blog._id}
                        >
                            <img
                                className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-full md:rounded-none md:rounded-l-lg"
                                src="/ui/sample_blog.jpg"
                                alt=""
                            />
                            <div className="flex flex-col justify-between p-4 leading-normal">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                    {blog.title}
                                </h5>
                                <p className="mb-3 overflow-hidden font-normal text-gray-700 truncate dark:text-gray-400">
                                    <span title={blog.content}>
                                        {blog.content}
                                    </span>
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BlogIndex;
