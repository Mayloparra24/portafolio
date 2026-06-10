import { projects } from '../../data/projects'
import ProjectCard from './ProjectCard'

export default function ProjectsGrid() {
  return (
    <section className="px-8 py-6">
      <h2 className="text-2xl font-bold text-text-primary mb-6">
        Proyectos
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  )
}
