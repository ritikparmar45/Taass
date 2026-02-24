import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getOrCreate = mutation({
    args: {
        participantTwoId: v.id("users"),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Unauthorized");

        const currentUser = await ctx.db
            .query("users")
            .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
            .unique();

        if (!currentUser) throw new Error("User not found");

        // Order participants to ensure uniqueness
        const [p1, p2] = [currentUser._id, args.participantTwoId].sort();

        const existingConversation = await ctx.db
            .query("conversations")
            .withIndex("by_participants", (q) =>
                q.eq("participantOne", p1).eq("participantTwo", p2)
            )
            .unique();

        if (existingConversation) return existingConversation._id;

        return await ctx.db.insert("conversations", {
            participantOne: p1,
            participantTwo: p2,
        });
    },
});

export const getMessages = query({
    args: { conversationId: v.id("conversations") },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("messages")
            .withIndex("by_conversation", (q) => q.eq("conversationId", args.conversationId))
            .order("asc")
            .collect();
    },
});
