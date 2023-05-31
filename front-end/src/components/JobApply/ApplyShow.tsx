import axios from "axios";
import React, { useEffect, useState } from "react";
import { HiOutlineTrash } from "react-icons/hi";

const ApplyShow = () => {
    const getId = () => window.location.href.split("/").pop();
    const token = JSON.parse(localStorage.getItem("authData") || "{}").token;
    const [application, setApplication] = useState([]);

    useEffect(() => {
        const fetchApplication = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:5000/jobApplication/show/${getId()}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setApplication(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchApplication();
    }, [token]);

    const handleDelete = async (id) => {
        try {
            await axios.delete(
                `http://localhost:5000/jobApplication/delete/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            window.location.href = "/jobApplication/index";
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div
            id="defaultModal"
            aria-hidden="true"
            className="grid self-center w-full p-4 my-20 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 lg:mx-auto lg:max-w-xl"
        >
            <div className="flex items-start justify-between p-4 border-b rounded-t border-b-black">
                <h3 className="text-xl font-semibold text-gray-900">
                    {application.name}
                </h3>
                <button
                    onClick={() => handleDelete(application._id)}
                    className="flex items-center justify-center w-8 h-8 text-white bg-red-500 rounded-full"
                >
                    <HiOutlineTrash />
                </button>
            </div>
            <div className="flex flex-col p-4 space-y-4">
                <div className="flex flex-col space-y-1">
                    <span className="font-semibold">Email</span>
                    <span className="text-sm text-gray-600">
                        {application.email}
                    </span>
                </div>
                <div className="flex flex-col space-y-1">
                    <span className="font-semibold">Mensaje</span>
                    <span className="text-sm text-gray-600">
                        {application.message}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default ApplyShow;
