export interface Project {
  id: string
  title: string
  description: string
  tags: string[]
  skills: string[]
  repoUrl: string
  liveUrl?: string
  videoUrl?: string
  imageUrl?: string
}

export interface SEOMeta {
  title?: string
  description?: string
  image?: string
  url?: string
  type?: 'website' | 'article'
}

export interface Skill {
  name: string
  level: number
  category: string
}
