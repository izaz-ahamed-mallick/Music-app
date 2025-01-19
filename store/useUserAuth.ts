import { create } from "zustand";
import Cookies from "js-cookie";
interface AuthState {
    isAuthenticated: boolean;

    setAuth: (auth: boolean) => void;
}

export const useUserAuth = create<AuthState>((set) => ({
    isAuthenticated: !!Cookies.get("access_token"),
    setAuth: (auth) => set({ isAuthenticated: auth }),
}));
