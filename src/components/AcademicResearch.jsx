import { useInView } from '../hooks/useInView'
import { BookOpen, ExternalLink } from 'lucide-react'

export default function AcademicResearch() {
  const [ref, inView] = useInView()

  return (
    <section id="research" className="py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div ref={ref} className={`fade-init ${inView ? 'fade-in' : ''}`}>
          <p className="text-indigo-400 font-mono text-sm font-semibold mb-3 tracking-widest uppercase">
            Academic Research
          </p>
          <h2 className="section-heading text-white mb-10">Research Work</h2>

          {/* Research card */}
          <div className="glass rounded-2xl p-6 sm:p-8 card-glow border-t-2 border-indigo-500/40 transition-all duration-300 max-w-3xl">
            <div className="flex items-start gap-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 mt-1"
                style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.2), rgba(139,92,246,0.1))' }}
              >
                <BookOpen size={20} className="text-indigo-400" />
              </div>

              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-white leading-tight">
                      Technical Review: Normalized Cuts and Image Segmentation
                    </h3>
                    <p className="text-slate-400 text-sm mt-1">
                      Graduate Coursework — Chennai Mathematical Institute · 2025
                    </p>
                  </div>
                  <a
                    href="/ncut-report.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    id="research-report-link"
                    className="flex items-center gap-2 text-xs text-indigo-300 hover:text-indigo-200 border border-indigo-500/30 hover:border-indigo-400/60 rounded-lg px-3 py-2 transition-all whitespace-nowrap"
                  >
                    <ExternalLink size={12} />
                    View Report
                  </a>
                </div>

                <p className="text-slate-400 text-sm leading-relaxed mb-5">
                  Conducted an in-depth study of the seminal IEEE TPAMI paper by Jianbo Shi and Jitendra Malik.
                  Authored a 15-page technical report covering spectral graph theory, the normalized cut criterion,
                  graph Laplacians, and generalized eigenvalue formulations. Implemented the Normalized Cut algorithm
                  in Python and presented the work as part of graduate coursework.
                </p>

                <div className="flex flex-wrap gap-2">
                  {['Spectral Graph Theory', 'Graph Laplacians', 'Eigenvalue Problems', 'Image Segmentation', 'Python'].map((tag) => (
                    <span
                      key={tag}
                      className="tag bg-indigo-500/10 text-indigo-300 border-indigo-500/25"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
