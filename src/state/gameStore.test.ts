import { describe, expect, it } from 'vitest'
import { applicationMetadata } from '../schemas/application'
import { useGameStore } from './gameStore'
describe('application foundation', () => { it('validates the locked title and manages the selected game view', () => { expect(applicationMetadata.parse({ title: 'Battle for Altarin' }).title).toBe('Battle for Altarin'); useGameStore.getState().selectView('world'); expect(useGameStore.getState().activeView).toBe('world') }) })
