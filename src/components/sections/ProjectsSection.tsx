import { useEffect, useRef, useState } from 'react'
import type { Project } from '../../types'

interface ProjectsSectionProps {
  projects: Project[]
  onVisible: () => void
}

export default function ProjectsSection({ projects, onVisible }: ProjectsSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const [hoveredProject, setHoveredProject] = useState<string | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onVisible()
        }
      },
      { threshold: 0.2 }
    )
    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }
    return () => observer.disconnect()
  }, [onVisible])

  return (
    <section ref={sectionRef} className="min-h-screen py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-2 mb-10 text-sm font-mono animate-fade-in">
          <span className="text-accent">maylo@portfolio:~$</span>
          <span className="text-text-primary">ls projects</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <a
              key={project.id}
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group window animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <div className="window-titlebar">
                <span className="window-dot window-dot-red" />
                <span className="window-dot window-dot-yellow" />
                <span className="window-dot window-dot-green" />
                <span className="window-title flex-1 text-center truncate">
                  {project.repoUrl.replace('https://github.com/', '')}
                </span>
              </div>

              <div className="project-preview">
                {project.videoUrl && hoveredProject === project.id ? (
                  <video
                    src={project.videoUrl}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLVideoElement
                      target.style.display = 'none'
                    }}
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-navy-850">
                    {project.videoUrl ? (
                      <>
                        <span className="text-4xl mb-3">▶</span>
                        <span className="text-accent text-sm font-mono">Pasa el cursor para ver el demo</span>
                      </>
                    ) : (
                      <span className="text-text-secondary text-sm font-mono">Sin preview disponible</span>
                    )}
                  </div>
                )}
              </div>

              <div className="p-5 space-y-3 border-t border-navy-600">
                <h3 className="text-lg font-semibold text-text-primary group-hover:text-accent transition-colors font-mono">
                  {project.title}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {project.skills.map(skill => (
                    <span
                      key={skill}
                      className="text-xs px-2 py-1 bg-accent/10 text-accent rounded font-mono border border-accent/10"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
