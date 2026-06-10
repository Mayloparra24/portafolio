import { useRef, useState } from 'react'
import type { Project } from '../../types'

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseEnter = () => {
    setIsHovered(true)
    if (videoRef.current && project.videoUrl) {
      videoRef.current.play()
    }
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
  }

  return (
    <a
      href={project.repoUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group block rounded-lg overflow-hidden border border-navy-700 hover:border-accent transition-all duration-300"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative aspect-video bg-navy-800 overflow-hidden">
        {project.videoUrl && (
          <video
            ref={videoRef}
            src={project.videoUrl}
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        {project.imageUrl && !isHovered && (
          <img
            src={project.imageUrl}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        {!project.videoUrl && !project.imageUrl && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-text-secondary text-sm">Sin preview</span>
          </div>
        )}
      </div>

      <div className="p-4 space-y-2">
        <h3 className="text-lg font-semibold text-text-primary group-hover:text-accent transition-colors">
          {project.title}
        </h3>
        <p className="text-sm text-text-secondary line-clamp-2">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 pt-2">
          {project.tags.map(tag => (
            <span
              key={tag}
              className="text-xs px-2 py-1 bg-accent/10 text-accent rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </a>
  )
}
