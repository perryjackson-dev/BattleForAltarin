export type BuildingId = 'cottage' | 'barracks' | 'storehouse'
export type BuildingRank = 'I' | 'II' | 'III'
export type BuildingDefinition = { id: BuildingId; displayName: string; category: 'residential' | 'military' | 'storage'; maximumLevel: 10; rankForLevel: (level: number) => BuildingRank; constructionCost: { wood: number; stone: number }; constructionDurationMs: number; description: string; populationCapacity: number }
const ranks = (level: number): BuildingRank => level <= 3 ? 'I' : level <= 7 ? 'II' : 'III'
export const cottage: BuildingDefinition = { id: 'cottage', displayName: 'Cottage', category: 'residential', maximumLevel: 10, rankForLevel: ranks, constructionCost: { wood: 100, stone: 50 }, constructionDurationMs: 10_000, description: '+50 Population Capacity.', populationCapacity: 50 }
export const barracks: BuildingDefinition = { id: 'barracks', displayName: 'Barracks', category: 'military', maximumLevel: 10, rankForLevel: ranks, constructionCost: { wood: 150, stone: 100 }, constructionDurationMs: 15_000, description: 'Trains military units — functionality coming in a later Alpha phase.', populationCapacity: 0 }
export const storehouse: BuildingDefinition = { id: 'storehouse', displayName: 'Storehouse', category: 'storage', maximumLevel: 10, rankForLevel: ranks, constructionCost: { wood: 120, stone: 150 }, constructionDurationMs: 12_000, description: 'Protects and stores resources — functionality coming in a later Alpha phase.', populationCapacity: 0 }
export const buildingDefinitions: Record<BuildingId, BuildingDefinition> = { cottage, barracks, storehouse }
export const getBuildingDefinition = (id: string) => buildingDefinitions[id as BuildingId]
