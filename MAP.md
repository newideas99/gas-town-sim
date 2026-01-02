# Gas Town Map Design

The current map is the default ai-town "gentle" map. A custom Gas Town map can be created to better represent the orchestration workspace.

## Suggested Locations

| Location | Purpose | Suggested Visual |
|----------|---------|------------------|
| **Refinery** | Where MRs get processed | Industrial building with smokestacks |
| **Post Office** | Mail and handoffs | Small building with mailbox |
| **Town Square** | Convoy coordination | Open area with fountain |
| **Workstations** | Where polecats work | Desks with computers |
| **Mayor's Office** | Coordination hub | Official-looking building |
| **Watchtower** | Witness observation | Tall tower with view |
| **Server Room** | Deacon's domain | Building with antennas |
| **Spawn Point** | Where new polecats appear | Glowing portal area |

## Creating a Custom Map

### Tools Required
- [Tiled Map Editor](https://www.mapeditor.org/) (free)
- A tileset (32x32 pixel tiles)

### Process

1. **Design in Tiled**
   - Create a new map (recommended: 45x32 tiles)
   - Add two layers: `bgtiles` (background) and `objmap` (collision/objects)
   - Use the tileset from `public/assets/` or create custom tiles

2. **Export as JSON**
   - File → Export As → JSON format

3. **Convert to JS format**
   ```bash
   node data/convertMap.js <mapPath.json> <tilesetPath.png> 32 32
   ```

4. **Update the code**
   - Copy `converted-map.js` to `data/gastown.js`
   - Update `convex/init.ts` to import the new map:
   ```typescript
   import * as map from '../data/gastown.js';
   ```

5. **Reset and restart**
   ```bash
   npx convex run testing:wipeAllTables
   npm run dev
   ```

## Map Design Tips

### For Gas Town Theme

1. **Industrial aesthetic** - Use factory-like tiles for the refinery area
2. **Clear pathways** - Agents need to navigate, keep paths wide
3. **Distinct zones** - Each location should be visually identifiable
4. **Central meeting area** - For conversations and coordination

### Collision Layer (`objmap`)

- `0` = walkable
- Non-zero = blocked (walls, water, objects)

### Spawn Points

Define spawn areas in `convex/init.ts` where agents can appear:
```typescript
const spawnPoints = [
  { x: 10, y: 15 },  // Near workstations
  { x: 25, y: 8 },   // Near refinery
  { x: 30, y: 20 },  // Near post office
];
```

## Quick Customization (No New Map)

Without creating a new map, you can add location flavor by:

1. **Renaming activities** in agent behavior to reference Gas Town locations
2. **Adding location-based logic** in `convex/aiTown/agent.ts`
3. **Creating "points of interest"** that agents walk to based on their role

Example: Make Mayor walk to center, Witness patrol edges, Polecats go to "work areas".

## Resources

- [OpenGameArt Tilesets](https://opengameart.org/content/16x16-industrial-tileset)
- [itch.io Pixel Assets](https://itch.io/game-assets/tag-tileset)
- [Kenney Assets](https://kenney.nl/assets) (free, high quality)
