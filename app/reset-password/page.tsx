"use client";

import { useRouter } from "next/navigation";
import ResetPassword from "../components/ResetPassword";
import { useEffect, useState } from "react";
import { supaBaseInstence } from "@/lib/supabaseClient";
import { toast } from "react-toastify";

const ResetPasswordPage = () => {
    const router = useRouter();
    const [isTokenValid, setIsTokenValid] = useState<boolean | null>(null);
    const hash = window.location.hash;

    useEffect(() => {
        if (hash && hash.includes("access_token")) {
            const params = new URLSearchParams(hash.substring(1));
            const accessToken = params.get("access_token");
            const refreshToken = params.get("refresh_token");

            if (accessToken && refreshToken) {
                supaBaseInstence.auth.setSession({
                    access_token: accessToken,
                    refresh_token: refreshToken,
                });
                setIsTokenValid(true);
            } else {
                toast.error("Invalid token or missing tokens.");
                setIsTokenValid(false);
                router.push("/");
            }
        } else {
            setIsTokenValid(false);
        }
    }, [router, hash]);

    if (isTokenValid === null) {
        return <p>Loading...</p>;
    }

    if (!isTokenValid) {
        return <p>No access token found or token is invalid.</p>;
    }

    return (
        <div>
            <ResetPassword />
        </div>
    );
};

export default ResetPasswordPage;
