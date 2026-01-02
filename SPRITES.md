# Gas Town Sprite Guide

The current simulation uses generic folk sprites from ai-town. To create a more immersive Gas Town experience, custom sprites can be created.

## Required Sprites

Each sprite needs a 32x32 spritesheet with walking animations in 4 directions.

| Agent | Suggested Design | Current Sprite |
|-------|------------------|----------------|
| **Mayor** | Top hat, suit, clipboard | f1 |
| **Witness** | Owl-like eyes, binoculars | f3 |
| **Refinery** | Hard hat, wrench, factory badge | f6 |
| **Polecat-1 (Scout)** | Cat ears, eager expression, backpack | f4 |
| **Polecat-2 (Digger)** | Cat ears, focused, tools | f7 |
| **Polecat-3 (Rusher)** | Cat ears, running pose, speed lines | f5 |
| **Deacon** | Server rack badge, headset | f2 |
| **Overseer** | Business casual, laptop | f8 |

## Spritesheet Format

Each spritesheet should be a PNG with:
- 32x32 pixel tiles
- 4 rows (one per direction: down, left, right, up)
- 4 columns (animation frames)
- Transparent background

Example layout:
```
[down1] [down2] [down3] [down4]
[left1] [left2] [left3] [left4]
[right1][right2][right3][right4]
[up1]   [up2]   [up3]   [up4]
```

## Adding New Sprites

1. Create the spritesheet PNG (128x128 total for 4x4 grid)
2. Add to `public/assets/` directory
3. Create spritesheet data in `data/spritesheets/`:

```typescript
// data/spritesheets/mayor.ts
export const data = {
  frames: {
    down1: { frame: { x: 0, y: 0, w: 32, h: 32 } },
    down2: { frame: { x: 32, y: 0, w: 32, h: 32 } },
    // ... etc
  },
  meta: { scale: '1' },
  animations: {
    down: ['down1', 'down2', 'down3', 'down4'],
    left: ['left1', 'left2', 'left3', 'left4'],
    right: ['right1', 'right2', 'right3', 'right4'],
    up: ['up1', 'up2', 'up3', 'up4'],
  },
};
```

4. Update `data/characters.ts` to use the new sprite

## Tools

- [Aseprite](https://www.aseprite.org/) - Professional pixel art editor
- [Piskel](https://www.piskelapp.com/) - Free online pixel art tool
- [LibreSprite](https://libresprite.github.io/) - Free Aseprite fork

## AI Generation

You can also use AI image generators to create base sprites:
- Midjourney with "pixel art, 32x32, game sprite, transparent background"
- DALL-E 3 with similar prompts
- Then clean up in a pixel editor
