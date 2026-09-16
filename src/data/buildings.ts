export type BuildingId = 'cottage' | 'barracks' | 'storehouse' | 'castle' | 'research_lab' | 'walls'
export type BuildingRank = 'I' | 'II' | 'III'
export type Cost = { wood: number; stone: number }
export type BuildingDefinition = { id: BuildingId; displayName: string; description?: string; maximumLevel: 10; rankForLevel: (level: number) => BuildingRank; constructionCost: Cost; constructionDurationMs: number; upgradeCosts: Record<number, Cost>; upgradeDurationMs: (targetLevel: number) => number; buildLimit: number | 'unlimited'; placeholderColor: string; populationByLevel: Record<number, number> }
const ranks = (level: number): BuildingRank => level <= 3 ? 'I' : level <= 7 ? 'II' : 'III'
const duration = (level: number) => level * 5000
const costs = (values: number[][]): Record<number, Cost> => Object.fromEntries(values.map(([level, wood, stone]) => [level, { wood, stone }]))
const common = { maximumLevel: 10 as const, rankForLevel: ranks, upgradeDurationMs: duration }
export const cottage: BuildingDefinition = { ...common, id: 'cottage', displayName: 'Cottage', constructionCost: { wood: 100, stone: 50 }, constructionDurationMs: 10000, upgradeCosts: costs([[2,100,75],[3,125,100],[4,150,125],[5,180,150],[6,220,180],[7,260,220],[8,310,270],[9,370,330],[10,450,400]]), buildLimit: 'unlimited', placeholderColor: '#795b3d', populationByLevel: {1:50,2:70,3:90,4:120,5:150,6:180,7:220,8:270,9:330,10:400} }
export const barracks: BuildingDefinition = { ...common, id: 'barracks', displayName: 'Barracks', constructionCost: {wood:150,stone:100}, constructionDurationMs:15000, upgradeCosts: costs([[2,150,100],[3,180,125],[4,220,150],[5,260,180],[6,310,220],[7,370,270],[8,440,330],[9,520,400],[10,620,500]]), buildLimit:'unlimited', placeholderColor:'#5f4c42', populationByLevel:{} }
export const storehouse: BuildingDefinition = { ...common, id:'storehouse', displayName:'Storehouse', constructionCost:{wood:120,stone:150}, constructionDurationMs:12000, upgradeCosts: costs([[2,125,175],[3,150,210],[4,180,250],[5,220,300],[6,260,360],[7,310,430],[8,370,510],[9,440,600],[10,520,700]]), buildLimit:1, placeholderColor:'#6b6250', populationByLevel:{} }
const dedicated = (id: BuildingId, displayName: string, table: number[][], color: string): BuildingDefinition => ({ ...common, id, displayName, constructionCost:{wood:0,stone:0}, constructionDurationMs:0, upgradeCosts: costs(table), buildLimit:1, placeholderColor:color, populationByLevel:{} })
export const castle = dedicated('castle','Castle',[[2,250,250],[3,350,350],[4,500,500],[5,700,700],[6,950,950],[7,1250,1250],[8,1600,1600],[9,2000,2000],[10,2500,2500]],'#70543d')
export const researchLab = dedicated('research_lab','Research Lab',[[2,200,150],[3,275,225],[4,375,300],[5,500,400],[6,650,525],[7,825,675],[8,1050,850],[9,1300,1050],[10,1600,1300]],'#526052')
export const walls = dedicated('walls','Walls',[[2,150,300],[3,200,425],[4,275,575],[5,350,750],[6,450,950],[7,575,1200],[8,725,1500],[9,900,1850],[10,1100,2250]],'#6e6651')
export const buildingDefinitions: Record<BuildingId, BuildingDefinition> = { cottage, barracks, storehouse, castle, research_lab: researchLab, walls }
export const getBuildingDefinition = (id: string): BuildingDefinition | undefined => Object.prototype.hasOwnProperty.call(buildingDefinitions,id) ? buildingDefinitions[id as BuildingId] : undefined
