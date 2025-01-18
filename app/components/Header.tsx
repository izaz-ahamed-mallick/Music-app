"use client";

import React from "react";
import { twMerge } from "tailwind-merge";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { useRouter } from "next/navigation";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import Button from "./Button";
import useUserRoleStore from "@/store/userRoleStore";

interface HeaderProps {
    children: React.ReactNode;
    className?: string;
}

const Header: React.FC<HeaderProps> = ({ children, className }) => {
    const router = useRouter();
    const { role } = useUserRoleStore();

    const handleSignUpClick = () => {
        // Perform actions for sign up
        console.log("Sign Up button clicked!");
        // You can redirect to the sign-up page
        router.push("/auth/signup");
    };

    const handleLoginClick = () => {
        // Redirect to the login page
        router.push("/auth/login");
    };

    return (
        <div
            className={twMerge(
                `h-fit bg-gradient-to-b from-emerald-900 p-6`,
                className
            )}
        >
            <div className="w-full mb-4 flex items-center justify-between">
                <div className="hidden md:flex gap-x-2 items-center">
                    <button
                        onClick={() => router.back()}
                        className="rounded-full bg-black flex items-center justify-center hover:opacity-75 transition"
                    >
                        <RxCaretLeft className="text-white " size={32} />
                    </button>
                    <button
                        onClick={() => router.forward()}
                        className="rounded-full bg-black flex items-center justify-center hover:opacity-75 transition"
                    >
                        <RxCaretRight className="text-white " size={32} />
                    </button>
                </div>

                <div className="flex md:hidden gap-x-2 items-center">
                    <button className="rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition-all">
                        <HiHome className="text-black" size={20} />
                    </button>
                    <button className="rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition-all">
                        <BiSearch className="text-black" size={20} />
                    </button>
                </div>
                {
                    <div className="flex justify-between items-center gap-x-4 ">
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
                }

                <div>
                    {role ? (
                        <>
                            <h1>
                                Welcome, {role === "user" ? "User" : "Admin"}
                            </h1>
                            {role === "admin" && <button>Admin Panel</button>}
                        </>
                    ) : null}
                </div>
            </div>
            {children}
        </div>
    );
};

export default Header;
