import { useState, useCallback, useEffect } from 'react'
import type { Project, Skill } from './types'
import Layout from './components/layout/Layout'
import BootSequence from './components/terminal/BootSequence'
import TerminalPrompt from './components/terminal/TerminalPrompt'
import AboutSection from './components/sections/AboutSection'
import ProjectsSection from './components/sections/ProjectsSection'
import SkillsSection from './components/sections/SkillsSection'
import ContactSection from './components/sections/ContactSection'

const HELP_TEXT = 'Comandos disponibles: whoami, ls projects, cat skills, contact, help'

function App() {
  const [booted, setBooted] = useState(false)
  const [currentSection, setCurrentSection] = useState('')
  const [projects, setProjects] = useState<Project[]>([])
  const [skills, setSkills] = useState<Skill[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)

  useEffect(() => {
    const loadData = async () => {
      try {
        const [projectsRes, skillsRes] = await Promise.all([
          fetch('/data/projects.json'),
          fetch('/data/skills.json'),
        ])

        if (!projectsRes.ok) {
          throw new Error(`Error cargando proyectos: ${projectsRes.status}`)
        }
        if (!skillsRes.ok) {
          throw new Error(`Error cargando habilidades: ${skillsRes.status}`)
        }

        const projectsData = (await projectsRes.json()) as Project[]
        const skillsData = (await skillsRes.json()) as Skill[]

        setProjects(projectsData)
        setSkills(skillsData)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido cargando datos')
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, [])

  useEffect(() => {
    if (!message) return
    const timer = setTimeout(() => setMessage(null), 4000)
    return () => clearTimeout(timer)
  }, [message])

  const handleCommand = useCallback((command: string) => {
    const cmd = command.toLowerCase()
    setCurrentSection(cmd)

    switch (cmd) {
      case 'whoami':
        scrollToSection('about')
        break
      case 'ls projects':
        scrollToSection('projects')
        break
      case 'cat skills':
        scrollToSection('skills')
        break
      case 'contact':
        scrollToSection('contact')
        break
      case 'help':
        setMessage(HELP_TEXT)
        break
      default:
        setMessage(`Comando no encontrado: ${command}. Escribí 'help' para ver los disponibles.`)
        break
    }
  }, [scrollToSection])

  const handleSectionVisible = useCallback((section: string) => {
    setCurrentSection(section)
  }, [])

  if (!booted) {
    return <BootSequence onComplete={() => setBooted(true)} />
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-navy-900 font-mono text-text-secondary">
        <span className="text-accent mb-4">maylo@portfolio:~$</span>
        <span>cargando datos...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-navy-900 font-mono text-text-secondary px-4 text-center">
        <span className="text-red-400 mb-4 text-2xl">✗</span>
        <h1 className="text-text-primary text-lg mb-2">Error al cargar los datos</h1>
        <p className="text-sm max-w-md">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-6 px-4 py-2 bg-accent/10 border border-accent text-accent rounded hover:bg-accent/20 transition-colors"
        >
          Reintentar
        </button>
      </div>
    )
  }

  return (
    <Layout>
      <main className="h-full w-full overflow-y-auto scrollbar-hide desktop-bg pb-32">
        <div id="about">
          <AboutSection onVisible={() => handleSectionVisible('whoami')} />
        </div>
        <div id="projects">
          <ProjectsSection projects={projects} onVisible={() => handleSectionVisible('ls projects')} />
        </div>
        <div id="skills">
          <SkillsSection skills={skills} onVisible={() => handleSectionVisible('cat skills')} />
        </div>
        <div id="contact">
          <ContactSection onVisible={() => handleSectionVisible('contact')} />
        </div>
      </main>
      {message && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 animate-fade-in">
          <div className="bg-navy-800 border border-accent/30 text-text-primary px-4 py-3 rounded-lg shadow-lg font-mono text-sm max-w-md text-center">
            <span className="text-accent">$</span> {message}
          </div>
        </div>
      )}
      <TerminalPrompt onCommand={handleCommand} currentSection={currentSection} />
    </Layout>
  )
}

export default App
