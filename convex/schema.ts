import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    imageUrl: v.string(),
    clerkId: v.string(),
    username: v.optional(v.string()),
    tokenIdentifier: v.string(),
  }).index("by_token", ["tokenIdentifier"])
    .index("by_clerkId", ["clerkId"]),

  conversations: defineTable({
    participantOne: v.id("users"),
    participantTwo: v.id("users"),
    lastMessageId: v.optional(v.id("messages")),
  }).index("by_participants", ["participantOne", "participantTwo"]),

  messages: defineTable({
    conversationId: v.id("conversations"),
    senderId: v.id("users"),
    content: v.string(),
    isRead: v.boolean(),
  }).index("by_conversation", ["conversationId"]),

  presence: defineTable({
    userId: v.id("users"),
    status: v.union(v.literal("online"), v.literal("offline")),
    lastSeen: v.number(),
    isTypingIn: v.optional(v.id("conversations")),
  }).index("by_user", ["userId"]),
});
