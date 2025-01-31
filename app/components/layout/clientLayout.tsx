"use client";

import { usePathname } from "next/navigation";
import Sidebar from "../Sidebar";
import Header from "../Header";

export default function ClientLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    const hideSidebarRoutes = ["/auth/login", "/auth/signup"];
    const shouldShowSidebar = !hideSidebarRoutes.includes(pathname);

    return shouldShowSidebar ? (
        <Sidebar>
            <Header>
                <div className="min-h-screen overflow-y-auto pb-[200px]">
                    {children}
                </div>
            </Header>
        </Sidebar>
    ) : (
        <Header>
            <div className="min-h-screen">{children}</div>
        </Header>
    );
}
