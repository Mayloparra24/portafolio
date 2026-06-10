import { useState, useEffect, useCallback } from 'react'
import Layout from './components/layout/Layout'
import Scene from './components/three/Scene'
import MonitorUI from './components/portfolio/MonitorUI'
import EscapeButton from './components/portfolio/EscapeButton'

function App() {
  const [is3DMode, setIs3DMode] = useState(true)

  const toggleMode = useCallback(() => {
    setIs3DMode(prev => !prev)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        toggleMode()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [toggleMode])

  return (
    <Layout>
      <main className="h-full w-full relative">
        <EscapeButton is3DMode={is3DMode} onToggle={toggleMode} />
        
        {is3DMode ? (
          <Scene />
        ) : (
          <div className="h-full w-full overflow-y-auto bg-navy-900 p-8">
            <MonitorUI embedded={false} />
          </div>
        )}
      </main>
    </Layout>
  )
}

export default App
