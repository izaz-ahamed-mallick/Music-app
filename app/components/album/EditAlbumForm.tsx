import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { supaBaseInstence } from "@/lib/supabaseClient";
import Image from "next/image";
import { IAlbumData } from "@/types/album";
import useCreateUrlFromStorage from "@/app/hooks/useCreateUrlFromStorage";
import { toast } from "react-toastify";

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
        watch,
        formState: { errors },
    } = useForm<FormData>({
        defaultValues: {
            albumName: album.album_name,
            artist: album.artist,
            releaseDate: album.release_date
                ? new Date(album.release_date).toISOString().split("T")[0]
                : "",
            coverImage: null,
        },
    });

    const [coverImagePreview, setCoverImagePreview] = useState(
        album.cover_image
    );
    const [isChanged, setIsChanged] = useState(false);
    const { uploadFileToAlbum } = useCreateUrlFromStorage();

    // Watch form fields
    const watchedAlbumName = watch("albumName");
    const watchedArtist = watch("artist");
    const watchedReleaseDate = watch("releaseDate");
    const watchedCoverImage = watch("coverImage");

    // Track if any value has changed
    useEffect(() => {
        const hasChanges =
            watchedAlbumName !== album.album_name ||
            watchedArtist !== album.artist ||
            watchedReleaseDate !==
                (album.release_date
                    ? new Date(album.release_date).toISOString().split("T")[0]
                    : "") ||
            (watchedCoverImage && watchedCoverImage.length > 0);

        setIsChanged(hasChanges as boolean);
    }, [
        watchedAlbumName,
        watchedArtist,
        watchedReleaseDate,
        watchedCoverImage,
        album,
    ]);

    const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        if (file) {
            setCoverImagePreview(URL.createObjectURL(file));
            setIsChanged(true);
        }
    };

    const onSubmit = async (data: FormData) => {
        if (!isChanged) return; // Prevent unnecessary API calls

        const file = data.coverImage ? data.coverImage[0] : coverImagePreview;
        const albumCoverUrl =
            file instanceof File
                ? await uploadFileToAlbum(file, "album-covers")
                : coverImagePreview;

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
            toast.success("Album updated successfully");
            onSave();
            onClose();
        }
    };

    return (
        <div className="w-full max-w-lg bg-gradient-to-b from-emerald-900 p-8 rounded-xl shadow-xl backdrop-blur-lg">
            <h2 className="text-3xl font-semibold text-white text-center mb-6">
                Update Album
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="relative">
                    <label
                        htmlFor="albumName"
                        className="block text-lg font-medium text-white mb-2"
                    >
                        Album Name
                    </label>
                    <input
                        id="albumName"
                        type="text"
                        placeholder="Enter album name"
                        className="w-full p-4 bg-white bg-opacity-10 border border-blue-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
                        {...register("albumName", {
                            required: "Album Name is required",
                        })}
                    />
                    {errors.albumName && (
                        <p className="text-red-400 text-sm mt-1">
                            {errors.albumName.message}
                        </p>
                    )}
                </div>

                <div className="relative">
                    <label
                        htmlFor="artist"
                        className="block text-lg font-medium text-white mb-2"
                    >
                        Artist
                    </label>
                    <input
                        id="artist"
                        type="text"
                        placeholder="Enter artist name"
                        className="w-full p-4 bg-white bg-opacity-10 border border-blue-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
                        {...register("artist", {
                            required: "Artist is required",
                            pattern: {
                                value: /^[A-Za-z\s]+$/,
                                message: "Only letters are allowed",
                            },
                        })}
                    />
                    {errors.artist && (
                        <p className="text-red-400 text-sm mt-1">
                            {errors.artist.message}
                        </p>
                    )}
                </div>

                <div className="relative">
                    <label
                        htmlFor="releaseDate"
                        className="block text-lg font-medium text-white mb-2"
                    >
                        Release Date
                    </label>
                    <input
                        id="releaseDate"
                        type="date"
                        className="w-full p-4 bg-white bg-opacity-10 border border-blue-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
                        {...register("releaseDate", {
                            required: "Release Date is required",
                        })}
                    />
                    {errors.releaseDate && (
                        <p className="text-red-400 text-sm mt-1">
                            {errors.releaseDate.message}
                        </p>
                    )}
                </div>

                <div className="relative">
                    <label
                        htmlFor="coverImage"
                        className="block text-lg font-medium text-white mb-2"
                    >
                        Cover Image
                    </label>
                    <input
                        id="coverImage"
                        type="file"
                        accept="image/*"
                        className="w-full p-4 bg-white bg-opacity-10 border border-blue-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
                        {...register("coverImage")}
                        onChange={handleCoverImageChange}
                    />
                    {coverImagePreview && (
                        <div className="mt-4 w-24 h-36">
                            <Image
                                width={96}
                                height={96}
                                src={coverImagePreview}
                                alt="Cover Preview"
                                className="rounded-lg shadow-xl transform hover:scale-105 transition-all duration-300"
                            />
                        </div>
                    )}
                </div>

                <div className="flex justify-between mt-10">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-6 py-3 text-sm font-medium text-white bg-gray-600 hover:bg-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={!isChanged}
                        className={`px-6 py-3 text-sm font-medium text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition ${
                            isChanged
                                ? "bg-blue-500 hover:bg-blue-600"
                                : "bg-gray-400 cursor-not-allowed"
                        }`}
                    >
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditAlbumForm;
