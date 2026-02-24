import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const store = mutation({
    args: {},
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new Error("Called storeUser without authentication");
        }

        // Check if we've already stored this user.
        const user = await ctx.db
            .query("users")
            .withIndex("by_token", (q) =>
                q.eq("tokenIdentifier", identity.tokenIdentifier)
            )
            .unique();

        if (user !== null) {
            // If we've seen this identity before but the name has changed, patch it.
            if (user.name !== identity.name) {
                await ctx.db.patch(user._id, { name: identity.name });
            }
            return user._id;
        }

        // If it's a new identity, create a new User.
        return await ctx.db.insert("users", {
            name: identity.name!,
            email: identity.email!,
            imageUrl: identity.pictureUrl!,
            clerkId: identity.subject,
            tokenIdentifier: identity.tokenIdentifier,
        });
    },
});

export const getUsers = query({
    args: {
        search: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) return [];

        let usersQuery = ctx.db.query("users");

        if (args.search) {
            // Note: Convex doesn't have native text search on all fields yet in a simple query, 
            // but we can filter or use a search index if defined. For now, filter for simplicity.
            return (await usersQuery.collect()).filter((u) =>
                u.tokenIdentifier !== identity.tokenIdentifier &&
                (u.name.toLowerCase().includes(args.search!.toLowerCase()) ||
                    u.email.toLowerCase().includes(args.search!.toLowerCase()))
            );
        }

        return await usersQuery
            .filter((q) => q.neq(q.field("tokenIdentifier"), identity.tokenIdentifier))
            .collect();
    },
});

export const currentUser = query({
    args: {},
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) return null;

        return await ctx.db
            .query("users")
            .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
            .unique();
    },
});

