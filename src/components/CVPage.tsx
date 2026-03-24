import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Download, Loader2 } from 'lucide-react'

interface Props {
  onClose: () => void
}

export default function CVPage({ onClose }: Props) {
  const cvRef = useRef<HTMLDivElement>(null)
  const [generating, setGenerating] = useState(false)

  async function handleDownload() {
    if (!cvRef.current) return
    setGenerating(true)
    try {
      const html2pdf = (await import('html2pdf.js')).default
      await html2pdf()
        .set({
          margin: 0,
          filename: 'CV-Germain-Kamga.pdf',
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2, useCORS: true, letterRendering: true },
          jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        })
        .from(cvRef.current)
        .save()
    } finally {
      setGenerating(false)
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[200] flex flex-col bg-black/90 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Toolbar */}
        <div className="flex items-center justify-between px-6 py-3 bg-surface-2 border-b border-white/5 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-sm font-mono text-white/60">CV-Germain-Kamga.pdf</span>
          </div>
          <div className="flex items-center gap-3">
            <motion.button
              onClick={handleDownload}
              disabled={generating}
              className="flex items-center gap-2 px-5 py-2 bg-accent text-black font-bold rounded-xl text-sm disabled:opacity-60"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              {generating ? (
                <Loader2 size={15} className="animate-spin" />
              ) : (
                <Download size={15} />
              )}
              {generating ? 'Génération...' : 'Télécharger PDF'}
            </motion.button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-all"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* CV Preview — scrollable */}
        <div className="flex-1 overflow-auto py-8 px-4 flex justify-center">
          {/* A4 sheet */}
          <div
            ref={cvRef}
            className="w-[210mm] min-h-[297mm] bg-white text-gray-900 shadow-2xl"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {/* ─── HEADER ─── */}
            <div style={{ background: '#0d0d0d', padding: '36px 40px 28px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '24px' }}>
                {/* Avatar placeholder */}
                <div style={{
                  width: 80, height: 80, borderRadius: '50%',
                  background: 'linear-gradient(135deg, #00e5a0, #22d3ee)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 28, fontWeight: 700, color: '#000', flexShrink: 0,
                }}>
                  GK
                </div>
                <div style={{ flex: 1 }}>
                  <h1 style={{ fontSize: 28, fontWeight: 700, color: '#fff', margin: 0, letterSpacing: '-0.5px' }}>
                    Germain Kamga
                  </h1>
                  <p style={{ fontSize: 14, color: '#00e5a0', margin: '4px 0 12px', fontWeight: 500 }}>
                    Fondateur EcoTech &nbsp;·&nbsp; Flutter &amp; Full-Stack Developer
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                    {[
                      { icon: '📍', text: 'Bafoussam, Cameroun' },
                      { icon: '✉️', text: 'germainkamga7@gmail.com' },
                      { icon: '📞', text: '+237 690 705 881' },
                      { icon: '🐙', text: 'github.com/germainkamga7-a11y' },
                    ].map((c) => (
                      <span key={c.text} style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)', display: 'flex', alignItems: 'center', gap: 4 }}>
                        <span>{c.icon}</span>{c.text}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* ─── BODY ─── */}
            <div style={{ padding: '32px 40px', display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 28 }}>

              {/* ── LEFT COLUMN ── */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

                {/* Profil */}
                <Section title="Profil">
                  <p style={{ fontSize: 12, color: '#444', lineHeight: 1.7 }}>
                    Entrepreneur tech camerounais, fondateur d&apos;EcoTech (valorisée ~50 000 €).
                    Spécialisé en développement mobile Flutter et plateformes web full-stack.
                    Passionné par l&apos;IA générative et les solutions digitales africaines.
                  </p>
                </Section>

                {/* Compétences */}
                <Section title="Compétences">
                  {[
                    { cat: 'Mobile', items: ['Flutter / Dart', 'React Native / Expo'] },
                    { cat: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'Tailwind'] },
                    { cat: 'Backend', items: ['Node.js', 'FastAPI', 'Laravel', 'Django'] },
                    { cat: 'Cloud & Infra', items: ['Firebase', 'Docker', 'Railway', 'Git'] },
                  ].map((g) => (
                    <div key={g.cat} style={{ marginBottom: 10 }}>
                      <p style={{ fontSize: 10, fontWeight: 600, color: '#00b87a', textTransform: 'uppercase', letterSpacing: 1, margin: '0 0 4px' }}>
                        {g.cat}
                      </p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                        {g.items.map((s) => (
                          <span key={s} style={{
                            fontSize: 10, padding: '2px 7px', borderRadius: 4,
                            background: '#f0fdf8', border: '1px solid #a7f3d0', color: '#065f46',
                          }}>
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </Section>

                {/* Langues */}
                <Section title="Langues">
                  {[
                    { lang: 'Français', level: 'Natif', pct: 100 },
                    { lang: 'Anglais', level: 'Professionnel', pct: 75 },
                  ].map((l) => (
                    <div key={l.lang} style={{ marginBottom: 8 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                        <span style={{ fontSize: 12, fontWeight: 500 }}>{l.lang}</span>
                        <span style={{ fontSize: 10, color: '#888' }}>{l.level}</span>
                      </div>
                      <div style={{ height: 4, background: '#f0f0f0', borderRadius: 99 }}>
                        <div style={{ height: '100%', width: `${l.pct}%`, background: 'linear-gradient(90deg, #00e5a0, #22d3ee)', borderRadius: 99 }} />
                      </div>
                    </div>
                  ))}
                </Section>

                {/* Formation */}
                <Section title="Formation">
                  <div style={{ fontSize: 12, color: '#333' }}>
                    <p style={{ fontWeight: 600, margin: 0 }}>Informatique &amp; Développement</p>
                    <p style={{ color: '#666', margin: '2px 0 0', fontSize: 11 }}>Autodidacte &amp; formation continue</p>
                    <p style={{ color: '#999', margin: '1px 0 0', fontSize: 10 }}>2021 — présent</p>
                  </div>
                </Section>
              </div>

              {/* ── RIGHT COLUMN ── */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

                {/* Expérience / Projets */}
                <Section title="Projets en production">
                  {[
                    {
                      name: 'eTech TV',
                      role: 'Développeur Flutter · Firebase',
                      period: '2025 — 2026',
                      url: 'etech-tv-afrique-2026.web.app',
                      desc: "Application mobile de streaming TV pour l'Afrique. Flutter multi-plateforme (Android, iOS, Web), Firebase Auth & Firestore, déployée sur Firebase Hosting.",
                      tags: ['Flutter', 'Firebase', 'Dart'],
                    },
                    {
                      name: 'CamerMarket',
                      role: 'Développeur Flutter · Firebase',
                      period: '2025 — 2026',
                      url: 'softmarket-55f22.web.app',
                      desc: 'Marketplace e-commerce africaine avec paiement Mobile Money (MoMo/Orange Money), chat temps réel, OCR scan CNI et système de reviews.',
                      tags: ['Flutter', 'Firebase', 'Google Maps'],
                    },
                    {
                      name: 'AtipikGroup',
                      role: 'Développeur PHP Full-Stack',
                      period: '2025',
                      url: 'atipikgroup.net',
                      desc: "Plateforme web corporative PHP MVC avec gestion des membres, cotisations, chat interne et forum. Hébergée sur cPanel.",
                      tags: ['PHP', 'MySQL', 'JavaScript'],
                    },
                    {
                      name: 'Camtel Box Manager',
                      role: 'Développeur Full-Stack · IoT',
                      period: '2026',
                      desc: 'Dashboard web pour piloter la box GPON Camtel Huawei. FastAPI scrape le routeur, Next.js affiche les données réseau en temps réel (auto-refresh 30s).',
                      tags: ['FastAPI', 'Next.js', 'Docker'],
                    },
                    {
                      name: 'eSoft IA (WhatsApp Agent)',
                      role: 'Développeur Node.js · IA',
                      period: '2026',
                      desc: "Agent WhatsApp Business IA pour la communauté EcoTech. Gemini 2.5 Flash, catalogue de services interactifs, broadcast, dashboard dark theme. Déployé sur Railway.",
                      tags: ['Node.js', 'Gemini AI', 'Railway'],
                    },
                  ].map((p) => (
                    <div key={p.name} style={{ marginBottom: 16, paddingBottom: 16, borderBottom: '1px solid #f0f0f0' }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 2 }}>
                        <span style={{ fontSize: 13, fontWeight: 700, color: '#111' }}>{p.name}</span>
                        <span style={{ fontSize: 10, color: '#999', whiteSpace: 'nowrap', marginLeft: 8 }}>{p.period}</span>
                      </div>
                      <p style={{ fontSize: 11, color: '#00b87a', margin: '0 0 4px', fontWeight: 500 }}>{p.role}</p>
                      {p.url && (
                        <p style={{ fontSize: 10, color: '#6366f1', margin: '0 0 4px' }}>🔗 {p.url}</p>
                      )}
                      <p style={{ fontSize: 11, color: '#555', lineHeight: 1.6, margin: '0 0 6px' }}>{p.desc}</p>
                      <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                        {p.tags.map((t) => (
                          <span key={t} style={{
                            fontSize: 10, padding: '1px 6px', borderRadius: 3,
                            background: '#f0fdf8', border: '1px solid #a7f3d0', color: '#065f46',
                          }}>
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </Section>

              </div>
            </div>

            {/* ─── FOOTER ─── */}
            <div style={{ borderTop: '1px solid #f0f0f0', padding: '12px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 10, color: '#bbb' }}>Germain Kamga — germainkamga7@gmail.com</span>
              <span style={{ fontSize: 10, color: '#00b87a' }}>germainkamga7-a11y.github.io/moncv</span>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
        <span style={{
          fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1.5,
          color: '#111', paddingBottom: 4, borderBottom: '2px solid #00e5a0',
        }}>
          {title}
        </span>
      </div>
      {children}
    </div>
  )
}
