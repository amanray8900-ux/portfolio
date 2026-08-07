import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { FileText, Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'About', id: 'about' },
  { label: 'Education', id: 'education' },
  { label: 'Experience', id: 'experience' },
  { label: 'Projects', id: 'projects' },
  { label: 'Achievements', id: 'achievements' },
  { label: 'Contact', id: 'contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id) => {
    setMenuOpen(false)
    if (location.pathname !== '/') {
      navigate('/')
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
      }, 300)
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const goHome = () => {
    setMenuOpen(false)
    navigate('/')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'glass border-b border-white/5 py-3' : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={goHome}
            className="flex items-center gap-2 group"
            id="navbar-logo"
          >
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center font-mono font-bold text-sm text-white"
              style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}
            >
              AR
            </div>
            <span className="text-sm font-semibold text-slate-300 group-hover:text-white transition-colors hidden sm:block">
              Aman Ray
            </span>
          </button>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="nav-link"
                id={`nav-${link.id}`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Resume Button + Hamburger */}
          <div className="flex items-center gap-3">
            <a
              href={import.meta.env.BASE_URL + 'resume.pdf'}
              target="_blank"
              rel="noopener noreferrer"
              id="navbar-resume-btn"
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-indigo-300 border border-indigo-500/30 hover:bg-indigo-500/10 hover:border-indigo-400/60 transition-all duration-200"
            >
              <FileText size={14} />
              Resume
            </a>
            <button
              className="md:hidden text-slate-400 hover:text-white transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              id="navbar-hamburger"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setMenuOpen(false)}
        />
        <div
          className={`absolute top-0 right-0 h-full w-72 glass border-l border-white/5 p-8 pt-20 transition-transform duration-300 ${
            menuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="text-left text-slate-300 hover:text-white font-medium text-lg transition-colors"
              >
                {link.label}
              </button>
            ))}
            <a
              href={import.meta.env.BASE_URL + 'resume.pdf'}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary w-fit mt-4"
            >
              <FileText size={15} />
              Resume
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
