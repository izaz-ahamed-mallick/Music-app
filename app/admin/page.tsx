"use client";

import React, { useState } from "react";
import Button from "../components/Button";
import Header from "../components/Header";
import Modal from "../components/Modal";

import { useModelStore } from "@/store/useModelStore";
import UserManagement from "../components/admin/UserManagement";
import AlbumOverview from "../components/admin/AlbumOverview";
import CreateAlbum from "../components/admin/CreateAlbum";
import CreateSong from "../components/admin/CreateSong";

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

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 space-y-10 ">
                        {/* Album Overview Card */}
                        <div className="bg-gradient-to-br from-blue-600 to-purple-700 p-6 rounded-lg shadow-lg ">
                            <h2 className="text-3xl font-semibold mb-4 text-white">
                                Albums Overview
                            </h2>
                            <p className="text-gray-200 text-lg mb-3">
                                Manage and view all your albums here.
                            </p>
                            <AlbumOverview />
                        </div>

                        <div className="bg-gradient-to-br from-green-600 to-teal-600 p-6 rounded-lg shadow-lg">
                            <h2 className="text-3xl font-semibold mb-4 text-white">
                                User Management
                            </h2>
                            <p className="text-gray-200 text-lg mb-3">
                                Manage users, roles, and permissions.
                            </p>
                            <UserManagement />
                        </div>
                    </div>
                </div>
            </div>

            <Modal isOpen={isAlbumModalOpen} onClose={closeAlbumModal}>
                <CreateAlbum onClose={closeAlbumModal} />
            </Modal>

            <Modal isOpen={isSongModalOpen} onClose={closeSongModal}>
                <CreateSong onClose={closeSongModal} />
            </Modal>
        </Header>
    );
};

export default Admin;
