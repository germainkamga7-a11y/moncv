import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { Mail, Github, MessageCircle, Send } from 'lucide-react'

const links = [
  {
    icon: Mail,
    label: 'Email',
    value: 'germainkamga7@gmail.com',
    href: 'mailto:germainkamga7@gmail.com',
  },
  {
    icon: Github,
    label: 'GitHub',
    value: 'germainkamga7-a11y',
    href: 'https://github.com/germainkamga7-a11y',
  },
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    value: '+237 690 705 881',
    href: 'https://wa.me/237690705881',
  },
]

export default function Contact() {
  const { ref, inView } = useInView()

  return (
    <section id="contact" className="py-24 px-6 bg-surface-2/30" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <p className="font-mono text-accent text-sm mb-3">04. Contact</p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Travaillons ensemble</h2>
          <p className="text-white/50 max-w-xl mb-12">
            Vous avez un projet mobile, web ou IA ? Je suis disponible pour des collaborations,
            missions freelance ou partenariats.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact links */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 bg-surface-2 border border-accent-subtle rounded-xl hover:border-accent/30 hover:glow-sm transition-all duration-200 group"
              >
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <link.icon size={18} className="text-accent" />
                </div>
                <div>
                  <p className="text-xs text-white/30 mb-0.5">{link.label}</p>
                  <p className="text-sm text-white/80 group-hover:text-accent transition-colors font-mono">
                    {link.value}
                  </p>
                </div>
              </a>
            ))}

            <a
              href="/cv-germain-kamga.pdf"
              download
              className="flex items-center gap-3 px-6 py-3 bg-accent text-black font-semibold rounded-xl hover:bg-accent-dim transition-colors w-full justify-center mt-4"
            >
              <Send size={16} />
              Télécharger mon CV (PDF)
            </a>
          </motion.div>

          {/* Quote card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <div className="bg-surface-2 border border-accent-subtle rounded-2xl p-8">
              <p className="text-5xl text-accent/20 font-serif leading-none mb-4">"</p>
              <p className="text-white/70 text-lg leading-relaxed italic">
                Construire des solutions digitales accessibles et impactantes pour l'Afrique — c'est
                la mission d'EcoTech.
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold text-sm">
                  G
                </div>
                <div>
                  <p className="text-sm font-medium">Germain Kamga</p>
                  <p className="text-xs text-white/30">Fondateur, EcoTech</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
