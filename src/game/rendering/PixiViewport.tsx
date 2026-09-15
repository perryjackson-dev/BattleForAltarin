import { Application, Text } from 'pixi.js'
import { useEffect, useRef, useState } from 'react'
import { database } from '../../persistence/database'

export function PixiViewport() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [status, setStatus] = useState('Initialising renderer…')

  useEffect(() => {
    const pixi = new Application()
    let disposed = false
    let initialised = false
    async function initialise() {
      try {
        await database.open()
        await pixi.init({ background: '#1e293b', height: 220, width: 760, antialias: true })
        initialised = true
        pixi.stage.addChild(new Text({ text: 'PixiJS is ready', style: { fill: '#e2e8f0', fontSize: 20 } }))
        containerRef.current?.appendChild(pixi.canvas)
        if (!disposed) setStatus('Renderer ready')
      } catch { if (!disposed) setStatus('Renderer failed to initialise') }
    }
    void initialise()
    return () => { disposed = true; if (initialised) pixi.destroy(true) }
  }, [])

  return <div className="overflow-hidden rounded border border-slate-700 bg-slate-900"><div ref={containerRef} aria-label="PixiJS rendering area" className="min-h-55" /><p className="border-t border-slate-700 px-3 py-2 text-xs text-slate-400">{status}</p></div>
}
