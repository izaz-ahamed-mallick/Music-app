"use client";

import React, { useState } from "react";
import { supaBaseInstence } from "@/lib/supabaseClient";
import { useRouter, useParams } from "next/navigation"; // import useParams
import { toast } from "react-toastify";

const UserEdit = () => {
    const [displayName, setDisplayName] = useState("");
    const [loading, setLoading] = useState(false);
    const { id } = useParams(); // Retrieve params using useParams

    const router = useRouter();

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { error } = await supaBaseInstence
                .from("users")
                .update({ username: displayName })
                .eq("id", id);

            if (error) throw error;

            toast.success("Display name updated successfully!");
            setTimeout(() => router.push(`/user/${id}`), 2000);
        } catch (error) {
            toast.error("Failed to update display name. Please try again.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white p-6">
            <div className="max-w-lg w-full bg-white/10 backdrop-blur-md rounded-2xl shadow-lg p-8 border border-white/20">
                <h1 className="text-3xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                    Edit Display Name
                </h1>

                <form onSubmit={handleUpdate} className="space-y-6 mt-6">
                    <div>
                        <label
                            htmlFor="displayName"
                            className="block text-gray-300 font-medium mb-2"
                        >
                            New Display Name
                        </label>
                        <input
                            id="displayName"
                            type="text"
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                            placeholder="Enter your new display name"
                            className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading || !displayName.trim()}
                        className={`w-full py-3 font-semibold rounded-lg transition flex items-center justify-center ${
                            loading
                                ? "bg-gray-600 cursor-not-allowed"
                                : "bg-blue-600 hover:bg-blue-700"
                        }`}
                    >
                        {loading ? (
                            <div
                                aria-live="polite"
                                className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"
                            ></div>
                        ) : (
                            "Update Display Name"
                        )}
                    </button>
                </form>

                <button
                    onClick={() => router.push(`/user/${id}`)}
                    className="mt-6 w-full text-center text-blue-400 hover:underline transition"
                >
                    Cancel and Go Back
                </button>
            </div>
        </div>
    );
};

export default UserEdit;
