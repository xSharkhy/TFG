import React, { useState, useEffect } from "react";
import axios from "axios";
import { HiOutlineTrash, HiOutlineEye } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const ApplyIndex = () => {
    const [applications, setApplications] = useState([]);
    const navigate = useNavigate();
    const token = JSON.parse(localStorage.getItem("authData") || "{}").token;

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:5000/jobApplication/index",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setApplications(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchApplications();
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
            setApplications(applications.filter((app) => app._id !== id));
        } catch (error) {
            console.error(error);
        }
    };

    const handleShow = async (application) => {
        if (!application.read) {
            try {
                await axios.put(
                    `http://localhost:5000/jobApplication/update/${application._id}`,
                    { read: true },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
            } catch (error) {
                console.error(error);
            }
        }
        navigate(`/jobApplication/show/${application._id}`);
    };

    return (
        <div className="container min-h-screen py-20 mx-auto mt-1">
            <h1 className="text-3xl font-bold text-center dark:text-white">
                Job Applications
            </h1>
            <div className="flex my-10">
                <table className="items-center justify-center w-3/4 mx-auto border-collapse table-auto">
                    <thead>
                        <tr className="text-left text-white border border-white rounded-lg bg-slate-500 ">
                            <th className="px-4 py-2">Nombre</th>
                            <th className="px-4 py-2">Email</th>
                            <th className="px-4 py-2">Mensaje</th>
                            <th className="px-4 py-2">Recibido</th>
                            <th className="px-4 py-2">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {applications.map((application) => (
                            <tr
                                key={application._id}
                                className={`border ${
                                    application.read
                                        ? "bg-yellow-50"
                                        : "odd:bg-white even:bg-gray-100"
                                }`}
                            >
                                <td className="px-4 py-2 border">
                                    {application.name}
                                </td>
                                <td className="px-4 py-2 border">
                                    {application.email}
                                </td>
                                <td className="w-1/4 px-4 py-2 overflow-hidden border text-clip">
                                    {application.message}
                                </td>
                                <td className="px-4 py-2 border">
                                    {application.createdAt.slice(0, 10)}
                                </td>
                                <td className="flex justify-around px-4 py-2 ">
                                    <button
                                        onClick={() =>
                                            handleDelete(application._id)
                                        }
                                        className="p-2 text-white bg-red-600 rounded-md shadow-md shadow-red-900 hover:bg-red-500 hover:shadow-red-700"
                                    >
                                        <HiOutlineTrash />
                                    </button>
                                    <button
                                        onClick={() => handleShow(application)}
                                        className="p-2 text-white bg-green-600 rounded-md shadow-md shadow-green-900 hover:bg-green-500 hover:shadow-green-700"
                                    >
                                        <HiOutlineEye />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ApplyIndex;
