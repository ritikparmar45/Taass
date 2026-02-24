"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useState, useRef, useEffect } from "react";
import { Send, ChevronLeft, MoreVertical, Phone, Video, Search, Smile, Paperclip, Mic } from "lucide-react";

interface ChatWindowProps {
    conversationId: any;
    selectedUser?: any;
    onBack?: () => void;
}

export const ChatWindow = ({ conversationId, selectedUser, onBack }: ChatWindowProps) => {
    const [content, setContent] = useState("");
    const [showScrollButton, setShowScrollButton] = useState(false);
    const currentUser = useQuery(api.users.currentUser);
    const messages = useQuery(
        api.conversations.getMessages,
        conversationId ? { conversationId } : "skip"
    );
    const typingUsers = useQuery(
        api.presence.getTyping,
        conversationId ? { conversationId } : "skip"
    );
    const sendMessage = useMutation(api.messages.send);
    const updatePresence = useMutation(api.presence.update);

    const scrollRef = useRef<HTMLDivElement>(null);

    const handleScroll = () => {
        if (!scrollRef.current) return;
        const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
        const isAtBottom = scrollHeight - scrollTop - clientHeight < 100;
        setShowScrollButton(!isAtBottom);
    };

    const scrollToBottom = () => {
        scrollRef.current?.scrollTo({
            top: scrollRef.current.scrollHeight,
            behavior: "smooth",
        });
    };

    useEffect(() => {
        if (!showScrollButton) {
            scrollToBottom();
        }
    }, [messages, showScrollButton]);

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!content.trim()) return;

        const messageContent = content;
        setContent("");
        await sendMessage({ conversationId, content: messageContent });
    };

    const handleKeyDown = () => {
        updatePresence({ status: "online", isTypingIn: conversationId });

        const timeout = setTimeout(() => {
            updatePresence({ status: "online", isTypingIn: undefined });
        }, 2000);

        return () => clearTimeout(timeout);
    };

    if (!selectedUser) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center bg-[#f0f2f5] dark:bg-[#222e35] border-b-[6px] border-[#00a884] h-full">
                <div className="max-w-[460px] text-center space-y-6 p-8">
                    <img
                        src="https://static.whatsapp.net/rsrc.php/v3/y6/r/wa69p9_PBpX.png"
                        alt="WhatsApp"
                        className="mx-auto w-[350px] opacity-90 dark:invert-[0.1]"
                    />
                    <div className="space-y-4">
                        <h1 className="text-[32px] font-light text-[#41525d] dark:text-[#e9edef]">WhatsApp Web</h1>
                        <p className="text-[14px] text-[#667781] dark:text-[#8696a0] leading-[20px]">
                            Send and receive messages without keeping your phone online.<br />
                            Use WhatsApp on up to 4 linked devices and 1 phone at the same time.
                        </p>
                    </div>
                    <div className="pt-20 flex items-center justify-center gap-2 text-[14px] text-[#8696a0]">
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z" /><path d="M12 6c-3.309 0-6 2.691-6 6s2.691 6 6 6 6-2.691 6-6-2.691-6-6-6zm0 10c-2.206 0-4-1.794-4-4s1.794-4 4-4 4 1.794 4 4-1.794 4-4 4z" /></svg>
                        End-to-end encrypted
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 flex flex-col h-full bg-[#efeae2] dark:bg-[#0b141a] relative overflow-hidden">
            {/* WhatsApp Tile Background Overlay */}
            <div className="absolute inset-0 whatsapp-chat-bg pointer-events-none z-0" />

            {/* Header */}
            <div className="h-[60px] px-4 flex items-center justify-between bg-[#f0f2f5] dark:bg-[#202c33] z-20 border-l dark:border-zinc-800/20">
                <div className="flex items-center gap-3 cursor-pointer">
                    <button
                        onClick={onBack}
                        className="p-1 hover:bg-black/5 dark:hover:bg-white/5 rounded-full md:hidden"
                    >
                        <ChevronLeft className="h-6 w-6 text-[#54656f] dark:text-[#aebac1]" />
                    </button>
                    <img
                        src={selectedUser.imageUrl}
                        alt={selectedUser.name}
                        className="h-10 w-10 rounded-full object-cover"
                    />
                    <div className="min-w-0">
                        <h2 className="text-[16px] font-medium text-[#111b21] dark:text-[#e9edef] truncate">
                            {selectedUser.name}
                        </h2>
                        <p className="text-[13px] text-[#667781] dark:text-[#8696a0]">
                            {typingUsers && typingUsers.length > 0 ? "typing..." : "online"}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-6 text-[#54656f] dark:text-[#aebac1]">
                    <Search className="h-[20px] w-[20px] cursor-pointer" />
                    <MoreVertical className="h-[20px] w-[20px] cursor-pointer" />
                </div>
            </div>

            {/* Messages Area */}
            <div
                ref={scrollRef}
                onScroll={handleScroll}
                className="flex-1 overflow-y-auto p-4 md:px-16 md:py-6 space-y-[4px] z-10 custom-scrollbar"
            >
                {messages?.map((msg: any, idx: number) => {
                    const isMe = msg.senderId === currentUser?._id;
                    const prevMsg = messages[idx - 1];
                    const isFirstInGroup = !prevMsg || prevMsg.senderId !== msg.senderId;

                    return (
                        <div
                            key={msg._id}
                            className={`flex ${isMe ? "justify-end" : "justify-start"} ${isFirstInGroup ? "mt-4" : "mt-0.5"}`}
                        >
                            <div
                                className={`relative max-w-[85%] md:max-w-[65%] px-2 py-1.5 bubble-shadow text-[14.2px] ${isMe
                                    ? "bg-[#dcf8c6] dark:bg-[#005c4b] text-[#111b21] dark:text-[#e9edef] rounded-lg"
                                    : "bg-white dark:bg-[#202c33] text-[#111b21] dark:text-[#e9edef] rounded-lg"
                                    } ${isMe ? (isFirstInGroup ? "rounded-tr-none" : "") : (isFirstInGroup ? "rounded-tl-none" : "")}`}
                            >
                                {/* Triangle tail for bubbles - only if it's the first in group */}
                                {isFirstInGroup && (
                                    <div className={`absolute top-0 w-[12px] h-[12px] ${isMe
                                            ? "-right-[8px] bg-[#dcf8c6] dark:bg-[#005c4b] [clip-path:polygon(0_0,0_100%,100%_0)]"
                                            : "-left-[8px] bg-white dark:bg-[#202c33] [clip-path:polygon(100%_0,100%_100%,0_0)]"
                                        }`} />
                                )}

                                <div className="flex items-end gap-2 pr-1">
                                    <p className="leading-[19px] whitespace-pre-wrap break-words min-w-[50px]">{msg.content}</p>
                                    <div className="flex items-center gap-1.5 shrink-0 mb-[-2px]">
                                        <span className="text-[11px] text-[#667781] dark:text-[#8696a0] opacity-90">
                                            {new Date(msg._creationTime).toLocaleTimeString([], {
                                                hour: "2-digit",
                                                minute: "2-digit",
                                                hour12: true
                                            }).toLowerCase()}
                                        </span>
                                        {isMe && (
                                            <span className="text-[#34b7f1] dark:text-[#53bdeb]">
                                                <svg viewBox="0 0 16 11" width="16" height="11" fill="currentColor">
                                                    <path d="M11.053 1.514L5.373 7.194 2.317 4.138 1.153 5.302 5.373 9.522 12.217 2.678l-1.164-1.164zm3.018 0L7.194 8.391l-1.637-1.637-1.164 1.164 2.801 2.801 7.913-7.913-1.037-1.292z" />
                                                </svg>
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Input Area */}
            <div className="px-4 py-2 bg-[#f0f2f5] dark:bg-[#202c33] flex items-center gap-3 z-10 border-l dark:border-zinc-800/20">
                <div className="flex items-center gap-5 text-[#54656f] dark:text-[#8696a0]">
                    <Smile className="h-[26px] w-[26px] cursor-pointer hover:text-[#111b21] dark:hover:text-[#e9edef] transition-colors" />
                    <Paperclip className="h-[24px] w-[24px] cursor-pointer hover:text-[#111b21] dark:hover:text-[#e9edef] transition-colors -rotate-45" />
                </div>

                <form onSubmit={handleSend} className="flex-1">
                    <input
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Type a message"
                        className="w-full px-4 py-2.5 bg-white dark:bg-[#2a3942] text-[#111b21] dark:text-[#d1d7db] rounded-[8px] text-[15px] placeholder:text-[#8696a0] focus:outline-none"
                    />
                </form>

                <div className="flex items-center text-[#54656f] dark:text-[#8696a0]">
                    {content.trim() ? (
                        <button
                            onClick={handleSend}
                            className="p-1 text-[#00a884]"
                        >
                            <Send className="h-7 w-7 fill-current" />
                        </button>
                    ) : (
                        <Mic className="h-[26px] w-[26px] cursor-pointer hover:text-[#111b21] dark:hover:text-[#e9edef] transition-colors" />
                    )}
                </div>
            </div>

            {showScrollButton && (
                <button
                    onClick={scrollToBottom}
                    className="absolute bottom-20 right-8 bg-[#202c33] dark:bg-[#202c33] text-white p-2.5 rounded-full shadow-md z-40 hover:bg-[#323739]"
                >
                    <ChevronLeft className="h-6 w-6 rotate-270 text-[#aebac1]" />
                </button>
            )}
        </div>
    );
};
