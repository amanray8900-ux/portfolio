import { useInView } from '../hooks/useInView'

const skills = {
  'Deep Learning': ['PyTorch', 'Hugging Face', 'Transformers', 'PEFT/LoRA', 'CUDA'],
  'Speech AI': ['Whisper', 'Librosa', 'TorchAudio', 'SNAC', 'WER/CER'],
  'Machine Learning': ['Scikit-learn', 'XGBoost', 'Numpy', 'Pandas'],
  'Tools & MLOps': ['W&B', 'Git', 'Docker', 'Streamlit', 'Kaggle'],
  'Languages': ['Python', 'SQL', 'C', 'R'],
}

const tagColorMap = {
  'Deep Learning': 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30',
  'Speech AI': 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30',
  'Machine Learning': 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
  'Tools & MLOps': 'bg-violet-500/15 text-violet-300 border-violet-500/30',
  'Languages': 'bg-amber-500/15 text-amber-300 border-amber-500/30',
}

export default function About() {
  const [ref, inView] = useInView()

  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div
          ref={ref}
          className={`fade-init ${inView ? 'fade-in' : ''}`}
        >
          {/* Section label */}
          <p className="text-indigo-400 font-mono text-sm font-semibold mb-3 tracking-widest uppercase">
            About
          </p>
          <h2 className="section-heading text-white mb-16">
            Who I Am
          </h2>

          <div className="grid lg:grid-cols-5 gap-12 items-start">
            {/* Bio */}
            <div className="lg:col-span-3 space-y-5">
              <p className="text-slate-300 text-lg leading-relaxed">
                I'm an M.Sc. Data Science student at{' '}
                <span className="text-white font-semibold">Chennai Mathematical Institute (CMI)</span>
                {' '}with a B.Sc. (Hons.) Mathematics from Banaras Hindu University. Unlike many who entered AI through software engineering, I approach machine learning from a{' '}
                <span className="text-indigo-300 font-medium">mathematical perspective</span>.
              </p>
              <p className="text-slate-400 leading-relaxed">
                My interest isn't limited to applying models — I enjoy understanding{' '}
                <em>why algorithms work</em>, how architectures are designed, and where improvements can be made.
                I consistently find myself reading papers, reverse-engineering model architectures,
                and designing experiments to validate ideas rather than just running existing code.
              </p>
              <p className="text-slate-400 leading-relaxed">
                During my AI internship at{' '}
                <span className="text-white font-semibold">Coriolis Technologies</span>, I worked on
                production-oriented Speech AI — fine-tuning a 3B-parameter LLM for Hindi TTS and building
                an ML verification layer for document classification reliability. I'm particularly drawn to
                problems where language, reasoning, and audio intersect.
              </p>

              {/* Currently card */}
              <div className="glass rounded-xl p-5 border border-indigo-500/15 mt-6">
                <p className="text-xs font-mono text-indigo-400 uppercase tracking-widest mb-3">Currently</p>
                <ul className="space-y-2 text-slate-300 text-sm">
                  <li className="flex gap-2">
                    <span className="text-indigo-400 mt-0.5">→</span>
                    M.Sc. Data Science @ CMI (2025–Present)
                  </li>
                  <li className="flex gap-2">
                    <span className="text-indigo-400 mt-0.5">→</span>
                    Exploring RLHF, edge-scale TTS, and LLM infrastructure
                  </li>
                  <li className="flex gap-2">
                    <span className="text-emerald-400 mt-0.5">→</span>
                    <span className="text-emerald-300">Open to ML Engineering / Research Engineering roles</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Skills */}
            <div className="lg:col-span-2 space-y-5">
              {Object.entries(skills).map(([category, items]) => (
                <div key={category}>
                  <p className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-2">
                    {category}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {items.map((skill) => (
                      <span
                        key={skill}
                        className={`tag ${tagColorMap[category]}`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
