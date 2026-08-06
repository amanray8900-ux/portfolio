import { useNavigate } from 'react-router-dom'
import { ArrowRight, ExternalLink } from 'lucide-react'

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
}

const defaultTagColor = 'bg-slate-500/15 text-slate-300 border-slate-500/25'

export default function ProjectCard({ project, index }) {
  const navigate = useNavigate()

  return (
    <div
      className={`glass rounded-2xl overflow-hidden card-glow transition-all duration-300 cursor-pointer flex flex-col ${project.accentClass}`}
      onClick={() => navigate(`/projects/${project.slug}`)}
      id={`project-card-${project.slug}`}
    >
      {/* Card Header */}
      <div className="p-6 pb-4 flex-1">
        {/* Meta row */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-mono text-slate-500">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span
            className="text-xs px-2 py-1 rounded-full font-mono"
            style={{
              color: project.accentColor,
              background: `${project.accentColor}18`,
              border: `1px solid ${project.accentColor}30`,
            }}
          >
            {project.year}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-white mb-1 leading-tight">
          {project.title}
        </h3>
        {project.subtitle && (
          <p className="text-slate-500 text-sm mb-3">{project.subtitle}</p>
        )}

        {/* Tagline */}
        <p className="text-slate-400 text-sm leading-relaxed mb-5 line-clamp-3">
          {project.tagline}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-2">
          {project.tags.slice(0, 4).map((tag) => (
            <span key={tag} className={`tag ${tagColorMap[tag] || defaultTagColor}`}>
              {tag}
            </span>
          ))}
          {project.tags.length > 4 && (
            <span className="tag bg-slate-500/10 text-slate-400 border-slate-500/20">
              +{project.tags.length - 4}
            </span>
          )}
        </div>
      </div>

      {/* Card Footer */}
      <div className="px-6 py-4 border-t border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {project.liveDemo && (
            <a
              href={project.liveDemo}
              target="_blank"
              rel="noopener noreferrer"
              id={`project-card-demo-${project.slug}`}
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              <ExternalLink size={11} />
              Live Demo
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              id={`project-card-github-${project.slug}`}
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 transition-colors"
            >
              GitHub
            </a>
          )}
        </div>
        <button
          id={`project-card-readmore-${project.slug}`}
          className="flex items-center gap-1.5 text-sm font-semibold group transition-colors"
          style={{ color: project.accentColor }}
        >
          Read More
          <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  )
}
