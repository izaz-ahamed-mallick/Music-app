import { supaBaseInstence } from "@/lib/supabaseClient";
import { toast } from "react-toastify";

interface ICreateSongForm {
    title: string;
    artist: string;
    album_id: string;

    audio_file_url: string;
}

const useCreateSongs = () => {
    const createSongs = async (data: ICreateSongForm) => {
        const { album_id, artist, audio_file_url, title } = data;

        const { error } = await supaBaseInstence.from("songs").insert([
            {
                title,
                artist,
                album_id: album_id,

                audio_file: audio_file_url,
            },
        ]);

        if (error) {
            toast.error("Error creating song");
            return;
        } else {
            toast.success("Songs created successfully");
            return true;
        }
    };

    return { createSongs };
};

export default useCreateSongs;
