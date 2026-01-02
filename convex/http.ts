import { httpRouter } from 'convex/server';
import { handleReplicateWebhook } from './music';
import { handleGasTownEvent, handleGasTownEventBatch } from './gastown';

const http = httpRouter();

http.route({
  path: '/replicate_webhook',
  method: 'POST',
  handler: handleReplicateWebhook,
});

http.route({
  path: '/gastown-event',
  method: 'POST',
  handler: handleGasTownEvent,
});

http.route({
  path: '/gastown-events',
  method: 'POST',
  handler: handleGasTownEventBatch,
});

export default http;
