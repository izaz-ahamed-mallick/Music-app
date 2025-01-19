import { useState } from "react";
import { supaBaseInstence } from "@/lib/supabaseClient";

const useCreateUrlFromStorage = () => {
    const [error, setError] = useState<string | null>(null);

    const uploadFileToAlbum = async (
        file: File | string,
        albumName: string
    ): Promise<string | null> => {
        if (typeof file === "string") {
            return file;
        }
        const filePath = `${albumName}/${Date.now()}_${file.name}`;

        const { data: albumPath, error: uploadError } =
            await supaBaseInstence.storage
                .from(albumName)
                .upload(filePath, file);

        if (uploadError) {
            setError(`Error uploading cover image: ${uploadError.message}`);
            return null;
        }

        if (!albumPath) {
            return null;
        }

        const { data: urlData } = supaBaseInstence.storage
            .from(albumName)
            .getPublicUrl(albumPath.path);

        if (!urlData || !urlData.publicUrl) {
            setError("Error getting image public URL.");
            return null;
        }

        return urlData.publicUrl;
    };

    return {
        error,
        uploadFileToAlbum,
    };
};

export default useCreateUrlFromStorage;
