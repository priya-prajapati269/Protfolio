import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Hero from './sections/Hero'
import About from './sections/About'
import Skills from './sections/Skills'
import Experience from './sections/Experience'
import Projects from './sections/Projects'
import Services from './sections/Services'
// import Process from './sections/Process'
import Contact from './sections/Contact'

export default function App() {
  return (
    <div className="min-h-screen bg-ink-950 text-white">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Services />
        {/* <Process /> */}
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
