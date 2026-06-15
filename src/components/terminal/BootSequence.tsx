import { useState, useEffect } from 'react'

const BOOT_LINES = [
  { text: 'init maylo_portfolio...', delay: 100 },
  { text: 'loading assets...', delay: 300 },
  { text: '[OK] assets loaded', delay: 600 },
  { text: 'loading projects...', delay: 900 },
  { text: '[OK] 4 projects loaded', delay: 1200 },
  { text: 'loading skills...', delay: 1500 },
  { text: '[OK] 10 skills loaded', delay: 1800 },
  { text: 'loading contact...', delay: 2100 },
  { text: '[OK] contact loaded', delay: 2400 },
  { text: 'ready.', delay: 2700 },
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
          const completeTimer = setTimeout(() => onComplete(), 500)
          timers.push(completeTimer)
        }
      }, line.delay)
      timers.push(timer)
    })

    return () => timers.forEach(clearTimeout)
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
      </div>
    </div>
  )
}
