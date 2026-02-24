import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ConvexClientProvider } from "@/providers/convex-client-provider";
import { AuthSync } from "@/components/auth/auth-sync";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "ChatPulse | Real-time Chat",
    description: "A premium real-time chat application built with Next.js, Convex, and Clerk.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ClerkProvider>
            <html lang="en">
                <body className={inter.className}>
                    <ConvexClientProvider>
                        <AuthSync />
                        {children}
                    </ConvexClientProvider>
                </body>
            </html>
        </ClerkProvider>
    );
}
 
