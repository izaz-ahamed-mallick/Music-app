"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supaBaseInstence } from "@/lib/supabaseClient";
import PlayButton from "@/app/components/PlayButton";

interface SearchResult {
    type: string;
    results: Array<{
        id?: string;
        title?: string;
        album_name?: string;
        artist: string;
        audio_file?: string;
    }>;
}

const Search = () => {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleSearch = async (term: string) => {
        if (!term) {
            setSearchResults([]);
            return;
        }

        setIsLoading(true);
        try {
            const { data: songs } = await supaBaseInstence
                .from("songs")
                .select("id, title, artist, audio_file")
                .ilike("title", `%${term}%`);

            const { data: albums } = await supaBaseInstence
                .from("albums")
                .select("id, album_name, artist")
                .ilike("album_name", `%${term}%`);

            const { data: artists } = await supaBaseInstence
                .from("albums")
                .select("artist")
                .ilike("artist", `%${term}%`)
                .limit(10);

            setSearchResults([
                { type: "Songs", results: songs || [] },
                { type: "Albums", results: albums || [] },
                { type: "Artists", results: artists || [] },
            ]);
        } catch (error) {
            console.error("Error fetching search results:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            handleSearch(searchTerm);
        }, 300);
        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm]);

    const handleAlbumClick = (id: string) => {
        router.push(`/album/${id}`);
    };

    return (
        <div className="p-4">
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search for songs, albums, or artists..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full p-2 text-sm text-gray-900 bg-gray-200 rounded-lg outline-none focus:ring focus:ring-green-500"
                />
            </div>
            {isLoading ? (
                <p className="text-gray-400">Searching...</p>
            ) : (
                <div>
                    {searchResults.map((group) => (
                        <div key={group.type} className="mb-6">
                            <h3 className="text-lg text-white font-semibold mb-2">
                                {group.type}
                            </h3>
                            {group.results.length > 0 ? (
                                group.results.map((item) => (
                                    <div
                                        key={item.id || item.artist}
                                        onClick={
                                            group.type === "Albums"
                                                ? () =>
                                                      handleAlbumClick(
                                                          item.id || ""
                                                      )
                                                : undefined
                                        }
                                        className={`p-2 bg-neutral-800 rounded-lg mb-2 ${
                                            group.type === "Albums"
                                                ? "cursor-pointer hover:bg-neutral-700 transition"
                                                : ""
                                        }`}
                                    >
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <p className="text-sm text-gray-300">
                                                    {item.title ||
                                                        item.album_name ||
                                                        item.artist}
                                                </p>
                                                {item.artist && (
                                                    <p className="text-xs text-gray-400">
                                                        Artist: {item.artist}
                                                    </p>
                                                )}
                                            </div>
                                            {group.type === "Songs" && (
                                                <PlayButton
                                                    artist={item.artist}
                                                    audioUrl={
                                                        item.audio_file || ""
                                                    }
                                                    id={item.id || ""}
                                                    title={item.title || ""}
                                                />
                                            )}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-sm text-gray-500">
                                    No {group.type.toLowerCase()} found.
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Search;
