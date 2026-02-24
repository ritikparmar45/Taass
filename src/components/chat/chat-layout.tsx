"use client";

import { useState } from "react";
import { Sidebar } from "../sidebar/sidebar";
import { ChatWindow } from "./chat-window";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";

export const ChatLayout = () => {
    const [selectedUser, setSelectedUser] = useState<any>(null);
    const [conversationId, setConversationId] = useState<any>(null);
    const getOrCreateConversation = useMutation(api.conversations.getOrCreate);

    const handleSelectUser = async (user: any) => {
        setSelectedUser(user);
        const id = await getOrCreateConversation({ participantTwoId: user._id });
        setConversationId(id);
    };

    return (
        <div className="flex h-screen w-full overflow-hidden relative bg-[#dadbd3] dark:bg-[#0c1317]">
            <div className={`
        ${selectedUser ? "hidden md:flex" : "flex"} 
        w-full md:w-[450px] h-full
      `}>
                <Sidebar
                    onSelectUser={handleSelectUser}
                    selectedUserId={selectedUser?._id}
                />
            </div>

            <div className={`
        ${selectedUser ? "flex" : "hidden md:flex"} 
        flex-1 h-full
      `}>
                <ChatWindow
                    conversationId={conversationId}
                    selectedUser={selectedUser}
                    onBack={() => setSelectedUser(null)}
                />

            </div>
        </div>
    );
};
