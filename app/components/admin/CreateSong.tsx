"use client";

import useCreateSongs from "@/app/hooks/useCreateSongs";
import useCreateUrlFromStorage from "@/app/hooks/useCreateUrlFromStorage";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Button from "../Button";
import { supaBaseInstence } from "@/lib/supabaseClient";
import { ICreateSongForm } from "@/types/song";

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

        const sucess = await createSongs({
            album_id: albumId,
            artist,
            audio_file_url: audioFileUrl,
            title,
        });

        if (sucess) {
            onClose();
        }
    };

    return (
        <div className="w-full max-w-lg bg-white bg-opacity-10 backdrop-blur-lg p-4 rounded-xl shadow-lg border border-gray-300">
            <h2 className="text-4xl font-semibold text-center text-blue-600 mb-6">
                Create a New Song
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="relative">
                    <label
                        htmlFor="title"
                        className="block text-lg font-medium text-gray-100 mb-2"
                    >
                        Title
                    </label>
                    <input
                        id="title"
                        type="text"
                        placeholder="Enter song title"
                        className="w-full p-2 bg-white bg-opacity-20 border border-gray-400 rounded-lg text-gray-100 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
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

                {/* Artist */}
                <div className="relative">
                    <label
                        htmlFor="artist"
                        className="block text-lg font-medium text-gray-100 mb-2"
                    >
                        Artist
                    </label>
                    <input
                        id="artist"
                        type="text"
                        placeholder="Enter artist name"
                        className="w-full p-2 bg-white bg-opacity-20 border border-gray-400 rounded-lg text-gray-100 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
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

                {/* Album */}
                <div className="relative">
                    <label
                        htmlFor="albumId"
                        className="block text-lg font-medium text-gray-100 mb-2"
                    >
                        Album
                    </label>
                    <select
                        id="albumId"
                        {...register("albumId", {
                            required: "Album selection is required",
                        })}
                        className="w-full p-2 bg-white bg-opacity-20 border border-gray-400 rounded-lg text-gray-100 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option disabled className="text-black " value="">
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

                {/* Audio File */}
                <div className="relative">
                    <label
                        htmlFor="audioFile"
                        className="block text-lg font-medium text-gray-100 mb-2"
                    >
                        Audio File
                    </label>
                    <input
                        id="audioFile"
                        type="file"
                        accept="audio/*"
                        className="w-full p-2 bg-white bg-opacity-20 border border-gray-400 rounded-lg text-gray-100 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
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

                {/* Submit Button */}
                <div>
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
