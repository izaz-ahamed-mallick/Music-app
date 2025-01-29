import { useAddedAlbumStore } from "@/store/useAddedAlbumStore";
import Image from "next/image";
import Link from "next/link";

const FavoriteAlbums = () => {
    const { addedAlbumList } = useAddedAlbumStore();
    return (
        <>
            {addedAlbumList.length > 0 ? (
                <div className="space-y-2">
                    {addedAlbumList.map((album) => (
                        <Link
                            href={`/album/${album.id}`}
                            key={album.id}
                            className="flex items-center justify-between p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors duration-300"
                        >
                            <div className="flex items-center space-x-4">
                                <Image
                                    width={20}
                                    height={20}
                                    src={album.cover_image}
                                    alt={album.album_name}
                                    className="object-cover rounded-md"
                                    style={{ width: "auto", height: "auto" }} // Ensure aspect ratio is preserved
                                />
                                <p className="text-lg font-medium">
                                    {album.album_name}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <p className="text-left text-gray-400">
                    You have no favorite albums yet. If you want to add favorite
                    login first
                </p>
            )}
        </>
    );
};
export default FavoriteAlbums;
