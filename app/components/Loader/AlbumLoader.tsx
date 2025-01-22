export default function AlbumLoader() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-6">
            {Array(4)
                .fill(0)
                .map((_, index) => (
                    <div
                        key={index}
                        className="relative group rounded-lg overflow-hidden animate-pulse"
                    >
                        <div className="relative w-full h-72 bg-neutral-700 rounded-lg overflow-hidden shadow-lg">
                            <div className="bg-gradient-to-b from-emerald-900 w-full h-full rounded-lg"></div>
                        </div>
                        <div className="mt-3 px-2">
                            <div className="h-4 bg-gray-600 rounded w-3/4 mb-2"></div>
                            <div className="h-3 bg-gray-600 rounded w-1/2"></div>
                        </div>
                    </div>
                ))}
        </div>
    );
}
