import { supaBaseInstence } from "@/lib/supabaseClient";

interface ICreateSongForm {
    title: string;
    artist: string;
    album_id: string;

    audio_file_url: string;
}

const useCreateSongs = () => {
    const createSongs = async (data: ICreateSongForm) => {
        const { album_id, artist, audio_file_url, title } = data;

        const { data: songData, error } = await supaBaseInstence
            .from("songs")
            .insert([
                {
                    title,
                    artist,
                    album_id: album_id,

                    audio_file: audio_file_url,
                },
            ]);

        if (error) {
            console.error("Error creating song:", error);
            return;
        } else {
            console.log("Songs created successfully:", songData);
            return true;
        }
    };

    return { createSongs };
};

export default useCreateSongs;
