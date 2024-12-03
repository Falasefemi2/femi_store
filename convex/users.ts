import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createUser = mutation({
  args: {
    userId: v.string(),
    email: v.string(),
    name: v.string(),
    profileImage: v.string(),
    createdAt: v.number(),
  },
  handler: async (ctx, args) => {
    try {
      const newUser = await ctx.db.insert("users", {
        userId: args.userId,
        email: args.email,
        createdAt: args.createdAt,
        name: args.name,
        profileImage: args.profileImage
      });
      return newUser;
    } catch (error) {
      console.error("Error creating user:", error);
      throw new Error("Failed to create user");
    }
  },
});

export const readUser = query({
    args: {
        userId: v.string()
    },
    handler: async (ctx, args) => {
        try {
            const userInfo = await ctx.db
            .query("users")
            .filter((user) => {
              return user.eq(user.field("userId"), args.userId);
            })
            .first();
          return userInfo;
        } catch (error) {
            console.error("Error reading user:", error);
            throw new Error("Failed to read user");
        }
    }
})