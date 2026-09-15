import { create } from 'zustand'
export type GameView = 'city' | 'field' | 'world'
type GameState = { activeView: GameView; selectView: (view: GameView) => void }
export const useGameStore = create<GameState>((set) => ({ activeView: 'city', selectView: (view) => set({ activeView: view }) }))
