import { useEffect, useRef, useState } from 'react'
import { projects } from '../../data/projects'

interface ProjectsSectionProps {
  onVisible: () => void
}

export default function ProjectsSection({ onVisible }: ProjectsSectionProps) {
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
    <section ref={sectionRef} className="min-h-screen py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-2 mb-8 text-sm font-mono">
          <span className="text-accent">$</span>
          <span className="text-text-primary">ls projects</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <a
              key={project.id}
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group block rounded-lg overflow-hidden border border-navy-700 hover:border-accent transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <div className="relative aspect-video bg-navy-800 overflow-hidden">
                {project.videoUrl && hoveredProject === project.id && (
                  <video
                    src={project.videoUrl}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                )}
                {project.imageUrl && hoveredProject !== project.id && (
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                )}
                {!project.imageUrl && !project.videoUrl && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-text-secondary text-sm font-mono">Sin preview</span>
                  </div>
                )}
                {project.videoUrl && hoveredProject !== project.id && (
                  <div className="absolute inset-0 flex items-center justify-center bg-navy-800/50">
                    <span className="text-accent text-sm font-mono">Hover to play video</span>
                  </div>
                )}
              </div>

              <div className="p-4 space-y-2">
                <h3 className="text-lg font-semibold text-text-primary group-hover:text-accent transition-colors font-mono">
                  {project.title}
                </h3>
                <p className="text-sm text-text-secondary line-clamp-2">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {project.skills.map(skill => (
                    <span
                      key={skill}
                      className="text-xs px-2 py-1 bg-accent/10 text-accent rounded font-mono"
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
