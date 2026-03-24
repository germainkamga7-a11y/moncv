import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { Rocket, Code2, Users } from 'lucide-react'

const stats = [
  { value: '4+', label: 'Apps en production' },
  { value: '50k\u20ac', label: 'Valorisation EcoTech' },
  { value: '3+', label: "Ans d'experience" },
  { value: '\u{1F1E8}\u{1F1F2}', label: 'Made in Cameroun' },
]

const highlights = [
  {
    icon: Rocket,
    title: 'Entrepreneur',
    desc: "Fondateur d'EcoTech, startup camerounaise specialisee en Cloud et IA.",
  },
  {
    icon: Code2,
    title: 'Developpeur Mobile',
    desc: "Flutter / Dart en specialite principale \u2014 apps iOS, Android et Web a partir d'une seule codebase.",
  },
  {
    icon: Users,
    title: 'Full-Stack',
    desc: "De l'API (FastAPI, Node.js, Laravel) au frontend React/Next.js en passant par Firebase.",
  },
]

export default function About() {
  const { ref, inView } = useInView()

  return (
    <section id="about" className="py-24 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <p className="font-mono text-accent text-sm mb-3">01. A propos</p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-12">Qui suis-je ?</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-4 text-white/60 leading-relaxed"
          >
            <p>
              Je m&apos;appelle{' '}
              <span className="text-white font-medium">Germain Kamga</span>, fondateur de la startup{' '}
              <span className="text-accent font-medium">EcoTech</span>, basee a{' '}
              <span className="text-white/80">Bafoussam, Cameroun</span>. Nous developpons des
              solutions digitales Cloud &amp; IA pour les entreprises et particuliers africains.
            </p>
            <p>
              Je construis des applications mobiles avec{' '}
              <span className="text-white/80">Flutter</span> et des plateformes web completes avec{' '}
              <span className="text-white/80">React, Next.js, FastAPI et Node.js</span>. Tous mes
              projets visent un impact concret sur le quotidien des utilisateurs africains.
            </p>
            <p>
              Passionne par l&apos;IA generative, j&apos;integre des agents IA dans mes produits
              &mdash; comme{' '}
              <span className="text-white/80">eSoft IA</span>, mon agent WhatsApp Business propulse
              par Gemini.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-2 gap-4"
          >
            {stats.map((s) => (
              <div
                key={s.label}
                className="bg-surface-2 border border-accent-subtle rounded-2xl p-6 flex flex-col gap-1"
              >
                <span className="text-3xl font-bold text-accent">{s.value}</span>
                <span className="text-sm text-white/40">{s.label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Highlights */}
        <div className="grid sm:grid-cols-3 gap-6">
          {highlights.map((h, i) => (
            <motion.div
              key={h.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.1 * (i + 3) }}
              className="bg-surface-2 border border-accent-subtle rounded-2xl p-6 hover:border-accent/30 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                <h.icon size={20} className="text-accent" />
              </div>
              <h3 className="font-semibold mb-2">{h.title}</h3>
              <p className="text-sm text-white/50">{h.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
