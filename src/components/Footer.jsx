import { Github, Linkedin, Heart } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-slate-600 text-sm flex items-center gap-1.5">
          Built by{' '}
          <span className="gradient-text font-semibold">Aman Ray</span>
          {' '}·{' '}
          <span className="flex items-center gap-1">
            With <Heart size={12} className="text-rose-500 inline" /> and curiosity
          </span>
          {' '}·{' '}2026
        </p>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/amanray8900-ux"
            target="_blank"
            rel="noopener noreferrer"
            id="footer-github"
            aria-label="GitHub"
            className="text-slate-600 hover:text-slate-300 transition-colors"
          >
            <Github size={17} />
          </a>
          <a
            href="https://www.linkedin.com/in/aman-ray-5a6090294/"
            target="_blank"
            rel="noopener noreferrer"
            id="footer-linkedin"
            aria-label="LinkedIn"
            className="text-slate-600 hover:text-slate-300 transition-colors"
          >
            <Linkedin size={17} />
          </a>
        </div>
      </div>
    </footer>
  )
}
