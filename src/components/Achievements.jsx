import { useInView } from '../hooks/useInView'
import { Trophy, BookOpen, Users, Cpu } from 'lucide-react'

const achievements = [
  {
    id: 'soft-skill-live',
    icon: Cpu,
    title: 'Live AI Application — Soft Skills Analyzer',
    description: 'Designed, built, and publicly deployed an AI-powered speech assessment platform on Streamlit Cloud. Evaluates communication clarity, pacing, engagement, and confidence with LLM semantic feedback.',
    year: '2026',
    color: '#06b6d4',
    bgColor: 'rgba(6,182,212,0.1)',
    link: 'https://softskillanalyser-kqmauq2z6csnfu3hesqprr.streamlit.app/',
    linkLabel: 'View Live App',
  },
  {
    id: 'ncut-review',
    icon: BookOpen,
    title: 'Technical Review: Normalized Cuts',
    description: '15-page technical report on the seminal Shi\u2013Malik paper (IEEE TPAMI). Covers spectral graph theory, graph Laplacians, generalized eigenvalue formulations, and Python implementation.',
    year: '2026',
    color: '#10b981',
    bgColor: 'rgba(16,185,129,0.1)',
    link: '/ncut-report.pdf',
    linkLabel: 'View Report',
  },
  {
    id: 'placement-committee',
    icon: Users,
    title: 'Placement Committee — CMI',
    description: 'Selected as a Placement Committee Member at Chennai Mathematical Institute. Coordinates recruiter outreach, placement logistics, and industry communications for fellow students.',
    year: '2026',
    color: '#8b5cf6',
    bgColor: 'rgba(139,92,246,0.1)',
  },
  {
    id: 'iit-jam',
    icon: Trophy,
    title: 'IIT JAM Mathematics 2025',
    description: 'Qualified the Joint Admission Test for M.Sc. programmes at IITs \u2014 one of India\'s most competitive mathematics entrance examinations.',
    year: '2025',
    color: '#f59e0b',
    bgColor: 'rgba(245,158,11,0.1)',
  },
]


export default function Achievements() {
  const [ref, inView] = useInView()

  return (
    <section id="achievements" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div ref={ref} className={`fade-init ${inView ? 'fade-in' : ''}`}>
          <p className="text-indigo-400 font-mono text-sm font-semibold mb-3 tracking-widest uppercase">
            Achievements
          </p>
          <h2 className="section-heading text-white mb-16">Recognition & Impact</h2>

          <div className="grid sm:grid-cols-2 gap-6">
            {achievements.map((item, idx) => {
              const Icon = item.icon
              return (
                <div
                  key={item.id}
                  id={`achievement-${item.id}`}
                  className={`glass rounded-2xl p-6 card-glow transition-all duration-300 fade-init ${inView ? 'fade-in' : ''}`}
                  style={{
                    borderTop: `2px solid ${item.color}40`,
                    transitionDelay: `${idx * 100}ms`,
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: item.bgColor }}
                    >
                      <Icon size={20} style={{ color: item.color }} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <h3 className="font-bold text-white text-base leading-tight">
                          {item.title}
                        </h3>
                        <span
                          className="text-xs px-2 py-0.5 rounded-full font-mono flex-shrink-0"
                          style={{
                            color: item.color,
                            background: item.bgColor,
                            border: `1px solid ${item.color}30`,
                          }}
                        >
                          {item.year}
                        </span>
                      </div>
                      <p className="text-slate-400 text-sm leading-relaxed mb-3">
                        {item.description}
                      </p>
                      {item.link && (
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          id={`achievement-link-${item.id}`}
                          className="text-xs font-semibold transition-colors"
                          style={{ color: item.color }}
                        >
                          {item.linkLabel} →
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
