import { useInView } from '../hooks/useInView'
import { Mail, Linkedin, Github, MessageSquare } from 'lucide-react'

export default function Contact() {
  const [ref, inView] = useInView()

  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div ref={ref} className={`fade-init ${inView ? 'fade-in' : ''}`}>
          {/* Centered content */}
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-indigo-400 font-mono text-sm font-semibold mb-3 tracking-widest uppercase">
              Contact
            </p>
            <h2 className="section-heading text-white mb-6">Let's Talk</h2>
            <p className="text-slate-400 text-lg leading-relaxed mb-12">
              I'm currently open to ML Engineering, NLP Engineering, Speech AI, and Research Engineering roles.
              Whether you have an opportunity, a collaboration idea, or just want to talk about AI systems —
              reach out.
            </p>

            {/* Primary CTA — Email */}
            <a
              href="mailto:amanray8900@gmail.com"
              id="contact-email-btn"
              className="btn-primary text-lg px-10 py-4 mx-auto mb-4 inline-flex"
              style={{ fontSize: '1rem' }}
            >
              <Mail size={18} />
              amanray8900@gmail.com
            </a>

            <p className="text-slate-600 text-sm mb-10">or connect on LinkedIn</p>

            {/* Social links row */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="https://www.linkedin.com/in/aman-ray-5a6090294/"
                target="_blank"
                rel="noopener noreferrer"
                id="contact-linkedin"
                className="flex items-center gap-3 px-6 py-3 glass rounded-xl text-slate-300 hover:text-blue-400 hover:border-blue-400/30 transition-all duration-200 border border-white/5 font-medium"
              >
                <Linkedin size={17} />
                LinkedIn
              </a>
              <a
                href="https://github.com/amanray8900-ux"
                target="_blank"
                rel="noopener noreferrer"
                id="contact-github"
                className="flex items-center gap-3 px-6 py-3 glass rounded-xl text-slate-300 hover:text-white hover:border-white/20 transition-all duration-200 border border-white/5 font-medium"
              >
                <Github size={17} />
                GitHub
              </a>
              <a
                href="https://huggingface.co/Aman-ray"
                target="_blank"
                rel="noopener noreferrer"
                id="contact-huggingface"
                className="flex items-center gap-3 px-6 py-3 glass rounded-xl text-slate-300 hover:text-yellow-400 hover:border-yellow-400/30 transition-all duration-200 border border-white/5 font-medium"
              >
                🤗 HuggingFace
              </a>
              <a
                href="https://www.kaggle.com/amanray8900"
                target="_blank"
                rel="noopener noreferrer"
                id="contact-kaggle"
                className="flex items-center gap-3 px-6 py-3 glass rounded-xl text-slate-300 hover:text-cyan-400 hover:border-cyan-400/30 transition-all duration-200 border border-white/5 font-medium"
              >
                Kaggle
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
