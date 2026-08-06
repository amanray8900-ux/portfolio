import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import About from '../components/About'
import Education from '../components/Education'
import AcademicResearch from '../components/AcademicResearch'
import Experience from '../components/Experience'
import ProjectsGrid from '../components/ProjectsGrid'
import Achievements from '../components/Achievements'
import Contact from '../components/Contact'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-bg">
      <Navbar />
      <main>
        <Hero />

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent mx-6" />

        <About />
        <div className="h-px bg-gradient-to-r from-transparent via-white/5 to-transparent mx-6" />

        <Education />
        <div className="h-px bg-gradient-to-r from-transparent via-white/5 to-transparent mx-6" />

        <Experience />
        <div className="h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent mx-6" />

        <AcademicResearch />
        <div className="h-px bg-gradient-to-r from-transparent via-white/5 to-transparent mx-6" />

        <ProjectsGrid />
        <div className="h-px bg-gradient-to-r from-transparent via-white/5 to-transparent mx-6" />

        <Achievements />
        <div className="h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent mx-6" />

        <Contact />
      </main>
      <Footer />
    </div>
  )
}
