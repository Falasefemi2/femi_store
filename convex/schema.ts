import {defineSchema, defineTable} from "convex/server"
import { v } from "convex/values"

export default defineSchema({
    users: defineTable({
        userId: v.string(),
        email: v.string(),
        createdAt: v.number(),
        // optionals fileds
        name: v.optional(v.string()),
        profileImage: v.optional(v.string())
    })
    .index("by_userId", ["userId"])
    .index("by_name", ["name"])
    .index("by_email", ["email"]),

    products: defineTable({
        id: v.number(),
        title: v.string(),
        price: v.number(),
        description: v.string(),
        category: v.string(),
        image: v.string(),
        rating: v.optional(
            v.object({
                rate: v.number(),
                count: v.number()
            })
        )
    })
})