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
    <section ref={sectionRef} className="min-h-screen flex items-center justify-center py-20 px-4">
      <div className="max-w-2xl w-full">
        <div className="flex items-center gap-2 mb-8 text-sm font-mono">
          <span className="text-accent">$</span>
          <span className="text-text-primary">whoami</span>
        </div>

        <div className="space-y-8 animate-fade-in">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="h-32 w-32 rounded-full bg-gradient-to-br from-accent/30 to-navy-700 border-2 border-accent/50 shadow-lg shadow-accent/20 overflow-hidden flex-shrink-0">
              <img
                src="/src/assets/Foto_Portafolio.png"
                alt="Maylo"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none'
                }}
              />
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-4xl font-bold text-text-primary mb-2">Maylo</h1>
              <h2 className="text-xl font-medium text-accent mb-4">Full Stack Developer</h2>
              <p className="text-text-secondary max-w-md leading-relaxed">
                Desarrollador apasionado por crear experiencias web inmersivas y soluciones tecnológicas innovadoras.
              </p>
            </div>
          </div>

          <div className="flex gap-4 justify-center md:justify-start">
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
