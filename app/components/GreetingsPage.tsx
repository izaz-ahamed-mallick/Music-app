"use client";

import useUserRoleStore from "@/store/userRoleStore";
import React from "react";

const GreetingsPage = () => {
    const { user } = useUserRoleStore();
    return (
        <div>
            <h1 className="text-3xl mb-4 font-semibold text-white">
                Welcome Back! {`${user.display_name ? user.display_name : ""}`}
            </h1>
        </div>
    );
};

export default GreetingsPage;
