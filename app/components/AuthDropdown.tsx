import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import Button from "./Button";
import useUserRoleStore from "@/store/userRoleStore";
import { useUserAuth } from "@/store/useUserAuth";
import useUserLogout from "../hooks/useUserLogout";
import { FaUserCircle } from "react-icons/fa";

const AuthDropdown: React.FC = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const { user } = useUserRoleStore();
    const { isAuthenticated } = useUserAuth();
    const router = useRouter();
    const { UserLogout } = useUserLogout();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const toggleDropdown = () => setDropdownOpen((prev) => !prev);

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
                    <FaUserCircle size={24} />
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
                        <p className="text-sm text-gray-700 font-semibold">
                            {user.role == "user"
                                ? `User-${user.display_name}`
                                : `Admin-${user.display_name}`}
                        </p>
                        {user.role === "admin" && (
                            <button
                                onClick={() => {
                                    router.push("/admin");
                                    setDropdownOpen(false);
                                }}
                                className="text-sm text-blue-600 hover:text-blue-800 w-full text-left py-2"
                            >
                                Admin Panel
                            </button>
                        )}
                        {user.role === "user" && (
                            <button
                                onClick={() => {
                                    router.push(`/user/${user.id}`);
                                    setDropdownOpen(false);
                                }}
                                className="text-sm text-blue-600 hover:text-blue-800 w-full text-left py-2"
                            >
                                User account
                            </button>
                        )}
                        <button
                            onClick={UserLogout}
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
