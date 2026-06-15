import { useState, useRef, useEffect } from 'react'

const COMMANDS = ['whoami', 'ls projects', 'cat skills', 'contact', 'help']

interface TerminalPromptProps {
  onCommand: (command: string) => void
  currentSection: string
}

export default function TerminalPrompt({ onCommand, currentSection }: TerminalPromptProps) {
  const [input, setInput] = useState('')
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (e.target instanceof HTMLElement && e.target.closest('button')) {
        const cmd = e.target.closest('button')?.getAttribute('data-command')
        if (cmd) {
          onCommand(cmd)
          setShowSuggestions(false)
        }
      }
    }
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [onCommand])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      onCommand(input.trim())
      setInput('')
      setShowSuggestions(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInput(value)
    if (value.length > 0) {
      const filtered = COMMANDS.filter(cmd => cmd.startsWith(value.toLowerCase()))
      setSuggestions(filtered)
      setShowSuggestions(filtered.length > 0)
    } else {
      setShowSuggestions(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Tab' && suggestions.length > 0) {
      e.preventDefault()
      setInput(suggestions[0])
      setShowSuggestions(false)
    }
    if (e.key === 'Escape') {
      setShowSuggestions(false)
    }
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-navy-800/95 backdrop-blur border-t border-navy-600 z-50">
      <div className="max-w-4xl mx-auto px-4 py-3">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm font-mono">
          <span className="text-accent flex-shrink-0 hidden sm:inline">maylo@portfolio</span>
          <span className="text-text-secondary flex-shrink-0 hidden sm:inline">:</span>
          <span className="text-accent flex-shrink-0">~</span>
          <span className="text-text-secondary flex-shrink-0">$</span>
          <form onSubmit={handleSubmit} className="flex-1 flex items-center min-w-[140px]">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              className="w-full bg-transparent text-text-primary font-mono outline-none px-2 caret-accent"
              placeholder={currentSection ? `Probá: ${COMMANDS.filter(c => c !== currentSection).join(', ')}` : 'Escribí un comando...'}
              autoFocus
            />
          </form>
        </div>

        {showSuggestions && (
          <div className="absolute bottom-full left-0 right-0 bg-navy-800 border-t border-navy-600 py-2">
            <div className="max-w-4xl mx-auto px-4 flex gap-2 flex-wrap">
              {suggestions.map(cmd => (
                <button
                  key={cmd}
                  data-command={cmd}
                  className="text-xs px-2 py-1 bg-navy-700 text-text-secondary hover:text-accent hover:border-accent border border-navy-700 rounded transition-colors"
                >
                  {cmd}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
