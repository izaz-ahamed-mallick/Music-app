import { supaBaseInstence } from "@/lib/supabaseClient";
import { motion } from "framer-motion";
import { Music, Album, Users } from "lucide-react";
import { useEffect, useState } from "react";

// Define the interface for the analytics data
interface IAnalyticsTableData {
    albumCount: number;
    songCount: number;
    userCount: number;
}

interface IAnalyticsProps {
    toggleTables: (table: "albums" | "songs" | "users") => void;
}

const AnalyticsCards = ({ toggleTables }: IAnalyticsProps) => {
    const [data, setData] = useState<IAnalyticsTableData>({
        albumCount: 0,
        songCount: 0,
        userCount: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const { count: albumCount } = await supaBaseInstence
                    .from("albums")
                    .select("*", { count: "exact", head: true });
                const { count: songCount } = await supaBaseInstence
                    .from("songs")
                    .select("*", { count: "exact", head: true });
                const { count: userCount } = await supaBaseInstence
                    .from("users")
                    .select("*", { count: "exact", head: true });

                setData({
                    albumCount: albumCount ?? 0,
                    songCount: songCount ?? 0,
                    userCount: userCount ?? 0,
                });
                setLoading(false);
            } catch (error) {
                console.error("Error fetching analytics:", error);

                setLoading(false);
            }
        };

        fetchAnalytics();
    }, []);

    if (loading) {
        return (
            <div>
                <AnalyticsLoader />
            </div>
        );
    }

    const { albumCount, songCount, userCount } = data;

    const stats = [
        {
            id: "songs",
            label: "Total Songs",
            value: songCount,
            icon: <Music size={30} className="text-blue-400" />,
        },
        {
            id: "albums",
            label: "Total Albums",
            value: albumCount,
            icon: <Album size={30} className="text-purple-400" />,
        },
        {
            id: "users",
            label: "Total Users",
            value: userCount,
            icon: <Users size={30} className="text-green-400" />,
        },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {stats.map((stat, index) => (
                <motion.div
                    key={stat.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    className="p-6 bg-gray-800 rounded-lg shadow-lg flex items-center hover:bg-gray-700 transition-all cursor-pointer"
                    onClick={() =>
                        toggleTables(stat.id as "albums" | "songs" | "users")
                    }
                >
                    <div className="mr-4">{stat.icon}</div>
                    <div>
                        <h3 className="text-lg font-semibold text-white">
                            {stat.label}
                        </h3>
                        <p className="text-2xl font-bold text-white">
                            {stat.value}
                        </p>
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

function AnalyticsLoader() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, index) => (
                <div
                    key={index}
                    className="p-6 bg-gray-800 rounded-lg shadow-lg flex items-center transition-all animate-pulse"
                >
                    <div className="mr-4 bg-gray-600 animate-pulse"></div>
                    <div>
                        <h3 className="bg-gray-600 animate-pulse"></h3>
                        <p className="bg-gray-600 animate-pulse"></p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default AnalyticsCards;
