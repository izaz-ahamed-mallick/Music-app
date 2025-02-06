import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { supaBaseInstence } from "@/lib/supabaseClient";
import { ISongData } from "@/types/song";
import useCreateUrlFromStorage from "@/app/hooks/useCreateUrlFromStorage";
import { toast } from "react-toastify";
import useFetchAlbums from "@/app/hooks/useFetchAlbums";

interface FormData {
    songTitle: string;
    album: string;
    artist: string;
    releaseDate: string;
    language: string;
    audio_file: FileList | null;
}

const EditSongForm = ({
    song,
    onClose,
    onSave,
}: {
    song: ISongData;
    onClose: () => void;
    onSave: () => void;
}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm<FormData>({
        defaultValues: {
            songTitle: song.title,
            album: song.album_id,
            artist: song.artist,
            releaseDate: song.created_at
                ? new Date(song.created_at).toISOString().split("T")[0]
                : "",
            language: song.language || "",
            audio_file: null,
        },
    });

    const { uploadFileToAlbum } = useCreateUrlFromStorage();
    const [songPreview, setSongPreview] = useState<string | null>(null);

    const { albums, selectedAlbumName } = useFetchAlbums(song.album_id);
    const [isButtonEnable, setIsButtonEnable] = useState(true);

    const formValues = watch();

    useEffect(() => {
        const isFormModified =
            formValues.songTitle !== song.title ||
            formValues.album !== song.album_id ||
            formValues.artist !== song.artist ||
            formValues.language !== song.language ||
            (formValues.audio_file && formValues.audio_file.length > 0) ||
            formValues.releaseDate !==
                (song.created_at
                    ? new Date(song.created_at).toISOString().split("T")[0]
                    : "");

        setIsButtonEnable(!isFormModified);
    }, [formValues, song]);

    const handleSongFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        if (file) {
            setSongPreview(URL.createObjectURL(file));
        }
    };

    const onSubmit = async (data: FormData) => {
        if (
            (data.audio_file && data.audio_file.length > 0) ||
            data.songTitle ||
            data.artist ||
            data.releaseDate ||
            data.language
        ) {
            setIsButtonEnable(false);

            const file = data.audio_file ? data.audio_file[0] : null;
            const songFileUrl = file
                ? await uploadFileToAlbum(file, "song-files")
                : song.audio_file;

            const { error } = await supaBaseInstence
                .from("songs")
                .update({
                    title: data.songTitle,
                    album_id: data.album,
                    artist: data.artist,
                    created_at: data.releaseDate,
                    language: data.language,
                    audio_file: songFileUrl,
                })
                .eq("id", song.id);

            if (error) {
                console.error("Error updating song:", error.message);
            } else {
                toast.success("Song updated successfully");
                onSave();
                onClose();
                setIsButtonEnable(true);
            }
        } else {
            onClose();
        }
    };

    return (
        <div className="w-full max-w-lg bg-gradient-to-b from-emerald-900 p-8 rounded-xl shadow-xl backdrop-blur-lg">
            <h2 className="text-3xl font-semibold text-white text-center mb-6">
                Update Song
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="relative">
                    <label
                        htmlFor="songTitle"
                        className="block text-lg font-medium text-white mb-2"
                    >
                        Song Title
                    </label>
                    <input
                        id="songTitle"
                        type="text"
                        placeholder="Enter song title"
                        className="w-full p-4 bg-white bg-opacity-10 border border-blue-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
                        {...register("songTitle", {
                            required: "Song Title is required",
                        })}
                    />
                    {errors.songTitle && (
                        <p className="text-red-400 text-sm mt-1">
                            {errors.songTitle.message}
                        </p>
                    )}
                </div>

                <div className="relative">
                    <label
                        htmlFor="album"
                        className="block text-lg font-medium text-white mb-2"
                    >
                        Album
                    </label>
                    <select
                        id="album"
                        className="w-full p-4 bg-white bg-opacity-10  border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
                        {...register("album", {
                            required: "Album is required",
                        })}
                    >
                        <option
                            className="text-white"
                            value={song.album_id}
                            disabled
                        >
                            {selectedAlbumName}
                            {/* Show the pre-selected album */}
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
                    {errors.album && (
                        <p className="text-red-400 text-sm mt-1">
                            {errors.album.message}
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
                        htmlFor="language"
                        className="block text-lg font-medium text-white mb-2"
                    >
                        Language
                    </label>
                    <input
                        id="language"
                        type="text"
                        placeholder="Enter language"
                        className="w-full p-4 bg-white bg-opacity-10 border border-blue-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
                        {...register("language", {
                            required: "Language is required",
                            pattern: {
                                value: /^[A-Za-z\s]+$/,
                                message: "Only letters are allowed",
                            },
                        })}
                    />
                    {errors.language && (
                        <p className="text-red-400 text-sm mt-1">
                            {errors.language.message}
                        </p>
                    )}
                </div>

                <div className="relative">
                    <label
                        htmlFor="songFile"
                        className="block text-lg font-medium text-white mb-2"
                    >
                        Song File
                    </label>
                    <input
                        id="songFile"
                        type="file"
                        accept="audio/*"
                        className="w-full p-4 bg-white bg-opacity-10 border border-blue-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
                        {...register("audio_file")}
                        onChange={handleSongFileChange}
                    />
                    {songPreview && (
                        <div className="mt-4">
                            <audio controls className="w-full">
                                <source src={songPreview} />
                            </audio>
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
                        disabled={isButtonEnable}
                        type="submit"
                        className={`px-6 py-3 text-sm font-medium  bg-blue-500 ${
                            !isButtonEnable
                                ? "hover:bg-blue-600 text-white"
                                : "text-gray-700"
                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400`}
                    >
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditSongForm;
