"use client";

import React, { useState } from "react";
import { supaBaseInstence } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
interface UserProfileProps {
    params: { id: string };
}

const UserEdit = ({ params }: UserProfileProps) => {
    const [displayName, setDisplayName] = useState("");
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();

        setLoading(true);

        try {
            const { error } = await supaBaseInstence
                .from("users")
                .update({ username: displayName })
                .eq("id", params.id);

            if (error) {
                throw error;
            }

            toast.success("Display name updated successfully!");
            setTimeout(() => router.push(`/user/${params.id}`), 2000);
        } catch (error) {
            toast.error("An error occurred.");
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 min-h-screen flex items-center justify-center">
            <div className="bg-white shadow-2xl rounded-lg p-8 max-w-lg w-full">
                <h1 className="text-2xl font-bold text-gray-900 mb-6">
                    Edit Display Name
                </h1>
                <form onSubmit={handleUpdate} className="space-y-6">
                    <div>
                        <label
                            htmlFor="displayName"
                            className="block text-gray-700 font-medium mb-2"
                        >
                            New Display Name
                        </label>
                        <input
                            id="displayName"
                            type="text"
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                            placeholder="Enter your new display name"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading || !displayName.trim()}
                        className={`w-full py-3 text-white font-semibold rounded-lg transition ${
                            loading
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-blue-600 hover:bg-blue-700"
                        }`}
                    >
                        {loading ? "Updating..." : "Update Display Name"}
                    </button>
                </form>

                <button
                    onClick={() => router.push(`/user/${params.id}`)}
                    className="mt-6 text-blue-600 hover:underline"
                >
                    Cancel and Go Back
                </button>
            </div>
        </div>
    );
};

export default UserEdit;
