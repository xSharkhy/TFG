import React, { useEffect, useState } from "react";
import axios from "axios";

const MembersShow = () => {
    const getId = () => window.location.href.split("/").pop();
    const token = localStorage.getItem("token");
    const [member, setMember] = useState([]);
    const itsMe = localStorage.getItem("id") == getId();

    useEffect(() => {
        const fetchMember = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:5000/user/show/${getId()}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setMember(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchMember();
    }, [token]);

    return (
        <div className="my-12 overflow-hidden bg-white shadow sm:rounded-lg">
            {itsMe && (
                <>
                    <h1 className="m-12 text-5xl font-bold text-center">
                        Mi perfil
                    </h1>
                    <hr />
                </>
            )}
            <div className="block px-4 py-5 sm:px-6 md:grid md:grid-cols-3 md:gap-4">
                <div className="self-center">
                    <h3 className="text-lg font-medium leading-6 text-teal-900">
                        Información de perfil
                    </h3>
                    <p className="max-w-2xl mt-1 text-sm text-teal-500">
                        Personal details and application.
                    </p>
                </div>
                <img
                    src="/ui/Sample_profile.jpg"
                    alt="Profile"
                    className="object-cover w-32 h-32 text-right rounded-full place-self-end"
                />
            </div>
            <div className="border-t border-gray-200">
                <dl>
                    <div className="px-4 py-5 bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-teal-500">
                            Nombre
                        </dt>
                        <dd className="mt-1 text-sm text-teal-900 sm:col-span-2 sm:mt-0">
                            {member.username}
                        </dd>
                    </div>
                    <div className="px-4 py-5 bg-white sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-teal-500">
                            Email
                        </dt>
                        <dd className="mt-1 text-sm text-teal-900 sm:col-span-2">
                            {member.email}
                        </dd>
                    </div>
                    <div className="px-4 py-5 bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-teal-500">
                            Rol
                        </dt>
                        <dd className="mt-1 text-sm text-teal-900 sm:col-span-2">
                            {member.role}
                        </dd>
                    </div>{" "}
                    <div className="px-4 py-5 bg-white sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        {" "}
                        <dt className="text-sm font-medium text-teal-500">
                            Fecha de creación
                        </dt>
                        <dd className="mt-1 text-sm text-teal-900 sm:col-span-2">
                            {member.createdAt}
                        </dd>
                    </div>
                </dl>
            </div>
        </div>
    );
};

export default MembersShow;
