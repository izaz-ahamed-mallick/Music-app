import { supaBaseInstence } from "@/lib/supabaseClient";
import { IAlbumData } from "@/types/album";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IAddedAlbumData {
    addedAlbumList: IAlbumData[];
    addFavoriteAlbumData: (userId: string, album: IAlbumData) => void;
    fetchFavoriteAlbum: (userId: string) => Promise<void>;
    removeFavoriteAlbum: (id: string, albumId: string) => void;
    removeFavoriteonLogOut: () => void;
}

export const useAddedAlbumStore = create<IAddedAlbumData>()(
    persist(
        (set) => ({
            addedAlbumList: [],
            fetchFavoriteAlbum: async (userId: string) => {
                const { error, data: favoriteAlbum } = await supaBaseInstence
                    .from("favorite_album")
                    .select("album_id")
                    .eq("user_id", userId);
                if (error) {
                    console.error("Error fetching favorite albums:", error);
                    return;
                }

                if (!favoriteAlbum || favoriteAlbum.length === 0) {
                    console.log("No favorite albums found for this user.");
                    return;
                }

                if (favoriteAlbum && favoriteAlbum.length > 0) {
                    const albumIds = favoriteAlbum.map((fa) => fa.album_id);
                    const { data: albums, error: albumError } =
                        await supaBaseInstence
                            .from("albums")
                            .select("*")
                            .in("id", albumIds);

                    if (albumError) {
                        console.log("Error fetching Album data");
                        return;
                    }

                    set({ addedAlbumList: albums || [] });
                }
            },
            addFavoriteAlbumData: async (userId, album: IAlbumData) => {
                const { error } = await supaBaseInstence
                    .from("favorite_album")
                    .insert([
                        {
                            user_id: userId,
                            album_id: album.id,
                        },
                    ]);

                if (error) {
                    console.error("Error adding favorite album:", error);
                } else {
                    set((state) => ({
                        addedAlbumList: [...state.addedAlbumList, album],
                    }));
                }
            },
            removeFavoriteAlbum: async (UserId, albumId) => {
                const { error } = await supaBaseInstence
                    .from("favorite_album")
                    .delete()
                    .match({ user_id: UserId, album_id: albumId });

                if (error) {
                    console.error("Error removing favorite album:", error);
                } else {
                    set((state) => ({
                        addedAlbumList: state.addedAlbumList.filter(
                            (album) => album.id !== albumId
                        ),
                    }));
                }
            },
            removeFavoriteonLogOut: () => {
                set({ addedAlbumList: [] });
            },
        }),
        {
            name: "added-album-store",
        }
    )
);
