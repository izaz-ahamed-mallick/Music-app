"use client";

import { usePathname } from "next/navigation";

import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import Box from "./Box";
import Link from "next/link";

interface SideBarProps {
    children: React.ReactNode;
}

const Sidebar: React.FC<SideBarProps> = ({ children }) => {
    const pathName = usePathname();

    // Routes for sidebar
    const routes = [
        {
            icon: HiHome,
            label: "Home",
            active: pathName !== "/search",
            href: "/",
        },
        {
            icon: BiSearch,
            label: "Search",
            active: pathName == "/search",
            href: "/search",
        },
    ];

    return (
        <div className="flex h-full">
            <div className="hidden md:flex flex-col gap-y-2 bg-black h-full w-[250px] p-2">
                <Box>
                    <div className="flex flex-col gap-y-4 px-5 py-4">
                        {routes.map((route) => (
                            <Link
                                href={route.href}
                                key={route.label}
                                className={`flex items-center w-full gap-x-4 text-neutral-400 py-1 text-md font-medium cursor-pointer hover:text-white transition ${
                                    route.active && "text-white"
                                }`}
                            >
                                {<route.icon size={26} />}
                                <p className="truncate w-full">{route.label}</p>
                            </Link>
                        ))}
                    </div>
                </Box>
                <Box className="overflow-y-auto h-full">Song library</Box>
            </div>
            <main className="overflow-y-auto py-2 h-full flex-1">
                {children}
            </main>
        </div>
    );
};

export default Sidebar;
