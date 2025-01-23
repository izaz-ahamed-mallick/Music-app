"use client";

import useCreateAlbum from "@/app/hooks/useCreateAlbum";
import useCreateUrlFromStorage from "@/app/hooks/useCreateUrlFromStorage";
import React from "react";
import { useForm } from "react-hook-form";
import Button from "../Button";
import { ICreateAlbumForm } from "@/types/album";

interface ICreateAlbumProps {
    onClose: () => void;
}

const CreateAlbum: React.FC<ICreateAlbumProps> = ({ onClose }) => {
    const { createAlbum } = useCreateAlbum();
    const { uploadFileToAlbum } = useCreateUrlFromStorage();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ICreateAlbumForm>();

    const onSubmit = async (data: ICreateAlbumForm) => {
        const { albumName, artist, releaseDate, coverImage } = data;

        const coverImageUrl = await uploadFileToAlbum(
            coverImage[0],
            "album-covers"
        );
        if (!coverImageUrl) {
            return;
        }
        const sucess = await createAlbum({
            albumName,
            artist,
            coverImageUrl,
            releaseDate,
        });

        if (sucess) {
            onClose();
        }
    };

    return (
        <div className="w-full max-w-lg  bg-white bg-opacity-10 backdrop-blur-lg p-4 rounded-xl shadow-lg border border-gray-300">
            <h2 className="text-4xl font-semibold text-center text-blue-600 mb-6">
                Create a New Album
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="relative">
                    <label
                        htmlFor="albumName"
                        className="block text-lg font-medium text-gray-100 mb-2"
                    >
                        Album Name
                    </label>
                    <input
                        id="albumName"
                        type="text"
                        placeholder="Enter album name"
                        className="w-full p-2 bg-white bg-opacity-20 border border-gray-400 rounded-lg text-gray-100 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        {...register("albumName", {
                            required: "Album name is required",
                        })}
                    />
                    {errors.albumName && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.albumName.message}
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

                {/* Release Date */}
                <div className="relative">
                    <label
                        htmlFor="releaseDate"
                        className="block text-lg font-medium text-gray-100 mb-2"
                    >
                        Release Date
                    </label>
                    <input
                        id="releaseDate"
                        type="date"
                        className="w-full p-2 bg-white bg-opacity-20 border border-gray-400 rounded-lg text-gray-100 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        {...register("releaseDate", {
                            required: "Release date is required",
                        })}
                    />
                    {errors.releaseDate && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.releaseDate.message}
                        </p>
                    )}
                </div>

                {/* Cover Image */}
                <div className="relative">
                    <label
                        htmlFor="coverImage"
                        className="block text-lg font-medium text-gray-100 mb-2"
                    >
                        Cover Image
                    </label>
                    <input
                        id="coverImage"
                        type="file"
                        accept="image/*"
                        className="w-full p-2 bg-white bg-opacity-20 border border-gray-400 rounded-lg text-gray-100 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        {...register("coverImage", {
                            required: "Cover image is required",
                        })}
                    />
                    {errors.coverImage && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.coverImage.message}
                        </p>
                    )}
                </div>

                <div>
                    <Button
                        type="submit"
                        className="w-full bg-blue-600 text-white rounded-lg font-semibold text-lg hover:bg-blue-700 hover:shadow-lg transition duration-300"
                    >
                        Create Album
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default CreateAlbum;
