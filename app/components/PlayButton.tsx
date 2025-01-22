"use client";

interface PlayButtonProps {
    audioUrl: string;
}

export default function PlayButton({ audioUrl }: PlayButtonProps) {
    const playSong = () => {
        if (!audioUrl) {
            console.error("Audio URL is missing or invalid.");
            return;
        }

        const audio = new Audio(audioUrl);

        audio.onerror = () => {
            console.error("Failed to load the audio file:", audioUrl);
        };

        audio.play().catch((err) => {
            console.error("Error playing the audio:", err);
        });
    };

    return (
        <button
            onClick={playSong}
            className="absolute bottom-4 right-4 w-10 h-10 flex items-center justify-center bg-green-500 rounded-full shadow-md group-hover:shadow-lg hover:bg-green-600 transition-all duration-300"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="white"
                className="w-6 h-6"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.752 11.168l-6.518-3.759A1 1 0 007 8.272v7.456a1 1 0 001.234.963l6.518-1.802a1 1 0 00.754-.963v-3.74a1 1 0 00-.754-.963z"
                />
            </svg>
        </button>
    );
}
