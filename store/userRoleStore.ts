import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IUser {
    id: string | null;
    role: string | null;
    display_name: string | null;
}

interface IUserRoleStore {
    user: IUser;
    setRole: (user: IUser) => void;
    removeUserDetails: () => void;
}

const useUserRoleStore = create<IUserRoleStore>()(
    persist(
        (set) => ({
            user: { id: null, role: null, display_name: null },
            setRole: (user: IUser) =>
                set({
                    user: {
                        id: user.id,
                        role: user.role,
                        display_name: user.display_name,
                    },
                }),
            removeUserDetails: () =>
                set({ user: { id: null, role: null, display_name: null } }),
        }),
        {
            name: "user-role",
        }
    )
);

export default useUserRoleStore;
