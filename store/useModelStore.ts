import { create } from "zustand";

interface IModelStore {
    isAlbumModalOpen: boolean;
    openAlbumModal: () => void;
    closeAlbumModal: () => void;
}

export const useModelStore = create<IModelStore>((set) => ({
    isAlbumModalOpen: false,
    openAlbumModal: () => set({ isAlbumModalOpen: true }),
    closeAlbumModal: () => set({ isAlbumModalOpen: false }),
}));
