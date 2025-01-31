import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { ToastContainer } from "react-toastify";

import Head from "next/head";

import ClientLayout from "./components/layout/clientLayout";
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
    title: "  Melodify-Music Player App",
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
                <ClientLayout>{children}</ClientLayout>
                <div className="fixed bottom-0 left-0 md:left-[250px] right-4 p-2">
                    <MusicPlayer />
                </div>
                <ToastContainer />
            </body>
        </html>
    );
}
