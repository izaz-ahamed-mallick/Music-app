import React from "react";

const AdminPageLoader = () => {
    return (
        <tbody>
            {[...Array(5)].map((_, index) => (
                <tr
                    key={index}
                    className="border-t border-gray-600 animate-pulse"
                >
                    <td className="py-3 px-4">
                        <div className="h-6 w-32 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 rounded-md"></div>
                    </td>
                    <td className="py-3 px-4">
                        <div className="h-6 w-24 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 rounded-md"></div>
                    </td>
                    <td className="py-3 px-4">
                        <div className="h-6 w-20 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 rounded-md"></div>
                    </td>
                    <td className="py-3 px-4">
                        <div className="w-16 h-16 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 rounded-lg"></div>
                    </td>
                    <td className="py-3 px-4 flex gap-4">
                        <div className="h-6 w-12 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 rounded-md"></div>
                        <div className="h-6 w-12 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 rounded-md"></div>
                    </td>
                </tr>
            ))}
        </tbody>
    );
};

export default AdminPageLoader;
