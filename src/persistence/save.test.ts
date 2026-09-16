import { describe, expect, it, vi } from 'vitest'
import { database } from './database'
import { loadGameState } from './save'

describe('save loading', () => {
  it('safely falls back for an unsupported persisted version', async () => {
    const get = vi.spyOn(database.settings, 'get').mockResolvedValue({ key: 'game-state', value: JSON.stringify({ version: 99, wood: 1, stone: 1 }) })
    await expect(loadGameState()).resolves.toBeNull()
    expect(get).toHaveBeenCalledWith('game-state')
    get.mockRestore()
  })
})
