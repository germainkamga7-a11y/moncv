import { motion } from 'framer-motion'
import { ArrowDown, Github, Mail, MapPin } from 'lucide-react'

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center px-6 pt-16">
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-accent/20 bg-accent/5 mb-8">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse-slow" />
            <span className="text-accent text-xs font-mono">Disponible pour des projets</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight">
            Germain{' '}
            <span className="text-gradient">Kamga</span>
          </h1>

          <p className="text-xl sm:text-2xl text-white/50 font-light mb-4 max-w-2xl">
            Fondateur d'<span className="text-white/80 font-medium">EcoTech</span> ·{' '}
            Développeur Flutter &amp; Full-Stack
          </p>

          <div className="flex items-center gap-2 text-white/30 text-sm mb-10">
            <MapPin size={14} />
            <span>Bafoussam, Cameroun</span>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-4 mb-16">
            <a
              href="#projects"
              className="px-6 py-3 bg-accent text-black font-semibold rounded-xl hover:bg-accent-dim transition-colors duration-200"
            >
              Voir mes projets
            </a>
            <a
              href="#contact"
              className="px-6 py-3 border border-white/10 text-white/70 rounded-xl hover:border-accent/40 hover:text-accent transition-all duration-200"
            >
              Me contacter
            </a>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-6">
            <a
              href="https://github.com/germainkamga7-a11y"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white/40 hover:text-accent transition-colors text-sm"
            >
              <Github size={16} />
              <span className="font-mono">germainkamga7-a11y</span>
            </a>
            <a
              href="mailto:germainkamga7@gmail.com"
              className="flex items-center gap-2 text-white/40 hover:text-accent transition-colors text-sm"
            >
              <Mail size={16} />
              <span>germainkamga7@gmail.com</span>
            </a>
          </div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/20 flex flex-col items-center gap-2"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <span className="text-xs font-mono">scroll</span>
          <ArrowDown size={14} />
        </motion.div>
      </div>
    </section>
  )
}
