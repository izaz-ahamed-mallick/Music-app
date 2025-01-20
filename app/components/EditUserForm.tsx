import React from "react";
import { useForm } from "react-hook-form";
import { supaBaseInstence } from "@/lib/supabaseClient";
import { IUserData } from "../admin/UserManagement";

interface FormData {
    username: string;
    email: string;
    role: string;
}

const EditUserForm = ({
    user,
    onClose,
    onSave,
}: {
    user: IUserData;
    onClose: () => void;
    onSave: () => void;
}) => {
    const {
        register,
        handleSubmit,

        formState: { errors },
    } = useForm<FormData>({
        defaultValues: {
            email: user.email,
            role: user.role,
            username: user.username,
        },
    });

    // Handle form submission
    const onSubmit = async (data: FormData) => {
        const { email, role, username } = data;

        if (email || role || username) {
            console.log("helloooooooo");
            const { error } = await supaBaseInstence
                .from("users")
                .update({
                    username: username,
                    email: email,
                    role: role,
                })
                .eq("id", user.id)
                .select();

            if (error) {
                console.error("Error updating album:", error.message);
            } else {
                onSave();
                onClose();
            }
        } else {
            onClose();
        }
    };

    return (
        <div className="w-full max-w-lg bg-white bg-opacity-10 backdrop-blur-lg p-6 rounded-xl shadow-lg border border-gray-300">
            <h2 className="text-4xl font-semibold text-center text-blue-600 mb-6">
                Update Album Details
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="relative">
                    <label
                        htmlFor="albumName"
                        className="block text-lg font-medium text-gray-100 mb-2"
                    >
                        User Name
                    </label>
                    <input
                        id="albumName"
                        type="text"
                        placeholder="Enter album name"
                        className="w-full p-3 bg-white bg-opacity-20 border border-gray-400 rounded-lg text-gray-100 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        {...register("username", {
                            required: "User Name is required",
                        })}
                    />
                    {errors.username && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.username.message}
                        </p>
                    )}
                </div>

                <div className="relative">
                    <label
                        htmlFor="artist"
                        className="block text-lg font-medium text-gray-100 mb-2"
                    >
                        Email
                    </label>
                    <input
                        id="artist"
                        type="text"
                        placeholder="Enter artist name"
                        className="w-full p-3 bg-white bg-opacity-20 border border-gray-400 rounded-lg text-gray-100 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        {...register("email", {
                            required: "Email is required",
                        })}
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.email.message}
                        </p>
                    )}
                </div>

                <div className="relative">
                    <label
                        htmlFor="role"
                        className="block text-lg font-medium text-gray-100 mb-2"
                    >
                        Role
                    </label>
                    <select
                        id="role"
                        {...register("role", {
                            required: "Album selection is required",
                        })}
                        className="w-full p-3 bg-white bg-opacity-20 border border-gray-400 rounded-lg text-gray-100 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option
                            className="text-black cursor-pointer"
                            value={user.role}
                        >
                            {user.role}
                        </option>
                        <option
                            className="text-black cursor-pointer"
                            value={user.role == "user" ? "admin" : "user"}
                        >
                            {user.role == "user" ? "admin" : "user"}
                        </option>
                    </select>
                    {errors.role && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.role.message}
                        </p>
                    )}
                </div>

                <div className="flex justify-between mt-6">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-6 py-3 text-sm font-medium text-gray-100 bg-gray-700 hover:bg-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-6 py-3 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditUserForm;
