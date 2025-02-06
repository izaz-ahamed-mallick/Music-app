"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import getGreetings from "@/lib/getGreetings";
import useUserRoleStore from "@/store/userRoleStore";

const GreetingsPage = () => {
    const { user } = useUserRoleStore();
    const [time, setTime] = useState<Date | null>(null);

    useEffect(() => {
        setTime(new Date());

        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    if (!time) return null;

    const formattedTime = time.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
    });

    return (
        <div className="relative flex items-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="relative p-8 rounded-3xl backdrop-blur-lg shadow-2xl border border-gray-700 max-w-lg text-left bg-opacity-10"
            >
                <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-teal-500 drop-shadow-lg">
                    Welcome Back,{" "}
                    {user?.display_name ? user.display_name : "Music Lover"}! 🎶
                </h1>

                <p className="mt-4 text-2xl text-white font-medium">
                    {getGreetings()}
                </p>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 drop-shadow-lg font-mono mt-6"
                >
                    {formattedTime}
                </motion.p>
            </motion.div>
        </div>
    );
};

export default GreetingsPage;
