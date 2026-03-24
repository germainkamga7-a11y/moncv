import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { projects, type Project } from '../data/projects'
import { ExternalLink, Github, Smartphone, Globe, Cpu, Eye } from 'lucide-react'
import ProjectModal from './ProjectModal'

const categoryIcons = {
  mobile: Smartphone,
  web: Globe,
  iot: Cpu,
  ai: Globe,
}

const categoryLabels = {
  mobile: 'Mobile',
  web: 'Web',
  iot: 'IoT',
  ai: 'IA',
}

const statusDot: Record<string, string> = {
  production: 'bg-emerald-400',
  beta: 'bg-yellow-400',
  dev: 'bg-blue-400',
}

const filters = ['Tous', 'Mobile', 'Web', 'IoT']

export default function Projects() {
  const { ref, inView } = useInView()
  const [active, setActive] = useState('Tous')
  const [selected, setSelected] = useState<Project | null>(null)

  const filtered =
    active === 'Tous'
      ? projects
      : projects.filter((p) => categoryLabels[p.category] === active)

  return (
    <section id="projects" className="py-24 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <p className="font-mono text-accent text-sm mb-3">03. Projets</p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-3">En production</h2>
          <p className="text-white/40 text-sm mb-8">
            Cliquez sur un projet pour voir un aperçu en direct.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          className="flex flex-wrap gap-2 mb-10"
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.15 }}
        >
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200 ${
                active === f
                  ? 'bg-accent text-black border-accent'
                  : 'border-white/10 text-white/40 hover:border-accent/40 hover:text-white/80'
              }`}
            >
              {f}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={i}
                inView={inView}
                onOpen={() => setSelected(project)}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Modal */}
      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  )
}

function ProjectCard({
  project,
  index,
  inView,
  onOpen,
}: {
  project: Project
  index: number
  inView: boolean
  onOpen: () => void
}) {
  const Icon = categoryIcons[project.category]
  const [hovered, setHovered] = useState(false)

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group relative bg-surface-2 border border-accent-subtle rounded-2xl overflow-hidden cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onOpen}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
    >
      {/* Browser mockup preview */}
      <div className="relative h-52 bg-surface-3 overflow-hidden">
        {/* Browser bar */}
        <div className="absolute top-0 left-0 right-0 z-10 flex items-center gap-2 px-3 py-2 bg-surface/80 backdrop-blur-sm border-b border-white/5">
          <div className="flex gap-1">
            <div className="w-2 h-2 rounded-full bg-red-500/70" />
            <div className="w-2 h-2 rounded-full bg-yellow-500/70" />
            <div className="w-2 h-2 rounded-full bg-green-500/70" />
          </div>
          <div className="flex-1 bg-white/5 rounded px-2 py-0.5 text-[10px] text-white/20 font-mono truncate">
            {project.url ?? `${project.title.toLowerCase().replace(' ', '-')}.app`}
          </div>
        </div>

        {/* Iframe or placeholder */}
        {project.url && !project.iframeBlocked ? (
          <div className="absolute inset-0 pt-8">
            <iframe
              src={project.url}
              title={project.title}
              className={`w-full h-full border-0 transition-all duration-500 pointer-events-none ${
                hovered ? 'opacity-100' : 'opacity-80'
              }`}
              sandbox="allow-scripts allow-same-origin"
              loading="lazy"
            />
          </div>
        ) : (
          <MockupPreview project={project} />
        )}

        {/* Hover overlay */}
        <motion.div
          className="absolute inset-0 bg-black/60 flex items-center justify-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center gap-2 bg-accent text-black px-5 py-2.5 rounded-xl font-semibold text-sm shadow-lg">
            <Eye size={16} />
            Voir l&apos;aperçu
          </div>
        </motion.div>

        {/* Status badge */}
        <div className="absolute top-10 right-3 z-10 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 text-[10px] text-white/60">
          <span className={`w-1.5 h-1.5 rounded-full ${statusDot[project.status]} animate-pulse`} />
          {project.status}
        </div>
      </div>

      {/* Card body */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-base font-semibold group-hover:text-accent transition-colors duration-200">
            {project.title}
          </h3>
          <div className="flex items-center gap-1 text-white/30">
            <Icon size={14} />
            <span className="text-xs">{categoryLabels[project.category]}</span>
          </div>
        </div>

        <p className="text-sm text-white/50 mb-4 leading-relaxed line-clamp-2">
          {project.description}
        </p>

        {/* Stack tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.stack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 rounded-md bg-accent/5 border border-accent/10 text-[11px] text-accent/70 font-mono"
            >
              {tech}
            </span>
          ))}
          {project.stack.length > 4 && (
            <span className="px-2 py-0.5 rounded-md bg-white/5 text-[11px] text-white/30">
              +{project.stack.length - 4}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <button
            onClick={(e) => { e.stopPropagation(); onOpen() }}
            className="flex items-center gap-1.5 text-xs text-white/40 hover:text-accent transition-colors"
          >
            <Eye size={13} />
            Aperçu
          </button>
          <div className="flex gap-3">
            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-1 text-xs text-white/40 hover:text-accent transition-colors"
              >
                <ExternalLink size={13} />
                Live
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-1 text-xs text-white/40 hover:text-accent transition-colors"
              >
                <Github size={13} />
                Code
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Bottom glow on hover */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.article>
  )
}

function MockupPreview({ project }: { project: Project }) {
  const gradients: Record<string, string> = {
    'camermarket': 'from-emerald-950 to-surface-3',
    'atipikgroup': 'from-amber-950 to-surface-3',
    'camtel-dashboard': 'from-blue-950 to-surface-3',
  }
  const gradient = gradients[project.id] ?? 'from-surface to-surface-3'

  return (
    <div className={`absolute inset-0 pt-8 bg-gradient-to-br ${gradient} flex flex-col items-center justify-center gap-3 p-6`}>
      {/* Fake UI lines */}
      <div className="w-full space-y-2 opacity-30">
        <div className="h-6 bg-white/10 rounded-lg w-3/4 mx-auto" />
        <div className="grid grid-cols-3 gap-2 mt-4">
          {[1,2,3].map(n => (
            <div key={n} className="h-16 bg-white/5 rounded-lg border border-white/5" />
          ))}
        </div>
        <div className="h-4 bg-white/10 rounded w-1/2 mx-auto mt-2" />
        <div className="h-4 bg-white/5 rounded w-2/3 mx-auto" />
      </div>
      <span className="absolute text-3xl font-bold text-white/10 tracking-widest uppercase">
        {project.title}
      </span>
    </div>
  )
}
