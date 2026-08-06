import { useNavigate } from 'react-router-dom'
import { useInView } from '../hooks/useInView'
import { ArrowRight, Building2 } from 'lucide-react'

// ── Project sub-items under the internship ──────────────────
const internshipProjects = [
  {
    id: 'exp-tts',
    number: '01',
    title: 'Fine-tuning Orpheus-3B for Hindi Text-to-Speech',
    bullets: [
      '3-stage LoRA fine-tuning pipeline: pronunciation alignment → speaker identity control → emotion & style injection',
      'Built HindiNormalizer preprocessing pipeline and a 500-sample automated WER/CER evaluation suite using Whisper-large-v3',
      'Reduced Mean WER by 66.6% (92.4% → 30.9%) and Mean CER by 82.4% from a completely unintelligible baseline',
    ],
    tags: ['PyTorch', 'Hugging Face', 'PEFT/LoRA', 'Whisper', 'W&B', 'SNAC'],
    accentColor: '#3b82f6',
    readMore: { type: 'project', slug: 'hindi-tts-orpheus' },
  },
  {
    id: 'exp-lof',
    number: '02',
    title: 'LOF Verification Framework for 41-Class Document Classifier',
    bullets: [
      'Built a 3-stage ML safety layer (Global Outlier Guard → Semantic Agreement Validation → Class-Conditional Density Check) over an existing DL classifier',
      'Framework operates on model embeddings without modifying the underlying DL model — routing uncertain predictions to a safe "Others" category',
      'Increased prediction precision and reliability for a production-grade document classification system',
    ],
    tags: ['Python', 'Scikit-learn', 'LOF', 'Embeddings', 'Anomaly Detection'],
    accentColor: '#8b5cf6',
    readMore: { type: 'project', slug: 'selective-verification-framework' },
  },
  {
    id: 'exp-edtech',
    number: '03',
    title: 'Edtech App — Experimentation & Deployment Improvements',
    bullets: [
      'Collaborated on experimentation, model optimization, and deployment-oriented improvements for an AI-powered Edtech application',
    ],
    tags: ['Python', 'ML Engineering'],
    accentColor: '#10b981',
    readMore: null,
  },
]

export default function Experience() {
  const [ref, inView] = useInView()
  const navigate = useNavigate()

  return (
    <section id="experience" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div ref={ref} className={`fade-init ${inView ? 'fade-in' : ''}`}>
          <p className="text-indigo-400 font-mono text-sm font-semibold mb-3 tracking-widest uppercase">
            Experience
          </p>
          <h2 className="section-heading text-white mb-16">Work Experience</h2>

          {/* ── Coriolis Card ── */}
          <div className="glass rounded-2xl overflow-hidden border border-white/5">
            {/* Header */}
            <div className="p-6 sm:p-8 border-b border-white/5"
              style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.08) 0%, transparent 100%)' }}
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.25), rgba(139,92,246,0.15))' }}
                  >
                    <Building2 size={20} className="text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">AI Intern</h3>
                    <p className="text-indigo-300 font-semibold">Coriolis Technologies</p>
                    <p className="text-slate-500 text-sm">Pune, India · May 2026 — July 2026</p>
                  </div>
                </div>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-mono bg-indigo-500/15 text-indigo-300 border border-indigo-500/25 h-fit">
                  3 months
                </span>
              </div>
            </div>

            {/* Projects inside internship */}
            <div className="divide-y divide-white/5">
              {internshipProjects.map((proj, idx) => (
                <div
                  key={proj.id}
                  id={proj.id}
                  className={`p-6 sm:p-8 fade-init ${inView ? 'fade-in' : ''} transition-colors hover:bg-white/[0.02]`}
                  style={{ transitionDelay: `${(idx + 1) * 120}ms` }}
                >
                  <div className="flex gap-4 items-start">
                    {/* Number */}
                    <span
                      className="text-xs font-mono font-bold flex-shrink-0 mt-1"
                      style={{ color: proj.accentColor }}
                    >
                      {proj.number}
                    </span>

                    <div className="flex-1 min-w-0">
                      {/* Title */}
                      <h4 className="font-bold text-white text-base mb-3 leading-tight">
                        {proj.title}
                      </h4>

                      {/* Bullets */}
                      <ul className="space-y-2 mb-4">
                        {proj.bullets.map((b, i) => (
                          <li key={i} className="flex gap-3 items-start text-slate-400 text-sm">
                            <span
                              className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                              style={{ background: proj.accentColor }}
                            />
                            {b}
                          </li>
                        ))}
                      </ul>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {proj.tags.map((tag) => (
                          <span
                            key={tag}
                            className="tag text-xs"
                            style={{
                              color: proj.accentColor,
                              background: `${proj.accentColor}12`,
                              borderColor: `${proj.accentColor}30`,
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Read More link — only for first two */}
                      {proj.readMore && (
                        <button
                          onClick={() => navigate(`/${proj.readMore.type}s/${proj.readMore.slug}`)}
                          id={`${proj.id}-readmore`}
                          className="flex items-center gap-1.5 text-sm font-semibold group transition-colors"
                          style={{ color: proj.accentColor }}
                        >
                          Read Full Case Study
                          <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Placement Committee ── */}
          <div className="mt-6 glass rounded-xl p-6 border border-white/5 hover:border-white/10 transition-all duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(139,92,246,0.15)' }}
                >
                  <Building2 size={16} className="text-violet-400" />
                </div>
                <div>
                  <h3 className="font-bold text-white">Placement Committee Member</h3>
                  <p className="text-slate-400 text-sm">Chennai Mathematical Institute · Chennai, India</p>
                </div>
              </div>
              <span className="text-xs font-mono text-slate-500 flex-shrink-0">Jun 2026 — Present</span>
            </div>
            <p className="text-slate-500 text-sm mt-4 pl-14">
              Coordinate with faculty, recruiters, and students for internship and placement activities.
              Assist in recruiter outreach, placement logistics, and industry communication.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
