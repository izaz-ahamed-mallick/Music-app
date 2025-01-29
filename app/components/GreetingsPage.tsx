"use client";

import { motion } from "framer-motion";
import getGreetings from "@/lib/getGreetings";
import useUserRoleStore from "@/store/userRoleStore";

const GreetingsPage = () => {
    const { user } = useUserRoleStore();

    return (
        <div className="relative">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="relative  p-6 rounded-2xl backdrop-blur-lg shadow-xl border border-gray-700 max-w-lg "
            >
                <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 animate-pulse">
                    Welcome Back! {user?.display_name ? user.display_name : ""}
                </h1>
                <p className="mt-4 text-2xl text-gray-300">{getGreetings()}</p>
            </motion.div>
        </div>
    );
};

export default GreetingsPage;
