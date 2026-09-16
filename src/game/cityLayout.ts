import { plotIds, type PlotId } from './rules'
export type CityPlotLayout={x:number;y:number;width:number;height:number}
export const CITY_WIDTH=1100,CITY_HEIGHT=760
export const cityLayout=Object.fromEntries(plotIds.map((id,i)=>[id,{x:70+(i%6)*165,y:250+Math.floor(i/6)*115,width:140,height:90}])) as Record<PlotId,CityPlotLayout>
export const orderedCityLayout=plotIds.map(id=>({id,...cityLayout[id]}))
export const dedicatedLayout={castle:{x:430,y:65,width:220,height:130},researchLab:{x:700,y:80,width:180,height:110}}
