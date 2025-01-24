import React, { useState, useEffect, useRef } from "react";
import { supaBaseInstence } from "@/lib/supabaseClient";

import Image from "next/image";

import { useModelStore } from "@/store/useModelStore";
import Button from "../Button";
import Modal from "../Modal";

import { IAlbumData } from "@/types/album";
import EditAlbumForm from "../album/EditAlbumForm";

const AlbumOverview = () => {
    const [albums, setAlbums] = useState<IAlbumData[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedAlbum, setSelectedAlbum] = useState<IAlbumData | null>(null);
    const fetchAlbumRef = useRef<() => Promise<void> | null>(null);
    const { openAlbumModal, isAlbumModalOpen } = useModelStore();

    useEffect(() => {
        fetchAlbumRef.current = async () => {
            const { data, error } = await supaBaseInstence
                .from("albums")
                .select("id, album_name, artist, release_date, cover_image");
            if (error) {
                console.error("Error fetching albums:", error.message);
            } else {
                setAlbums(data);
            }
        };

        fetchAlbumRef.current();
    }, [isAlbumModalOpen]);

    const filteredAlbums = albums.filter(
        (album) =>
            album.album_name
                .toLowerCase()
                .includes(searchQuery.toLowerCase()) ||
            album.artist.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const handleEditAlbum = (album: IAlbumData) => {
        setSelectedAlbum(album);
        setIsEditModalOpen(true);
    };

    const handleSaveChanges = () => {
        setIsEditModalOpen(false);
        if (fetchAlbumRef.current) {
            fetchAlbumRef.current();
        }
    };

    const handleDeleteAlbum = async (albumId: string) => {
        const { error } = await supaBaseInstence
            .from("albums")
            .delete()
            .match({ id: albumId });
        if (error) {
            console.error("Error deleting album:", error.message);
        } else {
            setAlbums((prevAlbums) =>
                prevAlbums.filter((album) => album.id !== albumId)
            );
        }
    };

    return (
        <div className="p-6 w-full bg-gray-800 rounded-lg shadow-lg ">
            <h2 className="text-2xl font-semibold text-white mb-4">
                Albums Overview
            </h2>

            <input
                type="text"
                placeholder="Search by album name or artist"
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full p-3 mb-4 bg-gray-700 text-white rounded-md"
            />

            <div className="mb-4 text-white">
                <span>Total Albums: {albums.length}</span>
            </div>

            <div className="overflow-x-auto bg-gray-700 rounded-lg">
                <table className="min-w-full">
                    <thead>
                        <tr>
                            <th className="text-left text-white py-2 px-4">
                                Album Name
                            </th>
                            <th className="text-left text-white py-2 px-4">
                                Artist
                            </th>
                            <th className="text-left text-white py-2 px-4">
                                Release Date
                            </th>
                            <th className="text-left text-white py-2 px-4">
                                Cover Image
                            </th>
                            <th className="text-left text-white py-2 px-4">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredAlbums.map((album) => (
                            <tr
                                key={album.id}
                                className="border-t border-gray-600"
                            >
                                <td className="py-2 px-4 text-white">
                                    {album.album_name}
                                </td>
                                <td className="py-2 px-4 text-white">
                                    {album.artist}
                                </td>
                                <td className="py-2 px-4 text-white">
                                    {new Date(
                                        album.release_date
                                    ).toLocaleDateString()}
                                </td>
                                <td className="py-2 px-4">
                                    <Image
                                        width={100}
                                        height={100}
                                        src={album.cover_image}
                                        alt={album.album_name}
                                        className="w-16 h-16 object-cover"
                                    />
                                </td>
                                <td className="py-2 px-4">
                                    <button
                                        onClick={() => handleEditAlbum(album)} // Open the edit form
                                        className="text-blue-500 mr-2 hover:underline"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleDeleteAlbum(album.id)
                                        }
                                        className="text-red-500 hover:underline"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Button
                onClick={openAlbumModal}
                className="mt-6 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
            >
                Create New Album
            </Button>

            {/* Edit album model */}

            {isEditModalOpen && selectedAlbum && (
                <Modal
                    isOpen={isEditModalOpen}
                    onClose={() => setIsEditModalOpen(false)}
                >
                    <EditAlbumForm
                        album={selectedAlbum}
                        onClose={() => setIsEditModalOpen(false)}
                        onSave={handleSaveChanges}
                    />
                </Modal>
            )}
        </div>
    );
};

export default AlbumOverview;
