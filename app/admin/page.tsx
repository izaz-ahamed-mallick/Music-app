"use client";

import React, { useState } from "react";
import Button from "../components/Button";
import Header from "../components/Header";
import Modal from "../components/Modal";
import CreateAlbum from "./CreateAlbum";
import CreateSong from "./CreateSong";
import AlbumOverview from "./AlbumOverview";
import { useModelStore } from "@/store/useModelStore";

const Admin = () => {
    const [isSongModalOpen, setIsSongModalOpen] = useState(false);
    const { closeAlbumModal, isAlbumModalOpen, openAlbumModal } =
        useModelStore();

    const openSongModal = () => setIsSongModalOpen(true);
    const closeSongModal = () => setIsSongModalOpen(false);

    return (
        <Header>
            <div className="min-h-screen bg-gray-900 text-white p-8">
                <div className="max-w-7xl mx-auto space-y-12">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-5xl font-bold text-blue-500">
                            Admin Dashboard
                        </h1>

                        <div className=" space-y-3">
                            <Button
                                onClick={openAlbumModal}
                                className="bg-blue-600 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-blue-700 hover:shadow-xl transition-all"
                            >
                                Create Album
                            </Button>

                            <Button
                                onClick={openSongModal}
                                className="bg-green-600 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-green-700 hover:shadow-xl transition-all"
                            >
                                Create Song
                            </Button>
                        </div>
                    </div>

                    {/* Admin Dashboard Overview */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1">
                        {/* Album Overview Card */}
                        <div className="bg-gradient-to-br from-blue-600 to-purple-700 p-6 rounded-lg shadow-lg transform transition-all ">
                            <h2 className="text-3xl font-semibold mb-4 text-white">
                                Albums Overview
                            </h2>
                            <p className="text-gray-200 text-lg">
                                Manage and view all your albums here.
                            </p>
                            <AlbumOverview />
                        </div>

                        {/* User Management Card */}
                        {/* <div className="bg-gradient-to-br from-green-600 to-teal-600 p-6 rounded-lg shadow-lg transform transition-all hover:scale-105 hover:shadow-2xl">
                            <h2 className="text-3xl font-semibold mb-4 text-white">
                                User Management
                            </h2>
                            <p className="text-gray-200 text-lg">
                                Manage users, roles, and permissions.
                            </p>
                        </div> */}

                        {/* Settings Card */}
                        {/* <div className="bg-gradient-to-br from-purple-600 to-pink-600 p-6 rounded-lg shadow-lg transform transition-all hover:scale-105 hover:shadow-2xl">
                            <h2 className="text-3xl font-semibold mb-4 text-white">
                                Settings
                            </h2>
                            <p className="text-gray-200 text-lg">
                                Configure app settings and preferences.
                            </p>
                        </div> */}
                    </div>
                </div>
            </div>

            {/* Modal for Album Creation */}
            <Modal isOpen={isAlbumModalOpen} onClose={closeAlbumModal}>
                <CreateAlbum onClose={closeAlbumModal} />
            </Modal>

            {/* Modal for Song Creation */}
            <Modal isOpen={isSongModalOpen} onClose={closeSongModal}>
                <CreateSong onClose={closeSongModal} />
            </Modal>
        </Header>
    );
};

export default Admin;
