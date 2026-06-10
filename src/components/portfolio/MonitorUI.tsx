import HeroSection from './HeroSection'
import ProjectsGrid from './ProjectsGrid'

interface MonitorUIProps {
  embedded?: boolean
}

export default function MonitorUI({ embedded = true }: MonitorUIProps) {
  const containerClass = embedded
    ? 'w-[800px] h-[500px] rounded-lg border border-navy-700'
    : 'w-full max-w-4xl mx-auto rounded-lg border border-navy-700 min-h-0'

  return (
    <div className={`${containerClass} bg-navy-900/95 overflow-y-auto backdrop-blur-sm`}>
      <HeroSection />
      <ProjectsGrid />
    </div>
  )
}
