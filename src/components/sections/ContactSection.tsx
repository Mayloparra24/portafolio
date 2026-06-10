import { useEffect, useRef, useState } from 'react'

interface ContactSectionProps {
  onVisible: () => void
}

function GitHubIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M128 0C57.308 0 0 57.308 0 128c0 56.533 36.688 104.508 87.623 121.478 6.4 1.193 8.747-2.778 8.747-6.158 0-3.04-.12-13.075-.17-23.71-35.611 7.742-43.124-15.107-43.124-15.107-5.82-14.794-14.213-18.73-14.213-18.73-11.613-7.944.876-7.78.876-7.78 12.853.904 19.62 13.196 19.62 13.196 11.42 19.564 29.95 13.91 37.222 10.64 1.152-8.273 4.463-13.91 8.125-17.11-28.432-3.236-58.335-14.216-58.335-63.27 0-13.98 4.99-25.4 13.178-34.358-1.325-3.23-5.71-16.23 1.24-33.855 0 0 10.748-3.438 35.207 13.12 10.21-2.836 21.15-4.254 32.02-4.306 10.87.052 21.81 1.47 32.04 4.306 24.45-16.558 35.19-13.12 35.19-13.12 6.96 17.625 2.57 30.625 1.25 33.855 8.2 8.958 13.17 20.378 13.17 34.358 0 49.163-29.93 59.99-58.44 63.15 4.59 3.96 8.68 11.73 8.68 23.63 0 17.06-.15 30.82-.15 35.02 0 3.4 2.27 7.4 8.75 6.14C219.34 232.48 256 184.5 256 128c0-70.692-57.308-128-128-128z" fill="currentColor"/>
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M218.123 218.127h-37.931v-59.403c0-14.165-.253-32.4-19.728-32.4-19.756 0-22.779 15.434-22.779 31.369v60.43h-37.93V95.967h36.413v16.694h.51a39.907 39.907 0 0 1 35.928-19.733c38.445 0 45.533 25.288 45.533 58.186l-.016 67.013zM56.955 79.27c-12.157.002-22.014-9.852-22.016-22.009-.002-12.157 9.851-22.014 22.008-22.016 12.157-.003 22.014 9.851 22.016 22.008A22.013 22.013 0 0 1 56.955 79.27m18.966 138.858H37.95V95.967h37.97v122.16zM237.033.018H18.89C8.58-.098.125 8.161-.001 18.471v219.053c.122 10.315 8.576 18.582 18.89 18.474h218.144c10.336.128 18.823-8.139 18.966-18.474V18.454c-.147-10.33-8.635-18.588-18.966-18.453" fill="#0A66C2"/>
    </svg>
  )
}

function MailIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="4" width="20" height="16" rx="2"/>
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
    </svg>
  )
}

export default function ContactSection({ onVisible }: ContactSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onVisible()
        }
      },
      { threshold: 0.3 }
    )
    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }
    return () => observer.disconnect()
  }, [onVisible])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText('a494256@gmail.com')
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback for browsers without clipboard API
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <section ref={sectionRef} className="min-h-screen py-20 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-2 mb-8 text-sm font-mono">
          <span className="text-accent">$</span>
          <span className="text-text-primary">contact</span>
        </div>

        <div className="space-y-4 animate-fade-in">
          <div className="flex items-center gap-4 p-4 border border-navy-700 rounded-lg hover:border-accent transition-colors">
            <div className="text-accent">
              <MailIcon />
            </div>
            <div className="flex-1">
              <span className="text-accent font-mono text-sm block">email:</span>
              <span className="text-text-primary font-mono text-sm">a494256@gmail.com</span>
            </div>
            <button
              onClick={handleCopy}
              className="px-3 py-1 bg-accent/10 border border-accent text-accent rounded text-xs font-mono hover:bg-accent/20 transition-colors"
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>

          <div className="flex items-center gap-4 p-4 border border-navy-700 rounded-lg hover:border-accent transition-colors">
            <div className="text-text-primary">
              <GitHubIcon />
            </div>
            <div className="flex-1">
              <span className="text-accent font-mono text-sm block">github:</span>
              <a
                href="https://github.com/Mayloparra24"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-primary hover:text-accent transition-colors font-mono text-sm"
              >
                github.com/Mayloparra24
              </a>
            </div>
            <a
              href="https://github.com/Mayloparra24"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1 bg-accent/10 border border-accent text-accent rounded text-xs font-mono hover:bg-accent/20 transition-colors"
            >
              Open
            </a>
          </div>

          <div className="flex items-center gap-4 p-4 border border-navy-700 rounded-lg hover:border-accent transition-colors">
            <div className="text-text-primary">
              <LinkedInIcon />
            </div>
            <div className="flex-1">
              <span className="text-accent font-mono text-sm block">linkedin:</span>
              <a
                href="https://www.linkedin.com/in/maylo-parra-aguirre-298a61173/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-primary hover:text-accent transition-colors font-mono text-sm"
              >
                linkedin.com/in/maylo-parra-aguirre-298a61173
              </a>
            </div>
            <a
              href="https://www.linkedin.com/in/maylo-parra-aguirre-298a61173/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1 bg-accent/10 border border-accent text-accent rounded text-xs font-mono hover:bg-accent/20 transition-colors"
            >
              Open
            </a>
          </div>
        </div>

        <div className="text-center text-sm text-text-secondary font-mono mt-12">
          <span className="text-accent">$</span> Type any command to navigate
        </div>
      </div>
    </section>
  )
}
