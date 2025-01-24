"use client";
import { supaBaseInstence } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

import { useState } from "react";
import { toast } from "react-toastify";

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const router = useRouter();

    const handlePasswordReset = async () => {
        if (!newPassword) {
            toast.error("Please enter a new password.");
            return;
        }

        setLoading(true);
        const { error } = await supaBaseInstence.auth.updateUser({
            password: newPassword,
        });
        setLoading(false);

        if (error) {
            setMessage(`Error: ${error.message}`);
            toast.error(error.message);
        } else {
            setMessage("Password updated successfully!");
            toast.success("Password updated successfully!");
            router.push("/auth/login");
        }
    };

    return (
        <div>
            <h1>Reset Password</h1>
            <input
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
            />
            <button onClick={handlePasswordReset} disabled={loading}>
                {loading ? "Updating..." : "Update Password"}
            </button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default ResetPassword;
