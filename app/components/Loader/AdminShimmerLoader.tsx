import React from "react";

const AdminShimmerLoader = () => {
    return (
        <div className="space-y-6 w-full max-w-4xl">
            {/* Header Loader */}
            <div className="h-12 w-3/4 bg-gray-700 rounded-lg animate-pulse"></div>

            {/* Buttons Loader */}
            <div className="flex space-x-4">
                <div className="h-10 w-40 bg-gray-700 rounded-lg animate-pulse"></div>
                <div className="h-10 w-40 bg-gray-700 rounded-lg animate-pulse"></div>
            </div>

            {/* Content Loader */}
            <div className="space-y-6">
                {/* Album Overview */}
                <div className="h-40 bg-gray-800 rounded-lg animate-pulse"></div>

                {/* User Management */}
                <div className="h-40 bg-gray-800 rounded-lg animate-pulse"></div>
            </div>
        </div>
    );
};

export default AdminShimmerLoader;
