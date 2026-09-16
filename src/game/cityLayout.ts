import { plotIds, type PlotId } from './rules'
export type CityPlotLayout = { x: number; y: number; width: number; height: number }
export const cityLayout: Record<PlotId, CityPlotLayout> = Object.fromEntries(plotIds.map((id, index) => [id, { x: 70 + (index % 3) * 215, y: 55 + Math.floor(index / 3) * 125, width: 190, height: 100 }])) as Record<PlotId, CityPlotLayout>
export const orderedCityLayout = plotIds.map((id) => ({ id, ...cityLayout[id] }))
