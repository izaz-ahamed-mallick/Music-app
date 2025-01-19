import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { supaBaseInstence } from "@/lib/supabaseClient";
import Image from "next/image";
import useCreateUrlFromStorage from "../hooks/useCreateUrlFromStorage";
import { IAlbumData } from "../admin/AlbumOverview";

interface FormData {
    albumName: string;
    artist: string;
    releaseDate: string;
    coverImage: FileList | null;
}

const EditAlbumForm = ({
    album,
    onClose,
    onSave,
}: {
    album: IAlbumData;
    onClose: () => void;
    onSave: () => void;
}) => {
    const {
        register,
        handleSubmit,

        formState: { errors },
    } = useForm<FormData>({
        defaultValues: {
            albumName: album.album_name,
            artist: album.artist,
            releaseDate: album.release_date,
            coverImage: null,
        },
    });

    const [coverImagePreview, setCoverImagePreview] = useState(
        album.cover_image
    );

    const { uploadFileToAlbum } = useCreateUrlFromStorage();

    const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        if (file) {
            setCoverImagePreview(URL.createObjectURL(file)); // Show preview of the selected image
        }
    };

    // Handle form submission
    const onSubmit = async (data: FormData) => {
        if (
            (data.coverImage && data.coverImage.length > 0) ||
            data.albumName ||
            data.artist ||
            data.releaseDate
        ) {
            const file = data.coverImage
                ? data.coverImage[0]
                : coverImagePreview;
            const albumCoverUrl = await uploadFileToAlbum(file, "album-covers");

            // Now update the album data in the database
            const { error } = await supaBaseInstence
                .from("albums")
                .update({
                    album_name: data.albumName,
                    artist: data.artist,
                    release_date: data.releaseDate,
                    cover_image: albumCoverUrl,
                })
                .eq("id", album.id);

            if (error) {
                console.error("Error updating album:", error.message);
            } else {
                onSave();
                onClose();
            }
        } else {
            onClose();
        }
    };

    return (
        <div className="w-full max-w-lg bg-white bg-opacity-10 backdrop-blur-lg p-6 rounded-xl shadow-lg border border-gray-300">
            <h2 className="text-4xl font-semibold text-center text-blue-600 mb-6">
                Update Album Details
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Album Name */}
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
                        className="w-full p-3 bg-white bg-opacity-20 border border-gray-400 rounded-lg text-gray-100 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        {...register("albumName", {
                            required: "Album Name is required",
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
                        className="w-full p-3 bg-white bg-opacity-20 border border-gray-400 rounded-lg text-gray-100 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        {...register("artist", {
                            required: "Artist is required",
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
                        className="w-full p-3 bg-white bg-opacity-20 border border-gray-400 rounded-lg text-gray-100 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        {...register("releaseDate", {
                            required: "Release Date is required",
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
                        className="w-full p-3 bg-white bg-opacity-20 border border-gray-400 rounded-lg text-gray-100 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        {...register("coverImage")}
                        onChange={handleCoverImageChange}
                    />
                    {coverImagePreview && (
                        <div className="mt-4">
                            <Image
                                width={100}
                                height={100}
                                src={coverImagePreview}
                                alt="Cover Preview"
                                className="rounded-lg shadow-md"
                            />
                        </div>
                    )}
                </div>

                {/* Buttons */}
                <div className="flex justify-between mt-6">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-6 py-3 text-sm font-medium text-gray-100 bg-gray-700 hover:bg-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-6 py-3 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditAlbumForm;
