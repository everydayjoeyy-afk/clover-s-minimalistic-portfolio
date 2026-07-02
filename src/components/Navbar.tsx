import { useState } from 'react'
import { Sun1, Moon } from 'iconsax-react'
import { Link, useLocation } from 'react-router-dom'
import Logo from './Logo'
import { useTheme } from '../hooks/useTheme'
import PixelEyes from './PixelEyes'

type NavLink = {
  label: string
  to: string
}

const NAV_LINKS: NavLink[] = [
  { label: 'Home', to: '/' },
  { label: 'Work', to: '/work' },
  { label: 'About', to: '/about' },
  { label: 'Writing', to: '/writing' },
  { label: 'Say Hi', to: '/say-hi' },
]

const pillClasses =
  'relative rounded-[12px] border border-line bg-gradient-to-t from-pill-from to-pill-to ' +
  'shadow-[0px_1px_1px_rgba(0,0,0,0.1),inset_0px_1px_2px_0px_var(--pill-highlight)]'

export default function Navbar() {
  const { isDark, toggle } = useTheme()
  const { pathname } = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="mx-auto w-full max-w-[742px]">
      <header className="flex w-full items-center justify-between gap-4 rounded-[16px] border border-line-soft bg-surface-raised p-3">
        {/* Logo */}
        <Link to="/" aria-label="Clover home" className="shrink-0 text-text">
          <Logo className="h-[17px] w-[64px]" />
        </Link>

        {/* Nav links — desktop only */}
        <nav className="hidden shrink-0 gap-[38px] text-[14px] font-semibold whitespace-nowrap md:flex">
          {NAV_LINKS.map((link) => {
            const isActive = link.to === '/' ? pathname === '/' : pathname.startsWith(link.to.split('#')[0]) && link.to.split('#')[0] !== '/'
            const label = isActive ? `<${link.label}>` : link.label
            return (
              <Link
                key={link.label}
                to={link.to}
                className={`group relative overflow-hidden ${isActive ? 'text-text' : 'text-muted hover:text-text'}`}
              >
                <span className="block transition-transform duration-300 ease-in-out group-hover:-translate-y-full">
                  {label}
                </span>
                <span
                  aria-hidden="true"
                  className="absolute inset-0 translate-y-full transition-transform duration-300 ease-in-out group-hover:translate-y-0"
                >
                  {label}
                </span>
              </Link>
            )
          })}
        </nav>

        {/* Actions */}
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={toggle}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            aria-pressed={isDark}
            className={`${pillClasses} flex h-[32px] items-center justify-center px-2 text-text transition-transform active:scale-95`}
          >
            {isDark ? (
              <Moon size={18} color="currentColor" variant="Bold" />
            ) : (
              <Sun1 size={18} color="currentColor" variant="Bold" />
            )}
          </button>

          {/* Pixel eyes — desktop only */}
          <div className="hidden md:block">
            <PixelEyes />
          </div>

          {/* Hamburger — mobile only */}
          <button
            type="button"
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
            className={`${pillClasses} flex h-[32px] w-[32px] flex-col items-center justify-center gap-[5px] px-2 text-text transition-transform active:scale-95 md:hidden`}
          >
            <span className={`block h-[1.5px] w-[14px] bg-current transition-all duration-200 ${menuOpen ? 'translate-y-[3.5px] rotate-45' : ''}`} />
            <span className={`block h-[1.5px] w-[14px] bg-current transition-all duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-[1.5px] w-[14px] bg-current transition-all duration-200 ${menuOpen ? '-translate-y-[6px] -rotate-45' : ''}`} />
          </button>
        </div>
      </header>

      {/* Mobile menu dropdown */}
      {menuOpen && (
        <nav className="mt-2 flex flex-col rounded-[16px] border border-line-soft bg-surface-raised px-4 py-3 md:hidden">
          {NAV_LINKS.map((link) => {
            const isActive = link.to === '/' ? pathname === '/' : pathname.startsWith(link.to.split('#')[0]) && link.to.split('#')[0] !== '/'
            return (
              <Link
                key={link.label}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className={`py-3 text-[15px] font-semibold border-b border-line-soft last:border-0 ${isActive ? 'text-text' : 'text-muted'}`}
              >
                {isActive ? `<${link.label}>` : link.label}
              </Link>
            )
          })}
        </nav>
      )}
    </div>
  )
}
