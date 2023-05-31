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
        <div className="w-full h-screen pt-16 ">
            <div className="px-4 py-8 mx-auto lg:py-16">
                <h2 className="mb-8 text-6xl font-bold text-center text-blog-0 dark:text-white ">
                    Blog de Desarrollo
                </h2>
                <div className="grid justify-center grid-cols-1 gap-12 md:grid-cols-2">
                    {blogs.map((blog) => (
                        <Link
                            to={`/blog/show/${blog._id}`}
                            className="grid items-center grid-cols-1 gap-4 border rounded-lg shadow shadow-gray-900 border-blog-0 bg-blog-3 md:grid-cols-2 hover:bg-blog-2 dark:bg-blog-0 dark:border-blog-0 dark:hover:bg-blog-1"
                            key={blog._id}
                        >
                            <img
                                className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-full md:rounded-none md:rounded-l-lg"
                                src="/ui/sample_blog.jpg"
                                alt=""
                            />
                            <div className="flex flex-col justify-between p-4 leading-normal">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 truncate dark:text-white">
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
