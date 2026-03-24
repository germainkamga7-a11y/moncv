import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { skillGroups } from '../data/skills'

export default function Skills() {
  const { ref, inView } = useInView()

  return (
    <section id="skills" className="py-24 px-6 relative overflow-hidden" ref={ref}>
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-surface-2/0 via-surface-2/40 to-surface-2/0 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <p className="font-mono text-accent text-sm mb-3">02. Competences</p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-12">Stack technique</h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6">
          {skillGroups.map((group, gi) => (
            <motion.div
              key={group.label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: gi * 0.1 }}
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
                      <span className="text-sm text-white/70">{skill.name}</span>
                      <motion.span
                        className="text-xs font-mono text-accent/50"
                        initial={{ opacity: 0 }}
                        animate={inView ? { opacity: 1 } : {}}
                        transition={{ delay: gi * 0.1 + si * 0.05 + 0.4 }}
                      >
                        {skill.level}%
                      </motion.span>
                    </div>
                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{
                          background: `linear-gradient(90deg, #00e5a0, #22d3ee)`,
                        }}
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
                        transition={{
                          duration: 1,
                          delay: gi * 0.1 + si * 0.07 + 0.3,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
