import type { PlotId } from './rules'
export type CityPlotLayout = { id: PlotId; x: number; y: number; width: number; height: number }
export const cityLayout: CityPlotLayout[] = [{ id: 'city_plot_01', x: 70, y: 55, width: 190, height: 100 }, { id: 'city_plot_02', x: 285, y: 55, width: 190, height: 100 }, { id: 'city_plot_03', x: 500, y: 55, width: 190, height: 100 }, { id: 'city_plot_04', x: 70, y: 180, width: 190, height: 100 }, { id: 'city_plot_05', x: 285, y: 180, width: 190, height: 100 }, { id: 'city_plot_06', x: 500, y: 180, width: 190, height: 100 }]
