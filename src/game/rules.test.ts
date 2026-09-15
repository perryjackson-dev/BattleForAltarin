import { describe, expect, it } from 'vitest'
import { cottage } from '../data/buildings'
import { initialGameState, resolveConstruction, startConstruction } from './rules'
import { gameStateSchema } from '../persistence/save'

describe('Cottage construction rules', () => {
  it('deducts resources and records timestamp state', () => { const state = startConstruction(initialGameState, 1000); expect(state.wood).toBe(400); expect(state.stone).toBe(450); expect(state.plot).toMatchObject({ status: 'constructing', startedAt: 1000, completesAt: 11000, visualRank: 'I' }) })
  it('resolves completed construction and adds population once', () => { const building = startConstruction(initialGameState, 1000); const complete = resolveConstruction(building, 11000); expect(complete.plot.status).toBe('occupied'); expect(complete.populationCapacity).toBe(50); expect(resolveConstruction(complete, 12000).populationCapacity).toBe(50) })
  it('calculates Rank I for level 1', () => { expect(cottage.rankForLevel(1)).toBe('I') })
  it('rejects invalid persisted data', () => { expect(gameStateSchema.safeParse({ wood: -1, stone: 1, populationCapacity: 0, plot: { id: 'city_plot_01', status: 'empty' } }).success).toBe(false) })
})
