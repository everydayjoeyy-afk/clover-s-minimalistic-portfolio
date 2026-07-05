import { useEffect, useState } from 'react'
import project1Img from '../assets/project1.jpg'
import project2Img from '../assets/project2.jpg'
import lab1Img from '../assets/lab1.jpg'
import lab2Img from '../assets/lab2.jpg'
import exploration1Img from '../assets/Exploration 1.jpg'

type Tab = 'all' | 'projects' | 'labs' | 'exploration'

type ModalContent = {
  body: string[]
  stack: string[]
  liveUrl?: string
}

type Project = {
  id: number
  title: string
  description: string
  category: string
  gradient?: string
  image?: string
  type: 'project' | 'lab' | 'exploration'
  url?: string
  modal?: ModalContent
}

const PROJECTS: Project[] = [
  {
    id: 1,
    title: 'QwikHub',
    description: 'A wallet-based app for buying mobile data bundles and digital subscriptions in Ghana.',
    category: 'Product Dev',
    image: project1Img,
    type: 'project',
  },
  {
    id: 2,
    title: 'QCS Redesign',
    description: 'Redesigning the UI for a school website — cleaner layout, better hierarchy, and a more modern feel.',
    category: 'UI/UX Design',
    image: project2Img,
    type: 'project',
  },
  {
    id: 3,
    title: 'Nanceats',
    description: 'The application was designed to allow users to browse food options, add items...',
    category: 'UI/UX Design',
    image: lab1Img,
    type: 'lab',
  },
  {
    id: 4,
    title: 'Casa',
    description: 'An accessible mobile chat app designed to remove barriers found in traditional messaging...',
    category: 'UI/UX Design',
    image: lab2Img,
    type: 'lab',
  },
  {
    id: 5,
    title: 'Abide',
    description: 'A personal discipline dashboard to anchor your morning, track goals, and log your day.',
    category: 'Product Dev',
    image: exploration1Img,
    type: 'exploration',
    modal: {
      body: [
        'I built this because my mornings were wasted on my phone and my evenings disappeared into nothing. No structure. Goals I kept meaning to start. Habits that lasted three days.',
        'So I built the app I actually needed.',
        'Abide is a personal discipline dashboard — one place to anchor your morning with scripture or reflection, track what you are genuinely working toward, log your day in two minutes each evening, and get coaching from an AI that has read your actual data, not a generic prompt.',
        'The goals system was the most interesting design problem. Progress means different things for different goals. Finishing a certification is not the same as building a daily habit, which is not the same as working through a defined set of milestones. So Abide has three distinct goal types, each tracking progress honestly in its own way.',
        'The app is faith-aware. Christians get daily Bible study with a reading plan and prayer prompts. Muslims get a Quran ayah with Arabic, transliteration, and translation, plus du\'a prompts. Secular users get daily wisdom from thinkers and philosophers. Same structure, different soul.',
        'The honest version: I built this to change my own life. Then I made it work for anyone.',
      ],
      stack: ['React', 'TypeScript', 'Tailwind CSS', 'shadcn/ui', 'Supabase', 'Framer Motion', 'Groq AI', 'Vercel'],
      liveUrl: 'https://abide-0.vercel.app',
    },
  },
]

const TABS: { key: Tab; label: string }[] = [
  { key: 'all',         label: 'All' },
  { key: 'projects',    label: 'Projects' },
  { key: 'labs',        label: 'Labs' },
  { key: 'exploration', label: 'Exploration' },
]

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const m = project.modal!

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-black/60 p-4 pt-[100px] sm:items-center sm:pt-4"
      onClick={onClose}
    >
      <div
        className="relative flex w-full max-w-[600px] flex-col overflow-hidden rounded-[20px] border border-line bg-surface-raised"
        style={{ maxHeight: '540px' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Scrollable content */}
        <div className="overflow-y-auto p-6">
          {/* Header row */}
          <div className="mb-5 flex items-start justify-between gap-4">
            <div>
              <span className="mb-2 inline-block rounded-full border border-line px-2.5 py-0.5 text-[11px] font-medium text-muted">
                {project.category}
              </span>
              <h2 className="font-display text-[28px] font-semibold leading-tight text-text">
                {project.title}
              </h2>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              {m.liveUrl && (
                <a
                  href={m.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-[10px] bg-gradient-to-b from-cta-from to-cta-to px-4 py-2 text-[13px] font-semibold text-cta-text transition-transform active:scale-95"
                >
                  View live ↗
                </a>
              )}
              <button
                type="button"
                onClick={onClose}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-line bg-surface text-muted transition-opacity hover:opacity-70"
              >
                <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4">
                  <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {m.body.map((para, i) => (
              <p key={i} className="text-[14px] leading-[1.8] text-muted">
                {para}
              </p>
            ))}
          </div>

          {/* Stack */}
          <div className="mt-6">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-text">Stack</p>
            <div className="flex flex-wrap gap-2">
              {m.stack.map(tech => (
                <span
                  key={tech}
                  className="rounded-full border border-line bg-surface px-3 py-1 text-[12px] font-medium text-muted"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function WorkPage() {
  const [active, setActive]           = useState<Tab>('all')
  const [openProject, setOpenProject] = useState<Project | null>(null)

  const filtered = active === 'all'
    ? PROJECTS
    : active === 'exploration'
    ? PROJECTS.filter(p => p.type === 'exploration')
    : PROJECTS.filter(p => p.type === active.slice(0, -1) as 'project' | 'lab')

  return (
    <main className="flex flex-1 flex-col items-center px-4 pt-8 pb-16">
      <div className="w-full max-w-[742px]">

        {/* Header */}
        <div className="mb-8">
          <p className="mb-3 text-[13px] font-semibold uppercase tracking-widest text-text">
            Work
          </p>
          <p className="max-w-[480px] text-[15px] leading-[1.7] text-muted">
            I've tried many things. These are the ones I'm proud of — and a few labs I worked on while figuring UX out.
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-8 flex flex-wrap gap-2">
          {TABS.map(tab => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActive(tab.key)}
              className={`rounded-[10px] border px-4 py-1.5 text-[13px] font-semibold transition-all duration-200 ${
                active === tab.key
                  ? 'border-text/20 bg-gradient-to-b from-cta-from to-cta-to text-cta-text'
                  : 'border-line bg-surface-raised text-muted hover:text-text'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {filtered.map((project) => {
            const isModal = !!project.modal

            const cardInner = (
              <>
                {/* Visual area */}
                <div className="relative h-[200px] w-full overflow-hidden">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                    />
                  ) : (
                    <div
                      className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-110"
                      style={{ background: project.gradient }}
                    />
                  )}
                </div>

                {/* Info */}
                <div className="flex flex-1 flex-col gap-2 p-5">
                  <span className="w-fit rounded-full border border-line px-2.5 py-0.5 text-[11px] font-medium text-muted">
                    {project.category}
                  </span>
                  <h2 className="relative w-fit font-display text-[18px] font-semibold leading-tight text-text">
                    {project.title}
                    <span className="absolute bottom-0 left-0 h-[1.5px] w-full origin-left scale-x-0 bg-text transition-transform duration-300 ease-out group-hover:scale-x-100" />
                  </h2>
                  <p className="text-[13px] leading-[1.6] text-muted">{project.description}</p>
                  <div className="mt-1 flex items-center gap-1.5 transition-all duration-300 ease-out md:-translate-x-2 md:opacity-0 md:group-hover:translate-x-0 md:group-hover:opacity-100">
                    <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5 text-text">
                      <path d="M3 13L13 3M13 3H6M13 3V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="text-[12px] font-medium text-text">View project</span>
                  </div>
                </div>
              </>
            )

            return isModal ? (
              <button
                key={project.id}
                type="button"
                onClick={() => setOpenProject(project)}
                className="group flex flex-col overflow-hidden rounded-[16px] border border-line bg-surface-raised text-left transition-colors duration-300 hover:border-text/25"
              >
                {cardInner}
              </button>
            ) : (
              <a
                key={project.id}
                href={project.url ?? '#'}
                target={project.url ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="group flex flex-col overflow-hidden rounded-[16px] border border-line bg-surface-raised transition-colors duration-300 hover:border-text/25"
              >
                {cardInner}
              </a>
            )
          })}
        </div>

      </div>

      {openProject && (
        <ProjectModal project={openProject} onClose={() => setOpenProject(null)} />
      )}
    </main>
  )
}
