export default function Footer() {
  return (
    <footer className="border-t border-accent-subtle py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="font-mono text-accent text-sm">GK.dev</span>
        <p className="text-xs text-white/20 text-center">
          © {new Date().getFullYear()} Germain Kamga · Bafoussam, Cameroun
        </p>
        <p className="text-xs text-white/20">
          Fait avec React + Vite
        </p>
      </div>
    </footer>
  )
}
