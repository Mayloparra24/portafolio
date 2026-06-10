import { useEffect, useRef } from 'react'
import { skills } from '../../data/projects'

interface SkillsSectionProps {
  onVisible: () => void
}

export default function SkillsSection({ onVisible }: SkillsSectionProps) {
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

  const categories = Array.from(new Set(skills.map(s => s.category)))

  return (
    <section ref={sectionRef} className="min-h-screen py-20 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-2 mb-8 text-sm font-mono">
          <span className="text-accent">$</span>
          <span className="text-text-primary">cat skills</span>
        </div>

        <div className="space-y-8">
          {categories.map((category, catIndex) => (
            <div key={category} className="animate-fade-in" style={{ animationDelay: `${catIndex * 0.2}s` }}>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-accent">#</span>
                <span className="text-text-secondary text-sm font-mono">{category}</span>
              </div>
              <div className="space-y-3">
                {skills
                  .filter(s => s.category === category)
                  .map((skill, index) => (
                    <div
                      key={skill.name}
                      className="flex items-center gap-4 animate-fade-in"
                      style={{ animationDelay: `${catIndex * 0.2 + index * 0.1}s` }}
                    >
                      <span className="text-sm font-mono text-text-primary w-24 flex-shrink-0">
                        {skill.name}
                      </span>
                      <div className="flex-1 h-2 bg-navy-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-accent rounded-full transition-all duration-1000 ease-out"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                      <span className="text-xs font-mono text-text-secondary w-8 text-right">
                        {skill.level}%
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
