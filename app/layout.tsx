import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "./components/Sidebar";
import MusicPlayer from "./components/MusicPlayer/MusicPlayer";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Music Player App",
    description: "Enjoy your music with a modern player",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <Sidebar>
                    <div className=" min-h-screen overflow-y-auto pb-[200px]">
                        {children}
                    </div>
                </Sidebar>

                <div className="fixed bottom-0 left-0 w-full">
                    <MusicPlayer />
                </div>
            </body>
        </html>
    );
}
