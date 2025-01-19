import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IUserRole {
    role: string | null;
    setRole: (userRole: string) => void;
}

const useUserRoleStore = create<IUserRole>()(
    persist(
        (set) => ({
            role: null,
            setRole: (userRole: string) => set({ role: userRole }),
        }),
        {
            name: "user-role",
        }
    )
);

export default useUserRoleStore;
