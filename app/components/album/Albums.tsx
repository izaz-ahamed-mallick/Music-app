"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { supaBaseInstence } from "@/lib/supabaseClient";

import AlbumLoader from "../Loader/AlbumLoader";
import { IAlbumData } from "@/types/album";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { useAddedAlbumStore } from "@/store/useAddedAlbumStore";
import useUserRoleStore from "@/store/userRoleStore";

export default function Albums() {
    const [albums, setAlbums] = useState<IAlbumData[]>([]);
    const [loading, setLoading] = useState(true);
    const { addFavoriteAlbumData, removeFavoriteAlbum, addedAlbumList } =
        useAddedAlbumStore();
    const { user } = useUserRoleStore();

    useEffect(() => {
        const fetchAlbums = async () => {
            const { data, error } = await supaBaseInstence
                .from("albums")
                .select("id,album_name, artist, cover_image,release_date");

            if (error) {
                console.error("Error fetching albums:", error);
            } else {
                setAlbums(data);
                setLoading(false);
            }
        };

        fetchAlbums();
    }, []);

    const isFavorite = (albumId: string) =>
        addedAlbumList.some((favorite) => favorite.id === albumId);

    return loading ? (
        <AlbumLoader />
    ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-6 relative">
            {albums.map((album) => (
                <div
                    key={album.id}
                    className="relative group rounded-lg overflow-hidden"
                >
                    <Link href={`/album/${album.id}`}>
                        <div className="relative w-full h-72 bg-neutral-700 rounded-lg overflow-hidden shadow-lg group-hover:shadow-2xl transition-shadow duration-300">
                            <Image
                                priority
                                width={500}
                                height={500}
                                src={album.cover_image}
                                alt={album.album_name}
                                className="object-top lg:object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                        <div>
                            <h3 className="mt-2 text-white text-lg font-semibold group-hover:text-green-400 transition-colors duration-300">
                                {album.album_name}
                            </h3>
                            <p className="text-sm text-gray-400">
                                {album.artist}
                            </p>
                        </div>
                    </Link>
                    {user && user.id !== null && (
                        <div className="absolute bottom-2 right-2">
                            {isFavorite(album.id) ? (
                                <button
                                    onClick={() =>
                                        removeFavoriteAlbum(
                                            user.id as string,
                                            album.id
                                        )
                                    }
                                >
                                    <FaHeart size={24} color="green" />
                                </button>
                            ) : (
                                <button
                                    onClick={() =>
                                        addFavoriteAlbumData(
                                            user.id as string,
                                            album
                                        )
                                    }
                                >
                                    <FaRegHeart size={24} />
                                </button>
                            )}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
