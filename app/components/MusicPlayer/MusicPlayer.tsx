"use client";

import { useEffect, useRef, useState } from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import { IoVolumeHigh, IoVolumeOff, IoClose } from "react-icons/io5";
import WaveSurfer from "wavesurfer.js";
import { useMusicPlayerStore } from "@/store/useMusicPlayerStore";
import Image from "next/image";

const MusicPlayer = () => {
    const {
        currentSong,
        isPlaying,
        togglePlay,
        stopPlayback,
        setCurrentSongNull,
    } = useMusicPlayerStore();

    const [volume, setVolume] = useState(0.5);
    const waveformRef = useRef<HTMLDivElement | null>(null);
    const waveSurferInstance = useRef<WaveSurfer | null>(null);
    const volumeRef = useRef(volume);

    useEffect(() => {
        volumeRef.current = volume;
    }, [volume]);

    useEffect(() => {
        if (!waveformRef.current || !currentSong?.audioUrl) return;

        if (waveSurferInstance.current) {
            waveSurferInstance.current.destroy();
        }

        waveSurferInstance.current = WaveSurfer.create({
            container: waveformRef.current,
            waveColor: "#ffffff",
            progressColor: "#22c55e",
            cursorColor: "#ffffff",
            barWidth: 3,
            barRadius: 3,
            height: 40,
            normalize: true,
            backend: "MediaElement",
        });

        waveSurferInstance.current.load(currentSong.audioUrl);

        waveSurferInstance.current.on("ready", () => {
            waveSurferInstance.current?.setVolume(volumeRef.current);
            waveSurferInstance.current?.play();
        });

        waveSurferInstance.current.on("finish", () => {
            stopPlayback();
        });

        return () => {
            waveSurferInstance.current?.destroy();
        };
    }, [currentSong, stopPlayback]);

    useEffect(() => {
        if (waveSurferInstance.current) {
            if (isPlaying) {
                waveSurferInstance.current.play();
            } else {
                waveSurferInstance.current.pause();
            }
        }
    }, [isPlaying]);

    useEffect(() => {
        if (waveSurferInstance.current) {
            waveSurferInstance.current.setVolume(volumeRef.current);
        }
    }, [volume]);

    const handleClose = () => {
        stopPlayback();
        setCurrentSongNull();
    };

    if (!currentSong) return null;

    return (
        <div className="fixed bottom-0  left-1/2 transform -translate-x-1/2 w-[90%] sm:w-[600px] bg-neutral-900/70 backdrop-blur-lg shadow-lg rounded-xl p-5 flex items-center gap-4 text-white z-50 border border-neutral-700">
            {/* Close Button */}
            <button
                onClick={handleClose}
                className="absolute top-2 right-2 text-gray-400 hover:text-white transition"
            >
                <IoClose size={22} />
            </button>

            {/* Song Thumbnail */}
            <div className="flex-shrink-0">
                <Image
                    width={60}
                    height={60}
                    src={"/images/music-player-icon.png"}
                    alt="Song Thumbnail"
                    className="w-16 h-16 rounded-lg object-cover border border-gray-600"
                />
            </div>

            {/* Song Details & Waveform */}
            <div className="flex-1">
                <h3 className="font-semibold text-lg truncate">
                    {currentSong.title}
                </h3>
                <p className="text-sm text-gray-400 truncate">
                    {currentSong.artist}
                </p>
                <div ref={waveformRef} className="mt-2 w-full"></div>
            </div>

            {/* Controls */}
            <div className="flex flex-col items-center gap-2">
                {/* Play/Pause Button */}
                <button
                    onClick={togglePlay}
                    className="bg-green-600 p-3 rounded-full hover:bg-green-500 transition shadow-lg"
                >
                    {isPlaying ? <FaPause size={18} /> : <FaPlay size={18} />}
                </button>

                {/* Volume Controls */}
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setVolume(volume > 0 ? 0 : 0.5)}
                        className="text-gray-400 hover:text-white transition"
                    >
                        {volume > 0 ? (
                            <IoVolumeHigh size={20} />
                        ) : (
                            <IoVolumeOff size={20} />
                        )}
                    </button>
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={volume}
                        onChange={(e) => setVolume(parseFloat(e.target.value))}
                        className="w-24 h-1 bg-green-600 rounded-lg appearance-none cursor-pointer"
                    />
                </div>
            </div>
        </div>
    );
};

export default MusicPlayer;
