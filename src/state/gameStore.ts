import { create } from 'zustand'
import { initialGameState, resolveConstruction, startConstruction, type GameStateData } from '../game/rules'
import { loadGameState, saveGameState } from '../persistence/save'
export type GameView = 'city' | 'field' | 'world'
type GameState = GameStateData & { activeView: GameView; hydrated: boolean; selectView: (view: GameView) => void; hydrate: () => Promise<void>; beginConstruction: () => Promise<void>; resolve: () => Promise<void> }
export const useGameStore = create<GameState>((set, get) => ({ ...initialGameState, activeView: 'city', hydrated: false, selectView: (activeView) => set({ activeView }), hydrate: async () => { const loaded = await loadGameState(); const resolved = resolveConstruction(loaded ?? initialGameState, Date.now()); set({ ...resolved, hydrated: true }); await saveGameState(resolved) }, beginConstruction: async () => { const next = startConstruction(get(), Date.now()); set(next); await saveGameState(next) }, resolve: async () => { const current = get(); const next = resolveConstruction(current, Date.now()); if (next !== current) { set(next); await saveGameState(next) } } }))
