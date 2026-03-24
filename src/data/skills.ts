export interface SkillGroup {
  label: string
  skills: { name: string; level: number }[]
}

export const skillGroups: SkillGroup[] = [
  {
    label: 'Mobile',
    skills: [
      { name: 'Flutter / Dart', level: 92 },
      { name: 'React Native / Expo', level: 78 },
      { name: 'Firebase (Auth, Firestore, Storage)', level: 88 },
    ],
  },
  {
    label: 'Frontend Web',
    skills: [
      { name: 'React / Next.js', level: 82 },
      { name: 'TypeScript', level: 80 },
      { name: 'Tailwind CSS', level: 85 },
    ],
  },
  {
    label: 'Backend',
    skills: [
      { name: 'Node.js / Express', level: 78 },
      { name: 'Python / FastAPI', level: 72 },
      { name: 'PHP / Laravel', level: 70 },
      { name: 'Django / DRF', level: 68 },
    ],
  },
  {
    label: 'Infra & DevOps',
    skills: [
      { name: 'Docker / Docker Compose', level: 75 },
      { name: 'Railway', level: 80 },
      { name: 'Firebase Hosting', level: 88 },
      { name: 'Git / GitHub', level: 85 },
    ],
  },
]
