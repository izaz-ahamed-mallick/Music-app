import { supaBaseInstence } from "@/lib/supabaseClient";
import { useAddedAlbumStore } from "@/store/useAddedAlbumStore";
import { useMusicPlayerStore } from "@/store/useMusicPlayerStore";
import useUserRoleStore from "@/store/userRoleStore";
import { useUserAuth } from "@/store/useUserAuth";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const useUserLogout = () => {
    const { stopPlayback, setCurrentSongNull } = useMusicPlayerStore();
    const { removeUserDetails } = useUserRoleStore();
    const { removeFavoriteonLogOut } = useAddedAlbumStore();
    const { setAuth } = useUserAuth();
    const router = useRouter();
    async function UserLogout() {
        try {
            const { error } = await supaBaseInstence.auth.signOut();

            if (error) {
                console.error("Error during logout:", error.message);
                return;
            }

            Cookies.remove("access_token");

            setAuth(false);
            stopPlayback();
            setCurrentSongNull();
            removeUserDetails();
            removeFavoriteonLogOut();

            router.push("/auth/login");
        } catch (err) {
            console.error("Unexpected error during logout:", err);
        }
    }

    return { UserLogout };
};

export default useUserLogout;
