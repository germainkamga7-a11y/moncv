import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ExternalLink, RefreshCw } from 'lucide-react'
import type { Project } from '../data/projects'

interface Props {
  project: Project | null
  onClose: () => void
}

export default function ProjectModal({ project, onClose }: Props) {
  useEffect(() => {
    if (!project) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [project, onClose])

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-5xl bg-surface-2 border border-accent/20 rounded-2xl overflow-hidden shadow-2xl"
            initial={{ scale: 0.92, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Browser chrome */}
            <div className="flex items-center gap-3 px-4 py-3 bg-surface-3 border-b border-white/5">
              {/* Traffic lights */}
              <div className="flex gap-1.5">
                <button onClick={onClose} className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              {/* URL bar */}
              <div className="flex-1 flex items-center gap-2 bg-surface/60 rounded-md px-3 py-1 text-xs text-white/30 font-mono border border-white/5">
                <span className="text-accent/50">🔒</span>
                <span className="truncate">{project.url ?? `localhost — ${project.title}`}</span>
              </div>
              {/* Actions */}
              <div className="flex items-center gap-2">
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-md text-white/30 hover:text-accent hover:bg-accent/10 transition-all"
                    title="Ouvrir dans un nouvel onglet"
                  >
                    <ExternalLink size={14} />
                  </a>
                )}
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-md text-white/30 hover:text-white hover:bg-white/10 transition-all"
                >
                  <X size={14} />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="h-[65vh] bg-surface-3 relative">
              {project.url && !project.iframeBlocked ? (
                <iframe
                  src={project.url}
                  title={project.title}
                  className="w-full h-full border-0"
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                />
              ) : (
                <ProjectPlaceholder project={project} />
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-5 py-3 border-t border-white/5">
              <div>
                <p className="text-sm font-semibold">{project.title}</p>
                <p className="text-xs text-white/40">{project.description}</p>
              </div>
              {project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-accent text-black text-sm font-semibold rounded-xl hover:bg-accent-dim transition-colors"
                >
                  <ExternalLink size={14} />
                  Ouvrir le projet
                </a>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function ProjectPlaceholder({ project }: { project: Project }) {
  const colors: Record<string, string> = {
    'etech-tv': '#1a1a2e',
    'camermarket': '#0d1b0d',
    'atipikgroup': '#1a1205',
    'camtel-dashboard': '#0d1a2e',
  }
  const bg = colors[project.id] ?? '#111'

  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center gap-6 p-12"
      style={{ background: `linear-gradient(135deg, ${bg}, #111)` }}
    >
      <div className="w-20 h-20 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center text-4xl font-bold text-accent">
        {project.title[0]}
      </div>
      <div className="text-center">
        <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
        <p className="text-white/50 max-w-md text-sm leading-relaxed">{project.longDescription}</p>
      </div>
      <div className="flex flex-wrap gap-2 justify-center">
        {project.stack.map((s) => (
          <span key={s} className="px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-mono">
            {s}
          </span>
        ))}
      </div>
      <div className="flex items-center gap-2 text-white/30 text-xs">
        <RefreshCw size={12} />
        <span>
          {project.url
            ? "Apercu bloque par le site (X-Frame-Options)"
            : "Apercu non disponible — projet local"}
        </span>
      </div>
      {project.url && (
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-5 py-2.5 bg-accent/10 border border-accent/30 text-accent rounded-xl text-sm hover:bg-accent hover:text-black transition-all"
        >
          <ExternalLink size={15} />
          Ouvrir {project.title} dans un nouvel onglet
        </a>
      )}
    </div>
  )
}
