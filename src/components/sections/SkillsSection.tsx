import { useEffect, useRef } from 'react'
import type { Skill } from '../../types'

interface SkillsSectionProps {
  skills: Skill[]
  onVisible: () => void
}

export default function SkillsSection({ skills, onVisible }: SkillsSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)

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

  const categories = Array.from(new Set(skills.map(s => s.category)))

  return (
    <section ref={sectionRef} className="min-h-screen py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-2 mb-10 text-sm font-mono animate-fade-in">
          <span className="text-accent">maylo@portfolio:~$</span>
          <span className="text-text-primary">cat skills.json</span>
        </div>

        <div className="window animate-fade-in">
          <div className="window-titlebar">
            <span className="window-dot window-dot-red" />
            <span className="window-dot window-dot-yellow" />
            <span className="window-dot window-dot-green" />
            <span className="window-title">skills.json</span>
          </div>

          <div className="window-content bg-navy-850">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {categories.map((category, catIndex) => (
                <div
                  key={category}
                  className="sticky-note animate-fade-in"
                  style={{ animationDelay: `${catIndex * 0.15}s` }}
                >
                  <div className="flex items-center gap-2 mb-5">
                    <span className="text-accent">#</span>
                    <span className="text-text-primary text-sm font-mono font-semibold">{category}</span>
                  </div>
                  <div className="space-y-4">
                    {skills
                      .filter(s => s.category === category)
                      .map((skill) => (
                        <div key={skill.name}>
                          <div className="flex justify-between mb-1.5">
                            <span className="text-sm font-mono text-text-primary">{skill.name}</span>
                            <span className="text-xs font-mono text-text-secondary">{skill.level}%</span>
                          </div>
                          <div className="skill-bar-bg">
                            <div
                              className="skill-bar-fill"
                              style={{ width: `${skill.level}%` }}
                            />
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-navy-600 text-xs text-text-secondary font-mono">
              <span className="text-accent">//</span> Niveles basados en confianza y experiencia propia. Siempre aprendiendo algo nuevo.
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
