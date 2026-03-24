import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Download } from 'lucide-react'

const navLinks = [
  { href: '#about', label: 'A propos' },
  { href: '#skills', label: 'Competences' },
  { href: '#projects', label: 'Projets' },
  { href: '#contact', label: 'Contact' },
]

interface Props {
  onOpenCV: () => void
}

export default function Header({ onOpenCV }: Props) {
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
            <motion.button
              onClick={onOpenCV}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-accent/40 text-accent text-sm font-medium hover:bg-accent hover:text-black transition-all duration-200"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Download size={14} />
              Telecharger CV
            </motion.button>
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
            <button
              onClick={() => { setMenuOpen(false); onOpenCV() }}
              className="flex items-center gap-2 text-accent font-medium"
            >
              <Download size={14} />
              Telecharger CV
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
