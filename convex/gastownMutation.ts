/**
 * Gas Town Mutation Handlers
 * 
 * Internal mutations that process Gas Town events and affect the simulation.
 */

import { internalMutation, internalQuery } from './_generated/server';
import { v } from 'convex/values';

// Store recent Gas Town events for display
export const processEvent = internalMutation({
  args: {
    event: v.object({
      ts: v.string(),
      type: v.string(),
      actor: v.string(),
      rig: v.optional(v.string()),
      payload: v.any(),
    }),
  },
  handler: async (ctx, args) => {
    const { event } = args;
    
    // Store the event for the activity feed
    await ctx.db.insert('gastownEvents', {
      ts: Date.now(),
      eventTs: event.ts,
      type: event.type,
      actor: event.actor,
      rig: event.rig,
      payload: event.payload,
    });
    
    // Clean up old events (keep last 100)
    const oldEvents = await ctx.db
      .query('gastownEvents')
      .order('desc')
      .take(200);
    
    if (oldEvents.length > 100) {
      const toDelete = oldEvents.slice(100);
      for (const evt of toDelete) {
        await ctx.db.delete(evt._id);
      }
    }
    
    // TODO: Find matching player and trigger behavior
    // This would require knowing which player corresponds to which Gas Town agent
    // For now, we just log the events
    
    console.log(`[Gas Town] Processed ${event.type}: ${event.actor} - ${JSON.stringify(event.payload)}`);
  },
});

// Get recent Gas Town events for display
export const getRecentEvents = internalQuery({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 50;
    return await ctx.db
      .query('gastownEvents')
      .order('desc')
      .take(limit);
  },
});
