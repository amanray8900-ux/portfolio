import { Github, Linkedin, Mail, ChevronDown } from 'lucide-react'

const socials = [
  {
    id: 'hero-github',
    label: 'GitHub',
    href: 'https://github.com/amanray8900-ux',
    icon: Github,
  },
  {
    id: 'hero-linkedin',
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/aman-ray-5a6090294/',
    icon: Linkedin,
  },
  {
    id: 'hero-email',
    label: 'Email',
    href: 'mailto:amanray8900@gmail.com',
    icon: Mail,
  },
]

export default function Hero() {
  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
  }
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden grid-bg"
    >
      {/* Background Orbs */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-36 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

          {/* ── Left: Text Content ── */}
          <div className="flex-1 text-center lg:text-left">
            {/* Status badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-emerald-400 mb-8 border border-emerald-500/20">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              Open to ML / AI roles
            </div>

            {/* Name */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight mb-4 leading-none">
              <span className="text-white">Aman</span>{' '}
              <span className="gradient-text">Ray</span>
            </h1>

            {/* Identity */}
            <p className="text-xl sm:text-2xl font-semibold text-slate-300 mb-6 font-mono">
              ML Engineer&nbsp;·&nbsp;
              <span className="text-indigo-400">Building Reliable AI</span>
            </p>

            {/* Elevator pitch */}
            <p className="text-slate-400 text-base sm:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0 mb-10">
              M.Sc. Data Science student at{' '}
              <span className="text-slate-200 font-semibold">Chennai Mathematical Institute</span>{' '}
              with a strong mathematical foundation. I approach AI from first principles —
              understanding <em>why</em> algorithms work, not just how to apply them.
              Currently exploring Speech AI, LLMs, and ML reliability systems.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start mb-10">
              <button
                onClick={scrollToProjects}
                id="hero-view-projects"
                className="btn-primary"
              >
                View Projects
              </button>
              <a
                href="https://github.com/amanray8900-ux"
                target="_blank"
                rel="noopener noreferrer"
                id="hero-github-cta"
                className="btn-secondary"
              >
                <Github size={15} />
                GitHub
              </a>
              <button
                onClick={scrollToContact}
                id="hero-contact"
                className="btn-secondary"
              >
                Contact Me
              </button>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-4 justify-center lg:justify-start">
              {socials.map(({ id, label, href, icon: Icon }) => (
                <a
                  key={id}
                  id={id}
                  href={href}
                  target={href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-lg glass flex items-center justify-center text-slate-400 hover:text-indigo-400 hover:border-indigo-400/40 transition-all duration-200 border border-white/5"
                >
                  <Icon size={17} />
                </a>
              ))}
              {/* HuggingFace and Kaggle as text links */}
              <a
                href="https://huggingface.co/Aman-ray"
                target="_blank"
                rel="noopener noreferrer"
                id="hero-huggingface"
                className="h-10 px-3 rounded-lg glass flex items-center text-slate-400 hover:text-yellow-400 hover:border-yellow-400/30 transition-all duration-200 border border-white/5 text-xs font-mono font-semibold"
              >
                🤗 HF
              </a>
              <a
                href="https://www.kaggle.com/amanray8900"
                target="_blank"
                rel="noopener noreferrer"
                id="hero-kaggle"
                className="h-10 px-3 rounded-lg glass flex items-center text-slate-400 hover:text-cyan-400 hover:border-cyan-400/30 transition-all duration-200 border border-white/5 text-xs font-mono font-semibold"
              >
                K
              </a>
            </div>
          </div>

          {/* ── Right: Profile Image ── */}
          <div className="flex-shrink-0 relative">
            {/* Static gradient border with pulsing glow */}
            <div className="profile-border w-64 h-64 sm:w-72 sm:h-72">
              <div className="w-full h-full rounded-full overflow-hidden bg-surface">
                <img
                  src={import.meta.env.BASE_URL + 'profile.jpeg'}
                  alt="Aman Ray"
                  className="w-full h-full object-cover object-top brightness-90"
                  style={{ imageOrientation: 'from-image' }}
                  onError={(e) => {
                    e.target.style.display = 'none'
                    e.target.parentElement.classList.add('flex', 'items-center', 'justify-center')
                    e.target.parentElement.innerHTML = `<span style="font-size:4rem;font-weight:900;background:linear-gradient(135deg,#818cf8,#a78bfa);-webkit-background-clip:text;-webkit-text-fill-color:transparent">AR</span>`
                  }}
                />
              </div>
            </div>

            {/* Floating badges */}
            <div className="absolute -bottom-4 -left-8 z-20 glass rounded-xl px-4 py-2 text-sm font-semibold text-white border border-violet-500/20 shadow-lg">
              <span className="text-violet-400">Speech AI</span> · NLP · ML
            </div>

            {/* Glow behind image */}
            <div
              className="absolute inset-0 rounded-full opacity-30 -z-10 blur-3xl"
              style={{ background: 'radial-gradient(circle, #6366f1 0%, #8b5cf6 50%, transparent 70%)' }}
            />

            {/* Caption below image */}
            <p className="text-center mt-8 text-xs font-mono text-slate-500 tracking-wider">
              M.Sc. Data Science · Chennai Mathematical Institute
            </p>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-600">
          <span className="text-xs font-mono">scroll</span>
          <ChevronDown size={16} className="animate-bounce" />
        </div>
      </div>
    </section>
  )
}
