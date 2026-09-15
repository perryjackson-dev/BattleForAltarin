import { describe, expect, it } from 'vitest'
import { useGameStore } from './gameStore'
describe('application foundation', () => { it('starts in City and can select another view', () => { useGameStore.setState({ activeView: 'city' }); expect(useGameStore.getState().activeView).toBe('city'); useGameStore.getState().selectView('world'); expect(useGameStore.getState().activeView).toBe('world') }) })
