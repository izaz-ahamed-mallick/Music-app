"use client";

import React, { useState, useEffect, Suspense, useCallback } from "react";
import { motion } from "framer-motion";
import { PlusCircle, Music, Users } from "lucide-react";
import Button from "../components/Button";
import Modal from "../components/Modal";
import { useModelStore } from "@/store/useModelStore";

import AlbumOverview from "../components/admin/AlbumOverview";
import CreateAlbum from "../components/admin/CreateAlbum";
import CreateSong from "../components/admin/CreateSong";
import AdminShimmerLoader from "../components/Loader/AdminShimmerLoader";
import Analytics from "../components/admin/Analytics";

const UserManagement = React.lazy(
    () => import("../components/admin/UserManagement")
);

const Admin = () => {
    const [isSongModalOpen, setIsSongModalOpen] = useState(false);
    const { closeAlbumModal, isAlbumModalOpen, openAlbumModal } =
        useModelStore();
    const [loading, setLoading] = useState(true);

    const openSongModal = useCallback(() => setIsSongModalOpen(true), []);
    const closeSongModal = useCallback(() => setIsSongModalOpen(false), []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex justify-center items-center">
                <AdminShimmerLoader />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-8">
            <div className="max-w-7xl mx-auto space-y-12">
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex justify-between items-center mb-8 flex-col sm:flex-row"
                >
                    <h1 className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                        Admin Dashboard
                    </h1>
                    <div className="flex space-x-4 mt-4 sm:mt-0 sm:flex-row flex-col">
                        <Button
                            onClick={openAlbumModal}
                            className="flex items-center gap-2 bg-blue-600 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-blue-700 hover:shadow-xl transition-all w-full sm:w-auto"
                        >
                            <PlusCircle size={20} /> Create Album
                        </Button>
                        <Button
                            onClick={openSongModal}
                            className="flex items-center gap-2 bg-green-600 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-green-700 hover:shadow-xl transition-all w-full sm:w-auto mt-4 sm:mt-0"
                        >
                            <PlusCircle size={20} /> Create Song
                        </Button>
                    </div>
                </motion.div>
                <div className="space-y-8">
                    <h2 className="text-3xl font-semibold text-white mb-2">
                        Analytics Overview
                    </h2>
                </div>
                <Analytics />
                <div className="space-y-8">
                    {/* Album Overview */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                        className="bg-gradient-to-br from-blue-600 to-purple-700 p-6 rounded-xl shadow-2xl relative overflow-hidden"
                    >
                        <Music
                            size={40}
                            className="text-white opacity-80 mb-4"
                        />
                        <h2 className="text-3xl font-semibold text-white mb-4">
                            Albums Overview
                        </h2>
                        <p className="text-gray-200 text-lg mb-6">
                            Manage and view all your albums here. Track your
                            musical journey!
                        </p>
                        <div className="overflow-x-auto bg-gray-700 rounded-lg shadow-md">
                            <AlbumOverview />
                        </div>
                    </motion.div>

                    {/* User Management */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="bg-gradient-to-br from-green-600 to-teal-600 p-6 rounded-xl shadow-2xl relative overflow-hidden"
                    >
                        <Users
                            size={40}
                            className="text-white opacity-80 mb-4"
                        />
                        <h2 className="text-3xl font-semibold text-white mb-4">
                            User Management
                        </h2>
                        <p className="text-gray-200 text-lg mb-6">
                            Manage users, roles, and permissions for your
                            application.
                        </p>
                        <div className="overflow-x-auto bg-gray-700 rounded-lg shadow-md">
                            <Suspense fallback={<AdminShimmerLoader />}>
                                <UserManagement />
                            </Suspense>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Modals for Create Album and Create Song */}
            <Modal isOpen={isAlbumModalOpen} onClose={closeAlbumModal}>
                <CreateAlbum onClose={closeAlbumModal} />
            </Modal>

            <Modal isOpen={isSongModalOpen} onClose={closeSongModal}>
                <CreateSong onClose={closeSongModal} />
            </Modal>
        </div>
    );
};

export default Admin;
