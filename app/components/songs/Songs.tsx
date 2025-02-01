"use client";

import { useEffect, useState } from "react";
import { supaBaseInstence } from "@/lib/supabaseClient";
import { ISongData } from "@/types/song";
import SongCard from "./SongCard";

const Songs = () => {
    const [songs, setSongs] = useState<ISongData[]>([]);
    const [filteredSongs, setFilteredSongs] = useState<ISongData[]>([]);
    const [selectedLanguage, setSelectedLanguage] = useState("All");
    const [languages, setLanguages] = useState<string[]>([]); // State to hold unique languages

    useEffect(() => {
        const fetchSongs = async () => {
            const { data, error } = await supaBaseInstence
                .from("songs")
                .select("*");
            if (!error) {
                setSongs(data);
                setFilteredSongs(data);

                // Extract unique languages from the fetched songs and set the state
                const uniqueLanguages = [
                    "All",
                    ...new Set(data.map((song) => song.language)),
                ];
                setLanguages(uniqueLanguages);
            }
        };

        fetchSongs();
    }, []);

    useEffect(() => {
        if (selectedLanguage === "All") {
            setFilteredSongs(songs);
        } else {
            setFilteredSongs(
                songs.filter((song) => song.language === selectedLanguage)
            );
        }
    }, [selectedLanguage, songs]);

    return (
        <div className="w-full">
            <div className="flex space-x-4 mb-4">
                {languages.map((lang) => (
                    <button
                        key={lang}
                        className={`px-4 py-2 rounded-md ${
                            selectedLanguage === lang
                                ? "bg-green-700 text-white"
                                : "bg-gray-700 text-gray-300"
                        } transition duration-300`}
                        onClick={() => setSelectedLanguage(lang)}
                    >
                        {lang}
                    </button>
                ))}
            </div>

            {/* Songs List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredSongs.length > 0 ? (
                    filteredSongs.map((song) => (
                        <SongCard key={song.id} song={song} />
                    ))
                ) : (
                    <p className="text-gray-500">
                        No songs available for {selectedLanguage}.
                    </p>
                )}
            </div>
        </div>
    );
};

export default Songs;
