import { useInView } from '../hooks/useInView'
import { GraduationCap } from 'lucide-react'

const education = [
  {
    id: 'cmi-msc',
    degree: 'M.Sc. Data Science',
    institution: 'Chennai Mathematical Institute',
    period: '2025 — Present',
    cgpa: '8.75 / 10.00',
    coursework: [
      'Mathematical Methods', 'Probability & Statistics', 'Data Mining & Machine Learning',
      'Linear Algebra & Applications', 'Distributed Computing & Big Data',
      'Algorithm Design', 'RDBMS & SQL', 'Data Visualization',
    ],
    accent: '#6366f1',
  },
  {
    id: 'bhu-bsc',
    degree: 'B.Sc. (Hons.) Mathematics',
    institution: 'Banaras Hindu University',
    period: '2021 — 2024',
    cgpa: '7.73 / 10.00',
    coursework: [
      'Real Analysis', 'Linear Algebra', 'Abstract Algebra',
      'Complex Analysis', 'Numerical Analysis', 'Operations Research',
      'Number Theory', 'Programming in C',
    ],
    accent: '#8b5cf6',
  },
]

export default function Education() {
  const [ref, inView] = useInView()

  return (
    <section id="education" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div ref={ref} className={`fade-init ${inView ? 'fade-in' : ''}`}>
          <p className="text-indigo-400 font-mono text-sm font-semibold mb-3 tracking-widest uppercase">
            Education
          </p>
          <h2 className="section-heading text-white mb-16">Academic Background</h2>

          <div className="relative pl-10">
            {/* Vertical line */}
            <div
              className="absolute left-4 top-4 bottom-0 w-px"
              style={{ background: 'linear-gradient(to bottom, #6366f1, transparent)' }}
            />

            <div className="space-y-12">
              {education.map((edu, idx) => (
                <div
                  key={edu.id}
                  className={`relative fade-init ${inView ? 'fade-in' : ''}`}
                  style={{ transitionDelay: `${idx * 150}ms` }}
                >
                  {/* Timeline dot */}
                  <div
                    className="absolute -left-[26px] top-1 w-5 h-5 rounded-full border-2 flex items-center justify-center"
                    style={{ borderColor: edu.accent, background: '#0a0a0f' }}
                  >
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ background: edu.accent }}
                    />
                  </div>

                  {/* Card */}
                  <div
                    className="glass rounded-2xl p-6 sm:p-8 card-glow transition-all duration-300"
                    style={{ borderTop: `2px solid ${edu.accent}40` }}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-5">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <GraduationCap size={18} className="text-indigo-400" />
                          <h3 className="text-lg font-bold text-white">{edu.degree}</h3>
                        </div>
                        <p className="text-slate-400 font-medium">{edu.institution}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-sm text-slate-500 font-mono">{edu.period}</p>
                        <p className="text-base font-bold mt-1" style={{ color: edu.accent }}>
                          CGPA: {edu.cgpa}
                        </p>
                      </div>
                    </div>

                    <div>
                      <p className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-3">
                        Relevant Coursework
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {edu.coursework.map((course) => (
                          <span
                            key={course}
                            className="text-xs px-3 py-1 rounded-full bg-white/5 text-slate-300 border border-white/8"
                          >
                            {course}
                          </span>
                        ))}
                      </div>
                    </div>
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
