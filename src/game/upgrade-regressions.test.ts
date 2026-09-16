import { describe, expect, it } from 'vitest'
import { gameStateSchema } from '../persistence/save'
import { initialGameState } from './rules'
describe('upgrade persistence invariants',()=>{it('rejects non-adjacent upgrade levels',()=>{const state={...initialGameState,city:{...initialGameState.city,plots:{...initialGameState.city.plots,city_plot_01:{id:'city_plot_01',status:'upgrading',buildingId:'cottage',currentLevel:2,targetLevel:4,startedAt:0,completesAt:100}}}};expect(gameStateSchema.safeParse(state).success).toBe(false)})})
