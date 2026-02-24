import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const update = mutation({
    args: {
        status: v.union(v.literal("online"), v.literal("offline")),
        isTypingIn: v.optional(v.id("conversations")),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) return;

        const user = await ctx.db
            .query("users")
            .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
            .unique();

        if (!user) return;

        const existingPresence = await ctx.db
            .query("presence")
            .withIndex("by_user", (q) => q.eq("userId", user._id))
            .unique();

        if (existingPresence) {
            await ctx.db.patch(existingPresence._id, {
                status: args.status,
                lastSeen: Date.now(),
                isTypingIn: args.isTypingIn,
            });
        } else {
            await ctx.db.insert("presence", {
                userId: user._id,
                status: args.status,
                lastSeen: Date.now(),
                isTypingIn: args.isTypingIn,
            });
        }
    },
});

export const getTyping = query({
    args: { conversationId: v.id("conversations") },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("presence")
            .filter((q) =>
                q.and(
                    q.eq(q.field("isTypingIn"), args.conversationId),
                    q.gt(q.field("lastSeen"), Date.now() - 5000) // Only show if seen in last 5s
                )
            )
            .collect();
    },
});

export const getByUser = query({
    args: { userId: v.id("users") },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("presence")
            .withIndex("by_user", (q) => q.eq("userId", args.userId))
            .unique();
    },
});
