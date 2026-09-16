import { describe, expect, it } from 'vitest'
import { gameStateSchema } from '../persistence/save'
import { initialGameState, resolveConstructions, rankForPlot, startUpgrade, type GameStateData } from './rules'
const stateWithUpgrade = (currentLevel: number, targetLevel: number): GameStateData => ({ ...initialGameState, plots: { ...initialGameState.plots, city_plot_01: { id: 'city_plot_01', status: 'upgrading', buildingId: 'cottage', currentLevel, targetLevel, startedAt: 0, completesAt: 100 } } })
describe('upgrade persistence and rank regressions', () => {
  it.each([[1, 2], [9, 10]] as const)('accepts valid upgrade %s to %s', (currentLevel, targetLevel) => expect(gameStateSchema.safeParse(stateWithUpgrade(currentLevel, targetLevel)).success).toBe(true))
  it.each([[9, 2], [2, 10], [4, 4]] as const)('rejects invalid upgrade %s to %s', (currentLevel, targetLevel) => expect(gameStateSchema.safeParse(stateWithUpgrade(currentLevel, targetLevel)).success).toBe(false))
  it.each([[3, 'I'], [7, 'II']] as const)('keeps current rank while upgrading from level %s', (level, rank) => { const occupied = { ...initialGameState, plots: { ...initialGameState.plots, city_plot_01: { id: 'city_plot_01' as const, status: 'occupied' as const, buildingId: 'cottage' as const, level } } } as GameStateData; const upgrading = startUpgrade(occupied, 'city_plot_01', 0); expect(rankForPlot(upgrading.plots.city_plot_01)).toBe(rank) })
  it('changes rank after upgrade completion', () => { const occupied = { ...initialGameState, plots: { ...initialGameState.plots, city_plot_01: { id: 'city_plot_01' as const, status: 'occupied' as const, buildingId: 'cottage' as const, level: 3 } } } as GameStateData; const upgrading = startUpgrade(occupied, 'city_plot_01', 0); const done = resolveConstructions(upgrading, 20_000); expect(rankForPlot(done.plots.city_plot_01)).toBe('II') })
})
