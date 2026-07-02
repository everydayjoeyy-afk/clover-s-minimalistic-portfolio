import { useState } from 'react'
import project1Img from '../assets/project1.jpg'
import project2Img from '../assets/project2.jpg'
import lab1Img from '../assets/lab1.jpg'
import lab2Img from '../assets/lab2.jpg'

type Tab = 'all' | 'projects' | 'labs' | 'exploration'

type Project = {
  id: number
  title: string
  description: string
  category: string
  gradient?: string
  image?: string
  type: 'project' | 'lab'
  url?: string
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
]

const TABS: { key: Tab; label: string }[] = [
  { key: 'all',         label: 'All' },
  { key: 'projects',    label: 'Projects' },
  { key: 'labs',        label: 'Labs' },
  { key: 'exploration', label: 'Exploration' },
]

export default function WorkPage() {
  const [active, setActive] = useState<Tab>('all')

  const filtered = active === 'all'
    ? PROJECTS
    : active === 'exploration'
    ? []
    : PROJECTS.filter(p => p.type === (active === 'projects' ? 'project' : 'lab'))

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
        <div className="mb-8 flex gap-2">
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

        {/* Empty state for Exploration */}
        {active === 'exploration' && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="font-display text-[22px] font-semibold text-text">Nothing here yet.</p>
            <p className="mt-2 text-[14px] text-muted">Working on some things. Check back soon.</p>
          </div>
        )}

        {/* Cards grid */}
        {active !== 'exploration' && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {filtered.map((project) => (
            <a
              key={project.id}
              href={project.url ?? '#'}
              target={project.url ? '_blank' : undefined}
              rel="noopener noreferrer"
              className="group flex flex-col overflow-hidden rounded-[16px] border border-line bg-surface-raised transition-colors duration-300 hover:border-text/25"
            >
              {/* Visual area — zoom on hover */}
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

                {/* Title with sliding underline */}
                <h2 className="relative w-fit font-display text-[18px] font-semibold leading-tight text-text">
                  {project.title}
                  <span className="absolute bottom-0 left-0 h-[1.5px] w-full origin-left scale-x-0 bg-text transition-transform duration-300 ease-out group-hover:scale-x-100" />
                </h2>

                <p className="text-[13px] leading-[1.6] text-muted">
                  {project.description}
                </p>

                {/* Arrow — always visible on mobile/tablet, slides in on desktop hover */}
                <div className="mt-1 flex items-center gap-1.5 transition-all duration-300 ease-out md:-translate-x-2 md:opacity-0 md:group-hover:translate-x-0 md:group-hover:opacity-100">
                  <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5 text-text">
                    <path d="M3 13L13 3M13 3H6M13 3V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="text-[12px] font-medium text-text">View project</span>
                </div>
              </div>
            </a>
          ))}
        </div>
        )}

      </div>
    </main>
  )
}
