import { supaBaseInstence } from "@/lib/supabaseClient";
import { IAlbumData } from "@/types/album";
import { useState } from "react";
import { toast } from "react-toastify";

const useAlbumDelete = (
    albumData: IAlbumData[],
    setAlbums: React.Dispatch<React.SetStateAction<IAlbumData[]>>
) => {
    const [loading, setLoading] = useState(false);

    const handleDeleteAlbum = async (albumId: string) => {
        setLoading(true);

        setAlbums((prevAlbums) =>
            prevAlbums.filter((album) => album.id !== albumId)
        );

        try {
            const { error: deleteSongsError } = await supaBaseInstence
                .from("songs")
                .delete()
                .match({ album_id: albumId });

            if (deleteSongsError) {
                throw new Error(deleteSongsError.message);
            }

            const { error } = await supaBaseInstence
                .from("albums")
                .delete()
                .match({ id: albumId });

            if (error) {
                throw new Error(error.message);
            }

            toast.success("Album deleted successfully!");
        } catch (error: unknown) {
            console.error("Error deleting album:", (error as Error).message);
            toast.error(`Error deleting album: ${(error as Error).message}`);

            setAlbums((prevAlbums) => [
                ...prevAlbums,
                albumData.find((a) => a.id === albumId)!,
            ]);
        } finally {
            setLoading(false);
        }
    };

    return { handleDeleteAlbum, loading };
};

export default useAlbumDelete;
