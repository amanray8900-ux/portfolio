import { useInView } from '../hooks/useInView'
import ProjectCard from './ProjectCard'
import { projects } from '../data/projects'

export default function ProjectsGrid() {
  const [ref, inView] = useInView()

  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div ref={ref} className={`fade-init ${inView ? 'fade-in' : ''}`}>
          <p className="text-indigo-400 font-mono text-sm font-semibold mb-3 tracking-widest uppercase">
            Projects
          </p>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-16">
            <h2 className="section-heading text-white">What I've Built</h2>
            <p className="text-slate-500 text-sm max-w-xs">
              Click any card for the full technical deep-dive.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, idx) => (
              <div
                key={project.slug}
                className={`fade-init ${inView ? 'fade-in' : ''}`}
                style={{ transitionDelay: `${idx * 80}ms` }}
              >
                <ProjectCard project={project} index={idx} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
