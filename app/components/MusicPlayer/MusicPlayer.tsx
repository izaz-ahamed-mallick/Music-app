"use client";

import { useEffect, useRef, useState } from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import { IoVolumeHigh, IoVolumeOff } from "react-icons/io5";
import WaveSurfer from "wavesurfer.js";
import { useMusicPlayerStore } from "@/store/useMusicPlayerStore";
import Image from "next/image";

const MusicPlayer = () => {
    const { currentSong, isPlaying, togglePlay, stopPlayback } =
        useMusicPlayerStore();

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
            waveColor: "#ddd",
            progressColor: "#4caf50",
            cursorColor: "#fff",
            barWidth: 2,
            barRadius: 1,
            height: 50,
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
            waveSurferInstance.current.setVolume(volumeRef.current); // Always use ref value
        }
    }, [volume]); // Update volume without affecting song loading

    if (!currentSong) return null;

    return (
        <div className="fixed bottom-0 left-0 w-full bg-neutral-800 text-white p-4 shadow-lg flex flex-col sm:flex-row items-center justify-between z-50">
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

            <div className="flex-1 w-full sm:w-auto mx-4">
                <div ref={waveformRef} className="w-full"></div>
            </div>

            <div className="flex items-center gap-4">
                <button
                    onClick={togglePlay}
                    className="text-white bg-green-600 p-3 rounded-full hover:bg-green-700 transition"
                >
                    {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
                </button>

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
                    className="w-24 h-1 bg-green-600 rounded-lg appearance-none cursor-pointer"
                />
            </div>
        </div>
    );
};

export default MusicPlayer;
