import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { skillGroups } from '../data/skills'

// Shimmer skeleton d'une barre de compétence
function SkeletonSkill() {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between">
        <div className="h-3 w-32 rounded bg-white/5 overflow-hidden relative">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/8 to-transparent"
            animate={{ x: ['-100%', '200%'] }}
            transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
          />
        </div>
        <div className="h-3 w-8 rounded bg-white/5 overflow-hidden relative">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/8 to-transparent"
            animate={{ x: ['-100%', '200%'] }}
            transition={{ repeat: Infinity, duration: 1.2, ease: 'linear', delay: 0.2 }}
          />
        </div>
      </div>
      <div className="h-1.5 rounded-full bg-white/5 overflow-hidden relative">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/15 to-transparent"
          animate={{ x: ['-100%', '200%'] }}
          transition={{ repeat: Infinity, duration: 1.4, ease: 'linear', delay: 0.1 }}
        />
      </div>
    </div>
  )
}

function SkeletonCard({ delay = 0 }: { delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="bg-surface-2 border border-accent-subtle rounded-2xl p-6"
    >
      {/* Label skeleton */}
      <div className="flex items-center gap-2 mb-5">
        <div className="w-4 h-px bg-accent/20" />
        <div className="h-2.5 w-20 rounded bg-white/5 overflow-hidden relative">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/20 to-transparent"
            animate={{ x: ['-100%', '200%'] }}
            transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
          />
        </div>
      </div>
      <div className="space-y-4">
        {[1, 2, 3].map((n) => (
          <SkeletonSkill key={n} />
        ))}
      </div>
    </motion.div>
  )
}

export default function Skills() {
  const { ref, inView } = useInView()
  const [loaded, setLoaded] = useState(false)

  // Quand la section arrive en vue, simuler un chargement de 1.2s
  useEffect(() => {
    if (inView && !loaded) {
      const t = setTimeout(() => setLoaded(true), 1200)
      return () => clearTimeout(t)
    }
  }, [inView, loaded])

  return (
    <section id="skills" className="py-24 px-6 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-surface-2/0 via-surface-2/40 to-surface-2/0 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <p className="font-mono text-accent text-sm mb-3">02. Competences</p>
          <div className="flex items-center gap-4">
            <h2 className="text-3xl sm:text-4xl font-bold">Stack technique</h2>
            <AnimatePresence>
              {inView && !loaded && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20"
                >
                  <motion.div
                    className="w-1.5 h-1.5 rounded-full bg-accent"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                  />
                  <span className="text-xs font-mono text-accent/70">chargement...</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 gap-6">
          <AnimatePresence mode="wait">
            {/* SKELETON */}
            {inView && !loaded && (
              <>
                {[0, 1, 2, 3].map((i) => (
                  <SkeletonCard key={`sk-${i}`} delay={i * 0.08} />
                ))}
              </>
            )}

            {/* REAL CONTENT */}
            {loaded && (
              <>
                {skillGroups.map((group, gi) => (
                  <motion.div
                    key={group.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: gi * 0.1, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={{ y: -2, transition: { duration: 0.2 } }}
                    className="bg-surface-2 border border-accent-subtle rounded-2xl p-6 hover:border-accent/25 transition-colors duration-300"
                  >
                    <h3 className="text-xs font-mono text-accent/60 uppercase tracking-widest mb-5 flex items-center gap-2">
                      <span className="w-4 h-px bg-accent/30" />
                      {group.label}
                    </h3>
                    <div className="space-y-4">
                      {group.skills.map((skill, si) => (
                        <div key={skill.name}>
                          <div className="flex justify-between items-center mb-1.5">
                            <motion.span
                              className="text-sm text-white/70"
                              initial={{ opacity: 0, x: -8 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: gi * 0.1 + si * 0.07 + 0.1 }}
                            >
                              {skill.name}
                            </motion.span>
                            <motion.span
                              className="text-xs font-mono text-accent/50"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: gi * 0.1 + si * 0.07 + 0.6 }}
                            >
                              {skill.level}%
                            </motion.span>
                          </div>
                          {/* Bar track */}
                          <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                            <motion.div
                              className="h-full rounded-full relative overflow-hidden"
                              style={{ background: 'linear-gradient(90deg, #00e5a0, #22d3ee)' }}
                              initial={{ width: 0 }}
                              animate={{ width: `${skill.level}%` }}
                              transition={{
                                duration: 1.1,
                                delay: gi * 0.1 + si * 0.09 + 0.2,
                                ease: [0.22, 1, 0.36, 1],
                              }}
                            >
                              {/* Shimmer sur la barre remplie */}
                              <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                                animate={{ x: ['-100%', '200%'] }}
                                transition={{
                                  delay: gi * 0.1 + si * 0.09 + 1.2,
                                  duration: 0.6,
                                  ease: 'easeOut',
                                }}
                              />
                            </motion.div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
