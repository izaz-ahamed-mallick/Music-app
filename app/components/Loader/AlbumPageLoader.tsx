export default function AlbumPageLoader() {
    return (
        <div className="px-6 py-8">
            <div className="flex items-center gap-6 mb-8">
                <div className="relative w-48 h-48 bg-neutral-700 rounded-lg overflow-hidden animate-pulse">
                    <div className="bg-gradient-to-b from-emerald-900 w-full h-full rounded-lg"></div>
                </div>

                <div>
                    <div className="h-8 bg-gray-600 rounded w-3/4 mb-4 animate-pulse"></div>
                    <div className="h-6 bg-gray-600 rounded w-1/2 mb-3 animate-pulse"></div>
                    <div className="h-4 bg-gray-600 rounded w-1/2 animate-pulse"></div>
                </div>
            </div>

            <div className="mt-10">
                <h2 className="text-2xl text-white font-semibold mb-6 animate-pulse">
                    <div className="h-6 bg-gray-600 rounded w-1/4 animate-pulse"></div>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Array(6)
                        .fill(0)
                        .map((_, index) => (
                            <div
                                key={index}
                                className="relative group p-4 bg-neutral-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 animate-pulse"
                            >
                                <div>
                                    <div className="h-6 bg-gray-600 rounded w-3/4 mb-2"></div>
                                    <div className="h-4 bg-gray-600 rounded w-1/2 mb-3"></div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
}
