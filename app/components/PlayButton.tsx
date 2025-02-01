"use client";

import { useMusicPlayerStore } from "@/store/useMusicPlayerStore";
import { FaPlay, FaPause } from "react-icons/fa";

interface PlayButtonProps {
    audioUrl: string;
    id: string;
    title: string;
    artist: string;
    className?: string; // Optional className prop for Tailwind classes
}

const PlayButton: React.FC<PlayButtonProps> = ({
    audioUrl,
    id,
    title,
    artist,
    className = "",
}) => {
    const { currentSong, isPlaying, setSong, togglePlay } =
        useMusicPlayerStore();

    const handlePlay = () => {
        if (currentSong?.id === id) {
            togglePlay();
        } else {
            setSong({ id, title, artist, audioUrl });
        }
    };

    return (
        <button
            onClick={handlePlay}
            className={`${className} bg-green-500 p-3 rounded-full text-white hover:bg-green-600 focus:outline-none transition-all duration-300 ease-in-out transform hover:scale-110`}
        >
            {currentSong?.id === id && isPlaying ? (
                <FaPause size={24} />
            ) : (
                <FaPlay size={24} />
            )}
        </button>
    );
};

export default PlayButton;
