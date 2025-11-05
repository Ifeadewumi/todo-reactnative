
import { query, mutation } from './_generated/server';
import { v } from 'convex/values';

export const get = query({ 
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query('todos').collect();
    }
});

export const add = mutation({
  args: { text: v.string() },
  handler: async (ctx, args) => {
    await ctx.db.insert('todos', { text: args.text, completed: false });
  },
});

export const update = mutation({
  args: { id: v.id('todos'), completed: v.boolean() },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { completed: args.completed });
  },
});

export const remove = mutation({
  args: { id: v.id('todos') },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

export const clearCompleted = mutation({
  handler: async (ctx) => {
    const completed = await ctx.db
      .query('todos')
      .filter((q) => q.eq(q.field('completed'), true))
      .collect();
    await Promise.all(completed.map((todo) => ctx.db.delete(todo._id)));
  },
});

export const updateDueDate = mutation({
  args: { id: v.id('todos'), dueDate: v.string() },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { dueDate: args.dueDate });
  },
});

export const deleteAll = mutation({
  handler: async (ctx) => {
    const allTodos = await ctx.db.query("todos").collect();
    await Promise.all(allTodos.map((todo) => ctx.db.delete(todo._id)));
  },
});
