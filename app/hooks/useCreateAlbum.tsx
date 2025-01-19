import { supaBaseInstence } from "@/lib/supabaseClient";
interface ICreateAlbumForm {
    albumName: string;
    artist: string;
    releaseDate: string;
    coverImageUrl: string;
}

const useCreateAlbum = () => {
    const createAlbum = async (data: ICreateAlbumForm) => {
        const { albumName, artist, releaseDate, coverImageUrl } = data;

        const { data: albumData, error } = await supaBaseInstence
            .from("albums")
            .insert([
                {
                    album_name: albumName,
                    artist: artist,
                    release_date: releaseDate,
                    cover_image: coverImageUrl,
                },
            ]);

        if (error) {
            console.error("Error creating album:", error);
            return;
        } else {
            console.log("Album created successfully:", albumData);
            return true;
        }
    };

    return { createAlbum };
};

export default useCreateAlbum;
