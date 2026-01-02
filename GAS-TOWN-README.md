# Gas Town Sim

A pixelart simulation of [Gas Town](https://github.com/steveyegge/gastown) - watch your AI agents coordinate, work, and ship code in real-time.

Based on [ai-town](https://github.com/a16z-infra/ai-town) by a16z-infra.

## What is this?

Gas Town Sim is a visual representation of your Claude Code orchestration. Instead of staring at terminal output, watch your agents walk around a pixelart town:

| Agent | Role | Behavior |
|-------|------|----------|
| **Mayor** | Town coordinator | Walks between agents, coordinates work |
| **Witness** | Worker monitor | Patrols the town, watches for stuck workers |
| **Refinery** | Merge queue | Stays near the factory, processes PRs |
| **Polecat-1** (Scout) | Worker | Rushes to workstations, works on issues |
| **Polecat-2** (Digger) | Worker | Methodical, tackles complex problems |
| **Polecat-3** (Rusher) | Worker | Speed demon, closes simple issues fast |
| **Deacon** | Daemon manager | Background infrastructure, rarely seen |
| **Overseer** | Human rep | Sets priorities, handles escalations |

## Quick Start

```bash
# Install dependencies
npm install

# Start Ollama (for local LLM)
ollama serve
ollama pull llama3

# Run the simulation
npm run dev
```

Visit http://localhost:5173

## Connecting to Real Gas Town

To make agents respond to real Gas Town events:

1. **Set up webhook endpoint** in `convex/http.ts`
2. **Tail .events.jsonl** and POST to the webhook
3. **Map events to agent actions**:
   - `sling` → Polecat walks to workstation
   - `spawn` → New polecat appears
   - `merged` → Refinery celebrates
   - `handoff` → Agent walks to post office
   - `nudge` → Agent gets poked, changes direction

Example event bridge (run alongside Gas Town):

```bash
# Watch for events and POST to simulation
tail -f ~/gt/.events.jsonl | while read line; do
  curl -X POST http://localhost:3211/gastown-event \
    -H "Content-Type: application/json" \
    -d "$line"
done
```

## Customization

### Characters
Edit `data/characters.ts` to modify agent personalities and behaviors.

### Map
Use [Tiled](https://www.mapeditor.org/) to create a custom Gas Town map with:
- Refinery building
- Post office
- Workstations
- Town square

Export and convert:
```bash
node data/convertMap.js <map.json> <tileset.png> 32 32
```

## Tech Stack

- **Frontend**: React + PixiJS
- **Backend**: Convex (serverless)
- **AI**: Ollama (local) or OpenAI/Together.ai (cloud)
- **Real-time**: WebSocket subscriptions via Convex

## License

MIT - Based on ai-town by a16z-infra
