"use client";

import { FaPlay, FaPause } from "react-icons/fa";
import { IoVolumeHigh, IoVolumeOff } from "react-icons/io5";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useMusicPlayerStore } from "@/store/useMusicPlayerStore";

const MusicPlayer = () => {
    const { currentSong, isPlaying, togglePlay, stopPlayback } =
        useMusicPlayerStore();
    const [volume, setVolume] = useState(0.5);

    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.play();
            } else {
                audioRef.current.pause();
            }
        }
    }, [isPlaying]);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume]);

    if (!currentSong) {
        return null;
    }

    return (
        <div className="fixed bottom-0 left-0 w-full bg-neutral-800 text-white p-4 shadow-lg flex flex-col sm:flex-row sm:items-center justify-between z-50">
            {/* Song Info */}
            <div className="flex items-center gap-4 mb-4 sm:mb-0">
                <Image
                    width={60}
                    height={60}
                    src={"/images/music-player-icon.png"}
                    alt="Song Thumbnail"
                    className="w-16 h-16 rounded-lg object-cover"
                />
                <div>
                    <h3 className="font-semibold text-lg">
                        {currentSong.title}
                    </h3>
                    <p className="text-sm text-gray-400">
                        {currentSong.artist}
                    </p>
                </div>
            </div>

            <div className="flex-1 flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                    onClick={togglePlay}
                    className="text-white bg-green-600 p-3 rounded-full hover:bg-green-700 transition"
                >
                    {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
                </button>
            </div>

            <div className="flex items-center gap-2">
                <button
                    onClick={() => setVolume(volume > 0 ? 0 : 0.5)}
                    className="text-gray-400 hover:text-white transition"
                >
                    {volume > 0 ? (
                        <IoVolumeHigh size={24} />
                    ) : (
                        <IoVolumeOff size={24} />
                    )}
                </button>
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                    className="w-24 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                />
            </div>

            <audio
                ref={audioRef}
                src={currentSong.audioUrl}
                onEnded={stopPlayback}
            />
        </div>
    );
};

export default MusicPlayer;
