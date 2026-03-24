import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { skillGroups } from '../data/skills'

export default function Skills() {
  const { ref, inView } = useInView()

  return (
    <section id="skills" className="py-24 px-6 bg-surface-2/30" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <p className="font-mono text-accent text-sm mb-3">02. Compétences</p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-12">Stack technique</h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-8">
          {skillGroups.map((group, gi) => (
            <motion.div
              key={group.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: gi * 0.1 }}
              className="bg-surface-2 border border-accent-subtle rounded-2xl p-6"
            >
              <h3 className="text-xs font-mono text-accent/70 uppercase tracking-widest mb-5">
                {group.label}
              </h3>
              <div className="space-y-4">
                {group.skills.map((skill, si) => (
                  <div key={skill.name}>
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-sm text-white/80">{skill.name}</span>
                      <span className="text-xs font-mono text-accent/50">{skill.level}%</span>
                    </div>
                    <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-accent to-cyan-400 rounded-full"
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
                        transition={{ duration: 0.8, delay: gi * 0.1 + si * 0.05 + 0.2 }}
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
