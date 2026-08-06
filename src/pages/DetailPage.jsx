import { useParams, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { ArrowLeft, Github, ExternalLink, Users, Calendar, Tag } from 'lucide-react'
import { projects } from '../data/projects'
import { internships } from '../data/internship'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

// ── Tag color map (same as ProjectCard) ──────────────────────
const tagColorMap = {
  Python: 'bg-blue-500/15 text-blue-300 border-blue-500/25',
  PyTorch: 'bg-orange-500/15 text-orange-300 border-orange-500/25',
  'Hugging Face': 'bg-yellow-500/15 text-yellow-300 border-yellow-500/25',
  'PEFT/LoRA': 'bg-amber-500/15 text-amber-300 border-amber-500/25',
  Whisper: 'bg-sky-500/15 text-sky-300 border-sky-500/25',
  'SNAC Codec': 'bg-teal-500/15 text-teal-300 border-teal-500/25',
  Transformers: 'bg-purple-500/15 text-purple-300 border-purple-500/25',
  'W&B': 'bg-orange-500/15 text-orange-300 border-orange-500/25',
  'Scikit-learn': 'bg-cyan-500/15 text-cyan-300 border-cyan-500/25',
  LOF: 'bg-violet-500/15 text-violet-300 border-violet-500/25',
  Embeddings: 'bg-indigo-500/15 text-indigo-300 border-indigo-500/25',
  'Anomaly Detection': 'bg-rose-500/15 text-rose-300 border-rose-500/25',
  'ML Engineering': 'bg-slate-500/15 text-slate-300 border-slate-500/25',
  Librosa: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/25',
  'Llama 3.1': 'bg-purple-500/15 text-purple-300 border-purple-500/25',
  Streamlit: 'bg-red-500/15 text-red-300 border-red-500/25',
  'Cerebras API': 'bg-pink-500/15 text-pink-300 border-pink-500/25',
  SMOTE: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/25',
  'Decision Tree': 'bg-green-500/15 text-green-300 border-green-500/25',
  ColumnTransformer: 'bg-teal-500/15 text-teal-300 border-teal-500/25',
  'Naive Bayes': 'bg-lime-500/15 text-lime-300 border-lime-500/25',
  'Feature Engineering': 'bg-amber-500/15 text-amber-300 border-amber-500/25',
  XGBoost: 'bg-green-500/15 text-green-300 border-green-500/25',
  'Random Forest': 'bg-emerald-500/15 text-emerald-300 border-emerald-500/25',
  EDA: 'bg-blue-500/15 text-blue-300 border-blue-500/25',
  'KNN Imputer': 'bg-sky-500/15 text-sky-300 border-sky-500/25',
  Speech: 'bg-indigo-500/15 text-indigo-300 border-indigo-500/25',
  'Speech AI': 'bg-indigo-500/15 text-indigo-300 border-indigo-500/25',
}
const defaultTag = 'bg-slate-500/15 text-slate-300 border-slate-500/25'

// ── Section wrapper ────────────────────────────────────────────
function Section({ label, children }) {
  return (
    <div className="mb-14">
      <h2 className="text-sm font-mono text-indigo-400 uppercase tracking-widest mb-4 flex items-center gap-3">
        <span className="w-6 h-px bg-indigo-500/50 inline-block" />
        {label}
      </h2>
      {children}
    </div>
  )
}

// ── Numbered step card ─────────────────────────────────────────
function StepCard({ step }) {
  return (
    <div className="glass rounded-xl p-5 border border-white/5 hover:border-indigo-500/20 transition-all duration-200">
      <div className="flex gap-4 items-start">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-sm font-bold font-mono text-white"
          style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}
        >
          {step.step}
        </div>
        <div>
          <h4 className="font-semibold text-white mb-2">{step.title}</h4>
          <p className="text-slate-400 text-sm leading-relaxed">{step.description}</p>
        </div>
      </div>
    </div>
  )
}

// ── Decision card ──────────────────────────────────────────────
function DecisionCard({ decision }) {
  return (
    <div className="glass rounded-xl p-5 border border-violet-500/15 hover:border-violet-500/30 transition-all duration-200">
      <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-violet-400 flex-shrink-0" />
        {decision.title}
      </h4>
      <p className="text-slate-400 text-sm leading-relaxed pl-4">{decision.description}</p>
    </div>
  )
}

// ── Metric card ────────────────────────────────────────────────
function MetricCard({ metric, label, highlight }) {
  return (
    <div
      className={`metric-card ${highlight ? 'border-indigo-500/40' : ''}`}
    >
      <div
        className={`text-3xl sm:text-4xl font-black mb-2 font-mono ${
          highlight ? 'gradient-text' : 'text-white'
        }`}
      >
        {metric}
      </div>
      <p className="text-slate-400 text-xs leading-tight">{label}</p>
    </div>
  )
}

// ── Main component ─────────────────────────────────────────────
export default function DetailPage({ type }) {
  const { slug } = useParams()
  const navigate = useNavigate()

  useEffect(() => { window.scrollTo(0, 0) }, [slug])

  // Find data
  const data = type === 'project'
    ? projects.find((p) => p.slug === slug)
    : internships.find((i) => i.slug === slug)

  if (!data) {
    return (
      <div className="min-h-screen bg-bg flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center flex-col gap-4 text-slate-400">
          <p className="text-xl font-bold">404 — Not Found</p>
          <button onClick={() => navigate('/')} className="btn-primary">Go Home</button>
        </div>
        <Footer />
      </div>
    )
  }

  const accentColor = data.accentColor || '#6366f1'
  const sectionId = type === 'project' ? 'projects' : 'experience'

  return (
    <div className="min-h-screen bg-bg">
      <Navbar />

      {/* ── Hero Banner ── */}
      <div
        className="relative pt-32 pb-20 px-6 overflow-hidden"
        style={{
          background: `linear-gradient(180deg, ${accentColor}12 0%, transparent 100%)`,
        }}
      >
        {/* Faint grid */}
        <div className="absolute inset-0 grid-bg opacity-50 pointer-events-none" />
        {/* Glow orb */}
        <div
          className="absolute top-10 right-20 w-96 h-96 rounded-full opacity-10 pointer-events-none blur-3xl"
          style={{ background: accentColor }}
        />

        <div className="relative max-w-4xl mx-auto">
          {/* Back button */}
          <button
            onClick={() => {
              navigate('/')
              setTimeout(() => {
                document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
              }, 300)
            }}
            id="detail-back-btn"
            className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-300 mb-10 transition-colors group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            Back to Portfolio
          </button>

          {/* Category badge */}
          <div className="inline-flex items-center gap-2 mb-5">
            <Tag size={12} style={{ color: accentColor }} />
            <span className="text-xs font-mono uppercase tracking-widest" style={{ color: accentColor }}>
              {data.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight mb-3 text-white">
            {data.title}
          </h1>
          {data.subtitle && (
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-400 mb-6">
              {data.subtitle}
            </h2>
          )}
          {/* Company info for internship */}
          {data.company && (
            <p className="text-xl font-semibold text-indigo-300 mb-2">
              {data.company} · {data.location}
            </p>
          )}

          {/* Tagline */}
          <p className="text-slate-300 text-lg leading-relaxed max-w-2xl mb-8">
            {data.tagline}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {data.tags.map((tag) => (
              <span key={tag} className={`tag ${tagColorMap[tag] || defaultTag}`}>
                {tag}
              </span>
            ))}
          </div>

          {/* Meta row */}
          <div className="flex flex-wrap gap-6 text-sm text-slate-500">
            {data.team && (
              <div className="flex items-center gap-2">
                <Users size={13} />
                <span>{data.team}</span>
              </div>
            )}
            {(data.year || data.period) && (
              <div className="flex items-center gap-2">
                <Calendar size={13} />
                <span>{data.year || data.period}</span>
              </div>
            )}
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-3 mt-8">
            {data.github && (
              <a
                href={data.github}
                target="_blank"
                rel="noopener noreferrer"
                id="detail-github-link"
                className="btn-secondary text-sm py-2 px-5"
              >
                <Github size={14} />
                GitHub
              </a>
            )}
            {data.liveDemo && (
              <a
                href={data.liveDemo}
                target="_blank"
                rel="noopener noreferrer"
                id="detail-demo-link"
                className="btn-primary text-sm py-2 px-5"
              >
                <ExternalLink size={14} />
                Live Demo
              </a>
            )}
          </div>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="max-w-4xl mx-auto px-6 py-16">

        {/* ── Problem Statement ── */}
        <Section label="Problem Statement">
          <div className="glass rounded-2xl p-6 sm:p-8 border border-rose-500/10">
            <p className="text-slate-300 leading-relaxed">{data.problem}</p>
          </div>
        </Section>

        {/* ── My Role ── */}
        <Section label="My Role & Ownership">
          <div className="glass rounded-2xl p-6 sm:p-8 border border-indigo-500/15">
            <p className="text-slate-300 leading-relaxed">{data.myRole}</p>
            {data.team && data.team.toLowerCase().includes('team') && !data.team.toLowerCase().includes('solo') && (
              <div className="mt-4 flex items-center gap-2 text-xs text-amber-400/80 border-t border-white/5 pt-4">
                <Users size={12} />
                <span>Team project — above describes Aman Ray's individual contribution specifically.</span>
              </div>
            )}
          </div>
        </Section>

        {/* ── Approach ── */}
        {data.approach && data.approach.length > 0 && (
          <Section label="Approach & Methodology">
            <div className="grid gap-4">
              {data.approach.map((step) => (
                <StepCard key={step.step} step={step} />
              ))}
            </div>
          </Section>
        )}

        {/* ── Key Decisions ── */}
        {data.keyDecisions && data.keyDecisions.length > 0 && (
          <Section label="Key Technical Decisions">
            <div className="grid sm:grid-cols-2 gap-4">
              {data.keyDecisions.map((d, i) => (
                <DecisionCard key={i} decision={d} />
              ))}
            </div>
          </Section>
        )}

        {/* ── Results ── */}
        {data.results && data.results.length > 0 && (
          <Section label="Results & Impact">
            <div className={`grid grid-cols-2 ${data.results.length >= 4 ? 'sm:grid-cols-4' : 'sm:grid-cols-3'} gap-4 mb-4`}>
              {data.results.map((r, i) => (
                <MetricCard key={i} metric={r.metric} label={r.label} highlight={r.highlight} />
              ))}
            </div>
            {data.resultsNote && (
              <p className="text-slate-500 text-xs mt-3 pl-1">{data.resultsNote}</p>
            )}
          </Section>
        )}

        {/* ── Challenges ── */}
        {data.challenges && (
          <Section label="Challenges & Learnings">
            <div className="glass rounded-2xl p-6 sm:p-8 border border-amber-500/10">
              <p className="text-slate-300 leading-relaxed">{data.challenges}</p>
            </div>
          </Section>
        )}

        {/* ── Bottom Navigation ── */}
        <div className="border-t border-white/5 pt-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            onClick={() => {
              navigate('/')
              setTimeout(() => {
                document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
              }, 300)
            }}
            id="detail-back-btn-bottom"
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group"
          >
            <ArrowLeft size={15} className="group-hover:-translate-x-1 transition-transform" />
            Back to {type === 'project' ? 'Projects' : 'Experience'}
          </button>
          <div className="flex gap-3">
            {data.github && (
              <a href={data.github} target="_blank" rel="noopener noreferrer" className="btn-secondary text-sm py-2">
                <Github size={13} />
                GitHub
              </a>
            )}
            {data.liveDemo && (
              <a href={data.liveDemo} target="_blank" rel="noopener noreferrer" className="btn-primary text-sm py-2">
                <ExternalLink size={13} />
                Live Demo
              </a>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
