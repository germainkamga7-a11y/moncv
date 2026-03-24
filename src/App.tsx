import { useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import CVPage from './components/CVPage'

export default function App() {
  const [showCV, setShowCV] = useState(false)

  return (
    <div className="min-h-screen">
      <Header onOpenCV={() => setShowCV(true)} />
      <main>
        <Hero onOpenCV={() => setShowCV(true)} />
        <About />
        <Skills />
        <Projects />
        <Contact onOpenCV={() => setShowCV(true)} />
      </main>
      <Footer />
      {showCV && <CVPage onClose={() => setShowCV(false)} />}
    </div>
  )
}
