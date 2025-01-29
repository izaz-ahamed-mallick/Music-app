import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "./components/Sidebar";
import MusicPlayer from "./components/MusicPlayer/MusicPlayer";
import { ToastContainer } from "react-toastify";
import Header from "./components/Header";
import Head from "next/head";

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
                <Head>
                    <link rel="icon" href="/favicon.ico" />
                    <link
                        rel="apple-touch-icon"
                        sizes="180x180"
                        href="/apple-touch-icon.png"
                    />
                    <link
                        rel="icon"
                        type="image/png"
                        sizes="32x32"
                        href="/favicon-32x32.png"
                    />
                </Head>
                <Sidebar>
                    <Header>
                        <div className=" min-h-screen overflow-y-auto pb-[200px]">
                            {children}
                        </div>
                    </Header>
                </Sidebar>

                <div className="fixed bottom-0 left-0 w-full">
                    <MusicPlayer />
                </div>
                <ToastContainer />
            </body>
        </html>
    );
}
