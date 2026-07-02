import { Link, useParams, Navigate } from 'react-router-dom'
import { POSTS } from '../data/posts'

export default function WritingPostPage() {
  const { slug } = useParams()
  const post = POSTS.find(p => p.slug === slug)

  if (!post) return <Navigate to="/writing" replace />

  return (
    <main className="flex flex-1 flex-col items-center px-4 pt-8 pb-16">
      <div className="w-full max-w-[742px]">

        {/* Back */}
        <Link
          to="/writing"
          className="mb-10 inline-flex items-center gap-1.5 text-[13px] font-medium text-muted transition-opacity hover:opacity-70"
        >
          <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5">
            <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Writing
        </Link>

        {/* Header */}
        <div className="mb-10 border-b border-line-soft pb-8">
          <h1 className="font-display text-[40px] font-semibold leading-[1.1] tracking-[-1px] text-text">
            {post.title}
          </h1>
          <p className="mt-3 text-[13px] font-medium text-muted">{post.date}</p>
        </div>

        {/* Content */}
        <div className="space-y-6">
          {post.blocks.map((block, i) => {
            if (block.type === 'p') {
              return (
                <p key={i} className="text-[15px] leading-[1.8] text-muted">
                  {block.text}
                </p>
              )
            }

            if (block.type === 'callout') {
              return (
                <blockquote
                  key={i}
                  className="border-l-[3px] border-text/30 pl-5 py-1"
                >
                  <p className="font-display text-[22px] font-semibold leading-[1.3] tracking-[-0.5px] text-text">
                    {block.text}
                  </p>
                </blockquote>
              )
            }

            if (block.type === 'h2') {
              return (
                <p key={i} className="pt-4 text-[11px] font-semibold uppercase tracking-widest text-text">
                  {block.text}
                </p>
              )
            }

            if (block.type === 'credit') {
              return (
                <div key={i} className="flex flex-col gap-1 border-b border-line-soft pb-5 last:border-0 last:pb-0 sm:flex-row sm:gap-6">
                  <div className="w-full shrink-0 sm:w-[160px]">
                    {block.url ? (
                      <a
                        href={block.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[14px] font-semibold text-text underline underline-offset-[3px] decoration-text/40 hover:decoration-text transition-all"
                      >
                        {block.name}
                      </a>
                    ) : (
                      <p className="text-[14px] font-semibold text-text">{block.name}</p>
                    )}
                  </div>
                  <p className="text-[13px] leading-[1.7] text-muted">{block.note}</p>
                </div>
              )
            }

            return null
          })}
        </div>

      </div>
    </main>
  )
}
