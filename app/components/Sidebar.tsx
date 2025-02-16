"use client";

import { usePathname } from "next/navigation";

import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import Box from "./Box";
import Link from "next/link";
import FavoriteAlbums from "./album/FavoriteAlbums";
import Image from "next/image";

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
                        <div className="flex items-center py-4">
                            <div className="flex items-center gap-x-2 mb-4">
                                <div className="relative flex-1 w-16 h-16 border-4 border-green-900 rounded-full shadow-lg overflow-hidden ">
                                    <Image
                                        width={64}
                                        height={64}
                                        src="/logoo.png"
                                        alt="Melodify Logo"
                                        className="object-cover w-full h-full"
                                    />
                                </div>

                                <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600">
                                    Melodify
                                </h1>
                            </div>
                        </div>

                        {routes.map((route) => (
                            <Link
                                href={route.href}
                                key={route.label}
                                className={`flex items-center w-full gap-x-4 text-neutral-400 py-1 text-md font-medium cursor-pointer hover:text-white transition ${
                                    route.active && "text-white"
                                }`}
                            >
                                <route.icon size={26} />
                                <p className="truncate w-full">{route.label}</p>
                            </Link>
                        ))}
                    </div>
                </Box>

                <Box className="overflow-y-auto h-full">
                    <h1 className="text-xl font-medium  my-2 p-2">
                        Favorite Albums
                    </h1>

                    <FavoriteAlbums />
                </Box>
            </div>
            <main className="noScrollOnMain overflow-y-auto py-2  flex-1 relative">
                {children}
            </main>
        </div>
    );
};

export default Sidebar;
