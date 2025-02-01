import React, { useState, useEffect, useMemo } from "react";
import { supaBaseInstence } from "@/lib/supabaseClient";
import Image from "next/image";
import { useModelStore } from "@/store/useModelStore";
import Button from "../Button";
import Modal from "../Modal";
import { IAlbumData } from "@/types/album";
import EditAlbumForm from "../album/EditAlbumForm";
import useAlbumDelete from "@/app/hooks/useAlbumDelete";
import AdminPageLoader from "../Loader/AdminPageLoader";

const AlbumOverview = () => {
    const [albums, setAlbums] = useState<IAlbumData[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedAlbum, setSelectedAlbum] = useState<IAlbumData | null>(null);

    const { openAlbumModal, isAlbumModalOpen } = useModelStore();
    const { handleDeleteAlbum } = useAlbumDelete(albums, setAlbums);
    const [Albumloading, setLoading] = useState(false);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const fetchAlbums = async () => {
        setLoading(true);
        try {
            const { data, error } = await supaBaseInstence
                .from("albums")
                .select("id, album_name, artist, release_date, cover_image");
            if (error) throw error;
            setAlbums(data);
        } catch (error) {
            console.error("Error fetching albums:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAlbums();
    }, [isAlbumModalOpen]);

    const filteredAlbums = useMemo(() => {
        return albums.filter(
            (album) =>
                album.album_name
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                album.artist.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [albums, searchQuery]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const handleEditAlbum = (album: IAlbumData) => {
        setSelectedAlbum(album);
        setIsEditModalOpen(true);
    };

    const handleSaveChanges = () => {
        setIsEditModalOpen(false);
        fetchAlbums();
    };

    const handleAlbumDelete = async (id: string) => {
        setDeletingId(id);
        await handleDeleteAlbum(id);
        setDeletingId(null);
    };

    return (
        <div className="p-6 w-full bg-gray-800 rounded-lg shadow-lg">
            <h2 className="text-3xl font-semibold text-white mb-6">
                Albums Overview
            </h2>

            <div className="mb-6">
                <input
                    type="text"
                    placeholder="Search by album name or artist"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="w-full p-3 bg-gray-700 text-white rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                />
            </div>

            <div className="mb-6 text-white">
                <span>Total Albums: {albums.length}</span>
            </div>

            <div className="overflow-x-auto bg-gray-700 rounded-lg shadow-md">
                <table className="min-w-full text-left table-auto">
                    <thead>
                        <tr className="border-b border-gray-600">
                            <th className="py-3 px-4 text-white">Album Name</th>
                            <th className="py-3 px-4 text-white">Artist</th>
                            <th className="py-3 px-4 text-white">
                                Release Date
                            </th>
                            <th className="py-3 px-4 text-white">
                                Cover Image
                            </th>
                            <th className="py-3 px-4 text-white">Actions</th>
                        </tr>
                    </thead>
                    {Albumloading ? (
                        <AdminPageLoader />
                    ) : (
                        <tbody>
                            {filteredAlbums.map((album) => (
                                <tr
                                    key={album.id}
                                    className="border-t border-gray-600 hover:bg-gray-600 transition-all duration-200"
                                >
                                    <td className="py-3 px-4 text-white">
                                        {album.album_name}
                                    </td>
                                    <td className="py-3 px-4 text-white">
                                        {album.artist}
                                    </td>
                                    <td className="py-3 px-4 text-white">
                                        {new Date(
                                            album.release_date
                                        ).toLocaleDateString()}
                                    </td>
                                    <td className="py-3 px-4">
                                        <Image
                                            width={100}
                                            height={100}
                                            src={album.cover_image}
                                            alt={album.album_name}
                                            className="w-16 h-16 object-cover rounded-lg"
                                        />
                                    </td>
                                    <td className="py-3 px-4 flex gap-4">
                                        <button
                                            onClick={() =>
                                                handleEditAlbum(album)
                                            }
                                            className="text-blue-500 hover:text-blue-600 transition duration-200"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleAlbumDelete(album.id)
                                            }
                                            disabled={deletingId === album.id}
                                            className="text-red-500 hover:text-red-600 transition duration-200"
                                        >
                                            {deletingId === album.id
                                                ? "Deleting..."
                                                : "Delete"}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    )}
                </table>
            </div>

            <Button
                onClick={openAlbumModal}
                className="mt-6 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 focus:outline-none transition duration-200"
            >
                Create New Album
            </Button>

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
