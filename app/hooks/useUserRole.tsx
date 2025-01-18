import { useState } from "react";
import { supaBaseInstence } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import useUserRoleStore from "@/store/userRoleStore";

const useUserRole = () => {
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const router = useRouter();
    const { setRole } = useUserRoleStore();

    const checkUserRole = async (userId: string) => {
        const { data, error } = await supaBaseInstence
            .from("users")
            .select("role")
            .eq("id", userId)
            .single();

        if (error) {
            console.error("Error fetching user role:", error);
            return null;
        }
        return data.role;
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
                console.log(userData);
                const role = await checkUserRole(userData.user?.id);
                setRole(role);
                router.push("/");
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
