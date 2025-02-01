import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../Button";
import { ICreateAlbumForm } from "@/types/album";

import useCreateAlbum from "@/app/hooks/useCreateAlbum";
import useCreateUrlFromStorage from "@/app/hooks/useCreateUrlFromStorage";
import Image from "next/image";

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
        watch,
    } = useForm<ICreateAlbumForm>();

    const [coverImagePreview, setCoverImagePreview] = useState<string | null>(
        null
    );
    const coverImageField = watch("coverImage");

    React.useEffect(() => {
        if (coverImageField && coverImageField[0]) {
            const objectUrl = URL.createObjectURL(coverImageField[0]);
            setCoverImagePreview(objectUrl);
            return () => URL.revokeObjectURL(objectUrl);
        }
    }, [coverImageField]);

    const onSubmit = async (data: ICreateAlbumForm) => {
        const { albumName, artist, releaseDate, coverImage } = data;

        const coverImageUrl = await uploadFileToAlbum(
            coverImage[0],
            "album-covers"
        );
        if (!coverImageUrl) {
            return;
        }
        const success = await createAlbum({
            albumName,
            artist,
            coverImageUrl,
            releaseDate,
        });

        if (success) {
            onClose();
        }
    };

    return (
        <div className="w-full max-w-4xl flex items-center mx-auto bg-gradient-to-r from-[#065f46] to-[#000000] bg-opacity-40 backdrop-blur-xl p-8 rounded-xl shadow-xl border border-gray-300">
            <div className="w-full md:w-3/4">
                {" "}
                <h2 className="text-4xl font-bold text-center text-white mb-6">
                    Create a New Album
                </h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                        <div className="space-y-4">
                            {/* Album Name Field */}
                            <div className="relative mb-4">
                                <label
                                    htmlFor="albumName"
                                    className="text-lg font-medium text-gray-100 mb-2"
                                >
                                    Album Name
                                </label>
                                <input
                                    id="albumName"
                                    type="text"
                                    placeholder="Enter album name"
                                    className="w-full p-4 bg-gray-800 bg-opacity-50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
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
                                        pattern: {
                                            value: /^[A-Za-z\s]+$/,
                                            message: "Only letters are allowed",
                                        },
                                    })}
                                />
                                {errors.artist && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.artist.message}
                                    </p>
                                )}
                            </div>

                            <div className="relative mb-4">
                                <label
                                    htmlFor="releaseDate"
                                    className="text-lg font-medium text-gray-100 mb-2"
                                >
                                    Release Date
                                </label>
                                <input
                                    id="releaseDate"
                                    type="date"
                                    className="w-full p-4 bg-gray-800 bg-opacity-50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
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

                            <div className="relative mb-4">
                                <label
                                    htmlFor="coverImage"
                                    className="text-lg font-medium text-gray-100 mb-2"
                                >
                                    Cover Image
                                </label>
                                <input
                                    id="coverImage"
                                    type="file"
                                    accept="image/*"
                                    className="w-full p-4 bg-gray-800 bg-opacity-50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
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
                        </div>
                    </div>

                    <div className="mt-6">
                        <Button
                            type="submit"
                            className="w-full bg-blue-600 text-white rounded-lg font-semibold text-lg hover:bg-blue-700 hover:shadow-lg transition duration-300"
                        >
                            Create Album
                        </Button>
                    </div>
                </form>
            </div>

            <div className="w-full md:w-1/4 mt-6 md:mt-0 pl-8">
                {coverImagePreview ? (
                    <Image
                        src={coverImagePreview}
                        alt="Album Cover Preview"
                        width={200}
                        height={200}
                        className="rounded-lg shadow-xl"
                    />
                ) : (
                    <div className="text-white text-center text-lg">
                        No cover image selected
                    </div>
                )}
            </div>
        </div>
    );
};

export default CreateAlbum;
