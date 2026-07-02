const socials = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/joel-fofoh-b705a3384',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: 'GitHub',
    href: 'https://github.com/everydayjoeyy-afk',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
      </svg>
    ),
  },
  {
    label: 'Behance',
    href: 'https://www.behance.net/cloverrr',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M7.5 11.5c.97 0 1.75-.78 1.75-1.75S8.47 8 7.5 8H4v3.5h3.5zm.25 2H4V17h3.75c1.1 0 2-.9 2-2s-.9-1.5-2-1.5zM2 6h6.5C10.43 6 12 7.57 12 9.5c0 1.18-.6 2.22-1.5 2.83C11.73 12.88 12.5 14.1 12.5 15.5 12.5 17.98 10.48 20 8 20H2V6zm13.5 2.5h5v-1h-5v1zm2.5 8c-1.38 0-2.5-1.12-2.5-2.5h7c0-2.76-2.24-5-5-5s-5 2.24-5 5 2.24 5 5 5c1.96 0 3.65-1.13 4.49-2.78l-1.76-.88c-.5.93-1.47 1.16-2.73 1.16z"/>
      </svg>
    ),
  },
  {
    label: 'Mail',
    href: 'mailto:fofohjoel@gmail.com',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
]

export default function SocialIcons() {
  return (
    <div className="flex justify-center gap-3 pb-2">
      {socials.map(({ label, href, icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-line bg-surface-raised text-muted transition-all duration-200 hover:scale-110 hover:text-text"
        >
          {icon}
        </a>
      ))}
    </div>
  )
}
