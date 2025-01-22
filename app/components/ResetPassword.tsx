"use client";
import { supaBaseInstence } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

import { useState } from "react";

const ResetPassword = () => {
    const router = useRouter();

    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            setLoading(true);

            const { error: resetError } =
                await supaBaseInstence.auth.updateUser({
                    password,
                });

            if (resetError) {
                setError(`Error resetting password: ${resetError.message}`);
                console.error(resetError.message);
            } else {
                alert("Password reset successful!");
                router.push("/login");
            }
        } catch (err) {
            setError(`An error occurred`);
            console.error("An error occurred:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Reset Your Password</h2>
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="password"
                    placeholder="Enter your new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="p-2 border border-gray-300 rounded"
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="mt-4 p-2 bg-blue-500 text-white rounded"
                >
                    {loading ? "Resetting..." : "Reset Password"}
                </button>
            </form>
        </div>
    );
};

export default ResetPassword;
