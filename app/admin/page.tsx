"use client";

import React, { useState } from "react";
import Button from "../components/Button"; // Assuming you have a Button component.
import Header from "../components/Header";
import Modal from "../components/Modal";
import CreateAlbum from "./createAlbum";

const Admin = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    return (
        <Header>
            <div className="min-h-screen text-white p-8">
                <div className="max-w-7xl mx-auto space-y-8">
                    <div className="flex justify-between items-center">
                        <h1 className="text-4xl font-semibold">
                            Admin Dashboard
                        </h1>
                        <Button
                            onClick={openModal}
                            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
                        >
                            Create Album
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="bg-gray-800 p-6 rounded-lg shadow-md">
                            <h2 className="text-2xl font-semibold mb-4">
                                Albums Overview
                            </h2>
                            <p className="text-gray-300">
                                Manage your albums here.
                            </p>
                        </div>
                        <div className="bg-gray-800 p-6 rounded-lg shadow-md">
                            <h2 className="text-2xl font-semibold mb-4">
                                User Management
                            </h2>
                            <p className="text-gray-300">
                                Manage users and roles.
                            </p>
                        </div>
                        <div className="bg-gray-800 p-6 rounded-lg shadow-md">
                            <h2 className="text-2xl font-semibold mb-4">
                                Settings
                            </h2>
                            <p className="text-gray-300">
                                Adjust app settings.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <CreateAlbum onClose={closeModal} />
            </Modal>
        </Header>
    );
};

export default Admin;
