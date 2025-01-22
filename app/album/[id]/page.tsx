import { supaBaseInstence } from "@/lib/supabaseClient";
import Image from "next/image";

const fetchAlbumAndSongs = async (id: string) => {
    if (id) {
        const { data: albumData, error: albumError } = await supaBaseInstence
            .from("albums")
            .select("album_name, cover_image, artist, release_date")
            .eq("id", id)
            .single();

        const { data: songs, error: songError } = await supaBaseInstence
            .from("songs")
            .select("*")
            .eq("album_id", id);

        if (albumError || songError) {
            console.error(
                "Error fetching album or songs:",
                albumError || songError
            );
            return null;
        }

        return { albumData, songs };
    }
};

export default async function AlbumPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const id = (await params).id;
    const albumInfo = await fetchAlbumAndSongs(id as string);

    if (!albumInfo) {
        return (
            <div className="text-white text-center mt-20">
                <h1 className="text-2xl font-semibold">Album not found</h1>
            </div>
        );
    }

    const { albumData, songs } = albumInfo;

    return (
        <div className="px-6 py-8">
            {/* Album Info Section */}
            <div className="flex items-center gap-6 mb-8">
                <div className="relative w-48 h-48 rounded-lg overflow-hidden shadow-lg">
                    <Image
                        priority
                        src={albumData.cover_image}
                        alt={albumData.album_name}
                        fill
                        className="object-cover"
                    />
                </div>
                <div>
                    <h1 className="text-4xl text-white font-bold">
                        {albumData.album_name}
                    </h1>
                    <p className="text-lg text-gray-400 mt-2">
                        By{" "}
                        <span className="text-green-400">
                            {albumData.artist}
                        </span>
                    </p>
                    <p className="text-gray-500 mt-1 text-sm">
                        Released on{" "}
                        {new Date(albumData.release_date).toLocaleDateString()}
                    </p>
                </div>
            </div>

            <div className="mt-10">
                <h2 className="text-2xl text-white font-semibold mb-6">
                    Songs in this Album
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {songs?.map((song) => (
                        <div
                            key={song.id}
                            className="p-4 bg-neutral-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                        >
                            <h3 className="text-xl text-white font-semibold">
                                {song.title}
                            </h3>
                            <p className="text-sm text-gray-400 mt-1">
                                {song.artist}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
