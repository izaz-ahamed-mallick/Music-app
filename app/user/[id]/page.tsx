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
        <div className="p-6 min-h-screen">
            <div className="max-w-3xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden">
                <div className="p-8">
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-6">
                        Welcome,{" "}
                        <span className="text-blue-600">
                            {userData.username || "User"}
                        </span>
                    </h1>
                    <p className="text-lg text-gray-700 mb-4">
                        <span className="font-medium">Email:</span>{" "}
                        {userData.email}
                    </p>
                    <p className="text-lg text-gray-700 mb-4">
                        <span className="font-medium">Role:</span>{" "}
                        {userData.role}
                    </p>

                    <div className="flex gap-6 mt-8">
                        <Link
                            href={`/user/${userData.id}/edit`}
                            className="px-6 py-3 bg-green-600 text-white rounded-lg shadow-lg transform transition-transform hover:-translate-y-1 hover:shadow-xl hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                        >
                            Edit Profile
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
