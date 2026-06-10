import type { Project } from '../types'

export const projects: Project[] = [
  {
    id: 'project-1',
    title: 'E-Commerce Platform',
    description: 'Plataforma de comercio electrónico full-stack con carrito de compras y pasarela de pagos.',
    tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    repoUrl: 'https://github.com/maylo/project-1',
  },
  {
    id: 'project-2',
    title: 'Task Management App',
    description: 'Aplicación de gestión de tareas con drag-and-drop y colaboración en tiempo real.',
    tags: ['React', 'TypeScript', 'Firebase', 'Tailwind'],
    repoUrl: 'https://github.com/maylo/project-2',
  },
  {
    id: 'project-3',
    title: 'AI Chat Interface',
    description: 'Interfaz de chat con IA usando WebSockets y procesamiento de lenguaje natural.',
    tags: ['Next.js', 'OpenAI', 'WebSocket', 'Prisma'],
    repoUrl: 'https://github.com/maylo/project-3',
  },
  {
    id: 'project-4',
    title: 'Portfolio 3D Inmersivo',
    description: 'Este mismo portafolio. Experiencia web 3D interactiva con React Three Fiber.',
    tags: ['React', 'Three.js', 'R3F', 'Tailwind'],
    repoUrl: 'https://github.com/maylo/portafolio',
  },
]
