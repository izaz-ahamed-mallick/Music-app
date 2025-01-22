import { useForm } from "react-hook-form";
import { supaBaseInstence } from "@/lib/supabaseClient";

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

    const onSubmit = async (data: IForgotPassData) => {
        const { email } = data;

        const { error } = await supaBaseInstence.auth.resetPasswordForEmail(
            email,
            {
                redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/reset-password`,
            }
        );

        if (error) {
            console.error("Error resetting password:", error.message);
        } else {
            onClose();
            alert("Password reset email sent!");
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
                    {...register("email", { required: "Email is required" })}
                    className="w-full p-3 border border-gray-300 rounded-md text-sm"
                    placeholder="Enter your email"
                />
                {errors.email && (
                    <p className="text-red-500 text-xs mt-1">
                        {errors.email.message}
                    </p>
                )}
            </div>

            <div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 focus:outline-none"
                >
                    Send Reset Link
                </button>
            </div>
        </form>
    );
};

export default ForgotPassword;
