import Dexie, { type EntityTable } from 'dexie'
export type StoredSetting = { key: string; value: string }
export const database = new Dexie('battle-for-altarin') as Dexie & { settings: EntityTable<StoredSetting, 'key'> }
database.version(1).stores({ settings: 'key' })
