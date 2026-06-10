import type { ReactNode } from 'react'
import SEO from './SEO'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <SEO />
      {children}
    </>
  )
}
