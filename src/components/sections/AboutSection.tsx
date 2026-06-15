import { useEffect, useRef } from 'react'

interface AboutSectionProps {
  onVisible: () => void
}

export default function AboutSection({ onVisible }: AboutSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onVisible()
        }
      },
      { threshold: 0.3 }
    )
    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }
    return () => observer.disconnect()
  }, [onVisible])

  return (
    <section ref={sectionRef} className="min-h-screen flex items-center justify-center py-24 px-4">
      <div className="w-full max-w-3xl window animate-fade-in">
        <div className="window-titlebar">
          <span className="window-dot window-dot-red" />
          <span className="window-dot window-dot-yellow" />
          <span className="window-dot window-dot-green" />
          <span className="window-title">about.txt — maylo@portfolio</span>
        </div>

        <div className="window-content">
          <div className="terminal-line text-sm mb-6">
            <span className="terminal-prompt">maylo@portfolio:~$</span>
            <span className="text-text-primary">whoami</span>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-8 animate-fade-in">
            <div className="relative group">
              <div className="h-36 w-36 rounded-full overflow-hidden border-2 border-accent/30 shadow-lg shadow-accent/10">
                <img
                  src="/profile-photo.svg"
                  alt="Maylo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-navy-700 text-accent text-xs px-2 py-1 rounded border border-navy-600 opacity-0 group-hover:opacity-100 transition-opacity">
                ¡hola!
              </div>
            </div>

            <div className="text-center md:text-left flex-1">
              <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-2">
                Maylo Parra
              </h1>
              <h2 className="text-lg md:text-xl font-medium text-accent mb-4">
                Full Stack Developer
              </h2>
              <p className="text-text-secondary leading-relaxed max-w-lg">
                Desarrollador apasionado por construir cosas que la gente realmente use.
                Me gusta aprender haciendo, desde la base de datos hasta el último pixel de la interfaz.
              </p>
            </div>
          </div>

          <div className="mt-8 p-4 bg-navy-850 rounded-lg border border-navy-600 font-mono text-sm space-y-2">
            <div className="terminal-line">
              <span className="terminal-prompt">$</span>
              <span className="text-text-secondary">location</span>
            </div>
            <div className="pl-6 text-text-primary">Costa Rica</div>
            <div className="terminal-line">
              <span className="terminal-prompt">$</span>
              <span className="text-text-secondary">status</span>
            </div>
            <div className="pl-6 text-text-primary">
              Estudiando, construyendo proyectos personales y buscando mi primera experiencia profesional.
            </div>
          </div>

          <div className="flex gap-4 justify-center md:justify-start mt-8">
            <a
              href="/cv-es.pdf"
              download
              className="px-6 py-2 bg-accent/10 border border-accent text-accent rounded-md hover:bg-accent/20 transition-colors text-sm font-mono"
            >
              CV Español
            </a>
            <a
              href="/cv-en.pdf"
              download
              className="px-6 py-2 bg-transparent border border-text-secondary text-text-secondary rounded-md hover:border-accent hover:text-accent transition-colors text-sm font-mono"
            >
              CV English
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
