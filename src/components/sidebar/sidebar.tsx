"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useState } from "react";
import { Search, MoreVertical, CircleDashed, Users, MessageSquarePlus, Filter } from "lucide-react";
import { UserButton } from "@clerk/nextjs";

interface SidebarProps {
    onSelectUser: (user: any) => void;
    selectedUserId?: string;
}

export const Sidebar = ({ onSelectUser, selectedUserId }: SidebarProps) => {
    const [search, setSearch] = useState("");
    const users = useQuery(api.users.getUsers, { search });

    return (
        <div className="h-full w-full flex flex-col bg-white dark:bg-[#111b21] transition-all border-r dark:border-zinc-800/20">
            {/* WhatsApp Sidebar Header */}
            <div className="h-[60px] px-4 flex items-center justify-between bg-[#f0f2f5] dark:bg-[#202c33]">
                <div className="flex items-center">
                    <UserButton fallbackRedirectUrl="/sign-in" appearance={{

                        elements: {
                            avatarBox: "h-10 w-10"
                        }
                    }} />
                </div>
                <div className="flex items-center gap-6 text-[#54656f] dark:text-[#aebac1]">
                    <Users className="h-[20px] w-[20px] cursor-pointer" />
                    <CircleDashed className="h-[20px] w-[20px] cursor-pointer" />
                    <MessageSquarePlus className="h-[20px] w-[20px] cursor-pointer" />
                    <div className="relative">
                        <MoreVertical className="h-[20px] w-[20px] cursor-pointer" />
                    </div>
                </div>
            </div>

            {/* Search Bar Container */}
            <div className="p-2 border-b dark:border-zinc-800/20 bg-white dark:bg-[#111b21] flex items-center gap-2">
                <div className="relative flex items-center bg-[#f0f2f5] dark:bg-[#202c33] rounded-lg px-3 py-1.5 flex-1">
                    <Search className="h-4 w-4 text-[#54656f] dark:text-[#8696a0] mr-4" />
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search or start new chat"
                        className="flex-1 bg-transparent text-[14px] text-zinc-900 dark:text-[#d1d7db] placeholder:text-[#8696a0] focus:outline-none"
                    />
                </div>
                <Filter className="h-5 w-5 text-[#54656f] dark:text-[#8696a0] cursor-pointer mx-1" />
            </div>

            {/* Chat List */}
            <div className="flex-1 overflow-y-auto bg-white dark:bg-[#111b21] custom-scrollbar">
                {users === undefined ? (
                    <div className="divide-y dark:divide-zinc-800/10">
                        {[1, 2, 3, 4, 10].map((i) => (
                            <div key={i} className="flex items-center gap-3 px-4 py-3 animate-pulse">
                                <div className="h-12 w-12 bg-[#f0f2f5] dark:bg-[#202c33] rounded-full shrink-0" />
                                <div className="flex-1 space-y-2">
                                    <div className="h-3 bg-[#f0f2f5] dark:bg-[#202c33] rounded w-1/4" />
                                    <div className="h-2 bg-[#f0f2f5] dark:bg-[#202c33] rounded w-1/2" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : users.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full p-10 text-center space-y-4">
                        <p className="text-[14px] text-[#667781] dark:text-[#8696a0]">
                            {search ? "No chats, contacts or messages found" : "No users to chat with yet"}
                        </p>
                    </div>
                ) : (
                    <div className="divide-y dark:divide-zinc-800/20">
                        {users.map((user: any) => (
                            <div
                                key={user._id}
                                onClick={() => onSelectUser(user)}
                                className={`flex items-center gap-3 px-3 h-[72px] cursor-pointer transition-all duration-100 group ${selectedUserId === user._id
                                    ? "bg-[#f0f2f5] dark:bg-[#2a3942]"
                                    : "hover:bg-[#f5f6f6] dark:hover:bg-[#202c33]"
                                    }`}
                            >
                                <img
                                    src={user.imageUrl}
                                    alt={user.name}
                                    className="h-12 w-12 rounded-full object-cover shrink-0"
                                />
                                <div className="flex-1 min-w-0 flex flex-col justify-center pr-2 h-full">
                                    <div className="flex items-center justify-between mb-0.5">
                                        <p className="text-[17px] text-[#111b21] dark:text-[#e9edef] truncate">
                                            {user.name}
                                        </p>
                                        <span className="text-[12px] text-[#667781] dark:text-[#8696a0]">12:45 PM</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <p className="text-[14px] text-[#667781] dark:text-[#8696a0] truncate">
                                            Click to start a conversation
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
