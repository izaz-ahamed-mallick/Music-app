"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FaUserCircle } from "react-icons/fa";
import Button from "./Button";
import useUserRoleStore from "@/store/userRoleStore";
import { useUserAuth } from "@/store/useUserAuth";
import useUserLogout from "../hooks/useUserLogout";

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
    const handleSignUpClick = () => router.push("/auth/signup");
    const handleLoginClick = () => router.push("/auth/login");

    if (!isClient) return null;

    return (
        <div className="relative">
            {isAuthenticated ? (
                <button
                    onClick={toggleDropdown}
                    className="flex items-center gap-x-2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 transition-all"
                >
                    <FaUserCircle size={28} />
                </button>
            ) : (
                <div className="flex justify-between items-center gap-x-4">
                    <div>
                        <Button
                            onClick={handleSignUpClick}
                            className="bg-transparent text-neutral-300 font-medium border px-6 py-2 border-white"
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

            <AnimatePresence>
                {dropdownOpen && isAuthenticated && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute right-0 mt-2 w-52 bg-gray-900 rounded-lg shadow-lg overflow-hidden z-50 border border-gray-700"
                    >
                        <div className="py-3 px-4 text-white text-sm font-semibold">
                            {user.role === "user"
                                ? `User - ${user.display_name}`
                                : `Admin - ${user.display_name}`}
                        </div>
                        <div className="border-t border-gray-700">
                            {user.role === "admin" && (
                                <button
                                    onClick={() => {
                                        router.push("/admin");
                                        setDropdownOpen(false);
                                    }}
                                    className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-800"
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
                                    className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-800"
                                >
                                    User Account
                                </button>
                            )}
                            <button
                                onClick={UserLogout}
                                className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-800"
                            >
                                Logout
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AuthDropdown;
