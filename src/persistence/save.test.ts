import { describe, expect, it, vi } from 'vitest'
import { database, type StoredSetting } from './database'
import { loadGameState, queueSaveGameState } from './save'
import { initialGameState } from '../game/rules'
describe('save loading', () => {
  it('safely falls back for an unsupported persisted version', async () => { const get = vi.spyOn(database.settings, 'get').mockResolvedValue({ key: 'game-state', value: JSON.stringify({ version: 99, wood: 1, stone: 1 }) }); await expect(loadGameState()).resolves.toBeNull(); expect(get).toHaveBeenCalledWith('game-state'); get.mockRestore() })
  it('serializes saves so a newer snapshot cannot overwrite an older one', async () => { const writes: string[] = []; let release!: () => void; let first = true; const put = vi.spyOn(database.settings, 'put').mockImplementation((async (row: StoredSetting) => { writes.push(row.value); if (first) { first = false; await new Promise<void>((resolve) => { release = resolve }) } return row.key }) as never); const older = queueSaveGameState(initialGameState); const newer = queueSaveGameState({ ...initialGameState, stone: 4321 }); await Promise.resolve(); await Promise.resolve(); expect(writes).toHaveLength(1); release(); await Promise.all([older, newer]); expect(JSON.parse(writes.at(-1) ?? '').stone).toBe(4321); put.mockRestore() })
})
