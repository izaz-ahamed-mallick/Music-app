import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import Cookies from "js-cookie";
import Button from "./Button";
import useUserRoleStore from "@/store/userRoleStore";
import { useUserAuth } from "@/store/useUserAuth";
import { supaBaseInstence } from "@/lib/supabaseClient";
import { useMusicPlayerStore } from "@/store/useMusicPlayerStore";
import { useAddedAlbumStore } from "@/store/useAddedAlbumStore";

const AuthDropdown: React.FC = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const { user } = useUserRoleStore();
    const { isAuthenticated, setAuth } = useUserAuth();
    const router = useRouter();
    const [isClient, setIsClient] = useState(false);
    const { stopPlayback, setCurrentSongNull } = useMusicPlayerStore();
    const { removeUserDetails } = useUserRoleStore();
    const { removeFavoriteonLogOut } = useAddedAlbumStore();

    useEffect(() => {
        setIsClient(true);
    }, []);

    const toggleDropdown = () => setDropdownOpen((prev) => !prev);
    const handleLogout = async () => {
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
    };

    const handleSignUpClick = () => {
        router.push("/auth/signup");
    };

    const handleLoginClick = () => {
        router.push("/auth/login");
    };

    if (!isClient) return null;

    return (
        <div className="relative">
            {isAuthenticated ? (
                <button
                    onClick={toggleDropdown}
                    className="flex items-center gap-x-2 bg-white font-medium text-black p-2 rounded-lg hover:bg-gray-200"
                >
                    {user.role && `${user.role === "user" ? "User" : "Admin"}`}
                </button>
            ) : (
                <div className="flex justify-between items-center gap-x-4">
                    <div>
                        <Button
                            onClick={handleSignUpClick}
                            className="bg-transparent text-neutral-300 font-medium"
                        >
                            Sign up
                        </Button>
                    </div>
                    <div>
                        <Button
                            onClick={handleLoginClick}
                            className="bg-white px-6 py-2"
                        >
                            Log In
                        </Button>
                    </div>
                </div>
            )}

            {dropdownOpen && isAuthenticated && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg overflow-hidden z-50">
                    <div className="py-2 px-4">
                        <p className="text-sm text-gray-700">
                            {user.role == "user" ? "User" : "Admin"}
                        </p>
                        {user.role === "admin" && (
                            <button
                                onClick={() => router.push("/admin")}
                                className="text-sm text-blue-600 hover:text-blue-800 w-full text-left py-2"
                            >
                                Admin Panel
                            </button>
                        )}
                        {user.role === "user" && (
                            <button
                                onClick={() => router.push(`/user/${user.id}`)}
                                className="text-sm text-blue-600 hover:text-blue-800 w-full text-left py-2"
                            >
                                User account
                            </button>
                        )}
                        <button
                            onClick={handleLogout}
                            className="text-sm text-red-600 hover:text-red-800 w-full text-left py-2"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AuthDropdown;
