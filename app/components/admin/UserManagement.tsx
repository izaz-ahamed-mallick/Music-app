import React, { useState, useEffect, useRef, useMemo } from "react";
import { supaBaseInstence } from "@/lib/supabaseClient";
import Modal from "../Modal";
import EditUserForm from "../EditUserForm";
import { IUserData } from "@/types/auth";

const UserManagement = () => {
    const [users, setUsers] = useState<IUserData[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<IUserData | null>(null);
    const fetchUsersRef = useRef<() => Promise<void> | null>(null);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const fetchUsers = async () => {
        try {
            const { data, error } = await supaBaseInstence
                .from("users")
                .select("id, role, username, email");
            if (error) throw error;
            setUsers(data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const filteredUsers = useMemo(() => {
        return users.filter(
            (user) =>
                user.username
                    ?.toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                user.email?.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [users, searchQuery]);

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
        setDeletingId(userId);
        try {
            const { error } = await supaBaseInstence
                .from("users")
                .delete()
                .match({ id: userId });
            if (error) throw error;
            setUsers((prevUsers) =>
                prevUsers.filter((user) => user.id !== userId)
            );
        } catch (error) {
            console.error("Error deleting user:", error);
        } finally {
            setDeletingId(null);
        }
    };

    return (
        <div className="bg-gradient-to-br from-gray-900 to-black text-white p-6 rounded-xl shadow-lg">
            <h2 className="text-3xl font-semibold mb-6 text-white">
                User Management
            </h2>

            {/* Search Input */}
            <div className="mb-6">
                <input
                    type="text"
                    placeholder="Search by username or email"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="w-full p-3 bg-gray-800 text-white rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                />
            </div>

            {/* Total Users Count */}
            <div className="text-white mb-6">
                <span>Total Users: {users.length}</span>
            </div>

            {/* User Table */}
            <div className="overflow-x-auto bg-gray-800 rounded-lg shadow-md">
                <table className="min-w-full table-auto text-left">
                    <thead>
                        <tr className="border-b border-gray-600">
                            <th className="py-3 px-4 text-white">Username</th>
                            <th className="py-3 px-4 text-white">Email</th>
                            <th className="py-3 px-4 text-white">Role</th>
                            <th className="py-3 px-4 text-white">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.length > 0 ? (
                            filteredUsers.map((user) => (
                                <tr
                                    key={user.id}
                                    className="border-t border-gray-600 hover:bg-gray-700"
                                >
                                    <td className="py-3 px-4 text-white">
                                        {user.username}
                                    </td>
                                    <td className="py-3 px-4 text-white">
                                        {user.email}
                                    </td>
                                    <td className="py-3 px-4 text-white">
                                        {user.role}
                                    </td>
                                    <td className="py-3 px-4 flex gap-4">
                                        <button
                                            onClick={() => handleEditUser(user)}
                                            className="text-blue-500 hover:text-blue-600 transition duration-200"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleDeleteUser(user.id)
                                            }
                                            disabled={deletingId === user.id}
                                            className="text-red-500 hover:text-red-600 transition duration-200"
                                        >
                                            {deletingId === user.id
                                                ? "Deleting..."
                                                : "Delete"}
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={5}
                                    className="py-4 text-center text-white"
                                >
                                    No User Found!
                                </td>
                            </tr>
                        )}
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
