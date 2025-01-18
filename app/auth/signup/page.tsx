"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { supaBaseInstence } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

type FormData = {
    email: string;
    password: string;
};

const SignUpPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();

    // Form submission handler
    const onSubmit = async (data: FormData) => {
        setLoading(true);
        setErrorMessage(null); // Clear any previous error messages

        try {
            const { email, password } = data;
            const { data: signUpData, error } =
                await supaBaseInstence.auth.signUp({
                    email,
                    password,
                });

            if (error) {
                console.log(error);
                if (error.message.includes("email already in use")) {
                    setErrorMessage(
                        "This email is already in use. Please try logging in."
                    );
                } else {
                    setErrorMessage(error.message);
                }
            } else {
                const user = signUpData?.user;
                console.log(user);

                if (user) {
                    router.push("/auth/login");
                }
            }
        } catch (er) {
            console.log(er);
            setErrorMessage("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen ">
            <div className=" bg-gradient-to-b from-emerald-900 p-6 rounded-lg shadow-md w-96">
                <h2 className="text-xl font-semibold mb-4 text-center">
                    Sign Up
                </h2>

                {/* Display Error Message */}
                {errorMessage && (
                    <p className="text-red-500 text-center">{errorMessage}</p>
                )}

                {/* SignUp Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Email */}
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            {...register("email", {
                                required: "Email is required",
                            })}
                            className="w-full mt-2 px-3 py-2 border rounded-md"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    {/* Password */}
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            {...register("password", {
                                required: "Password is required",
                            })}
                            className="w-full mt-2 px-3 py-2 border rounded-md"
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full mt-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 transition ${
                            loading && "opacity-50"
                        }`}
                    >
                        {loading ? "Signing Up..." : "Sign Up"}
                    </button>
                </form>

                {/* Redirect to login if already have an account */}
                <p className="mt-4 text-center text-sm">
                    Already have an account?{" "}
                    <a
                        href="/auth/login"
                        className="text-blue-500 hover:underline"
                    >
                        Login here
                    </a>
                </p>
            </div>
        </div>
    );
};

export default SignUpPage;
