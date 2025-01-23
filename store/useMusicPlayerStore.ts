import { create } from "zustand";
interface PlayerState {
    currentSong: {
        id: string;
        title: string;
        artist: string;
        audioUrl: string;
    } | null;
    isPlaying: boolean;
    setSong: (song: PlayerState["currentSong"]) => void;
    togglePlay: () => void;
    stopPlayback: () => void;
}

export const useMusicPlayerStore = create<PlayerState>((set) => ({
    currentSong: null,
    isPlaying: false,
    setSong: (song) => set({ currentSong: song, isPlaying: true }),
    togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
    stopPlayback: () => set({ isPlaying: false }),
}));
