import { supaBaseInstence } from "@/lib/supabaseClient";
import { toast } from "react-toastify";
interface ICreateAlbumForm {
    albumName: string;
    artist: string;
    releaseDate: string;
    coverImageUrl: string;
}

const useCreateAlbum = () => {
    const createAlbum = async (data: ICreateAlbumForm) => {
        const { albumName, artist, releaseDate, coverImageUrl } = data;

        const { error } = await supaBaseInstence
            .from("albums")
            .insert([
                {
                    album_name: albumName,
                    artist: artist,
                    release_date: releaseDate,
                    cover_image: coverImageUrl,
                },
            ])
            .select("*");

        if (error) {
            toast.error("Error creating album");
            return;
        } else {
            toast.success("Album created successfully");
            return true;
        }
    };

    return { createAlbum };
};

export default useCreateAlbum;
