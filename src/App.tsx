import { useState, useCallback, useRef } from 'react'
import Layout from './components/layout/Layout'
import BootSequence from './components/terminal/BootSequence'
import TerminalPrompt from './components/terminal/TerminalPrompt'
import AboutSection from './components/sections/AboutSection'
import ProjectsSection from './components/sections/ProjectsSection'
import SkillsSection from './components/sections/SkillsSection'
import ContactSection from './components/sections/ContactSection'

function App() {
  const [booted, setBooted] = useState(false)
  const [currentSection, setCurrentSection] = useState('')
  const mainRef = useRef<HTMLElement>(null)

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, [])

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
      default:
        break
    }
  }, [scrollToSection])

  const handleSectionVisible = useCallback((section: string) => {
    setCurrentSection(section)
  }, [])

  if (!booted) {
    return <BootSequence onComplete={() => setBooted(true)} />
  }

  return (
    <Layout>
      <main ref={mainRef} className="h-full w-full overflow-y-auto scrollbar-hide bg-navy-900 pb-20">
        <div id="about">
          <AboutSection onVisible={() => handleSectionVisible('whoami')} />
        </div>
        <div id="projects">
          <ProjectsSection onVisible={() => handleSectionVisible('ls projects')} />
        </div>
        <div id="skills">
          <SkillsSection onVisible={() => handleSectionVisible('cat skills')} />
        </div>
        <div id="contact">
          <ContactSection onVisible={() => handleSectionVisible('contact')} />
        </div>
      </main>
      <TerminalPrompt onCommand={handleCommand} currentSection={currentSection} />
    </Layout>
  )
}

export default App
