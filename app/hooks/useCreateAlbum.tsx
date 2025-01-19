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

    const uploadCoverImage = async (file: File) => {
        const filePath = `album-covers/${Date.now()}_${file.name}`;
        const { data: albumPath, error } = await supaBaseInstence.storage
            .from("album-covers")
            .upload(filePath, file);

        if (error) {
            console.error("Error uploading cover image:", error);
            return "";
        }

        if (!albumPath) {
            return;
        }
        const { data: urlData } = supaBaseInstence.storage
            .from("album-covers")
            .getPublicUrl(albumPath.fullPath);

        if (!urlData || !urlData.publicUrl) {
            console.error("Error getting image public URL.");
            return "";
        }

        return urlData.publicUrl;
    };

    return { uploadCoverImage, createAlbum };
};

export default useCreateAlbum;
