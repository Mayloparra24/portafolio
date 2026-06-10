export default function HeroSection() {
  return (
    <header className="flex flex-col items-center gap-6 py-12 px-8">
      <div className="h-32 w-32 rounded-full bg-gradient-to-br from-accent/30 to-navy-700 border-2 border-accent/50 shadow-lg shadow-accent/20" />
      
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold text-text-primary">
          Maylo
        </h1>
        <h2 className="text-xl font-medium text-accent">
          Full Stack Developer
        </h2>
        <p className="text-text-secondary max-w-md">
          Desarrollador apasionado por crear experiencias web inmersivas y soluciones tecnológicas innovadoras.
        </p>
      </div>

      <div className="flex gap-4 mt-4">
        <a
          href="/cv-es.pdf"
          download
          className="px-6 py-2 bg-accent/10 border border-accent text-accent rounded-md hover:bg-accent/20 transition-colors"
        >
          CV Español
        </a>
        <a
          href="/cv-en.pdf"
          download
          className="px-6 py-2 bg-transparent border border-text-secondary text-text-secondary rounded-md hover:border-accent hover:text-accent transition-colors"
        >
          CV English
        </a>
      </div>
    </header>
  )
}
