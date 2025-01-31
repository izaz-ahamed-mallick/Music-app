import { useState } from "react";
import { supaBaseInstence } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import useUserRoleStore from "@/store/userRoleStore";
import Cookies from "js-cookie";
import { useUserAuth } from "@/store/useUserAuth";
import { useAddedAlbumStore } from "@/store/useAddedAlbumStore";

const useUserRole = () => {
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const router = useRouter();
    const { setRole } = useUserRoleStore();
    const { setAuth } = useUserAuth();
    const { fetchFavoriteAlbum } = useAddedAlbumStore();

    const checkUserRole = async (userId: string) => {
        const { data, error } = await supaBaseInstence
            .from("users")
            .select("role,username,id")
            .eq("id", userId)
            .single();

        if (error) {
            console.error("Error fetching user role:", error);
            return null;
        }
        console.log("User data", data);
        return data;
    };

    const onLogin = async (email: string, password: string) => {
        setLoading(true);
        setErrorMessage(null);

        try {
            const { data: userData, error } =
                await supaBaseInstence.auth.signInWithPassword({
                    email,
                    password,
                });

            if (error) {
                setErrorMessage(error.message);
            } else if (userData) {
                Cookies.set(
                    "access_token",
                    userData.session?.access_token ?? "",
                    {
                        expires: 1,
                        secure: true,
                        sameSite: "Lax",
                    }
                );

                Cookies.set(
                    "refresh_token",
                    userData.session?.refresh_token ?? "",
                    {
                        expires: 7,
                        secure: true,
                        sameSite: "Lax",
                    }
                );
                setAuth(true);
                const data = await checkUserRole(userData.user?.id);
                if (data) {
                    setRole({
                        display_name: data.username,
                        id: data.id,
                        role: data.role,
                    });

                    fetchFavoriteAlbum(data.id);
                }

                router.replace("/");
            }
        } catch (error) {
            console.log(error);
            setErrorMessage("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };
    return {
        loading,
        errorMessage,
        onLogin,
    };
};

export default useUserRole;
