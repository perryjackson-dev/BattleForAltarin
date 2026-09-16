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
- City building state is a keyed collection of six fixed plot IDs; fixed positions are defined separately in `src/game/cityLayout.ts`.
- Building definitions are registered in `src/data/buildings.ts`; construction rules resolve definitions generically and population is derived from occupied instances.
- Building levels are authoritative; rank and effects are derived. Upgrades use an explicit `upgrading` state with timestamps.
- Saves use schema version 3 with explicit v2-to-v3 migration (and the existing v1-to-v2 chain).
- Saves use schema version 2. The persistence boundary contains the explicit v1-to-v2 migration that adds the five new empty plots and discards legacy stored population.

## Folder responsibilities

- `src/App.tsx`: current React shell, resource display, and build popup.
- `src/game/rendering`: PixiJS integration for the current multi-plot City.
- `src/game/cityLayout.ts`: data-driven fixed City plot geometry.
- `src/game/rules.ts`: pure construction and completion rules.
- `src/data`: data-driven building definitions.
- `src/state`: Zustand runtime state and hydration actions.
- `src/persistence`: Dexie database and Zod-validated save handling.
- `src/test` and colocated `*.test.ts`: foundation and gameplay rule tests.

Future City/Field/World component and system folders should be introduced only when those features are implemented.
