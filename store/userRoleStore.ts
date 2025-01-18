import { create } from "zustand";

interface IUserRole {
    role: string | null;
    setRole: (userRole: string) => void;
}

const useUserRoleStore = create<IUserRole>((set) => ({
    role: null,
    setRole: (userRole) => set((state) => ({ ...state, role: userRole })),
}));

export default useUserRoleStore;
