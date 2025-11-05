
import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  todos: defineTable({
    text: v.string(),
    completed: v.boolean(),
    dueDate: v.optional(v.string()),
    order: v.optional(v.number()),
  }),
});
