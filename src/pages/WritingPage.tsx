import { Link } from 'react-router-dom'
import { POSTS } from '../data/posts'

export default function WritingPage() {
  return (
    <main className="flex flex-1 flex-col items-center px-4 pt-8 pb-16">
      <div className="w-full max-w-[742px]">

        <div className="mb-10">
          <p className="mb-3 text-[13px] font-semibold uppercase tracking-widest text-text">
            Writing
          </p>
          <p className="max-w-[480px] text-[15px] leading-[1.7] text-muted">
            Thoughts, opinions, and the occasional acknowledgment. Infrequent but intentional.
          </p>
        </div>

        <div className="flex flex-col">
          {POSTS.map((post, i) => (
            <Link
              key={post.slug}
              to={`/writing/${post.slug}`}
              className={`group flex items-baseline justify-between gap-8 py-[14px] transition-opacity duration-200 hover:opacity-50 ${
                i === 0 ? 'border-t border-line-soft' : ''
              } border-b border-line-soft`}
            >
              <span className="font-display text-[19px] font-semibold leading-tight text-text transition-transform duration-250 ease-out group-hover:translate-x-1.5">
                {post.title}
              </span>
              <span className="shrink-0 text-[11px] font-medium uppercase tracking-widest text-muted">
                {post.date}
              </span>
            </Link>
          ))}
        </div>

      </div>
    </main>
  )
}
