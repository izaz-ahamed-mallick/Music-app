import { useState } from "react";
import { supaBaseInstence } from "@/lib/supabaseClient";

const useCreateUrlFromStorage = () => {
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const uploadFileToAlbum = async (
        file: File,
        albumName: string
    ): Promise<string | null> => {
        setIsUploading(true);
        setError(null);

        const filePath = `${albumName}/${Date.now()}_${file.name}`;

        const { data: albumPath, error: uploadError } =
            await supaBaseInstence.storage
                .from(albumName)
                .upload(filePath, file);

        if (uploadError) {
            setIsUploading(false);
            setError(`Error uploading cover image: ${uploadError.message}`);
            return null;
        }

        if (!albumPath) {
            setIsUploading(false);
            return null;
        }

        const { data: urlData } = supaBaseInstence.storage
            .from(albumName)
            .getPublicUrl(albumPath.fullPath);

        if (!urlData || !urlData.publicUrl) {
            setIsUploading(false);
            setError("Error getting image public URL.");
            return null;
        }

        setIsUploading(false);
        return urlData.publicUrl;
    };

    return {
        uploadFileToAlbum,
        isUploading,
        error,
    };
};

export default useCreateUrlFromStorage;
