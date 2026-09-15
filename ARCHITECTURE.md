# Architecture

This initial Alpha is client-side only. No backend is implemented.

- React owns the application shell, navigation, menus, panels, resource bars, popups, modals, reports, research UI, troop UI, quests, and general interface.
- PixiJS owns City, Field, and World rendering; future terrain, buildings, map objects, banners, effects, and animations belong there.
- Zustand is the single source of truth for runtime game state.
- Dexie persists browser-local saves in IndexedDB.
- Zod validates the persisted game save at the persistence boundary.
- Future game definitions for buildings, troops, research, costs, timers, and unlocks remain data-driven and separate from React components.
- Timed systems use timestamps such as `startedAt` and `completesAt`, never browser-dependent decrementing counters.
- Future multiplayer must replace local authority with server authority.

## Folder responsibilities

- `src/App.tsx`: current React shell, resource display, and build popup.
- `src/game/rendering`: PixiJS integration for the current City plot.
- `src/game/rules.ts`: pure construction and completion rules.
- `src/data`: data-driven building definitions.
- `src/state`: Zustand runtime state and hydration actions.
- `src/persistence`: Dexie database and Zod-validated save handling.
- `src/test` and colocated `*.test.ts`: foundation and gameplay rule tests.

Future City/Field/World component and system folders should be introduced only when those features are implemented.
