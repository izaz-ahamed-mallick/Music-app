import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Button from "../Button";
import { supaBaseInstence } from "@/lib/supabaseClient";
import { ICreateSongForm } from "@/types/song";
import useCreateSongs from "@/app/hooks/useCreateSongs";
import useCreateUrlFromStorage from "@/app/hooks/useCreateUrlFromStorage";

interface ICreateSongProps {
    onClose: () => void;
}

const CreateSong: React.FC<ICreateSongProps> = ({ onClose }) => {
    const [albums, setAlbums] = useState<{ id: string; album_name: string }[]>(
        []
    );
    const { createSongs } = useCreateSongs();
    const { uploadFileToAlbum } = useCreateUrlFromStorage();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ICreateSongForm>();

    useEffect(() => {
        const fetchAlbums = async () => {
            const { data, error } = await supaBaseInstence
                .from("albums")
                .select("id, album_name");

            if (error) {
                console.error("Error fetching albums:", error.message);
            } else {
                setAlbums(data);
            }
        };

        fetchAlbums();
    }, []);

    const onSubmit = async (data: ICreateSongForm) => {
        const { title, artist, albumId, audioFile } = data;
        const audioFileUrl = await uploadFileToAlbum(audioFile[0], "songs");

        if (!audioFileUrl || audioFileUrl.length === 0) {
            return;
        }

        const success = await createSongs({
            album_id: albumId,
            artist,
            audio_file_url: audioFileUrl,
            title,
        });

        if (success) {
            onClose();
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto bg-gradient-to-r from-[#065f46] to-[#000000] bg-opacity-40 backdrop-blur-xl p-8 rounded-xl shadow-xl border border-gray-300">
            <h2 className="text-4xl font-bold text-center text-white mb-6">
                Create a New Song
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        {/* Title Field */}
                        <div className="relative mb-4">
                            <label
                                htmlFor="title"
                                className="text-lg font-medium text-gray-100 mb-2"
                            >
                                Title
                            </label>
                            <input
                                id="title"
                                type="text"
                                placeholder="Enter song title"
                                className="w-full p-4 bg-gray-800 bg-opacity-50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                {...register("title", {
                                    required: "Song title is required",
                                })}
                            />
                            {errors.title && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.title.message}
                                </p>
                            )}
                        </div>

                        {/* Artist Field */}
                        <div className="relative mb-4">
                            <label
                                htmlFor="artist"
                                className="text-lg font-medium text-gray-100 mb-2"
                            >
                                Artist
                            </label>
                            <input
                                id="artist"
                                type="text"
                                placeholder="Enter artist name"
                                className="w-full p-4 bg-gray-800 bg-opacity-50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                {...register("artist", {
                                    required: "Artist name is required",
                                })}
                            />
                            {errors.artist && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.artist.message}
                                </p>
                            )}
                        </div>

                        {/* Audio File Field */}
                        <div className="relative mb-4">
                            <label
                                htmlFor="audioFile"
                                className="text-lg font-medium text-gray-100 mb-2"
                            >
                                Audio File
                            </label>
                            <input
                                id="audioFile"
                                type="file"
                                accept="audio/*"
                                className="w-full p-4 bg-gray-800 bg-opacity-50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                {...register("audioFile", {
                                    required: "Audio file is required",
                                })}
                            />
                            {errors.audioFile && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.audioFile.message}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="space-y-4">
                        {/* Album Selection Field */}
                        <div className="relative mb-4">
                            <label
                                htmlFor="albumId"
                                className="text-lg font-medium text-gray-100 mb-2"
                            >
                                Album
                            </label>
                            <select
                                id="albumId"
                                {...register("albumId", {
                                    required: "Album selection is required",
                                })}
                                className="w-full p-4 bg-gray-800 bg-opacity-50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                            >
                                <option className="text-black" value="">
                                    Select an Album
                                </option>
                                {albums.map((album) => (
                                    <option
                                        className="text-black cursor-pointer"
                                        key={album.id}
                                        value={album.id}
                                    >
                                        {album.album_name}
                                    </option>
                                ))}
                            </select>
                            {errors.albumId && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.albumId.message}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="mt-6">
                    <Button
                        type="submit"
                        className="w-full bg-blue-600 text-white rounded-lg font-semibold text-lg hover:bg-blue-700 hover:shadow-lg transition duration-300"
                    >
                        Create Song
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default CreateSong;
