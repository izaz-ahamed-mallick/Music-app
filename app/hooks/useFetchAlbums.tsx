import { useState, useEffect } from "react";
import { supaBaseInstence } from "@/lib/supabaseClient";
interface IAlbum {
    id: string;
    album_name: string;
}

const useFetchAlbums = (songAlbumId: string) => {
    const [albums, setAlbums] = useState<IAlbum[]>([]);
    const [selectedAlbumName, setSelectedAlbumName] = useState<string>("");

    useEffect(() => {
        const fetchAlbums = async () => {
            const { data, error } = await supaBaseInstence
                .from("albums")
                .select("id, album_name");
            if (error) {
                console.error("Error fetching albums:", error.message);
            } else {
                setAlbums(data || []);

                const selectedAlbum = data?.find(
                    (album) => album.id === songAlbumId
                );
                if (selectedAlbum) {
                    setSelectedAlbumName(selectedAlbum.album_name);
                }
            }
        };

        fetchAlbums();
    }, [songAlbumId]);

    return { albums, selectedAlbumName };
};

export default useFetchAlbums;
