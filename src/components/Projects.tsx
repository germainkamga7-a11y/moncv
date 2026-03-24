import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { projects } from '../data/projects'
import { ExternalLink, Github, Smartphone, Globe, Cpu, Bot } from 'lucide-react'

const categoryIcons = {
  mobile: Smartphone,
  web: Globe,
  iot: Cpu,
  ai: Bot,
}

const categoryLabels = {
  mobile: 'Mobile',
  web: 'Web',
  iot: 'IoT',
  ai: 'IA',
}

const statusColors = {
  production: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  beta: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  dev: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
}

const statusLabels = {
  production: '● Production',
  beta: '● Beta',
  dev: '○ En dev',
}

const filters = ['Tous', 'Mobile', 'Web', 'IoT', 'IA'] as const

export default function Projects() {
  const { ref, inView } = useInView()
  const [active, setActive] = useState<string>('Tous')

  const filtered =
    active === 'Tous'
      ? projects
      : projects.filter((p) => categoryLabels[p.category] === active)

  return (
    <section id="projects" className="py-24 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <p className="font-mono text-accent text-sm mb-3">03. Projets</p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-8">En production</h2>
        </motion.div>

        {/* Filters */}
        <motion.div
          className="flex flex-wrap gap-2 mb-10"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200 ${
                active === f
                  ? 'bg-accent text-black border-accent'
                  : 'border-white/10 text-white/50 hover:border-accent/30 hover:text-white/80'
              }`}
            >
              {f}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => {
              const Icon = categoryIcons[project.category]
              return (
                <motion.article
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="group bg-surface-2 border border-accent-subtle rounded-2xl overflow-hidden hover:border-accent/30 hover:glow transition-all duration-300"
                >
                  {/* Screenshot placeholder */}
                  <div className="h-44 bg-surface-3 relative overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500"
                      onError={(e) => {
                        const target = e.currentTarget
                        target.style.display = 'none'
                        const parent = target.parentElement
                        if (parent) {
                          parent.innerHTML = `<div class="w-full h-full flex items-center justify-center"><div class="text-white/10 text-6xl font-bold">${project.title[0]}</div></div>`
                        }
                      }}
                    />
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-surface-2 via-transparent to-transparent" />
                    {/* Category badge */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-sm border border-white/10">
                      <Icon size={12} className="text-accent" />
                      <span className="text-xs text-white/70">{categoryLabels[project.category]}</span>
                    </div>
                    {/* Status badge */}
                    <div className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-medium border ${statusColors[project.status]}`}>
                      {statusLabels[project.status]}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-accent transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-white/50 mb-4 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Highlights */}
                    <ul className="space-y-1 mb-5">
                      {project.highlights.map((h) => (
                        <li key={h} className="flex items-start gap-2 text-xs text-white/40">
                          <span className="text-accent mt-0.5">▸</span>
                          {h}
                        </li>
                      ))}
                    </ul>

                    {/* Stack tags */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {project.stack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded-md bg-accent/5 border border-accent/10 text-xs text-accent/70 font-mono"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Links */}
                    <div className="flex gap-3">
                      {project.url && (
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-xs text-white/50 hover:text-accent transition-colors"
                        >
                          <ExternalLink size={13} />
                          Voir le projet
                        </a>
                      )}
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-xs text-white/50 hover:text-accent transition-colors"
                        >
                          <Github size={13} />
                          Code source
                        </a>
                      )}
                    </div>
                  </div>
                </motion.article>
              )
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
