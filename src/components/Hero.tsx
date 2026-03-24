import { motion } from 'framer-motion'
import { ArrowDown, Github, Mail, MapPin, Zap } from 'lucide-react'
import { useEffect, useState } from 'react'

const roles = [
  'Flutter Developer',
  'Full-Stack Engineer',
  'Fondateur EcoTech',
  'Mobile Architect',
]

function useTypewriter(words: string[], speed = 80, pause = 1800) {
  const [index, setIndex] = useState(0)
  const [sub, setSub] = useState(0)
  const [deleting, setDeleting] = useState(false)
  const [text, setText] = useState('')

  useEffect(() => {
    const current = words[index]
    const timeout = setTimeout(() => {
      if (!deleting) {
        setText(current.slice(0, sub + 1))
        setSub(sub + 1)
        if (sub + 1 === current.length) {
          setTimeout(() => setDeleting(true), pause)
        }
      } else {
        setText(current.slice(0, sub - 1))
        setSub(sub - 1)
        if (sub - 1 === 0) {
          setDeleting(false)
          setIndex((index + 1) % words.length)
        }
      }
    }, deleting ? speed / 2 : speed)
    return () => clearTimeout(timeout)
  }, [sub, deleting, index, words, speed, pause])

  return text
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}
const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

export default function Hero() {
  const typed = useTypewriter(roles)

  return (
    <section className="min-h-screen flex flex-col justify-center px-6 pt-16 relative overflow-hidden">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(0,229,160,.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,229,160,.5) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />
      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full relative z-10">
        <motion.div variants={container} initial="hidden" animate="show">
          {/* Badge */}
          <motion.div variants={item} className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-accent/20 bg-accent/5">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-accent text-xs font-mono">Disponible pour des projets</span>
              <Zap size={12} className="text-accent" />
            </div>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={item}
            className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight mb-4 leading-[1.05]"
          >
            Germain
            <br />
            <span className="text-gradient">Kamga</span>
          </motion.h1>

          {/* Typewriter */}
          <motion.div variants={item} className="flex items-center gap-3 mb-4 h-9">
            <span className="text-xl sm:text-2xl text-white/60 font-light font-mono">
              {typed}
              <motion.span
                className="inline-block w-0.5 h-6 bg-accent ml-0.5 align-middle"
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
              />
            </span>
          </motion.div>

          {/* Location */}
          <motion.div variants={item} className="flex items-center gap-2 text-white/25 text-sm mb-10">
            <MapPin size={13} />
            <span>Bafoussam, Cameroun · EcoTech</span>
          </motion.div>

          {/* CTAs */}
          <motion.div variants={item} className="flex flex-wrap gap-4 mb-14">
            <motion.a
              href="#projects"
              className="px-7 py-3.5 bg-accent text-black font-bold rounded-xl text-sm"
              whileHover={{ scale: 1.04, boxShadow: '0 0 30px rgba(0,229,160,0.35)' }}
              whileTap={{ scale: 0.97 }}
            >
              Voir mes projets
            </motion.a>
            <motion.a
              href="#contact"
              className="px-7 py-3.5 border border-white/10 text-white/60 rounded-xl text-sm"
              whileHover={{ scale: 1.04, borderColor: 'rgba(0,229,160,0.4)', color: 'rgba(0,229,160,1)' }}
              whileTap={{ scale: 0.97 }}
            >
              Me contacter
            </motion.a>
          </motion.div>

          {/* Social */}
          <motion.div variants={item} className="flex items-center gap-6">
            <motion.a
              href="https://github.com/germainkamga7-a11y"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white/30 hover:text-accent transition-colors text-sm"
              whileHover={{ x: 2 }}
            >
              <Github size={15} />
              <span className="font-mono">germainkamga7-a11y</span>
            </motion.a>
            <motion.a
              href="mailto:germainkamga7@gmail.com"
              className="flex items-center gap-2 text-white/30 hover:text-accent transition-colors text-sm"
              whileHover={{ x: 2 }}
            >
              <Mail size={15} />
              <span>germainkamga7@gmail.com</span>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <motion.div
          className="w-5 h-8 rounded-full border border-white/15 flex justify-center pt-1.5"
          animate={{ borderColor: ['rgba(255,255,255,0.15)', 'rgba(0,229,160,0.4)', 'rgba(255,255,255,0.15)'] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <motion.div
            className="w-1 h-1.5 rounded-full bg-accent"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          />
        </motion.div>
        <span className="text-[10px] text-white/20 font-mono tracking-widest uppercase">scroll</span>
        <ArrowDown size={12} className="text-white/15" />
      </motion.div>
    </section>
  )
}
