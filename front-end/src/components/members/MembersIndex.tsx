import React, { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const MembersIndex = () => {
    const [members, setMembers] = React.useState([]);
    const isLoggedIn = localStorage.getItem("token") != undefined;

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:5000/user/index"
                );
                setMembers(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchMembers();
    }, []);

    return (
        <div className="grid grid-cols-1 gap-4 py-24 md:grid-cols-2 lg:grid-cols-3">
            {members.map((member) => (
                <div
                    key={member._id}
                    className="p-4 m-4 bg-white rounded-lg shadow-lg "
                >
                    <div className="flex items-center">
                        <img
                            className="object-cover w-16 h-16 rounded-full"
                            src="/ui/Sample_profile.jpg"
                            alt="Sample Profile Picture"
                        />
                        <div className="ml-4">
                            <h3 className="text-lg font-semibold text-gray-900">
                                {member.username}
                            </h3>
                            <p className="text-sm font-medium text-gray-500">
                                {member.email}
                            </p>
                            <p className="text-sm font-medium text-gray-500">
                                {member.role}
                            </p>
                            <p className="text-sm font-medium text-gray-500">
                                Since {member.createdAt.slice(0, 10)}
                            </p>
                        </div>
                    </div>
                    {isLoggedIn && (
                        <div className="mt-4 text-right">
                            <Link
                                to={`/user/show/${member._id}`}
                                className="text-indigo-600 hover:text-indigo-500"
                            >
                                View Profile
                            </Link>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default MembersIndex;
