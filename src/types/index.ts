export interface Project {
  id: string
  title: string
  description: string
  tags: string[]
  repoUrl: string
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
