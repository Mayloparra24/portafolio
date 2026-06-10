import { Helmet } from 'react-helmet-async'

interface SEOProps {
  title?: string
  description?: string
  image?: string
  url?: string
  type?: 'website' | 'article'
}

const DEFAULT_TITLE = 'Maylo | Full Stack Developer'
const DEFAULT_DESCRIPTION =
  'Portafolio interactivo 3D de Maylo - Desarrollador Full Stack especializado en React, TypeScript y experiencias web inmersivas.'
const DEFAULT_IMAGE = 'https://maylocode.dev/og-image.png'
const DEFAULT_URL = 'https://maylocode.dev'

export default function SEO({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  image = DEFAULT_IMAGE,
  url = DEFAULT_URL,
  type = 'website',
}: SEOProps) {
  const fullTitle = `${title} | maylocode.dev`

  return (
    <Helmet>
      <html lang="es" />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="Maylo Code" />
      <meta property="og:locale" content="es_ES" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      <meta name="robots" content="index, follow" />
      <meta name="author" content="Maylo" />
    </Helmet>
  )
}
