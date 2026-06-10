import type { Project, Skill } from '../types'

export const projects: Project[] = [
  {
    id: 'project-1',
    title: 'E-Commerce Platform',
    description: 'Plataforma de comercio electrónico full-stack con carrito de compras y pasarela de pagos.',
    tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    skills: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Express', 'JWT'],
    repoUrl: 'https://github.com/maylo/project-1',
  },
  {
    id: 'project-2',
    title: 'Task Management App',
    description: 'Aplicación de gestión de tareas con drag-and-drop y colaboración en tiempo real.',
    tags: ['React', 'TypeScript', 'Firebase', 'Tailwind'],
    skills: ['React', 'TypeScript', 'Firebase', 'Tailwind', 'DnD Kit'],
    repoUrl: 'https://github.com/maylo/project-2',
  },
  {
    id: 'project-3',
    title: 'AI Chat Interface',
    description: 'Interfaz de chat con IA usando WebSockets y procesamiento de lenguaje natural.',
    tags: ['Next.js', 'OpenAI', 'WebSocket', 'Prisma'],
    skills: ['Next.js', 'OpenAI', 'WebSocket', 'Prisma', 'PostgreSQL'],
    repoUrl: 'https://github.com/maylo/project-3',
  },
  {
    id: 'project-4',
    title: 'Portfolio 3D Inmersivo',
    description: 'Este mismo portafolio. Experiencia web 3D interactiva con React Three Fiber.',
    tags: ['React', 'Three.js', 'R3F', 'Tailwind'],
    skills: ['React', 'Three.js', 'R3F', 'Tailwind', 'Blender'],
    repoUrl: 'https://github.com/maylo/portafolio',
  },
]

export const skills: Skill[] = [
  { name: 'React', level: 90, category: 'Frontend' },
  { name: 'TypeScript', level: 85, category: 'Frontend' },
  { name: 'Node.js', level: 80, category: 'Backend' },
  { name: 'Next.js', level: 75, category: 'Frontend' },
  { name: 'Tailwind CSS', level: 90, category: 'Frontend' },
  { name: 'MongoDB', level: 70, category: 'Backend' },
  { name: 'PostgreSQL', level: 65, category: 'Backend' },
  { name: 'Three.js', level: 60, category: 'Frontend' },
  { name: 'Git', level: 85, category: 'Tools' },
  { name: 'Docker', level: 55, category: 'Tools' },
]
