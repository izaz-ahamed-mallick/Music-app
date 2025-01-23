"use client";

import { useMusicPlayerStore } from "@/store/useMusicPlayerStore";
import { FaPlay, FaPause } from "react-icons/fa";

interface PlayButtonProps {
    audioUrl: string;
    id: string;
    title: string;
    artist: string;
}

const PlayButton: React.FC<PlayButtonProps> = ({
    audioUrl,
    id,
    title,
    artist,
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
            className="bg-green-500 p-2  rounded-full text-white hover:bg-green-600 transition"
        >
            {currentSong?.id === id && isPlaying ? (
                <FaPause size={20} />
            ) : (
                <FaPlay size={20} />
            )}
        </button>
    );
};

export default PlayButton;
