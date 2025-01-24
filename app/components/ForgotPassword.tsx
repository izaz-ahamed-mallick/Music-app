import { useState } from "react";
import { useForm } from "react-hook-form";
import { supaBaseInstence } from "@/lib/supabaseClient";
import { toast } from "react-toastify";

interface IForgotPassData {
    email: string;
}

interface IForgotPasswordProps {
    onClose: () => void;
}

const ForgotPassword: React.FC<IForgotPasswordProps> = ({ onClose }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IForgotPassData>();

    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const onSubmit = async (data: IForgotPassData) => {
        setLoading(true);
        setErrorMessage(null);
        setSuccessMessage(null);

        const { email } = data;

        const { error } = await supaBaseInstence.auth.resetPasswordForEmail(
            email,
            {
                redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/reset-password`,
            }
        );

        setLoading(false);

        if (error) {
            setErrorMessage(error.message);
        } else {
            setSuccessMessage("Password reset email sent!");
            toast.success("Password reset email sent!");

            onClose();
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <h3 className="text-lg font-semibold text-center">
                Forgot Password
            </h3>

            <div>
                <input
                    type="email"
                    aria-label="Email"
                    {...register("email", {
                        required: "Email is required",
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Invalid email format",
                        },
                    })}
                    className="w-full p-3 border border-gray-300 rounded-md text-sm"
                    placeholder="Enter your email"
                />
                {errors.email && (
                    <p className="text-red-500 text-xs mt-1">
                        {errors.email.message}
                    </p>
                )}
            </div>

            {errorMessage && (
                <p className="text-red-500 text-xs mt-2">{errorMessage}</p>
            )}
            {successMessage && (
                <p className="text-green-500 text-xs mt-2">{successMessage}</p>
            )}

            <div>
                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full p-3 rounded-md focus:outline-none ${
                        loading
                            ? "bg-gray-400"
                            : "bg-blue-500 hover:bg-blue-600 text-white"
                    }`}
                >
                    {loading ? "Sending..." : "Send Reset Link"}
                </button>
            </div>
        </form>
    );
};

export default ForgotPassword;
