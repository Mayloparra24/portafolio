import { useState, useEffect } from 'react'

const BOOT_LINES = [
  { text: 'init maylo_portfolio...', delay: 40 },
  { text: 'loading assets...', delay: 100 },
  { text: '[OK] assets loaded', delay: 200 },
  { text: 'loading projects...', delay: 300 },
  { text: '[OK] 4 projects loaded', delay: 400 },
  { text: 'loading skills...', delay: 500 },
  { text: '[OK] 10 skills loaded', delay: 600 },
  { text: 'loading contact...', delay: 700 },
  { text: '[OK] contact loaded', delay: 800 },
  { text: 'ready.', delay: 900 },
]

interface BootSequenceProps {
  onComplete: () => void
}

export default function BootSequence({ onComplete }: BootSequenceProps) {
  const [visibleLines, setVisibleLines] = useState<string[]>([])

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = []

    BOOT_LINES.forEach((line, index) => {
      const timer = setTimeout(() => {
        setVisibleLines(prev => [...prev, line.text])
        if (index === BOOT_LINES.length - 1) {
          const completeTimer = setTimeout(() => onComplete(), 200)
          timers.push(completeTimer)
        }
      }, line.delay)
      timers.push(timer)
    })

    const skip = () => {
      timers.forEach(clearTimeout)
      onComplete()
    }

    document.addEventListener('click', skip)
    document.addEventListener('keydown', skip)
    document.addEventListener('touchstart', skip)

    return () => {
      timers.forEach(clearTimeout)
      document.removeEventListener('click', skip)
      document.removeEventListener('keydown', skip)
      document.removeEventListener('touchstart', skip)
    }
  }, [onComplete])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-navy-900 font-mono desktop-bg">
      <div className="w-full max-w-2xl px-4">
        <div className="mb-8 text-center">
          <span className="text-accent text-sm">maylo@portfolio:~$</span>
        </div>
        <div className="window p-6">
          <div className="space-y-1.5">
            {visibleLines.map((line, index) => (
              <div
                key={index}
                className="text-sm font-mono animate-fade-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {line.startsWith('[OK]') ? (
                  <span>
                    <span className="text-accent">{line.split(' ')[0]}</span>
                    <span className="text-text-secondary">{line.slice(4)}</span>
                  </span>
                ) : line.startsWith('ready') ? (
                  <span className="text-accent">{line}</span>
                ) : (
                  <span className="text-text-secondary">{line}</span>
                )}
              </div>
            ))}
            {visibleLines.length === BOOT_LINES.length && (
              <div className="mt-4 text-sm">
                <span className="text-accent">$</span>
                <span className="animate-blink text-accent">|</span>
              </div>
            )}
          </div>
        </div>
        <p className="text-center text-text-secondary text-xs mt-6 font-mono animate-fade-in">
          Presiona cualquier tecla para saltar
        </p>
      </div>
    </div>
  )
}
