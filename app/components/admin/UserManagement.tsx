import React, { useState, useEffect, useRef } from "react";
import { supaBaseInstence } from "@/lib/supabaseClient";

import Modal from "../Modal";
import EditUserForm from "../EditUserForm";

export interface IUserData {
    id: string;
    email: string;
    username: string;
    role: string;
}

const UserManagement = () => {
    const [users, setUsers] = useState<IUserData[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<IUserData | null>(null);
    const fetchUsersRef = useRef<() => Promise<void> | null>(null);

    useEffect(() => {
        fetchUsersRef.current = async () => {
            const { data, error } = await supaBaseInstence
                .from("users")
                .select("id,role,username,email");
            if (error) {
                console.error("Error fetching users:", error.message);
            } else {
                console.log(data);
                setUsers(data);
            }
        };

        fetchUsersRef.current();
    }, []);

    const filteredUsers = users.filter(
        (user) =>
            (user.username?.toLowerCase() || "").includes(
                searchQuery.toLowerCase()
            ) ||
            (user.email?.toLowerCase() || "").includes(
                searchQuery.toLowerCase()
            )
    );

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const handleEditUser = (user: IUserData) => {
        setSelectedUser(user);
        setIsEditModalOpen(true);
    };

    const handleSaveChanges = () => {
        setIsEditModalOpen(false);
        if (fetchUsersRef.current) fetchUsersRef.current();
    };

    const handleDeleteUser = async (userId: string) => {
        const { error } = await supaBaseInstence
            .from("users")
            .delete()
            .match({ id: userId });
        if (error) {
            console.error("Error deleting user:", error.message);
        } else {
            setUsers((prevUsers) =>
                prevUsers.filter((user) => user.id !== userId)
            );
        }
    };

    return (
        <div className="p-6 w-full bg-gray-800 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-white mb-4">
                User Management
            </h2>

            <input
                type="text"
                placeholder="Search by username or email"
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full p-3 mb-4 bg-gray-700 text-white rounded-md"
            />

            <div className="mb-4 text-white">
                <span>Total Users: {users.length}</span>
            </div>

            <div className="overflow-x-auto bg-gray-700 rounded-lg">
                <table className="min-w-full">
                    <thead>
                        <tr>
                            <th className="text-left text-white py-2 px-4">
                                Username
                            </th>
                            <th className="text-left text-white py-2 px-4">
                                Email
                            </th>
                            <th className="text-left text-white py-2 px-4">
                                Role
                            </th>
                            <th className="text-left text-white py-2 px-4">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map((user) => (
                            <tr
                                key={user.id}
                                className="border-t border-gray-600"
                            >
                                <td className="py-2 px-4 text-white">
                                    {user.username}
                                </td>
                                <td className="py-2 px-4 text-white">
                                    {user.email}
                                </td>
                                <td className="py-2 px-4 text-white">
                                    {user.role}
                                </td>
                                <td className="py-2 px-4">
                                    <button
                                        onClick={() => handleEditUser(user)}
                                        className="text-blue-500 mr-2 hover:underline"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleDeleteUser(user.id)
                                        }
                                        className="text-red-500 hover:underline"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Edit User Modal */}
            {isEditModalOpen && selectedUser && (
                <Modal
                    isOpen={isEditModalOpen}
                    onClose={() => setIsEditModalOpen(false)}
                >
                    <EditUserForm
                        user={selectedUser}
                        onClose={() => setIsEditModalOpen(false)}
                        onSave={handleSaveChanges}
                    />
                </Modal>
            )}
        </div>
    );
};

export default UserManagement;
