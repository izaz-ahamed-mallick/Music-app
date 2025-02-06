"use client";

import React, { useState, useEffect, useMemo } from "react";
import { supaBaseInstence } from "@/lib/supabaseClient";
import AdminPageLoader from "../Loader/AdminPageLoader";
import Modal from "../Modal";
import useSongDelete from "@/app/hooks/useSongDelete";
import EditSongForm from "./EditSongForm";
import { ISongData } from "@/types/song";

const SongsOverview = () => {
    const [songs, setSongs] = useState<ISongData[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedLanguage, setSelectedLanguage] = useState("All");
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedSong, setSelectedSong] = useState<ISongData | null>(null);
    const [loading, setLoading] = useState(false);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const { handleSongDelete } = useSongDelete(songs, setSongs);

    const fetchSongs = async () => {
        setLoading(true);
        try {
            const { data, error } = await supaBaseInstence
                .from("songs")
                .select(
                    "id, title, artist, language, album_id, audio_file, created_at"
                );

            if (error) throw error;
            setSongs(data || []);
        } catch (error) {
            console.error("Error fetching songs:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSongs();
    }, []);

    const uniqueLanguages = useMemo(() => {
        return ["All", ...new Set(songs.map((song) => song.language))];
    }, [songs]);

    const filteredSongs = useMemo(() => {
        return songs.filter((song) => {
            const matchesSearch =
                song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                song.artist.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesLanguage =
                selectedLanguage === "All" ||
                song.language === selectedLanguage;
            return matchesSearch && matchesLanguage;
        });
    }, [songs, searchQuery, selectedLanguage]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedLanguage(e.target.value);
    };

    const handleEditSong = (song: ISongData) => {
        setSelectedSong(song);
        setIsEditModalOpen(true);
    };

    const handleSaveChanges = async () => {
        setIsEditModalOpen(false);
        await fetchSongs();
    };

    const handleSongDeleteById = async (id: string) => {
        setDeletingId(id);
        await handleSongDelete(id);
        setDeletingId(null);
    };

    return (
        <div className="p-6 w-full bg-gray-800 rounded-lg shadow-lg">
            <h2 className="text-3xl font-semibold text-white mb-6">
                Songs Management
            </h2>

            {/* Search and Language Filter */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <input
                    type="text"
                    placeholder="Search by song title or artist"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="w-full md:w-1/2 p-3 bg-gray-700 text-white rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                />

                <select
                    value={selectedLanguage}
                    onChange={handleLanguageChange}
                    className="w-full md:w-1/3 p-3 bg-gray-700 text-white rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                >
                    {uniqueLanguages.map((language) => (
                        <option key={language} value={language}>
                            {language}
                        </option>
                    ))}
                </select>
            </div>

            <div className="mb-6 text-white">
                <span>Total Songs: {filteredSongs.length}</span>
            </div>

            <div className="overflow-x-auto bg-gray-700 rounded-lg shadow-md">
                <table className="min-w-full text-left table-auto">
                    <thead>
                        <tr className="border-b border-gray-600">
                            <th className="py-3 px-4 text-white">Title</th>
                            <th className="py-3 px-4 text-white">Artist</th>
                            <th className="py-3 px-4 text-white">Language</th>
                            <th className="py-3 px-4 text-white">Actions</th>
                        </tr>
                    </thead>
                    {loading ? (
                        <AdminPageLoader />
                    ) : (
                        <tbody>
                            {filteredSongs.length > 0 ? (
                                filteredSongs.map((song) => (
                                    <tr
                                        key={song.id}
                                        className="border-t border-gray-600 hover:bg-gray-600 transition-all duration-200"
                                    >
                                        <td className="py-3 px-4 text-white">
                                            {song.title}
                                        </td>
                                        <td className="py-3 px-4 text-white">
                                            {song.artist}
                                        </td>
                                        <td className="py-3 px-4 text-white">
                                            {song.language}
                                        </td>
                                        <td className="py-3 px-4 flex gap-4">
                                            <button
                                                onClick={() =>
                                                    handleEditSong(song)
                                                }
                                                className="text-blue-500 hover:text-blue-600 transition duration-200"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleSongDeleteById(
                                                        song.id
                                                    )
                                                }
                                                disabled={
                                                    deletingId === song.id
                                                }
                                                className="text-red-500 hover:text-red-600 transition duration-200"
                                            >
                                                {deletingId === song.id
                                                    ? "Deleting..."
                                                    : "Delete"}
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan={4}
                                        className="py-3 px-4 text-white text-center"
                                    >
                                        No Songs Found!
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    )}
                </table>
            </div>

            {/* Edit Song Modal */}
            {isEditModalOpen && selectedSong && (
                <Modal
                    isOpen={isEditModalOpen}
                    onClose={() => setIsEditModalOpen(false)}
                >
                    <EditSongForm
                        song={selectedSong}
                        onClose={() => setIsEditModalOpen(false)}
                        onSave={handleSaveChanges}
                    />
                </Modal>
            )}
        </div>
    );
};

export default SongsOverview;
