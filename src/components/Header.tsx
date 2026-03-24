import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { href: '#about', label: 'À propos' },
  { href: '#skills', label: 'Compétences' },
  { href: '#projects', label: 'Projets' },
  { href: '#contact', label: 'Contact' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-surface/90 backdrop-blur-md border-b border-accent-subtle' : ''
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="font-mono text-accent font-medium tracking-tight">
          GK<span className="text-white/40">.</span>dev
        </a>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm text-white/60 hover:text-accent transition-colors duration-200"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="/cv-germain-kamga.pdf"
              download
              className="px-4 py-2 rounded-lg border border-accent/40 text-accent text-sm hover:bg-accent hover:text-black transition-all duration-200 font-medium"
            >
              Télécharger CV
            </a>
          </li>
        </ul>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-white/60 hover:text-accent"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-surface-2 border-b border-accent-subtle px-6 py-4 flex flex-col gap-4"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-white/70 hover:text-accent transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="/cv-germain-kamga.pdf"
              download
              className="text-accent font-medium"
              onClick={() => setMenuOpen(false)}
            >
              Télécharger CV
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
