export interface Project {
  id: string
  title: string
  description: string
  longDescription: string
  stack: string[]
  category: 'mobile' | 'web' | 'iot' | 'ai'
  status: 'production' | 'beta' | 'dev'
  url?: string
  github?: string
  image: string
  highlights: string[]
}

export const projects: Project[] = [
  {
    id: 'etech-tv',
    title: 'eTech TV',
    description: "Application mobile de streaming & TV en direct pour l'Afrique",
    longDescription:
      "Plateforme de streaming video developpee en Flutter, deployee sur Firebase Hosting. Accessible sur Android, iOS et Web.",
    stack: ['Flutter', 'Dart', 'Firebase', 'Firestore', 'Firebase Auth'],
    category: 'mobile',
    status: 'production',
    url: 'https://etech-tv-afrique-2026.web.app',
    image: '/screenshots/etech-tv.png',
    highlights: [
      'Streaming video multi-plateforme',
      'Auth Firebase (email + Google)',
      'Interface UI/UX moderne',
      'Deploye sur Firebase Hosting',
    ],
  },
  {
    id: 'camermarket',
    title: 'CamerMarket',
    description: 'Marketplace e-commerce africaine avec paiement Mobile Money',
    longDescription:
      "Application Flutter de marketplace multi-vendeurs avec Firebase. Paiements MTN MoMo, Orange Money, chat integre et geolocalisation.",
    stack: ['Flutter', 'Dart', 'Firebase', 'Firestore', 'Google Maps', 'Provider'],
    category: 'mobile',
    status: 'production',
    image: '/screenshots/camermarket.png',
    highlights: [
      'Marketplace multi-vendeurs',
      'Paiement MoMo & Orange Money',
      'Chat temps reel',
      'OCR scan CNI (google_mlkit)',
    ],
  },
  {
    id: 'atipikgroup',
    title: 'AtipikGroup',
    description: 'Plateforme web corporate pour AtipikGroup',
    longDescription:
      "Application web PHP MVC sur mesure avec gestion des membres, forum, cotisations et chat. Hebergee sur serveur cPanel.",
    stack: ['PHP', 'MySQL', 'PHPMailer', 'HTML/CSS', 'JavaScript'],
    category: 'web',
    status: 'production',
    url: 'https://atipikgroup.net',
    image: '/screenshots/atipikgroup.png',
    highlights: [
      'Architecture MVC PHP custom',
      'Gestion membres & cotisations',
      'Chat interne',
      'Deploye sur cPanel',
    ],
  },
  {
    id: 'camtel-dashboard',
    title: 'Camtel Box Manager',
    description: 'Dashboard web pour piloter la box GPON Camtel Huawei HG8245Q2',
    longDescription:
      "Interface web full-stack pour gerer sa box internet Camtel. Backend FastAPI scrape l'interface du routeur, frontend Next.js affiche les donnees en temps reel.",
    stack: ['FastAPI', 'Python', 'Next.js', 'TypeScript', 'Docker'],
    category: 'iot',
    status: 'production',
    image: '/screenshots/camtel-dashboard.png',
    highlights: [
      'Connexion automatique au routeur',
      'Infos reseau, WiFi, appareils connectes',
      'Auto-refresh 30s',
      'Dockerise (compose)',
    ],
  },
]
