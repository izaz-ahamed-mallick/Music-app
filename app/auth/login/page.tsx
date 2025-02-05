"use client";

import { Suspense, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import useUserRole from "@/app/hooks/useUserRole";
import { toast } from "react-toastify";
import { useSearchParams } from "next/navigation";
import Modal from "@/app/components/Modal";
import ForgotPassword from "@/app/components/ForgotPassword";

interface FormData {
    email: string;
    password: string;
}
const LoginPage = () => {
    const { errorMessage, loading, onLogin } = useUserRole();

    const [isOpen, setIsOpen] = useState(false);
    const searchParams = useSearchParams();

    useEffect(() => {
        const sessionExpired = searchParams.get("sessionExpired");
        if (sessionExpired) {
            toast.error("Your session has expired. Please log in again.");
        }
    }, [searchParams]);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>();

    const onSubmit = async (data: FormData) => {
        onLogin(data.email, data.password);
    };

    return (
        <div className="flex justify-center items-center ">
            <div className="bg-gradient-to-b from-emerald-900 p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-semibold text-center text-white mb-4">
                    Login
                </h2>

                {errorMessage && (
                    <p className="text-red-500 text-center mb-4">
                        {errorMessage}
                    </p>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-300"
                        >
                            Email Address
                        </label>
                        <input
                            id="email"
                            type="email"
                            {...register("email", {
                                required: "Email is required",
                            })}
                            className="mt-1 block w-full px-4 py-2 border rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-300"
                        >
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            {...register("password", {
                                required: "Password is required",
                            })}
                            className="mt-1 block w-full px-4 py-2 border rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    <div className="flex justify-between items-center">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 disabled:opacity-50"
                        >
                            {loading ? "Logging in..." : "Login"}
                        </button>
                    </div>
                </form>

                <div className="mt-4 text-center">
                    <p className="text-sm text-gray-400">
                        Don&apos;t have an account?{" "}
                        <a
                            href="/auth/signup"
                            className="text-blue-500 hover:underline"
                        >
                            Sign up
                        </a>
                    </p>
                    <button
                        onClick={() => setIsOpen(true)}
                        className="text-blue-500 hover:underline"
                    >
                        Forgot Password?
                    </button>
                </div>
            </div>
            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <ForgotPassword onClose={() => setIsOpen(false)} />
            </Modal>
        </div>
    );
};

const SuspenseLoginPage = () => (
    <Suspense fallback={<div>Loading...</div>}>
        <LoginPage />
    </Suspense>
);

export default SuspenseLoginPage;
