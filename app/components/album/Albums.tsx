"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { supaBaseInstence } from "@/lib/supabaseClient";

import AlbumLoader from "../Loader/AlbumLoader";
import { IAlbumData } from "@/types/album";

export default function Albums() {
    const [albums, setAlbums] = useState<IAlbumData[]>([]);
    const [loading, setLoading] = useState(true);

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

    return loading ? (
        <AlbumLoader />
    ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-6">
            {albums.map((album) => (
                <div
                    key={album.id}
                    className="relative group rounded-lg overflow-hidden"
                >
                    <Link legacyBehavior href={`/album/${album.id}`}>
                        <a>
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
                            <h3 className="mt-2 text-white text-lg font-semibold group-hover:text-green-400 transition-colors duration-300">
                                {album.album_name}
                            </h3>
                            <p className="text-sm text-gray-400">
                                {album.artist}
                            </p>
                        </a>
                    </Link>
                </div>
            ))}
        </div>
    );
}
