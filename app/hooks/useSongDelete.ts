import { useState } from "react";

import { supaBaseInstence } from "@/lib/supabaseClient";
import { toast } from "react-toastify";
import { ISongData } from "@/types/song";

const useSongDelete = (
    songData: ISongData[],
    setSongs: React.Dispatch<React.SetStateAction<ISongData[]>>
) => {
    const [loading, setLoading] = useState(false);

    const handleSongDelete = async (songId: string) => {
        setLoading(true);

        // Store deleted song in case of failure
        const deletedSong = songData.find((s) => s.id === songId);

        // Optimistically update UI
        setSongs((prevSongs) => prevSongs.filter((song) => song.id !== songId));

        try {
            const { error } = await supaBaseInstence
                .from("songs")
                .delete()
                .eq("id", songId);

            if (error) throw new Error(error.message);

            toast.success("Song deleted successfully!");
        } catch (error: unknown) {
            console.error("Error deleting song:", (error as Error).message);
            toast.error(`Error deleting song: ${(error as Error).message}`);

            // Restore deleted song on failure
            if (deletedSong) {
                setSongs((prevSongs) => [...prevSongs, deletedSong]);
            }
        } finally {
            setLoading(false);
        }
    };

    return { loading, handleSongDelete };
};

export default useSongDelete;
