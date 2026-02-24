"use client";

import { useConvexAuth } from "convex/react";
import { ChatLayout } from "@/components/chat/chat-layout";
import Link from "next/link";
import { MessageSquare, ShieldCheck, Zap, Globe } from "lucide-react";

export default function Home() {
    const { isAuthenticated, isLoading } = useConvexAuth();

    if (isLoading) {
        return (
            <div className="h-screen w-full flex items-center justify-center bg-[#f0f2f5] dark:bg-[#111b21]">
                <div className="animate-pulse flex flex-col items-center gap-4">
                    <div className="w-16 h-16 bg-[#00a884] rounded-full flex items-center justify-center shadow-lg">
                        <MessageSquare className="text-white w-8 h-8" />
                    </div>
                    <div className="h-4 w-24 bg-zinc-300 dark:bg-zinc-700 rounded" />
                </div>
            </div>
        );
    }

    if (isAuthenticated) {
        return (
            <main className="h-screen w-full">
                <ChatLayout />
            </main>
        );
    }

    return (
        <div className="min-h-screen bg-white dark:bg-[#111b21] flex flex-col">
            {/* Navigation */}
            <nav className="h-[90px] px-6 md:px-20 flex items-center justify-between border-b dark:border-zinc-800">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#00a884] rounded-full flex items-center justify-center shadow-md">
                        <MessageSquare className="text-white w-5 h-5" />
                    </div>
                    <span className="text-xl font-bold text-[#111b21] dark:text-[#e9edef]">WhatsApp</span>
                </div>
                <div className="flex items-center gap-6">
                    <Link href="/sign-in" className="text-sm font-medium text-[#54656f] dark:text-[#aebac1] hover:underline">
                        Log in
                    </Link>
                    <Link href="/sign-up" className="bg-[#00a884] text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-[#008f71] transition-all shadow-md">
                        Get Started
                    </Link>
                </div>
            </nav>

            {/* Hero Section */}
            <main className="flex-1 flex flex-col md:flex-row items-center justify-center px-6 md:px-20 py-20 gap-16">
                <div className="flex-1 space-y-8 text-center md:text-left">
                    <h1 className="text-5xl md:text-7xl font-bold text-[#111b21] dark:text-[#e9edef] leading-tight">
                        Simple. Reliable. <br />
                        <span className="text-[#00a884]">Private messaging.</span>
                    </h1>
                    <p className="text-lg md:text-xl text-[#54656f] dark:text-[#8696a0] max-w-[600px] leading-relaxed">
                        With WhatsApp, you'll get fast, simple, secure messaging and calling for free, available on phones all over the world.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                        <Link href="/sign-up" className="w-full sm:w-auto bg-[#00a884] text-white px-10 py-4 rounded-full text-lg font-medium hover:bg-[#008f71] transition-all shadow-lg text-center">
                            Start Chatting Now
                        </Link>
                        <p className="text-sm text-[#8696a0]">Available on Web, Android, and iOS</p>
                    </div>
                </div>

                <div className="flex-1 relative">
                    <div className="relative z-10 bg-[#f0f2f5] dark:bg-[#202c33] rounded-2xl shadow-2xl p-4 md:p-8 transform rotate-2 hover:rotate-0 transition-transform duration-500 border dark:border-zinc-800">
                        <img
                            src="https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png"
                            alt="Chat Interface"
                            className="rounded-lg opacity-20 invert dark:invert-0"
                        />
                        <div className="absolute inset-0 flex flex-col p-8 space-y-4">
                            <div className="bg-[#dcf8c6] dark:bg-[#005c4b] p-3 rounded-lg self-end max-w-[80%] shadow-sm">
                                <p className="text-sm">Hey! Check out this new WhatsApp clone! 🚀</p>
                            </div>
                            <div className="bg-white dark:bg-[#202c33] p-3 rounded-lg self-start max-w-[80%] shadow-sm border dark:border-zinc-700">
                                <p className="text-sm">Woah, it looks exactly like the real thing! 😍</p>
                            </div>
                            <div className="bg-[#dcf8c6] dark:bg-[#005c4b] p-3 rounded-lg self-end max-w-[80%] shadow-sm">
                                <p className="text-sm">Built with Next.js and Convex! Real-time magic.</p>
                            </div>
                        </div>
                    </div>
                    {/* Background decoration */}
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#00a884] rounded-full blur-[80px] opacity-20" />
                    <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-500 rounded-full blur-[80px] opacity-10" />
                </div>
            </main>

            {/* Features Section */}
            <section className="bg-[#f0f2f5] dark:bg-[#0b141a] py-20 px-6 md:px-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-7xl mx-auto">
                    <div className="space-y-4 text-center">
                        <div className="w-12 h-12 bg-white dark:bg-[#202c33] rounded-xl flex items-center justify-center mx-auto shadow-sm">
                            <ShieldCheck className="text-[#00a884] w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold">End-to-End Encrypted</h3>
                        <p className="text-[#667781] dark:text-[#8696a0]">Your personal messages and calls are secured with end-to-end encryption.</p>
                    </div>
                    <div className="space-y-4 text-center">
                        <div className="w-12 h-12 bg-white dark:bg-[#202c33] rounded-xl flex items-center justify-center mx-auto shadow-sm">
                            <Zap className="text-[#00a884] w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold">Real-time Performance</h3>
                        <p className="text-[#667781] dark:text-[#8696a0]">Experience lightning fast messaging with Convex real-time database.</p>
                    </div>
                    <div className="space-y-4 text-center">
                        <div className="w-12 h-12 bg-white dark:bg-[#202c33] rounded-xl flex items-center justify-center mx-auto shadow-sm">
                            <Globe className="text-[#00a884] w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold">Connect Anywhere</h3>
                        <p className="text-[#667781] dark:text-[#8696a0]">Stay connected with your friends and family across the globe.</p>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-10 text-center border-t dark:border-zinc-800 text-sm text-[#8696a0]">
                <p>© 2026 WhatsApp Clone. Built with ❤️ for everyone.</p>
            </footer>
        </div>
    );
}
