import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "qirlbjuuerdjfpblsejp.supabase.co",
            },
        ],
    },
};

export default nextConfig;
