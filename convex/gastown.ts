/**
 * Gas Town Integration
 * 
 * Receives events from Gas Town (.events.jsonl) and affects agent behavior.
 * 
 * Event types:
 * - sling: Work assigned to agent → polecat walks to workstation
 * - spawn: New polecat created → new agent appears in town
 * - merged: PR merged → refinery celebrates
 * - handoff: Agent handed off → walks to post office
 * - nudge: Agent nudged → changes activity
 * - kill: Agent killed → agent leaves town
 */

import { httpAction } from './_generated/server';
import { internal } from './_generated/api';

// Gas Town event types
export interface GasTownEvent {
  ts: string;
  type: 'sling' | 'spawn' | 'merged' | 'handoff' | 'nudge' | 'kill' | 'mail' | 'convoy';
  actor: string;
  rig?: string;
  payload: Record<string, unknown>;
}

// Map Gas Town agent roles to simulation character names
const ROLE_TO_CHARACTER: Record<string, string> = {
  'mayor': 'Mayor',
  'witness': 'Witness',
  'refinery': 'Refinery',
  'deacon': 'Deacon',
  'overseer': 'Overseer',
  'polecat': 'Polecat-1', // Default, will be mapped by name
};

// HTTP handler for receiving Gas Town events
export const handleGasTownEvent = httpAction(async (ctx, request) => {
  try {
    const event = await request.json() as GasTownEvent;
    
    console.log(`[Gas Town] Received event: ${event.type} from ${event.actor}`);
    
    // Process the event
    await ctx.runMutation(internal.gastown.processEvent, { event });
    
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('[Gas Town] Error processing event:', error);
    return new Response(JSON.stringify({ error: 'Failed to process event' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
});

// Batch endpoint for multiple events
export const handleGasTownEventBatch = httpAction(async (ctx, request) => {
  try {
    const events = await request.json() as GasTownEvent[];
    
    console.log(`[Gas Town] Received ${events.length} events`);
    
    for (const event of events) {
      await ctx.runMutation(internal.gastown.processEvent, { event });
    }
    
    return new Response(JSON.stringify({ success: true, processed: events.length }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('[Gas Town] Error processing batch:', error);
    return new Response(JSON.stringify({ error: 'Failed to process batch' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
});
