# Architecture

This initial Alpha is client-side only. No backend is implemented.

- React owns the application shell, navigation, menus, panels, resource bars, popups, modals, reports, research UI, troop UI, quests, and general interface.
- PixiJS owns City, Field, and World rendering; future terrain, buildings, map objects, banners, effects, and animations belong there.
- Zustand is the single source of truth for runtime game state.
- Dexie persists browser-local saves in IndexedDB.
- Zod validates runtime data at boundaries.
- Future game definitions for buildings, troops, research, costs, timers, and unlocks remain data-driven and separate from React components.
- Timed systems use timestamps such as `startedAt` and `completesAt`, never browser-dependent decrementing counters.
- Future multiplayer must replace local authority with server authority.

## Folder responsibilities

- `src/app`: application composition and providers.
- `src/components`: reusable React UI.
- `src/game/city`, `field`, `world`: view-specific game code.
- `src/game/rendering`: PixiJS integration.
- `src/state`, `data`, `persistence`, `systems`, `schemas`: runtime state, definitions, local saves, rules, and validation.
- `src/hooks`, `utils`, `assets`, `styles`: shared hooks, utilities, assets, and styles.
