import { supaBaseInstence } from "@/lib/supabaseClient";
import { notFound } from "next/navigation";
import Link from "next/link";

interface UserProfileProps {
    params: { id: string };
}

const UserProfile = async ({ params }: UserProfileProps) => {
    const { id } = params;

    // Fetch user data from Supabase
    const { data: userData, error } = await supaBaseInstence
        .from("users")
        .select("*")
        .eq("id", id)
        .single();

    // Handle errors or missing user
    if (error || !userData) {
        return notFound();
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white flex items-center justify-center p-6">
            <div className="max-w-2xl w-full bg-white/10 backdrop-blur-md rounded-2xl shadow-lg p-8 border border-white/20">
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                        {userData.username || "User"}
                    </h1>
                    <p className="text-gray-300 text-lg mt-2">
                        Welcome to your profile!
                    </p>
                </div>

                <div className="mt-6 space-y-4">
                    <div className="bg-white/10 p-4 rounded-lg flex justify-between items-center shadow-md">
                        <span className="text-gray-300 font-medium">Email</span>
                        <span className="text-white">{userData.email}</span>
                    </div>
                    <div className="bg-white/10 p-4 rounded-lg flex justify-between items-center shadow-md">
                        <span className="text-gray-300 font-medium">Role</span>
                        <span className="text-white capitalize">
                            {userData.role}
                        </span>
                    </div>
                </div>

                <div className="mt-8 flex justify-center">
                    <Link
                        href={`/user/${userData.id}/edit`}
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg transition-all hover:bg-blue-700 hover:shadow-xl transform hover:-translate-y-1"
                    >
                        Edit Profile
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
