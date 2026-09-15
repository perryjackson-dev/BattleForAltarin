import { z } from 'zod'
import { database } from './database'
import type { GameStateData } from '../game/rules'
const plot = z.discriminatedUnion('status', [z.object({ id: z.literal('city_plot_01'), status: z.literal('empty') }), z.object({ id: z.literal('city_plot_01'), status: z.literal('constructing'), buildingId: z.literal('cottage'), level: z.literal(1), visualRank: z.enum(['I', 'II', 'III']), startedAt: z.number(), completesAt: z.number() }), z.object({ id: z.literal('city_plot_01'), status: z.literal('occupied'), buildingId: z.literal('cottage'), level: z.literal(1), visualRank: z.enum(['I', 'II', 'III']) })])
export const gameStateSchema = z.object({ wood: z.number().nonnegative(), stone: z.number().nonnegative(), populationCapacity: z.number().nonnegative(), plot })
const key = 'game-state'
export async function loadGameState(): Promise<GameStateData | null> { const row = await database.settings.get(key); if (!row) return null; try { const parsed = gameStateSchema.safeParse(JSON.parse(row.value)); return parsed.success ? parsed.data : null } catch { return null } }
export async function saveGameState(state: GameStateData) { await database.settings.put({ key, value: JSON.stringify(state) }) }
