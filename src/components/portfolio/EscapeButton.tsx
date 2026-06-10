interface EscapeButtonProps {
  is3DMode: boolean
  onToggle: () => void
}

export default function EscapeButton({ is3DMode, onToggle }: EscapeButtonProps) {
  return (
    <button
      onClick={onToggle}
      className="fixed top-4 right-4 z-50 px-4 py-2 bg-navy-800/90 border border-accent/50 text-accent rounded-md hover:bg-accent/20 transition-all backdrop-blur-sm shadow-lg"
      aria-label={is3DMode ? 'Ver versión 2D' : 'Ver versión 3D'}
    >
      {is3DMode ? (
        <span className="flex items-center gap-2">
          <kbd className="px-1.5 py-0.5 text-xs bg-navy-700 rounded">ESC</kbd>
          Ver versión 2D
        </span>
      ) : (
        <span>Ver versión 3D</span>
      )}
    </button>
  )
}
